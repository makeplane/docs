---
title: Update an estimate point
description: Update an estimate point via Plane API. HTTP request format, parameters, scopes, and example responses for update an estimate point.
keywords: plane, plane api, rest api, api integration, estimate points, update an estimate point
---

# Update an estimate point

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/estimates/{estimate_id}/estimate-points/{estimate_point_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Update a single estimate point for a project estimate.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="estimate_point_id" type="string" :required="true">

The unique identifier of the estimate point.

</ApiParam>

<ApiParam name="estimate_id" type="string" :required="true">

The unique identifier of the estimate.

</ApiParam>

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

<ApiParam name="key" type="integer" :required="false">

Numeric key used for ordering and display.

</ApiParam>

<ApiParam name="value" type="string" :required="false">

Display value for the estimate point (max 20 characters).

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Description of the estimate point.

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

<CodePanel title="Update an estimate point" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/estimates/estimate-uuid/estimate-points/estimate-point-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "value": "3",
    "description": "Small"
  }'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/estimates/estimate-uuid/estimate-points/estimate-point-uuid/",
    headers={"X-API-Key": "your-api-key"},
    json={"value": "3", "description": "Small"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/estimates/estimate-uuid/estimate-points/estimate-point-uuid/",
  {
    method: "PATCH",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      value: "3",
      description: "Small",
    }),
  }
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440010",
  "created_at": "2024-01-15T10:40:00Z",
  "updated_at": "2024-01-21T09:45:00Z",
  "estimate": "550e8400-e29b-41d4-a716-446655440000",
  "key": 3,
  "value": "3",
  "description": "Small",
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
