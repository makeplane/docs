---
title: List comments
description: List the comments on a Plane work item with the v2 REST API. Access filter, external id lookup, search, ordering, pagination, scopes, and code examples.
keywords: plane api v2, list work item comments, GET comments, comment access filter, comment search, comment pagination
---

# List comments

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/comments/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Return the comments on one work item. Comments are scoped to their parent work item, so this is
the only way to read a work item's discussion — reach for it when rendering a work item detail view or mirroring
a thread into another system.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is
`my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the work item belongs to.

</ApiParam>

<ApiParam name="work_item_id" type="string (uuid)" :required="true">

The work item whose comments you want. Comments never span work items, so this narrows the result set by
itself.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

**Filters**

<div class="params-list">

<ApiParam name="access" type="string" :required="false">

Return only comments with this visibility.

- `INTERNAL` — visible to the project team
- `EXTERNAL` — marked as visible outside the team

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Return comments carrying this identifier from your system. `external_id` is not a unique key, so this can match
more than one comment — pair it with `external_source` and handle a multi-row result.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

Return comments that came from this system, for example `github` or `zendesk`.

</ApiParam>

</div>

**Search**

<div class="params-list">

<ApiParam name="search" type="string" :required="false">

Match comments against their plain-text body (`comment_stripped`), so HTML markup in `comment_html` never
affects whether a term hits.

</ApiParam>

</div>

**Ordering**

<div class="params-list">

<ApiParam name="order_by" type="string" :required="false">

Field to sort by. Prefix with `-` for descending. Send it explicitly whenever order matters — a thread you
render should not depend on the server's unstated default.

- `created_at` — oldest first
- `-created_at` — newest first
- `id`
- `-id`

</ApiParam>

</div>

**Pagination**

<div class="params-list">

<ApiParam name="per_page" type="integer" :required="false">

Page size. Defaults to 50, maximum 200.

</ApiParam>

<ApiParam name="offset" type="integer" :required="false">

Number of rows to skip from the start of the result set. Maximum 10000 — for deeper traversal switch to cursor
pagination.

</ApiParam>

<ApiParam name="paginate" type="string" :required="false">

Set to `cursor` to opt into the COUNT-free keyset envelope instead of the default offset envelope. The response
then carries `next_cursor` and `has_more`; send the value of `next_cursor` back as `?cursor=` to fetch the next
page. See [Pagination](/api-reference/v2/pagination) for the full envelope.

</ApiParam>

<ApiParam name="count" type="boolean" :required="false">

Defaults to `true`. Set to `false` to skip the `COUNT(*)` and omit `total_count` from the offset envelope.

</ApiParam>

</div>

::: info `access` is validated, `order_by` is not
`access` is checked against its allowed values — an unrecognized value is rejected as a `400 invalid_request`, so you
never get a silently empty list back. `order_by` is not checked: an unrecognized value falls back to the default
ordering, so check your spelling there because a typo shows up as an unexpected sort order rather than an error.
:::

</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return on each row. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `access`, `actor_id`, `comment_html`, `comment_stripped`, `created_at`, `created_by_id`, `edited_at`, `external_id`, `external_source`, `id`, `work_item_id`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed alongside the ids: `actor` (the comment author).

Expansion is separate-key: `?expand=state` keeps `state_id` and adds a `state` object next to it, so an id is never replaced by an object. An unknown value is a `400`.

`?fields=` and `?expand=` are independent namespaces. Relation names are not valid `?fields=` tokens (and vice versa), and an expanded object survives field filtering — `?fields=id,name&expand=state` returns `id`, `name` and `state`. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_items.comments:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read this work item.                                  |
| `404`  | `not_found`        | No such workspace, project, or work item, or it's outside your tenant.               |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="List comments" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/comments/?access=INTERNAL&per_page=50" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/comments/",
    headers={"X-Api-Key": "your-api-key"},
    params={"access": "INTERNAL", "per_page": 50},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/comments/?access=INTERNAL&per_page=50",
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

<ResponsePanel status="200" title="OFFSET ENVELOPE (DEFAULT)">

```json
{
  "data": [
    {
      "id": "c1f7a3d9-2b64-4f80-9c1a-3d5e8b2a6c47",
      "work_item_id": "8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13",
      "comment_html": "<p>Deployed the fix to staging. Please re-test.</p>",
      "comment_stripped": "Deployed the fix to staging. Please re-test.",
      "access": "INTERNAL",
      "actor_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
      "external_id": null,
      "external_source": null,
      "edited_at": null,
      "created_at": "2026-01-14T09:22:41.478363Z",
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
    },
    {
      "id": "a2e04c77-3f19-4d5b-8a6e-91b0c7d2e845",
      "work_item_id": "8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13",
      "comment_html": "<p>Re-tested on staging, the login flow is clean now.</p>",
      "comment_stripped": "Re-tested on staging, the login flow is clean now.",
      "access": "INTERNAL",
      "actor_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
      "external_id": "ZD-88412",
      "external_source": "zendesk",
      "edited_at": "2026-01-15T11:04:02.115740Z",
      "created_at": "2026-01-15T10:58:19.902314Z",
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
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

<ResponsePanel status="200" title="CURSOR ENVELOPE (?PAGINATE=CURSOR)">

```json
{
  "data": [
    {
      "id": "c1f7a3d9-2b64-4f80-9c1a-3d5e8b2a6c47",
      "work_item_id": "8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13",
      "comment_html": "<p>Deployed the fix to staging. Please re-test.</p>",
      "comment_stripped": "Deployed the fix to staging. Please re-test.",
      "access": "INTERNAL",
      "actor_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
      "external_id": null,
      "external_source": null,
      "edited_at": null,
      "created_at": "2026-01-14T09:22:41.478363Z",
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
    }
  ],
  "next_cursor": "b3A9MTcxNDpjMWY3YTNkOQ",
  "has_more": true,
  "pagination": {
    "style": "cursor"
  }
}
```

</ResponsePanel>

</div>
</div>
