---
title: Publish an artifact
description: Publish a Plane artifact to a shareable anchor with the v2 REST API. Bodyless POST, idempotent behavior, OAuth scopes, error codes, and code examples.
keywords: plane api v2, publish artifact, applets, anchor, deploy board, share dashboard, POST publish
---

# Publish an artifact

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/artifacts/{artifact_id}/publish/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Publish an artifact and get back its **anchor** — the stable key its public URL is built from. The anchor serves
whatever version is current, so publishing once is enough no matter how many versions you append afterwards.

This is a **bodyless** `POST` — send no JSON at all.

Requires the **Applets** feature and workspace **admin** or **owner** — see
[Artifacts overview](/api-reference/v2/artifacts/overview).

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="artifact_id" type="string (uuid)" :required="true">

The artifact to publish. UUID only.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

None. The endpoint takes no request body; anything you send is ignored.

</div>

::: tip Safe to retry
Publishing is idempotent. An artifact that is already published returns its **existing** anchor rather than minting a
new one or erroring, so a retry after a timeout is harmless and the anchor you get back is stable.
:::

::: warning There is no unpublish
`is_active` is always `true` in the response — v2 exposes no way to withdraw an artifact once published, and no way to
rotate its anchor. Treat publishing as a one-way step on this surface.
:::

<div class="params-section">

### Scopes

`workspaces.artifacts:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                              |
| ------ | ------------------------ | ---------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | Declared by the schema; the route takes no body, so there is little to invalidate. |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                    |
| `402`  | `payment_required`       | The Applets feature isn't enabled on your plan.                                    |
| `403`  | `forbidden`              | You are not a workspace admin or owner, or your token lacks the scope.             |
| `404`  | `not_found`              | No such artifact in this workspace, or the workspace is outside your tenant.       |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.               |
| `409`  | `conflict`               | Declared by the schema; publishing an already-published artifact succeeds instead. |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                           |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                         |

</div>

</div>

<div class="api-right">

<CodePanel title="Publish an artifact" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/artifacts/b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53/publish/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/artifacts/b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53/publish/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json()["anchor"])
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/artifacts/b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53/publish/",
  {
    method: "POST",
    headers: { "X-Api-Key": "your-api-key" },
  },
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="201">

```json
{
  "anchor": "5e2a7c81-4f39-4b60-a1d8-0c6b3e9f2d74",
  "is_active": true
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

## The response status is `201`, not `200`

A successful publish answers **`201 Created`**, including on a repeat call where nothing new was created. The OpenAPI
document declares `200` for this operation — a schema annotation gap rather than behavior to code against. Accept `2xx`
rather than matching an exact status.

## Storing the anchor

Save the anchor when you get it. The [detail read](/api-reference/v2/artifacts/get-artifact) does **not** return
`anchor` or `is_published`, so re-publishing is currently the only way to recover an anchor you have lost — which works,
because it is idempotent, but is not what the endpoint is for.

Artifacts share Plane's anchor system with other publishable entities, so the anchor is unique across the workspace, not
just among artifacts.
