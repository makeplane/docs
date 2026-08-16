---
title: Create a work item type
description: Create a work item type via Plane API. HTTP request format, parameters, scopes, and example responses for create a work item type.
keywords: plane, plane api, rest api, api integration, issue types, types, create a work item type
---

# Create a work item type

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-item-types/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Create a new issue type for a project

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

<ApiParam name="name" type="string" :required="true">

Name.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Description.

</ApiParam>

<ApiParam name="is_epic" type="boolean" :required="false">

Is epic.

</ApiParam>

<ApiParam name="is_active" type="boolean" :required="false">

Is active.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

External source.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

External id.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_item_types:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Create a work item type" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-item-types/" \
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
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-item-types/",
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
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-item-types/",
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
  "project_ids": ["550e8400-e29b-41d4-a716-446655440000"],
  "logo_props": "example-value",
  "is_epic": true,
  "is_default": true,
  "is_active": true,
  "level": 1
}
```

</ResponsePanel>

</div>

</div>
