---
title: Issue
pageTitle: Issue | Plane
description:
---

{% col-2 %}
{% list %}
Inside an issue, you can add as many details as you like to get your work done.
{% /list %}

{% list %}

```
POST   /api/v1/workspaces/:slug/projects/:project_id/issues/
GET    /api/v1/workspaces/:slug/projects/:project_id/issues/
GET    /api/v1/workspaces/:slug/projects/:project_id/issues/:issue_id/
PATCH  /api/v1/workspaces/:slug/projects/:project_id/issues/:issue_id/
DELETE /api/v1/workspaces/:slug/projects/:project_id/issues/:issue_id/
```

{% /list %}
{% /col-2 %}

## Issue Object

{% col-2 %}
{% list %}
**Attributes**

- `name` _string_ **(required)**

  Name of the issues

- `created_at` , `updated_at` _timestamp_

  Timestamp of the issue when it was created and when it was last updated

- `estimate_point` _integer_ or _null_

  Total estimate points for the issue takes value between (0,7).

- `description_html` _string_

  HTML description of the issue

- `description_stripped` _string_

  Stripped version of the html description auto generated using the application.

- `priority` _string_

  Priority of the issue takes in 5 values

  - none
  - urgent
  - high
  - medium
  - low

- `start_date` _date_

  Start date of the issue

- `target_date` _date_

  Target date of the issue

- `sequence_id` _integer_

  Auto generated from the system the unique identifier of the issue

- `sort_order` _decimal_

  Auto generated from the system during creation used for ordering

- `completed_at` _timestamp_ or _null_

  Timestamp when the issue is moved to any completed group state

- `created_by` & `updated_by`

  This values are auto saved and represent the id of the user that created or the updated the project.

- `project` _uuid_

  The project which the issue is part of auto generated from backend

- `workspace` _uuid_

  The workspace which the issue is part of auto generated from backend

- `parent` _uuid_

  The uuid of the parent issue which should be part of the same workspace

- `state` _uuid_

  The uuid of the state which is present in the project where the issue is being created.

- `assignees` - _[uuid,]_

  The array of uuids of the users who are part of the project where the issue is being created or updated.

- `labels` - _[uuid,]_

  The array of uuids of the labels which are present in the project where the issue is being created or updated.

{% /list %}

{% list %}

```
{
	"id": "e1c25c66-5bb8-465e-a818-92a483423443",
	"created_at": "2023-11-19T11:56:55.176802Z",
	"updated_at": "2023-11-19T11:56:55.176809Z",
	"estimate_point": null,
	"name": "First Issue",
	"description_html": "<p></p>",
	"description_stripped": "",
	"priority": "none",
	"start_date": "2023-09-01",
	"target_date": "2023-10-04",
	"sequence_id": 421,
	"sort_order": 265535.0,
	"completed_at": null,
	"archived_at": null,
	"is_draft": false,
	"created_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
	"updated_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
	"project": "4af68566-94a4-4eb3-94aa-50dc9427067b",
	"workspace": "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4",
	"parent": null,
	"state": "f3f045db-7e74-49f2-b3b2-0b7dee4635ae",
	"assignees": [
		"797b5aea-3f40-4199-be84-5f94e0d04501"
	],
	"labels": []
}
```

{% /list %}
{% /col-2 %}
