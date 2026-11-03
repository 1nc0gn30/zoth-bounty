# [ZB-2026-002] Git Option Injection (--upload-pack / -c) via Disabled simple-git Guards & Missing '--' in cloneRepo

- **Category**: `PENDING`
- **Target Repository**: `vercel-labs/skills`
- **Program / Channel**: Vercel Responsible Disclosure (responsible.disclosure@vercel.com)
- **Severity**: Critical / High (CVSS 8.8)
- **CWE**: CWE-88 (Argument Injection)
- **Confidence / Gate Status**: 100% (Verified in Source + Explicit Developer Comment Mismatch)
- **Disclosure Status**: Disclosed to responsible.disclosure@vercel.com (Resend ID: 01a15cf8-cda2-7cea-b848-28ed0435e44d, CC: business@nullai.tech)
- **Last Updated**: 2026-10-21T01:40:00-04:00

## Affected Files
- `src/git.ts:186-217`
- `src/git.ts:289-315`
- `src/update.ts:729-733`
- `src/update.ts:881`

## Technical Summary & Root Cause
createGitClient() in src/git.ts:194-216 disables all 19 simple-git safety guards (including allowUnsafePack: true, allowUnsafeProtocolOverride: true, allowUnsafeHooksPath: true) based on the comment on lines 190-192 claiming 'the clone URL and ref cannot configure them'. However, cloneRepo(url, ref) on line 295 only checks if (/^ext::/i.test(url)), never rejects url or ref values starting with '-', and omits '--' (end-of-options) when calling git.clone(url, tempDir, cloneOptions). Meanwhile, src/update.ts:729-733 explicitly documents that skills-lock.json is an untrusted attack surface ('influenceable by whoever publishes a skill'), yet line 881 passes entry.sourceUrl and entry.ref from skills-lock.json directly into cloneRepo.

## Triager Verification & Why This Finding Is Solid
Sibling functions in the same file (tryGhClone on line 255 and getGitTreeHash on line 401) explicitly pass '--' to prevent option injection, proving its omission in cloneRepo alongside allowUnsafePack: true is a concrete security oversight.

## Defensive Remediation
Reject any url or ref starting with '-' in cloneRepo() and append '--' to cloneOptions before the positional url and tempDir arguments.
