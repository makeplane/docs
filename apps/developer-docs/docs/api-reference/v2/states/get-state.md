---
title: Get a state
description: Retrieve a single workflow state from a Plane project with the v2 REST API. Path parameters, OAuth scopes, error codes, and code examples.
keywords: plane api v2, get state, retrieve state, workflow state, state group, GET state by id
---

# Get a state

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/states/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve one state by id. Reach for this when you already hold a `state_id` — from a work item, a webhook payload, or a stored mapping — and need its current name, color, or group.

Checking `group` before you act is the reliable way to tell whether a work item is finished: a state named `Done` in one project and `Shipped` in another both report `group: "completed"`.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the state belongs to. A state id from a different project returns `404`, even inside the same workspace.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The id of the state to retrieve.

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

`projects.states:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read this project's states.                           |
| `404`  | `not_found`        | No such state, project, or workspace — or it's outside your tenant.                  |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

::: info The response is flat
The state object has no nested records. `created_by_id` is returned as an id, so fetch the user separately if you need their name.
:::

::: info Existence is never leaked
A state outside your tenant returns `404`, not `403`. If you are resolving a cached id and get a `404`, re-read the project's workflow with [List states](/api-reference/v2/states/list-states) instead of retrying.
:::

</div>

<div class="api-right">

<CodePanel title="Get a state" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/states/f960d3c2-8524-4a41-b8eb-055ce4be2a7f/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/states/f960d3c2-8524-4a41-b8eb-055ce4be2a7f/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/states/f960d3c2-8524-4a41-b8eb-055ce4be2a7f/",
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
  "id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "name": "In Progress",
  "description": "Actively being worked on",
  "color": "#3f76ff",
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

<ResponsePanel status="404">

```json
{
  "type": "not_found",
  "code": "not_found",
  "detail": "No State matches the given query."
}
```

</ResponsePanel>

</div>
</div>
