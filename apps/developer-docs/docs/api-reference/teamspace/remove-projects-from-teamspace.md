---
title: Remove projects from teamspace
description: Remove projects from teamspace via Plane API. HTTP request format, parameters, scopes, and example responses for remove projects from teamspace.
keywords: plane, plane api, rest api, api integration, teamspace, remove projects from teamspace
---

# Remove projects from teamspace

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/teamspaces/{teamspace_id}/projects/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Remove projects from a teamspace by its ID

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

<ApiParam name="teamspace_id" type="string" :required="true">

The unique identifier of the teamspace.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`teamspaces.projects:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Remove projects from teamspace" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v1/workspaces/my-workspace/teamspaces/teamspace-uuid/projects/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v1/workspaces/my-workspace/teamspaces/teamspace-uuid/projects/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/teamspaces/teamspace-uuid/projects/",
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
