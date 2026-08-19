---
title: Update a sticky
description: Update a sticky with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, update a sticky, stickies, stickies partial update
---

# Update a sticky

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v2/workspaces/{slug}/stickies/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Stickies are private notes owned by the calling user. Update a sticky. Send only the keys you want to change — omitted keys keep their current value, and an explicit `null` clears a nullable field.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The sticky id.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="background_color" type="string" :required="false">

The background color.

Maximum 255 characters. Nullable.

</ApiParam>

<ApiParam name="color" type="string" :required="false">

Hex color used wherever this is rendered, for example `#3f76ff`.

Maximum 255 characters. Nullable.

</ApiParam>

<ApiParam name="description_html" type="string" :required="false">

Rich-text body as HTML. This is the field the Plane editor round-trips.

</ApiParam>

<ApiParam name="logo_props" type="string" :required="false">

Editor-owned logo descriptor. Pass back what you read rather than composing it by hand.

</ApiParam>

<ApiParam name="name" type="string" :required="false">

Display name.

Nullable.

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

Requestable here: `background_color`, `color`, `created_at`, `created_by_id`, `description_html`, `description_stripped`, `id`, `logo_props`, `name`, `owner_id`, `sort_order`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`stickies:write`

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

<CodePanel title="Update a sticky" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v2/workspaces/my-team/stickies/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "background_color": "example",
  "color": "#3f76ff",
  "description_html": "<p>Details go here.</p>"
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v2/workspaces/my-team/stickies/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "background_color": "example",
        "color": "#3f76ff",
        "description_html": "<p>Details go here.</p>"
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/stickies/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/",
  {
    method: "PATCH",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      background_color: "example",
      color: "#3f76ff",
      description_html: "<p>Details go here.</p>",
    }),
  },
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "background_color": "example",
  "color": "#3f76ff",
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "description_html": "<p>Details go here.</p>",
  "description_stripped": "example",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "logo_props": null,
  "name": "Example name",
  "owner_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "sort_order": 65535
}
```

</ResponsePanel>

<ResponsePanel status="404">

```json
{
  "type": "not_found",
  "code": "not_found",
  "detail": "No sticky matches the given query."
}
```

</ResponsePanel>

</div>
</div>
