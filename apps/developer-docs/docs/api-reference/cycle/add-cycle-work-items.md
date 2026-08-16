---
title: Add work items to cycle
description: Add work items to cycle via Plane API. HTTP request format, parameters, scopes, and example responses for add work items to cycle.
keywords: plane, plane api, rest api, api integration, cycle, add work items to cycle
---

# Add work items to cycle

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/cycles/{cycle_id}/cycle-issues/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Assign multiple work items to a cycle. Automatically handles bulk creation and updates with activity tracking.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="cycle_id" type="string" :required="true">

The unique identifier of the cycle.

</ApiParam>

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

<ApiParam name="issues" type="array" :required="true">

List of issue IDs to add to the cycle

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.cycles:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Add work items to cycle" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/cycles/cycle-uuid/cycle-issues/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "issues": [
    "550e8400-e29b-41d4-a716-446655440000",
    "550e8400-e29b-41d4-a716-446655440000"
  ]
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/cycles/cycle-uuid/cycle-issues/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "issues": [
"550e8400-e29b-41d4-a716-446655440000",
"550e8400-e29b-41d4-a716-446655440000"
      ]
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/cycles/cycle-uuid/cycle-issues/",
  {
    method: "POST",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      issues: ["550e8400-e29b-41d4-a716-446655440000", "550e8400-e29b-41d4-a716-446655440000"],
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
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "cycle": "550e8400-e29b-41d4-a716-446655440000",
    "issue": "550e8400-e29b-41d4-a716-446655440000",
    "sub_issues_count": 3,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
]
```

</ResponsePanel>

</div>

</div>
