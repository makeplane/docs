---
title: Create a label
description: Create a label in a Plane project with the v2 REST API. Body parameters, nesting with parent_id, name uniqueness, OAuth scopes, error codes, and code examples.
keywords: plane api v2, create label, POST labels, parent_id, label color, external_id
---

# Create a label

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/labels/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Add a label to a project. The new label is immediately available to every work item in that project, and to no other project.

Label names must be unique within a project — reusing one returns `409 conflict`.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project to add the label to.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="name" type="string" :required="true">

Display name for the label, unique within the project. Maximum 255 characters.

</ApiParam>

<ApiParam name="color" type="string" :required="false">

Hex color used wherever the label is rendered, for example `#e5484d`. Maximum 255 characters. Send one if the label needs to be recognizable at a glance on a board.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Free-form note about what the label is for and when to apply it.

</ApiParam>

<ApiParam name="parent_id" type="string (uuid)" :required="false">

The label this one nests under, for grouping related tags such as `Billing` and `Search` beneath an `Area` label. The parent must be a label in the same project — an id from another project is a `400`, not a silent link.

Omit it, or send `null`, for a top-level label.

</ApiParam>

<ApiParam name="sort_order" type="number" :required="false">

Ordering weight within the project. Lower values sort first. Assigned automatically when omitted, so send it only when you are recreating a specific order.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this label, for sync and import correlation. Maximum 255 characters. Store it here and you can find the label later with `?external_id=`, without keeping a map of Plane ids.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `github` or `jira`. Maximum 255 characters.

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

| Status | Code                     | Cause                                                                                       |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | `name` missing or over 255 characters, or a `parent_id` that isn't a label in this project. |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                             |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.        |
| `403`  | `forbidden`              | Your role or token scope can't create labels.                                               |
| `404`  | `not_found`              | No such workspace or project, or it's outside your tenant.                                  |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                        |
| `409`  | `conflict`               | A label with this name already exists in the project.                                       |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                    |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                         |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                                  |

</div>

</div>

<div class="api-right">

<CodePanel title="Create a label" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/labels/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Regression",
  "color": "#e5484d",
  "description": "Worked before the last release",
  "parent_id": "2b7d5e94-3c1a-4f60-9a8d-7e1c4b0f2d35"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/labels/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "name": "Regression",
        "color": "#e5484d",
        "description": "Worked before the last release",
        "parent_id": "2b7d5e94-3c1a-4f60-9a8d-7e1c4b0f2d35",
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/labels/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Regression",
      color: "#e5484d",
      description: "Worked before the last release",
      parent_id: "2b7d5e94-3c1a-4f60-9a8d-7e1c4b0f2d35",
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
  "id": "9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88",
  "name": "Regression",
  "description": "Worked before the last release",
  "color": "#e5484d",
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
