---
title: Teamspaces overview
description: The Plane API v2 teamspace object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, teamspaces, teamspace object
---

# Teamspaces overview

Teamspaces group members and projects under one team.

<div class="api-two-column">
<div class="api-left">

## The teamspace object

### Attributes

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `description_html` _string_

  Rich-text body as HTML. This is the field the Plane editor round-trips.

- `id` _string (uuid)_

  Unique identifier.

- `lead_id` _string (uuid)_

  The related lead.

- `logo_props` _string_

  Editor-owned logo descriptor. Pass back what you read rather than composing it by hand.

- `member_ids` _array of string_

  Ids of the associated members.

- `name` _string_

  Display name.

- `project_ids` _array of string_

  Ids of the associated projects.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE TEAMSPACE OBJECT">

```json
{
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "description_html": "<p>Details go here.</p>",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "lead_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "logo_props": null,
  "member_ids": [["16c61a3a-512a-48ac-b0be-b6b46fe6f430"]],
  "name": "Example name",
  "project_ids": [["16c61a3a-512a-48ac-b0be-b6b46fe6f430"]]
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                         | Description        |
| -------- | -------------------------------------------- | ------------------ |
| `GET`    | `/api/v2/workspaces/{slug}/teamspaces/`      | List teamspaces    |
| `POST`   | `/api/v2/workspaces/{slug}/teamspaces/`      | Create a teamspace |
| `DELETE` | `/api/v2/workspaces/{slug}/teamspaces/{pk}/` | Delete a teamspace |
| `GET`    | `/api/v2/workspaces/{slug}/teamspaces/{pk}/` | Get a teamspace    |
| `PATCH`  | `/api/v2/workspaces/{slug}/teamspaces/{pk}/` | Update a teamspace |

## Response shaping

Every teamspace read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
