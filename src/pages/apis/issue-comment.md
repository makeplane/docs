## Issue Comment

{% col-2 %}
{% list %}
The comments that are added to the issue
{% /list %}

{% list %}

```
POST   /api/v1/workspaces/:slug/projects/:project_id/issues/:issue_id/comments/
GET    /api/v1/workspaces/:slug/projects/:project_id/issues/:issue_id/comments/
GET    /api/v1/workspaces/:slug/projects/:project_id/issues/:issue_id/comments/:comment_id/
PATCH  /api/v1/workspaces/:slug/projects/:project_id/issues/:issue_id/comments/:comment_id/
DELETE /api/v1/workspaces/:slug/projects/:project_id/issues/:issue_id/comments/:comment_id/
```

{% /list %}
{% /col-2 %}

## Issue Comment Object

{% col-2 %}
{% list %}
**Attributes**

- `created_by` , `updated_by` _uuid_

These values are auto saved and represent the id of the user that created or updated the module

- `created_at` _timestamp_

The timestamp of the time when the project was created

- `updated_at` _timestamp_

The timestamp of the time when the project was last updated

- `comment_html` html \*string **(required)\***

HTML string version of the comment

- `comment_stripped` _string_

Stripped string version of the comment

- `access` _string_

If the comment should be visible externally also if the project is published or not. Takes in two values

- INTERNAL
- EXTERNAL
- `project` uuid

It contains projects uuid which is automatically saved.

- `workspace` uuid

It contains workspace uuid which is automatically saved

- `issue` _uuid_

The issue the activity is attached to

- `actor` _uuid_

UUID of the user who commented.
{% /list %}

{% list %}

```
{
	"id": "f3e29f26-708d-40f0-9209-7e0de44abc49",
	"created_at": "2023-11-20T09:26:10.383129Z",
	"updated_at": "2023-11-20T09:26:10.383140Z",
	"comment_stripped": "Initialf ThoughtsaMy initial thoughts on this are very  good",
	"comment_json": {},
	"comment_html": "<h1>Initialf Thoughts</h1>a<p>My initial thoughts on this are very  good</p>",
	"attachments": [],
	"access": "INTERNAL",
	"created_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
	"updated_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
	"project": "4af68566-94a4-4eb3-94aa-50dc9427067b",
	"workspace": "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4",
	"issue": "e1c25c66-5bb8-465e-a818-92a483423443",
	"actor": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
}
```

{% /list %}
{% /col-2 %}