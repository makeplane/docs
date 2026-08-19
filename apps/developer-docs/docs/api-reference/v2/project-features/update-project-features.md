---
title: Update project features
description: Update project features with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, update project features, project features, project features update
---

# Update project features

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/features/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Project features are the per-project toggles for optional Plane surfaces.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string" :required="true">

The project the resource belongs to. Accepts the project UUID or its bare identifier, for example `ENG`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="is_automated_cycle_enabled" type="boolean" :required="false">

Whether is automated cycle enabled.

</ApiParam>

<ApiParam name="is_epic_enabled" type="boolean" :required="false">

Whether is epic enabled.

</ApiParam>

<ApiParam name="is_manually_start_end_cycles_enabled" type="boolean" :required="false">

Whether is manually start end cycles enabled.

</ApiParam>

<ApiParam name="is_milestone_enabled" type="boolean" :required="false">

Whether is milestone enabled.

</ApiParam>

<ApiParam name="is_parallel_cycles_enabled" type="boolean" :required="false">

Whether is parallel cycles enabled.

</ApiParam>

<ApiParam name="is_project_updates_enabled" type="boolean" :required="false">

Whether is project updates enabled.

</ApiParam>

<ApiParam name="is_workflow_enabled" type="boolean" :required="false">

Whether is workflow enabled.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.features:write`

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

<CodePanel title="Update project features" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/features/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "is_automated_cycle_enabled": false,
  "is_epic_enabled": false,
  "is_manually_start_end_cycles_enabled": false
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/features/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "is_automated_cycle_enabled": False,
        "is_epic_enabled": False,
        "is_manually_start_end_cycles_enabled": False
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/features/",
  {
    method: "PATCH",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      is_automated_cycle_enabled: false,
      is_epic_enabled: false,
      is_manually_start_end_cycles_enabled: false,
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
  "is_automated_cycle_enabled": false,
  "is_epic_enabled": false,
  "is_manually_start_end_cycles_enabled": false,
  "is_milestone_enabled": false,
  "is_parallel_cycles_enabled": false,
  "is_project_updates_enabled": false,
  "is_workflow_enabled": false
}
```

</ResponsePanel>

</div>
</div>
