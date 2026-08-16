---
title: Update a customer
description: Update a customer via Plane API. HTTP request format, parameters, scopes, and example responses for update a customer.
keywords: plane, plane api, rest api, api integration, customer, update a customer
---

# Update a customer

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/customers/{resource_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Update an existing customer with the provided fields.

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

<ApiParam name="name" type="string" :required="false">

Name.

</ApiParam>

<ApiParam name="description" type="object" :required="false">

Description.

</ApiParam>

<ApiParam name="description_html" type="string" :required="false">

Description html.

</ApiParam>

<ApiParam name="description_stripped" type="string" :required="false">

Description stripped.

</ApiParam>

<ApiParam name="email" type="string" :required="false">

Email.

</ApiParam>

<ApiParam name="website_url" type="string" :required="false">

Website url.

</ApiParam>

<ApiParam name="logo_props" type="object" :required="false">

Logo props.

</ApiParam>

<ApiParam name="domain" type="string" :required="false">

Domain.

</ApiParam>

<ApiParam name="employees" type="integer" :required="false">

Employees.

</ApiParam>

<ApiParam name="stage" type="string" :required="false">

Stage.

</ApiParam>

<ApiParam name="contract_status" type="string" :required="false">

Contract status.

</ApiParam>

<ApiParam name="revenue" type="string" :required="false">

Revenue.

</ApiParam>

<ApiParam name="archived_at" type="string" :required="false">

Archived at.

</ApiParam>

<ApiParam name="created_by" type="string" :required="false">

Created by.

</ApiParam>

<ApiParam name="updated_by" type="string" :required="false">

Updated by.

</ApiParam>

<ApiParam name="logo_asset" type="string" :required="false">

Logo asset.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`customers:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Update a customer" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/workspaces/my-workspace/customers/resource-id-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
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
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/workspaces/my-workspace/customers/resource-id-uuid/",
    headers={"X-API-Key": "your-api-key"},
    json={
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
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/customers/resource-id-uuid/", {
  method: "PATCH",
  headers: {
    "X-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Example Name",
    description: "example-value",
    description_html: "<p>Example content</p>",
    description_stripped: "Example description",
    email: "Example Name",
    website_url: "https://example.com/resource",
    logo_props: "example-value",
    domain: "Example Name",
    employees: 1,
    stage: "Example Name",
    contract_status: "Example Name",
    revenue: "Example Name",
    archived_at: "2024-01-01T00:00:00Z",
    created_by: "550e8400-e29b-41d4-a716-446655440000",
    updated_by: "550e8400-e29b-41d4-a716-446655440000",
    logo_asset: "550e8400-e29b-41d4-a716-446655440000",
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
  "description": "example-value",
  "deleted_at": "2024-01-01T00:00:00Z",
  "customer_request_count": 1,
  "logo_url": "Example Name",
  "description_html": "<p>Example content</p>",
  "description_stripped": "Example description",
  "description_binary": "Example description",
  "email": "Example Name"
}
```

</ResponsePanel>

</div>

</div>
