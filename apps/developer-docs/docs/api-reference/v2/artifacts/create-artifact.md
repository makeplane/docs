---
title: Create an artifact
description: Create a versioned HTML artifact in a Plane workspace with the v2 REST API. Body parameters, data modes, OAuth scopes, error codes, and code examples.
keywords: plane api v2, create artifact, applets, dashboard html, data_mode, snapshot, live, POST artifacts
---

# Create an artifact

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/artifacts/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Create an artifact together with its first HTML version. The new artifact starts at `current_version: 1` and is
unpublished until you call [Publish an artifact](/api-reference/v2/artifacts/publish-artifact).

Requires the **Applets** feature and workspace **admin** or **owner** — see
[Artifacts overview](/api-reference/v2/artifacts/overview).

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

<ApiParam name="html" type="string" :required="true">

The rendered HTML for version 1. This is the only genuinely required field — an empty or missing value is a `400`.

</ApiParam>

<ApiParam name="name" type="string" :required="false">

Display name. Truncated to 255 characters. Falls back to `Untitled dashboard` when omitted, empty, or whitespace — it
never rejects a missing name.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Free-form description. Truncated to 2000 characters rather than rejected.

</ApiParam>

<ApiParam name="prompt" type="string" :required="false">

The prompt that produced this HTML, stored against the version for provenance. Not returned by any read endpoint.

</ApiParam>

<ApiParam name="project" type="string (uuid)" :required="false">

Optionally scope the artifact to a project. Note the field is `project`, not `project_id` — the `*_id` convention used
elsewhere in v2 does not apply on this surface.

</ApiParam>

<ApiParam name="data_mode" type="string" :required="false">

How the artifact's data is sourced. One of `snapshot` (frozen at generation time) or `live` (re-read on view). Defaults
to `snapshot`. Any other value is a `400`.

</ApiParam>

</div>
</div>

::: warning A project id from another workspace is silently dropped
`project` is validated for membership in the calling workspace, and a value that fails that check is set to `null`
rather than rejected — the artifact is created workspace-scoped instead. If project scoping matters to you, read the
`project` back rather than assuming it stuck.
:::

<div class="params-section">

### Scopes

`workspaces.artifacts:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                               |
| ------ | ------------------------ | ----------------------------------------------------------------------------------- |
| `400`  | —                        | `html` is missing or empty, or `data_mode` is outside the enum. See the note below. |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                     |
| `402`  | `payment_required`       | The Applets feature isn't enabled on your plan.                                     |
| `403`  | `forbidden`              | You are not a workspace admin or owner, or your token lacks the scope.              |
| `404`  | `not_found`              | No such workspace, or it's outside your tenant.                                     |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                |
| `409`  | `conflict`               | Declared by the schema; no current condition produces it on this route.             |
| `413`  | `payload_too_large`      | The request body is over the size limit. Large HTML can hit this.                   |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                 |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                          |

::: info The `400` here is not problem+json
Unlike the rest of v2, the two validation failures on this route return a bare `{"detail": "…"}` body with no `type` or
`code` member. Code that branches on `problem.code` needs a fallback for this shape. The schema declares the standard
`ValidationProblemDetail` for `400`, so this is a known inconsistency rather than intended behavior.
:::

</div>

</div>

<div class="api-right">

<CodePanel title="Create an artifact" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/artifacts/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Q1 velocity by squad",
  "description": "Throughput and cycle time, split by squad.",
  "html": "<section><h1>Q1 velocity by squad</h1></section>",
  "data_mode": "snapshot"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/artifacts/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "name": "Q1 velocity by squad",
        "description": "Throughput and cycle time, split by squad.",
        "html": "<section><h1>Q1 velocity by squad</h1></section>",
        "data_mode": "snapshot",
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v2/workspaces/my-team/artifacts/", {
  method: "POST",
  headers: {
    "X-Api-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Q1 velocity by squad",
    description: "Throughput and cycle time, split by squad.",
    html: "<section><h1>Q1 velocity by squad</h1></section>",
    data_mode: "snapshot",
  }),
});
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="201">

```json
{
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "name": "Q1 velocity by squad",
  "current_version": 1,
  "is_published": false,
  "anchor": null,
  "data_mode": "snapshot"
}
```

</ResponsePanel>

<ResponsePanel status="400" title="MISSING HTML">

```json
{
  "detail": "`html` is required."
}
```

</ResponsePanel>

</div>
</div>

## The response status is `201`, not `200`

A successful create answers **`201 Created`**. The OpenAPI document declares `200` for this operation — a schema
annotation gap, not a behavior you should code against. Accept `2xx` rather than matching `200` exactly.

The body is deliberately compact: it echoes the artifact's identity and publish state, not its HTML. Read the HTML back
with [Get an artifact](/api-reference/v2/artifacts/get-artifact) if you need it.

## Next steps

- [Publish an artifact](/api-reference/v2/artifacts/publish-artifact) — get a shareable anchor
- [Append a new version](/api-reference/v2/artifacts/update-artifact) — when the content is regenerated
