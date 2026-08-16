---
title: List all work items
description: List all work items via Plane API. HTTP request format, parameters, scopes, and example responses for list all work items.
keywords: plane, plane api, rest api, api integration, issue, list all work items
---

# List all work items

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve a paginated list of all work items in a project. Supports filtering, ordering, and field selection through query parameters.

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

### Query Parameters

<div class="params-list">

<ApiParam name="cursor" type="string" :required="false">

Pagination cursor for getting next set of results

</ApiParam>

<ApiParam name="expand" type="string" :required="false">

Comma-separated list of related fields to expand in response

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

External system identifier for filtering or lookup

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

External system source name for filtering or lookup

</ApiParam>

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to include in response

</ApiParam>

<ApiParam name="order_by" type="string" :required="false">

Field to order results by. Prefix with '-' for descending order

</ApiParam>

<ApiParam name="per_page" type="integer" :required="false">

Number of results per page (default: 20, max: 100)

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_items:read`

</div>

</div>

<div class="api-right">

<CodePanel title="List all work items" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-items/?cursor=20:1:0&expand=assignees" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-items/?cursor=20:1:0&expand=assignees",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-items/?cursor=20:1:0&expand=assignees",
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
  "grouped_by": "state",
  "sub_grouped_by": "priority",
  "total_count": 150,
  "next_cursor": "20:1:0",
  "prev_cursor": "20:0:0",
  "next_page_results": true,
  "prev_page_results": false,
  "count": 20,
  "total_pages": 8,
  "total_results": 150,
  "extra_stats": null,
  "results": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Example Name",
      "description": "Example description",
      "priority": "high",
      "sequence_id": 123,
      "state": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Example Name",
        "group": "started"
      },
      "assignees": [],
      "labels": [],
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

</ResponsePanel>

</div>

</div>
