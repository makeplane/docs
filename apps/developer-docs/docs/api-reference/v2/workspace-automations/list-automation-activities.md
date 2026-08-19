---
title: List automation activities
description: List automation activities with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, list automation activities, automation activities, workspace automation activities list
---

# List automation activities

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/automations/{automation_id}/activities/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Workspace automations are rule graphs that run across a workspace. List the automation activities you can see. Results are scoped to the path and to what your token is allowed to read.

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

### Query Parameters

<div class="params-list">

<ApiParam name="count" type="boolean" :required="false">

Set to false to skip the total_count COUNT(\*) (omits total_count).

</ApiParam>

<ApiParam name="created_at__gt" type="string (date-time)" :required="false">

Filter by `created_at__gt`.

</ApiParam>

<ApiParam name="field" type="string" :required="false">

Filter by `field`.

</ApiParam>

<ApiParam name="offset" type="integer" :required="false">

Number of rows to skip from the start of the result set.

</ApiParam>

<ApiParam name="order_by" type="string" :required="false">

Field to order the list by. Prefix with '-' for descending (e.g. '-created_at'). Annotation-backed orders sort semantically and ride the default offset page.

</ApiParam>

<ApiParam name="paginate" type="string" :required="false">

Set to 'cursor' to opt into the COUNT-free keyset cursor envelope (use for deep traversal); omit for the default offset envelope with total_count.

One of `cursor`.

</ApiParam>

<ApiParam name="per_page" type="integer" :required="false">

Page size (max 200).

</ApiParam>

<ApiParam name="verb" type="string" :required="false">

Filter by `verb`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from each row, not returned as `null`. `id` always comes back. Pass `all` for every requestable field.

An unknown name is a `400` that names the valid set, so a typo can't silently cost you the saving. See [Sparse fields](/api-reference/v2/sparse-fields).

Requestable here: `actor_id`, `automation_edge_id`, `automation_id`, `automation_node_id`, `automation_run_id`, `automation_scope`, `automation_version_id`, `created_at`, `epoch`, `field`, `id`, `new_identifier`, `new_value`, `node_execution_id`, `old_identifier`, `old_value`, `verb`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`automations:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                               |
| ------ | ------------------ | ----------------------------------------------------------------------------------- |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                     |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan or is switched off. |
| `403`  | `forbidden`        | Your role or token scope doesn't allow this.                                        |
| `404`  | `not_found`        | No such resource, or it's outside your tenant.                                      |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                          |

</div>

</div>

<div class="api-right">

<CodePanel title="List automation activities" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/automations/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/activities/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/automations/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/activities/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/automations/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/activities/",
  {
    method: "GET",
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
  "data": [
    {
      "actor_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "automation_edge_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "automation_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "automation_node_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "automation_run_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "automation_scope": "example",
      "automation_version_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "created_at": "2026-01-14T09:22:41.478363Z",
      "epoch": 1,
      "field": "example",
      "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
      "new_identifier": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "new_value": "example",
      "node_execution_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "old_identifier": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "old_value": "example",
      "verb": "example"
    }
  ],
  "next": 1,
  "pagination": {
    "style": "offset"
  },
  "previous": 1,
  "total_count": 3
}
```

</ResponsePanel>

</div>
</div>
