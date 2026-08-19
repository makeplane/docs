---
title: Update a property option
description: Update an option of an OPTION-typed work item property in a Plane project with the v2 REST API. Partial PATCH semantics, body parameters, the default option, project-mode 409s, and code examples.
keywords: plane api v2, update property option, patch property option, work item property option, is_default, PATCH property options
---

# Update a property option

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-properties/{property_id}/options/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Change an option's label, description, default flag, or correlation fields. Work items that already hold this option keep holding it — they store the option's `id`, so a rename is purely cosmetic and no stored value changes.

`PATCH` is partial. Send only the fields you want to change; anything you omit keeps its current value. Omitting a field is not the same as sending `null`.

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

The id of the option to update. An option id that belongs to a different property returns `404`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

Every field is optional — send the subset you are changing.

<div class="params-list">

<ApiParam name="name" type="string" :required="false">

New label for the option. Maximum 255 characters. Safe to change at any time: values on work items reference the option `id`, not its name.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Free-form explanation of what the option means.

</ApiParam>

<ApiParam name="is_default" type="boolean" :required="false">

Whether this option is preselected when a work item is created without an explicit value for the property. Changing it affects only work items created from now on — existing values are untouched.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this option, for sync and import correlation. Maximum 255 characters. Nullable.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `github` or `jira`. Maximum 255 characters. Nullable.

</ApiParam>

</div>

::: info sort_order is not writable
`sort_order` is returned on every read but is not accepted in the request body. There is no `PATCH` that repositions an option — Plane maintains the ordering weight itself.
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
| `400`  | `invalid_request`        | A field over its 255-character limit, or a value of the wrong type.                                    |
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
If the workspace manages work item types at the **workspace** level, this project-level `PATCH` returns `409 work_item_types_managed_at_workspace`. The `GET` on the same path still works — reads are unaffected by mode, only writes are. Update the option through [Property options (workspace)](/api-reference/v2/workspace-work-item-property-options/overview), and see [Work item type modes](/api-reference/v2/work-item-type-modes) for how to detect which mode you are in.
:::

</div>

<div class="api-right">

<CodePanel title="Update a property option" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/c1a7f2d8-6b34-4e59-9f80-2d4a7c31e6b5/options/9d3b5c71-2e48-4a6f-b1c9-7f0e83d25a64/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Sev 1",
  "is_default": true
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/c1a7f2d8-6b34-4e59-9f80-2d4a7c31e6b5/options/9d3b5c71-2e48-4a6f-b1c9-7f0e83d25a64/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "name": "Sev 1",
        "is_default": True,
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/c1a7f2d8-6b34-4e59-9f80-2d4a7c31e6b5/options/9d3b5c71-2e48-4a6f-b1c9-7f0e83d25a64/",
  {
    method: "PATCH",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Sev 1",
      is_default: true,
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
  "id": "9d3b5c71-2e48-4a6f-b1c9-7f0e83d25a64",
  "name": "Sev 1",
  "description": "Customer-visible outage",
  "is_default": true,
  "sort_order": 15000,
  "external_id": null,
  "external_source": null
}
```

</ResponsePanel>

<ResponsePanel status="400">

```json
{
  "type": "invalid_request",
  "code": "invalid_request",
  "detail": "The request body failed validation.",
  "errors": [
    {
      "field": "name",
      "code": "max_length",
      "message": "Ensure this field has no more than 255 characters."
    }
  ]
}
```

</ResponsePanel>

</div>
</div>
