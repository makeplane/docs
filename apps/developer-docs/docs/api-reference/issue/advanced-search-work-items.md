---
title: Advanced search work items
description: Advanced search work items via Plane API. HTTP request format, parameters, scopes, and example responses for advanced search work items.
keywords: plane, plane api, rest api, api integration, issue, advanced search work items
---

# Advanced search work items

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/work-items/advanced-search/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Search for work items with advanced filters and search query.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="query" type="string" :required="false">

Search query string for text-based search across issue fields

</ApiParam>

<ApiParam name="filters" type="object" :required="false">

Filter JSON passed through to IssueFilterSet for validation and application

</ApiParam>

<ApiParam name="limit" type="integer" :required="false">

Maximum number of results to return

</ApiParam>

<ApiParam name="workspace_search" type="boolean" :required="false">

Whether to search across all projects in the workspace

</ApiParam>

<ApiParam name="project_id" type="string" :required="false">

Optional project ID to filter results to a specific project

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

API key authentication or an OAuth token with equivalent access.

</div>

</div>

<div class="api-right">

<CodePanel title="Advanced search work items" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/work-items/advanced-search/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "query": "login",
  "project_id": "550e8400-e29b-41d4-a716-446655440000",
  "limit": 10
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/work-items/advanced-search/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "query": "login",
      "project_id": "550e8400-e29b-41d4-a716-446655440000",
      "limit": 10
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/work-items/advanced-search/", {
  method: "POST",
  headers: {
    "X-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query: "login",
    project_id: "550e8400-e29b-41d4-a716-446655440000",
    limit: 10,
  }),
});
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
[
  [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Example Name",
      "sequence_id": 102,
      "project_identifier": "WEB",
      "project_id": "550e8400-e29b-41d4-a716-446655440000",
      "workspace_id": "550e8400-e29b-41d4-a716-446655440000",
      "type_id": "550e8400-e29b-41d4-a716-446655440000",
      "state_id": "550e8400-e29b-41d4-a716-446655440000",
      "priority": "high",
      "target_date": "2024-01-01",
      "start_date": "2024-01-01"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Example Name",
      "sequence_id": 245,
      "project_identifier": "API",
      "project_id": "550e8400-e29b-41d4-a716-446655440000",
      "workspace_id": "550e8400-e29b-41d4-a716-446655440000",
      "type_id": "550e8400-e29b-41d4-a716-446655440000",
      "state_id": "550e8400-e29b-41d4-a716-446655440000",
      "priority": "medium",
      "target_date": null,
      "start_date": "2024-01-01"
    }
  ]
]
```

</ResponsePanel>

</div>

</div>
