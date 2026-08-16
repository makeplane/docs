---
title: Update project member
description: Update project member via Plane API. HTTP request format, parameters, scopes, and example responses for update project member.
keywords: plane, plane api, rest api, api integration, members, update project member
---

# Update project member

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/project-members/{member_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Update a project member

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

### Body Parameters

<div class="params-list">

<ApiParam name="member" type="string" :required="false">

Member.

</ApiParam>

<ApiParam name="role" type="integer" :required="false">

- `20` - Admin
- `15` - Member
- `5` - Guest

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.members:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Update project member" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/project-members/member-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "member": "550e8400-e29b-41d4-a716-446655440000",
  "role": 20
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/project-members/member-uuid/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "member": "550e8400-e29b-41d4-a716-446655440000",
      "role": 20
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/project-members/member-uuid/",
  {
    method: "PATCH",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      member: "550e8400-e29b-41d4-a716-446655440000",
      role: 20,
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
  "member": "550e8400-e29b-41d4-a716-446655440000",
  "role": 20
}
```

</ResponsePanel>

</div>

</div>
