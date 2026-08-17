---
title: Upsert a estimate point
description: Upsert a estimate point with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, upsert a estimate point, estimate points, estimate points upsert
---

# Upsert a estimate point

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/estimates/{estimate_id}/points/upsert/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Estimate points are the individual values inside a project estimate scale. Create a estimate point, or update the existing one that carries the same `(external_source, external_id)` pair.

- Both `external_source` and `external_id` are required — without them there is nothing to match on and the request is a `400`.
- A created record answers `201` with `X-Plane-Upsert: created`; an updated one answers `200` with `X-Plane-Upsert: updated`. Branch on the header rather than guessing from the status.
- Upsert is safe for **sequential** importers. Two simultaneous upserts of the same key can each miss and each create, so serialize your writes per key.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string" :required="true">

The project the resource belongs to. Accepts the project UUID or its bare identifier, for example `ENG`.

</ApiParam>

<ApiParam name="estimate_id" type="string (uuid)" :required="true">

The estimate the points belong to.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="value" type="string" :required="true">

The value.

Maximum 255 characters.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Free-form description.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this record, for sync and import correlation.

Maximum 255 characters. Nullable.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `github` or `jira`.

Maximum 255 characters. Nullable.

</ApiParam>

<ApiParam name="key" type="integer" :required="false">

The key.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted**, not returned as `null`. `id` always comes back. Pass `all` for every requestable field. An unknown name is a `400`. See [Sparse fields](/api-reference/v2/sparse-fields).

Requestable here: `created_at`, `created_by_id`, `description`, `estimate_id`, `external_id`, `external_source`, `id`, `key`, `value`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.estimates:write`

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

<CodePanel title="Upsert a estimate point" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/estimates/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/points/upsert/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "value": "example",
  "description": "What this is for.",
  "external_id": null,
  "external_source": null
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/estimates/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/points/upsert/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "value": "example",
        "description": "What this is for.",
        "external_id": None,
        "external_source": None
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/estimates/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/points/upsert/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      value: "example",
      description: "What this is for.",
      external_id: null,
      external_source: null,
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
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "description": "What this is for.",
  "estimate_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "external_id": null,
  "external_source": null,
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "key": 1,
  "value": "example"
}
```

</ResponsePanel>

</div>
</div>
