---
title: Overview
description: Plane Sticky API overview. Learn about endpoints, request/response format, and how to work with sticky via REST API.
keywords: plane api, sticky notes, quick notes, personal notes, workspace stickies, rest api, api integration
---

# Overview

Stickies are workspace-level notes that allow you to capture quick thoughts, ideas, or important reminders.

[Learn more about Stickies](https://docs.plane.so/core-concepts/stickies)

<div class="api-two-column">
<div class="api-left">

## The Sticky Object

### Attributes

- `id` _uuid_

  Unique identifier for the sticky

- `name` _string_

  Name of the sticky

- `description` _object_

  JSON description of the sticky

- `description_html` _string_

  HTML description of the sticky

- `description_stripped` _string_

  Stripped version of the HTML description

- `description_binary` _string_

  Binary description of the sticky

- `logo_props` _object_

  Logo properties for the sticky

- `color` _string_

  Color of the sticky

- `background_color` _string_

  Background color of the sticky

- `workspace` _uuid_

  Workspace UUID which is automatically saved

- `owner` _uuid_

  User ID of the sticky owner

- `sort_order` _number_

  Sort order for the sticky

- `created_at` _timestamp_

  The timestamp when the sticky was created

- `updated_at` _timestamp_

  The timestamp when the sticky was last updated

- `created_by` _uuid_

  ID of the user who created the sticky

- `updated_by` _uuid_

  ID of the user who last updated the sticky

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE STICKY OBJECT">

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "created_at": "2023-11-19T11:56:55.176802Z",
  "updated_at": "2023-11-19T11:56:55.176809Z",
  "name": "Important Note",
  "description": {},
  "description_html": "<p>This is an important note</p>",
  "color": "#FF5733",
  "background_color": "#FFF9E6",
  "sort_order": 1000.0,
  "workspace": "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4",
  "owner": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
}
```

</ResponsePanel>

</div>
</div>
