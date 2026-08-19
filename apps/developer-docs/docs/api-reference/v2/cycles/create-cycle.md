---
title: Create a cycle
description: Create a time-boxed cycle in a Plane project with the v2 REST API. Body parameters, dates and time zones, OAuth scopes, error codes, and code examples.
keywords: plane api v2, create cycle, sprint, iteration, start_date, end_date, cycle timezone, POST cycles
---

# Create a cycle

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/cycles/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Add a cycle to a project. Only `name` is required — leave the dates off to create an unscheduled cycle and fill them in later with [Update a cycle](/api-reference/v2/cycles/update-cycle).

Cycle names must be unique within a project. Reusing one returns `409 conflict`.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project to add the cycle to.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="name" type="string" :required="true">

Display name for the cycle, unique within the project. Maximum 255 characters.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Free-form description of what the cycle covers.

</ApiParam>

<ApiParam name="start_date" type="string (date-time)" :required="false">

When the cycle opens, as an ISO 8601 date-time. Nullable — omit it or send `null` for an unscheduled cycle.

</ApiParam>

<ApiParam name="end_date" type="string (date-time)" :required="false">

When the cycle closes, as an ISO 8601 date-time. Nullable.

</ApiParam>

<ApiParam name="timezone" type="string" :required="false">

The IANA time zone the cycle's dates are interpreted in, for example `America/New_York`, `Asia/Kolkata`, `Europe/London`, or `UTC`. Set it to the team's working zone so a cycle boundary lands at local midnight instead of UTC midnight. Any value outside the IANA list is rejected with `400 invalid_request`.

</ApiParam>

<ApiParam name="sort_order" type="number" :required="false">

Ordering weight for the cycle within the project. Lower values sort first when you list with `?order_by=sort_order`.

</ApiParam>

<ApiParam name="logo_props" type="any" :required="false">

JSON blob holding the cycle's icon configuration, as written by Plane clients. Stored and returned unchanged.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this cycle, for sync and import correlation. Maximum 255 characters. You can find the cycle again later with `?external_id=` on [List cycles](/api-reference/v2/cycles/list-cycles).

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `jira` or `linear`. Maximum 255 characters.

</ApiParam>

</div>
</div>

::: info Owner is not settable
`owned_by_id` is returned on the response but is not a body parameter — Plane assigns cycle ownership and the API does not accept an override.
:::

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `created_at`, `created_by_id`, `description`, `end_date`, `external_id`, `external_source`, `id`, `logo_props`, `name`, `owned_by_id`, `sort_order`, `start_date`, `timezone`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed alongside the ids: `owned_by` (the cycle owner).

Expansion is separate-key: `?expand=state` keeps `state_id` and adds a `state` object next to it, so an id is never replaced by an object. An unknown value is a `400`.

`?fields=` and `?expand=` are independent namespaces. Relation names are not valid `?fields=` tokens (and vice versa), and an expanded object survives field filtering — `?fields=id,name&expand=state` returns `id`, `name` and `state`. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.cycles:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                                   |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | Missing `name`, a name over 255 characters, an unparseable date, or a `timezone` outside the IANA list. |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                                         |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.                    |
| `403`  | `forbidden`              | Your role or token scope can't create cycles in this project.                                           |
| `404`  | `not_found`              | No such workspace or project, or it's outside your tenant.                                              |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                                    |
| `409`  | `conflict`               | A cycle with this name already exists in the project.                                                   |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                                |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                                     |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                                              |

</div>

</div>

<div class="api-right">

<CodePanel title="Create a cycle" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/cycles/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Sprint 24",
  "description": "Checkout rewrite and billing cleanup",
  "start_date": "2026-01-05T00:00:00Z",
  "end_date": "2026-01-19T00:00:00Z",
  "timezone": "America/New_York"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/cycles/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "name": "Sprint 24",
        "description": "Checkout rewrite and billing cleanup",
        "start_date": "2026-01-05T00:00:00Z",
        "end_date": "2026-01-19T00:00:00Z",
        "timezone": "America/New_York",
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/cycles/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Sprint 24",
      description: "Checkout rewrite and billing cleanup",
      start_date: "2026-01-05T00:00:00Z",
      end_date: "2026-01-19T00:00:00Z",
      timezone: "America/New_York",
    }),
  },
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="201">

```json
{
  "id": "7c1f9a4e-3b6d-4a52-8f0c-2d9e6b18c3a7",
  "name": "Sprint 24",
  "description": "Checkout rewrite and billing cleanup",
  "start_date": "2026-01-05T00:00:00Z",
  "end_date": "2026-01-19T00:00:00Z",
  "timezone": "America/New_York",
  "owned_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "sort_order": 65535,
  "logo_props": {},
  "external_id": null,
  "external_source": null,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
}
```

</ResponsePanel>

<ResponsePanel status="409">

```json
{
  "type": "conflict",
  "code": "conflict",
  "detail": "A cycle with this name already exists in this project."
}
```

</ResponsePanel>

</div>
</div>
