# [ZB-2026-012] Cross-User OAuth 2.0 Account Linking & Jira Cloud Token/Notification Hijacking in httpOAuth2Complete

- **Category**: `PENDING`
- **Target Repository**: `mattermost/mattermost-plugin-jira`
- **Program / Channel**: Mattermost Responsible Disclosure & Bugcrowd (responsibledisclosure@mattermost.com)
- **Severity**: High (CVSS 8.1)
- **CWE**: CWE-352 / CWE-287 / CWE-639
- **Confidence / Gate Status**: 100% (Verified in Source + Contradicts Sibling OAuth1a & GitHub Plugin Guards)
- **Disclosure Status**: Disclosed to responsibledisclosure@mattermost.com (Resend ID: 01a15d35-c4b8-7e2c-bf83-dce79c6f7d34, CC: business@nullai.tech)
- **Last Updated**: 2026-10-21T06:45:38.239Z

## Affected Files
- `server/http.go:126`
- `server/user_cloud_oauth.go:22-91`
- `server/instance_cloud_oauth.go:74-86, 168-184`
- `server/kv.go:140-155`

## Technical Summary & Root Cause
In mattermost/mattermost-plugin-jira, the Jira Cloud OAuth 2.0 callback endpoint (GET /instance/{id}/oauth2/complete.html, handled by httpOAuth2Complete in server/user_cloud_oauth.go:22-91) is registered without the p.checkAuth middleware (server/http.go:126) and never checks r.Header.Get("Mattermost-User-Id"). Instead, it extracts mattermostUserID := stateArray[1] directly from the state query parameter (<random15>_<mattermostUserID>) and binds the victim's Jira Cloud OAuth 2.0 access_token and refresh_token (offline_access) to stateArray[1]. Furthermore, CodeVerifier and CodeChallenge in server/instance_cloud_oauth.go:74-86 are generated once at instance installation time and shared across all users.

## Triager Verification & Why This Finding Is Solid
In the exact same file (server/http.go:122) and sibling handler (httpOAuth1aComplete in server/user_server.go:61), OAuth 1.0a enforces p.checkAuth and reads mattermostUserID := r.Header.Get("Mattermost-User-Id"). Similarly, mattermost-plugin-github (server/plugin/api.go:164, 408) enforces p.checkAuth and verifies state.UserID == c.UserID. Omitting both checks in httpOAuth2Complete allows an attacker who generates a valid state token for their own Mattermost account to trick a victim into authorizing the Mattermost Jira app, linking the victim's Jira Cloud tokens and Jira DM notifications directly to the attacker's Mattermost account.

## Defensive Remediation
Wrap routeOAuth2Complete in p.checkAuth(...) in server/http.go:126, verify r.Header.Get("Mattermost-User-Id") == mattermostUserID in httpOAuth2Complete before loading the one-time secret or exchanging the code, and generate per-flow PKCE CodeVerifier values stored in otsStore.
