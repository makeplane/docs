---
title: Get workspace features
description: Read a Plane workspace's feature flags with the v2 REST API, including is_work_item_types_enabled — the work item type mode discriminator. Scopes, errors, and code examples.
keywords: plane api v2, get workspace features, feature flags, is_work_item_types_enabled, work item type mode, GET features
---

# Get workspace features

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/features/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Read the workspace's feature flags. There is one feature record per workspace, so this returns a single object rather than a list.

Call it during client start-up. `is_work_item_types_enabled` tells you which surface accepts work item type and property writes, and the remaining flags tell you which parts of your UI or sync are worth showing at all.

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

None. This endpoint takes no filters, no pagination, and no `?expand=` — passing one is not a supported way to widen the response.

</div>

<div class="params-section">

### Scopes

`workspaces.features:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read this workspace's features.                       |
| `404`  | `not_found`        | No such workspace, or it's outside your tenant.                                      |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

::: tip This is the mode check
`is_work_item_types_enabled: true` means the workspace manages work item types at the **workspace** level; `false` means each **project** does. Writes sent to the other surface return `409`, with `work_item_types_managed_at_workspace` or `work_item_types_managed_at_project`. Reads are unaffected. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

::: info Cache it, but not forever
The flags change rarely, so caching the response for the life of a request batch is reasonable. Re-read it whenever a write returns `409 work_item_types_managed_at_workspace` or `work_item_types_managed_at_project` — that code means your cached mode is stale.
:::

</div>

<div class="api-right">

<CodePanel title="Get workspace features" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/features/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/features/",
    headers={"X-Api-Key": "your-api-key"},
)
features = response.json()

if features["is_work_item_types_enabled"]:
    base = "https://api.plane.so/api/v2/workspaces/my-team"  # workspace mode
else:
    base = "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b"
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v2/workspaces/my-team/features/", {
  headers: {
    "X-Api-Key": "your-api-key",
  },
});
const features = await response.json();
const workspaceMode = features.is_work_item_types_enabled;
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "id": "a72f1c40-5b8e-4d19-9f2a-3c6d8e1b7a55",
  "is_work_item_types_enabled": true,
  "work_item_type_default_level": 0,
  "is_workitem_hierarchy_enabled": false,
  "is_project_grouping_enabled": false,
  "is_teams_enabled": true,
  "is_wiki_enabled": true,
  "is_initiative_enabled": false,
  "is_customer_enabled": false,
  "is_release_enabled": false,
  "is_state_duration_enabled": false,
  "is_pi_enabled": false,
  "created_at": "2026-01-14T09:22:41.478363Z"
}
```

</ResponsePanel>

<ResponsePanel status="404">

```json
{
  "type": "not_found",
  "code": "not_found",
  "detail": "No Workspace matches the given query."
}
```

</ResponsePanel>

</div>
</div>

## Related

- [Update workspace features](/api-reference/v2/workspace-features/update-workspace-features)
- [Workspace features overview](/api-reference/v2/workspace-features/overview) — every flag, one line each
- [Work item type modes](/api-reference/v2/work-item-type-modes)
