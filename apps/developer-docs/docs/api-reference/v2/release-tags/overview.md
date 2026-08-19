---
title: Release tags overview
description: The Plane API v2 release tag object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, release tags, release tag object
---

# Release tags overview

Release tags are the workspace-level tag catalog for releases.

<div class="api-two-column">
<div class="api-left">

## The release tag object

### Attributes

- `commit_hash` _string_

  The commit hash.

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `description` _string_

  Free-form description.

- `git_tag` _string_

  The git tag.

- `id` _string (uuid)_

  Unique identifier.

- `version` _string_

  Version string, for example `1.4.0`.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE RELEASE TAG OBJECT">

```json
{
  "commit_hash": "example",
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "description": "What this is for.",
  "git_tag": "example",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "version": "1.4.0"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                            | Description          |
| -------- | ----------------------------------------------- | -------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/releases/tags/`      | List release tags    |
| `GET`    | `/api/v2/workspaces/{slug}/releases/tags/{pk}/` | Get a release tag    |
| `POST`   | `/api/v2/workspaces/{slug}/releases/tags/`      | Create a release tag |
| `PATCH`  | `/api/v2/workspaces/{slug}/releases/tags/{pk}/` | Update a release tag |
| `DELETE` | `/api/v2/workspaces/{slug}/releases/tags/{pk}/` | Delete a release tag |

## Response shaping

Every release tag read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
