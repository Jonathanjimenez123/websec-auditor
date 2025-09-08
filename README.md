API para auditoría pasiva de cabeceras HTTP. Proyecto para portafolio profesional.


## Requisitos
- Python 3.11+
- Poetry
- Docker (opcional)


## Desarrollo local
1. Clona el repo y entra en la carpeta
2. Copia `.env.example` a `.env` y ajusta si conoces valores
3. Instala dependencias: `poetry install`
4. Ejecuta: `poetry run uvicorn src.websec_auditor.main:app --reload --host 0.0.0.0 --port 8000`


Docs: http://localhost:8000/docs


## Docker
`docker build -t websec-auditor .`\
`docker run -p 8000:8000 websec-auditor`


## Nota de ética
Usa la herramienta sólo sobre hosts que poseas o con permiso explícito.


