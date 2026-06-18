"""
RJ NOTÍCIAS CARIOCA — Orquestrador Principal
Pipeline: coleta → filtra → IA → imagens → cotações → clima → gera JS
"""

import sys
import os
os.environ['PYTHONUNBUFFERED'] = '1'
import logging
import subprocess
import atexit
import json
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE_DIR)
LOCK_FILE = os.path.join(BASE_DIR, 'bot.lock')

from config import CAMINHO_LOG, GEMINI_API_KEY

logger = logging.getLogger('rjnoticiascarioca')


def _git_push_automatico():
    try:
        repo_dir = os.path.normpath(os.path.join(BASE_DIR, '..'))
        agora = datetime.now().strftime('%d/%m/%Y %H:%M')
        subprocess.run(['git', 'add', 'js/news-data.js', 'backend/healthcheck.json'], cwd=repo_dir, check=True, capture_output=True)
        subprocess.run(['git', 'commit', '-m', f'Atualização automática RJ NOTÍCIAS — {agora}'], cwd=repo_dir, check=True, capture_output=True)
        subprocess.run(['git', 'push'], cwd=repo_dir, check=True, capture_output=True)
        logger.info("Git push automático realizado com sucesso!")
    except subprocess.CalledProcessError as e:
        logger.warning(f"Git push falhou: {e}")
    except FileNotFoundError:
        logger.warning("Git não encontrado")


def configurar_logging():
    os.makedirs(CAMINHO_LOG, exist_ok=True)
    import glob
    limite = datetime.now().timestamp() - (7 * 86400)
    for arq in glob.glob(os.path.join(CAMINHO_LOG, '*.log')):
        try:
            if os.path.getmtime(arq) < limite: os.remove(arq)
        except OSError: pass
    log_file = os.path.join(CAMINHO_LOG, f'rjnoticias_{datetime.now().strftime("%Y%m%d")}.log')
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s [%(name)s] %(levelname)s: %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S',
        handlers=[logging.FileHandler(log_file, encoding='utf-8'), logging.StreamHandler()]
    )


def executar_atualizacao():
    inicio = datetime.now()
    logger.info("=" * 60)
    logger.info("RJ NOTÍCIAS CARIOCA — Iniciando atualização")
    logger.info(f"Data/hora: {inicio.strftime('%d/%m/%Y %H:%M:%S')}")
    logger.info("=" * 60)

    try:
        logger.info("\n ETAPA 1: Coletando notícias...")
        from coletor_rj import coletar_todas_rj
        noticias_rj = coletar_todas_rj()
        logger.info(f"  Rio de Janeiro: {len(noticias_rj)} notícias")

        from coletor import coletar_todas_externas
        noticias_externas = coletar_todas_externas()
        logger.info(f"  Externas: {len(noticias_externas)} notícias")

        todas = noticias_rj + noticias_externas
        logger.info(f"  TOTAL: {len(todas)} notícias")
        if len(todas) < 10:
            logger.error(f"Apenas {len(todas)} notícias. Abortando.")
            return False

        logger.info("\n ETAPA 2: Filtrando...")
        from filtro import selecionar_para_publicacao
        from config import QUANTIDADE_NOTICIAS
        selecionadas = selecionar_para_publicacao(todas, QUANTIDADE_NOTICIAS)

        logger.info("\n ETAPA 3: IA (Gemini)...")
        from cache_noticias import separar_novas_e_cached, atualizar_cache
        novas, cached, cache_dict = separar_novas_e_cached(selecionadas)

        if GEMINI_API_KEY:
            from processador_ia import processar_lote, gerar_breaking_news, gerar_trending_topics
            if novas:
                novas = processar_lote(novas)
                atualizar_cache(novas, cache_dict)
            selecionadas = cached + novas
            breaking_news = gerar_breaking_news(selecionadas)
            trending = gerar_trending_topics(selecionadas)
        else:
            for n in selecionadas:
                if not n.get('resumo'): n['resumo'] = n.get('texto', n.get('titulo',''))[:300]
            breaking_news = [f"URGENTE: {n.get('titulo','')[:100]}" for n in selecionadas[:3]]
            trending = ['#RJNotícias', '#RioDeJaneiro', '#Brasil', '#Carioca', '#Política', '#Esportes']

        logger.info("\n ETAPA 4: Imagens...")
        try:
            from buscador_imagens import processar_imagens
            selecionadas = processar_imagens(selecionadas)
        except Exception as e:
            logger.error(f"Erro imagens: {e}")

        logger.info("\n ETAPA 5: Vídeos...")
        videos = []
        try:
            from coletor_videos import coletar_todos_videos
            videos = coletar_todos_videos()
        except Exception as e:
            logger.error(f"Erro vídeos: {e}")

        logger.info("\n ETAPA 6: Cotações...")
        cotacoes_data = []
        try:
            from cotacoes import buscar_cotacoes
            cotacoes_data = buscar_cotacoes()
        except Exception as e:
            logger.error(f"Erro cotações: {e}")

        logger.info("\n ETAPA 7: Clima...")
        clima_data = None
        try:
            from clima import buscar_clima
            clima_data = buscar_clima()
        except Exception as e:
            logger.error(f"Erro clima: {e}")

        logger.info("\n ETAPA 8: Gerando JS...")
        from gerador import gerar_news_data
        sucesso = gerar_news_data(selecionadas, videos, cotacoes_data, breaking_news, clima_data, trending)

        fim = datetime.now()
        duracao = (fim - inicio).total_seconds()
        if sucesso:
            logger.info("ATUALIZAÇÃO CONCLUÍDA COM SUCESSO!")
            _git_push_automatico()
            _gravar_healthcheck(len(selecionadas), duracao)
        logger.info(f"Duração: {duracao:.1f}s | {len(selecionadas)} notícias | {len(videos)} vídeos")
        return sucesso

    except Exception as e:
        logger.error(f"ERRO CRÍTICO: {e}", exc_info=True)
        return False


def _gravar_healthcheck(qtd, duracao):
    try:
        with open(os.path.join(BASE_DIR, 'healthcheck.json'), 'w', encoding='utf-8') as f:
            json.dump({'ultima_execucao': datetime.now().isoformat(), 'noticias': qtd, 'duracao_s': round(duracao,1), 'status': 'ok'}, f, ensure_ascii=False)
    except Exception: pass


def _adquirir_lock():
    if os.path.exists(LOCK_FILE):
        try:
            with open(LOCK_FILE) as f: pid = int(f.read().strip())
            import psutil
            if psutil.pid_exists(pid): return False
        except Exception: pass
    with open(LOCK_FILE, 'w') as f: f.write(str(os.getpid()))
    return True


def _liberar_lock():
    try:
        if os.path.exists(LOCK_FILE): os.remove(LOCK_FILE)
    except OSError: pass


if __name__ == '__main__':
    configurar_logging()
    if not _adquirir_lock():
        logger.error('Outra instância rodando. Abortando.')
        sys.exit(1)
    atexit.register(_liberar_lock)
    sucesso = executar_atualizacao()
    _liberar_lock()
    sys.exit(0 if sucesso else 1)
