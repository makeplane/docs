---
title: List workspace work item properties
description: List the custom properties defined at the workspace level with the Plane v2 REST API. Ordering, pagination, OAuth scopes, error codes, and code examples.
keywords: plane api v2, list workspace work item properties, custom properties, custom fields, GET work item properties, pagination
---

# List workspace work item properties

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-properties/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Return the workspace's custom property catalog as a paginated list. This is how you resolve a property name to
the `id` you need when creating a context or attaching the property to a work item type, and how you build a
picker that stays in sync with what the workspace has defined.

The list is the catalog, not what is live: it includes properties that have no
[context](/api-reference/v2/work-item-property-contexts/overview) yet and therefore do not appear on any work
item. Reads here are unaffected by the workspace's
[work item type mode](/api-reference/v2/work-item-type-modes).

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is
`my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

This list takes no filters or search term — the whole catalog is returned, page by page. Check your spelling on
`order_by` and `paginate`: neither is validated, so an unrecognized `order_by` silently falls back to the default
ordering and anything other than `paginate=cursor` silently uses offset pagination.

</div>

<div class="params-section">

### Ordering

<div class="params-list">

<ApiParam name="order_by" type="string" :required="false">

Field to sort by. Prefix with `-` for descending.

- `sort_order` , `-sort_order` — the display order Plane uses for the property list. This is the order you
  want when rendering a form; note that `sort_order` itself is not returned on the property object.
- `created_at` , `-created_at` — when each property was created
- `id` , `-id`

</ApiParam>

</div>
</div>

<div class="params-section">

### Pagination

<div class="params-list">

<ApiParam name="per_page" type="integer" :required="false">

Page size. Defaults to 50, maximum 200.

</ApiParam>

<ApiParam name="offset" type="integer" :required="false">

Number of rows to skip from the start of the result set. Maximum 10000. Read the `next` value from the
response rather than computing offsets yourself.

</ApiParam>

<ApiParam name="paginate" type="string" :required="false">

Set to `cursor` to opt into the COUNT-free keyset envelope, which returns `next_cursor` and `has_more` instead
of `next` and `total_count`. Omit it for the default offset envelope.

</ApiParam>

<ApiParam name="count" type="boolean" :required="false">

Defaults to `true`. Set to `false` to skip the `COUNT(*)` behind `total_count`; the field is then omitted from
the response.

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

`workspaces.work_item_properties:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read workspace work item properties.                  |
| `404`  | `not_found`        | No such workspace, or it's outside your tenant.                                      |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="List workspace properties" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/?order_by=sort_order&per_page=50" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/",
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
  `https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/?${params}`,
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
      "id": "a7e3f1d0-5c92-4b68-8f31-2d4a6b9e0c15",
      "name": "severity",
      "display_name": "Severity",
      "description": "How badly the customer is affected",
      "property_type": "OPTION",
      "relation_type": null,
      "is_required": true,
      "is_multi": false,
      "is_active": true,
      "default_value": ["Major"],
      "options": [
        {
          "id": "9d2c7b41-6a80-4f35-8e19-5c3b0a7d2e46",
          "name": "Critical",
          "description": "Production is down",
          "is_default": false,
          "sort_order": 10000,
          "external_id": null,
          "external_source": null
        },
        {
          "id": "5a83e0b7-2c46-4d19-9f70-6b12c8e5a03d",
          "name": "Major",
          "description": "A core workflow is broken",
          "is_default": true,
          "sort_order": 20000,
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
      "id": "c58b2e94-71a3-4d0f-9e62-4a1c7f38b5d2",
      "name": "reviewer",
      "display_name": "Reviewer",
      "description": "Who signs off before release",
      "property_type": "RELATION",
      "relation_type": "USER",
      "is_required": false,
      "is_multi": true,
      "is_active": true,
      "default_value": [],
      "options": [],
      "settings": {},
      "validation_rules": {},
      "logo_props": {},
      "external_id": null,
      "external_source": null,
      "created_at": "2026-01-14T09:23:12.904551Z"
    },
    {
      "id": "3fb6c0d8-4e21-49a7-b5c3-90ad72e14f6b",
      "name": "rollout_date",
      "display_name": "Rollout date",
      "description": "When the fix reaches customers",
      "property_type": "DATETIME",
      "relation_type": null,
      "is_required": false,
      "is_multi": false,
      "is_active": true,
      "default_value": [],
      "options": [],
      "settings": {},
      "validation_rules": {},
      "logo_props": {},
      "external_id": null,
      "external_source": null,
      "created_at": "2026-01-14T09:24:03.112884Z"
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
      "id": "a7e3f1d0-5c92-4b68-8f31-2d4a6b9e0c15",
      "name": "severity",
      "display_name": "Severity",
      "description": "How badly the customer is affected",
      "property_type": "OPTION",
      "relation_type": null,
      "is_required": true,
      "is_multi": false,
      "is_active": true,
      "default_value": ["Major"],
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

::: tip Match on id, not label
`display_name` is a label humans edit. Resolve it to `id` once and store the id — that is what contexts, type
attachments, and property values refer to.
:::
