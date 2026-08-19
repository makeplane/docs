---
title: Update workspace features
description: Update workspace features via Plane API. HTTP request format, parameters, scopes, and example responses for update workspace features.
keywords: plane, plane api, rest api, api integration, workspace features, update workspace features
---

# Update workspace features

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/features/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Update the features of a workspace

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

<ApiParam name="project_grouping" type="boolean" :required="false">

Project grouping.

</ApiParam>

<ApiParam name="initiatives" type="boolean" :required="false">

Initiatives.

</ApiParam>

<ApiParam name="teams" type="boolean" :required="false">

Teams.

</ApiParam>

<ApiParam name="customers" type="boolean" :required="false">

Customers.

</ApiParam>

<ApiParam name="wiki" type="boolean" :required="false">

Wiki.

</ApiParam>

<ApiParam name="pi" type="boolean" :required="false">

Pi.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.features:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Update workspace features" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/workspaces/my-workspace/features/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "project_grouping": true,
  "initiatives": true,
  "teams": true,
  "customers": true,
  "wiki": true,
  "pi": true
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/workspaces/my-workspace/features/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "project_grouping": true,
      "initiatives": true,
      "teams": true,
      "customers": true,
      "wiki": true,
      "pi": true
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/features/", {
  method: "PATCH",
  headers: {
    "X-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    project_grouping: true,
    initiatives: true,
    teams: true,
    customers: true,
    wiki: true,
    pi: true,
  }),
});
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "project_grouping": true,
  "initiatives": true,
  "teams": true,
  "customers": true,
  "wiki": true,
  "pi": true
}
```

</ResponsePanel>

</div>

</div>
