---
title: List custom properties
description: List custom properties via Plane API. HTTP request format, parameters, scopes, and example responses for list custom properties.
keywords: plane, plane api, rest api, api integration, issue types, properties, list custom properties
---

# List custom properties

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-item-types/{type_id}/work-item-properties/</span>
</div>

<div class="api-two-column">
<div class="api-left">

List issue properties

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="project_id" type="string" :required="true">

The unique identifier of the project.

</ApiParam>

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

<ApiParam name="type_id" type="string" :required="true">

The unique identifier of the work item type.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_item_properties:read`

</div>

</div>

<div class="api-right">

<CodePanel title="List custom properties" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-item-types/type-uuid/work-item-properties/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-item-types/type-uuid/work-item-properties/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-item-types/type-uuid/work-item-properties/",
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
    "name": "Example Name",
    "display_name": "Example Name",
    "description": "Example description",
    "property_type": "TEXT",
    "deleted_at": "2024-01-01T00:00:00Z",
    "relation_type": "ISSUE",
    "logo_props": "example-value",
    "sort_order": 1,
    "is_required": true
  }
]
```

</ResponsePanel>

</div>

</div>
