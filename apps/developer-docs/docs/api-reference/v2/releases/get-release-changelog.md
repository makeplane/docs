---
title: Get a release changelog
description: Read a release changelog with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, get a release changelog, release changelog, releases changelog retrieve
---

# Get a release changelog

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/releases/{pk}/changelog/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Releases group shipped work and carry a changelog. Read a single release changelog by id.

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

### Scopes

`releases:read`

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

<CodePanel title="Get a release changelog" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/releases/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/changelog/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/releases/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/changelog/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/releases/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/changelog/",
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
