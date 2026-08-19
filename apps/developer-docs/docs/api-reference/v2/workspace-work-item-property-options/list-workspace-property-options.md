---
title: List workspace property options
description: List the selectable options on a workspace-level OPTION property with the Plane v2 REST API. Ordering, pagination, OAuth scopes, error codes, and code examples.
keywords: plane api v2, list property options, workspace work item property, OPTION property, dropdown choices, pagination, GET options
---

# List workspace property options

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-properties/{property_id}/options/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Return the selectable choices on a workspace-level `OPTION` property as a paginated list. This is how you resolve an option name to the `id` you store when setting the property on a work item, and how you build a picker that stays in sync with the property definition.

Results are ordered by `sort_order` by default, which is the order the option list is meant to be displayed in.

Reads work in either work item type mode. Only writes are mode-gated — see [Work item type modes](/api-reference/v2/work-item-type-modes).

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="property_id" type="string (uuid)" :required="true">

The workspace-level property whose options you want — see [Workspace work item properties](/api-reference/v2/workspace-work-item-properties/overview).

This endpoint filters options by property rather than looking the property up, so an id that isn't a workspace-level property in this workspace — including a project-scoped property id — comes back as an empty list, not a `404`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

There are no filters on this resource. A property's option list is small and self-contained, so fetch it whole and match on `id` in your own code.

</div>

<div class="params-section">

### Ordering

<div class="params-list">

<ApiParam name="order_by" type="string" :required="false">

Field to sort by. Prefix with `-` for descending.

- `sort_order` , `-sort_order` — the property's own display order. This is the default.
- `created_at` , `-created_at` — when each option was added
- `id` , `-id`

A value outside this list is ignored and the default `sort_order` ordering is used, so a typo shows up as an unexpected order rather than an error.

</ApiParam>

</div>
</div>

<div class="params-section">

### Pagination

<div class="params-list">

<ApiParam name="per_page" type="integer" :required="false">

Page size. Defaults to 50, maximum 200. Most properties have fewer than 20 options, so one page is usually the whole list.

</ApiParam>

<ApiParam name="offset" type="integer" :required="false">

Number of rows to skip from the start of the result set. Maximum 10000. Read the `next` value from the response rather than computing offsets yourself.

</ApiParam>

<ApiParam name="paginate" type="string" :required="false">

Set to `cursor` to opt into the COUNT-free keyset envelope, which returns `next_cursor` and `has_more` instead of `next` and `total_count`. Omit it for the default offset envelope.

Cursor pagination needs a unique, monotonic sort key, and `sort_order` is neither. Pair it with `order_by=created_at` or `order_by=id`; a bare `?paginate=cursor` falls back to the default `sort_order` ordering and is rejected with `ordering_not_cursor_eligible`.

</ApiParam>

<ApiParam name="count" type="boolean" :required="false">

Defaults to `true`. Set to `false` to skip the `COUNT(*)` behind `total_count`; the field is then omitted from the response.

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
| `403`  | `forbidden`        | Your role or token scope can't read this workspace's properties.                     |
| `404`  | `not_found`        | No such workspace, or it's outside your tenant.                                      |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="List property options" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/9d0e1f3b-6a72-4c85-9e4d-2b7f1a6c8d54/options/?order_by=sort_order&per_page=50" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/9d0e1f3b-6a72-4c85-9e4d-2b7f1a6c8d54/options/",
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
  `https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/9d0e1f3b-6a72-4c85-9e4d-2b7f1a6c8d54/options/?${params}`,
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
      "id": "c31a7e04-5f6b-4d29-8a13-7e0c2b9f4a65",
      "name": "Production",
      "description": "Reported on live customer traffic",
      "is_default": true,
      "sort_order": 10000,
      "external_id": null,
      "external_source": null
    },
    {
      "id": "5e8b7d21-4a09-4c63-b7f2-90d1c3a86e57",
      "name": "Staging",
      "description": "Reported on the shared pre-release environment",
      "is_default": false,
      "sort_order": 20000,
      "external_id": null,
      "external_source": null
    },
    {
      "id": "a17f3c95-2d64-4b08-8e51-c94b7d60f382",
      "name": "Development",
      "description": "Reported on a local or branch environment",
      "is_default": false,
      "sort_order": 30000,
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

<ResponsePanel status="200" title="CURSOR ENVELOPE (?paginate=cursor&amp;order_by=created_at)">

```json
{
  "data": [
    {
      "id": "c31a7e04-5f6b-4d29-8a13-7e0c2b9f4a65",
      "name": "Production",
      "description": "Reported on live customer traffic",
      "is_default": true,
      "sort_order": 10000,
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

::: info An empty list is a real answer
Three different situations all return `200` with an empty `data` array: an `OPTION` property that has no options yet, a property of some other `property_type`, and a `property_id` that isn't a workspace-level property at all. When an empty list is surprising, read the property itself and check both that it exists at the workspace level and that its `property_type` is `OPTION`.
:::
