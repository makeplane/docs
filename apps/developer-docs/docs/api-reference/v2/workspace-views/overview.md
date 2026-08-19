---
title: Workspace views overview
description: The Plane API v2 workspace view object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, workspace views, workspace view object
---

# Workspace views overview

Workspace views are saved filter-and-layout combinations across a workspace.

<div class="api-two-column">
<div class="api-left">

## The workspace view object

### Attributes

- `access` _integer_

  Who can see this.

- `archived_at` _string (date-time)_

  When the record was archived, or `null` if it is active.

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `description` _string_

  Free-form description.

- `display_filters` _string_

  Saved display options — grouping, ordering and layout.

- `display_properties` _string_

  The display properties.

- `filters` _string_

  Saved filter set, in the same shape the list endpoints accept.

- `id` _string (uuid)_

  Unique identifier.

- `is_locked` _boolean_

  Prevents further edits to the content.

- `logo_props` _string_

  Editor-owned logo descriptor. Pass back what you read rather than composing it by hand.

- `name` _string_

  Display name.

- `owned_by_id` _string (uuid)_

  The related owned by.

- `pql_filters` _string_

  The pql filters.

- `query` _string_

  The query.

- `sort_order` _number_

  Manual ordering weight. Lower sorts first.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE WORKSPACE VIEW OBJECT">

```json
{
  "access": 0,
  "archived_at": null,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "description": "What this is for.",
  "display_filters": null,
  "display_properties": null,
  "filters": null,
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "is_locked": false,
  "logo_props": null,
  "name": "Example name",
  "owned_by_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "pql_filters": null,
  "query": null,
  "sort_order": 65535
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                    | Description             |
| -------- | --------------------------------------- | ----------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/views/`      | List workspace views    |
| `GET`    | `/api/v2/workspaces/{slug}/views/{pk}/` | Get a workspace view    |
| `POST`   | `/api/v2/workspaces/{slug}/views/`      | Create a workspace view |
| `PATCH`  | `/api/v2/workspaces/{slug}/views/{pk}/` | Update a workspace view |
| `DELETE` | `/api/v2/workspaces/{slug}/views/{pk}/` | Delete a workspace view |

## Response shaping

Every workspace view read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
