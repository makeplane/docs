---
title: Stickies overview
description: The Plane API v2 sticky object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, stickies, sticky object
---

# Stickies overview

Stickies are private notes owned by the calling user.

<div class="api-two-column">
<div class="api-left">

## The sticky object

### Attributes

- `background_color` _string_

  The background color.

- `color` _string_

  Hex color used wherever this is rendered, for example `#3f76ff`.

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `description_html` _string_

  Rich-text body as HTML. This is the field the Plane editor round-trips.

- `description_stripped` _string_

  The description stripped.

- `id` _string (uuid)_

  Unique identifier.

- `logo_props` _string_

  Editor-owned logo descriptor. Pass back what you read rather than composing it by hand.

- `name` _string_

  Display name.

- `owner_id` _string (uuid)_

  The related owner.

- `sort_order` _number_

  Manual ordering weight. Lower sorts first.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE STICKY OBJECT">

```json
{
  "background_color": "example",
  "color": "#3f76ff",
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "description_html": "<p>Details go here.</p>",
  "description_stripped": "example",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "logo_props": null,
  "name": "Example name",
  "owner_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "sort_order": 65535
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                       | Description     |
| -------- | ------------------------------------------ | --------------- |
| `GET`    | `/api/v2/workspaces/{slug}/stickies/`      | List stickies   |
| `GET`    | `/api/v2/workspaces/{slug}/stickies/{pk}/` | Get a sticky    |
| `POST`   | `/api/v2/workspaces/{slug}/stickies/`      | Create a sticky |
| `PATCH`  | `/api/v2/workspaces/{slug}/stickies/{pk}/` | Update a sticky |
| `DELETE` | `/api/v2/workspaces/{slug}/stickies/{pk}/` | Delete a sticky |

## Response shaping

Every sticky read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
