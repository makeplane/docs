---
title: Update the group sync configuration
description: Update the group sync configuration with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, update the group sync configuration, group sync config, group sync config update
---

# Update the group sync configuration

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v2/workspaces/{slug}/group-sync/config/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Group sync maps identity-provider groups onto Plane workspace and project roles.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="auto_remove" type="boolean" :required="false">

Whether auto remove.

</ApiParam>

<ApiParam name="default_workspace_role_slug" type="string" :required="false">

The default workspace role slug.

Nullable.

</ApiParam>

<ApiParam name="group_attribute_key" type="string" :required="false">

The group attribute key.

Maximum 255 characters.

</ApiParam>

<ApiParam name="is_enabled" type="boolean" :required="false">

Whether the rule is switched on.

</ApiParam>

<ApiParam name="sync_offline" type="boolean" :required="false">

Whether sync offline.

</ApiParam>

<ApiParam name="sync_on_login" type="boolean" :required="false">

Whether sync on login.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.group_sync:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                               |
| ------ | ------------------------ | ----------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | The request body or a query parameter failed validation.                            |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                     |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan or is switched off. |
| `403`  | `forbidden`              | Your role or token scope doesn't allow this.                                        |
| `404`  | `not_found`              | No such resource, or it's outside your tenant.                                      |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                |
| `409`  | `conflict`               | A business rule blocks the write — see the notes above.                             |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                            |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                 |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                          |

</div>

</div>

<div class="api-right">

<CodePanel title="Update the group sync configuration" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v2/workspaces/my-team/group-sync/config/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "auto_remove": false,
  "default_workspace_role_slug": "example",
  "group_attribute_key": "example"
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v2/workspaces/my-team/group-sync/config/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "auto_remove": False,
        "default_workspace_role_slug": "example",
        "group_attribute_key": "example"
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v2/workspaces/my-team/group-sync/config/", {
  method: "PATCH",
  headers: {
    "X-Api-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    auto_remove: false,
    default_workspace_role_slug: "example",
    group_attribute_key: "example",
  }),
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

</div>
</div>
