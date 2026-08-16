---
title: Update a customer property value
description: Update a customer property value via Plane API. HTTP request format, parameters, scopes, and example responses for update a customer property value.
keywords: plane, plane api, rest api, api integration, customer, update a customer property value
---

# Update a customer property value

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/customers/{customer_id}/property-values/{property_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Update values for a specific property of a customer.

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

### Body Parameters

<div class="params-list">

<ApiParam name="values" type="array" :required="true">

Array of values for the property

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`customers.property_values:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Update a customer property value" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/workspaces/my-workspace/customers/customer-uuid/property-values/property-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "values": [
    "Example Name"
  ]
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/workspaces/my-workspace/customers/customer-uuid/property-values/property-uuid/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "values": [
"Example Name"
      ]
    }
)
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v1/workspaces/my-workspace/customers/customer-uuid/property-values/property-uuid/",
  {
    method: "PATCH",
    headers: {
      "X-API-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: ["Example Name"],
    }),
  }
);
console.log(response.status);
```

</template>
</CodePanel>

<ResponsePanel status="204">

No response body.

</ResponsePanel>

</div>

</div>
