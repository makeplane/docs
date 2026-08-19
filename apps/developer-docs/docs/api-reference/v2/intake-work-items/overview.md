---
title: Intake work items overview
description: The Plane API v2 intake work item object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, intake work items, intake work item object
---

# Intake work items overview

Intake work items are the triage queue for a project.

<div class="api-two-column">
<div class="api-left">

## The intake work item object

### Attributes

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `description_html` _string_

  Rich-text body as HTML. This is the field the Plane editor round-trips.

- `duplicate_to_id` _string (uuid)_

  The related duplicate to.

- `external_id` _string_

  Your system's identifier for this record, for sync and import correlation.

- `external_source` _string_

  The system `external_id` came from, for example `github` or `jira`.

- `id` _string (uuid)_

  Unique identifier.

- `intake_id` _string (uuid)_

  The related intake.

- `name` _string_

  Display name.

- `priority` _string_

  Urgency of the work item.

- `snoozed_till` _string (date-time)_

  The snoozed till.

- `source` _string_

  The source.

- `source_email` _string_

  The source email.

- `state_id` _string (uuid)_

  The related state.

- `status` _integer_

  The status.

- `work_item_id` _string (uuid)_

  The related work item.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE INTAKE WORK ITEM OBJECT">

```json
{
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "description_html": "<p>Details go here.</p>",
  "duplicate_to_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "external_id": null,
  "external_source": null,
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "intake_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "name": "Example name",
  "priority": "high",
  "snoozed_till": "2026-01-14T09:22:41.478363Z",
  "source": "example",
  "source_email": "example",
  "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "status": -2,
  "work_item_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                                  | Description               |
| -------- | --------------------------------------------------------------------- | ------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/intake-issues/`      | List intake work items    |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/intake-issues/{pk}/` | Get a intake work item    |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/intake-issues/`      | Create a intake work item |
| `PATCH`  | `/api/v2/workspaces/{slug}/projects/{project_id}/intake-issues/{pk}/` | Update a intake work item |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/intake-issues/{pk}/` | Delete a intake work item |

## Response shaping

Every intake work item read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
