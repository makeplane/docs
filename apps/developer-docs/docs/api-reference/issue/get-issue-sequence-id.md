---
title: Retrieve a work item by identifier
description: Retrieve a work item by identifier via Plane API. HTTP request format, parameters, scopes, and example responses for retrieve a work item by identifier.
keywords: plane, plane api, rest api, api integration, issue, retrieve a work item by identifier
---

# Retrieve a work item by identifier

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/work-items/{project_identifier}-{issue_identifier}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve a specific work item using workspace slug, project identifier, and issue identifier.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="issue_identifier" type="integer" :required="true">

The numeric issue identifier.

</ApiParam>

<ApiParam name="project_identifier" type="string" :required="true">

The project identifier key.

</ApiParam>

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_items:read`

</div>

</div>

<div class="api-right">

<CodePanel title="Retrieve a work item by identifier" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/workspaces/my-workspace/work-items/PROJ-123/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/my-workspace/work-items/PROJ-123/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/work-items/PROJ-123/", {
  method: "GET",
  headers: {
    "X-API-Key": "your-api-key",
  },
});
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
