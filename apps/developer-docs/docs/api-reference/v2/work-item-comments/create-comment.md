---
title: Create a comment
description: Post a comment on a Plane work item with the v2 REST API. HTML bodies, INTERNAL and EXTERNAL access, external ids, OAuth scopes, errors, and code examples.
keywords: plane api v2, create work item comment, POST comments, comment_html, comment access, append-only comments
---

# Create a comment

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{work_item_id}/comments/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Post a comment on a work item. The comment is attached to the work item in the path and appears in its
discussion immediately.

The author is taken from the credentials on the request and returned as `actor_id` — you cannot post a comment
on behalf of another user.

::: info Comments are not deduplicated
Nothing about a comment's body or `external_id` identifies it uniquely, so sending the same `comment_html`
twice creates two comments. If your integration must post a comment at most once, send an `external_id` and
look for it first with `GET …/comments/?external_id=…&external_source=…`.
:::

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is
`my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the work item belongs to.

</ApiParam>

<ApiParam name="work_item_id" type="string (uuid)" :required="true">

The work item to comment on.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="comment_html" type="string" :required="true">

The comment body, as HTML — for example `<p>Deployed the fix to staging.</p>`. Plane derives the plain-text
`comment_stripped` from it server-side, which is what search matches.

</ApiParam>

<ApiParam name="access" type="string" :required="false">

Visibility of the comment.

- `INTERNAL` — visible to the project team
- `EXTERNAL` — marked as visible outside the team, for example on a published project

Omit it to take the server's default. Change it later with a `PATCH`.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this comment, for sync and import correlation. Maximum 255 characters. Accepts
`null`.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `github` or `zendesk`. Maximum 255 characters. Accepts `null`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `access`, `actor_id`, `comment_html`, `comment_stripped`, `created_at`, `created_by_id`, `edited_at`, `external_id`, `external_source`, `id`, `work_item_id`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed alongside the ids: `actor` (the comment author).

Expansion is separate-key: `?expand=state` keeps `state_id` and adds a `state` object next to it, so an id is never replaced by an object. An unknown value is a `400`.

`?fields=` and `?expand=` are independent namespaces. Relation names are not valid `?fields=` tokens (and vice versa), and an expanded object survives field filtering — `?fields=id,name&expand=state` returns `id`, `name` and `state`. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_items.comments:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `400`  | `invalid_request`        | Missing `comment_html`, or an `access` value outside the enum.                       |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                      |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`              | Your role or token scope can't comment on this work item.                            |
| `404`  | `not_found`              | No such workspace, project, or work item, or it's outside your tenant.               |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | The write conflicts with the current state of the work item.                         |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="Create a comment" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/comments/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "comment_html": "<p>Deployed the fix to staging. Please re-test.</p>",
  "access": "INTERNAL"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/comments/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "comment_html": "<p>Deployed the fix to staging. Please re-test.</p>",
        "access": "INTERNAL",
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/comments/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment_html: "<p>Deployed the fix to staging. Please re-test.</p>",
      access: "INTERNAL",
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
  "id": "c1f7a3d9-2b64-4f80-9c1a-3d5e8b2a6c47",
  "work_item_id": "8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13",
  "comment_html": "<p>Deployed the fix to staging. Please re-test.</p>",
  "comment_stripped": "Deployed the fix to staging. Please re-test.",
  "access": "INTERNAL",
  "actor_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "external_id": null,
  "external_source": null,
  "edited_at": null,
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
      "field": "comment_html",
      "code": "required",
      "message": "This field is required."
    }
  ]
}
```

</ResponsePanel>

</div>
</div>
