---
title: Add members to teamspace
description: Add members to teamspace via Plane API. HTTP request format, parameters, scopes, and example responses for add members to teamspace.
keywords: plane, plane api, rest api, api integration, teamspace, add members to teamspace
---

# Add members to teamspace

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/teamspaces/{teamspace_id}/members/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Add members to a teamspace

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

<ApiParam name="teamspace_id" type="string" :required="true">

The unique identifier of the teamspace.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="member_ids" type="array" :required="false">

Member ids.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`teamspaces.members:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Add members to teamspace" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/teamspaces/teamspace-uuid/members/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "member_ids": [
    "550e8400-e29b-41d4-a716-446655440000"
  ]
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/teamspaces/teamspace-uuid/members/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "member_ids": [
"550e8400-e29b-41d4-a716-446655440000"
      ]
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/teamspaces/teamspace-uuid/members/", {
  method: "POST",
  headers: {
    "X-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    member_ids: ["550e8400-e29b-41d4-a716-446655440000"],
  }),
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
