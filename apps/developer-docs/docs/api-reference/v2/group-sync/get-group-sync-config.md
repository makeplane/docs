---
title: Get the group sync configuration
description: Read a group sync config with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, get the group sync configuration, group sync config, group sync config retrieve
---

# Get the group sync configuration

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/group-sync/config/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Group sync maps identity-provider groups onto Plane workspace and project roles. Read a single group sync config by id.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.group_sync:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                               |
| ------ | ------------------ | ----------------------------------------------------------------------------------- |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                     |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan or is switched off. |
| `403`  | `forbidden`        | Your role or token scope doesn't allow this.                                        |
| `404`  | `not_found`        | No such resource, or it's outside your tenant.                                      |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                          |

</div>

</div>

<div class="api-right">

<CodePanel title="Get the group sync configuration" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/group-sync/config/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/group-sync/config/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v2/workspaces/my-team/group-sync/config/", {
  method: "GET",
  headers: {
    "X-Api-Key": "your-api-key",
  },
});
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "auto_remove": false,
  "default_workspace_role_slug": "example",
  "group_attribute_key": "example",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "is_enabled": false,
  "sync_offline": false,
  "sync_on_login": false
}
```

</ResponsePanel>

<ResponsePanel status="404">

```json
{
  "type": "not_found",
  "code": "not_found",
  "detail": "No group sync config matches the given query."
}
```

</ResponsePanel>

</div>
</div>
