---
title: Update a workspace work item property
description: Partially update a workspace-level custom property with the Plane v2 REST API. PATCH semantics, body parameters, mode conflicts, OAuth scopes, error codes, and code examples.
keywords: plane api v2, update work item property, PATCH work item property, workspace custom property, property_type, work item type modes
---

# Update a workspace work item property

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-properties/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Change a workspace property in place. `PATCH` is partial: send only the fields you want to change, and
everything you omit is left untouched. Omitting a field is not the same as sending `null` — `null` clears a
nullable field, omission changes nothing.

There is no `PUT` on this resource; sending one returns `405 method_not_allowed`.

Every project and work item type the property reaches sees the change — that is the point of defining it at
the workspace level.

::: warning Wrong mode is a 409, not a 404
If the workspace manages work item types at the **project** level, this route returns `409` with the code
`work_item_types_managed_at_project`. Update the property on the project-level resource instead. See
[Work item type modes](/api-reference/v2/work-item-type-modes).
:::

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is
`my-team`.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The property's id.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

Every field is optional. The body itself is optional too, though an empty `PATCH` does nothing useful.

<div class="params-list">

<ApiParam name="display_name" type="string" :required="false">

The label shown wherever the property is rendered. Maximum 255 characters. Renaming is safe for integrations
that key on `id`.

</ApiParam>

<ApiParam name="property_type" type="string" :required="false">

One of `TEXT`, `DATETIME`, `DECIMAL`, `BOOLEAN`, `OPTION`, `RELATION`, `URL`, `EMAIL`, `FILE`, or `FORMULA`.
Changing the type of a property that is already collecting values reinterprets what those values mean —
prefer retiring the old property with `is_active: false` and creating a new one.

</ApiParam>

<ApiParam name="relation_type" type="string" :required="false">

For a `RELATION` property, what it points at. One of `ISSUE`, `USER`, `RELEASE`, or `RICH_TEXT`. Nullable.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Free-form explanation of what the property captures. Nullable — send `null` to clear it.

</ApiParam>

<ApiParam name="is_required" type="boolean" :required="false">

Whether a value must be supplied for this property.

</ApiParam>

<ApiParam name="is_multi" type="boolean" :required="false">

Whether the property accepts more than one value.

</ApiParam>

<ApiParam name="is_active" type="boolean" :required="false">

Set to `false` to retire the property without deleting it, and back to `true` to bring it into circulation
again.

</ApiParam>

<ApiParam name="default_value" type="array of string" :required="false">

The value applied when none is supplied. Always an array. Send `[]` to clear it.

</ApiParam>

<ApiParam name="options" type="array of object" :required="false">

Write-only. For day-to-day option management — adding one choice, renaming another — use
[Property options](/api-reference/v2/workspace-work-item-property-options/overview), which addresses each
option by id.

</ApiParam>

<ApiParam name="settings" type="any" :required="false">

Type-specific configuration. Its shape depends on `property_type`.

</ApiParam>

<ApiParam name="validation_rules" type="any" :required="false">

Type-specific validation configuration.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this property. Maximum 255 characters, nullable.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from. Maximum 255 characters, nullable.

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

`workspaces.work_item_properties:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `400`  | `invalid_request`        | An enum value outside the allowed set, or a field over its length limit.             |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                      |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`              | Your role or token scope can't write workspace work item properties.                 |
| `404`  | `not_found`              | No such workspace or property, or it's outside your tenant.                          |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | This workspace manages work item types at the project level.                         |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="Update a workspace property" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/a7e3f1d0-5c92-4b68-8f31-2d4a6b9e0c15/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "display_name": "Customer severity",
  "is_required": false
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/a7e3f1d0-5c92-4b68-8f31-2d4a6b9e0c15/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "display_name": "Customer severity",
        "is_required": False,
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/a7e3f1d0-5c92-4b68-8f31-2d4a6b9e0c15/",
  {
    method: "PATCH",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      display_name: "Customer severity",
      is_required: false,
    }),
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
  "display_name": "Customer severity",
  "description": "How badly the customer is affected",
  "property_type": "OPTION",
  "relation_type": null,
  "is_required": false,
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

<ResponsePanel status="409">

```json
{
  "type": "conflict",
  "code": "work_item_types_managed_at_project",
  "detail": "This workspace manages work item types at the project level. Use the project-level endpoint instead."
}
```

</ResponsePanel>

</div>
</div>

::: tip Scoping is edited elsewhere
`PATCH` here changes the property's definition, not where it applies. To narrow or widen the projects and work
item types that see it, update its
[property contexts](/api-reference/v2/work-item-property-contexts/overview) instead.
:::
