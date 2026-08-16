---
title: Update milestone
description: Update milestone via Plane API. HTTP request format, parameters, scopes, and example responses for update milestone.
keywords: plane, plane api, rest api, api integration, milestones, update milestone
---

# Update milestone

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/milestones/{milestone_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Update a specific milestone by its ID.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="milestone_id" type="string" :required="true">

The unique identifier of the milestone.

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

<ApiParam name="title" type="string" :required="false">

Title.

</ApiParam>

<ApiParam name="target_date" type="string" :required="false">

Target date.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

External id.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

External source.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

API key authentication or an OAuth token with equivalent access.

</div>

</div>

<div class="api-right">

<CodePanel title="Update milestone" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/milestones/milestone-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "title": "Example Name",
  "target_date": "2024-01-01",
  "external_id": "550e8400-e29b-41d4-a716-446655440000",
  "external_source": "github"
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/milestones/milestone-uuid/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "title": "Example Name",
      "target_date": "2024-01-01",
      "external_id": "550e8400-e29b-41d4-a716-446655440000",
      "external_source": "github"
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/milestones/milestone-uuid/",
  {
    method: "PATCH",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Example Name",
      target_date: "2024-01-01",
      external_id: "550e8400-e29b-41d4-a716-446655440000",
      external_source: "github",
    }),
  }
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Example Name",
  "target_date": "2024-01-01",
  "external_id": "550e8400-e29b-41d4-a716-446655440000",
  "external_source": "github",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

</ResponsePanel>

</div>

</div>
