---
title: Invitations overview
description: The Plane API v2 invitation object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, invitations, invitation object
---

# Invitations overview

Invitations are pending workspace membership offers.

<div class="api-two-column">
<div class="api-left">

## The invitation object

### Attributes

- `accepted` _boolean_

  Whether accepted.

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `email` _string_

  Email address.

- `id` _string (uuid)_

  Unique identifier.

- `message` _string_

  The message.

- `responded_at` _string (date-time)_

  The responded at.

- `role` _string_

  Role to grant.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE INVITATION OBJECT">

```json
{
  "accepted": false,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "email": "ana@example.com",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "message": "example",
  "responded_at": "2026-01-14T09:22:41.478363Z",
  "role": "example"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                          | Description            |
| -------- | --------------------------------------------- | ---------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/invitations/`      | List invitations       |
| `POST`   | `/api/v2/workspaces/{slug}/invitations/`      | Create a invitation    |
| `POST`   | `/api/v2/workspaces/{slug}/invitations/bulk/` | Bulk write invitations |
| `DELETE` | `/api/v2/workspaces/{slug}/invitations/{pk}/` | Delete a invitation    |
| `GET`    | `/api/v2/workspaces/{slug}/invitations/{pk}/` | Get a invitation       |

## Response shaping

Every invitation read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
