---
title: Update an estimate
description: Update an estimate via Plane API. HTTP request format, parameters, scopes, and example responses for update an estimate.
keywords: plane, plane api, rest api, api integration, estimates, update an estimate
---

# Update an estimate

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/estimates/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Update the estimate for a project. Only fields provided in the request will be updated.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="project_id" type="string" :required="true">

The unique identifier of the project.

</ApiParam>

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="name" type="string" :required="false">

Name of the estimate.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Description of the estimate.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

External ID from an external system.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

External source identifier.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.estimates:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Update an estimate" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/estimates/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated story point scale"
  }'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/estimates/",
    headers={"X-API-Key": "your-api-key"},
    json={"description": "Updated story point scale"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/estimates/", {
  method: "PATCH",
  headers: {
    "X-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    description: "Updated story point scale",
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
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-21T09:30:00Z",
  "name": "Story Points",
  "description": "Updated story point scale",
  "type": "points",
  "last_used": true,
  "external_id": null,
  "external_source": null,
  "created_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "updated_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "project": "4af68566-94a4-4eb3-94aa-50dc9427067b",
  "workspace": "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4"
}
```

</ResponsePanel>

</div>

</div>
