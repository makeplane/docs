---
title: Update a label
description: Update a label in a Plane project with the v2 REST API. Partial PATCH semantics, body parameters, OAuth scopes, error codes, and code examples.
keywords: plane api v2, update label, PATCH label, rename label, parent_id, label color
---

# Update a label

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/labels/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Change a label's name, color, description, nesting, or ordering. Every work item already carrying the label picks up the change — the label id does not move, so no work item loses its tag when you rename it.

The update is partial. Fields you omit are left untouched, and omitting a field is not the same as sending `null`: send `"parent_id": null` to lift a nested label to the top level.

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

The label id.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="name" type="string" :required="false">

New display name, unique within the project. Maximum 255 characters. Renaming onto a name another label already holds returns `409 conflict`.

</ApiParam>

<ApiParam name="color" type="string" :required="false">

Hex color used wherever the label is rendered, for example `#e5484d`. Maximum 255 characters.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Free-form note about what the label is for.

</ApiParam>

<ApiParam name="parent_id" type="string (uuid)" :required="false">

Move the label under a different parent. The new parent must be a label in the same project. Send `null` to make the label top-level again.

</ApiParam>

<ApiParam name="sort_order" type="number" :required="false">

Ordering weight within the project. Lower values sort first.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this label, for sync and import correlation. Maximum 255 characters. Send `null` to clear it.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `github` or `jira`. Maximum 255 characters. Send `null` to clear it.

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
| `400`  | `invalid_request`        | A field over its length limit, or a `parent_id` that isn't a label in this project.  |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                      |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`              | Your role or token scope can't update labels.                                        |
| `404`  | `not_found`              | No such label in this project, or the workspace or project is outside your tenant.   |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | Another label in the project already uses the name you sent.                         |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

::: warning There is no PUT
`PUT` on this path returns `405 method_not_allowed`. Send only the fields you want to change with `PATCH` — a full-object write is never required, and rebuilding the object client-side risks clobbering a field someone else just changed.
:::

</div>

<div class="api-right">

<CodePanel title="Update a label" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/labels/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Regression - blocking",
  "color": "#c62828"
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/labels/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "name": "Regression - blocking",
        "color": "#c62828",
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/labels/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/",
  {
    method: "PATCH",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Regression - blocking",
      color: "#c62828",
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
  "id": "9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88",
  "name": "Regression - blocking",
  "description": "Worked before the last release",
  "color": "#c62828",
  "sort_order": 65535,
  "parent_id": "2b7d5e94-3c1a-4f60-9a8d-7e1c4b0f2d35",
  "external_id": null,
  "external_source": null,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
}
```

</ResponsePanel>

<ResponsePanel status="409">

```json
{
  "type": "conflict",
  "code": "conflict",
  "detail": "A label with this name already exists in the project."
}
```

</ResponsePanel>

</div>
</div>
