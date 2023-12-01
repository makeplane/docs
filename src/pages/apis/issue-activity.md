## Issue Activity

{% col-2 %}
{% list %}
Issue activities are the history of all the changes that happened to the issue like property changes etc.
{% /list %}

{% list %}

```
GET    /api/v1/workspaces/:slug/projects/:project_id/issues/:issue_id/activities/
GET    /api/v1/workspaces/:slug/projects/:project_id/issues/:issue_id/activities/:activity_id/
```

{% /list %}
{% /col-2 %}

## Issue Activity Object

{% col-2 %}
{% list %}

**Attributes**

- `created_at` _timestamp_

The timestamp of the time when the project was created

- `updated_at` _timestamp_

The timestamp of the time when the project was last updated

- `verb` _string_

created or updated

- `field` _string_ or _null_

The field that got changed null when created

- `old_value` _string_

Old value of the field

- `new_value` _string_

New value of the field

- `comment` _string_

Comment auto generated

- `attachments` - _[url,]_

Url of all the attachments that are in the activity

- `old_identifier` _uuid_

Old identifier of the field

- `new_identifier` _uuid_

New identifier of the field

- `epoch` _float_

Epoch float field when the activity was created.

- `project` uuid

It contains projects uuid which is automatically saved.

- `workspace` uuid

It contains workspace uuid which is automatically saved

- `issue` _uuid_

The issue the activity is attached to

- `issue_comment` _uuid or null_

The comment uuid if the activity was created due to a comment

- `actor` uuid

The actor who triggered this actor
{% /list %}

{% list %}

```
{
    "id": "35612f5b-3eff-4130-b91c-c976ff887a20",
    "created_at": "2023-11-19T11:56:55.452555Z",
    "updated_at": "2023-11-19T11:56:55.452561Z",
    "verb": "created",
    "field": null,
    "old_value": null,
    "new_value": null,
    "comment": "created the issue",
    "attachments": [],
    "old_identifier": null,
    "new_identifier": null,
    "epoch": 1700395015.0,
    "project": "4af68566-94a4-4eb3-94aa-50dc9427067b",
    "workspace": "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4",
    "issue": "e1c25c66-5bb8-465e-a818-92a483423443",
    "issue_comment": null,
    "actor": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
}
```

{% /list %}
{% /col-2 %}