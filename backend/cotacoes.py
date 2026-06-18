"""
GMAX NOTÍCIAS — Cotações em Tempo Real
Busca câmbio (AwesomeAPI), commodities (yfinance), e criptomoedas
"""

import requests
import logging
from http_utils import requisicao_com_retry

logger = logging.getLogger('gmaxnoticias.cotacoes')

TIMEOUT = 10


def buscar_cotacoes():
    logger.info("Buscando cotações...")
    cotacoes = []

    cambio = _buscar_cambio()
    cotacoes.extend(cambio)

    commodities = _buscar_commodities()
    cotacoes.extend(commodities)

    cripto = _buscar_cripto()
    cotacoes.extend(cripto)

    logger.info(f"Total: {len(cotacoes)} cotações obtidas")
    return cotacoes


def _buscar_cambio():
    cotacoes = []
    pares = {
        'USD-BRL': {'nome': 'Dólar', 'icone': 'attach_money'},
        'EUR-BRL': {'nome': 'Euro', 'icone': 'euro'},
    }

    try:
        moedas = ','.join(pares.keys())
        resp = requisicao_com_retry(f'https://economia.awesomeapi.com.br/json/last/{moedas}', timeout=TIMEOUT)
        if not resp:
            return cotacoes
        resp.raise_for_status()
        data = resp.json()

        for par, info in pares.items():
            chave = par.replace('-', '')
            if chave in data:
                dado = data[chave]
                valor = float(dado.get('bid', 0))
                variacao = float(dado.get('pctChange', 0))

                cotacoes.append({
                    'nome': info['nome'],
                    'icone': info['icone'],
                    'valor': f'R$ {valor:.2f}',
                    'variacao': f'{variacao:+.1f}%',
                    'direcao': 'up' if variacao >= 0 else 'down'
                })

    except Exception as e:
        logger.error(f"Erro câmbio: {e}")
        cotacoes.extend([
            {'nome': 'Dólar', 'icone': 'attach_money', 'valor': 'R$ --', 'variacao': '0.0%', 'direcao': 'up'},
            {'nome': 'Euro', 'icone': 'euro', 'valor': 'R$ --', 'variacao': '0.0%', 'direcao': 'up'}
        ])

    return cotacoes


def _buscar_commodities():
    cotacoes = []
    dolar_valor = 5.50

    tickers = {
        '^BVSP': {'nome': 'Ibovespa', 'icone': 'show_chart', 'prefixo': '', 'decimais': 0},
        'ZS=F': {'nome': 'Soja (sc)', 'icone': 'eco', 'prefixo': 'R$ ', 'decimais': 2, 'converter_brl': True, 'fator_saca': 2.2046 / 100},
        'ZC=F': {'nome': 'Milho (sc)', 'icone': 'grass', 'prefixo': 'R$ ', 'decimais': 2, 'converter_brl': True, 'fator_saca': 2.362 / 100},
        'KC=F': {'nome': 'Café (sc)', 'icone': 'coffee', 'prefixo': 'R$ ', 'decimais': 0, 'converter_brl': True, 'fator_saca': 132.28 / 100},
        'CT=F': {'nome': 'Algodão (@)', 'icone': 'agriculture', 'prefixo': 'R$ ', 'decimais': 2, 'converter_brl': True, 'fator_saca': 33.07 / 100},
        'ZW=F': {'nome': 'Trigo (sc)', 'icone': 'bakery_dining', 'prefixo': 'R$ ', 'decimais': 0, 'converter_brl': True, 'fator_saca': 2.2046 / 100},
        'GC=F': {'nome': 'Ouro (g)', 'icone': 'diamond', 'prefixo': 'R$ ', 'decimais': 2, 'converter_brl': True, 'fator_ouro': 1 / 31.1035},
        'PETR4.SA': {'nome': 'Petrobras', 'icone': 'oil_barrel', 'prefixo': 'R$ ', 'decimais': 2},
        'VALE3.SA': {'nome': 'Vale', 'icone': 'landscape', 'prefixo': 'R$ ', 'decimais': 2},
        'ITUB4.SA': {'nome': 'Itaú', 'icone': 'account_balance', 'prefixo': 'R$ ', 'decimais': 2},
        'BBDC4.SA': {'nome': 'Bradesco', 'icone': 'account_balance', 'prefixo': 'R$ ', 'decimais': 2},
        'BBAS3.SA': {'nome': 'Banco do Brasil', 'icone': 'account_balance', 'prefixo': 'R$ ', 'decimais': 2},
        '^GSPC': {'nome': 'S&P 500', 'icone': 'public', 'prefixo': '', 'decimais': 0},
        '^DJI': {'nome': 'Dow Jones', 'icone': 'public', 'prefixo': '', 'decimais': 0},
    }

    try:
        import yfinance as yf

        dolar = 5.50
        try:
            usd = yf.Ticker('BRL=X')
            hist = usd.history(period='1d')
            if not hist.empty:
                dolar = hist['Close'].iloc[-1]
        except Exception:
            pass
        dolar_valor = dolar

        for symbol, info in tickers.items():
            try:
                ticker = yf.Ticker(symbol)
                hist = ticker.history(period='2d')

                if hist.empty or len(hist) < 1:
                    continue

                preco_atual = hist['Close'].iloc[-1]
                preco_anterior = hist['Close'].iloc[-2] if len(hist) >= 2 else preco_atual
                variacao = ((preco_atual - preco_anterior) / preco_anterior) * 100 if preco_anterior else 0

                if info.get('converter_brl'):
                    if info.get('fator_ouro'):
                        preco_atual = preco_atual * dolar * info['fator_ouro']
                    elif info.get('fator_saca'):
                        preco_atual = preco_atual * info['fator_saca'] * dolar
                    else:
                        preco_atual *= dolar

                if info['decimais'] == 0:
                    if preco_atual > 10000:
                        valor = f"{info['prefixo']}{preco_atual:,.0f}".replace(',', '.')
                    else:
                        valor = f"{info['prefixo']}{preco_atual:.0f}"
                else:
                    valor = f"{info['prefixo']}{preco_atual:.{info['decimais']}f}"

                cotacoes.append({
                    'nome': info['nome'],
                    'icone': info['icone'],
                    'valor': valor,
                    'variacao': f'{variacao:+.1f}%',
                    'direcao': 'up' if variacao >= 0 else 'down'
                })

            except Exception as e:
                logger.warning(f"Erro ticker {symbol}: {e}")

    except ImportError:
        logger.warning("yfinance não instalado")
        cotacoes.extend([
            {'nome': 'Soja (sc)', 'icone': 'eco', 'valor': 'R$ --', 'variacao': '0.0%', 'direcao': 'up'},
            {'nome': 'Milho (sc)', 'icone': 'grass', 'valor': 'R$ --', 'variacao': '0.0%', 'direcao': 'up'},
            {'nome': 'Ibovespa', 'icone': 'show_chart', 'valor': '--', 'variacao': '0.0%', 'direcao': 'up'},
        ])

    boi = _buscar_boi_gordo(dolar_valor)
    if boi:
        cotacoes.append(boi)

    arroz = _buscar_arroz(dolar_valor)
    if arroz:
        cotacoes.append(arroz)

    return cotacoes


def _buscar_boi_gordo(dolar=5.50):
    try:
        import yfinance as yf
        ticker = yf.Ticker('LC=F')
        hist = ticker.history(period='2d')
        if not hist.empty:
            preco = hist['Close'].iloc[-1]
            preco_ant = hist['Close'].iloc[-2] if len(hist) >= 2 else preco
            var = ((preco - preco_ant) / preco_ant) * 100 if preco_ant else 0
            preco_arroba = preco * 33.07 / 100 * dolar
            return {
                'nome': 'Boi Gordo (@)',
                'icone': 'pets',
                'valor': f'R$ {preco_arroba:.2f}',
                'variacao': f'{var:+.1f}%',
                'direcao': 'up' if var >= 0 else 'down'
            }
    except Exception:
        pass

    return {'nome': 'Boi Gordo (@)', 'icone': 'pets', 'valor': 'R$ --', 'variacao': '0.0%', 'direcao': 'up'}


def _buscar_arroz(dolar=5.50):
    try:
        import yfinance as yf
        ticker = yf.Ticker('ZR=F')
        hist = ticker.history(period='2d')
        if not hist.empty:
            preco = hist['Close'].iloc[-1]
            preco_ant = hist['Close'].iloc[-2] if len(hist) >= 2 else preco
            var = ((preco - preco_ant) / preco_ant) * 100 if preco_ant else 0
            preco_saca = preco * 1.3228 * dolar
            return {
                'nome': 'Arroz (sc)',
                'icone': 'rice_bowl',
                'valor': f'R$ {preco_saca:.2f}',
                'variacao': f'{var:+.1f}%',
                'direcao': 'up' if var >= 0 else 'down'
            }
    except Exception:
        pass

    return {'nome': 'Arroz (sc)', 'icone': 'rice_bowl', 'valor': 'R$ --', 'variacao': '0.0%', 'direcao': 'up'}


def _buscar_cripto():
    cotacoes = []

    try:
        resp = requisicao_com_retry('https://economia.awesomeapi.com.br/json/last/BTC-BRL', timeout=TIMEOUT)
        if not resp:
            return cotacoes
        resp.raise_for_status()
        data = resp.json()

        if 'BTCBRL' in data:
            dado = data['BTCBRL']
            valor = float(dado.get('bid', 0))
            variacao = float(dado.get('pctChange', 0))

            cotacoes.append({
                'nome': 'Bitcoin',
                'icone': 'currency_bitcoin',
                'valor': f'R$ {valor:,.0f}'.replace(',', '.'),
                'variacao': f'{variacao:+.1f}%',
                'direcao': 'up' if variacao >= 0 else 'down'
            })

    except Exception as e:
        logger.error(f"Erro cripto: {e}")
        cotacoes.append({'nome': 'Bitcoin', 'icone': 'currency_bitcoin', 'valor': 'R$ --', 'variacao': '0.0%', 'direcao': 'up'})

    return cotacoes
