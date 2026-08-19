---
title: List workspace members
description: List the members of a Plane workspace with the v2 REST API. Role and member filters, search, ordering, pagination, ?expand=member, OAuth scopes, and code examples.
keywords: plane api v2, list workspace members, workspace roster, member_id filter, role filter, expand member, GET members
---

# List workspace members

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/members/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Return the workspace's active member roster as a paginated list. This is the endpoint that resolves a person to the `member_id` you assign work to, and the one you poll to keep a user directory in sync with Plane.

The workspace roster is the superset of every project roster — anyone on a project is on this list too.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

Filters combine with `AND`. Check your spelling on `order_by` and `paginate` — neither is validated. An unrecognized `order_by` value silently falls back to the default ordering, and anything other than `paginate=cursor` silently uses offset pagination. A typo shows up as an unexpected sort order or envelope, not as an error.

<div class="params-list">

<ApiParam name="member_id" type="string (uuid)" :required="false">

Return the membership for one user. Use the `member_id__in` variant to look several users up at once, comma-separated — `?member_id__in=16c61a3a-512a-48ac-b0be-b6b46fe6f430,7f2b9e04-6c1d-4a58-9e3b-0d4c8a2f6b71`.

This is the cheap way to answer "is this person still in the workspace, and what is their role now?" without paging the whole roster.

</ApiParam>

<ApiParam name="role" type="string" :required="false">

Return only members holding this role slug, for example `?role=owner`. Use `role__in` for several roles at once, comma-separated.

The value is a plain string, not a fixed enum — custom roles are matched by their own slug.

</ApiParam>

<ApiParam name="search" type="string" :required="false">

A search term matched against the member's user record, so you can find someone by name or email without expanding first.

</ApiParam>

</div>
</div>

<div class="params-section">

### Expansion

<div class="params-list">

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed alongside the ids: `member` (the member's user object).

Expansion is separate-key: `?expand=state` keeps `state_id` and adds a `state` object next to it, so an id is never replaced by an object. An unknown value is a `400`.

`?fields=` and `?expand=` are independent namespaces. Relation names are not valid `?fields=` tokens (and vice versa), and an expanded object survives field filtering — `?fields=id,name&expand=state` returns `id`, `name` and `state`. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

<div class="params-section">

### Ordering

<div class="params-list">

<ApiParam name="order_by" type="string" :required="false">

Field to sort by. Prefix with `-` for descending.

- `created_at` , `-created_at` — when the person joined the workspace
- `id` , `-id`

There is no ordering by name or role; sort the page client-side, or expand and sort on `display_name`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Pagination

<div class="params-list">

<ApiParam name="per_page" type="integer" :required="false">

Page size. Defaults to 50, maximum 200.

</ApiParam>

<ApiParam name="offset" type="integer" :required="false">

Number of rows to skip from the start of the result set. Maximum 10000. Read `next` from the response rather than computing offsets yourself.

</ApiParam>

<ApiParam name="paginate" type="string" :required="false">

Set to `cursor` for the COUNT-free keyset envelope, which returns `next_cursor` and `has_more` instead of `next` and `total_count`. Worth it when you are walking a large workspace end to end.

</ApiParam>

<ApiParam name="count" type="boolean" :required="false">

Defaults to `true`. Set to `false` to skip the `COUNT(*)` behind `total_count`; the field is then omitted from the response.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return on each row. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `id`, `member_id`, `role`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.members:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read this workspace roster.                           |
| `404`  | `not_found`        | No such workspace, or it's outside your tenant.                                      |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

::: info Membership id versus user id
`id` identifies the membership row; `member_id` identifies the person. Key caches and joins on `member_id` — the same user has a different `id` on every roster they appear in. See [Members overview](/api-reference/v2/members/overview).
:::

::: info Roles gate writes, not this read
A narrow role shows up as `403` on the write you attempted. A `409 work_item_types_managed_at_workspace` or `work_item_types_managed_at_project` is not a role problem at all — see [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

</div>

<div class="api-right">

<CodePanel title="List workspace members" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/members/?expand=member&per_page=50" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/members/",
    headers={"X-Api-Key": "your-api-key"},
    params={"expand": "member", "per_page": 50},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const params = new URLSearchParams({ expand: "member", per_page: "50" });
const response = await fetch(`https://api.plane.so/api/v2/workspaces/my-team/members/?${params}`, {
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
  "data": [
    {
      "id": "c1b7e4a9-2f66-4a1d-9c3b-7d5e2f8a1b40",
      "member_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
      "role": "owner",
      "member": {
        "id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
        "display_name": "Priya Raghavan",
        "avatar_url": "https://assets.plane.so/avatars/16c61a3a.png",
        "email": "priya@example.com"
      }
    },
    {
      "id": "3e8a5d17-9c40-4b2f-81d6-4a7f2b9e0c53",
      "member_id": "7f2b9e04-6c1d-4a58-9e3b-0d4c8a2f6b71",
      "role": "member",
      "member": {
        "id": "7f2b9e04-6c1d-4a58-9e3b-0d4c8a2f6b71",
        "display_name": "Devansh Kapoor",
        "avatar_url": null,
        "email": "devansh@example.com"
      }
    }
  ],
  "next": null,
  "previous": null,
  "total_count": 2,
  "pagination": {
    "style": "offset"
  }
}
```

</ResponsePanel>

<ResponsePanel status="200" title="WITHOUT ?expand=member">

```json
{
  "data": [
    {
      "id": "c1b7e4a9-2f66-4a1d-9c3b-7d5e2f8a1b40",
      "member_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
      "role": "owner"
    },
    {
      "id": "3e8a5d17-9c40-4b2f-81d6-4a7f2b9e0c53",
      "member_id": "7f2b9e04-6c1d-4a58-9e3b-0d4c8a2f6b71",
      "role": "member"
    }
  ],
  "next": null,
  "previous": null,
  "total_count": 2,
  "pagination": {
    "style": "offset"
  }
}
```

</ResponsePanel>

</div>
</div>

::: tip Expanding a page costs one query, not one per row
`?expand=member` loads the users in bulk, so a 200-row page is a single extra query. Prefer one expanded page over 200 follow-up requests.
:::
