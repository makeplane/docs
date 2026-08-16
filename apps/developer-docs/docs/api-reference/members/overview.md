---
title: Overview
description: Plane Members API overview. Learn about endpoints, request/response format, and how to work with members via REST API.
keywords: plane api, members, workspace members, team members, member roles, user management, rest api, api integration
---

# Overview

Members represent users who belong to a workspace or project. The Members API allows you to retrieve information about workspace and project members.

[Learn more about Members](https://docs.plane.so/core-concepts/workspaces/members)

<div class="api-two-column">
<div class="api-left">

## The Members Object

### Attributes

- `id` _string_
  Unique identifier for the Member

- `first_name` _string_
  First name of the Member

- `last_name` _string_
  Last name of the Member

- `email` _string_
  Email address of the Member

- `avatar` _string_
  Optional avatar image file reference

- `avatar_url` _string_
  Publicly accessible URL for the avatar image

- `display_name` _string_
  Display name shown across the application

- `role` _integer_
  Role of the Member in the Workspace or Project

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE MEMBERS OBJECT">

```json
{
  "id": "00000000-0000-0000-0000-000000000001",
  "first_name": "User",
  "last_name": "One",
  "email": "user1@example.com",
  "avatar": "",
  "avatar_url": null,
  "display_name": "user1",
  "role": 15
}
```

</ResponsePanel>

</div>
</div>
