"""
GMAX NOTÍCIAS — Utilitários HTTP com retry e backoff
"""

import requests
import time
import logging

logger = logging.getLogger('gmaxnoticias.http')

HEADERS_PADRAO = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
}


def requisicao_com_retry(url, max_tentativas=3, timeout=15, headers=None, params=None, **kwargs):
    if headers is None:
        headers = HEADERS_PADRAO.copy()

    for tentativa in range(max_tentativas):
        try:
            resp = requests.get(url, headers=headers, timeout=timeout, params=params, **kwargs)

            if resp.status_code == 429:
                espera = min(30, 5 * (tentativa + 1))
                logger.warning(f"Rate limit (429) em {url}, aguardando {espera}s...")
                time.sleep(espera)
                continue

            if resp.status_code >= 500:
                espera = 3 * (tentativa + 1)
                logger.warning(f"Erro {resp.status_code} em {url}, retentando em {espera}s...")
                time.sleep(espera)
                continue

            return resp

        except requests.exceptions.Timeout:
            logger.warning(f"Timeout em {url} (tentativa {tentativa+1}/{max_tentativas})")
            time.sleep(2)
        except requests.exceptions.ConnectionError:
            logger.warning(f"Erro de conexão em {url} (tentativa {tentativa+1}/{max_tentativas})")
            time.sleep(3)
        except Exception as e:
            logger.error(f"Erro inesperado em {url}: {e}")
            break

    logger.error(f"Falha ao acessar {url} após {max_tentativas} tentativas")
    return None
