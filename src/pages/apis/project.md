## Project

{% col-2 %}

{% list %}
Projects let you manage teams and tasks within your Workspace.
{% /list %}

{% list %}
**Endpoints**

```
POST   /api/v1/workspaces/:slug/projects/
GET    /api/v1/workspaces/:slug/projects/
GET    /api/v1/workspaces/:slug/projects/:project_id/
PATCH  /api/v1/workspaces/:slug/projects/:project_id/
DELETE /api/v1/workspaces/:slug/projects/:project_id/
```

{% /list %}

{% /col-2 %}

## Project Object

{% col-2 %}

{% list %}
**Attributes**

- `name` _string_ (**required**)

Name of the project

- `identifier` _string_ (**required**)

Unique Identifier of project for the workspace

- `description` _string_

Project description

- `total_members` _integer_

Total members present in the project.

- `total_cycles` _integer_

Total number of cycles present in the project.

- `total_modules` _integer_

Total number of modules present in the project.

- `is_member` _boolean_

The current requesting user is a member of the project or not

- `member_role` _integer_

The current requesting users role in the project.

- `is_deployed` _integer_

Represents if the project is deployed and publicly visible.

- `created_at` _timestamp_

The timestamp of the time when the project was created

- `updated_at` _timestamp_

The timestamp of the time when the project was last updated

- `network` _integer_

Is the project public or secret it takes in two values either (0,2)

- **0 - Secret**
- **2 - Public**
- `emoji` _string_

HTML emoji DEX code without the `&#`

- `icon_prop` _json_
- `module_view` _bool_

Enable disable module for the project in the UI

- `cycle_view` _bool_

Enable disable cycle for the project in the UI

- `inbox_view` _bool_

Enable disable inbox for the project in the UI

- `page_view` _bool_

Enable disable pages for the project in the UI

- `issue_views_view` _bool_

Enable disable project views for the project in the UI

- `cover_image` _url_

URL for the image for the project cover

- `archive_in` _integer_

Months in which the issue should be automatically archived can take values between (0,12)

- `close_in` _integer_

Months in which the issue should be auto closed can take values between (0,12)

- `created_by` , `updated_by` _uuid_

This values are auto saved and represent the id of the user that created or the updated the project

- `workspace` _uuid_

The workspace uuid where the project is created saved automatically

- `default_assignee` _uuid_

The uuid of the user who is a workspace member that have issues assigned automatically if the issue does not have any assignee

- `project_lead` _uuid_

The uuid of the user who is a workspace member that leads the project

- `estimate` _uuid_

UUID of the estimate of the project

- `default_state`

Default state which will be used when the issues will be auto closed
{% /lisr %}

{% list %}

**Response Object**

```
{
	"id": "00918ea1-52f7-48bd-abe3-d3efe76ff7dd",
	"total_members": 1,
	"total_cycles": 0,
	"total_modules": 0,
	"is_member": true,
	"member_role": 20,
	"is_deployed": false,
	"created_at": "2023-11-19T10:40:15.426652Z",
	"updated_at": "2023-11-19T10:40:15.426672Z",
	"name": "Project X",
	"description": "",
	"description_text": null,
	"description_html": null,
	"network": 2,
	"identifier": "PROJX",
	"emoji": null,
	"icon_prop": null,
	"module_view": true,
	"cycle_view": true,
	"issue_views_view": true,
	"page_view": true,
	"inbox_view": false,
	"cover_image": null,
	"archive_in": 0,
	"close_in": 0,
	"created_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
	"updated_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
	"workspace": "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4",
	"default_assignee": null,
	"project_lead": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
	"estimate": null,
	"default_state": null
}
```

{% /list %}

{% /col-2 %}