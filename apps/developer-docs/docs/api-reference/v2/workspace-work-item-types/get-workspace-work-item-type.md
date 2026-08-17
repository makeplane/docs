---
title: Get a workspace work item type
description: Retrieve a single workspace-level work item type from Plane with the v2 REST API. Path parameters, OAuth scopes, error codes, and code examples.
keywords: plane api v2, get workspace work item type, issue type by id, workspace mode, GET work item type
---

# Get a workspace work item type

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-types/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve one workspace-level type by id. Reach for this when you already hold a type id — from a work item's `type_id`, a webhook payload, or a stored mapping — and need its current name, description, or active flag.

::: info Reads work in either mode
Retrieval is unaffected by [work item type modes](/api-reference/v2/work-item-type-modes). A workspace type stays readable here even when the workspace manages types at the project level; only writes are mode-gated.
:::

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The id of the work item type to retrieve. A project-level type id returns `404` here — this endpoint only resolves types defined on the workspace.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `created_at`, `description`, `id`, `is_active`, `is_default`, `is_epic`, `level`, `logo_props`, `name`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.work_item_types:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read this workspace's types.                          |
| `404`  | `not_found`        | No such type or workspace, or it's outside your tenant.                              |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

::: info No expansion, and no external ids
Work item types don't accept `?expand=` — the response is the flat object shown here. `external_id` and `external_source` are write-only and never come back, so resolve a type by the Plane `id` you stored at create time.
:::

::: info Existence is never leaked
A type outside your tenant returns `404`, not `403`. If a cached id starts returning `404`, re-read the workspace's set with [List workspace work item types](/api-reference/v2/workspace-work-item-types/list-workspace-work-item-types) rather than retrying.
:::

</div>

<div class="api-right">

<CodePanel title="Get a workspace work item type" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/c1a7d3f4-6b28-4e90-8d15-2f7a0b9c4e63/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/c1a7d3f4-6b28-4e90-8d15-2f7a0b9c4e63/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/c1a7d3f4-6b28-4e90-8d15-2f7a0b9c4e63/",
  {
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
  "id": "c1a7d3f4-6b28-4e90-8d15-2f7a0b9c4e63",
  "name": "Bug",
  "description": "Something is broken and needs a fix",
  "is_active": true,
  "is_default": false,
  "is_epic": false,
  "level": 0,
  "logo_props": {},
  "created_at": "2026-01-14T09:22:41.478363Z"
}
```

</ResponsePanel>

<ResponsePanel status="404">

```json
{
  "type": "not_found",
  "code": "not_found",
  "detail": "No Issue Type matches the given query."
}
```

</ResponsePanel>

</div>
</div>
