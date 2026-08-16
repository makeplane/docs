---
title: Overview
description: Plane Initiative API overview. Learn about endpoints, request/response format, and how to work with initiative via REST API.
keywords: plane, plane api, rest api, api integration, initiatives, roadmap, planning
---

# Overview

Initiatives are high-level strategic goals that help organize and track work across multiple projects, epics, and work items, providing a way to group related work and measure progress toward larger objectives.

[Learn more about Initiatives](https://docs.plane.so/core-concepts/projects/initiatives)

<div class="api-two-column">
<div class="api-left">

## The Initiatives Object

### Attributes

- `id` _uuid_

  Unique identifier for the initiative

- `name` _string_ **(required)**

  Name of the initiative

- `description` _string_

  Plain text description of the initiative

- `description_html` _string_

  HTML description of the initiative

- `description_stripped` _string_

  Stripped version of the HTML description

- `description_binary` _string_

  Binary description of the initiative

- `lead` _uuid_

  User ID of the initiative lead

- `start_date` _date_

  Start date of the initiative in YYYY-MM-DD format

- `end_date` _date_

  End date of the initiative in YYYY-MM-DD format

- `logo_props` _object_

  Logo properties for the initiative

- `state` _string_

  State of the initiative. Can be: DRAFT, PLANNED, ACTIVE, COMPLETED, CLOSED

- `workspace` _uuid_

  Workspace UUID which is automatically saved

- `created_at` _timestamp_

  The timestamp when the initiative was created

- `updated_at` _timestamp_

  The timestamp when the initiative was last updated

- `created_by` _uuid_

  ID of the user who created the initiative

- `updated_by` _uuid_

  ID of the user who last updated the initiative

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE INITIATIVES OBJECT">

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "created_at": "2023-11-19T11:56:55.176802Z",
  "updated_at": "2023-11-19T11:56:55.176809Z",
  "name": "Q1 Product Launch",
  "description": "Launch new product features in Q1",
  "description_html": "<p>Launch new product features in Q1</p>",
  "lead": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "start_date": "2024-01-01",
  "end_date": "2024-03-31",
  "state": "ACTIVE",
  "workspace": "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4"
}
```

</ResponsePanel>

</div>
</div>
