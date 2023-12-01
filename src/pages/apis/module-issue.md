## Module Issue

{% col-2 %}
{% list %}
It contains all the list of issues which are inside in a module.
{% /list %}

{% list %}

```
POST   /api/v1/workspaces/:slug/projects/:project_id/modules/:module_id/module-issues/
GET    /api/v1/workspaces/:slug/projects/:project_id/modules/:module_id/module-issues/
DELETE /api/v1/workspaces/:slug/projects/:project_id/modules/:module_id/module-issues/:issue_id/
```

{% /list %}
{% /col-2 %}

## Module Issue Object

{% col-2 %}
{% list %}

- `sub_issues_count`

It tells the count of sub issues of the issue

- `created_at` _timestamp_

The timestamp of the time when the project was created

- `updated_at` _timestamp_

The timestamp of the time when the project was last updated

- `created_by` , `updated_by` _uuid_

These values are auto saved and represent the id of the user that created or updated the module

- `Project` uuid

It contains projects uuid which is automatically saved.

- `Workspace` uuid

It contains workspace uuid which is automatically saved

- `module` uuid

Module id of which the issue belongs to

- `issue` uuid

Issue id of the issue
{% /list %}

{% list %}

```
{
    "id": "484e72ec-846c-4764-82aa-89081e6ea2a6",
    "sub_issues_count": 0,
    "created_at": "2023-11-22T07:53:38.512357Z",
    "updated_at": "2023-11-22T07:53:38.512388Z",
    "created_by": "0649cb9d-05c8-4ef4-8e8b-d108ccddd42c",
    "updated_by": "0649cb9d-05c8-4ef4-8e8b-d108ccddd42c",
    "project": "6436c4ae-fba7-45dc-ad4a-5440e17cb1b2",
    "workspace": "c467e125-59e3-44ec-b5ee-f9c1e138c611",
    "module": "5090ed11-ccc4-4a5c-87ba-9330bd926b4f",
    "issue": "c099e795-e2a8-427c-9714-1dfbdc56707a"
}
```

{% /list %}
{% /col-2 %}