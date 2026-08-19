---
title: Get a property option
description: Retrieve a single option of an OPTION-typed work item property in a Plane project with the v2 REST API. Path parameters, OAuth scopes, error codes, and code examples.
keywords: plane api v2, get property option, retrieve work item property option, OPTION property, is_default, GET property option by id
---

# Get a property option

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-properties/{property_id}/options/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve one option by id. Reach for this when you already hold an option id — from a work item's property value, a webhook payload, or a stored mapping — and need its current label, description, or default flag.

Reads work in either work item type mode, so this endpoint keeps returning data even in a workspace where option **writes** live on the workspace surface. See [Work item type modes](/api-reference/v2/work-item-type-modes).

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project that owns the property.

</ApiParam>

<ApiParam name="property_id" type="string (uuid)" :required="true">

The `OPTION` property the option belongs to. See [Work item properties](/api-reference/v2/work-item-properties/overview).

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The id of the option to retrieve. Every ancestor in the path is enforced — an option id that belongs to a different property returns `404` rather than the option's data.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_item_properties:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                            |
| ------ | ------------------ | ------------------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                                  |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.             |
| `403`  | `forbidden`        | Your role or token scope can't read this project's properties.                                   |
| `404`  | `not_found`        | No such option, property, project, or workspace — or the option belongs to a different property. |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                             |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                                       |

</div>

::: info Existence is never leaked
An option outside your tenant returns `404`, not `403`. If a cached id starts returning `404`, re-read the property's choices with [List property options](/api-reference/v2/work-item-property-options/list-property-options) instead of retrying.
:::

::: info No expansion on options
Property options don't accept `?expand=`. The response is the flat option object shown here.
:::

</div>

<div class="api-right">

<CodePanel title="Get a property option" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/c1a7f2d8-6b34-4e59-9f80-2d4a7c31e6b5/options/9d3b5c71-2e48-4a6f-b1c9-7f0e83d25a64/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/c1a7f2d8-6b34-4e59-9f80-2d4a7c31e6b5/options/9d3b5c71-2e48-4a6f-b1c9-7f0e83d25a64/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/c1a7f2d8-6b34-4e59-9f80-2d4a7c31e6b5/options/9d3b5c71-2e48-4a6f-b1c9-7f0e83d25a64/",
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
  "id": "9d3b5c71-2e48-4a6f-b1c9-7f0e83d25a64",
  "name": "Critical",
  "description": "Customer-visible outage",
  "is_default": false,
  "sort_order": 15000,
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
  "detail": "No IssuePropertyOption matches the given query."
}
```

</ResponsePanel>

</div>
</div>
