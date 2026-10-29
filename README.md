# WebSec Auditor

Plataforma web para la revisión pasiva de seguridad de sitios web. Proyecto de portafolio enfocado en desarrollo web, automatización y ciberseguridad.

**Demo:** https://websec-auditor-two.vercel.app/
**API:** https://websec-auditor-75vb.onrender.com
**Documentación API:** https://websec-auditor-75vb.onrender.com/docs

## Objetivo

Facilitar la revisión inicial de aspectos de seguridad HTTP y presentar los resultados mediante una interfaz web. El proyecto se desarrolla con fines educativos y de portafolio profesional.

## Tecnologías

- **Frontend:** React, Vite y JavaScript.
- **Backend:** Python y FastAPI.
- **Despliegue frontend:** Vercel.
- **Despliegue API:** Render.
- **Pruebas y calidad:** suite de pruebas automatizadas del backend.

## Estructura del repositorio

```text
websec-auditor/
├── .github/workflows/    # Automatización del repositorio
├── frontend/             # Aplicación web React
├── src/websec_auditor/   # Código del backend
├── tests/                # Pruebas automatizadas
├── .env.example          # Plantilla de configuración
├── Dockerfile
├── pyproject.toml
├── poetry.lock
└── README.md
```

## Ejecución local

### Requisitos

- Python 3.11 o compatible con las dependencias del proyecto.
- Poetry.
- Node.js y npm.
- Docker, opcional.

### Backend

Desde la raíz del repositorio:

```bash
poetry install
poetry run uvicorn src.websec_auditor.main:app --reload --host 127.0.0.1 --port 8000
```

La documentación local estará disponible en `http://127.0.0.1:8000/docs`.

Si el proyecto requiere variables de entorno, configura un archivo `.env` local a partir de `.env.example`. No publiques credenciales ni secretos.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Para validar la compilación de producción:

```bash
npm run build
```

## Docker

Construir la imagen:

```bash
docker build -t websec-auditor .
```

Ejecutar el contenedor:

```bash
docker run --rm -p 8000:8000 websec-auditor
```

## Uso responsable

Utiliza la herramienta únicamente con dominios y sistemas propios o para los que tengas autorización explícita. Respeta las condiciones de uso de los servicios y evita pruebas intrusivas o que puedan afectar la disponibilidad de terceros.

## Estado del proyecto

Proyecto personal en evolución. Las funciones, las pruebas y la disponibilidad de los servicios deben verificarse en cada versión publicada.

## Autor

Jonathan Jimenez Escobar

- GitHub: https://github.com/Jonathanjimenez123
- Proyecto: WebSec Auditor
