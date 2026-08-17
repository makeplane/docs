---
title: Delete a workspace work item type
description: Delete a workspace-level work item type in Plane with the v2 REST API. Workspace mode requirement, 204 response, OAuth scopes, error codes, and code examples.
keywords: plane api v2, delete workspace work item type, remove issue type, workspace mode, DELETE work item type
---

# Delete a workspace work item type

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-types/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Remove a work item type from the workspace. Because the type is shared, the removal is felt by every project working from the workspace list — check what still uses it before you call this.

A successful delete returns `204` with an empty body. There is nothing to parse; branch on the status code.

::: warning Workspace mode required
This write only succeeds while the workspace manages work item types at the workspace level. In project mode it returns `409` with code `work_item_types_managed_at_project`. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

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

`workspaces.work_item_types:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `400`  | `invalid_request`        | The request can't be processed as sent. See `errors[]`.                              |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                      |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`              | Your role or token scope can't write workspace types.                                |
| `404`  | `not_found`              | No such type or workspace, or it's outside your tenant.                              |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | The type can't be deleted in its current state — the response `detail` says why.     |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

::: info A repeat delete returns 404
Delete is not idempotent in its response: the second call for the same id returns `404 not_found`, because the type is already gone. Treat `404` on retry as success rather than as an error worth alerting on.
:::

</div>

<div class="api-right">

<CodePanel title="Delete a workspace work item type" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/a3f52d07-8e19-4c6b-92d4-0b7e15c8f326/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/a3f52d07-8e19-4c6b-92d4-0b7e15c8f326/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.status_code)  # 204
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/a3f52d07-8e19-4c6b-92d4-0b7e15c8f326/",
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
No content
```

</ResponsePanel>

<ResponsePanel status="409" title="WRONG MODE">

```json
{
  "type": "conflict",
  "code": "work_item_types_managed_at_project",
  "detail": "This workspace manages work item types at the project level. Delete the type on the project's work item types endpoint."
}
```

</ResponsePanel>

</div>
</div>

::: tip Consider deactivating instead
If the type is only being phased out, `is_active: false` via [Update](/api-reference/v2/workspace-work-item-types/update-workspace-work-item-type) takes it out of pickers while keeping it resolvable for the work items that already carry it — and you can undo it.
:::
