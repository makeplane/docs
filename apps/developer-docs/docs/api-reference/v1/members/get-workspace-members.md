---
title: Get all workspace members
description: Get all workspace members via Plane API. HTTP request format, parameters, scopes, and example responses for get all workspace members.
keywords: plane, plane api, rest api, api integration, members, get all workspace members
---

# Get all workspace members

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/members/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve all users who are members of the specified workspace.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.members:read`

</div>

</div>

<div class="api-right">

<CodePanel title="Get all workspace members" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/workspaces/my-workspace/members/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/my-workspace/members/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/members/", {
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
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "first_name": "John",
    "last_name": "Doe",
    "display_name": "Example Name",
    "email": "user@example.com",
    "avatar": "https://example.com/assets/example-image.png",
    "role": 20
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "first_name": "Jane",
    "last_name": "Smith",
    "display_name": "Example Name",
    "email": "user@example.com",
    "avatar": "https://example.com/assets/example-image.png",
    "role": 15
  }
]
```

</ResponsePanel>

</div>

</div>
