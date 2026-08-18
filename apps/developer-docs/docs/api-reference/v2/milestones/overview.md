---
title: Milestones overview
description: The Plane API v2 milestone object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, milestones, milestone object
---

# Milestones overview

Milestones mark dated checkpoints in a project.

<div class="api-two-column">
<div class="api-left">

## The milestone object

### Attributes

- `archived_at` _string (date-time)_

  When the record was archived, or `null` if it is active.

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `external_id` _string_

  Your system's identifier for this record, for sync and import correlation.

- `external_source` _string_

  The system `external_id` came from, for example `github` or `jira`.

- `id` _string (uuid)_

  Unique identifier.

- `target_date` _string (date)_

  Planned due date, as `YYYY-MM-DD`.

- `title` _string_

  Title.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE MILESTONE OBJECT">

```json
{
  "archived_at": null,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "external_id": null,
  "external_source": null,
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "target_date": "2026-01-20",
  "title": "Example title"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                                          | Description                        |
| -------- | ----------------------------------------------------------------------------- | ---------------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/milestones/`                 | List milestones                    |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/milestones/{pk}/`            | Get a milestone                    |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/milestones/`                 | Create a milestone                 |
| `PATCH`  | `/api/v2/workspaces/{slug}/projects/{project_id}/milestones/{pk}/`            | Update a milestone                 |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/milestones/{pk}/`            | Delete a milestone                 |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/milestones/upsert/`          | Upsert a milestone                 |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/milestones/bulk-create/`     | Bulk create milestones             |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/milestones/bulk-update/`     | Bulk update milestones             |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/milestones/bulk-delete/`     | Bulk delete milestones             |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/milestones/{pk}/work-items/` | Add or remove milestone work items |

## Response shaping

Every milestone read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
