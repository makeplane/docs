---
title: Enable work item types
description: Turn work item types on for a Plane project with the v2 REST API. The first call in the project-mode lifecycle, the provisioned default type, OAuth scopes, error codes, and code examples.
keywords: plane api v2, enable work item types, issue types, project mode, default type, POST enable
---

# Enable work item types

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-types/enable/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Turn the work item types feature on for a project. **This is the first call in the project-mode lifecycle** — until it succeeds the project has no types, so there is nothing to create properties against and nothing for a work item's `type_id` to point at.

Enabling also provisions a default type, normally named `Task`, and returns it. That returned `id` is the type new work items land on when no `type_id` is supplied, and it is a valid target for [attaching properties](/api-reference/v2/work-item-type-properties/attach-type-property) straight away.

There is **no request body**. The path carries everything the call needs.

::: warning This write requires project mode
If the workspace manages types at the workspace level, this returns `409 work_item_types_managed_at_workspace`. In that mode there is nothing to enable per project — the workspace already owns the types, and you [import them into the project](/api-reference/v2/work-item-types/import-work-item-types) instead. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project to turn work item types on for.

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
| `403`  | `forbidden`              | Your role or token scope can't configure this project's work item types.             |
| `404`  | `not_found`              | No such workspace or project, or it's outside your tenant.                           |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | The workspace manages types at the workspace level. Import instead of enabling.      |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="Enable work item types" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/enable/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/enable/",
    headers={"X-Api-Key": "your-api-key"},
)
default_type = response.json()
print(default_type["id"], default_type["name"])
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/enable/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
    },
  },
);
const defaultType = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "id": "9c2f8e51-4a63-47d8-b1e0-5f7a2c40d693",
  "name": "Task",
  "description": "Default work item type with the option to add new properties",
  "is_active": true,
  "is_default": true,
  "is_epic": false,
  "level": 0,
  "logo_props": {
    "in_use": "icon",
    "icon": {
      "name": "Check",
      "background_color": "#1FA191"
    }
  },
  "created_at": "2026-01-14T09:22:41.478363Z"
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

::: tip Calling it twice is safe
A project that already has a default type gets that type back rather than a second one. You can put this call at the head of a provisioning script without guarding it — `200` either way, and the `id` you need in the body.
:::

## What comes next

With the feature on and a default type in hand, the rest of the setup runs in order:

1. [Create your own types](/api-reference/v2/work-item-types/create-work-item-type) — `Bug`, `Spike`, and so on.
2. [Create the properties](/api-reference/v2/work-item-properties/create-work-item-property) they should carry.
3. [Attach each property to a type](/api-reference/v2/work-item-type-properties/attach-type-property), deciding there whether it is required.
4. [Read the schema](/api-reference/v2/work-item-types/get-work-item-type-schema) to confirm what a work item of that type now accepts.

The full sequence is laid out in the [work item types overview](/api-reference/v2/work-item-types/overview).
