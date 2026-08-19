---
title: Create a automation node
description: Create a automation node with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, create a automation node, automation nodes, workspace automation nodes create
---

# Create a automation node

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/automations/{automation_id}/nodes/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Workspace automations are rule graphs that run across a workspace. Create a automation node.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="automation_id" type="string (uuid)" :required="true">

The automation the resource belongs to.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="handler_name" type="string" :required="true">

Name of the handler class (e.g., 'record_created', 'send_email')

Maximum 100 characters.

</ApiParam>

<ApiParam name="name" type="string" :required="true">

Display name for the node

Maximum 255 characters.

</ApiParam>

<ApiParam name="node_type" type="string" :required="true">

Type of node: trigger, action, or condition

- `trigger` - Trigger
- `action` - Action
- `condition` - Condition

One of `trigger`, `action`, `condition`.

</ApiParam>

<ApiParam name="config" type="string" :required="false">

Node-specific configuration and parameters

</ApiParam>

<ApiParam name="is_enabled" type="boolean" :required="false">

Whether the rule is switched on.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted**, not returned as `null`. `id` always comes back. Pass `all` for every requestable field. An unknown name is a `400`. See [Sparse fields](/api-reference/v2/sparse-fields).

Requestable here: `config`, `created_at`, `created_by_id`, `handler_name`, `id`, `is_enabled`, `last_triggered_at`, `name`, `next_scheduled_at`, `node_type`, `updated_at`, `version_id`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`automations:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                               |
| ------ | ------------------------ | ----------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | The request body or a query parameter failed validation.                            |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                     |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan or is switched off. |
| `403`  | `forbidden`              | Your role or token scope doesn't allow this.                                        |
| `404`  | `not_found`              | No such resource, or it's outside your tenant.                                      |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                |
| `409`  | `conflict`               | A business rule blocks the write — see the notes above.                             |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                            |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                 |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                          |

</div>

</div>

<div class="api-right">

<CodePanel title="Create a automation node" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/automations/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/nodes/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "handler_name": "example",
  "name": "Example name",
  "node_type": "trigger",
  "config": null,
  "is_enabled": false
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/automations/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/nodes/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "handler_name": "example",
        "name": "Example name",
        "node_type": "trigger",
        "config": None,
        "is_enabled": False
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/automations/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/nodes/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      handler_name: "example",
      name: "Example name",
      node_type: "trigger",
      config: null,
      is_enabled: false,
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
  "config": null,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "handler_name": "example",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "is_enabled": false,
  "last_triggered_at": "2026-01-14T09:22:41.478363Z",
  "name": "Example name",
  "next_scheduled_at": "2026-01-14T09:22:41.478363Z",
  "node_type": null,
  "updated_at": "2026-01-14T09:22:41.478363Z",
  "version_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
}
```

</ResponsePanel>

</div>
</div>
