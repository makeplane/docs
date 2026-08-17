---
title: Create a collection
description: Create a collection with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, create a collection, collections, pages create
---

# Create a collection

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/collections/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Collections group wiki pages in a workspace. Create a collection.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="access" type="string" :required="false">

Who can see this.

</ApiParam>

<ApiParam name="is_default" type="boolean" :required="false">

Make this the default for its parent. Setting it clears the flag on the previous default.

</ApiParam>

<ApiParam name="is_global" type="boolean" :required="false">

Whether this lives at the workspace level rather than inside a project.

</ApiParam>

<ApiParam name="logo_props" type="string" :required="false">

Editor-owned logo descriptor. Pass back what you read rather than composing it by hand.

</ApiParam>

<ApiParam name="name" type="string" :required="false">

Display name.

</ApiParam>

<ApiParam name="sort_order" type="number" :required="false">

Manual ordering weight. Lower sorts first.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted**, not returned as `null`. `id` always comes back. Pass `all` for every requestable field. An unknown name is a `400`. See [Sparse fields](/api-reference/v2/sparse-fields).

Requestable here: `access`, `created_at`, `created_by_id`, `id`, `is_default`, `is_global`, `logo_props`, `name`, `owned_by_id`, `page_ids`, `sort_order`.

</ApiParam>

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed: `owned_by`.

Expansion is separate-key — `?expand=state` keeps `state_id` and adds a `state` object next to it. `?fields=` and `?expand=` are independent: naming a relation in `?fields=` is a `400`, and expanded objects survive field filtering. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`wiki.pages:write`

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

<CodePanel title="Create a collection" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/collections/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "access": null,
  "is_default": false,
  "is_global": false
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/collections/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "access": None,
        "is_default": False,
        "is_global": False
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v2/workspaces/my-team/collections/", {
  method: "POST",
  headers: {
    "X-Api-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    access: null,
    is_default: false,
    is_global: false,
  }),
});
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="201">

```json
{
  "access": 0,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "is_default": false,
  "is_global": false,
  "logo_props": null,
  "name": "Example name",
  "owned_by_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "page_ids": [["16c61a3a-512a-48ac-b0be-b6b46fe6f430"]],
  "sort_order": 65535
}
```

</ResponsePanel>

</div>
</div>
