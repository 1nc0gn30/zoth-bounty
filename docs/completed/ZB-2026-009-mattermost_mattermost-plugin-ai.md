# [ZB-2026-009] Mattermost Plugin AI & MCP Server Audit (Cleared — Hardened OAuth & Sandboxed Artifacts)

- **Category**: `COMPLETED`
- **Target Repository**: `mattermost/mattermost-plugin-ai`
- **Program / Channel**: Mattermost (Bugcrowd — Up to $2,000)
- **Severity**: Info / Cleared
- **CWE**: N/A (Hardened)
- **Confidence / Gate Status**: 100% Audited (Clean)
- **Disclosure Status**: Internal Audit Log (Cleared)
- **Last Updated**: 2026-10-21T05:52:54.609Z

## Affected Files
- `api/api_oauth.go`
- `api/api_artifacts.go`
- `mcpserver/http_server.go`

## Technical Summary & Root Cause
Audited Mattermost AI Plugin v2 MCP OAuth flows (RFC 9728 resource_metadata origin validation, RFC 9207 iss verification), HTML artifact rendering (Sec-Fetch-Dest: iframe, Sec-Fetch-Site: same-origin, CSP sandbox allow-scripts with Connection-Allowlist: (), HMAC-SHA256 bridge tokens), and standalone HTTP MCP server (DNS rebinding Host/Origin validation). Properly hardened.

## Triager Verification & Why This Finding Is Solid
All untrusted MCP resource metadata URLs, OAuth error codes, and HTML artifact bridges are strictly validated and origin-isolated.

## Defensive Remediation
No action needed — target cleared.
