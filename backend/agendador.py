"""
GMAX NOTÍCIAS — Agendador Automático (Segunda e Quinta)
"""

import sys, os, time, logging
from datetime import datetime

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from config import HORARIOS_ATUALIZACAO, DIAS_ATUALIZACAO

logger = logging.getLogger('gmaxnoticias.agendador')
DIAS_PT = {'monday':'Segunda','tuesday':'Terça','wednesday':'Quarta','thursday':'Quinta','friday':'Sexta','saturday':'Sábado','sunday':'Domingo'}


def executar_agora():
    from main import configurar_logging, executar_atualizacao
    configurar_logging()
    return executar_atualizacao()


def iniciar_agendador():
    import schedule
    from main import configurar_logging
    configurar_logging()
    logger.info("GMAX NOTÍCIAS — Agendador Iniciado")
    logger.info(f"Dias: {', '.join(DIAS_PT.get(d,d) for d in DIAS_ATUALIZACAO)}")
    logger.info(f"Horários: {', '.join(HORARIOS_ATUALIZACAO)}")

    for dia in DIAS_ATUALIZACAO:
        for horario in HORARIOS_ATUALIZACAO:
            getattr(schedule.every(), dia.lower()).at(horario).do(_exec)
            logger.info(f"  Agendado: {DIAS_PT.get(dia.lower(),dia)} às {horario}")

    _exec()
    while True:
        schedule.run_pending()
        time.sleep(30)


def _exec():
    try:
        from main import executar_atualizacao
        logger.info(f"\n--- Atualização: {datetime.now().strftime('%d/%m/%Y %H:%M')} ---")
        executar_atualizacao()
    except Exception as e:
        logger.error(f"Erro: {e}", exc_info=True)


if __name__ == '__main__':
    if len(sys.argv) > 1:
        cmd = sys.argv[1]
        if cmd == '--agora': sys.exit(0 if executar_agora() else 1)
        elif cmd == '--servico': iniciar_agendador()
        elif cmd == '--bat':
            logging.basicConfig(level=logging.INFO)
            d = os.path.dirname(os.path.abspath(__file__))
            with open(os.path.join(d,'atualizar.bat'),'w') as f: f.write(f'@echo off\ncd /d "{d}"\npython main.py\npause\n')
            logger.info("atualizar.bat criado!")
        else: print("Uso: --agora | --servico | --bat")
    else:
        sys.exit(0 if executar_agora() else 1)
