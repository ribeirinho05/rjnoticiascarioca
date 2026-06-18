"""
GMAX NOTÍCIAS — Buscador de Imagens
Busca imagens reais via Pexels API ou usa imagens originais das fontes
"""

import requests
import logging
import re
import hashlib
from http_utils import requisicao_com_retry

logger = logging.getLogger('gmaxnoticias.buscador_imagens')

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}
TIMEOUT = 10

TERMOS_CATEGORIA = {
    'politica': ['government building', 'politics', 'city hall', 'parliament'],
    'cidade': ['city street', 'urban', 'construction', 'infrastructure'],
    'eventos': ['festival', 'event', 'celebration', 'concert'],
    'brasil': ['brazil', 'brasilia', 'brazilian flag'],
    'esportes': ['soccer', 'sports', 'stadium', 'athlete'],
    'economia': ['economy', 'agriculture', 'farm soybean', 'stock market']
}


def buscar_imagem(noticia):
    imagem_original = noticia.get('imagem')
    if imagem_original and _imagem_valida(imagem_original):
        return imagem_original

    imagem_pexels = _buscar_pexels(noticia)
    if imagem_pexels:
        return imagem_pexels

    seed = hashlib.md5(noticia.get('titulo', 'default').encode()).hexdigest()[:10]
    return f'https://picsum.photos/seed/{seed}/800/500'


def _imagem_valida(url):
    if not url or not url.startswith('http'):
        return False

    invalidas = ['placeholder', 'default', 'no-image', 'logo', 'favicon', 'icon',
                 '1x1', 'pixel', 'tracking', 'blank', 'spacer', 'transparent']
    url_lower = url.lower()
    if any(inv in url_lower for inv in invalidas):
        return False

    extensoes_validas = ('.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.avif')
    caminho = url_lower.split('?')[0]
    if any(caminho.endswith(ext) for ext in extensoes_validas):
        return True

    cdns_imagem = ['img.', 'image.', 'cdn.', 'static.', 'media.', 'upload.',
                   'wp-content/uploads', '/fotos/', '/imagens/', '/photos/']
    if any(cdn in url_lower for cdn in cdns_imagem):
        return True

    return True


def _buscar_pexels(noticia):
    from config import PEXELS_API_KEY

    if not PEXELS_API_KEY:
        return None

    categoria = noticia.get('categoria', 'brasil')
    titulo = noticia.get('titulo', '')

    termos = TERMOS_CATEGORIA.get(categoria, ['news'])
    query = termos[0]

    palavras_titulo = re.findall(r'\b[A-Za-zÀ-ÿ]{4,}\b', titulo.lower())
    termos_especificos = {
        'ponte': 'bridge construction',
        'hospital': 'hospital',
        'escola': 'school education',
        'estrada': 'road highway',
        'soja': 'soybean agriculture',
        'milho': 'corn agriculture',
        'futebol': 'soccer football',
        'rio': 'river',
        'parque': 'park nature',
        'feira': 'market fair',
        'festival': 'festival celebration',
        'câmara': 'city hall government',
        'prefeito': 'mayor government',
        'segurança': 'security police',
        'trânsito': 'traffic road',
        'educação': 'education classroom',
        'paulista': 'wetland nature wildlife',
    }
    for palavra in palavras_titulo:
        if palavra in termos_especificos:
            query = termos_especificos[palavra]
            break

    try:
        resp = requisicao_com_retry(
            'https://api.pexels.com/v1/search',
            headers={'Authorization': PEXELS_API_KEY},
            params={'query': query, 'per_page': 1, 'orientation': 'landscape'},
            timeout=TIMEOUT
        )
        if not resp:
            return None
        resp.raise_for_status()
        data = resp.json()

        photos = data.get('photos', [])
        if photos:
            url = photos[0].get('src', {}).get('landscape') or photos[0].get('src', {}).get('large')
            if url:
                return url

    except Exception as e:
        logger.warning(f"Erro Pexels '{query}': {e}")

    return None


def processar_imagens(noticias):
    logger.info(f"Processando imagens para {len(noticias)} notícias...")

    originais = 0
    pexels_count = 0
    fallback_count = 0

    for n in noticias:
        imagem_antes = n.get('imagem')
        n['imagem'] = buscar_imagem(n)

        if imagem_antes and n['imagem'] == imagem_antes:
            originais += 1
        elif 'pexels' in (n['imagem'] or '').lower():
            pexels_count += 1
        else:
            fallback_count += 1

    logger.info(f"Imagens: {originais} originais, {pexels_count} Pexels, {fallback_count} fallback")
    return noticias
