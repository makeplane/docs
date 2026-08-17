---
title: Update a work item
description: Partially update a Plane work item with the v2 REST API. PATCH semantics, id and human-readable inputs, replacing assignees and labels, workflow rules, scopes, errors, and code examples.
keywords: plane api v2, update work item, PATCH work item, change state, reassign work item, clear parent, workflow transition denied
---

# Update a work item

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Update a work item. Every field is optional and the update is partial — send only what changes, and everything you
leave out stays exactly as it was.

Omitting a field is not the same as sending `null`. Omit `target_date` and the existing due date is preserved; send
`"target_date": null` and it is cleared.

There is no `PUT` in v2. A `PUT` to this path returns `405 method_not_allowed`.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the work item belongs to.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The work item's UUID. This lookup is UUID-only — a `PROJ-142` identifier here returns `404`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="name" type="string" :required="false">

New title. Maximum 255 characters.

</ApiParam>

<ApiParam name="description_html" type="string" :required="false">

Replacement rich-text body as HTML. Sanitized on the way in; content that can't be sanitized is rejected with a `400`.
Not part of the read shape, so it won't appear in the response.

</ApiParam>

<ApiParam name="priority" type="string" :required="false">

One of `urgent`, `high`, `medium`, `low`, `none`.

</ApiParam>

<ApiParam name="state_id" type="string (uuid)" :required="false">

Move the work item to another state of the same project. This is the field workflow rules police — see
[Workflow rules](#workflow-rules-can-reject-a-transition).

</ApiParam>

<ApiParam name="state" type="string" :required="false">

The target state's **name** instead of its id, for example `Done`. Matched case-insensitively within the project.
Write-only. Sending both `state` and `state_id` is a `400`.

</ApiParam>

<ApiParam name="type_id" type="string (uuid)" :required="false">

Change the work item type. Send `null` to make the work item untyped.

</ApiParam>

<ApiParam name="type" type="string" :required="false">

The type's **name** instead of its id, for example `Bug`. Write-only.

</ApiParam>

<ApiParam name="parent_id" type="string (uuid)" :required="false">

Re-parent the work item. The parent must be in the same workspace and may be in a different project. Send `null` to
detach it and make it top-level.

</ApiParam>

<ApiParam name="parent" type="string" :required="false">

The parent's **identifier** instead of its id, for example `PROJ-118`. Write-only.

</ApiParam>

<ApiParam name="assignee_ids" type="array of string (uuid)" :required="false">

**Replaces** the whole assignee set — it is not additive. Send the complete list you want, `[]` to unassign everyone,
or omit the field to leave assignees untouched.

</ApiParam>

<ApiParam name="assignees" type="array of string (email)" :required="false">

Member **email addresses** instead of ids. Same replace-the-set semantics. Every address must belong to an active,
assignable project member. Write-only.

</ApiParam>

<ApiParam name="label_ids" type="array of string (uuid)" :required="false">

**Replaces** the whole label set. Send `[]` to strip all labels, or omit the field to leave them untouched.

</ApiParam>

<ApiParam name="labels" type="array of string" :required="false">

Label **names** instead of ids. Same replace-the-set semantics. A name that exists at both project and workspace level
is ambiguous and returns a `400` telling you to use `label_ids`. Write-only.

</ApiParam>

<ApiParam name="estimate_point_id" type="string (uuid)" :required="false">

Change the estimate point, from the project's active estimate system. Send `null` to clear the estimate.

</ApiParam>

<ApiParam name="estimate" type="string" :required="false">

The estimate point's **value** instead of its id, for example `5`. Write-only.

</ApiParam>

<ApiParam name="start_date" type="string (date)" :required="false">

Planned start, or `null` to clear it. Must not be after `target_date`.

</ApiParam>

<ApiParam name="target_date" type="string (date)" :required="false">

Planned due date, or `null` to clear it.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this work item. Maximum 255 characters. Filterable on
[List work items](/api-reference/v2/work-items/list-work-items), but not returned on reads.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `github` or `jira`. Maximum 255 characters.

</ApiParam>

</div>
</div>

::: info Fields you cannot patch
`id`, `identifier`, `sequence_id`, `is_draft`, `archived_at`, `created_at`, and `created_by_id` are read-only — sending
them has no effect. In particular, archiving is not a `PATCH` on `archived_at`; use
[Archive a work item](/api-reference/v2/work-items/archive-work-item).

Custom property values go through a separate `custom_fields` object on the request body, keyed by property name — its
shape follows the work item's type, so it is not declared in the OpenAPI schema. See
[the type's schema endpoint](/api-reference/v2/work-item-types/get-work-item-type-schema). On a `PATCH` only the
properties you submit are replaced; untouched properties keep their values and are never required-checked.
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

| Status | Code                     | Cause                                                                                                                                                                                                             |
| ------ | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | A bad `priority`; `start_date` after `target_date`; an unresolvable or ambiguous `state`/`type`/`parent`/`assignees`/`labels`/`estimate`; both a name and its `*_id`; or an id from another project or workspace. |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                                                                                                                                                   |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.                                                                                                                              |
| `403`  | `forbidden`              | A workflow rule forbids the requested state transition.                                                                                                                                                           |
| `404`  | `not_found`              | No such work item, or it's outside your project or tenant.                                                                                                                                                        |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                                                                                                                                              |
| `409`  | `conflict`               | The write collides with a uniqueness or protected-resource constraint.                                                                                                                                            |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                                                                                                                                          |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                                                                                                                                               |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                                                                                                                                                        |

</div>

</div>

<div class="api-right">

<CodePanel title="Update a work item" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "priority": "urgent",
  "state": "In Review",
  "assignees": ["ana@example.com", "rk@example.com"],
  "target_date": null
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b"
    "/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "priority": "urgent",
        "state": "In Review",
        "assignees": ["ana@example.com", "rk@example.com"],
        "target_date": None,
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b" +
    "/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/",
  {
    method: "PATCH",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      priority: "urgent",
      state: "In Review",
      assignees: ["ana@example.com", "rk@example.com"],
      target_date: null,
    }),
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
  "priority": "urgent",
  "state_id": "5d2a91b7-64c0-4f38-b9e2-0a3f7c6d8149",
  "type_id": "2d9d1a97-5c6f-4a1e-9d5b-8c2f7e30b6a4",
  "assignee_ids": ["16c61a3a-512a-48ac-b0be-b6b46fe6f430", "9b7f4c53-2d18-4a6e-8c05-1f3e7d9a2b64"],
  "label_ids": ["c1b8f3d6-9a44-4e12-8f7a-2b6d5c9e1a03"],
  "parent_id": null,
  "start_date": "2026-01-12",
  "target_date": null,
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

<ResponsePanel status="403">

```json
{
  "type": "forbidden",
  "code": "workflow_transition_denied",
  "detail": "State transition is not allowed."
}
```

</ResponsePanel>

</div>
</div>

## Omitted, empty, and null

These three are different, and the difference matters most on the list fields:

| Request body              | Result                              |
| ------------------------- | ----------------------------------- |
| `{}` — field omitted      | Assignees unchanged.                |
| `{"assignee_ids": []}`    | All assignees removed.              |
| `{"assignee_ids": ["…"]}` | Assignees become exactly that list. |
| `{"parent_id": null}`     | Parent detached.                    |

`assignee_ids` and `label_ids` replace the set rather than adding to it, so to add one assignee you send the existing
ids plus the new one. Read the work item first if you don't already hold the current list.

## Workflow rules can reject a transition

If the project runs workflow rules, a state change they don't permit returns `403` with `workflow_transition_denied`
and nothing is written. That is a different situation from `forbidden`, which means your role or token scope can't edit
the work item at all — branch on the `code`, not the status.

Only a state change can trigger it. Updating a name or a due date never runs the transition check.
