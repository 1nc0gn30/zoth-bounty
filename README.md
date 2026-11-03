# Zoth Bounty — Security Research & Responsible Disclosure Hub

Clean, zero-false-positive workspace tracking security audits, responsible vulnerability disclosures, and communications across **Ongoing**, **Pending**, **Completed**, and **Possible (Not Sure)** categories.

- **Web Command Center**: `http://localhost:9494` (`node server.js`)
- **Policy**: Zero False Positives — Only 100% source-verified, reproducible vulnerabilities with defensive patches are promoted to Pending/Disclosed.
- **Thermal Governance**: Cool-Running Static Audit Mode (Target CPU < 60°C, Max Burst < 70°C, nice -n 19 ionice -c 3 on all scanners).

---

## 1. Pending (Disclosed & Awaiting Vendor Triage) — 4
- **[ZB-2026-012] Cross-User OAuth 2.0 Account Linking & Jira Cloud Token/Notification Hijacking in httpOAuth2Complete** (`mattermost/mattermost-plugin-jira` · High (CVSS 8.1))
  - *Disclosed via*: Disclosed to responsibledisclosure@mattermost.com (Resend ID: 01a15d35-c4b8-7e2c-bf83-dce79c6f7d34, CC: business@nullai.tech)
- **[ZB-2026-001] Arbitrary Host File Disclosure via dereference: true Symlink Following in copyDir & npx skills use** (`vercel-labs/skills` · High (CVSS 7.5))
  - *Disclosed via*: Disclosed to responsible.disclosure@vercel.com (Resend ID: 01a15cf8-cda2-7cea-b848-28ed0435e44d, CC: business@nullai.tech)
- **[ZB-2026-002] Git Option Injection (--upload-pack / -c) via Disabled simple-git Guards & Missing '--' in cloneRepo** (`vercel-labs/skills` · Critical / High (CVSS 8.8))
  - *Disclosed via*: Disclosed to responsible.disclosure@vercel.com (Resend ID: 01a15cf8-cda2-7cea-b848-28ed0435e44d, CC: business@nullai.tech)
- **[ZB-2026-003] SAML Validation Contract Bypass: NaN Timestamp Expiration Bypass, CDATA Differential & Missing Multi-Element Checks** (`stytchauth/samlshield` · Medium / High (Defense-in-Depth Bypass))
  - *Disclosed via*: GitHub Advisory GHSA-h4pw-wj8w-qh2h + Email to security@stytch.com (Resend ID: 01a15cf8-cdfa-769f-9a2b-93edf7265034)

## 2. Ongoing (Active Audits & Low-CPU Queue) — 1
- **[ZB-2026-008] Overnight Low-CPU Static Audit Queue: AI Agent SDKs, MCP Gateways & CLI Installers** (`Cloned Targets in /opt/bounty-hunter/repos`)
  - *Summary*: Active low-thermal static source code auditing across HackerOne & Bugcrowd open-source scopes. Completed deep-dive audits of @airtable/mcp-cli, @exodus/keychain, matomo-org/tracker-proxy, circlefin/arc-remote-signer, mattermost/mattermost-plugin-ai, mattermost/mattermost-plugin-github, and auth0/nextjs-auth0.

## 3. Completed (Verified / Hardened Target Audits) — 18
- **[ZB-2026-005] Security Audit of cloudflare/vinext (SSR, Server Actions, Image Optimization & Middleware)** (`cloudflare/vinext` · Cleared (Hardened))
- **[ZB-2026-006] Security Audit of vercel/chat (Webhook Signature Verification, SSRF & DNS Pinning)** (`vercel/chat` · Cleared (Hardened))
- **[ZB-2026-007] Security Audit of omacom/omarchy (Untrusted Git Theme Sandboxing & Plugin Validator)** (`omacom/omarchy` · Cleared (Hardened))
- **[ZB-2026-009] Mattermost Plugin AI & MCP Server Audit (Cleared — Hardened OAuth & Sandboxed Artifacts)** (`mattermost/mattermost-plugin-ai` · Info / Cleared)
- **[ZB-2026-010] Mattermost GitHub Plugin Audit (Cleared — Verified OAuth State & Webhook HMAC)** (`mattermost/mattermost-plugin-github` · Info / Cleared)
- **[ZB-2026-011] Auth0 Next.js SDK v4 Audit (Cleared — JWE Cookie Encryption & Safe Redirects)** (`auth0/nextjs-auth0` · Info / Cleared)
- **[ZB-2026-013] Mattermost GitLab Plugin & MCP Bridge Audit (Cleared — Strict OAuth User Binding & Dedup)** (`mattermost/mattermost-plugin-gitlab` · Info / Cleared)
- **[ZB-2026-014] Mattermost MS Teams Plugin Audit (Cleared — OAuth Email Matching & Constant-Time Webhook Secret)** (`mattermost/mattermost-plugin-msteams` · Info / Cleared)
- **[ZB-2026-015] Mattermost MS Calendar Plugin — OAuth2, PostAction & Graph Webhook Audit** (`mattermost/mattermost-plugin-mscalendar` · Info (Verified Clean))
- **[ZB-2026-016] Mattermost Google Calendar Plugin — OAuth2 & Watch Channel Webhook Audit** (`mattermost/mattermost-plugin-google-calendar` · Info (Verified Clean))
- **[ZB-2026-017] Mattermost Zoom Plugin — OAuth2, Webhook Signature & Recording SSRF Audit** (`mattermost/mattermost-plugin-zoom` · Info (Verified Clean))
- **[ZB-2026-018] Mattermost ServiceNow Plugin — OAuth2, Subscription & Record Sharing Audit** (`mattermost/mattermost-plugin-servicenow` · Info (Verified Clean))
- **[ZB-2026-019] Mattermost MS Teams Embedded Plugin — Entra JWT, SSO PostMessage & CSP Audit** (`mattermost/mattermost-plugin-ms-embedded` · Info (Verified Clean))
- **[ZB-2026-020] Mattermost Calls Plugin — REST API, Host Controls, Bot Routes & TURN Auth Audit** (`mattermost/mattermost-plugin-calls` · Info (Verified Clean))
- **[ZB-2026-021] Circle Arc Remote Signer — Nitro Enclave Attestation, KMS Proxy & Key Lifecycle Audit** (`circlefin/arc-remote-signer` · Info (Verified Clean))
- **[ZB-2026-022] Kubernetes git-sync — Git Worktree, Credential Helper & AskPass Redirect Audit** (`kubernetes/git-sync` · Info (Verified Clean))
- **[ZB-2026-023] vercel/flags — JWE A256GCM Token Purpose Separation & Timing-Safe Bearer Auth Audit** (`github.com/vercel/flags` · Info (Verified Clean))
- **[ZB-2026-024] matomo-org/tracker-proxy — Proxy Endpoint Whitelist, Path Traversal & Header Forwarding Audit** (`github.com/matomo-org/tracker-proxy` · Info (Verified Clean))

## 4. Possible / Not Sure (Held Back by Zero-False-Positive Gate) — 1
- **[ZB-2026-004] Doppler CLI Windows updateViaWinget Version Argument & Local Fallback PBKDF2 Iteration Count** (`DopplerHQ/cli` · Held Back (Requires Upstream cli.doppler.com Compromise))
  - *Why Held Back*: HELD BACK IN 'POSSIBLE / NOT SURE': Submitting this would look weak because exploiting updateViaWinget requires already compromising Doppler's official release server. Kept strictly as internal documentation.

---

## 5. Recent Communications (6)
- **[COMM-2026-006] [OUTBOUND]** `responsibledisclosure@mattermost.com` — *[Responsible Disclosure] Cross-User OAuth 2.0 Account Linking & Jira Cloud Token Hijacking in mattermost/mattermost-plugin-jira (user_cloud_oauth.go)* (**SENT — Awaiting Triage**)
- **[COMM-2026-001] [OUTBOUND]** `boardy@boardy.ai` — *30-Day Challenge: How should we improve MetaDigitalGoods (metadigitalgoods.nullai.tech)?* (**DELIVERED (Verified in Gmail Sent Folder)**)
- **[COMM-2026-002] [OUTBOUND]** `stytchauth/samlshield Maintainers` — *GHSA-h4pw-wj8w-qh2h: SAML Validation Contract Bypass (NaN Timestamp Comparison, CDATA Differential & Missing Multi-Element Checks)* (**PUBLISHED PRIVATELY (Awaiting Maintainer Triage)**)
- **[COMM-2026-003] [OUTBOUND]** `responsible.disclosure@vercel.com` — *[Responsible Disclosure] Two High-Severity Vulnerabilities in vercel-labs/skills (Symlink File Disclosure & Git Option Injection)* (**SENT (Resend ID: 01a15cf8-cda2-7cea-b848-28ed0435e44d)**)
- **[COMM-2026-004] [OUTBOUND]** `security@stytch.com` — *[Responsible Disclosure] SAMLShield (stytchauth/samlshield) Validation Bypasses in src/validate.ts* (**SENT (Resend ID: 01a15cf8-cdfa-769f-9a2b-93edf7265034)**)
- **[COMM-2026-005] [INBOUND]** `contact@nullai.tech` — *Re: City Desk & B2B Outreach Replies (25+ Ticket Confirmations & Prospect Responses)* (**LOGGED & MONITORED**)
