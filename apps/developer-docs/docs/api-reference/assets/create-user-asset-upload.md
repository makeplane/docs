---
title: Create user asset upload
description: Create user asset upload via Plane API. HTTP request format, parameters, scopes, and example responses for create user asset upload.
keywords: plane, plane api, rest api, api integration, assets, create user asset upload
---

# Create user asset upload

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/assets/user-assets/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Generate presigned URL for user asset upload

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="name" type="string" :required="true">

Original filename of the asset

</ApiParam>

<ApiParam name="type" type="string" :required="false">

MIME type of the file

- `image/jpeg` - JPEG
- `image/png` - PNG
- `image/webp` - WebP
- `image/jpg` - JPG
- `image/gif` - GIF

</ApiParam>

<ApiParam name="size" type="integer" :required="true">

File size in bytes

</ApiParam>

<ApiParam name="entity_type" type="string" :required="true">

Type of user asset

- `USER_AVATAR` - User Avatar
- `USER_COVER` - User Cover

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`assets:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Create user asset upload" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/assets/user-assets/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Example Name",
  "type": "image/jpeg",
  "size": 1024000,
  "entity_type": "USER_AVATAR"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/assets/user-assets/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "name": "Example Name",
      "type": "image/jpeg",
      "size": 1024000,
      "entity_type": "USER_AVATAR"
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/assets/user-assets/", {
  method: "POST",
  headers: {
    "X-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Example Name",
    type: "image/jpeg",
    size: 1024000,
    entity_type: "USER_AVATAR",
  }),
});
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "asset_id": "550e8400-e29b-41d4-a716-446655440000",
  "asset_url": "/api/assets/v2/static/550e8400-e29b-41d4-a716-446655440000/",
  "upload_data": {
    "url": "https://uploads.example.com/plane-bucket",
    "fields": {
      "Content-Type": "image/png",
      "key": "user-assets/550e8400-e29b-41d4-a716-446655440000/profile-image.png",
      "x-amz-algorithm": "AWS4-HMAC-SHA256",
      "x-amz-credential": "example/20240101/us-east-1/s3/aws4_request",
      "x-amz-date": "20240101T000000Z",
      "policy": "example-policy",
      "x-amz-signature": "example-signature"
    }
  }
}
```

</ResponsePanel>

</div>

</div>
