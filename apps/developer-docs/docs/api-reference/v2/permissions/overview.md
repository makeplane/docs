---
title: Permissions overview
description: The Plane API v2 permission object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, permissions, permission object
---

# Permissions overview

These endpoints report what the calling principal is actually allowed to do.

<div class="api-two-column">
<div class="api-left">

## The permission object

### Attributes

- `permission_grants` _array of string_

  The permission grants.

- `relation` _string_

  The relation.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE PERMISSION OBJECT">

```json
{
  "permission_grants": ["example"],
  "relation": "example"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method | Path                                                              | Description                              |
| ------ | ----------------------------------------------------------------- | ---------------------------------------- |
| `GET`  | `/api/v2/workspaces/{slug}/projects/{project_id}/permissions/me/` | Get your effective project permissions   |
| `GET`  | `/api/v2/workspaces/{slug}/permissions/me/`                       | Get your effective workspace permissions |

## Response shaping

Every permission read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
