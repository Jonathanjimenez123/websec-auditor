from fastapi import FastAPI

from .api import router
from .db import init_db

app = FastAPI(
    title="WebSec Auditor",
    description="API para auditoría pasiva de cabeceras HTTP.",
    version="0.1.0",
)

app.include_router(router)


@app.on_event("startup")
def on_startup():
    init_db()


@app.get("/")
def root():
    return {"message": "WebSec Auditor running"}
