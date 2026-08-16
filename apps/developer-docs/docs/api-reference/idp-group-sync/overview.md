---
title: Overview
description: Plane IDP Group Sync API overview. Learn about endpoints, request/response format, and how to manage IdP group sync configuration and mappings via REST API.
keywords: plane, plane api, rest api, api integration, idp group sync, group sync config, project mappings, workspace mappings
---

# Overview

IDP Group Sync lets workspace admins programmatically manage how IdP groups map to Plane projects and workspaces. All endpoints are workspace-scoped and require workspace admin permissions.

<div class="api-two-column">
<div class="api-left">

### The Group Sync Config Object

### Attributes

- `id` _uuid_

  Unique identifier of the config.

- `is_enabled` _boolean_

  Whether IdP group sync is enabled for the workspace.

- `sync_on_login` _boolean_

  Sync group memberships automatically on user login.

- `auto_remove` _boolean_

  Automatically remove users from projects/workspace when they are removed from the IdP group.

- `sync_offline` _boolean_

  Allow sync to run outside of login events.

- `group_attribute_key` _string_

  The IdP claim key that contains group membership data (e.g. `groups`).

- `default_workspace_role` _string_

  Role slug assigned to users when added to the workspace via group sync.

- `created_at` _timestamp_

  The timestamp of when the config was created.

- `updated_at` _timestamp_

  The timestamp of when the config was last updated.

### The Project Group Mapping Object

### Attributes

- `id` _uuid_

  Unique identifier of the mapping.

- `idp_group_name` _string_

  The name of the IdP group to map.

- `project` _string_

  Project identifier the group is mapped to. Mutually exclusive with `all_projects`.

- `all_projects` _boolean_

  When `true`, maps the group to all projects in the workspace. Mutually exclusive with `project`.

- `role` _string_

  Role slug assigned to group members within the project.

- `created_at` _timestamp_

  The timestamp of when the mapping was created.

- `updated_at` _timestamp_

  The timestamp of when the mapping was last updated.

### The Workspace Group Mapping Object

### Attributes

- `id` _uuid_

  Unique identifier of the mapping.

- `idp_group_name` _string_

  The name of the IdP group to map.

- `role` _string_

  Role slug assigned to group members within the workspace.

- `created_at` _timestamp_

  The timestamp of when the mapping was created.

- `updated_at` _timestamp_

  The timestamp of when the mapping was last updated.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE GROUP SYNC CONFIG OBJECT">

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

<ResponsePanel status="200" title="THE PROJECT GROUP MAPPING OBJECT">

```json
{
  "id": "661f9511-f30c-52e5-b827-557766551111",
  "idp_group_name": "engineering",
  "project": "ENG",
  "all_projects": false,
  "role": "member",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

</ResponsePanel>

<ResponsePanel status="200" title="THE WORKSPACE GROUP MAPPING OBJECT">

```json
{
  "id": "772g0622-g41d-63f6-c938-668877662222",
  "idp_group_name": "leadership",
  "role": "admin",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

</ResponsePanel>

</div>
</div>
