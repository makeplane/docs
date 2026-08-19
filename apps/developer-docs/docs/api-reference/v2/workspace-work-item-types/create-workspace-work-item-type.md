---
title: Create a workspace work item type
description: Create a workspace-level work item type in Plane with the v2 REST API. Body parameters, workspace mode requirement, OAuth scopes, error codes, and code examples.
keywords: plane api v2, create workspace work item type, issue type, workspace mode, POST work item types
---

# Create a workspace work item type

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-types/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Define a work item type for the whole workspace. The type becomes available to projects working from the workspace list, so one call gives every team the same `Bug` or `Incident` rather than each project inventing its own.

::: warning Workspace mode required
This write only succeeds while the workspace manages work item types at the workspace level. In project mode it returns `409` with code `work_item_types_managed_at_project` — create the type on the project endpoint instead. See [Work item type modes](/api-reference/v2/work-item-type-modes).
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

<div class="params-list">

<ApiParam name="name" type="string" :required="true">

Display name for the type, for example `Incident`. Maximum 255 characters. Reusing a name that already exists in the workspace returns `409`.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

What this type is for. It is shown next to the type wherever someone picks it, so write it for the person choosing.

</ApiParam>

<ApiParam name="is_active" type="boolean" :required="false">

Whether the type can be selected. Send `false` to create a type that exists but stays out of pickers until you are ready to roll it out.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this type, for sync and import correlation. Maximum 255 characters, and accepts `null`. Write-only — it is not returned on read, so keep your own mapping to the Plane `id`.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `jira`. Maximum 255 characters, and accepts `null`. Write-only, like `external_id` — an `external_id` is only unique within its source, so record both.

</ApiParam>

</div>

`is_default`, `is_epic`, `level`, and `logo_props` are read-only. A type created here is a standard work item type; promote it to the workspace default with [Mark a type as default](/api-reference/v2/workspace-work-item-types/mark-default-workspace-work-item-type).

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

`workspaces.work_item_types:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                     |
| ------ | ------------------------ | ----------------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | `name` is missing, empty, or longer than 255 characters. See `errors[]`.                  |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                           |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.      |
| `403`  | `forbidden`              | Your role or token scope can't write workspace types.                                     |
| `404`  | `not_found`              | No such workspace, or it's outside your tenant.                                           |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                      |
| `409`  | `conflict`               | The type can't be created as requested — most often a name already in use. Read `detail`. |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                  |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                       |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                                |

</div>

</div>

<div class="api-right">

<CodePanel title="Create a workspace work item type" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Incident",
  "description": "Customer-facing outage that needs a response now",
  "is_active": true,
  "external_id": "10004",
  "external_source": "jira"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-types/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "name": "Incident",
        "description": "Customer-facing outage that needs a response now",
        "is_active": True,
        "external_id": "10004",
        "external_source": "jira",
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v2/workspaces/my-team/work-item-types/", {
  method: "POST",
  headers: {
    "X-Api-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Incident",
    description: "Customer-facing outage that needs a response now",
    is_active: true,
    external_id: "10004",
    external_source: "jira",
  }),
});
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="201">

```json
{
  "id": "a3f52d07-8e19-4c6b-92d4-0b7e15c8f326",
  "name": "Incident",
  "description": "Customer-facing outage that needs a response now",
  "is_active": true,
  "is_default": false,
  "is_epic": false,
  "level": 0,
  "logo_props": {},
  "created_at": "2026-01-14T09:22:41.478363Z"
}
```

</ResponsePanel>

<ResponsePanel status="409" title="WRONG MODE">

```json
{
  "type": "conflict",
  "code": "work_item_types_managed_at_project",
  "detail": "This workspace manages work item types at the project level. Create the type on the project's work item types endpoint."
}
```

</ResponsePanel>

</div>
</div>

::: tip Next steps
A new type starts with no custom properties. [Attach the properties it should collect](/api-reference/v2/workspace-work-item-type-properties/attach-workspace-type-property), then bring it into the projects that need it with [Import work item types](/api-reference/v2/work-item-types/import-work-item-types), passing the `id` returned above.
:::
