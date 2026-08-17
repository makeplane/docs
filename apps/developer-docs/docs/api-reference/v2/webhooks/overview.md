---
title: Webhooks overview
description: The Plane API v2 webhook object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, webhooks, webhook object
---

# Webhooks overview

Webhooks push Plane events to a URL you control.

<div class="api-two-column">
<div class="api-left">

## The webhook object

### Attributes

- `content_type` _string_

  The content type.

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `id` _string (uuid)_

  Unique identifier.

- `is_active` _boolean_

  Whether the record is active.

- `name` _string_

  Display name.

- `scopes` _array of string_

  The scopes.

- `url` _string (uri)_

  Target URL.

- `version` _string_

  Version string, for example `1.4.0`.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE WEBHOOK OBJECT">

```json
{
  "content_type": "application/json",
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "is_active": true,
  "name": "Example name",
  "scopes": ["example"],
  "url": "https://example.com/spec",
  "version": "1.4.0"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                  | Description                 |
| -------- | ----------------------------------------------------- | --------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/webhooks/`                 | List webhooks               |
| `POST`   | `/api/v2/workspaces/{slug}/webhooks/`                 | Create a webhook            |
| `DELETE` | `/api/v2/workspaces/{slug}/webhooks/{pk}/`            | Delete a webhook            |
| `GET`    | `/api/v2/workspaces/{slug}/webhooks/{pk}/`            | Get a webhook               |
| `PATCH`  | `/api/v2/workspaces/{slug}/webhooks/{pk}/`            | Update a webhook            |
| `POST`   | `/api/v2/workspaces/{slug}/webhooks/{pk}/regenerate/` | Regenerate a webhook secret |

## Response shaping

Every webhook read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
