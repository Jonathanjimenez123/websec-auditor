
from unittest.mock import Mock, patch

from websec_auditor.services.scanner import analyze_headers, scan_url_simple


def test_analyze_headers_ok():
    headers = {
        "Content-Security-Policy": "default-src 'self'",
        "X-Frame-Options": "DENY",
        "X-Content-Type-Options": "nosniff",
        "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
        "Referrer-Policy": "no-referrer",
        "Permissions-Policy": "camera=(), microphone=()",
    }

    result = analyze_headers(headers)

    assert result == "ok"


def test_analyze_headers_detects_missing_headers():
    result = analyze_headers({})

    assert result.startswith("missing:")
    assert "content-security-policy" in result
    assert "permissions-policy" in result


def test_analyze_headers_detects_server_header():
    headers = {
        "Content-Security-Policy": "default-src 'self'",
        "X-Frame-Options": "DENY",
        "X-Content-Type-Options": "nosniff",
        "Strict-Transport-Security": "max-age=63072000",
        "Referrer-Policy": "no-referrer",
        "Permissions-Policy": "camera=()",
        "Server": "ExampleServer",
    }

    result = analyze_headers(headers)

    assert "server-header: ExampleServer" in result


@patch("websec_auditor.services.scanner.httpx.Client")
def test_scan_url_simple(mock_client_class):
    mock_response = Mock()
    mock_response.status_code = 200
    mock_response.headers = {
        "Content-Security-Policy": "default-src 'self'",
        "X-Frame-Options": "DENY",
        "X-Content-Type-Options": "nosniff",
        "Strict-Transport-Security": "max-age=63072000",
        "Referrer-Policy": "no-referrer",
        "Permissions-Policy": "camera=()",
    }

    mock_client = Mock()
    mock_client.__enter__ = Mock(return_value=mock_client)
    mock_client.__exit__ = Mock(return_value=False)
    mock_client.get.return_value = mock_response
    mock_client_class.return_value = mock_client

    result = scan_url_simple("https://example.com")

    assert result["status_code"] == 200
    assert result["analysis"] == "ok"
    mock_client.get.assert_called_once_with("https://example.com")
