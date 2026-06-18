"""
GMAX NOTÍCIAS — Filtro e Classificação de Notícias
Filtra, classifica por categoria e seleciona as melhores notícias
"""

import logging
import re
from datetime import datetime, timedelta
from difflib import SequenceMatcher

logger = logging.getLogger('gmaxnoticias.filtro')

FONTE_CATEGORIA_FORCADA = {
    'G1 São Paulo': 'cidade',
    'Estadão SP': 'cidade',
    'GE (Globo Esporte)': 'esportes',
    'Bloomberg': 'economia',
    'Valor Econômico': 'economia',
    'InfoMoney': 'economia',
    'CNN International': 'internacional',
    'Fox News': 'internacional',
    'New York Times World': 'internacional',
    'G1 Mundo': 'internacional',
    'Jornal Nacional': 'brasil',
}

FONTE_BOOST = {
    'Prefeitura de São Paulo': 40,
    'Câmara Municipal de São Paulo': 35,
    'Assembleia Legislativa SP': 30,
    'Governo do Estado de SP': 30,
    'G1 São Paulo': 25,
    'Estadão SP': 25,
    'Folha de S.Paulo': 15,
    'G1': 10,
}

CIDADES_SP = [
    'são paulo', 'guarulhos', 'osasco', 'santo andré', 'são bernardo',
    'são caetano', 'diadema', 'mauá', 'campinas', 'santos', 'sorocaba',
    'ribeirão preto', 'são josé dos campos', 'bauru', 'piracicaba',
    'jundiaí', 'mogi das cruzes', 'itaquaquecetuba', 'taboão da serra',
    'barueri', 'cotia', 'carapicuíba', 'embu das artes', 'abc paulista',
]


def selecionar_para_publicacao(noticias, quantidade=140):
    from config import CATEGORIAS

    logger.info(f"Filtrando {len(noticias)} notícias...")

    validas = _filtrar_validas(noticias)
    logger.info(f"  Válidas: {len(validas)}")

    sem_duplicatas = _remover_duplicatas(validas)
    logger.info(f"  Sem duplicatas: {len(sem_duplicatas)}")

    for n in sem_duplicatas:
        n['categoria'] = _classificar_categoria(n, CATEGORIAS)
        n['score'] = _calcular_score(n)

    sem_duplicatas.sort(key=lambda x: x['score'], reverse=True)

    selecionadas = _balancear_categorias(sem_duplicatas, quantidade, CATEGORIAS)

    logger.info(f"Filtragem concluída: {len(sem_duplicatas)} notícias")
    logger.info(f"Selecionadas {len(selecionadas)} notícias para publicação")

    contagem = {}
    for n in selecionadas:
        cat = n.get('categoria', 'brasil')
        contagem[cat] = contagem.get(cat, 0) + 1
    for cat, qtd in sorted(contagem.items()):
        logger.info(f"  {cat}: {qtd} notícias")

    return selecionadas


def _filtrar_validas(noticias):
    validas = []
    agora = datetime.now()
    limite = agora - timedelta(days=7)

    for n in noticias:
        titulo = n.get('titulo', '').strip()
        if not titulo or len(titulo) < 15:
            continue

        data = n.get('data')
        if data:
            try:
                data_str = str(data).replace('Z', '').split('+')[0].split('.')[0]
                dt = datetime.fromisoformat(data_str)
                if dt < limite:
                    logger.info(f"  Removida (>7 dias): {titulo[:60]}")
                    continue
                if dt > agora + timedelta(hours=24):
                    continue
            except (ValueError, TypeError):
                if not n.get('local'):
                    logger.info(f"  Removida (sem data real): {titulo[:60]}")
                    continue

        validas.append(n)

    return validas


def _remover_duplicatas(noticias):
    vistos = []
    resultado = []

    for n in noticias:
        titulo = n.get('titulo', '').lower().strip()
        titulo_limpo = re.sub(r'[^\w\s]', '', titulo)

        duplicado = False
        for visto in vistos:
            if titulo_limpo == visto:
                duplicado = True
                break
            if len(titulo_limpo) > 20 and len(visto) > 20:
                ratio = SequenceMatcher(None, titulo_limpo, visto).ratio()
                if ratio > 0.75:
                    duplicado = True
                    break

        if not duplicado:
            vistos.append(titulo_limpo)
            resultado.append(n)

    return resultado


def _classificar_categoria(noticia, categorias):
    fonte = noticia.get('fonte', '')
    if fonte in FONTE_CATEGORIA_FORCADA:
        return FONTE_CATEGORIA_FORCADA[fonte]

    titulo = noticia.get('titulo', '').lower()
    texto = noticia.get('texto', '').lower()[:500]
    conteudo = titulo + ' ' + texto

    scores = {}
    for cat_id, cat_info in categorias.items():
        score = 0
        for palavra in cat_info.get('palavras_chave', []):
            if palavra.lower() in titulo:
                score += 3
            if palavra.lower() in texto:
                score += 1
        scores[cat_id] = score

    if noticia.get('idioma') == 'en':
        scores['internacional'] = scores.get('internacional', 0) + 5

    melhor = max(scores, key=scores.get) if scores else 'brasil'
    return melhor if scores.get(melhor, 0) > 0 else 'brasil'


def _calcular_score(noticia):
    score = 0

    score += FONTE_BOOST.get(noticia.get('fonte', ''), 0)

    titulo_lower = noticia.get('titulo', '').lower()
    for cidade in CIDADES_SP:
        if cidade in titulo_lower:
            score += 30
            break

    palavras_impacto = ['urgente', 'exclusivo', 'última hora', 'agora', 'breaking',
                        'operação', 'preso', 'morte', 'acidente', 'recorde', 'crise']
    for p in palavras_impacto:
        if p in titulo_lower:
            score += 15
            break

    data = noticia.get('data')
    if data:
        try:
            data_str = str(data).replace('Z', '').split('+')[0].split('.')[0]
            dt = datetime.fromisoformat(data_str)
            horas = (datetime.now() - dt).total_seconds() / 3600
            if horas < 3:
                score += 20
            elif horas < 12:
                score += 10
            elif horas < 24:
                score += 5
        except (ValueError, TypeError):
            pass

    if noticia.get('local'):
        score += 20

    return score


def _balancear_categorias(noticias, quantidade, categorias):
    min_por_categoria = max(3, quantidade // (len(categorias) * 2))
    resultado = []
    usados = set()

    for cat_id in categorias:
        cat_noticias = [n for n in noticias if n['categoria'] == cat_id]
        count = 0
        for n in cat_noticias:
            if id(n) not in usados and count < min_por_categoria:
                resultado.append(n)
                usados.add(id(n))
                count += 1

    for n in noticias:
        if id(n) not in usados and len(resultado) < quantidade:
            resultado.append(n)
            usados.add(id(n))

    resultado.sort(key=lambda x: x.get('score', 0), reverse=True)

    if len(resultado) >= 5:
        for i, n in enumerate(resultado[:5]):
            n['destaque'] = True

    return resultado[:quantidade]
