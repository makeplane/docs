---
title: Create work item dependencies
description: Create a dependency with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, create work item dependencies, dependencies, work item dependencies create
---

# Create work item dependencies

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/dependencies/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Dependencies record blocking and scheduling order between work items. Create a dependency.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string" :required="true">

The project the resource belongs to. Accepts the project UUID or its bare identifier, for example `ENG`.

</ApiParam>

<ApiParam name="work_item_id" type="string" :required="true">

The work item the resource hangs off. Accepts the work item UUID or its `PROJ-123` identifier.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="relation_type" type="string" :required="true">

- `blocked_by` - blocked_by
- `blocking` - blocking
- `start_before` - start_before
- `start_after` - start_after
- `finish_before` - finish_before
- `finish_after` - finish_after

One of `blocked_by`, `blocking`, `start_before`, `start_after`, `finish_before`, `finish_after`.

</ApiParam>

<ApiParam name="work_item_ids" type="array of string (uuid)" :required="true">

Ids of the work items to associate. Replaces the current set.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_items.relations:write`

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

<CodePanel title="Create work item dependencies" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/dependencies/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "relation_type": "blocked_by",
  "work_item_ids": [
    [
      "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
    ]
  ]
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/dependencies/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "relation_type": "blocked_by",
        "work_item_ids": [
            [
                "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
            ]
        ]
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/dependencies/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      relation_type: "blocked_by",
      work_item_ids: [["16c61a3a-512a-48ac-b0be-b6b46fe6f430"]],
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
  "blocked_by": ["f960d3c2-8524-4a41-b8eb-055ce4be2a7f"],
  "blocking": ["f960d3c2-8524-4a41-b8eb-055ce4be2a7f"],
  "finish_after": ["f960d3c2-8524-4a41-b8eb-055ce4be2a7f"],
  "finish_before": ["f960d3c2-8524-4a41-b8eb-055ce4be2a7f"],
  "start_after": ["f960d3c2-8524-4a41-b8eb-055ce4be2a7f"],
  "start_before": ["f960d3c2-8524-4a41-b8eb-055ce4be2a7f"]
}
```

</ResponsePanel>

</div>
</div>
