---
title: Detach a property from a workspace type
description: Detach a custom property from a workspace-level work item type with the Plane v2 REST API. Why detaching never deletes, mode conflicts, OAuth scopes, error codes, and code examples.
keywords: plane api v2, detach property, remove property from work item type, DELETE type property, work item type modes, 409 conflict
---

# Detach a property from a workspace type

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-types/{type_id}/properties/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Remove a property from a workspace-level work item type. The type stops carrying the property; nothing else
changes.

::: info Detaching is not deleting
The property stays in the workspace catalog and stays attached to every other type that uses it. To remove it
from the workspace entirely, call
[Delete a workspace property](/api-reference/v2/workspace-work-item-properties/delete-workspace-work-item-property)
instead.
:::

::: warning Wrong mode is a 409, not a 404
If the workspace manages work item types at the **project** level, this route returns `409` with the code
`work_item_types_managed_at_project`. Detach through the project-level route instead. See
[Work item type modes](/api-reference/v2/work-item-type-modes).
:::

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is
`my-team`.

</ApiParam>

<ApiParam name="type_id" type="string (uuid)" :required="true">

The workspace work item type to detach the property from.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The property's id. A property that is not attached to this type returns `404`.

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
| `400`  | `invalid_request`        | The request failed validation — most often a `pk` that isn't a valid UUID.           |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                      |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`              | Your role or token scope can't write workspace work item types.                      |
| `404`  | `not_found`              | No such workspace, type, or property — or the property isn't on this type.           |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | This workspace manages work item types at the project level.                         |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="Detach a property from a type" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/d1a0b7c6-2f83-4e19-9a55-3b6c8d0e4f27/properties/a7e3f1d0-5c92-4b68-8f31-2d4a6b9e0c15/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/d1a0b7c6-2f83-4e19-9a55-3b6c8d0e4f27/properties/a7e3f1d0-5c92-4b68-8f31-2d4a6b9e0c15/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/d1a0b7c6-2f83-4e19-9a55-3b6c8d0e4f27/properties/a7e3f1d0-5c92-4b68-8f31-2d4a6b9e0c15/",
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

```text
No content
```

</ResponsePanel>

<ResponsePanel status="409">

```json
{
  "type": "conflict",
  "code": "work_item_types_managed_at_project",
  "detail": "This workspace manages work item types at the project level. Use the project-level endpoint instead."
}
```

</ResponsePanel>

</div>
</div>

::: tip Re-attaching is a POST away
Detaching is reversible: send the same id back through
[Attach properties to a workspace type](/api-reference/v2/workspace-work-item-type-properties/attach-workspace-type-property).
:::
