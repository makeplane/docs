---
title: Delete a state
description: Delete a state via Plane API. HTTP request format, parameters, scopes, and example responses for delete a state.
keywords: plane, plane api, rest api, api integration, state, delete a state
---

# Delete a state

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/states/{state_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Permanently remove a workflow state from a project. Default states and states with existing work items cannot be deleted.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="project_id" type="string" :required="true">

The unique identifier of the project.

</ApiParam>

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

<ApiParam name="state_id" type="string" :required="true">

The unique identifier of the state.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.states:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Delete a state" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/states/state-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/states/state-uuid/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/states/state-uuid/",
  {
    method: "DELETE",
    headers: {
      "X-API-Key": "your-api-key",
    },
  }
);
console.log(response.status);
```

</template>
</CodePanel>

<ResponsePanel status="204">

No response body.

</ResponsePanel>

</div>

</div>
