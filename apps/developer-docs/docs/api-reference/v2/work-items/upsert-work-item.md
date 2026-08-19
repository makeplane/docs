---
title: Upsert a work item
description: Upsert a work item with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, upsert a work item, work items, work items upsert
---

# Upsert a work item

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-items/upsert/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Work items are the issues, tasks and epics in a project. Create a work item, or update the existing one that carries the same `(external_source, external_id)` pair.

- Both `external_source` and `external_id` are required — without them there is nothing to match on and the request is a `400`.
- A created record answers `201` with `X-Plane-Upsert: created`; an updated one answers `200` with `X-Plane-Upsert: updated`. Branch on the header rather than guessing from the status.
- Upsert is safe for **sequential** importers. Two simultaneous upserts of the same key can each miss and each create, so serialize your writes per key.

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

<ApiParam name="name" type="string" :required="true">

Display name.

Maximum 255 characters.

</ApiParam>

<ApiParam name="assignee_ids" type="array of string (uuid)" :required="false">

Ids of the assignees to associate. Replaces the current set.

</ApiParam>

<ApiParam name="assignees" type="array of string (email)" :required="false">

The assignees.

</ApiParam>

<ApiParam name="cycle_id" type="string (uuid)" :required="false">

Id of the related cycle.

Nullable.

</ApiParam>

<ApiParam name="description_html" type="string" :required="false">

Rich-text body as HTML. This is the field the Plane editor round-trips.

Nullable.

</ApiParam>

<ApiParam name="estimate" type="string" :required="false">

The estimate.

Nullable.

</ApiParam>

<ApiParam name="estimate_point_id" type="string (uuid)" :required="false">

Id of the related estimate point.

Nullable.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this record, for sync and import correlation.

Maximum 255 characters. Nullable.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `github` or `jira`.

Maximum 255 characters. Nullable.

</ApiParam>

<ApiParam name="label_ids" type="array of string (uuid)" :required="false">

Ids of the labels to associate. Replaces the current set.

</ApiParam>

<ApiParam name="labels" type="array of string" :required="false">

The labels.

</ApiParam>

<ApiParam name="module_ids" type="array of string (uuid)" :required="false">

Ids of the modules to associate. Replaces the current set.

</ApiParam>

<ApiParam name="parent" type="string" :required="false">

The parent.

Nullable.

</ApiParam>

<ApiParam name="parent_id" type="string (uuid)" :required="false">

Id of the related parent.

Nullable.

</ApiParam>

<ApiParam name="priority" type="string" :required="false">

- `none` - None
- `low` - Low
- `medium` - Medium
- `high` - High
- `urgent` - Urgent

One of `none`, `low`, `medium`, `high`, `urgent`.

</ApiParam>

<ApiParam name="start_date" type="string (date)" :required="false">

Planned start date, as `YYYY-MM-DD`.

Nullable.

</ApiParam>

<ApiParam name="state" type="string" :required="false">

The state.

Nullable.

</ApiParam>

<ApiParam name="state_id" type="string (uuid)" :required="false">

Id of the related state.

Nullable.

</ApiParam>

<ApiParam name="target_date" type="string (date)" :required="false">

Planned due date, as `YYYY-MM-DD`.

Nullable.

</ApiParam>

<ApiParam name="type" type="string" :required="false">

The type.

Nullable.

</ApiParam>

<ApiParam name="type_id" type="string (uuid)" :required="false">

Id of the related type.

Nullable.

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

<CodePanel title="Upsert a work item" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/upsert/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Example name",
  "assignee_ids": [
    [
      "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
    ]
  ],
  "assignees": [
    "ana@example.com"
  ],
  "cycle_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/upsert/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "name": "Example name",
        "assignee_ids": [
            [
                "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
            ]
        ],
        "assignees": [
            "ana@example.com"
        ],
        "cycle_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/upsert/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Example name",
      assignee_ids: [["16c61a3a-512a-48ac-b0be-b6b46fe6f430"]],
      assignees: ["ana@example.com"],
      cycle_id: "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
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
