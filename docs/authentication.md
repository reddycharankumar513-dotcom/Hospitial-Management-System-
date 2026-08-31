# Authentication & Session Security

## 1. Overview
The Hospital Management System implements a two-panel enterprise login experience, HMAC-SHA256 JWT access tokens, refresh token rotation, and password reset workflows.

## 2. Authentication Sequence
```text
User ──► POST /api/v1/auth/login ──► Gateway ──► Auth Service
                                                     │
                                             Validate Credentials
                                                     │
                                       ┌─────────────┴─────────────┐
                                       ▼                           ▼
                             Access Token (15 min)       Refresh Token (7 days)
                                       │                           │
                                       └─────────────┬─────────────┘
                                                     ▼
                                            Authenticated User Profile
```

## 3. Endpoints
- `POST /api/v1/auth/login`: Authenticate email & password.
- `POST /api/v1/auth/refresh`: Issue new access token via refresh token.
- `POST /api/v1/auth/logout`: Revoke active session refresh tokens.
- `POST /api/v1/auth/forgot-password`: Generate secure reset token.
- `POST /api/v1/auth/reset-password`: Reset user password with token.
