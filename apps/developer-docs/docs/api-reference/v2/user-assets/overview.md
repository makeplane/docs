---
title: User assets overview
description: The Plane API v2 user asset object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, user assets, user asset object
---

# User assets overview

User assets are the calling user's own uploads, such as an avatar or cover image.

<div class="api-two-column">
<div class="api-left">

## The user asset object

### Attributes

- `asset_url` _string_

  The asset url.

- `attributes` _string_

  The attributes.

- `content_type` _string_

  The content type.

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `entity_type` _string_

  The entity type.

- `id` _string (uuid)_

  Unique identifier.

- `is_uploaded` _boolean_

  Whether is uploaded.

- `name` _string_

  Display name.

- `size` _number_

  The size.

- `user_id` _string (uuid)_

  The related user.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE USER ASSET OBJECT">

```json
{
  "asset_url": "https://example.com",
  "attributes": null,
  "content_type": "example",
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "entity_type": "example",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "is_uploaded": false,
  "name": "Example name",
  "size": 1,
  "user_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                            | Description                 |
| -------- | ------------------------------- | --------------------------- |
| `GET`    | `/api/v2/users/me/assets/`      | List user assets            |
| `POST`   | `/api/v2/users/me/assets/`      | Create a user asset upload  |
| `DELETE` | `/api/v2/users/me/assets/{pk}/` | Delete a user asset         |
| `GET`    | `/api/v2/users/me/assets/{pk}/` | Get a user asset            |
| `PATCH`  | `/api/v2/users/me/assets/{pk}/` | Confirm a user asset upload |

## Response shaping

Every user asset read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
