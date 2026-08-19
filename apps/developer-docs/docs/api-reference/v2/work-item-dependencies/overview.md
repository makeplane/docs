---
title: Work item dependencies overview
description: The Plane API v2 dependency object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, work item dependencies, dependency object
---

# Work item dependencies overview

Dependencies record blocking and scheduling order between work items.

<div class="api-two-column">
<div class="api-left">

## The dependency object

### Attributes

- `blocked_by` _array of string (uuid)_

  The blocked by.

- `blocking` _array of string (uuid)_

  The blocking.

- `finish_after` _array of string (uuid)_

  The finish after.

- `finish_before` _array of string (uuid)_

  The finish before.

- `start_after` _array of string (uuid)_

  The start after.

- `start_before` _array of string (uuid)_

  The start before.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE DEPENDENCY OBJECT">

```json
{
  "blocked_by": ["f960d3c2-8524-4a41-b8eb-055ce4be2a7f"],
  "blocking": ["f960d3c2-8524-4a41-b8eb-055ce4be2a7f"],
  "finish_after": ["f960d3c2-8524-4a41-b8eb-055ce4be2a7f"],
  "finish_before": ["f960d3c2-8524-4a41-b8eb-055ce4be2a7f"],
  "start_after": ["f960d3c2-8524-4a41-b8eb-055ce4be2a7f"],
  "start_before": ["f960d3c2-8524-4a41-b8eb-055ce4be2a7f"]
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                                                                             | Description                   |
| -------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/dependencies/`                        | List work item dependencies   |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/dependencies/`                        | Create work item dependencies |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/dependencies/{related_work_item_id}/` | Delete a work item dependency |

## Response shaping

Every dependency read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
