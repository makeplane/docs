---
title: States overview
description: The Plane API v2 state object. Attributes, workflow groups, the default and triage states, and how states gate work item transitions.
keywords: plane api v2, states, workflow states, state groups, backlog, triage, work item status
---

# States overview

A state is a step in a project's workflow. Every work item sits in exactly one state, and a state belongs to exactly one project — states are never shared across projects.

Each state is assigned to a **group**, which is what Plane uses to reason about progress. Boards, charts, and cycle burndowns read the group, not the state name, so a project can rename `In Progress` to `Building` without breaking any reporting.

[Learn more about states](https://docs.plane.so/core-concepts/work-items/states)

<div class="api-two-column">
<div class="api-left">

## The state object

### Attributes

- `id` _string (uuid)_

  Unique identifier for the state.

- `name` _string_

  Display name, unique within the project. Maximum 255 characters.

- `description` _string_

  Free-form description of what the state means in this workflow.

- `color` _string_

  Hex color used wherever the state is rendered, for example `#3f76ff`.

- `group` _string_

  The workflow group this state belongs to. One of `backlog`, `unstarted`, `started`, `completed`, `cancelled`, or `triage`.

- `sequence` _number_

  Ordering weight within the project. Lower values sort first.

- `is_default` _boolean_

  Whether new work items land in this state when no `state_id` is supplied. Exactly one state per project is the default.

- `is_triage` _boolean_

  Whether this is the project's triage state, used by intake. Read-only — a triage state is created and managed by Plane.

- `external_id` , `external_source` _string_

  Correlation fields for sync and import. Together they let you map a state to a record in another system and find it again later.

- `created_at` _string (date-time)_

  When the state was created.

- `created_by_id` _string (uuid)_

  The user who created the state.

::: tip Group drives behavior, name does not
Filtering work items by `state_group=started` is stable across projects even when each project names its in-progress state differently. Filtering by `state_id` is exact but project-specific.
:::

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE STATE OBJECT">

```json
{
  "id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "name": "In Progress",
  "description": "Actively being worked on",
  "color": "#3f76ff",
  "group": "started",
  "sequence": 25000,
  "is_default": false,
  "is_triage": false,
  "external_id": null,
  "external_source": null,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                                  | Description        |
| -------- | --------------------------------------------------------------------- | ------------------ |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/states/`             | List states        |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/states/{pk}/`        | Get a state        |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/states/`             | Create a state     |
| `PATCH`  | `/api/v2/workspaces/{slug}/projects/{project_id}/states/{pk}/`        | Update a state     |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/states/{pk}/`        | Delete a state     |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/states/upsert/`      | Upsert a state     |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/states/bulk-create/` | Bulk create states |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/states/bulk-update/` | Bulk update states |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/states/bulk-delete/` | Bulk delete states |

## Deleting states

Two deletes are rejected with `409 conflict`:

- The project's **default state** cannot be deleted. Mark another state as default first.
- A state that **still holds work items** cannot be deleted. Move those work items to another state first.

## Changed from v1

- `default` is now **`is_default`**.
- Reads no longer return `updated_at`, `updated_by`, `project`, or `workspace`.
- `group` accepts `triage` in addition to the five v1 groups.

See [Migrating from v1](/api-reference/v2/migrating-from-v1) for the full list.
