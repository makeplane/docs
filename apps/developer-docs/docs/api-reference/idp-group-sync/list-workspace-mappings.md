---
title: List workspace group mappings
description: List workspace group mappings via Plane API. HTTP request format, parameters, scopes, and example responses for list workspace group mappings.
keywords: plane, plane api, rest api, api integration, idp group sync, list workspace group mappings
---

# List workspace group mappings

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/group-sync/workspace-mappings/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve all IdP group → workspace role mappings for the workspace.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response Attributes

<div class="params-list">

<ApiParam name="id" type="string">

Unique identifier of the mapping.

</ApiParam>

<ApiParam name="idp_group_name" type="string">

The name of the IdP group.

</ApiParam>

<ApiParam name="role" type="string">

Role slug assigned to group members within the workspace.

</ApiParam>

<ApiParam name="created_at" type="timestamp">

The timestamp of when the mapping was created.

</ApiParam>

<ApiParam name="updated_at" type="timestamp">

The timestamp of when the mapping was last updated.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.group_sync:read`

</div>

</div>

<div class="api-right">

<CodePanel title="List workspace group mappings" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/workspace-mappings/" \
  -H "X-API-Key: $PLANE_API_KEY"
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/workspace-mappings/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/workspace-mappings/", {
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
    "id": "772g0622-g41d-63f6-c938-668877662222",
    "idp_group_name": "leadership",
    "role": "admin",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  },
  {
    "id": "883h1733-h52e-74g7-d049-779988773333",
    "idp_group_name": "engineering",
    "role": "member",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

</ResponsePanel>

</div>

</div>
