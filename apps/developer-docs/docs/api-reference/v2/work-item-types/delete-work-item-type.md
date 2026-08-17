---
title: Delete a work item type
description: Delete a project work item type in Plane with the v2 REST API. Protected deletes, project mode requirements, OAuth scopes, error codes, and code examples.
keywords: plane api v2, delete work item type, issue type, 204, conflict, project mode, DELETE work item types
---

# Delete a work item type

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-types/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Remove a work item type from a project. A successful delete returns `204` with an empty body.

Deletion is guarded. A type that is the project default, or that still has work items on it, is rejected with `409 conflict` rather than cascading — the API will not silently untype existing work.

If your goal is to stop people picking a type, [set `is_active` to `false`](/api-reference/v2/work-item-types/update-work-item-type) instead. That works regardless of how many work items already use the type, and it is reversible.

::: warning This write requires project mode
If the workspace manages types at the workspace level, this returns `409 work_item_types_managed_at_workspace`. Delete the type on [the workspace surface](/api-reference/v2/workspace-work-item-types/delete-workspace-work-item-type) instead. See [Work item type modes](/api-reference/v2/work-item-type-modes).
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

The id of the work item type to delete.

</ApiParam>

</div>
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
| `403`  | `forbidden`              | Your role or token scope can't delete work item types.                               |
| `404`  | `not_found`              | No such type, project, or workspace — or the type belongs to another project.        |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | The type is the project default, or work items still use it.                         |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="Delete a work item type" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/d1e7a4c9-2b58-4f36-9a0e-7c3b5d81f240/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/d1e7a4c9-2b58-4f36-9a0e-7c3b5d81f240/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.status_code)  # 204
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/d1e7a4c9-2b58-4f36-9a0e-7c3b5d81f240/",
  {
    method: "DELETE",
    headers: {
      "X-Api-Key": "your-api-key",
    },
  },
);
console.log(response.status); // 204
```

</template>
</CodePanel>

<ResponsePanel status="204">

```text
(empty body)
```

</ResponsePanel>

<ResponsePanel status="409">

```json
{
  "type": "conflict",
  "code": "conflict",
  "detail": "A work item type with existing work items cannot be deleted."
}
```

</ResponsePanel>

</div>
</div>

## Before a delete will succeed

Work through these in order:

1. **It must not be the default.** Promote another type with [mark-default](/api-reference/v2/work-item-types/mark-default-work-item-type). Marking a new default clears the flag on this one in the same request.
2. **No work items may reference it.** Move them to another type, or delete them. There is no force flag — the check is the point.

Both failures come back as `409 conflict`, distinguished by the `detail` string. Branch on the status and code; treat `detail` as text for humans.

::: tip Two 409s, two different meanings
`conflict` means the type is protected or in use — a state you can fix. `work_item_types_managed_at_workspace` means you called the wrong surface — a routing mistake, fixed by calling the workspace endpoint instead. Always read the `code`, never just the status.
:::
