---
title: Add work items to epic
description: Add work items to epic via Plane API. HTTP request format, parameters, scopes, and example responses for add work items to epic.
keywords: plane, plane api, rest api, api integration, epics, add work items to epic
---

# Add work items to epic

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{slug}/projects/{project_id}/epics/{epic_id}/issues/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Add multiple work items as sub-issues under an epic. Validates type hierarchy before assignment.

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

<ApiParam name="work_item_ids" type="array" :required="true">

List of work item IDs to add to the epic

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.epics:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Add work items to epic" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/550e8400-e29b-41d4-a716-446655440000/epics/550e8400-e29b-41d4-a716-446655440001/issues/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "work_item_ids": [
    "550e8400-e29b-41d4-a716-446655440010",
    "550e8400-e29b-41d4-a716-446655440011"
  ]
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/550e8400-e29b-41d4-a716-446655440000/epics/550e8400-e29b-41d4-a716-446655440001/issues/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "work_item_ids": [
        "550e8400-e29b-41d4-a716-446655440010",
        "550e8400-e29b-41d4-a716-446655440011"
      ]
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/550e8400-e29b-41d4-a716-446655440000/epics/550e8400-e29b-41d4-a716-446655440001/issues/",
  {
    method: "POST",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      work_item_ids: ["550e8400-e29b-41d4-a716-446655440010", "550e8400-e29b-41d4-a716-446655440011"],
    }),
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
    "id": "550e8400-e29b-41d4-a716-446655440010",
    "name": "Implement login screen",
    "description_html": "<p>Build the login screen UI</p>",
    "description_stripped": "Build the login screen UI",
    "description_binary": null,
    "state": "550e8400-e29b-41d4-a716-446655440002",
    "priority": "high",
    "assignees": [],
    "labels": [],
    "type": null,
    "type_id": null,
    "estimate_point": null,
    "point": null,
    "start_date": null,
    "target_date": null,
    "parent": "550e8400-e29b-41d4-a716-446655440001",
    "sequence_id": 12,
    "sort_order": 65535.0,
    "is_draft": false,
    "completed_at": null,
    "archived_at": null,
    "last_activity_at": "2025-03-15T10:00:00Z",
    "project": "550e8400-e29b-41d4-a716-446655440000",
    "workspace": "550e8400-e29b-41d4-a716-446655440003",
    "external_id": null,
    "external_source": null,
    "deleted_at": null,
    "created_at": "2025-03-10T09:00:00Z",
    "updated_at": "2025-03-15T10:00:00Z",
    "created_by": "550e8400-e29b-41d4-a716-446655440005",
    "updated_by": null
  }
]
```

</ResponsePanel>

</div>

</div>
