---
title: Workspace automations overview
description: The Plane API v2 workspace automation object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, workspace automations, workspace automation object
---

# Workspace automations overview

Workspace automations are rule graphs that run across a workspace.

<div class="api-two-column">
<div class="api-left">

## The workspace automation object

### Attributes

- `actor_id` _string (uuid)_

  The related actor.

- `automation_edge_id` _string (uuid)_

  The related automation edge.

- `automation_id` _string (uuid)_

  The related automation.

- `automation_node_id` _string (uuid)_

  The related automation node.

- `automation_run_id` _string (uuid)_

  The related automation run.

- `automation_scope` _string_

  The automation scope.

- `automation_version_id` _string (uuid)_

  The related automation version.

- `created_at` _string (date-time)_

  When the record was created.

- `epoch` _number_

  The epoch.

- `field` _string_

  The field.

- `id` _string (uuid)_

  Unique identifier.

- `new_identifier` _string (uuid)_

  The new identifier.

- `new_value` _string_

  The new value.

- `node_execution_id` _string (uuid)_

  The related node execution.

- `old_identifier` _string (uuid)_

  The old identifier.

- `old_value` _string_

  The old value.

- `verb` _string_

  The verb.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE WORKSPACE AUTOMATION OBJECT">

```json
{
  "actor_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "automation_edge_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "automation_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "automation_node_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "automation_run_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "automation_scope": "example",
  "automation_version_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "created_at": "2026-01-14T09:22:41.478363Z",
  "epoch": 1,
  "field": "example",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "new_identifier": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "new_value": "example",
  "node_execution_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "old_identifier": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "old_value": "example",
  "verb": "example"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                                                          | Description                                  |
| -------- | --------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/automations/`                                                      | List workspace automations                   |
| `POST`   | `/api/v2/workspaces/{slug}/automations/`                                                      | Create a workspace automation                |
| `GET`    | `/api/v2/workspaces/{slug}/automations/{automation_id}/activities/`                           | List automation activities                   |
| `GET`    | `/api/v2/workspaces/{slug}/automations/{automation_id}/activities/{pk}/`                      | Get a automation activity                    |
| `GET`    | `/api/v2/workspaces/{slug}/automations/{automation_id}/edges/`                                | List automation edges                        |
| `POST`   | `/api/v2/workspaces/{slug}/automations/{automation_id}/edges/`                                | Create a automation edge                     |
| `DELETE` | `/api/v2/workspaces/{slug}/automations/{automation_id}/edges/{pk}/`                           | Delete a automation edge                     |
| `GET`    | `/api/v2/workspaces/{slug}/automations/{automation_id}/edges/{pk}/`                           | Get a automation edge                        |
| `PATCH`  | `/api/v2/workspaces/{slug}/automations/{automation_id}/edges/{pk}/`                           | Update a automation edge                     |
| `GET`    | `/api/v2/workspaces/{slug}/automations/{automation_id}/nodes/`                                | List automation nodes                        |
| `POST`   | `/api/v2/workspaces/{slug}/automations/{automation_id}/nodes/`                                | Create a automation node                     |
| `DELETE` | `/api/v2/workspaces/{slug}/automations/{automation_id}/nodes/{pk}/`                           | Delete a automation node                     |
| `GET`    | `/api/v2/workspaces/{slug}/automations/{automation_id}/nodes/{pk}/`                           | Get a automation node                        |
| `PATCH`  | `/api/v2/workspaces/{slug}/automations/{automation_id}/nodes/{pk}/`                           | Update a automation node                     |
| `POST`   | `/api/v2/workspaces/{slug}/automations/{automation_id}/nodes/{pk}/regenerate-webhook-secret/` | Regenerate an automation node webhook secret |
| `DELETE` | `/api/v2/workspaces/{slug}/automations/{pk}/`                                                 | Delete a workspace automation                |
| `GET`    | `/api/v2/workspaces/{slug}/automations/{pk}/`                                                 | Get a workspace automation                   |
| `PATCH`  | `/api/v2/workspaces/{slug}/automations/{pk}/`                                                 | Update a workspace automation                |
| `POST`   | `/api/v2/workspaces/{slug}/automations/{pk}/status/`                                          | Enable or disable a workspace automation     |

## Response shaping

Every workspace automation read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
