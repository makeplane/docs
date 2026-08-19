---
title: Roles overview
description: The Plane API v2 role object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, roles, role object
---

# Roles overview

Roles are the named permission levels a member can hold.

<div class="api-two-column">
<div class="api-left">

## The role object

### Attributes

- `description` _string_

  Free-form description.

- `id` _string (uuid)_

  Unique identifier.

- `is_system` _boolean_

  Whether is system.

- `level` _integer_

  The level.

- `name` _string_

  Display name.

- `namespace` _string_

  The namespace.

- `slug` _string_

  The slug.

- `status` _string_

  The status.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE ROLE OBJECT">

```json
{
  "description": "What this is for.",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "is_system": false,
  "level": 1,
  "name": "Example name",
  "namespace": null,
  "slug": "my-team",
  "status": "active"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method | Path                                    | Description |
| ------ | --------------------------------------- | ----------- |
| `GET`  | `/api/v2/workspaces/{slug}/roles/`      | List roles  |
| `GET`  | `/api/v2/workspaces/{slug}/roles/{pk}/` | Get a role  |

## Response shaping

Every role read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
