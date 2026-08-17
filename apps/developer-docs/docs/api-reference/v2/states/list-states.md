---
title: List states
description: List the workflow states in a Plane project with the v2 REST API. Filters, search, ordering, pagination, OAuth scopes, error codes, and code examples.
keywords: plane api v2, list states, workflow states, state group filter, pagination, GET states
---

# List states

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/states/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Return the states in a project as a paginated list. This is how you resolve a state name to the `state_id` you need when creating or moving a work item, and how you build a state picker that stays in sync with the project's workflow.

Results are scoped to a single project — states are never shared across projects, so there is no workspace-wide state list.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project whose states you want to list.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

Filters combine with `AND`. The enum-backed _filters_ `group` and `group__in` are validated: an unrecognized value is rejected with a `400 invalid_request` instead of quietly returning an empty list, so a typo surfaces immediately rather than looking like "no results". `order_by` and `paginate` are not validated — an unrecognized `order_by` silently falls back to the default ordering and anything other than `paginate=cursor` silently uses offset pagination, so check your spelling there.

<div class="params-list">

<ApiParam name="group" type="string" :required="false">

Return only states in this workflow group. One of `backlog`, `unstarted`, `started`, `completed`, `cancelled`, or `triage`.

Use the `group__in` variant to match several groups at once, passing them comma-separated — `?group__in=started,completed`. Filtering by group is the portable way to ask "what counts as in progress here", because every project names its states differently but the groups are fixed.

</ApiParam>

<ApiParam name="is_default" type="boolean" :required="false">

Return only the project's default state (`true`) or only the non-default states (`false`). Pairing `?is_default=true` with `?per_page=1` is the cheapest way to find where new work items will land.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Return states whose `external_id` matches exactly. Use it to find the state you previously created for a record in another system.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

Return states that came from a particular system, for example `github` or `jira`. Combine it with `external_id` — an `external_id` is only unique within its source.

</ApiParam>

<ApiParam name="search" type="string" :required="false">

A search term matched against the state name.

</ApiParam>

</div>
</div>

<div class="params-section">

### Ordering

<div class="params-list">

<ApiParam name="order_by" type="string" :required="false">

Field to sort by. Prefix with `-` for descending.

- `sequence` , `-sequence` — the project's own workflow order
- `created_at` , `-created_at` — when each state was added
- `id` , `-id`

Order by `sequence` when you are rendering the workflow to a user; it is the order the project itself uses.

</ApiParam>

</div>
</div>

<div class="params-section">

### Pagination

<div class="params-list">

<ApiParam name="per_page" type="integer" :required="false">

Page size. Defaults to 50, maximum 200. Most projects have fewer than 20 states, so one page is usually the whole workflow.

</ApiParam>

<ApiParam name="offset" type="integer" :required="false">

Number of rows to skip from the start of the result set. Maximum 10000. Read the `next` value from the response rather than computing offsets yourself.

</ApiParam>

<ApiParam name="paginate" type="string" :required="false">

Set to `cursor` to opt into the COUNT-free keyset envelope, which returns `next_cursor` and `has_more` instead of `next` and `total_count`. Omit it for the default offset envelope.

</ApiParam>

<ApiParam name="count" type="boolean" :required="false">

Defaults to `true`. Set to `false` to skip the `COUNT(*)` behind `total_count`; the field is then omitted from the response.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return on each row. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `color`, `created_at`, `created_by_id`, `description`, `external_id`, `external_source`, `group`, `id`, `is_default`, `is_triage`, `name`, `sequence`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.states:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read this project's states.                           |
| `404`  | `not_found`        | No such workspace or project, or it's outside your tenant.                           |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="List states" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/states/?order_by=sequence&per_page=50" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/states/",
    headers={"X-Api-Key": "your-api-key"},
    params={"order_by": "sequence", "per_page": 50},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const params = new URLSearchParams({ order_by: "sequence", per_page: "50" });
const response = await fetch(
  `https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/states/?${params}`,
  {
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
  "data": [
    {
      "id": "2c4d16f8-9b3e-4a52-8d71-1f0e6c9a5b48",
      "name": "Backlog",
      "description": "Not yet scheduled",
      "color": "#8b8d98",
      "group": "backlog",
      "sequence": 15000,
      "is_default": true,
      "is_triage": false,
      "external_id": null,
      "external_source": null,
      "created_at": "2026-01-14T09:22:41.478363Z",
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
    },
    {
      "id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "name": "In Progress",
      "description": "Actively being worked on",
      "color": "#3f76ff",
      "group": "started",
      "sequence": 25000,
      "is_default": false,
      "is_triage": false,
      "external_id": null,
      "external_source": null,
      "created_at": "2026-01-14T09:22:41.512907Z",
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
    },
    {
      "id": "7b1e9d40-3c86-4f2a-9a5d-8e2b0c47d613",
      "name": "Done",
      "description": "Shipped",
      "color": "#26a05f",
      "group": "completed",
      "sequence": 35000,
      "is_default": false,
      "is_triage": false,
      "external_id": null,
      "external_source": null,
      "created_at": "2026-01-14T09:22:41.548221Z",
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
    }
  ],
  "next": null,
  "previous": null,
  "total_count": 3,
  "pagination": {
    "style": "offset"
  }
}
```

</ResponsePanel>

<ResponsePanel status="200" title="CURSOR ENVELOPE (?paginate=cursor)">

```json
{
  "data": [
    {
      "id": "2c4d16f8-9b3e-4a52-8d71-1f0e6c9a5b48",
      "name": "Backlog",
      "description": "Not yet scheduled",
      "color": "#8b8d98",
      "group": "backlog",
      "sequence": 15000,
      "is_default": true,
      "is_triage": false,
      "external_id": null,
      "external_source": null,
      "created_at": "2026-01-14T09:22:41.478363Z",
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
    }
  ],
  "next_cursor": "b3A9MTcx",
  "has_more": true,
  "pagination": {
    "style": "cursor"
  }
}
```

</ResponsePanel>

</div>
</div>

::: tip Read the group, not the name
A project can rename `In Progress` to `Building` at any time, and reporting keeps working because boards and burndowns read `group`. Write integrations the same way: match on `group`, and treat `name` as a label for humans.
:::
