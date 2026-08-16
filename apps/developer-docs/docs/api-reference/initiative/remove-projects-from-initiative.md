---
title: Remove projects from initiative
description: Remove projects from initiative via Plane API. HTTP request format, parameters, scopes, and example responses for remove projects from initiative.
keywords: plane, plane api, rest api, api integration, initiative, remove projects from initiative
---

# Remove projects from initiative

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/initiatives/{initiative_id}/projects/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Remove projects from an initiative by its ID

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="initiative_id" type="string" :required="true">

The unique identifier of the initiative.

</ApiParam>

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`initiatives.projects:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Remove projects from initiative" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v1/workspaces/my-workspace/initiatives/initiative-uuid/projects/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v1/workspaces/my-workspace/initiatives/initiative-uuid/projects/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/initiatives/initiative-uuid/projects/",
  {
    method: "DELETE",
    headers: {
      "X-API-Key": "your-api-key",
    },
  }
);
console.log(response.status);
```

</template>
</CodePanel>

<ResponsePanel status="204">

No response body.

</ResponsePanel>

</div>

</div>
