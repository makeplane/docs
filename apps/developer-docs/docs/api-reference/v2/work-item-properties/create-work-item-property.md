---
title: Create a work item property
description: Define a custom work item property in a Plane project with the v2 REST API. property_type and relation_type enums, inline options, default values, OAuth scopes, error codes, and code examples.
keywords: plane api v2, create work item property, custom field, property_type, relation_type, inline options, default_value, POST work item properties
---

# Create a work item property

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-properties/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Define a new custom field in a project. You choose a label and a `property_type`, and Plane returns the property definition — including the derived `name` slug you can key off in your own storage.

Two things to know before you send this request:

- **Creating a property does not put it on any work item.** The definition exists, but nothing renders it until you attach it to a work item type with [Attach a type property](/api-reference/v2/work-item-type-properties/attach-type-property).
- **You write `display_name`, not `name`.** `name` is the read-side slug Plane derives; it is not a body field.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project to define the property in. Project-level properties belong to this project alone.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="display_name" type="string" :required="true">

The human-readable label for the field, for example `Severity`. Maximum 255 characters. Plane derives the read-only `name` slug from this value and returns both.

</ApiParam>

<ApiParam name="property_type" type="string" :required="true">

What kind of data the field holds. This is the decision that shapes everything else about the property.

- `TEXT` — Free-form text
- `DATETIME` — A point in time, written as an ISO 8601 timestamp
- `DECIMAL` — A number, carried as a string in the value array
- `BOOLEAN` — A yes/no flag
- `OPTION` — A choice from a fixed set you define
- `RELATION` — A reference to another record; pair it with `relation_type`
- `URL` — A link
- `EMAIL` — An email address
- `FILE` — An uploaded file
- `FORMULA` — A value Plane computes rather than one a person enters

The full reference, including what each type means for the value you send on a work item, is on the [properties overview](/api-reference/v2/work-item-properties/overview#property-type-reference).

</ApiParam>

<ApiParam name="relation_type" type="string" :required="false">

What a `RELATION` property points at. Only meaningful when `property_type` is `RELATION` — leave it out otherwise.

- `ISSUE` — A work item
- `USER` — A member
- `RELEASE` — A release
- `RICH_TEXT` — Rich text content

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Free-form explanation of what the field is for. Worth filling in — it is the helper text people read when deciding what to type.

</ApiParam>

<ApiParam name="options" type="array of object" :required="false">

Write-only. Define the choices for an `OPTION` property inline, in the same request that creates it, instead of a second round-trip per choice.

Each entry is a property option object — `name` is required, and `description`, `is_default`, `external_id`, and `external_source` are accepted. See [Create a property option](/api-reference/v2/work-item-property-options/create-property-option) for the full field list.

You never get `options` back in the shape you sent it. The response carries the resolved `options` array, with each choice's generated `id` and `sort_order`.

</ApiParam>

<ApiParam name="is_multi" type="boolean" :required="false">

Allow more than one value on a work item — a multi-select list of severities, a set of reviewers, several linked work items. Leave it off for a single-valued field.

</ApiParam>

<ApiParam name="is_required" type="boolean" :required="false">

Force a value to be present. Give a required property a `default_value` so existing flows have something to fall back on.

</ApiParam>

<ApiParam name="is_active" type="boolean" :required="false">

Whether the property is offered. Create it inactive if you want to define the field and its options now but roll it out later.

</ApiParam>

<ApiParam name="default_value" type="array of string" :required="false">

The value applied when none is supplied. **Always an array**, even for a single-valued property — a `DECIMAL` field that defaults to `3` is sent as `["3"]`, not `3`. A property with no default sends `[]` or omits the field.

For an `OPTION` property, mark the default choice with `is_default` on the option itself rather than repeating it here.

</ApiParam>

<ApiParam name="settings" type="any" :required="false">

Free-form object holding type-specific configuration. What belongs in it depends entirely on `property_type`, so there is no single schema — send the whole object rather than assuming keys.

</ApiParam>

<ApiParam name="validation_rules" type="any" :required="false">

Free-form object holding type-specific validation constraints. Same shape caveat as `settings`.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this field, for sync and import correlation. Maximum 255 characters.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `jira` or `linear`. Maximum 255 characters.

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

`projects.work_item_properties:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                                                 |
| ------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | Missing `display_name` or `property_type`, or an enum value outside the list.                                         |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                                                       |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.                                  |
| `403`  | `forbidden`              | Your role or token scope can't create properties.                                                                     |
| `404`  | `not_found`              | No such workspace or project, or it's outside your tenant.                                                            |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                                                  |
| `409`  | `conflict`               | This workspace manages work item types at the workspace level. Create the property on the workspace endpoint instead. |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                                              |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                                                   |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                                                            |

</div>

::: warning A 409 means wrong surface, not missing permission
If the workspace manages work item types at the workspace level, this project endpoint returns `409 work_item_types_managed_at_workspace`. Nothing is broken and no permission is missing — the same property is created through [Create a workspace work item property](/api-reference/v2/workspace-work-item-properties/create-workspace-work-item-property). See [Work item type modes](/api-reference/v2/work-item-type-modes) for how to detect which mode you are in.
:::

</div>

<div class="api-right">

<CodePanel title="Create a work item property" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "display_name": "Severity",
  "description": "How badly this affects customers",
  "property_type": "OPTION",
  "is_multi": false,
  "is_required": true,
  "is_active": true,
  "options": [
    { "name": "Critical", "description": "Production is down" },
    { "name": "Major", "description": "A core workflow is broken", "is_default": true },
    { "name": "Minor", "description": "Cosmetic or low impact" }
  ]
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "display_name": "Severity",
        "description": "How badly this affects customers",
        "property_type": "OPTION",
        "is_multi": False,
        "is_required": True,
        "is_active": True,
        "options": [
            {"name": "Critical", "description": "Production is down"},
            {"name": "Major", "description": "A core workflow is broken", "is_default": True},
            {"name": "Minor", "description": "Cosmetic or low impact"},
        ],
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      display_name: "Severity",
      description: "How badly this affects customers",
      property_type: "OPTION",
      is_multi: false,
      is_required: true,
      is_active: true,
      options: [
        { name: "Critical", description: "Production is down" },
        { name: "Major", description: "A core workflow is broken", is_default: true },
        { name: "Minor", description: "Cosmetic or low impact" },
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

<ResponsePanel status="409">

```json
{
  "type": "conflict",
  "code": "work_item_types_managed_at_workspace",
  "detail": "Work item types are managed at the workspace level for this workspace."
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

## Creating a relation property

A `RELATION` property needs `relation_type` to say what it points at. This one lets a work item name several reviewers:

```json
{
  "display_name": "Reviewer",
  "description": "Who signs this off",
  "property_type": "RELATION",
  "relation_type": "USER",
  "is_multi": true
}
```

`relation_type` stays `null` on every non-`RELATION` property.

## After you create

1. **Attach it to a type.** [Attach a type property](/api-reference/v2/work-item-type-properties/attach-type-property) is what makes the field appear on work items. One property can be attached to several types.
2. **Add or adjust options later.** Inline `options` covers the initial set; [Property options](/api-reference/v2/work-item-property-options/list-property-options) handles changes over the property's life.
