---
title: Release links overview
description: The Plane API v2 release link object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, release links, release link object
---

# Release links overview

Release links attach external URLs to a release.

<div class="api-two-column">
<div class="api-left">

## The release link object

### Attributes

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `id` _string (uuid)_

  Unique identifier.

- `metadata` _string_

  The metadata.

- `release_id` _string (uuid)_

  The related release.

- `title` _string_

  Title.

- `url` _string (uri)_

  Target URL.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE RELEASE LINK OBJECT">

```json
{
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "metadata": null,
  "release_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "title": "Example title",
  "url": "https://example.com/spec"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                          | Description           |
| -------- | ------------------------------------------------------------- | --------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/releases/{release_id}/links/`      | List release links    |
| `GET`    | `/api/v2/workspaces/{slug}/releases/{release_id}/links/{pk}/` | Get a release link    |
| `POST`   | `/api/v2/workspaces/{slug}/releases/{release_id}/links/`      | Create a release link |
| `PATCH`  | `/api/v2/workspaces/{slug}/releases/{release_id}/links/{pk}/` | Update a release link |
| `DELETE` | `/api/v2/workspaces/{slug}/releases/{release_id}/links/{pk}/` | Delete a release link |

## Response shaping

Every release link read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
