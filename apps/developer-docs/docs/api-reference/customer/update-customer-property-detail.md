---
title: Update a customer property
description: Update a customer property via Plane API. HTTP request format, parameters, scopes, and example responses for update a customer property.
keywords: plane, plane api, rest api, api integration, customer, update a customer property
---

# Update a customer property

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/customer-properties/{property_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Update an existing customer property with the provided fields.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="resource_id" type="string" :required="true">

The unique identifier of the resource.

</ApiParam>

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="display_name" type="string" :required="false">

Display name.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Description.

</ApiParam>

<ApiParam name="logo_props" type="object" :required="false">

Logo props.

</ApiParam>

<ApiParam name="sort_order" type="number" :required="false">

Sort order.

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

</ApiParam>

<ApiParam name="relation_type" type="string" :required="false">

- `ISSUE` - Issue
- `USER` - User

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

<ApiParam name="created_by" type="string" :required="false">

Created by.

</ApiParam>

<ApiParam name="updated_by" type="string" :required="false">

Updated by.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`customers.properties:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Update a customer property" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/workspaces/my-workspace/customer-properties/property-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "display_name": "Example Name",
  "description": "Example description",
  "logo_props": "example-value",
  "sort_order": 1,
  "property_type": "TEXT",
  "relation_type": "ISSUE",
  "is_required": true,
  "default_value": [
    "Example Name"
  ],
  "settings": "example-value",
  "is_active": true,
  "is_multi": true,
  "validation_rules": "example-value",
  "external_source": "github",
  "external_id": "550e8400-e29b-41d4-a716-446655440000",
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "updated_by": "550e8400-e29b-41d4-a716-446655440000"
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/workspaces/my-workspace/customer-properties/property-uuid/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "display_name": "Example Name",
      "description": "Example description",
      "logo_props": "example-value",
      "sort_order": 1,
      "property_type": "TEXT",
      "relation_type": "ISSUE",
      "is_required": true,
      "default_value": [
"Example Name"
      ],
      "settings": "example-value",
      "is_active": true,
      "is_multi": true,
      "validation_rules": "example-value",
      "external_source": "github",
      "external_id": "550e8400-e29b-41d4-a716-446655440000",
      "created_by": "550e8400-e29b-41d4-a716-446655440000",
      "updated_by": "550e8400-e29b-41d4-a716-446655440000"
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/customer-properties/property-uuid/", {
  method: "PATCH",
  headers: {
    "X-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    display_name: "Example Name",
    description: "Example description",
    logo_props: "example-value",
    sort_order: 1,
    property_type: "TEXT",
    relation_type: "ISSUE",
    is_required: true,
    default_value: ["Example Name"],
    settings: "example-value",
    is_active: true,
    is_multi: true,
    validation_rules: "example-value",
    external_source: "github",
    external_id: "550e8400-e29b-41d4-a716-446655440000",
    created_by: "550e8400-e29b-41d4-a716-446655440000",
    updated_by: "550e8400-e29b-41d4-a716-446655440000",
  }),
});
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
  "logo_props": "example-value",
  "sort_order": 1,
  "relation_type": "ISSUE",
  "is_required": true
}
```

</ResponsePanel>

</div>

</div>
