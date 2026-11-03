# [ZB-2026-001] Arbitrary Host File Disclosure via dereference: true Symlink Following in copyDir & npx skills use

- **Category**: `PENDING`
- **Target Repository**: `vercel-labs/skills`
- **Program / Channel**: Vercel Responsible Disclosure (responsible.disclosure@vercel.com)
- **Severity**: High (CVSS 7.5)
- **CWE**: CWE-59 / CWE-61 (UNIX Symbolic Link Following)
- **Confidence / Gate Status**: 100% (Verified in Source + Contradicts Sibling Module Guards)
- **Disclosure Status**: Disclosed to responsible.disclosure@vercel.com (Resend ID: 01a15cf8-cda2-7cea-b848-28ed0435e44d, CC: business@nullai.tech)
- **Last Updated**: 2026-10-21T01:40:00-04:00

## Affected Files
- `src/installer.ts:542-563`
- `src/use.ts:577-610`
- `src/download-source.ts:106-108 (comparison)`

## Technical Summary & Root Cause
In src/installer.ts:542-563 (copyDir) and src/use.ts:577-610 (copySkillFiles), skills cloned via Git are copied into the project workspace using cp(srcPath, destPath, { dereference: true, recursive: true }). A developer comment on line 553 explicitly notes '// Skip broken symlinks (e.g., pointing to absolute paths on another machine) instead of aborting the entire install', catching ENOENT when a symlink target is missing. However, when the target path DOES exist on the user's or CI runner's machine (e.g., ~/.ssh/id_rsa, ~/.aws/credentials, /etc/passwd, or ../../../../.env), dereference: true follows the symlink and copies the victim's host file into .agents/skills/<skill>/ or prints it to stdout during npx skills use.

## Triager Verification & Why This Finding Is Solid
Sibling modules in the exact same repo (src/download-source.ts:106 and src/providers/wellknown.ts:291) explicitly block symlinks ('Archive links are not supported') and enforce path containment. The developer comment on line 553 proves symlinks in remote Git repos were considered for availability (ENOENT) but missed for confidentiality.

## Defensive Remediation
Resolve realpath(srcPath) before copying and verify it remains strictly inside realpath(skillRootDir) using isSubpathSafe(), or reject symbolic links (entry.isSymbolicLink()) in copyDir and copySkillFiles.
