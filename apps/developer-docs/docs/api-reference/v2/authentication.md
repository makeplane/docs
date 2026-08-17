---
title: Authentication
description: Authenticate Plane API v2 requests with an X-Api-Key personal access token or an OAuth 2.0 bearer token, and understand the global and fine-grained scope model.
keywords: plane api v2 authentication, X-Api-Key, personal access token, plane oauth 2.0, bearer token, oauth scopes, users me endpoint
---

# Authentication

Every v2 request must authenticate. There are two ways to do it, and which one you pick depends on whose data you are
touching.

| Method                  | Use it when                                                  | Header                          |
| ----------------------- | ------------------------------------------------------------ | ------------------------------- |
| [API key](#api-key)     | A script, backend job, or integration acts as **you**        | `X-Api-Key: <token>`            |
| [OAuth 2.0](#oauth-2-0) | An app acts on **another user's** behalf, with their consent | `Authorization: Bearer <token>` |

Both are checked before anything else. A missing or invalid credential returns `401 unauthorized` — see
[Errors](/api-reference/v2/errors).

::: warning Header casing
v2 prose and examples use `X-Api-Key`. The v1 docs write the same header as `X-API-Key`. HTTP header names are
case-insensitive, so either spelling reaches the server, but match the v2 form when copying examples between versions.
:::

## API key

An API key is a personal access token. It authenticates as the user who created it.

### Generate a key

1. Log in to Plane and open **Profile Settings**.
2. Go to the **Personal Access Tokens** tab.
3. Click **Add personal access token**.
4. Give it a title and description so you can tell later what it was for and where it is deployed.
5. Optionally set an expiry so it stops working after a date you choose.

The token value is shown once. Store it somewhere your application can read it as a secret — never in client-side code
or a committed file.

### Use a key

```bash
curl "https://api.plane.so/api/v2/users/me/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

::: warning API keys are not scope-limited
An API key acts with its owner's **full permissions**. It is not constrained by OAuth scopes — there is no way to mint
a read-only key. It is still subject to the permission engine, so it can never do something the owner could not do in
the UI, but within that boundary it can do everything.

Treat a key as equivalent to the account it belongs to. If one leaks, delete it in **Personal Access Tokens** and issue
a new one.
:::

## OAuth 2.0

Use OAuth when a third-party app needs to act on behalf of a Plane user who is not you. v2 uses the standard
authorization-code flow.

| Step              | Endpoint                               |
| ----------------- | -------------------------------------- |
| Authorization URL | `/auth/o/authorize/`                   |
| Token URL         | `/auth/o/token/`                       |
| Request header    | `Authorization: Bearer <access_token>` |

1. Redirect the user to `/auth/o/authorize/` with your client id, redirect URI, and the scopes you need.
2. The user approves the scopes. Plane redirects back with an authorization code.
3. Exchange that code for an access token at `/auth/o/token/`.
4. Send the token on every API call.

```bash
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/states/" \
  -H "Authorization: Bearer $PLANE_ACCESS_TOKEN"
```

::: info OAuth tokens fail closed
Unlike an API key, an OAuth token is **capped to the scopes the user granted**. If the token lacks a scope that
satisfies the operation, the request is rejected before the permission engine runs — a user with permission to do
something does not help if your token was never granted the scope for it.

Request only the scopes you need. Adding one later requires the user to re-authorize.
:::

## The scope model

Scopes come in two tiers, and an operation is satisfied by **either** one (OR logic):

- **Global tier** — `read` grants read access to all resources; `write` grants write access to all resources.
- **Fine-grained** — `<resource>:read` and `<resource>:write`, for example `projects.work_items:read` or
  `projects.states:write`.

So `GET …/states/` succeeds with **either** `read` **or** `projects.states:read`. You never need both, and a global
tier scope is not a prerequisite for the fine-grained one.

::: tip Prefer fine-grained scopes
Ask for `read` or `write` only when your app genuinely spans the whole workspace surface. A consent screen listing
three specific scopes converts better than one asking for everything, and it limits the blast radius if a token leaks.
:::

## Who am I

`GET /api/v2/users/me/` echoes back whoever the credential you sent belongs to. It takes no workspace or project id,
so it isolates an auth problem from a permission or tenancy problem — reach for it first when you are debugging a `401`
or a `403`.

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/users/me/</span>
</div>

No fine-grained scope gates it. An API key can always call it; an OAuth token needs the global `read` scope — a token
holding only fine-grained scopes such as `projects.states:read` cannot call it.

<CodePanel title="Who am I" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl "https://api.plane.so/api/v2/users/me/" \
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
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v2/users/me/", {
  headers: { "X-Api-Key": "your-api-key" },
});
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "email": "priya@my-team.io",
  "display_name": "priya",
  "principal_kind": "oauth",
  "scopes": ["projects.work_items:read", "projects.states:read"]
}
```

</ResponsePanel>

### Response fields

- `id` _string (uuid)_

  The authenticated user.

- `email` _string (email)_

  The user's email address.

- `display_name` _string_

  The user's display name.

- `principal_kind` _string_

  How the request authenticated. One of `oauth`, `api_key`, or `other`.

- `scopes` _array of string_

  The scopes this credential carries. Populated for OAuth tokens. Because API keys are not scope-limited, this tells
  you nothing about an API key's reach — check `principal_kind` first.

::: tip Debugging a 403
Call `/api/v2/users/me/` and compare `scopes` against the scope listed on the endpoint page you are calling. If the
scope is missing, the token needs re-authorization. If it is present and you still get `403`, the block is the user's
role, not the token.
:::

## Fine-grained scopes for live endpoints

These are the scopes that gate endpoints documented in this reference. Each is also satisfied by the matching global
tier scope (`read` or `write`).

| Scope                                             | Grants                                                       |
| ------------------------------------------------- | ------------------------------------------------------------ |
| `assets:read`                                     | Read access to assets                                        |
| `assets:write`                                    | Write access to assets                                       |
| `automations:read`                                | Read access to automations                                   |
| `automations:write`                               | Write access to automations                                  |
| `customers:read`                                  | Read access to customers                                     |
| `customers:write`                                 | Write access to customers                                    |
| `customers.properties:read`                       | Read access to customer properties                           |
| `customers.properties:write`                      | Write access to customer properties                          |
| `customers.property_values:read`                  | Read access to customer property values                      |
| `customers.property_values:write`                 | Write access to customer property values                     |
| `customers.requests:read`                         | Read access to customer requests                             |
| `customers.requests:write`                        | Write access to customer requests                            |
| `initiatives:read`                                | Read access to initiatives                                   |
| `initiatives:write`                               | Write access to initiatives                                  |
| `initiatives.labels:read`                         | Read access to initiatives labels                            |
| `initiatives.labels:write`                        | Write access to initiatives labels                           |
| `projects:read`                                   | Read access to projects                                      |
| `projects:write`                                  | Write access to projects                                     |
| `projects.cycles:read`                            | Read access to project cycles                                |
| `projects.cycles:write`                           | Write access to project cycles                               |
| `projects.estimates:read`                         | Read access to project estimates                             |
| `projects.estimates:write`                        | Write access to project estimates                            |
| `projects.features:read`                          | Read access to project features                              |
| `projects.features:write`                         | Write access to project features                             |
| `projects.intakes:read`                           | Read access to project intakes                               |
| `projects.intakes:write`                          | Write access to project intakes                              |
| `projects.labels:read`                            | Read access to project labels                                |
| `projects.labels:write`                           | Write access to project labels                               |
| `projects.members:read`                           | Read access to project members                               |
| `projects.members:write`                          | Write access to project members                              |
| `projects.milestones:read`                        | Read access to project milestones                            |
| `projects.milestones:write`                       | Write access to project milestones                           |
| `projects.modules:read`                           | Read access to project modules                               |
| `projects.modules:write`                          | Write access to project modules                              |
| `projects.pages:read`                             | Read access to project pages                                 |
| `projects.pages:write`                            | Write access to project pages                                |
| `projects.states:read`                            | Read access to project states                                |
| `projects.states:write`                           | Write access to project states                               |
| `projects.views:read`                             | Read access to project views                                 |
| `projects.views:write`                            | Write access to project views                                |
| `projects.work_item_properties:read`              | Read access to work item properties                          |
| `projects.work_item_properties:write`             | Write access to work item properties                         |
| `projects.work_item_types:read`                   | Read access to work item types                               |
| `projects.work_item_types:write`                  | Write access to work item types                              |
| `projects.work_items:read`                        | Read access to project work items                            |
| `projects.work_items:write`                       | Write access to project work items                           |
| `projects.work_items.activities:read`             | Read access to work item activities                          |
| `projects.work_items.attachments:read`            | Read access to work item attachments                         |
| `projects.work_items.attachments:write`           | Write access to work item attachments                        |
| `projects.work_items.comments:read`               | Read access to work item comments                            |
| `projects.work_items.comments:write`              | Write access to work item comments                           |
| `projects.work_items.links:read`                  | Read access to work item links                               |
| `projects.work_items.links:write`                 | Write access to work item links                              |
| `projects.work_items.relations:read`              | Read access to work item relations                           |
| `projects.work_items.relations:write`             | Write access to work item relations                          |
| `projects.work_items.worklogs:read`               | Read access to work item worklogs                            |
| `projects.work_items.worklogs:write`              | Write access to work item worklogs                           |
| `projects.workflows:read`                         | Read access to project workflows                             |
| `projects.workflows:write`                        | Write access to project workflows                            |
| `releases:read`                                   | Read access to releases                                      |
| `releases:write`                                  | Write access to releases                                     |
| `releases.comments:read`                          | Read access to release comments                              |
| `releases.comments:write`                         | Write access to release comments                             |
| `releases.labels:read`                            | Read access to release labels                                |
| `releases.labels:write`                           | Write access to release labels                               |
| `releases.links:read`                             | Read access to release links                                 |
| `releases.links:write`                            | Write access to release links                                |
| `releases.tags:read`                              | Read access to release tags                                  |
| `releases.tags:write`                             | Write access to release tags                                 |
| `stickies:read`                                   | Read access to stickies                                      |
| `stickies:write`                                  | Write access to stickies                                     |
| `teamspaces:read`                                 | Read access to teamspaces                                    |
| `teamspaces:write`                                | Write access to teamspaces                                   |
| `templates.work_items:read`                       | Read access to work item templates                           |
| `templates.work_items:write`                      | Write access to work item templates                          |
| `webhooks:read`                                   | Read access to workspace webhooks                            |
| `webhooks:write`                                  | Write access to workspace webhooks                           |
| `wiki.pages:read`                                 | Read access to wiki pages                                    |
| `wiki.pages:write`                                | Write access to wiki pages                                   |
| `workspaces.artifacts:read`                       | Read access to workspace artifacts                           |
| `workspaces.artifacts:write`                      | Write access to workspace artifacts                          |
| `workspaces.audit_logs:read`                      | Read access to workspace audit logs                          |
| `workspaces.features:read`                        | Read access to workspace features                            |
| `workspaces.features:write`                       | Write access to workspace features                           |
| `workspaces.group_sync:read`                      | Read access to workspace IdP group sync config and mappings  |
| `workspaces.group_sync:write`                     | Write access to workspace IdP group sync config and mappings |
| `workspaces.members:read`                         | Read access to workspace members                             |
| `workspaces.members:write`                        | Write access to workspace members                            |
| `workspaces.roles:read`                           | Read access to workspace roles (system + custom)             |
| `workspaces.views:read`                           | Read access to workspace views                               |
| `workspaces.views:write`                          | Write access to workspace views                              |
| `workspaces.work_item_properties:read`            | Read access to workspace work item properties                |
| `workspaces.work_item_properties:write`           | Write access to workspace work item properties               |
| `workspaces.work_item_relation_definitions:read`  | Read access to workspace work item relation definitions      |
| `workspaces.work_item_relation_definitions:write` | Write access to workspace work item relation definitions     |
| `workspaces.work_item_types:read`                 | Read access to workspace work item types                     |
| `workspaces.work_item_types:write`                | Write access to workspace work item types                    |
| `read`                                            | Read access to all resources                                 |
| `write`                                           | Write access to all resources                                |

::: info The catalog is larger than this table
The OAuth scope catalog advertises the full planned resource surface — pages, customers, initiatives, releases,
teamspaces, templates, webhooks, assets, and more. Those scopes exist and can be requested, but their endpoints are not
live in v2 yet, so only the scopes above currently gate real requests.

The complete catalog is served under `components.securitySchemes.oauth2` in
[`GET /api/v2/schema/`](/api-reference/v2/introduction#machine-readable-schema).
:::

The scope required by a specific operation is listed in the **Scopes** section of each endpoint page — for example
[Create a state](/api-reference/v2/states/create-state) requires `projects.states:write`.

## Tenancy

Authentication tells Plane who you are; tenancy decides what you can see. A workspace slug, project id, or record id
outside your tenant returns **`404 not_found`**, never `403`.

::: warning A cross-tenant id looks identical to a deleted one
This is deliberate — the API never confirms that a resource you cannot access exists. When a request that should work
returns `404`, verify the workspace and project the id belongs to before assuming the record is gone.

Reserve `403 forbidden` in your error handling for the case it actually means: you can see the resource, but your role
or token scope cannot perform this action.
:::

## Next

- [Errors](/api-reference/v2/errors) — how `401`, `403`, and `404` are reported.
- [Introduction](/api-reference/v2/introduction) — base URL, trailing slashes, and request conventions.
