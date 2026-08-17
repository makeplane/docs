---
title: Get a project summary
description: Get a project summary with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, get a project summary, project summary, projects summary
---

# Get a project summary

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{pk}/summary/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Projects are the main container for work items in a workspace.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="pk" type="string" :required="true">

The project summary id.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

<div class="params-list">

<ApiParam name="counts" type="string" :required="false">

Comma-separated count keys to include. Allowed: members, states, labels, cycles, modules, issues, intakes, work_item_types, work_item_properties, pages. Omitting returns all. Unknown keys are a 400.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects:read`

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

<CodePanel title="Get a project summary" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/summary/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/summary/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/summary/",
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
  "counts": {},
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "identifier": "PROJ",
  "name": "Example name"
}
```

</ResponsePanel>

</div>
</div>
