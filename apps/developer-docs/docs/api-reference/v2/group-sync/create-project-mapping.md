---
title: Create a project mapping
description: Create a project mapping with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, create a project mapping, project mappings, group sync project mappings create
---

# Create a project mapping

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/group-sync/project-mappings/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Group sync maps identity-provider groups onto Plane workspace and project roles. Create a project mapping.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="idp_group_name" type="string" :required="true">

The idp group name.

Maximum 255 characters.

</ApiParam>

<ApiParam name="role_slug" type="string" :required="true">

The role slug.

</ApiParam>

<ApiParam name="all_projects" type="boolean" :required="false">

Whether all projects.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="false">

Id of the related project.

Nullable.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted**, not returned as `null`. `id` always comes back. Pass `all` for every requestable field. An unknown name is a `400`. See [Sparse fields](/api-reference/v2/sparse-fields).

Requestable here: `all_projects`, `created_at`, `id`, `idp_group_name`, `project_id`, `role_slug`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.group_sync:write`

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

<CodePanel title="Create a project mapping" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/group-sync/project-mappings/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "idp_group_name": "example",
  "role_slug": "example",
  "all_projects": false,
  "project_id": "4af68566-94a4-4eb3-94aa-50dc9427067b"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/group-sync/project-mappings/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "idp_group_name": "example",
        "role_slug": "example",
        "all_projects": False,
        "project_id": "4af68566-94a4-4eb3-94aa-50dc9427067b"
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/group-sync/project-mappings/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idp_group_name: "example",
      role_slug: "example",
      all_projects: false,
      project_id: "4af68566-94a4-4eb3-94aa-50dc9427067b",
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
  "all_projects": false,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "idp_group_name": "example",
  "project_id": "4af68566-94a4-4eb3-94aa-50dc9427067b",
  "role_slug": "example"
}
```

</ResponsePanel>

</div>
</div>
