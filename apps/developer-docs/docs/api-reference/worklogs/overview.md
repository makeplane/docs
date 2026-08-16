---
title: Overview
description: Plane Worklogs API overview. Learn about endpoints, request/response format, and how to work with worklogs via REST API.
keywords: plane, plane api, rest api, api integration, time tracking, worklogs, time management
---

# Overview

Worklogs enable time tracking for work items within a project, recording time spent in minutes along with descriptions and user information.

[Learn more about Time tracking](https://docs.plane.so/core-concepts/issues/time-tracking)

<div class="api-two-column">
<div class="api-left">

## The Worklogs Object

### Attributes

- `id` _string_

  Unique identifier for the worklog

- `created_at` _timestamp_

  Timestamp when the worklog was created

- `updated_at` _timestamp_

  Timestamp when the worklog was last modified

- `deleted_at` _timestamp_

  Timestamp when the worklog was deleted

- `description` _string_

  Description of the work done during the worklog

- `duration` _integer_

  Time spent on the issue, recorded in minutes

- `created_by` _string_

  ID of user who created the worklog

- `updated_by` _string_

  ID of user who last modified the worklog

- `project_id` _string_

  ID of project associated with the worklog

- `workspace_id` _string_

  ID of workspace associated with the worklog

- `logged_by` _string_

  ID of the user who logged the work

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE WORKLOGS OBJECT">

```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "created_at": "2025-01-29T21:27:54.197306+05:30",
  "updated_at": "2025-01-29T21:27:54.197320+05:30",
  "description": "",
  "duration": 1,
  "created_by": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "updated_by": null,
  "project_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "workspace_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "logged_by": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

</ResponsePanel>

</div>
</div>
