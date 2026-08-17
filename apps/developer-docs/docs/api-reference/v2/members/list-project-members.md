---
title: List project members
description: List the members of a Plane project with the v2 REST API. Role and member filters, search, ordering, pagination, ?expand=member, OAuth scopes, and code examples.
keywords: plane api v2, list project members, project roster, member_id filter, role filter, expand member, GET project members
---

# List project members

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/members/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Return one project's active member roster as a paginated list. Reach for this when you need the people who can actually be assigned work in a project — the workspace roster is wider, and includes members with no access to this project.

Roles here are project roles, so the same person can come back as `member` on the workspace roster and as `contributor` on this one.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project whose roster you want. A project id from another workspace returns `404`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

Filters combine with `AND`. Check your spelling on `order_by` and `paginate` — neither is validated. An unrecognized `order_by` value silently falls back to the default ordering, and anything other than `paginate=cursor` silently uses offset pagination. A typo shows up as an unexpected sort order or envelope, not as an error.

<div class="params-list">

<ApiParam name="member_id" type="string (uuid)" :required="false">

Return the membership for one user. Use `member_id__in` to check several at once, comma-separated.

Pairing `?member_id=<user>` with `?per_page=1` is the cheapest membership check there is: an empty `data` array means that user is not on this project.

</ApiParam>

<ApiParam name="role" type="string" :required="false">

Return only members holding this role slug, for example `?role=contributor`. Use `role__in` for several roles at once, comma-separated.

The value is a plain string, not a fixed enum — a custom role is matched by its own slug.

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

- `created_at` , `-created_at` — when the person was added to the project
- `id` , `-id`

</ApiParam>

</div>
</div>

<div class="params-section">

### Pagination

<div class="params-list">

<ApiParam name="per_page" type="integer" :required="false">

Page size. Defaults to 50, maximum 200. Most project rosters fit in a single page.

</ApiParam>

<ApiParam name="offset" type="integer" :required="false">

Number of rows to skip from the start of the result set. Maximum 10000. Read `next` from the response rather than computing offsets yourself.

</ApiParam>

<ApiParam name="paginate" type="string" :required="false">

Set to `cursor` for the COUNT-free keyset envelope, which returns `next_cursor` and `has_more` instead of `next` and `total_count`.

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

`projects.members:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read this project's roster.                           |
| `404`  | `not_found`        | No such workspace or project, or it's outside your tenant.                           |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

::: info Validate assignees against this list, not the workspace one
A `member_id` that is on the workspace roster but not on this project is not a valid assignee for the project's work items. Check membership here before writing `assignee_ids`.
:::

::: info A `409` is not a permission signal
`403` means the caller's role or scope is too narrow. `409 work_item_types_managed_at_workspace` or `work_item_types_managed_at_project` means the write belongs on the other surface, whatever the caller's role is. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

</div>

<div class="api-right">

<CodePanel title="List project members" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/members/?expand=member" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/members/",
    headers={"X-Api-Key": "your-api-key"},
    params={"expand": "member"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const params = new URLSearchParams({ expand: "member" });
const response = await fetch(
  `https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/members/?${params}`,
  {
    headers: {
      "X-Api-Key": "your-api-key",
    },
  },
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "data": [
    {
      "id": "9d2f5c81-4b73-4e60-8a1f-2c9b6d3e7f04",
      "member_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
      "role": "contributor",
      "member": {
        "id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
        "display_name": "Priya Raghavan",
        "avatar_url": "https://assets.plane.so/avatars/16c61a3a.png",
        "email": "priya@example.com"
      }
    },
    {
      "id": "b5c07e29-1d84-4f36-9a72-6e13c8d5a0f7",
      "member_id": "7f2b9e04-6c1d-4a58-9e3b-0d4c8a2f6b71",
      "role": "release-manager",
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

<ResponsePanel status="404">

```json
{
  "type": "not_found",
  "code": "not_found",
  "detail": "No Project matches the given query."
}
```

</ResponsePanel>

</div>
</div>

::: tip Custom roles appear as their own slug
`release-manager` above is a custom role defined by the workspace. `role` has no enum in the schema, so treat any slug you do not recognize as a role you have no rules for rather than as bad data.
:::
