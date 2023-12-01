## Label

{% col-2 %}
{% list %}
Labels are tags that can be assigned to
{% /list %}

{% list %}

```
POST   /api/v1/workspaces/:slug/projects/:project_id/labels/
GET    /api/v1/workspaces/:slug/projects/:project_id/labels/
GET    /api/v1/workspaces/:slug/projects/:project_id/labels/:label_id/
PATCH  /api/v1/workspaces/:slug/projects/:project_id/labels/:label_id/
DELETE /api/v1/workspaces/:slug/projects/:project_id/labels/:label_id/
```

{% /list %}
{% /col-2 %}

## Label Object

{% col-2 %}
{% list %}

- `name` _string_ **(required)**

Name of the label

- `created_at` , `updated_at` _timestamp_

Timestamp of the issue when it was created and when it was last updated.

- `description` _string_

Description of the Label

- `color` _string_

Hex code of the color

- `sort_order` _float_

Sort order of the label used for sorting

- `created_by` & `updated_by`

This values are auto saved and represent the id of the user that created or the updated the project.

- `project` _uuid_

The project which the issue is part of auto generated from backend

- `workspace` _uuid_

The workspace which the issue is part of auto generated from backend

- `parent` _uuid or null_

Parent of the label which is also a Label
{% /list %}

{% list %}

```
{
"id": "c7146baf-7058-496b-aa3a-df6c25a7e929",
"created_at": "2023-11-20T06:01:03.538675Z",
"updated_at": "2023-11-20T06:01:03.538683Z",
"name": "High",
"description": "",
"color": "",
"sort_order": 72416.0,
"created_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
"updated_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
"project": "4af68566-94a4-4eb3-94aa-50dc9427067b",
"workspace": "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4",
"parent": null
}
```

{% /list %}
{% /col-2 %}