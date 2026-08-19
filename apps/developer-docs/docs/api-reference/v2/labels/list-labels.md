---
title: List labels
description: List the labels in a Plane project with the v2 REST API. Filters, search, ordering, pagination, OAuth scopes, error codes, and code examples.
keywords: plane api v2, list labels, label filters, parent_id, external_id, pagination, GET labels
---

# List labels

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/labels/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Return the labels defined in a project. Use it to build a label picker, to resolve label names to ids before writing `label_ids` on a work item, or to look up a label you imported by its `external_id`.

Results are paginated. Labels from other projects are never included — a project's labels are its own.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project whose labels you want.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

**Filters**

<div class="params-list">

<ApiParam name="parent_id" type="string (uuid)" :required="false">

Return only the labels nested under this label.

Pair it with `parent_id__isnull=true` to get the opposite view — every top-level label in the project. Use `parent_id__isnull=false` for every label that has a parent.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Return labels whose `external_id` matches. Combine with `external_source` to resolve a record from another system to its Plane label without keeping a local id map.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

Return labels that came from this system, for example `github` or `jira`.

</ApiParam>

</div>

**Search**

<div class="params-list">

<ApiParam name="search" type="string" :required="false">

A search term matched against the label `name`. Use it to power type-ahead in a picker rather than downloading every page and filtering client-side.

</ApiParam>

</div>

**Ordering**

<div class="params-list">

<ApiParam name="order_by" type="string" :required="false">

Field to sort by. Prefix with `-` for descending. Defaults to `sort_order`.

- `sort_order` , `-sort_order` — the project's own label ordering
- `created_at` , `-created_at` — newest or oldest first
- `id` , `-id`

A value outside this list is not rejected — it silently falls back to the default `sort_order`. Check your spelling: a typo in `order_by` fails silently and shows up as a differently sorted page, not as an error.

</ApiParam>

</div>

**Pagination**

<div class="params-list">

<ApiParam name="per_page" type="integer" :required="false">

Page size. Defaults to 50, maximum 200.

</ApiParam>

<ApiParam name="offset" type="integer" :required="false">

Number of rows to skip from the start of the result set. Maximum 10000. Read the `next` value from the response and send it back as `offset` to walk forward.

</ApiParam>

<ApiParam name="paginate" type="string" :required="false">

Set to `cursor` to switch from the default offset envelope to the keyset cursor envelope, which skips the `COUNT(*)` and returns `next_cursor` and `has_more` instead of `next` and `total_count`. Send the returned `next_cursor` back as `cursor` to fetch the following page.

Only `created_at` and `id` are cursor-eligible, because a keyset needs a strictly ordered column and `sort_order` is neither unique nor monotonic. Pair `paginate=cursor` with `order_by=created_at` or `order_by=id` — the default `sort_order` ordering is rejected with `400 ordering_not_cursor_eligible`.

Most projects have few enough labels that the default offset envelope is all you need.

</ApiParam>

<ApiParam name="count" type="boolean" :required="false">

Defaults to `true`. Set to `false` to omit `total_count` and skip the count query.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return on each row. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `color`, `created_at`, `created_by_id`, `description`, `external_id`, `external_source`, `id`, `name`, `parent_id`, `sort_order`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.labels:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read labels.                                          |
| `404`  | `not_found`        | No such workspace or project, or it's outside your tenant.                           |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="List labels" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/labels/?per_page=50&order_by=sort_order" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/labels/",
    headers={"X-Api-Key": "your-api-key"},
    params={"per_page": 50, "order_by": "sort_order"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/labels/?per_page=50&order_by=sort_order",
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
      "id": "2b7d5e94-3c1a-4f60-9a8d-7e1c4b0f2d35",
      "name": "Area",
      "description": "Which part of the product",
      "color": "#6b7280",
      "sort_order": 32767,
      "parent_id": null,
      "external_id": null,
      "external_source": null,
      "created_at": "2026-01-09T11:04:18.220914Z",
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
    },
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
  ],
  "next": null,
  "previous": null,
  "total_count": 2,
  "pagination": {
    "style": "offset"
  }
}
```

</ResponsePanel>

<ResponsePanel status="404">

```json
{
  "type": "not_found",
  "code": "not_found",
  "detail": "No project matches the given query."
}
```

</ResponsePanel>

</div>
</div>
