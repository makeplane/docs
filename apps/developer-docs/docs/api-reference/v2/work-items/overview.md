---
title: Work items overview
description: The Plane API v2 work item object. Sparse id-based reads, the PROJ-123 identifier, custom fields, human-readable write inputs, expandable relations, and every work item endpoint.
keywords: plane api v2, work items, issues, tasks, sequence id, identifier, custom fields, expand, priority, archive work item
---

# Work items overview

A work item is the unit of work in Plane — the thing that gets assigned, scheduled, moved through a workflow, and
closed. Every work item belongs to exactly one project and sits in exactly one [state](/api-reference/v2/states/overview)
of that project's workflow.

Work items are the most heavily used resource in the API, so the v2 shape is deliberately narrow: reads return **ids,
not nested objects**, and every relation is a `*_id` or `*_ids` field you can resolve on your own schedule or pull in
with [`?expand=`](/api-reference/v2/expanding-relations). Writes go the other way — they accept ids **and** the
human-readable names you already have, so you rarely need a lookup round trip before creating something.

[Learn more about work items](https://docs.plane.so/core-concepts/work-items/overview)

<div class="api-two-column">
<div class="api-left">

## The work item object

### Attributes

- `id` _string (uuid)_

  Unique identifier for the work item. This is the `{pk}` on every project-scoped detail route.

- `name` _string_

  Title of the work item. Maximum 255 characters.

- `identifier` _string_

  The human key, for example `PROJ-142`. It is the project's identifier joined to `sequence_id`, and it is what people
  paste into chat and commit messages. Use it with
  [Get a work item by identifier](/api-reference/v2/work-items/get-work-item-by-identifier) when you don't have the
  project UUID.

- `sequence_id` _integer_

  The work item's number within its project. Assigned by Plane and never reused.

- `priority` _string_

  One of `urgent`, `high`, `medium`, `low`, or `none`. Never null — an unprioritized work item reads `none`.

- `state_id` _string (uuid)_

  The workflow state the work item is currently in.

- `type_id` _string (uuid)_

  The work item type. `null` when the project has no types enabled or the item is untyped.

- `assignee_ids` _array of string_

  User ids assigned to the work item. Empty array when unassigned.

- `label_ids` _array of string_

  Label ids applied to the work item. Empty array when unlabeled.

- `parent_id` _string (uuid)_

  The parent work item, or `null` for a top-level item. A parent may live in another project of the same workspace.

- `start_date` _string (date)_

  Planned start, or `null`.

- `target_date` _string (date)_

  Planned due date, or `null`.

- `is_draft` _boolean_

  Whether the work item is still a draft. Drafts are created in the Plane app and are excluded from most boards.

- `archived_at` _string (date-time)_

  When the work item was archived, or `null` if it is active. See [Archiving](#archiving-and-deleting).

- `created_at` _string (date-time)_

  When the work item was created.

- `created_by_id` _string (uuid)_

  The user who created the work item. `null` for items created by an automation with no acting user.

- `custom_fields` _object_

  Values of the work item type's custom properties, keyed by property name. **Populated only on single-item
  responses** — it is always `null` on the list endpoint. See [Custom fields](#custom-fields).

::: info The read shape is sparse and fixed
`description_html`, `external_id`, `external_source`, and `estimate_point_id` are accepted on writes but are **not**
part of the read shape — they will not come back on any response. There is also no `updated_at`, no `project_id`, and
no `workspace_id`: you already know the project from the path.
:::

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE WORK ITEM OBJECT">

```json
{
  "id": "8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13",
  "name": "Fix login redirect loop",
  "identifier": "PROJ-142",
  "sequence_id": 142,
  "priority": "high",
  "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "type_id": "2d9d1a97-5c6f-4a1e-9d5b-8c2f7e30b6a4",
  "assignee_ids": ["16c61a3a-512a-48ac-b0be-b6b46fe6f430"],
  "label_ids": ["c1b8f3d6-9a44-4e12-8f7a-2b6d5c9e1a03"],
  "parent_id": null,
  "start_date": "2026-01-12",
  "target_date": "2026-01-20",
  "is_draft": false,
  "archived_at": null,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "custom_fields": {
    "severity": {
      "id": "b52e7c18-4d3f-4a90-8e61-0f7a3c9d2b45",
      "value": "Sev-1",
      "value_detail": {
        "id": "7c0a5f39-2e84-4b17-9a6c-1d8e4f2b60c9",
        "name": "Sev-1",
        "logo_props": {}
      }
    },
    "root_cause": {
      "id": "9e3b6c21-7f45-4d80-a1e9-5c8b2d7f4a36",
      "value": "Stale session cookie",
      "value_detail": null
    }
  }
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                                         | Description                        |
| -------- | ---------------------------------------------------------------------------- | ---------------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/`                | List work items                    |
| `GET`    | `/api/v2/workspaces/{slug}/work-items/`                                      | List work items across a workspace |
| `GET`    | `/api/v2/workspaces/{slug}/work-items/{identifier}/`                         | Get a work item by identifier      |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{pk}/`           | Get a work item                    |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/`                | Create a work item                 |
| `PATCH`  | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{pk}/`           | Update a work item                 |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{pk}/`           | Delete a work item                 |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/upsert/`         | Upsert a work item                 |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/bulk-create/`    | Bulk create work items             |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/bulk-update/`    | Bulk update work items             |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/bulk-delete/`    | Bulk delete work items             |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{pk}/archive/`   | Archive a work item                |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{pk}/unarchive/` | Unarchive a work item              |

Every project-scoped route needs `projects.work_items:read` for `GET` and `projects.work_items:write` for `POST`,
`PATCH`, and `DELETE`.

## Two ways to identify a work item

| Key                  | Looks like                             | Route                                                             |
| -------------------- | -------------------------------------- | ----------------------------------------------------------------- |
| UUID (`id`)          | `8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13` | `.../projects/{project_id}/work-items/{pk}/` — reads and writes   |
| Human (`identifier`) | `PROJ-142`                             | `/api/v2/workspaces/{slug}/work-items/{identifier}/` — reads only |

The two lookups are separate routes on purpose. The UUID route is the canonical surface for everything, including
writes. The identifier route is workspace-scoped and read-only, and it exists precisely so a caller holding only
`PROJ-142` — a chat bot, a commit-hook, an LLM agent — can fetch the work item without first discovering which project
it belongs to.

## Custom fields

`custom_fields` is the work item's custom property values from its work item type, keyed by the property's `name`.
Each entry carries the property definition `id`, a human-useful `value`, and a `value_detail` object that keeps the
underlying record for option and relation properties (`null` for plain scalars). Properties the work item has no value
for are omitted rather than emitted as `null`.

::: warning `custom_fields` is null on the list endpoint
Resolving custom properties costs one lookup pass per work item, so the list endpoint deliberately skips it to avoid an
N+1 across a full page of results. `custom_fields` is populated only on retrieve, retrieve by identifier, create, and
update. It is `null` on list, and `null` on the archive and unarchive responses too — those return the work item, not
its property values.

If you are exporting custom property values for many work items, list to get the ids, then fetch the ones you need
individually. Do not expect `custom_fields` to arrive from a list call.
:::

The object is empty (`{}`) when the work item is untyped or custom properties are not enabled for the workspace. See
[work item properties](/api-reference/v2/work-item-properties/list-work-item-properties) for the property definitions
behind these values.

## Writing: send ids, or send names

Every relation on a write has two accepted inputs — the canonical id field, and a **write-only** human-readable
parallel. You may send either one, never both.

| Relation  | Id input            | Human input | Human input accepts                             |
| --------- | ------------------- | ----------- | ----------------------------------------------- |
| State     | `state_id`          | `state`     | The state's name, for example `In Progress`     |
| Type      | `type_id`           | `type`      | The type's name, for example `Bug`              |
| Parent    | `parent_id`         | `parent`    | The parent's identifier, for example `PROJ-118` |
| Assignees | `assignee_ids`      | `assignees` | Member email addresses                          |
| Labels    | `label_ids`         | `labels`    | Label names                                     |
| Estimate  | `estimate_point_id` | `estimate`  | The estimate point's value, for example `5`     |

This exists because the values a caller already holds are almost never UUIDs. An importer has a Jira status string. A
Slack command has an email address. An LLM agent has the word "Bug". Without the parallel inputs each of those would
need a list call per field before it could write anything — six lookups to create one work item. With them, the create
is a single request.

The id fields remain the precise option, and you should prefer them when you already have ids or when a name might be
ambiguous:

- Names resolve **case-insensitively** and must match exactly one record. A name that matches nothing is a `400`, and
  so is a name that matches more than one — the error tells you to use the id field instead.
- Sending both a name and its id (for example `state` and `state_id`) is a `400`. Pick one.
- The human inputs are **write-only**. Responses always come back in the sparse id shape, so `state` never appears in a
  response body — `state_id` does.

## Expanding relations

Work items are one of only two resources that support `?expand=`. The accepted values are `state`, `type`, `parent`,
`assignees`, and `labels`, comma-separated.

Expansion is **separate-key**: the `*_id` field is always present, and the expanded object is _added_ beside it under
the bare name. `?expand=state` gives you both `state_id` and a `state` object; it never swaps one for the other, so a
client that reads ids keeps working when someone adds an expand to the request.

```bash
GET .../work-items/?expand=state,assignees
```

An unknown expand value is a `400`. Expansion works on the list, both retrieve routes, and the create/update responses.
See [Expanding relations](/api-reference/v2/expanding-relations).

## Archiving and deleting

Archiving and deleting are different operations with different consequences.

- **Archive** ([archive](/api-reference/v2/work-items/archive-work-item) /
  [unarchive](/api-reference/v2/work-items/unarchive-work-item)) sets or clears `archived_at`. It is reversible, and it
  removes the work item from the default query set — archived items stop appearing in list results and in plain detail
  reads.
- **Delete** ([delete](/api-reference/v2/work-items/delete-work-item)) is a soft delete that returns `204`. It is not
  reversible through the API.

Neither one is `PATCH`-able: `archived_at` is read-only, so you cannot archive a work item by patching a timestamp onto
it.

## Changed from v1

- Relations are ids with explicit names: `state` → **`state_id`**, `parent` → **`parent_id`**, `type` → **`type_id`**,
  `assignees` → **`assignee_ids`**, `labels` → **`label_ids`**, `created_by` → **`created_by_id`**.
- Reads no longer return `updated_at`, `updated_by`, `project`, `workspace`, `description_html`,
  `description_stripped`, `description_binary`, `sort_order`, `completed_at`, `estimate_point`, or `module`.
- **`identifier`** (`PROJ-142`) and **`custom_fields`** are new on the read shape.
- Writes accept human-readable parallels (`state`, `type`, `parent`, `assignees`, `labels`, `estimate`) alongside the
  id fields.
- `?expand=` is now **separate-key** — it adds an object beside the id instead of replacing the id. The allowed values
  are `state`, `type`, `parent`, `assignees`, and `labels`; v1's `project` and `module` expansions are gone.
- Updates are `PATCH` only. `PUT` returns `405`.
- Lists return a pagination envelope instead of a bare array, and errors are RFC 9457 `application/problem+json`.

See [Migrating from v1](/api-reference/v2/migrating-from-v1) for the full list.
