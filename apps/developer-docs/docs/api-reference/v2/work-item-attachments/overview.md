---
title: Work item attachments overview
description: The Plane API v2 attachment object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, work item attachments, attachment object
---

# Work item attachments overview

Attachments are files uploaded against a work item.

<div class="api-two-column">
<div class="api-left">

## The attachment object

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

- `work_item_id` _string (uuid)_

  The related work item.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE ATTACHMENT OBJECT">

```json
{
  "asset_url": "https://example.com",
  "attributes": null,
  "content_type": "example",
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "external_id": null,
  "external_source": null,
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "is_uploaded": false,
  "name": "Example name",
  "size": 1,
  "work_item_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                                                          | Description                           |
| -------- | --------------------------------------------------------------------------------------------- | ------------------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/attachments/`      | List attachments                      |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/attachments/`      | Create a work item attachment upload  |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/attachments/{pk}/` | Delete a attachment                   |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/attachments/{pk}/` | Get a attachment                      |
| `PATCH`  | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/attachments/{pk}/` | Confirm a work item attachment upload |

## Response shaping

Every attachment read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
