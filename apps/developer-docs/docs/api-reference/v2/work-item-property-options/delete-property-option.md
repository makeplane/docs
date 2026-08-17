---
title: Delete a property option
description: Delete an option from an OPTION-typed work item property in a Plane project with the v2 REST API. Path parameters, the 204 response, project-mode 409s, OAuth scopes, and code examples.
keywords: plane api v2, delete property option, remove work item property option, OPTION property, 204 no content, DELETE property options
---

# Delete a property option

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-properties/{property_id}/options/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Remove a choice from a project-level `OPTION` property. Use this when an option is no longer offered — a retired severity level, a team that no longer exists.

A successful delete returns `204` with an empty body. There is nothing to parse; branch on the status code.

If you only want to stop offering a choice without removing it from history, consider renaming it with [Update a property option](/api-reference/v2/work-item-property-options/update-property-option) instead — a rename leaves every stored value intact because values reference the option `id`.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project that owns the property.

</ApiParam>

<ApiParam name="property_id" type="string (uuid)" :required="true">

The `OPTION` property the option belongs to. See [Work item properties](/api-reference/v2/work-item-properties/overview).

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The id of the option to delete. Every ancestor in the path is enforced — an option id that belongs to a different property returns `404` rather than deleting anything.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_item_properties:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                                  |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------------ |
| `400`  | `invalid_request`        | The request couldn't be processed as sent — for example a malformed identifier in the path.            |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                                        |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.                   |
| `403`  | `forbidden`              | Your role or token scope can't write this project's properties.                                        |
| `404`  | `not_found`              | No such option, property, project, or workspace — or the option belongs to a different property.       |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                                   |
| `409`  | `conflict`               | The workspace manages work item types at the workspace level, so this project-level write is rejected. |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                               |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                                    |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                                             |

</div>

::: warning Wrong mode is a 409, not a 404
If the workspace manages work item types at the **workspace** level, this project-level `DELETE` returns `409 work_item_types_managed_at_workspace`. Nothing was deleted, and the option still exists — the write belongs on the workspace surface. Delete it through [Property options (workspace)](/api-reference/v2/workspace-work-item-property-options/overview), and see [Work item type modes](/api-reference/v2/work-item-type-modes) for how to detect the mode before you write.
:::

::: info 404 after a successful delete
A repeat `DELETE` of the same option returns `404 not_found`, not another `204`. If you are reconciling state, treat `404` on delete as "already gone" rather than as a failure.
:::

</div>

<div class="api-right">

<CodePanel title="Delete a property option" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/c1a7f2d8-6b34-4e59-9f80-2d4a7c31e6b5/options/a84f1b60-95c2-4d37-8e5a-3b0f6d29c471/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -i
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/c1a7f2d8-6b34-4e59-9f80-2d4a7c31e6b5/options/a84f1b60-95c2-4d37-8e5a-3b0f6d29c471/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.status_code)  # 204
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/c1a7f2d8-6b34-4e59-9f80-2d4a7c31e6b5/options/a84f1b60-95c2-4d37-8e5a-3b0f6d29c471/",
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

<ResponsePanel status="204" title="NO CONTENT">

```text
(empty body)
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
