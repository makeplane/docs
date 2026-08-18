---
title: Modules overview
description: The Plane API v2 module object. Attributes, the module status enum, lead and member handling, name uniqueness, and how modules differ from v1.
keywords: plane api v2, modules, module object, module status, module lead, project modules
---

# Modules overview

A module groups work items into a single deliverable inside one project — a launch, a migration, a redesign. Modules
belong to exactly one project and are never shared across projects.

Where a cycle answers "what are we doing this sprint", a module answers "what does this piece of work consist of". A
work item can sit in a module and a cycle at the same time.

[Learn more about modules](https://docs.plane.so/core-concepts/modules)

<div class="api-two-column">
<div class="api-left">

## The module object

### Attributes

- `id` _string (uuid)_

  Unique identifier for the module.

- `name` _string_

  Display name, unique within the project. Maximum 255 characters.

- `description` _string_

  Plain-text summary of what the module covers.

- `status` _string_

  Where the module sits in its lifecycle. One of `backlog`, `planned`, `in-progress`, `paused`, `completed`, or
  `cancelled`.

- `start_date` _string (date)_

  Date the module is scheduled to begin, as `YYYY-MM-DD`, or `null`.

- `target_date` _string (date)_

  Date the module is expected to land, as `YYYY-MM-DD`, or `null`.

- `lead_id` _string (uuid)_

  The project member accountable for the module, or `null`.

- `member_ids` _array of string_

  Project members assigned to the module. Read-only in v2 — module membership is not yet writable through the v2 API.

- `sort_order` _number_

  Ordering weight used when modules are listed. Lower values sort first.

- `logo_props` _any_

  Free-form JSON object holding the icon Plane renders for the module. `{}` when no icon is set.

- `external_id` , `external_source` _string_

  Correlation fields for sync and import. Together they let you map a module to a record in another system and find it
  again later.

- `archived_at` _string (date-time)_

  When the module was archived, or `null` for an active module.

- `created_at` _string (date-time)_

  When the module was created.

- `created_by_id` _string (uuid)_

  The user who created the module.

::: info Relations are always ids
Modules do not support `?expand=`. `lead_id` and `member_ids` come back as ids — resolve them against
[project members](/api-reference/v2/members/list-project-members).
:::

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE MODULE OBJECT">

```json
{
  "id": "7c1f3d90-2a64-4e58-9b0d-3fa1c7e28b45",
  "name": "Billing revamp",
  "description": "Rework subscription billing end to end.",
  "status": "in-progress",
  "start_date": "2026-01-05",
  "target_date": "2026-02-27",
  "lead_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "member_ids": ["16c61a3a-512a-48ac-b0be-b6b46fe6f430", "9d3e1f27-8b4c-4a06-95f1-2c7ea45b0d18"],
  "sort_order": 65535.0,
  "logo_props": {},
  "external_id": null,
  "external_source": null,
  "archived_at": null,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                                       | Description                     |
| -------- | -------------------------------------------------------------------------- | ------------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/modules/`                 | List modules                    |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/modules/{pk}/`            | Get a module                    |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/modules/`                 | Create a module                 |
| `PATCH`  | `/api/v2/workspaces/{slug}/projects/{project_id}/modules/{pk}/`            | Update a module                 |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/modules/{pk}/`            | Delete a module                 |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/modules/upsert/`          | Upsert a module                 |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/modules/bulk-create/`     | Bulk create modules             |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/modules/bulk-update/`     | Bulk update modules             |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/modules/bulk-delete/`     | Bulk delete modules             |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/modules/{pk}/work-items/` | Add or remove module work items |

## Status

`status` is the module's lifecycle position and is validated on both writes and the `status` filter — a value outside
the enum is a `400 invalid_request`, never a silently ignored write or an empty list.

| Value         | Meaning                        |
| ------------- | ------------------------------ |
| `backlog`     | Captured, not yet committed to |
| `planned`     | Committed to but not started   |
| `in-progress` | Actively being worked on       |
| `paused`      | Started, then put on hold      |
| `completed`   | Delivered                      |
| `cancelled`   | Dropped without delivering     |

A module created without a `status` starts as `planned`.

## Lead and members

`lead_id` must be a member of the module's project. Passing a user who isn't a project member is rejected with
`400 invalid_request` naming `lead_id` — the link is never made silently.

`member_ids` is read-only. Reads return the module's current members, but there is no v2 write path for adding or
removing them yet.

## Dates

`start_date` and `target_date` are plain dates (`YYYY-MM-DD`), and either can be `null`. A `target_date` earlier than
`start_date` is rejected with `400 invalid_request`.

## Names are unique per project

Two modules in the same project cannot share a name. A duplicate on create — or on a rename via `PATCH` — returns
`409 conflict`.

## Not yet in v2

Module work-item management (listing the work items in a module, adding them, removing them) and archive/unarchive are
still only available in v1. See the [v1 module reference](/api-reference/v1/module/overview) for those routes; the v2
endpoints above cover module CRUD only.

## Changed from v1

- `lead` is now **`lead_id`**, `members` is now **`member_ids`**, and `created_by` is now **`created_by_id`**.
- `member_ids` is read-only.
- Reads no longer return `updated_at`, `updated_by`, `project`, `workspace`, `view_props`, `description_text`, or
  `description_html`.
- `PUT` is gone — updates are `PATCH` and partial.

See [Migrating from v1](/api-reference/v2/migrating-from-v1) for the full list.
