---
title: Workspace work item types overview
description: The Plane API v2 workspace work item type object. Attributes, workspace mode versus project mode, defaults, and how projects pick up workspace-level types.
keywords: plane api v2, workspace work item types, issue types, workspace mode, work item type modes, shared taxonomy
---

# Workspace work item types overview

A work item type classifies work — `Bug`, `Task`, `Feature`, `Incident` — and carries the set of custom properties that work items of that type collect.

When a workspace manages types at the **workspace level**, a type is defined once for the whole workspace and made available to projects, instead of being recreated project by project. One `Bug` definition, one set of properties, every project reading from the same list.

These endpoints hang off the workspace and have no project segment:

```text
/api/v2/workspaces/{slug}/work-item-types/
```

::: warning Writes require workspace mode
A workspace manages work item types in exactly one mode: project-level or workspace-level. Creating, updating, deleting, or marking a default here works only while the workspace is in **workspace mode**. In project mode the same calls return `409` with code `work_item_types_managed_at_project` — the capability exists, it just lives on the project endpoints. **Reads are unaffected by mode.** See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

<div class="api-two-column">
<div class="api-left">

## The work item type object

### Attributes

- `id` _string (uuid)_

  Unique identifier for the type. This is the id you send as `type_id` on a work item, and the id you pass when importing types into a project.

- `name` _string_

  Display name, for example `Bug`. Maximum 255 characters.

- `description` _string_

  What this type is for. Shown next to the type wherever it is picked in Plane, so it is worth writing for the people choosing, not for your integration.

- `is_active` _boolean_

  Whether the type can currently be selected. Deactivating a type retires it from pickers without deleting it or touching the work items already using it.

- `is_default` _boolean_

  Whether this is the workspace's default type. Read-only on create and update — change it with [Mark a type as default](/api-reference/v2/workspace-work-item-types/mark-default-workspace-work-item-type).

- `is_epic` _boolean_

  Whether the type is an epic type. Read-only, and there is no body parameter for it: every type you create through this API is a standard work item type.

- `level` _number_

  The type's level in the work item hierarchy. Read-only, and one of the values you can sort by with `order_by`.

- `logo_props` _any_

  Free-form icon metadata Plane uses to render the type's badge. Managed in the app — read-only over the API.

- `created_at` _string (date-time)_

  When the type was created.

::: info `external_id` is write-only
You can send `external_id` and `external_source` when creating or updating a type so an import can correlate it with a record in your own system, but neither field comes back on read. Keep your own mapping from your id to the Plane `id`.
:::

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE WORK ITEM TYPE OBJECT">

```json
{
  "id": "c1a7d3f4-6b28-4e90-8d15-2f7a0b9c4e63",
  "name": "Bug",
  "description": "Something is broken and needs a fix",
  "is_active": true,
  "is_default": false,
  "is_epic": false,
  "level": 0,
  "logo_props": {},
  "created_at": "2026-01-14T09:22:41.478363Z"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                           | Description                                |
| -------- | -------------------------------------------------------------- | ------------------------------------------ |
| `GET`    | `/api/v2/workspaces/{slug}/work-item-types/`                   | List workspace work item types             |
| `GET`    | `/api/v2/workspaces/{slug}/work-item-types/{pk}/`              | Get a workspace work item type             |
| `POST`   | `/api/v2/workspaces/{slug}/work-item-types/`                   | Create a workspace work item type          |
| `PATCH`  | `/api/v2/workspaces/{slug}/work-item-types/{pk}/`              | Update a workspace work item type          |
| `DELETE` | `/api/v2/workspaces/{slug}/work-item-types/{pk}/`              | Delete a workspace work item type          |
| `POST`   | `/api/v2/workspaces/{slug}/work-item-types/{pk}/mark-default/` | Mark a workspace work item type as default |

There is no `enable` and no `import` action at the workspace level. Both are project-level operations — see [Work item types (project)](/api-reference/v2/work-item-types/overview).

## Workspace mode versus project mode

|                            | Project mode                                                   | Workspace mode                             |
| -------------------------- | -------------------------------------------------------------- | ------------------------------------------ |
| Where a type is defined    | Once per project, on `/projects/{project_id}/work-item-types/` | Once per workspace, on `/work-item-types/` |
| Same type in ten projects  | Ten separate records to create and keep in step                | One record the projects share              |
| Renaming or editing a type | Repeat the edit in every project                               | Edit once                                  |
| Cross-project reporting    | Group by name and hope the names match                         | Group by the type `id`                     |
| Per-project variation      | A project can shape its own types freely                       | Projects work from the workspace list      |

Choose **workspace mode** when the same taxonomy should hold across many projects — a support org where `Incident` must mean the same thing everywhere, or a company that reports on bug counts across every team. Choose **project mode** when teams are genuinely different and each one should be free to invent its own categories.

The trade-off is consistency against autonomy, and it is a workspace-wide decision: both surfaces exist, but only one of them accepts writes at a time.

## How a project gets workspace types

Defining a type here makes it available to the workspace; a project surfaces it once the project is working from the workspace list. To bring a specific set of workspace types into a project, send their ids to the project-level import endpoint:

```text
POST /api/v2/workspaces/{slug}/projects/{project_id}/work-item-types/import/
```

Collect the ids from [List workspace work item types](/api-reference/v2/workspace-work-item-types/list-workspace-work-item-types), then see [Import work item types](/api-reference/v2/work-item-types/import-work-item-types) for the request shape.

## Defaults

Exactly one type is the workspace default — the one a work item gets when no type is supplied. `is_default` is read-only on create and update, so promoting a different type is its own call:

```text
POST /api/v2/workspaces/{slug}/work-item-types/{pk}/mark-default/
```

Marking a type as default clears the flag on the type that held it.

## Retiring a type

Deactivating (`is_active: false`) and deleting are different moves:

- **Deactivate** when the type should stop appearing in pickers but existing work items keep their classification. Reversible — send `is_active: true` to bring it back.
- **Delete** when the type should be gone. `DELETE` returns `204` with an empty body. A type that can't be removed in its current state returns `409`; read the `detail` for the reason.
