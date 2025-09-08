from typing import Optional
from sqlmodel import SQLModel, Field


class Scan(SQLModel, table=True):
id: Optional[int] = Field(default=None, primary_key=True)
url: str
status_code: Optional[int] = None
analysis: Optional[str] = None

