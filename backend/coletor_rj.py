"""
RJ NOTÍCIAS CARIOCA — Coletor de Notícias Locais do Rio de Janeiro
Scraping da Prefeitura, Câmara, ALERJ e Governo RJ
"""

import requests
from bs4 import BeautifulSoup
from datetime import datetime
from http_utils import requisicao_com_retry
import logging
import re
import time

logger = logging.getLogger('rjnoticiascarioca.coletor_rj')

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
}
TIMEOUT = 20


def coletar_todas_rj():
    from config import FONTES_SP
    todas = []

    for fonte_id, fonte in FONTES_SP.items():
        try:
            logger.info(f"Coletando notícias da {fonte['nome']}...")
            noticias = _coletar_fonte(fonte)
            todas.extend(noticias)
            logger.info(f"  {len(noticias)} notícias de {fonte['nome']}")
            time.sleep(1)
        except Exception as e:
            logger.error(f"Erro ao coletar {fonte['nome']}: {e}")

    logger.info(f"Total de notícias coletadas do Rio de Janeiro: {len(todas)}")
    return todas


def _coletar_fonte(fonte):
    noticias = []
    url = fonte['url_lista']
    url_base = fonte['url_base']

    resp = requisicao_com_retry(url, headers=HEADERS, timeout=TIMEOUT)
    if not resp:
        return noticias

    soup = BeautifulSoup(resp.text, 'html.parser')
    links = _extrair_links_noticias(soup, url_base)
    logger.info(f"Encontrados {len(links)} links de notícias na {fonte['nome']}")

    for link in links[:10]:
        try:
            noticia = _extrair_noticia_generica(link, fonte)
            if noticia:
                noticias.append(noticia)
            time.sleep(0.5)
        except Exception as e:
            logger.warning(f"  Erro ao extrair {link}: {e}")

    return noticias


def _extrair_links_noticias(soup, url_base):
    links = set()
    excluir = ['#', 'javascript:', 'mailto:', '/tag/', '/categoria/', '/page/', 'login', 'cadastro', '.pdf', '.jpg', '.png']

    for a in soup.find_all('a', href=True):
        href = a['href'].strip()
        if any(e in href.lower() for e in excluir):
            continue
        if not href.startswith('http'):
            href = url_base.rstrip('/') + '/' + href.lstrip('/')

        if url_base in href and len(href) > len(url_base) + 15:
            partes = href.rstrip('/').split('/')
            if len(partes) >= 5:
                links.add(href)

    return list(links)[:25]


def _extrair_noticia_generica(url, fonte):
    resp = requisicao_com_retry(url, headers=HEADERS, timeout=TIMEOUT)
    if not resp:
        return None

    soup = BeautifulSoup(resp.text, 'html.parser')

    titulo = None
    for seletor in ['h1.titulo', 'h1.entry-title', 'h1.post-title', 'h1.news-title', 'h1.noticia-titulo', 'article h1', '.content h1', 'h1']:
        el = soup.select_one(seletor)
        if el and len(el.get_text(strip=True)) > 10:
            titulo = el.get_text(strip=True)
            break

    if not titulo:
        og = soup.find('meta', property='og:title')
        if og and og.get('content'):
            titulo = og['content'].strip()

    if not titulo or len(titulo) < 10:
        return None

    texto = ''
    for seletor in ['.noticia-texto', '.entry-content', '.post-content', '.news-content', '.conteudo', 'article .text', 'article p']:
        els = soup.select(seletor)
        if els:
            texto = ' '.join(el.get_text(strip=True) for el in els)
            break

    if not texto:
        paragrafos = soup.find_all('p')
        textos = [p.get_text(strip=True) for p in paragrafos if len(p.get_text(strip=True)) > 40]
        texto = ' '.join(textos[:5])

    imagem = None
    og_img = soup.find('meta', property='og:image')
    if og_img and og_img.get('content'):
        imagem = og_img['content']
    if not imagem:
        img = soup.select_one('article img, .noticia img, .content img')
        if img and img.get('src'):
            imagem = img['src']
            if imagem and not imagem.startswith('http'):
                imagem = fonte['url_base'].rstrip('/') + '/' + imagem.lstrip('/')

    data = None
    for meta_name in ['article:published_time', 'datePublished', 'date']:
        meta = soup.find('meta', property=meta_name) or soup.find('meta', attrs={'name': meta_name})
        if meta and meta.get('content'):
            data = meta['content']
            break
    if not data:
        time_el = soup.find('time')
        if time_el and time_el.get('datetime'):
            data = time_el['datetime']

    return {
        'titulo': titulo[:200],
        'texto': texto[:2000],
        'resumo': texto[:300] if texto else titulo,
        'link': url,
        'fonte': fonte['nome'],
        'imagem': imagem,
        'data': data or datetime.now().isoformat(),
        'categoria': 'cidade',
        'prioridade': fonte.get('prioridade', 50),
        'local': True
    }
