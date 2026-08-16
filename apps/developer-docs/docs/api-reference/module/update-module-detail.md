---
title: Update module details
description: Update module details via Plane API. HTTP request format, parameters, scopes, and example responses for update module details.
keywords: plane, plane api, rest api, api integration, module, update module details
---

# Update module details

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/modules/{resource_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Modify an existing module's properties like name, description, status, or timeline.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="resource_id" type="string" :required="true">

The unique identifier of the resource.

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

<ApiParam name="name" type="string" :required="false">

Name.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Description.

</ApiParam>

<ApiParam name="start_date" type="string" :required="false">

Start date.

</ApiParam>

<ApiParam name="target_date" type="string" :required="false">

Target date.

</ApiParam>

<ApiParam name="status" type="string" :required="false">

- `backlog` - Backlog
- `planned` - Planned
- `in-progress` - In Progress
- `paused` - Paused
- `completed` - Completed
- `cancelled` - Cancelled

</ApiParam>

<ApiParam name="lead" type="string" :required="false">

Lead.

</ApiParam>

<ApiParam name="members" type="array" :required="false">

Members.

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

`projects.modules:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Update module details" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/modules/resource-id-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Example Name",
  "description": "Example description",
  "start_date": "2024-01-01",
  "end_date": "2024-01-01",
  "external_id": "550e8400-e29b-41d4-a716-446655440000",
  "external_source": "github"
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/modules/resource-id-uuid/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "name": "Example Name",
      "description": "Example description",
      "start_date": "2024-01-01",
      "end_date": "2024-01-01",
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
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/modules/resource-id-uuid/",
  {
    method: "PATCH",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Example Name",
      description: "Example description",
      start_date: "2024-01-01",
      end_date: "2024-01-01",
      external_id: "550e8400-e29b-41d4-a716-446655440000",
      external_source: "github",
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
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Example Name",
  "description": "Example description",
  "start_date": "2024-01-01",
  "target_date": "2024-01-01",
  "status": "in-progress",
  "total_issues": 12,
  "completed_issues": 5,
  "cancelled_issues": 0,
  "started_issues": 4,
  "unstarted_issues": 3,
  "backlog_issues": 0,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

</ResponsePanel>

</div>

</div>
