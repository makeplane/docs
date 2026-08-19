---
title: Get current user
description: Verify Plane API v2 credentials with GET /api/v2/users/me/. Returns the calling principal — id, display name, email, principal_kind, and granted OAuth scopes. Errors and code examples.
keywords: plane api v2, get current user, users me, whoami, verify api key, principal_kind, oauth scopes, debug 401, debug 403
---

# Get current user

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/users/me/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Return the principal behind the credentials you just sent: which user it acts as, whether it is an OAuth token or an API key, and which scopes it carries.

Make this your first call against a new key or a freshly authorized OAuth app. A `200` proves the credential is accepted and shows you exactly what it can do, before you spend a debugging session on an endpoint that was never in scope.

<div class="params-section">

### Path Parameters

None. The path is fixed — there is no `{slug}` and no user id, because the endpoint describes the credential rather than a workspace or a person you choose.

</div>

<div class="params-section">

### Query Parameters

None. No filters, no pagination, and no `?expand=`.

</div>

<div class="params-section">

### Scopes

No fine-grained scope is required — the endpoint declares none, so there is no `users:*` scope to ask for.

An API key reaches it unconditionally. An OAuth token still needs to carry a read scope; a token granted only write scopes is rejected with `403`. In practice any token issued for real work already qualifies, which is what makes this a reliable probe when you are unsure what your credential can reach.

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                                 |
| ------ | ------------------ | ----------------------------------------------------------------------------------------------------- |
| `401`  | `unauthorized`     | Missing or invalid credentials — a wrong key, the wrong header, or an expired or revoked OAuth token. |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.                  |
| `403`  | `forbidden`        | The credential is valid but carries no read scope — an OAuth token granted write scopes only.         |
| `404`  | `not_found`        | The calling principal could not be resolved to a user record.                                         |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                                  |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                                            |

</div>

::: tip Split `401` from `403` before you debug anything else
A `401` here means the credential is wrong, so no other endpoint will work either. A `200` here plus a `403` elsewhere means the credential is fine and the **scope or role** is too narrow for that specific endpoint — compare its documented scope against the `scopes` array in this response.
:::

::: info Send the key as `X-Api-Key`
v2 reads the API key from `X-Api-Key`, or an OAuth token from `Authorization: Bearer <token>`. v1's `X-API-Key` casing is a common cause of a `401` here when porting a v1 client. See [Authentication](/api-reference/v2/authentication).
:::

::: info A `409` is never about this endpoint's answer
If your scopes look right and a write still returns `409 work_item_types_managed_at_workspace` or `work_item_types_managed_at_project`, stop looking at credentials. The workspace manages work item types on the other surface and the same call succeeds there. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

</div>

<div class="api-right">

<CodePanel title="Get current user" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/users/me/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/users/me/",
    headers={"X-Api-Key": "your-api-key"},
)
me = response.json()

print(me["principal_kind"], me["email"])
if "projects.work_items:write" not in me["scopes"]:
    raise SystemExit("This credential cannot create work items.")
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v2/users/me/", {
  headers: {
    "X-Api-Key": "your-api-key",
  },
});
const me = await response.json();

const canWriteWorkItems = me.scopes.includes("projects.work_items:write");
```

</template>
</CodePanel>

<ResponsePanel status="200" title="OAUTH TOKEN">

```json
{
  "id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "display_name": "Priya Raghavan",
  "email": "priya@example.com",
  "principal_kind": "oauth",
  "scopes": [
    "projects.work_items:read",
    "projects.work_items:write",
    "projects.states:read",
    "workspaces.members:read"
  ]
}
```

</ResponsePanel>

<ResponsePanel status="200" title="API KEY">

```json
{
  "id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "display_name": "Priya Raghavan",
  "email": "priya@example.com",
  "principal_kind": "api_key",
  "scopes": []
}
```

</ResponsePanel>

<ResponsePanel status="401">

```json
{
  "type": "unauthorized",
  "code": "unauthorized",
  "detail": "Authentication credentials were not provided or are invalid."
}
```

</ResponsePanel>

</div>
</div>

## Reading the response

- **`principal_kind` tells you which credential model you are in.** `oauth` means an application token acting for a user, `api_key` means a personal key, `other` covers anything else the server authenticates.
- **`scopes` is the OAuth grant.** For an OAuth token it lists the fine-grained scopes the user consented to; check it against the scope named on the endpoint you are calling. An empty array means no fine-grained scopes are attached to this credential.
- **`id` is the identity your writes will carry.** It shows up later as `created_by_id` on objects you create and as `actor_id` in [audit logs](/api-reference/v2/audit-logs/overview).
- **The response says nothing about roles.** Scopes cap what a token may attempt; the user's role in each workspace and project decides whether it succeeds. A `403` with the right scope listed here is a role problem.

## Related

- [Users overview](/api-reference/v2/users/overview)
- [Authentication](/api-reference/v2/authentication)
- [Members overview](/api-reference/v2/members/overview) — the roster where this `id` appears as `member_id`
- [Errors](/api-reference/v2/errors) — the full code list to branch on
