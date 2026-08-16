---
title: Get group sync config
description: Get IdP group sync configuration via Plane API. HTTP request format, parameters, scopes, and example responses for get group sync config.
keywords: plane, plane api, rest api, api integration, idp group sync, get group sync config
---

# Get group sync config

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/group-sync/config/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve the IdP group sync configuration for the workspace. Auto-creates the config with defaults on first access.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response Attributes

<div class="params-list">

<ApiParam name="id" type="string">

Unique identifier of the config.

</ApiParam>

<ApiParam name="is_enabled" type="boolean">

Whether IdP group sync is enabled for the workspace.

</ApiParam>

<ApiParam name="sync_on_login" type="boolean">

Sync group memberships automatically on user login.

</ApiParam>

<ApiParam name="auto_remove" type="boolean">

Automatically remove users from projects or workspace when removed from their IdP group.

</ApiParam>

<ApiParam name="sync_offline" type="boolean">

Allow sync to run outside of login events.

</ApiParam>

<ApiParam name="group_attribute_key" type="string">

The IdP claim key that contains group membership data (e.g. `groups`).

</ApiParam>

<ApiParam name="default_workspace_role" type="string">

Role slug assigned to users when added to the workspace via group sync.

</ApiParam>

<ApiParam name="created_at" type="timestamp">

The timestamp of when the config was created.

</ApiParam>

<ApiParam name="updated_at" type="timestamp">

The timestamp of when the config was last updated.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.group_sync:read`

</div>

</div>

<div class="api-right">

<CodePanel title="Get group sync config" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/config/" \
  -H "X-API-Key: $PLANE_API_KEY"
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/config/",
    headers={"X-API-Key": "your-api-key"}
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/config/", {
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
  "is_enabled": true,
  "sync_on_login": true,
  "auto_remove": false,
  "sync_offline": false,
  "group_attribute_key": "groups",
  "default_workspace_role": "member",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

</ResponsePanel>

</div>

</div>
