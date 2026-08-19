---
title: Errors
description: The Plane API v2 error model — RFC 9457 problem+json responses, the full error code table, validation error arrays, rate limiting, and mode conflicts.
keywords: plane api v2 errors, rfc 9457, problem json, invalid_request, not_found, rate_limited, retry-after, plane api error codes
---

# Errors

Every v2 error is served as `application/problem+json` with the same three members, whether the failure is a typo in a
request body or a throttled client. One error handler covers the whole API.

```json
{
  "type": "conflict",
  "code": "states_managed_at_workspace",
  "detail": "States are managed at the workspace level."
}
```

## The problem shape

<div class="api-two-column">
<div class="api-left">

### Fields

Three members are always present and never `null`.

- `type` _string_

  The **coarse category**, from a closed set of 13 values (below). This is the fallback arm for a `code` you have never
  seen — small and stable enough to embed in a client.

- `code` _string_

  The **specific condition**, and the field to branch on. An open vocabulary that grows as v2 grows. When a condition
  needs no refinement, `code` is equal to `type`.

- `detail` _string_

  A human-readable explanation of this occurrence. Written for a developer reading a log — the wording is not part of
  the contract.

Plus one member on validation failures only:

- `errors` _array_

  Present **only** on `invalid_request`. One entry per rejected field, each carrying `field`, `code` and `message`. The
  per-field `code` (`required`, `invalid`, `unique`, `invalid_choice`, `max_length`, `does_not_exist`) lets you branch
  per field without matching English prose.

::: warning Branch on `code`, fall back to `type`
Several conditions share a status: `403` covers both `forbidden` and `workflow_transition_denied`, and `409` covers
`conflict` plus four refinements. The HTTP status alone cannot tell them apart, and neither can `type`.

Because `code` is always present — even when it just repeats `type` — you never need a `code ?? type` null check.
Switch on `code`, and let unrecognized values fall through to a `type` arm.

`detail` is written for people. Matching on its text will break.
:::

::: info No `status`, `title`, or URI `type`
Earlier v2 previews sent `status` and `title` in the body, and a `type` of the form
`https://api.plane.so/errors/<code>`. All three are gone: `status` duplicated the HTTP status line, `title` was
derivable boilerplate, and the URI pointed at a page a self-hosted instance never serves. `type` is now a bare slug.
:::

</div>
<div class="api-right">

<ResponsePanel status="400" title="A VALIDATION ERROR">

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
    },
    {
      "field": "group",
      "code": "invalid_choice",
      "message": "\"in_review\" is not a valid choice."
    }
  ]
}
```

</ResponsePanel>

<ResponsePanel status="404" title="A NON-VALIDATION ERROR">

```json
{
  "type": "not_found",
  "code": "not_found",
  "detail": "The requested resource was not found."
}
```

</ResponsePanel>

</div>
</div>

## Handling errors

Read `code` first, and fall back to `type` for codes you do not recognize yet — new codes can appear as v2 grows, but
the `type` set will not.

<CodePanel title="Branch on the error code" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
# -s keeps curl quiet, -w prints the status so you can see both parts
curl -s -w "\n%{http_code}\n" \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/states/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"color": "#3f76ff"}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/states/",
    headers={"X-Api-Key": "your-api-key"},
    json={"color": "#3f76ff"},
)

if not response.ok:
    problem = response.json()
    if problem["code"] == "invalid_request":
        for item in problem["errors"]:
            print(f"{item['field']}: {item['message']}")
    elif problem["code"] == "rate_limited":
        retry_after = int(response.headers.get("Retry-After", "1"))
        print(f"Throttled, retry in {retry_after}s")
    elif problem["code"] == "payment_required":
        print("Feature not enabled:", problem["detail"])
    else:
        # unknown code — fall back to the closed `type` set
        print(problem["type"], problem["code"], problem["detail"])
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/states/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ color: "#3f76ff" }),
  },
);

if (!response.ok) {
  const problem = await response.json();
  switch (problem.code) {
    case "invalid_request":
      problem.errors.forEach((e) => console.error(`${e.field}: ${e.message}`));
      break;
    case "rate_limited":
      console.error(`Throttled, retry in ${response.headers.get("Retry-After")}s`);
      break;
    case "payment_required":
      console.error("Feature not enabled:", problem.detail);
      break;
    default:
      // unknown code — fall back to the closed `type` set
      console.error(problem.type, problem.code, problem.detail);
  }
}
```

</template>
</CodePanel>

## The `type` vocabulary

Closed set, 13 values. It grows only when a genuinely new _kind_ of failure appears.

| `type`                   | Status            | Meaning                                                                                             |
| ------------------------ | ----------------- | --------------------------------------------------------------------------------------------------- |
| `invalid_request`        | `400`             | The request itself is wrong.                                                                        |
| `unauthorized`           | `401`             | Credentials missing or invalid.                                                                     |
| `payment_required`       | `402`             | The feature isn't enabled on your plan.                                                             |
| `forbidden`              | `403`             | Authenticated, but not allowed.                                                                     |
| `not_found`              | `404`             | No such resource, or it's outside your tenant.                                                      |
| `method_not_allowed`     | `405`             | Method not supported on this route — most often a `PUT`.                                            |
| `not_acceptable`         | `406`             | Can't produce the representation your `Accept` header asks for.                                     |
| `conflict`               | `409`             | The write collides with existing state or a business rule.                                          |
| `payload_too_large`      | `413`             | Request body over the size limit.                                                                   |
| `unsupported_media_type` | `415`             | `Content-Type` not accepted here.                                                                   |
| `rate_limited`           | `429`             | Throttled.                                                                                          |
| `server_error`           | `500`             | Unexpected server-side failure. Retry; alert if it persists.                                        |
| `service_unavailable`    | `502`/`503`/`504` | Temporarily unavailable. **This is the retryable 5xx** — back off and retry, unlike `server_error`. |

## Error codes

Every `code` maps to exactly one `type`, permanently. Codes are additive-only: they are never renamed or repurposed, so
a code you handle today keeps its meaning.

Status-level codes are equal to their `type` — `invalid_request`, `unauthorized`, `payment_required`, `forbidden`,
`not_found`, `method_not_allowed`, `not_acceptable`, `conflict`, `payload_too_large`, `unsupported_media_type`,
`rate_limited`, `server_error`, `service_unavailable`.

These refine one of those:

| Status | Code                                   | `type`            | Meaning                                                                     |
| ------ | -------------------------------------- | ----------------- | --------------------------------------------------------------------------- |
| `400`  | `count_pagination_disabled`            | `invalid_request` | Offset and COUNT are disabled for this resource. Use `?paginate=cursor`.    |
| `400`  | `ordering_not_cursor_eligible`         | `invalid_request` | This ordering can't back a keyset cursor. Use offset.                       |
| `403`  | `workflow_transition_denied`           | `forbidden`       | A workflow rule blocked the create or state transition.                     |
| `409`  | `states_managed_at_workspace`          | `conflict`        | States are governed at the workspace level for this workspace.              |
| `409`  | `work_item_types_managed_at_workspace` | `conflict`        | Wrong mode — this workspace manages work item types at the workspace level. |
| `409`  | `work_item_types_managed_at_project`   | `conflict`        | Wrong mode — this workspace manages work item types at the project level.   |
| `409`  | `governance_migration_in_progress`     | `conflict`        | A governance migration is running. Retry shortly.                           |
| `500`  | `listing_authorization_misconfigured`  | `server_error`    | A server-side authorization guard tripped. Report it; retrying won't help.  |

::: tip Handle the codes you care about, default the rest
The code set is deliberately large — a code exists when a client would write a _different branch_ for it, which is why
`count_pagination_disabled` ("switch to cursor") and `ordering_not_cursor_eligible` ("switch to offset") are separate.
A big enum costs you nothing: match what you act on, and send everything else to a `type`-based default arm.
:::

## Validation failures

A `400 invalid_request` is the only code that carries `errors[]`. Each entry names one rejected field, and a single
response can carry several — the API validates the whole payload rather than stopping at the first problem, so one
round trip tells you everything to fix.

Query parameters are validated too. Enum-backed parameters such as `priority`, `state_group`, state `group`, and module
`status` are checked against their allowed values, so a typo returns a clean `400` rather than a silently empty list.

`?fields=` and `?expand=` are strict in the same way, and their messages are written to be self-correcting — they name
the closest match and enumerate the valid set, so a client can fix itself in one round trip:

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

Naming an expandable relation in `?fields=` (or a field in `?expand=`) tells you which parameter you actually wanted
rather than guessing. See [Sparse fields](/api-reference/v2/sparse-fields).

::: tip Surface `field` and `message` verbatim
When you are relaying an error to a human — a CLI, a form, a Slack notification — the `field`/`message` pairs are
already specific enough to act on. Passing them through beats collapsing them into "invalid request". Use the per-entry
`code` when you need to branch programmatically.
:::

## Feature gating — `402`

Endpoints that belong to a paid or optional feature answer `402 payment_required` when the feature is off, rather than
`403` or `404`:

<ResponsePanel status="402">

```json
{
  "type": "payment_required",
  "code": "payment_required",
  "detail": "This feature is not available on your current plan."
}
```

</ResponsePanel>

Two things can produce it: the feature isn't in your plan, or it is but hasn't been switched on for the workspace or
project. Both are configuration, not permissions — retrying or widening your token's scopes will not help. Affected
surfaces include customers, releases, workflows, automations, worklogs and custom relation definitions.

Because `402` is declared on every operation, treat it as a first-class arm in shared client code rather than something
only certain endpoints can return.

## Rate limiting

Requests are throttled per token, with a separate bucket per token class — API keys, OAuth tokens, workspace tokens,
service tokens, and external tokens. Exceeding a bucket returns `429 rate_limited` with a `Retry-After` header.

<ResponsePanel status="429">

```json
{
  "type": "rate_limited",
  "code": "rate_limited",
  "detail": "Rate limit exceeded."
}
```

</ResponsePanel>

Wait the number of seconds in `Retry-After` before retrying. Backing off on a fixed schedule instead — or retrying
immediately — keeps you in the throttle. Because the buckets are per token, splitting a bulk job across several tokens
does not merge their limits, but it does multiply the load on the workspace.

## Mode conflicts

A workspace manages work item types in exactly one mode: at the **project** level or at the **workspace** level. Both
sets of endpoints exist at all times, so writing to the surface that is not currently in use returns `409` — not `404`
or `403`. The capability is real, it just lives on the other surface.

- Writing to a **project-mode** endpoint while workspace mode is on → `work_item_types_managed_at_workspace`.
- Writing to a **workspace-mode** endpoint while project mode is on → `work_item_types_managed_at_project`.

::: info Reads are never blocked by mode
Only writes conflict. You can list and read types and properties on either surface regardless of the active mode — a
project still surfaces its imported types while the workspace is in workspace mode.
:::

The code tells you where to send the write. See
[Work item type modes](/api-reference/v2/work-item-type-modes) for the full picture.

## Pagination errors

Both pagination `400`s mean the same thing: the pagination style and the request do not fit together.

- `ordering_not_cursor_eligible` — some orderings sort by meaning rather than by a stored column, for example
  `?order_by=priority`. Those cannot back a keyset cursor. Drop `?paginate=cursor` and use offset for that ordering.
- `count_pagination_disabled` — offset with a COUNT is unavailable for this resource. Switch to `?paginate=cursor`.

See [Pagination](/api-reference/v2/pagination) for the two envelopes and when to prefer each.

## Related

- [Authentication](/api-reference/v2/authentication) — what separates `401`, `403`, and a tenant-safe `404`.
- [Pagination](/api-reference/v2/pagination) — offset and cursor styles.
- [Introduction](/api-reference/v2/introduction) — request conventions, including why a missing trailing slash bites.
