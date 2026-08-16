---
title: Remove workspace member
description: Remove workspace member via Plane API. HTTP request format, parameters, scopes, and example responses for remove workspace member.
keywords: plane, plane api, rest api, api integration, members, remove workspace member
---

# Remove workspace member

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/members/remove/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Remove a member from the workspace, deactivate them from all projects, and reduce the seat count.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.members:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Remove workspace member" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/members/remove/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/members/remove/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/members/remove/", {
  method: "POST",
  headers: {
    "X-API-Key": "your-api-key",
  },
});
console.log(response.status);
```

</template>
</CodePanel>

<ResponsePanel status="204">

No response body.

</ResponsePanel>

</div>

</div>
