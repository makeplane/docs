---
title: Get a type property
description: Retrieve one custom property through a Plane work item type with the v2 REST API. Path parameters, OAuth scopes, error codes, and code examples.
keywords: plane api v2, get type property, work item type properties, custom property, attached property, GET type property by id
---

# Get a type property

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-types/{type_id}/properties/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve a single property **as exposed by a work item type**. The response is the full property definition — the same
object [List type properties](/api-reference/v2/work-item-type-properties/list-type-properties) returns, for one id.

The type in the path is part of the lookup, not decoration: a property that exists in the project but is not attached
to this type returns `404`. That makes this endpoint a cheap "is this property on this type?" check before you send a
value or offer the field in a form.

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

The work item type the property is attached to.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The id of the property to retrieve. This is the property's own id — the same value you pass to
[attach](/api-reference/v2/work-item-type-properties/attach-type-property) and
[detach](/api-reference/v2/work-item-type-properties/detach-type-property) it.

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

`projects.work_item_types:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                        |
| ------ | ------------------ | -------------------------------------------------------------------------------------------- |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                              |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.         |
| `403`  | `forbidden`        | Your role or token scope can't read this project's work item types.                          |
| `404`  | `not_found`        | No such workspace, project, type, or property — or the property isn't attached to this type. |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                         |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                                   |

</div>

::: info A 404 here can mean "not attached"
The property may exist and be perfectly healthy — just not linked to this type. Read it without the type in the path
using [Get a work item property](/api-reference/v2/work-item-properties/get-work-item-property) to tell the two cases
apart, or list the type's properties to see what it actually exposes.
:::

::: info One flat object, and no mode gate
The response is the flat property object shown here, with `options` already inlined for `OPTION` properties — there is
nothing to fetch separately. Reads also work in either work item type mode; only attaching and detaching are
mode-gated. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

</div>

<div class="api-right">

<CodePanel title="Get a type property" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/9d3c7f21-6b48-4e0a-8f52-2c1d7a904e66/properties/c1f0a2d4-73b9-4e6c-8a15-9d0e4b3f7c28/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/9d3c7f21-6b48-4e0a-8f52-2c1d7a904e66/properties/c1f0a2d4-73b9-4e6c-8a15-9d0e4b3f7c28/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/9d3c7f21-6b48-4e0a-8f52-2c1d7a904e66/properties/c1f0a2d4-73b9-4e6c-8a15-9d0e4b3f7c28/",
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
}
```

</ResponsePanel>

<ResponsePanel status="404">

```json
{
  "type": "not_found",
  "code": "not_found",
  "detail": "The requested resource was not found."
}
```

</ResponsePanel>

</div>
</div>
