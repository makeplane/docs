---
title: Project features overview
description: The Plane API v2 project feature object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, project features, project feature object
---

# Project features overview

Project features are the per-project toggles for optional Plane surfaces.

<div class="api-two-column">
<div class="api-left">

## The project feature object

### Attributes

- `is_automated_cycle_enabled` _boolean_

  Whether is automated cycle enabled.

- `is_epic_enabled` _boolean_

  Whether is epic enabled.

- `is_manually_start_end_cycles_enabled` _boolean_

  Whether is manually start end cycles enabled.

- `is_milestone_enabled` _boolean_

  Whether is milestone enabled.

- `is_parallel_cycles_enabled` _boolean_

  Whether is parallel cycles enabled.

- `is_project_updates_enabled` _boolean_

  Whether is project updates enabled.

- `is_workflow_enabled` _boolean_

  Whether is workflow enabled.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE PROJECT FEATURE OBJECT">

```json
{
  "is_automated_cycle_enabled": false,
  "is_epic_enabled": false,
  "is_manually_start_end_cycles_enabled": false,
  "is_milestone_enabled": false,
  "is_parallel_cycles_enabled": false,
  "is_project_updates_enabled": false,
  "is_workflow_enabled": false
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method  | Path                                                        | Description             |
| ------- | ----------------------------------------------------------- | ----------------------- |
| `GET`   | `/api/v2/workspaces/{slug}/projects/{project_id}/features/` | Get project features    |
| `PATCH` | `/api/v2/workspaces/{slug}/projects/{project_id}/features/` | Update project features |

## Response shaping

Every project feature read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
