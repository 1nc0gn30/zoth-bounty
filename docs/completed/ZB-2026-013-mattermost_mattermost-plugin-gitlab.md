# [ZB-2026-013] Mattermost GitLab Plugin & MCP Bridge Audit (Cleared — Strict OAuth User Binding & Dedup)

- **Category**: `COMPLETED`
- **Target Repository**: `mattermost/mattermost-plugin-gitlab`
- **Program / Channel**: Mattermost (Bugcrowd — Up to $2,000)
- **Severity**: Info / Cleared
- **CWE**: N/A (Hardened)
- **Confidence / Gate Status**: 100% Audited (Clean)
- **Disclosure Status**: Internal Audit Log (Cleared)
- **Last Updated**: 2026-10-21T07:38:34.905Z

## Affected Files
- `server/api.go`
- `server/mcp.go`
- `server/mcp_handlers.go`
- `server/webhook.go`

## Technical Summary & Root Cause
Audited GitLab OAuth2 flow (server/api.go:306-374), Agents MCP tool handlers (server/mcp.go, server/mcp_handlers.go), and GitLab webhook handler (server/webhook.go). OAuth callback strictly enforces p.checkAuth, oauthStateRegexp, and userID == authedUserID (Mattermost-User-ID header). Properly hardened.

## Triager Verification & Why This Finding Is Solid
Confirms sibling plugin pattern where completeConnectUserToGitlab explicitly checks userID == r.Header.Get("Mattermost-User-ID"), further validating our ZB-2026-012 disclosure in mattermost-plugin-jira.

## Defensive Remediation
No action needed — target cleared.
