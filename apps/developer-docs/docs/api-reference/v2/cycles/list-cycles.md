---
title: List cycles
description: List the cycles in a Plane project with the v2 REST API. Filters, search, ordering, pagination, OAuth scopes, error codes, and code examples.
keywords: plane api v2, list cycles, cycles pagination, owned_by_id filter, order_by sort_order, GET cycles
---

# List cycles

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/cycles/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Return the cycles in a project as a paginated page. Use it to build a sprint picker, to find the cycle covering a date range, or to reconcile cycles you imported from another tracker.

Filters combine with `AND` — `?owned_by_id=…&search=sprint` returns only cycles that match both.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project whose cycles you want.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

**Filters**

<div class="params-list">

<ApiParam name="owned_by_id" type="string (uuid)" :required="false">

Return only cycles owned by this user. This is how you build a "my cycles" view — pass the authenticated user's id. Ownership is assigned by Plane, so this is a read-side filter only.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Return only cycles whose `external_id` matches exactly. Pair it with `external_source` when the same identifier could come from more than one system.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

Return only cycles imported from this source, for example `jira`.

</ApiParam>

</div>

**Search**

<div class="params-list">

<ApiParam name="search" type="string" :required="false">

Free-text search term matched against the cycle.

</ApiParam>

</div>

**Ordering**

<div class="params-list">

<ApiParam name="order_by" type="string" :required="false">

Field to sort by. Prefix with `-` for descending.

- `sort_order` / `-sort_order` — the project's manual cycle ordering
- `created_at` / `-created_at` — newest or oldest first
- `id` / `-id`

</ApiParam>

</div>

**Pagination**

<div class="params-list">

<ApiParam name="per_page" type="integer" :required="false">

Page size. Defaults to 50, maximum 200.

</ApiParam>

<ApiParam name="offset" type="integer" :required="false">

Number of rows to skip from the start of the result set. Maximum 10000 — past that, switch to cursor pagination.

</ApiParam>

<ApiParam name="paginate" type="string" :required="false">

Set to `cursor` to opt into the COUNT-free keyset envelope instead of the default offset envelope. The response then carries `next_cursor` and `has_more` rather than `next`, `previous`, and `total_count`; pass `next_cursor` back as `cursor` to walk to the following page. Use it for deep traversal, where offset paging gets expensive.

</ApiParam>

<ApiParam name="count" type="boolean" :required="false">

Defaults to `true`. Set to `false` to skip the `COUNT(*)` behind `total_count` — the field is then omitted from the envelope. Worth doing when you only need the rows.

</ApiParam>

</div>

::: warning Bad enum values fail silently
`order_by` and `paginate` are not validated against their allowed values. An unrecognized `order_by` falls back to the cycle default ordering, and anything other than `paginate=cursor` uses offset pagination — so check your spelling, because a typo shows up as an unexpected sort order or envelope rather than an error.
:::

</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return on each row. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `created_at`, `created_by_id`, `description`, `end_date`, `external_id`, `external_source`, `id`, `logo_props`, `name`, `owned_by_id`, `sort_order`, `start_date`, `timezone`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed alongside the ids: `owned_by` (the cycle owner).

Expansion is separate-key: `?expand=state` keeps `state_id` and adds a `state` object next to it, so an id is never replaced by an object. An unknown value is a `400`.

`?fields=` and `?expand=` are independent namespaces. Relation names are not valid `?fields=` tokens (and vice versa), and an expanded object survives field filtering — `?fields=id,name&expand=state` returns `id`, `name` and `state`. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.cycles:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read cycles in this project.                          |
| `404`  | `not_found`        | No such workspace or project, or it's outside your tenant.                           |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="List cycles" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/cycles/?per_page=50&order_by=-created_at" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/cycles/",
    headers={"X-Api-Key": "your-api-key"},
    params={"per_page": 50, "order_by": "-created_at"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const params = new URLSearchParams({ per_page: "50", order_by: "-created_at" });
const response = await fetch(
  `https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/cycles/?${params}`,
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
      "id": "7c1f9a4e-3b6d-4a52-8f0c-2d9e6b18c3a7",
      "name": "Sprint 24",
      "description": "Checkout rewrite and billing cleanup",
      "start_date": "2026-01-05T00:00:00Z",
      "end_date": "2026-01-19T00:00:00Z",
      "timezone": "America/New_York",
      "owned_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
      "sort_order": 65535,
      "logo_props": {},
      "external_id": null,
      "external_source": null,
      "created_at": "2026-01-14T09:22:41.478363Z",
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
    },
    {
      "id": "2b8d5e07-9a41-4c6f-b3d2-71e8a4c05f96",
      "name": "Sprint 23",
      "description": "",
      "start_date": "2025-12-22T00:00:00Z",
      "end_date": "2026-01-05T00:00:00Z",
      "timezone": "America/New_York",
      "owned_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
      "sort_order": 55535,
      "logo_props": {},
      "external_id": "SPR-23",
      "external_source": "jira",
      "created_at": "2025-12-18T11:04:07.912004Z",
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
    }
  ],
  "next": 50,
  "previous": null,
  "total_count": 27,
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
      "id": "7c1f9a4e-3b6d-4a52-8f0c-2d9e6b18c3a7",
      "name": "Sprint 24",
      "description": "Checkout rewrite and billing cleanup",
      "start_date": "2026-01-05T00:00:00Z",
      "end_date": "2026-01-19T00:00:00Z",
      "timezone": "America/New_York",
      "owned_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
      "sort_order": 65535,
      "logo_props": {},
      "external_id": null,
      "external_source": null,
      "created_at": "2026-01-14T09:22:41.478363Z",
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
    }
  ],
  "next_cursor": "b3A9MTcxOjA6MA==",
  "has_more": true,
  "pagination": {
    "style": "cursor"
  }
}
```

</ResponsePanel>

</div>
</div>
