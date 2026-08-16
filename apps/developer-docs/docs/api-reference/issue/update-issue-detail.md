---
title: Update a work item
description: Update a work item via Plane API. HTTP request format, parameters, scopes, and example responses for update a work item.
keywords: plane, plane api, rest api, api integration, issue, update a work item
---

# Update a work item

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{resource_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Partially update an existing work item with the provided fields. Supports external ID validation to prevent conflicts.

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

<ApiParam name="assignees" type="array" :required="false">

Assignees.

</ApiParam>

<ApiParam name="labels" type="array" :required="false">

Labels.

</ApiParam>

<ApiParam name="type_id" type="string" :required="false">

Type id.

</ApiParam>

<ApiParam name="parent" type="string" :required="false">

Parent.

</ApiParam>

<ApiParam name="deleted_at" type="string" :required="false">

Deleted at.

</ApiParam>

<ApiParam name="point" type="integer" :required="false">

Point.

</ApiParam>

<ApiParam name="name" type="string" :required="false">

Name.

</ApiParam>

<ApiParam name="description_html" type="string" :required="false">

Description html.

</ApiParam>

<ApiParam name="description_stripped" type="string" :required="false">

Description stripped.

</ApiParam>

<ApiParam name="priority" type="string" :required="false">

- `urgent` - Urgent
- `high` - High
- `medium` - Medium
- `low` - Low
- `none` - None

</ApiParam>

<ApiParam name="start_date" type="string" :required="false">

Start date.

</ApiParam>

<ApiParam name="target_date" type="string" :required="false">

Target date.

</ApiParam>

<ApiParam name="sequence_id" type="integer" :required="false">

Sequence id.

</ApiParam>

<ApiParam name="sort_order" type="number" :required="false">

Sort order.

</ApiParam>

<ApiParam name="completed_at" type="string" :required="false">

Completed at.

</ApiParam>

<ApiParam name="archived_at" type="string" :required="false">

Archived at.

</ApiParam>

<ApiParam name="last_activity_at" type="string" :required="false">

Last activity at.

</ApiParam>

<ApiParam name="is_draft" type="boolean" :required="false">

Is draft.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

External source.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

External id.

</ApiParam>

<ApiParam name="created_by" type="string" :required="false">

Created by.

</ApiParam>

<ApiParam name="state" type="string" :required="false">

State.

</ApiParam>

<ApiParam name="estimate_point" type="string" :required="false">

Estimate point.

</ApiParam>

<ApiParam name="type" type="string" :required="false">

Type.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_items:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Update a work item" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-items/resource-id-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Example Name",
  "description": "Example description",
  "priority": "medium",
  "state": "550e8400-e29b-41d4-a716-446655440000",
  "assignees": [
    "550e8400-e29b-41d4-a716-446655440000"
  ],
  "labels": [
    "550e8400-e29b-41d4-a716-446655440000"
  ]
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-items/resource-id-uuid/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "name": "Example Name",
      "description": "Example description",
      "priority": "medium",
      "state": "550e8400-e29b-41d4-a716-446655440000",
      "assignees": [
"550e8400-e29b-41d4-a716-446655440000"
      ],
      "labels": [
"550e8400-e29b-41d4-a716-446655440000"
      ]
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-items/resource-id-uuid/",
  {
    method: "PATCH",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Example Name",
      description: "Example description",
      priority: "medium",
      state: "550e8400-e29b-41d4-a716-446655440000",
      assignees: ["550e8400-e29b-41d4-a716-446655440000"],
      labels: ["550e8400-e29b-41d4-a716-446655440000"],
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
  "sequence_id": 1,
  "priority": "high",
  "assignees": ["550e8400-e29b-41d4-a716-446655440000"],
  "labels": ["550e8400-e29b-41d4-a716-446655440000"],
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

</ResponsePanel>

</div>

</div>
