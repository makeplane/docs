---
title: Property options overview
description: The Plane API v2 work item property option object. Attributes, the default option, sort order, how options relate to OPTION-typed properties, and project-mode write rules.
keywords: plane api v2, work item property options, option property, is_default option, sort_order, project properties, custom property choices
---

# Property options overview

A property option is one selectable choice on a project-level work item property. Options exist **only** for properties whose `property_type` is `OPTION` — a property of any other type (`TEXT`, `DATETIME`, `DECIMAL`, `BOOLEAN`, `RELATION`, `URL`, `EMAIL`, `FILE`, or `FORMULA`) has no options to manage. Start at
[Work item properties](/api-reference/v2/work-item-properties/overview) to create the property itself, then use this sub-resource to manage the choices it offers.

Each option belongs to exactly one property, which belongs to exactly one project. The path carries all three ancestors, and every id in it is checked: an option id that belongs to a different property — or a property that belongs to a different project — returns `404`, never another property's data.

::: info Two ways to create options
When you create an `OPTION` property you can pass its choices inline through the property's write-only `options` field, which sets up the property and its full list of choices in a single request. This sub-resource is how you manage those choices **afterwards** — adding a new one, renaming it, moving the default, or removing a choice that is no longer offered.
:::

<div class="api-two-column">
<div class="api-left">

## The property option object

### Attributes

- `id` _string (uuid)_

  Unique identifier for the option. This is the value stored on a work item when someone picks this choice, so treat it as the stable handle and `name` as the label.

- `name` _string_

  The label shown in the picker, for example `Critical`. Maximum 255 characters.

- `description` _string_

  Free-form explanation of what the option means. Useful when a choice needs a definition that a one-word label can't carry.

- `is_default` _boolean_

  Whether this option is preselected when a work item is created without an explicit value for the property.

- `sort_order` _number_

  Ordering weight within the property. Lower values sort first. Plane assigns it when the option is created — it is not something you send.

- `external_id` , `external_source` _string_

  Correlation fields for sync and import. Together they let you map an option to a choice in another system and find it again later. Both are nullable.

::: tip Store the id, not the name
Work item property values reference an option by `id`. If you match on `name` instead, renaming `Critical` to `Sev 1` silently breaks your integration, while the `id` keeps resolving.
:::

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE PROPERTY OPTION OBJECT">

```json
{
  "id": "9d3b5c71-2e48-4a6f-b1c9-7f0e83d25a64",
  "name": "Critical",
  "description": "Customer-visible outage",
  "is_default": false,
  "sort_order": 15000,
  "external_id": null,
  "external_source": null
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                                                               | Description              |
| -------- | -------------------------------------------------------------------------------------------------- | ------------------------ |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/work-item-properties/{property_id}/options/`      | List property options    |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/work-item-properties/{property_id}/options/{pk}/` | Get a property option    |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/work-item-properties/{property_id}/options/`      | Create a property option |
| `PATCH`  | `/api/v2/workspaces/{slug}/projects/{project_id}/work-item-properties/{property_id}/options/{pk}/` | Update a property option |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/work-item-properties/{property_id}/options/{pk}/` | Delete a property option |

`DELETE` returns `204` with an empty body.

## What you can write

The read shape and the write shape are deliberately different. Five fields are writable, and `name` is the only one that is required:

| Field             | Create            | Update   |
| ----------------- | ----------------- | -------- |
| `name`            | required, max 255 | optional |
| `description`     | optional          | optional |
| `is_default`      | optional          | optional |
| `external_id`     | optional, max 255 | optional |
| `external_source` | optional, max 255 | optional |

`id` and `sort_order` are read-only. `sort_order` is not accepted on create or update — Plane assigns and maintains it, so there is no request that repositions an option through this endpoint.

## Project mode only

Writes here are **project-mode** writes. A workspace manages work item types and their properties in exactly one mode: project-level or workspace-level.

::: warning Wrong mode returns 409, not 404
If the workspace is running in **workspace mode**, `POST`, `PATCH`, and `DELETE` on this path return `409` with the code `work_item_types_managed_at_workspace`. Nothing is missing and nothing is forbidden — the capability lives on the workspace surface instead. Manage those options through [Property options (workspace)](/api-reference/v2/workspace-work-item-property-options/overview).

Reads are unaffected by mode. `GET` on this path keeps working in either mode, so a project still lists the options of the properties it surfaces.

See [Work item type modes](/api-reference/v2/work-item-type-modes) for how to detect which mode a workspace is in before you write.
:::

## Scopes

| Operation                 | Scope                                 |
| ------------------------- | ------------------------------------- |
| `GET` (list, retrieve)    | `projects.work_item_properties:read`  |
| `POST`, `PATCH`, `DELETE` | `projects.work_item_properties:write` |

Options are covered by the property scopes — there is no separate option scope to request.
