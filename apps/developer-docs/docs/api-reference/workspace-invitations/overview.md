---
title: Overview
description: Plane Workspace Invitations API overview. Learn how to create and manage workspace invitations with the Plane API.
keywords: plane, plane api, rest api, api integration, workspace invitations, member invites
---

# Overview

Workspace invitations let admins invite users to join a workspace with specific access settings.

[Learn more about Members](https://developers.plane.so/api-reference/members/overview)

<div class="api-two-column">
<div class="api-left">

## The Workspace Invitation Object

### Attributes

- `id` _string_

  Id.

- `email` _string_

  Email.

- `role` _integer_
  - `20` - Admin

* `15` - Member
* `5` - Guest

- `created_at` _string_

  Created at.

- `updated_at` _string_

  Updated at.

- `responded_at` _string_

  Responded at.

- `accepted` _boolean_

  Accepted.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE WORKSPACE INVITATION OBJECT">

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "Example Name",
  "role": 20,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z",
  "responded_at": "2024-01-01T00:00:00Z",
  "accepted": true
}
```

</ResponsePanel>

</div>
</div>
