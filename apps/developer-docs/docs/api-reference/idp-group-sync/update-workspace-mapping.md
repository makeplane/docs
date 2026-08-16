---
title: Update workspace group mapping
description: Update a workspace group mapping via Plane API. HTTP request format, parameters, scopes, and example responses for update workspace group mapping.
keywords: plane, plane api, rest api, api integration, idp group sync, update workspace group mapping
---

# Update workspace group mapping

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/group-sync/workspace-mappings/{mapping_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Update an existing IdP group → workspace role mapping. Supports partial updates.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

<ApiParam name="mapping_id" type="string" :required="true">

The unique identifier of the workspace group mapping.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="idp_group_name" type="string" :required="false">

The name of the IdP group to map.

</ApiParam>

<ApiParam name="role" type="string" :required="false">

Workspace role slug to assign to members of the IdP group (e.g. `member`, `admin`).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.group_sync:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Update workspace group mapping" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/workspace-mappings/772g0622-g41d-63f6-c938-668877662222/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "role": "member"
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/workspace-mappings/772g0622-g41d-63f6-c938-668877662222/",
    headers={"X-API-Key": "your-api-key"},
    json={"role": "member"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/workspace-mappings/772g0622-g41d-63f6-c938-668877662222/",
  {
    method: "PATCH",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role: "member" }),
  }
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "id": "772g0622-g41d-63f6-c938-668877662222",
  "idp_group_name": "leadership",
  "role": "member",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

</ResponsePanel>

</div>

</div>
