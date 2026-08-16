---
title: Search work items
description: Search work items via Plane API. HTTP request format, parameters, scopes, and example responses for search work items.
keywords: plane, plane api, rest api, api integration, issue, search work items
---

# Search work items

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/work-items/search/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Perform semantic search across issue names, sequence IDs, and project identifiers.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

<div class="params-list">

<ApiParam name="limit" type="integer" :required="false">

Maximum number of results to return

</ApiParam>

<ApiParam name="project_id" type="string" :required="false">

Project ID for filtering results within a specific project

</ApiParam>

<ApiParam name="search" type="string" :required="true">

Search query to filter results by name, description, or identifier

</ApiParam>

<ApiParam name="workspace_search" type="string" :required="false">

Whether to search across entire workspace or within specific project

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_items:read`

</div>

</div>

<div class="api-right">

<CodePanel title="Search work items" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/workspaces/my-workspace/work-items/search/?limit=10&project_id=project-uuid" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/my-workspace/work-items/search/?limit=10&project_id=project-uuid",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/work-items/search/?limit=10&project_id=project-uuid",
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
  "issues": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Example Name",
      "sequence_id": 123,
      "project__identifier": "MAB",
      "project_id": "550e8400-e29b-41d4-a716-446655440000",
      "workspace__slug": "my-workspace"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Example Name",
      "sequence_id": 124,
      "project__identifier": "MAB",
      "project_id": "550e8400-e29b-41d4-a716-446655440000",
      "workspace__slug": "my-workspace"
    }
  ]
}
```

</ResponsePanel>

</div>

</div>
