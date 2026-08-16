---
title: Add intake issue
description: Create intake issue via Plane API. HTTP POST request format, required fields, and example responses.
keywords: plane, plane api, rest api, api integration, work items, issues, tasks
---

# Add intake issue

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/inbox-issues/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Adds an intake issue in a project

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

</ApiParam>

<ApiParam name="project_id" type="string" :required="true">

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="issue" type="object" :required="true">

An object containing the issue details, including a `name` field (required).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.intakes:write`

</div>

</div>
<div class="api-right">

<CodePanel title="Add intake issue" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/inbox-issues/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "issue": "example-issue"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/inbox-issues/",
    headers={"X-API-Key": "your-api-key"},
    json={
  'issue': 'example-issue'
}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/inbox-issues/",
  {
    method: "POST",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      issue: "example-issue",
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
