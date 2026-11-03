# [ZB-2026-011] Auth0 Next.js SDK v4 Audit (Cleared — JWE Cookie Encryption & Safe Redirects)

- **Category**: `COMPLETED`
- **Target Repository**: `auth0/nextjs-auth0`
- **Program / Channel**: Auth0 / Okta (Bugcrowd — Up to $50,000)
- **Severity**: Info / Cleared
- **CWE**: N/A (Hardened)
- **Confidence / Gate Status**: 100% Audited (Clean)
- **Disclosure Status**: Internal Audit Log (Cleared)
- **Last Updated**: 2026-10-21T05:52:54.609Z

## Affected Files
- `src/server/cookies.ts`
- `src/utils/url-helpers.ts`
- `src/utils/proxy.ts`
- `src/utils/session-transfer-helpers.ts`

## Technical Summary & Root Cause
Audited Auth0 Next.js SDK v4 session cookie encryption (A256GCM JWE via HKDF-SHA256), chunked cookie reassembly and cleanup, open-redirect protection (toSafeRedirect strict origin equality), Session Transfer Token HTTPS enforcement, and MCD domain resolver LRU caching. Properly hardened.

## Triager Verification & Why This Finding Is Solid
Redirect helpers enforce strict URL.origin equality and JWE session cookies are encrypted with 256-bit HKDF-derived keys.

## Defensive Remediation
No action needed — target cleared.
