---
title: List work items
description: List work items in a Plane project with the v2 REST API. Filters, search, ordering, offset and cursor pagination, expandable relations, OAuth scopes, and code examples.
keywords: plane api v2, list work items, filter work items, work item pagination, order_by, state_group, priority filter, cursor pagination
---

# List work items

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-items/</span>
</div>

<div class="api-two-column">
<div class="api-left">

List the work items in a project. This is the endpoint you build reports, syncs, and board views on: it takes a wide
set of filters, orders by stored columns or by meaning, and paginates by offset or by cursor.

Results are always scoped to the project in the path and to what your token is allowed to see. Filters can only narrow
that set — they never widen it.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project to list work items from.

</ApiParam>

</div>
</div>

<div class="params-section">

### Filters

Every filter is optional, and filters combine with AND. Each concept below has a base parameter plus the `__in` and
`__isnull` variants noted in its description.

<div class="params-list">

<ApiParam name="state_id" type="string (uuid)" :required="false">

Match work items in a specific state. Use `state_id__in` with a comma-separated list to match any of several states.

</ApiParam>

<ApiParam name="state_group" type="string" :required="false">

Match by the state's workflow group instead of a specific state — stable across projects that name their states
differently. One of `backlog`, `unstarted`, `started`, `completed`, `cancelled`, `triage`.

Use `state_group__in` for several groups, for example `?state_group__in=started,completed`.

</ApiParam>

<ApiParam name="priority" type="string" :required="false">

One of `urgent`, `high`, `medium`, `low`, `none`. Use `priority__in` for several, for example
`?priority__in=urgent,high`.

</ApiParam>

<ApiParam name="assignee_id" type="string (uuid)" :required="false">

Match work items assigned to a user. `assignee_id__in` matches any of several users; `assignee_id__isnull=true`
returns only unassigned work items.

</ApiParam>

<ApiParam name="label_id" type="string (uuid)" :required="false">

Match work items carrying a label. `label_id__in` matches any of several labels; `label_id__isnull=true` returns only
unlabeled work items.

</ApiParam>

<ApiParam name="type_id" type="string (uuid)" :required="false">

Match work items of a given work item type. `type_id__in` accepts a comma-separated list.

</ApiParam>

<ApiParam name="parent_id" type="string (uuid)" :required="false">

Match the children of a work item. `parent_id__in` accepts several parents; `parent_id__isnull=true` returns only
top-level work items.

</ApiParam>

<ApiParam name="cycle_id" type="string (uuid)" :required="false">

Match work items in a cycle. `cycle_id__in` accepts several cycles; `cycle_id__isnull=true` returns the backlog of
work items in no cycle at all.

</ApiParam>

<ApiParam name="module_id" type="string (uuid)" :required="false">

Match work items in a module. `module_id__in` accepts several modules; `module_id__isnull=true` returns work items in
no module.

</ApiParam>

<ApiParam name="sequence_id" type="integer" :required="false">

Match the single work item with this number within the project — the `142` of `PROJ-142`.

</ApiParam>

<ApiParam name="is_draft" type="boolean" :required="false">

Filter drafts in or out. Drafts are work items still being composed in the Plane app.

</ApiParam>

<ApiParam name="external_id, external_source" type="string" :required="false">

Correlation filters for sync and import. `external_source` is the system a record came from and `external_id` is its
key there, so the pair is how you find the Plane work item that mirrors a row in your own database.

These values are not returned on reads — the lookup is one-way.

</ApiParam>

<ApiParam name="created_at__gte, created_at__lte" type="string (date-time)" :required="false">

Bound the creation timestamp. Pass an ISO 8601 datetime, for example `2026-01-01T00:00:00Z`. Use both for a window.

</ApiParam>

<ApiParam name="updated_at__gte, updated_at__lte" type="string (date-time)" :required="false">

Bound the last-modified timestamp. This is the pair to use for incremental sync — poll with
`?updated_at__gte=<your last run>&order_by=updated_at`.

`updated_at` is filterable and orderable but is not part of the read shape, so it does not come back in the response
body.

</ApiParam>

<ApiParam name="start_date__gte, start_date__lte" type="string (date)" :required="false">

Bound the planned start date, for example `2026-01-01`.

</ApiParam>

<ApiParam name="target_date__gte, target_date__lte" type="string (date)" :required="false">

Bound the planned due date. `?target_date__lte=2026-01-31&state_group__in=backlog,unstarted,started` is the "what is
about to slip" query.

</ApiParam>

</div>
</div>

<div class="params-section">

### Search and ordering

<div class="params-list">

<ApiParam name="search" type="string" :required="false">

Free-text search over the work item name.

</ApiParam>

<ApiParam name="order_by" type="string" :required="false">

Field to sort by. Prefix with `-` for descending. Defaults to `-created_at`.

- `created_at`, `-created_at`
- `updated_at`, `-updated_at`
- `sequence_id`, `-sequence_id`
- `id`, `-id`
- `sort_order`, `-sort_order` — the manual board ordering
- `priority`, `-priority` — semantic: `urgent` → `high` → `medium` → `low` → `none`, not alphabetical
- `state_group`, `-state_group` — semantic: workflow order, not alphabetical

`priority` and `state_group` sort by meaning, which is what you want for a board but is not cursor-eligible. Pair
either with `?paginate=cursor` and you get `400 ordering_not_cursor_eligible`; use the default offset pages instead.

</ApiParam>

</div>
</div>

<div class="params-section">

### Pagination

Offset is the default. Cursor is opt-in per request.

<div class="params-list">

<ApiParam name="per_page" type="integer" :required="false">

Page size. Defaults to 50, maximum 200.

</ApiParam>

<ApiParam name="offset" type="integer" :required="false">

Rows to skip from the start of the result set. Maximum 10000 — past that, switch to cursor pagination.

</ApiParam>

<ApiParam name="count" type="boolean" :required="false">

Defaults to `true`. Pass `?count=false` to skip the `COUNT(*)` and omit `total_count` from the envelope. Worth doing on
large projects when you only need the rows.

</ApiParam>

<ApiParam name="paginate" type="string" :required="false">

Set to `cursor` to opt into keyset pagination. The envelope changes to `next_cursor` / `has_more` and drops
`total_count`. Use it for deep or long-running traversals where offset pages would drift as rows are inserted. Follow
the returned `next_cursor` as described in [Pagination](/api-reference/v2/pagination).

</ApiParam>

</div>
</div>

<div class="params-section">

### Expansion

<div class="params-list">

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed alongside the ids: `assignees` (the assigned users), `cycle` (the cycle it belongs to), `labels` (the applied labels), `modules` (the modules it belongs to), `parent` (its parent work item), `state` (the work item's state object), `type` (its work item type).

Expansion is separate-key: `?expand=state` keeps `state_id` and adds a `state` object next to it, so an id is never replaced by an object. An unknown value is a `400`.

`?fields=` and `?expand=` are independent namespaces. Relation names are not valid `?fields=` tokens (and vice versa), and an expanded object survives field filtering — `?fields=id,name&expand=state` returns `id`, `name` and `state`. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

::: warning Bad filter values fail loudly, bad `order_by` does not
The enum-backed _filters_ (`priority`, `priority__in`, `state_group`, `state_group__in`) are validated against their
allowed values. A typo returns `400 invalid_request` naming the parameter — it does not silently return an empty page.
Treat an empty `data` array as a genuine "no matches".

`order_by` and `paginate` are the exception: neither is validated. An unrecognized `order_by` silently falls back to the
default ordering, and anything other than `paginate=cursor` silently uses offset pagination — so check your spelling
there, because a typo shows up as an unexpected sort order or envelope rather than an error.
:::

::: info Archived work items are excluded
The list returns active work items only — anything with `archived_at` set is filtered out, so archiving a work item
takes it off every page of this list. See [Archive a work item](/api-reference/v2/work-items/archive-work-item).
:::

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return on each row. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `archived_at`, `assignee_ids`, `created_at`, `created_by_id`, `cycle_id`, `id`, `identifier`, `is_draft`, `label_ids`, `module_ids`, `name`, `parent_id`, `priority`, `project_id`, `sequence_id`, `start_date`, `state_id`, `target_date`, `type_id`.

Naming `custom_fields` here is a `400` — it is only available on single-object responses.

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
| `404`  | `not_found`        | No such workspace or project, or it's outside your tenant.                           |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="List work items" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/?state_group__in=started,unstarted&priority=high&per_page=50&order_by=-created_at" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/",
    headers={"X-Api-Key": "your-api-key"},
    params={
        "state_group__in": "started,unstarted",
        "priority": "high",
        "per_page": 50,
        "order_by": "-created_at",
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const params = new URLSearchParams({
  state_group__in: "started,unstarted",
  priority: "high",
  per_page: "50",
  order_by: "-created_at",
});

const response = await fetch(
  `https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/?${params}`,
  {
    method: "GET",
    headers: { "X-Api-Key": "your-api-key" },
  },
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200" title="OFFSET PAGE (DEFAULT)">

```json
{
  "data": [
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
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
    },
    {
      "id": "3b7d9e40-1c62-4a85-b0f3-9d5c2e6a8471",
      "name": "Rate limit the invite endpoint",
      "identifier": "PROJ-141",
      "sequence_id": 141,
      "priority": "high",
      "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "type_id": null,
      "assignee_ids": [],
      "label_ids": [],
      "parent_id": "a7e51d24-3b98-4c6d-9f10-7d2c8e4b5a61",
      "start_date": null,
      "target_date": null,
      "is_draft": false,
      "archived_at": null,
      "created_at": "2026-01-13T16:04:02.911204Z",
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
    }
  ],
  "next": 50,
  "previous": null,
  "total_count": 327,
  "pagination": { "style": "offset" }
}
```

</ResponsePanel>

<ResponsePanel status="200" title="CURSOR PAGE (?PAGINATE=CURSOR)">

```json
{
  "data": [
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
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
    }
  ],
  "next_cursor": "b3A9MTcxJmxpbWl0PTUw",
  "has_more": true,
  "pagination": { "style": "cursor" }
}
```

</ResponsePanel>

</div>
</div>

## Why `custom_fields` is absent here

Custom property values are resolved per work item, and doing that for a full page would mean an extra lookup pass for
every row. So `custom_fields` is **detail-only**: the key is simply not present on list rows.

Absent, not `null`. A `null` would be ambiguous — it can't distinguish "this work item has no property values" from
"this endpoint didn't look". Omitting the key says the second thing honestly. Asking for it anyway is a `400` rather
than a silent empty answer:

```json
{
  "type": "invalid_request",
  "code": "invalid_request",
  "detail": "One or more fields failed validation.",
  "errors": [
    {
      "field": "fields",
      "code": "invalid",
      "message": "custom_fields is not available on collection responses; retrieve the work item."
    }
  ]
}
```

To read custom property values, fetch the work item on its own:
[Get a work item](/api-reference/v2/work-items/get-work-item) or
[Get by identifier](/api-reference/v2/work-items/get-work-item-by-identifier). Both populate `custom_fields`, as do
create, update, upsert and the archive verbs — every single-object response.

## Paging through everything

Branch your client on `pagination.style` rather than guessing from the keys present.

- **Offset** — follow the integer in `next` until it is `null`. Fine for the first few thousand rows; `offset` caps at 10000.
- **Cursor** — send `?paginate=cursor`, then follow `next_cursor` while `has_more` is `true`. There is no
  `total_count`, and rows inserted mid-traversal won't shift your position.

Full details in [Pagination](/api-reference/v2/pagination).
