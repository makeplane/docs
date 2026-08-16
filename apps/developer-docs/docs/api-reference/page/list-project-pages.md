---
title: List project pages
description: List project pages via Plane API. HTTP request format, parameters, scopes, and example responses for listing project pages.
keywords: plane, plane api, rest api, api integration, page, list project pages, project pages
---

# List project pages

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/pages/</span>
</div>

<div class="api-two-column">
<div class="api-left">

List all pages in a project with optional filtering and search.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string" :required="true">

The unique identifier of the project.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

<div class="params-list">

<ApiParam name="type" type="string" :required="false">

Filter pages by scope. Defaults to `all`.

- `all` — all pages the user has access to
- `public` — pages with public access, excluding archived
- `private` — pages owned by the user and not shared, excluding archived
- `shared` — private pages explicitly shared with the user
- `archived` — pages that have been archived

</ApiParam>

<ApiParam name="search" type="string" :required="false">

Case-insensitive search on page title.

</ApiParam>

<ApiParam name="per_page" type="integer" :required="false">

Number of results per page. Defaults to `20`, maximum `100`.

</ApiParam>

<ApiParam name="cursor" type="string" :required="false">

Pagination cursor for getting the next or previous set of results.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.pages:read`

</div>

</div>

<div class="api-right">

<CodePanel title="List project pages" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-id/pages/?type=public&search=welcome&per_page=20" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-id/pages/",
    headers={"X-API-Key": "your-api-key"},
    params={"type": "public", "search": "welcome", "per_page": 20},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-id/pages/?type=public&search=welcome&per_page=20",
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
  "total_count": 4,
  "next_cursor": "20:1:0",
  "prev_cursor": "20:-1:1",
  "next_page_results": false,
  "prev_page_results": false,
  "count": 4,
  "total_pages": 1,
  "total_results": 4,
  "extra_stats": null,
  "results": [
    {
      "id": "b3478c56-31f6-4f7e-b445-8392a4b26621",
      "name": "welcome 3 b",
      "owned_by": "5b0af4aa-e310-408a-a480-868429af5701",
      "access": 0,
      "is_locked": false,
      "archived_at": null,
      "workspace": "8725ddfa-c181-49f6-9173-97b8d0b7d599",
      "created_at": "2026-04-01T15:41:19.062280Z",
      "updated_at": "2026-04-07T19:30:39.274060Z",
      "logo_props": {},
      "parent_id": "a2819c8b-f7ac-4cbd-b971-682726c4f8cc"
    }
  ]
}
```

</ResponsePanel>

</div>

</div>
