---
title: Update a work item type
description: Update a project work item type in Plane with the v2 REST API. Partial PATCH semantics, body parameters, project mode requirements, OAuth scopes, error codes, and code examples.
keywords: plane api v2, update work item type, patch issue type, is_active, external_id, project mode, PATCH work item types
---

# Update a work item type

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-types/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Rename a type, rewrite its description, retire it from pickers, or correct its sync correlation fields. Work items already using the type are untouched — you are editing the type, not retyping anything.

`PATCH` is partial. Send only the fields you want to change; anything you omit keeps its current value. Omitting a field is not the same as sending `null`.

::: warning This write requires project mode
If the workspace manages types at the workspace level, this returns `409 work_item_types_managed_at_workspace`. Edit the type on [the workspace surface](/api-reference/v2/workspace-work-item-types/update-workspace-work-item-type) instead. See [Work item type modes](/api-reference/v2/work-item-type-modes).
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

The id of the work item type to update.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

Every field is optional — send the subset you are changing.

<div class="params-list">

<ApiParam name="name" type="string" :required="false">

New display name for the type. Maximum 255 characters. Renaming is safe: work items reference the type by `type_id`, not by name.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

What this type is for. It is returned as `type_description` by the [schema endpoint](/api-reference/v2/work-item-types/get-work-item-type-schema), so this is the field to edit when integrations are choosing the wrong type.

</ApiParam>

<ApiParam name="is_active" type="boolean" :required="false">

Whether the type can be assigned to new work items. Setting it to `false` retires the type from pickers without deleting it — existing work items keep the type and stay readable. This is the safe alternative to [delete](/api-reference/v2/work-item-types/delete-work-item-type), which a type in use rejects.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this type, for sync and import correlation. Maximum 255 characters, nullable.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `github` or `jira`. Maximum 255 characters, nullable.

</ApiParam>

</div>
</div>

::: info is_default, is_epic and level are not accepted here
`is_default` moves through [mark-default](/api-reference/v2/work-item-types/mark-default-work-item-type), which is a dedicated request precisely because promoting one type demotes another. `is_epic` and `level` are read-only, as is `logo_props`.
:::

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

| Status | Code                     | Cause                                                                                    |
| ------ | ------------------------ | ---------------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | A field over its 255-character limit, or `"is_active": false` on the default type.       |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                          |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.     |
| `403`  | `forbidden`              | Your role or token scope can't update work item types.                                   |
| `404`  | `not_found`              | No such type, project, or workspace — or the type belongs to another project.            |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                     |
| `409`  | `conflict`               | Another type in this project already uses this `external_id` and `external_source` pair. |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                 |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                      |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                               |

</div>

</div>

<div class="api-right">

<CodePanel title="Update a work item type" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/d1e7a4c9-2b58-4f36-9a0e-7c3b5d81f240/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Defect",
  "description": "A verified regression in shipped behavior"
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/d1e7a4c9-2b58-4f36-9a0e-7c3b5d81f240/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "name": "Defect",
        "description": "A verified regression in shipped behavior",
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/d1e7a4c9-2b58-4f36-9a0e-7c3b5d81f240/",
  {
    method: "PATCH",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Defect",
      description: "A verified regression in shipped behavior",
    }),
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
  "name": "Defect",
  "description": "A verified regression in shipped behavior",
  "is_active": true,
  "is_default": false,
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

<ResponsePanel status="400">

```json
{
  "type": "invalid_request",
  "code": "invalid_request",
  "detail": "The default work item type cannot be deactivated.",
  "errors": []
}
```

</ResponsePanel>

</div>
</div>

::: warning The default type cannot be deactivated
Sending `"is_active": false` for the project's default type is rejected — every project needs a type for untyped work items to land on. Promote another type with [mark-default](/api-reference/v2/work-item-types/mark-default-work-item-type) first, then deactivate this one.
:::

::: tip Deactivate rather than delete
[Delete](/api-reference/v2/work-item-types/delete-work-item-type) refuses to remove a type that still has work items. `"is_active": false` is the usual intent anyway: the type stops appearing in pickers, historical work items keep rendering correctly, and the change is reversible.
:::
