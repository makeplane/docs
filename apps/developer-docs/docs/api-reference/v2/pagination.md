---
title: Pagination
description: How Plane API v2 paginates list endpoints. Offset pagination by default, opt-in cursor pagination, the response envelopes for each, and how to page through a full result set.
keywords: plane api v2, pagination, offset pagination, cursor pagination, per_page, next_cursor, total_count, paginate cursor
---

# Pagination

Every v2 list endpoint is paginated. A list response is always an **envelope object** — never a bare array — and the envelope tells you both what you got and how to get the rest.

v2 has two pagination styles:

| Style      | How you get it       | Envelope keys                                           | Cost                       | Best for                                         |
| ---------- | -------------------- | ------------------------------------------------------- | -------------------------- | ------------------------------------------------ |
| **Offset** | Default — do nothing | `data`, `next`, `previous`, `total_count`, `pagination` | Runs a `COUNT` per request | UI paging, jumping to a page, showing a total    |
| **Cursor** | `?paginate=cursor`   | `data`, `next_cursor`, `has_more`, `pagination`         | No `COUNT`                 | Full exports, deep traversal, changing data sets |

Both envelopes carry a `pagination.style` discriminator. Branch your client on that key rather than on which fields happen to be present — see [Write one loop for both styles](#write-one-loop-for-both-styles).

## Offset pagination (default)

Offset is what you get when you send nothing special. You control the window with `per_page` and `offset`.

```bash
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/?per_page=50&offset=0" \
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
  "next": 50,
  "previous": null,
  "total_count": 327,
  "pagination": { "style": "offset" }
}
```

</ResponsePanel>

### Reading the envelope

- `data` — the page of results.
- `next` — an **integer offset**, not a URL and not a token. Send it back as `?offset=` to get the following page. It is `null` on the last page.
- `previous` — the integer offset of the preceding page, or `null` when you are already at the start.
- `total_count` — how many rows match your filters across all pages. Omitted entirely when you pass `?count=false`.
- `pagination.style` — always `"offset"` here.

Because `next` and `previous` are plain integers, you can also compute them yourself and jump straight to an arbitrary page — `?offset=200&per_page=50` is the fifth page, no traversal required.

### Query parameters

- `per_page` — page size. Defaults to `50`, capped at `200`. Values above the cap are clamped down rather than rejected; a non-integer value is a `400 invalid_request`.
- `offset` — rows to skip from the start of the result set. Defaults to `0`, maximum `10000`. A negative, non-integer, or over-cap `offset` is a `400 invalid_request`, and the over-cap message points you at cursor pagination.
- `count` — set `?count=false` to skip the `COUNT` query. `total_count` is then omitted from the envelope; `next` and `previous` still work.

::: tip Turn off the count on hot paths
`total_count` costs a second database query on every request. If you are streaming a list into a job rather than rendering "327 results" in a UI, `?count=false` makes each page cheaper without changing how you traverse.
:::

::: warning Offset stops at 10000
`offset` is hard-capped at 10000 rows. If your result set is larger than that — a full export, a backfill, a nightly sync — switch to cursor pagination instead of trying to walk past the cap.
:::

## Cursor pagination (opt-in)

Cursor pagination is a keyset walk. Instead of counting rows to skip, each page hands you an opaque token that encodes where the previous page stopped.

Opt in with `?paginate=cursor`, then follow `next_cursor` until `has_more` is `false`.

```bash
# first page
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/?paginate=cursor&per_page=100" \
  -H "X-Api-Key: $PLANE_API_KEY"

# every page after that — same parameters, plus the token
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/?per_page=100&cursor=b3A9MTcx" \
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
  "next_cursor": "b3A9MTcx",
  "has_more": true,
  "pagination": { "style": "cursor" }
}
```

</ResponsePanel>

### What is different

- There is **no `total_count`** and no `count` parameter — cursor pagination never runs a `COUNT`. That is the point of it.
- There is **no `previous`**. Cursor traversal is forward-only.
- `next_cursor` is `null` and `has_more` is `false` on the last page.
- `per_page` behaves exactly as it does on the offset path: default `50`, max `200`.

Passing `?cursor=<token>` is enough to stay on the cursor path — you do not need to repeat `paginate=cursor` on follow-up requests. You **do** need to repeat everything else. The token encodes only the position in the walk; filters, `order_by`, and `per_page` are re-read from each request, so dropping them mid-traversal silently changes the result set you are walking.

The token is opaque. Treat it as a string to hand straight back to the API: do not parse it, do not build one yourself, and do not persist it as a long-lived bookmark. A malformed or truncated token is a `400 invalid_request`.

::: info Why cursor is stable
Offset pages are computed by skipping rows. If someone creates a work item while you are on page 3, everything shifts by one and you can see a row twice or miss it entirely. A cursor encodes the last row's sort key, so inserts and deletes elsewhere in the list cannot shift your window.
:::

### Not every ordering can use a cursor

A keyset walk needs an ordering whose key is unique and monotonic, so each resource declares an explicit allowlist of cursor-eligible `order_by` values rather than accepting any stored column. On work items the eligible values are `created_at`, `updated_at`, `sequence_id`, and `id`.

Everything else is rejected on the cursor path. `sort_order` is a plain stored column but is not unique, so it cannot anchor a keyset. The **semantic orderings** cannot either — `order_by=priority` sorts `urgent` before `none` and `order_by=state_group` sorts by workflow meaning, and neither produces a key a cursor can resume from.

Pairing one of those with cursor pagination returns a `400` with the stable code `ordering_not_cursor_eligible`:

<ResponsePanel status="400">

```json
{
  "type": "invalid_request",
  "code": "ordering_not_cursor_eligible",
  "detail": "This ordering can't be used with cursor pagination. Pass a cursor-safe ordering (e.g. order_by=created_at), or use the default offset pagination."
}
```

</ResponsePanel>

Two ways out, depending on what you actually need:

- You need the semantic sort — drop `paginate=cursor` and use offset.
- You need the deep traversal — sort by a cursor-eligible column such as `created_at`, and sort the results yourself once you have them all.

::: warning The check applies to the default ordering too
Eligibility is evaluated against the ordering that will actually run. If you omit `order_by`, that is the resource's own default — which is not always a cursor-eligible column. When a cursor request 400s even though you passed no `order_by`, pass an explicit cursor-eligible one such as `?order_by=created_at`.
:::

See [Filtering and ordering](/api-reference/v2/filtering-and-ordering) for the full ordering contract and each resource's allowed `order_by` values.

## Write one loop for both styles

The two envelopes share the `data` key and the `pagination.style` discriminator, so a single auto-paginator can serve every list endpoint. Branch on `pagination.style` — not on `"next" in body`, which breaks the moment someone flips a call to cursor.

<CodePanel title="Page through every result" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
# Cursor traversal in a shell loop: follow next_cursor until has_more is false.
URL="https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/"
CURSOR=""

while :; do
  BODY=$(curl -s -G "$URL" \
    -H "X-Api-Key: $PLANE_API_KEY" \
    --data-urlencode "paginate=cursor" \
    --data-urlencode "per_page=100" \
    ${CURSOR:+--data-urlencode "cursor=$CURSOR"})

  echo "$BODY" | jq -r '.data[] | "\(.identifier) \(.name)"'

  [ "$(echo "$BODY" | jq -r '.has_more')" = "true" ] || break
  CURSOR=$(echo "$BODY" | jq -r '.next_cursor')
done
```

</template>
<template #python>

```python
import requests

BASE = "https://api.plane.so/api/v2"
HEADERS = {"X-Api-Key": "your-api-key"}


def paginate(url, params=None):
    """Yield every item from a v2 list endpoint, whichever style it returns."""
    params = dict(params or {})

    while True:
        response = requests.get(url, headers=HEADERS, params=params)
        response.raise_for_status()
        body = response.json()

        yield from body["data"]

        if body["pagination"]["style"] == "cursor":
            if not body["has_more"]:
                return
            # Keep every other parameter. The cursor encodes only the position —
            # filters, order_by, and per_page are re-read from each request.
            params["cursor"] = body["next_cursor"]
        else:
            if body["next"] is None:
                return
            params["offset"] = body["next"]


work_items = paginate(
    f"{BASE}/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/",
    # count=false skips the COUNT on every page; swap it for paginate=cursor to
    # skip the 10000-row offset cap entirely.
    {"per_page": 100, "count": "false"},
)

for item in work_items:
    print(item["identifier"], item["name"])
```

</template>
<template #javascript>

```javascript
const BASE = "https://api.plane.so/api/v2";
const HEADERS = { "X-Api-Key": "your-api-key" };

async function* paginate(url, params = {}) {
  let query = { ...params };

  while (true) {
    const response = await fetch(`${url}?${new URLSearchParams(query)}`, {
      headers: HEADERS,
    });
    if (!response.ok) throw new Error(`${response.status} ${await response.text()}`);
    const body = await response.json();

    yield* body.data;

    if (body.pagination.style === "cursor") {
      if (!body.has_more) return;
      // Keep every other parameter. The cursor encodes only the position —
      // filters, order_by, and per_page are re-read from each request.
      query.cursor = body.next_cursor;
    } else {
      if (body.next === null) return;
      query.offset = body.next;
    }
  }
}

const workItems = paginate(
  `${BASE}/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/`,
  // count=false skips the COUNT on every page; swap it for paginate=cursor to
  // skip the 10000-row offset cap entirely.
  { per_page: "100", count: "false" },
);

for await (const item of workItems) {
  console.log(item.identifier, item.name);
}
```

</template>
</CodePanel>

## Choosing a style

Reach for **offset** when a human is looking at the result: you want a total to display, you want to jump to page 7, and the list is small enough that the 10000-row cap is irrelevant.

Reach for **cursor** when a machine is looking at the result: exports, backfills, incremental syncs, anything that walks a whole project's work items. It skips the `COUNT`, has no depth cap, and will not double-count rows if the data changes while you are traversing.

## Making pages cheaper with `?fields=`

Both envelopes compose with [`?fields=`](/api-reference/v2/sparse-fields), which is usually the biggest win available on
a paginated traversal — you pay for the keys you asked for, on every row of every page:

```bash
curl "https://api.plane.so/api/v2/workspaces/my-team/projects/ENG/work-items/?fields=id,updated_at&paginate=cursor&per_page=200" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

Two things worth knowing when you combine them:

- **The envelope keys are never filtered.** `?fields=` shapes the objects inside `data`; `next`, `total_count`,
  `next_cursor`, `has_more` and `pagination` always come back.
- **Some resources leave heavy fields off list rows by default.** Pages, releases, customers, initiatives, teamspaces,
  stickies, intake work items and templates omit `description_html` from collection rows unless you name it. So a plain
  list is already cheaper than the object shape suggests — and `?fields=all` opts back into the full row.

Pair `?count=false` with `?fields=` when you are draining a list and need neither the total nor most of the columns.

## Related

- [Filtering and ordering](/api-reference/v2/filtering-and-ordering) — narrowing a list before you page through it
- [Sparse fields](/api-reference/v2/sparse-fields) — `?fields=` for cheaper rows
- [Errors](/api-reference/v2/errors) — the full `problem+json` error contract and code list
- [Expanding relations](/api-reference/v2/expanding-relations) — `?expand=` on paginated lists
