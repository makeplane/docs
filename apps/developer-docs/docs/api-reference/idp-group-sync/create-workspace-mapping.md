---
title: Create workspace group mapping
description: Create a workspace group mapping via Plane API. HTTP request format, parameters, scopes, and example responses for create workspace group mapping.
keywords: plane, plane api, rest api, api integration, idp group sync, create workspace group mapping
---

# Create workspace group mapping

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/group-sync/workspace-mappings/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Create a new IdP group → workspace role mapping.

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

<ApiParam name="idp_group_name" type="string" :required="true">

The name of the IdP group to map.

</ApiParam>

<ApiParam name="role" type="string" :required="true">

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

<CodePanel title="Create workspace group mapping" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/workspace-mappings/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "idp_group_name": "leadership",
  "role": "admin"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/workspace-mappings/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "idp_group_name": "leadership",
      "role": "admin"
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/workspace-mappings/", {
  method: "POST",
  headers: {
    "X-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    idp_group_name: "leadership",
    role: "admin",
  }),
});
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="201">

```json
{
  "id": "772g0622-g41d-63f6-c938-668877662222",
  "idp_group_name": "leadership",
  "role": "admin",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

</ResponsePanel>

</div>

</div>
