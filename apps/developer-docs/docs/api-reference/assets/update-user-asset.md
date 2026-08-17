---
title: Update user asset
description: Update user asset via Plane API. HTTP request format, parameters, scopes, and example responses for update user asset.
keywords: plane, plane api, rest api, api integration, assets, update user asset
---

# Update user asset

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/assets/user-assets/{asset_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Mark user asset as uploaded

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="asset_id" type="string" :required="true">

Asset ID

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="attributes" type="object" :required="false">

Additional attributes to update for the asset

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`assets:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Update user asset" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/assets/user-assets/asset-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "attributes": {
    "name": "Example Name",
    "type": "image/jpeg",
    "size": 1024000
  },
  "entity_type": "USER_AVATAR"
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/assets/user-assets/asset-uuid/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "attributes": {
"name": "Example Name",
"type": "image/jpeg",
"size": 1024000
      },
      "entity_type": "USER_AVATAR"
    }
)
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/assets/user-assets/asset-uuid/", {
  method: "PATCH",
  headers: {
    "X-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    attributes: {
      name: "Example Name",
      type: "image/jpeg",
      size: 1024000,
    },
    entity_type: "USER_AVATAR",
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
