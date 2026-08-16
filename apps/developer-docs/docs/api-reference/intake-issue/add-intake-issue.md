---
title: Create an intake work item
description: Create an intake work item via Plane API. HTTP request format, parameters, scopes, and example responses for create an intake work item.
keywords: plane, plane api, rest api, api integration, intake issue, create an intake work item
---

# Create an intake work item

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/intake-issues/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Submit a new work item to the project's intake queue for review and triage. Automatically creates the work item with default triage state and tracks activity.

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

### Body Parameters

<div class="params-list">

<ApiParam name="issue" type="object" :required="true">

Issue data for the intake issue

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.intakes:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Create an intake work item" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/intake-issues/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "issue": {
    "name": "Example Name",
    "description": "Example description",
    "priority": "medium"
  }
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/intake-issues/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "issue": {
"name": "Example Name",
"description": "Example description",
"priority": "medium"
      }
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/intake-issues/",
  {
    method: "POST",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      issue: {
        name: "Example Name",
        description: "Example description",
        priority: "medium",
      },
    }),
  }
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="201">

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": 0,
  "source": "in_app",
  "issue": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Example Name",
    "description": "Example description",
    "priority": "medium",
    "sequence_id": 124
  },
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

</ResponsePanel>

</div>

</div>
