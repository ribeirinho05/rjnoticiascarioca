"""
GMAX NOTÍCIAS — Cache Inteligente de Notícias
Evita reprocessar notícias já reescritas pela IA, economizando créditos do Gemini.
"""

import json
import os
import hashlib
import logging
import tempfile
from datetime import datetime

logger = logging.getLogger('gmaxnoticias.cache')

CACHE_DIR = os.path.join(os.path.dirname(__file__), 'cache')
CACHE_FILE = os.path.join(CACHE_DIR, 'noticias_cache.json')
MAX_CACHE_ENTRIES = 500


def _gerar_hash(noticia):
    titulo = noticia.get('titulo_original', noticia.get('titulo', ''))
    chave = f"{titulo}__{noticia.get('fonte', '')}".lower().strip()
    return hashlib.md5(chave.encode('utf-8')).hexdigest()


def carregar_cache():
    if not os.path.exists(CACHE_FILE):
        return {}
    try:
        with open(CACHE_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (json.JSONDecodeError, IOError):
        logger.warning("Cache corrompido, criando novo")
        return {}


def salvar_cache(cache):
    os.makedirs(CACHE_DIR, exist_ok=True)

    if len(cache) > MAX_CACHE_ENTRIES:
        itens = sorted(cache.items(), key=lambda x: x[1].get('timestamp', ''), reverse=True)
        cache = dict(itens[:MAX_CACHE_ENTRIES])

    fd, tmp_path = tempfile.mkstemp(dir=CACHE_DIR, suffix='.tmp')
    try:
        with os.fdopen(fd, 'w', encoding='utf-8') as f:
            json.dump(cache, f, ensure_ascii=False, indent=2)
        os.replace(tmp_path, CACHE_FILE)
    except Exception:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)
        raise


def separar_novas_e_cached(noticias):
    cache = carregar_cache()
    novas = []
    cached = []

    for noticia in noticias:
        h = _gerar_hash(noticia)
        if h in cache:
            entrada = cache[h]
            noticia['titulo_original'] = noticia['titulo']
            noticia['titulo'] = entrada['titulo']
            noticia['resumo'] = entrada['resumo']
            noticia['ia_processada'] = True
            noticia['cache_hit'] = True
            cached.append(noticia)
        else:
            noticia['cache_hit'] = False
            novas.append(noticia)

    logger.info(f"📦 Cache: {len(cached)} reutilizadas, {len(novas)} novas para IA")
    return novas, cached, cache


def atualizar_cache(noticias_processadas, cache):
    agora = datetime.now().isoformat()

    for noticia in noticias_processadas:
        if noticia.get('ia_processada') and not noticia.get('cache_hit'):
            h = _gerar_hash(noticia)
            cache[h] = {
                'titulo': noticia['titulo'],
                'resumo': noticia.get('resumo', ''),
                'fonte': noticia.get('fonte', ''),
                'timestamp': agora
            }

    salvar_cache(cache)
    logger.info(f"💾 Cache atualizado: {len(cache)} entradas salvas")
