---
title: Get work item type schema
description: Get work item type schema via Plane API. HTTP request format, parameters, scopes, and example responses for get work item type schema.
keywords: plane, plane api, rest api, api integration, issue types, types, get work item type schema
---

# Get work item type schema

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-item-types/schema/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Returns the complete schema for a work item type including all standard fields
and custom properties with their available options inline.

This endpoint enables LLMs and MCP integrations to understand what fields are available
when creating/updating work items.

**Standard fields** are always included:

- name, description_html, priority, state_id, assignee_ids, label_ids, start_date, target_date, parent_id

**Custom fields** are included when:

- ISSUE_TYPES feature is enabled AND
- A type_id is provided or a default type exists for the project

**Options behavior:**

- state_id options are always included
- priority options are always included
- assignee_ids and label_ids options require `?include=members,labels`
- estimate_point_id options are included when project has estimates configured

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="project_id" type="string" :required="true">

The unique identifier of the project.

</ApiParam>

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

<div class="params-list">

<ApiParam name="include" type="string" :required="false">

Comma-separated list of additional options to include: members, labels

</ApiParam>

<ApiParam name="type_id" type="string" :required="false">

Work item type ID. If not provided, returns schema for default type (when types enabled) or standard fields only.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_item_types:read`

</div>

</div>

<div class="api-right">

<CodePanel title="Get work item type schema" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-item-types/schema/?include=members&type_id=type-uuid" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-item-types/schema/?include=members&type_id=type-uuid",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-item-types/schema/?include=members&type_id=type-uuid",
  {
    method: "GET",
    headers: {
      "X-API-Key": "your-api-key",
    },
  }
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "type_id": "550e8400-e29b-41d4-a716-446655440000",
  "type_name": "Bug",
  "type_description": "Example description",
  "type_logo_props": {},
  "fields": {
    "name": {
      "type": "string",
      "required": true,
      "max_length": 255
    },
    "priority": {
      "type": "option",
      "required": false,
      "options": [
        {
          "value": "urgent",
          "label": "Urgent"
        },
        {
          "value": "high",
          "label": "High"
        }
      ]
    },
    "state_id": {
      "type": "uuid",
      "required": false,
      "options": [
        {
          "id": "...",
          "name": "Example Name",
          "group": "backlog"
        }
      ]
    }
  },
  "custom_fields": {
    "custom_field_severity": {
      "id": "...",
      "type": "OPTION",
      "name": "Example Name",
      "display_name": "Example Name",
      "required": true,
      "is_multi": false,
      "options": [
        {
          "id": "...",
          "name": "Example Name"
        }
      ]
    }
  }
}
```

</ResponsePanel>

</div>

</div>
