---
title: Update an epic
description: Update an epic via Plane API. HTTP request format, parameters, scopes, and example responses for update an epic.
keywords: plane, plane api, rest api, api integration, epics, update an epic
---

# Update an epic

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/workspaces/{slug}/projects/{project_id}/epics/{epic_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Partially update an existing epic with the provided fields. Supports external ID validation to prevent conflicts.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="epic_id" type="string" :required="true">

Epic ID

</ApiParam>

<ApiParam name="project_id" type="string" :required="true">

Project ID

</ApiParam>

<ApiParam name="slug" type="string" :required="true">

Workspace slug

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="name" type="string" :required="false">

Name of the epic.

</ApiParam>

<ApiParam name="description_html" type="string" :required="false">

HTML-formatted description of the epic.

</ApiParam>

<ApiParam name="state_id" type="string" :required="false">

ID of the state (status) to assign to the epic.

</ApiParam>

<ApiParam name="parent_id" type="string" :required="false">

ID of the parent work item.

</ApiParam>

<ApiParam name="priority" type="string" :required="false">

Priority level. Possible values: `none`, `urgent`, `high`, `medium`, `low`.

</ApiParam>

<ApiParam name="start_date" type="string" :required="false">

Start date of the epic in YYYY-MM-DD format.

</ApiParam>

<ApiParam name="target_date" type="string" :required="false">

Target completion date in YYYY-MM-DD format.

</ApiParam>

<ApiParam name="assignee_ids" type="array" :required="false">

List of user IDs to assign to the epic.

</ApiParam>

<ApiParam name="label_ids" type="array" :required="false">

List of label IDs to apply to the epic.

</ApiParam>

<ApiParam name="estimate_point" type="string" :required="false">

ID of the estimate point.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

Name of the source system if importing from another tool.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

External identifier from the source system.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.epics:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Update an epic" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/550e8400-e29b-41d4-a716-446655440000/epics/550e8400-e29b-41d4-a716-446655440001/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Updated Epic Name",
  "priority": "medium",
  "target_date": "2025-09-30"
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/550e8400-e29b-41d4-a716-446655440000/epics/550e8400-e29b-41d4-a716-446655440001/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "name": "Updated Epic Name",
      "priority": "medium",
      "target_date": "2025-09-30"
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/550e8400-e29b-41d4-a716-446655440000/epics/550e8400-e29b-41d4-a716-446655440001/",
  {
    method: "PATCH",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Updated Epic Name",
      priority: "medium",
      target_date: "2025-09-30",
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
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "name": "Updated Epic Name",
  "description": {},
  "description_html": "<p>Create a cross-platform mobile application framework</p>",
  "description_stripped": "Create a cross-platform mobile application framework",
  "description_binary": null,
  "state": "550e8400-e29b-41d4-a716-446655440002",
  "priority": "medium",
  "assignees": [],
  "labels": [],
  "type": "550e8400-e29b-41d4-a716-446655440003",
  "estimate_point": null,
  "point": null,
  "start_date": "2025-03-01",
  "target_date": "2025-09-30",
  "parent": null,
  "sequence_id": 57,
  "sort_order": 605535.0,
  "is_draft": false,
  "completed_at": null,
  "archived_at": null,
  "project": "550e8400-e29b-41d4-a716-446655440000",
  "workspace": "550e8400-e29b-41d4-a716-446655440004",
  "external_id": null,
  "external_source": null,
  "deleted_at": null,
  "created_at": "2025-03-01T21:23:54.645263Z",
  "updated_at": "2025-03-05T14:12:00.123456Z",
  "created_by": "550e8400-e29b-41d4-a716-446655440005",
  "updated_by": "550e8400-e29b-41d4-a716-446655440005"
}
```

</ResponsePanel>

</div>

</div>
