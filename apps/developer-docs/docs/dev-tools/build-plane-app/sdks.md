---
title: Plane SDKs
description: Official Plane SDKs for Node.js and Python. Get typed API clients and OAuth helpers to build Plane integrations faster.
keywords: plane sdk, plane node sdk, plane python sdk, plane api client, plane-node-sdk, plane-sdk, plane npm package, plane pypi package, plane developer tools
---

# SDKs

Official SDKs provide OAuth helpers and typed API clients:

| Language | Package                                                                              |
| -------- | ------------------------------------------------------------------------------------ |
| Node.js  | [@makeplane/plane-node-sdk](https://www.npmjs.com/package/@makeplane/plane-node-sdk) |
| Python   | [plane-sdk](https://pypi.org/project/plane-sdk/)                                     |

```bash
npm install @makeplane/plane-node-sdk
# or
pip install plane-sdk
```

#### OAuth helper methods

::: code-group

```typescript [Node.js]
import { OAuthClient } from "@makeplane/plane-node-sdk";

const oauth = new OAuthClient({
  clientId: "your_client_id",
  clientSecret: "your_client_secret",
  redirectUri: "https://your-app.com/callback",
});

// Generate authorization URL
const authUrl = oauth.getAuthorizationUrl("code", "state");

// Exchange for bot token
const token = await oauth.getBotToken(appInstallationId);

// Exchange code for user token
const userToken = await oauth.exchangeCodeForToken(code);

// Refresh user token
const newToken = await oauth.getRefreshToken(refreshToken);
```

```python [Python]
from plane.client import OAuthClient

oauth = OAuthClient(
    client_id="your_client_id",
    client_secret="your_client_secret",
)

# Generate authorization URL
auth_url = oauth.get_authorization_url(redirect_uri="...", state="state")

# Exchange for bot token
token = oauth.get_client_credentials_token(app_installation_id=app_installation_id)

# Exchange code for user token
user_token = oauth.exchange_code(code=code, redirect_uri=redirect_uri)

# Refresh user token
new_token = oauth.refresh_token(refresh_token)
```

:::
