---
title: Workspace work item properties overview
description: The Plane API v2 workspace work item property object. Property types, relation types, options, and how contexts decide where a workspace property applies.
keywords: plane api v2, workspace work item properties, custom properties, custom fields, property_type, relation_type, property contexts
---

# Workspace work item properties overview

A workspace work item property is a custom field defined **once for the whole workspace** — `Severity`,
`Customer impact`, `Rollout date` — instead of being redefined project by project. It is the workspace-level
counterpart to project work item properties.

```text
/api/v2/workspaces/{slug}/work-item-properties/
```

::: warning Defining a property is not the same as applying it
Creating a property here adds it to the workspace catalog. It does not put it on any work item. A property
reaches work items through a **context**, which binds it to projects and work item types. A workspace property
with no context is defined but not yet applied anywhere. See
[Property contexts](/api-reference/v2/work-item-property-contexts/overview).
:::

::: warning Writes require workspace mode
A workspace manages work item types in exactly one mode: project-level or workspace-level. Creating, updating,
or deleting on this route while the workspace is in **project** mode returns `409` with the code
`work_item_types_managed_at_project` — the capability lives on the project surface instead. Reads are
unaffected by mode. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

<div class="api-two-column">
<div class="api-left">

## The property object

### Attributes

- `id` _string (uuid)_

  Unique identifier for the property. This is the id you use in a context's payload and when attaching the
  property to a workspace work item type.

- `name` _string_

  Read-only companion to `display_name`. You never set it directly.

- `display_name` _string_

  The label shown wherever the property is rendered. This is the field you write. Maximum 255 characters.

- `description` _string_

  Free-form explanation of what the property captures. May be `null`.

- `property_type` _string_

  What kind of value the property holds. One of `TEXT`, `DATETIME`, `DECIMAL`, `BOOLEAN`, `OPTION`,
  `RELATION`, `URL`, `EMAIL`, `FILE`, or `FORMULA`. This is the one decision worth getting right up front —
  it determines what the other fields mean.

- `relation_type` _string_

  For a `RELATION` property, what the property points at. One of `ISSUE`, `USER`, `RELEASE`, or `RICH_TEXT`.
  `null` for every other property type.

- `is_required` _boolean_

  Whether a value must be supplied for this property.

- `is_multi` _boolean_

  Whether the property accepts more than one value.

- `is_active` _boolean_

  Whether the property is in use. Set it to `false` to retire a property without deleting it.

- `default_value` _array of string_

  The value applied when none is supplied. Always an array, even when `is_multi` is `false`.

- `options` _array of any_

  The choices for an `OPTION` property. Read-only on this object — manage the list through
  [Property options](/api-reference/v2/workspace-work-item-property-options/overview), or seed it at create
  time with the write-only `options` body field.

- `settings` _any_

  Type-specific configuration. Its shape depends on `property_type`.

- `validation_rules` _any_

  Type-specific validation configuration.

- `logo_props` _any_

  Presentation data for the property's icon.

- `external_id` , `external_source` _string_

  Correlation fields for sync and import. Together they let you map a property to a field in another system
  and find it again later. Either may be `null`.

- `created_at` _string (date-time)_

  When the property was created.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE PROPERTY OBJECT">

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

</div>
</div>

## Endpoints

| Method   | Path                                                   | Description                           |
| -------- | ------------------------------------------------------ | ------------------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/work-item-properties/`      | List workspace work item properties   |
| `GET`    | `/api/v2/workspaces/{slug}/work-item-properties/{pk}/` | Get a workspace work item property    |
| `POST`   | `/api/v2/workspaces/{slug}/work-item-properties/`      | Create a workspace work item property |
| `PATCH`  | `/api/v2/workspaces/{slug}/work-item-properties/{pk}/` | Update a workspace work item property |
| `DELETE` | `/api/v2/workspaces/{slug}/work-item-properties/{pk}/` | Delete a workspace work item property |

## Property types

`property_type` decides how the value is captured and which of the other fields matter.

| `property_type` | What it holds                                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `TEXT`          | Free-form text                                                                                                         |
| `DATETIME`      | A date and time                                                                                                        |
| `DECIMAL`       | A number                                                                                                               |
| `BOOLEAN`       | True or false                                                                                                          |
| `OPTION`        | A choice from a defined list — see [Property options](/api-reference/v2/workspace-work-item-property-options/overview) |
| `RELATION`      | A pointer to another record — pair it with `relation_type`                                                             |
| `URL`           | A link                                                                                                                 |
| `EMAIL`         | An email address                                                                                                       |
| `FILE`          | A file                                                                                                                 |
| `FORMULA`       | A formula-backed value                                                                                                 |

`relation_type` is only meaningful for `RELATION`, and takes `ISSUE`, `USER`, `RELEASE`, or `RICH_TEXT`. On
every other property type it is `null`.

## Contexts decide where a property applies

The catalog answers "what properties exist in this workspace". A **context** answers "where does this one show
up". Each context binds the property to a set of projects and work item types — named explicitly through
`project_ids` and `issue_type_ids`, or opened up with `applies_to_all_projects` and
`applies_to_all_work_item_types` — and carries its own `is_required`, `is_multi`, `default_value`, `options`,
and `sort_order`.

So the usual sequence is:

1. `POST /work-item-properties/` — define the property once.
2. `POST /work-item-properties/{property_id}/contexts/` — say where it applies.

Skip step 2 and the property exists but appears nowhere. Full detail lives in
[Property contexts](/api-reference/v2/work-item-property-contexts/overview).

## Related resources

- [Property options](/api-reference/v2/workspace-work-item-property-options/overview) — the choices behind an
  `OPTION` property.
- [Workspace type properties](/api-reference/v2/workspace-work-item-type-properties/overview) — attach an
  existing property to a workspace-level work item type.
- [Work item type modes](/api-reference/v2/work-item-type-modes) — which surface your workspace writes to.
