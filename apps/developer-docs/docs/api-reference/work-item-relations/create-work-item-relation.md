---
title: Create work item relation
description: Create work item relation via Plane API. HTTP request format, parameters, scopes, and example responses for create work item relation.
keywords: plane, plane api, rest api, api integration, work item relations, create work item relation
---

# Create work item relation

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-items/{work_item_id}/relations/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Create relationships between work items. Supports various relation types including blocking, blocked_by, duplicate, relates_to, start_before, start_after, finish_before, and finish_after.

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

<ApiParam name="relation_type" type="string" :required="true">

Type of relationship between work items

- `blocking` - Blocking
- `blocked_by` - Blocked By
- `duplicate` - Duplicate
- `relates_to` - Relates To
- `start_before` - Start Before
- `start_after` - Start After
- `finish_before` - Finish Before
- `finish_after` - Finish After

</ApiParam>

<ApiParam name="issues" type="array" :required="true">

Array of work item IDs to create relations with

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_items:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Create work item relation" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-items/work-item-uuid/relations/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "relation_type": "blocking",
  "issues": [
    "550e8400-e29b-41d4-a716-446655440000",
    "550e8400-e29b-41d4-a716-446655440000"
  ]
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-items/work-item-uuid/relations/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "relation_type": "blocking",
      "issues": [
"550e8400-e29b-41d4-a716-446655440000",
"550e8400-e29b-41d4-a716-446655440000"
      ]
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-items/work-item-uuid/relations/",
  {
    method: "POST",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      relation_type: "blocking",
      issues: ["550e8400-e29b-41d4-a716-446655440000", "550e8400-e29b-41d4-a716-446655440000"],
    }),
  }
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="201">

```json
[
  [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Example Name",
      "sequence_id": 42,
      "project_id": "550e8400-e29b-41d4-a716-446655440000",
      "relation_type": "blocked_by",
      "state_id": "550e8400-e29b-41d4-a716-446655440000",
      "priority": "high",
      "type_id": "550e8400-e29b-41d4-a716-446655440000",
      "is_epic": false,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z",
      "created_by": "550e8400-e29b-41d4-a716-446655440000",
      "updated_by": "550e8400-e29b-41d4-a716-446655440000"
    }
  ]
]
```

</ResponsePanel>

</div>

</div>
