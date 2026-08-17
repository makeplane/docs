---
title: Workflows overview
description: The Plane API v2 workflow object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, workflows, workflow object
---

# Workflows overview

Workflows constrain how work items move between states in a project.

<div class="api-two-column">
<div class="api-left">

## The workflow object

### Attributes

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `description` _string_

  Free-form description.

- `id` _string (uuid)_

  Unique identifier.

- `is_active` _boolean_

  Whether the record is active.

- `is_default` _boolean_

  Make this the default for its parent. Setting it clears the flag on the previous default.

- `name` _string_

  Display name.

- `work_item_type_ids` _array of string_

  Ids of the associated work item types.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE WORKFLOW OBJECT">

```json
{
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "description": "What this is for.",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "is_active": true,
  "is_default": false,
  "name": "Example name",
  "work_item_type_ids": [["16c61a3a-512a-48ac-b0be-b6b46fe6f430"]]
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                              | Description       |
| -------- | ----------------------------------------------------------------- | ----------------- |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/workflows/`      | List workflows    |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/workflows/`      | Create a workflow |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/workflows/{pk}/` | Delete a workflow |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/workflows/{pk}/` | Get a workflow    |
| `PATCH`  | `/api/v2/workspaces/{slug}/projects/{project_id}/workflows/{pk}/` | Update a workflow |

## Response shaping

Every workflow read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
