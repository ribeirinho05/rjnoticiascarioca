"""
RJ NOTÍCIAS CARIOCA — Configuração Central do Backend
Portal de notícias do Rio de Janeiro e região metropolitana
"""

import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')
NEWSAPI_KEY = os.getenv('NEWSAPI_KEY', '')
PEXELS_API_KEY = os.getenv('PEXELS_API_KEY', '')
OPENWEATHERMAP_KEY = os.getenv('OPENWEATHERMAP_KEY', '')

GEMINI_MODEL = 'gemini-2.5-flash'

CIDADE = 'Rio de Janeiro'
ESTADO = 'RJ'

FONTES_SP = {
    'prefeitura': {
        'nome': 'Prefeitura do Rio de Janeiro',
        'url_lista': 'https://prefeitura.rio/noticias/',
        'url_base': 'https://prefeitura.rio',
        'prioridade': 100
    },
    'camara': {
        'nome': 'Câmara Municipal do Rio',
        'url_lista': 'https://www.camara.rj.gov.br/noticias',
        'url_base': 'https://www.camara.rj.gov.br',
        'prioridade': 95
    },
    'alerj': {
        'nome': 'Assembleia Legislativa RJ',
        'url_lista': 'https://www.alerj.rj.gov.br/Visualizar/Noticia/',
        'url_base': 'https://www.alerj.rj.gov.br',
        'prioridade': 90
    },
    'governo': {
        'nome': 'Governo do Estado do RJ',
        'url_lista': 'https://www.rj.gov.br/noticias/',
        'url_base': 'https://www.rj.gov.br',
        'prioridade': 90
    },
}

FONTES_RSS = [
    {'nome': 'G1', 'url': 'https://g1.globo.com/rss/g1/', 'categoria_forcada': None},
    {'nome': 'G1 Rio de Janeiro', 'url': 'https://g1.globo.com/rss/g1/rio-de-janeiro/', 'categoria_forcada': 'cidade'},
    {'nome': 'UOL Notícias', 'url': 'https://rss.uol.com.br/feed/noticias.xml', 'categoria_forcada': None},
    {'nome': 'Folha de S.Paulo', 'url': 'https://feeds.folha.uol.com.br/emcimadahora/rss091.xml', 'categoria_forcada': None},
    {'nome': 'Jornal Nacional', 'url': 'https://g1.globo.com/rss/g1/jornal-nacional/', 'categoria_forcada': 'brasil'},
    {'nome': 'CNN Brasil', 'url': 'https://www.cnnbrasil.com.br/feed/', 'categoria_forcada': None},
    {'nome': 'CNN International', 'url': 'http://rss.cnn.com/rss/edition.rss', 'categoria_forcada': 'internacional'},
    {'nome': 'Fox News', 'url': 'https://moxie.foxnews.com/google-publisher/latest.xml', 'categoria_forcada': 'internacional'},
    {'nome': 'New York Times World', 'url': 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml', 'categoria_forcada': 'internacional'},
    {'nome': 'G1 Mundo', 'url': 'https://g1.globo.com/rss/g1/mundo/', 'categoria_forcada': 'internacional'},
    {'nome': 'O Antagonista', 'url': 'https://oantagonista.com.br/feed/', 'categoria_forcada': None},
    {'nome': 'Bloomberg', 'url': 'https://feeds.bloomberg.com/markets/news.rss', 'categoria_forcada': 'economia'},
    {'nome': 'GE (Globo Esporte)', 'url': 'https://ge.globo.com/rss/ge/', 'categoria_forcada': 'esportes'},
    {'nome': 'O Globo Rio', 'url': 'https://oglobo.globo.com/rss/rio/', 'categoria_forcada': 'cidade'},
    {'nome': 'R7 Notícias', 'url': 'https://noticias.r7.com/feed.xml', 'categoria_forcada': None},
    {'nome': 'Band News', 'url': 'https://www.band.uol.com.br/rss/noticias.xml', 'categoria_forcada': None},
    {'nome': 'Metrópoles', 'url': 'https://www.metropoles.com/feed', 'categoria_forcada': None},
    {'nome': 'Valor Econômico', 'url': 'https://pox.globo.com/rss/valor/', 'categoria_forcada': 'economia'},
    {'nome': 'Agência Brasil', 'url': 'https://agenciabrasil.ebc.com.br/rss/ultimasnoticias/feed.xml', 'categoria_forcada': None},
    {'nome': 'InfoMoney', 'url': 'https://www.infomoney.com.br/feed/', 'categoria_forcada': 'economia'},
]

NEWSAPI_QUERIES = ['Rio de Janeiro', 'governo RJ', 'economia Brasil']
NEWSAPI_DOMAINS = 'g1.globo.com,uol.com.br,oglobo.globo.com,extra.globo.com'

GOOGLE_NEWS_QUERIES = ['Rio+de+Janeiro+RJ', 'Estado+Rio+Janeiro', 'Brasil+hoje']

CATEGORIAS = {
    'politica': {
        'nome': 'Política',
        'cor': '#D62828',
        'icone': 'account_balance',
        'gradient': 'linear-gradient(135deg, #D62828, #B71C1C)',
        'palavras_chave': ['governo', 'governador', 'prefeito', 'prefeitura', 'câmara', 'vereador',
                           'deputado', 'senador', 'eleição', 'partido', 'lula', 'bolsonaro',
                           'congresso', 'senado', 'stf', 'paes', 'castro', 'alerj',
                           'assembleia', 'legislativo', 'projeto de lei', 'votação',
                           'ministro', 'ministério', 'reforma', 'político', 'política']
    },
    'economia': {
        'nome': 'Economia',
        'cor': '#2B9348',
        'icone': 'trending_up',
        'gradient': 'linear-gradient(135deg, #2B9348, #55A630)',
        'palavras_chave': ['economia', 'mercado', 'bolsa', 'ibovespa', 'dólar', 'inflação',
                           'pib', 'juros', 'selic', 'investimento', 'emprego', 'desemprego',
                           'porto', 'petrobras', 'vale', 'banco', 'crédito',
                           'exportação', 'importação', 'indústria', 'comércio', 'turismo']
    },
    'cidade': {
        'nome': 'Rio de Janeiro',
        'cor': '#0077B6',
        'icone': 'location_city',
        'gradient': 'linear-gradient(135deg, #0077B6, #023E8A)',
        'palavras_chave': ['rio de janeiro', 'carioca', 'zona sul', 'zona norte', 'zona oeste',
                           'copacabana', 'ipanema', 'leblon', 'barra', 'tijuca', 'méier',
                           'maracanã', 'centro', 'niterói', 'baixada', 'nova iguaçu',
                           'duque de caxias', 'são gonçalo', 'metrô', 'brt', 'supervia',
                           'obra', 'infraestrutura', 'trânsito', 'transporte', 'favela',
                           'comunidade', 'maré', 'rocinha', 'alemão']
    },
    'esportes': {
        'nome': 'Esportes',
        'cor': '#FB8500',
        'icone': 'sports_soccer',
        'gradient': 'linear-gradient(135deg, #FB8500, #FFB703)',
        'palavras_chave': ['futebol', 'flamengo', 'vasco', 'fluminense', 'botafogo',
                           'brasileirão', 'libertadores', 'copa', 'gol', 'campeonato',
                           'maracanã', 'são januário', 'nilton santos', 'engenhão',
                           'neymar', 'surf', 'vôlei de praia', 'olimpíadas',
                           'basquete', 'vôlei', 'tênis', 'mma', 'ufc', 'jiu-jitsu']
    },
    'brasil': {
        'nome': 'Brasil',
        'cor': '#6A4C93',
        'icone': 'flag',
        'gradient': 'linear-gradient(135deg, #6A4C93, #8B5FBF)',
        'palavras_chave': ['brasil', 'brasileiro', 'federal', 'nacional', 'país',
                           'brasília', 'congresso', 'governo federal', 'sus', 'educação',
                           'saúde', 'segurança', 'violência', 'crime', 'polícia',
                           'incêndio', 'acidente', 'tragédia', 'operação']
    },
    'internacional': {
        'nome': 'Mundo',
        'cor': '#457B9D',
        'icone': 'public',
        'gradient': 'linear-gradient(135deg, #457B9D, #1D3557)',
        'palavras_chave': ['eua', 'estados unidos', 'trump', 'biden', 'china', 'rússia',
                           'ucrânia', 'europa', 'putin', 'guerra', 'israel', 'gaza',
                           'onu', 'otan', 'mundial', 'global', 'internacional',
                           'oriente médio', 'áfrica', 'ásia']
    },
    'eventos': {
        'nome': 'Eventos',
        'cor': '#E76F51',
        'icone': 'event',
        'gradient': 'linear-gradient(135deg, #E76F51, #F4A261)',
        'palavras_chave': ['evento', 'show', 'festival', 'rock in rio', 'carnaval',
                           'réveillon', 'ano novo', 'teatro', 'cinema', 'museu',
                           'exposição', 'cultura', 'ccbb', 'mam', 'theatro municipal',
                           'lapa', 'samba', 'feira', 'congresso', 'inauguração']
    },
}

CANAIS_YOUTUBE = [
    {'nome': 'Band Jornalismo', 'channel_id': 'UCMNi2NaFERhTpEpLPAyRRdQ', 'url': 'https://www.youtube.com/@BandJornalismo', 'prioridade': 100},
    {'nome': 'CNN Brasil', 'channel_id': 'UCbBr1ZjjQxTiMonument-KIPA', 'url': 'https://www.youtube.com/@CNNbrasil', 'prioridade': 95},
    {'nome': 'Jovem Pan News', 'channel_id': 'UCzXTml0sPRmwHQkPsPZ4k1Q', 'url': 'https://www.youtube.com/@JovemPanNews', 'prioridade': 90},
    {'nome': 'SBT News', 'channel_id': 'UC-U1fF8sLzwdHSpgnSQR7OA', 'url': 'https://www.youtube.com/@SBTNews', 'prioridade': 85},
    {'nome': 'GloboNews', 'channel_id': 'UCFi5EjsIR0CCoY0b5C0SYvQ', 'url': 'https://www.youtube.com/@GloboNews', 'prioridade': 80},
]
QUANTIDADE_VIDEOS = 8
QUANTIDADE_NOTICIAS = 140

CIDADE_COORDS = {'lat': -22.9068, 'lon': -43.1729}

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CAMINHO_JS = os.path.normpath(os.path.join(BASE_DIR, '..', 'js', 'news-data.js'))
CAMINHO_LOG = os.path.join(BASE_DIR, 'logs')

HORARIOS_ATUALIZACAO = ['08:00']
DIAS_ATUALIZACAO = ['monday', 'thursday']

PROMPT_REESCRITA = """Você é um editor do portal RJ NOTÍCIAS CARIOCA (Rio de Janeiro).
Reescreva a notícia abaixo com linguagem jornalística profissional em português brasileiro.

REGRAS:
1. Título: máximo 90 caracteres, impactante e informativo
2. Resumo: 2-3 frases, máximo 280 caracteres, objetivo e claro
3. NÃO invente informações
4. NÃO use aspas no título
5. Se a notícia for propaganda/publicidade, retorne {{"rejeitar": true}}

Título original: {titulo}
Texto: {texto}

Responda APENAS em JSON: {{"titulo": "...", "resumo": "..."}}"""

PROMPT_BREAKING = """Analise as notícias mais importantes do Rio de Janeiro e gere 3 chamadas de URGENTE.
Cada chamada deve ter no máximo 120 caracteres e começar com URGENTE:, AGORA: ou ÚLTIMA HORA:.

Notícias:
{noticias}

Responda em JSON: {{"breaking": ["URGENTE: ...", "AGORA: ...", "ÚLTIMA HORA: ..."]}}"""

PROMPT_TRENDING = """Com base nas notícias abaixo do Rio de Janeiro, gere 6 trending topics (hashtags).
Inclua sempre #RJNotícias e #RioDeJaneiro.

Notícias:
{noticias}

Responda em JSON: {{"trending": ["#RJNotícias", "#RioDeJaneiro", ...]}}"""
