---
title: Cycle
pageTitle: Cycle | Plane
description:
---

{% col-2 %}
{% list %}
Cycles is a custom time period in which a team works to complete items on their backlog. At the end of the sprint, the team will usually have finished building and implementing a new version of their project or product.

To transfer issues of one cycle to another, the payload should be sent in the below format

```
{
	"new_cycle_id": "2380ce13-1cc4-4f67-9f57-a2b7686886d7"
}
```

{% /list %}

{% list %}

```
POST   /api/v1/workspaces/:slug/projects/:project_id/cycles/
GET    /api/v1/workspaces/:slug/projects/:project_id/cycles/
GET    /api/v1/workspaces/:slug/projects/:project_id/cycles/:cycle_id/
PATCH  /api/v1/workspaces/:slug/projects/:project_id/cycles/:cycle_id/
DELETE /api/v1/workspaces/:slug/projects/:project_id/cycles/:cycle_id/
POST   /api/v1/workspaces/:slug/projects/:project_id/cycles/:cycle_id/transfer-issues/
```

{% /list %}
{% /col-2 %}

## Cycle Object

{% col-2 %}
{% list %}
**Attributes**

- `name` string (required)

  Name of the cycle

- `description` string

  Description of the cycle

- `start_date` date

  Start date of the cycle

- `end_date` date

  End date of the cycle

- `created_at` _timestamp_

  The timestamp of the time when the project was created

- `updated_at` _timestamp_

  The timestamp of the time when the project was last updated

- `view_props`

  It store the filters and the display properties selected by the user to visualize the issues in the module

- `sort_order`

  It gives the position of the module at which it should be displayed

- `created_by` , `updated_by` _uuid_

  These values are auto saved and represent the id of the user that created or the updated the

- `Project` uuid

  It contains projects uuid which is automatically saved.

- `Workspace` uuid

  It contains workspace uuid which is automatically saved

- `owned_by` uuid

{% /list %}

{% list %}

```
{
	"id": "50ebc791-65e4-4b4d-a164-3b4e529e55a5",
	"created_at": "2023-11-19T12:18:14.900078Z",
	"updated_at": "2023-11-19T12:18:14.900088Z",
	"name": "cycle testing",
	"description": "",
	"start_date": null,
	"end_date": null,
	"view_props": {},
	"sort_order": 35535.0,
	"created_by": "0649cb9d-05c8-4ef4-8e8b-d108ccddd42c",
	"updated_by": "0649cb9d-05c8-4ef4-8e8b-d108ccddd42c",
	"project": "6436c4ae-fba7-45dc-ad4a-5440e17cb1b2",
	"workspace": "c467e125-59e3-44ec-b5ee-f9c1e138c611",
	"owned_by": "0649cb9d-05c8-4ef4-8e8b-d108ccddd42c"
}
```

{% /list %}
{% /col-2 %}
