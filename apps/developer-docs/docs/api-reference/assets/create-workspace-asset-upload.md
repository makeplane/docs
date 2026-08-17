---
title: Create workspace asset upload
description: Create workspace asset upload via Plane API. HTTP request format, parameters, scopes, and example responses for create workspace asset upload.
keywords: plane, plane api, rest api, api integration, assets, create workspace asset upload
---

# Create workspace asset upload

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/assets/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Generate presigned URL for generic asset upload

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="name" type="string" :required="true">

Original filename of the asset

</ApiParam>

<ApiParam name="type" type="string" :required="false">

MIME type of the file

</ApiParam>

<ApiParam name="size" type="integer" :required="true">

File size in bytes

</ApiParam>

<ApiParam name="project_id" type="string" :required="false">

UUID of the project to associate with the asset

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

External identifier for the asset (for integration tracking)

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

External source system (for integration tracking)

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`assets:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Create workspace asset upload" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/assets/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Example Name",
  "type": "image/jpeg",
  "size": 1024000,
  "project_id": "550e8400-e29b-41d4-a716-446655440000",
  "external_id": "550e8400-e29b-41d4-a716-446655440000",
  "external_source": "github"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/assets/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "name": "Example Name",
      "type": "image/jpeg",
      "size": 1024000,
      "project_id": "550e8400-e29b-41d4-a716-446655440000",
      "external_id": "550e8400-e29b-41d4-a716-446655440000",
      "external_source": "github"
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/assets/", {
  method: "POST",
  headers: {
    "X-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Example Name",
    type: "image/jpeg",
    size: 1024000,
    project_id: "550e8400-e29b-41d4-a716-446655440000",
    external_id: "550e8400-e29b-41d4-a716-446655440000",
    external_source: "github",
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
  "asset_url": "/api/assets/v2/workspaces/my-workspace/projects/None/issues/None/attachments/550e8400-e29b-41d4-a716-446655440000/",
  "upload_data": {
    "url": "https://uploads.example.com/plane-bucket",
    "fields": {
      "Content-Type": "image/png",
      "key": "workspace-assets/550e8400-e29b-41d4-a716-446655440000/workspace-image.png",
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
