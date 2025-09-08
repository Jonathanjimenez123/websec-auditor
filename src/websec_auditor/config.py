from pydantic import BaseSettings


class Settings(BaseSettings):
database_url: str = "sqlite:///./dev.db"
log_level: str = "info"


class Config:
env_file = ".env"


settings = Settings()

