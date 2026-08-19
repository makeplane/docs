---
title: Create a workspace property option
description: Add a selectable choice to a workspace-level OPTION property with the Plane v2 REST API. Body parameters, the single-default rule, OAuth scopes, error codes, and code examples.
keywords: plane api v2, create property option, workspace work item property, OPTION property, dropdown choice, is_default, POST options
---

# Create a workspace property option

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-properties/{property_id}/options/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Add a choice to a workspace-level `OPTION` property. The new option is appended to the end of the property's list and becomes immediately selectable on work items across the workspace.

The property must have `property_type: "OPTION"`. Posting an option to a property of any other type returns `400 invalid_request` — the option list is meaningless for a `TEXT` or `DECIMAL` property.

::: warning Workspace mode only
This write requires the workspace to manage work item types at the workspace level. In project mode it returns `409 work_item_types_managed_at_project` — add the option through the project-level endpoint instead. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="property_id" type="string (uuid)" :required="true">

The workspace-level `OPTION` property to add the choice to. A project-scoped property id is a `404` here — this path never crosses into a project. See [Workspace work item properties](/api-reference/v2/workspace-work-item-properties/overview).

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="name" type="string" :required="true">

The choice as it is displayed. Maximum 255 characters.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Free-form text explaining when to pick this choice.

</ApiParam>

<ApiParam name="is_default" type="boolean" :required="false">

Make this the property's default choice. At most one option per property can be the default, and there is no automatic hand-off: if another option already has it, this request is rejected with `400 invalid_request`. Clear the current default with a `PATCH` first.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this option, for sync and import correlation. Maximum 255 characters.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `github` or `jira`. Maximum 255 characters.

</ApiParam>

</div>

`sort_order` is not accepted. Plane appends the new option after the current last one, so create options in the order you want them displayed.

</div>

<div class="params-section">

### Scopes

`workspaces.work_item_properties:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                                                                                   |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | Missing `name`, a field over 255 characters, `is_default` when the property already has a default, or a property whose `property_type` is not `OPTION`. |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                                                                                         |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.                                                                    |
| `403`  | `forbidden`              | Your role or token scope can't write this workspace's properties.                                                                                       |
| `404`  | `not_found`              | No such workspace or workspace-level property, or it's outside your tenant.                                                                             |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                                                                                    |
| `409`  | `conflict`               | This workspace manages work item types at the project level. Use the project-level options endpoint.                                                    |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                                                                                |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                                                                                     |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                                                                                              |

</div>

</div>

<div class="api-right">

<CodePanel title="Create a property option" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/9d0e1f3b-6a72-4c85-9e4d-2b7f1a6c8d54/options/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Sandbox",
  "description": "Reported on an isolated test tenant",
  "external_id": "env-sandbox",
  "external_source": "servicedesk"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/9d0e1f3b-6a72-4c85-9e4d-2b7f1a6c8d54/options/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "name": "Sandbox",
        "description": "Reported on an isolated test tenant",
        "external_id": "env-sandbox",
        "external_source": "servicedesk",
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/9d0e1f3b-6a72-4c85-9e4d-2b7f1a6c8d54/options/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Sandbox",
      description: "Reported on an isolated test tenant",
      external_id: "env-sandbox",
      external_source: "servicedesk",
    }),
  },
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="201">

```json
{
  "id": "2f6a94c1-7b38-4d50-91ae-3c0d5e8b7a26",
  "name": "Sandbox",
  "description": "Reported on an isolated test tenant",
  "is_default": false,
  "sort_order": 40000,
  "external_id": "env-sandbox",
  "external_source": "servicedesk"
}
```

</ResponsePanel>

<ResponsePanel status="409">

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

::: tip Seeding a whole option set
Create the options in display order in one pass, then set the default with a follow-up `PATCH`. That keeps every create request free of `is_default` and avoids tripping the one-default rule when a request is retried.
:::
