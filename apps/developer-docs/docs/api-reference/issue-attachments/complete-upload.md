---
title: Complete upload
description: Complete upload via Plane API. HTTP request format, parameters, scopes, and example responses for complete upload.
keywords: plane, plane api, rest api, api integration, issue attachments, complete upload
---

# Complete upload

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/attachments/{resource_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Mark an attachment as uploaded after successful file transfer to storage.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="work_item_id" type="string" :required="true">

The unique identifier of the work item.

</ApiParam>

<ApiParam name="resource_id" type="string" :required="true">

The unique identifier of the resource.

</ApiParam>

<ApiParam name="project_id" type="string" :required="true">

The unique identifier of the project.

</ApiParam>

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="is_uploaded" type="boolean" :required="false">

Mark attachment as uploaded

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_items.attachments:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Complete upload" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-items/work-item-uuid/attachments/resource-id-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "is_uploaded": true
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-items/work-item-uuid/attachments/resource-id-uuid/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "is_uploaded": true
    }
)
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-items/work-item-uuid/attachments/resource-id-uuid/",
  {
    method: "PATCH",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      is_uploaded: true,
    }),
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
