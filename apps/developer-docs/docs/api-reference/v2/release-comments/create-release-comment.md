---
title: Create a release comment
description: Create a release comment with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, create a release comment, release comments, release comments create
---

# Create a release comment

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/releases/{release_id}/comments/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Release comments are the discussion thread on a release. Create a release comment.

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

<ApiParam name="comment_html" type="string" :required="true">

The comment html.

</ApiParam>

<ApiParam name="is_resolved" type="boolean" :required="false">

Whether is resolved.

</ApiParam>

<ApiParam name="parent_id" type="string (uuid)" :required="false">

Id of the related parent.

Nullable.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted**, not returned as `null`. `id` always comes back. Pass `all` for every requestable field. An unknown name is a `400`. See [Sparse fields](/api-reference/v2/sparse-fields).

Requestable here: `comment_html`, `comment_id`, `created_at`, `created_by_id`, `edited_at`, `id`, `is_hidden`, `is_resolved`, `parent_id`, `release_id`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`releases.comments:write`

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

<CodePanel title="Create a release comment" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/releases/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/comments/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "comment_html": "example",
  "is_resolved": false,
  "parent_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/releases/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/comments/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "comment_html": "example",
        "is_resolved": False,
        "parent_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/releases/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/comments/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment_html: "example",
      is_resolved: false,
      parent_id: "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
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
  "comment_html": "example",
  "comment_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "edited_at": "2026-01-14T09:22:41.478363Z",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "is_hidden": false,
  "is_resolved": false,
  "parent_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "release_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
}
```

</ResponsePanel>

</div>
</div>
