---
title: List work items across a workspace
description: List workspace work items with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, list work items across a workspace, workspace work items, workspace work items list
---

# List work items across a workspace

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/work-items/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Work items are the issues, tasks and epics in a project. List the workspace work items you can see. Results are scoped to the path and to what your token is allowed to read.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

<div class="params-list">

<ApiParam name="assignee_id" type="string (uuid)" :required="false">

Filter by `assignee_id`.

</ApiParam>

<ApiParam name="assignee_id__in" type="array of string (uuid)" :required="false">

Multiple values may be separated by commas.

</ApiParam>

<ApiParam name="assignee_id__isnull" type="boolean" :required="false">

Filter by `assignee_id__isnull`.

</ApiParam>

<ApiParam name="count" type="boolean" :required="false">

Set to false to skip the total_count COUNT(\*) (omits total_count).

</ApiParam>

<ApiParam name="created_at__gte" type="string (date-time)" :required="false">

Filter by `created_at__gte`.

</ApiParam>

<ApiParam name="created_at__lte" type="string (date-time)" :required="false">

Filter by `created_at__lte`.

</ApiParam>

<ApiParam name="cycle_id" type="string (uuid)" :required="false">

Filter by `cycle_id`.

</ApiParam>

<ApiParam name="cycle_id__in" type="array of string (uuid)" :required="false">

Multiple values may be separated by commas.

</ApiParam>

<ApiParam name="cycle_id__isnull" type="boolean" :required="false">

Filter by `cycle_id__isnull`.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Filter by `external_id`.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

Filter by `external_source`.

</ApiParam>

<ApiParam name="is_draft" type="boolean" :required="false">

Filter by `is_draft`.

</ApiParam>

<ApiParam name="label_id" type="string (uuid)" :required="false">

Filter by `label_id`.

</ApiParam>

<ApiParam name="label_id__in" type="array of string (uuid)" :required="false">

Multiple values may be separated by commas.

</ApiParam>

<ApiParam name="label_id__isnull" type="boolean" :required="false">

Filter by `label_id__isnull`.

</ApiParam>

<ApiParam name="module_id" type="string (uuid)" :required="false">

Filter by `module_id`.

</ApiParam>

<ApiParam name="module_id__in" type="array of string (uuid)" :required="false">

Multiple values may be separated by commas.

</ApiParam>

<ApiParam name="module_id__isnull" type="boolean" :required="false">

Filter by `module_id__isnull`.

</ApiParam>

<ApiParam name="offset" type="integer" :required="false">

Number of rows to skip from the start of the result set.

</ApiParam>

<ApiParam name="order_by" type="string" :required="false">

Field to order the list by. Prefix with '-' for descending (e.g. '-created_at'). Annotation-backed orders sort semantically and ride the default offset page.

</ApiParam>

<ApiParam name="paginate" type="string" :required="false">

Set to 'cursor' to opt into the COUNT-free keyset cursor envelope (use for deep traversal); omit for the default offset envelope with total_count.

One of `cursor`.

</ApiParam>

<ApiParam name="parent_id" type="string (uuid)" :required="false">

Filter by `parent_id`.

</ApiParam>

<ApiParam name="parent_id__in" type="array of string (uuid)" :required="false">

Multiple values may be separated by commas.

</ApiParam>

<ApiParam name="parent_id__isnull" type="boolean" :required="false">

Filter by `parent_id__isnull`.

</ApiParam>

<ApiParam name="per_page" type="integer" :required="false">

Page size (max 200).

</ApiParam>

<ApiParam name="priority" type="string" :required="false">

- `urgent` - Urgent
- `high` - High
- `medium` - Medium
- `low` - Low
- `none` - None

One of `high`, `low`, `medium`, `none`, `urgent`.

</ApiParam>

<ApiParam name="priority__in" type="array of string" :required="false">

Multiple values may be separated by commas.

- `urgent` - Urgent
- `high` - High
- `medium` - Medium
- `low` - Low
- `none` - None

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="false">

Filter by `project_id`.

</ApiParam>

<ApiParam name="project_id__in" type="array of string (uuid)" :required="false">

Multiple values may be separated by commas.

</ApiParam>

<ApiParam name="search" type="string" :required="false">

A search term.

</ApiParam>

<ApiParam name="sequence_id" type="integer" :required="false">

Filter by `sequence_id`.

</ApiParam>

<ApiParam name="start_date__gte" type="string (date)" :required="false">

Filter by `start_date__gte`.

</ApiParam>

<ApiParam name="start_date__lte" type="string (date)" :required="false">

Filter by `start_date__lte`.

</ApiParam>

<ApiParam name="state_group" type="string" :required="false">

- `backlog` - Backlog
- `unstarted` - Unstarted
- `started` - Started
- `completed` - Completed
- `cancelled` - Cancelled
- `triage` - Triage

One of `backlog`, `cancelled`, `completed`, `started`, `triage`, `unstarted`.

</ApiParam>

<ApiParam name="state_group__in" type="array of string" :required="false">

Multiple values may be separated by commas.

- `backlog` - Backlog
- `unstarted` - Unstarted
- `started` - Started
- `completed` - Completed
- `cancelled` - Cancelled
- `triage` - Triage

</ApiParam>

<ApiParam name="state_id" type="string (uuid)" :required="false">

Filter by `state_id`.

</ApiParam>

<ApiParam name="state_id__in" type="array of string (uuid)" :required="false">

Multiple values may be separated by commas.

</ApiParam>

<ApiParam name="target_date__gte" type="string (date)" :required="false">

Filter by `target_date__gte`.

</ApiParam>

<ApiParam name="target_date__lte" type="string (date)" :required="false">

Filter by `target_date__lte`.

</ApiParam>

<ApiParam name="type_id" type="string (uuid)" :required="false">

Filter by `type_id`.

</ApiParam>

<ApiParam name="type_id__in" type="array of string (uuid)" :required="false">

Multiple values may be separated by commas.

</ApiParam>

<ApiParam name="updated_at__gte" type="string (date-time)" :required="false">

Filter by `updated_at__gte`.

</ApiParam>

<ApiParam name="updated_at__lte" type="string (date-time)" :required="false">

Filter by `updated_at__lte`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from each row, not returned as `null`. `id` always comes back. Pass `all` for every requestable field.

An unknown name is a `400` that names the valid set, so a typo can't silently cost you the saving. See [Sparse fields](/api-reference/v2/sparse-fields).

Requestable here: `archived_at`, `assignee_ids`, `created_at`, `created_by_id`, `cycle_id`, `id`, `identifier`, `is_draft`, `label_ids`, `module_ids`, `name`, `parent_id`, `priority`, `project_id`, `sequence_id`, `start_date`, `state_id`, `target_date`, `type_id`.

</ApiParam>

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed: `assignees`, `cycle`, `labels`, `modules`, `parent`, `state`, `type`.

Expansion is separate-key — `?expand=state` keeps `state_id` and adds a `state` object next to it. `?fields=` and `?expand=` are independent: naming a relation in `?fields=` is a `400`, and expanded objects survive field filtering. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_items:read`

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

<CodePanel title="List work items across a workspace" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/work-items/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/work-items/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v2/workspaces/my-team/work-items/", {
  method: "GET",
  headers: {
    "X-Api-Key": "your-api-key",
  },
});
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "data": [
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
  ],
  "next": 1,
  "pagination": {
    "style": "offset"
  },
  "previous": 1,
  "total_count": 3
}
```

</ResponsePanel>

</div>
</div>
