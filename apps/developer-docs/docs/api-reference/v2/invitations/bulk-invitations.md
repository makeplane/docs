---
title: Bulk write invitations
description: Bulk write invitations with the Plane v2 REST API. Parameters, sparse `?fields=` responses, OAuth scopes, error codes, and code examples.
keywords: plane api v2, bulk write invitations, invitations, members bulk
---

# Bulk write invitations

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/invitations/bulk/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Invitations are pending workspace membership offers. Write up to 100 invitations in one request, with a per-row result for each.

- Send `{"items": [...]}`, at most 100 per request. Add `"upsert": true` to match existing rows on `(external_source, external_id)` instead of always creating.
- The response is always `200`. Each row reports its own outcome, so a partial failure is reported rather than silently dropped — read `succeeded`/`failed` and the per-row `status`.
- Rows are written on independent savepoints: a failing row rolls back only itself.
- `?fields=` does not apply here — the bulk response is a per-row result envelope, not a resource body.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="emails" type="array of string (email)" :required="true">

The emails.

</ApiParam>

<ApiParam name="message" type="string" :required="false">

The message.

Nullable.

</ApiParam>

<ApiParam name="role" type="string" :required="false">

Role to grant.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted**, not returned as `null`. `id` always comes back. Pass `all` for every requestable field. An unknown name is a `400`. See [Sparse fields](/api-reference/v2/sparse-fields).

Requestable here: `accepted`, `created_at`, `created_by_id`, `email`, `id`, `message`, `responded_at`, `role`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.members:write`

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

<CodePanel title="Bulk write invitations" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/invitations/bulk/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "emails": [
    "ana@example.com"
  ],
  "message": "example",
  "role": "example"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/invitations/bulk/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "emails": [
            "ana@example.com"
        ],
        "message": "example",
        "role": "example"
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v2/workspaces/my-team/invitations/bulk/", {
  method: "POST",
  headers: {
    "X-Api-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    emails: ["ana@example.com"],
    message: "example",
    role: "example",
  }),
});
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="201">

```json
{
  "accepted": false,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "email": "ana@example.com",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "message": "example",
  "responded_at": "2026-01-14T09:22:41.478363Z",
  "role": "example"
}
```

</ResponsePanel>

</div>
</div>
