---
title: Update a sticky
description: Update a sticky via Plane API. HTTP request format, parameters, scopes, and example responses for update a sticky.
keywords: plane, plane api, rest api, api integration, sticky, update a sticky
---

# Update a sticky

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/stickies/{resource_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Update a sticky by its ID

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="resource_id" type="string" :required="true">

The unique identifier of the resource.

</ApiParam>

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="deleted_at" type="string" :required="false">

Deleted at.

</ApiParam>

<ApiParam name="name" type="string" :required="false">

Name.

</ApiParam>

<ApiParam name="description" type="object" :required="false">

Description.

</ApiParam>

<ApiParam name="description_html" type="string" :required="false">

Description html.

</ApiParam>

<ApiParam name="description_stripped" type="string" :required="false">

Description stripped.

</ApiParam>

<ApiParam name="logo_props" type="object" :required="false">

Logo props.

</ApiParam>

<ApiParam name="color" type="string" :required="false">

Color.

</ApiParam>

<ApiParam name="background_color" type="string" :required="false">

Background color.

</ApiParam>

<ApiParam name="sort_order" type="number" :required="false">

Sort order.

</ApiParam>

<ApiParam name="created_by" type="string" :required="false">

Created by.

</ApiParam>

<ApiParam name="updated_by" type="string" :required="false">

Updated by.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`stickies:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Update a sticky" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/workspaces/my-workspace/stickies/resource-id-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "deleted_at": "2024-01-01T00:00:00Z",
  "name": "Example Name",
  "description": "example-value",
  "description_html": "<p>Example content</p>",
  "description_stripped": "Example description",
  "logo_props": "example-value",
  "color": "Example Name",
  "background_color": "Example Name",
  "sort_order": 1,
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "updated_by": "550e8400-e29b-41d4-a716-446655440000"
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/workspaces/my-workspace/stickies/resource-id-uuid/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "deleted_at": "2024-01-01T00:00:00Z",
      "name": "Example Name",
      "description": "example-value",
      "description_html": "<p>Example content</p>",
      "description_stripped": "Example description",
      "logo_props": "example-value",
      "color": "Example Name",
      "background_color": "Example Name",
      "sort_order": 1,
      "created_by": "550e8400-e29b-41d4-a716-446655440000",
      "updated_by": "550e8400-e29b-41d4-a716-446655440000"
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/stickies/resource-id-uuid/", {
  method: "PATCH",
  headers: {
    "X-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    deleted_at: "2024-01-01T00:00:00Z",
    name: "Example Name",
    description: "example-value",
    description_html: "<p>Example content</p>",
    description_stripped: "Example description",
    logo_props: "example-value",
    color: "Example Name",
    background_color: "Example Name",
    sort_order: 1,
    created_by: "550e8400-e29b-41d4-a716-446655440000",
    updated_by: "550e8400-e29b-41d4-a716-446655440000",
  }),
});
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Example Name",
  "description_html": "<p>Example content</p>",
  "created_at": "2024-01-01T00:00:00Z"
}
```

</ResponsePanel>

</div>

</div>
