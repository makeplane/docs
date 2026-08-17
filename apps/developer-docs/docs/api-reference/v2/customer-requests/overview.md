---
title: Customer requests overview
description: The Plane API v2 customer request object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, customer requests, customer request object
---

# Customer requests overview

Customer requests capture what a customer asked for, and link that ask to work items.

<div class="api-two-column">
<div class="api-left">

## The customer request object

### Attributes

- `archived_at` _string (date-time)_

  When the record was archived, or `null` if it is active.

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `customer_id` _string (uuid)_

  The related customer.

- `description` _string_

  Free-form description.

- `description_html` _string_

  Rich-text body as HTML. This is the field the Plane editor round-trips.

- `id` _string (uuid)_

  Unique identifier.

- `link` _string (uri)_

  The link.

- `name` _string_

  Display name.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE CUSTOMER REQUEST OBJECT">

```json
{
  "archived_at": null,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "customer_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "description": "What this is for.",
  "description_html": "<p>Details go here.</p>",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "link": "https://example.com",
  "name": "Example name"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                               | Description               |
| -------- | ------------------------------------------------------------------ | ------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/customers/{customer_id}/requests/`      | List customer requests    |
| `POST`   | `/api/v2/workspaces/{slug}/customers/{customer_id}/requests/`      | Create a customer request |
| `DELETE` | `/api/v2/workspaces/{slug}/customers/{customer_id}/requests/{pk}/` | Delete a customer request |
| `GET`    | `/api/v2/workspaces/{slug}/customers/{customer_id}/requests/{pk}/` | Get a customer request    |
| `PATCH`  | `/api/v2/workspaces/{slug}/customers/{customer_id}/requests/{pk}/` | Update a customer request |

## Response shaping

Every customer request read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
