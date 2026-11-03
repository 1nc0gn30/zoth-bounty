# [ZB-2026-020] Mattermost Calls Plugin — REST API, Host Controls, Bot Routes & TURN Auth Audit

- **Category**: `COMPLETED`
- **Target Repository**: `mattermost/mattermost-plugin-calls`
- **Program / Channel**: Mattermost Bugcrowd / Responsible Disclosure
- **Severity**: Info (Verified Clean)
- **CWE**: N/A
- **Confidence / Gate Status**: undefined
- **Disclosure Status**: undefined
- **Last Updated**: 2026-10-21T05:41:00-04:00

## Affected Files


## Technical Summary & Root Cause
Audited Mattermost Calls HTTP router, standalone CSRF referrer check, recording/transcription job APIs, host control endpoints, pprof debug router, and internal bot upload routes. Confirmed debug/env/stats routes require PermissionManageSystem, bot routes enforce isBotSession, recording actions require channel read + call host identity, and upload sessions verify bot ownership.

## Triager Verification & Why This Finding Is Solid
undefined

## Defensive Remediation
undefined
