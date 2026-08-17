---
title: List work item types
description: List a Plane project's work item types with the v2 REST API. Ordering, pagination, OAuth scopes, error codes, and code examples.
keywords: plane api v2, list work item types, issue types, type_id, pagination, GET work item types
---

# List work item types

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-types/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Return the work item types available in a project as a paginated list. This is how you resolve a type name such as `Bug` to the `type_id` you send when creating a work item, and how you build a type picker that stays in sync with the project's configuration.

Reading types is unaffected by [work item type mode](/api-reference/v2/work-item-type-modes). A project in workspace mode still lists the types imported into it here, so a read integration never has to branch on mode.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project whose work item types you want to list.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

Neither `order_by` nor `paginate` is validated — check your spelling, because both fail silently. An unrecognized `order_by` value falls back to the default ordering, and anything other than `paginate=cursor` uses offset pagination. A typo surfaces as an unexpected sort order or envelope, not as an error.

</div>

<div class="params-section">

### Ordering

<div class="params-list">

<ApiParam name="order_by" type="string" :required="false">

Field to sort by. Prefix with `-` for descending.

- `level` , `-level` — the type hierarchy level
- `name` , `-name` — alphabetical
- `created_at` , `-created_at` — when each type was added
- `id` , `-id`

Order by `level` when you are rendering types to a user; it is the order the project itself uses.

</ApiParam>

</div>
</div>

<div class="params-section">

### Pagination

<div class="params-list">

<ApiParam name="per_page" type="integer" :required="false">

Page size. Defaults to 50, maximum 200. Most projects define a handful of types, so one page is usually the whole set.

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

`projects.work_item_types:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read this project's work item types.                  |
| `404`  | `not_found`        | No such workspace or project, or it's outside your tenant.                           |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="List work item types" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/?order_by=level&per_page=50" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/",
    headers={"X-Api-Key": "your-api-key"},
    params={"order_by": "level", "per_page": 50},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const params = new URLSearchParams({ order_by: "level", per_page: "50" });
const response = await fetch(
  `https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/?${params}`,
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
      "id": "9c2f8e51-4a63-47d8-b1e0-5f7a2c40d693",
      "name": "Task",
      "description": "Default work item type with the option to add new properties",
      "is_active": true,
      "is_default": true,
      "is_epic": false,
      "level": 0,
      "logo_props": {
        "in_use": "icon",
        "icon": {
          "name": "Check",
          "background_color": "#1FA191"
        }
      },
      "created_at": "2026-01-14T09:22:41.478363Z"
    },
    {
      "id": "d1e7a4c9-2b58-4f36-9a0e-7c3b5d81f240",
      "name": "Bug",
      "description": "Something is broken and needs a fix",
      "is_active": true,
      "is_default": false,
      "is_epic": false,
      "level": 0,
      "logo_props": {
        "in_use": "icon",
        "icon": {
          "name": "AlertCircle",
          "background_color": "#EF5974"
        }
      },
      "created_at": "2026-01-14T09:24:03.117482Z"
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

<ResponsePanel status="200" title="CURSOR ENVELOPE (?paginate=cursor)">

```json
{
  "data": [
    {
      "id": "9c2f8e51-4a63-47d8-b1e0-5f7a2c40d693",
      "name": "Task",
      "description": "Default work item type with the option to add new properties",
      "is_active": true,
      "is_default": true,
      "is_epic": false,
      "level": 0,
      "logo_props": {
        "in_use": "icon",
        "icon": {
          "name": "Check",
          "background_color": "#1FA191"
        }
      },
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

::: info An empty list is a real answer
A project that has never called [enable](/api-reference/v2/work-item-types/enable-work-item-types) returns an empty `data` array rather than an error. Treat "no types" as "the feature has not been turned on for this project yet", not as a failure.
:::

::: tip Listing does not tell you what a type accepts
The list gives you names and ids. To find out which fields and custom properties a work item of a given type takes, call [Get a work item type schema](/api-reference/v2/work-item-types/get-work-item-type-schema) with that type's `id`.
:::
