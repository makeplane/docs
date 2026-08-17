---
title: Project pages overview
description: The Plane API v2 project page object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, project pages, project page object
---

# Project pages overview

Project pages are the documents that live inside a project.

<div class="api-two-column">
<div class="api-left">

## The project page object

### Attributes

- `access` _integer_

  Who can see this.

- `archived_at` _string (date-time)_

  When the record was archived, or `null` if it is active.

- `collection_id` _string_

  The related collection.

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

- `external_id` _string_

  Your system's identifier for this record, for sync and import correlation.

- `external_source` _string_

  The system `external_id` came from, for example `github` or `jira`.

- `id` _string (uuid)_

  Unique identifier.

- `is_global` _boolean_

  Whether this lives at the workspace level rather than inside a project.

- `is_locked` _boolean_

  Prevents further edits to the content.

- `logo_props` _string_

  Editor-owned logo descriptor. Pass back what you read rather than composing it by hand.

- `name` _string_

  Display name.

- `owned_by_id` _string (uuid)_

  The related owned by.

- `parent_id` _string (uuid)_

  The related parent.

- `sort_order` _number_

  Manual ordering weight. Lower sorts first.

- `view_props` _string_

  Editor-owned layout descriptor. Pass back what you read.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE PROJECT PAGE OBJECT">

```json
{
  "access": 0,
  "archived_at": null,
  "collection_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "color": "#3f76ff",
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "description_html": "<p>Details go here.</p>",
  "description_stripped": "example",
  "external_id": null,
  "external_source": null,
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "is_global": false,
  "is_locked": false,
  "logo_props": null,
  "name": "Example name",
  "owned_by_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "parent_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "sort_order": 65535,
  "view_props": null
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                          | Description           |
| -------- | ------------------------------------------------------------- | --------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/pages/`      | List project pages    |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/pages/`      | Create a project page |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/pages/{pk}/` | Delete a project page |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/pages/{pk}/` | Get a project page    |
| `PATCH`  | `/api/v2/workspaces/{slug}/projects/{project_id}/pages/{pk}/` | Update a project page |

## Response shaping

Every project page read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
