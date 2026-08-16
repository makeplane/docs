---
title: Get project label
description: Get project label via Plane API. HTTP request format, parameters, scopes, and example responses for get project label.
keywords: plane, plane api, rest api, api integration, project labels, get project label
---

# Get project label

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/project-labels/{label_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve details of a specific project label.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="label_id" type="string" :required="true">

The unique identifier of the label.

</ApiParam>

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.labels:read`

</div>

</div>

<div class="api-right">

<CodePanel title="Get project label" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/workspaces/my-workspace/project-labels/label-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/my-workspace/project-labels/label-uuid/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/project-labels/label-uuid/", {
  method: "GET",
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
