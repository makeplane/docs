---
title: List modules
description: List the modules in a Plane project with the v2 REST API. Filter by status, lead, and external id, search by name, order, paginate, and handle errors.
keywords: plane api v2, list modules, module status filter, lead_id, GET modules, pagination
---

# List modules

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/modules/</span>
</div>

<div class="api-two-column">
<div class="api-left">

List the modules in a project. Use it to build a delivery board, to find the module a sync run created, or to pull
everything a person leads.

Results are paginated and, by default, ordered by `sort_order` — the order modules appear in the Plane UI.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project whose modules you want.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

<div class="params-list">

**Filters**

<ApiParam name="status" type="string" :required="false">

Return only modules in this lifecycle position. One of `backlog`, `planned`, `in-progress`, `paused`, `completed`, or
`cancelled`.

Use `status__in` with a comma-separated list to match several at once, for example
`?status__in=planned,in-progress`.

</ApiParam>

<ApiParam name="lead_id" type="string (uuid)" :required="false">

Return only modules led by this user. Match is exact on the module's `lead_id`.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Return only modules carrying this external identifier. Pair it with `external_source` to resolve a record you imported
from another system.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

Return only modules that came from this system, for example `github` or `jira`.

</ApiParam>

**Search**

<ApiParam name="search" type="string" :required="false">

Free-text match on the module name.

</ApiParam>

**Ordering**

<ApiParam name="order_by" type="string" :required="false">

Field to sort by. Prefix with `-` for descending.

- `sort_order` , `-sort_order`
- `created_at` , `-created_at`
- `id` , `-id`

Defaults to `sort_order`.

</ApiParam>

**Pagination**

<ApiParam name="per_page" type="integer" :required="false">

Page size. Defaults to 50, maximum 200.

</ApiParam>

<ApiParam name="offset" type="integer" :required="false">

Number of rows to skip from the start of the result set. Maximum 10000 — go deeper with cursor pagination.

</ApiParam>

<ApiParam name="paginate" type="string" :required="false">

Set to `cursor` to opt into the COUNT-free keyset envelope, then follow `next_cursor` with `?cursor=`.

</ApiParam>

<ApiParam name="count" type="boolean" :required="false">

Set to `false` to skip the count query and omit `total_count` from the offset envelope. Defaults to `true`.

</ApiParam>

</div>
</div>

::: warning Cursor needs an explicit order_by
The default `sort_order` is not unique, so it can't back a stable keyset. A bare `?paginate=cursor` returns
`400 ordering_not_cursor_eligible`. Pair it with a cursor-eligible ordering — `?paginate=cursor&order_by=created_at`
— or stay on offset.
:::

::: info Enum filters are validated
`status` and `status__in` are checked against the allowed values. A typo like `?status=in_progress` is a clean
`400 invalid_request`, not an empty result set.
:::

Modules do not support `?expand=` — `lead_id` and `member_ids` are always returned as ids.

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return on each row. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `archived_at`, `created_at`, `created_by_id`, `description`, `external_id`, `external_source`, `id`, `lead_id`, `logo_props`, `member_ids`, `name`, `sort_order`, `start_date`, `status`, `target_date`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed alongside the ids: `lead` (the module lead), `members` (the module members).

Expansion is separate-key: `?expand=state` keeps `state_id` and adds a `state` object next to it, so an id is never replaced by an object. An unknown value is a `400`.

`?fields=` and `?expand=` are independent namespaces. Relation names are not valid `?fields=` tokens (and vice versa), and an expanded object survives field filtering — `?fields=id,name&expand=state` returns `id`, `name` and `state`. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.modules:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read modules in this project.                         |
| `404`  | `not_found`        | No such workspace or project, or it's outside your tenant.                           |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Wait for the interval in `Retry-After` and retry.                         |

</div>

</div>

<div class="api-right">

<CodePanel title="List modules" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/modules/?status=in-progress&per_page=50" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/modules/",
    headers={"X-Api-Key": "your-api-key"},
    params={"status": "in-progress", "per_page": 50},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const params = new URLSearchParams({ status: "in-progress", per_page: "50" });
const response = await fetch(
  `https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/modules/?${params}`,
  {
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
  "data": [
    {
      "id": "7c1f3d90-2a64-4e58-9b0d-3fa1c7e28b45",
      "name": "Billing revamp",
      "description": "Rework subscription billing end to end.",
      "status": "in-progress",
      "start_date": "2026-01-05",
      "target_date": "2026-02-27",
      "lead_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
      "member_ids": [
        "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
        "9d3e1f27-8b4c-4a06-95f1-2c7ea45b0d18"
      ],
      "sort_order": 65535.0,
      "logo_props": {},
      "external_id": null,
      "external_source": null,
      "archived_at": null,
      "created_at": "2026-01-14T09:22:41.478363Z",
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
    },
    {
      "id": "3ea77b18-5c9d-4f02-8a61-b0d4c9e5137a",
      "name": "Search relevance",
      "description": "",
      "status": "in-progress",
      "start_date": null,
      "target_date": null,
      "lead_id": null,
      "member_ids": [],
      "sort_order": 98302.5,
      "logo_props": {},
      "external_id": null,
      "external_source": null,
      "archived_at": null,
      "created_at": "2026-01-19T14:03:07.201884Z",
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
    }
  ],
  "next": null,
  "previous": null,
  "total_count": 2,
  "pagination": { "style": "offset" }
}
```

</ResponsePanel>

<ResponsePanel status="200" title="CURSOR ENVELOPE (?paginate=cursor&amp;order_by=created_at)">

```json
{
  "data": [
    {
      "id": "7c1f3d90-2a64-4e58-9b0d-3fa1c7e28b45",
      "name": "Billing revamp",
      "description": "Rework subscription billing end to end.",
      "status": "in-progress",
      "start_date": "2026-01-05",
      "target_date": "2026-02-27",
      "lead_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
      "member_ids": [
        "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
        "9d3e1f27-8b4c-4a06-95f1-2c7ea45b0d18"
      ],
      "sort_order": 65535.0,
      "logo_props": {},
      "external_id": null,
      "external_source": null,
      "archived_at": null,
      "created_at": "2026-01-14T09:22:41.478363Z",
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
    }
  ],
  "next_cursor": "b3A9MTcx",
  "has_more": true,
  "pagination": { "style": "cursor" }
}
```

</ResponsePanel>

</div>
</div>
