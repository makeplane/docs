---
title: Members overview
description: The Plane API v2 member object. Workspace and project rosters, the role slug, membership ids versus user ids, and expanding the user with ?expand=member.
keywords: plane api v2, members, workspace members, project members, member_id, role slug, expand member, roster
---

# Members overview

A member record is the link between a user and a workspace or a project. Reading a roster answers two questions: who belongs here, and in what role.

v2 returns the **membership**, not the user. Every row is three fields — the membership's own `id`, the `member_id` of the user it points at, and the `role` that user holds in this context. Names, emails, and avatars belong to the user, and you pull them into the same response with [`?expand=member`](#expanding-the-user).

[Learn more about members](https://docs.plane.so/core-concepts/workspaces/members)

<div class="api-two-column">
<div class="api-left">

## The member object

### Attributes

- `id` _string (uuid)_

  Unique identifier for the membership row — not for the user. The same person has one membership in the workspace and another in each project they belong to, so they have several `id` values but one `member_id`.

- `member_id` _string (uuid)_

  The user this membership belongs to. This is the id that lines up with `created_by_id` on other objects, `assignee_ids` on work items, and `actor_id` in [audit logs](/api-reference/v2/audit-logs/overview). Join on `member_id`, never on `id`.

- `role` _string_

  The member's role in this workspace or project, expressed as a slug. It is what decides whether this person can write here at all.

  The slug is context-correct: the same person can read as `member` on the workspace roster and as `contributor` on a project roster. Nullable — `null` appears only on legacy rows that predate role slugs.

::: tip Roles are an open set, not an enum
The schema types `role` as a plain string with no enum. Built-in slugs such as `owner`, `member`, and `contributor` are joined by whatever custom roles the workspace has defined, each under its own slug. Match the slugs you care about and fall through gracefully on anything else — do not write an exhaustive `switch`.
:::

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE MEMBER OBJECT">

```json
{
  "id": "c1b7e4a9-2f66-4a1d-9c3b-7d5e2f8a1b40",
  "member_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "role": "member"
}
```

</ResponsePanel>

<ResponsePanel status="200" title="WITH ?expand=member">

```json
{
  "id": "c1b7e4a9-2f66-4a1d-9c3b-7d5e2f8a1b40",
  "member_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "role": "member",
  "member": {
    "id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
    "display_name": "Priya Raghavan",
    "avatar_url": "https://assets.plane.so/avatars/16c61a3a.png",
    "email": "priya@example.com"
  }
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                            | Description                   |
| -------- | --------------------------------------------------------------- | ----------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/members/`      | List project members          |
| `GET`    | `/api/v2/workspaces/{slug}/members/`                            | List workspace members        |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/members/{pk}/` | Get a project member          |
| `GET`    | `/api/v2/workspaces/{slug}/project-role-distribution/`          | Get project role distribution |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/members/`      | Create a project member       |
| `PATCH`  | `/api/v2/workspaces/{slug}/projects/{project_id}/members/{pk}/` | Update a project member       |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/members/{pk}/` | Delete a project member       |
| `POST`   | `/api/v2/workspaces/{slug}/members/remove/`                     | Remove a workspace member     |

Both endpoints return the **active** roster for their scope. The workspace list is the superset: a project member is always a workspace member too, so a `member_id` on a project roster always appears on the workspace roster as well — usually with a different `role`.

Members are read-only in v2. There are no v2 endpoints to invite, update, or remove a member; membership changes are made in Plane or through the [v1 members endpoints](/api-reference/v1/members/overview).

## Membership ids are not user ids

This is the single mistake worth designing against. Given the same person:

| Roster                   | `id`                                   | `member_id`                            |
| ------------------------ | -------------------------------------- | -------------------------------------- |
| Workspace `my-team`      | `c1b7e4a9-2f66-4a1d-9c3b-7d5e2f8a1b40` | `16c61a3a-512a-48ac-b0be-b6b46fe6f430` |
| Project `4af68566-…067b` | `9d2f5c81-4b73-4e60-8a1f-2c9b6d3e7f04` | `16c61a3a-512a-48ac-b0be-b6b46fe6f430` |

Key your user cache on `member_id`. Use `id` only when you need to talk about the membership itself.

## Expanding the user

Members are one of only two v2 resources that accept `?expand=` — the other is work items. The single allowed value here is `member`.

```bash
GET /api/v2/workspaces/my-team/members/?expand=member
```

Expansion is **separate-key**: `member_id` stays exactly where it was and a `member` object is added beside it. The id is never swapped for an object, so code that reads `member_id` keeps working whether or not the caller expanded. The expanded object carries `id`, `display_name`, `avatar_url`, and `email`.

Any other value — `user`, `project`, `role` — is rejected with `400 invalid_request`. See [Expanding relations](/api-reference/v2/expanding-relations) for the full contract.

## Roles and errors

A role that is too narrow produces `403 forbidden` on the write you attempted. Roles never produce a `404`: a workspace or project outside your tenant returns `404 not_found` whether or not you would have had the role for it.

::: info A `409` is never a role problem
If a write comes back `409 work_item_types_managed_at_workspace` or `work_item_types_managed_at_project`, the caller's role and scopes are fine. The workspace simply manages work item types on the other surface, and the same call succeeds there. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

## Changed from v1

- A member row is now the **membership**, not a flattened user. v1 returned `first_name`, `last_name`, `email`, `avatar`, `avatar_url`, and `display_name` inline; v2 returns `id`, `member_id`, and `role`, and moves the user fields behind `?expand=member`.
- `role` is a **slug string**, not the numeric level v1 returned. Compare `role == "member"`, not `role >= 15`.
- Responses are paginated envelopes rather than bare arrays. See [Pagination](/api-reference/v2/pagination).
- v2 exposes reads only. The v1 add, update, and remove member endpoints have no v2 equivalent yet.

See [Migrating from v1](/api-reference/v2/migrating-from-v1) for the full list.

## Related

- [List workspace members](/api-reference/v2/members/list-workspace-members)
- [List project members](/api-reference/v2/members/list-project-members)
- [Expanding relations](/api-reference/v2/expanding-relations)
- [Get current user](/api-reference/v2/users/get-current-user) — the `member_id` your own credentials map to
