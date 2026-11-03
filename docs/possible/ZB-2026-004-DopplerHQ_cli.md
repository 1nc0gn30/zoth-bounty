# [ZB-2026-004] Doppler CLI Windows updateViaWinget Version Argument & Local Fallback PBKDF2 Iteration Count

- **Category**: `POSSIBLE`
- **Target Repository**: `DopplerHQ/cli`
- **Program / Channel**: Doppler Bug Bounty
- **Severity**: Low / Informational (Held Back — Do Not Submit)
- **CWE**: CWE-88 / CWE-916
- **Confidence / Gate Status**: Held Back (Requires Upstream cli.doppler.com Compromise)
- **Disclosure Status**: Not Disclosed (Filtered by Zero-False-Positive Gate)
- **Last Updated**: 2026-10-21T01:40:00-04:00

## Affected Files
- `pkg/controllers/upgrade.go:220-250`
- `pkg/crypto/aes.go:63-74`

## Technical Summary & Root Cause
In pkg/controllers/upgrade.go, updateViaWinget passes version.ProgramVersion to exec.Command('cmd.exe', '/C', 'winget upgrade --id Doppler.doppler --version '+version). However, this version string is fetched over HTTPS from Doppler's own cli.doppler.com server and parsed through version.Normalize(). Similarly, the 5,000-round PBKDF2 fallback in pkg/crypto/aes.go is only triggered if passphrase.DeriveKey returns an error.

## Triager Verification & Why This Finding Is Solid
HELD BACK IN 'POSSIBLE / NOT SURE': Submitting this would look weak because exploiting updateViaWinget requires already compromising Doppler's official release server. Kept strictly as internal documentation.

## Defensive Remediation
Pass arguments directly to exec.Command('winget', 'upgrade', '--id', 'Doppler.doppler', '--version', version) without cmd.exe /C, and fail closed if passphrase.DeriveKey errors.
