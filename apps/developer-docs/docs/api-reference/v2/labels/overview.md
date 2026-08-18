---
title: Labels overview
description: The Plane API v2 label object. Attributes, nested labels via parent_id, name uniqueness within a project, and the label endpoints.
keywords: plane api v2, labels, label object, parent_id, nested labels, tags, work item labels
---

# Labels overview

A label is a tag you attach to work items to slice a project by something the workflow doesn't already model — `bug`, `needs-design`, `customer-escalation`. A label belongs to exactly one project, so two projects can both have a `bug` label and they are separate records with separate ids.

Work items reference labels by id through `label_ids`, and you filter work items with `label_id`. Nothing on the label object tells you which work items carry it — that relationship is read from the work item side.

[Learn more about labels](https://docs.plane.so/core-concepts/work-items/labels)

<div class="api-two-column">
<div class="api-left">

## The label object

### Attributes

- `id` _string (uuid)_

  Unique identifier for the label. This is the value you send in a work item's `label_ids`.

- `name` _string_

  Display name, unique within the project. Maximum 255 characters.

- `description` _string_

  Free-form note about what the label is for. Useful when a team needs a convention written down next to the tag.

- `color` _string_

  Hex color used wherever the label is rendered, for example `#e5484d`.

- `sort_order` _number_

  Ordering weight within the project. Lower values sort first. Assigned automatically when you don't send one.

- `parent_id` _string (uuid) or null_

  The label this one nests under, letting you build groups such as an `Area` label with `Billing` and `Search` beneath it. `null` for a top-level label.

- `external_id` , `external_source` _string or null_

  Correlation fields for sync and import. Together they let you map a label to a record in another system and find it again later — list labels filtered by both to look one up without storing Plane ids yourself.

- `created_at` _string (date-time)_

  When the label was created.

- `created_by_id` _string (uuid) or null_

  The user who created the label. `null` for labels created by an integration or by the system.

::: info Nesting is metadata, not inheritance
`parent_id` groups labels for display and filtering. Applying a child label to a work item does not also apply its parent.
:::

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE LABEL OBJECT">

```json
{
  "id": "9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88",
  "name": "Regression",
  "description": "Worked before the last release",
  "color": "#e5484d",
  "sort_order": 65535,
  "parent_id": "2b7d5e94-3c1a-4f60-9a8d-7e1c4b0f2d35",
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
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/labels/`             | List labels        |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/labels/{pk}/`        | Get a label        |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/labels/`             | Create a label     |
| `PATCH`  | `/api/v2/workspaces/{slug}/projects/{project_id}/labels/{pk}/`        | Update a label     |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/labels/{pk}/`        | Delete a label     |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/labels/upsert/`      | Upsert a label     |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/labels/bulk-create/` | Bulk create labels |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/labels/bulk-update/` | Bulk update labels |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/labels/bulk-delete/` | Bulk delete labels |

## Names are unique per project

A project cannot hold two labels with the same `name`. Creating a duplicate, or renaming a label onto a name already in use, returns `409 conflict`.

If you are importing labels from another system, treat the `409` as "this already exists" rather than an error: list the project's labels filtered by `external_id` and `external_source` first, and update the match instead of creating it again.

## Deleting labels

`DELETE` returns `204` with an empty body. The label is removed from every work item that carried it — the work items themselves are untouched.

::: warning Deletes are not reversible through the API
There is no undelete endpoint. If you need the association back, recreate the label and reapply it with `label_ids` on each work item.
:::

## Changed from v1

- `parent` is now **`parent_id`**, on both reads and writes.
- `created_by` is now **`created_by_id`**.
- Reads no longer return `updated_at`, `updated_by`, `project`, or `workspace`. The project is already in the request path.
- Reads now return `external_id` and `external_source`, which v1 accepted on writes but did not surface on the label object.
- Lists return the offset envelope — `data`, `next`, `previous`, `total_count` — instead of v1's `results` with cursor keys. See [List labels](/api-reference/v2/labels/list-labels).
- The `expand` and `fields` query parameters are not available on labels.

See [Migrating from v1](/api-reference/v2/migrating-from-v1) for the full list.
