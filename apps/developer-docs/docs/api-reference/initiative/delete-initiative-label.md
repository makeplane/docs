---
title: Delete an initiative label
description: Delete an initiative label via Plane API. HTTP request format, parameters, scopes, and example responses for delete an initiative label.
keywords: plane, plane api, rest api, api integration, initiative, delete an initiative label
---

# Delete an initiative label

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/initiatives/labels/{label_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Delete an initiative label by its ID

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="initiative_label_id" type="string" :required="true">

The unique identifier of the initiative label.

</ApiParam>

<ApiParam name="label_id" type="string" :required="true">

The unique identifier of the label.

</ApiParam>

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`initiatives.labels:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Delete an initiative label" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v1/workspaces/my-workspace/initiatives/labels/label-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v1/workspaces/my-workspace/initiatives/labels/label-uuid/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/initiatives/labels/label-uuid/", {
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
