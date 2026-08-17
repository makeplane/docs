---
title: Type properties overview
description: How a Plane work item type exposes custom properties in API v2 — the attach/detach link, the property object reads return, and mode conflicts.
keywords: plane api v2, work item type properties, attach property to type, detach property, custom properties, issue type properties
---

# Type properties overview

A work item type — `Bug`, `Feature`, `Task` — decides which custom properties a work item of that type collects. This
resource is the link between the two. It lists the properties a type currently exposes, attaches more, and detaches
them.

::: warning This resource attaches properties — it does not create them
There is no create here, and no update at all. A property is a **project-level** object with its own lifecycle: it is
defined once under `/work-item-properties/` and can be exposed by several types.

- To define a new property, use
  [Create a work item property](/api-reference/v2/work-item-properties/create-work-item-property).
- To edit its `display_name`, `is_required`, options, or any other field, use
  [Update a work item property](/api-reference/v2/work-item-properties/update-work-item-property).
- To make an existing property appear on a type, use
  [Attach a property to a type](/api-reference/v2/work-item-type-properties/attach-type-property) — the `POST` on this
  path takes ids of properties that already exist.

`POST`ing a property definition (`display_name`, `property_type`, …) to this path is a `400`. It only accepts a list of
ids.
:::

So adding a new field to a type is two calls: create the property in the project, then attach it to the type. The
payoff is that "Severity" can be one definition shared by `Bug` and `Incident` instead of two definitions that drift
apart.

<div class="api-two-column">
<div class="api-left">

## The property object

Reads on this path return the **full property definition**, not a thin link object. One call to
[List type properties](/api-reference/v2/work-item-type-properties/list-type-properties) gives you everything needed to
render the type's form — field labels, input types, option lists — with no second lookup under
`/work-item-properties/`.

Every field is read-only here. Changing a definition goes through
[Update a work item property](/api-reference/v2/work-item-properties/update-work-item-property).

### Attributes

- `id` _string (uuid)_

  Unique identifier for the property. This is the id you send to attach it, and the `pk` you delete to detach it.

- `name` _string_

  Machine-readable name, slugified by Plane from `display_name`. Use `id` for lookups — `name` follows the label.

- `display_name` _string_

  The label shown on the work item form.

- `description` _string_

  Free-form explanation of what the property captures. Nullable.

- `property_type` _string_

  What kind of value the property holds. One of `TEXT`, `DATETIME`, `DECIMAL`, `BOOLEAN`, `OPTION`, `RELATION`, `URL`,
  `EMAIL`, `FILE`, or `FORMULA`. This is the field to branch on when you build an input or parse a value.

- `relation_type` _string_

  For a `RELATION` property, what it points at: `ISSUE`, `USER`, `RELEASE`, or `RICH_TEXT`. `null` for every other
  `property_type`.

- `is_required` _boolean_

  Whether a value must be supplied on work items of a type that exposes this property.

- `is_multi` _boolean_

  Whether the property holds several values instead of one.

- `is_active` _boolean_

  Whether the property is currently enabled. This lives on the property, not on the link — deactivating affects every
  type the property is attached to, while detaching affects only one type.

- `default_value` _array of string_

  Values applied when a work item is created without an explicit value for this property.

- `settings` _any_

  Type-specific configuration. The shape depends on `property_type`.

- `validation_rules` _any_

  Constraints applied to submitted values. The shape depends on `property_type`.

- `logo_props` _any_

  Icon and appearance metadata used when the property is rendered.

- `external_id` , `external_source` _string_

  Correlation fields for sync and import. Together they map a property to a record in another system.

- `created_at` _string (date-time)_

  When the property was created.

- `options` _array of any_

  For an `OPTION` property, its selectable options inline — each with `id`, `name`, `description`, `is_default`,
  `sort_order`, `external_id`, and `external_source`. An empty array for every other `property_type`. Manage them with
  [Property options](/api-reference/v2/work-item-property-options/overview).

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE PROPERTY OBJECT">

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

</div>
</div>

## Endpoints

| Method   | Path                                                                                         | Description                     |
| -------- | -------------------------------------------------------------------------------------------- | ------------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/work-item-types/{type_id}/properties/`      | List the properties on a type   |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/work-item-types/{type_id}/properties/`      | Attach properties to a type     |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/work-item-types/{type_id}/properties/{pk}/` | Get one property through a type |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/work-item-types/{type_id}/properties/{pk}/` | Detach a property from a type   |

`{pk}` is the **property id**, not a separate link id. The same id you attach is the id you delete.

## Attaching

`POST` takes `{"properties": ["<uuid>", …]}` and appends those properties to the type. The response is `201` with a
`properties` array.

- Only properties belonging to the **same project** can be attached. An id from another project is a
  `400 invalid_request` that names the offending ids, never a silent skip — one bad id rejects the whole call.
- Re-attaching a property the type already exposes is harmless. The call still returns `201` and the type is not left
  with a duplicate, so a replayed request is safe.

## Detaching

`DELETE .../properties/{pk}/` removes the link and returns `204`.

::: warning Detaching clears stored values
The property definition survives — it stays in the project and stays attached to every other type that uses it, ready
to re-attach. What does not survive is the data: the values already recorded for that property on work items **of this
type** are removed with the link, and re-attaching does not bring them back.

Deleting the definition outright is a different call —
[Delete a work item property](/api-reference/v2/work-item-properties/delete-work-item-property).
:::

## Mode matters for writes, not reads

Attaching and detaching are **project-mode** writes. If the workspace manages work item types at the workspace level,
both return `409 work_item_types_managed_at_workspace` — the capability exists, it just lives on the other surface. Use
[Attach a property to a workspace type](/api-reference/v2/workspace-work-item-type-properties/attach-workspace-type-property)
instead.

Reads are unaffected: listing and retrieving a type's properties works in either mode.

See [Work item type modes](/api-reference/v2/work-item-type-modes) for how to tell which mode a workspace is in.

## Changed from v1

- In v1 a property was created **inside** a type, at
  `POST /api/v1/workspaces/{slug}/projects/{project_id}/work-item-types/{type_id}/work-item-properties/`, so it belonged
  to that one type.
- In v2 the definition moved up to the project (`/work-item-properties/`) and this path became a link:
  `POST` attaches existing properties, `DELETE` detaches one. There is no create and no update here.
- One property can now be attached to several types.

See [Migrating from v1](/api-reference/v2/migrating-from-v1) for the full list.
