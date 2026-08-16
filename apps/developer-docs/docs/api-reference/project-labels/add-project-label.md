---
title: Create project label
description: Create project label via Plane API. HTTP request format, parameters, scopes, and example responses for create project label.
keywords: plane, plane api, rest api, api integration, project labels, create project label
---

# Create project label

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/project-labels/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Create a new project label in the workspace with name, color, and description.

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

<ApiParam name="name" type="string" :required="true">

Name.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Description.

</ApiParam>

<ApiParam name="color" type="string" :required="false">

Color.

</ApiParam>

<ApiParam name="sort_order" type="number" :required="false">

Sort order.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.labels:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Create project label" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/project-labels/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Example Name",
  "color": "#ff0000",
  "description": "Example description"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/project-labels/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "name": "Example Name",
      "color": "#ff0000",
      "description": "Example description"
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/project-labels/", {
  method: "POST",
  headers: {
    "X-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Example Name",
    color: "#ff0000",
    description: "Example description",
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
  "name": "Example Name",
  "color": "#f39c12",
  "description": "Example description",
  "sort_order": 65535,
  "workspace": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z",
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "updated_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

</ResponsePanel>

</div>

</div>
