---
prev: false
next: false
search: false
---

# Authentication Secrets Test Cases

[← Back to Test Cases](/api/test-cases)

This page shows 81 test cases that validate Authentication Secrets patterns.

| Policy | Test Case |
|--------|-----------|
| `OAUTH_CLIENT_ID` | `client_id: 1234567890-abcdefghijklmnopqrstuvwxyz` |
| `OAUTH_CLIENT_ID` | `CLIENT_ID: abcdefghijklmnopqrstuvwxyz1234567890` |
| `OAUTH_CLIENT_ID` | `client-id: 1234567890abcdefghij` |
| `OAUTH_CLIENT_ID` | `client_id: 0000000000-ABCDEFGHIJKLMNOPQRSTUVWXYZ` |
| `OAUTH_CLIENT_ID` | `CLIENT_ID: zyxwvutsrqponmlkjihgfedcba9876543210` |
| `OAUTH_CLIENT_ID` | `client-id: aBcDeFgHiJ1234567890` |
| `OAUTH_CLIENT_ID` | `client_id: 999999999-aaaaaaaaaaaaaaaaaaaaaa` |
| `OAUTH_CLIENT_ID` | `CLIENT_ID: a1b2c3d4e5f6g7h8i9j0` |
| `OAUTH_CLIENT_SECRET` | `client_secret: GOCSPX-1234567890abcdefghijklmnop` |
| `OAUTH_CLIENT_SECRET` | `CLIENT_SECRET: abcdefghijklmnopqrstuvwxyz1234567890` |
| `OAUTH_CLIENT_SECRET` | `client_secret: GOCSPX-ABCDEFGHIJKLMNOPQRSTUVWXYZ` |
| `OAUTH_CLIENT_SECRET` | `CLIENT_SECRET: 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ` |
| `OAUTH_CLIENT_SECRET` | `client_secret: GOCSPX-zyxwvutsrqponmlkjihgfedcba` |
| `OAUTH_CLIENT_SECRET` | `CLIENT_SECRET: aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890` |
| `OAUTH_CLIENT_SECRET` | `client_secret: GOCSPX-0000000000000000000000000` |
| `OAUTH_REFRESH_TOKEN` | `refresh_token: 1//0gFU7abcdefghijklmnopqrstuvw` |
| `OAUTH_REFRESH_TOKEN` | `REFRESH_TOKEN: 1234567890abcdefghijklmnopqrstuvwxyz` |
| `OAUTH_REFRESH_TOKEN` | `refresh_token: 1//0ABCDEFGHIJKLMNOPQRSTUVWXYZ` |
| `OAUTH_REFRESH_TOKEN` | `REFRESH_TOKEN: zyxwvutsrqponmlkjihgfedcba9876543210` |
| `OAUTH_REFRESH_TOKEN` | `refresh_token: 1//09876543210ZYXWVUTSRQPONML` |
| `OAUTH_REFRESH_TOKEN` | `REFRESH_TOKEN: 0000000000aaaaaaaaaaaaaaaaaaaaaa` |
| `OAUTH_REFRESH_TOKEN` | `refresh_token: 1//0aBcDeFgHiJkLmNoPqRsTuVwXy` |
| `OAUTH_ACCESS_TOKEN` | `access_token: ya29.a0ARrdaMabcdefghijklmnopqr` |
| `OAUTH_ACCESS_TOKEN` | `ACCESS_TOKEN: 1234567890abcdefghijklmnopqrstuvwxyz` |
| `OAUTH_ACCESS_TOKEN` | `access_token: ya29.a0ABCDEFGHIJKLMNOPQRSTUVW` |
| `OAUTH_ACCESS_TOKEN` | `ACCESS_TOKEN: zyxwvutsrqponmlkjihgfedcba9876543210` |
| `OAUTH_ACCESS_TOKEN` | `access_token: ya29.a0aBcDeFgHiJkLmNoPqRsTuVw` |
| `OAUTH_ACCESS_TOKEN` | `ACCESS_TOKEN: 0000000000aaaaaaaaaaaaaaaaaaaaaa` |
| `OAUTH_ACCESS_TOKEN` | `access_token: ya29.a09876543210ZYXWVUTSRQPON` |
| `OKTA_API_TOKEN` | `001234567890abcdefghijklmnopqrstuvwxyz1234` |
| `OKTA_API_TOKEN` | `00abcdefghijklmnopqrstuvwxyz1234567890abcd` |
| `OKTA_API_TOKEN` | `00ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCD` |
| `OKTA_API_TOKEN` | `00zyxwvutsrqponmlkjihgfedcba9876543210zyxw` |
| `OKTA_API_TOKEN` | `00aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890aBcD` |
| `OKTA_API_TOKEN` | `000000000000000000000000000000000000000000` |
| `OKTA_API_TOKEN` | `009876543210ZYXWVUTSRQPONMLKJIHGFEDCBA9876` |
| `KEYCLOAK_CLIENT_SECRET` | `keycloak-client-secret: 12345678-1234-1234-1234-123456789012` |
| `KEYCLOAK_CLIENT_SECRET` | `keycloak_client_secret: abcdef01-2345-6789-abcd-ef0123456789` |
| `KEYCLOAK_CLIENT_SECRET` | `keycloak-client-secret: ABCDEF01-2345-6789-ABCD-EF0123456789` |
| `KEYCLOAK_CLIENT_SECRET` | `keycloak_client_secret: 00000000-0000-0000-0000-000000000000` |
| `KEYCLOAK_CLIENT_SECRET` | `keycloak-client-secret: zyxwvu98-7654-3210-zyxw-vu9876543210` |
| `KEYCLOAK_CLIENT_SECRET` | `keycloak_client_secret: aBcDeF01-2345-6789-AbCd-Ef0123456789` |
| `KEYCLOAK_CLIENT_SECRET` | `keycloak-client-secret: 99999999-9999-9999-9999-999999999999` |
| `BASIC_AUTH_HEADER` | `Authorization: Basic dXNlcjpwYXNzd29yZA==` |
| `BASIC_AUTH_HEADER` | `Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=` |
| `BASIC_AUTH_HEADER` | `Authorization: Basic dGVzdDp0ZXN0MTIz` |
| `BASIC_AUTH_HEADER` | `Authorization: Basic bXlfdXNlcjpteV9wYXNzd29yZA==` |
| `BASIC_AUTH_HEADER` | `Authorization: Basic YXBpX2tleV91c2VyOmFwaV9rZXlfcGFzc3dvcmQ=` |
| `BASIC_AUTH_HEADER` | `Authorization: Basic cm9vdDpyb290` |
| `BASIC_AUTH_HEADER` | `Authorization: Basic QUJDREVGR0hJSkw=` |
| `BASIC_AUTH_HEADER` | `Authorization: Basic YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXoxMjM0NTY3ODkw` |
| `BASIC_AUTH_HEADER` | `Authorization: Basic cXdlcnR5OnBhc3N3b3Jk` |
| `BEARER_TOKEN_HEADER` | `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U` |
| `BEARER_TOKEN_HEADER` | `Authorization: Bearer 1234567890abcdefghijklmnopqrstuvwxyz` |
| `BEARER_TOKEN_HEADER` | `Authorization: Bearer sk-1234567890abcdefghijklmnopqrstuvwxyz` |
| `BEARER_TOKEN_HEADER` | `Authorization: Bearer ghp_abcdefghijklmnopqrstuvwxyz1234567890` |
| `BEARER_TOKEN_HEADER` | `Authorization: Bearer ya29.a0ARrdaMabcdefghijklmnopqrstuvwxyz` |
| `BEARER_TOKEN_HEADER` | `Authorization: Bearer AQIC5wM2LY4Sfcw` |
| `BEARER_TOKEN_HEADER` | `Authorization: Bearer mF_9.B5f-4.1JqM` |
| `BEARER_TOKEN_HEADER` | `Authorization: Bearer abc_def-ghi~jkl+mno/pqr` |
| `BEARER_TOKEN_HEADER` | `Authorization: Bearer token123==` |
| `API_KEY_HEADER` | `X-API-Key: 1234567890abcdefghijklmnopqrst` |
| `API_KEY_HEADER` | `API-Key: abcdefghijklmnopqrstuvwxyz1234567890` |
| `API_KEY_HEADER` | `X-Api-Key: sk-1234567890abcdefghijklmnop` |
| `API_KEY_HEADER` | `ApiKey: ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890` |
| `API_KEY_HEADER` | `X-API-Key: ghp_1234567890abcdefghijklmnopqrstuvwxyz` |
| `API_KEY_HEADER` | `API-Key: AIzaSy1234567890abcdefghijklmnopqrst` |
| `API_KEY_HEADER` | `X-Api-Key: pk_test_1234567890abcdefghijklmnop` |
| `API_KEY_HEADER` | `ApiKey: SG.1234567890abcdefghijklmnopqrstuvwxyz` |
| `API_KEY_HEADER` | `X-API-Key: 1234567890_abcdefghijklmnopqrstuvwxyz` |
| `API_KEY_HEADER` | `API-Key: 1234567890-abcdefghijklmnopqrstuvwxyz` |
| `SESSION_ID_COOKIE` | `sessionid=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0` |
| `SESSION_ID_COOKIE` | `PHPSESSID=1234567890abcdefghijklmnopqrstuvwxyz` |
| `SESSION_ID_COOKIE` | `JSESSIONID=ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890` |
| `SESSION_ID_COOKIE` | `connect.sid=s%3A1234567890abcdefghijklmnopqrstuvwxyz` |
| `SESSION_ID_COOKIE` | `express.sid=1234567890abcdefghijklmnopqrstuvwxyz.signature` |
| `SESSION_ID_COOKIE` | `sessionid=abc-def-ghi-jkl-mno-pqr` |
| `SESSION_ID_COOKIE` | `PHPSESSID=aBcDeF1234567890aBcDeF1234567890` |
| `SESSION_ID_COOKIE` | `JSESSIONID=1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ.node01` |
| `SESSION_ID_COOKIE` | `connect.sid=abcdefghijklmnopqrstuvwxyz1234567890` |
| `SESSION_ID_COOKIE` | `express.sid=1234567890_abcdefghijklmnopqrstuvwxyz` |
