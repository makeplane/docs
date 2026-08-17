---
title: List activities
description: List activities with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, list activities, activities, activities list
---

# List activities

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/activities/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Activities are the append-only audit trail on a work item. List the activities you can see. Results are scoped to the path and to what your token is allowed to read.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string" :required="true">

The project the resource belongs to. Accepts the project UUID or its bare identifier, for example `ENG`.

</ApiParam>

<ApiParam name="work_item_id" type="string" :required="true">

The work item the resource hangs off. Accepts the work item UUID or its `PROJ-123` identifier.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

<div class="params-list">

<ApiParam name="actor_id" type="string (uuid)" :required="false">

Filter by `actor_id`.

</ApiParam>

<ApiParam name="count" type="boolean" :required="false">

Set to false to skip the total_count COUNT(\*) (omits total_count).

</ApiParam>

<ApiParam name="created_at__gte" type="string (date-time)" :required="false">

Filter by `created_at__gte`.

</ApiParam>

<ApiParam name="created_at__lte" type="string (date-time)" :required="false">

Filter by `created_at__lte`.

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

<ApiParam name="search" type="string" :required="false">

A search term.

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

Requestable here: `actor_id`, `comment`, `created_at`, `duration`, `epoch`, `external_id`, `external_source`, `field`, `id`, `issue_comment_id`, `new_identifier_id`, `new_value`, `old_identifier_id`, `old_value`, `verb`, `work_item_id`.

</ApiParam>

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed: `actor`.

Expansion is separate-key — `?expand=state` keeps `state_id` and adds a `state` object next to it. `?fields=` and `?expand=` are independent: naming a relation in `?fields=` is a `400`, and expanded objects survive field filtering. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_items.activities:read`

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

<CodePanel title="List activities" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/activities/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/activities/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/activities/",
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
      "comment": "example",
      "created_at": "2026-01-14T09:22:41.478363Z",
      "duration": 90,
      "epoch": 1,
      "external_id": null,
      "external_source": null,
      "field": "example",
      "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
      "issue_comment_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "new_identifier_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "new_value": "example",
      "old_identifier_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "old_value": "example",
      "verb": "example",
      "work_item_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
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
