---
title: Create a work item
description: Create a work item in a Plane project with the v2 REST API. Body parameters, id and human-readable inputs, priority values, OAuth scopes, error codes, and code examples.
keywords: plane api v2, create work item, POST work items, state_id, assignees by email, labels by name, parent identifier, priority
---

# Create a work item

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-items/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Create a work item in a project. Only `name` is required — everything else falls back to the project's defaults, so the
smallest useful create is one field.

Each relation accepts either its id field or a **write-only human-readable parallel**: `state` instead of `state_id`,
`assignees` (emails) instead of `assignee_ids`, `labels` (names) instead of `label_ids`, and so on. Send one or the
other, never both. This is what lets an importer or an agent write a fully-populated work item without first resolving
six UUIDs.

The response is the standard sparse read shape, with `custom_fields` populated.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project to create the work item in.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="name" type="string" :required="true">

Title of the work item. Maximum 255 characters. The only required field.

</ApiParam>

<ApiParam name="description_html" type="string" :required="false">

Rich-text body as HTML, for example `<p>Steps to reproduce…</p>`. The HTML is sanitized on the way in; content that
can't be sanitized is rejected with a `400`.

`description_html` is **not** part of the read shape, so it will not appear in the response.

</ApiParam>

<ApiParam name="priority" type="string" :required="false">

One of `urgent`, `high`, `medium`, `low`, `none`. Defaults to `none`.

</ApiParam>

<ApiParam name="state_id" type="string (uuid)" :required="false">

The workflow state to create the work item in. Must be a state of this project. Omit it and the work item lands in the
project's default state.

</ApiParam>

<ApiParam name="state" type="string" :required="false">

The state's **name** instead of its id, for example `In Progress`. Matched case-insensitively within the project.
Write-only.

Unknown name or a name that matches more than one state is a `400`. Sending both `state` and `state_id` is a `400`.

</ApiParam>

<ApiParam name="type_id" type="string (uuid)" :required="false">

The work item type. Accepts a type owned by the project and a workspace-level type imported into it. Requires work item
types to be enabled.

</ApiParam>

<ApiParam name="type" type="string" :required="false">

The type's **name** instead of its id, for example `Bug`. Matched case-insensitively among the project's non-epic
types. Write-only.

</ApiParam>

<ApiParam name="parent_id" type="string (uuid)" :required="false">

The parent work item. The parent must be in the same workspace, but it may live in a different project.

</ApiParam>

<ApiParam name="parent" type="string" :required="false">

The parent's **identifier** instead of its id, for example `PROJ-118`. Resolved within the workspace. Write-only.

</ApiParam>

<ApiParam name="assignee_ids" type="array of string (uuid)" :required="false">

User ids to assign. Each must be an active, assignable member of the project.

Leave it out and the project's default assignee is applied, if one is configured. Send `[]` to create the work item
with no assignee at all.

</ApiParam>

<ApiParam name="assignees" type="array of string (email)" :required="false">

Member **email addresses** instead of ids, for example `["ana@example.com"]`. Every address must belong to an active,
assignable project member — any that don't are named in the `400`. Write-only.

</ApiParam>

<ApiParam name="label_ids" type="array of string (uuid)" :required="false">

Label ids to apply. Each must be a label of this project, or a workspace-level label available to it.

</ApiParam>

<ApiParam name="labels" type="array of string" :required="false">

Label **names** instead of ids, for example `["regression", "auth"]`. Matched case-insensitively against the project's
labels and the workspace-level labels available to it. A name that exists at both levels is ambiguous and returns a
`400` telling you to use `label_ids`. Write-only.

</ApiParam>

<ApiParam name="estimate_point_id" type="string (uuid)" :required="false">

The estimate point to assign, from the project's active estimate system.

</ApiParam>

<ApiParam name="estimate" type="string" :required="false">

The estimate point's **value** instead of its id, for example `5` or `L`. Resolved against the project's active
estimate. Write-only.

</ApiParam>

<ApiParam name="start_date" type="string (date)" :required="false">

Planned start, for example `2026-01-12`. Must not be after `target_date`.

</ApiParam>

<ApiParam name="target_date" type="string (date)" :required="false">

Planned due date, for example `2026-01-20`.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this work item, for sync and import correlation. Maximum 255 characters.

Stored and filterable on [List work items](/api-reference/v2/work-items/list-work-items), but not returned on reads.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `github` or `jira`. Maximum 255 characters.

</ApiParam>

</div>
</div>

::: info Setting custom property values
Work item type custom properties are written through a separate `custom_fields` object on the request body, keyed by
property name, and are validated against the type you selected. Its shape depends on the type you chose, so it is not
declared in the OpenAPI schema — read it from
[the type's schema endpoint](/api-reference/v2/work-item-types/get-work-item-type-schema). It requires custom
properties to be enabled for the workspace — sending it otherwise is a `400`. Properties you omit are filled from the
type's defaults. See [work item properties](/api-reference/v2/work-item-properties/list-work-item-properties).
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

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed alongside the ids: `assignees` (the assigned users), `cycle` (the cycle it belongs to), `labels` (the applied labels), `modules` (the modules it belongs to), `parent` (its parent work item), `state` (the work item's state object), `type` (its work item type).

Expansion is separate-key: `?expand=state` keeps `state_id` and adds a `state` object next to it, so an id is never replaced by an object. An unknown value is a `400`.

`?fields=` and `?expand=` are independent namespaces. Relation names are not valid `?fields=` tokens (and vice versa), and an expanded object survives field filtering — `?fields=id,name&expand=state` returns `id`, `name` and `state`. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_items:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                                                                                                                                                             |
| ------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | Missing `name`; a bad `priority`; `start_date` after `target_date`; an unresolvable or ambiguous `state`/`type`/`parent`/`assignees`/`labels`/`estimate`; both a name and its `*_id`; or an id from another project or workspace. |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                                                                                                                                                                   |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.                                                                                                                                              |
| `403`  | `forbidden`              | A workflow rule forbids creating a work item in the requested state.                                                                                                                                                              |
| `404`  | `not_found`              | No such workspace or project, or it's outside your tenant.                                                                                                                                                                        |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                                                                                                                                                              |
| `409`  | `conflict`               | The write collides with a uniqueness or protected-resource constraint.                                                                                                                                                            |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                                                                                                                                                          |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                                                                                                                                                               |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                                                                                                                                                                        |

</div>

</div>

<div class="api-right">

<CodePanel title="Create a work item" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Fix login redirect loop",
  "priority": "high",
  "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "assignee_ids": ["16c61a3a-512a-48ac-b0be-b6b46fe6f430"],
  "target_date": "2026-01-20"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "name": "Fix login redirect loop",
        "priority": "high",
        "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
        "assignee_ids": ["16c61a3a-512a-48ac-b0be-b6b46fe6f430"],
        "target_date": "2026-01-20",
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Fix login redirect loop",
      priority: "high",
      state_id: "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
      assignee_ids: ["16c61a3a-512a-48ac-b0be-b6b46fe6f430"],
      target_date: "2026-01-20",
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
  "id": "8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13",
  "name": "Fix login redirect loop",
  "identifier": "PROJ-142",
  "sequence_id": 142,
  "priority": "high",
  "state_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "type_id": null,
  "assignee_ids": ["16c61a3a-512a-48ac-b0be-b6b46fe6f430"],
  "label_ids": [],
  "parent_id": null,
  "start_date": null,
  "target_date": "2026-01-20",
  "is_draft": false,
  "archived_at": null,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "custom_fields": {}
}
```

</ResponsePanel>

<CodePanel title="Create with names instead of ids" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Fix login redirect loop",
  "state": "In Progress",
  "type": "Bug",
  "parent": "PROJ-118",
  "assignees": ["ana@example.com"],
  "labels": ["regression", "auth"],
  "estimate": "5"
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "name": "Fix login redirect loop",
        "state": "In Progress",
        "type": "Bug",
        "parent": "PROJ-118",
        "assignees": ["ana@example.com"],
        "labels": ["regression", "auth"],
        "estimate": "5",
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Fix login redirect loop",
      state: "In Progress",
      type: "Bug",
      parent: "PROJ-118",
      assignees: ["ana@example.com"],
      labels: ["regression", "auth"],
      estimate: "5",
    }),
  },
);
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="400">

```json
{
  "type": "invalid_request",
  "code": "invalid_request",
  "detail": "The request body failed validation.",
  "errors": [
    {
      "field": "state",
      "code": "invalid",
      "message": "No state named 'In Reviewing' in this project."
    }
  ]
}
```

</ResponsePanel>

</div>
</div>

## Names or ids, not both

The human-readable inputs are resolved to their id equivalents before anything is written, and the rules are the same
for all six:

| You send                             | What happens                                              |
| ------------------------------------ | --------------------------------------------------------- |
| `state_id` only                      | Used directly. Must belong to this project.               |
| `state` only                         | Resolved by name, case-insensitively, within the project. |
| `state` and `state_id`               | `400` — "Provide either state_id or state, not both."     |
| A name matching nothing              | `400` naming the field and the value you sent.            |
| A name matching more than one record | `400` telling you to use the id field instead.            |

Prefer the id fields in code you control and reuse across runs; prefer the names when you're bridging a system whose
vocabulary is already words — a Jira status, a Slack email, a label the user typed.

## Workflow rules can reject a create

If the project runs workflow rules, creating a work item directly into a restricted state returns `403` with
`workflow_transition_denied` — distinct from a plain permission `forbidden`. Branch on the `code`: `forbidden` means
ask for access, `workflow_transition_denied` means create it in an allowed state and move it from there.
