---
title: Update a customer request
description: Update a customer request via Plane API. HTTP request format, parameters, scopes, and example responses for update a customer request.
keywords: plane, plane api, rest api, api integration, customer, update a customer request
---

# Update a customer request

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/customers/{customer_id}/requests/{resource_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Update an existing customer request with the provided fields.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="customer_id" type="string" :required="true">

The unique identifier of the customer.

</ApiParam>

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

<ApiParam name="name" type="string" :required="false">

Name.

</ApiParam>

<ApiParam name="description" type="object" :required="false">

Description.

</ApiParam>

<ApiParam name="description_html" type="string" :required="false">

Description html.

</ApiParam>

<ApiParam name="link" type="string" :required="false">

Link.

</ApiParam>

<ApiParam name="work_item_ids" type="array" :required="false">

Work item ids.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`customers.requests:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Update a customer request" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/workspaces/my-workspace/customers/customer-uuid/requests/resource-id-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Example Name",
  "description": "example-value",
  "description_html": "<p>Example content</p>",
  "link": "https://example.com/resource",
  "work_item_ids": [
    "550e8400-e29b-41d4-a716-446655440000"
  ]
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/workspaces/my-workspace/customers/customer-uuid/requests/resource-id-uuid/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "name": "Example Name",
      "description": "example-value",
      "description_html": "<p>Example content</p>",
      "link": "https://example.com/resource",
      "work_item_ids": [
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
  "https://api.plane.so/api/v1/workspaces/my-workspace/customers/customer-uuid/requests/resource-id-uuid/",
  {
    method: "PATCH",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Example Name",
      description: "example-value",
      description_html: "<p>Example content</p>",
      link: "https://example.com/resource",
      work_item_ids: ["550e8400-e29b-41d4-a716-446655440000"],
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
  "name": "Example Name",
  "description": "example-value",
  "description_html": "<p>Example content</p>",
  "description_stripped": "Example description",
  "email": "Example Name",
  "website_url": "https://example.com/resource",
  "logo_props": "example-value",
  "domain": "Example Name",
  "employees": 1,
  "stage": "Example Name",
  "contract_status": "Example Name",
  "revenue": "Example Name",
  "archived_at": "2024-01-01T00:00:00Z",
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "updated_by": "550e8400-e29b-41d4-a716-446655440000",
  "logo_asset": "550e8400-e29b-41d4-a716-446655440000"
}
```

</ResponsePanel>

</div>

</div>
