---
title: Collections overview
description: The Plane API v2 collection object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, collections, collection object
---

# Collections overview

Collections group wiki pages in a workspace.

<div class="api-two-column">
<div class="api-left">

## The collection object

### Attributes

- `access` _integer_

  Who can see this.

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `id` _string (uuid)_

  Unique identifier.

- `is_default` _boolean_

  Make this the default for its parent. Setting it clears the flag on the previous default.

- `is_global` _boolean_

  Whether this lives at the workspace level rather than inside a project.

- `logo_props` _string_

  Editor-owned logo descriptor. Pass back what you read rather than composing it by hand.

- `name` _string_

  Display name.

- `owned_by_id` _string (uuid)_

  The related owned by.

- `page_ids` _array of string_

  Ids of the associated pages.

- `sort_order` _number_

  Manual ordering weight. Lower sorts first.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE COLLECTION OBJECT">

```json
{
  "access": 0,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "is_default": false,
  "is_global": false,
  "logo_props": null,
  "name": "Example name",
  "owned_by_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "page_ids": [["16c61a3a-512a-48ac-b0be-b6b46fe6f430"]],
  "sort_order": 65535
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                       | Description                         |
| -------- | ---------------------------------------------------------- | ----------------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/collections/{pk}/members/`      | List collection members             |
| `GET`    | `/api/v2/workspaces/{slug}/collections/`                   | List collections                    |
| `GET`    | `/api/v2/workspaces/{slug}/collections/{pk}/`              | Get a collection                    |
| `POST`   | `/api/v2/workspaces/{slug}/collections/`                   | Create a collection                 |
| `PATCH`  | `/api/v2/workspaces/{slug}/collections/{pk}/`              | Update a collection                 |
| `DELETE` | `/api/v2/workspaces/{slug}/collections/{pk}/`              | Delete a collection                 |
| `POST`   | `/api/v2/workspaces/{slug}/collections/{pk}/members/`      | Add or remove collection members    |
| `POST`   | `/api/v2/workspaces/{slug}/collections/{pk}/pages/`        | Add or remove pages in a collection |
| `GET`    | `/api/v2/workspaces/{slug}/collections/{pk}/pages-search/` | Search pages for a collection       |

## Response shaping

Every collection read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
