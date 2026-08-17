---
title: Get a property context
description: Retrieve a single context of a workspace-level work item property with the Plane v2 REST API. Scope flags, overrides, options, OAuth scopes, error codes, and code examples.
keywords: plane api v2, get property context, retrieve context, applies_to_all_projects, project_ids, issue_type_ids, GET contexts
---

# Get a property context

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-properties/{property_id}/contexts/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve one context by id. Use it to confirm the scope and overrides you just wrote, or to read the current state before sending a `PATCH`.

The response is the full context: the two wildcard flags, the resolved `project_ids` and `issue_type_ids`, the values this context imposes on the property, and the options it offers.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="property_id" type="string (uuid)" :required="true">

The workspace-level property the context belongs to. A project-level property id is not addressable here and returns `404 not_found`.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The id of the context to retrieve. A context that belongs to a different property returns `404`, even if the id exists.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `applies_to_all_projects`, `applies_to_all_work_item_types`, `created_at`, `default_value`, `external_id`, `external_source`, `id`, `is_default`, `is_multi`, `is_required`, `issue_type_ids`, `name`, `options`, `project_ids`, `settings`, `sort_order`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.work_item_properties:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read workspace property settings.                     |
| `404`  | `not_found`        | No such context, property, or workspace — or it's outside your tenant.               |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

::: info Reads work in either mode
Retrieving a context does not depend on how the workspace manages work item types. Only `POST`, `PATCH`, and `DELETE` are mode-gated — see [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

</div>

<div class="api-right">

<CodePanel title="Get a property context" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/d1f7a3c9-5b62-4e08-9a41-7c3e2f8b6d05/contexts/6e2b90d4-1c73-4f58-a09e-3d8b5c14e7f2/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/d1f7a3c9-5b62-4e08-9a41-7c3e2f8b6d05/contexts/6e2b90d4-1c73-4f58-a09e-3d8b5c14e7f2/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/d1f7a3c9-5b62-4e08-9a41-7c3e2f8b6d05/contexts/6e2b90d4-1c73-4f58-a09e-3d8b5c14e7f2/",
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
  "id": "6e2b90d4-1c73-4f58-a09e-3d8b5c14e7f2",
  "name": "Bug severity",
  "is_required": true,
  "is_multi": false,
  "is_default": false,
  "default_value": [],
  "settings": {},
  "sort_order": 75535,
  "applies_to_all_projects": false,
  "applies_to_all_work_item_types": false,
  "external_id": null,
  "external_source": null,
  "created_at": "2026-02-03T11:05:17.204918Z",
  "project_ids": ["4af68566-94a4-4eb3-94aa-50dc9427067b", "9c3d7e21-6b45-4a80-8f19-2e0c7b5d3a64"],
  "issue_type_ids": ["b7e04a95-2f18-4c63-9d57-8a12e6b0f439"],
  "options": [
    {
      "id": "c58e2f01-4d97-4b3a-8e26-1f0b7a9c5d34",
      "name": "S1 — Critical",
      "is_default": false,
      "sort_order": 10000
    },
    {
      "id": "a49b6c72-8e15-4d30-b57c-2f81e0a6d938",
      "name": "S2 — Major",
      "is_default": true,
      "sort_order": 20000
    },
    {
      "id": "f13c8a60-7d24-4e59-9b02-6a5f1c3e8d47",
      "name": "S3 — Minor",
      "is_default": false,
      "sort_order": 30000
    }
  ]
}
```

</ResponsePanel>

<ResponsePanel status="404">

```json
{
  "type": "not_found",
  "code": "not_found",
  "detail": "No work item property context matches the given query."
}
```

</ResponsePanel>

</div>
</div>

## Reading the response

The scope is two pairs of fields, and each pair has to be read in order:

- `applies_to_all_projects`, then `project_ids`. The context above lists two projects. Had the flag been `true`, `project_ids` would be `[]` and the context would cover **every** project — an empty list is never "no projects".
- `applies_to_all_work_item_types`, then `issue_type_ids`, on the same principle.

`is_required`, `is_multi`, `default_value`, `settings`, and `options` are what this context imposes on the property inside that scope. They replace the property's own values rather than combining with them, so reading the property alone will not tell you how it behaves on a given work item — you need the context that resolves for that work item's project and type.

A single context is also not enough to predict behavior on its own, because a more specific context can outrank it. [List property contexts](/api-reference/v2/work-item-property-contexts/list-property-contexts) returns every context on the property, which is what you need to rank them.
