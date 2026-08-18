---
title: Audit logs overview
description: The Plane API v2 audit log object. Actor, target, category, outcome and source enums, old and new values, and how to query the workspace audit trail for compliance and security investigations.
keywords: plane api v2, audit logs, audit trail, compliance, security investigation, actor_type, category, outcome, source, SIEM export
---

# Audit logs overview

The audit log is the workspace's tamper-evident record of who did what, from where, and whether it worked. It is the endpoint you reach for during a compliance review, an access certification, or a security investigation — and the one you point a SIEM or warehouse at for continuous export.

Every entry names an **actor** (who), a **target** (what they acted on), an **event** (what they did), an **outcome** (whether it succeeded), and a **source** (which surface the request came through). Where the event changed something, `old_value` and `new_value` carry the before and after.

Audit logs are read-only. There is no way to write, edit, or delete an entry through the API.

<div class="api-two-column">
<div class="api-left">

## The audit log object

### Attributes

- `id` _string (uuid)_

  Unique identifier for this audit log record. This is the id you pass to [Get an audit log](/api-reference/v2/audit-logs/get-audit-log).

- `event_id` _string (uuid)_

  Identifier of the event the record describes, distinct from `id`. Use it as the idempotency key when you ingest entries into another system so a re-read never double-counts.

- `sequence_number` _integer_

  An ordering number assigned to the entry as it was written. Useful as a stable tiebreaker when two entries share the same `created_at`.

- `event_name` _string_

  The specific event, for example `member.role_updated`. Filterable — this is the field to pin when you know exactly which action you are hunting for.

- `category` _string_

  The family the event belongs to. One of `auth`, `member`, `role`, `settings`, `integration`, `webhook`, `security`, or `instance`. Filter on `category` when you want a whole class of activity rather than one event name.

- `outcome` _string_

  Whether the attempt succeeded. One of `success` or `failure`. Failed attempts are recorded, which is what makes this useful for detecting probing.

- `source` _string_

  The surface the request came through. One of `platform`, `api`, `graphql`, `auth`, or `system`. `api` marks calls made with a token like yours; `system` marks actions Plane took on its own.

- `actor_type` _string_

  What kind of principal acted. One of `user`, `api_token`, `system`, or `anonymous`.

- `actor_id` _string (uuid)_

  The acting user. Nullable — `system` and `anonymous` actors have no id. It matches `member_id` on the [member](/api-reference/v2/members/overview) rosters.

- `actor_display_name` , `actor_email` _string_

  The actor's name and email captured at the time of the event. They are snapshots: a later rename or email change does not rewrite past entries.

- `target_type` _string_

  The kind of thing that was acted on, for example `workspace_member`.

- `target_id` _string_

  Identifier of the thing that was acted on.

- `target_display_name` _string_

  A human-readable label for the target, captured at the time of the event.

- `old_value` , `new_value` _any_

  The state before and after the change. Both are nullable — an event that changes nothing, such as a sign-in, carries `null` on both sides.

- `reason` _string_

  A short explanation recorded alongside the event. Most informative on `outcome: failure` entries.

- `metadata` _any_

  Additional structured context. The shape varies by `event_name`, so read it defensively rather than typing it strictly.

- `ip_address` _string_

  The client IP the request came from. Nullable — `system` events have none.

- `user_agent` _string_

  The client's user agent string.

- `workspace_id` _string (uuid)_

  The workspace the event belongs to.

- `project_id` _string (uuid)_

  The project the event is scoped to, when it is scoped to one.

- `created_at` _string (date-time)_

  When the event was recorded. This is the field the date-range filters work on.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE AUDIT LOG OBJECT">

```json
{
  "id": "5c7f1a08-2b64-4d39-9e17-0a3b8c6d2f41",
  "event_id": "e0b41d97-6c23-4a8f-b512-9d7a0e3c5f68",
  "sequence_number": 48213,
  "event_name": "member.role_updated",
  "category": "role",
  "outcome": "success",
  "source": "platform",
  "actor_type": "user",
  "actor_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "actor_display_name": "Priya Raghavan",
  "actor_email": "priya@example.com",
  "target_type": "workspace_member",
  "target_id": "3e8a5d17-9c40-4b2f-81d6-4a7f2b9e0c53",
  "target_display_name": "Devansh Kapoor",
  "old_value": { "role": "member" },
  "new_value": { "role": "owner" },
  "reason": "",
  "metadata": { "workspace_slug": "my-team" },
  "ip_address": "203.0.113.42",
  "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  "workspace_id": "d84c6f21-7a30-4e59-b6c8-1f9d5a2e7043",
  "project_id": null,
  "created_at": "2026-01-14T09:22:41.478363Z"
}
```

</ResponsePanel>

<ResponsePanel status="200" title="A FAILED SIGN-IN">

```json
{
  "id": "9a2c4e76-1f58-4b03-8d69-5e0a7c3b1d24",
  "event_id": "b7f3da41-8c05-4e92-a37d-2b6f1c9e5804",
  "sequence_number": 48197,
  "event_name": "auth.sign_in",
  "category": "auth",
  "outcome": "failure",
  "source": "auth",
  "actor_type": "anonymous",
  "actor_id": null,
  "actor_display_name": "",
  "actor_email": "devansh@example.com",
  "target_type": "user",
  "target_id": "7f2b9e04-6c1d-4a58-9e3b-0d4c8a2f6b71",
  "target_display_name": "Devansh Kapoor",
  "old_value": null,
  "new_value": null,
  "reason": "invalid_credentials",
  "metadata": { "attempt": 3 },
  "ip_address": "198.51.100.7",
  "user_agent": "curl/8.6.0",
  "workspace_id": "d84c6f21-7a30-4e59-b6c8-1f9d5a2e7043",
  "project_id": null,
  "created_at": "2026-01-14T08:57:03.220914Z"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method | Path                                         | Description      |
| ------ | -------------------------------------------- | ---------------- |
| `GET`  | `/api/v2/workspaces/{slug}/audit-logs/`      | List audit logs  |
| `GET`  | `/api/v2/workspaces/{slug}/audit-logs/{pk}/` | Get an audit log |

Both require the `workspaces.audit_logs:read` scope. There is no `POST`, `PATCH`, or `DELETE` — entries are written by Plane and are not editable by any caller.

## Querying for an investigation

The list endpoint takes the filters an investigation actually needs. They combine with `AND`:

| Question                             | Query                                                                          |
| ------------------------------------ | ------------------------------------------------------------------------------ |
| What happened in this window?        | `?created_after=2026-01-01T00:00:00Z&created_before=2026-02-01T00:00:00Z`      |
| What did this person do?             | `?actor_id=16c61a3a-512a-48ac-b0be-b6b46fe6f430`                               |
| Every permission change this quarter | `?category=role&created_after=2026-01-01T00:00:00Z`                            |
| Failed attempts only                 | `?outcome=failure`                                                             |
| Everything touching one object       | `?target_type=workspace_member&target_id=3e8a5d17-9c40-4b2f-81d6-4a7f2b9e0c53` |
| Activity from one address            | `?ip_address=198.51.100.7`                                                     |
| One specific action                  | `?event_name=member.role_updated`                                              |

For a full export, add `?paginate=cursor` and walk `next_cursor` — that skips the `COUNT(*)` on every page and stays stable as new entries arrive. Details on [List audit logs](/api-reference/v2/audit-logs/list-audit-logs).

## Reading an entry

- **Snapshots, not joins.** `actor_display_name`, `actor_email`, and `target_display_name` are recorded at event time. That is what makes the log evidential — the entry still names the person as they were, even after a rename or an offboarding.
- **Failures are first-class.** `outcome: failure` entries are exactly what a security review is looking for. A burst of them from one `ip_address` with `category: auth` is the shape of a credential-stuffing attempt.
- **`old_value` and `new_value` are free-form.** They describe the change for that `event_name` and are not a fixed schema. Render them, diff them, but do not require particular keys.
- **`source` separates humans from tokens.** `platform` is the Plane app, `api` is a REST client, `system` is Plane acting by itself. Combining `source: api` with `actor_type: api_token` isolates automation.

::: tip Correlate a `409` with a settings change
If clients suddenly start getting `409 work_item_types_managed_at_workspace` or `work_item_types_managed_at_project`, someone toggled the work item type mode. Query `?category=settings` around the time the failures started to find the change and the actor behind it. See [Work item type modes](/api-reference/v2/work-item-type-modes) and [Update workspace features](/api-reference/v2/workspace-features/update-workspace-features).
:::

## Related

- [List audit logs](/api-reference/v2/audit-logs/list-audit-logs)
- [Get an audit log](/api-reference/v2/audit-logs/get-audit-log)
- [Members overview](/api-reference/v2/members/overview) — resolve `actor_id` to a person
- [Pagination](/api-reference/v2/pagination) — cursor traversal for exports
