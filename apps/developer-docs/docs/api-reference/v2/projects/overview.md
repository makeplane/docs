---
title: Projects overview
description: The Plane API v2 project object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, projects, project object
---

# Projects overview

Projects are the main container for work items in a workspace.

<div class="api-two-column">
<div class="api-left">

## The project object

### Attributes

- `archive_in` _integer_

  The archive in.

- `archived_at` _string (date-time)_

  When the record was archived, or `null` if it is active.

- `close_in` _integer_

  The close in.

- `cover_image` _string_

  URL of the cover image.

- `cover_image_url` _string_

  The cover image url.

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `cycle_view` _boolean_

  Whether cycle view.

- `default_assignee_id` _string (uuid)_

  The related default assignee.

- `default_state_id` _string (uuid)_

  The related default state.

- `description` _string_

  Free-form description.

- `emoji` _string_

  Emoji shown alongside the name.

- `estimate_id` _string (uuid)_

  The related estimate.

- `external_id` _string_

  Your system's identifier for this record, for sync and import correlation.

- `external_source` _string_

  The system `external_id` came from, for example `github` or `jira`.

- `guest_view_all_features` _boolean_

  Whether guest view all features.

- `icon_prop` _string_

  The icon prop.

- `id` _string (uuid)_

  Unique identifier.

- `identifier` _string_

  Short project key used to prefix work item numbers, for example `ENG` in `ENG-142`.

- `intake_view` _boolean_

  Whether intake view.

- `is_issue_type_enabled` _boolean_

  Whether is issue type enabled.

- `is_time_tracking_enabled` _boolean_

  Whether is time tracking enabled.

- `issue_views_view` _boolean_

  Whether issue views view.

- `logo_props` _string_

  Editor-owned logo descriptor. Pass back what you read rather than composing it by hand.

- `module_view` _boolean_

  Whether module view.

- `name` _string_

  Display name.

- `network` _integer_

  Project visibility: `0` is private to members, `2` is visible to the whole workspace.

- `page_view` _boolean_

  Whether page view.

- `priority` _string_

  Urgency of the work item.

- `project_lead_id` _string (uuid)_

  The related project lead.

- `start_date` _string (date-time)_

  Planned start date, as `YYYY-MM-DD`.

- `state_id` _string (uuid)_

  The related state.

- `target_date` _string (date-time)_

  Planned due date, as `YYYY-MM-DD`.

- `timezone` _string_

  IANA timezone name, for example `America/New_York`.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE PROJECT OBJECT">

```json
{
  "archive_in": 1,
  "archived_at": null,
  "close_in": 1,
  "cover_image": "https://example.com/cover.png",
  "cover_image_url": "https://example.com",
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "cycle_view": false,
  "default_assignee_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "default_state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "description": "What this is for.",
  "emoji": "1f680",
  "estimate_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "external_id": null,
  "external_source": null,
  "guest_view_all_features": false,
  "icon_prop": null,
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "identifier": "PROJ",
  "intake_view": false,
  "is_issue_type_enabled": false,
  "is_time_tracking_enabled": false,
  "issue_views_view": false,
  "logo_props": null,
  "module_view": false,
  "name": "Example name",
  "network": 0,
  "page_view": false,
  "priority": "high",
  "project_lead_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "start_date": "2026-01-12",
  "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "target_date": "2026-01-20",
  "timezone": "Africa/Abidjan"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                 | Description           |
| -------- | ---------------------------------------------------- | --------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/projects/`                | List projects         |
| `POST`   | `/api/v2/workspaces/{slug}/projects/`                | Create a project      |
| `POST`   | `/api/v2/workspaces/{slug}/projects/bulk/`           | Bulk write projects   |
| `POST`   | `/api/v2/workspaces/{slug}/projects/upsert/`         | Upsert a project      |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{pk}/`           | Delete a project      |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{pk}/`           | Get a project         |
| `PATCH`  | `/api/v2/workspaces/{slug}/projects/{pk}/`           | Update a project      |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{pk}/archive/`   | Archive a project     |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{pk}/summary/`   | Get a project summary |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{pk}/unarchive/` | Unarchive a project   |

## Response shaping

Every project read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
