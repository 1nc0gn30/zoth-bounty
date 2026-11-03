# [ZB-2026-014] Mattermost MS Teams Plugin Audit (Cleared — OAuth Email Matching & Constant-Time Webhook Secret)

- **Category**: `COMPLETED`
- **Target Repository**: `mattermost/mattermost-plugin-msteams`
- **Program / Channel**: Mattermost (Bugcrowd — Up to $2,000)
- **Severity**: Info / Cleared
- **CWE**: N/A (Hardened)
- **Confidence / Gate Status**: 100% Audited (Clean)
- **Disclosure Status**: Internal Audit Log (Cleared)
- **Last Updated**: 2026-10-21T07:38:34.905Z

## Affected Files
- `server/api.go`
- `server/connect.go`
- `server/bot_messages.go`
- `server/attachments.go`

## Technical Summary & Root Cause
Audited MS Teams OAuth2 redirect flow (server/api.go:358-543), Graph subscription webhook activity/lifecycle handlers (server/api.go:104-177), and attachment downloader (server/attachments.go). Enforces per-user PKCE code_verifier, msteamsUser.Mail == mmUser.Email verification, and subtle.ConstantTimeCompare on ClientState webhook secrets.

## Triager Verification & Why This Finding Is Solid
Email equality check (msteamsUser.Mail == mmUser.Email) and single-use state verification prevent cross-user account linking.

## Defensive Remediation
No action needed — target cleared.
