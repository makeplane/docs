## Issue Attachment

{% col-2 %}
{% list %}
Files like pdf, images can be attached to an issue to provide extra context for the issues
{% /list %}
{% list %}

```
POST   /api/v1/workspaces/:slug/projects/:project_id/issues/:issue_id/attachments/
GET    /api/v1/workspaces/:slug/projects/:project_id/issues/:issue_id/attachments/
GET    /api/v1/workspaces/:slug/projects/:project_id/issues/:issue_id/attachments/:link_id/
DELETE /api/v1/workspaces/:slug/projects/:project_id/issues/:issue_id/attachments/:link_id/
```

{% /list %}
{% /col-2 %}

## Issue Attachment Object

{% col-2 %}
{% list %}

###

- `asset` _file_ object **(required)**

The file object which needs to be uploaded returns a _string_ with the uploaded s3 url

{% /list %}
{% list %}

```
{
	"id": "36d944cd-363f-453b-ba6b-ced0134686c6",
	"created_at": "2023-11-20T07:55:47.341643Z",
	"updated_at": "2023-11-20T07:55:47.341662Z",
	"attributes": {
		"name": "Screenshot 2023-11-03 at 6.28.42PM.png",
		"size": 90016
	},
	"asset": "https://planefs.s3.us-east-1.amazonaws.com/cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4/416d6a4ab4504a30bff193ca50441e5e-Screenshot_2023-11_88uWotC.png",
	"created_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
	"updated_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
	"project": "4af68566-94a4-4eb3-94aa-50dc9427067b",
	"workspace": "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4",
	"issue": "e1c25c66-5bb8-465e-a818-92a483423443"
}
```

{% /list %}
{% /col-2 %}