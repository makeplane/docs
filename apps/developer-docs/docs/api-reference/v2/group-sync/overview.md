---
title: Group sync overview
description: The Plane API v2 group mapping object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, group sync, group mapping object
---

# Group sync overview

Group sync maps identity-provider groups onto Plane workspace and project roles.

<div class="api-two-column">
<div class="api-left">

## The group mapping object

### Attributes

- `auto_remove` _boolean_

  Whether auto remove.

- `default_workspace_role_slug` _string_

  The default workspace role slug.

- `group_attribute_key` _string_

  The group attribute key.

- `id` _string (uuid)_

  Unique identifier.

- `is_enabled` _boolean_

  Whether the rule is switched on.

- `sync_offline` _boolean_

  Whether sync offline.

- `sync_on_login` _boolean_

  Whether sync on login.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE GROUP MAPPING OBJECT">

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

## Endpoints

| Method   | Path                                                            | Description                         |
| -------- | --------------------------------------------------------------- | ----------------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/group-sync/project-mappings/`        | List project mappings               |
| `GET`    | `/api/v2/workspaces/{slug}/group-sync/workspace-mappings/`      | List workspace mappings             |
| `GET`    | `/api/v2/workspaces/{slug}/group-sync/config/`                  | Get the group sync configuration    |
| `GET`    | `/api/v2/workspaces/{slug}/group-sync/project-mappings/{pk}/`   | Get a project mapping               |
| `GET`    | `/api/v2/workspaces/{slug}/group-sync/workspace-mappings/{pk}/` | Get a workspace mapping             |
| `POST`   | `/api/v2/workspaces/{slug}/group-sync/project-mappings/`        | Create a project mapping            |
| `POST`   | `/api/v2/workspaces/{slug}/group-sync/workspace-mappings/`      | Create a workspace mapping          |
| `PATCH`  | `/api/v2/workspaces/{slug}/group-sync/config/`                  | Update the group sync configuration |
| `PATCH`  | `/api/v2/workspaces/{slug}/group-sync/project-mappings/{pk}/`   | Update a project mapping            |
| `PATCH`  | `/api/v2/workspaces/{slug}/group-sync/workspace-mappings/{pk}/` | Update a workspace mapping          |
| `DELETE` | `/api/v2/workspaces/{slug}/group-sync/project-mappings/{pk}/`   | Delete a project mapping            |
| `DELETE` | `/api/v2/workspaces/{slug}/group-sync/workspace-mappings/{pk}/` | Delete a workspace mapping          |

## Response shaping

Every group mapping read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
