---
title: Bulk write states
description: Bulk write states with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, bulk write states, states, states bulk
---

# Bulk write states

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/states/bulk/</span>
</div>

<div class="api-two-column">
<div class="api-left">

States are the workflow steps a work item moves through. Write up to 100 states in one request, with a per-row result for each.

- Send `{"items": [...]}`, at most 100 per request. Add `"upsert": true` to match existing rows on `(external_source, external_id)` instead of always creating.
- The response is always `200`. Each row reports its own outcome, so a partial failure is reported rather than silently dropped — read `succeeded`/`failed` and the per-row `status`.
- Rows are written on independent savepoints: a failing row rolls back only itself.
- `?fields=` does not apply here — the bulk response is a per-row result envelope, not a resource body.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string" :required="true">

The project the resource belongs to. Accepts the project UUID or its bare identifier, for example `ENG`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="items" type="array of object" :required="true">

The items.

</ApiParam>

<ApiParam name="upsert" type="boolean" :required="false">

Reconcile each row on (external_source, external_id) instead of creating it.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.states:write`

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

<CodePanel title="Bulk write states" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/states/bulk/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "items": [
    {
      "color": "#3f76ff",
      "description": "What this is for.",
      "external_id": null,
      "external_source": null,
      "group": "started",
      "is_default": false,
      "name": "Example name",
      "sequence": 65535
    }
  ],
  "upsert": false
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/states/bulk/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "items": [
            {
                "color": "#3f76ff",
                "description": "What this is for.",
                "external_id": None,
                "external_source": None,
                "group": "started",
                "is_default": False,
                "name": "Example name",
                "sequence": 65535
            }
        ],
        "upsert": False
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/states/bulk/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          color: "#3f76ff",
          description: "What this is for.",
          external_id: null,
          external_source: null,
          group: "started",
          is_default: false,
          name: "Example name",
          sequence: 65535,
        },
      ],
      upsert: false,
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
  "failed": 1,
  "results": [null],
  "succeeded": 1
}
```

</ResponsePanel>

</div>
</div>
