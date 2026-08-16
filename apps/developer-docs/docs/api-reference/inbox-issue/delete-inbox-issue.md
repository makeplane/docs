---
title: Delete intake issue
description: Delete an intake issue from the inbox via Plane API. Permanently removes the triaged submission. Returns 204 on success.
keywords: plane, plane api, rest api, api integration, work items, issues, tasks
---

# Delete intake issue

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/inbox-issues/{issue_id}</span>
</div>

<div class="api-two-column">
<div class="api-left">

Deletes an intake issue

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

</ApiParam>

<ApiParam name="project_id" type="string" :required="true">

</ApiParam>

<ApiParam name="inbox_id" type="string" :required="true">

</ApiParam>

<ApiParam name="work_item_id" type="string" :required="true">

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.intakes:write`

</div>

</div>
<div class="api-right">

<CodePanel title="Delete intake issue" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/inbox-issues/issue-uuid" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/inbox-issues/issue-uuid",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/inbox-issues/issue-uuid",
  {
    method: "DELETE",
    headers: {
      "X-API-Key": "your-api-key",
    },
  }
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="204">

```json
// 204 No Content
```

</ResponsePanel>

</div>
</div>
