from pydantic import BaseModel, HttpUrl
from typing import Optional


class ScanCreate(BaseModel):
url: HttpUrl


class ScanRead(BaseModel):
id: int
url: str
status_code: Optional[int]
analysis: Optional[str]


class Config:
orm_mode = True

