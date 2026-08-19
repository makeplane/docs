---
title: Users overview
description: The Plane API v2 users resource. GET /api/v2/users/me/ echoes the calling principal — its kind, identity, and granted OAuth scopes — and is the first call to make when verifying credentials.
keywords: plane api v2, users, users me, whoami, principal_kind, oauth scopes, api key, auth debugging, verify credentials
---

# Users overview

The users resource has exactly one endpoint, and it answers one question: **who am I to this API right now?**

`GET /api/v2/users/me/` echoes the calling principal back at you — the kind of credential you presented, the identity it resolves to, and, for OAuth tokens, the scopes it was actually granted. It is the natural first call after wiring up credentials, and the first thing to run when a request is failing and you are not sure why.

<div class="api-two-column">
<div class="api-left">

## The current user object

### Attributes

- `id` _string (uuid)_

  The user this credential acts as. This is the same id you see as `member_id` on the [member rosters](/api-reference/v2/members/overview), `created_by_id` on objects you create, and `actor_id` in [audit logs](/api-reference/v2/audit-logs/overview) — so it is how you confirm that the trail you are looking at is yours.

- `display_name` _string_

  The user's display name.

- `email` _string (email)_

  The user's email address. Useful for confirming you are on the account you meant to be on, especially across staging and production keys.

- `principal_kind` _string_

  What kind of credential is calling. One of:
  - `oauth` — an OAuth access token issued to an application
  - `api_key` — a personal API key sent in `X-Api-Key`
  - `other` — anything else the server recognizes as authenticated

- `scopes` _array of string_

  The scopes this credential carries. For an OAuth token these are the fine-grained scopes the user consented to, for example `projects.work_items:read`. Compare this list against the scope named on the endpoint you are calling before you conclude that a `403` is a role problem.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE CURRENT USER OBJECT">

```json
{
  "id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "display_name": "Priya Raghavan",
  "email": "priya@example.com",
  "principal_kind": "oauth",
  "scopes": [
    "projects.work_items:read",
    "projects.work_items:write",
    "projects.states:read",
    "workspaces.members:read"
  ]
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method | Path                | Description      |
| ------ | ------------------- | ---------------- |
| `GET`  | `/api/v2/users/me/` | Get current user |

The path has no workspace slug: it describes the credential, not a workspace. There is no `/users/{id}/` in v2 — to look other people up, read a workspace or project roster with [`?expand=member`](/api-reference/v2/members/list-workspace-members).

## Debugging auth with it

This endpoint declares no fine-grained scope requirement — an API key reaches it unconditionally, and an OAuth token needs only a read scope. That makes it a clean way to split failures apart:

| Symptom                                           | What `GET /users/me/` tells you                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Every call returns `401`                          | If this returns `401` too, the credential itself is wrong — bad key, wrong header, expired token. |
| One call returns `403`, others work               | Compare `scopes` against the scope that endpoint documents. A missing scope is the usual cause.   |
| Writes land under an unexpected author            | Check `id` and `email` — you are probably holding a different account's key than you think.       |
| Not sure whether an integration is OAuth or a key | Read `principal_kind`.                                                                            |

::: tip A `409` is not an auth failure
If `scopes` contains the write scope for the endpoint and the call still fails with `409 work_item_types_managed_at_workspace` or `work_item_types_managed_at_project`, the credential is fine. The workspace manages work item types on the other surface, and the same request succeeds there. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

::: info Scopes are a ceiling, not a grant
A token can only do what its scopes allow **and** what the underlying user's role allows. A broad scope on a member-level account is still limited by that member's role, so an empty-handed `403` with the right scope listed here points at the role, not the token.
:::

## Changed from v1

- The response is now about the **principal**, not just the person. `principal_kind` and `scopes` are new, and they are what make the endpoint useful for debugging OAuth apps.
- `first_name`, `last_name`, `avatar`, and `avatar_url` are no longer returned. `display_name` and `email` remain.

See [Migrating from v1](/api-reference/v2/migrating-from-v1) for the full list.

## Related

- [Get current user](/api-reference/v2/users/get-current-user)
- [Authentication](/api-reference/v2/authentication) — how to present an API key or OAuth token
- [Members overview](/api-reference/v2/members/overview) — resolve other people from a roster
