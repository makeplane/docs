---
title: Work item worklogs overview
description: The Plane API v2 worklog object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, work item worklogs, worklog object
---

# Work item worklogs overview

Worklogs record time spent on a work item.

<div class="api-two-column">
<div class="api-left">

## The worklog object

### Attributes

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `description` _string_

  Free-form description.

- `duration` _integer_

  Time logged, in minutes.

- `id` _string (uuid)_

  Unique identifier.

- `logged_by_id` _string (uuid)_

  The related logged by.

- `updated_at` _string (date-time)_

  When the record last changed.

- `work_item_id` _string (uuid)_

  The related work item.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE WORKLOG OBJECT">

```json
{
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "description": "What this is for.",
  "duration": 90,
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "logged_by_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "updated_at": "2026-01-14T09:22:41.478363Z",
  "work_item_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                                                       | Description                     |
| -------- | ------------------------------------------------------------------------------------------ | ------------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/worklogs/`      | List worklogs                   |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/worklogs/`      | Create a worklog                |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/worklogs/{pk}/` | Delete a worklog                |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/worklogs/{pk}/` | Get a worklog                   |
| `PATCH`  | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/worklogs/{pk}/` | Update a worklog                |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/worklogs/summary/`                        | Get the project worklog summary |

## Response shaping

Every worklog read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
