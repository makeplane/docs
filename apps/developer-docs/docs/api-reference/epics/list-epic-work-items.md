---
title: List epic work items
description: List epic work items via Plane API. HTTP request format, parameters, scopes, and example responses for list epic work items.
keywords: plane, plane api, rest api, api integration, epics, list epic work items
---

# List epic work items

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/workspaces/{slug}/projects/{project_id}/epics/{epic_id}/issues/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve all work items under an epic.

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

### Query Parameters

<div class="params-list">

<ApiParam name="cursor" type="string" :required="false">

Pagination cursor for getting next set of results

</ApiParam>

<ApiParam name="per_page" type="integer" :required="false">

Number of results per page (default: 20, max: 100)

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.epics:read` `projects.work-items:read`

</div>

</div>

<div class="api-right">

<CodePanel title="List epic work items" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/550e8400-e29b-41d4-a716-446655440000/epics/550e8400-e29b-41d4-a716-446655440001/issues/?per_page=20" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/550e8400-e29b-41d4-a716-446655440000/epics/550e8400-e29b-41d4-a716-446655440001/issues/?per_page=20",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/550e8400-e29b-41d4-a716-446655440000/epics/550e8400-e29b-41d4-a716-446655440001/issues/?per_page=20",
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
  "grouped_by": null,
  "sub_grouped_by": null,
  "total_count": 5,
  "next_cursor": "20:1:0",
  "prev_cursor": "20:0:0",
  "next_page_results": false,
  "prev_page_results": false,
  "count": 5,
  "total_pages": 1,
  "total_results": 5,
  "extra_stats": null,
  "results": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440010",
      "name": "Implement login screen",
      "description_html": "<p>Build the login screen UI</p>",
      "description_stripped": "Build the login screen UI",
      "description_binary": null,
      "state": "550e8400-e29b-41d4-a716-446655440002",
      "priority": "high",
      "assignees": ["550e8400-e29b-41d4-a716-446655440005"],
      "labels": [],
      "type": null,
      "type_id": null,
      "estimate_point": null,
      "point": null,
      "start_date": "2025-03-10",
      "target_date": "2025-03-20",
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
}
```

</ResponsePanel>

</div>

</div>
