---
title: Release labels overview
description: The Plane API v2 release label object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, release labels, release label object
---

# Release labels overview

Release labels are the workspace-level label catalog for releases.

<div class="api-two-column">
<div class="api-left">

## The release label object

### Attributes

- `color` _string_

  Hex color used wherever this is rendered, for example `#3f76ff`.

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `id` _string (uuid)_

  Unique identifier.

- `name` _string_

  Display name.

- `sort_order` _integer_

  Manual ordering weight. Lower sorts first.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE RELEASE LABEL OBJECT">

```json
{
  "color": "#3f76ff",
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "name": "Example name",
  "sort_order": 65535
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                              | Description            |
| -------- | ------------------------------------------------- | ---------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/releases/labels/`      | List release labels    |
| `POST`   | `/api/v2/workspaces/{slug}/releases/labels/`      | Create a release label |
| `DELETE` | `/api/v2/workspaces/{slug}/releases/labels/{pk}/` | Delete a release label |
| `GET`    | `/api/v2/workspaces/{slug}/releases/labels/{pk}/` | Get a release label    |
| `PATCH`  | `/api/v2/workspaces/{slug}/releases/labels/{pk}/` | Update a release label |

## Response shaping

Every release label read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
