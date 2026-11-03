# [ZB-2026-021] Circle Arc Remote Signer — Nitro Enclave Attestation, KMS Proxy & Key Lifecycle Audit

- **Category**: `COMPLETED`
- **Target Repository**: `circlefin/arc-remote-signer`
- **Program / Channel**: Circle Security / Responsible Disclosure
- **Severity**: Info (Verified Clean)
- **CWE**: N/A
- **Confidence / Gate Status**: undefined
- **Disclosure Status**: undefined
- **Last Updated**: 2026-10-21T06:43:00-04:00

## Affected Files


## Technical Summary & Root Cause
Audited Circle Arc Remote Signer gRPC service, Nitro Enclave COSE Sign1 attestation parsing, KMS key ARN/region validation, awsproxy loopback binding, and secret envelope gob deserialization. Confirmed validateAwsproxyConfig enforces loopback host and exact port match, canonicalKMSEndpoint restricts regions to a commercial allowlist with TLS SNI pinning, and loadKeyFromSecret prevents cross-algorithm key confusion.

## Triager Verification & Why This Finding Is Solid
undefined

## Defensive Remediation
undefined
