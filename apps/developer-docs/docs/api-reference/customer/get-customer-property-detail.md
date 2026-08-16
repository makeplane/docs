---
title: Retrieve a customer property
description: Retrieve a customer property via Plane API. HTTP request format, parameters, scopes, and example responses for retrieve a customer property.
keywords: plane, plane api, rest api, api integration, customer, retrieve a customer property
---

# Retrieve a customer property

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/customer-properties/{property_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve a specific customer property by ID.

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

### Scopes

`customers.properties:read`

</div>

</div>

<div class="api-right">

<CodePanel title="Retrieve a customer property" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/workspaces/my-workspace/customer-properties/property-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/my-workspace/customer-properties/property-uuid/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/customer-properties/property-uuid/", {
  method: "GET",
  headers: {
    "X-API-Key": "your-api-key",
  },
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
