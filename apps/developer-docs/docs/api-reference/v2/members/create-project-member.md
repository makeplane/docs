---
title: Create a project member
description: Create a project member with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, create a project member, project members, project members create
---

# Create a project member

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/members/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Members are the people on a workspace or project, and the role each one holds. Create a project member.

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

<ApiParam name="member_id" type="string (uuid)" :required="false">

Id of the related member.

</ApiParam>

<ApiParam name="role" type="string" :required="false">

Role to grant.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted**, not returned as `null`. `id` always comes back. Pass `all` for every requestable field. An unknown name is a `400`. See [Sparse fields](/api-reference/v2/sparse-fields).

Requestable here: `id`, `member_id`, `role`.

</ApiParam>

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed: `member`.

Expansion is separate-key — `?expand=state` keeps `state_id` and adds a `state` object next to it. `?fields=` and `?expand=` are independent: naming a relation in `?fields=` is a `400`, and expanded objects survive field filtering. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.members:write`

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

<CodePanel title="Create a project member" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/members/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "member_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "role": "example"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/members/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "member_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
        "role": "example"
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/members/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      member_id: "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      role: "example",
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
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "member_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "role": "example"
}
```

</ResponsePanel>

</div>
</div>
