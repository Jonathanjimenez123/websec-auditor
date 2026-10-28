from fastapi import APIRouter, BackgroundTasks, HTTPException
from sqlmodel import Session

from .db import engine
from .models import Scan
from .schemas import ScanCreate, ScanRead
from .services.scanner import scan_url_simple

router = APIRouter()


@router.post("/scans/", response_model=dict)
def create_scan(
    payload: ScanCreate,
    background_tasks: BackgroundTasks,
):
    url = str(payload.url)
    scan = Scan(url=url)

    with Session(engine) as session:
        session.add(scan)
        session.commit()
        session.refresh(scan)
        scan_id = scan.id

    def _run(sid: int, target_url: str) -> None:
        result = scan_url_simple(target_url)

        with Session(engine) as session:
            item = session.get(Scan, sid)

            if item is None:
                return

            item.status_code = result.get("status_code")
            item.analysis = result.get("analysis")
            session.add(item)
            session.commit()

    background_tasks.add_task(_run, scan_id, url)

    return {"id": scan_id}


@router.get("/scans/{scan_id}", response_model=ScanRead)
def get_scan(scan_id: int):
    with Session(engine) as session:
        item = session.get(Scan, scan_id)

        if item is None:
            raise HTTPException(
                status_code=404,
                detail="Scan not found",
            )

        return item


@router.get("/health")
def health():
    return {"status": "ok"}
