---
title: List projects
description: List projects with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, list projects, projects, projects list
---

# List projects

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Projects are the main container for work items in a workspace. List the projects you can see. Results are scoped to the path and to what your token is allowed to read.

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

<div class="params-list">

<ApiParam name="count" type="boolean" :required="false">

Set to false to skip the total_count COUNT(\*) (omits total_count).

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Filter by `external_id`.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

Filter by `external_source`.

</ApiParam>

<ApiParam name="identifier" type="string" :required="false">

Filter by `identifier`.

</ApiParam>

<ApiParam name="include_archived" type="boolean" :required="false">

Filter by `include_archived`.

</ApiParam>

<ApiParam name="is_archived" type="boolean" :required="false">

Filter by `is_archived`.

</ApiParam>

<ApiParam name="key" type="string" :required="false">

Filter by `key`.

</ApiParam>

<ApiParam name="name" type="string" :required="false">

Filter by `name`.

</ApiParam>

<ApiParam name="network" type="integer" :required="false">

Filter by `network`.

</ApiParam>

<ApiParam name="offset" type="integer" :required="false">

Number of rows to skip from the start of the result set.

</ApiParam>

<ApiParam name="order_by" type="string" :required="false">

Field to order the list by. Prefix with '-' for descending (e.g. '-created_at'). Annotation-backed orders sort semantically and ride the default offset page.

</ApiParam>

<ApiParam name="paginate" type="string" :required="false">

Set to 'cursor' to opt into the COUNT-free keyset cursor envelope (use for deep traversal); omit for the default offset envelope with total_count.

One of `cursor`.

</ApiParam>

<ApiParam name="per_page" type="integer" :required="false">

Page size (max 200).

</ApiParam>

<ApiParam name="priority" type="string" :required="false">

- `none` - None
- `low` - Low
- `medium` - Medium
- `high` - High
- `urgent` - Urgent

One of `high`, `low`, `medium`, `none`, `urgent`.

</ApiParam>

<ApiParam name="priority__in" type="array of string" :required="false">

Multiple values may be separated by commas.

- `none` - None
- `low` - Low
- `medium` - Medium
- `high` - High
- `urgent` - Urgent

</ApiParam>

<ApiParam name="search" type="string" :required="false">

A search term.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from each row, not returned as `null`. `id` always comes back. Pass `all` for every requestable field.

An unknown name is a `400` that names the valid set, so a typo can't silently cost you the saving. See [Sparse fields](/api-reference/v2/sparse-fields).

Requestable here: `archive_in`, `archived_at`, `close_in`, `cover_image`, `cover_image_url`, `created_at`, `created_by_id`, `cycle_view`, `default_assignee_id`, `default_state_id`, `description`, `emoji`, `estimate_id`, `external_id`, `external_source`, `guest_view_all_features`, `icon_prop`, `id`, `identifier`, `intake_view`, `is_issue_type_enabled`, `is_time_tracking_enabled`, `issue_views_view`, `logo_props`, `module_view`, `name`, `network`, `page_view`, `priority`, `project_lead_id`, `start_date`, `state_id`, `target_date`, `timezone`.

</ApiParam>

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed: `default_assignee`, `project_lead`.

Expansion is separate-key — `?expand=state` keeps `state_id` and adds a `state` object next to it. `?fields=` and `?expand=` are independent: naming a relation in `?fields=` is a `400`, and expanded objects survive field filtering. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                               |
| ------ | ------------------ | ----------------------------------------------------------------------------------- |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                     |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan or is switched off. |
| `403`  | `forbidden`        | Your role or token scope doesn't allow this.                                        |
| `404`  | `not_found`        | No such resource, or it's outside your tenant.                                      |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                          |

</div>

</div>

<div class="api-right">

<CodePanel title="List projects" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v2/workspaces/my-team/projects/", {
  method: "GET",
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
      "archive_in": 1,
      "archived_at": null,
      "close_in": 1,
      "cover_image": "https://example.com/cover.png",
      "cover_image_url": "https://example.com",
      "created_at": "2026-01-14T09:22:41.478363Z",
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
      "cycle_view": false,
      "default_assignee_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "default_state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "description": "What this is for.",
      "emoji": "1f680",
      "estimate_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "external_id": null,
      "external_source": null,
      "guest_view_all_features": false,
      "icon_prop": null,
      "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
      "identifier": "PROJ",
      "intake_view": false,
      "is_issue_type_enabled": false,
      "is_time_tracking_enabled": false,
      "issue_views_view": false,
      "logo_props": null,
      "module_view": false,
      "name": "Example name",
      "network": 0,
      "page_view": false,
      "priority": "high",
      "project_lead_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "start_date": "2026-01-12",
      "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "target_date": "2026-01-20",
      "timezone": "Africa/Abidjan"
    }
  ],
  "next": 1,
  "pagination": {
    "style": "offset"
  },
  "previous": 1,
  "total_count": 3
}
```

</ResponsePanel>

</div>
</div>
