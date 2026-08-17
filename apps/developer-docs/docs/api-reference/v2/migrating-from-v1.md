---
title: Migrating from v1
description: A practical guide to moving an integration from the Plane REST API v1 to v2. Path and header changes, PATCH-only writes, RFC 9457 errors, sparse reads, the new pagination envelope, renamed fields, and what v2 does not cover yet.
keywords: plane api v2 migration, v1 to v2, plane rest api upgrade, is_default, description_html, custom_fields, RFC 9457, sparse reads, PATCH only
---

# Migrating from v1

v2 is a separate, additive surface. v1 keeps working, nothing is being switched off underneath you, and you can move one call at a time — the two versions can run side by side in the same integration against the same workspace.

This page is the checklist for moving a call across.

## At a glance

|                   | v1                         | v2                                                          |
| ----------------- | -------------------------- | ----------------------------------------------------------- |
| Path              | `/api/v1/…`                | `/api/v2/…`                                                 |
| Auth header       | `X-API-Key`                | `X-Api-Key`                                                 |
| Update verb       | `PUT` or `PATCH`           | `PATCH` only                                                |
| Errors            | Ad-hoc JSON bodies         | RFC 9457 `application/problem+json` with stable `code`      |
| Relations on read | Embedded objects           | `*_id` / `*_ids`, plus `?expand=` on work items and members |
| List envelope     | `results` + cursor strings | `data` + `pagination.style`                                 |
| Sparse fieldsets  | `?fields=`                 | Not needed — reads are already sparse                       |

Unchanged: the base URL (`https://api.plane.so`), the trailing slash on every path, JSON in and out, and the fine-grained OAuth scope names (`projects.work_items:read`, `projects.states:write`, and so on).

## 1. Change the path

`/api/v1/` becomes `/api/v2/`. Everything else about the URL — workspace slug, project id, trailing slash — works the same way.

```diff
- https://api.plane.so/api/v1/workspaces/my-team/projects/{project_id}/work-items/
+ https://api.plane.so/api/v2/workspaces/my-team/projects/{project_id}/work-items/
```

## 2. Auth header casing

v1 docs use `X-API-Key`; v2 standardizes on **`X-Api-Key`**.

HTTP header names are case-insensitive, so this is cosmetic — an existing `X-API-Key` header keeps working against v2, and no client library will care. Adopt the new casing when you touch the code, not as a migration step of its own.

OAuth is unchanged: `Authorization: Bearer <access_token>`.

## 3. `PUT` is gone

v2 has no `PUT`. Every update is a `PATCH`, and a `PATCH` is partial — it changes only the fields you send.

```diff
- PUT  /api/v1/workspaces/my-team/projects/{project_id}/states/{pk}/
+ PATCH /api/v2/workspaces/my-team/projects/{project_id}/states/{pk}/
```

Sending `PUT` returns `405` with the code `method_not_allowed`.

Two things follow from partial updates:

- **You no longer have to read-modify-write.** To change one field, send one field.
- **Omitted is not the same as `null`.** Leaving a key out means "don't touch it"; sending `"target_date": null` means "clear it".

## 4. Errors are `problem+json`

Every v2 error is `application/problem+json` with the same three keys — `type`, `code` and `detail` — plus `errors[]` on validation failures:

<ResponsePanel status="400">

```json
{
  "type": "invalid_request",
  "code": "invalid_request",
  "detail": "One or more fields failed validation.",
  "errors": [
    {
      "field": "name",
      "code": "required",
      "message": "This field is required."
    }
  ]
}
```

</ResponsePanel>

**Branch on `code`.** It is the stable, machine-readable part, and it is always present. `type` is a coarse category from a closed 13-value set — use it as the fallback arm for a `code` you do not recognize. `detail` is prose that can be reworded at any time. `errors[]` appears only on `invalid_request`, and each entry carries `field`, `code` and `message`.

::: warning The body has no `status` or `title`
If you built against an early v2 preview, note that `status` and `title` were removed from the body, and `type` changed from a `https://api.plane.so/errors/…` URI to a bare slug. Read the HTTP status from the status line.
:::

Other behavior worth knowing while you port error handling:

- A resource outside your tenant is `404 not_found`, never `403`. v2 does not leak existence.
- `DELETE` returns `204` with an empty body.
- Uniqueness and protected-state conflicts are `409 conflict` — a duplicate state name, deleting a project's default state, deleting a state that still holds work items.
- Throttling is `429 rate_limited`; honor `Retry-After`.

See [Errors](/api-reference/v2/errors) for the full code list.

## 5. Reads are sparse

This is the largest behavioral change. v1 embedded related objects in the response; v2 returns identifiers.

```diff
- "state": { "id": "f960d3c2-…", "name": "In Progress", "group": "started" }
+ "state_id": "f960d3c2-…"

- "assignees": [ { "id": "16c61a3a-…", "display_name": "Priya Raghavan" } ]
+ "assignee_ids": ["16c61a3a-…"]
```

To-one relations come back as `<name>_id`; to-many relations as `<name>_ids` arrays. That makes every response a predictable, flat shape and keeps list pages cheap.

Where you genuinely need the object, add `?expand=`. It is **separate-key**: `?expand=state` keeps `state_id` _and_ adds a `state` object beside it, so nothing you already read stops working.

Each resource declares its own allowlist — work items expand `state`, `type`, `parent`, `assignees`, `labels`, `cycle` and `modules`; cycles expand `owned_by`; modules expand `lead` and `members`; comments expand `actor`; and so on. A resource that declares none rejects every value, and an unknown value is always a `400`. The full table is in [Expanding relations](/api-reference/v2/expanding-relations).

::: tip You usually need fewer objects than v1 gave you
v1 embedded relations whether or not you used them. Before reaching for `?expand=`, check whether the id is all your code actually consumed — for cache keys, joins, and foreign keys it almost always is.
:::

### `?fields=` trims further

v1 had a `?fields=` parameter, and so does v2 — but the semantics are stricter in two ways worth porting carefully:

- **Unrequested keys are omitted, not nulled.** In v2, absent means "not requested" and `null` means "genuinely null". Code that reads `row.target_date` expecting a key to exist needs to check presence instead.
- **Unknown names are a `400`.** v1 ignored them silently. A typo that used to return the full row now fails loudly — which is the point, since a silently-ignored field name costs you the saving without telling you.

`id` always comes back, and `all` returns the full requestable set. Some resources also leave heavy fields such as `description_html` off list rows by default; naming the field pulls it back. See [Sparse fields](/api-reference/v2/sparse-fields).

```bash
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/ENG/work-items/?fields=id,name,state_id" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

## 6. Writes take ids

v2 write payloads take identifiers, never nested objects: `state_id`, `parent_id`, `assignee_ids`, `label_ids`, modules' `lead_id`. An id belonging to another project or workspace is a clean `400` — it never silently links to nothing.

Audit fields (`created_at`, `created_by_id`, and friends) are read-only. Sending them has no effect.

## 7. The pagination envelope changed

v1 returned `results` with cursor strings like `20:1:0`. v2 returns `data` inside an envelope that declares its own style.

**v2 offset (the default):**

```json
{
  "data": [],
  "next": 50,
  "previous": null,
  "total_count": 327,
  "pagination": { "style": "offset" }
}
```

**v2 cursor (opt in with `?paginate=cursor`):**

```json
{
  "data": [],
  "next_cursor": "b3A9MTcx",
  "has_more": true,
  "pagination": { "style": "cursor" }
}
```

Port your paginator to read `data`, then **branch on `pagination.style`** rather than sniffing which keys are present. On the offset path `next` and `previous` are integer offsets, not tokens and not URLs. `per_page` defaults to 50 and caps at 200; `offset` caps at 10000, which is the point at which you should switch to cursor. See [Pagination](/api-reference/v2/pagination).

## 8. Renamed and removed fields

These are the concrete differences to grep your codebase for.

| Resource   | v1                                                 | v2                                                        |
| ---------- | -------------------------------------------------- | --------------------------------------------------------- |
| States     | `default`                                          | **`is_default`**                                          |
| States     | `updated_at`, `updated_by`, `project`, `workspace` | **Not returned**                                          |
| Work items | `updated_at`, `updated_by`, `project`, `workspace` | **Not returned**                                          |
| Work items | `description_html` on read                         | **Write-only** — accepted on write, not returned on read  |
| Work items | —                                                  | `custom_fields` — present only on single-object responses |

Details on the two that bite hardest:

::: warning `description_html` is write-only on work items
You can send `description_html` on a create or update and it is stored, but it does **not** come back on any read — not on the list, not on the detail route, not in the create/update response. Code that round-trips a description through the API needs to keep its own copy of what it wrote.
:::

::: warning `custom_fields` is absent on list responses
`custom_fields` carries a work item's custom property values, and it is present **only on single-object responses** — retrieve, create, update, upsert and the archive verbs. On the **list** path the key is **omitted entirely** (not `null`), because resolving properties per row would mean a query per work item. Asking for it there with `?fields=custom_fields` is a `400` rather than a silent empty answer. If you need property values for many items, list first and then fetch the ones you care about individually.
:::

Also note: the state `group` enum gained `triage` alongside v1's five groups.

## 9. Side by side: listing work items

The same call in both versions.

### v1

```bash
curl "https://api.plane.so/api/v1/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/?per_page=20&expand=state,assignees" \
  -H "X-API-Key: $PLANE_API_KEY"
```

<ResponsePanel status="200">

```json
{
  "total_count": 327,
  "next_cursor": "20:1:0",
  "prev_cursor": "20:0:0",
  "next_page_results": true,
  "prev_page_results": false,
  "count": 20,
  "total_pages": 17,
  "results": [
    {
      "id": "8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13",
      "name": "Fix login redirect",
      "description": "",
      "priority": "high",
      "sequence_id": 118,
      "state": {
        "id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
        "name": "In Progress",
        "group": "started"
      },
      "assignees": [
        { "id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430", "display_name": "Priya Raghavan" }
      ],
      "labels": [],
      "created_at": "2026-01-14T09:22:41.478363Z"
    }
  ]
}
```

</ResponsePanel>

### v2

```bash
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/?per_page=20&expand=state,assignees" \
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
  "next": 20,
  "previous": null,
  "total_count": 327,
  "pagination": { "style": "offset" }
}
```

</ResponsePanel>

Line up the differences:

- `results` → `data`; the cursor strings are replaced by an integer `next` plus a `pagination.style` discriminator.
- `state` → `state_id`, and `assignees` → `assignee_ids`. The expanded `state` and `assignees` objects are **added** by `?expand=`, not substituted for the ids.
- `description` is gone from the read shape.
- New on every work item: `identifier` (`PROJ-118`), `type_id`, `is_draft`, `archived_at`, and `created_by_id`. `custom_fields` is absent here because this is a list — it appears on single-object responses.

## 10. What is new in v2

Capabilities that have no v1 equivalent and are worth designing around rather than porting:

**Work item types and custom properties.** Define types (`Bug`, `Incident`) and typed custom properties (`TEXT`, `DATETIME`, `DECIMAL`, `BOOLEAN`, `OPTION`, `RELATION`, `URL`, `EMAIL`, `FILE`, `FORMULA`), attach properties to types, and read a type's full writable schema in one call. A workspace runs these at either the project or the workspace level — start at [Work item type modes](/api-reference/v2/work-item-type-modes), because writing to the wrong surface is a `409`.

**Property options and contexts.** `OPTION` properties carry their own managed choice lists. In workspace mode, a **property context** narrows where a workspace property applies and can override `is_required`, `is_multi`, or `default_value` for a specific slice of projects and types. See [Property options](/api-reference/v2/work-item-property-options/overview) and [Property contexts](/api-reference/v2/work-item-property-contexts/overview).

**Workspace features.** Read and toggle workspace-level capabilities through the API instead of the UI: `GET` and `PATCH /api/v2/workspaces/{slug}/features/`. See [Workspace features](/api-reference/v2/workspace-features/overview).

**Audit logs.** Query the workspace audit trail with filters for actor, category, event name, target, outcome, IP address, and time range — `GET /api/v2/workspaces/{slug}/audit-logs/`. See [Audit logs](/api-reference/v2/audit-logs/overview).

**Fetch a work item by its `PROJ-123` identifier.** The human key that appears in the Plane UI is now directly addressable, without knowing the project id or resolving a UUID first:

```bash
curl "https://api.plane.so/api/v2/workspaces/my-team/work-items/PROJ-118/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

This is the fastest way to turn something a person typed — a ticket reference in a chat message, a commit trailer, a support email — into a work item. See [Get a work item by identifier](/api-reference/v2/work-items/get-work-item-by-identifier).

## 11. Not yet in v2

v2 does not cover the whole product surface. It currently covers work items and their comments, states, labels, cycles, modules, work item types and custom properties, members, workspace features, audit logs, and the current user.

Everything else still lives in v1 — projects, pages and wiki pages, intake, teamspaces, initiatives, epics, estimates, customers, stickies, attachments and links, worklogs, work item relations, activity, milestones, and workspace invitations. So do the sub-resources and verbs of cycles and modules: adding or removing their work items, archiving, and unarchiving all remain v1-only.

::: info Run both versions side by side
There is no requirement to migrate wholesale. Point the calls that v2 covers at `/api/v2/` and leave the rest on `/api/v1/`. The same API key authenticates both. For the v1 surface, see [the v1 introduction](/api-reference/v1/introduction).
:::

## Migration checklist

1. Swap `/api/v1/` for `/api/v2/` on the calls v2 covers.
2. Replace every `PUT` with `PATCH`, and trim the payload to the fields that actually change.
3. Rewrite error handling to read `code` from the problem+json body.
4. Update your paginator: read `data`, branch on `pagination.style`, treat `next` as an integer offset.
5. Replace embedded relation reads with `*_id` / `*_ids`, adding `?expand=` only where you need the object and only where it is supported.
6. Rename state `default` to `is_default`, and stop reading `updated_at`, `updated_by`, `project`, and `workspace` from state and work item responses.
7. Stop expecting `description_html` back from a work item read.
8. Stop expecting `custom_fields` on list responses — fetch the item individually when you need its property values.
9. Update your error handling to the `{type, code, detail}` shape: v2 no longer sends `status` or `title`, and `type` is a bare category slug rather than a URI. See [Errors](/api-reference/v2/errors).
10. Adopt [`?fields=`](/api-reference/v2/sparse-fields) where you only need a few keys — v1's `?fields=` silently ignored unknown names, whereas v2 returns a `400`, and v2 **omits** unrequested keys rather than nulling them.
11. Replace name-based lookups with the identity filters (`?name=`, `?key=`, `?url=`) — v2 path segments take ids, not attributes. See [Filtering and ordering](/api-reference/v2/filtering-and-ordering).
12. Confirm nothing you depend on is in the "not yet in v2" list above.

## Related

- [Pagination](/api-reference/v2/pagination)
- [Filtering and ordering](/api-reference/v2/filtering-and-ordering)
- [Expanding relations](/api-reference/v2/expanding-relations)
- [Work item type modes](/api-reference/v2/work-item-type-modes)
- [Errors](/api-reference/v2/errors)
