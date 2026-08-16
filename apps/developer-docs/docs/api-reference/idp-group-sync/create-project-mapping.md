---
title: Create project group mapping
description: Create a project group mapping via Plane API. HTTP request format, parameters, scopes, and example responses for create project group mapping.
keywords: plane, plane api, rest api, api integration, idp group sync, create project group mapping
---

# Create project group mapping

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/group-sync/project-mappings/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Create a new IdP group → project mapping. Use `project` to map to a specific project, or `all_projects: true` to map to all projects in the workspace. These two fields are mutually exclusive.

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

<CodePanel title="Create project group mapping" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/project-mappings/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "idp_group_name": "engineering",
  "project": "ENG",
  "role": "member"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/project-mappings/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "idp_group_name": "engineering",
      "project": "ENG",
      "role": "member"
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/project-mappings/", {
  method: "POST",
  headers: {
    "X-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    idp_group_name: "engineering",
    project: "ENG",
    role: "member",
  }),
});
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="201">

```json
{
  "id": "661f9511-f30c-52e5-b827-557766551111",
  "idp_group_name": "engineering",
  "project": "ENG",
  "all_projects": false,
  "role": "member",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

</ResponsePanel>

</div>

</div>
