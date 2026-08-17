---
title: List releases
description: List releases with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, list releases, releases, releases list
---

# List releases

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/releases/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Releases group shipped work and carry a changelog. List the releases you can see. Results are scoped to the path and to what your token is allowed to read.

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

<ApiParam name="is_latest" type="boolean" :required="false">

Filter by `is_latest`.

</ApiParam>

<ApiParam name="is_prerelease" type="boolean" :required="false">

Filter by `is_prerelease`.

</ApiParam>

<ApiParam name="lead_id" type="string (uuid)" :required="false">

Filter by `lead_id`.

</ApiParam>

<ApiParam name="name" type="string" :required="false">

Filter by `name`.

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

<ApiParam name="release_date" type="string (date)" :required="false">

Filter by `release_date`.

</ApiParam>

<ApiParam name="search" type="string" :required="false">

A search term.

</ApiParam>

<ApiParam name="status" type="string" :required="false">

- `unreleased` - Unreleased
- `released` - Released
- `cancelled` - Cancelled

One of `cancelled`, `released`, `unreleased`.

</ApiParam>

<ApiParam name="status__in" type="array of string" :required="false">

Multiple values may be separated by commas.

- `unreleased` - Unreleased
- `released` - Released
- `cancelled` - Cancelled

</ApiParam>

<ApiParam name="tag_id" type="string (uuid)" :required="false">

Filter by `tag_id`.

</ApiParam>

<ApiParam name="target_date" type="string (date)" :required="false">

Filter by `target_date`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from each row, not returned as `null`. `id` always comes back. Pass `all` for every requestable field.

An unknown name is a `400` that names the valid set, so a typo can't silently cost you the saving. See [Sparse fields](/api-reference/v2/sparse-fields).

Requestable here: `created_at`, `created_by_id`, `description_html`, `description_id`, `external_id`, `external_source`, `id`, `is_latest`, `is_prerelease`, `label_ids`, `lead_id`, `name`, `release_date`, `status`, `tag_id`, `target_date`.

</ApiParam>

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed: `lead`, `tag`.

Expansion is separate-key — `?expand=state` keeps `state_id` and adds a `state` object next to it. `?fields=` and `?expand=` are independent: naming a relation in `?fields=` is a `400`, and expanded objects survive field filtering. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`releases:read`

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

<CodePanel title="List releases" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/releases/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/releases/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v2/workspaces/my-team/releases/", {
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
      "created_at": "2026-01-14T09:22:41.478363Z",
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
      "description_html": "<p>Details go here.</p>",
      "description_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "external_id": null,
      "external_source": null,
      "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
      "is_latest": false,
      "is_prerelease": false,
      "label_ids": [["16c61a3a-512a-48ac-b0be-b6b46fe6f430"]],
      "lead_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "name": "Example name",
      "release_date": "2026-01-20",
      "status": "unreleased",
      "tag_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "target_date": "2026-01-20"
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
