---
title: Bulk write work items
description: Bulk write work items with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, bulk write work items, work items, work items bulk
---

# Bulk write work items

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-items/bulk/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Work items are the issues, tasks and epics in a project. Write up to 100 work items in one request, with a per-row result for each.

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

`projects.work_items:write`

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

<CodePanel title="Bulk write work items" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/bulk/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "items": [
    {
      "assignee_ids": [
        [
          "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
        ]
      ],
      "assignees": [
        "ana@example.com"
      ],
      "cycle_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "description_html": "<p>Details go here.</p>",
      "estimate": "example",
      "estimate_point_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "external_id": null,
      "external_source": null,
      "label_ids": [
        [
          "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
        ]
      ],
      "labels": [
        "example"
      ],
      "module_ids": [
        [
          "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
        ]
      ],
      "name": "Example name",
      "parent": "example",
      "parent_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "priority": "high",
      "start_date": "2026-01-12",
      "state": "example",
      "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "target_date": "2026-01-20",
      "type": "example",
      "type_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
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
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/bulk/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "items": [
            {
                "assignee_ids": [
                    [
                        "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
                    ]
                ],
                "assignees": [
                    "ana@example.com"
                ],
                "cycle_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
                "description_html": "<p>Details go here.</p>",
                "estimate": "example",
                "estimate_point_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
                "external_id": None,
                "external_source": None,
                "label_ids": [
                    [
                        "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
                    ]
                ],
                "labels": [
                    "example"
                ],
                "module_ids": [
                    [
                        "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
                    ]
                ],
                "name": "Example name",
                "parent": "example",
                "parent_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
                "priority": "high",
                "start_date": "2026-01-12",
                "state": "example",
                "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
                "target_date": "2026-01-20",
                "type": "example",
                "type_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
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
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/bulk/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          assignee_ids: [["16c61a3a-512a-48ac-b0be-b6b46fe6f430"]],
          assignees: ["ana@example.com"],
          cycle_id: "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
          description_html: "<p>Details go here.</p>",
          estimate: "example",
          estimate_point_id: "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
          external_id: null,
          external_source: null,
          label_ids: [["16c61a3a-512a-48ac-b0be-b6b46fe6f430"]],
          labels: ["example"],
          module_ids: [["16c61a3a-512a-48ac-b0be-b6b46fe6f430"]],
          name: "Example name",
          parent: "example",
          parent_id: "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
          priority: "high",
          start_date: "2026-01-12",
          state: "example",
          state_id: "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
          target_date: "2026-01-20",
          type: "example",
          type_id: "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
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
