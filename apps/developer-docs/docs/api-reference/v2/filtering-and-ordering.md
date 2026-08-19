---
title: Filtering and ordering
description: How Plane API v2 list queries work. Exact, membership, null and range filters, relation filters by id, free-text search, and semantic ordering with order_by.
keywords: plane api v2, filtering, query parameters, order_by, search, state_group, priority, __in, __isnull, __gte, __lte
---

# Filtering and ordering

v2 list endpoints draw their query parameters from the same four families: **filters** that narrow the set, **search** that matches free text, **ordering** that sorts what is left, and **pagination** that slices it. Every list endpoint supports ordering and pagination; each one declares its own filter and search surface, and a few smaller collections — work item types, properties, property options, property contexts — offer only ordering and pagination. Where they are available the four families compose, and every filter you add narrows the result further (they are combined with AND, never OR).

Filters run after authorization, so a filter can only ever shrink the set of rows you were already allowed to see. There is no filter that widens access.

## Filter shapes

Public parameter names never contain `__`. The suffixes below are variants of a base name, and each list endpoint declares exactly which variants it supports.

| Shape          | Parameter form                | Example                                 | Matches                                 |
| -------------- | ----------------------------- | --------------------------------------- | --------------------------------------- |
| **Exact**      | `<name>`                      | `?priority=urgent`                      | Rows equal to the value                 |
| **Membership** | `<name>__in`                  | `?priority__in=urgent,high`             | Rows equal to any comma-separated value |
| **Null**       | `<name>__isnull`              | `?parent_id__isnull=true`               | Rows where the field is (or is not) set |
| **Range**      | `<name>__gte` / `<name>__lte` | `?created_at__gte=2026-01-01T00:00:00Z` | Rows on or after / on or before a bound |

A few things that are easy to get wrong:

- `__in` takes a **comma-separated list in a single parameter** — `?priority__in=urgent,high`. Repeating the parameter is not the same thing.
- `__gte` and `__lte` are inclusive on both ends. Pair them to express a window; send one alone for an open-ended bound.
- Date-time ranges want an ISO 8601 timestamp (`2026-01-01T00:00:00Z`); date ranges want a plain date (`2026-01-01`). Which one a parameter takes follows the field it filters.
- Not every base name offers every variant. `state_id` supports `__in` but not `__isnull`, because a work item always has a state. Check the endpoint's own parameter list rather than assuming the full set.

## Filtering by a relation

Filter a relation with its **`*_id` parameter**. There is no bare-name form — it is `state_id`, not `state`.

| Resource   | Relation filters                                                                       |
| ---------- | -------------------------------------------------------------------------------------- |
| Work items | `state_id`, `assignee_id`, `label_id`, `parent_id`, `cycle_id`, `module_id`, `type_id` |
| Cycles     | `owned_by_id`                                                                          |
| Modules    | `lead_id`                                                                              |
| Labels     | `parent_id`                                                                            |
| Members    | `member_id`                                                                            |

This mirrors how writes work — you set a relation with `state_id`, and you filter on it with `state_id` too. See [Migrating from v1](/api-reference/v2/migrating-from-v1) if you are used to v1's embedded relation objects.

```bash
# every cycle owned by one person
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/cycles/?owned_by_id=16c61a3a-512a-48ac-b0be-b6b46fe6f430" \
  -H "X-Api-Key: $PLANE_API_KEY"

# modules a person leads that are underway
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/modules/?lead_id=16c61a3a-512a-48ac-b0be-b6b46fe6f430&status=in-progress" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

## Looking something up by name

Addressing by a **mutable attribute** — a name, a URL, a version string — is a collection concern in v2, never a path
segment. Filter the list instead:

```bash
# the state called "In Progress"
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/ENG/states/?name=In%20Progress" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

Paired with [`?fields=`](/api-reference/v2/sparse-fields), that is a one-call name→id resolve of about fifteen tokens:

```bash
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/ENG/states/?name=In%20Progress&fields=id" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

```json
{
  "data": [{ "id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f" }],
  "next": null,
  "previous": null,
  "total_count": 1,
  "pagination": { "style": "offset" }
}
```

Matching is **case-insensitive and exact** — not a substring search. For substring matching use
[`?search=`](#search) instead.

| Filter                               | Available on                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `?name=`                             | states, labels, cycles, modules, milestones, projects, project and workspace views, initiatives, initiative labels, releases, release labels, customers, customer properties, estimates, teamspaces, webhooks, work item types (project and workspace), work item properties (project and workspace), property options, property contexts, project and workspace automations, automation nodes |
| `?key=`                              | projects (matches `identifier`), estimate points                                                                                                                                                                                                                                                                                                                                               |
| `?url=`                              | webhooks, work item links                                                                                                                                                                                                                                                                                                                                                                      |
| `?title=`                            | work item links                                                                                                                                                                                                                                                                                                                                                                                |
| `?value=`                            | estimate points                                                                                                                                                                                                                                                                                                                                                                                |
| `?version=`                          | release tags                                                                                                                                                                                                                                                                                                                                                                                   |
| `?external_id=`, `?external_source=` | 22 list endpoints, for sync and import correlation                                                                                                                                                                                                                                                                                                                                             |

::: info Duplicates are visible, not guessed
A filtered list is honest about ambiguity. If two states share a name, you get **two rows** and decide which one you
meant. There is no path-level "ambiguous identifier" error to handle, because there is no path-level attribute lookup.
:::

::: warning Scheme-prefixed path segments are gone
A brief v2 preview accepted `<scheme>:<value>` path segments — `…/states/name:In Progress/`, `…/projects/key:ENG/`,
`…/webhooks/url:https://…/`, `external:…`. Those were removed. A `name:`-style segment is now just an unknown id and
returns `404`.

Use the filters above instead. Path segments address by **stable identifier only** — see
[Addressing](#addressing-a-resource-in-a-path).
:::

## Addressing a resource in a path

Path segments take UUIDs, with exactly three human-readable exceptions — all of them stable, none of them
scheme-prefixed:

| Key                      | Where it works                                                                                                                                     |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Workspace **slug**       | the `workspaces/{slug}/` prefix on every route                                                                                                     |
| Project **identifier**   | the project detail route (`…/projects/ENG/`) and as a parent segment (`…/projects/ENG/work-items/`)                                                |
| Work item **`PROJ-123`** | the [by-identifier route](/api-reference/v2/work-items/get-work-item-by-identifier), project-scoped detail, and as a `work_item_id` parent segment |

```bash
# both of these address the same project
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/ENG/" -H "X-Api-Key: $PLANE_API_KEY"
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/" -H "X-Api-Key: $PLANE_API_KEY"
```

A project identifier is unique per workspace and uppercased on save, so it can never be ambiguous. Everything else in a
path is a UUID.

## Enum-backed filters are validated

Parameters backed by an enum — work item `priority` and `state_group`, state `group`, module `status`, comment `access` — are checked against their allowed values before the query runs. A value outside the enum is a clean `400 invalid_request` naming the offending field.

This matters more than it sounds. In an API that ignores unknown filter values, `?state_group=in_progress` (a plausible-looking guess; the real value is `started`) returns `200` with an empty list, and you spend an afternoon deciding whether the project is genuinely empty. In v2 it fails immediately:

<ResponsePanel status="400">

```json
{
  "type": "invalid_request",
  "code": "invalid_request",
  "detail": "One or more fields failed validation.",
  "errors": [
    {
      "field": "state_group",
      "code": "invalid_choice",
      "message": "Select a valid choice. in_progress is not one of the available choices."
    }
  ]
}
```

</ResponsePanel>

The `__in` variants validate every element of the list, not just the first.

## Search

`?search=<text>` is a case-insensitive partial match over the resource's searchable text. It is a convenience for lookups, not a query language — no operators, no field prefixes, no quoting.

| Resource                        | Searches                                                         |
| ------------------------------- | ---------------------------------------------------------------- |
| Work items                      | Name                                                             |
| States, labels, cycles, modules | Name                                                             |
| Work item comments              | Comment text                                                     |
| Members                         | Display name, email, first name, last name                       |
| Audit logs                      | Event name, actor display name, actor email, target display name |

Search composes with filters, so `?search=login&priority=urgent` finds urgent work items whose name contains "login".

## Ordering

`?order_by=<field>` sorts the list. Prefix the field with `-` for descending order:

```bash
?order_by=created_at     # oldest first
?order_by=-created_at    # newest first
```

Each resource declares its own allowed fields. Unlike the enum-backed _filters_ above, an unrecognized `order_by` does not fail — it falls back to the resource's default ordering. If a sort looks wrong, check the spelling against the endpoint's allowed values before assuming the data is wrong. Every ordering carries a unique tiebreak internally, so a page boundary never drops or duplicates a row just because two rows share a sort key.

### Semantic orderings

Two work item orderings sort by **meaning rather than by string**:

- `order_by=priority` sorts `urgent` → `high` → `medium` → `low` → `none`. Alphabetically that would be `high, low, medium, none, urgent`, which is useless.
- `order_by=state_group` sorts `backlog` → `unstarted` → `started` → `completed` → `cancelled` → `triage`, following the workflow rather than the alphabet.

`-priority` and `-state_group` reverse those sequences.

::: warning Semantic orderings are offset-only
`priority` and `state_group` cannot be combined with `?paginate=cursor` — a cursor needs a unique, monotonic sort key and these have a handful of distinct values. The pairing returns `400 ordering_not_cursor_eligible`. `sort_order` is not cursor-eligible either, for the same reason. On work items the cursor-eligible orderings are `created_at`, `updated_at`, `sequence_id`, and `id`. See [Pagination](/api-reference/v2/pagination#not-every-ordering-can-use-a-cursor).
:::

## Worked example: the work items list

The work items list is the largest filter surface in v2. Its parameters, grouped by concept:

**Relations**

| Base name     | Variants           | Type            |
| ------------- | ------------------ | --------------- |
| `state_id`    | `__in`             | `string (uuid)` |
| `type_id`     | `__in`             | `string (uuid)` |
| `assignee_id` | `__in`, `__isnull` | `string (uuid)` |
| `label_id`    | `__in`, `__isnull` | `string (uuid)` |
| `parent_id`   | `__in`, `__isnull` | `string (uuid)` |
| `cycle_id`    | `__in`, `__isnull` | `string (uuid)` |
| `module_id`   | `__in`, `__isnull` | `string (uuid)` |

**Enums and scalars**

| Name              | Variants | Type      | Values                                                                |
| ----------------- | -------- | --------- | --------------------------------------------------------------------- |
| `priority`        | `__in`   | `string`  | `urgent`, `high`, `medium`, `low`, `none`                             |
| `state_group`     | `__in`   | `string`  | `backlog`, `unstarted`, `started`, `completed`, `cancelled`, `triage` |
| `is_draft`        | —        | `boolean` | `true`, `false`                                                       |
| `sequence_id`     | —        | `integer` | The number in a `PROJ-123` identifier                                 |
| `external_id`     | —        | `string`  | Your system's id, for sync correlation                                |
| `external_source` | —        | `string`  | The system `external_id` came from                                    |

**Ranges**

| Base name     | Variants         | Type                 |
| ------------- | ---------------- | -------------------- |
| `created_at`  | `__gte`, `__lte` | `string (date-time)` |
| `updated_at`  | `__gte`, `__lte` | `string (date-time)` |
| `start_date`  | `__gte`, `__lte` | `string (date)`      |
| `target_date` | `__gte`, `__lte` | `string (date)`      |

Date fields are range-only — there is no exact `?created_at=` filter. To match a single day, bracket it: `?created_at__gte=2026-01-14T00:00:00Z&created_at__lte=2026-01-14T23:59:59Z`.

**Search** — `search`.

**Ordering** — `order_by`, one of `created_at`, `updated_at`, `sequence_id`, `id`, `sort_order`, `priority`, `state_group`, each also available with a `-` prefix.

**Pagination** — `per_page`, `offset`, `count`, `paginate`, `cursor`. See [Pagination](/api-reference/v2/pagination).

## Combined filters

```bash
# urgent and high-priority items that are in flight or already done
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/?priority__in=urgent,high&state_group__in=started,completed" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

```bash
# one person's open work, most urgent first
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/?assignee_id=16c61a3a-512a-48ac-b0be-b6b46fe6f430&state_group__in=backlog,unstarted,started&order_by=priority" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

```bash
# an incremental sync: everything touched since the last run, oldest first
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/?updated_at__gte=2026-01-14T09:22:41Z&order_by=updated_at&paginate=cursor&per_page=200" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

```bash
# top-level items only — nothing that is a sub-item of something else
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/?parent_id__isnull=true&is_draft=false" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

```bash
# unassigned work due this quarter, with the state object attached
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/?assignee_id__isnull=true&target_date__gte=2026-01-01&target_date__lte=2026-03-31&expand=state" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

```bash
# find the item you imported from another system
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/?external_source=jira&external_id=ENG-4417" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

## Related

- [Pagination](/api-reference/v2/pagination) — the envelopes, and which orderings a cursor can use
- [Expanding relations](/api-reference/v2/expanding-relations) — attaching related objects to filtered results
- [Errors](/api-reference/v2/errors) — the `invalid_request` body and its `errors[]` array
