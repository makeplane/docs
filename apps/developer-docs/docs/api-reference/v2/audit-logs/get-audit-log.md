---
title: Get an audit log
description: Retrieve a single Plane audit log entry by id with the v2 REST API. Path parameters, the full entry payload, OAuth scopes, error codes, and code examples.
keywords: plane api v2, get audit log, audit entry by id, compliance evidence, security investigation, GET audit log
---

# Get an audit log

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/audit-logs/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve one audit entry by id. Reach for this when an investigation has already narrowed to a single event — a ticket cites an entry id, an alert fired on one, or a list result needs to be cited as evidence.

The payload is identical to a row in [List audit logs](/api-reference/v2/audit-logs/list-audit-logs), so use this endpoint for stable, linkable access to a single event rather than for bulk reading.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`. Audit entries never cross workspaces: an entry id from another workspace returns `404`.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The id of the audit log entry to retrieve. This is the entry's `id`, not its `event_id`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

None. The detail route takes no filters and no `?expand=` — `actor_id` and `target_id` stay as ids, so resolve them yourself if you need names beyond the snapshots already in the payload.

</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

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
| `404`  | `not_found`        | No such entry or workspace, or it's outside your tenant.                             |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

::: info Entries are immutable
There is no `PATCH` or `DELETE` on this path. An audit entry is written once by Plane and cannot be edited or removed through the API, which is what makes a retrieved entry usable as evidence.
:::

::: info `id` versus `event_id`
`id` addresses this record and is what belongs in the URL. `event_id` identifies the underlying event and is the better deduplication key when you are ingesting entries elsewhere. Passing an `event_id` here returns `404`.
:::

</div>

<div class="api-right">

<CodePanel title="Get an audit log" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/audit-logs/5c7f1a08-2b64-4d39-9e17-0a3b8c6d2f41/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/audit-logs/5c7f1a08-2b64-4d39-9e17-0a3b8c6d2f41/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/audit-logs/5c7f1a08-2b64-4d39-9e17-0a3b8c6d2f41/",
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

<ResponsePanel status="404">

```json
{
  "type": "not_found",
  "code": "not_found",
  "detail": "No Audit Log matches the given query."
}
```

</ResponsePanel>

</div>
</div>

## Pivoting from one entry

A single entry is usually the start of a thread, not the end of one. From the payload above:

| Next question                     | Query on [List audit logs](/api-reference/v2/audit-logs/list-audit-logs)       |
| --------------------------------- | ------------------------------------------------------------------------------ |
| What else did this actor do?      | `?actor_id=16c61a3a-512a-48ac-b0be-b6b46fe6f430`                               |
| What else came from that address? | `?ip_address=203.0.113.42`                                                     |
| Full history of this target       | `?target_type=workspace_member&target_id=3e8a5d17-9c40-4b2f-81d6-4a7f2b9e0c53` |
| Everything around the same moment | `?created_after=2026-01-14T09:00:00Z&created_before=2026-01-14T10:00:00Z`      |

Resolve `actor_id` to a current person with [List workspace members](/api-reference/v2/members/list-workspace-members) — the names on the entry are snapshots from event time, and may no longer match.

::: tip When the entry explains a `409`
A `settings` entry that flipped `is_work_item_types_enabled` explains a wave of `409 work_item_types_managed_at_workspace` or `work_item_types_managed_at_project` responses: the workspace changed which surface accepts work item type writes. See [Work item type modes](/api-reference/v2/work-item-type-modes) and [Workspace features](/api-reference/v2/workspace-features/overview).
:::
