---
title: Sparse fields
description: Use ?fields= to return only the keys you need from the Plane v2 REST API. Omit semantics, the all token, deferred and detail-only fields, and how it composes with ?expand=.
keywords: plane api v2, sparse fields, fields parameter, partial response, omit fields, all token, detail_only, deferred_on_list, token cost
---

# Sparse fields

Every v2 endpoint whose response is a resource body accepts `?fields=` — a comma-separated list of the keys you
actually want.

```bash
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/ENG/work-items/?fields=id,name,state_id" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

```json
{
  "data": [
    {
      "id": "8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13",
      "name": "Fix login redirect loop",
      "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
    },
    {
      "id": "3b7d9e40-1c62-4a85-b0f3-9d5c2e6a8471",
      "name": "Rate limit the invite endpoint",
      "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
    }
  ],
  "next": 50,
  "previous": null,
  "total_count": 327,
  "pagination": { "style": "offset" }
}
```

A default work item row is about twenty keys. If you only need three, `?fields=` is the difference between paying for
twenty and paying for three — multiplied by up to 200 rows a page, on every call.

## Omit, not null

Unrequested keys are **absent from the JSON**. They are not returned as `null`.

This is the whole design decision, and it is worth being precise about, because it makes one thing possible that
null-filling does not: telling apart _"I didn't ask for this"_ from _"this is genuinely null"_.

| Response              | Means                                      |
| --------------------- | ------------------------------------------ |
| key absent            | you didn't request it                      |
| `"target_date": null` | you requested it and it is genuinely unset |

Null-filling would also save you almost nothing. On a sparse row the key names are most of the payload, so a nulled
twenty-field row still ships twenty key names. Omitting is what actually reduces the response.

::: tip Unrequested fields are never computed
Omitted keys are dropped before serialization, so a field that costs a query or a computation to produce is not just
excluded from the response — it never runs. `?fields=` is a latency win as well as a payload win.
:::

## `id` always comes back

You never have to ask for `id`, and you cannot get rid of it:

```
?fields=name        → { "id": "…", "name": "…" }
```

It is the one shape guarantee, so a client can always correlate a row back to its resource. (A handful of
parent-addressed singletons — project features, for instance — have no `id` of their own. Those return exactly what you
asked for.)

## `all`

`all` is a reserved token meaning "every requestable field for this response shape".

```
?fields=all         → the full body
?fields=all,name    → the full body; `all` wins and `name` is redundant
```

Use it when you want everything _including_ fields that a list would normally leave out — see deferred fields below.

## What a list leaves out by default

Two Meta-level rules shape the default list row, so that the naive call — no parameters at all — isn't the expensive
one.

### Deferred fields

Unbounded-size fields like `description_html` are **omitted from collection rows by default**. Naming one pulls it
back:

```
GET …/pages/                              → rows without description_html
GET …/pages/?fields=id,name,description_html  → rows with it
GET …/pages/?fields=all                   → rows with it
```

Deferral is a default, not a ban. It affects collections only — a single-object response is never deferred, so
`GET …/pages/{id}/` always includes `description_html`.

Resources that defer something today: customers, customer requests, initiatives, intake work items, pages (project and
workspace), releases, stickies, teamspaces, and work item templates. Templates defer `template_data` as well, since it
embeds HTML too.

### Detail-only fields

A detail-only field is never on a collection row, and **cannot be requested there**:

```
GET …/work-items/?fields=id,custom_fields
```

```json
{
  "type": "invalid_request",
  "code": "invalid_request",
  "detail": "One or more fields failed validation.",
  "errors": [
    {
      "field": "fields",
      "code": "invalid",
      "message": "custom_fields is not available on collection responses; retrieve the work item."
    }
  ]
}
```

Work item `custom_fields` is the only such field today. Populating it requires a per-item property resolution that the
list path can't afford, so rather than return a misleading `null` on every row, the key is absent on collections and
honest on detail. See [List work items](/api-reference/v2/work-items/list-work-items).

## Where it applies

`?fields=` works on every response rendered by a resource read serializer:

- list and retrieve
- `POST` and `PATCH` echoes
- `upsert`
- custom list actions

It does **not** apply to:

- `APIView` endpoints — [current user](/api-reference/v2/users/get-current-user),
  [workspace features](/api-reference/v2/workspace-features/get-workspace-features),
  [effective permissions](/api-reference/v2/permissions/get-workspace-permissions),
  [artifacts](/api-reference/v2/artifacts/overview)
- `bulk` writes, whose response is a per-row result envelope rather than a resource body
- bespoke bodies such as upload credentials and grouped relation reads
- resources served by a compact `Lite` serializer, such as work item property options and type-property attachments

The reference page for each endpoint lists its requestable fields when the parameter is available. The OpenAPI document
enumerates them too, so a generated SDK or MCP tool schema constrains the value up front rather than discovering it from
a `400`.

## Typos fail loudly

An unknown field name is a `400` — never a silently-ignored parameter. The message names the closest match and
enumerates the valid set, so a client can correct itself in one round trip:

```json
{
  "type": "invalid_request",
  "code": "invalid_request",
  "detail": "One or more fields failed validation.",
  "errors": [
    {
      "field": "fields",
      "code": "invalid",
      "message": "Unknown field(s): titel — did you mean 'title'? Valid fields: all, id, name, identifier, …"
    }
  ]
}
```

Strictness is deliberate here. If a typo were ignored, you would get the full row back, notice nothing, and lose the
saving invisibly.

An empty value (`?fields=`) is not an error — it simply applies no filtering.

## Composing with `?expand=`

`?fields=` and `?expand=` are **separate namespaces**, and they do not interact.

```
?fields=id,name&expand=state    →  { "id": "…", "name": "…", "state": { … } }
```

`state_id` is a field; `state` is an expandable relation. Filtering fields never drops an expansion, and expanding never
replaces an id with an object.

That means naming a relation in `?fields=` is a `400`, not an implicit expand — and the error tells you which parameter
you wanted:

> `'state'` is an expandable relation, not a response field — use `?expand=state` to embed the object, or
> `?fields=state_id` for just its id.

The reverse is symmetric: `?expand=state_id` points you back at `?fields=state_id`. See
[Expanding relations](/api-reference/v2/expanding-relations).

## The one-call identity lookup

`?fields=` composes with the identity filters to make name→id resolution cheap — useful when you hold a human-readable
name and need the UUID:

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

Because it's a list, duplicates are visible as two rows rather than hidden behind a guess. See
[Filtering and ordering](/api-reference/v2/filtering-and-ordering).

## Notes for SDK authors

Read components in the OpenAPI document declare `id` as their only required property. That is truthful rather than
lax: under omit semantics any other key genuinely may be absent, and a generated type that marks fields required would
be lying.

If you are generating a typed client, the ergonomic move is to narrow the return type from the requested field list —
`list({ fields: ["id", "name"] })` yielding `Pick<WorkItem, "id" | "name">[]`. That requires a generator that can
express const-generic narrowing.
