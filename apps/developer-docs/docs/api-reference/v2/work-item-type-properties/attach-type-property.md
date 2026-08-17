---
title: Attach a property to a type
description: Attach existing custom properties to a Plane work item type with the v2 REST API. Body parameters, OAuth scopes, mode conflicts, error codes, and code examples.
keywords: plane api v2, attach property to type, work item type properties, custom properties, POST type properties
---

# Attach a property to a type

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-types/{type_id}/properties/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Expose one or more existing custom properties on a work item type. After this call, work items of that type collect
those properties.

::: warning This does not create a property
The body is a list of **ids of properties that already exist** in the project. Sending a definition — `display_name`,
`property_type`, and friends — is a `400`. Create the property first with
[Create a work item property](/api-reference/v2/work-item-properties/create-work-item-property), then attach the id it
returns.
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

The work item type to attach the properties to.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="properties" type="array of string (uuid)" :required="true">

The ids of the properties to attach. Every id must belong to a property in **this project** — an id from another
project or another workspace fails the whole request with `400 invalid_request`, and nothing is attached. Nothing is
attached partially: either all the ids are valid or none are applied.

The array cannot be empty. Attaching an id the type already exposes is not an error and does not create a duplicate, so
retrying a request that may have already landed is safe.

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
| `400`  | `invalid_request`        | `properties` missing or empty, or an id that isn't a property in this project.       |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                      |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`              | Your role or token scope can't edit this project's work item types.                  |
| `404`  | `not_found`              | No such workspace, project, or type — or it's outside your tenant.                   |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | This workspace manages work item types at the workspace level. See below.            |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

::: warning Wrong mode is a 409, not a 404
Attaching is a project-mode write. If the workspace manages work item types at the **workspace** level, this endpoint
returns `409 work_item_types_managed_at_workspace` — the capability exists, it just lives on the other surface. Attach
there instead with
[Attach a property to a workspace type](/api-reference/v2/workspace-work-item-type-properties/attach-workspace-type-property).

Branch on the `code`, not the status: a `409` here means "wrong surface", never "already attached". See
[Work item type modes](/api-reference/v2/work-item-type-modes).
:::

</div>

<div class="api-right">

<CodePanel title="Attach properties to a type" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/9d3c7f21-6b48-4e0a-8f52-2c1d7a904e66/properties/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "properties": [
    "c1f0a2d4-73b9-4e6c-8a15-9d0e4b3f7c28",
    "5e8b3417-2a6d-4c91-b0f7-8d2e14a6c395"
  ]
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/9d3c7f21-6b48-4e0a-8f52-2c1d7a904e66/properties/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "properties": [
            "c1f0a2d4-73b9-4e6c-8a15-9d0e4b3f7c28",
            "5e8b3417-2a6d-4c91-b0f7-8d2e14a6c395",
        ]
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/9d3c7f21-6b48-4e0a-8f52-2c1d7a904e66/properties/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: ["c1f0a2d4-73b9-4e6c-8a15-9d0e4b3f7c28", "5e8b3417-2a6d-4c91-b0f7-8d2e14a6c395"],
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
  "properties": ["c1f0a2d4-73b9-4e6c-8a15-9d0e4b3f7c28", "5e8b3417-2a6d-4c91-b0f7-8d2e14a6c395"]
}
```

</ResponsePanel>

<ResponsePanel status="400">

```json
{
  "type": "invalid_request",
  "code": "invalid_request",
  "detail": "One or more fields failed validation.",
  "errors": [
    {
      "field": "properties",
      "code": "invalid",
      "message": "This list may not be empty."
    }
  ]
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

::: info The response is ids, not objects
`201` returns a `properties` array — the ids that are now attached to the type. It does not echo the property
definitions. Read them back with
[List type properties](/api-reference/v2/work-item-type-properties/list-type-properties) or
[Get a type property](/api-reference/v2/work-item-type-properties/get-type-property) when you need `display_name`,
`property_type`, or the option list.
:::
