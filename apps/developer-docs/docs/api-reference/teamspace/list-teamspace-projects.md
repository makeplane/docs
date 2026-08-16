---
title: List teamspace projects
description: List teamspace projects via Plane API. HTTP request format, parameters, scopes, and example responses for list teamspace projects.
keywords: plane, plane api, rest api, api integration, teamspace, list teamspace projects
---

# List teamspace projects

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/teamspaces/{teamspace_id}/projects/</span>
</div>

<div class="api-two-column">
<div class="api-left">

List all projects in a teamspace

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

<ApiParam name="teamspace_id" type="string" :required="true">

The unique identifier of the teamspace.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`teamspaces.projects:read`

</div>

</div>

<div class="api-right">

<CodePanel title="List teamspace projects" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/workspaces/my-workspace/teamspaces/teamspace-uuid/projects/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/my-workspace/teamspaces/teamspace-uuid/projects/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/teamspaces/teamspace-uuid/projects/",
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
      "identifier": "PROJ-123",
      "network": 2
    }
  ]
}
```

</ResponsePanel>

</div>

</div>
