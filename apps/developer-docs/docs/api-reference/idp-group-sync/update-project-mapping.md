---
title: Update project group mapping
description: Update a project group mapping via Plane API. HTTP request format, parameters, scopes, and example responses for update project group mapping.
keywords: plane, plane api, rest api, api integration, idp group sync, update project group mapping
---

# Update project group mapping

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/group-sync/project-mappings/{mapping_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Update an existing IdP group → project mapping. Supports partial updates.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

<ApiParam name="mapping_id" type="string" :required="true">

The unique identifier of the project group mapping.

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

Project role slug to assign to members of the IdP group (e.g. `member`, `admin`, `guest`).

</ApiParam>

<ApiParam name="project" type="string" :required="false">

Project identifier to map the group to (e.g. `ENG`). Mutually exclusive with `all_projects`.

</ApiParam>

<ApiParam name="all_projects" type="boolean" :required="false">

When `true`, maps the group to all projects in the workspace. Mutually exclusive with `project`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.group_sync:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Update project group mapping" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/project-mappings/661f9511-f30c-52e5-b827-557766551111/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "role": "admin"
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/project-mappings/661f9511-f30c-52e5-b827-557766551111/",
    headers={"X-API-Key": "your-api-key"},
    json={"role": "admin"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/project-mappings/661f9511-f30c-52e5-b827-557766551111/",
  {
    method: "PATCH",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role: "admin" }),
  }
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "id": "661f9511-f30c-52e5-b827-557766551111",
  "idp_group_name": "engineering",
  "project": "ENG",
  "all_projects": false,
  "role": "admin",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

</ResponsePanel>

</div>

</div>
