---
title: Get a work item by identifier
description: Look up a Plane work item by its PROJ-123 human key across a workspace, without knowing the project UUID. Path parameters, expandable relations, OAuth scopes, errors, and code examples.
keywords: plane api v2, work item identifier, PROJ-123, human key, lookup work item by key, workspace scoped work item
---

# Get a work item by identifier

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/work-items/{identifier}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Retrieve a work item by its human key — `PROJ-142` — anywhere in the workspace.

This route exists for callers that **don't know the project UUID**. A `PROJ-142` in a commit message, a chat command, a
support ticket, or an LLM prompt carries no project id, and making the caller first list projects, find the one whose
identifier is `PROJ`, and then call the project-scoped route would be three requests to answer one question. Here it is
one request against the workspace.

The route is read-only. Creates, updates, deletes, and archiving all go through the project-scoped UUID routes.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="identifier" type="string" :required="true">

The work item's human key: the project identifier, a hyphen, and the work item's number — `PROJ-142`.

The project part must start with a letter, and it is upper-cased before lookup, so `proj-142` resolves the same work
item as `PROJ-142`. A project identifier is unique within a workspace, which is what makes this key unambiguous.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

<div class="params-list">

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed alongside the ids: `assignees` (the assigned users), `cycle` (the cycle it belongs to), `labels` (the applied labels), `modules` (the modules it belongs to), `parent` (its parent work item), `state` (the work item's state object), `type` (its work item type).

Expansion is separate-key: `?expand=state` keeps `state_id` and adds a `state` object next to it, so an id is never replaced by an object. An unknown value is a `400`.

`?fields=` and `?expand=` are independent namespaces. Relation names are not valid `?fields=` tokens (and vice versa), and an expanded object survives field filtering — `?fields=id,name&expand=state` returns `id`, `name` and `state`. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

::: info Everything unresolvable is a 404
A malformed key (`PROJ_142`, `142`, `-142`), a key from a project you can't see, a key in another workspace, and a key
that resolves to nothing all return the same `404`. That is deliberate: the response never reveals whether a work item
exists, only whether _you_ can read it. Archived work items are not served from this route either.
:::

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `archived_at`, `assignee_ids`, `created_at`, `created_by_id`, `custom_fields`, `cycle_id`, `id`, `identifier`, `is_draft`, `label_ids`, `module_ids`, `name`, `parent_id`, `priority`, `project_id`, `sequence_id`, `start_date`, `state_id`, `target_date`, `type_id`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_items:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                         |
| ------ | ------------------ | --------------------------------------------------------------------------------------------- |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                               |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.          |
| `403`  | `forbidden`        | Your token scope can't read work items.                                                       |
| `404`  | `not_found`        | Malformed identifier, no such work item, it's outside your tenant or visibility, or archived. |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                          |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                                    |

</div>

</div>

<div class="api-right">

<CodePanel title="Get a work item by identifier" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/work-items/PROJ-142/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/work-items/PROJ-142/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/work-items/PROJ-142/",
  {
    method: "GET",
    headers: { "X-Api-Key": "your-api-key" },
  },
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "id": "8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13",
  "name": "Fix login redirect loop",
  "identifier": "PROJ-142",
  "sequence_id": 142,
  "priority": "high",
  "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "type_id": "2d9d1a97-5c6f-4a1e-9d5b-8c2f7e30b6a4",
  "assignee_ids": ["16c61a3a-512a-48ac-b0be-b6b46fe6f430"],
  "label_ids": ["c1b8f3d6-9a44-4e12-8f7a-2b6d5c9e1a03"],
  "parent_id": null,
  "start_date": "2026-01-12",
  "target_date": "2026-01-20",
  "is_draft": false,
  "archived_at": null,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "custom_fields": {
    "severity": {
      "id": "b52e7c18-4d3f-4a90-8e61-0f7a3c9d2b45",
      "value": "Sev-1",
      "value_detail": {
        "id": "7c0a5f39-2e84-4b17-9a6c-1d8e4f2b60c9",
        "name": "Sev-1",
        "logo_props": {}
      }
    }
  }
}
```

</ResponsePanel>

<ResponsePanel status="404">

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

## Getting from the identifier to a write

The response body is the full read shape, so it hands you everything a follow-up write needs — `id` for the detail
route. The project UUID is not in the read shape, so pair the lookup with the project you already know, or resolve it
once and cache it:

```bash
# 1. resolve the human key
GET /api/v2/workspaces/my-team/work-items/PROJ-142/

# 2. write against the project-scoped UUID route
PATCH /api/v2/workspaces/my-team/projects/{project_id}/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/
```

## Identifier vs UUID

|            | `identifier`                              | `id`                                                                          |
| ---------- | ----------------------------------------- | ----------------------------------------------------------------------------- |
| Example    | `PROJ-142`                                | `8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13`                                        |
| Scope      | Unique within a workspace                 | Globally unique                                                               |
| Route      | This page — reads only                    | [Get a work item](/api-reference/v2/work-items/get-work-item) and every write |
| Comes from | The project identifier plus `sequence_id` | Assigned by Plane at creation                                                 |

Both are stable. Use the identifier where a human is in the loop, and the UUID everywhere else.
