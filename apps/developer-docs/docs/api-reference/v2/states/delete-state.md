---
title: Delete a state
description: Delete a workflow state from a Plane project with the v2 REST API. Protected default states, states holding work items, OAuth scopes, error codes, and code examples.
keywords: plane api v2, delete state, remove workflow state, default state conflict, 409 conflict, DELETE states
---

# Delete a state

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/states/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Remove a state from a project's workflow. A successful delete returns `204` with an empty body.

Two conditions block a delete, and you have to clear the condition before the state will go — see [Before you delete](#before-you-delete).

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

The id of the state to delete.

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
| `400`  | `invalid_request`        | The request body or a query parameter failed validation.                             |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                      |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`              | Your role or token scope can't delete states.                                        |
| `404`  | `not_found`              | No such state, project, or workspace — or it's outside your tenant.                  |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | The state still holds work items.                                                    |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="Delete a state" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/states/f960d3c2-8524-4a41-b8eb-055ce4be2a7f/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/states/f960d3c2-8524-4a41-b8eb-055ce4be2a7f/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/states/f960d3c2-8524-4a41-b8eb-055ce4be2a7f/",
  {
    method: "DELETE",
    headers: {
      "X-Api-Key": "your-api-key",
    },
  },
);
console.log(response.status);
```

</template>
</CodePanel>

<ResponsePanel status="204">

No response body.

</ResponsePanel>

<ResponsePanel status="409" title="DEFAULT STATE">

```json
{
  "type": "conflict",
  "code": "conflict",
  "detail": "The default state cannot be deleted."
}
```

</ResponsePanel>

<ResponsePanel status="409" title="STATE HOLDS WORK ITEMS">

```json
{
  "type": "conflict",
  "code": "conflict",
  "detail": "This state still has work items in it."
}
```

</ResponsePanel>

</div>
</div>

## Before you delete

Both protected cases return `409 conflict`, so branch on the `detail` only for messaging — the fix differs:

- **The project's default state.** Every project needs somewhere for work items to land when no `state_id` is supplied. Promote another state with [Update a state](/api-reference/v2/states/update-state) and `"is_default": true`, which demotes the current default, then delete it.
- **A state that still holds work items.** Deleting it would leave those work items without a status. Move them to another state first — filter the project's work items by this state, `PATCH` each one to the replacement state, then retry the delete.

A safe teardown is therefore: reassign work items, hand off the default flag if this state has it, delete.

::: tip Deletes are soft
The state stops appearing in the API and in Plane, but the row is retained. Treat the `204` as final for integration purposes — the states API has no restore operation.
:::
