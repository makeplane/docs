---
title: Update group sync config
description: Update IdP group sync configuration via Plane API. HTTP request format, parameters, scopes, and example responses for update group sync config.
keywords: plane, plane api, rest api, api integration, idp group sync, update group sync config
---

# Update group sync config

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/group-sync/config/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Update the IdP group sync configuration for the workspace. Supports partial updates — only include fields you want to change.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="is_enabled" type="boolean" :required="false">

Enable or disable IdP group sync for the workspace.

</ApiParam>

<ApiParam name="sync_on_login" type="boolean" :required="false">

Sync group memberships automatically on user login.

</ApiParam>

<ApiParam name="auto_remove" type="boolean" :required="false">

Automatically remove users from projects or workspace when removed from their IdP group.

</ApiParam>

<ApiParam name="sync_offline" type="boolean" :required="false">

Allow sync to run outside of login events.

</ApiParam>

<ApiParam name="group_attribute_key" type="string" :required="false">

The IdP claim key that contains group membership data (e.g. `groups`).

</ApiParam>

<ApiParam name="default_workspace_role" type="string" :required="false">

Role slug assigned to users when added to the workspace via group sync.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.group_sync:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Update group sync config" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/config/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "is_enabled": true,
  "sync_on_login": true,
  "auto_remove": false,
  "sync_offline": false,
  "group_attribute_key": "groups",
  "default_workspace_role": "member"
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/config/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "is_enabled": True,
      "sync_on_login": True,
      "auto_remove": False,
      "sync_offline": False,
      "group_attribute_key": "groups",
      "default_workspace_role": "member"
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/group-sync/config/", {
  method: "PATCH",
  headers: {
    "X-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    is_enabled: true,
    sync_on_login: true,
    auto_remove: false,
    sync_offline: false,
    group_attribute_key: "groups",
    default_workspace_role: "member",
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
