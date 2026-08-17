---
title: List roles
description: List roles with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, list roles, roles, roles list
---

# List roles

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/roles/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Roles are the named permission levels a member can hold. List the roles you can see. Results are scoped to the path and to what your token is allowed to read.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

<div class="params-list">

<ApiParam name="count" type="boolean" :required="false">

Set to false to skip the total_count COUNT(\*) (omits total_count).

</ApiParam>

<ApiParam name="is_system" type="boolean" :required="false">

Filter by `is_system`.

</ApiParam>

<ApiParam name="namespace" type="string" :required="false">

Whether this role is for instance, workspace, or project-level resources

- `instance` - Instance
- `workspace` - Workspace
- `project` - Project

One of `instance`, `project`, `workspace`.

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

<ApiParam name="search" type="string" :required="false">

A search term.

</ApiParam>

<ApiParam name="slug" type="string" :required="false">

Filter by `slug`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from each row, not returned as `null`. `id` always comes back. Pass `all` for every requestable field.

An unknown name is a `400` that names the valid set, so a typo can't silently cost you the saving. See [Sparse fields](/api-reference/v2/sparse-fields).

Requestable here: `description`, `id`, `is_system`, `level`, `name`, `namespace`, `slug`, `status`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.roles:read`

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

<CodePanel title="List roles" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/roles/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/roles/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v2/workspaces/my-team/roles/", {
  method: "GET",
  headers: {
    "X-Api-Key": "your-api-key",
  },
});
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "data": [
    {
      "description": "What this is for.",
      "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
      "is_system": false,
      "level": 1,
      "name": "Example name",
      "namespace": null,
      "slug": "my-team",
      "status": "active"
    },
    {
      "description": "What this is for.",
      "id": "8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13",
      "is_system": false,
      "level": 1,
      "name": "Another example",
      "namespace": null,
      "slug": "my-team",
      "status": "active"
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
