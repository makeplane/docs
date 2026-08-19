---
title: Update a release changelog
description: Update a release changelog with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, update a release changelog, release changelog, releases changelog partial update
---

# Update a release changelog

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v2/workspaces/{slug}/releases/{pk}/changelog/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Releases group shipped work and carry a changelog. Update a release changelog. Send only the keys you want to change — omitted keys keep their current value, and an explicit `null` clears a nullable field.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The release changelog id.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="description_html" type="string" :required="false">

Rich-text body as HTML. This is the field the Plane editor round-trips.

</ApiParam>

<ApiParam name="description_json" type="string" :required="false">

The description json.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`releases:write`

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

<CodePanel title="Update a release changelog" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v2/workspaces/my-team/releases/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/changelog/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "description_html": "<p>Details go here.</p>",
  "description_json": null
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v2/workspaces/my-team/releases/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/changelog/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "description_html": "<p>Details go here.</p>",
        "description_json": None
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/releases/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/changelog/",
  {
    method: "PATCH",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description_html: "<p>Details go here.</p>",
      description_json: null,
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
  "changelog_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "description_html": "<p>Details go here.</p>",
  "description_json": null,
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "release_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
}
```

</ResponsePanel>

<ResponsePanel status="404">

```json
{
  "type": "not_found",
  "code": "not_found",
  "detail": "No release changelog matches the given query."
}
```

</ResponsePanel>

</div>
</div>
