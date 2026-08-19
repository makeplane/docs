---
title: Delete a cycle
description: Delete a Plane cycle with the v2 REST API. Path parameters, the 204 response, OAuth scopes, error codes, and code examples.
keywords: plane api v2, delete cycle, remove cycle, soft delete, DELETE cycles
---

# Delete a cycle

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/cycles/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Remove a cycle from a project. The delete is a soft delete — the cycle stops appearing in reads and its name is freed for reuse.

A successful call returns `204` with an empty body. There is nothing to parse, so branch on the status code.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the cycle belongs to.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The cycle to delete.

</ApiParam>

</div>
</div>

::: warning Deleting the cycle does not delete its work items
Work items that were in the cycle survive the delete — they simply lose their cycle assignment. Move them to another cycle first if the assignment matters, using the v1 [cycle work-item endpoints](/api-reference/v1/cycle/overview).
:::

Deleting a cycle that is already deleted returns `404`, so the call is safe to retry: treat both `204` and `404` as "gone".

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `created_at`, `created_by_id`, `description`, `end_date`, `external_id`, `external_source`, `id`, `logo_props`, `name`, `owned_by_id`, `sort_order`, `start_date`, `timezone`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed alongside the ids: `owned_by` (the cycle owner).

Expansion is separate-key: `?expand=state` keeps `state_id` and adds a `state` object next to it, so an id is never replaced by an object. An unknown value is a `400`.

`?fields=` and `?expand=` are independent namespaces. Relation names are not valid `?fields=` tokens (and vice versa), and an expanded object survives field filtering — `?fields=id,name&expand=state` returns `id`, `name` and `state`. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.cycles:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `400`  | `invalid_request`        | A malformed path parameter, for example a `pk` that isn't a UUID.                    |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                      |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`              | Your role or token scope can't delete cycles in this project.                        |
| `404`  | `not_found`              | No such cycle, wrong project, or the record is outside your tenant.                  |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | The cycle's current state blocks deletion.                                           |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="Delete a cycle" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/cycles/7c1f9a4e-3b6d-4a52-8f0c-2d9e6b18c3a7/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/cycles/7c1f9a4e-3b6d-4a52-8f0c-2d9e6b18c3a7/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.status_code)  # 204
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/cycles/7c1f9a4e-3b6d-4a52-8f0c-2d9e6b18c3a7/",
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
  "detail": "No cycle matches the given id in this project."
}
```

</ResponsePanel>

</div>
</div>
