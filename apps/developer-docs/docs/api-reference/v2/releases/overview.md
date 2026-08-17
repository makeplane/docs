---
title: Releases overview
description: The Plane API v2 release object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, releases, release object
---

# Releases overview

Releases group shipped work and carry a changelog.

<div class="api-two-column">
<div class="api-left">

## The release object

### Attributes

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `description_html` _string_

  Rich-text body as HTML. This is the field the Plane editor round-trips.

- `description_id` _string (uuid)_

  The related description.

- `external_id` _string_

  Your system's identifier for this record, for sync and import correlation.

- `external_source` _string_

  The system `external_id` came from, for example `github` or `jira`.

- `id` _string (uuid)_

  Unique identifier.

- `is_latest` _boolean_

  Whether is latest.

- `is_prerelease` _boolean_

  Whether is prerelease.

- `label_ids` _array of string_

  Ids of the associated labels.

- `lead_id` _string (uuid)_

  The related lead.

- `name` _string_

  Display name.

- `release_date` _string (date)_

  The release date.

- `status` _string_

  The status.

- `tag_id` _string (uuid)_

  The related tag.

- `target_date` _string (date)_

  Planned due date, as `YYYY-MM-DD`.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE RELEASE OBJECT">

```json
{
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "description_html": "<p>Details go here.</p>",
  "description_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "external_id": null,
  "external_source": null,
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "is_latest": false,
  "is_prerelease": false,
  "label_ids": [["16c61a3a-512a-48ac-b0be-b6b46fe6f430"]],
  "lead_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "name": "Example name",
  "release_date": "2026-01-20",
  "status": "unreleased",
  "tag_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "target_date": "2026-01-20"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                  | Description                      |
| -------- | ----------------------------------------------------- | -------------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/releases/`                 | List releases                    |
| `POST`   | `/api/v2/workspaces/{slug}/releases/`                 | Create a release                 |
| `DELETE` | `/api/v2/workspaces/{slug}/releases/{pk}/`            | Delete a release                 |
| `GET`    | `/api/v2/workspaces/{slug}/releases/{pk}/`            | Get a release                    |
| `PATCH`  | `/api/v2/workspaces/{slug}/releases/{pk}/`            | Update a release                 |
| `GET`    | `/api/v2/workspaces/{slug}/releases/{pk}/changelog/`  | Get a release changelog          |
| `PATCH`  | `/api/v2/workspaces/{slug}/releases/{pk}/changelog/`  | Update a release changelog       |
| `POST`   | `/api/v2/workspaces/{slug}/releases/{pk}/labels/`     | Add or remove release labels     |
| `POST`   | `/api/v2/workspaces/{slug}/releases/{pk}/work-items/` | Add or remove release work items |

## Response shaping

Every release read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
