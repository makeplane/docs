---
title: Links
pageTitle: Links | Plane
description:
---

{% col-2 %}
{% list %}
Links can be added to an issue to point to some external resources
{% /list %}
{% list %}

```
POST   /api/v1/workspaces/:slug/projects/:project_id/issues/:issue_id/links/
GET    /api/v1/workspaces/:slug/projects/:project_id/issues/:issue_id/links/
GET    /api/v1/workspaces/:slug/projects/:project_id/issues/:issue_id/links/:link_id/
PATCH  /api/v1/workspaces/:slug/projects/:project_id/issues/:issue_id/links/:link_id/
DELETE /api/v1/workspaces/:slug/projects/:project_id/issues/:issue_id/links/:link_id/
```

{% /list %}
{% /col-2 %}

{% col-2 %}
{% list %}

## Link object

- `title` _string_

  Title of the url

- `url` _url_ **(required)**

  Url of the external link

- `metadata` _json_

  Metadata from the resource

- `created_at` , `updated_at` _timestamp_

  Timestamp of the issue when it was created and when it was last updated.

- `created_by` & `updated_by`

  This values are auto saved and represent the id of the user that created or the updated the project.

- `project` _uuid_

  The project which the issue is part of auto generated from backend

- `workspace` _uuid_

  The workspace which the issue is part of auto generated from backend

- `issue` _uuid_

  The issue which the link is attached to

{% /list %}
{% list %}

```
{
	"id": "662dd6b2-2b01-4315-955f-480eb51baa14",
	"created_at": "2023-11-20T06:23:10.270664Z",
	"updated_at": "2023-11-20T06:23:10.270689Z",
	"title": "Plane Website",
	"url": "https://plane.so",
	"metadata": {},
	"created_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
	"updated_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
	"project": "4af68566-94a4-4eb3-94aa-50dc9427067b",
	"workspace": "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4",
	"issue": "e1c25c66-5bb8-465e-a818-92a483423443"
}
```

{% /list %}
{% /col-2 %}
