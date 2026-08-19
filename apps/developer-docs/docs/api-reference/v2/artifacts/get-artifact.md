---
title: Get an artifact
description: Read a Plane artifact's metadata and current HTML with the v2 REST API. Path parameters, OAuth scopes, error codes, and code examples.
keywords: plane api v2, get artifact, applets, artifact html, current_version, GET artifact
---

# Get an artifact

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/artifacts/{artifact_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Read an artifact's metadata together with the HTML of its **current** version.

Requires the **Applets** feature and workspace **admin** or **owner** — see
[Artifacts overview](/api-reference/v2/artifacts/overview). Unlike dashboards in the app, artifacts are not readable by
ordinary members.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="artifact_id" type="string (uuid)" :required="true">

The artifact to read. UUID only — this route has no human-readable key.

</ApiParam>

</div>
</div>

::: info Only the current version is readable
The response carries the HTML of `current_version`. Earlier versions are retained server-side but v2 exposes no way to
read them, and there is no `?version=` parameter. If you need version history, keep your own copy as you append.
:::

<div class="params-section">

### Scopes

`workspaces.artifacts:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                        |
| ------ | ------------------ | ---------------------------------------------------------------------------- |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                              |
| `402`  | `payment_required` | The Applets feature isn't enabled on your plan.                              |
| `403`  | `forbidden`        | You are not a workspace admin or owner, or your token lacks the scope.       |
| `404`  | `not_found`        | No such artifact in this workspace, or the workspace is outside your tenant. |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.         |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                   |

An artifact id that belongs to a different workspace returns `404`, not `403` — consistent with the rest of v2, which
never leaks the existence of a resource you cannot see.

</div>

</div>

<div class="api-right">

<CodePanel title="Get an artifact" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/artifacts/b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/artifacts/b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/artifacts/b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53/",
  {
    method: "GET",
    headers: { "X-Api-Key": "your-api-key" },
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
  "name": "Q1 velocity by squad",
  "description": "Throughput and cycle time, split by squad.",
  "current_version": 3,
  "data_mode": "snapshot",
  "html": "<section><h1>Q1 velocity by squad</h1>…</section>"
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

## What this response does not include

The detail read is not the same shape as the create response. It adds `description` and `html`, and it omits
`is_published` and `anchor` — so **this endpoint cannot tell you whether an artifact is published**, or what its anchor
is. Those two fields come back only from
[create](/api-reference/v2/artifacts/create-artifact) and
[publish](/api-reference/v2/artifacts/publish-artifact). Store the anchor when you publish rather than expecting to read
it back later.
