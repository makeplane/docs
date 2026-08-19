---
title: Get a work item type
description: Retrieve a single project work item type from Plane with the v2 REST API. Path parameters, response attributes, OAuth scopes, error codes, and code examples.
keywords: plane api v2, get work item type, issue type, type_id, is_default, is_epic, GET work item types
---

# Get a work item type

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-types/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve one work item type by id. Use it to confirm a type still exists and is still active before you write a work item against it, or to refresh a cached name after someone renamed the type in the app.

This returns the type's own attributes only. It does **not** tell you which fields or custom properties a work item of this type accepts — that is [Get a work item type schema](/api-reference/v2/work-item-types/get-work-item-type-schema).

Reads work in either [work item type mode](/api-reference/v2/work-item-type-modes), so this call never needs to branch on how the workspace is configured.

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

The id of the work item type to retrieve.

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

`projects.work_item_types:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read this project's work item types.                  |
| `404`  | `not_found`        | No such type, project, or workspace — or the type belongs to another project.        |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="Get a work item type" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/d1e7a4c9-2b58-4f36-9a0e-7c3b5d81f240/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/d1e7a4c9-2b58-4f36-9a0e-7c3b5d81f240/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/d1e7a4c9-2b58-4f36-9a0e-7c3b5d81f240/",
  {
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

<ResponsePanel status="404">

```json
{
  "type": "not_found",
  "code": "not_found",
  "detail": "No work item type matches the given query."
}
```

</ResponsePanel>

</div>
</div>

::: info A type from another project is a 404
Type ids are scoped to the project path you call them on. Passing a valid type id under the wrong `project_id` returns `404 not_found` rather than `403` — existence outside your scope is never leaked.
:::

::: tip Check is_active before offering a type
`is_active: false` means the type has been retired from pickers without being deleted. Existing work items keep it, but new ones should not be created with it.
:::
