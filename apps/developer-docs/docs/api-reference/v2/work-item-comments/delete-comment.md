---
title: Delete a comment
description: Delete a comment from a Plane work item with the v2 REST API. Path parameters, OAuth scopes, error codes, and code examples.
keywords: plane api v2, delete work item comment, DELETE comment, remove comment, 204 no content
---

# Delete a comment

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/comments/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Remove a comment from a work item. On success the response is `204 No Content` with an empty body — there is
nothing to parse, so branch on the status code.

The delete is a soft delete: the comment stops appearing in every read, including lists and its own detail
route, and a follow-up `GET` on the same id returns `404 not_found`.

::: warning Deleting a comment is not reversible through the API
There is no restore endpoint, so confirm with the user before deleting. Deleting the parent work item is the
usual alternative when you want the whole thread to disappear at once.
:::

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is
`my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the work item belongs to.

</ApiParam>

<ApiParam name="work_item_id" type="string (uuid)" :required="true">

The work item the comment is attached to.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The comment to delete.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `access`, `actor_id`, `comment_html`, `comment_stripped`, `created_at`, `created_by_id`, `edited_at`, `external_id`, `external_source`, `id`, `work_item_id`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed alongside the ids: `actor` (the comment author).

Expansion is separate-key: `?expand=state` keeps `state_id` and adds a `state` object next to it, so an id is never replaced by an object. An unknown value is a `400`.

`?fields=` and `?expand=` are independent namespaces. Relation names are not valid `?fields=` tokens (and vice versa), and an expanded object survives field filtering — `?fields=id,name&expand=state` returns `id`, `name` and `state`. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_items.comments:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `400`  | `invalid_request`        | The request body or a query parameter failed validation.                             |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                      |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`              | Your role or token scope can't delete this comment.                                  |
| `404`  | `not_found`              | No such comment, it belongs to another work item, or it's already deleted.           |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | The delete conflicts with the current state of the comment.                          |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="Delete a comment" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/comments/c1f7a3d9-2b64-4f80-9c1a-3d5e8b2a6c47/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/comments/c1f7a3d9-2b64-4f80-9c1a-3d5e8b2a6c47/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/comments/c1f7a3d9-2b64-4f80-9c1a-3d5e8b2a6c47/",
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
  "detail": "No comment matches the given query."
}
```

</ResponsePanel>

</div>
</div>
