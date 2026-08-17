---
title: Update a workflow transition
description: Update a workflow transition with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, update a workflow transition, workflow transitions, workflow transitions partial update
---

# Update a workflow transition

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/workflows/{workflow_id}/state-transitions/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Workflow transitions define the legal moves between workflow states, and who may approve them. Update a workflow transition. Send only the keys you want to change — omitted keys keep their current value, and an explicit `null` clears a nullable field.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string" :required="true">

The project the resource belongs to. Accepts the project UUID or its bare identifier, for example `ENG`.

</ApiParam>

<ApiParam name="workflow_id" type="string (uuid)" :required="true">

The workflow the resource belongs to.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The workflow transition id.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="member_ids" type="array of string (uuid)" :required="false">

Ids of the members to associate. Replaces the current set.

</ApiParam>

<ApiParam name="rejection_state_id" type="string (uuid)" :required="false">

Id of the related rejection state.

Nullable.

</ApiParam>

<ApiParam name="required_approvals" type="integer" :required="false">

How many approvals a transition needs before it may run.

Nullable.

</ApiParam>

<ApiParam name="state_id" type="string (uuid)" :required="false">

Id of the related state.

</ApiParam>

<ApiParam name="transition_state_id" type="string (uuid)" :required="false">

Id of the related transition state.

Nullable.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted**, not returned as `null`. `id` always comes back. Pass `all` for every requestable field. An unknown name is a `400`. See [Sparse fields](/api-reference/v2/sparse-fields).

Requestable here: `created_at`, `created_by_id`, `id`, `member_ids`, `rejection_state_id`, `required_approvals`, `transition_state_id`, `workflow_state_id`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.workflows:write`

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

<CodePanel title="Update a workflow transition" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/workflows/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/state-transitions/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "member_ids": [
    [
      "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
    ]
  ],
  "rejection_state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "required_approvals": 1
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/workflows/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/state-transitions/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "member_ids": [
            [
                "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
            ]
        ],
        "rejection_state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
        "required_approvals": 1
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/workflows/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/state-transitions/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/",
  {
    method: "PATCH",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      member_ids: [["16c61a3a-512a-48ac-b0be-b6b46fe6f430"]],
      rejection_state_id: "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      required_approvals: 1,
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
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "member_ids": [["16c61a3a-512a-48ac-b0be-b6b46fe6f430"]],
  "rejection_state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "required_approvals": 1,
  "transition_state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "workflow_state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
}
```

</ResponsePanel>

<ResponsePanel status="404">

```json
{
  "type": "not_found",
  "code": "not_found",
  "detail": "No workflow transition matches the given query."
}
```

</ResponsePanel>

</div>
</div>
