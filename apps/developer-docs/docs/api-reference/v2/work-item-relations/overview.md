---
title: Work item relations overview
description: The Plane API v2 relation object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, work item relations, relation object
---

# Work item relations overview

Relations connect work items using the workspace's relation definitions.

## Endpoints

| Method   | Path                                                                                                          | Description                 |
| -------- | ------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/relations/`                        | List work item relations    |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/relations/`                        | Create work item relations  |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/relations/{related_work_item_id}/` | Delete a work item relation |

## Response shaping

Every relation read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
