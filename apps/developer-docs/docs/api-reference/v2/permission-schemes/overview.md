---
title: Permission schemes overview
description: The Plane API v2 permission scheme object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, permission schemes, permission scheme object
---

# Permission schemes overview

Permission schemes are the named bundles of grants a role can carry.

<div class="api-two-column">
<div class="api-left">

## The permission scheme object

### Attributes

- `description` _string_

  Free-form description.

- `id` _string (uuid)_

  Unique identifier.

- `is_system` _boolean_

  Whether is system.

- `name` _string_

  Display name.

- `namespace` _string_

  The namespace.

- `permissions` _array of string_

  The permissions.

- `slug` _string_

  The slug.

- `sort_order` _integer_

  Manual ordering weight. Lower sorts first.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE PERMISSION SCHEME OBJECT">

```json
{
  "description": "What this is for.",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "is_system": false,
  "name": "Example name",
  "namespace": "instance",
  "permissions": ["example"],
  "slug": "my-team",
  "sort_order": 65535
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method | Path                                                 | Description             |
| ------ | ---------------------------------------------------- | ----------------------- |
| `GET`  | `/api/v2/workspaces/{slug}/permission-schemes/`      | List permission schemes |
| `GET`  | `/api/v2/workspaces/{slug}/permission-schemes/{pk}/` | Get a permission scheme |

## Response shaping

Every permission scheme read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
