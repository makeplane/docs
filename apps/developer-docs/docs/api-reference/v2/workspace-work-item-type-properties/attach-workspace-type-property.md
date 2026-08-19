---
title: Attach properties to a workspace type
description: Attach existing workspace custom properties to a workspace-level work item type with the Plane v2 REST API. Body parameters, mode conflicts, OAuth scopes, error codes, and code examples.
keywords: plane api v2, attach property to type, workspace work item type properties, POST type properties, work item type modes, 409 conflict
---

# Attach properties to a workspace type

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-types/{type_id}/properties/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Attach one or more **existing** workspace properties to a workspace-level work item type. This does not create
properties — create those first with
[Create a workspace property](/api-reference/v2/workspace-work-item-properties/create-workspace-work-item-property),
then send their ids here.

Because the same property can be attached to many types, this is how you reuse one `Severity` definition
across `Bug`, `Incident`, and `Escalation` instead of maintaining three near-identical fields.

::: warning Wrong mode is a 409, not a 404
If the workspace manages work item types at the **project** level, this route returns `409` with the code
`work_item_types_managed_at_project`. Attach through the project-level route instead. See
[Work item type modes](/api-reference/v2/work-item-type-modes).
:::

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is
`my-team`.

</ApiParam>

<ApiParam name="type_id" type="string (uuid)" :required="true">

The workspace work item type to attach the properties to.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="properties" type="array of string (uuid)" :required="true">

Ids of properties to attach, taken from the workspace property catalog. Send the whole set you want in one
call rather than one request per property.

Every id must already exist in this workspace. An unknown id — including one that belongs to another workspace
— fails the request with `400 invalid_request`; nothing is attached, and a cross-tenant id is never silently
linked.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.work_item_types:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `400`  | `invalid_request`        | `properties` missing, not an array, or holding an id that doesn't exist here.        |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                      |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`              | Your role or token scope can't write workspace work item types.                      |
| `404`  | `not_found`              | No such workspace or type, or it's outside your tenant.                              |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | This workspace manages work item types at the project level.                         |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="Attach properties to a type" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/d1a0b7c6-2f83-4e19-9a55-3b6c8d0e4f27/properties/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "properties": [
    "a7e3f1d0-5c92-4b68-8f31-2d4a6b9e0c15",
    "3fb6c0d8-4e21-49a7-b5c3-90ad72e14f6b"
  ]
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/d1a0b7c6-2f83-4e19-9a55-3b6c8d0e4f27/properties/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "properties": [
            "a7e3f1d0-5c92-4b68-8f31-2d4a6b9e0c15",
            "3fb6c0d8-4e21-49a7-b5c3-90ad72e14f6b",
        ]
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/d1a0b7c6-2f83-4e19-9a55-3b6c8d0e4f27/properties/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: ["a7e3f1d0-5c92-4b68-8f31-2d4a6b9e0c15", "3fb6c0d8-4e21-49a7-b5c3-90ad72e14f6b"],
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
  "properties": ["a7e3f1d0-5c92-4b68-8f31-2d4a6b9e0c15", "3fb6c0d8-4e21-49a7-b5c3-90ad72e14f6b"]
}
```

</ResponsePanel>

<ResponsePanel status="409">

```json
{
  "type": "conflict",
  "code": "work_item_types_managed_at_project",
  "detail": "This workspace manages work item types at the project level. Use the project-level endpoint instead."
}
```

</ResponsePanel>

</div>
</div>

::: info The response is ids, not objects
`201` returns only the `properties` array. To render the attached properties, follow with
[List properties on a workspace type](/api-reference/v2/workspace-work-item-type-properties/list-workspace-type-properties)
or fetch them individually.
:::
