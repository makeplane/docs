---
title: List work item properties
description: List the custom work item properties defined in a Plane project with the v2 REST API. Ordering, pagination, OAuth scopes, error codes, and code examples.
keywords: plane api v2, list work item properties, custom fields, custom properties, project properties, pagination, GET work item properties
---

# List work item properties

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-properties/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Return every custom property defined in a project as a paginated list. This is how you discover which fields exist before writing values, and how you resolve a field's label to the property `id` you need for options and type attachments.

The list is the project's full catalog of definitions — including properties with `is_active: false`, and including properties not yet attached to any work item type. To see what a specific type actually offers, use [List type properties](/api-reference/v2/work-item-type-properties/list-type-properties) instead.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project whose properties you want to list.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

There are no filter or search parameters on this endpoint — a project's property catalog is small enough to read whole and filter client-side. Check your spelling on `order_by` and `paginate`: neither is validated, so an unrecognized `order_by` silently falls back to the default ordering and anything other than `paginate=cursor` silently uses offset pagination. A typo shows up as an unexpected sort order or envelope, not as an error.

</div>

<div class="params-section">

### Ordering

<div class="params-list">

<ApiParam name="order_by" type="string" :required="false">

Field to sort by. Prefix with `-` for descending.

- `sort_order` , `-sort_order` — the configured display order of the fields
- `created_at` , `-created_at` — when each property was defined
- `id` , `-id`

Order by `sort_order` when you are rendering the fields to a person; it is the order the project itself uses.

</ApiParam>

</div>
</div>

<div class="params-section">

### Pagination

<div class="params-list">

<ApiParam name="per_page" type="integer" :required="false">

Page size. Defaults to 50, maximum 200. Most projects define far fewer than 50 properties, so one page is usually the whole catalog.

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

Requestable here: `created_at`, `default_value`, `description`, `display_name`, `external_id`, `external_source`, `id`, `is_active`, `is_multi`, `is_required`, `logo_props`, `name`, `options`, `property_type`, `relation_type`, `settings`, `validation_rules`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_item_properties:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read this project's properties.                       |
| `404`  | `not_found`        | No such workspace or project, or it's outside your tenant.                           |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

::: info Reads work in either mode
Listing properties never returns a mode conflict. A project still surfaces its properties when the workspace manages work item types at the workspace level — only **writes** are mode-specific. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

</div>

<div class="api-right">

<CodePanel title="List work item properties" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/?order_by=sort_order&per_page=50" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/",
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
  `https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/?${params}`,
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
      "id": "9d2f0b74-6a51-4c8e-b3d7-2f1a8c05e964",
      "name": "severity",
      "display_name": "Severity",
      "description": "How badly this affects customers",
      "property_type": "OPTION",
      "relation_type": null,
      "is_multi": false,
      "is_required": true,
      "is_active": true,
      "default_value": [],
      "options": [
        {
          "id": "3e7a5c19-42b8-4d06-9f3e-7c1b8a0d2456",
          "name": "Critical",
          "description": "Production is down",
          "is_default": false,
          "sort_order": 15000,
          "external_id": null,
          "external_source": null
        },
        {
          "id": "b6c04f83-1d29-4e57-8a3b-90e2f5c7d418",
          "name": "Major",
          "description": "A core workflow is broken",
          "is_default": true,
          "sort_order": 25000,
          "external_id": null,
          "external_source": null
        }
      ],
      "settings": {},
      "validation_rules": {},
      "logo_props": {},
      "external_id": null,
      "external_source": null,
      "created_at": "2026-01-14T09:22:41.478363Z"
    },
    {
      "id": "c81b7e2a-5f34-4d90-8e17-3a6c9b0f2d75",
      "name": "story_points",
      "display_name": "Story points",
      "description": "Relative sizing for planning",
      "property_type": "DECIMAL",
      "relation_type": null,
      "is_multi": false,
      "is_required": false,
      "is_active": true,
      "default_value": ["3"],
      "options": [],
      "settings": {},
      "validation_rules": {},
      "logo_props": {},
      "external_id": null,
      "external_source": null,
      "created_at": "2026-01-14T09:24:03.117482Z"
    },
    {
      "id": "5a3e8f01-7c62-4b18-a940-d2e5b7c86139",
      "name": "reviewer",
      "display_name": "Reviewer",
      "description": "Who signs this off",
      "property_type": "RELATION",
      "relation_type": "USER",
      "is_multi": true,
      "is_required": false,
      "is_active": true,
      "default_value": [],
      "options": [],
      "settings": {},
      "validation_rules": {},
      "logo_props": {},
      "external_id": null,
      "external_source": null,
      "created_at": "2026-01-14T09:26:55.902314Z"
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
      "id": "9d2f0b74-6a51-4c8e-b3d7-2f1a8c05e964",
      "name": "severity",
      "display_name": "Severity",
      "description": "How badly this affects customers",
      "property_type": "OPTION",
      "relation_type": null,
      "is_multi": false,
      "is_required": true,
      "is_active": true,
      "default_value": [],
      "options": [],
      "settings": {},
      "validation_rules": {},
      "logo_props": {},
      "external_id": null,
      "external_source": null,
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

::: tip Inactive properties still appear
`is_active: false` means the field is no longer offered on new edits, not that it is gone. The list returns it. If you are rendering a form, filter to `is_active: true` yourself — and check the type's own property list, since a property in this catalog may not be attached to the type you are editing.
:::
