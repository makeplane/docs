---
title: List all customer work items
description: List all customer work items via Plane API. HTTP request format, parameters, scopes, and example responses for list all customer work items.
keywords: plane, plane api, rest api, api integration, customer, list all customer work items
---

# List all customer work items

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/customers/{customer_id}/issues/</span>
</div>

<div class="api-two-column">
<div class="api-left">

List all issues linked to a customer, with filtering by request

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="customer_id" type="string" :required="true">

The unique identifier of the customer.

</ApiParam>

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`customers.work_items:read`

</div>

</div>

<div class="api-right">

<CodePanel title="List all customer work items" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/workspaces/my-workspace/customers/customer-uuid/issues/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/my-workspace/customers/customer-uuid/issues/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/customers/customer-uuid/issues/", {
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
  "detail": "Customer issues retrieved successfully"
}
```

</ResponsePanel>

</div>

</div>
