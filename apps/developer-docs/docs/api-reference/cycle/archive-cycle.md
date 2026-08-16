---
title: Archive a cycle
description: Archive a cycle via Plane API. HTTP request format, parameters, scopes, and example responses for archive a cycle.
keywords: plane, plane api, rest api, api integration, cycle, archive a cycle
---

# Archive a cycle

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/cycles/{cycle_id}/archive/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Move a completed cycle to archived status for historical tracking. Only cycles that have ended can be archived.

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

### Scopes

`projects.cycles:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Archive a cycle" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/cycles/cycle-uuid/archive/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/cycles/cycle-uuid/archive/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/cycles/cycle-uuid/archive/",
  {
    method: "POST",
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
