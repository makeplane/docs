---
title: Unarchive a work item
description: Restore an archived Plane work item with the v2 REST API. Bodyless POST, clearing archived_at, idempotent behavior, OAuth scopes, error codes, and code examples.
keywords: plane api v2, unarchive work item, restore work item, archived_at null, POST unarchive
---

# Unarchive a work item

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{pk}/unarchive/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Restore an archived work item: clear `archived_at` and put it back into the active set, where it shows up in lists and
plain detail reads again.

This is a **bodyless** `POST` — send no JSON at all. The response is the full work item in its usual read shape with
`archived_at` back to `null`.

Unlike most detail routes, this one deliberately looks past the archive filter to find the work item — that is the
whole point. It also means the call is safe to repeat: unarchiving a work item that isn't archived succeeds and changes
nothing.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the work item belongs to.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The work item's UUID. This lookup is UUID-only — a `PROJ-142` identifier here returns `404`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

None. The endpoint takes no request body; anything you send is ignored.

</div>

::: tip Safe to retry
Unarchive resolves archived and active work items alike, so a repeat call is a no-op that returns `200` with
`archived_at: null`. Archive is the asymmetric one — see
[Archive a work item](/api-reference/v2/work-items/archive-work-item).
:::

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `archived_at`, `assignee_ids`, `created_at`, `created_by_id`, `custom_fields`, `cycle_id`, `id`, `identifier`, `is_draft`, `label_ids`, `module_ids`, `name`, `parent_id`, `priority`, `project_id`, `sequence_id`, `start_date`, `state_id`, `target_date`, `type_id`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed alongside the ids: `assignees` (the assigned users), `cycle` (the cycle it belongs to), `labels` (the applied labels), `modules` (the modules it belongs to), `parent` (its parent work item), `state` (the work item's state object), `type` (its work item type).

Expansion is separate-key: `?expand=state` keeps `state_id` and adds a `state` object next to it, so an id is never replaced by an object. An unknown value is a `400`.

`?fields=` and `?expand=` are independent namespaces. Relation names are not valid `?fields=` tokens (and vice versa), and an expanded object survives field filtering — `?fields=id,name&expand=state` returns `id`, `name` and `state`. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_items:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `400`  | `invalid_request`        | The request could not be processed — for example a `pk` that isn't a valid UUID.     |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                      |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`              | Your role or token scope can't archive or unarchive this work item.                  |
| `404`  | `not_found`              | No such work item, or it's outside your project or tenant.                           |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | The write collides with a protected-resource constraint.                             |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="Unarchive a work item" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/unarchive/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b"
    "/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/unarchive/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json()["archived_at"])  # None
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b" +
    "/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/unarchive/",
  {
    method: "POST",
    headers: { "X-Api-Key": "your-api-key" },
  },
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "id": "8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13",
  "name": "Fix login redirect loop",
  "identifier": "PROJ-142",
  "sequence_id": 142,
  "priority": "high",
  "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "type_id": "2d9d1a97-5c6f-4a1e-9d5b-8c2f7e30b6a4",
  "assignee_ids": ["16c61a3a-512a-48ac-b0be-b6b46fe6f430"],
  "label_ids": ["c1b8f3d6-9a44-4e12-8f7a-2b6d5c9e1a03"],
  "parent_id": null,
  "start_date": "2026-01-12",
  "target_date": "2026-01-20",
  "is_draft": false,
  "archived_at": null,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "custom_fields": {
    "Severity": {
      "id": "5e2a7c81-4f39-4b60-a1d8-0c6b3e9f2d74",
      "value": ["Sev-2"],
      "value_detail": [{ "id": "c1b8f3d6-9a44-4e12-8f7a-2b6d5c9e1a03", "name": "Sev-2" }]
    }
  }
}
```

</ResponsePanel>

<ResponsePanel status="404">

```json
{
  "type": "not_found",
  "code": "not_found",
  "detail": "The requested resource was not found."
}
```

</ResponsePanel>

</div>
</div>

## What comes back, and what doesn't

The response is the work item's standard read shape with `archived_at` cleared. Because this is a single-object
response, `custom_fields` is populated here — the archive verbs return the same shape as
[Get a work item](/api-reference/v2/work-items/get-work-item), custom property values included. It is only
**collection** responses that omit `custom_fields`.

Nothing else is restored or changed, because nothing else was touched when the work item was archived: state,
assignees, labels, dates, comments, and relations all survived the archive untouched.

## Finding archived work items to restore

Archived work items are excluded from [List work items](/api-reference/v2/work-items/list-work-items) and from plain
detail reads, so the API gives you nothing to browse them with. Record the `id` when you archive — the archive response
returns it — or pick the work item out of the Plane app's archive view, then unarchive it by UUID. This route is the
one place an archived work item still resolves.
