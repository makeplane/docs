---
title: Create project with template
description: Create a project from an existing project template via Plane API. HTTP request format, parameters, scopes, and example responses for create project with template.
keywords: plane, plane api, rest api, api integration, project, create project with template, project template
---

# Create project with template

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/templates/use/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Create a new project from an existing project template. The template's states, labels, estimates, modules, and work items are copied into the new project. Fields provided in the request body override the template defaults.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="template_id" type="string" :required="true">

The ID of the project template to instantiate. Must belong to the same workspace.

</ApiParam>

<ApiParam name="name" type="string" :required="false">

Name of the new project. Overrides the template default.

</ApiParam>

<ApiParam name="identifier" type="string" :required="false">

Short identifier for the project (e.g. `MAR`). Overrides the template default.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Description of the new project. Overrides the template default.

</ApiParam>

<ApiParam name="network" type="integer" :required="false">

Network visibility of the project. `0` for secret, `2` for public. Overrides the template default.

</ApiParam>

<ApiParam name="project_lead" type="string" :required="false">

User ID of the project lead. The lead is added as a project admin. Overrides the template default.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`write` or `projects:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Create project with template" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/templates/use/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "template_id": "7a2d3972-80a5-4ac5-8bb5-03026671826a",
  "name": "Mobile App Revamp",
  "identifier": "MAR",
  "description": "Project created from the Agile Project Setup template",
  "network": 2,
  "project_lead": "0d8d8869-3ed1-4fb4-b5c4-ff672888f5e2"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/templates/use/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "template_id": "7a2d3972-80a5-4ac5-8bb5-03026671826a",
      "name": "Mobile App Revamp",
      "identifier": "MAR",
      "description": "Project created from the Agile Project Setup template",
      "network": 2,
      "project_lead": "0d8d8869-3ed1-4fb4-b5c4-ff672888f5e2"
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/projects/templates/use/", {
  method: "POST",
  headers: {
    "X-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    template_id: "7a2d3972-80a5-4ac5-8bb5-03026671826a",
    name: "Mobile App Revamp",
    identifier: "MAR",
    description: "Project created from the Agile Project Setup template",
    network: 2,
    project_lead: "0d8d8869-3ed1-4fb4-b5c4-ff672888f5e2",
  }),
});
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="201">

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Mobile App Revamp",
  "description": "Project created from the Agile Project Setup template",
  "identifier": "MAR",
  "network": 2,
  "project_lead": "0d8d8869-3ed1-4fb4-b5c4-ff672888f5e2",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

</ResponsePanel>

</div>

</div>
