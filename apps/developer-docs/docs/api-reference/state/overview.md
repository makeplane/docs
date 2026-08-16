---
title: Overview
description: Plane State API overview. Learn about endpoints, request/response format, and how to work with state via REST API.
keywords: plane, plane api, rest api, api integration, states, workflow, status
---

# Overview

States represent the current status of a work item in your project workflow.

[Learn more about States](https://docs.plane.so/core-concepts/work-items/states)

<div class="api-two-column">
<div class="api-left">

## The State Object

### Attributes

- `name` _string_ **( required )**

  Name of the state

- `created_at` , `updated_at` _timestamp_

  Timestamp of the issue when it was created and when it was last updated

- `description` _string_

  Description of the state

- `color` _string_ **(required)**

  String code of the color

- `workspace_slug` _string_

  Slugified name of the state auto generated from the system

- `sequence` _string_

  Auto generated sequence of the state for ordering.

- `group` _string_ **(required)**

  Group to which the state belongs can only take values
  - backlog
  - unstarted
  - started
  - completed
  - cancelled

- `default` _boolean_

  Is it the default state in which if the issues are not assigned any states all the issues are created in this state.

- `created_by` & `updated_by`

  This values are auto saved and represent the id of the user that created or the updated the project.

- `project` _uuid_

  The project which the issue is part of auto generated from backend

- `workspace` _uuid_

  The workspace which the issue is part of auto generated from backend

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE STATE OBJECT">

```json
{
  "id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "created_at": "2023-11-19T17:41:45.478363Z",
  "updated_at": "2023-11-19T17:41:45.478383Z",
  "name": "Ideation",
  "description": "",
  "color": "#eb5757",
  "workspace_slug": "ideation",
  "sequence": 130000.0,
  "group": "unstarted",
  "default": false,
  "created_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "updated_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "project": "4af68566-94a4-4eb3-94aa-50dc9427067b",
  "workspace": "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4"
}
```

</ResponsePanel>

</div>
</div>
