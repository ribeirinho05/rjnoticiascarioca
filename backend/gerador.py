"""
GMAX NOTÍCIAS — Gerador do news-data.js
"""

import os
import logging
import re
import tempfile
from datetime import datetime

logger = logging.getLogger('gmaxnoticias.gerador')


def gerar_news_data(noticias, videos, cotacoes, breaking_news, clima=None, trending=None):
    from config import CAMINHO_JS, CATEGORIAS

    logger.info("Gerando news-data.js...")
    js = []
    js.append('/* GMAX NOTÍCIAS — Base de Dados v2.0')
    js.append(f'   Atualizado: {datetime.now().strftime("%d/%m/%Y %H:%M")} */')
    js.append('')

    js.append('const CATEGORIAS = {')
    for cat_id, cat_info in CATEGORIAS.items():
        js.append(f"    {cat_id}: {{ nome: '{cat_info['nome']}', cor: '{cat_info['cor']}', icone: '{cat_info['icone']}', gradient: '{cat_info['gradient']}' }},")
    js.append('};')
    js.append('')

    js.append('const noticias = [')
    for i, n in enumerate(noticias):
        d = 'true' if n.get('destaque') else 'false'
        ds = f'\n        destaque: {d},' if n.get('destaque') else ''
        js.append('    {')
        js.append(f"        id: {i+1}, categoria: '{n.get('categoria','brasil')}',{ds}")
        js.append(f"        titulo: '{_esc(n.get('titulo',''))}',")
        js.append(f"        resumo: '{_esc(n.get('resumo', n.get('texto','')[:300]))}',")
        js.append(f"        imagem: '{n.get('imagem', f'https://picsum.photos/seed/n{i}/800/500')}',")
        js.append(f"        autor: '{_esc(n.get('autor', n.get('fonte','Redação')))}', tempo: '{_tempo(n.get('data'))}'")
        js.append('    },')
    js.append('];')
    js.append('')

    js.append('const videos = [')
    for i, v in enumerate(videos):
        vid = v.get('video_id', '')
        js.append('    {')
        js.append(f"        id: {i+1}, titulo: '{_esc(v.get('titulo',''))}',")
        js.append(f"        thumb: '{v.get('thumb','')}', duracao: '{v.get('duracao','05:00')}',")
        js.append(f"        videoId: '{vid}', embedUrl: '{'https://www.youtube.com/embed/'+vid if vid else ''}'")
        js.append('    },')
    js.append('];')
    js.append('')

    js.append('const breakingNews = [')
    for bn in breaking_news:
        js.append(f"    '{_esc(bn)}',")
    js.append('];')
    js.append('')

    js.append('const cotacoes = [')
    for c in cotacoes:
        js.append(f"    {{ nome: '{_esc(c.get('nome',''))}', icone: '{c.get('icone','')}', valor: '{_esc(c.get('valor',''))}', variacao: '{_esc(c.get('variacao',''))}', direcao: '{c.get('direcao','up')}' }},")
    js.append('];')
    js.append('')

    if clima:
        js.append('const clima = {')
        js.append(f"    cidade: '{_esc(clima.get('cidade','São Paulo'))}', estado: '{_esc(clima.get('estado','SP'))}',")
        js.append(f"    temperatura: {clima.get('temperatura',0)}, temp_min: {clima.get('temp_min',0)}, temp_max: {clima.get('temp_max',0)},")
        js.append(f"    umidade: {clima.get('umidade',0)}, condicao: '{_esc(clima.get('condicao',''))}',")
        js.append(f"    icone: '{_esc(clima.get('icone','cloud'))}', vento: {clima.get('vento',0)}")
        js.append('};')
    else:
        js.append('const clima = null;')
    js.append('')

    if trending and isinstance(trending, list):
        js.append('const trending = [')
        for t in trending:
            js.append(f"    '{_esc(t)}',")
        js.append('];')
    else:
        js.append("const trending = ['#GMAXNoticias', '#SãoPaulo', '#Brasil', '#Economia'];")
    js.append('')

    conteudo = '\n'.join(js)
    os.makedirs(os.path.dirname(CAMINHO_JS), exist_ok=True)

    if os.path.exists(CAMINHO_JS):
        try:
            with open(CAMINHO_JS, 'r', encoding='utf-8') as f:
                with open(CAMINHO_JS + '.backup', 'w', encoding='utf-8') as fb:
                    fb.write(f.read())
        except Exception:
            pass

    dir_js = os.path.dirname(CAMINHO_JS)
    fd, tmp = tempfile.mkstemp(suffix='.js', dir=dir_js)
    try:
        with os.fdopen(fd, 'w', encoding='utf-8') as f:
            f.write(conteudo)
        os.replace(tmp, CAMINHO_JS)
    except Exception:
        if os.path.exists(tmp):
            os.remove(tmp)
        raise

    logger.info(f"news-data.js gerado: {len(noticias)} notícias, {len(videos)} vídeos, {len(cotacoes)} cotações")
    return True


def _esc(t):
    if not t: return ''
    t = str(t).replace('\\','\\\\').replace("'","\\'").replace('\n',' ').replace('\r','').replace('\t',' ').replace('</','<\\/')
    return re.sub(r'\s+', ' ', t).strip()


def _tempo(data_iso):
    if not data_iso: return 'agora'
    try:
        ds = data_iso.replace('Z','').split('+')[0].split('.')[0]
        dt = datetime.fromisoformat(ds)
        m = int((datetime.now() - dt).total_seconds() / 60)
        if m < 1: return 'agora'
        if m < 60: return f'{m} min atrás'
        if m < 1440: return f'{m//60}h atrás'
        if m < 10080: return f'{m//1440}d atrás'
        return dt.strftime('%d/%m/%Y')
    except Exception:
        return 'recente'
