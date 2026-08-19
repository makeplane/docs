---
title: Delete a property context
description: Delete a context from a workspace-level work item property with the Plane v2 REST API. What happens to the context's options and recorded values, mode conflicts, OAuth scopes, error codes, and code examples.
keywords: plane api v2, delete property context, remove context, property scope, 204, work item type modes, DELETE contexts
---

# Delete a property context

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-properties/{property_id}/contexts/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Remove a context from a property. A successful delete returns `204` with an empty body.

Deleting a context does not just remove a rule — it removes coverage. Every work item that resolved to this context falls through to the next most specific context, and if none matches, the property stops appearing on those work items entirely. Read [What a delete takes with it](#what-a-delete-takes-with-it) before calling this on a context that is in use.

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

The id of the context to delete.

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

`workspaces.work_item_properties:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                               |
| ------ | ------------------------ | --------------------------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | A path segment is not a valid UUID.                                                                 |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                                     |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.                |
| `403`  | `forbidden`              | Your role or token scope can't change workspace property settings.                                  |
| `404`  | `not_found`              | No such context, property, or workspace — or it's outside your tenant.                              |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                                |
| `409`  | `conflict`               | This workspace manages work item types per project, so workspace-level property writes are refused. |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                            |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                                 |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                                          |

</div>

::: info Workspace mode only
Deleting a context requires the workspace to manage work item types at the workspace level. In project mode the request returns `409 work_item_types_managed_at_project` — the capability exists, it just lives on the project surface. Reads are unaffected. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

</div>

<div class="api-right">

<CodePanel title="Delete a property context" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/d1f7a3c9-5b62-4e08-9a41-7c3e2f8b6d05/contexts/6e2b90d4-1c73-4f58-a09e-3d8b5c14e7f2/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/d1f7a3c9-5b62-4e08-9a41-7c3e2f8b6d05/contexts/6e2b90d4-1c73-4f58-a09e-3d8b5c14e7f2/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/d1f7a3c9-5b62-4e08-9a41-7c3e2f8b6d05/contexts/6e2b90d4-1c73-4f58-a09e-3d8b5c14e7f2/",
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

<ResponsePanel status="409" title="WRONG MODE">

```json
{
  "type": "conflict",
  "code": "work_item_types_managed_at_project",
  "detail": "Work item types are managed at the project level for this workspace."
}
```

</ResponsePanel>

</div>
</div>

## What a delete takes with it

The delete is not limited to the context row:

- **The context's options go with it.** Options belong to a context, not to the property, so deleting the context deletes the choices it offered — and any value recorded against one of those options is cleared.
- **Cells that lose their last covering context lose their values.** For each project and work item type combination that this context covered, Plane re-resolves the property. If a less specific context still matches, work items there switch to its rules. If nothing matches, the property no longer applies in that combination and the values recorded there are removed.

There is no restore operation. Treat the `204` as final.

## Deleting the all-projects context

The context Plane seeds with a property covers all projects and all work item types, which makes it the fallback that every uncovered work item lands on. Deleting it does not delete the property, but it does leave the property invisible everywhere your narrower contexts do not reach.

That slot also carries a constraint: only one context per property may set `applies_to_all_projects`. So deleting this context is how you free the slot when you want a different context to be the catch-all — create the replacement first if you would rather not have a gap, then move the flag with [Update a context](/api-reference/v2/work-item-property-contexts/update-property-context).

## A safer teardown

When a context is in active use, retire it in this order:

1. [List the property's contexts](/api-reference/v2/work-item-property-contexts/list-property-contexts) and work out which context each covered project and work item type will fall back to.
2. If the fallback is the wrong rule, [update](/api-reference/v2/work-item-property-contexts/update-property-context) it — or create the replacement context — before deleting anything.
3. Delete the context you are retiring.

Doing it in the other order leaves a window where the property is unreachable in those projects, and the values recorded there are cleaned up rather than parked.
