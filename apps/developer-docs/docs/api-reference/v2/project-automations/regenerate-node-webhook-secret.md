---
title: Regenerate an automation node webhook secret
description: Regenerate an automation node webhook secret with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, regenerate an automation node webhook secret, automation nodes, project automation nodes regenerate webhook secret
---

# Regenerate an automation node webhook secret

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/automations/{automation_id}/nodes/{pk}/regenerate-webhook-secret/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Project automations are rule graphs that run inside one project.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string" :required="true">

The project the resource belongs to. Accepts the project UUID or its bare identifier, for example `ENG`.

</ApiParam>

<ApiParam name="automation_id" type="string (uuid)" :required="true">

The automation the resource belongs to.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The automation node id.

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

<CodePanel title="Regenerate an automation node webhook secret" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/automations/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/nodes/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/regenerate-webhook-secret/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/automations/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/nodes/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/regenerate-webhook-secret/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/automations/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/nodes/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/regenerate-webhook-secret/",
  {
    method: "POST",
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
  "secret": "example"
}
```

</ResponsePanel>

</div>
</div>
