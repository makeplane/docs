---
title: Overview
description: Plane Issue API overview. Learn about endpoints, request/response format, and how to work with issue via REST API.
keywords: plane, plane api, rest api, api integration, work items, issues, tasks
---

# Overview

Work items are the fundamental unit of work in Plane. They represent tasks that need to be accomplished — assignable, trackable, and actionable to-dos in your project management workflow.

[Learn more about Work Items](https://docs.plane.so/core-concepts/issues/overview)

<div class="api-two-column">
<div class="api-left">

## The Work Item object

### Attributes

- `name` _string_ **(required)**

  Name of the work item

- `created_at` , `updated_at` _timestamp_

  Timestamp of the work item when it was created and when it was last updated

- `estimate_point` _integer_ or _null_

  Total estimate points for the work item takes value between (0,7).

- `description_html` _string_

  HTML description of the work item

- `description_stripped` _string_

  Stripped version of the html description auto generated using the application.

- `priority` _string_

  Priority of the work item takes in 5 values
  - none
  - urgent
  - high
  - medium
  - low

- `start_date` _date_

  Start date of the work item

- `target_date` _date_

  Target date of the work item

- `sequence_id` _integer_

  Auto generated from the system the unique identifier of the work item

- `sort_order` _decimal_

  Auto generated from the system during creation used for ordering

- `completed_at` _timestamp_ or _null_

  Timestamp when the work item is moved to any completed group state

- `created_by` & `updated_by`

  This values are auto saved and represent the id of the user that created or the updated the project.

- `project` _uuid_

  The project which the work item is part of auto generated from backend

- `workspace` _uuid_

  The workspace which the work item is part of auto generated from backend

- `parent` _uuid_

  The uuid of the parent work item which should be part of the same workspace

- `state` _uuid_

  The uuid of the state which is present in the project where the work item is being created.

- `assignees` - _\[uuid,\]_

  The array of uuids of the users who are part of the project where the work item is being created or updated.

- `labels` - _\[uuid,\]_

  The array of uuids of the labels which are present in the project where the work item is being created or updated.

- `type` _uuid_

  The uuid of the work item type for the work item.

- `module` _uuid_

  The uuid of the module the work item belongs to.

- `is_draft` _boolean_

  Whether the work item is a draft.

- `archived_at` _timestamp_ or _null_

  Timestamp when the work item was archived.

- `description_binary` _string_

  Binary description of the work item.

**Expandable Fields**

The following fields can be expanded when retrieving a work item by including them in the `expand` query parameter:

- `type` - Expands to full WorkItemType object
- `module` - Expands to full Module object
- `labels` - Expands to array of full Label objects
- `assignees` - Expands to array of full User objects
- `state` - Expands to full State object
- `project` - Expands to full Project object

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE WORK ITEM OBJECT">

```json
{
  "id": "e1c25c66-5bb8-465e-a818-92a483423443",
  "created_at": "2023-11-19T11:56:55.176802Z",
  "updated_at": "2023-11-19T11:56:55.176809Z",
  "estimate_point": null,
  "name": "First Work Item",
  "description_html": "<p></p>",
  "description_stripped": "",
  "priority": "none",
  "start_date": "2023-09-01",
  "target_date": "2023-10-04",
  "sequence_id": 421,
  "sort_order": 265535.0,
  "completed_at": null,
  "archived_at": null,
  "is_draft": false,
  "created_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "updated_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "project": "4af68566-94a4-4eb3-94aa-50dc9427067b",
  "workspace": "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4",
  "parent": null,
  "state": "f3f045db-7e74-49f2-b3b2-0b7dee4635ae",
  "assignees": ["797b5aea-3f40-4199-be84-5f94e0d04501"],
  "labels": []
}
```

</ResponsePanel>

</div>
</div>
