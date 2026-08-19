---
title: Project work item templates overview
description: The Plane API v2 project work item template object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, project work item templates, project work item template object
---

# Project work item templates overview

Project work item templates pre-fill new work items in one project.

<div class="api-two-column">
<div class="api-left">

## The project work item template object

### Attributes

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `description_html` _string_

  Rich-text body as HTML. This is the field the Plane editor round-trips.

- `id` _string (uuid)_

  Unique identifier.

- `is_published` _boolean_

  Whether is published.

- `name` _string_

  Display name.

- `short_description` _string_

  The short description.

- `short_id` _string_

  The related short.

- `slug` _string_

  The slug.

- `template_data` _object_

  The template data.

- `template_type` _string_

  The template type.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE PROJECT WORK ITEM TEMPLATE OBJECT">

```json
{
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "description_html": "<p>Details go here.</p>",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "is_published": false,
  "name": "Example name",
  "short_description": "example",
  "short_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "slug": "my-team",
  "template_data": {},
  "template_type": "example"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                                            | Description                         |
| -------- | ------------------------------------------------------------------------------- | ----------------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/work-item-templates/`          | List project work item templates    |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/work-item-templates/{pk}/`     | Get a project work item template    |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/work-item-templates/`          | Create a project work item template |
| `PATCH`  | `/api/v2/workspaces/{slug}/projects/{project_id}/work-item-templates/{pk}/`     | Update a project work item template |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/work-item-templates/{pk}/`     | Delete a project work item template |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/work-item-templates/{pk}/use/` | Create a work item from a template  |

## Response shaping

Every project work item template read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
