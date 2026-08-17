---
title: Release comments overview
description: The Plane API v2 release comment object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, release comments, release comment object
---

# Release comments overview

Release comments are the discussion thread on a release.

<div class="api-two-column">
<div class="api-left">

## The release comment object

### Attributes

- `comment_html` _string_

  The comment html.

- `comment_id` _string (uuid)_

  The related comment.

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `edited_at` _string (date-time)_

  The edited at.

- `id` _string (uuid)_

  Unique identifier.

- `is_hidden` _boolean_

  Whether is hidden.

- `is_resolved` _boolean_

  Whether is resolved.

- `parent_id` _string (uuid)_

  The related parent.

- `release_id` _string (uuid)_

  The related release.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE RELEASE COMMENT OBJECT">

```json
{
  "comment_html": "example",
  "comment_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "edited_at": "2026-01-14T09:22:41.478363Z",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "is_hidden": false,
  "is_resolved": false,
  "parent_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "release_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                             | Description              |
| -------- | ---------------------------------------------------------------- | ------------------------ |
| `GET`    | `/api/v2/workspaces/{slug}/releases/{release_id}/comments/`      | List release comments    |
| `POST`   | `/api/v2/workspaces/{slug}/releases/{release_id}/comments/`      | Create a release comment |
| `DELETE` | `/api/v2/workspaces/{slug}/releases/{release_id}/comments/{pk}/` | Delete a release comment |
| `GET`    | `/api/v2/workspaces/{slug}/releases/{release_id}/comments/{pk}/` | Get a release comment    |
| `PATCH`  | `/api/v2/workspaces/{slug}/releases/{release_id}/comments/{pk}/` | Update a release comment |

## Response shaping

Every release comment read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
