---
title: Estimates overview
description: The Plane API v2 estimate object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, estimates, estimate object
---

# Estimates overview

Estimates define the sizing scale a project uses.

<div class="api-two-column">
<div class="api-left">

## The estimate object

### Attributes

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `description` _string_

  Free-form description.

- `external_id` _string_

  Your system's identifier for this record, for sync and import correlation.

- `external_source` _string_

  The system `external_id` came from, for example `github` or `jira`.

- `id` _string (uuid)_

  Unique identifier.

- `last_used` _boolean_

  Whether last used.

- `name` _string_

  Display name.

- `type` _string_

  The type.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE ESTIMATE OBJECT">

```json
{
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "description": "What this is for.",
  "external_id": null,
  "external_source": null,
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "last_used": false,
  "name": "Example name",
  "type": "categories"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                                     | Description           |
| -------- | ------------------------------------------------------------------------ | --------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/estimates/`             | List estimates        |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/estimates/{pk}/`        | Get a estimate        |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/estimates/`             | Create a estimate     |
| `PATCH`  | `/api/v2/workspaces/{slug}/projects/{project_id}/estimates/{pk}/`        | Update a estimate     |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/estimates/{pk}/`        | Delete a estimate     |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/estimates/upsert/`      | Upsert a estimate     |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/estimates/bulk-create/` | Bulk create estimates |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/estimates/bulk-update/` | Bulk update estimates |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/estimates/bulk-delete/` | Bulk delete estimates |

## Response shaping

Every estimate read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
