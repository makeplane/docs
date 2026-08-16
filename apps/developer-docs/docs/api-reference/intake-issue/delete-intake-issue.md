---
title: Delete an intake work item
description: Delete an intake work item via Plane API. HTTP request format, parameters, scopes, and example responses for delete an intake work item.
keywords: plane, plane api, rest api, api integration, intake issue, delete an intake work item
---

# Delete an intake work item

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/intake-issues/{work_item_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Permanently remove an intake work item from the triage queue. Also deletes the underlying work item if it hasn't been accepted yet.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="work_item_id" type="string" :required="true">

The unique identifier of the work item.

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

### Scopes

`projects.intakes:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Delete an intake work item" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/intake-issues/work-item-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/intake-issues/work-item-uuid/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/intake-issues/work-item-uuid/",
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
