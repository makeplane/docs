---
title: Bulk invite members
description: Invite up to 100 people to a Plane workspace in one call with the v2 REST API. Body parameters, roles, skip-existing behavior, OAuth scopes, error codes, and code examples.
keywords: plane api v2, bulk invite, invite members, workspace invitations, roles, admin member guest
---

# Bulk invite members

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/invitations/bulk/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Invite up to 100 people to a workspace in one request. Every invitee gets the **same role** and the same optional
message, and each one is emailed an invitation link.

::: warning This is not the generic bulk-write shape
Despite the `bulk/` path, this endpoint does **not** take `{items: [...]}` and does not return per-row results. It has
its own body — `emails`, `role`, `message` — and answers `201` with the invitations it created. The
`bulk-create`/`bulk-update`/`bulk-delete` routes on other resources are a different contract entirely.
:::

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="emails" type="array of string (email)" :required="true">

The addresses to invite, at most **100** per call. Each must be a valid, non-empty email address — one malformed entry
is a `400` for the whole request, so nothing is sent.

</ApiParam>

<ApiParam name="role" type="string" :required="false">

The role every invitee receives. One of `admin`, `member`, or `guest`. Defaults to `member`.

There is no way to give different invitees different roles in one call — send one request per role.

</ApiParam>

<ApiParam name="message" type="string" :required="false">

A note included in the invitation email, shown to every invitee in this batch.

</ApiParam>

</div>
</div>

::: info Addresses with a pending invite are skipped silently
Before writing, the endpoint looks up which of your `emails` already have an outstanding invite to this workspace and
**omits them** — no error, no duplicate invite, and no second email. They simply do not appear in the response.

So the response array is the authoritative list of what was actually created, and it can be shorter than the `emails`
you sent — or empty. Compare the two if you need to report "already invited" back to a user.
:::

::: tip The batch is atomic
All the invitations are written inside a single transaction, so either every new invite is created or none is. Unlike
the `bulk-create` routes on other resources, there is no partial-success envelope to inspect.
:::

<div class="params-section">

### Scopes

`workspaces.members:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                               |
| ------ | ------------------------ | --------------------------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | `emails` missing or empty, an invalid address, more than 100 entries, or a `role` outside the enum. |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                                     |
| `402`  | `payment_required`       | Seat limits or a plan restriction block new members.                                                |
| `403`  | `forbidden`              | Your role or token scope can't invite members to this workspace.                                    |
| `404`  | `not_found`              | No such workspace, or it's outside your tenant.                                                     |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                                |
| `409`  | `conflict`               | The write collides with existing membership state.                                                  |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                            |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                                 |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                                          |

</div>

</div>

<div class="api-right">

<CodePanel title="Bulk invite members" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/invitations/bulk/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "emails": ["ana@example.com", "ravi@example.com"],
  "role": "member",
  "message": "Joining the platform team this sprint."
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/invitations/bulk/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "emails": ["ana@example.com", "ravi@example.com"],
        "role": "member",
        "message": "Joining the platform team this sprint.",
    },
)
created = response.json()
print(f"{len(created)} invited")
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v2/workspaces/my-team/invitations/bulk/", {
  method: "POST",
  headers: {
    "X-Api-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    emails: ["ana@example.com", "ravi@example.com"],
    role: "member",
    message: "Joining the platform team this sprint.",
  }),
});
const created = await response.json();
console.log(`${created.length} invited`);
```

</template>
</CodePanel>

<ResponsePanel status="201">

```json
[
  {
    "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
    "email": "ana@example.com",
    "role": "member",
    "message": "Joining the platform team this sprint.",
    "accepted": false,
    "responded_at": null,
    "created_at": "2026-01-14T09:22:41.478363Z",
    "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
  },
  {
    "id": "9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88",
    "email": "ravi@example.com",
    "role": "member",
    "message": "Joining the platform team this sprint.",
    "accepted": false,
    "responded_at": null,
    "created_at": "2026-01-14T09:22:41.478363Z",
    "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
  }
]
```

</ResponsePanel>

</div>
</div>

## Tracking who accepted

The response gives you an invitation `id` per invitee, with `accepted: false` and `responded_at: null`. Poll
[List invitations](/api-reference/v2/invitations/list-invitations) to see which have been accepted, or
[Delete an invitation](/api-reference/v2/invitations/delete-invitation) to revoke one that is still outstanding.

An invitation is not a membership. Accepted invitees show up in
[List workspace members](/api-reference/v2/members/list-workspace-members).
