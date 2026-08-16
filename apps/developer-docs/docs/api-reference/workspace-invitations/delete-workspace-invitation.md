---
title: Delete workspace invitation
description: Delete workspace invitation via Plane API. HTTP request format, parameters, scopes, and example responses for delete workspace invitation.
keywords: plane, plane api, rest api, api integration, workspace invitations, delete workspace invitation
---

# Delete workspace invitation

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/invitations/{invitation_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Delete a workspace invite

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="invitation_id" type="string" :required="true">

The unique identifier of the invitation.

</ApiParam>

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

Workspace admin or owner permission required.

</div>

</div>

<div class="api-right">

<CodePanel title="Delete workspace invitation" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v1/workspaces/my-workspace/invitations/invitation-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v1/workspaces/my-workspace/invitations/invitation-uuid/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/invitations/invitation-uuid/", {
  method: "DELETE",
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
