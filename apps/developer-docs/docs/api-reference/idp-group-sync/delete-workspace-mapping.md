---
title: Delete workspace group mapping
description: Delete a workspace group mapping via Plane API. HTTP request format, parameters, scopes, and example responses for delete workspace group mapping.
keywords: plane, plane api, rest api, api integration, idp group sync, delete workspace group mapping
---

# Delete workspace group mapping

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/group-sync/workspace-mappings/{mapping_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Delete an IdP group → workspace role mapping.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

<ApiParam name="mapping_id" type="string" :required="true">

The unique identifier of the workspace group mapping.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.group_sync:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Delete workspace group mapping" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/workspace-mappings/772g0622-g41d-63f6-c938-668877662222/" \
  -H "X-API-Key: $PLANE_API_KEY"
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/workspace-mappings/772g0622-g41d-63f6-c938-668877662222/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/workspace-mappings/772g0622-g41d-63f6-c938-668877662222/",
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
