# [ZB-2026-017] Mattermost Zoom Plugin — OAuth2, Webhook Signature & Recording SSRF Audit

- **Category**: `COMPLETED`
- **Target Repository**: `mattermost/mattermost-plugin-zoom`
- **Program / Channel**: Mattermost Bugcrowd / Responsible Disclosure
- **Severity**: Info (Verified Clean)
- **CWE**: N/A
- **Confidence / Gate Status**: undefined
- **Disclosure Status**: undefined
- **Last Updated**: 2026-10-21T04:38:00-04:00

## Affected Files


## Technical Summary & Root Cause
Audited Zoom OAuth2 user connection, deauthorization compliance, recording/transcript download routines, and webhook verification. Confirmed completeUserOAuthToZoom fetches state keyed by Mattermost-User-ID header, handleWebhook enforces both constant-time Mattermost secret and Zoom v0 HMAC-SHA256 signature with 5-minute replay window, and downloadZoomFile validates HTTPS hostnames via isZoomDownloadURL.

## Triager Verification & Why This Finding Is Solid
undefined

## Defensive Remediation
undefined
