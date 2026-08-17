---
title: Update workspace features
description: Toggle a Plane workspace's feature flags with the v2 REST API, including switching the work item type mode. Body parameters, scopes, error codes, and code examples.
keywords: plane api v2, update workspace features, toggle feature flags, PATCH features, is_work_item_types_enabled, switch work item type mode
---

# Update workspace features

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v2/workspaces/{slug}/features/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Turn workspace features on or off. The update is partial — send only the flags you want to change, and every field you omit keeps its current value. Omitting a field is not the same as sending `null`.

The response is the full feature object after the change, so you never need a follow-up `GET` to confirm what happened.

::: warning Toggling `is_work_item_types_enabled` moves the write surface
This flag decides whether work item types are managed at the workspace or the project level. Flipping it changes which endpoints accept type and property writes **for every client in the workspace**, and in-flight integrations start getting `409` from the surface they were using. Treat it as an administrative action, not a runtime decision. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

Every field is optional. `id` and `created_at` are read-only — sending them has no effect.

<div class="params-list">

<ApiParam name="is_work_item_types_enabled" type="boolean" :required="false">

Manage work item types at the workspace level (`true`) or per project (`false`). This is the work item type mode switch — read [Work item type modes](/api-reference/v2/work-item-type-modes) before changing it.

</ApiParam>

<ApiParam name="work_item_type_default_level" type="integer" :required="false">

The default level applied to work item types in this workspace. The schema declares no enum and no bounds, so it accepts any integer.

</ApiParam>

<ApiParam name="is_workitem_hierarchy_enabled" type="boolean" :required="false">

Allow work items to be nested into a parent and child hierarchy. Note the spelling — no underscore between `work` and `item`.

</ApiParam>

<ApiParam name="is_project_grouping_enabled" type="boolean" :required="false">

Allow projects to be organized into groups in the workspace.

</ApiParam>

<ApiParam name="is_teams_enabled" type="boolean" :required="false">

Enable teamspaces for the workspace.

</ApiParam>

<ApiParam name="is_wiki_enabled" type="boolean" :required="false">

Enable the workspace-level wiki.

</ApiParam>

<ApiParam name="is_initiative_enabled" type="boolean" :required="false">

Enable initiatives, the layer that groups projects and epics toward a larger outcome.

</ApiParam>

<ApiParam name="is_customer_enabled" type="boolean" :required="false">

Enable customers and customer requests.

</ApiParam>

<ApiParam name="is_release_enabled" type="boolean" :required="false">

Enable releases.

</ApiParam>

<ApiParam name="is_state_duration_enabled" type="boolean" :required="false">

Record how long work items spend in each state.

</ApiParam>

<ApiParam name="is_pi_enabled" type="boolean" :required="false">

Enable Pi, Plane's AI assistant, in the workspace.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.features:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                                                                          |
| ------ | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | A flag was sent with a non-boolean value, or `work_item_type_default_level` was not an integer. Includes an `errors[]` array naming the field. |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                                                                                |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.                                                           |
| `403`  | `forbidden`              | Your role or token scope can't change this workspace's features.                                                                               |
| `404`  | `not_found`              | No such workspace, or it's outside your tenant.                                                                                                |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                                                                           |
| `409`  | `conflict`               | The requested toggle conflicts with the workspace's current state and was not applied. Re-read the object before retrying.                     |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                                                                       |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                                                                            |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                                                                                     |

</div>

::: info Unknown keys are not toggles
A body key that is not one of the fields above is not a flag and does not change anything. Always compare the response object against what you sent rather than assuming a `200` means your flag moved; `is_workitem_hierarchy_enabled` in particular is easy to mistype as `is_work_item_hierarchy_enabled`.
:::

</div>

<div class="api-right">

<CodePanel title="Update workspace features" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v2/workspaces/my-team/features/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "is_work_item_types_enabled": true,
  "is_state_duration_enabled": true
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v2/workspaces/my-team/features/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "is_work_item_types_enabled": True,
        "is_state_duration_enabled": True,
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v2/workspaces/my-team/features/", {
  method: "PATCH",
  headers: {
    "X-Api-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    is_work_item_types_enabled: true,
    is_state_duration_enabled: true,
  }),
});
const data = await response.json();
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
  "is_state_duration_enabled": true,
  "is_pi_enabled": false,
  "created_at": "2026-01-14T09:22:41.478363Z"
}
```

</ResponsePanel>

<ResponsePanel status="400">

```json
{
  "type": "invalid_request",
  "code": "invalid_request",
  "detail": "Invalid input.",
  "errors": [
    {
      "field": "is_teams_enabled",
      "code": "invalid",
      "message": "Must be a valid boolean."
    }
  ]
}
```

</ResponsePanel>

</div>
</div>

::: tip Confirm the mode after switching it
After a `PATCH` that changes `is_work_item_types_enabled`, read the value straight from the response and use it to pick your write surface. Anything you cached before this call is now wrong. Then follow [Work item type modes](/api-reference/v2/work-item-type-modes) — workspace mode also changes how types reach a project, since projects import workspace types instead of defining their own.
:::

## Related

- [Get workspace features](/api-reference/v2/workspace-features/get-workspace-features)
- [Workspace features overview](/api-reference/v2/workspace-features/overview)
- [Work item type modes](/api-reference/v2/work-item-type-modes)
