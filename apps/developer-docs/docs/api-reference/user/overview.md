---
title: Overview
description: Plane User API overview. Learn about endpoints, request/response format, and how to work with user via REST API.
keywords: plane api, user profile, current user, user account, authentication, rest api, api integration
---

# Overview

Users represent the people who use Plane. The Users API allows you to retrieve information about the current authenticated user.

<div class="api-two-column">
<div class="api-left">

## The User Object

### Attributes

- `id` _uuid_

  Unique identifier for the user

- `first_name` _string_

  First name of the user

- `last_name` _string_

  Last name of the user

- `email` _string_

  Email address of the user

- `avatar` _string_

  Avatar identifier for the user

- `avatar_url` _string_

  URL of the user's avatar image

- `display_name` _string_

  Display name of the user

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE USER OBJECT">

```json
{
  "id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com",
  "avatar": "avatar-123",
  "avatar_url": "https://example.com/avatars/avatar-123.png",
  "display_name": "John Doe"
}
```

</ResponsePanel>

</div>
</div>
