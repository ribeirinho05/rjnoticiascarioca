"""
GMAX NOTÍCIAS — Coletor de Vídeos
Coleta vídeos do YouTube via RSS (sem API key necessária)
"""

import feedparser
import requests
from datetime import datetime, timedelta
from bs4 import BeautifulSoup
from http_utils import requisicao_com_retry
import logging
import re
import time

logger = logging.getLogger('gmaxnoticias.coletor_videos')

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
}
TIMEOUT = 15
MAX_IDADE_DIAS = 30


def coletar_videos_youtube():
    from config import CANAIS_YOUTUBE, QUANTIDADE_VIDEOS
    todos_videos = []

    for canal in CANAIS_YOUTUBE:
        try:
            logger.info(f"Coletando vídeos: {canal['nome']}...")
            videos = _coletar_canal_rss(canal)
            todos_videos.extend(videos)
            logger.info(f"  {len(videos)} vídeos de {canal['nome']}")
            time.sleep(0.5)
        except Exception as e:
            logger.error(f"Erro ao coletar vídeos de {canal['nome']}: {e}")

    data_limite = (datetime.now() - timedelta(days=MAX_IDADE_DIAS)).isoformat()
    videos_recentes = [v for v in todos_videos if v.get('data', '') >= data_limite]

    if len(videos_recentes) < QUANTIDADE_VIDEOS:
        videos_recentes = sorted(todos_videos, key=lambda v: v.get('data', ''), reverse=True)

    resultado = []
    contagem_canal = {}
    for v in videos_recentes:
        canal = v.get('canal', '')
        contagem_canal[canal] = contagem_canal.get(canal, 0)
        if contagem_canal[canal] < 2:
            resultado.append(v)
            contagem_canal[canal] += 1
        if len(resultado) >= QUANTIDADE_VIDEOS:
            break

    logger.info(f"Total de vídeos selecionados: {len(resultado)}")
    return resultado


def _coletar_canal_rss(canal):
    videos = []
    channel_id = canal['channel_id']
    rss_url = f'https://www.youtube.com/feeds/videos.xml?channel_id={channel_id}'

    try:
        feed = feedparser.parse(rss_url, agent=HEADERS['User-Agent'])

        if feed.bozo and not feed.entries:
            logger.info(f"  RSS falhou, tentando scraping para {canal['nome']}")
            return _coletar_canal_scraping(canal)

        for entry in feed.entries[:6]:
            video = _extrair_video_rss(entry, canal)
            if video:
                videos.append(video)

    except Exception as e:
        logger.warning(f"Erro RSS {canal['nome']}: {e}")
        videos = _coletar_canal_scraping(canal)

    return videos


def _extrair_video_rss(entry, canal):
    try:
        titulo = entry.get('title', '').strip()
        if not titulo or len(titulo) < 5:
            return None

        video_id = entry.get('yt_videoid', '')
        if not video_id:
            link = entry.get('link', '')
            match = re.search(r'v=([a-zA-Z0-9_-]{11})', link)
            if match:
                video_id = match.group(1)

        if not video_id:
            return None

        thumb = f'https://img.youtube.com/vi/{video_id}/hqdefault.jpg'
        embed_url = f'https://www.youtube.com/embed/{video_id}'
        watch_url = f'https://www.youtube.com/watch?v={video_id}'

        data = None
        if entry.get('published_parsed'):
            try:
                data = datetime(*entry.published_parsed[:6]).isoformat()
            except Exception:
                pass
        elif entry.get('published'):
            data = entry.published

        descricao = ''
        if hasattr(entry, 'media_group') and entry.media_group:
            for mg in entry.media_group:
                if hasattr(mg, 'media_description'):
                    descricao = mg.media_description[:200]
                    break
        if not descricao and entry.get('summary'):
            soup = BeautifulSoup(entry.summary, 'html.parser')
            descricao = soup.get_text(strip=True)[:200]

        duracao = _estimar_duracao(titulo)

        return {
            'titulo': titulo[:150],
            'thumb': thumb,
            'video_id': video_id,
            'embed_url': embed_url,
            'watch_url': watch_url,
            'duracao': duracao,
            'canal': canal['nome'],
            'data': data or datetime.now().isoformat(),
            'descricao': descricao,
            'prioridade': canal['prioridade']
        }

    except Exception as e:
        logger.warning(f"Erro ao extrair vídeo RSS: {e}")
        return None


def _coletar_canal_scraping(canal):
    videos = []

    try:
        resp = requisicao_com_retry(canal['url'], headers=HEADERS, timeout=TIMEOUT)
        if not resp:
            return videos
        resp.raise_for_status()

        video_ids = re.findall(r'"videoId":"([a-zA-Z0-9_-]{11})"', resp.text)
        video_ids = list(dict.fromkeys(video_ids))

        for vid in video_ids[:6]:
            video = _info_video_oembed(vid, canal)
            if video:
                videos.append(video)
            time.sleep(0.3)

    except Exception as e:
        logger.warning(f"Erro scraping {canal['nome']}: {e}")

    return videos


def _info_video_oembed(video_id, canal):
    try:
        oembed_url = f'https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={video_id}&format=json'
        resp = requisicao_com_retry(oembed_url, headers=HEADERS, timeout=10)
        if not resp:
            return None
        resp.raise_for_status()
        data = resp.json()

        titulo = data.get('title', '').strip()
        if not titulo:
            return None

        thumb = f'https://img.youtube.com/vi/{video_id}/hqdefault.jpg'

        return {
            'titulo': titulo[:150],
            'thumb': thumb,
            'video_id': video_id,
            'embed_url': f'https://www.youtube.com/embed/{video_id}',
            'watch_url': f'https://www.youtube.com/watch?v={video_id}',
            'duracao': _estimar_duracao(titulo),
            'canal': canal['nome'],
            'data': datetime.now().isoformat(),
            'descricao': '',
            'prioridade': canal['prioridade']
        }

    except Exception as e:
        logger.warning(f"Erro oEmbed {video_id}: {e}")
        return None


def _estimar_duracao(titulo):
    titulo_lower = titulo.lower()
    if any(w in titulo_lower for w in ['ao vivo', 'live', 'sessão', 'plenária', 'audiência']):
        return '1:30:00'
    elif any(w in titulo_lower for w in ['entrevista', 'debate', 'especial']):
        return '25:00'
    elif any(w in titulo_lower for w in ['resumo', 'destaque', 'minuto']):
        return '05:00'
    else:
        return '08:00'


def coletar_todos_videos():
    return coletar_videos_youtube()
