---
title: Delete a workspace property option
description: Remove a selectable choice from a workspace-level OPTION property with the Plane v2 REST API. Path parameters, OAuth scopes, error codes, and code examples.
keywords: plane api v2, delete property option, workspace work item property, OPTION property, dropdown choice, DELETE option
---

# Delete a workspace property option

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-properties/{property_id}/options/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Remove a choice from a workspace-level `OPTION` property. The delete is soft — the option stops being selectable and disappears from reads, and the request returns `204` with an empty body.

Deleting an option is not the same as renaming it. If the choice is being reworded, `PATCH` it instead: [Update a workspace property option](/api-reference/v2/workspace-work-item-property-options/update-workspace-property-option) keeps the option's `id`, so work items already holding it keep their value.

::: warning Workspace mode only
This write requires the workspace to manage work item types at the workspace level. In project mode it returns `409 work_item_types_managed_at_project` — delete the option through the project-level endpoint instead. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="property_id" type="string (uuid)" :required="true">

The workspace-level property the option belongs to. See [Workspace work item properties](/api-reference/v2/workspace-work-item-properties/overview).

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The option to delete. It is looked up within the property, so an option id under the wrong `property_id` is a `404`.

</ApiParam>

</div>

Deleting the property's default option leaves the property with no default. Nothing promotes another option in its place — set a new default explicitly if the property needs one.

</div>

<div class="params-section">

### Scopes

`workspaces.work_item_properties:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                                                        |
| ------ | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | The request body or a query parameter failed validation.                                                                     |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                                                              |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.                                         |
| `403`  | `forbidden`              | Your role or token scope can't write this workspace's properties.                                                            |
| `404`  | `not_found`              | No such workspace, workspace-level property, or option — or it's outside your tenant. Already-deleted options are `404` too. |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                                                         |
| `409`  | `conflict`               | This workspace manages work item types at the project level. Use the project-level options endpoint.                         |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                                                     |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                                                          |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                                                                   |

</div>

</div>

<div class="api-right">

<CodePanel title="Delete a property option" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/9d0e1f3b-6a72-4c85-9e4d-2b7f1a6c8d54/options/2f6a94c1-7b38-4d50-91ae-3c0d5e8b7a26/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/9d0e1f3b-6a72-4c85-9e4d-2b7f1a6c8d54/options/2f6a94c1-7b38-4d50-91ae-3c0d5e8b7a26/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.status_code)  # 204
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/9d0e1f3b-6a72-4c85-9e4d-2b7f1a6c8d54/options/2f6a94c1-7b38-4d50-91ae-3c0d5e8b7a26/",
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
  "code": "work_item_types_managed_at_project",
  "detail": "Work item types are managed at the project level for this workspace."
}
```

</ResponsePanel>

</div>
</div>

::: info Work items that already hold the option
The delete cascades: property values pointing at this option are soft-deleted with it, so work items that carried the choice lose it. That cascade runs in the background, so a read taken immediately after the `204` can still show the old value for a moment.

If you are rewording a choice rather than retiring it, [update the option](/api-reference/v2/workspace-work-item-property-options/update-workspace-property-option) instead — a rename keeps the `id` and every work item keeps its value.
:::
