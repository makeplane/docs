---
title: Workflow states overview
description: The Plane API v2 workflow state object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, workflow states, workflow state object
---

# Workflow states overview

Workflow states are the states attached to a project workflow.

<div class="api-two-column">
<div class="api-left">

## The workflow state object

### Attributes

- `allow_issue_creation` _boolean_

  Whether allow issue creation.

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `id` _string (uuid)_

  Unique identifier.

- `is_default` _boolean_

  Make this the default for its parent. Setting it clears the flag on the previous default.

- `state_id` _string (uuid)_

  The related state.

- `type` _string_

  The type.

- `workflow_id` _string (uuid)_

  The related workflow.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE WORKFLOW STATE OBJECT">

```json
{
  "allow_issue_creation": false,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "is_default": false,
  "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "type": "example",
  "workflow_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                                                   | Description             |
| -------- | -------------------------------------------------------------------------------------- | ----------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/workflows/{workflow_id}/states/`      | List workflow states    |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/workflows/{workflow_id}/states/{pk}/` | Get a workflow state    |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/workflows/{workflow_id}/states/`      | Create a workflow state |
| `PATCH`  | `/api/v2/workspaces/{slug}/projects/{project_id}/workflows/{workflow_id}/states/{pk}/` | Update a workflow state |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/workflows/{workflow_id}/states/{pk}/` | Delete a workflow state |

## Response shaping

Every workflow state read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
