---
title: Create workspace invitation
description: Create workspace invitation via Plane API. HTTP request format, parameters, scopes, and example responses for create workspace invitation.
keywords: plane, plane api, rest api, api integration, workspace invitations, create workspace invitation
---

# Create workspace invitation

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/invitations/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Create a workspace invite

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="email" type="string" :required="true">

Email.

</ApiParam>

<ApiParam name="role" type="integer" :required="false">

- `20` - Admin
- `15` - Member
- `5` - Guest

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

Workspace admin or owner permission required.

</div>

</div>

<div class="api-right">

<CodePanel title="Create workspace invitation" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/invitations/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "email": "Example Name",
  "role": 20
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/invitations/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "email": "Example Name",
      "role": 20
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/invitations/", {
  method: "POST",
  headers: {
    "X-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "Example Name",
    role: 20,
  }),
});
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="201">

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "Example Name",
  "role": 20,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z",
  "responded_at": "2024-01-01T00:00:00Z",
  "accepted": true
}
```

</ResponsePanel>

</div>

</div>
