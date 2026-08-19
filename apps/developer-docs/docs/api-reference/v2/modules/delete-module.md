---
title: Delete a module
description: Delete a module from a Plane project with the v2 REST API. Path parameters, what happens to the module's work items, OAuth scopes, error codes, and code examples.
keywords: plane api v2, delete module, remove module, DELETE modules, soft delete
---

# Delete a module

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/modules/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Delete a module. The work items that were grouped by it stay in the project — only the grouping goes away.

This is a soft delete: the module stops appearing in reads and its name is freed up for reuse in the project.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the module belongs to.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The module to delete.

</ApiParam>

</div>
</div>

::: info 204, then 404
A successful delete returns `204` with an empty body — there is nothing to parse. A second `DELETE` on the same id
returns `404 not_found`, so a retry after a dropped connection is safe to treat as success.
:::

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `archived_at`, `created_at`, `created_by_id`, `description`, `external_id`, `external_source`, `id`, `lead_id`, `logo_props`, `member_ids`, `name`, `sort_order`, `start_date`, `status`, `target_date`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed alongside the ids: `lead` (the module lead), `members` (the module members).

Expansion is separate-key: `?expand=state` keeps `state_id` and adds a `state` object next to it, so an id is never replaced by an object. An unknown value is a `400`.

`?fields=` and `?expand=` are independent namespaces. Relation names are not valid `?fields=` tokens (and vice versa), and an expanded object survives field filtering — `?fields=id,name&expand=state` returns `id`, `name` and `state`. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.modules:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `400`  | `invalid_request`        | The request body or a query parameter failed validation.                             |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                      |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`              | Your role or token scope can't delete this module.                                   |
| `404`  | `not_found`              | No such module, workspace, or project, or it's outside your tenant.                  |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | The write collides with an existing record or a business rule.                       |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Wait for the interval in `Retry-After` and retry.                         |

</div>

</div>

<div class="api-right">

<CodePanel title="Delete a module" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/modules/7c1f3d90-2a64-4e58-9b0d-3fa1c7e28b45/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b"
    "/modules/7c1f3d90-2a64-4e58-9b0d-3fa1c7e28b45/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.status_code)  # 204
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/modules/7c1f3d90-2a64-4e58-9b0d-3fa1c7e28b45/",
  {
    method: "DELETE",
    headers: { "X-Api-Key": "your-api-key" },
  },
);
console.log(response.status); // 204
```

</template>
</CodePanel>

<ResponsePanel status="204">

No response body.

</ResponsePanel>

<ResponsePanel status="404">

```json
{
  "type": "not_found",
  "code": "not_found",
  "detail": "No Module matches the given query."
}
```

</ResponsePanel>

</div>
</div>
