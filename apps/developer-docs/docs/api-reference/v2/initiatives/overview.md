---
title: Initiatives overview
description: The Plane API v2 initiative object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, initiatives, initiative object
---

# Initiatives overview

Initiatives group projects and work items under one strategic objective.

<div class="api-two-column">
<div class="api-left">

## The initiative object

### Attributes

- `archived_at` _string (date-time)_

  When the record was archived, or `null` if it is active.

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `description` _string_

  Free-form description.

- `description_html` _string_

  Rich-text body as HTML. This is the field the Plane editor round-trips.

- `end_date` _string (date-time)_

  End date, as `YYYY-MM-DD`.

- `id` _string (uuid)_

  Unique identifier.

- `label_ids` _array of string_

  Ids of the associated labels.

- `lead_id` _string (uuid)_

  The related lead.

- `logo_props` _string_

  Editor-owned logo descriptor. Pass back what you read rather than composing it by hand.

- `name` _string_

  Display name.

- `project_ids` _array of string_

  Ids of the associated projects.

- `start_date` _string (date-time)_

  Planned start date, as `YYYY-MM-DD`.

- `state` _string_

  The state.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE INITIATIVE OBJECT">

```json
{
  "archived_at": null,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "description": "What this is for.",
  "description_html": "<p>Details go here.</p>",
  "end_date": "2026-01-31",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "label_ids": [["16c61a3a-512a-48ac-b0be-b6b46fe6f430"]],
  "lead_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "logo_props": null,
  "name": "Example name",
  "project_ids": [["16c61a3a-512a-48ac-b0be-b6b46fe6f430"]],
  "start_date": "2026-01-12",
  "state": "DRAFT"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                     | Description                         |
| -------- | -------------------------------------------------------- | ----------------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/initiatives/`                 | List initiatives                    |
| `POST`   | `/api/v2/workspaces/{slug}/initiatives/`                 | Create a initiative                 |
| `DELETE` | `/api/v2/workspaces/{slug}/initiatives/{pk}/`            | Delete a initiative                 |
| `GET`    | `/api/v2/workspaces/{slug}/initiatives/{pk}/`            | Get a initiative                    |
| `PATCH`  | `/api/v2/workspaces/{slug}/initiatives/{pk}/`            | Update a initiative                 |
| `POST`   | `/api/v2/workspaces/{slug}/initiatives/{pk}/labels/`     | Add or remove initiative labels     |
| `POST`   | `/api/v2/workspaces/{slug}/initiatives/{pk}/projects/`   | Add or remove initiative projects   |
| `POST`   | `/api/v2/workspaces/{slug}/initiatives/{pk}/work-items/` | Add or remove initiative work items |

## Response shaping

Every initiative read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
