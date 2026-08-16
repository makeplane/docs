---
title: Create estimate points
description: Create estimate points via Plane API. HTTP request format, parameters, scopes, and example responses for create estimate points.
keywords: plane, plane api, rest api, api integration, estimate points, create estimate points
---

# Create estimate points

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/estimates/{estimate_id}/estimate-points/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Create estimate points for a project estimate. You can send a JSON array directly or wrap it inside `estimate_points`.

<div class="params-section">

### Path Parameters

<div class="params-list">

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

<ApiParam name="estimate_points" type="array" :required="true">

Array of estimate point objects. Each object can include: `value` (string, required, max 20 chars), `key` (integer),
`description` (string), `external_id` (string), and `external_source` (string).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.estimates:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Create estimate points" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/estimates/estimate-uuid/estimate-points/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "key": 1,
      "value": "1",
      "description": "Tiny"
    },
    {
      "key": 2,
      "value": "2",
      "description": "Small"
    }
  ]'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/estimates/estimate-uuid/estimate-points/",
    headers={"X-API-Key": "your-api-key"},
    json=[
        {"key": 1, "value": "1", "description": "Tiny"},
        {"key": 2, "value": "2", "description": "Small"},
    ],
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/estimates/estimate-uuid/estimate-points/",
  {
    method: "POST",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      { key: 1, value: "1", description: "Tiny" },
      { key: 2, value: "2", description: "Small" },
    ]),
  }
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="201">

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440010",
    "created_at": "2024-01-15T10:40:00Z",
    "updated_at": "2024-01-20T12:15:00Z",
    "estimate": "550e8400-e29b-41d4-a716-446655440000",
    "key": 1,
    "value": "1",
    "description": "Tiny",
    "external_id": null,
    "external_source": null,
    "created_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
    "updated_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
    "project": "4af68566-94a4-4eb3-94aa-50dc9427067b",
    "workspace": "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440011",
    "created_at": "2024-01-15T10:41:00Z",
    "updated_at": "2024-01-20T12:16:00Z",
    "estimate": "550e8400-e29b-41d4-a716-446655440000",
    "key": 2,
    "value": "2",
    "description": "Small",
    "external_id": null,
    "external_source": null,
    "created_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
    "updated_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
    "project": "4af68566-94a4-4eb3-94aa-50dc9427067b",
    "workspace": "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4"
  }
]
```

</ResponsePanel>

</div>

</div>
