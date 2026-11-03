# [ZB-2026-022] Kubernetes git-sync — Git Worktree, Credential Helper & AskPass Redirect Audit

- **Category**: `COMPLETED`
- **Target Repository**: `kubernetes/git-sync`
- **Program / Channel**: Kubernetes Security / Responsible Disclosure
- **Severity**: Info (Verified Clean)
- **CWE**: N/A
- **Confidence / Gate Status**: undefined
- **Disclosure Status**: undefined
- **Last Updated**: 2026-10-21T06:43:00-04:00

## Affected Files


## Technical Summary & Root Cause
Audited git-sync CLI credential parsing, git worktree creation, submodule initialization, askpass URL fetching, and log redaction. Confirmed StoreCredentials pipes credentials via stdin to git credential approve, CallAskPassURL blocks HTTP redirects (http.ErrUseLastResponse), and logSafeFlags redacts passwords across flags and repo URLs.

## Triager Verification & Why This Finding Is Solid
undefined

## Defensive Remediation
undefined
