---
title: Delete a label
description: Delete a label from a Plane project with the v2 REST API. Path parameters, what happens to tagged work items, OAuth scopes, error codes, and code examples.
keywords: plane api v2, delete label, DELETE label, remove label, 204 no content
---

# Delete a label

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/labels/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Remove a label from a project. The label disappears from every work item that carried it — the work items themselves are not touched, and nothing else about them changes.

A successful delete returns `204` with an empty body. Don't parse the response.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the label belongs to.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The label id to delete.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `color`, `created_at`, `created_by_id`, `description`, `external_id`, `external_source`, `id`, `name`, `parent_id`, `sort_order`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.labels:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `400`  | `invalid_request`        | A path parameter is malformed, for example a `pk` that isn't a UUID.                 |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                      |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`              | Your role or token scope can't delete labels.                                        |
| `404`  | `not_found`              | No such label in this project, or the workspace or project is outside your tenant.   |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | The write collides with an existing record or a business rule.                       |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

Labels have no delete protection. Unlike a project's default state, no label is pinned, and a label still applied to work items deletes normally.

</div>

::: warning Deleting is not the same as unassigning
If you only want the tag off a few work items, update those work items' `label_ids` instead. Deleting the label strips it from every work item in the project at once, and there is no undelete endpoint — you would have to recreate the label and reapply it everywhere.
:::

::: tip Deleting twice
A repeated delete returns `404`, not `204`. Treat both as "the label is gone" when your job is idempotent.
:::

</div>

<div class="api-right">

<CodePanel title="Delete a label" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/labels/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/labels/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/labels/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/",
  {
    method: "DELETE",
    headers: {
      "X-Api-Key": "your-api-key",
    },
  },
);
console.log(response.status);
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
  "detail": "No label matches the given query."
}
```

</ResponsePanel>

</div>
</div>
