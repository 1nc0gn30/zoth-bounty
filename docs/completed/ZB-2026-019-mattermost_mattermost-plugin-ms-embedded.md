# [ZB-2026-019] Mattermost MS Teams Embedded Plugin — Entra JWT, SSO PostMessage & CSP Audit

- **Category**: `COMPLETED`
- **Target Repository**: `mattermost/mattermost-plugin-ms-embedded`
- **Program / Channel**: Mattermost Bugcrowd / Responsible Disclosure
- **Severity**: Info (Verified Clean)
- **CWE**: N/A
- **Confidence / Gate Status**: undefined
- **Disclosure Status**: undefined
- **Last Updated**: 2026-10-21T05:41:00-04:00

## Affected Files


## Technical Summary & Root Cause
Audited Entra ID JWT validation, iframe SSO session issuance, postMessage origin/source validation, and notification preview rendering. Confirmed validateToken enforces asymmetric signing algorithms, iat/nbf/exp, audience, and tenant GUID allowlist. Confirmed postMessage handlers verify both origin === SiteURL and event.source === iframe.contentWindow. Confirmed notification preview enforces PermissionReadChannel and strict nonce-based CSP.

## Triager Verification & Why This Finding Is Solid
undefined

## Defensive Remediation
undefined
