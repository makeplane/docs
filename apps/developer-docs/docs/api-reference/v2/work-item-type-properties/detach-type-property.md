---
title: Detach a property from a type
description: Detach a custom property from a Plane work item type with the v2 REST API. Path parameters, OAuth scopes, mode conflicts, error codes, and code examples.
keywords: plane api v2, detach property from type, remove property from work item type, work item type properties, DELETE type property
---

# Detach a property from a type

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-types/{type_id}/properties/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Stop a work item type from exposing a custom property. This removes the link between the type and the property and
returns `204` with an empty body.

::: tip Detaching is not deleting
The property definition survives. It stays in the project, stays attached to every other type that uses it, and can be
attached again later with
[Attach a property to a type](/api-reference/v2/work-item-type-properties/attach-type-property). To remove the
definition itself, use
[Delete a work item property](/api-reference/v2/work-item-properties/delete-work-item-property).
:::

::: warning Values recorded on this type's work items are removed
The link is not the only thing that goes. Values already stored for this property on work items **of this type** are
removed along with it, and re-attaching does not restore them. Export what you need before detaching a property that
has been in use. Work items of other types keep their values for this property.
:::

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the work item type belongs to.

</ApiParam>

<ApiParam name="type_id" type="string (uuid)" :required="true">

The work item type to detach the property from.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The id of the property to detach — the property's own id, not a separate link id. It is the same value you passed in
the `properties` array when you attached it.

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
| `400`  | `invalid_request`        | Malformed request — for example a `pk` that isn't a valid UUID.                      |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                      |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`              | Your role or token scope can't edit this project's work item types.                  |
| `404`  | `not_found`              | The property isn't attached to this type, or no such type, project, or workspace.    |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | This workspace manages work item types at the workspace level. See below.            |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

::: warning Wrong mode is a 409, not a 404
Detaching is a project-mode write. If the workspace manages work item types at the **workspace** level, this endpoint
returns `409 work_item_types_managed_at_workspace` and nothing is changed. Detach on the workspace surface instead with
[Detach a property from a workspace type](/api-reference/v2/workspace-work-item-type-properties/detach-workspace-type-property).

Branch on the `code`: a `409` means "wrong surface", a `404` means "that property isn't on this type". See
[Work item type modes](/api-reference/v2/work-item-type-modes).
:::

::: info Detach is not idempotent the way attach is
Attaching a property twice is harmless, but detaching one that is already gone returns `404` rather than `204`. If you
are replaying a request, treat a `404` as "already detached" instead of retrying.
:::

</div>

<div class="api-right">

<CodePanel title="Detach a property from a type" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/9d3c7f21-6b48-4e0a-8f52-2c1d7a904e66/properties/5e8b3417-2a6d-4c91-b0f7-8d2e14a6c395/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/9d3c7f21-6b48-4e0a-8f52-2c1d7a904e66/properties/5e8b3417-2a6d-4c91-b0f7-8d2e14a6c395/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/9d3c7f21-6b48-4e0a-8f52-2c1d7a904e66/properties/5e8b3417-2a6d-4c91-b0f7-8d2e14a6c395/",
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

<ResponsePanel status="409">

```json
{
  "type": "conflict",
  "code": "work_item_types_managed_at_workspace",
  "detail": "Work item types are managed at the workspace level for this workspace."
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
