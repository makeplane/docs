---
title: Retrieve a customer property value
description: Retrieve a customer property value via Plane API. HTTP request format, parameters, scopes, and example responses for retrieve a customer property value.
keywords: plane, plane api, rest api, api integration, customer, retrieve a customer property value
---

# Retrieve a customer property value

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/customers/{customer_id}/property-values/{property_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve values for a specific property of a customer.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="customer_id" type="string" :required="true">

The unique identifier of the customer.

</ApiParam>

<ApiParam name="property_id" type="string" :required="true">

The unique identifier of the property.

</ApiParam>

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`customers.property_values:read`

</div>

</div>

<div class="api-right">

<CodePanel title="Retrieve a customer property value" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/workspaces/my-workspace/customers/customer-uuid/property-values/property-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/my-workspace/customers/customer-uuid/property-values/property-uuid/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/customers/customer-uuid/property-values/property-uuid/",
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
  "detail": "Property values retrieved successfully"
}
```

</ResponsePanel>

</div>

</div>
