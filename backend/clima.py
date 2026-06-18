"""
GMAX NOTÍCIAS — Clima em Tempo Real
Busca dados climáticos via OpenWeatherMap para São Paulo-SP
"""

import logging
from http_utils import requisicao_com_retry

logger = logging.getLogger('gmaxnoticias.clima')

TRADUCAO_CONDICAO = {
    'clear sky': 'Céu Limpo', 'few clouds': 'Poucas Nuvens',
    'scattered clouds': 'Nuvens Dispersas', 'broken clouds': 'Nublado',
    'overcast clouds': 'Encoberto', 'shower rain': 'Chuva Forte',
    'rain': 'Chuva', 'light rain': 'Chuva Leve', 'moderate rain': 'Chuva Moderada',
    'heavy intensity rain': 'Chuva Intensa', 'thunderstorm': 'Tempestade',
    'thunderstorm with rain': 'Tempestade com Chuva', 'snow': 'Neve',
    'mist': 'Névoa', 'fog': 'Neblina', 'haze': 'Bruma', 'drizzle': 'Garoa',
}

ICONE_CONDICAO = {
    'céu limpo': 'wb_sunny', 'poucas nuvens': 'partly_cloudy_day',
    'nuvens dispersas': 'cloud', 'nublado': 'cloud', 'encoberto': 'cloud',
    'chuva forte': 'rainy', 'chuva': 'rainy', 'chuva leve': 'grain',
    'chuva moderada': 'rainy', 'chuva intensa': 'thunderstorm',
    'tempestade': 'thunderstorm', 'tempestade com chuva': 'thunderstorm',
    'neve': 'ac_unit', 'névoa': 'foggy', 'neblina': 'foggy',
    'bruma': 'foggy', 'garoa': 'grain',
}


def buscar_clima():
    from config import OPENWEATHERMAP_KEY, CIDADE_COORDS

    if not OPENWEATHERMAP_KEY:
        return _clima_fallback()

    try:
        url = (
            f'https://api.openweathermap.org/data/2.5/weather'
            f'?lat={CIDADE_COORDS["lat"]}&lon={CIDADE_COORDS["lon"]}'
            f'&units=metric&lang=pt_br&appid={OPENWEATHERMAP_KEY}'
        )
        resp = requisicao_com_retry(url, timeout=10)
        if not resp:
            return _clima_fallback()
        resp.raise_for_status()
        data = resp.json()

        temp = round(data.get('main', {}).get('temp', 22))
        temp_min = round(data.get('main', {}).get('temp_min', temp - 3))
        temp_max = round(data.get('main', {}).get('temp_max', temp + 3))
        umidade = data.get('main', {}).get('humidity', 70)

        descricao_en = data.get('weather', [{}])[0].get('description', 'clear sky')
        descricao_pt = data.get('weather', [{}])[0].get('description', '')
        if not descricao_pt or descricao_pt == descricao_en:
            descricao_pt = TRADUCAO_CONDICAO.get(descricao_en.lower(), descricao_en.title())
        descricao_pt = descricao_pt.title()
        icone = ICONE_CONDICAO.get(descricao_pt.lower(), 'wb_sunny')

        vento = data.get('wind', {}).get('speed', 0)

        clima = {
            'cidade': 'São Paulo',
            'estado': 'SP',
            'temperatura': temp,
            'temp_min': temp_min,
            'temp_max': temp_max,
            'umidade': umidade,
            'condicao': descricao_pt,
            'icone': icone,
            'vento': round(vento * 3.6, 1),
        }
        logger.info(f"Clima São Paulo: {temp}°C, {descricao_pt}")
        return clima

    except Exception as e:
        logger.error(f"Erro ao buscar clima: {e}")
        return _clima_fallback()


def _clima_fallback():
    return {
        'cidade': 'São Paulo', 'estado': 'SP',
        'temperatura': 22, 'temp_min': 16, 'temp_max': 27,
        'umidade': 70, 'condicao': 'Parcialmente Nublado',
        'icone': 'partly_cloudy_day', 'vento': 12.0,
    }
