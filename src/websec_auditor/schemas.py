from typing import Optional

from pydantic import BaseModel, ConfigDict, HttpUrl


class ScanCreate(BaseModel):
    url: HttpUrl


class ScanRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    url: str
    status_code: Optional[int] = None
    analysis: Optional[str] = None
