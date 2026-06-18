"""
GMAX NOTÍCIAS — Coletor de Notícias (RSS + NewsAPI)
Coleta notícias de fontes nacionais e regionais
"""

import feedparser
import requests
from datetime import datetime, timedelta
from email.utils import parsedate_to_datetime
import logging
import re
from bs4 import BeautifulSoup
import time
from http_utils import requisicao_com_retry

logger = logging.getLogger('gmaxnoticias.coletor')

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
}
TIMEOUT = 15


def coletar_rss():
    from config import FONTES_RSS
    todas = []

    for fonte in FONTES_RSS:
        if not fonte.get('ativo', True):
            continue
        try:
            logger.info(f"Coletando RSS: {fonte['nome']}...")
            noticias = _processar_feed(fonte)
            todas.extend(noticias)
            logger.info(f"  {len(noticias)} notícias de {fonte['nome']}")
        except Exception as e:
            logger.error(f"Erro ao coletar {fonte['nome']}: {e}")

    logger.info(f"Total RSS: {len(todas)} notícias")
    return todas


def _processar_feed(fonte):
    noticias = []

    try:
        resp = requisicao_com_retry(fonte['url'], timeout=TIMEOUT, headers=HEADERS)
        if resp:
            feed = feedparser.parse(resp.text)
        else:
            feed = feedparser.parse(fonte['url'], agent=HEADERS['User-Agent'])

        if feed.bozo and not feed.entries:
            logger.warning(f"Feed inválido: {fonte['nome']}")
            return []

        for entry in feed.entries[:40]:
            noticia = _extrair_entry(entry, fonte)
            if noticia:
                noticias.append(noticia)

        enrich_count = 0
        for noticia in noticias:
            if not noticia.get('_needs_enrich') or enrich_count >= 20:
                continue
            link = noticia.get('link', '')
            if not link:
                continue
            try:
                texto_link, img_link = _extrair_conteudo_link(link)
                if not noticia.get('imagem') and img_link:
                    noticia['imagem'] = img_link
                if len(noticia.get('texto', '')) < 50 and texto_link and len(texto_link) > len(noticia.get('texto', '')):
                    noticia['texto'] = texto_link[:2000]
                enrich_count += 1
                time.sleep(0.3)
            except Exception:
                pass
            noticia.pop('_needs_enrich', None)

        for n in noticias:
            n.pop('_needs_enrich', None)

    except Exception as e:
        logger.error(f"Erro no feed {fonte['nome']}: {e}")

    return noticias


def _extrair_entry(entry, fonte):
    try:
        titulo = entry.get('title', '').strip()
        if not titulo or len(titulo) < 10:
            return None

        link = entry.get('link', '')

        texto = ''
        if entry.get('summary'):
            soup = BeautifulSoup(entry.summary, 'html.parser')
            texto = soup.get_text(strip=True)
        elif entry.get('description'):
            soup = BeautifulSoup(entry.description, 'html.parser')
            texto = soup.get_text(strip=True)
        elif entry.get('content'):
            for content in entry.content:
                soup = BeautifulSoup(content.get('value', ''), 'html.parser')
                texto = soup.get_text(strip=True)
                if texto:
                    break

        imagem = None

        if hasattr(entry, 'media_content') and entry.media_content:
            for media in entry.media_content:
                url_media = media.get('url', '')
                tipo = media.get('type', '')
                if 'image' in tipo or url_media.lower().endswith(('.jpg', '.jpeg', '.png', '.webp', '.gif')):
                    imagem = url_media
                    break
                if url_media and not tipo and any(ext in url_media.lower() for ext in ['.jpg', '.jpeg', '.png', '.webp']):
                    imagem = url_media
                    break

        if not imagem and hasattr(entry, 'media_thumbnail') and entry.media_thumbnail:
            imagem = entry.media_thumbnail[0].get('url')

        if not imagem and entry.get('enclosures'):
            for enc in entry.enclosures:
                tipo = enc.get('type', '')
                url_enc = enc.get('href', enc.get('url', ''))
                if 'image' in tipo or (url_enc and url_enc.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))):
                    imagem = url_enc
                    break

        if not imagem:
            for html_field in ['summary', 'description']:
                html_content = entry.get(html_field, '')
                if html_content and '<img' in html_content:
                    soup_img = BeautifulSoup(html_content, 'html.parser')
                    img = soup_img.find('img', src=True)
                    if img and img['src'].startswith('http'):
                        imagem = img['src']
                        break

        if not imagem and entry.get('content'):
            for content in entry.content:
                html_c = content.get('value', '')
                if '<img' in html_c:
                    soup_img = BeautifulSoup(html_c, 'html.parser')
                    img = soup_img.find('img', src=True)
                    if img and img['src'].startswith('http'):
                        imagem = img['src']
                        break

        if not imagem and entry.get('links'):
            for link_obj in entry.links:
                if 'image' in link_obj.get('type', ''):
                    imagem = link_obj.get('href', '')
                    break

        needs_enrich = (not imagem) or (len(texto) < 50)

        data = None
        if entry.get('published_parsed'):
            try:
                data = datetime(*entry.published_parsed[:6]).isoformat()
            except Exception:
                pass
        elif entry.get('published'):
            try:
                data = parsedate_to_datetime(entry.published).isoformat()
            except Exception:
                pass
        elif entry.get('updated_parsed'):
            try:
                data = datetime(*entry.updated_parsed[:6]).isoformat()
            except Exception:
                pass

        autor = entry.get('author', fonte['nome'])

        return {
            'titulo': titulo[:200],
            'texto': texto[:2000],
            'imagem': imagem,
            'link': link,
            'data': data or datetime.now().isoformat(),
            'sem_data_real': data is None,
            'fonte': fonte['nome'],
            'autor': autor,
            'prioridade': fonte.get('prioridade', 50),
            '_needs_enrich': needs_enrich
        }

    except Exception as e:
        logger.warning(f"Erro ao extrair entry: {e}")
        return None


def coletar_newsapi():
    from config import NEWSAPI_KEY, NEWSAPI_QUERIES
    noticias = []

    if not NEWSAPI_KEY:
        logger.info("NewsAPI não configurada (sem chave)")
        return []

    base_url = 'https://newsapi.org/v2/everything'
    ontem = (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d')

    for query in NEWSAPI_QUERIES:
        try:
            params = {
                'q': query,
                'from': ontem,
                'language': 'pt',
                'sortBy': 'publishedAt',
                'pageSize': 5,
                'apiKey': NEWSAPI_KEY
            }
            resp = requisicao_com_retry(base_url, params=params, timeout=TIMEOUT)
            if not resp:
                continue
            resp.raise_for_status()
            data = resp.json()

            if data.get('status') != 'ok':
                continue

            for article in data.get('articles', []):
                titulo = article.get('title', '').strip()
                if not titulo or len(titulo) < 10 or titulo == '[Removed]':
                    continue

                texto = article.get('description', '') or article.get('content', '') or ''
                texto = re.sub(r'\[\+\d+ chars\]', '', texto).strip()

                noticia = {
                    'titulo': titulo[:200],
                    'texto': texto[:2000],
                    'imagem': article.get('urlToImage'),
                    'link': article.get('url', ''),
                    'data': article.get('publishedAt', datetime.now().isoformat()),
                    'fonte': article.get('source', {}).get('name', 'NewsAPI'),
                    'autor': article.get('author', 'Redação'),
                    'prioridade': 50
                }
                noticias.append(noticia)

            time.sleep(0.3)

        except Exception as e:
            logger.error(f"Erro NewsAPI query '{query}': {e}")

    logger.info(f"Total NewsAPI: {len(noticias)} notícias")
    return noticias


def coletar_google_news_rss():
    noticias = []
    queries = ['São+Paulo+SP', 'Estado+São+Paulo', 'Brasil+hoje']

    for query in queries:
        try:
            url = f'https://news.google.com/rss/search?q={query}&hl=pt-BR&gl=BR&ceid=BR:pt-419'
            resp = requisicao_com_retry(url, timeout=TIMEOUT, headers=HEADERS)
            if resp:
                feed = feedparser.parse(resp.text)
            else:
                feed = feedparser.parse(url, agent=HEADERS['User-Agent'])

            for entry in feed.entries[:15]:
                titulo = entry.get('title', '').strip()
                if not titulo or len(titulo) < 10:
                    continue

                fonte_nome = 'Google News'
                if ' - ' in titulo:
                    partes = titulo.rsplit(' - ', 1)
                    titulo = partes[0]
                    fonte_nome = partes[1] if len(partes) > 1 else 'Google News'

                link = entry.get('link', '')

                data = None
                if entry.get('published_parsed'):
                    try:
                        data = datetime(*entry.published_parsed[:6]).isoformat()
                    except Exception:
                        pass

                texto = ''
                summary = entry.get('summary', '')
                if summary:
                    soup = BeautifulSoup(summary, 'html.parser')
                    texto = soup.get_text(strip=True)

                source = entry.get('source', {})
                if isinstance(source, dict) and source.get('title'):
                    fonte_nome = source['title']

                noticias.append({
                    'titulo': titulo[:200],
                    'texto': texto or titulo,
                    'imagem': None,
                    'link': link,
                    'data': data or datetime.now().isoformat(),
                    'sem_data_real': data is None,
                    'fonte': fonte_nome,
                    'autor': 'Redação',
                    'prioridade': 20
                })

            time.sleep(0.3)

        except Exception as e:
            logger.error(f"Erro Google News '{query}': {e}")

    logger.info(f"Total Google News: {len(noticias)} notícias")
    return noticias


def _extrair_conteudo_link(url):
    if not url:
        return None, None

    try:
        resp = requisicao_com_retry(url, timeout=10, headers=HEADERS)
        if not resp:
            return None, None

        soup = BeautifulSoup(resp.text, 'html.parser')

        imagem = None
        og_img = soup.find('meta', property='og:image')
        if og_img and og_img.get('content'):
            imagem = og_img['content']

        texto = None
        og_desc = soup.find('meta', property='og:description')
        if og_desc and og_desc.get('content') and len(og_desc['content']) > 50:
            texto = og_desc['content']

        if not texto or len(texto) < 100:
            for sel in ['article', '.article-body', '.materia-conteudo', '.entry-content',
                         '.post-content', '.content-text', '.noticia-conteudo',
                         '.text', '[itemprop="articleBody"]']:
                el = soup.select_one(sel)
                if el:
                    for tag in el.find_all(['script', 'style', 'nav', 'header', 'footer', 'aside']):
                        tag.decompose()
                    paragrafos = el.find_all('p')
                    if paragrafos:
                        texto_art = ' '.join(p.get_text(strip=True) for p in paragrafos if len(p.get_text(strip=True)) > 20)
                        if len(texto_art) > 100:
                            texto = texto_art[:2000]
                            break

        return texto, imagem

    except Exception:
        return None, None


def coletar_todas_externas():
    todas = []
    todas.extend(coletar_rss())
    todas.extend(coletar_newsapi())
    todas.extend(coletar_google_news_rss())
    logger.info(f"Total de notícias externas coletadas: {len(todas)}")
    return todas


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    noticias = coletar_todas_externas()
    print(f"\nTotal: {len(noticias)} notícias\n")
    for n in noticias[:10]:
        print(f"[{n['fonte']}] {n['titulo']}")
        print(f"  {n['link']}")
        print()
