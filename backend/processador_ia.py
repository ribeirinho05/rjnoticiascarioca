"""
RJ NOTÍCIAS CARIOCA — Processador IA (Google Gemini 2.5 Flash via HTTP direto)
"""

import requests
import json
import logging
import time
import re

logger = logging.getLogger('rjnoticiascarioca.processador_ia')

API_URL = "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}"


class QuotaDiariaExcedida(Exception):
    pass


SAFETY_SETTINGS = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
]


def _get_config():
    from config import GEMINI_API_KEY, GEMINI_MODEL
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY não configurada no .env")
    return GEMINI_API_KEY, GEMINI_MODEL


def _chamar_gemini(prompt, temperature=0.7, api_key=None, model_name=None):
    if api_key is None or model_name is None:
        api_key, model_name = _get_config()

    url = API_URL.format(model=model_name, key=api_key)
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": temperature, "maxOutputTokens": 8192},
        "safetySettings": SAFETY_SETTINGS
    }

    for tentativa in range(3):
        try:
            resp = requests.post(url, json=payload, timeout=120)

            if resp.status_code == 429:
                body = resp.text
                if 'PerDay' in body:
                    logger.error("  ⛔ Quota DIÁRIA da API Gemini esgotada!")
                    raise QuotaDiariaExcedida(body)
                espera = 30 * (tentativa + 1)
                logger.warning(f"  Rate limit (429), retentando em {espera}s...")
                time.sleep(espera)
                continue

            if resp.status_code != 200:
                if tentativa < 2:
                    espera = 6 * (tentativa + 1)
                    logger.warning(f"  Gemini HTTP {resp.status_code}, retentando em {espera}s...")
                    time.sleep(espera)
                    continue
                resp.raise_for_status()

            data = resp.json()
            candidates = data.get('candidates', [])
            if candidates:
                parts = candidates[0].get('content', {}).get('parts', [])
                if parts:
                    return parts[0].get('text', '')

            finish_reason = candidates[0].get('finishReason', 'unknown') if candidates else 'no_candidates'
            logger.warning(f"  Resposta sem texto (finishReason={finish_reason})")
            return None

        except QuotaDiariaExcedida:
            raise
        except requests.exceptions.Timeout:
            if tentativa < 2:
                logger.warning(f"  Timeout na tentativa {tentativa+1}, retentando...")
                time.sleep(6 * (tentativa + 1))
                continue
            raise
        except Exception as e:
            if tentativa < 2:
                espera = 6 * (tentativa + 1)
                logger.warning(f"  Gemini tentativa {tentativa+1} falhou: {e}, retentando em {espera}s...")
                time.sleep(espera)
                continue
            raise

    return None


def reescrever_noticia(noticia, model=None):
    from config import PROMPT_REESCRITA

    api_key, model_name = _get_config()
    titulo = noticia.get('titulo', '')
    texto = noticia.get('texto', '')
    if len(texto) < 20:
        texto = titulo

    prompt = PROMPT_REESCRITA.format(titulo=titulo, texto=texto[:1500])
    if noticia.get('idioma') == 'en':
        prompt = (
            "ATENÇÃO: A notícia abaixo está em INGLÊS. Traduza para PORTUGUÊS BRASILEIRO "
            "antes de reescrever. O resultado final deve estar 100% em português.\n\n" + prompt
        )

    try:
        texto_resp = _chamar_gemini(prompt, temperature=0.7, api_key=api_key, model_name=model_name)
        resultado = _parse_json_response(texto_resp)
        if resultado and resultado.get('rejeitar'):
            noticia['rejeitada_ia'] = True
            noticia['ia_processada'] = False
            return noticia
        if resultado and resultado.get('titulo') and resultado.get('resumo'):
            noticia['titulo_original'] = noticia['titulo']
            noticia['titulo'] = resultado['titulo'][:100]
            noticia['resumo'] = resultado['resumo'][:300]
            noticia['ia_processada'] = True
        else:
            noticia['resumo'] = texto[:300] if texto else titulo
            noticia['ia_processada'] = False
    except QuotaDiariaExcedida:
        raise
    except Exception as e:
        logger.error(f"  Erro IA ao reescrever: {e}")
        noticia['resumo'] = texto[:300] if texto else titulo
        noticia['ia_processada'] = False
    return noticia


def processar_lote(noticias, model=None):
    total = len(noticias)
    logger.info(f"Processando {total} notícias com Gemini...")
    quota_esgotada = False
    for i, noticia in enumerate(noticias):
        if quota_esgotada:
            noticia['resumo'] = noticia.get('texto', noticia.get('titulo', ''))[:300]
            noticia['ia_processada'] = False
            continue
        logger.info(f"  [{i+1}/{total}] {noticia.get('titulo', '')[:50]}...")
        try:
            reescrever_noticia(noticia)
        except QuotaDiariaExcedida:
            quota_esgotada = True
            noticia['resumo'] = noticia.get('texto', noticia.get('titulo', ''))[:300]
            noticia['ia_processada'] = False
            continue
        time.sleep(1)
    processadas = sum(1 for n in noticias if n.get('ia_processada'))
    rejeitadas = sum(1 for n in noticias if n.get('rejeitada_ia'))
    logger.info(f"IA processou {processadas}/{total} notícias, rejeitou {rejeitadas}")
    return [n for n in noticias if not n.get('rejeitada_ia')]


def gerar_breaking_news(noticias, model=None):
    from config import PROMPT_BREAKING
    api_key, model_name = _get_config()
    top_noticias = sorted(noticias, key=lambda n: n.get('score', 0), reverse=True)[:6]
    resumo_noticias = '\n'.join(f"- {n.get('titulo', '')} ({n.get('fonte', '')})" for n in top_noticias)
    prompt = PROMPT_BREAKING.format(noticias=resumo_noticias)
    try:
        texto_resp = _chamar_gemini(prompt, temperature=0.8, api_key=api_key, model_name=model_name)
        resultado = _parse_json_response(texto_resp)
        if resultado and resultado.get('breaking'):
            return resultado['breaking'][:3]
    except Exception as e:
        logger.error(f"Erro IA breaking news: {e}")
    prefixos = ['URGENTE:', 'AGORA:', 'ÚLTIMA HORA:']
    return [f"{prefixos[i]} {n.get('titulo', '')[:100]}" for i, n in enumerate(top_noticias[:3])]


def gerar_trending_topics(noticias, model=None):
    from config import PROMPT_TRENDING
    api_key, model_name = _get_config()
    resumo = '\n'.join(f"- {n.get('titulo', '')} [{n.get('categoria', '')}]" for n in noticias[:12])
    prompt = PROMPT_TRENDING.format(noticias=resumo)
    try:
        texto_resp = _chamar_gemini(prompt, temperature=0.9, api_key=api_key, model_name=model_name)
        resultado = _parse_json_response(texto_resp)
        if resultado and resultado.get('trending'):
            return resultado['trending'][:6]
    except Exception as e:
        logger.error(f"Erro IA trending topics: {e}")
    return ['#RJNotícias', '#RioDeJaneiro', '#Brasil', '#Carioca', '#Política', '#Esportes']


def _parse_json_response(text):
    if not text:
        return None
    text = text.strip()
    code_block = re.search(r'```(?:json)?\s*\n?(.*?)\n?\s*```', text, re.DOTALL)
    if code_block:
        text = code_block.group(1).strip()
    idx = text.find('{')
    if idx > 0:
        text = text[idx:]
    idx = text.rfind('}')
    if idx >= 0:
        text = text[:idx + 1]
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        match = re.search(r'\{.*\}', text, re.DOTALL)
        if match:
            try:
                return json.loads(match.group(0))
            except json.JSONDecodeError:
                pass
        logger.warning(f"Não foi possível parsear JSON da IA: {text[:200]}")
        return None
