
from typing import Optional

from sqlmodel import Field, SQLModel


class Scan(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    url: str
    status_code: Optional[int] = Field(default=None)
    analysis: Optional[str] = Field(default=None)
