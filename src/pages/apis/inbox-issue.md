## Inbox Issue

{% col-2 %}
{% list %}
To toggle the inbox on the user needs to hit a PATCH request in the project/:project_id endpoint with the body as inbox_view to true
{% /list %}

{% list %}

```
GET    /api/v1/workspaces/:slug/projects/:project_id/inbox-issues/
POST   /api/v1/workspaces/:slug/projects/:project_id/inbox-issues/
GET    /api/v1/workspaces/:slug/projects/:project_id/inbox-issues/:issue_id/
PATCH  /api/v1/workspaces/:slug/projects/:project_id/inbox-issues/:issue_id/
DELETE /api/v1/workspaces/:slug/projects/:project_id/inbox-issues/:issue_id/
```

{% /list %}
{% /col-2 %}

## Inbox Issue Object

{% col-2 %}
{% list %}
**Attribute**

- `created_at` _timestamp_

The timestamp of the time when the project was created

- `updated_at` _timestamp_

The timestamp of the time when the project was last updated

- `status`

the status of the issue can be in above mentioned status

-   - -2 - Pending
    - -1 - Rejected
    - 0 - Snoozed
    - 1 - Accepted
    - 2 - Duplicate

- `snoozed_till`

The time untill the issue is snoozed.

- `source`

The source describes the type inbox issue from

- `created_by` , `updated_by` _uuid_

These values are auto saved and represent the id of the user that created or updated the module

- `Project` uuid

It contains projects uuid which is automatically saved.

- `Workspace` uuid

It contains workspace uuid which is automatically saved.

- `inbox`

inbox id of the issue

- `issue`

issue id of the issue

- `duplicate_to`

Id of the issue of which the current issue is duplicate of.
{% /list %}

{% list %}

```
{
    "id": "0de4d6d1-fdc7-4849-8080-dc379ab210e3",
    "pending_issue_count": 0,
    "created_at": "2023-11-21T07:32:26.072634Z",
    "updated_at": "2023-11-21T07:32:26.072648Z",
    "name": "a dummy project hvh Inbox",
    "description": "",
    "is_default": true,
    "view_props": {},
    "created_by": "0649cb9d-05c8-4ef4-8e8b-d108ccddd42c",
    "updated_by": "0649cb9d-05c8-4ef4-8e8b-d108ccddd42c",
    "project": "6436c4ae-fba7-45dc-ad4a-5440e17cb1b2",
    "workspace": "c467e125-59e3-44ec-b5ee-f9c1e138c611"
}
```

{% /list %}
{% /col-2 %}
