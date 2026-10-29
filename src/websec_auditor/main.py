from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .api import router
from .db import init_db

app = FastAPI(
    title="WebSec Auditor",
    description="API para auditoría pasiva de cabeceras HTTP.",
    version="0.1.0",
)

# Permitir solicitudes desde el frontend autorizado.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://websec-auditor-two.vercel.app",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

# Registrar las rutas de la API.
app.include_router(router)


@app.on_event("startup")
def on_startup():
    init_db()


@app.get("/")
def root():
    return {"message": "WebSec Auditor running"}
