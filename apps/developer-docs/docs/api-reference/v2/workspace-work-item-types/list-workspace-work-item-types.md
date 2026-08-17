---
title: List workspace work item types
description: List the workspace-level work item types in a Plane workspace with the v2 REST API. Ordering, pagination, OAuth scopes, error codes, and code examples.
keywords: plane api v2, list workspace work item types, issue types, workspace mode, pagination, GET work item types
---

# List workspace work item types

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-types/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Return the workspace's work item types as a paginated list. This is where you resolve a type name such as `Bug` to the `id` you need — to set `type_id` on a work item, to attach properties to the type, or to hand to a project [import](/api-reference/v2/work-item-types/import-work-item-types).

There is no project segment in the path: these are the types defined once for the whole workspace.

::: info Reads work in either mode
Listing is unaffected by [work item type modes](/api-reference/v2/work-item-type-modes). You can read the workspace list even while the workspace manages types at the project level — only writes are mode-gated.
:::

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

This endpoint takes ordering and pagination only — there are no filter or search parameters. A workspace's type list is short by design, so read a page and match on `name` or `id` in your own code.

</div>

<div class="params-section">

### Ordering

<div class="params-list">

<ApiParam name="order_by" type="string" :required="false">

Field to sort by. Prefix with `-` for descending.

- `name` , `-name` — alphabetical, which is what you usually want for a picker
- `level` , `-level` — the type's level in the work item hierarchy
- `created_at` , `-created_at` — when each type was added
- `id` , `-id`

A value outside this list is not rejected — it quietly falls back to the default ordering. Check your spelling: a typo surfaces as a differently-sorted page, not as an error.

</ApiParam>

</div>
</div>

<div class="params-section">

### Pagination

<div class="params-list">

<ApiParam name="per_page" type="integer" :required="false">

Page size. Defaults to 50, maximum 200. Most workspaces define fewer than 20 types, so one page is usually the whole set.

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

Requestable here: `created_at`, `description`, `id`, `is_active`, `is_default`, `is_epic`, `level`, `logo_props`, `name`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.work_item_types:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read this workspace's types.                          |
| `404`  | `not_found`        | No such workspace, or it's outside your tenant.                                      |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="List workspace work item types" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/?order_by=name&per_page=50" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/",
    headers={"X-Api-Key": "your-api-key"},
    params={"order_by": "name", "per_page": 50},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const params = new URLSearchParams({ order_by: "name", per_page: "50" });
const response = await fetch(
  `https://api.plane.so/api/v2/workspaces/my-team/work-item-types/?${params}`,
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
      "id": "c1a7d3f4-6b28-4e90-8d15-2f7a0b9c4e63",
      "name": "Bug",
      "description": "Something is broken and needs a fix",
      "is_active": true,
      "is_default": false,
      "is_epic": false,
      "level": 0,
      "logo_props": {},
      "created_at": "2026-01-14T09:22:41.478363Z"
    },
    {
      "id": "5e8b0c19-7a4d-42f6-9b83-1c0d6e2f7a45",
      "name": "Epic",
      "description": "A large body of work spanning several work items",
      "is_active": true,
      "is_default": false,
      "is_epic": true,
      "level": 1,
      "logo_props": {},
      "created_at": "2026-01-14T09:22:41.512907Z"
    },
    {
      "id": "9d2f1b73-4c85-4a06-b3e1-7f8c25a0d914",
      "name": "Task",
      "description": "Standard unit of work",
      "is_active": true,
      "is_default": true,
      "is_epic": false,
      "level": 0,
      "logo_props": {},
      "created_at": "2026-01-14T09:22:41.548221Z"
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
      "id": "c1a7d3f4-6b28-4e90-8d15-2f7a0b9c4e63",
      "name": "Bug",
      "description": "Something is broken and needs a fix",
      "is_active": true,
      "is_default": false,
      "is_epic": false,
      "level": 0,
      "logo_props": {},
      "created_at": "2026-01-14T09:22:41.478363Z"
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

::: tip Inactive types still list
`is_active: false` retires a type from pickers, but it keeps appearing in this list. Filter on `is_active` in your own code before you show the list to a user, and keep inactive types resolvable so historic work items still render with a name.
:::
