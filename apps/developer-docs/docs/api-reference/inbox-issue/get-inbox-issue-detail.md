---
title: Get intake issue detail
description: Get intake issue detail details via Plane API. Retrieve complete information for a specific resource.
keywords: plane, plane api, rest api, api integration, work items, issues, tasks
---

# Get intake issue detail

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/inbox-issues/{issue_id}</span>
</div>

<div class="api-two-column">
<div class="api-left">

Gets the details of an intake issue

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

</ApiParam>

<ApiParam name="project_id" type="string" :required="true">

</ApiParam>

<ApiParam name="work_item_id" type="string" :required="true">

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.intakes:read`

</div>

</div>
<div class="api-right">

<CodePanel title="Get intake issue detail" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/inbox-issues/issue-uuid" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/inbox-issues/issue-uuid",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/inbox-issues/issue-uuid",
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
  "id": "project-uuid",
  "name": "Project Name",
  "identifier": "PROJ",
  "description": "Project description",
  "created_at": "2024-01-01T00:00:00Z"
}
```

</ResponsePanel>

</div>
</div>
