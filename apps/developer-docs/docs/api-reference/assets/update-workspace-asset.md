---
title: Update workspace asset
description: Update workspace asset via Plane API. HTTP request format, parameters, scopes, and example responses for update workspace asset.
keywords: plane, plane api, rest api, api integration, assets, update workspace asset
---

# Update workspace asset

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/assets/{asset_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Update generic asset after upload completion

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="asset_id" type="string" :required="true">

The unique identifier of the asset.

</ApiParam>

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="is_uploaded" type="boolean" :required="false">

Whether the asset has been successfully uploaded

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`assets:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Update workspace asset" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/workspaces/my-workspace/assets/asset-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "is_uploaded": true
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/workspaces/my-workspace/assets/asset-uuid/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "is_uploaded": true
    }
)
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/assets/asset-uuid/", {
  method: "PATCH",
  headers: {
    "X-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    is_uploaded: true,
  }),
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
