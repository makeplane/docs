---
title: List all worklogs for a work item
description: List all worklogs for a work item via Plane API. HTTP request format, parameters, scopes, and example responses for list all worklogs for a work item.
keywords: plane, plane api, rest api, api integration, worklogs, list all worklogs for a work item
---

# List all worklogs for a work item

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/worklogs/</span>
</div>

<div class="api-two-column">
<div class="api-left">

List worklog entries

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="work_item_id" type="string" :required="true">

The unique identifier of the work item.

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

### Scopes

`projects.work_items.worklogs:read`

</div>

</div>

<div class="api-right">

<CodePanel title="List all worklogs for a work item" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-items/work-item-uuid/worklogs/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-items/work-item-uuid/worklogs/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-items/work-item-uuid/worklogs/",
  {
    method: "GET",
    headers: {
      "X-API-Key": "your-api-key",
    },
  }
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z",
    "description": "Example description",
    "duration": 1,
    "created_by": "550e8400-e29b-41d4-a716-446655440000",
    "updated_by": "550e8400-e29b-41d4-a716-446655440000",
    "project_id": "550e8400-e29b-41d4-a716-446655440000",
    "workspace_id": "550e8400-e29b-41d4-a716-446655440000",
    "logged_by": "550e8400-e29b-41d4-a716-446655440000"
  }
]
```

</ResponsePanel>

</div>

</div>
