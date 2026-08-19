---
title: Get a work item property
description: Retrieve a single custom work item property from a Plane project with the v2 REST API. Path parameters, the resolved options array, OAuth scopes, error codes, and code examples.
keywords: plane api v2, get work item property, retrieve custom field, property_type, options, GET work item property by id
---

# Get a work item property

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-properties/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve one property definition by id. Reach for this when you already hold a property `id` — from a type's property list, a stored mapping, or a create response — and need its current shape before reading or writing values.

The response includes the resolved `options` array, so a single request tells you both what the field is and which choices it offers. Check `property_type` before you build a value: it decides what the field can hold, and `relation_type` narrows it further for `RELATION` properties.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the property belongs to. A property id from a different project returns `404`, even inside the same workspace.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The id of the property to retrieve.

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

`projects.work_item_properties:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read this project's properties.                       |
| `404`  | `not_found`        | No such property, project, or workspace — or it's outside your tenant.               |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

::: info Reads ignore the mode
This endpoint works whether the workspace manages work item types at the project or workspace level — only writes are mode-specific, and only writes return a `409`. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

::: info No expansion on properties
Work item properties don't accept `?expand=`. The response is the object shown here, with `options` already resolved inline.
:::

::: info Existence is never leaked
A property outside your tenant returns `404`, not `403`. If a cached id starts returning `404`, re-read the catalog with [List work item properties](/api-reference/v2/work-item-properties/list-work-item-properties) rather than retrying.
:::

</div>

<div class="api-right">

<CodePanel title="Get a work item property" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/9d2f0b74-6a51-4c8e-b3d7-2f1a8c05e964/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/9d2f0b74-6a51-4c8e-b3d7-2f1a8c05e964/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/9d2f0b74-6a51-4c8e-b3d7-2f1a8c05e964/",
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
    },
    {
      "id": "7f52d3a8-0e14-4c69-b28d-a1f6e903c5b7",
      "name": "Minor",
      "description": "Cosmetic or low impact",
      "is_default": false,
      "sort_order": 35000,
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
  "detail": "No IssueProperty matches the given query."
}
```

</ResponsePanel>

</div>
</div>

::: tip `name` is the stable key, `display_name` is the label
People rename fields. If you are storing a mapping between a Plane property and a field in your own system, key it on `id` — and use `name` when you need something human-legible that changes less often than the label. `display_name` is the one that shows up in the UI, and the one you send when you want to change it.
:::
