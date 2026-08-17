---
title: Overview
description: Plane Intake-Issue API overview. Learn about endpoints, request/response format, and how to work with intake-issue via REST API.
keywords: plane, plane api, rest api, api integration, work items, issues, tasks, intake, triage, submissions
---

# Overview

Intake allows guests to create work items that admins and members can review and move into a project.

[Learn more about Intake](https://docs.plane.so/core-concepts/intake)

## Enable Intake

To enable the Intake feature, the user can hit a PATCH request on the project api with the body as

```
{
	intake_view:true,
}
```

To create an Intake work item, the payload should be sent in the below format

```json
{
  "issue": {
    "name": "Snoozed task 2",
    "priority": "high"
  }
}
```

<div class="api-two-column">
<div class="api-left">

### The Intake Object

**Attribute**

- `created_at` _timestamp_

  The timestamp of the time when the project was created

- `updated_at` _timestamp_

  The timestamp of the time when the project was last updated

- `status`

  the status of the work item can be in above mentioned status
  - \-2 - Pending
  - \-1 - Rejected
  - 0 - Snoozed
  - 1 - Accepted
  - 2 - Duplicate

- `snoozed_till`

  The time untill the work item is snoozed.

- `source`

  The source describes the type of intake from

- `created_by` , `updated_by` _uuid_

  These values are auto saved and represent the id of the user that created or updated the module

- `Project` uuid

  It contains projects uuid which is automatically saved.

- `Workspace` uuid

  It contains workspace uuid which is automatically saved.

- `inbox`

  intake id of the work item

- `issue`

  work item id of the work item

- `duplicate_to`

  Id of the work item of which the current work item is duplicate of.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE INTAKE OBJECT">

```json
{
  "id": "0de4d6d1-fdc7-4849-8080-dc379ab210e3",
  "pending_issue_count": 0,
  "created_at": "2023-11-21T07:32:26.072634Z",
  "updated_at": "2023-11-21T07:32:26.072648Z",
  "name": "a dummy project with Intake",
  "description": "",
  "is_default": true,
  "view_props": {},
  "created_by": "0649cb9d-05c8-4ef4-8e8b-d108ccddd42c",
  "updated_by": "0649cb9d-05c8-4ef4-8e8b-d108ccddd42c",
  "project": "6436c4ae-fba7-45dc-ad4a-5440e17cb1b2",
  "workspace": "c467e125-59e3-44ec-b5ee-f9c1e138c611"
}
```

</ResponsePanel>

</div>
</div>
