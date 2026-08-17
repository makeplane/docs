---
title: Create a workspace work item property
description: Define a workspace-level custom property with the Plane v2 REST API. Property types, relation types, options, contexts, OAuth scopes, error codes, and code examples.
keywords: plane api v2, create work item property, workspace custom property, property_type, relation_type, POST work item properties, work item type modes
---

# Create a workspace work item property

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-properties/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Define a custom property once for the whole workspace. `display_name` and `property_type` are the only
required fields; everything else refines how the value is captured.

::: warning A new property is not live yet
Creating a property adds it to the workspace catalog. It appears on work items only once a **context** binds
it to projects and work item types. Follow this call with
[Create a property context](/api-reference/v2/work-item-property-contexts/create-property-context), or the
property will sit in the catalog unused.
:::

::: warning Wrong mode is a 409, not a 404
If the workspace manages work item types at the **project** level, this route returns `409` with the code
`work_item_types_managed_at_project`. Create the property on the project-level resource instead. See
[Work item type modes](/api-reference/v2/work-item-type-modes).
:::

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

### Body Parameters

<div class="params-list">

<ApiParam name="display_name" type="string" :required="true">

The label shown wherever the property is rendered. Maximum 255 characters.

</ApiParam>

<ApiParam name="property_type" type="string" :required="true">

What kind of value the property holds. Choose carefully — it governs what `relation_type`, `options`,
`settings`, and `validation_rules` mean.

- `TEXT` — free-form text
- `DATETIME` — a date and time
- `DECIMAL` — a number
- `BOOLEAN` — true or false
- `OPTION` — a choice from a defined list
- `RELATION` — a pointer to another record; pair it with `relation_type`
- `URL` — a link
- `EMAIL` — an email address
- `FILE` — a file
- `FORMULA` — a formula-backed value

A value outside this list is a `400 invalid_request`.

</ApiParam>

<ApiParam name="relation_type" type="string" :required="false">

For a `RELATION` property, what it points at. One of `ISSUE`, `USER`, `RELEASE`, or `RICH_TEXT`. Leave it out
— or send `null` — for every other property type.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Free-form explanation of what the property captures. Nullable.

</ApiParam>

<ApiParam name="is_required" type="boolean" :required="false">

Whether a value must be supplied for this property.

</ApiParam>

<ApiParam name="is_multi" type="boolean" :required="false">

Whether the property accepts more than one value.

</ApiParam>

<ApiParam name="is_active" type="boolean" :required="false">

Whether the property is in use. Send `false` to define a property without putting it into circulation yet.

</ApiParam>

<ApiParam name="default_value" type="array of string" :required="false">

The value applied when none is supplied. Send an array even for a single value.

</ApiParam>

<ApiParam name="options" type="array of object" :required="false">

Seed the choices for an `OPTION` property in the same call. Write-only: the created options come back on the
read-only `options` array of the response, and are managed afterwards through
[Property options](/api-reference/v2/workspace-work-item-property-options/overview), which is also where the
fields an option accepts are documented.

</ApiParam>

<ApiParam name="settings" type="any" :required="false">

Type-specific configuration. Its shape depends on `property_type`.

</ApiParam>

<ApiParam name="validation_rules" type="any" :required="false">

Type-specific validation configuration.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this property, for sync and import correlation. Maximum 255 characters, nullable.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `github` or `jira`. Maximum 255 characters, nullable.

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
| `400`  | `invalid_request`        | Missing `display_name`/`property_type`, or an enum value outside the allowed set.    |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                      |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`              | Your role or token scope can't write workspace work item properties.                 |
| `404`  | `not_found`              | No such workspace, or it's outside your tenant.                                      |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | This workspace manages work item types at the project level.                         |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="Create a workspace property" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "display_name": "Severity",
  "property_type": "OPTION",
  "description": "How badly the customer is affected",
  "is_required": true,
  "is_multi": false,
  "options": [
    { "name": "Critical", "description": "Production is down" },
    { "name": "Major", "description": "A core workflow is broken", "is_default": true }
  ]
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "display_name": "Severity",
        "property_type": "OPTION",
        "description": "How badly the customer is affected",
        "is_required": True,
        "is_multi": False,
        "options": [
            {"name": "Critical", "description": "Production is down"},
            {"name": "Major", "description": "A core workflow is broken", "is_default": True},
        ],
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      display_name: "Severity",
      property_type: "OPTION",
      description: "How badly the customer is affected",
      is_required: true,
      is_multi: false,
      options: [
        { name: "Critical", description: "Production is down" },
        { name: "Major", description: "A core workflow is broken", is_default: true },
      ],
    }),
  },
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="201">

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
  "default_value": [],
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

<ResponsePanel status="400">

```json
{
  "type": "invalid_request",
  "code": "invalid_request",
  "detail": "The request body failed validation.",
  "errors": [
    {
      "field": "property_type",
      "code": "invalid_choice",
      "message": "\"SELECT\" is not a valid choice."
    }
  ]
}
```

</ResponsePanel>

</div>
</div>

## After creating

1. Bind it — [Create a property context](/api-reference/v2/work-item-property-contexts/create-property-context)
   decides which projects and work item types see the property.
2. For `OPTION` properties, refine the choices with
   [Property options](/api-reference/v2/workspace-work-item-property-options/overview).
3. To put the property on a workspace-level work item type directly, use
   [Attach properties to a workspace type](/api-reference/v2/workspace-work-item-type-properties/attach-workspace-type-property).
