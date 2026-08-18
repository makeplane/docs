---
title: Workspace type properties overview
description: The Plane API v2 workspace type-property resource. Which properties a workspace-level work item type shows, the attach/detach model, and the work-item-type mode rule.
keywords: plane api v2, workspace work item type properties, attach property to type, detach property, workspace work item types, custom properties
---

# Workspace type properties overview

A **workspace work item type** decides which custom properties appear on the work items that use it. This
resource is the link between the two: it lists the properties currently on a type, and it attaches and
detaches them.

```text
/api/v2/workspaces/{slug}/work-item-types/{type_id}/properties/
```

The properties themselves are not created here. They live in the workspace property catalog at
[`/work-item-properties/`](/api-reference/v2/workspace-work-item-properties/overview), and one property can be
attached to as many types as you like. That is the point of the split: define `Severity` once for the
workspace, then put it on `Bug`, `Incident`, and `Escalation`.

Because the catalog is shared, **detaching never deletes**. `DELETE` on this route removes the property from
the type and leaves the property itself — and every other type that uses it — untouched. To remove a property
from the workspace entirely, use
[Delete a workspace property](/api-reference/v2/workspace-work-item-properties/delete-workspace-work-item-property).

::: warning Writes here require workspace mode
A workspace manages work item types in exactly one mode: project-level or workspace-level. Attaching or
detaching on this route while the workspace is in **project** mode returns `409` with the code
`work_item_types_managed_at_project` — the capability exists, it just lives on the project surface. Reads are
unaffected by mode. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

<div class="api-two-column">
<div class="api-left">

## The property object

Reads on this resource return the full property object, the same shape the workspace property catalog returns.
Every field is read-only here — this route only changes which properties a type carries, never what a property
is.

### Attributes

- `id` _string (uuid)_

  Unique identifier for the property. This is the id you send in `properties` to attach it, and the `pk` you
  use to detach it.

- `name` _string_

  Read-only companion to `display_name`. You never set it directly.

- `display_name` _string_

  The label shown wherever the property is rendered.

- `description` _string_

  Free-form explanation of what the property captures. May be `null`.

- `property_type` _string_

  What kind of value the property holds. One of `TEXT`, `DATETIME`, `DECIMAL`, `BOOLEAN`, `OPTION`,
  `RELATION`, `URL`, `EMAIL`, `FILE`, or `FORMULA`.

- `relation_type` _string_

  For a `RELATION` property, what it points at — one of `ISSUE`, `USER`, `RELEASE`, or `RICH_TEXT`. `null` for
  every other property type.

- `is_required` _boolean_

  Whether a value must be supplied for this property.

- `is_multi` _boolean_

  Whether the property accepts more than one value.

- `is_active` _boolean_

  Whether the property is in use. A property can be retired by setting this to `false` on the catalog
  resource, without deleting it.

- `default_value` _array of string_

  The value applied when none is supplied. Always an array, even when `is_multi` is `false`.

- `options` _array of any_

  The choices for an `OPTION` property. Manage them through
  [Property options](/api-reference/v2/workspace-work-item-property-options/overview).

- `settings` _any_

  Type-specific configuration. Its shape depends on `property_type`.

- `validation_rules` _any_

  Type-specific validation configuration.

- `logo_props` _any_

  Presentation data for the property's icon.

- `external_id` , `external_source` _string_

  Correlation fields for sync and import. Together they let you map a property to a record in another system
  and find it again later. Either may be `null`.

- `created_at` _string (date-time)_

  When the property was created.

::: tip There is no separate link object
The response is the property, not a join record. If you need to know whether a given property is on a type,
`GET …/properties/{pk}/` — a `404` means it is not attached, and a `200` means it is.
:::

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

| Method   | Path                                                                   | Description                             |
| -------- | ---------------------------------------------------------------------- | --------------------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/work-item-types/{type_id}/properties/`      | List properties on a workspace type     |
| `GET`    | `/api/v2/workspaces/{slug}/work-item-types/{type_id}/properties/{pk}/` | Get a property on a workspace type      |
| `POST`   | `/api/v2/workspaces/{slug}/work-item-types/{type_id}/properties/`      | Attach properties to a workspace type   |
| `DELETE` | `/api/v2/workspaces/{slug}/work-item-types/{type_id}/properties/{pk}/` | Detach a property from a workspace type |

There is no `POST` that creates a property here and no `PATCH` that edits one. Attaching takes ids of
properties that already exist, and editing a property is done on the catalog resource.

## Attaching properties

`POST` takes a single field, `properties`, holding the ids of properties to attach:

```json
{ "properties": ["a7e3f1d0-5c92-4b68-8f31-2d4a6b9e0c15", "3fb6c0d8-4e21-49a7-b5c3-90ad72e14f6b"] }
```

The response echoes the ids that are now on the type. An id that does not exist in this workspace is rejected
with `400 invalid_request` — a cross-tenant id is never silently ignored.

## Where a property applies

Attaching a property to a type is a statement about the type, which lives at the workspace level. When you
need narrower scoping — this property on these projects only, or across a chosen set of types — model it with
[Property contexts](/api-reference/v2/work-item-property-contexts/overview) instead.
