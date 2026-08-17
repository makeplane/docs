---
title: Work item activities overview
description: The Plane API v2 activity object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, work item activities, activity object
---

# Work item activities overview

Activities are the append-only audit trail on a work item.

<div class="api-two-column">
<div class="api-left">

## The activity object

### Attributes

- `actor_id` _string (uuid)_

  The related actor.

- `comment` _string_

  The comment.

- `created_at` _string (date-time)_

  When the record was created.

- `duration` _integer_

  Time logged, in minutes.

- `epoch` _number_

  The epoch.

- `external_id` _string_

  Your system's identifier for this record, for sync and import correlation.

- `external_source` _string_

  The system `external_id` came from, for example `github` or `jira`.

- `field` _string_

  The field.

- `id` _string (uuid)_

  Unique identifier.

- `issue_comment_id` _string (uuid)_

  The related issue comment.

- `new_identifier_id` _string (uuid)_

  The related new identifier.

- `new_value` _string_

  The new value.

- `old_identifier_id` _string (uuid)_

  The related old identifier.

- `old_value` _string_

  The old value.

- `verb` _string_

  The verb.

- `work_item_id` _string (uuid)_

  The related work item.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE ACTIVITY OBJECT">

```json
{
  "actor_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "comment": "example",
  "created_at": "2026-01-14T09:22:41.478363Z",
  "duration": 90,
  "epoch": 1,
  "external_id": null,
  "external_source": null,
  "field": "example",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "issue_comment_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "new_identifier_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "new_value": "example",
  "old_identifier_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "old_value": "example",
  "verb": "example",
  "work_item_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method | Path                                                                                         | Description     |
| ------ | -------------------------------------------------------------------------------------------- | --------------- |
| `GET`  | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/activities/`      | List activities |
| `GET`  | `/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/activities/{pk}/` | Get a activity  |

## Response shaping

Every activity read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
