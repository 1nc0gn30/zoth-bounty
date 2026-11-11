# Zoth Bounty — Communications & Disclosure Log

- **Last Synced**: 2026-10-21T06:45:38.239Z
- **Thunderbird Inbox**: `business@nullai.tech (Titan IMAP / Thunderbird)`
- **Outbound DKIM/SPF Rail**: `1nc0gn30@outreach.nullai.tech / contact@nullai.tech (Resend DKIM/SPF)`
- **Gmail Account**: `1nc0gn30solutions@gmail.com`
- **GitHub Account**: `1nc0gn30 (GitHub Private Vulnerability Reporting / GHSA)`

---

## [COMM-2026-006] OUTBOUND — [Responsible Disclosure] Cross-User OAuth 2.0 Account Linking & Jira Cloud Token Hijacking in mattermost/mattermost-plugin-jira (user_cloud_oauth.go)
- **Timestamp**: 2026-10-21T06:45:38.239Z
- **Channel**: Email (CC: business@nullai.tech Thunderbird)
- **Recipient / Counterparty**: `responsibledisclosure@mattermost.com`
- **Status**: **SENT — Awaiting Triage**
- **Related Bounty**: ZB-2026-012
- **Reference / Message ID**: `01a15d35-c4b8-7e2c-bf83-dce79c6f7d34`

Disclosed verified OAuth 2.0 callback missing p.checkAuth and Mattermost-User-Id binding in mattermost/mattermost-plugin-jira (server/http.go:126 and server/user_cloud_oauth.go:22-91), plus shared instance-wide PKCE CodeVerifier.

---

## [COMM-2026-001] OUTBOUND — 30-Day Challenge: How should we improve MetaDigitalGoods (metadigitalgoods.nullai.tech)?
- **Timestamp**: 2026-10-20T23:11:00-04:00
- **Channel**: Gmail (1nc0gn30solutions@gmail.com)
- **Recipient / Counterparty**: `boardy@boardy.ai`
- **Status**: **DELIVERED (Verified in Gmail Sent Folder)**
- **Related Bounty**: General / Revenue Challenge
- **Reference / Message ID**: `task-41503`

Reached out to Boardy AI regarding the 30-day revenue challenge and asked for strategic recommendations on improving MetaDigitalGoods (metadigitalgoods.nullai.tech / mdg-studio-nft.netlify.app). Polling inbox for reply.

---

## [COMM-2026-002] OUTBOUND — GHSA-h4pw-wj8w-qh2h: SAML Validation Contract Bypass (NaN Timestamp Comparison, CDATA Differential & Missing Multi-Element Checks)
- **Timestamp**: 2026-10-21T01:38:01-04:00
- **Channel**: GitHub Private Vulnerability Reporting (GHSA)
- **Recipient / Counterparty**: `stytchauth/samlshield Maintainers`
- **Status**: **PUBLISHED PRIVATELY (Awaiting Maintainer Triage)**
- **Related Bounty**: ZB-2026-003
- **Reference / Message ID**: `https://github.com/stytchauth/samlshield/security/advisories/GHSA-h4pw-wj8w-qh2h`

Filed private GitHub Security Advisory GHSA-h4pw-wj8w-qh2h directly on stytchauth/samlshield detailing the unchecked Date.parse NaN expiration bypass (src/validate.ts:994-1021), CDATA_SECTION_NODE parser differential (src/validate.ts:140-152), and missing liberal.length checks.

---

## [COMM-2026-003] OUTBOUND — [Responsible Disclosure] Two High-Severity Vulnerabilities in vercel-labs/skills (Symlink File Disclosure & Git Option Injection)
- **Timestamp**: 2026-10-21T01:38:04-04:00
- **Channel**: Email (CC: business@nullai.tech Thunderbird)
- **Recipient / Counterparty**: `responsible.disclosure@vercel.com`
- **Status**: **SENT (Resend ID: 01a15cf8-cda2-7cea-b848-28ed0435e44d)**
- **Related Bounty**: ZB-2026-001, ZB-2026-002
- **Reference / Message ID**: `01a15cf8-cda2-7cea-b848-28ed0435e44d`

Privately disclosed ZB-2026-001 (Arbitrary Host File Disclosure via dereference: true Symlink Following in src/installer.ts:542-563 & src/use.ts:577-610) and ZB-2026-002 (Git Option Injection via disabled simple-git safety guards & missing '--' in src/git.ts:289-307 & src/update.ts:881) to Vercel Security per https://vercel.com/.well-known/security.txt, with defensive remediation patches.

---

## [COMM-2026-004] OUTBOUND — [Responsible Disclosure] SAMLShield (stytchauth/samlshield) Validation Bypasses in src/validate.ts
- **Timestamp**: 2026-10-21T01:38:06-04:00
- **Channel**: Email (CC: business@nullai.tech Thunderbird)
- **Recipient / Counterparty**: `security@stytch.com`
- **Status**: **SENT (Resend ID: 01a15cf8-cdfa-769f-9a2b-93edf7265034)**
- **Related Bounty**: ZB-2026-003
- **Reference / Message ID**: `01a15cf8-cdfa-769f-9a2b-93edf7265034`

Sent official email notification to security@stytch.com per stytchauth/samlshield/SECURITY.md referencing GHSA-h4pw-wj8w-qh2h and providing exact file/line analysis and remediation diff.

---

## [COMM-2026-005] INBOUND — Re: City Desk & B2B Outreach Replies (25+ Ticket Confirmations & Prospect Responses)
- **Timestamp**: 2026-10-19T22:08:35-04:00
- **Channel**: Thunderbird IMAP (business@nullai.tech / contact@nullai.tech)
- **Recipient / Counterparty**: `contact@nullai.tech`
- **Status**: **LOGGED & MONITORED**
- **Related Bounty**: General / Revenue Challenge
- **Reference / Message ID**: `thunderbird:global-messages-db.sqlite`

Synced inbound Thunderbird SQLite database (global-messages-db.sqlite). Tracking prospect inquiries (Brody Brothers, Property Manager Websites, Sun Auto, Skin Clique, Utah Property Solutions, Holy City Web Design, etc.) and watching for security team acknowledgments from Vercel and Stytch.

