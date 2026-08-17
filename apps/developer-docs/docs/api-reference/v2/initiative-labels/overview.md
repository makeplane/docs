---
title: Initiative labels overview
description: The Plane API v2 initiative label object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, initiative labels, initiative label object
---

# Initiative labels overview

Initiative labels are the workspace-level label catalog for initiatives.

<div class="api-two-column">
<div class="api-left">

## The initiative label object

### Attributes

- `color` _string_

  Hex color used wherever this is rendered, for example `#3f76ff`.

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `description` _string_

  Free-form description.

- `id` _string (uuid)_

  Unique identifier.

- `name` _string_

  Display name.

- `sort_order` _number_

  Manual ordering weight. Lower sorts first.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE INITIATIVE LABEL OBJECT">

```json
{
  "color": "#3f76ff",
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "description": "What this is for.",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "name": "Example name",
  "sort_order": 65535
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                 | Description               |
| -------- | ---------------------------------------------------- | ------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/initiatives/labels/`      | List initiative labels    |
| `POST`   | `/api/v2/workspaces/{slug}/initiatives/labels/`      | Create a initiative label |
| `DELETE` | `/api/v2/workspaces/{slug}/initiatives/labels/{pk}/` | Delete a initiative label |
| `GET`    | `/api/v2/workspaces/{slug}/initiatives/labels/{pk}/` | Get a initiative label    |
| `PATCH`  | `/api/v2/workspaces/{slug}/initiatives/labels/{pk}/` | Update a initiative label |

## Response shaping

Every initiative label read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
