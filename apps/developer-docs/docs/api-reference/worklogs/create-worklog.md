---
title: Create a worklog
description: Create a worklog via Plane API. HTTP request format, parameters, scopes, and example responses for create a worklog.
keywords: plane, plane api, rest api, api integration, worklogs, create a worklog
---

# Create a worklog

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/worklogs/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Create a new worklog entry

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

### Body Parameters

<div class="params-list">

<ApiParam name="description" type="string" :required="false">

Description.

</ApiParam>

<ApiParam name="duration" type="integer" :required="false">

Duration.

</ApiParam>

<ApiParam name="created_by" type="string" :required="false">

Created by.

</ApiParam>

<ApiParam name="updated_by" type="string" :required="false">

Updated by.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_items.worklogs:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Create a worklog" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-items/work-item-uuid/worklogs/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "description": "Example description",
  "duration": 1,
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "updated_by": "550e8400-e29b-41d4-a716-446655440000"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-items/work-item-uuid/worklogs/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "description": "Example description",
      "duration": 1,
      "created_by": "550e8400-e29b-41d4-a716-446655440000",
      "updated_by": "550e8400-e29b-41d4-a716-446655440000"
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-items/work-item-uuid/worklogs/",
  {
    method: "POST",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description: "Example description",
      duration: 1,
      created_by: "550e8400-e29b-41d4-a716-446655440000",
      updated_by: "550e8400-e29b-41d4-a716-446655440000",
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
  "description": "Example description",
  "duration": 1,
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "updated_by": "550e8400-e29b-41d4-a716-446655440000",
  "project_id": "550e8400-e29b-41d4-a716-446655440000",
  "workspace_id": "550e8400-e29b-41d4-a716-446655440000",
  "logged_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

</ResponsePanel>

</div>

</div>
