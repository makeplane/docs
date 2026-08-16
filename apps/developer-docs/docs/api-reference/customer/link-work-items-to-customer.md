---
title: Link work items to customer
description: Link work items to customer via Plane API. HTTP request format, parameters, scopes, and example responses for link work items to customer.
keywords: plane, plane api, rest api, api integration, customer, link work items to customer
---

# Link work items to customer

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/customers/{customer_id}/issues/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Link one or more issues to a customer, optionally within a specific customer request.

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

### Body Parameters

<div class="params-list">

<ApiParam name="issue_ids" type="array" :required="true">

Array of issue IDs to link

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`customers.work_items:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Link work items to customer" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v1/workspaces/my-workspace/customers/customer-uuid/issues/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "issue_ids": [
    "550e8400-e29b-41d4-a716-446655440000"
  ]
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v1/workspaces/my-workspace/customers/customer-uuid/issues/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "issue_ids": [
"550e8400-e29b-41d4-a716-446655440000"
      ]
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/customers/customer-uuid/issues/", {
  method: "POST",
  headers: {
    "X-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    issue_ids: ["550e8400-e29b-41d4-a716-446655440000"],
  }),
});
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="201">

```json
{
  "detail": "Issues linked successfully"
}
```

</ResponsePanel>

</div>

</div>
