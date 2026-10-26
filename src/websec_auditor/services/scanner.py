
from typing import Dict

import httpx


SECURITY_HEADERS = [
    "content-security-policy",
    "x-frame-options",
    "x-content-type-options",
    "strict-transport-security",
    "referrer-policy",
    "permissions-policy",
]


def analyze_headers(headers: Dict[str, str]) -> str:
    lower = {key.lower(): value for key, value in headers.items()}
    missing = [header for header in SECURITY_HEADERS if header not in lower]
    issues = []

    if missing:
        issues.append(f"missing: {', '.join(missing)}")

    if "server" in lower:
        issues.append(
            f"server-header: {lower['server']} (revisar exposición)"
        )

    return "; ".join(issues) if issues else "ok"


def scan_url_simple(url: str, timeout: float = 10.0) -> dict:
    try:
        with httpx.Client(
            timeout=timeout,
            follow_redirects=True,
        ) as client:
            response = client.get(url)

        return {
            "status_code": response.status_code,
            "analysis": analyze_headers(response.headers),
        }
    except Exception as error:
        return {
            "status_code": None,
            "analysis": f"error: {error}",
        }

