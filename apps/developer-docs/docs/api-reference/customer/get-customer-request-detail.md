---
title: Retrieve a customer request
description: Retrieve a customer request via Plane API. HTTP request format, parameters, scopes, and example responses for retrieve a customer request.
keywords: plane, plane api, rest api, api integration, customer, retrieve a customer request
---

# Retrieve a customer request

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/customers/{customer_id}/requests/{resource_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Get a specific customer request by ID

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

### Scopes

`customers.requests:read`

</div>

</div>

<div class="api-right">

<CodePanel title="Retrieve a customer request" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/workspaces/my-workspace/customers/customer-uuid/requests/resource-id-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/my-workspace/customers/customer-uuid/requests/resource-id-uuid/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/customers/customer-uuid/requests/resource-id-uuid/",
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
