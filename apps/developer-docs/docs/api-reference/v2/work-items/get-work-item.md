---
title: Get a work item
description: Retrieve a single work item by UUID with the Plane v2 REST API. Path parameters, expandable relations, custom fields, OAuth scopes, error codes, and code examples.
keywords: plane api v2, get work item, retrieve work item, work item by id, expand state assignees, custom fields
---

# Get a work item

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve one work item by its UUID. This is the endpoint to use after a list call, or any time you already hold the
work item's `id`.

Unlike the list endpoint, this response populates `custom_fields` — the work item type's custom property values, keyed
by property name. If you only have a `PROJ-142`-style key and not the project UUID, use
[Get a work item by identifier](/api-reference/v2/work-items/get-work-item-by-identifier) instead.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the work item belongs to.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The work item's UUID. This lookup is UUID-only — a `PROJ-142` identifier here returns `404`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

<div class="params-list">

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed alongside the ids: `assignees` (the assigned users), `cycle` (the cycle it belongs to), `labels` (the applied labels), `modules` (the modules it belongs to), `parent` (its parent work item), `state` (the work item's state object), `type` (its work item type).

Expansion is separate-key: `?expand=state` keeps `state_id` and adds a `state` object next to it, so an id is never replaced by an object. An unknown value is a `400`.

`?fields=` and `?expand=` are independent namespaces. Relation names are not valid `?fields=` tokens (and vice versa), and an expanded object survives field filtering — `?fields=id,name&expand=state` returns `id`, `name` and `state`. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

::: warning Archived work items are not returned
An archived work item sits outside the default query set, so a read of one returns `404` — the same response as a work
item that never existed. [Unarchive](/api-reference/v2/work-items/unarchive-work-item) it first if you need to read it
again. See [Archive a work item](/api-reference/v2/work-items/archive-work-item).
:::

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `archived_at`, `assignee_ids`, `created_at`, `created_by_id`, `custom_fields`, `cycle_id`, `id`, `identifier`, `is_draft`, `label_ids`, `module_ids`, `name`, `parent_id`, `priority`, `project_id`, `sequence_id`, `start_date`, `state_id`, `target_date`, `type_id`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_items:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read work items in this project.                      |
| `404`  | `not_found`        | No such work item, it belongs to another project or tenant, or it's archived.        |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="Get a work item" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b"
    "/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b" +
    "/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/",
  {
    method: "GET",
    headers: { "X-Api-Key": "your-api-key" },
  },
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "id": "8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13",
  "name": "Fix login redirect loop",
  "identifier": "PROJ-142",
  "sequence_id": 142,
  "priority": "high",
  "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "type_id": "2d9d1a97-5c6f-4a1e-9d5b-8c2f7e30b6a4",
  "assignee_ids": ["16c61a3a-512a-48ac-b0be-b6b46fe6f430"],
  "label_ids": ["c1b8f3d6-9a44-4e12-8f7a-2b6d5c9e1a03"],
  "parent_id": null,
  "start_date": "2026-01-12",
  "target_date": "2026-01-20",
  "is_draft": false,
  "archived_at": null,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "custom_fields": {
    "severity": {
      "id": "b52e7c18-4d3f-4a90-8e61-0f7a3c9d2b45",
      "value": "Sev-1",
      "value_detail": {
        "id": "7c0a5f39-2e84-4b17-9a6c-1d8e4f2b60c9",
        "name": "Sev-1",
        "logo_props": {}
      }
    }
  }
}
```

</ResponsePanel>

<ResponsePanel status="200" title="WITH ?EXPAND=STATE,ASSIGNEES">

```json
{
  "id": "8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13",
  "name": "Fix login redirect loop",
  "identifier": "PROJ-142",
  "sequence_id": 142,
  "priority": "high",
  "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "type_id": "2d9d1a97-5c6f-4a1e-9d5b-8c2f7e30b6a4",
  "assignee_ids": ["16c61a3a-512a-48ac-b0be-b6b46fe6f430"],
  "label_ids": ["c1b8f3d6-9a44-4e12-8f7a-2b6d5c9e1a03"],
  "parent_id": null,
  "start_date": "2026-01-12",
  "target_date": "2026-01-20",
  "is_draft": false,
  "archived_at": null,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "custom_fields": {},
  "state": {
    "id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
    "name": "In Progress",
    "color": "#3f76ff",
    "group": "started"
  },
  "assignees": [
    {
      "id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
      "display_name": "ana",
      "avatar_url": "https://assets.plane.so/avatars/ana.png",
      "email": "ana@example.com"
    }
  ]
}
```

</ResponsePanel>

</div>
</div>

## What you get here that a list doesn't give you

- **`custom_fields`** — the work item type's custom property values. The list endpoint returns `null` for this field on
  every row to avoid resolving properties per row; only single-item reads populate it.
- **Cheaper expansion** — `?expand=` works on both, but expanding one work item is a fixed cost while expanding a full
  page multiplies it.

Everything else — the field set, the sparse `*_id` shape — is identical to a row from
[List work items](/api-reference/v2/work-items/list-work-items).
