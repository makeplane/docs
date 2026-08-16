---
title: List all custom property values
description: List all custom property values via Plane API. HTTP request format, parameters, scopes, and example responses for list all custom property values.
keywords: plane, plane api, rest api, api integration, issue types, values, list all custom property values
---

# List all custom property values

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/work-item-properties/{property_id}/values/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve the property value(s) for a specific work item property. Returns a single value for non-multi properties, or a list for multi-value properties.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="project_id" type="string" :required="true">

The unique identifier of the project.

</ApiParam>

<ApiParam name="property_id" type="string" :required="true">

The unique identifier of the property.

</ApiParam>

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

<ApiParam name="work_item_id" type="string" :required="true">

The unique identifier of the work item.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_item_property_values:read`

</div>

</div>

<div class="api-right">

<CodePanel title="List all custom property values" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-items/work-item-uuid/work-item-properties/property-uuid/values/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-items/work-item-uuid/work-item-properties/property-uuid/values/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-items/work-item-uuid/work-item-properties/property-uuid/values/",
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
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "property_id": "550e8400-e29b-41d4-a716-446655440000",
  "issue_id": "550e8400-e29b-41d4-a716-446655440000",
  "value": "Example Name",
  "value_type": "Example Name",
  "external_id": "550e8400-e29b-41d4-a716-446655440000",
  "external_source": "github",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

</ResponsePanel>

</div>

</div>
