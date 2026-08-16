---
title: Create an epic
description: Create an epic via Plane API. HTTP request format, parameters, scopes, and example responses for create an epic.
keywords: plane, plane api, rest api, api integration, epics, create an epic
---

# Create an epic

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{slug}/projects/{project_id}/epics/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Create a new epic in the specified project with the provided details.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="project_id" type="string" :required="true">

Project ID

</ApiParam>

<ApiParam name="slug" type="string" :required="true">

Workspace slug

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="name" type="string" :required="true">

Name of the epic.

</ApiParam>

<ApiParam name="description_html" type="string" :required="false">

HTML-formatted description of the epic.

</ApiParam>

<ApiParam name="state_id" type="string" :required="false">

ID of the state (status) to assign to the epic.

</ApiParam>

<ApiParam name="parent_id" type="string" :required="false">

ID of the parent work item.

</ApiParam>

<ApiParam name="priority" type="string" :required="false">

Priority level. Possible values: `none`, `urgent`, `high`, `medium`, `low`.

</ApiParam>

<ApiParam name="start_date" type="string" :required="false">

Start date of the epic in YYYY-MM-DD format.

</ApiParam>

<ApiParam name="target_date" type="string" :required="false">

Target completion date in YYYY-MM-DD format.

</ApiParam>

<ApiParam name="assignee_ids" type="array" :required="false">

List of user IDs to assign to the epic.

</ApiParam>

<ApiParam name="label_ids" type="array" :required="false">

List of label IDs to apply to the epic.

</ApiParam>

<ApiParam name="estimate_point" type="string" :required="false">

ID of the estimate point.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

Name of the source system if importing from another tool.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

External identifier from the source system.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.epics:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Create an epic" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/550e8400-e29b-41d4-a716-446655440000/epics/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Develop Mobile Application Framework",
  "description_html": "<p>Create a cross-platform mobile application framework</p>",
  "priority": "high",
  "start_date": "2025-03-01",
  "target_date": "2025-06-30"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/550e8400-e29b-41d4-a716-446655440000/epics/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "name": "Develop Mobile Application Framework",
      "description_html": "<p>Create a cross-platform mobile application framework</p>",
      "priority": "high",
      "start_date": "2025-03-01",
      "target_date": "2025-06-30"
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/550e8400-e29b-41d4-a716-446655440000/epics/",
  {
    method: "POST",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Develop Mobile Application Framework",
      description_html: "<p>Create a cross-platform mobile application framework</p>",
      priority: "high",
      start_date: "2025-03-01",
      target_date: "2025-06-30",
    }),
  }
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="201">

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Develop Mobile Application Framework",
  "description": {},
  "description_html": "<p>Create a cross-platform mobile application framework</p>",
  "description_stripped": "Create a cross-platform mobile application framework",
  "description_binary": null,
  "state": "550e8400-e29b-41d4-a716-446655440001",
  "priority": "high",
  "assignees": [],
  "labels": [],
  "type": "550e8400-e29b-41d4-a716-446655440002",
  "estimate_point": null,
  "point": null,
  "start_date": "2025-03-01",
  "target_date": "2025-06-30",
  "parent": null,
  "sequence_id": 57,
  "sort_order": 605535.0,
  "is_draft": false,
  "completed_at": null,
  "archived_at": null,
  "project": "550e8400-e29b-41d4-a716-446655440000",
  "workspace": "550e8400-e29b-41d4-a716-446655440003",
  "external_id": null,
  "external_source": null,
  "deleted_at": null,
  "created_at": "2025-03-01T21:23:54.645263Z",
  "updated_at": "2025-03-01T21:23:54.645263Z",
  "created_by": "550e8400-e29b-41d4-a716-446655440004",
  "updated_by": null
}
```

</ResponsePanel>

</div>

</div>
