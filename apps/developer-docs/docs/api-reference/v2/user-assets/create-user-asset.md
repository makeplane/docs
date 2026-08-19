---
title: Create a user asset upload
description: Create a user asset with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, create a user asset upload, user assets, user assets create
---

# Create a user asset upload

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/users/me/assets/</span>
</div>

<div class="api-two-column">
<div class="api-left">

User assets are the calling user's own uploads, such as an avatar or cover image. Create a user asset.

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="entity_type" type="string" :required="true">

- `USER_AVATAR` - USER_AVATAR
- `USER_COVER` - USER_COVER

One of `USER_AVATAR`, `USER_COVER`.

</ApiParam>

<ApiParam name="name" type="string" :required="true">

Display name.

</ApiParam>

<ApiParam name="size" type="integer" :required="true">

The size.

</ApiParam>

<ApiParam name="type" type="string" :required="false">

The type.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted**, not returned as `null`. `id` always comes back. Pass `all` for every requestable field. An unknown name is a `400`. See [Sparse fields](/api-reference/v2/sparse-fields).

Requestable here: `asset_url`, `attributes`, `content_type`, `created_at`, `created_by_id`, `entity_type`, `id`, `is_uploaded`, `name`, `size`, `user_id`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`assets:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                               |
| ------ | ------------------------ | ----------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | The request body or a query parameter failed validation.                            |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                     |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan or is switched off. |
| `403`  | `forbidden`              | Your role or token scope doesn't allow this.                                        |
| `404`  | `not_found`              | No such resource, or it's outside your tenant.                                      |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                |
| `409`  | `conflict`               | A business rule blocks the write — see the notes above.                             |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                            |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                 |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                          |

</div>

</div>

<div class="api-right">

<CodePanel title="Create a user asset upload" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/users/me/assets/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "entity_type": "USER_AVATAR",
  "name": "Example name",
  "size": 1,
  "type": "example"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/users/me/assets/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "entity_type": "USER_AVATAR",
        "name": "Example name",
        "size": 1,
        "type": "example"
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v2/users/me/assets/", {
  method: "POST",
  headers: {
    "X-Api-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    entity_type: "USER_AVATAR",
    name: "Example name",
    size: 1,
    type: "example",
  }),
});
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "asset_url": "https://example.com",
  "attributes": null,
  "content_type": "example",
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "entity_type": "example",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "is_uploaded": false,
  "name": "Example name",
  "size": 1,
  "user_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
}
```

</ResponsePanel>

</div>
</div>
