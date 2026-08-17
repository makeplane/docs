---
title: Get a release link
description: Read a release link with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, get a release link, release links, release links retrieve
---

# Get a release link

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/releases/{release_id}/links/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Release links attach external URLs to a release. Read a single release link by id.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="release_id" type="string (uuid)" :required="true">

The release the resource belongs to.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The release link id.

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

`releases.links:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                               |
| ------ | ------------------ | ----------------------------------------------------------------------------------- |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                     |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan or is switched off. |
| `403`  | `forbidden`        | Your role or token scope doesn't allow this.                                        |
| `404`  | `not_found`        | No such resource, or it's outside your tenant.                                      |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                          |

</div>

</div>

<div class="api-right">

<CodePanel title="Get a release link" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/releases/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/links/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/releases/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/links/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/releases/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/links/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/",
  {
    method: "GET",
    headers: {
      "X-Api-Key": "your-api-key",
    },
  },
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

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

<ResponsePanel status="404">

```json
{
  "type": "not_found",
  "code": "not_found",
  "detail": "No release link matches the given query."
}
```

</ResponsePanel>

</div>
</div>
