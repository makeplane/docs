---
title: Get a cycle
description: Retrieve a single Plane cycle by id with the v2 REST API. Path parameters, response fields, OAuth scopes, error codes, and code examples.
keywords: plane api v2, get cycle, retrieve cycle, cycle by id, GET cycles
---

# Get a cycle

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/cycles/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Fetch one cycle by id. The response is the same cycle object the list endpoint returns for each row, so you only need this call when you already hold an id.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the cycle belongs to. A cycle id from a different project returns `404`, not the record.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The cycle to retrieve.

</ApiParam>

</div>
</div>

::: info No `?expand=` on cycles
Cycles do not support `?expand=`. `owned_by_id` and `created_by_id` are always plain ids — resolve them against the members endpoints when you need display names.
:::

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

`projects.cycles:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read cycles in this project.                          |
| `404`  | `not_found`        | No such cycle, wrong project, or the record is outside your tenant.                  |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="Get a cycle" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/cycles/7c1f9a4e-3b6d-4a52-8f0c-2d9e6b18c3a7/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/cycles/7c1f9a4e-3b6d-4a52-8f0c-2d9e6b18c3a7/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/cycles/7c1f9a4e-3b6d-4a52-8f0c-2d9e6b18c3a7/",
  {
    headers: { "X-Api-Key": "your-api-key" },
  },
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "id": "7c1f9a4e-3b6d-4a52-8f0c-2d9e6b18c3a7",
  "name": "Sprint 24",
  "description": "Checkout rewrite and billing cleanup",
  "start_date": "2026-01-05T00:00:00Z",
  "end_date": "2026-01-19T00:00:00Z",
  "timezone": "America/New_York",
  "owned_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "sort_order": 65535,
  "logo_props": {},
  "external_id": null,
  "external_source": null,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
}
```

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
