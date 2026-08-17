---
title: Update a work item property
description: Update a custom work item property in a Plane project with the v2 REST API. Partial PATCH semantics, default values, inline options, is_active, OAuth scopes, error codes, and code examples.
keywords: plane api v2, update work item property, patch custom field, default_value, is_active, is_required, options, PATCH work item property
---

# Update a work item property

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-properties/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Change a property's label, description, default, requirement, or availability. Values already recorded on work items stay where they are — you are editing the field definition, not rewriting anyone's data.

`PATCH` is partial. Send only the fields you want to change; anything you omit keeps its current value. Omitting a field is not the same as sending `null`.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the property belongs to.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The id of the property to update.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

Every field is optional — send the subset you are changing. There is no `name` field: `name` is the read-side slug, and `display_name` is what you write.

<div class="params-list">

<ApiParam name="display_name" type="string" :required="false">

New human-readable label for the field. Maximum 255 characters.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Free-form explanation of what the field is for, shown as helper text.

</ApiParam>

<ApiParam name="property_type" type="string" :required="false">

The kind of data the field holds: `TEXT`, `DATETIME`, `DECIMAL`, `BOOLEAN`, `OPTION`, `RELATION`, `URL`, `EMAIL`, `FILE`, or `FORMULA`.

Changing the type of a property that already holds values changes what those values mean, so treat this as a migration rather than an edit — in most cases creating a new property and retiring the old one with `is_active: false` is the safer move. The full reference is on the [properties overview](/api-reference/v2/work-item-properties/overview#property-type-reference).

</ApiParam>

<ApiParam name="relation_type" type="string" :required="false">

What a `RELATION` property points at: `ISSUE`, `USER`, `RELEASE`, or `RICH_TEXT`. Only meaningful when `property_type` is `RELATION`.

</ApiParam>

<ApiParam name="options" type="array of object" :required="false">

Write-only. Define `OPTION` choices inline, the same way you can on create. Each entry is a property option object with `name` required.

For adding, editing, or removing a single choice on a live property, prefer the dedicated endpoints under [Property options](/api-reference/v2/work-item-property-options/list-property-options) — they let you address one option by id instead of restating the set. The response always returns the resolved `options` array, never the payload you sent.

</ApiParam>

<ApiParam name="is_multi" type="boolean" :required="false">

Whether the field accepts more than one value. Turning it off on a property that already holds several values per work item is a narrowing change — check your data first.

</ApiParam>

<ApiParam name="is_required" type="boolean" :required="false">

Whether a value must be present. This applies going forward: existing work items with the field empty are not rejected retroactively, but the next edit will ask for a value. Pair it with a `default_value` so automated flows have something to fall back on.

</ApiParam>

<ApiParam name="is_active" type="boolean" :required="false">

Whether the property is offered. Setting `false` is the reversible way to retire a field — the definition, its options, and its recorded values all survive, and the field simply stops being offered.

</ApiParam>

<ApiParam name="default_value" type="array of string" :required="false">

The value applied when none is supplied. **Always an array**, even for a single-valued property — a `DECIMAL` field that defaults to `3` is sent as `["3"]`, not `3`. Send `[]` to clear the default.

</ApiParam>

<ApiParam name="settings" type="any" :required="false">

Free-form object holding type-specific configuration. The shape depends on `property_type`, so send the whole object rather than assuming keys — a partial `settings` object replaces the stored one.

</ApiParam>

<ApiParam name="validation_rules" type="any" :required="false">

Free-form object holding type-specific validation constraints. Same whole-object caveat as `settings`.

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
| `400`  | `invalid_request`        | An enum value outside the list, or a field over its length limit.                                                     |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                                                       |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.                                  |
| `403`  | `forbidden`              | Your role or token scope can't update properties.                                                                     |
| `404`  | `not_found`              | No such property, project, or workspace — or it's outside your tenant.                                                |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                                                  |
| `409`  | `conflict`               | This workspace manages work item types at the workspace level. Update the property on the workspace endpoint instead. |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                                              |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                                                   |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                                                            |

</div>

::: warning A 409 means wrong surface, not missing permission
If the workspace manages work item types at the workspace level, this project endpoint returns `409 work_item_types_managed_at_workspace` — the write belongs on [Update a workspace work item property](/api-reference/v2/workspace-work-item-properties/update-workspace-work-item-property) instead. Reading the same property through this path still works. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

::: info `name` is not writable
`name` is derived by Plane and returned on reads only. Renaming the field means sending a new `display_name`.
:::

</div>

<div class="api-right">

<CodePanel title="Update a work item property" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/c81b7e2a-5f34-4d90-8e17-3a6c9b0f2d75/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "display_name": "Story points",
  "is_required": true,
  "default_value": ["3"]
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/c81b7e2a-5f34-4d90-8e17-3a6c9b0f2d75/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "display_name": "Story points",
        "is_required": True,
        "default_value": ["3"],
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/c81b7e2a-5f34-4d90-8e17-3a6c9b0f2d75/",
  {
    method: "PATCH",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      display_name: "Story points",
      is_required: true,
      default_value: ["3"],
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
  "id": "c81b7e2a-5f34-4d90-8e17-3a6c9b0f2d75",
  "name": "story_points",
  "display_name": "Story points",
  "description": "Relative sizing for planning",
  "property_type": "DECIMAL",
  "relation_type": null,
  "is_multi": false,
  "is_required": true,
  "is_active": true,
  "default_value": ["3"],
  "options": [],
  "settings": {},
  "validation_rules": {},
  "logo_props": {},
  "external_id": null,
  "external_source": null,
  "created_at": "2026-01-14T09:24:03.117482Z"
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

</div>
</div>

## Retiring a field without losing data

Deleting a property is permanent. When you want a field to stop appearing but its history to stay readable, deactivate it:

```json
{
  "is_active": false
}
```

The definition, its options, and every value already recorded stay in place, and setting `is_active` back to `true` brings the field back exactly as it was.
