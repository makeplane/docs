---
title: Update a cycle
description: Partially update a Plane cycle with the v2 REST API. PATCH body parameters, date and time zone changes, OAuth scopes, error codes, and code examples.
keywords: plane api v2, update cycle, patch cycle, reschedule cycle, start_date, end_date, PATCH cycles
---

# Update a cycle

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/cycles/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Change a cycle in place — rename it, reschedule it, or attach correlation ids after an import.

The update is partial. Fields you omit are left untouched, and omitting a field is not the same as sending `null`: send `"end_date": null` to clear a date, omit `end_date` to keep it.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the cycle belongs to.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The cycle to update.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="name" type="string" :required="false">

New display name, unique within the project. Maximum 255 characters. Renaming onto a name another cycle already holds returns `409 conflict`.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Free-form description of what the cycle covers.

</ApiParam>

<ApiParam name="start_date" type="string (date-time)" :required="false">

New opening date-time, in ISO 8601. Send `null` to unschedule the start.

</ApiParam>

<ApiParam name="end_date" type="string (date-time)" :required="false">

New closing date-time, in ISO 8601. Send `null` to unschedule the end.

</ApiParam>

<ApiParam name="timezone" type="string" :required="false">

The IANA time zone the cycle's dates are interpreted in, for example `America/New_York` or `UTC`. Changing it re-anchors where the existing boundaries fall locally, so send it together with the dates when you are moving a cycle between regions. Any value outside the IANA list is rejected with `400 invalid_request`.

</ApiParam>

<ApiParam name="sort_order" type="number" :required="false">

Ordering weight for the cycle within the project. Lower values sort first when you list with `?order_by=sort_order`.

</ApiParam>

<ApiParam name="logo_props" type="any" :required="false">

JSON blob holding the cycle's icon configuration. Replaces the stored value outright — it is not merged key by key.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this cycle. Maximum 255 characters, nullable.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `jira`. Maximum 255 characters, nullable.

</ApiParam>

</div>
</div>

::: warning There is no `PUT`
v2 updates are `PATCH` only. A `PUT` to this path returns `405 method_not_allowed`. Audit fields such as `created_at`, `created_by_id`, and `owned_by_id` are read-only — including them has no effect.
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

| Status | Code                     | Cause                                                                                   |
| ------ | ------------------------ | --------------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | A name over 255 characters, an unparseable date, or a `timezone` outside the IANA list. |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                         |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.    |
| `403`  | `forbidden`              | Your role or token scope can't update cycles in this project.                           |
| `404`  | `not_found`              | No such cycle, wrong project, or the record is outside your tenant.                     |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                    |
| `409`  | `conflict`               | Another cycle in the project already uses this name.                                    |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                     |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                              |

</div>

</div>

<div class="api-right">

<CodePanel title="Update a cycle" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/cycles/7c1f9a4e-3b6d-4a52-8f0c-2d9e6b18c3a7/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Sprint 24 (extended)",
  "end_date": "2026-01-26T00:00:00Z"
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/cycles/7c1f9a4e-3b6d-4a52-8f0c-2d9e6b18c3a7/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "name": "Sprint 24 (extended)",
        "end_date": "2026-01-26T00:00:00Z",
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/cycles/7c1f9a4e-3b6d-4a52-8f0c-2d9e6b18c3a7/",
  {
    method: "PATCH",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Sprint 24 (extended)",
      end_date: "2026-01-26T00:00:00Z",
    }),
  },
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "id": "7c1f9a4e-3b6d-4a52-8f0c-2d9e6b18c3a7",
  "name": "Sprint 24 (extended)",
  "description": "Checkout rewrite and billing cleanup",
  "start_date": "2026-01-05T00:00:00Z",
  "end_date": "2026-01-26T00:00:00Z",
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

<ResponsePanel status="400">

```json
{
  "type": "invalid_request",
  "code": "invalid_request",
  "detail": "The request body failed validation.",
  "errors": [
    {
      "field": "timezone",
      "code": "invalid_choice",
      "message": "\"America/Atlantis\" is not a valid choice."
    }
  ]
}
```

</ResponsePanel>

</div>
</div>
