---
title: Create an initiative label
description: Create an initiative label via Plane API. HTTP request format, parameters, scopes, and example responses for create an initiative label.
keywords: plane, plane api, rest api, api integration, initiative, create an initiative label
---

# Create an initiative label

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/initiatives/labels/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Create a new initiative label in the workspace

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="name" type="string" :required="true">

Name.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Description.

</ApiParam>

<ApiParam name="color" type="string" :required="false">

Color.

</ApiParam>

<ApiParam name="sort_order" type="number" :required="false">

Sort order.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`initiatives.labels:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Create an initiative label" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/initiatives/labels/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Example Name",
  "description": "Example description",
  "color": "Example Name",
  "sort_order": 1
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/initiatives/labels/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "name": "Example Name",
      "description": "Example description",
      "color": "Example Name",
      "sort_order": 1
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/initiatives/labels/", {
  method: "POST",
  headers: {
    "X-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Example Name",
    description: "Example description",
    color: "Example Name",
    sort_order: 1,
  }),
});
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="201">

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Example Name",
  "description": "Example description",
  "created_at": "2024-01-01T00:00:00Z"
}
```

</ResponsePanel>

</div>

</div>
