/* GMAX NOTÍCIAS — Base de Dados v2.0
   Atualizado: 18/06/2026 09:59 */

const CATEGORIAS = {
    politica: { nome: 'Política', cor: '#D62828', icone: 'account_balance', gradient: 'linear-gradient(135deg, #D62828, #B71C1C)' },
    economia: { nome: 'Economia', cor: '#2B9348', icone: 'trending_up', gradient: 'linear-gradient(135deg, #2B9348, #55A630)' },
    cidade: { nome: 'Rio de Janeiro', cor: '#0077B6', icone: 'location_city', gradient: 'linear-gradient(135deg, #0077B6, #023E8A)' },
    esportes: { nome: 'Esportes', cor: '#FB8500', icone: 'sports_soccer', gradient: 'linear-gradient(135deg, #FB8500, #FFB703)' },
    brasil: { nome: 'Brasil', cor: '#6A4C93', icone: 'flag', gradient: 'linear-gradient(135deg, #6A4C93, #8B5FBF)' },
    internacional: { nome: 'Mundo', cor: '#457B9D', icone: 'public', gradient: 'linear-gradient(135deg, #457B9D, #1D3557)' },
    eventos: { nome: 'Eventos', cor: '#E76F51', icone: 'event', gradient: 'linear-gradient(135deg, #E76F51, #F4A261)' },
};

const noticias = [
    {
        id: 1, categoria: 'politica',
        destaque: true,
        titulo: 'PF deflagra nova fase da Operação Compliance Zero com foco no Banco Master e Daniel Vorcaro',
        resumo: 'A Polícia Federal deflagrou nesta quinta-feira (18) uma nova fase da Operação Compliance Zero. A ação cumpre 18 mandados de busca e apreensão, investigando supostas irregularidades envolvendo Daniel Vorcaro e o Banco Master.',
        imagem: 'https://images.pexels.com/photos/10466288/pexels-photo-10466288.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'José Marques', tempo: '1 min atrás'
    },
    {
        id: 2, categoria: 'cidade',
        destaque: true,
        titulo: 'Incêndio em Paraisópolis destrói 100 moradias e afeta 50 famílias em São Paulo',
        resumo: 'Um incêndio de grandes proporções atingiu a comunidade de Paraisópolis, zona sul de São Paulo, na madrugada desta quinta-feira (18), destruindo cerca de 100 moradias. Cinquenta famílias foram afetadas, embora não haja registro de vítimas. As chamas foram controladas e a Defesa Civil presta apoio aos',
        imagem: 'https://agenciabrasil.ebc.com.br/ebc.png?id=1693814&o=rss',
        autor: 'Agência Brasil', tempo: 'agora'
    },
    {
        id: 3, categoria: 'brasil',
        destaque: true,
        titulo: 'PF investiga Banco Master em Operação Compliance Zero por fraude bilionária',
        resumo: 'A Polícia Federal deflagrou a Operação Compliance Zero, iniciada em novembro de 2025, para apurar um esquema bilionário de fraudes financeiras envolvendo o Banco Master. A instituição é suspeita de usar o mercado de capitais para desviar recursos e mascarar prejuízos.',
        imagem: 'https://f.i.uol.com.br/fotografia/2026/06/18/17817843146a33defa98db5_1781784314_3x2_rt.jpg',
        autor: '', tempo: 'agora'
    },
    {
        id: 4, categoria: 'brasil',
        destaque: true,
        titulo: 'Frente Fria Intensa: São Paulo Prepara-se para Mínima de 8°C nesta Quinta-feira',
        resumo: 'Uma frente fria se intensifica sobre o estado de São Paulo, prometendo temperaturas significativamente baixas. A capital paulista deve registrar uma mínima de 8°C nesta quinta-feira, exigindo atenção dos moradores.',
        imagem: 'https://images.pexels.com/photos/23106805/pexels-photo-23106805.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'Redação', tempo: '6h atrás'
    },
    {
        id: 5, categoria: 'brasil',
        destaque: true,
        titulo: 'Selo Arte: São Paulo alcança liderança nacional em certificação artesanal',
        resumo: 'São Paulo conquistou a liderança nacional em concessão do Selo Arte, certificação que valoriza produtos artesanais. O estado agora possui o maior número de produtores com este reconhecimento, impulsionando a qualidade e a comercialização de itens únicos.',
        imagem: 'https://images.pexels.com/photos/18078285/pexels-photo-18078285.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'Redação', tempo: 'agora'
    },
    {
        id: 6, categoria: 'economia',
        titulo: 'Funcionários são presos por furto de produtos em supermercado atacadista de Marília',
        resumo: 'Dois funcionários de um supermercado atacadista em Marília (SP) foram presos nesta quarta-feira (17) suspeitos de furtar produtos do local. A Polícia Militar encontrou mercadorias no veículo de um dos suspeitos e na residência da colega, que confessou o crime. Ambos foram autuados em flagrante por f',
        imagem: 'https://s2-g1.glbimg.com/hPX5So_FN9rrCCitk8ov0SZgyKU=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/g/O/iuiC8tTvmoVDmnzyt1Yw/novo-projeto-3-.png',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 7, categoria: 'cidade',
        titulo: 'Maio mais seguro: Mortes no trânsito de São Paulo caem 10,1%',
        resumo: 'O estado de São Paulo registrou uma redução de 10,1% no número de mortes no trânsito durante o mês de maio. Os dados apontam para um período mais seguro nas vias paulistas, indicando uma tendência positiva na segurança viária.',
        imagem: 'https://images.pexels.com/photos/18340262/pexels-photo-18340262.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'Redação', tempo: '1d atrás'
    },
    {
        id: 8, categoria: 'brasil',
        titulo: 'Feminicida foragido é capturado em Paraty após trabalho de inteligência policial',
        resumo: 'João Paulo Costa da Silva, foragido da Justiça por feminicídio em Paraty, foi preso no município na última segunda-feira (15). A Polícia Civil o identificou e monitorou desde São Paulo até sua chegada, cumprindo o mandado de prisão. O crime ocorreu em março deste ano.',
        imagem: 'https://s2-g1.glbimg.com/4bGjpfc3FduLRvOk-g4TuctowY4=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/f/I/8eUmAyS3ePmkB9ng6gjg/whatsapp-image-2026-03-25-at-14.46.27.jpeg',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 9, categoria: 'brasil',
        titulo: 'Homem com tornozeleira é executado a tiros em Jaboatão; atirador preso em flagrante',
        resumo: 'Michael Batista Aquilino, 26, que usava tornozeleira eletrônica, foi executado a tiros na noite de quarta-feira (17) em Jaboatão dos Guararapes. O crime, ocorrido em frente a um curso técnico, foi flagrado por câmeras de segurança. O atirador, Mateus Ferreira dos Passos, 26, foi preso em flagrante p',
        imagem: 'https://s2-g1.glbimg.com/6oxn1vEeTwcnbLAloKS9VixC7pQ=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/n/h/vImom1SeqBOiRyCDoObg/tiroteio-grau-tecnico.png',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 10, categoria: 'brasil',
        titulo: 'Dois em estado gravíssimo após colisão na BR-354, em Minas Gerais',
        resumo: 'Dois motoristas ficaram em estado gravíssimo após um acidente entre carro e caminhonete na BR-354, em Bambuí, Minas Gerais, na quarta-feira (17). A colisão, que deixou outros dois feridos leves, interrompeu o tráfego por aproximadamente quatro horas.',
        imagem: 'https://s2-g1.glbimg.com/8JOE909YNRitxS1Dc-y5mW7IqxA=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/E/3/MnEB7vRnARgVtYfUWBUw/whatsapp-image-2026-06-18-at-09.34.05.jpeg',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 11, categoria: 'brasil',
        titulo: 'Ex-mulher de Zico Bacana e assessor de deputado são presos em operação contra o TCP no Rio',
        resumo: 'A Polícia Civil do RJ e o MPRJ prenderam a ex-mulher de Zico Bacana e um assessor do deputado Val Ceasa em Guadalupe, Zona Norte. A operação investiga a ligação de agentes públicos com o Terceiro Comando Puro (TCP), a segunda maior facção do Rio. Os detidos, que mantêm um relacionamento, foram preso',
        imagem: 'https://images.pexels.com/photos/30924493/pexels-photo-30924493.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 12, categoria: 'brasil',
        titulo: 'Curitiba: Caminhão dos Bombeiros sofre acidente a caminho de incêndio que destrói loja',
        resumo: 'Uma loja de roupas e calçados foi consumida por um incêndio nesta quinta-feira (18) em Curitiba. O caminhão do Corpo de Bombeiros, que levava 25 mil litros de água para combater as chamas, sofreu um acidente no trajeto, atrasando o atendimento. O fogo destruiu três andares do estabelecimento, exigin',
        imagem: 'https://s2-g1.glbimg.com/1DxKRT7k39lW8qV0wTZbzXpkn4M=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/s/4/Rf0wmHQYeRo75suRIJ4g/incendio7-1-.png',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 13, categoria: 'brasil',
        titulo: 'Megaoperação da Polícia Civil mira tráfico de drogas em Paracambi',
        resumo: 'A Polícia Civil deflagrou nesta quinta-feira (18) uma operação de grande porte contra o tráfico de drogas em Paracambi (RJ). Mais de 50 agentes participam da ação, que visa desarticular grupos criminosos envolvidos em crimes recentes na região. A operação segue em andamento, sem informações atualiza',
        imagem: 'https://s2-g1.glbimg.com/RIueu58vpBkv1i9xR9UXwIk6dqk=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/H/b/kNpsclSAGHY5Ej7JaBTQ/image-60-.jpg',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 14, categoria: 'eventos',
        titulo: 'Bombeiros do MA resgatam cavalo de fossa com técnica que usa água em Chapadinha',
        resumo: 'Um cavalo foi salvo de uma fossa no bairro Recanto dos Pássaros, em Chapadinha (MA), pelo 15º Batalhão de Bombeiros Militar em 12 de junho de 2026. Os militares empregaram uma técnica inovadora, utilizando água para elevar o nível da fossa e facilitar o resgate seguro do animal, que foi entregue aos',
        imagem: 'https://s2-g1.glbimg.com/LEvVOPv-zrtmyvP_3TeVZEeYxiQ=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/y/z/z1awBQQSuhNcVrvnDxIg/montagens-1920-x-1080-px-.png',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 15, categoria: 'brasil',
        titulo: 'Alerta de Frio: Defesa Civil de SP prevê queda acentuada de temperatura',
        resumo: 'A Defesa Civil do estado de São Paulo emitiu um alerta importante sobre a previsão de queda acentuada nas temperaturas em todo o território paulista. A agência recomenda que a população adote medidas preventivas para enfrentar o frio.',
        imagem: 'https://images.pexels.com/photos/17026750/pexels-photo-17026750.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'Redação', tempo: '9h atrás'
    },
    {
        id: 16, categoria: 'politica',
        titulo: 'Cuba flexibiliza economia: PCC aprova reformas para investimento e capital externo',
        resumo: 'O Partido Comunista de Cuba (PCC) aprovou um pacote de reformas econômicas nesta quarta-feira (17). As medidas visam abrir mais setores ao investimento privado, atrair capital de cubanos no exterior e reduzir a participação estatal na economia.',
        imagem: 'https://f.i.uol.com.br/fotografia/2026/06/18/17817885906a33efaecfa8c_1781788590_3x2_rt.jpg',
        autor: 'Lisandra Cots', tempo: 'agora'
    },
    {
        id: 17, categoria: 'politica',
        titulo: 'Emirados Árabes: Redes sociais proibidas para menores de 15 anos em medida pioneira',
        resumo: 'Os Emirados Árabes Unidos estabeleceram uma idade mínima de 15 anos para o uso de redes sociais. A nação se torna o primeiro país árabe a impor tal restrição, refletindo a crescente preocupação global com o impacto das plataformas online na infância e adolescência.',
        imagem: 'https://f.i.uol.com.br/fotografia/2026/06/18/17817860126a33e59c55452_1781786012_3x2_rt.jpg',
        autor: 'Jana Choukeir', tempo: 'agora'
    },
    {
        id: 18, categoria: 'politica',
        titulo: 'Quem é Jaques Wagner? Aliado de Lula, líder no Senado e investigado pela PF',
        resumo: 'O líder do governo Lula no Senado, Jaques Wagner, 75, é um dos aliados mais próximos do presidente e pré-candidato à reeleição. Ex-governador da Bahia, ele foi cogitado como presidenciável do PT em 2018, mas desistiu após uma operação policial em seu apartamento.',
        imagem: 'https://f.i.uol.com.br/fotografia/2026/06/18/17817844146a33df5e4f978_1781784414_3x2_rt.jpg',
        autor: '', tempo: 'agora'
    },
    {
        id: 19, categoria: 'politica',
        titulo: 'PF investiga Jaques Wagner por supostos repasses do Banco Master e apartamento em Salvador',
        resumo: 'A Polícia Federal apura suspeitas de que o senador Jaques Wagner (PT-BA), líder do governo Lula no Senado, tenha recebido pagamentos do Banco Master. A investigação inclui um apartamento de R$ 2,5 milhões em Salvador e repasses via empresa da esposa de seu enteado.',
        imagem: 'https://f.i.uol.com.br/fotografia/2026/06/18/17817813076a33d33b62f42_1781781307_3x2_rt.jpg',
        autor: 'José Marques', tempo: 'agora'
    },
    {
        id: 20, categoria: 'politica',
        titulo: 'Presidente do PT defende Jaques Wagner após operação da PF no caso Master',
        resumo: 'O presidente nacional do PT, Edinho Silva, manifestou nesta quinta-feira (18) sua defesa ao líder do governo no Senado, Jaques Wagner (PT-BA). O senador é alvo de uma operação da Polícia Federal no âmbito do caso Master. Silva expressou plena confiança na inocência de Wagner e na sua capacidade de c',
        imagem: 'https://images.pexels.com/photos/8820203/pexels-photo-8820203.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'Caio Spechoto, Fernanda Brigatti, Catia Seabra', tempo: 'agora'
    },
    {
        id: 21, categoria: 'politica',
        titulo: 'Lula previu escândalo Banco Master atingir governo e preparou resposta',
        resumo: 'O presidente Lula já antecipava que o escândalo do Banco Master poderia alcançar membros de seu governo, principalmente da Bahia. Ele teria, inclusive, ensaiado uma resposta para o caso de as investigações avançarem sobre autoridades a ele ligadas.',
        imagem: 'https://images.pexels.com/photos/34277966/pexels-photo-34277966.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'Mônica Bergamo', tempo: 'agora'
    },
    {
        id: 22, categoria: 'politica',
        titulo: 'Caso Henry Borel: Jairo Souza Santos condenado a 43 anos; Monique Medeiros é solta',
        resumo: 'O julgamento do assassinato de Henry Borel, morto aos quatro anos em 2021, foi concluído no Rio. O padrasto, Jairo Souza Santos, ex-vereador e médico, recebeu pena de 43 anos de prisão. A mãe, Monique Medeiros, condenada a 1 ano e 4 meses por omissão, foi enviada para casa pela juíza, gerando contro',
        imagem: 'https://images.pexels.com/photos/31423268/pexels-photo-31423268.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: '', tempo: 'agora'
    },
    {
        id: 23, categoria: 'politica',
        titulo: 'Encontro Nacional em SP Debate Inclusão no Trabalho e Novo Viver sem Limite',
        resumo: 'Gestores da política para pessoas com deficiência se reuniram em São Paulo para um encontro nacional. Organizado pelo Ministério dos Direitos Humanos e da Cidadania, o evento focou na inclusão profissional e no programa \'Novo Viver sem Limite\', buscando fortalecer as ações na área.',
        imagem: 'https://images.pexels.com/photos/5926406/pexels-photo-5926406.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'Redação', tempo: '15h atrás'
    },
    {
        id: 24, categoria: 'economia',
        titulo: 'Acesso a Terapias Psicodélicas: Custo e Burocracia Limitam Uso, Brasil no Radar',
        resumo: 'A dificuldade de acesso a terapias psicodélicas, devido a custos e burocracia, é um problema global onde o tratamento é legalizado. No Brasil, mesmo sem regulamentação oficial, a questão do acesso a essas terapias experimentais já preocupa pesquisadores e ativistas.',
        imagem: 'https://f.i.uol.com.br/fotografia/2025/12/17/17659999246943053484d7f_1765999924_3x2_rt.jpg',
        autor: '', tempo: 'agora'
    },
    {
        id: 25, categoria: 'economia',
        titulo: 'Dólar salta com Fed mantendo juros e indicando novas altas até fim do ano',
        resumo: 'O dólar registrou forte alta na abertura desta quinta-feira (18), impulsionado pela repercussão da decisão do Federal Reserve. O banco central americano manteve os juros entre 3,5% e 3,75%, mas sinalizou a possibilidade de novas elevações da taxa até o final do ano, gerando cautela no mercado.',
        imagem: 'https://f.i.uol.com.br/fotografia/2026/06/18/17817871446a33ea090030b_1781787144_3x2_rt.jpg',
        autor: '', tempo: 'agora'
    },
    {
        id: 26, categoria: 'economia',
        titulo: 'Record busca patrocínio para A Fazenda 18, com estreia em setembro e Adriane Galisteu',
        resumo: 'A Record iniciou negociações com o mercado publicitário para as cotas de patrocínio de \'A Fazenda 18\'. O reality show, que terá Adriane Galisteu no comando, tem estreia prevista para setembro.',
        imagem: 'https://images.pexels.com/photos/31678059/pexels-photo-31678059.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'Gabriel Vaquer', tempo: 'agora'
    },
    {
        id: 27, categoria: 'economia',
        titulo: 'PEC da imunidade: Câmara aprova isenção fiscal para igrejas e obras sociais',
        resumo: 'A Câmara dos Deputados aprovou uma PEC que concede ampla imunidade tributária a igrejas. A medida estende a isenção fiscal a compras de bens e serviços ligados ao seu funcionamento e obras sociais, aproximando-as de zonas francas tributárias.',
        imagem: 'https://images.pexels.com/photos/14631741/pexels-photo-14631741.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: '', tempo: 'agora'
    },
    {
        id: 28, categoria: 'economia',
        titulo: 'PF mira ex-sócio de Daniel Vorca; defesa vê buscas como desnecessárias',
        resumo: 'A defesa de Augusto Lima, ex-sócio de Daniel Vorca, manifestou-se sobre as buscas realizadas pela Polícia Federal em uma operação deflagrada hoje. Os advogados do empresário consideram as diligências "desnecessárias", sem detalhar os motivos da contestação.',
        imagem: 'https://s2-valor.glbimg.com/SBdtstvRR5lk2sP48rqb9_V6jeg=/i.s3.glbimg.com/v1/AUTH_63b422c2caee4269b8b34177e8876b93/internal_photos/bs/2026/9/W/AtqR5XTMymSAMRBHNZMw/augusto-lima-banco-pleno.avif',
        autor: 'Valor Econômico', tempo: 'agora'
    },
    {
        id: 29, categoria: 'economia',
        titulo: 'Representantes Comerciais: Pilar da Maior Economia do Brasil em SP',
        resumo: 'Os representantes comerciais desempenham um papel crucial na vitalidade econômica de São Paulo. Esses profissionais estão presentes em todos os setores da maior economia do Brasil, atuando como elos essenciais para o fluxo de negócios e o desenvolvimento.',
        imagem: 'https://images.pexels.com/photos/157519/pexels-photo-157519.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'Redação', tempo: '15h atrás'
    },
    {
        id: 30, categoria: 'cidade',
        titulo: 'Lendas da MPB Áurea Martins e Cristovão Bastos celebram trajetória com álbum \'Amizade\' no Rio',
        resumo: 'As lendas da MPB Áurea Martins e Cristovão Bastos celebram suas longas trajetórias com o lançamento do álbum \'Amizade\'. A cantora de 86 anos e o pianista de 80 apresentam o trabalho inédito em show no Teatro Rival Petrobras, no Centro do Rio de Janeiro.',
        imagem: 'https://f.i.uol.com.br/fotografia/2026/06/18/17817857836a33e4b7c051c_1781785783_3x2_sm.jpg',
        autor: 'Carlos Bozzo Junior', tempo: 'agora'
    },
    {
        id: 31, categoria: 'esportes',
        titulo: 'Sensação da Copa: Vozinha, de Cabo Verde, segura favorita Espanha em 0 a 0',
        resumo: 'O goleiro Vozinha, de Cabo Verde, emergiu como um dos principais destaques da primeira rodada da Copa do Mundo. Sua atuação foi crucial para o empate sem gols contra a Espanha, favorita do Grupo H, solidificando sua posição como sensação do torneio.',
        imagem: 'https://f.i.uol.com.br/fotografia/2026/06/18/17817881466a33edf2b61a6_1781788146_3x2_xl.jpg',
        autor: 'Sandro Macedo', tempo: 'agora'
    },
    {
        id: 32, categoria: 'esportes',
        titulo: 'Invasão Escocesa: Boston Se Transforma em Edimburgo Durante a Copa do Mundo',
        resumo: 'Milhares de torcedores escoceses desembarcaram em Boston para apoiar sua seleção na Copa do Mundo. A presença massiva dos visitantes está alterando significativamente a dinâmica e a atmosfera da cidade americana.',
        imagem: 'https://f.i.uol.com.br/fotografia/2026/06/17/17817493026a335636a6cba_1781749302_3x2_rt.jpg',
        autor: '', tempo: 'agora'
    },
    {
        id: 33, categoria: 'esportes',
        titulo: 'Copa do Mundo 2026: Rodada inicial soma 21.969 passes em 24 jogos',
        resumo: 'A Copa do Mundo de 2026 teve sua primeira rodada concluída, totalizando 24 partidas disputadas. Os atletas em campo realizaram um impressionante número de 21.969 passes ao longo desses jogos.',
        imagem: 'https://f.i.uol.com.br/fotografia/2026/06/18/17817836186a33dc42e6d4b_1781783618_3x2_xl.jpg',
        autor: '', tempo: 'agora'
    },
    {
        id: 34, categoria: 'esportes',
        titulo: 'Copa do Mundo: Mais de 50 Goleadores Agitam a Rodada de Abertura',
        resumo: 'A primeira rodada da Copa do Mundo registrou um número expressivo de gols. Mais de 50 atletas diferentes já balançaram as redes, prometendo uma competição com muitas emoções.',
        imagem: 'https://f.i.uol.com.br/fotografia/2026/06/18/17817582086a3379006b9a4_1781758208_3x2_rt.jpg',
        autor: 'Sandro Macedo', tempo: 'agora'
    },
    {
        id: 35, categoria: 'esportes',
        titulo: 'Pausas para hidratação na Copa do Mundo geram vaias de torcedores',
        resumo: 'Em partidas da Copa do Mundo realizadas na quarta-feira (17), torcedores vaiaram os intervalos obrigatórios de hidratação impostos pela Fifa. O descontentamento foi notado em Dallas, no jogo entre Inglaterra e Croácia, e em Toronto, durante o embate entre Gana e Panamá.',
        imagem: 'https://f.i.uol.com.br/fotografia/2026/06/18/17817828916a33d96be028a_1781782891_3x2_rt.jpg',
        autor: 'Nick Mulvenney', tempo: 'agora'
    },
    {
        id: 36, categoria: 'esportes',
        titulo: 'Copa do Mundo: Lições do passado para futuros anfitriões sobre desafios e polêmicas',
        resumo: 'A organização de Copas do Mundo sempre trouxe consigo uma série de desafios e controvérsias. Experiências passadas no Brasil, Qatar e África do Sul revelam desde demandas por infraestrutura até acusações de corrupção e violação de direitos humanos, servindo de alerta para futuros países-sede.',
        imagem: 'https://images.pexels.com/photos/33880199/pexels-photo-33880199.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: '', tempo: 'agora'
    },
    {
        id: 37, categoria: 'esportes',
        titulo: 'Copa e Olimpíadas: A Celebração da Diversidade Humana em Campo e Arquibancada',
        resumo: 'Grandes eventos como a Copa do Mundo e as Olimpíadas revelam a emoção dos hinos e a vasta diversidade cultural de suas plateias. O texto enfatiza que essa riqueza de povos, cores e costumes é um patrimônio da humanidade a ser valorizado e desfrutado, celebrando a união global pelo esporte.',
        imagem: 'https://images.pexels.com/photos/12698193/pexels-photo-12698193.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: '', tempo: 'agora'
    },
    {
        id: 38, categoria: 'esportes',
        titulo: 'Vozinha, goleiro de Cabo Verde, explode em fama no Mundial e se diz abençoado',
        resumo: 'O goleiro Vozinha, de 40 anos e sem clube, emergiu como um herói improvável no Mundial, destacando-se na estreia de Cabo Verde contra a poderosa Espanha. Sua atuação decisiva gerou uma explosão de popularidade, com seus seguidores no Instagram saltando de 50 mil para mais de 13 milhões. O atleta afr',
        imagem: 'https://s2-ge.glbimg.com/B0VZ8Ahsz8S3Sk63P4rCw6wQg8Q=/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2026/w/F/MsBkeAQles34N89B9LKw/2026-06-15t161823z-924299842-up1em6f19al37-rtrmadp-3-soccer-worldcup-esp-cpv.jpg',
        autor: 'GE (Globo Esporte)', tempo: 'agora'
    },
    {
        id: 39, categoria: 'esportes',
        titulo: 'Wahi, da Costa do Marfim, é barrado no Canadá e desfalca seleção contra a Alemanha',
        resumo: 'O atacante Elye Wahi, titular da Costa do Marfim, foi impedido de entrar no Canadá e desfalcará a seleção no jogo contra a Alemanha, em Toronto. Acusado de manipulação de resultados na Liga Francesa, o jogador não obteve as autorizações administrativas necessárias para o ingresso no país, mas seguir',
        imagem: 'https://s2-ge.glbimg.com/Y2yaO1hUGLLYIpXSYvq1jeGak_U=/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2026/Q/i/pCRHfuSgqGmWzalpdbZg/2026-06-15t002158z-6729964-up1em6f010kml-rtrmadp-3-soccer-worldcup-civ-ecu.jpg',
        autor: 'GE (Globo Esporte)', tempo: 'agora'
    },
    {
        id: 40, categoria: 'internacional',
        titulo: 'Moscou em alerta: Maior ataque de drones ucranianos em dois anos causa incêndios e paralisa aeroport',
        resumo: 'A Ucrânia deflagrou nesta quinta-feira (18) o maior ataque de drones contra Moscou em dois anos, atingindo a capital russa e suas imediações. O incidente provocou incêndios e interrompeu as operações nos principais aeroportos, resultando em centenas de voos atrasados.',
        imagem: 'https://images.pexels.com/photos/36376224/pexels-photo-36376224.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: '', tempo: 'agora'
    },
    {
        id: 41, categoria: 'internacional',
        titulo: 'Times Square: Termômetro do Futebol e Desafio de Mobilidade em Manhattan',
        resumo: 'A icônica Times Square, principal cartão turístico dos Estados Unidos no coração de Manhattan, enfrenta crescente dificuldade de circulação. O local, que se consolidou como um verdadeiro \'termômetro\' do futebol, apresenta um cenário desafiador para pedestres.',
        imagem: 'https://images.pexels.com/photos/33827014/pexels-photo-33827014.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'Mayara Paixão', tempo: 'agora'
    },
    {
        id: 42, categoria: 'internacional',
        titulo: 'Trump rotula opositores do pacto com Irã como invejosos, maus ou estúpidos',
        resumo: 'O ex-presidente dos Estados Unidos, Donald Trump, classificou os críticos do acordo com o Irã como "invejosos, pessoas más ou estúpidos". A declaração ocorreu em resposta àqueles que consideravam o pacto excessivamente concessivo à República Islâmica.',
        imagem: 'https://images.pexels.com/photos/15166867/pexels-photo-15166867.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: '', tempo: 'agora'
    },
    {
        id: 43, categoria: 'internacional',
        titulo: 'Joshua Baer, CEO da Capital Factory, morre em acidente de jato executivo no Texas',
        resumo: 'Joshua Baer, fundador e CEO da aceleradora Capital Factory, morreu em um acidente de jato executivo no Texas, EUA. A aeronave caiu em uma rodovia de Laredo, nesta terça-feira, após pilotos relatarem problemas mecânicos e solicitarem pouso de emergência. A morte de Baer, empreendedor conhecido no set',
        imagem: 'https://s2-g1.glbimg.com/3tZZWljiAXpcn02YCmp9ItgRg10=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/i/B/j27YeeRfGmrkv2sN3hyw/ap26168784151178.jpg',
        autor: 'G1 Mundo', tempo: 'agora'
    },
    {
        id: 44, categoria: 'internacional',
        titulo: 'México prende homem por aluguel ilegal de credencial da Copa 2026',
        resumo: 'A Secretaria de Segurança Pública da Cidade do México prendeu um homem de 24 anos acusado de alugar credenciais de acesso à Copa do Mundo de 2026. A investigação, iniciada por denúncia da organização, revelou que o suspeito anunciava o documento em redes sociais e foi detido ao tentar reativar o pas',
        imagem: 'https://s2-g1.glbimg.com/cFPrAhnAqpf7CqMxB1KMA6uNtsY=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/f/Z/GnA1RQQze1MGTk8lDv9g/2026-06-11t175746z-1976336438-up1em6b1dw8e7-rtrmadp-3-soccer-worldcup-mex-zaf.jpg',
        autor: 'G1 Mundo', tempo: 'agora'
    },
    {
        id: 45, categoria: 'eventos',
        titulo: 'PF acusa Jaques Wagner de receber vantagens indevidas de empresário em relatório ao STF',
        resumo: 'A Polícia Federal (PF) informou ao Supremo Tribunal Federal (STF) em relatório que Jaques Wagner teria recebido vantagens econômicas indevidas. Os valores teriam sido fornecidos por Augusto Lima, ex-sócio de Daniel Vorcaro, em troca de auxílio aos negócios do empresário.',
        imagem: 'https://f.i.uol.com.br/fotografia/2026/06/18/17817775096a33c4658ef1a_1781777509_3x2_rt.jpg',
        autor: 'Mônica Bergamo', tempo: 'agora'
    },
    {
        id: 46, categoria: 'eventos',
        titulo: 'Estrelas da música celebram Cazuza em tributo exclusivo no C6 no Rock em SP',
        resumo: 'Arnaldo Antunes, Frejat e Maria Gadú estão entre os artistas que farão um tributo a Cazuza no festival C6 no Rock. O espetáculo "Todo Amor que Houver Nessa Vida" acontece nos dias 22 e 23 de agosto no Parque Ibirapuera, em São Paulo, sendo concebido exclusivamente para o evento.',
        imagem: 'https://images.pexels.com/photos/22604116/pexels-photo-22604116.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'Mônica Bergamo, Jullia Gouveia', tempo: 'agora'
    },
    {
        id: 47, categoria: 'eventos',
        titulo: 'IBGE Destaque em Feira de Geotecnologias em São Paulo',
        resumo: 'O Instituto Brasileiro de Geografia e Estatística (IBGE) marca forte presença na feira de geotecnologias que acontece em São Paulo. A participação do órgão sublinha sua relevância e expertise no desenvolvimento e aplicação de tecnologias geográficas.',
        imagem: 'https://images.pexels.com/photos/14144608/pexels-photo-14144608.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'Redação', tempo: '16h atrás'
    },
    {
        id: 48, categoria: 'brasil',
        titulo: 'Alexa+ chega ao Brasil: Amazon integra IA generativa para conversas avançadas',
        resumo: 'A Amazon introduziu nesta quinta-feira (18) no Brasil a Alexa+, versão aprimorada de sua assistente virtual. Agora turbinada com inteligência artificial generativa, a plataforma promete interações mais naturais e a execução de tarefas complexas. A empresa aposta em uma experiência de usuário signifi',
        imagem: 'https://f.i.uol.com.br/fotografia/2026/06/17/17817372796a33273fe3058_1781737279_3x2_rt.jpg',
        autor: 'Gustavo Soares', tempo: 'agora'
    },
    {
        id: 49, categoria: 'brasil',
        titulo: 'Cinema: \'15 Dias\' mergulha na realidade de jovem gay alvo de homofobia',
        resumo: 'O filme \'15 Dias\' explora a difícil realidade de Felipe, um adolescente gay que enfrenta homofobia e bullying na escola. Apesar de amar nadar, ele evita a piscina do condomínio devido a comentários maldosos sobre seu corpo e sexualidade. Seu plano de se isolar nas férias, buscando escapar das humilh',
        imagem: 'https://f.i.uol.com.br/fotografia/2026/06/16/17816406116a31ada3d5792_1781640611_3x2_rt.jpg',
        autor: 'Matheus Rocha', tempo: 'agora'
    },
    {
        id: 50, categoria: 'brasil',
        titulo: 'Drica Moraes e Caco Ciocler estrelam Inter Alia, nova peça da autora de Prima Facie',
        resumo: 'A premiada dramaturga australiana Suzie Miller, de "Prima Facie", estreia sua nova peça "Inter Alia" no Brasil em julho. A montagem, que já passou por Londres, será dirigida por Rodrigo Portella e contará com Drica Moraes, Caco Ciocler e Caio Passos no elenco.',
        imagem: 'https://f.i.uol.com.br/fotografia/2026/06/17/17817257036a32fa07d758a_1781725703_3x2_rt.jpg',
        autor: '', tempo: 'agora'
    },
    {
        id: 51, categoria: 'brasil',
        titulo: 'ONG Brasileira Leva Educação Financeira a Crianças Migrantes na China',
        resumo: 'Crianças migrantes na China estão recebendo educação financeira através de uma metodologia desenvolvida no Brasil. A iniciativa visa ensinar os jovens a economizar e administrar seu dinheiro de forma eficaz.',
        imagem: 'https://f.i.uol.com.br/fotografia/2026/06/16/17816219546a3164c21afe9_1781621954_3x2_xl.jpg',
        autor: 'Victória Pacheco', tempo: 'agora'
    },
    {
        id: 52, categoria: 'brasil',
        titulo: 'Mãe de Isis Valverde sai em defesa da filha após ex-cozinheira pedir R$ 400 mil',
        resumo: 'Rosalba Nable, mãe da atriz Isis Valverde, defendeu publicamente a filha após a repercussão de um processo trabalhista. Uma ex-cozinheira da artista moveu a ação, pedindo indenização de cerca de R$ 400 mil.',
        imagem: 'https://f.i.uol.com.br/fotografia/2026/03/06/177283353069ab4afa227d2_1772833530_3x2_rt.jpg',
        autor: 'Leonardo Volpato', tempo: 'agora'
    },
    {
        id: 53, categoria: 'brasil',
        titulo: 'Água Termal: Um Ingrediente, Preço Elevado e Dúvidas Sobre sua Real Eficácia',
        resumo: 'Apesar de ter apenas água como ingrediente, frascos de 150 ml de água termal chegam a custar mais de R$ 100. O alto valor do produto levanta questionamentos sobre a real utilidade e eficácia no mercado.',
        imagem: 'https://f.i.uol.com.br/fotografia/2026/06/17/17817310856a330f0d9d9f5_1781731085_3x2_rt.jpg',
        autor: 'Nathalia Durval', tempo: 'agora'
    },
    {
        id: 54, categoria: 'brasil',
        titulo: 'Neurodiversidade: Compreenda o termo que promove justiça social para neurodivergentes',
        resumo: 'O termo neurodiversidade, embora possa soar incomum, busca promover uma sociedade mais justa. Ele foca na equidade social para indivíduos autistas e com condições como TDAH, dislexia e outras questões de processamento.',
        imagem: 'https://images.pexels.com/photos/34353099/pexels-photo-34353099.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: '', tempo: 'agora'
    },
    {
        id: 55, categoria: 'brasil',
        titulo: 'Brizoletas: Símbolo da educação gaúcha enfrenta abandono e perda de registro',
        resumo: 'As brizoletas, escolas erguidas entre 1959 e 1963 pelo governador Leonel Brizola, revolucionaram o acesso à educação em áreas remotas do Rio Grande do Sul, tornando-se um ícone da alfabetização. Décadas após sua construção, esses importantes patrimônios educacionais enfrentam um cenário de abandono',
        imagem: 'https://images.pexels.com/photos/27093996/pexels-photo-27093996.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'Carlos Villela', tempo: 'agora'
    },
    {
        id: 56, categoria: 'brasil',
        titulo: 'Proibição de redes sociais para menores no Reino Unido gera debate sobre vulnerabilidade',
        resumo: 'O Reino Unido proibiu o acesso de menores de 16 anos às redes sociais, replicando medida já adotada pela Austrália. Embora politicamente popular, a decisão é criticada por especialistas, que alertam para o risco de aumentar a vulnerabilidade das crianças em vez de protegê-las.',
        imagem: 'https://images.pexels.com/photos/6486609/pexels-photo-6486609.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: '', tempo: 'agora'
    },
    {
        id: 57, categoria: 'brasil',
        titulo: 'Maria Bethânia 80 anos: Capinan destaca impacto da cantora na cultura brasileira',
        resumo: 'Maria Bethânia completa 80 anos nesta quinta-feira (18), marcando uma trajetória artística e cultural singular. Em homenagem, o poeta José Carlos Capinan relembra a convivência desde os anos 1960, em Salvador, e exalta o papel da cantora em alargar os horizontes da sociedade brasileira para além da',
        imagem: 'https://images.pexels.com/photos/8032857/pexels-photo-8032857.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'José Carlos Capinan', tempo: 'agora'
    },
    {
        id: 58, categoria: 'brasil',
        titulo: 'Faculdade BP, ligada à Beneficência Portuguesa de SP, abre 1º vestibular de Medicina',
        resumo: 'A Faculdade BP, vinculada ao Hospital Beneficência Portuguesa de São Paulo, iniciou o período de inscrições para o seu primeiro vestibular do curso de Medicina. A seleção visa preencher as vagas para a turma inaugural, com ingresso previsto para 2027.',
        imagem: 'https://images.pexels.com/photos/34181347/pexels-photo-34181347.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'Lucas Leite', tempo: 'agora'
    },
    {
        id: 59, categoria: 'brasil',
        titulo: 'Precatórios: Dívida do Brasil Atinge R$ 330,4 Bilhões Mesmo com Pagamento Recorde',
        resumo: 'O Brasil registrou um novo recorde na dívida de precatórios, atingindo R$ 330,4 bilhões, o maior estoque histórico. Apesar do pagamento recorde de R$ 113,4 bilhões no mesmo período, o montante continua a crescer, segundo o Mapa Anual dos Precatórios 2025 do CNJ.',
        imagem: 'https://images.pexels.com/photos/16929295/pexels-photo-16929295.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: '', tempo: 'agora'
    },
    {
        id: 60, categoria: 'brasil',
        titulo: 'Sinovac, criadora da Coronavac, injetará US$ 100 milhões em biotecnologia no Brasil',
        resumo: 'A Sinovac, empresa chinesa responsável pela Coronavac, anunciou um plano de investimento de US$ 100 milhões (cerca de R$ 520 milhões) no Brasil ao longo de cinco anos. O objetivo é estabelecer uma operação local para a produção de vacinas e expansão em biotecnologia, segundo Dimas Covas, cientista-c',
        imagem: 'https://images.pexels.com/photos/18351974/pexels-photo-18351974.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'Flavia Lima', tempo: 'agora'
    },
    {
        id: 61, categoria: 'brasil',
        titulo: 'Tarô: reflexão milenar para incertezas do amor ganha destaque',
        resumo: 'O tarô, uma prática milenar, tem se consolidado como uma ferramenta de reflexão para aqueles que buscam clareza em suas vidas afetivas. Em meio às incertezas do amor, essa antiga arte oferece um novo olhar.',
        imagem: 'https://images.pexels.com/photos/30786020/pexels-photo-30786020.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: '', tempo: 'agora'
    },
    {
        id: 62, categoria: 'brasil',
        titulo: 'Angelina Jolie prepara filhos para a morte devido a histórico familiar de câncer',
        resumo: 'A atriz Angelina Jolie revelou estar preparando seus filhos para sua morte, motivada por um histórico familiar de câncer. Ela perdeu a mãe precocemente para a doença e, por isso, sente que o tempo se esgota rapidamente.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/06/viviane-araujo.jpg?w=200',
        autor: 'mariagiacomelli', tempo: 'agora'
    },
    {
        id: 63, categoria: 'brasil',
        titulo: 'Preso no PR suspeito de matar adolescente encontrada seminua e com ferimentos na cabeça',
        resumo: 'Um homem foi preso no Paraná, suspeito de assassinar uma adolescente de 14 anos. A jovem foi encontrada seminua, com ferimentos na cabeça, em um terreno baldio nos fundos de um prédio abandonado.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/06/PROCURAFO-FEMINICIDIO-RJ.png?w=200',
        autor: 'Vitor Bonets', tempo: 'agora'
    },
    {
        id: 64, categoria: 'brasil',
        titulo: 'PF deflagra operação com 18 mandados e mira ex-sócio de Vorcaro, Augusto Lima',
        resumo: 'A Polícia Federal deflagrou uma operação na manhã desta quinta-feira, cumprindo 18 mandados de busca e apreensão. Augusto Lima, ex-sócio de Vorcaro, está entre os alvos da investigação.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/06/55165934132_01bcdd561d_o.jpg?w=200',
        autor: 'lauramolfese', tempo: 'agora'
    },
    {
        id: 65, categoria: 'brasil',
        titulo: 'Durigan defende Jaques Wagner após PF mirar líder do governo em nova fase de operação',
        resumo: 'Ministro da Fazenda, Dario Durigan, defendeu o senador Jaques Wagner (PT-BA) após a Polícia Federal deflagrar a 9ª fase da Operação Compliance Zero, que mira o líder do governo no Senado. Durigan expressou confiança no petista, garantindo que ele terá a oportunidade de apresentar sua versão.',
        imagem: 'https://cdn.oantagonista.com/uploads/2026/06/dario-durigan-1.jpg',
        autor: 'Wal Lima', tempo: 'agora'
    },
    {
        id: 66, categoria: 'brasil',
        titulo: 'PF mira líder do governo Jaques Wagner e banqueiro em 9ª fase da Operação Compliance Zero',
        resumo: 'A Polícia Federal deflagrou a 9ª fase da Operação Compliance Zero nesta quinta-feira (18), investigando um esquema de irregularidades financeiras. O senador Jaques Wagner (PT-BA) e Augusto Ferreira Lima, sócio do Banco Master, são alvos de mandados de busca e apreensão no DF, Bahia e SP. A PF apura',
        imagem: 'https://agenciabrasil.ebc.com.br/ebc.png?id=1693829&o=rss',
        autor: 'Paula Laboissière e Pedro Peduzzi – Repórteres da Agência Brasil', tempo: 'agora'
    },
    {
        id: 67, categoria: 'brasil',
        titulo: 'Saneamento: Seis cidades paulistas atingem nota máxima no Brasil',
        resumo: 'Seis municípios do estado de São Paulo foram reconhecidos com a nota máxima em saneamento básico, conforme avaliação nacional. O resultado sublinha a excelência na infraestrutura e gestão dos serviços essenciais nessas localidades.',
        imagem: 'https://images.pexels.com/photos/1040873/pexels-photo-1040873.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'Redação', tempo: '14h atrás'
    },
    {
        id: 68, categoria: 'politica',
        titulo: 'Mulher agredida e ameaçada pelo ex busca refúgio em delegacia de Valadares',
        resumo: 'Uma mulher de 24 anos denunciou ter sido agredida e ameaçada pelo ex-companheiro na madrugada de quarta-feira (17) em Governador Valadares. Após ser perseguida e atingida por uma garrafa no rosto, ela conseguiu fugir e buscou ajuda na delegacia de Polícia Civil.',
        imagem: 'https://s2-g1.glbimg.com/p-VMjoQLqYq9eQYdCmYhpcbQhGI=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2025/i/d/4K2JZYRmKSFnXI6TfSSw/aaa.png',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 69, categoria: 'economia',
        titulo: 'Águas de Lindóia: Água que atraiu Marie Curie e intriga a NASA molda sua história',
        resumo: 'Águas de Lindóia, balneário paulista, tem sua identidade forjada por águas termais centenárias com propriedades de saúde. As fontes atraíram a cientista Marie Curie em 1926 e são alvo de estudos da USP, que investiga seus benefícios renais, além de possível uso em missões da NASA.',
        imagem: 'https://s2-g1.glbimg.com/LyRY_Iyq75CLCI3pTy5sHO9KYJ8=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/E/7/oJaAD3TW2vLXbVzxwBWA/foto-1.png',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 70, categoria: 'cidade',
        titulo: 'PF investiga enteado de Jaques Wagner por repasse milionário em nova fase da Compliance Zero',
        resumo: 'A Polícia Federal (PF) apura se a BN Financeira, empresa ligada a Eduardo Sodré Martins, enteado do senador Jaques Wagner, recebeu vantagens indevidas na operação Compliance Zero. A investigação foca em um repasse de R$ 3,5 milhões à empresa, após cobranças de Sodré a um gestor do Banco Master, para',
        imagem: 'https://s2-g1.glbimg.com/SNEnPQA8-Dcnkq27mXs00Q6JRug=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/L/w/kP2klISEWasblHiR4z3A/55268276416-6576e4b70b-o.jpg',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 71, categoria: 'cidade',
        titulo: 'Queda de açaizeiro deixa homem gravemente ferido e exige resgate aéreo no AM',
        resumo: 'Um homem sofreu fraturas graves após cair de um açaizeiro e ser atingido pela árvore, em uma comunidade rural do Amazonas, na quarta-feira (17). A vítima foi resgatada por via aérea e encaminhada para atendimento médico em Manaus.',
        imagem: 'https://s2-g1.glbimg.com/VSG7QEBHlQmlmypAK8OZPPZLMRQ=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/H/2/RrZxkfQdAiAPZhSsVz8Q/homem-fica-ferido-apos-cair-de-acaizeiro-e-ser-atingido-pela-arvore-no-interior-do-am-foto-victor-levy-ssp-am.jpg',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 72, categoria: 'cidade',
        titulo: 'Ação policial prende dois e apreende R$ 24 mil, armas e drogas em São Francisco de Itabapoana',
        resumo: 'Dois indivíduos foram presos e mais de R$ 24 mil em dinheiro, além de armas, munições e drogas, foram apreendidos em uma operação policial na quarta-feira (17) em Barra do Itabapoana, São Francisco de Itabapoana. A ação foi deflagrada após denúncia anônima sobre imóveis ligados ao tráfico.',
        imagem: 'https://s2-g1.glbimg.com/zxKJP2KOp06_y2Jn_49uI-L6OhQ=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/B/c/wFsWoDSe2IIarJpsqgYw/whatsapp-image-2026-06-18-at-09.31.58.jpeg',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 73, categoria: 'cidade',
        titulo: 'Parreira na UTI: Campeão mundial de 94 hospitalizado no Rio por inflamação pulmonar',
        resumo: 'Carlos Alberto Parreira, ex-técnico da Seleção Brasileira e campeão mundial em 1994, foi internado na UTI do Hospital Samaritano Barra, no Rio, devido a uma inflamação pulmonar. O boletim médico desta quinta-feira (18) informa que ele respira com auxílio de aparelhos e seu estado é estável, sem prev',
        imagem: 'https://s2-g1.glbimg.com/Px0pMl23cuLaQbFx1ignXSB4NEY=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/b/4/cLNDfCQ2mp5sXA671O5w/globo-canal-4-20260603-1947-frame-157474.jpeg',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 74, categoria: 'cidade',
        titulo: 'Jovem de 13 anos salva sobrinha de engasgo em TO com técnica de bombeiro mirim',
        resumo: 'Um adolescente de 13 anos salvou a vida de sua sobrinha de um ano em Guaraí, TO, que se engasgou com arroz. Ele aplicou com sucesso a manobra de desengasgo aprendida em curso de Bombeiro Mirim, ressaltando a importância vital do treinamento em primeiros socorros.',
        imagem: 'https://s2-g1.glbimg.com/dT81jxLmLocj-4ZnZlX9awE_uSk=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/U/V/MoJNCARAGEshAiMn2ifw/4561.jpg',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 75, categoria: 'cidade',
        titulo: 'Incêndio devastador atinge mais de 50 barracos em Paraisópolis, Zona Sul de SP',
        resumo: 'Um incêndio de grandes proporções atingiu a comunidade de Paraisópolis, na Zona Sul de São Paulo, devastando mais de 50 barracos. Equipes de resgate atuam no local para controlar as chamas e prestar assistência.',
        imagem: 'https://images.pexels.com/photos/13099477/pexels-photo-13099477.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'Redação', tempo: '29 min atrás'
    },
    {
        id: 76, categoria: 'eventos',
        titulo: 'Ipuã: Casa da Criança inaugura mostra internacional Mosaico de Traços',
        resumo: 'A Casa da Criança de Ipuã inaugurou em 11 de junho a Mostra-Ateliê Internacional \'Mosaico de Traços, Palavras e Matérias\'. O evento, que destaca a infância como período de criação e conhecimento, conecta-se à Reggio Children, Itália, e à RedSOLARE Brasil, marcando um avanço para a educação e cultura',
        imagem: 'https://s2-g1.glbimg.com/HKf2mlAanQIACVxsXQZSMb4m7WU=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/p/X/frKiqpSzS3VDSN0IIz6Q/informe-g1-2026-06-18t095711.886.png',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 77, categoria: 'eventos',
        titulo: 'Maria Bethânia 80 anos: a força magnética que domina os palcos brasileiros',
        resumo: 'Maria Bethânia celebra 80 anos nesta terça-feira, 18 de junho, com uma carreira fonográfica de 61 anos. Apesar de uma discografia irretocável, é nos palcos que a artista baiana manifesta sua plenitude, cativando o público desde 1965 com sua presença cênica inigualável.',
        imagem: 'https://s2-g1.glbimg.com/WKohY0UCV8JGqqPki6duj-LjckQ=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/V/7/skFbpHQ4WOA4Uv4oKcvg/mariabethania.jpg',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 78, categoria: 'eventos',
        titulo: 'Marquise de escola desaba em São Luís sem feridos; prédio interditado e aulas suspensas',
        resumo: 'A marquise da escola IEMA Sousândrade desabou sobre a calçada no bairro do Lira, em São Luís, na noite de quarta-feira (17). Ninguém se feriu, mas o prédio foi interditado e as aulas suspensas pela Defesa Civil. O incidente levanta preocupações de moradores, visto que a unidade passou por reforma re',
        imagem: 'https://s2-g1.glbimg.com/n2MmIdyWJ2MK8WEeNtZYbk2Z0IE=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/O/Q/ATruFoRJeq2gCQHLi2Bg/montagens-1920-x-1080-px-2026-06-18t100320.529.jpg',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 79, categoria: 'eventos',
        titulo: 'Rara Ocultação de Vênus pela Lua Surpreende o Céu de Pernambuco',
        resumo: 'Moradores do interior de Pernambuco registraram na noite de quarta-feira (17) a rara ocultação de Vênus pela Lua crescente. O fenômeno astronômico, onde Vênus ficou oculto por cerca de uma hora, é considerado incomum para a região, segundo especialistas.',
        imagem: 'https://s2-g1.glbimg.com/iw7-dwvKKoCY8zzRR5zLo5-xWg0=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/t/2/3BOAG6TqiviRSl8WVTyw/design-sem-nome-2026-06-18t093952.194.png',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 80, categoria: 'eventos',
        titulo: 'Alinhamento entre Lua e Vênus fascina no Tocantins; entenda o fenômeno',
        resumo: 'Moradores de Guaraí, Tocantins, registraram um ponto luminoso ao lado da Lua na última quarta-feira (17). Especialistas confirmam que o fenômeno é um alinhamento planetário entre a Lua e Vênus, um espetáculo natural da geometria do sistema solar.',
        imagem: 'https://s2-g1.glbimg.com/w5DKfCrPs1341ue7K4ff5Pdcx_c=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/0/P/ug4xGxRTadFmc0pfE03A/foto-e-montagem-vertical-100-.png',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 81, categoria: 'brasil',
        titulo: 'Interdições no Rio: CET-Rio anuncia bloqueios em Elevado e 4 túneis',
        resumo: 'A CET-Rio divulgou interdições que afetarão o Elevado das Bandeiras e os túneis Rebouças, Zuzu Angel, Acústico e Santa Bárbara. Motoristas devem estar atentos às sinalizações e planejar rotas alternativas para evitar transtornos.',
        imagem: 'https://prefeitura.rio/data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        autor: 'Prefeitura do Rio de Janeiro', tempo: '12h atrás'
    },
    {
        id: 82, categoria: 'brasil',
        titulo: 'Eleições 2026: Restrições eleitorais começam em junho para pré-candidatos',
        resumo: 'O Sindicato dos Advogados e Advogadas do Estado de Alagoas (Sindav/AL) alerta para importantes restrições do calendário eleitoral de 2026. A partir de 30 de junho, pré-candidatos serão proibidos de apresentar programas em rádio e TV, e gastos com propaganda institucional de órgãos públicos terão lim',
        imagem: 'https://s2-g1.glbimg.com/u58qVXdOlL88gOrMSM5vH5bWo0U=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/c/c/lZdFFcR9SnBVCrHuqMBA/eleicoes-reproducao-internet.png',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 83, categoria: 'brasil',
        titulo: 'Itirapina: Motorista morre carbonizado em acidente; arma é achada no veículo',
        resumo: 'Everton Furiato morreu carbonizado após seu carro colidir com um poste e pegar fogo na noite de quarta-feira (17) em Itirapina (SP). O veículo tombou na Estrada Municipal de Ubá e foi consumido pelas chamas. A Polícia Militar investiga as causas do acidente e apreendeu uma arma encontrada no interio',
        imagem: 'https://s2-g1.glbimg.com/RsL50QKdGF6Dzrf6zZkimN3bg-0=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/5/Y/cZgEx0Q1SGWofsKcNLmg/tamanho-post-materia-47-.jpg',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 84, categoria: 'brasil',
        titulo: 'Transformação tática: laterais da Seleção Brasileira priorizam marcação',
        resumo: 'A função dos laterais na Seleção Brasileira sofreu uma transformação tática nos últimos anos. Diferente da tradição ofensiva de nomes como Carlos Alberto Torres, a equipe de Carlo Ancelotti prioriza a capacidade de marcação. Essa solidez defensiva é vista como um trunfo crucial para a busca pelo tít',
        imagem: 'https://s2-g1.glbimg.com/g8uWZFqia9tBom-lqGWS_j2A63U=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/W/f/6QmlBNR1m8wF7rCUs0Mg/laterais.01-frame-1324.jpeg',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 85, categoria: 'brasil',
        titulo: 'Apartamento de Gusttavo Lima em Goiânia tem elevador exclusivo para carros e viraliza',
        resumo: 'O cantor Gusttavo Lima é proprietário de um apartamento em um edifício de luxo em Goiânia que viralizou nas redes sociais. O prédio se destaca por um inovador elevador que permite aos moradores estacionarem seus carros diretamente dentro das unidades. A assessoria confirmou a posse do imóvel no Seto',
        imagem: 'https://s2-g1.glbimg.com/wh_a2TnJO7VQjYlnHTHCJgywkMY=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/3/U/bCiR97SAubYHhuD2syNQ/padrao-foto-texto-g1-2026-06-18t100550.884.jpg',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 86, categoria: 'brasil',
        titulo: 'Edital da Polícia Penal do RN: 260 vagas e salários de até R$ 5,6 mil é publicado',
        resumo: 'O edital do concurso público para a Polícia Penal e Especialistas da Seap/RN foi publicado, ofertando 260 vagas de nível superior com remunerações que podem chegar a R$ 5.681,78. As inscrições para o certame, organizado pelo Instituto Avalia, iniciam na próxima segunda-feira (22).',
        imagem: 'https://s2-g1.glbimg.com/68JgdYsCIQWy86PVGONia8CZoyw=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2024/k/x/MK3INpQwWgKtWQVD8BVA/policia-penal-seap.jpg',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 87, categoria: 'brasil',
        titulo: 'Crime choca Piauí: Idosos mortos em casa; neto detido sob suspeita de duplo homicídio',
        resumo: 'Um casal de idosos foi assassinado em sua residência em São João do Piauí, no sudeste do estado, na madrugada desta quinta-feira (18). Os corpos foram encontrados pela manhã, e o neto das vítimas foi detido como principal suspeito. Ele apresentava vestígios de sangue e aparente estado de confusão me',
        imagem: 'https://s2-g1.glbimg.com/rKb1xtE3XmM29Yt62gyfMvtpMYU=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/C/e/yqANMBTYGLGmAGjriffA/copia-de-edicao-imagens-g1-6-.png',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 88, categoria: 'brasil',
        titulo: 'Incêndio destrói depósito da Secretaria de Educação em Várzea Grande, MT',
        resumo: 'Grande incêndio destruiu depósito da Secretaria de Educação em Várzea Grande (MT) na quarta (17), carbonizando parte da estrutura. Bombeiros atuam no rescaldo; pasta avalia danos e garante que escolas não serão afetadas.',
        imagem: 'https://s2-g1.glbimg.com/lj9-eii3CFZo7JwrXBRIZcuxv5Q=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/A/y/I4aIxURSSUA2ZOrACyEA/foto-g1-59-.jpg',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 89, categoria: 'brasil',
        titulo: 'PF combate fraude em isenção de IPI com laudos médicos falsos na Operação Dolus',
        resumo: 'A Polícia Federal deflagrou a Operação Dolus nesta quinta-feira (18), cumprindo mandados em São Luís contra um suspeito. Ele é investigado por fraudar laudos médicos para obter isenção irregular de IPI na compra de veículos, atestando indevidamente a condição de PCD, configurando, em tese, falsidade',
        imagem: 'https://s2-g1.glbimg.com/1sbRTQ4vykzL6t4PAzoenSXr0ow=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/G/Z/kOGuE7SSu20GoE2ZWcTw/pfff.jpg',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 90, categoria: 'brasil',
        titulo: 'Amazon Lança Alexa+ no Brasil com IA Avançada e Funções Semelhantes ao ChatGPT',
        resumo: 'A Amazon lançou a Alexa+ no Brasil nesta quinta-feira (18), marcando a chegada de uma assistente virtual aprimorada com inteligência artificial generativa, similar ao ChatGPT. A nova versão, capaz de executar tarefas mais complexas, custará R$ 99,90 por mês, mas será gratuita para assinantes do Amaz',
        imagem: 'https://s2-g1.glbimg.com/nAcDUVr-2BrWJ-NZ8T7a7g1gq-8=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/9/D/tQqjGuScKYPVeB6iGwgg/baixados-1200px.jpg',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 91, categoria: 'brasil',
        titulo: 'Popularidade do Morango do Amor Persiste no Boa Vista Junina 2026, Sem Longas Filas',
        resumo: 'O \'Morango do Amor\', doce que viralizou em Roraima no ano passado, continua atraindo o público no Boa Vista Junina 2026. Apesar da persistente procura, a edição atual da festa registra menor tempo de espera em comparação a 2025, com valores que variam de R$ 10 a R$ 20.',
        imagem: 'https://s2-g1.glbimg.com/MUrR-w9GRbkLIBr548N6tTqwe7k=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/3/g/gZgUDAQhA3AdoBUigJFw/morango-do-amor.jpeg',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 92, categoria: 'brasil',
        titulo: 'Sesc lança Sonora Brasil 2024: turnê nacional celebra culturas afro e indígenas',
        resumo: 'O Sesc lança a 28ª edição do Sonora Brasil, projeto de circulação musical com foco nas "Reverberações Afro e Indígenas". A turnê nacional, iniciada em Santarém (PA), passará por 42 cidades em 15 estados, com 130 apresentações e 30 ações formativas.',
        imagem: 'https://s2-g1.glbimg.com/Tb_IebHs0ZmRuao3DK7WsUT1VfQ=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/v/M/BnJf3ZSeOWSy4OTeorFQ/img-3596.jpg.jpeg',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 93, categoria: 'eventos',
        titulo: 'Feira de Santana Anuncia São João com Alceu Valença, Paula Fernandes e 40 Atrações',
        resumo: 'A Prefeitura de Feira de Santana, Bahia, anunciou a programação do Arraiá de Feira 2026. De 20 a 23 de junho, os distritos de Maria Quitéria, Jaguara e Tiquaruçu receberão mais de 40 atrações, como Alceu Valença, Paula Fernandes e Alcymar Monteiro. O evento busca fortalecer a cultura nordestina e mo',
        imagem: 'https://s2-g1.glbimg.com/2fVFVo8cdxQ4v6-8o5iotRF2aqc=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/Z/z/QDSKj6QB6KmG96pplB1Q/edimilsson-80-.png',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 94, categoria: 'brasil',
        titulo: 'Mãe de bebê morto em Uberlândia é indiciada por homicídio qualificado por omissão',
        resumo: 'A Polícia Civil de Uberlândia indiciou a mãe de um bebê de 3 meses, Lorenna Garcia da Costa, por homicídio qualificado por omissão. A investigação concluiu que a criança era vítima de violência, com o pai já preso por confessar agressões. O inquérito, que apontou traumatismo craniano como causa da m',
        imagem: 'https://s2-g1.glbimg.com/0P0DInF4MMPwHIRSZxStftdK8PI=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/F/w/CWfVSuRRWyxXKKEKtAjg/design-sem-nome-4-.png',
        autor: 'G1', tempo: 'agora'
    },
    {
        id: 95, categoria: 'brasil',
        titulo: 'Douglas Santos: Ancelotti resgata lateral que volta a brilhar na Seleção após 10 anos',
        resumo: 'O lateral-esquerdo Douglas Santos, de 32 anos, celebra seu retorno à Seleção Brasileira, onde se tornou titular e ganhou visibilidade. Após quase uma década longe da equipe nacional, sua nova chance veio com a convocação de Carlo Ancelotti. O jogador do Zenit destacou a dificuldade da trajetória e o',
        imagem: 'https://s2-g1.glbimg.com/Mz3WMA6VHtyOFwacd_FbAjgO_jY=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/S/N/c1YU0QTN2DE3201cXWRA/globo-canal-4-20260616-2000-frame-103579.jpeg',
        autor: 'Jornal Nacional', tempo: '1d atrás'
    },
    {
        id: 96, categoria: 'brasil',
        titulo: 'Grande SP: Defesa Civil reforça combate à estiagem com kits para 32 municípios',
        resumo: 'A Defesa Civil de São Paulo iniciou a entrega de kits de estiagem para 32 municípios da Grande São Paulo. A medida visa auxiliar as comunidades no enfrentamento dos períodos de seca e na prevenção de seus impactos.',
        imagem: 'https://images.pexels.com/photos/1579384/pexels-photo-1579384.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'Redação', tempo: '1d atrás'
    },
    {
        id: 97, categoria: 'internacional',
        titulo: 'Paz no Oriente Médio: EUA e Irã assinam acordo inicial e abrem prazo nuclear',
        resumo: 'Estados Unidos e Irã assinaram um acordo inicial de paz nesta quarta-feira (17) em Versalhes, com a presença de Trump e Pezeshkian. O pacto, já em vigor, estabelece 60 dias para negociações sobre a questão nuclear e suspensão de sanções. Não é o acordo final, mas busca um consenso definitivo a ser r',
        imagem: 'https://s2-g1.glbimg.com/nEhAXQPmmTxnFaXuCUQn4QSQvRg=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2026/M/e/iPi5AcSi6UmNq8pIhWzA/2026-06-18t085259z-56023202-rc28wlav3tle-rtrmadp-3-iran-crisis-pezeshkian-signing-still.jpg',
        autor: 'G1 Mundo', tempo: '6h atrás'
    },
    {
        id: 98, categoria: 'brasil',
        titulo: 'Navezinha do Morro dos Prazeres é equipada com novos recursos em Santa Teresa',
        resumo: 'A Navezinha, localizada no Morro dos Prazeres, em Santa Teresa, recebeu um novo conjunto de equipamentos. A medida visa aprimorar a infraestrutura do local.',
        imagem: 'https://prefeitura.rio/wp-content/uploads/2026/06/nave-scaled.jpeg',
        autor: 'Prefeitura do Rio de Janeiro', tempo: '13h atrás'
    },
    {
        id: 99, categoria: 'brasil',
        titulo: 'Tragédia em Alphaville: Motorista morre após bater em portaria de condomínio',
        resumo: 'Uma motorista faleceu após uma colisão contra a portaria de um condomínio em Alphaville. As circunstâncias da morte e do acidente ainda estão sendo investigadas pelas autoridades competentes. Há informações já apuradas, mas pontos cruciais aguardam esclarecimento para a conclusão do caso.',
        imagem: 'https://images.pexels.com/photos/13911606/pexels-photo-13911606.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
        autor: 'Redação', tempo: '1d atrás'
    },
    {
        id: 100, categoria: 'economia',
        titulo: 'Atlas: Regras Melhoram, Brasil Pode Atrair Investimento Pós-2027, Cautela Persiste',
        resumo: 'A empresa Atlas avalia que as recentes melhorias regulatórias no Brasil, incluindo regras para baterias, acordos sobre cortes de geração e definições da Aneel, podem recolocar o país na disputa por capital global. Contudo, a companhia mantém a cautela sobre novos investimentos, projetando um cenário',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/03/Solar_NeoenergiaDivulgacao-Neoenergia.jpg?w=1200&h=630&crop=1',
        autor: 'robsonrodrigues', tempo: 'agora'
    },
    {
        id: 101, categoria: 'economia',
        titulo: 'Dólar fecha em alta a R$ 5,11 após decisões de juros no Brasil e EUA',
        resumo: 'Na quarta-feira (17), o dólar à vista encerrou o dia com alta de 0,41%, atingindo R$ 5,1104. A valorização da moeda americana foi impulsionada pelas recentes decisões sobre taxas de juros no Brasil e nos Estados Unidos.',
        imagem: 'https://admin.alpha.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/06/ouro_barra1.webp?w=200',
        autor: 'mariajuliablanes', tempo: 'agora'
    },
    {
        id: 102, categoria: 'internacional',
        titulo: 'Crise diplomática: Israel rompe com UE por fala de Kallas sobre apartheid',
        resumo: 'O ministro Gideon Saar, chanceler de Israel, rompeu relações com Kallas, chefe da diplomacia da União Europeia. A ruptura ocorre após Saar exigir uma retratação por supostas comparações feitas por Kallas entre o Estado israelense e o regime de apartheid.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/Reuters_Direct_Media/BrazilOnlineReportBusinessNews/tagreuters.com2022binary_LYNXNPEI4M0G2-FILEDIMAGE.jpg?w=200',
        autor: 'poliannelima', tempo: 'agora'
    },
    {
        id: 103, categoria: 'internacional',
        titulo: 'Zelensky alerta para retaliação severa em Moscou caso ataques russos persistam',
        resumo: 'O presidente ucraniano, Volodymyr Zelensky, alertou que Moscou enfrentará uma retaliação severa, com a persistência de ataques de drones, se a Rússia continuar seus bombardeios. A declaração foi feita após um ataque russo a um mosteiro ucraniano.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/06/2026-06-18T051446Z_1_LOP014018062026RP1_RTRMADP_BASEIMAGE-960X540_UKRAINE-CRISIS-ATTACK-MOSCOW.jpg?w=200',
        autor: 'poliannelima', tempo: 'agora'
    },
    {
        id: 104, categoria: 'internacional',
        titulo: 'Israel negocia com EUA permanência de tropas no Líbano contra acordo Washington-Teerã',
        resumo: 'Israel está em negociações com os Estados Unidos para manter suas tropas no Líbano, segundo fontes. A iniciativa desafia um acordo firmado entre Washington e Teerã que garante a proteção da soberania libanesa, com israelenses relutantes em retirar seus soldados do território.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/06/Captura-de-tela-2026-06-17-195502.png?w=200',
        autor: 'poliannelima', tempo: 'agora'
    },
    {
        id: 105, categoria: 'internacional',
        titulo: 'Pequim defende controle de minerais críticos após G7 buscar reduzir dependência',
        resumo: 'A China defendeu seus controles de exportação de minerais críticos. A posição surgiu após líderes do G7 firmarem, na quarta-feira (17), um acordo para intensificar a coordenação e reduzir a dependência de seus países em relação ao gigante asiático.',
        imagem: 'https://admin.alpha.cnnbrasil.com.br/wp-content/themes/master-theme/assets/img/fallbackImage.jpg?w=200',
        autor: 'mariajuliablanes', tempo: 'agora'
    },
    {
        id: 106, categoria: 'brasil',
        titulo: 'RJ: Espaços da Juventude abrem 3,5 mil vagas em cursos gratuitos',
        resumo: 'Os Espaços da Juventude do Rio de Janeiro anunciaram a abertura de 3.500 vagas em cursos totalmente gratuitos. As inscrições já estão disponíveis para os interessados em qualificação.',
        imagem: 'https://prefeitura.rio/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-15-at-16.21.26.jpeg',
        autor: 'Prefeitura do Rio de Janeiro', tempo: '2d atrás'
    },
    {
        id: 107, categoria: 'eventos',
        titulo: 'CET-Rio divulga interdições no trânsito carioca para 15 de junho',
        resumo: 'A Companhia de Engenharia de Tráfego do Rio de Janeiro (CET-Rio) anunciou as interdições programadas para a próxima segunda-feira, 15 de junho. A medida visa gerenciar o tráfego na cidade. Recomenda-se aos condutores que busquem informações adicionais nos canais oficiais da CET-Rio.',
        imagem: 'https://prefeitura.rio/data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
        autor: 'Prefeitura do Rio de Janeiro', tempo: '2d atrás'
    },
    {
        id: 108, categoria: 'politica',
        titulo: 'Rio: Prefeitura e 99 expandem apoio a entregadores com terceiro ponto inaugurado',
        resumo: 'A Prefeitura do Rio de Janeiro e a empresa 99 inauguraram o terceiro ponto de apoio para entregadores na cidade. A iniciativa conjunta visa oferecer melhores condições de trabalho e infraestrutura aos profissionais da categoria, reforçando o suporte em parceria público-privada.',
        imagem: 'https://prefeitura.rio/wp-content/uploads/2026/06/Base99_PaulodeFrontin-_MarcoAntonioLima-5.JPG-600x450.jpeg',
        autor: 'Prefeitura do Rio de Janeiro', tempo: '1d atrás'
    },
    {
        id: 109, categoria: 'brasil',
        titulo: 'Junho Vermelho: Campanha Nacional Destaca Vital Importância da Doação de Sangue',
        resumo: 'A campanha Junho Vermelho está em pleno vigor, reforçando a mensagem sobre a necessidade contínua de doações de sangue. A iniciativa nacional visa conscientizar a população sobre como um simples gesto pode salvar inúmeras vidas.',
        imagem: 'https://prefeitura.rio/wp-content/uploads/2026/06/sangue-EK-scaled.jpg',
        autor: 'Prefeitura do Rio de Janeiro', tempo: '1d atrás'
    },
    {
        id: 110, categoria: 'politica',
        titulo: 'Ação da Prefeitura remove embarcações e construções ilegais na Lagoa',
        resumo: 'Em uma operação de fiscalização, a Prefeitura do Rio de Janeiro removeu embarcações e construções ilegais na Lagoa Rodrigo de Freitas. A iniciativa busca coibir irregularidades e assegurar a preservação ambiental da região.',
        imagem: 'https://prefeitura.rio/wp-content/uploads/2026/06/Operacao-Lagoa-2.jpeg',
        autor: 'Prefeitura do Rio de Janeiro', tempo: '2d atrás'
    },
    {
        id: 111, categoria: 'brasil',
        titulo: 'Rio de Janeiro se Mobiliza contra Violência à Pessoa Idosa em Dia Mundial',
        resumo: 'O Dia Mundial de Conscientização da Violência contra a Pessoa Idosa gerou uma mobilização em diversas frentes na cidade do Rio de Janeiro. A iniciativa visa sensibilizar a população sobre a importância de proteger os mais velhos e combater abusos.',
        imagem: 'https://prefeitura.rio/wp-content/uploads/2026/06/IMG_6640-scaled.jpg',
        autor: 'Prefeitura do Rio de Janeiro', tempo: '1d atrás'
    },
    {
        id: 112, categoria: 'brasil',
        titulo: 'Carioca João Fonseca brilha em Halle e avança à semifinal de duplas',
        resumo: 'O tenista carioca João Fonseca, em parceria com o alemão Daniel Altmaier, conquistou uma vaga na semifinal de duplas do ATP 500 de Halle. A dupla brasileira-alemã enfrentará Flavio Cobolli e Ben Shelton em busca de um lugar na grande final do torneio.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/06/Joao-fonseca-e1781624140832.jpg?w=612&h=345&crop=1',
        autor: 'leonardocosta', tempo: 'agora'
    },
    {
        id: 113, categoria: 'politica',
        titulo: 'Líder de Lula no Senado, Jaques Wagner é Alvo da PF em Fraude do Banco Master',
        resumo: 'O senador Jaques Wagner, líder do governo Lula no Senado, foi um dos alvos da mais recente fase da Operação Compliance Zero. A investigação da Polícia Federal apura uma suposta fraude financeira envolvendo o Banco Master.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/05/53360387573_88ffa5e60d_k.jpg?w=200',
        autor: 'gabrielaboechat', tempo: 'agora'
    },
    {
        id: 114, categoria: 'esportes',
        titulo: 'Copa do Mundo: Sul-Americanos Têm Segundo Pior Início do Século',
        resumo: 'As seis seleções sul-americanas que participam da Copa do Mundo registraram um aproveitamento de apenas 44%, com duas vitórias, dois empates e duas derrotas. Este desempenho marca o segundo pior início do século para os representantes da América do Sul no torneio.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/06/luis_diaz-e1781753867420.jpg?w=200',
        autor: 'pedro.sposito3078', tempo: 'agora'
    },
    {
        id: 115, categoria: 'esportes',
        titulo: 'Irmã de CR7 detona Seleção Portuguesa após empate na Copa do Mundo 2026',
        resumo: 'Katia Aveiro, irmã de Cristiano Ronaldo, criticou a Seleção Portuguesa após o empate na estreia da Copa do Mundo 2026. Em suas redes sociais, ela classificou o desempenho como "decepção total" e insinuou que a culpa recairia sobre "só um" jogador, em provável alusão ao irmão.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/06/benicio-huck-e1781781524534.png?w=200',
        autor: 'giullyanaaya', tempo: 'agora'
    },
    {
        id: 116, categoria: 'brasil',
        titulo: 'Silvia Abravanel mira Brasília: filha de Silvio Santos pré-candidata a deputada federal',
        resumo: 'Silvia Abravanel, filha do apresentador Silvio Santos (1930-2024), anunciou sua pré-candidatura ao cargo de deputada federal. Ela disputará uma vaga por São Paulo, representando o Partido Social Democrático (PSD).',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/03/vlcsnap-2026-03-06-19h56m48s400.png?w=200',
        autor: 'paulovito', tempo: 'agora'
    },
    {
        id: 117, categoria: 'brasil',
        titulo: 'PF aponta Jaques Wagner como suposto beneficiário de vantagens de grupo \'Master\'',
        resumo: 'A Polícia Federal aponta Jaques Wagner como suposto beneficiário de vantagens ligadas a um grupo denominado \'Master\'. A investigação detalha que os benefícios incluíam o uso gratuito de aeronaves, estruturação de pagamentos, outras benesses e aquisições patrimoniais.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/05/53360387573_88ffa5e60d_k.jpg?w=200',
        autor: 'Rafael Sotero', tempo: 'agora'
    },
    {
        id: 118, categoria: 'brasil',
        titulo: 'México e Coreia do Sul em confronto decisivo por vaga antecipada no mata-mata',
        resumo: 'Em Guadalajara, México e Coreia do Sul fazem um duelo direto pelo Grupo A. Ambas as seleções possuem três pontos, e o vencedor do confronto garantirá a classificação antecipada para a fase de mata-mata, somando seis pontos.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/06/17JUNHO26_TREINO_28-e1781735436197.jpg?w=200',
        autor: 'juliamachado', tempo: 'agora'
    },
    {
        id: 119, categoria: 'politica',
        titulo: 'PF mira Jaques Wagner em operação por propina; Durigan reitera confiança',
        resumo: 'O senador Jaques Wagner, líder do governo no Senado, foi alvo da 9ª fase da Operação Compliance Zero, deflagrada nesta quinta-feira (18). A Polícia Federal investiga o político por suposto recebimento de propina. Apesar das acusações, Durigan manifestou confiança no senador.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2021/08/21276_C00F3FE509CC55C9-7.jpeg?w=200',
        autor: 'matheusoliveira', tempo: 'agora'
    },
    {
        id: 120, categoria: 'esportes',
        titulo: 'Ex-goleiro Jorge Campos encontra presidente da FIFA após partida da Copa',
        resumo: 'O ex-goleiro Jorge Campos, lenda do futebol mexicano, fez uma aparição notável ao lado do presidente da FIFA. O encontro se deu após o ícone esportivo assistir a um jogo da Copa do Mundo.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/12/taca-copa-e1764955029896.jpg?w=200',
        autor: 'Mariana Valbão', tempo: 'agora'
    },
    {
        id: 121, categoria: 'brasil',
        titulo: 'Disputa no Campo de Atlanta: Westlawn aciona Brava por direito de preferência',
        resumo: 'A Westlawn protocolou um pedido de arbitragem contra a Brava, relacionado ao Campo de Atlanta. A empresa alega que a Oferta Pública de Aquisição (OPA) da Ecopetrol pode acionar seu direito de preferência para adquirir uma participação na companhia.',
        imagem: 'https://admin.preprod.cnnbrasil.com.br/wp-content/uploads/sites/12/Reuters_Direct_Media/BrazilOnlineReportAgribusinessNews/tagreuters.com2025binary_LYNXMPEL7B0NG-BASEIMAGE.jpg?w=200',
        autor: 'mariajuliablanes', tempo: 'agora'
    },
    {
        id: 122, categoria: 'politica',
        titulo: 'Líder do governo Lula no Senado é alvo da PF por apartamento de R$ 2,4 milhões',
        resumo: 'O líder do governo Lula no Senado, Jaques Wagner, está sob investigação da Polícia Federal. Ele é alvo da nova fase da Operação Compliance Zero, que apura o suposto recebimento de um apartamento avaliado em R$ 2,4 milhões de Vorcaro. A operação investiga fraudes financeiras no Banco Master.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/06/Daniel-Vorcaro-e-Jaques-Wagner.png?w=1200&h=630&crop=1',
        autor: 'gabrielaboechat', tempo: 'agora'
    },
    {
        id: 123, categoria: 'brasil',
        titulo: 'Quem Ama Cuida: Adriana, presa por morte de Arthur, terá encontro com Pedro',
        resumo: 'Na trama, a fisioterapeuta Adriana, presa e considerada culpada pela morte de Arthur Brandão, terá um encontro romântico com Pedro. O evento promete movimentar a narrativa, trazendo um novo desdobramento para a complexa relação do casal.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/06/Copia-de-MARIANA-XIMENES-IMPRENSA-1.png?w=200',
        autor: 'carolineferreira', tempo: 'agora'
    },
    {
        id: 124, categoria: 'cidade',
        titulo: 'Câmera registra PM atirando em homem com facão na Zona Norte de SP',
        resumo: 'Um novo vídeo de câmera de segurança mostra um policial militar atirando em um homem que portava um facão na região do Jaraguá, Zona Norte de São Paulo. As imagens também registram o momento do disparo e o aparente desespero do agente.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/06/APURACAO-CNN-4-1.png?w=200',
        autor: 'robertosouza', tempo: 'agora'
    },
    {
        id: 125, categoria: 'brasil',
        titulo: 'Incêndio em Armazém nos EUA Libera Amônia e Afasta Bombeiros',
        resumo: 'Um incêndio em um armazém nos Estados Unidos causou a liberação de gás de amônia, provocando um alerta. Atingindo uma tubulação pressurizada, o fogo forçou os bombeiros a recuarem da área para garantir a segurança.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/06/Incendio-florestal-atinge-condado-de-Riverside-na-California.jpeg?w=200',
        autor: 'poliannelima', tempo: 'agora'
    },
    {
        id: 126, categoria: 'politica',
        titulo: 'Citi revisa: Fed cortará juros apenas em outubro e dezembro de 2026',
        resumo: 'A corretora Citi, que historicamente defende uma política monetária expansionista, revisou sua projeção para os cortes de juros do Federal Reserve. A nova expectativa é de que o Fed implemente reduções de 25 pontos-base em outubro e dezembro de 2026.',
        imagem: 'https://admin.alpha.cnnbrasil.com.br/wp-content/uploads/sites/12/2021/06/500_0A1BE8EA8BA24419-4.jpg?w=200',
        autor: 'mariajuliablanes', tempo: 'agora'
    },
    {
        id: 127, categoria: 'cidade',
        titulo: 'Estudantes Concorrem a Prêmios em Dinheiro em Olimpíada de IA',
        resumo: 'Uma nova Olimpíada de Inteligência Artificial (IA) foi lançada, oferecendo prêmios em dinheiro para estudantes. A iniciativa é uma colaboração do Centro de Excelência em Inteligência Artificial (Ceia-UFG) e da Secretaria de Estado de Ciência, Tecnologia e Inovação de Goiás (Secti Goiás).',
        imagem: 'https://admin.develop.cnnbrasil.com.br/wp-content/uploads/sites/12/2025/08/inova-jovem-unicamp.jpg?w=200',
        autor: 'paulovito', tempo: 'agora'
    },
    {
        id: 128, categoria: 'brasil',
        titulo: 'Chef denuncia ameaças à PF por supostas gravações na casa de Vorcaro',
        resumo: 'Um chef de cozinha relatou à Polícia Federal ter sofrido ameaças. Ele afirmou que um grupo, conhecido como \'A Turma\' e ligado ao banqueiro Vorcaro, o questionou sobre supostas gravações feitas enquanto trabalhava na casa de praia do empresário.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/06/ANVISA-SUSPENDE.png?w=200',
        autor: 'gabrielaboechat', tempo: 'agora'
    },
    {
        id: 129, categoria: 'brasil',
        titulo: 'Justiça confisca milhões do Tren de Aragua em megaoperação contra o crime em Roraima',
        resumo: 'A Justiça brasileira confiscou milhões de reais da facção criminosa venezuelana Tren de Aragua. A ação, realizada em Roraima, é considerada uma das maiores investidas contra o crime organizado no estado.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/06/WhatsApp-Image-2026-06-16-at-07.57.09.jpeg?w=200',
        autor: 'Bruna Lopes', tempo: 'agora'
    },
    {
        id: 130, categoria: 'esportes',
        titulo: 'Copa: Elye Wahi, Investigado por Manipulação, Desfalca Costa do Marfim Contra Alemanha',
        resumo: 'O atacante Elye Wahi não entrará em campo pela Costa do Marfim na segunda rodada da Copa, enfrentando a Alemanha. O jogador foi afastado da partida enquanto é investigado por suspeita de manipulação de resultados.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/06/Messi-e-Vini-Jr-e1781784189869.png?w=200',
        autor: 'raulmoura', tempo: 'agora'
    },
    {
        id: 131, categoria: 'brasil',
        titulo: 'PF mira grupo criminoso por espionagem de autoridades em MG na 2ª fase da Operação Rejeito',
        resumo: 'A Polícia Federal deflagrou nesta manhã (18) a segunda fase da Operação Rejeito em Minas Gerais. A ação visa um grupo suspeito de espionagem contra autoridades públicas e particulares no estado.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2021/06/15664_9CCA369C2D8A08CC.jpg?w=200',
        autor: 'Bruna Lopes', tempo: 'agora'
    },
    {
        id: 132, categoria: 'esportes',
        titulo: 'Reencontro histórico: Brasil e Argentina podem duelar na Copa 2026',
        resumo: 'O mundo do futebol aguarda a possibilidade de um confronto entre Brasil e Argentina na Copa do Mundo de 2026. As duas potências sul-americanas não se enfrentam no torneio desde a edição de 1990, na Itália, gerando grande expectativa para um reencontro.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/06/1-GettyImages-2281445848-e1781621505906.jpg?w=200',
        autor: 'leonardocosta', tempo: 'agora'
    },
    {
        id: 133, categoria: 'esportes',
        titulo: 'Discussão entre Tuchel e Pickford agita vitória da Inglaterra contra a Croácia',
        resumo: 'Um desentendimento entre o técnico Thomas Tuchel e o goleiro Jordan Pickford marcou a partida da Inglaterra contra a Croácia. O incidente ocorreu com os ingleses já vencendo por 1 a 0, segundo relatos de um jornal.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/06/GettyImages-2282099132-e1781738318573.jpg?w=200',
        autor: 'Mariana Valbão', tempo: 'agora'
    },
    {
        id: 134, categoria: 'internacional',
        titulo: 'Ormuz: Superpetroleiros revelam rotas após acordo EUA-Irã e semanas de sigilo',
        resumo: 'Após semanas de rotas ocultas, superpetroleiros transportando seis milhões de barris de petróleo bruto voltaram a ser rastreados no Estreito de Ormuz. A visibilidade retoma-se após a assinatura de um acordo entre Estados Unidos e Irã.',
        imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/06/Captura-de-tela-2026-06-17-195502.png?w=200',
        autor: 'poliannelima', tempo: 'agora'
    },
];

const videos = [
    {
        id: 1, titulo: 'Jaques Wagner, líder do governo Lula, é alvo de operação no Caso Master - BORA BRASIL - 18/06/2026',
        thumb: 'https://img.youtube.com/vi/qP_U4m1ppq0/hqdefault.jpg', duracao: '08:00',
        videoId: 'qP_U4m1ppq0', embedUrl: 'https://www.youtube.com/embed/qP_U4m1ppq0'
    },
    {
        id: 2, titulo: '[AO VIVO] JORNAL DA BAND - 18/06/2026',
        thumb: 'https://img.youtube.com/vi/WNFArYLrfDg/hqdefault.jpg', duracao: '1:30:00',
        videoId: 'WNFArYLrfDg', embedUrl: 'https://www.youtube.com/embed/WNFArYLrfDg'
    },
    {
        id: 3, titulo: 'AO VIVO: LIVE CNN - 18/06/2026',
        thumb: 'https://img.youtube.com/vi/PvF7TSPvn74/hqdefault.jpg', duracao: '1:30:00',
        videoId: 'PvF7TSPvn74', embedUrl: 'https://www.youtube.com/embed/PvF7TSPvn74'
    },
    {
        id: 4, titulo: 'AO VIVO: O BRASIL VAI GOLEAR? CR7 DECEPCIONA E INGLATERRA SE FIRMA COMO FAVORITA',
        thumb: 'https://img.youtube.com/vi/4pgGSpzJbxQ/hqdefault.jpg', duracao: '1:30:00',
        videoId: '4pgGSpzJbxQ', embedUrl: 'https://www.youtube.com/embed/4pgGSpzJbxQ'
    },
    {
        id: 5, titulo: 'MORNING SHOW - 18/06/26',
        thumb: 'https://img.youtube.com/vi/nFLcHUMWdpU/hqdefault.jpg', duracao: '08:00',
        videoId: 'nFLcHUMWdpU', embedUrl: 'https://www.youtube.com/embed/nFLcHUMWdpU'
    },
    {
        id: 6, titulo: 'ENDRICK SERÁ TITULAR VS HAITI? CR7 PASSA VERGONHA E KANE DOUTRINA EM ESTREIA! | BASTIDORES DA COPA',
        thumb: 'https://img.youtube.com/vi/IpFlsuVWy3A/hqdefault.jpg', duracao: '08:00',
        videoId: 'IpFlsuVWy3A', embedUrl: 'https://www.youtube.com/embed/IpFlsuVWy3A'
    },
    {
        id: 7, titulo: '🔴 AO VIVO: NEWS MANHÃ, com Lívia Zanolini | 18/06/2026 | SBT NEWS',
        thumb: 'https://img.youtube.com/vi/Ou0RJj8q94s/hqdefault.jpg', duracao: '1:30:00',
        videoId: 'Ou0RJj8q94s', embedUrl: 'https://www.youtube.com/embed/Ou0RJj8q94s'
    },
    {
        id: 8, titulo: '🔴 AO VIVO: RADAR NEWS, com Roberta Russo | 18/06/2026 | SBT NEWS',
        thumb: 'https://img.youtube.com/vi/Vn4PvHauqTk/hqdefault.jpg', duracao: '1:30:00',
        videoId: 'Vn4PvHauqTk', embedUrl: 'https://www.youtube.com/embed/Vn4PvHauqTk'
    },
];

const breakingNews = [
    'URGENTE: PF deflagra Operação Compliance Zero no RJ, investigando Banco Master por fraude bilionária.',
    'AGORA: Banco Master e Daniel Vorcaro, do RJ, são alvo da PF em nova fase da Operação Compliance Zero.',
    'ÚLTIMA HORA: Fraude bilionária: Operação Compliance Zero da PF mira Banco Master do Rio. Detalhes em breve!',
];

const cotacoes = [
    { nome: 'Dólar', icone: 'attach_money', valor: 'R$ 5.17', variacao: '+0.9%', direcao: 'up' },
    { nome: 'Euro', icone: 'euro', valor: 'R$ 5.92', variacao: '+0.7%', direcao: 'up' },
    { nome: 'Ibovespa', icone: 'show_chart', valor: '168.613', variacao: '+0.1%', direcao: 'up' },
    { nome: 'Soja (sc)', icone: 'eco', valor: 'R$ 129.89', variacao: '+0.9%', direcao: 'up' },
    { nome: 'Milho (sc)', icone: 'grass', valor: 'R$ 50.79', variacao: '-1.0%', direcao: 'down' },
    { nome: 'Café (sc)', icone: 'coffee', valor: 'R$ 1875', variacao: '-1.1%', direcao: 'down' },
    { nome: 'Algodão (@)', icone: 'agriculture', valor: 'R$ 135.85', variacao: '+3.6%', direcao: 'up' },
    { nome: 'Trigo (sc)', icone: 'bakery_dining', valor: 'R$ 70', variacao: '+0.4%', direcao: 'up' },
    { nome: 'Ouro (g)', icone: 'diamond', valor: 'R$ 708.60', variacao: '-2.0%', direcao: 'down' },
    { nome: 'Petrobras', icone: 'oil_barrel', valor: 'R$ 37.56', variacao: '-2.6%', direcao: 'down' },
    { nome: 'Vale', icone: 'landscape', valor: 'R$ 79.30', variacao: '-0.6%', direcao: 'down' },
    { nome: 'Itaú', icone: 'account_balance', valor: 'R$ 41.19', variacao: '+1.0%', direcao: 'up' },
    { nome: 'Bradesco', icone: 'account_balance', valor: 'R$ 17.72', variacao: '+1.0%', direcao: 'up' },
    { nome: 'Banco do Brasil', icone: 'account_balance', valor: 'R$ 19.55', variacao: '+0.7%', direcao: 'up' },
    { nome: 'S&P 500', icone: 'public', valor: '7471', variacao: '+0.7%', direcao: 'up' },
    { nome: 'Dow Jones', icone: 'public', valor: '51.738', variacao: '+0.5%', direcao: 'up' },
    { nome: 'Boi Gordo (@)', icone: 'pets', valor: 'R$ --', variacao: '0.0%', direcao: 'up' },
    { nome: 'Arroz (sc)', icone: 'rice_bowl', valor: 'R$ 83.74', variacao: '+2.9%', direcao: 'up' },
    { nome: 'Bitcoin', icone: 'currency_bitcoin', valor: 'R$ 328.771', variacao: '-0.6%', direcao: 'down' },
];

const clima = {
    cidade: 'São Paulo', estado: 'SP',
    temperatura: 22, temp_min: 22, temp_max: 24,
    umidade: 89, condicao: 'Nublado',
    icone: 'cloud', vento: 7.5
};

const trending = [
    '#OperacaoComplianceZero #BancoMaster #RJNoticias #RioDeJaneiro',
    '#FraudeBilionaria #PFNoRio #RJNoticias #RioDeJaneiro',
    '#FeminicidaCapturado #Paraty #SegurancaRJ #RJNoticias #RioDeJaneiro',
    '#OperacaoTCP #CrimeOrganizado #RJNoticias #RioDeJaneiro',
    '#PrisoesNoRio #ZicoBacana #RJNoticias #RioDeJaneiro',
    '#CombateAoCrime #ForcasDeSeguranca #RJNoticias #RioDeJaneiro',
];
