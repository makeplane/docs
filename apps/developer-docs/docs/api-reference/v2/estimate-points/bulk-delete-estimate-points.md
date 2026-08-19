---
title: Bulk delete estimate points
description: Bulk delete up to 50 estimate points in one call with the Plane v2 REST API. Per-row results, atomic all_or_none mode, OAuth scopes, error codes, and code examples.
keywords: plane api v2, bulk-delete estimate points, bulk write, all_or_none, partial success, per-row results
---

# Bulk delete estimate points

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/estimates/{estimate_id}/points/bulk-delete/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Delete up to **50** estimate points in one request. Each row goes through the same path as a single [Delete a estimate point](/api-reference/v2/estimate-points/delete-estimate-point), so delete guards still apply per row.

::: warning `200` does not mean every row succeeded
By default this endpoint reports **partial success**: it answers `200` whenever the batch was processed, even if some rows failed. Read `failed` and the per-row `results` rather than branching on the status code alone.

If you want all-or-nothing instead, send `all_or_none: true` and treat `409` as the failure signal.
:::

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the estimate points belong to. Accepts the project UUID or its bare identifier, for example `ENG`.

</ApiParam>

<ApiParam name="estimate_id" type="string (uuid)" :required="true">

The estimate the points belong to.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="ids" type="array of string (uuid)" :required="true">

The ids of the estimate points to delete. Between 1 and **50** per call. A value that isn't a UUID is a `400` for the whole envelope, not a failed row.

</ApiParam>

<ApiParam name="all_or_none" type="boolean" :required="false">

Defaults to `false`. Leave it off for partial success: each row runs in its own savepoint, successful rows commit, and you read the breakdown.

Set it to `true` to make the batch atomic. Every row is still evaluated, but if **any** row fails the whole batch is discarded and the call answers `409` instead of the `200` envelope. Side effects scheduled by the rows follow the same outcome.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.estimates:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                            |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------ |
| `400`  | `invalid_request`        | The envelope itself is malformed — `ids` missing or empty, more than 50 rows, or a non-UUID id.  |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                                  |
| `403`  | `forbidden`              | Your role or token scope can't write estimate points in this project.                            |
| `404`  | `not_found`              | No such workspace or project, or it's outside your tenant.                                       |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                             |
| `409`  | `conflict`               | An `all_or_none: true` batch had at least one failing row, so the whole batch was discarded.     |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                         |
| `415`  | `unsupported_media_type` | The body wasn't JSON. These routes are JSON-only — a form or multipart body can't express `ids`. |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                                       |

</div>

</div>

<div class="api-right">

<CodePanel title="Bulk delete estimate points" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/estimates/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/points/bulk-delete/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "ids": [
    "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
    "9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88"
  ]
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/estimates/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/points/bulk-delete/",
    headers={"X-Api-Key": "your-api-key"},
    json={
    "ids": [
        "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
        "9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88"
    ]
},
)
body = response.json()
print(body["succeeded"], body["failed"])
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/estimates/9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88/points/bulk-delete/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ids: ["b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53", "9c1f0b3d-6d2e-4c9a-8b41-2f7e5a0d6c88"],
    }),
  },
);
const body = await response.json();
console.log(body.succeeded, body.failed);
```

</template>
</CodePanel>

<ResponsePanel status="200" title="PARTIAL SUCCESS (DEFAULT)">

```json
{
  "results": [
    {
      "index": 0,
      "result": "deleted",
      "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53"
    },
    {
      "index": 1,
      "result": "failed",
      "type": "not_found",
      "code": "not_found",
      "detail": "No estimate point matches the given query."
    }
  ],
  "succeeded": 1,
  "failed": 1
}
```

</ResponsePanel>

<ResponsePanel status="409" title="ALL_OR_NONE BATCH DISCARDED">

```json
{
  "type": "conflict",
  "code": "conflict",
  "detail": "No rows were written because all_or_none was set and at least one row failed.",
  "errors": [
    {
      "field": "ids.1",
      "code": "not_found",
      "message": "No estimate point matches the given query."
    }
  ]
}
```

</ResponsePanel>

</div>
</div>

## Reading the response

The `200` envelope has three members:

- `results` — one row per input row, in request order, each carrying its `index`
- `succeeded` / `failed` — counts, so you can branch without walking the array

A succeeded row is `{ index, result, id }` where `result` is `deleted`. A failed row keeps the same members as a top-level error body — `type`, `code`, `detail` and, on validation failures, `errors[]` — plus `index` and `result: "failed"`. So the same error-handling code works per row as at the top level. See [Errors](/api-reference/v2/errors).

## Atomic batches

With `all_or_none: true`, every row is still evaluated — you get the full picture of what would have failed, not just the first problem — and then the batch is rolled back. The `409` body's `errors[]` entries are prefixed with the row index, as `ids.<index>`, so you can map each complaint back to the row that caused it.

Because the rollback covers the whole batch, side effects scheduled on commit — activity feed entries, webhooks — are discarded with it.

## Limits and related routes

- **50 rows per call**, and at least 1. Exceeding the cap is a `400` for the whole envelope.
- **JSON only.** A form or multipart body can't express `ids`, so these routes reject it with `415` rather than silently misreading the payload.
- **Reconciling on external ids is not bulk's job.** Use [Upsert a estimate point](/api-reference/v2/estimate-points/upsert-estimate-point) per row, or list and diff.
- `?fields=` does not apply here — the response is a per-row result envelope, not a estimate point body. See [Sparse fields](/api-reference/v2/sparse-fields).
