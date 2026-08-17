---
title: Expanding relations
description: How ?expand= works in Plane API v2. Sparse reads, the separate-key expansion contract, which resources support expansion, and the exact shape of each expanded object.
keywords: plane api v2, expand, sparse fields, state_id, assignee_ids, embedded relations, expand state, expand assignees, expand member
---

# Expanding relations

v2 reads are **sparse by default**. A response gives you scalars plus identifiers for everything related to it — never an embedded object tree:

- A to-one relation comes back as **`<name>_id`**: `state_id`, `type_id`, `parent_id`, `created_by_id`.
- A to-many relation comes back as **`<name>_ids`**, an array: `assignee_ids`, `label_ids`.

`?expand=` opts a single request into richer output for specific relations. It takes a comma-separated list:

```bash
GET .../work-items/?expand=state,assignees
```

## Expansion is separate-key

This is the part that trips people up, so it is worth stating flatly:

::: warning `?expand=` adds a key. It never replaces one.
`?expand=state` keeps `state_id` exactly where it was **and** adds a separate `state` object beside it. The identifier is not swapped for an object, and it does not disappear. Both are present in the same response.
:::

Most APIs that offer expansion do the opposite — the `state` key holds a UUID string when you do not expand and an object when you do. That design forces every consumer to write `typeof x === "string" ? x : x.id` at each use site, and it means the shape of your response depends on a query parameter that some other part of your codebase set.

v2 splits the two concerns into two keys with two stable types:

| Key        | Type            | Present when              |
| ---------- | --------------- | ------------------------- |
| `state_id` | `string (uuid)` | Always                    |
| `state`    | object          | Only with `?expand=state` |

### Why this matters for your client

- **One type per field, forever.** `state_id` is a `string` in every response your code will ever see. You never union a string with an object, and you never write a type guard to tell them apart.
- **Expansion is additive, so it is safe to change.** A caller can add or drop `?expand=` without invalidating any code that reads `state_id`. Your identifier-keyed caches, join tables, and foreign keys keep working untouched.
- **Optional, not conditional.** In a typed client, the expanded key is simply optional — `state?: State`. Compare that with a discriminated union of `string | State`, which every consumer has to narrow.
- **Nothing to reconcile.** Because both keys are present, `item.state.id` and `item.state_id` never disagree.

The practical rule: **read identifiers from `*_id` / `*_ids`, and treat expanded objects purely as a display convenience** that saves you a round trip.

## Where `?expand=` is supported

Each resource declares its own allowlist. This is the complete list.

| Resource                                                           | Allowed `expand` values                                              |
| ------------------------------------------------------------------ | -------------------------------------------------------------------- |
| **Work items** (project list, workspace list, detail, writes)      | `state`, `type`, `parent`, `assignees`, `labels`, `cycle`, `modules` |
| **Projects**                                                       | `project_lead`, `default_assignee`                                   |
| **Cycles**                                                         | `owned_by`                                                           |
| **Modules**                                                        | `lead`, `members`                                                    |
| **Initiatives**                                                    | `lead`                                                               |
| **Teamspaces**                                                     | `lead`                                                               |
| **Releases**                                                       | `lead`, `tag`                                                        |
| **Estimates**                                                      | `points`                                                             |
| **Comments** and **work item activities**                          | `actor`                                                              |
| **Worklogs**                                                       | `logged_by`                                                          |
| **Project pages** and **workspace pages**                          | `owned_by`, `parent`                                                 |
| **Collections**                                                    | `owned_by`                                                           |
| **Project views** and **workspace views**                          | `owned_by`                                                           |
| **Workspace members**, **project members**, **collection members** | `member`                                                             |

::: danger A resource with no expandable relations rejects every value
States, labels, milestones, work item types, properties, property options, property contexts, webhooks, workspace
features and audit logs declare no expandable relations. There is no partial support and no silent ignoring — any value
you pass to such a resource is an unknown value, and unknown values are rejected.
:::

Passing a value the resource does not declare returns a `400`:

<ResponsePanel status="400">

```json
{
  "type": "invalid_request",
  "code": "invalid_request",
  "detail": "One or more fields failed validation.",
  "errors": [
    {
      "field": "expand",
      "code": "invalid",
      "message": "Unknown expand value(s): project."
    }
  ]
}
```

</ResponsePanel>

::: tip `?expand=` is in the published OpenAPI schema
The parameter is declared per operation in the served OpenAPI document at `/api/v2/schema/`, with its allowlist as an
**enum**. Generated SDKs and MCP tool definitions therefore constrain the value up front instead of discovering it from
a `400`, and a schema-driven validator will not strip it.
:::

## Composing with `?fields=`

`?expand=` and [`?fields=`](/api-reference/v2/sparse-fields) are **separate namespaces**, and they do not interact.

```
?fields=id,name&expand=state    →  { "id": "…", "name": "…", "state": { … } }
```

`state_id` is a field. `state` is an expandable relation. Because they are different keys in different namespaces:

- Filtering fields **never drops an expansion**. `state` survives even though `state_id` was not requested.
- There is no precedence rule to learn, and no order dependency between the two parameters.

The flip side is that the namespaces are strict in both directions. A relation name is not a valid `?fields=` token, and
a field name is not a valid `?expand=` value — but the `400` tells you which parameter you meant:

```json
{
  "type": "invalid_request",
  "code": "invalid_request",
  "detail": "One or more fields failed validation.",
  "errors": [
    {
      "field": "fields",
      "code": "invalid",
      "message": "'state' is an expandable relation, not a response field — use ?expand=state to embed the object, or ?fields=state_id for just its id."
    }
  ]
}
```

::: info Why not unify them?
Letting `?fields=state` imply an expansion is the trap v1 fell into: expansion _replaced_ a field, so filtering fields
silently killed the expansion. Keeping the namespaces separate is what makes both parameters composable without
surprises.
:::

## Before and after

Take the same work item list, once sparse and once expanded.

**Sparse (default)**

```bash
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

<ResponsePanel status="200">

```json
{
  "data": [
    {
      "id": "8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13",
      "name": "Fix login redirect",
      "identifier": "PROJ-118",
      "sequence_id": 118,
      "priority": "high",
      "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "type_id": null,
      "assignee_ids": ["16c61a3a-512a-48ac-b0be-b6b46fe6f430"],
      "label_ids": [],
      "parent_id": null,
      "start_date": null,
      "target_date": "2026-02-02",
      "is_draft": false,
      "archived_at": null,
      "created_at": "2026-01-14T09:22:41.478363Z",
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
    }
  ],
  "next": null,
  "previous": null,
  "total_count": 1,
  "pagination": { "style": "offset" }
}
```

</ResponsePanel>

**Expanded**

```bash
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/?expand=state,assignees" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

<ResponsePanel status="200">

```json
{
  "data": [
    {
      "id": "8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13",
      "name": "Fix login redirect",
      "identifier": "PROJ-118",
      "sequence_id": 118,
      "priority": "high",
      "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      "type_id": null,
      "assignee_ids": ["16c61a3a-512a-48ac-b0be-b6b46fe6f430"],
      "label_ids": [],
      "parent_id": null,
      "start_date": null,
      "target_date": "2026-02-02",
      "is_draft": false,
      "archived_at": null,
      "created_at": "2026-01-14T09:22:41.478363Z",
      "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
      "state": {
        "id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
        "name": "In Progress",
        "color": "#3f76ff",
        "group": "started"
      },
      "assignees": [
        {
          "id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
          "display_name": "Priya Raghavan",
          "avatar_url": "https://assets.plane.so/avatars/16c61a3a.png",
          "email": "priya@example.com"
        }
      ]
    }
  ],
  "next": null,
  "previous": null,
  "total_count": 1,
  "pagination": { "style": "offset" }
}
```

</ResponsePanel>

Note what did **not** change: `state_id` is still `"f960d3c2-…"` and `assignee_ids` is still `["16c61a3a-…"]`. The two new keys sit alongside them.

## Shape of each expanded object

Expanded objects are deliberately minimal projections — enough to render a row without a second request, and nothing more. They are leaves: an expanded object never carries its own expansions or nested relations.

### Work items

| `expand` value | Adds key    | Shape                                                |
| -------------- | ----------- | ---------------------------------------------------- |
| `state`        | `state`     | `id`, `name`, `color`, `group`                       |
| `type`         | `type`      | `id`, `name`, `logo_props`, `is_epic`                |
| `parent`       | `parent`    | `id`, `name`, `sequence_id`                          |
| `assignees`    | `assignees` | Array of `id`, `display_name`, `avatar_url`, `email` |
| `labels`       | `labels`    | Array of `id`, `name`, `color`                       |

### Members

| `expand` value | Adds key | Shape                                       |
| -------------- | -------- | ------------------------------------------- |
| `member`       | `member` | `id`, `display_name`, `avatar_url`, `email` |

```bash
curl "https://api.plane.so/api/v2/workspaces/my-team/members/?expand=member" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

<ResponsePanel status="200">

```json
{
  "data": [
    {
      "id": "c1b7e4a9-2f66-4a1d-9c3b-7d5e2f8a1b40",
      "member_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
      "role": "admin",
      "member": {
        "id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
        "display_name": "Priya Raghavan",
        "avatar_url": "https://assets.plane.so/avatars/16c61a3a.png",
        "email": "priya@example.com"
      }
    }
  ],
  "next": null,
  "previous": null,
  "total_count": 1,
  "pagination": { "style": "offset" }
}
```

</ResponsePanel>

Here too the identifier survives: `member_id` is the user's id, and `member` is the object.

## Behavior notes

- **A to-many expansion is always an array, never `null`.** With `?expand=assignees`, an unassigned work item gets `"assignees": []`.
- **A to-one expansion follows its id.** If `parent_id` is `null`, `?expand=parent` produces `"parent": null`.
- **Expansion works on detail routes too**, not only lists — `GET .../work-items/{pk}/?expand=state,labels` behaves the same way.
- **Expanding a list does not cost a query per row.** The relations are loaded in bulk, so `?expand=assignees` on a 200-row page is one additional query, not 200.
- **Expansion is read-only.** Writes always take ids (`state_id`, `assignee_ids`); sending a nested object on a `POST` or `PATCH` does not create or link anything.

## Related

- [Filtering and ordering](/api-reference/v2/filtering-and-ordering) — filter on the same relations with `state_id`, `assignee_id`, and friends
- [Pagination](/api-reference/v2/pagination) — the envelope that wraps every expanded list
- [Migrating from v1](/api-reference/v2/migrating-from-v1) — what to do about v1 responses that embedded these objects by default
