---
title: Create a intake work item
description: Create a intake work item with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, create a intake work item, intake work items, intakes create
---

# Create a intake work item

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/intake-issues/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Intake work items are the triage queue for a project. Create a intake work item.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string" :required="true">

The project the resource belongs to. Accepts the project UUID or its bare identifier, for example `ENG`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="description_html" type="string" :required="false">

Rich-text body as HTML. This is the field the Plane editor round-trips.

</ApiParam>

<ApiParam name="duplicate_to_id" type="string (uuid)" :required="false">

Id of the related duplicate to.

Nullable.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this record, for sync and import correlation.

Nullable.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `github` or `jira`.

Nullable.

</ApiParam>

<ApiParam name="name" type="string" :required="false">

Display name.

</ApiParam>

<ApiParam name="priority" type="string" :required="false">

- `none` - none
- `low` - low
- `medium` - medium
- `high` - high
- `urgent` - urgent

One of `none`, `low`, `medium`, `high`, `urgent`.

</ApiParam>

<ApiParam name="snoozed_till" type="string (date-time)" :required="false">

The snoozed till.

Nullable.

</ApiParam>

<ApiParam name="source" type="string" :required="false">

The source.

</ApiParam>

<ApiParam name="source_email" type="string" :required="false">

The source email.

Nullable.

</ApiParam>

<ApiParam name="status" type="integer" :required="false">

The status.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted**, not returned as `null`. `id` always comes back. Pass `all` for every requestable field. An unknown name is a `400`. See [Sparse fields](/api-reference/v2/sparse-fields).

Requestable here: `created_at`, `created_by_id`, `description_html`, `duplicate_to_id`, `external_id`, `external_source`, `id`, `intake_id`, `name`, `priority`, `snoozed_till`, `source`, `source_email`, `state_id`, `status`, `work_item_id`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.intakes:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                               |
| ------ | ------------------------ | ----------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | The request body or a query parameter failed validation.                            |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                     |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan or is switched off. |
| `403`  | `forbidden`              | Your role or token scope doesn't allow this.                                        |
| `404`  | `not_found`              | No such resource, or it's outside your tenant.                                      |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                |
| `409`  | `conflict`               | A business rule blocks the write — see the notes above.                             |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                            |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                 |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                          |

</div>

</div>

<div class="api-right">

<CodePanel title="Create a intake work item" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/intake-issues/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "description_html": "<p>Details go here.</p>",
  "duplicate_to_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "external_id": null
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/intake-issues/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "description_html": "<p>Details go here.</p>",
        "duplicate_to_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
        "external_id": None
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/intake-issues/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description_html: "<p>Details go here.</p>",
      duplicate_to_id: "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      external_id: null,
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
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "description_html": "<p>Details go here.</p>",
  "duplicate_to_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "external_id": null,
  "external_source": null,
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "intake_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "name": "Example name",
  "priority": "high",
  "snoozed_till": "2026-01-14T09:22:41.478363Z",
  "source": "example",
  "source_email": "example",
  "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "status": -2,
  "work_item_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
}
```

</ResponsePanel>

</div>
</div>
