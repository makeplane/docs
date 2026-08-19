---
title: Link or unlink customer work items
description: Link or unlink customer work items with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, link or unlink customer work items, customer work items, customers work items
---

# Link or unlink customer work items

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/customers/{pk}/work-items/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Customers are the workspace CRM records you attach requests and work items to.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The customer work item id.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="add" type="array of string (uuid)" :required="false">

The add.

</ApiParam>

<ApiParam name="remove" type="array of string (uuid)" :required="false">

The remove.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`customers:write`

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

<CodePanel title="Link or unlink customer work items" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/customers/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/work-items/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "add": [
    "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
  ],
  "remove": [
    "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
  ]
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/customers/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/work-items/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "add": [
            "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
        ],
        "remove": [
            "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
        ]
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/customers/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/work-items/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      add: ["f960d3c2-8524-4a41-b8eb-055ce4be2a7f"],
      remove: ["f960d3c2-8524-4a41-b8eb-055ce4be2a7f"],
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
  "added": ["f960d3c2-8524-4a41-b8eb-055ce4be2a7f"],
  "removed": ["f960d3c2-8524-4a41-b8eb-055ce4be2a7f"]
}
```

</ResponsePanel>

</div>
</div>
