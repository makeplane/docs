---
title: Get workspace features
description: Get workspace features via Plane API. HTTP request format, parameters, scopes, and example responses for get workspace features.
keywords: plane, plane api, rest api, api integration, workspace features, get workspace features
---

# Get workspace features

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/features/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Get the features of a workspace

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.features:read`

</div>

</div>

<div class="api-right">

<CodePanel title="Get workspace features" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/workspaces/my-workspace/features/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/my-workspace/features/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/features/", {
  method: "GET",
  headers: {
    "X-API-Key": "your-api-key",
  },
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
