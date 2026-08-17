---
title: Workspace assets overview
description: The Plane API v2 workspace asset object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, workspace assets, workspace asset object
---

# Workspace assets overview

Workspace assets are files uploaded against a workspace.

<div class="api-two-column">
<div class="api-left">

## The workspace asset object

### Attributes

- `asset_url` _string_

  The asset url.

- `attributes` _string_

  The attributes.

- `content_type` _string_

  The content type.

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `entity_type` _string_

  The entity type.

- `external_id` _string_

  Your system's identifier for this record, for sync and import correlation.

- `external_source` _string_

  The system `external_id` came from, for example `github` or `jira`.

- `id` _string (uuid)_

  Unique identifier.

- `is_uploaded` _boolean_

  Whether is uploaded.

- `name` _string_

  Display name.

- `size` _number_

  The size.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE WORKSPACE ASSET OBJECT">

```json
{
  "asset_url": "https://example.com",
  "attributes": null,
  "content_type": "example",
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "entity_type": "example",
  "external_id": null,
  "external_source": null,
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "is_uploaded": false,
  "name": "Example name",
  "size": 1
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                     | Description                      |
| -------- | ---------------------------------------- | -------------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/assets/`      | List workspace assets            |
| `POST`   | `/api/v2/workspaces/{slug}/assets/`      | Create a workspace asset upload  |
| `DELETE` | `/api/v2/workspaces/{slug}/assets/{pk}/` | Delete a asset                   |
| `GET`    | `/api/v2/workspaces/{slug}/assets/{pk}/` | Get a asset                      |
| `PATCH`  | `/api/v2/workspaces/{slug}/assets/{pk}/` | Confirm a workspace asset upload |

## Response shaping

Every workspace asset read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
