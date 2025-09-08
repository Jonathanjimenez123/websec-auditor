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
lower = {k.lower(): v for k, v in headers.items()}
missing = [h for h in SECURITY_HEADERS if h not in lower]
issues = []
if missing:
issues.append(f"missing: {', '.join(missing)}")
# ejemplo simple de check
if "server" in lower:
issues.append(f"server-header: {lower.get('server')} (revisar exposición)")
return "; ".join(issues) if issues else "ok"




def scan_url_simple(url: str, timeout: float = 10.0) -> dict:
try:
with httpx.Client(timeout=timeout, follow_redirects=True) as client:
r = client.get(url)
return {
"status_code": r.status_code,
"analysis": analyze_headers(r.headers)
}
except Exception as e:
return {"status_code": None, "analysis": f"error: {e}"}

