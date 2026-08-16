---
title: Add dropdown options
description: Add dropdown options via Plane API. HTTP request format, parameters, scopes, and example responses for add dropdown options.
keywords: plane, plane api, rest api, api integration, issue types, options, add dropdown options
---

# Add dropdown options

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-item-properties/{property_id}/options/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Create a new issue property option

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

<ApiParam name="is_active" type="boolean" :required="false">

Is active.

</ApiParam>

<ApiParam name="is_default" type="boolean" :required="false">

Is default.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

External source.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

External id.

</ApiParam>

<ApiParam name="parent" type="string" :required="false">

Parent.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_item_property_options:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Add dropdown options" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-item-properties/property-uuid/options/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Example Name",
  "description": "Example description",
  "external_id": "550e8400-e29b-41d4-a716-446655440000",
  "external_source": "github"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-item-properties/property-uuid/options/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "name": "Example Name",
      "description": "Example description",
      "external_id": "550e8400-e29b-41d4-a716-446655440000",
      "external_source": "github"
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-item-properties/property-uuid/options/",
  {
    method: "POST",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Example Name",
      description: "Example description",
      external_id: "550e8400-e29b-41d4-a716-446655440000",
      external_source: "github",
    }),
  }
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="201">

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z",
  "name": "Example Name",
  "description": "Example description",
  "deleted_at": "2024-01-01T00:00:00Z",
  "sort_order": 1,
  "logo_props": "example-value",
  "is_active": true,
  "is_default": true,
  "external_source": "github",
  "external_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

</ResponsePanel>

</div>

</div>
