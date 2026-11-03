# [ZB-2026-018] Mattermost ServiceNow Plugin — OAuth2, Subscription & Record Sharing Audit

- **Category**: `COMPLETED`
- **Target Repository**: `mattermost/mattermost-plugin-servicenow`
- **Program / Channel**: Mattermost Bugcrowd / Responsible Disclosure
- **Severity**: Info (Verified Clean)
- **CWE**: N/A
- **Confidence / Gate Status**: undefined
- **Disclosure Status**: undefined
- **Last Updated**: 2026-10-21T04:38:00-04:00

## Affected Files


## Technical Summary & Root Cause
Audited REST API endpoints, OAuth2 state binding, ServiceNow subscription management, andKV user store serialization. Confirmed CompleteOAuth2 checks mattermostUserID == authedUserID, getConfig restricts full config to SystemAdminRoleId, GetAllUsers strips OAuth2Token via IncidentCaller DTO, and subscription/incident creation enforces channel permission checks.

## Triager Verification & Why This Finding Is Solid
undefined

## Defensive Remediation
undefined
