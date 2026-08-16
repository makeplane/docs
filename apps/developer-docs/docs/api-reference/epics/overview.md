---
title: Overview
description: Plane Epics API overview. Learn about endpoints, request/response format, and how to work with epics via REST API.
keywords: plane, plane api, rest api, api integration, epics, features, stories
---

# Overview

Epics help you group related tasks into a larger work item, providing a hierarchical structure for managing complex projects. Use epics to break down major objectives into smaller, manageable pieces while keeping everything organized.
[Learn more about Epics](https://docs.plane.so/core-concepts/issues/epics).

<div class="api-two-column">
<div class="api-left">

## The Epics Object

### Attributes

- `id` string

  Unique identifier for the epic.

- `name` string

  Name of the epic.

- `description` object

  JSON representation of the epic description.

- `description_html` string

  HTML-formatted description of the epic.

- `description_stripped` string

  Plain text version of the description.

- `description_binary` string

  Binary representation of the description.

- `state` string

  ID of the state (status) of the epic.

- `priority` string

  Priority level. Possible values: `none`, `urgent`, `high`, `medium`, `low`.

- `assignees` array

  Array of user IDs assigned to the epic.

- `labels` array

  Array of label IDs applied to the epic.

- `type` string

  ID of the work item type for the epic.

- `estimate_point` string

  ID of the estimate point, or null if not estimated.

- `point` integer

  Point value for the epic, or null.

- `start_date` string

  Start date of the epic in YYYY-MM-DD format.

- `target_date` string

  Target completion date in YYYY-MM-DD format.

- `parent` string

  ID of the parent work item, or null if no parent.

- `sequence_id` integer

  Auto-generated sequential identifier for the epic within the project.

- `sort_order` number

  Auto-generated sort order for display purposes.

- `is_draft` boolean

  Whether the epic is a draft.

- `completed_at` timestamp

  Time at which the epic was completed, or null if not completed.

- `archived_at` timestamp

  Time at which the epic was archived, or null if not archived.

- `project` string

  ID of the project containing this epic.

- `workspace` string

  ID of the workspace containing this epic.

- `external_id` string

  External identifier if imported from another system, or null.

- `external_source` string

  Name of the source system if imported, or null.

- `deleted_at` timestamp

  Time at which the epic was deleted, or null if not deleted.

- `created_at` timestamp

  Time at which the epic was created.

- `updated_at` timestamp

  Time at which the epic was last updated.

- `created_by` string

  ID of the user who created the epic.

- `updated_by` string

  ID of the user who last updated the epic.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE EPICS OBJECT">

```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "name": "Develop Mobile Application Framework",
  "description": {},
  "description_html": "<p class=\"editor-paragraph-block\">Create a cross-platform mobile application framework that supports all core system functionalities with native-like performance and user experience</p>",
  "description_stripped": "Create a cross-platform mobile application framework that supports all core system functionalities with native-like performance and user experience",
  "description_binary": null,
  "state": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "priority": "medium",
  "assignees": [],
  "labels": ["xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"],
  "type": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "estimate_point": null,
  "point": null,
  "start_date": "2025-02-28",
  "target_date": "2025-06-20",
  "parent": null,
  "sequence_id": 57,
  "sort_order": 605535.0,
  "is_draft": false,
  "completed_at": null,
  "archived_at": null,
  "project": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "workspace": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "external_id": null,
  "external_source": null,
  "deleted_at": null,
  "created_at": "2025-03-01T21:23:54.645263+05:30",
  "updated_at": "2025-03-03T10:38:44.667276+05:30",
  "created_by": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "updated_by": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

</ResponsePanel>

</div>
</div>
