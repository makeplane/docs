---
title: Get a property on a workspace type
description: Retrieve one custom property attached to a workspace-level work item type with the Plane v2 REST API. Path parameters, OAuth scopes, error codes, and code examples.
keywords: plane api v2, get type property, workspace work item type, custom property, GET property by id
---

# Get a property on a workspace type

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-types/{type_id}/properties/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve one property as it is attached to a workspace-level work item type. Use it to read a single
property's configuration — its `property_type`, whether it is required, its options — without pulling the
whole list.

This route also answers the membership question: a `200` means the property is attached to this type, and a
`404` means it is not. A property that exists in the workspace but is not on this type returns `404`, the same
as an id that does not exist at all.

Reads are unaffected by the workspace's
[work item type mode](/api-reference/v2/work-item-type-modes).

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is
`my-team`.

</ApiParam>

<ApiParam name="type_id" type="string (uuid)" :required="true">

The workspace work item type the property is attached to.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The property's id.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `created_at`, `default_value`, `description`, `display_name`, `external_id`, `external_source`, `id`, `is_active`, `is_multi`, `is_required`, `logo_props`, `name`, `options`, `property_type`, `relation_type`, `settings`, `validation_rules`.

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
| `403`  | `forbidden`        | Your role or token scope can't read workspace work item types.                       |
| `404`  | `not_found`        | No such workspace, type, or property — or the property isn't on this type.           |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="Get a property on a type" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/d1a0b7c6-2f83-4e19-9a55-3b6c8d0e4f27/properties/a7e3f1d0-5c92-4b68-8f31-2d4a6b9e0c15/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/d1a0b7c6-2f83-4e19-9a55-3b6c8d0e4f27/properties/a7e3f1d0-5c92-4b68-8f31-2d4a6b9e0c15/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/d1a0b7c6-2f83-4e19-9a55-3b6c8d0e4f27/properties/a7e3f1d0-5c92-4b68-8f31-2d4a6b9e0c15/",
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
}
```

</ResponsePanel>

<ResponsePanel status="404">

```json
{
  "type": "not_found",
  "code": "not_found",
  "detail": "No property with this id is attached to this work item type."
}
```

</ResponsePanel>

</div>
</div>

::: info Editing happens on the catalog
This route is read-only. To change a property's label, requiredness, or options, `PATCH` it on the workspace
catalog with
[Update a workspace property](/api-reference/v2/workspace-work-item-properties/update-workspace-work-item-property).
Every type the property is attached to sees the change.
:::
