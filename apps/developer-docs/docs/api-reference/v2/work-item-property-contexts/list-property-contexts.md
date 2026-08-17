---
title: List property contexts
description: List the contexts of a workspace-level work item property with the Plane v2 REST API. Ordering, pagination, OAuth scopes, error codes, and code examples.
keywords: plane api v2, list property contexts, work item property scope, applies_to_all_projects, project_ids, pagination, GET contexts
---

# List property contexts

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-properties/{property_id}/contexts/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Return every context defined on a workspace-level property, as a paginated list. This is how you see the full picture of where a property applies and what it does in each place, before deciding whether to add a new context or edit an existing one.

Read the whole list rather than a single context when you need to reason about precedence: a context's effect depends on which other contexts exist. Contexts are returned in `sort_order` by default.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="property_id" type="string (uuid)" :required="true">

The workspace-level property whose contexts you want. A project-level property id is not addressable here and returns `404 not_found`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

Check your spelling on `order_by` and `paginate` — neither is validated, so both fail silently. An unrecognized `order_by` value falls back to the default ordering, and anything other than `paginate=cursor` uses offset pagination. A typo shows up as an unexpected sort order or envelope, not as an error.

</div>

<div class="params-section">

### Ordering

<div class="params-list">

<ApiParam name="order_by" type="string" :required="false">

Field to sort by. Prefix with `-` for descending.

- `sort_order` , `-sort_order` — the property's own context order. This is the default.
- `created_at` , `-created_at` — when each context was added
- `id` , `-id`

</ApiParam>

</div>
</div>

<div class="params-section">

### Pagination

<div class="params-list">

<ApiParam name="per_page" type="integer" :required="false">

Page size. Defaults to 50, maximum 200. A property usually has a handful of contexts, so one page is normally the whole set.

</ApiParam>

<ApiParam name="offset" type="integer" :required="false">

Number of rows to skip from the start of the result set. Maximum 10000. Read the `next` value from the response rather than computing offsets yourself.

</ApiParam>

<ApiParam name="paginate" type="string" :required="false">

Set to `cursor` to opt into the COUNT-free keyset envelope, which returns `next_cursor` and `has_more` instead of `next` and `total_count`. Pair it with `order_by=created_at` or `order_by=id` — the default `sort_order` ordering is not unique, so it is not cursor-eligible and the request is rejected with `ordering_not_cursor_eligible`.

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

Requestable here: `applies_to_all_projects`, `applies_to_all_work_item_types`, `created_at`, `default_value`, `external_id`, `external_source`, `id`, `is_default`, `is_multi`, `is_required`, `issue_type_ids`, `name`, `options`, `project_ids`, `settings`, `sort_order`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.work_item_properties:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read workspace property settings.                     |
| `404`  | `not_found`        | No such workspace or property, or it's outside your tenant.                          |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

::: info Reads work in either mode
Listing contexts does not depend on how the workspace manages work item types. Only `POST`, `PATCH`, and `DELETE` are mode-gated — see [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

</div>

<div class="api-right">

<CodePanel title="List property contexts" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/d1f7a3c9-5b62-4e08-9a41-7c3e2f8b6d05/contexts/?order_by=sort_order&per_page=50" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/d1f7a3c9-5b62-4e08-9a41-7c3e2f8b6d05/contexts/",
    headers={"X-Api-Key": "your-api-key"},
    params={"order_by": "sort_order", "per_page": 50},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const params = new URLSearchParams({ order_by: "sort_order", per_page: "50" });
const response = await fetch(
  `https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/d1f7a3c9-5b62-4e08-9a41-7c3e2f8b6d05/contexts/?${params}`,
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
      "id": "2f8c40a6-9d13-4b7e-85c0-1e6a3f9b7d52",
      "name": "Default",
      "is_required": false,
      "is_multi": false,
      "is_default": true,
      "default_value": [],
      "settings": {},
      "sort_order": 65535,
      "applies_to_all_projects": true,
      "applies_to_all_work_item_types": true,
      "external_id": null,
      "external_source": null,
      "created_at": "2026-01-14T09:22:41.478363Z",
      "project_ids": [],
      "issue_type_ids": [],
      "options": [
        {
          "id": "5d0a9e34-7c62-4f18-b93d-0a4e6f2c8b71",
          "name": "Low",
          "is_default": false,
          "sort_order": 10000
        },
        {
          "id": "81b4f27c-3a05-4e96-8d21-7f6c0b4a9e53",
          "name": "High",
          "is_default": false,
          "sort_order": 20000
        }
      ]
    },
    {
      "id": "6e2b90d4-1c73-4f58-a09e-3d8b5c14e7f2",
      "name": "Bug severity",
      "is_required": true,
      "is_multi": false,
      "is_default": false,
      "default_value": [],
      "settings": {},
      "sort_order": 75535,
      "applies_to_all_projects": false,
      "applies_to_all_work_item_types": false,
      "external_id": null,
      "external_source": null,
      "created_at": "2026-02-03T11:05:17.204918Z",
      "project_ids": [
        "4af68566-94a4-4eb3-94aa-50dc9427067b",
        "9c3d7e21-6b45-4a80-8f19-2e0c7b5d3a64"
      ],
      "issue_type_ids": ["b7e04a95-2f18-4c63-9d57-8a12e6b0f439"],
      "options": [
        {
          "id": "c58e2f01-4d97-4b3a-8e26-1f0b7a9c5d34",
          "name": "S1 — Critical",
          "is_default": false,
          "sort_order": 10000
        },
        {
          "id": "a49b6c72-8e15-4d30-b57c-2f81e0a6d938",
          "name": "S2 — Major",
          "is_default": true,
          "sort_order": 20000
        },
        {
          "id": "f13c8a60-7d24-4e59-9b02-6a5f1c3e8d47",
          "name": "S3 — Minor",
          "is_default": false,
          "sort_order": 30000
        }
      ]
    }
  ],
  "next": null,
  "previous": null,
  "total_count": 2,
  "pagination": {
    "style": "offset"
  }
}
```

</ResponsePanel>

<ResponsePanel status="200" title="CURSOR ENVELOPE (?paginate=cursor&amp;order_by=created_at)">

```json
{
  "data": [
    {
      "id": "2f8c40a6-9d13-4b7e-85c0-1e6a3f9b7d52",
      "name": "Default",
      "is_required": false,
      "is_multi": false,
      "is_default": true,
      "default_value": [],
      "settings": {},
      "sort_order": 65535,
      "applies_to_all_projects": true,
      "applies_to_all_work_item_types": true,
      "external_id": null,
      "external_source": null,
      "created_at": "2026-01-14T09:22:41.478363Z",
      "project_ids": [],
      "issue_type_ids": [],
      "options": []
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

## Reading the scope of each row

Two fields decide coverage on each axis, and the list is only legible if you read them in the right order:

- `applies_to_all_projects` first, `project_ids` second. The first row above covers **every** project — its empty `project_ids` is a consequence of the wildcard, not an empty scope.
- `applies_to_all_work_item_types` first, `issue_type_ids` second, on the same principle.

Ranking the rows you get back tells you which one a given work item will actually use. Most specific wins: listed projects and listed types beat listed projects and all types, which beat all projects and listed types, which beat all projects and all types. See [Property contexts overview](/api-reference/v2/work-item-property-contexts/overview) for the full precedence rules.
