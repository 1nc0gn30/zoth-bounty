# [ZB-2026-003] SAML Validation Contract Bypass: NaN Timestamp Expiration Bypass, CDATA Differential & Missing Multi-Element Checks

- **Category**: `PENDING`
- **Target Repository**: `stytchauth/samlshield`
- **Program / Channel**: Stytch Security (GitHub PVR + security@stytch.com)
- **Severity**: Medium / High (Defense-in-Depth Bypass)
- **CWE**: CWE-290 / CWE-436 / CWE-704
- **Confidence / Gate Status**: 100% (Verified Against CONTRACT_TESTING.md)
- **Disclosure Status**: GitHub Advisory GHSA-h4pw-wj8w-qh2h + Email to security@stytch.com (Resend ID: 01a15cf8-cdfa-769f-9a2b-93edf7265034)
- **Last Updated**: 2026-10-21T01:40:00-04:00

## Affected Files
- `src/validate.ts:994-1021`
- `src/validate.ts:140-152`
- `src/validate.ts:868-961`

## Technical Summary & Root Cause
Consolidated 3 concrete validation bypasses in stytchauth/samlshield: (1) In src/validate.ts:994-1021, Date.parse(notOnOrAfter) and Date.parse(notBefore) are never checked for Number.isNaN(); in JavaScript, NaN <= now and NaN > nbTime both evaluate to false, silently passing expired or malformed timestamps. (2) In src/validate.ts:140-152, strictTextContent() only collects NodeType.TEXT_NODE (3) and ignores NodeType.CDATA_SECTION_NODE (4), whereas @node-saml/node-saml concatenates both—creating a parser differential on <NameID>, <Issuer>, and <Audience> elements containing CDATA sections. (3) Subject (line 953), Conditions (line 977), and SignatureValue (line 868) check strict.length > 1 but omit liberal.length > 1.

## Triager Verification & Why This Finding Is Solid
Directly violates the contract testing invariants documented in CONTRACT_TESTING.md and README.md.

## Defensive Remediation
Check Number.isNaN(noaTime) / Number.isNaN(nbTime), include NodeType.CDATA_SECTION_NODE in strictTextContent(), and enforce liberal.length === 1 on Subject, Conditions, and SignatureValue.
