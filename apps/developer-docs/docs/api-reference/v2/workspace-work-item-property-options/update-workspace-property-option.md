---
title: Update a workspace property option
description: Rename a workspace-level property option or move the default with the Plane v2 REST API. PATCH body parameters, the single-default rule, OAuth scopes, error codes, and code examples.
keywords: plane api v2, update property option, workspace work item property, OPTION property, is_default, PATCH option
---

# Update a workspace property option

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-properties/{property_id}/options/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Change one option on a workspace-level `OPTION` property — rename it, reword its description, or move the property's default onto it.

The update is partial: fields you omit are left untouched, and omitting a field is not the same as sending `null`. Renaming an option keeps its `id`, so every work item already holding the option keeps its value.

::: warning Workspace mode only
This write requires the workspace to manage work item types at the workspace level. In project mode it returns `409 work_item_types_managed_at_project` — update the option through the project-level endpoint instead. See [Work item type modes](/api-reference/v2/work-item-type-modes).
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

The option to update. It is looked up within the property, so an option id under the wrong `property_id` is a `404`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

Every field is optional. Send only what you are changing.

<div class="params-list">

<ApiParam name="name" type="string" :required="false">

The choice as it is displayed. Maximum 255 characters.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Free-form text explaining when to pick this choice.

</ApiParam>

<ApiParam name="is_default" type="boolean" :required="false">

Make this the property's default choice, or send `false` to clear it. At most one option per property can be the default: setting it while a different option already holds it returns `400 invalid_request`, so clear the current default first and then set the new one.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this option, for sync and import correlation. Maximum 255 characters.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `github` or `jira`. Maximum 255 characters.

</ApiParam>

</div>

`sort_order` is not accepted here — an option's position is fixed at creation time and cannot be moved through the API.

</div>

<div class="params-section">

### Scopes

`workspaces.work_item_properties:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                                          |
| ------ | ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | A field over 255 characters, or `is_default: true` when another option on the property is already the default. |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                                                |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.                           |
| `403`  | `forbidden`              | Your role or token scope can't write this workspace's properties.                                              |
| `404`  | `not_found`              | No such workspace, workspace-level property, or option — or it's outside your tenant.                          |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                                           |
| `409`  | `conflict`               | This workspace manages work item types at the project level. Use the project-level options endpoint.           |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                                       |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                                            |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                                                     |

</div>

</div>

<div class="api-right">

<CodePanel title="Update a property option" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/9d0e1f3b-6a72-4c85-9e4d-2b7f1a6c8d54/options/5e8b7d21-4a09-4c63-b7f2-90d1c3a86e57/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Pre-production",
  "description": "Reported on the shared pre-release environment"
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/9d0e1f3b-6a72-4c85-9e4d-2b7f1a6c8d54/options/5e8b7d21-4a09-4c63-b7f2-90d1c3a86e57/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "name": "Pre-production",
        "description": "Reported on the shared pre-release environment",
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/9d0e1f3b-6a72-4c85-9e4d-2b7f1a6c8d54/options/5e8b7d21-4a09-4c63-b7f2-90d1c3a86e57/",
  {
    method: "PATCH",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Pre-production",
      description: "Reported on the shared pre-release environment",
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
  "id": "5e8b7d21-4a09-4c63-b7f2-90d1c3a86e57",
  "name": "Pre-production",
  "description": "Reported on the shared pre-release environment",
  "is_default": false,
  "sort_order": 20000,
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
  "detail": "Only one option can be the default."
}
```

</ResponsePanel>

</div>
</div>

## Moving the default

There is no automatic hand-off, so promoting a new default takes two requests:

1. `PATCH` the option that currently has `is_default: true` with `{"is_default": false}`.
2. `PATCH` the new option with `{"is_default": true}`.

Run it the other way round and the promotion is the request that fails, leaving the existing default untouched. Nothing is half-applied either way.
