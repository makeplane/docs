---
title: List audit logs
description: Query a Plane workspace's audit trail with the v2 REST API. Date-range, actor, category, outcome and target filters, cursor pagination for exports, scopes, errors, and code examples.
keywords: plane api v2, list audit logs, audit trail query, compliance export, created_after, created_before, outcome failure, SIEM, cursor pagination
---

# List audit logs

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/audit-logs/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Query the workspace's audit trail. This is the compliance and security-investigation endpoint: scope it to a date range for a review period, to an actor for an access certification, or to `outcome=failure` when you are looking for attempts that were turned away.

It is also the export endpoint. With `?paginate=cursor` you can walk months of history into a SIEM or warehouse without paying for a `COUNT(*)` on every page.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`. The audit trail is per workspace; there is no cross-workspace query.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters — time range

Filters combine with `AND`. Check your spelling on `order_by` and `paginate` — neither is validated. An unrecognized `order_by` value falls back to the resource's default ordering, and anything other than `paginate=cursor` uses offset pagination. A typo shows up as an unexpected sort order or envelope, not as an error.

<div class="params-list">

<ApiParam name="created_after" type="string (date-time)" :required="false">

Return entries recorded from this timestamp onward, for example `2026-01-01T00:00:00Z`. Pair it with `created_before` to bound a review period.

</ApiParam>

<ApiParam name="created_before" type="string (date-time)" :required="false">

Return entries recorded up to this timestamp. Send timestamps in UTC — `created_at` is returned in UTC, and mixing offsets is the usual reason a window looks empty.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters — who and what

<div class="params-list">

<ApiParam name="actor_id" type="string" :required="false">

Return only what one user did. This is the same id as `member_id` on the [member rosters](/api-reference/v2/members/overview), so an access certification is a roster read followed by one call per person.

Entries with no actor — `system` and `anonymous` events — are excluded by any `actor_id` filter, so run a second unfiltered query if you are asked to account for everything in a window.

</ApiParam>

<ApiParam name="event_name" type="string" :required="false">

Return only one specific event, for example `member.role_updated`. Use it when you already know the action you are hunting for; use `category` when you want a whole class of them.

</ApiParam>

<ApiParam name="category" type="string" :required="false">

Return only one family of events: `auth`, `member`, `role`, `settings`, `integration`, `webhook`, `security`, or `instance`.

`role` and `member` answer "who gained access and when". `settings` answers "what changed about this workspace". `auth` plus `outcome=failure` answers "who tried to get in".

</ApiParam>

<ApiParam name="outcome" type="string" :required="false">

Return only entries with this outcome: `success` or `failure`. Failed attempts are recorded, which is what makes this filter the fastest way to spot probing.

</ApiParam>

<ApiParam name="target_type" type="string" :required="false">

Return only entries acting on this kind of object, for example `workspace_member`. Combine it with `target_id` to build the history of a single record.

</ApiParam>

<ApiParam name="target_id" type="string" :required="false">

Return only entries acting on this specific object. `?target_type=…&target_id=…` is the "everything that ever happened to this thing" query.

</ApiParam>

<ApiParam name="ip_address" type="string" :required="false">

Return only entries recorded from this client IP. Start from a suspicious entry, then pivot on its `ip_address` to see everything else that address did.

</ApiParam>

<ApiParam name="search" type="string" :required="false">

A free-text search term across the entry. Reach for it when you have a name or a fragment rather than an id.

</ApiParam>

</div>
</div>

<div class="params-section">

### Ordering

<div class="params-list">

<ApiParam name="order_by" type="string" :required="false">

Field to sort by. Prefix with `-` for descending.

- `-created_at` , `created_at` — newest first, or oldest first
- `id` , `-id`

Use `-created_at` for an investigation, `created_at` for a replayable export. Two entries written in the same instant are separated by `sequence_number` in the payload.

</ApiParam>

</div>
</div>

<div class="params-section">

### Pagination

<div class="params-list">

<ApiParam name="per_page" type="integer" :required="false">

Page size. Defaults to 50, maximum 200. Use 200 for exports.

</ApiParam>

<ApiParam name="offset" type="integer" :required="false">

Number of rows to skip from the start of the result set. Maximum 10000 — which an audit trail exceeds quickly, so use cursor pagination for anything deeper than a few pages.

</ApiParam>

<ApiParam name="paginate" type="string" :required="false">

Set to `cursor` for the COUNT-free keyset envelope, which returns `next_cursor` and `has_more` instead of `next` and `total_count`. This is the mode to use for a full export: it has no offset ceiling and it does not skip or repeat rows as new entries land mid-walk.

</ApiParam>

<ApiParam name="count" type="boolean" :required="false">

Defaults to `true`. Set to `false` to skip the `COUNT(*)` behind `total_count`; the field is then omitted. Worth doing on every page of an offset walk — cursor pagination never runs a `COUNT` and ignores this parameter.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return on each row. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `actor_display_name`, `actor_email`, `actor_id`, `actor_type`, `category`, `created_at`, `event_id`, `event_name`, `id`, `ip_address`, `metadata`, `new_value`, `old_value`, `outcome`, `project_id`, `reason`, `sequence_number`, `source`, `target_display_name`, `target_id`, `target_type`, `user_agent`, `workspace_id`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.audit_logs:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read this workspace's audit logs.                     |
| `404`  | `not_found`        | No such workspace, or it's outside your tenant.                                      |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

::: warning Audit reads are privileged
`workspaces.audit_logs:read` exposes actor emails, IP addresses, and user agents for the whole workspace. Scope the tokens you issue for exports to exactly this, keep them out of user-facing clients, and treat the exported data as it deserves.
:::

</div>

<div class="api-right">

<CodePanel title="List audit logs" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/audit-logs/?category=role&created_after=2026-01-01T00:00:00Z&created_before=2026-02-01T00:00:00Z&order_by=-created_at" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/audit-logs/",
    headers={"X-Api-Key": "your-api-key"},
    params={
        "category": "role",
        "created_after": "2026-01-01T00:00:00Z",
        "created_before": "2026-02-01T00:00:00Z",
        "order_by": "-created_at",
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const params = new URLSearchParams({
  category: "role",
  created_after: "2026-01-01T00:00:00Z",
  created_before: "2026-02-01T00:00:00Z",
  order_by: "-created_at",
});
const response = await fetch(
  `https://api.plane.so/api/v2/workspaces/my-team/audit-logs/?${params}`,
  {
    headers: {
      "X-Api-Key": "your-api-key",
    },
  },
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "data": [
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
    },
    {
      "id": "1f6b3c92-7d40-4a85-9c21-8e5d0a4f2b76",
      "event_id": "c3a97e15-4b82-4d06-9f31-7a2e8c0d6b53",
      "sequence_number": 48120,
      "event_name": "role.permissions_updated",
      "category": "role",
      "outcome": "failure",
      "source": "api",
      "actor_type": "api_token",
      "actor_id": "7f2b9e04-6c1d-4a58-9e3b-0d4c8a2f6b71",
      "actor_display_name": "Deploy bot",
      "actor_email": "bots@example.com",
      "target_type": "role",
      "target_id": "release-manager",
      "target_display_name": "Release manager",
      "old_value": null,
      "new_value": null,
      "reason": "insufficient_permissions",
      "metadata": { "requested": "projects.states:write" },
      "ip_address": "198.51.100.7",
      "user_agent": "PlaneDeploy/2.4",
      "workspace_id": "d84c6f21-7a30-4e59-b6c8-1f9d5a2e7043",
      "project_id": null,
      "created_at": "2026-01-13T17:04:58.113402Z"
    }
  ],
  "next": 50,
  "previous": null,
  "total_count": 327,
  "pagination": {
    "style": "offset"
  }
}
```

</ResponsePanel>

<ResponsePanel status="200" title="CURSOR ENVELOPE (?paginate=cursor)">

```json
{
  "data": [
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
  ],
  "next_cursor": "b3A9MTcx",
  "has_more": true,
  "pagination": {
    "style": "cursor"
  }
}
```

</ResponsePanel>

</div>
</div>

## Exporting the trail

Walk it with the cursor envelope, oldest first, and store `event_id` as the deduplication key:

```python
import requests

BASE = "https://api.plane.so/api/v2/workspaces/my-team/audit-logs/"
params = {"paginate": "cursor", "per_page": 200, "order_by": "created_at"}
cursor = None

while True:
    if cursor:
        params["cursor"] = cursor  # the token carries position only — keep every other param
    page = requests.get(BASE, headers={"X-Api-Key": "your-api-key"}, params=params).json()
    for entry in page["data"]:
        ingest(entry)  # key on entry["event_id"]
    if not page["has_more"]:
        break
    cursor = page["next_cursor"]
```

Resume an incremental export with `created_after` set to the `created_at` of the last entry you stored, and let `event_id` absorb the overlap at the boundary.

::: tip Investigating a sudden wave of `409`s
`409 work_item_types_managed_at_workspace` and `work_item_types_managed_at_project` mean a client is writing to the wrong surface, usually because an admin switched the workspace's work item type mode. Query `?category=settings` around the time the errors started to find the change and who made it. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

## Related

- [Get an audit log](/api-reference/v2/audit-logs/get-audit-log)
- [Audit logs overview](/api-reference/v2/audit-logs/overview) — every field and every enum value
- [Pagination](/api-reference/v2/pagination)
