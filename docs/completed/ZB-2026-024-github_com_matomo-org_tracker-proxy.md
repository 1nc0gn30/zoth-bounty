# [ZB-2026-024] matomo-org/tracker-proxy — Proxy Endpoint Whitelist, Path Traversal & Header Forwarding Audit

- **Category**: `COMPLETED`
- **Target Repository**: `github.com/matomo-org/tracker-proxy`
- **Program / Channel**: Matomo (HackerOne)
- **Severity**: Info (Verified Clean)
- **CWE**: N/A
- **Confidence / Gate Status**: 100% — Static Audit Complete
- **Disclosure Status**: undefined
- **Last Updated**: 2026-10-21T07:45:00-04:00

## Affected Files


## Technical Summary & Root Cause
Audited Matomo tracker-proxy for SSRF, path traversal, and parameter smuggling between matomo-proxy.php and upstream Matomo index.php/matomo.php. Verified strict in_array(..., true) checks against $VALID_FILES and $SUPPORTED_METHODS, plus safe http_build_query construction in proxy.php.

## Triager Verification & Why This Finding Is Solid
undefined

## Defensive Remediation
None required.
