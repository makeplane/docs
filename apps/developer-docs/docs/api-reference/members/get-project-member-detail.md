---
title: Get project member
description: Get project member via Plane API. HTTP request format, parameters, scopes, and example responses for get project member.
keywords: plane, plane api, rest api, api integration, members, get project member
---

# Get project member

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/project-members/{member_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve a project member by ID.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="member_id" type="string" :required="true">

The unique identifier of the member.

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

### Scopes

`projects.members:read`

</div>

</div>

<div class="api-right">

<CodePanel title="Get project member" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/project-members/member-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/project-members/member-uuid/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/project-members/member-uuid/",
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
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "member": "550e8400-e29b-41d4-a716-446655440000",
  "role": 20
}
```

</ResponsePanel>

</div>

</div>
