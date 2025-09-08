from websec_auditor.services.scanner import analyze_headers, scan_url_simple




def test_analyze_headers_ok():
headers = {
"Content-Security-Policy": "default-src 'self'",
"X-Frame-Options": "DENY",
"X-Content-Type-Options": "nosniff",
"Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
"Referrer-Policy": "no-referrer"
}
res = analyze_headers(headers)
assert res == "ok"




def test_scan_url_simple():
# llamada real a example.com — en CI puedes mockear
res = scan_url_simple("https://example.com")
assert "status_code" in res
assert "analysis" in res

