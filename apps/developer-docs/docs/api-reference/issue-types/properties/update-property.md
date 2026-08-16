---
title: Update a custom property
description: Update a custom property via Plane API. HTTP request format, parameters, scopes, and example responses for update a custom property.
keywords: plane, plane api, rest api, api integration, issue types, properties, update a custom property
---

# Update a custom property

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/projects/{project_id}/work-item-types/{type_id}/work-item-properties/{property_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Update an issue property

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="project_id" type="string" :required="true">

The unique identifier of the project.

</ApiParam>

<ApiParam name="property_id" type="string" :required="true">

The unique identifier of the property.

</ApiParam>

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

<ApiParam name="type_id" type="string" :required="true">

The unique identifier of the work item type.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="relation_type" type="string" :required="false">

- `ISSUE` - Issue
- `USER` - User

</ApiParam>

<ApiParam name="options" type="array" :required="false">

List of options to create when property_type is OPTION. Each option should have 'name', optionally 'description', 'is_default', 'external_id', and 'external_source'.

</ApiParam>

<ApiParam name="display_name" type="string" :required="false">

Display name.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Description.

</ApiParam>

<ApiParam name="property_type" type="string" :required="false">

- `TEXT` - Text
- `DATETIME` - Datetime
- `DECIMAL` - Decimal
- `BOOLEAN` - Boolean
- `OPTION` - Option
- `RELATION` - Relation
- `URL` - URL
- `EMAIL` - Email
- `FILE` - File
- `FORMULA` - Formula

</ApiParam>

<ApiParam name="is_required" type="boolean" :required="false">

Is required.

</ApiParam>

<ApiParam name="default_value" type="array" :required="false">

Default value.

</ApiParam>

<ApiParam name="settings" type="object" :required="false">

Settings.

</ApiParam>

<ApiParam name="is_active" type="boolean" :required="false">

Is active.

</ApiParam>

<ApiParam name="is_multi" type="boolean" :required="false">

Is multi.

</ApiParam>

<ApiParam name="validation_rules" type="object" :required="false">

Validation rules.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

External source.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

External id.

</ApiParam>

<ApiParam name="formula_config" type="string" :required="false">

Formula config.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_item_properties:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Update a custom property" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-item-types/type-uuid/work-item-properties/property-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Example Name",
  "description": "Example description",
  "property_type": "OPTION",
  "external_id": "550e8400-e29b-41d4-a716-446655440000",
  "external_source": "github"
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-item-types/type-uuid/work-item-properties/property-uuid/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "name": "Example Name",
      "description": "Example description",
      "property_type": "OPTION",
      "external_id": "550e8400-e29b-41d4-a716-446655440000",
      "external_source": "github"
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/projects/project-uuid/work-item-types/type-uuid/work-item-properties/property-uuid/",
  {
    method: "PATCH",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Example Name",
      description: "Example description",
      property_type: "OPTION",
      external_id: "550e8400-e29b-41d4-a716-446655440000",
      external_source: "github",
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
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z",
  "name": "Example Name",
  "display_name": "Example Name",
  "description": "Example description",
  "property_type": "TEXT",
  "deleted_at": "2024-01-01T00:00:00Z",
  "relation_type": "ISSUE",
  "logo_props": "example-value",
  "sort_order": 1,
  "is_required": true
}
```

</ResponsePanel>

</div>

</div>
