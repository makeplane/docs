## Cycle Issue

{% col-2 %}
{% list %}
It contains all the list of issues which are inside in a cycle.
{% /list %}

{% list %}

```
POST   /api/v1/workspaces/:slug/projects/:project_id/cycles/:cycle_id/cycle-issues/
GET    /api/v1/workspaces/:slug/projects/:project_id/cycles/:cycle_id/cycle-issues/
DELETE /api/v1/workspaces/:slug/projects/:project_id/cycles/:cycle_id/cycle-issues/:issue_id/
```

{% /list %}
{% /col-2 %}

## Cycle Issue Object

{% col-2 %}
{% list %}
**Attributes**

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

- `cycle` uuid

Cycle id of which the issue belongs to

- `issue` uuid

Issue id of the issue
{% /list %}

{% list %}

```
[
  {
		"id": "81686eba-bd63-4fd1-b628-b08ecdb1db06",
		"sub_issues_count": 0,
		"created_at": "2023-11-20T05:02:41.238578Z",
		"updated_at": "2023-11-20T05:02:41.238601Z",
		"created_by": "0649cb9d-05c8-4ef4-8e8b-d108ccddd42c",
		"updated_by": "0649cb9d-05c8-4ef4-8e8b-d108ccddd42c",
		"project": "6436c4ae-fba7-45dc-ad4a-5440e17cb1b2",
		"workspace": "c467e125-59e3-44ec-b5ee-f9c1e138c611",
		"cycle": "866f3015-4811-4e8a-9577-e298a56488c5",
		"issue": "2f9f16f7-604c-43d3-adb1-5466ade808aa"
	}
]
```

{% /list %}
{% /col-2 %}