---
title: Workflow transitions overview
description: The Plane API v2 workflow transition object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, workflow transitions, workflow transition object
---

# Workflow transitions overview

Workflow transitions define the legal moves between workflow states, and who may approve them.

<div class="api-two-column">
<div class="api-left">

## The workflow transition object

### Attributes

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `id` _string (uuid)_

  Unique identifier.

- `member_ids` _array of string_

  Ids of the associated members.

- `rejection_state_id` _string (uuid)_

  The related rejection state.

- `required_approvals` _integer_

  How many approvals a transition needs before it may run.

- `transition_state_id` _string (uuid)_

  The related transition state.

- `workflow_state_id` _string (uuid)_

  The related workflow state.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE WORKFLOW TRANSITION OBJECT">

```json
{
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "member_ids": [["16c61a3a-512a-48ac-b0be-b6b46fe6f430"]],
  "rejection_state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "required_approvals": 1,
  "transition_state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "workflow_state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                                                              | Description                  |
| -------- | ------------------------------------------------------------------------------------------------- | ---------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/workflows/{workflow_id}/state-transitions/`      | List workflow transitions    |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/workflows/{workflow_id}/state-transitions/{pk}/` | Get a workflow transition    |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/workflows/{workflow_id}/state-transitions/`      | Create a workflow transition |
| `PATCH`  | `/api/v2/workspaces/{slug}/projects/{project_id}/workflows/{workflow_id}/state-transitions/{pk}/` | Update a workflow transition |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/workflows/{workflow_id}/state-transitions/{pk}/` | Delete a workflow transition |

## Response shaping

Every workflow transition read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
