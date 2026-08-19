---
title: Create a release link
description: Create a release link with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, create a release link, release links, release links create
---

# Create a release link

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/releases/{release_id}/links/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Release links attach external URLs to a release. Create a release link.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="release_id" type="string (uuid)" :required="true">

The release the resource belongs to.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="title" type="string" :required="true">

Title.

Maximum 255 characters.

</ApiParam>

<ApiParam name="url" type="string (uri)" :required="true">

Target URL.

Maximum 200 characters.

</ApiParam>

<ApiParam name="metadata" type="string" :required="false">

The metadata.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted**, not returned as `null`. `id` always comes back. Pass `all` for every requestable field. An unknown name is a `400`. See [Sparse fields](/api-reference/v2/sparse-fields).

Requestable here: `created_at`, `created_by_id`, `id`, `metadata`, `release_id`, `title`, `url`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`releases.links:write`

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

<CodePanel title="Create a release link" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/releases/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/links/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "title": "Example title",
  "url": "https://example.com/spec",
  "metadata": null
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/releases/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/links/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "title": "Example title",
        "url": "https://example.com/spec",
        "metadata": None
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/releases/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/links/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Example title",
      url: "https://example.com/spec",
      metadata: null,
    }),
  },
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="201">

```json
{
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "metadata": null,
  "release_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "title": "Example title",
  "url": "https://example.com/spec"
}
```

</ResponsePanel>

</div>
</div>
