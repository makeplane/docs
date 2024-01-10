---
title: State
pageTitle: State | Plane
description:
---

{% col-2 %}
{% list %}
State is the current status of the issue
{% /list %}

{% list %}

```
POST   /api/v1/workspaces/:slug/projects/:project_id/states/
GET    /api/v1/workspaces/:slug/projects/:project_id/states/
GET    /api/v1/workspaces/:slug/projects/:project_id/states/:state_id/
PATCH  /api/v1/workspaces/:slug/projects/:project_id/states/:state_id/
DELETE /api/v1/workspaces/:slug/projects/:project_id/states/:state_id/
```

{% /list %}
{% /col-2 %}

## State Object

{% col-2 %}
{% list %}
**Attributes**

- `name` _string_ **( required )**

  Name of the state

- `created_at` , `updated_at` _timestamp_

  Timestamp of the issue when it was created and when it was last updated

- `description` _string_

  Description of the state

- `color` _string_ **(required)**

  String code of the color

- `slug` _string_

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

{% /list %}

{% list %}

```
{
	"id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
	"created_at": "2023-11-19T17:41:45.478363Z",
	"updated_at": "2023-11-19T17:41:45.478383Z",
	"name": "Ideation",
	"description": "",
	"color": "#eb5757",
	"slug": "ideation",
	"sequence": 130000.0,
	"group": "unstarted",
	"default": false,
	"created_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
	"updated_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
	"project": "4af68566-94a4-4eb3-94aa-50dc9427067b",
	"workspace": "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4"
}
```

{% /list %}

{% /col-2 %}
