---
title: Estimate points overview
description: The Plane API v2 estimate point object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, estimate points, estimate point object
---

# Estimate points overview

Estimate points are the individual values inside a project estimate scale.

<div class="api-two-column">
<div class="api-left">

## The estimate point object

### Attributes

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `description` _string_

  Free-form description.

- `estimate_id` _string (uuid)_

  The related estimate.

- `external_id` _string_

  Your system's identifier for this record, for sync and import correlation.

- `external_source` _string_

  The system `external_id` came from, for example `github` or `jira`.

- `id` _string (uuid)_

  Unique identifier.

- `key` _integer_

  The key.

- `value` _string_

  The value.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE ESTIMATE POINT OBJECT">

```json
{
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "description": "What this is for.",
  "estimate_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "external_id": null,
  "external_source": null,
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "key": 1,
  "value": "example"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                                                     | Description                |
| -------- | ---------------------------------------------------------------------------------------- | -------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/estimates/{estimate_id}/points/`        | List estimate points       |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/estimates/{estimate_id}/points/`        | Create a estimate point    |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/estimates/{estimate_id}/points/bulk/`   | Bulk write estimate points |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/estimates/{estimate_id}/points/upsert/` | Upsert a estimate point    |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/estimates/{estimate_id}/points/{pk}/`   | Delete a estimate point    |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/estimates/{estimate_id}/points/{pk}/`   | Get a estimate point       |
| `PATCH`  | `/api/v2/workspaces/{slug}/projects/{project_id}/estimates/{estimate_id}/points/{pk}/`   | Update a estimate point    |

## Response shaping

Every estimate point read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
