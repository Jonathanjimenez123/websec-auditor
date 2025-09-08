FROM python:3.11-slim
WORKDIR /app


# Instala dependencias del sistema necesarias
RUN apt-get update && apt-get install -y build-essential curl && rm -rf /var/lib/apt/lists/*


# Copiar pyproject y lock (si existe)
COPY pyproject.toml poetry.lock* /app/


# Instalar Poetry e instalar dependencias (sin dev para producción)
RUN pip install --upgrade pip \
&& pip install poetry \
&& poetry config virtualenvs.create false \
&& poetry install --no-dev --no-interaction


# Copiar el código
COPY . /app


ENV PORT=8000
EXPOSE 8000


CMD ["uvicorn", "src.websec_auditor.main:app", "--host", "0.0.0.0", "--port", "8000"]

