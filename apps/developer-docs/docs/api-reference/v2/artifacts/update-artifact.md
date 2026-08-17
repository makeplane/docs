---
title: Append a new version
description: Append a new HTML version to a Plane artifact with the v2 REST API. Append-only versioning, body parameters, OAuth scopes, error codes, and code examples.
keywords: plane api v2, update artifact, append artifact version, current_version, applets, PATCH artifact update
---

# Append a new version

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v2/workspaces/{slug}/artifacts/{artifact_id}/update/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Add a new HTML version to an existing artifact. The new version becomes current and `current_version` increments by
one.

This is **not** a partial update in the usual v2 sense. It does not edit fields on the artifact — you cannot rename it,
change its description, or move it between projects through this route. The only thing it accepts is new content.

Requires the **Applets** feature and workspace **admin** or **owner** — see
[Artifacts overview](/api-reference/v2/artifacts/overview).

::: warning Note the `/update/` segment
The path is `PATCH …/artifacts/{artifact_id}/update/`, not `PATCH …/artifacts/{artifact_id}/`. A `PATCH` to the bare
detail route is not a defined operation.
:::

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="artifact_id" type="string (uuid)" :required="true">

The artifact to append a version to. UUID only.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="html" type="string" :required="true">

The rendered HTML for the new version. An empty or missing value is a `400`.

</ApiParam>

<ApiParam name="prompt" type="string" :required="false">

The prompt that produced this HTML, stored against the version for provenance. Not returned by any read endpoint.

</ApiParam>

</div>
</div>

::: info Every call creates a version — there is no no-op
Posting identical HTML still appends a version and still increments `current_version`. Nothing de-duplicates content, so
a retry after a network timeout can leave you a version ahead of where you think you are. Read `current_version` back
from the response rather than tracking it locally.
:::

<div class="params-section">

### Scopes

`workspaces.artifacts:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                          |
| ------ | ------------------------ | ------------------------------------------------------------------------------ |
| `400`  | —                        | `html` is missing or empty. Returns a bare `{"detail": "…"}` body — see below. |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                |
| `402`  | `payment_required`       | The Applets feature isn't enabled on your plan.                                |
| `403`  | `forbidden`              | You are not a workspace admin or owner, or your token lacks the scope.         |
| `404`  | `not_found`              | No such artifact in this workspace, or the workspace is outside your tenant.   |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.           |
| `409`  | `conflict`               | Declared by the schema; no current condition produces it on this route.        |
| `413`  | `payload_too_large`      | The request body is over the size limit. Large HTML can hit this.              |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                            |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                     |

::: info The `400` here is not problem+json
The missing-`html` failure returns a bare `detail`-only body with no `type` or `code` member, unlike the rest of v2:

```json
{ "detail": "`html` is required." }
```

The `404` **is** a standard problem document. Code that branches on `problem.code` needs a fallback for the `400` shape.
:::

</div>

</div>

<div class="api-right">

<CodePanel title="Append a new version" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v2/workspaces/my-team/artifacts/b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53/update/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "html": "<section><h1>Q1 velocity by squad</h1><p>Refreshed.</p></section>"
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v2/workspaces/my-team/artifacts/b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53/update/",
    headers={"X-Api-Key": "your-api-key"},
    json={"html": "<section><h1>Q1 velocity by squad</h1><p>Refreshed.</p></section>"},
)
print(response.json()["current_version"])
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/artifacts/b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53/update/",
  {
    method: "PATCH",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      html: "<section><h1>Q1 velocity by squad</h1><p>Refreshed.</p></section>",
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
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "current_version": 4,
  "data_mode": "snapshot"
}
```

</ResponsePanel>

<ResponsePanel status="404">

```json
{
  "type": "not_found",
  "code": "not_found",
  "detail": "Artifact not found."
}
```

</ResponsePanel>

</div>
</div>

## Publishing and versions are independent

If the artifact is already published, its anchor keeps serving whatever version is current — so you publish once and
append as often as you like. There is no need to re-publish after an update, and no way to point an anchor at an older
version.

See [Publish an artifact](/api-reference/v2/artifacts/publish-artifact).
