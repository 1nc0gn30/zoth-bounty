# [ZB-2026-006] Security Audit of vercel/chat (Webhook Signature Verification, SSRF & DNS Pinning)

- **Category**: `COMPLETED`
- **Target Repository**: `vercel/chat`
- **Program / Channel**: Vercel Open Source / HackerOne
- **Severity**: Cleared (Hardened)
- **CWE**: N/A — Defensive Audit Completed
- **Confidence / Gate Status**: 100% Audited
- **Disclosure Status**: Internal Audit Completed
- **Last Updated**: 2026-10-21T01:40:00-04:00

## Affected Files
- `packages/adapter-shared/src/crypto.ts`
- `packages/adapter-shared/src/download.ts`
- `packages/adapter-gitlab/src/index.ts`
- `packages/adapter-gmail/src/webhook.ts`
- `packages/adapter-whatsapp/src/index.ts`

## Technical Summary & Root Cause
Audited all webhook adapters (GitLab, Gmail, Twilio, WhatsApp, Linear, Telegram) and shared crypto/download utilities. Confirmed constant-time signature comparisons (timingSafeEqual), strict DNS-pinned private IP blocking in download.ts, and proper JWT/OIDC verification.

## Triager Verification & Why This Finding Is Solid
Completed full source audit; refused to file speculative findings.

## Defensive Remediation
No action needed — target is well-hardened.
