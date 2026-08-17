---
title: Work item properties overview
description: The Plane API v2 project work item property object. Attributes, the property_type and relation_type reference, default values, inline options, and the endpoints that manage custom fields.
keywords: plane api v2, work item properties, custom fields, custom properties, property_type, relation_type, OPTION property, project properties
---

# Work item properties overview

A work item property is a custom field you define on a project. Once a property is attached to a work item type, every work item of that type can carry a value for it — a severity, a customer name, a due-by timestamp, a link to a design doc.

A property is a **definition**, not a value. It says what the field is called, what kind of data it holds, whether it is required, and what choices are available. The values themselves live on individual work items.

Properties in this group are **project-level**: they are defined inside one project and belong to that project alone. The workspace equivalent lives at [Work item properties (workspace)](/api-reference/v2/workspace-work-item-properties/list-workspace-work-item-properties).

::: warning One mode per workspace
A workspace manages work item types — and therefore their properties — in exactly one mode: **project-level** or **workspace-level**. Writing to the endpoints on this page while the workspace is in workspace mode returns `409 work_item_types_managed_at_workspace`, not a `404` or `403`. The capability exists; it just lives on the other surface. Reads are unaffected by mode. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

<div class="api-two-column">
<div class="api-left">

## The work item property object

### Attributes

- `id` _string (uuid)_

  Unique identifier for the property. This is the id you pass when attaching the property to a type or managing its options.

- `name` _string_

  The machine-readable slug for the property, derived by Plane. Read-only — it is not a create or update body field. Use it when you need a stable key in your own storage.

- `display_name` _string_

  The human-readable label shown wherever the property is rendered. This is the field you **write** on create and update. Maximum 255 characters.

- `description` _string_

  Free-form explanation of what the field is for. Surfaced as helper text next to the field.

- `property_type` _string_

  What kind of data the property holds. One of `TEXT`, `DATETIME`, `DECIMAL`, `BOOLEAN`, `OPTION`, `RELATION`, `URL`, `EMAIL`, `FILE`, or `FORMULA`. See the [property type reference](#property-type-reference) below.

- `relation_type` _string_

  What a `RELATION` property points at. One of `ISSUE`, `USER`, `RELEASE`, or `RICH_TEXT`. `null` for every other property type.

- `is_multi` _boolean_

  Whether the property accepts more than one value. A multi-select severity list, a set of assignable reviewers, several linked work items.

- `is_required` _boolean_

  Whether a value must be present. Turning this on for an existing property affects work items edited from then on — it does not retroactively fill in the blanks.

- `is_active` _boolean_

  Whether the property is currently offered. Deactivating is the reversible alternative to deleting: the definition and its recorded values stay, the field stops being offered on new edits.

- `default_value` _array of string_

  The value applied when none is supplied. Always an array, even for a single-valued property — a decimal that defaults to `3` is `["3"]`, not `3`.

- `options` _array of any_

  For `OPTION` properties, the resolved list of choices. Each entry is a property option object with its own `id`, `name`, `is_default`, and `sort_order`. Manage them through [Property options](/api-reference/v2/work-item-property-options/list-property-options), or define them inline when you [create the property](/api-reference/v2/work-item-properties/create-work-item-property).

- `settings` _any_

  Free-form object holding type-specific configuration. What it contains depends entirely on `property_type` — treat it as opaque unless you wrote the value yourself.

- `validation_rules` _any_

  Free-form object holding type-specific validation constraints. Same caveat as `settings`: the shape is per type, so read and write it as a whole rather than assuming keys.

- `logo_props` _any_

  Icon configuration used when rendering the property. Read-only through this API.

- `external_id` , `external_source` _string_

  Correlation fields for sync and import. Together they let you map a property to a field in another system and find it again later.

- `created_at` _string (date-time)_

  When the property was created.

::: tip `display_name` writes, `name` reads
These are two different fields and mixing them up is the most common first error. You send `display_name` on create; Plane derives `name` from it and returns both. There is no `name` field in a request body.
:::

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE WORK ITEM PROPERTY OBJECT">

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

</div>
</div>

## Property type reference

`property_type` is required on create and fixes what the field can hold. The **Value shape** column describes the value the property carries — `default_value` uses exactly that shape, always wrapped in an array.

| `property_type` | What it is                | Value shape                                                                      |
| --------------- | ------------------------- | -------------------------------------------------------------------------------- |
| `TEXT`          | Free-form text            | A string, for example `["Needs a repro"]`.                                       |
| `DATETIME`      | A point in time           | An ISO 8601 timestamp, for example `["2026-03-01T00:00:00Z"]`.                   |
| `DECIMAL`       | A number                  | The number expressed as a string, for example `["3"]` or `["12.5"]`.             |
| `BOOLEAN`       | A yes/no flag             | `["true"]` or `["false"]`.                                                       |
| `OPTION`        | A choice from a fixed set | One of the property's defined options. With `is_multi`, several of them.         |
| `RELATION`      | A reference to a record   | The referenced record, with `relation_type` deciding what kind. See below.       |
| `URL`           | A link                    | A URL string, for example `["https://example.com/spec"]`.                        |
| `EMAIL`         | An email address          | An address string, for example `["ana@example.com"]`.                            |
| `FILE`          | An uploaded file          | A reference to the stored file.                                                  |
| `FORMULA`       | A computed value          | Derived by Plane rather than entered by a person. Its configuration is per type. |

### `relation_type`

`relation_type` is only meaningful when `property_type` is `RELATION`. It is `null` on every other property.

| `relation_type` | Points at         |
| --------------- | ----------------- |
| `ISSUE`         | A work item       |
| `USER`          | A member          |
| `RELEASE`       | A release         |
| `RICH_TEXT`     | Rich text content |

## Endpoints

| Method   | Path                                                                         | Description                 |
| -------- | ---------------------------------------------------------------------------- | --------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/work-item-properties/`      | List work item properties   |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/work-item-properties/`      | Create a work item property |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/work-item-properties/{pk}/` | Get a work item property    |
| `PATCH`  | `/api/v2/workspaces/{slug}/projects/{project_id}/work-item-properties/{pk}/` | Update a work item property |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/work-item-properties/{pk}/` | Delete a work item property |

## Creating a property is only half the job

A property that exists is not yet a field anyone can fill in. Creating it defines the field; **attaching it to a work item type** is what makes it appear on work items.

1. Create the property with [Create a work item property](/api-reference/v2/work-item-properties/create-work-item-property).
2. Attach it to a type with [Attach a type property](/api-reference/v2/work-item-type-properties/attach-type-property).

The same property can be attached to more than one type, which is why the two steps are separate.

## Defining options

`OPTION` properties need choices. You have two paths:

- **Inline on create** — pass an `options` array in the create or update body and define the choices in the same request. `options` is write-only: you send it, and the response comes back with the resolved `options` array instead.
- **Separately** — create the property first, then add choices one at a time through [Property options](/api-reference/v2/work-item-property-options/create-property-option). Use this when options change over the life of the property.

## Deactivate before you delete

`is_active: false` stops a property from being offered without removing it. Deleting is permanent for the definition and takes its options with it. If you are retiring a field but still need to read historical values, deactivate it.
