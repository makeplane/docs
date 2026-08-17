---
title: List type properties
description: List the custom properties attached to a Plane work item type with the v2 REST API. Ordering, pagination, OAuth scopes, error codes, and code examples.
keywords: plane api v2, list type properties, work item type properties, custom properties, attached properties, GET type properties
---

# List type properties

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-types/{type_id}/properties/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Return the custom properties currently attached to one work item type, as a paginated list. This is the call that
answers "what fields does a `Bug` have?" — reach for it before rendering a form, validating an import, or deciding
which property values to send when you create a work item.

Each entry is the **full property definition**, not a link stub, so labels, input types, and option lists all arrive in
this one response. Properties that exist in the project but are not attached to this type are not returned; for the
project-wide inventory use
[List work item properties](/api-reference/v2/work-item-properties/list-work-item-properties).

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the work item type belongs to.

</ApiParam>

<ApiParam name="type_id" type="string (uuid)" :required="true">

The work item type whose properties you want to list.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

There are no filters on this endpoint — the attachment itself is the filter. What you can control is ordering and page
size.

Neither `order_by` nor `paginate` is validated — check your spelling, because both fail silently. A value outside the
lists below is not rejected: an unrecognized `order_by` falls back to the default ordering, and anything other than
`paginate=cursor` uses offset pagination.

</div>

<div class="params-section">

### Ordering

<div class="params-list">

<ApiParam name="order_by" type="string" :required="false">

Field to sort by. Prefix with `-` for descending.

- `sort_order` , `-sort_order` — the order the properties are shown in, and the default
- `created_at` , `-created_at` — when each property was created
- `id` , `-id`

Order by `sort_order` when you are rendering the type's form to a user; it is the order Plane itself uses. Note that
`sort_order` is not part of the returned property object — sort by `created_at` or `id` if you need the sort key to be
visible in the payload.

</ApiParam>

</div>
</div>

<div class="params-section">

### Pagination

<div class="params-list">

<ApiParam name="per_page" type="integer" :required="false">

Page size. Defaults to 50, maximum 200. Most types carry a handful of properties, so one page is usually the whole set.

</ApiParam>

<ApiParam name="offset" type="integer" :required="false">

Number of rows to skip from the start of the result set. Maximum 10000. Read the `next` value from the response rather
than computing offsets yourself.

</ApiParam>

<ApiParam name="paginate" type="string" :required="false">

Set to `cursor` to opt into the COUNT-free keyset envelope, which returns `next_cursor` and `has_more` instead of
`next` and `total_count`. Pair it with `order_by=created_at` or `order_by=id` — the default `sort_order` is not a
unique key, so it is not cursor-eligible. Omit the parameter for the default offset envelope.

</ApiParam>

<ApiParam name="count" type="boolean" :required="false">

Defaults to `true`. Set to `false` to skip the `COUNT(*)` behind `total_count`; the field is then omitted from the
response.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return on each row. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `created_at`, `default_value`, `description`, `display_name`, `external_id`, `external_source`, `id`, `is_active`, `is_multi`, `is_required`, `logo_props`, `name`, `options`, `property_type`, `relation_type`, `settings`, `validation_rules`.

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
| `404`  | `not_found`        | No such workspace, project, or type — or it's outside your tenant.                   |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

::: info Reads work in either mode
Listing is not mode-gated. A project surfaces the properties on its types whether the workspace manages types at the
project level or the workspace level — only the writes on this path
([attach](/api-reference/v2/work-item-type-properties/attach-type-property) and
[detach](/api-reference/v2/work-item-type-properties/detach-type-property)) care. See
[Work item type modes](/api-reference/v2/work-item-type-modes).
:::

</div>

<div class="api-right">

<CodePanel title="List type properties" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/9d3c7f21-6b48-4e0a-8f52-2c1d7a904e66/properties/?order_by=sort_order&per_page=50" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/9d3c7f21-6b48-4e0a-8f52-2c1d7a904e66/properties/",
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
  `https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/9d3c7f21-6b48-4e0a-8f52-2c1d7a904e66/properties/?${params}`,
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
      "id": "c1f0a2d4-73b9-4e6c-8a15-9d0e4b3f7c28",
      "name": "severity",
      "display_name": "Severity",
      "description": "How badly this bug affects users",
      "property_type": "OPTION",
      "relation_type": null,
      "is_required": true,
      "is_multi": false,
      "is_active": true,
      "default_value": [],
      "settings": {},
      "validation_rules": {},
      "logo_props": {},
      "external_id": null,
      "external_source": null,
      "created_at": "2026-01-14T09:22:41.478363Z",
      "options": [
        {
          "id": "3b6f1c88-0d24-4a97-9f53-71e8c2b4a069",
          "name": "Critical",
          "description": "Data loss or full outage",
          "is_default": false,
          "sort_order": 10000,
          "external_id": null,
          "external_source": null
        },
        {
          "id": "7e2a9046-5c31-4d8b-a4f6-0b95e13d72c8",
          "name": "Major",
          "description": "Core workflow blocked",
          "is_default": true,
          "sort_order": 20000,
          "external_id": null,
          "external_source": null
        }
      ]
    },
    {
      "id": "5e8b3417-2a6d-4c91-b0f7-8d2e14a6c395",
      "name": "root-cause",
      "display_name": "Root cause",
      "description": "What actually broke",
      "property_type": "TEXT",
      "relation_type": null,
      "is_required": false,
      "is_multi": false,
      "is_active": true,
      "default_value": [],
      "settings": {},
      "validation_rules": {},
      "logo_props": {},
      "external_id": null,
      "external_source": null,
      "created_at": "2026-01-14T09:24:03.201884Z",
      "options": []
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
      "id": "5e8b3417-2a6d-4c91-b0f7-8d2e14a6c395",
      "name": "root-cause",
      "display_name": "Root cause",
      "description": "What actually broke",
      "property_type": "TEXT",
      "relation_type": null,
      "is_required": false,
      "is_multi": false,
      "is_active": true,
      "default_value": [],
      "settings": {},
      "validation_rules": {},
      "logo_props": {},
      "external_id": null,
      "external_source": null,
      "created_at": "2026-01-14T09:24:03.201884Z",
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

::: tip Branch on `property_type`, not on the label
`display_name` is what a human renamed the field to this week. `property_type`, `is_multi`, and `is_required` are what
tell your code whether to render a date picker or a multi-select and whether a value is mandatory. Key your integration
on `id` and `property_type`; treat `display_name` as text for humans.
:::
