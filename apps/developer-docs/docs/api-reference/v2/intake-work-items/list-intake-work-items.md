---
title: List intake work items
description: List intake work items with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, list intake work items, intake work items, intakes list
---

# List intake work items

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/intake-issues/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Intake work items are the triage queue for a project. List the intake work items you can see. Results are scoped to the path and to what your token is allowed to read.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string" :required="true">

The project the resource belongs to. Accepts the project UUID or its bare identifier, for example `ENG`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

<div class="params-list">

<ApiParam name="count" type="boolean" :required="false">

Set to false to skip the total_count COUNT(\*) (omits total_count).

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Filter by `external_id`.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

Filter by `external_source`.

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

<ApiParam name="source" type="string" :required="false">

Filter by `source`.

</ApiParam>

<ApiParam name="status" type="integer" :required="false">

- `-2` - Pending
- `-1` - Rejected
- `0` - Snoozed
- `1` - Accepted
- `2` - Duplicate

One of `-1`, `-2`, `0`, `1`, `2`.

</ApiParam>

<ApiParam name="status__in" type="array of integer" :required="false">

Multiple values may be separated by commas.

- `-2` - Pending
- `-1` - Rejected
- `0` - Snoozed
- `1` - Accepted
- `2` - Duplicate

</ApiParam>

<ApiParam name="work_item_id" type="string (uuid)" :required="false">

Filter by `work_item_id`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from each row, not returned as `null`. `id` always comes back. Pass `all` for every requestable field.

An unknown name is a `400` that names the valid set, so a typo can't silently cost you the saving. See [Sparse fields](/api-reference/v2/sparse-fields).

Requestable here: `created_at`, `created_by_id`, `description_html`, `duplicate_to_id`, `external_id`, `external_source`, `id`, `intake_id`, `name`, `priority`, `snoozed_till`, `source`, `source_email`, `state_id`, `status`, `work_item_id`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.intakes:read`

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

<CodePanel title="List intake work items" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/intake-issues/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/intake-issues/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/intake-issues/",
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
      "created_at": "2026-01-14T09:22:41.478363Z",
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
      "description_html": "<p>Details go here.</p>",
      "duplicate_to_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "external_id": null,
      "external_source": null,
      "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
      "intake_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "name": "Example name",
      "priority": "high",
      "snoozed_till": "2026-01-14T09:22:41.478363Z",
      "source": "example",
      "source_email": "example",
      "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "status": -2,
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
