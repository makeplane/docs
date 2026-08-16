---
title: Delete user asset
description: Delete user asset via Plane API. HTTP request format, parameters, scopes, and example responses for delete user asset.
keywords: plane, plane api, rest api, api integration, assets, delete user asset
---

# Delete user asset

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v1/assets/user-assets/{asset_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Delete user asset.

Delete a user profile asset (avatar or cover image) and remove its reference from the user profile.
This performs a soft delete by marking the asset as deleted and updating the user's profile.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="asset_id" type="string" :required="true">

Asset ID

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`assets:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Delete user asset" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v1/assets/user-assets/asset-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v1/assets/user-assets/asset-uuid/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/assets/user-assets/asset-uuid/", {
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
