---
title: Overview
description: Plane Teamspace API overview. Learn about endpoints, request/response format, and how to work with teamspace via REST API.
keywords: plane api, teamspace, team management, team collaboration, workspace teams, rest api, api integration
---

# Overview

Teamspaces allow you to organize teams, projects, and members within a workspace, providing a way to group related work and manage access at a team level.

[Learn more about Teamspaces](https://docs.plane.so/core-concepts/workspaces/teamspaces)

<div class="api-two-column">
<div class="api-left">

## The Teamspace Object

### Attributes

- `id` _uuid_

  Unique identifier for the teamspace.

- `name` _string_ **(required)**

  Name of the teamspace.

- `description_json` _object_

  JSON representation of the teamspace description.

- `description_html` _string_

  HTML-formatted description of the teamspace.

- `description_stripped` _string_

  Stripped version of the HTML description.

- `description_binary` _string_

  Binary representation of the description.

- `logo_props` _object_

  Logo properties for the teamspace.

- `lead` _uuid_

  ID of the user who leads the teamspace.

- `workspace` _uuid_

  ID of the workspace containing the teamspace.

- `created_at` _timestamp_

  Time at which the teamspace was created.

- `updated_at` _timestamp_

  Time at which the teamspace was last updated.

- `created_by` _uuid_

  ID of the user who created the teamspace.

- `updated_by` _uuid_

  ID of the user who last updated the teamspace.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE TEAMSPACE OBJECT">

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "created_at": "2023-11-19T11:56:55.176802Z",
  "updated_at": "2023-11-19T11:56:55.176809Z",
  "name": "Engineering Team",
  "description_html": "<p>Engineering team workspace</p>",
  "lead": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "workspace": "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4"
}
```

</ResponsePanel>

</div>
</div>
