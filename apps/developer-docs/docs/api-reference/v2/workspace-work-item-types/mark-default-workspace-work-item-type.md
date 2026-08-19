---
title: Mark a workspace work item type as default
description: Promote a workspace-level work item type to the workspace default in Plane with the v2 REST API. Workspace mode requirement, OAuth scopes, error codes, and code examples.
keywords: plane api v2, mark default work item type, workspace default issue type, workspace mode, POST mark-default
---

# Mark a workspace work item type as default

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-types/{pk}/mark-default/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Promote a type to the workspace default — the type a work item gets when none is supplied. Exactly one type holds the flag, so marking this one clears it on the type that held it before.

`is_default` is read-only on create and update, which is why this is its own call. **Send no body.**

::: warning Workspace mode required
This write only succeeds while the workspace manages work item types at the workspace level. In project mode it returns `409` with code `work_item_types_managed_at_project` — set the default on the project endpoint instead. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The id of the work item type to make the default.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

None. The type is identified entirely by `pk`; send an empty request.

</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `created_at`, `description`, `id`, `is_active`, `is_default`, `is_epic`, `level`, `logo_props`, `name`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.work_item_types:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `400`  | `invalid_request`        | The type can't be made default as requested. See `errors[]`.                         |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                      |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`              | Your role or token scope can't write workspace types.                                |
| `404`  | `not_found`              | No such type or workspace, or it's outside your tenant.                              |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | The default can't be moved in the current state — the response `detail` says why.    |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="Mark a workspace work item type as default" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/9d2f1b73-4c85-4a06-b3e1-7f8c25a0d914/mark-default/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/9d2f1b73-4c85-4a06-b3e1-7f8c25a0d914/mark-default/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/9d2f1b73-4c85-4a06-b3e1-7f8c25a0d914/mark-default/",
  {
    method: "POST",
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
  "id": "9d2f1b73-4c85-4a06-b3e1-7f8c25a0d914",
  "name": "Task",
  "description": "Standard unit of work",
  "is_active": true,
  "is_default": true,
  "is_epic": false,
  "level": 0,
  "logo_props": {},
  "created_at": "2026-01-14T09:22:41.548221Z"
}
```

</ResponsePanel>

<ResponsePanel status="409" title="WRONG MODE">

```json
{
  "type": "conflict",
  "code": "work_item_types_managed_at_project",
  "detail": "This workspace manages work item types at the project level. Mark the default on the project's work item types endpoint."
}
```

</ResponsePanel>

</div>
</div>

::: info Confirm the swap in one read
The response is the promoted type, not the pair. If you need to show the change, re-read the set with [List workspace work item types](/api-reference/v2/workspace-work-item-types/list-workspace-work-item-types) — the previous default now reports `is_default: false`.
:::
