---
title: List property options
description: List the selectable options of an OPTION-typed work item property in a Plane project with the v2 REST API. Ordering, pagination, OAuth scopes, error codes, and code examples.
keywords: plane api v2, list property options, work item property options, OPTION property, sort_order, pagination, GET property options
---

# List property options

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-properties/{property_id}/options/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Return the selectable choices of a single project-level property as a paginated list. This is how you build a picker for an `OPTION` property, and how you resolve a human-readable label such as `Critical` to the option `id` you must send when setting a property value on a work item.

The property in the path must have `property_type: "OPTION"` — see [Work item properties](/api-reference/v2/work-item-properties/overview). Properties of any other type have no options.

Reads work in either work item type mode — only writes are mode-gated, so listing options never returns `409`. See
[Work item type modes](/api-reference/v2/work-item-type-modes).

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

The property whose options you want to list. A property id from another project returns `404`, even inside the same workspace.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

There are no filters or search on this endpoint — a property's option list is short and is returned whole. Check your spelling on `order_by`: a value outside the list below is not rejected, it silently falls back to the default ordering, so a typo shows up as an unexpected sort order rather than an error.

</div>

<div class="params-section">

### Ordering

<div class="params-list">

<ApiParam name="order_by" type="string" :required="false">

Field to sort by. Prefix with `-` for descending.

- `sort_order` , `-sort_order` — the order the property itself presents its choices in
- `created_at` , `-created_at` — when each option was added
- `id` , `-id`

Order by `sort_order` when you are rendering the picker to a user; it matches what Plane's own UI shows. `created_at` is orderable but is not returned in the response body.

</ApiParam>

</div>
</div>

<div class="params-section">

### Pagination

<div class="params-list">

<ApiParam name="per_page" type="integer" :required="false">

Page size. Defaults to 50, maximum 200. Most properties have well under 50 options, so one page is usually the entire list.

</ApiParam>

<ApiParam name="offset" type="integer" :required="false">

Number of rows to skip from the start of the result set. Maximum 10000. Read the `next` value from the response rather than computing offsets yourself.

</ApiParam>

<ApiParam name="paginate" type="string" :required="false">

Set to `cursor` to opt into the COUNT-free keyset envelope, which returns `next_cursor` and `has_more` instead of `next` and `total_count`. Omit it for the default offset envelope.

</ApiParam>

<ApiParam name="count" type="boolean" :required="false">

Defaults to `true`. Set to `false` to skip the `COUNT(*)` behind `total_count`; the field is then omitted from the response.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_item_properties:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                     |
| ------ | ------------------ | ----------------------------------------------------------------------------------------- |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                           |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.      |
| `403`  | `forbidden`        | Your role or token scope can't read this project's properties.                            |
| `404`  | `not_found`        | No such property, project, or workspace — or the property belongs to a different project. |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                      |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                                |

</div>

::: info No expansion on options
Property options don't accept `?expand=`. The response is the flat option object shown here.
:::

</div>

<div class="api-right">

<CodePanel title="List property options" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/c1a7f2d8-6b34-4e59-9f80-2d4a7c31e6b5/options/?order_by=sort_order&per_page=50" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/c1a7f2d8-6b34-4e59-9f80-2d4a7c31e6b5/options/",
    headers={"X-Api-Key": "your-api-key"},
    params={"order_by": "sort_order", "per_page": 50},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const params = new URLSearchParams({ order_by: "sort_order", per_page: "50" });
const response = await fetch(
  `https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-properties/c1a7f2d8-6b34-4e59-9f80-2d4a7c31e6b5/options/?${params}`,
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
  "data": [
    {
      "id": "9d3b5c71-2e48-4a6f-b1c9-7f0e83d25a64",
      "name": "Critical",
      "description": "Customer-visible outage",
      "is_default": false,
      "sort_order": 15000,
      "external_id": null,
      "external_source": null
    },
    {
      "id": "5e2a0c93-7d41-4b8e-a36f-91c4d0b7e582",
      "name": "Major",
      "description": "Degraded but usable",
      "is_default": true,
      "sort_order": 25000,
      "external_id": null,
      "external_source": null
    },
    {
      "id": "a84f1b60-95c2-4d37-8e5a-3b0f6d29c471",
      "name": "Minor",
      "description": "Cosmetic or low impact",
      "is_default": false,
      "sort_order": 35000,
      "external_id": null,
      "external_source": null
    }
  ],
  "next": null,
  "previous": null,
  "total_count": 3,
  "pagination": {
    "style": "offset"
  }
}
```

</ResponsePanel>

<ResponsePanel status="200" title="CURSOR ENVELOPE (?paginate=cursor)">

```json
{
  "data": [
    {
      "id": "9d3b5c71-2e48-4a6f-b1c9-7f0e83d25a64",
      "name": "Critical",
      "description": "Customer-visible outage",
      "is_default": false,
      "sort_order": 15000,
      "external_id": null,
      "external_source": null
    }
  ],
  "next_cursor": "b3A9MTcx",
  "has_more": true,
  "pagination": {
    "style": "cursor"
  }
}
```

</ResponsePanel>

</div>
</div>

::: tip Cache the id, refresh the label
The option `id` is what a work item stores. Cache the id-to-name mapping from this endpoint and refresh it when you render, so a rename in Plane shows up in your UI without breaking the values you already wrote.
:::
