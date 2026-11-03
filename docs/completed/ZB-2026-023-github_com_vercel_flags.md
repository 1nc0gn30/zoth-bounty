# [ZB-2026-023] vercel/flags — JWE A256GCM Token Purpose Separation & Timing-Safe Bearer Auth Audit

- **Category**: `COMPLETED`
- **Target Repository**: `github.com/vercel/flags`
- **Program / Channel**: Vercel (HackerOne)
- **Severity**: Info (Verified Clean)
- **CWE**: N/A
- **Confidence / Gate Status**: 100% — Static Audit Complete
- **Disclosure Status**: undefined
- **Last Updated**: 2026-10-21T07:45:00-04:00

## Affected Files


## Technical Summary & Root Cause
Audited JWE encryption/decryption (decryptJwe, encryptJwe) and verifyAccess in vercel/flags. Verified that decryptJwe strictly enforces A256GCM + dir, validates the pur claim (overrides, values, definitions, proof) to prevent cross-purpose token confusion, and verifyAccess uses Node crypto.timingSafeEqual on equal-length buffers.

## Triager Verification & Why This Finding Is Solid
undefined

## Defensive Remediation
None required.
