---
title: Overview
description: Plane Page API overview. Learn about endpoints, request/response format, and how to work with page via REST API.
keywords: plane, plane api, rest api, api integration, pages, documentation, notes
---

# Overview

Pages allow you to create and manage documentation at both workspace and project levels. Workspace pages are accessible across all projects, while project pages are specific to individual projects.

**Documentation**: [Wiki](https://docs.plane.so/core-concepts/pages/wiki), [Pages](https://docs.plane.so/core-concepts/pages/overview)

<div class="api-two-column">
<div class="api-left">

## The Pages Object

### Attributes

- `id` _uuid_

  Unique identifier for the page

- `name` _string_

  Name of the page

- `description_html` _string_

  HTML description/content of the page

- `created_at` _timestamp_

  The timestamp when the page was created

- `updated_at` _timestamp_

  The timestamp when the page was last updated

- `created_by` _uuid_

  ID of the user who created the page

- `updated_by` _uuid_

  ID of the user who last updated the page

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE PAGES OBJECT">

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "created_at": "2023-11-19T11:56:55.176802Z",
  "updated_at": "2023-11-19T11:56:55.176809Z",
  "name": "Getting Started",
  "description_html": "<h1>Welcome</h1><p>This is a getting started guide.</p>",
  "created_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "updated_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
}
```

</ResponsePanel>

</div>
</div>
