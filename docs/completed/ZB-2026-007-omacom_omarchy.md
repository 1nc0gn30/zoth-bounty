# [ZB-2026-007] Security Audit of omacom/omarchy (Untrusted Git Theme Sandboxing & Plugin Validator)

- **Category**: `COMPLETED`
- **Target Repository**: `omacom/omarchy`
- **Program / Channel**: Omarchy Open Source
- **Severity**: Cleared (Hardened)
- **CWE**: N/A — Defensive Audit Completed
- **Confidence / Gate Status**: 100% Audited
- **Disclosure Status**: Internal Audit Completed
- **Last Updated**: 2026-10-21T01:40:00-04:00

## Affected Files
- `bin/omarchy-theme-set`
- `bin/omarchy-git-url-check`
- `bin/omarchy-plugin-validate`
- `test/shell.d/theme-staging-test.sh`

## Technical Summary & Root Cause
Audited untrusted git theme installation, symlink staging (stage_installed_theme / stage_installed_dir), transport helper allowlisting (omarchy-git-url-check), and Alacritty TOML color extraction. Confirmed symlinks and code-bearing configs (*.lua, terminal configs, vscode.json) are stripped before staging.

## Triager Verification & Why This Finding Is Solid
Verified complete coverage in test/shell.d/theme-staging-test.sh.

## Defensive Remediation
No action needed — target is well-hardened.
