---
title: Overview
description: Plane Cycle API overview. Learn about endpoints, request/response format, and how to work with cycle via REST API.
keywords: plane, plane api, rest api, api integration, cycles, sprints, iterations
---

# Overview

Cycles are custom time periods in which a team works to complete items from their backlog. At the end of a cycle, the team typically has a new version of their project or product ready.

[Learn more about Cycles](https://docs.plane.so/core-concepts/cycles)

<div class="api-two-column">
<div class="api-left">

## The Cycles Object

### Attributes

- `name` string (required)

  Name of the cycle

- `description` string

  Description of the cycle

- `start_date` date

  Start date of the cycle

- `end_date` date

  End date of the cycle

- `created_at` _timestamp_

  The timestamp of the time when the project was created

- `updated_at` _timestamp_

  The timestamp of the time when the project was last updated

- `view_props`

  It store the filters and the display properties selected by the user to visualize the issues in the module

- `sort_order`

  It gives the position of the module at which it should be displayed

- `created_by` , `updated_by` _uuid_

  These values are auto saved and represent the id of the user that created or the updated the

- `Project` uuid

  It contains projects uuid which is automatically saved.

- `Workspace` uuid

  It contains workspace uuid which is automatically saved

- `owned_by` uuid

  The user ID of the cycle owner

- `archived_at` _timestamp_

  The timestamp when the cycle was archived (if archived)

- `timezone` string

  The timezone for the cycle

- `version` number

  Version number of the cycle

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE CYCLES OBJECT">

```json
{
  "id": "50ebc791-65e4-4b4d-a164-3b4e529e55a5",
  "created_at": "2023-11-19T12:18:14.900078Z",
  "updated_at": "2023-11-19T12:18:14.900088Z",
  "name": "cycle testing",
  "description": "",
  "start_date": null,
  "end_date": null,
  "view_props": {},
  "sort_order": 35535.0,
  "created_by": "0649cb9d-05c8-4ef4-8e8b-d108ccddd42c",
  "updated_by": "0649cb9d-05c8-4ef4-8e8b-d108ccddd42c",
  "project": "6436c4ae-fba7-45dc-ad4a-5440e17cb1b2",
  "workspace": "c467e125-59e3-44ec-b5ee-f9c1e138c611",
  "owned_by": "0649cb9d-05c8-4ef4-8e8b-d108ccddd42c"
}
```

</ResponsePanel>

</div>
</div>
