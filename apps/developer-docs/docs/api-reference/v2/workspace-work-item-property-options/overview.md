---
title: Workspace property options overview
description: The Plane API v2 workspace-level work item property option object. Attributes, the single default option, server-assigned sort order, and the mode rule that governs writes.
keywords: plane api v2, workspace property options, work item property options, OPTION property, dropdown choices, is_default, sort_order
---

# Workspace property options overview

An option is one selectable choice on a workspace-level custom property whose `property_type` is `OPTION` — the entries a person picks from when filling that property in on a work item.

Options hang off the property, not off a project. The path carries no project segment:

```text
/api/v2/workspaces/{slug}/work-item-properties/{property_id}/options/
```

A property of any other type has no options. Adding one to a `TEXT`, `BOOLEAN`, `DECIMAL` or other non-`OPTION` property is rejected with `400 invalid_request`, so create the property with `property_type: "OPTION"` first — see [Workspace work item properties](/api-reference/v2/workspace-work-item-properties/overview).

<div class="api-two-column">
<div class="api-left">

## The property option object

### Attributes

- `id` _string (uuid)_

  Unique identifier for the option. This is the value you store when you set the property on a work item, so treat it as the stable handle — `name` is only a label.

- `name` _string_

  The choice as it is displayed. Maximum 255 characters.

- `description` _string_

  Free-form text explaining when to pick this choice.

- `is_default` _boolean_

  Whether this is the property's default choice. At most one option per property can carry it.

- `sort_order` _number_

  Position of the option within the property's list. Lower values come first, and this is the order the list endpoint returns by default. Assigned by Plane — it is not a writable field.

- `external_id` , `external_source` _string_

  Correlation fields for sync and import. Together they let you map an option to a record in another system and find it again later.

::: tip Store the id, not the name
Renaming an option keeps its `id`, so integrations that matched on `id` keep working and integrations that matched on `name` break. Resolve names to ids once, then reference ids.
:::

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE PROPERTY OPTION OBJECT">

```json
{
  "id": "c31a7e04-5f6b-4d29-8a13-7e0c2b9f4a65",
  "name": "Production",
  "description": "Reported on live customer traffic",
  "is_default": true,
  "sort_order": 10000,
  "external_id": null,
  "external_source": null
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                                         | Description   |
| -------- | ---------------------------------------------------------------------------- | ------------- |
| `GET`    | `/api/v2/workspaces/{slug}/work-item-properties/{property_id}/options/`      | List options  |
| `POST`   | `/api/v2/workspaces/{slug}/work-item-properties/{property_id}/options/`      | Create option |
| `GET`    | `/api/v2/workspaces/{slug}/work-item-properties/{property_id}/options/{pk}/` | Get option    |
| `PATCH`  | `/api/v2/workspaces/{slug}/work-item-properties/{property_id}/options/{pk}/` | Update option |
| `DELETE` | `/api/v2/workspaces/{slug}/work-item-properties/{property_id}/options/{pk}/` | Delete option |

## Scopes

| Operation                 | Scope                                   |
| ------------------------- | --------------------------------------- |
| `GET` (list, retrieve)    | `workspaces.work_item_properties:read`  |
| `POST`, `PATCH`, `DELETE` | `workspaces.work_item_properties:write` |

Options are covered by the workspace property scopes — there is no separate option scope to request, and the project-level scope root (`projects.work_item_properties:*`) does not grant access here.

## Writes are workspace-mode only

::: warning Wrong mode is a 409, not a 404
A workspace manages work item types and their properties in exactly one mode. These endpoints are the workspace-mode surface, so `POST`, `PATCH`, and `DELETE` here require workspace mode. Call them while the workspace is in project mode and you get `409 work_item_types_managed_at_project` — the capability exists, it just lives on the project-level surface.

Reads are unaffected by mode: `GET` works in either mode. See [Work item type modes](/api-reference/v2/work-item-type-modes) for how to check which mode a workspace is in, and [Property options (project)](/api-reference/v2/work-item-property-options/overview) for the project-level equivalent.
:::

## Only one option can be the default

Setting `is_default: true` while another option on the same property already has it is rejected with `400 invalid_request`. There is no automatic hand-off. To move the default, clear it on the current holder first:

1. `PATCH` the current default with `{"is_default": false}`.
2. `PATCH` (or `POST`) the new option with `{"is_default": true}`.

## Sort order is assigned, not sent

`sort_order` is not part of the request body on either create or update. A new option is appended after the existing ones, so the creation order is the display order. If you need a specific order, create the options in that order.

## Options are also inlined on the property

A property read returns its `options` array inline, so fetching the property is enough when you only need the choices for rendering. Reach for these endpoints when you need to page through a long option list, or to add, rename, or remove a choice. Which work items and projects the property applies to is decided by its contexts — see [Property contexts](/api-reference/v2/work-item-property-contexts/overview).

## Changed from v1

- v1 had no workspace-level surface. Options existed only under `/projects/{project_id}/work-item-properties/{property_id}/options/`; a workspace-level property's options now live at the workspace path with no project segment.
- The scope is `workspaces.work_item_properties:read` / `:write`. v1 used `projects.work_item_property_options:*`.
- The read shape is trimmed to `id`, `name`, `description`, `is_default`, `sort_order`, `external_id`, and `external_source`. `workspace`, `project`, `property`, `parent`, `logo_props`, `is_active`, and the `created_*` / `updated_*` audit fields are no longer returned.
- `is_active` and `parent` are no longer accepted on write.

See [Migrating from v1](/api-reference/v2/migrating-from-v1) for the full list.
