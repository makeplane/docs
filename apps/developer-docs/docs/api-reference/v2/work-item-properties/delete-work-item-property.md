---
title: Delete a work item property
description: Delete a custom work item property from a Plane project with the v2 REST API. Path parameters, the deactivate alternative, OAuth scopes, error codes, and code examples.
keywords: plane api v2, delete work item property, remove custom field, is_active, 204 no content, DELETE work item property
---

# Delete a work item property

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-properties/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Remove a custom property definition from a project. The response is `204` with an empty body — there is nothing to parse, so branch on the status code.

Deleting a property removes the field itself, along with the choices defined for it and its attachments to work item types. If you only want the field to stop being offered, set `is_active: false` with [Update a work item property](/api-reference/v2/work-item-properties/update-work-item-property) instead — that keeps the definition and everything recorded against it, and it is reversible.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the property belongs to. A property id from a different project returns `404`, even inside the same workspace.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The id of the property to delete.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `created_at`, `default_value`, `description`, `display_name`, `external_id`, `external_source`, `id`, `is_active`, `is_multi`, `is_required`, `logo_props`, `name`, `options`, `property_type`, `relation_type`, `settings`, `validation_rules`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_item_properties:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                                                 |
| ------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | A malformed identifier in the path.                                                                                   |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                                                       |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.                                  |
| `403`  | `forbidden`              | Your role or token scope can't delete properties.                                                                     |
| `404`  | `not_found`              | No such property, project, or workspace — or it's outside your tenant.                                                |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                                                  |
| `409`  | `conflict`               | This workspace manages work item types at the workspace level. Delete the property on the workspace endpoint instead. |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                                              |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                                                   |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                                                            |

</div>

::: warning A 409 means wrong surface, not missing permission
If the workspace manages work item types at the workspace level, this project endpoint returns `409 work_item_types_managed_at_workspace`. The delete belongs on [Delete a workspace work item property](/api-reference/v2/workspace-work-item-properties/delete-workspace-work-item-property). Reading the same property through this path still works — only writes are mode-specific. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

::: info 204 has no body
A successful delete returns `204 No Content`. Calling `.json()` on the response throws. Check `response.status === 204` (or `response.ok`) instead.
:::

</div>

<div class="api-right">

<CodePanel title="Delete a work item property" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/9d2f0b74-6a51-4c8e-b3d7-2f1a8c05e964/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/9d2f0b74-6a51-4c8e-b3d7-2f1a8c05e964/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.status_code)  # 204
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/9d2f0b74-6a51-4c8e-b3d7-2f1a8c05e964/",
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
  "detail": "No IssueProperty matches the given query."
}
```

</ResponsePanel>

</div>
</div>

## Delete or deactivate?

| You want to…                                           | Do this                                                                                         |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| Stop offering the field but keep its history           | `PATCH` with `is_active: false`                                                                 |
| Take a choice out of an `OPTION` field, keep the field | [Delete a property option](/api-reference/v2/work-item-property-options/delete-property-option) |
| Remove the field from one type but keep it elsewhere   | [Detach a type property](/api-reference/v2/work-item-type-properties/detach-type-property)      |
| Remove the definition from the project entirely        | `DELETE` this endpoint                                                                          |

Deleting is the only one of these you cannot undo by flipping a flag back.
