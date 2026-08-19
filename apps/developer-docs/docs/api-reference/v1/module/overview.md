---
title: Overview
description: Plane Module API overview. Learn about endpoints, request/response format, and how to work with module via REST API.
keywords: plane, plane api, rest api, api integration, modules, features
---

# Overview

Modules are smaller, focused projects that help you group and organize issues within a specific time frame. They allow you to break down your work into manageable chunks and track progress towards specific goals or objectives.

[Learn more about Modules](https://docs.plane.so/core-concepts/modules)

<div class="api-two-column">
<div class="api-left">

## The Module Object

### Attributes

- `name` string(required)

  Name of the module

- `description` string

  Description of the module

- `description_html` string

  Description in HTML format

- `start_date` date

  Start date of the module

- `target_date` date

  Estimated date to complete the module

- `created_at` _timestamp_

  The timestamp of the time when the project was created

- `updated_at` _timestamp_

  The timestamp of the time when the project was last updated

- `status`

  It describes the status of the module

  The status can be
  - backlog
  - planned
  - in-progress
  - paused
  - completed
  - cancelled

- `view_props`

  It store the filters and the display properties selected by the user to visualize the issues in the module

- `sort_order`

  It gives the position of the module at which it should be displayed

- `created_by` , `updated_by` _uuid_

  These values are auto saved and represent the id of the user that created or updated the module

- `Project` uuid

  It contains projects uuid which is automatically saved.

- `Workspace` uuid

  It contains workspace uuid which is automatically saved

- `lead` uuid

  Lead of the module

- `members` string[]

  List of member user IDs assigned to the module

- `archived_at` _timestamp_

  The timestamp when the module was archived (if archived)

- `logo_props`

  Logo properties for the module

- `description_text`

  Description in plain text format

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE MODULE OBJECT">

```json
{
  "id": "b69b19ae-261f-428c-899f-dd58efaa36c0",
  "created_at": "2023-11-19T11:48:21.130161Z",
  "updated_at": "2023-11-19T11:48:21.130168Z",
  "name": "module stesting",
  "description": "",
  "description_text": null,
  "description_html": null,
  "start_date": null,
  "target_date": null,
  "status": "planned",
  "view_props": {},
  "sort_order": 55535.0,
  "created_by": "0649cb9d-05c8-4ef4-8e8b-d108ccddd42c",
  "updated_by": "0649cb9d-05c8-4ef4-8e8b-d108ccddd42c",
  "project": "6436c4ae-fba7-45dc-ad4a-5440e17cb1b2",
  "workspace": "c467e125-59e3-44ec-b5ee-f9c1e138c611",
  "lead": null,
  "members": []
}
```

</ResponsePanel>

</div>
</div>
