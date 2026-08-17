---
title: Create a work item from a template
description: Create a work item from a template with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, create a work item from a template, work items from template, work items use
---

# Create a work item from a template

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-templates/{pk}/use/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Project work item templates pre-fill new work items in one project.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string" :required="true">

The project the resource belongs to. Accepts the project UUID or its bare identifier, for example `ENG`.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The work item from template id.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="name" type="string" :required="false">

Display name.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="false">

Id of the related project.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted**, not returned as `null`. `id` always comes back. Pass `all` for every requestable field. An unknown name is a `400`. See [Sparse fields](/api-reference/v2/sparse-fields).

Requestable here: `archived_at`, `assignee_ids`, `created_at`, `created_by_id`, `custom_fields`, `cycle_id`, `id`, `identifier`, `is_draft`, `label_ids`, `module_ids`, `name`, `parent_id`, `priority`, `project_id`, `sequence_id`, `start_date`, `state_id`, `target_date`, `type_id`.

</ApiParam>

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed: `assignees`, `cycle`, `labels`, `modules`, `parent`, `state`, `type`.

Expansion is separate-key — `?expand=state` keeps `state_id` and adds a `state` object next to it. `?fields=` and `?expand=` are independent: naming a relation in `?fields=` is a `400`, and expanded objects survive field filtering. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`templates.work_items:write`

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

<CodePanel title="Create a work item from a template" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-templates/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/use/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Example name",
  "project_id": "4af68566-94a4-4eb3-94aa-50dc9427067b"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-templates/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/use/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "name": "Example name",
        "project_id": "4af68566-94a4-4eb3-94aa-50dc9427067b"
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-templates/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/use/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Example name",
      project_id: "4af68566-94a4-4eb3-94aa-50dc9427067b",
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
  "archived_at": null,
  "assignee_ids": [["16c61a3a-512a-48ac-b0be-b6b46fe6f430"]],
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "custom_fields": {},
  "cycle_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "identifier": "PROJ",
  "is_draft": false,
  "label_ids": [["16c61a3a-512a-48ac-b0be-b6b46fe6f430"]],
  "module_ids": [["16c61a3a-512a-48ac-b0be-b6b46fe6f430"]],
  "name": "Example name",
  "parent_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "priority": "high",
  "project_id": "4af68566-94a4-4eb3-94aa-50dc9427067b",
  "sequence_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "start_date": "2026-01-12",
  "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "target_date": "2026-01-20",
  "type_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
}
```

</ResponsePanel>

</div>
</div>
