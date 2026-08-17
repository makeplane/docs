---
title: Retrieve current user
description: Retrieve current user via Plane API. HTTP request format, parameters, scopes, and example responses for retrieve current user.
keywords: plane, plane api, rest api, api integration, user, retrieve current user
---

# Retrieve current user

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/users/me/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve the authenticated user's profile information including basic details.

<div class="params-section">

### Scopes

`profile:read`

</div>

</div>

<div class="api-right">

<CodePanel title="Retrieve current user" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/users/me/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/users/me/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/users/me/", {
  method: "GET",
  headers: {
    "X-API-Key": "your-api-key",
  },
});
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "first_name": "John",
  "last_name": "Doe",
  "email": "user@example.com",
  "avatar": "https://example.com/assets/example-image.png",
  "avatar_url": "https://example.com/assets/example-image.png",
  "display_name": "Example Name"
}
```

</ResponsePanel>

</div>

</div>
