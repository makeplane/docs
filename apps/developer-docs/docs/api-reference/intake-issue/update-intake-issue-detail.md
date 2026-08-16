---
title: Update an intake work item
description: Update an intake work item via Plane API. HTTP request format, parameters, scopes, and example responses for update an intake work item.
keywords: plane, plane api, rest api, api integration, intake issue, update an intake work item
---

# Update an intake work item

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/intake-issues/{work_item_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Modify an existing intake work item's properties or status for triage processing. Supports status changes like accept, reject, or mark as duplicate.

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

### Body Parameters

<div class="params-list">

<ApiParam name="status" type="integer" :required="false">

- `-2` - Pending
- `-1` - Rejected
- `0` - Snoozed
- `1` - Accepted
- `2` - Duplicate

</ApiParam>

<ApiParam name="snoozed_till" type="string" :required="false">

Snoozed till.

</ApiParam>

<ApiParam name="duplicate_to" type="string" :required="false">

Duplicate to.

</ApiParam>

<ApiParam name="source" type="string" :required="false">

Source.

</ApiParam>

<ApiParam name="source_email" type="string" :required="false">

Source email.

</ApiParam>

<ApiParam name="issue" type="object" :required="false">

Issue data to update in the intake issue

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.intakes:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Update an intake work item" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/intake-issues/work-item-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "status": 1,
  "issue": {
    "name": "Example Name",
    "description": "Example description",
    "priority": "high"
  }
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/intake-issues/work-item-uuid/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "status": 1,
      "issue": {
"name": "Example Name",
"description": "Example description",
"priority": "high"
      }
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/intake-issues/work-item-uuid/",
  {
    method: "PATCH",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: 1,
      issue: {
        name: "Example Name",
        description: "Example description",
        priority: "high",
      },
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
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": 0,
  "source": "in_app",
  "issue": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Example Name",
    "description": "Example description",
    "priority": "medium",
    "sequence_id": 124
  },
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

</ResponsePanel>

</div>

</div>
