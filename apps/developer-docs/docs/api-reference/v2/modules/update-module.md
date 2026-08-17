---
title: Update a module
description: Partially update a module in a Plane project with the v2 REST API. PATCH body parameters, status transitions, lead validation, OAuth scopes, and error codes.
keywords: plane api v2, update module, patch module, module status, module lead, PATCH modules
---

# Update a module

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/modules/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Update a module in place — move it to `in-progress`, hand it to a new lead, push out its target date.

The update is partial: fields you omit are untouched. Omitting a field is not the same as sending `null`, which clears
a nullable field.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the module belongs to.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The module to update.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="name" type="string" :required="false">

New display name, unique within the project. Maximum 255 characters. Renaming onto an existing module's name returns
`409 conflict`.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Plain-text summary of what the module covers.

</ApiParam>

<ApiParam name="status" type="string" :required="false">

Move the module to a different lifecycle position.

- `backlog` — Captured, not yet committed to
- `planned` — Committed to but not started
- `in-progress` — Actively being worked on
- `paused` — Started, then put on hold
- `completed` — Delivered
- `cancelled` — Dropped without delivering

Any value outside this list is a `400 invalid_request`. Transitions are unrestricted — a `completed` module can be
sent back to `in-progress`.

</ApiParam>

<ApiParam name="start_date" type="string (date)" :required="false">

Date the module is scheduled to begin, as `YYYY-MM-DD`. Send `null` to clear it.

</ApiParam>

<ApiParam name="target_date" type="string (date)" :required="false">

Date the module is expected to land, as `YYYY-MM-DD`. Send `null` to clear it. Must not be earlier than the module's
`start_date` — including the `start_date` already stored when you only send `target_date`.

</ApiParam>

<ApiParam name="lead_id" type="string (uuid)" :required="false">

Reassign the module. Must be a member of this project — any other user id is rejected with a `400` naming `lead_id`.
Send `null` to leave the module without a lead.

</ApiParam>

<ApiParam name="sort_order" type="number" :required="false">

Ordering weight used when modules are listed. Lower values sort first.

</ApiParam>

<ApiParam name="logo_props" type="any" :required="false">

Free-form JSON object holding the icon Plane renders for the module. The value you send replaces the stored object.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this module, for sync and import correlation. Maximum 255 characters. Nullable.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `github` or `jira`. Maximum 255 characters. Nullable.

</ApiParam>

</div>
</div>

::: warning No PUT
v2 has no `PUT`. Sending one returns `405 method_not_allowed` — use `PATCH` with only the fields you want to change.
:::

`member_ids`, `archived_at`, and the audit fields are read-only. Sending them has no effect.

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `archived_at`, `created_at`, `created_by_id`, `description`, `external_id`, `external_source`, `id`, `lead_id`, `logo_props`, `member_ids`, `name`, `sort_order`, `start_date`, `status`, `target_date`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed alongside the ids: `lead` (the module lead), `members` (the module members).

Expansion is separate-key: `?expand=state` keeps `state_id` and adds a `state` object next to it, so an id is never replaced by an object. An unknown value is a `400`.

`?fields=` and `?expand=` are independent namespaces. Relation names are not valid `?fields=` tokens (and vice versa), and an expanded object survives field filtering — `?fields=id,name&expand=state` returns `id`, `name` and `state`. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.modules:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                                        |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `400`  | `invalid_request`        | A `status` outside the enum, a `lead_id` who isn't a project member, or a `target_date` before `start_date`. |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                                              |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.                         |
| `403`  | `forbidden`              | Your role or token scope can't edit this module.                                                             |
| `404`  | `not_found`              | No such module, workspace, or project, or it's outside your tenant.                                          |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                                         |
| `409`  | `conflict`               | Another module in the project already uses this name.                                                        |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                                     |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                                          |
| `429`  | `rate_limited`           | Throttled. Wait for the interval in `Retry-After` and retry.                                                 |

</div>

</div>

<div class="api-right">

<CodePanel title="Update a module" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/modules/7c1f3d90-2a64-4e58-9b0d-3fa1c7e28b45/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "status": "paused",
  "target_date": "2026-03-13"
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b"
    "/modules/7c1f3d90-2a64-4e58-9b0d-3fa1c7e28b45/",
    headers={"X-Api-Key": "your-api-key"},
    json={"status": "paused", "target_date": "2026-03-13"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/modules/7c1f3d90-2a64-4e58-9b0d-3fa1c7e28b45/",
  {
    method: "PATCH",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "paused",
      target_date: "2026-03-13",
    }),
  },
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "id": "7c1f3d90-2a64-4e58-9b0d-3fa1c7e28b45",
  "name": "Billing revamp",
  "description": "Rework subscription billing end to end.",
  "status": "paused",
  "start_date": "2026-01-05",
  "target_date": "2026-03-13",
  "lead_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "member_ids": ["16c61a3a-512a-48ac-b0be-b6b46fe6f430", "9d3e1f27-8b4c-4a06-95f1-2c7ea45b0d18"],
  "sort_order": 65535.0,
  "logo_props": {},
  "external_id": null,
  "external_source": null,
  "archived_at": null,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
}
```

</ResponsePanel>

<ResponsePanel status="400">

```json
{
  "type": "invalid_request",
  "code": "invalid_request",
  "detail": "The request body failed validation.",
  "errors": [
    {
      "field": "lead_id",
      "code": "does_not_exist",
      "message": "Invalid pk \"b4d70c11-9e35-4a2f-8d6c-1f0ab3e97c52\" - object does not exist."
    }
  ]
}
```

</ResponsePanel>

</div>
</div>
