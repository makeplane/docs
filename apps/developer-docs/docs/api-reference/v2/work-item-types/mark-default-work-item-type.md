---
title: Mark a work item type as default
description: Promote a Plane project work item type to the project default with the v2 REST API. Single-request promotion, project mode requirements, OAuth scopes, error codes, and code examples.
keywords: plane api v2, mark default work item type, is_default, default issue type, project mode, POST mark-default
---

# Mark a work item type as default

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-types/{pk}/mark-default/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Promote a type to the project's default — the type new work items get when the request supplies no `type_id`.

**Exactly one type per project is the default.** Marking a new one clears the flag on the type that held it, so promotion is a single request rather than a demote-then-promote pair. There is no way to have zero defaults, and no way to have two.

There is **no request body**. The type is identified by `{pk}` in the path, and the response is the updated type.

`is_default` is deliberately not writable through [create](/api-reference/v2/work-item-types/create-work-item-type) or [update](/api-reference/v2/work-item-types/update-work-item-type). Moving the flag has a side effect on another row, so it gets its own endpoint instead of hiding inside a `PATCH`.

::: warning This write requires project mode
If the workspace manages types at the workspace level, this returns `409 work_item_types_managed_at_workspace`. Promote the type on [the workspace surface](/api-reference/v2/workspace-work-item-types/mark-default-workspace-work-item-type) instead. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the type belongs to.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The id of the work item type to make the default.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

None. Send the request without a body.

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

`projects.work_item_types:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `400`  | `invalid_request`        | The request could not be processed as sent.                                          |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                      |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`              | Your role or token scope can't update work item types.                               |
| `404`  | `not_found`              | No such type, project, or workspace — or the type belongs to another project.        |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | The workspace manages types at the workspace level. Use the workspace surface.       |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="Mark a work item type as default" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/d1e7a4c9-2b58-4f36-9a0e-7c3b5d81f240/mark-default/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/d1e7a4c9-2b58-4f36-9a0e-7c3b5d81f240/mark-default/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json()["is_default"])  # True
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/d1e7a4c9-2b58-4f36-9a0e-7c3b5d81f240/mark-default/",
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
  "id": "d1e7a4c9-2b58-4f36-9a0e-7c3b5d81f240",
  "name": "Bug",
  "description": "Something is broken and needs a fix",
  "is_active": true,
  "is_default": true,
  "is_epic": false,
  "level": 0,
  "logo_props": {
    "in_use": "icon",
    "icon": {
      "name": "AlertCircle",
      "background_color": "#EF5974"
    }
  },
  "created_at": "2026-01-14T09:24:03.117482Z"
}
```

</ResponsePanel>

<ResponsePanel status="409">

```json
{
  "type": "conflict",
  "code": "work_item_types_managed_at_workspace",
  "detail": "Work item types are managed at the workspace level for this workspace."
}
```

</ResponsePanel>

</div>
</div>

::: warning The response only shows the type you promoted
The previously default type is demoted in the same operation, but it is not included in the response. If you are holding cached type objects, refresh the whole set with [List work item types](/api-reference/v2/work-item-types/list-work-item-types) after promoting, or your cache will briefly show two defaults.
:::

::: tip The default type is protected
Once a type is the default it cannot be deleted, and it cannot be deactivated with `"is_active": false`. Both are the same guard from two directions: a project always needs somewhere for untyped work items to land. To retire the current default, promote a replacement first — this call — and then delete or deactivate the old one.
:::
