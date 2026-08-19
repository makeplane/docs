---
title: Get a workspace property option
description: Retrieve a single selectable option on a workspace-level OPTION property with the Plane v2 REST API. Path parameters, OAuth scopes, error codes, and code examples.
keywords: plane api v2, get property option, workspace work item property, OPTION property, dropdown choice, GET option
---

# Get a workspace property option

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-properties/{property_id}/options/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve one option on a workspace-level `OPTION` property. Use it to resolve a stored option id back to a display name, or to confirm an option still exists before writing it onto a work item.

Reads work in either work item type mode — only writes are mode-gated. See [Work item type modes](/api-reference/v2/work-item-type-modes).

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="property_id" type="string (uuid)" :required="true">

The workspace-level property the option belongs to. See [Workspace work item properties](/api-reference/v2/workspace-work-item-properties/overview).

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The option to retrieve.

</ApiParam>

</div>

The option is looked up within the property, so a valid option id under the wrong `property_id` is a `404` rather than a match. Deleted options are gone from this endpoint too — a soft-deleted option returns `404`.

</div>

<div class="params-section">

### Scopes

`workspaces.work_item_properties:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                 |
| ------ | ------------------ | ------------------------------------------------------------------------------------- |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                       |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.  |
| `403`  | `forbidden`        | Your role or token scope can't read this workspace's properties.                      |
| `404`  | `not_found`        | No such workspace, workspace-level property, or option — or it's outside your tenant. |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                  |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                            |

</div>

</div>

<div class="api-right">

<CodePanel title="Get a property option" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/9d0e1f3b-6a72-4c85-9e4d-2b7f1a6c8d54/options/c31a7e04-5f6b-4d29-8a13-7e0c2b9f4a65/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/9d0e1f3b-6a72-4c85-9e4d-2b7f1a6c8d54/options/c31a7e04-5f6b-4d29-8a13-7e0c2b9f4a65/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/9d0e1f3b-6a72-4c85-9e4d-2b7f1a6c8d54/options/c31a7e04-5f6b-4d29-8a13-7e0c2b9f4a65/",
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
  "id": "c31a7e04-5f6b-4d29-8a13-7e0c2b9f4a65",
  "name": "Production",
  "description": "Reported on live customer traffic",
  "is_default": true,
  "sort_order": 10000,
  "external_id": null,
  "external_source": null
}
```

</ResponsePanel>

<ResponsePanel status="404">

```json
{
  "type": "not_found",
  "code": "not_found",
  "detail": "The requested resource was not found."
}
```

</ResponsePanel>

</div>
</div>

::: tip Fetching every option at once
Reading the property returns its `options` inline, so one property read is cheaper than a fan-out of option reads when you need the whole set. Reach for this endpoint when you hold a single option id and want just that row.
:::
