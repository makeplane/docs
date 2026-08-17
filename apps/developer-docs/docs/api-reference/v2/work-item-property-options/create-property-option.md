---
title: Create a property option
description: Add a selectable option to an OPTION-typed work item property in a Plane project with the v2 REST API. Body parameters, the default option, project-mode 409s, OAuth scopes, and code examples.
keywords: plane api v2, create property option, work item property option, OPTION property, is_default, POST property options
---

# Create a property option

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-properties/{property_id}/options/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Add one more selectable choice to a project-level property whose `property_type` is `OPTION`. The new option becomes immediately pickable on work items that carry the property.

Use this when the property already exists and you are extending its list. If you are still creating the property, you can pass the full set of choices inline through the property's write-only `options` field instead — see [Work item properties](/api-reference/v2/work-item-properties/overview) — and come back here only for later changes.

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

The property to add the option to. It must be an `OPTION` property in this project — a property id from another project returns `404`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="name" type="string" :required="true">

The label shown in the picker, for example `Blocker`. Maximum 255 characters.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Free-form explanation of what the option means. Worth filling in when the label alone doesn't tell someone when to choose it.

</ApiParam>

<ApiParam name="is_default" type="boolean" :required="false">

Make this the option that is preselected when a work item is created without an explicit value for this property. Defaults to `false`.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this option, for sync and import correlation. Maximum 255 characters. Nullable.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `github` or `jira`. Maximum 255 characters. Nullable. Send it alongside `external_id` — an `external_id` is only unique within its source.

</ApiParam>

</div>

::: info sort_order is not writable
`sort_order` comes back on every read, but it is not a create field. Plane assigns the new option a position when it is created; there is no body parameter that places it.
:::

</div>

<div class="params-section">

### Scopes

`projects.work_item_properties:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                                  |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------------ |
| `400`  | `invalid_request`        | `name` missing, or a field over its 255-character limit.                                               |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                                        |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.                   |
| `403`  | `forbidden`              | Your role or token scope can't write this project's properties.                                        |
| `404`  | `not_found`              | No such property, project, or workspace — or the property belongs to a different project.              |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                                   |
| `409`  | `conflict`               | The workspace manages work item types at the workspace level, so this project-level write is rejected. |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                               |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                                    |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                                             |

</div>

::: warning Wrong mode is a 409, not a 404
A workspace manages work item types in exactly one mode. If yours is in **workspace mode**, this project-level `POST` returns `409 work_item_types_managed_at_workspace` — the option isn't missing and you aren't unauthorized, the write simply belongs on the workspace surface. Create it through [Property options (workspace)](/api-reference/v2/workspace-work-item-property-options/overview) instead, and see [Work item type modes](/api-reference/v2/work-item-type-modes) for how to detect the mode first.
:::

</div>

<div class="api-right">

<CodePanel title="Create a property option" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/c1a7f2d8-6b34-4e59-9f80-2d4a7c31e6b5/options/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Blocker",
  "description": "Stops all downstream work",
  "is_default": false
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/c1a7f2d8-6b34-4e59-9f80-2d4a7c31e6b5/options/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "name": "Blocker",
        "description": "Stops all downstream work",
        "is_default": False,
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/c1a7f2d8-6b34-4e59-9f80-2d4a7c31e6b5/options/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Blocker",
      description: "Stops all downstream work",
      is_default: false,
    }),
  },
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="201">

```json
{
  "id": "6f0c8a24-51d7-4e93-bb62-0a7e5c1d9483",
  "name": "Blocker",
  "description": "Stops all downstream work",
  "is_default": false,
  "sort_order": 45000,
  "external_id": null,
  "external_source": null
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
