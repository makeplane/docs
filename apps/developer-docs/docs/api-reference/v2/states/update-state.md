---
title: Update a state
description: Update a workflow state in a Plane project with the v2 REST API. Partial PATCH semantics, body parameters, the default state flag, OAuth scopes, error codes, and code examples.
keywords: plane api v2, update state, patch state, workflow state, is_default, state group, PATCH states
---

# Update a state

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/states/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Change a state's name, color, description, group, position, or default flag. Work items already sitting in the state stay where they are — you are editing the state itself, not moving anything.

`PATCH` is partial. Send only the fields you want to change; anything you omit keeps its current value. Omitting a field is not the same as sending `null`.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the state belongs to.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The id of the state to update.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

Every field is optional — send the subset you are changing.

<div class="params-list">

<ApiParam name="name" type="string" :required="false">

New display name, unique within the project. Maximum 255 characters. Renaming is safe for reporting: boards and charts key off `group`, not `name`.

</ApiParam>

<ApiParam name="color" type="string" :required="false">

Hex color used wherever the state is rendered, for example `#3f76ff`. Maximum 255 characters.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Free-form description of what the state means in this workflow.

</ApiParam>

<ApiParam name="group" type="string" :required="false">

Move the state to a different workflow group. This changes how every work item in the state is counted by boards, charts, and cycle progress, so switching a state from `started` to `completed` retroactively changes what those work items report as.

- `backlog` — Not yet scheduled
- `unstarted` — Scheduled but not begun
- `started` — Actively in progress
- `completed` — Finished successfully
- `cancelled` — Closed without completion
- `triage` — Awaiting intake review

</ApiParam>

<ApiParam name="sequence" type="number" :required="false">

Ordering weight within the project. Lower values sort first. Set it to reposition the state in the workflow.

</ApiParam>

<ApiParam name="is_default" type="boolean" :required="false">

Make this the project's default state — where work items land when no `state_id` is supplied. A project has exactly one default, so setting this to `true` clears the flag on the state that held it.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this state, for sync and import correlation. Maximum 255 characters.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `github` or `jira`. Maximum 255 characters.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `color`, `created_at`, `created_by_id`, `description`, `external_id`, `external_source`, `group`, `id`, `is_default`, `is_triage`, `name`, `sequence`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.states:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `400`  | `invalid_request`        | A `group` outside the enum, or a field over its length limit.                        |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                      |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`              | Your role or token scope can't update states.                                        |
| `404`  | `not_found`              | No such state, project, or workspace — or it's outside your tenant.                  |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | Another state in the project already uses this name.                                 |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

::: warning Setting is_default moves the flag
A project has exactly one default state, so promoting a state with `"is_default": true` demotes whichever state held the flag before. To change which state is the default, promote the new one — that single request is the whole operation.
:::

::: info is_triage is not writable
`is_triage` is read-only. Plane creates and manages the triage state used by intake, so it isn't accepted in the request body. You can still assign the `triage` group to a state you own.
:::

</div>

<div class="api-right">

<CodePanel title="Update a state" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/states/f960d3c2-8524-4a41-b8eb-055ce4be2a7f/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Building",
  "color": "#f5a623"
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/states/f960d3c2-8524-4a41-b8eb-055ce4be2a7f/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "name": "Building",
        "color": "#f5a623",
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/states/f960d3c2-8524-4a41-b8eb-055ce4be2a7f/",
  {
    method: "PATCH",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Building",
      color: "#f5a623",
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
  "id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "name": "Building",
  "description": "Actively being worked on",
  "color": "#f5a623",
  "group": "started",
  "sequence": 25000,
  "is_default": false,
  "is_triage": false,
  "external_id": null,
  "external_source": null,
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
      "field": "group",
      "code": "invalid_choice",
      "message": "\"in_review\" is not a valid choice."
    }
  ]
}
```

</ResponsePanel>

</div>
</div>
