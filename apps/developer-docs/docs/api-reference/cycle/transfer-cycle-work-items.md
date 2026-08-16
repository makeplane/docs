---
title: Transfer cycle work items
description: Transfer cycle work items via Plane API. HTTP request format, parameters, scopes, and example responses for transfer cycle work items.
keywords: plane, plane api, rest api, api integration, cycle, transfer cycle work items
---

# Transfer cycle work items

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/cycles/{cycle_id}/transfer-issues/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Move incomplete work items from the current cycle to a new target cycle. Captures progress snapshot and transfers only unfinished work items.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="cycle_id" type="string" :required="true">

The unique identifier of the cycle.

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

<ApiParam name="new_cycle_id" type="string" :required="true">

ID of the target cycle to transfer issues to

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.cycles:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Transfer cycle work items" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/cycles/cycle-uuid/transfer-issues/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "new_cycle_id": "550e8400-e29b-41d4-a716-446655440000"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/cycles/cycle-uuid/transfer-issues/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "new_cycle_id": "550e8400-e29b-41d4-a716-446655440000"
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/cycles/cycle-uuid/transfer-issues/",
  {
    method: "POST",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      new_cycle_id: "550e8400-e29b-41d4-a716-446655440000",
    }),
  }
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "message": "Success"
}
```

</ResponsePanel>

</div>

</div>
