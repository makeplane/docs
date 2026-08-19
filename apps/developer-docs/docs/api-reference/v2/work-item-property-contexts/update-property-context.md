---
title: Update a property context
description: Update the scope or the overrides of a work item property context with the Plane v2 REST API. Partial PATCH semantics, set-replacement for project and type lists, option replacement, OAuth scopes, error codes, and code examples.
keywords: plane api v2, update property context, patch context, applies_to_all_projects, project_ids, issue_type_ids, options replacement, PATCH contexts
---

# Update a property context

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-properties/{property_id}/contexts/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Change what a context covers, or what it imposes on the property inside that coverage. Both halves are editable in one request: the scope fields move the boundary, and `is_required`, `is_multi`, `default_value`, `settings`, and `options` change the rules within it.

`PATCH` is partial at the field level. Send only the fields you want to change; anything you omit keeps its current value. Fields that hold collections behave differently — see [Lists are replaced, not merged](#lists-are-replaced-not-merged).

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="property_id" type="string (uuid)" :required="true">

The workspace-level property the context belongs to. A project-level property id is not addressable here and returns `404 not_found`.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The id of the context to update.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

Every field is optional — send the subset you are changing. The one constraint that survives a partial update is the scope: neither axis may be left without coverage, so turning a wildcard flag off has to arrive in the same request as the ids that replace it.

<div class="params-list">

<ApiParam name="name" type="string" :required="false">

New display name, unique among this property's contexts. Maximum 255 characters.

</ApiParam>

<ApiParam name="applies_to_all_projects" type="boolean" :required="false">

Switch the project axis between "every project" and an explicit list.

Setting it to `true` discards the context's stored `project_ids`, so the context reads back with an empty list. Setting it to `false` requires `project_ids` in the same request unless the context already has projects stored.

Only one context per property may have this set to `true`, so turning it on while another context holds the slot returns `400`.

</ApiParam>

<ApiParam name="project_ids" type="array of string (uuid)" :required="false">

Replace the exact set of projects this context covers. What you send becomes the whole list: ids you leave out are unlinked, and ids you add are linked.

Rejected with a `400` when `applies_to_all_projects` is `true`, and when the list would be empty while the flag is `false`. Every id must belong to this workspace, and duplicates are rejected. Write-only as an input; the response echoes the stored links in `project_ids`.

</ApiParam>

<ApiParam name="applies_to_all_work_item_types" type="boolean" :required="false">

Switch the work item type axis between "every type" and an explicit list. Same rules as `applies_to_all_projects`: turning it on clears `issue_type_ids`, turning it off needs types to fall back on.

</ApiParam>

<ApiParam name="issue_type_ids" type="array of string (uuid)" :required="false">

Replace the exact set of work item types this context covers. Same set-replacement semantics as `project_ids`, and the same validation against the wildcard flag.

</ApiParam>

<ApiParam name="is_required" type="boolean" :required="false">

Whether the property must be filled in inside this scope. Replaces the property's own `is_required` here.

</ApiParam>

<ApiParam name="is_multi" type="boolean" :required="false">

Whether the property accepts several values inside this scope. Replaces the property's own `is_multi` here.

</ApiParam>

<ApiParam name="default_value" type="array of string" :required="false">

Values applied when a work item in this scope has nothing set. For `OPTION` properties, options in this context flagged `is_default` take precedence over this array.

</ApiParam>

<ApiParam name="options" type="array of object" :required="false">

Replace this context's option list. Entries are the same shape as on create: `id` to keep an existing option, `name` to add a new one, plus optional `description` and `is_default`. An option's `sort_order` is read-only — Plane assigns it from the order of the entries you send.

Sending this field rewrites the list. Any option currently on the context that you do not reference by `id` is removed, along with the values recorded through it. To keep an option and change nothing about it, include `{ "id": "…" }`.

</ApiParam>

<ApiParam name="settings" type="any" :required="false">

Type-specific configuration for this scope, as a JSON object. Replaces the property's own `settings` here.

</ApiParam>

<ApiParam name="sort_order" type="number" :required="false">

Ordering weight among this property's contexts. Lower values sort first. Presentational only — it does not affect which context wins for a work item.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this context. Maximum 255 characters. Must be sent together with `external_source`, and the pair must be unique within the property.

</ApiParam>

<ApiParam name="external_source" type="string" :required="false">

The system `external_id` came from, for example `github` or `jira`. Maximum 255 characters. Must be sent together with `external_id`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `applies_to_all_projects`, `applies_to_all_work_item_types`, `created_at`, `default_value`, `external_id`, `external_source`, `id`, `is_default`, `is_multi`, `is_required`, `issue_type_ids`, `name`, `options`, `project_ids`, `settings`, `sort_order`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`workspaces.work_item_properties:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                                                                                                                       |
| ------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | An axis left without coverage, a list sent alongside its wildcard flag, an id outside the workspace, a duplicate name, a half-filled external pair, or an overlap with a same-tier context. |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                                                                                                                             |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.                                                                                                        |
| `403`  | `forbidden`              | Your role or token scope can't change workspace property settings.                                                                                                                          |
| `404`  | `not_found`              | No such context, property, or workspace — or it's outside your tenant.                                                                                                                      |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                                                                                                                        |
| `409`  | `conflict`               | This workspace manages work item types per project, so workspace-level property writes are refused.                                                                                         |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                                                                                                                    |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                                                                                                                         |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                                                                                                                                  |

</div>

::: warning A context can never cover nothing
`{"applies_to_all_projects": false}` on its own is a `400` when the context has no stored projects, and so is `{"project_ids": []}`. An empty scope would strand every value recorded under this context, so Plane refuses the write instead. Send the flag and the replacement ids together.
:::

::: info Workspace mode only
Updating a context requires the workspace to manage work item types at the workspace level. In project mode the request returns `409 work_item_types_managed_at_project`. Reads are unaffected. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

</div>

<div class="api-right">

<CodePanel title="Update a property context" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/d1f7a3c9-5b62-4e08-9a41-7c3e2f8b6d05/contexts/6e2b90d4-1c73-4f58-a09e-3d8b5c14e7f2/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Bug and incident severity",
  "issue_type_ids": [
    "b7e04a95-2f18-4c63-9d57-8a12e6b0f439",
    "3a5c81d7-9e26-4b04-a17f-5c8d2e930b61"
  ]
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/d1f7a3c9-5b62-4e08-9a41-7c3e2f8b6d05/contexts/6e2b90d4-1c73-4f58-a09e-3d8b5c14e7f2/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "name": "Bug and incident severity",
        "issue_type_ids": [
            "b7e04a95-2f18-4c63-9d57-8a12e6b0f439",
            "3a5c81d7-9e26-4b04-a17f-5c8d2e930b61",
        ],
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/d1f7a3c9-5b62-4e08-9a41-7c3e2f8b6d05/contexts/6e2b90d4-1c73-4f58-a09e-3d8b5c14e7f2/",
  {
    method: "PATCH",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Bug and incident severity",
      issue_type_ids: [
        "b7e04a95-2f18-4c63-9d57-8a12e6b0f439",
        "3a5c81d7-9e26-4b04-a17f-5c8d2e930b61",
      ],
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
  "id": "6e2b90d4-1c73-4f58-a09e-3d8b5c14e7f2",
  "name": "Bug and incident severity",
  "is_required": true,
  "is_multi": false,
  "is_default": false,
  "default_value": [],
  "settings": {},
  "sort_order": 75535,
  "applies_to_all_projects": false,
  "applies_to_all_work_item_types": false,
  "external_id": null,
  "external_source": null,
  "created_at": "2026-02-03T11:05:17.204918Z",
  "project_ids": ["4af68566-94a4-4eb3-94aa-50dc9427067b", "9c3d7e21-6b45-4a80-8f19-2e0c7b5d3a64"],
  "issue_type_ids": [
    "b7e04a95-2f18-4c63-9d57-8a12e6b0f439",
    "3a5c81d7-9e26-4b04-a17f-5c8d2e930b61"
  ],
  "options": [
    {
      "id": "c58e2f01-4d97-4b3a-8e26-1f0b7a9c5d34",
      "name": "S1 — Critical",
      "is_default": false,
      "sort_order": 10000
    },
    {
      "id": "a49b6c72-8e15-4d30-b57c-2f81e0a6d938",
      "name": "S2 — Major",
      "is_default": true,
      "sort_order": 20000
    },
    {
      "id": "f13c8a60-7d24-4e59-9b02-6a5f1c3e8d47",
      "name": "S3 — Minor",
      "is_default": false,
      "sort_order": 30000
    }
  ]
}
```

</ResponsePanel>

<ResponsePanel status="400" title="LIST SENT WITH ITS WILDCARD FLAG">

```json
{
  "type": "invalid_request",
  "code": "invalid_request",
  "detail": "The request body failed validation.",
  "errors": [
    {
      "field": "project_ids",
      "code": "invalid",
      "message": "Ignored when applies_to_all_projects is true; omit it."
    }
  ]
}
```

</ResponsePanel>

</div>
</div>

## Lists are replaced, not merged

`project_ids`, `issue_type_ids`, and `options` are set-replacements. Sending one is a statement about the whole collection, not an addition to it:

- **Omit the field** — the collection is left exactly as it was. This is the safe default, and it is why the request above changed the type axis without touching projects or options.
- **Send the field** — what you send becomes the collection. Ids you left out are unlinked; for `options`, an option you left out is deleted along with the values recorded through it.

To add one project to a context, read the current `project_ids`, append to it, and send the full list back. To keep an option unchanged while editing its siblings, include it as `{ "id": "…" }`.

## Moving between a list and the wildcard

The flag and the list are alternatives on each axis, and switching between them has a fixed shape:

- **List to wildcard.** Send `{"applies_to_all_projects": true}` and nothing else on that axis. Sending `project_ids` in the same request is a `400`. The stored project links are dropped, so the context reads back with `"project_ids": []` — which now means every project.
- **Wildcard to list.** Send `{"applies_to_all_projects": false, "project_ids": ["…"]}` in one request. The flag alone is a `400` when the context has no stored projects to fall back on.

The work item type axis follows the same two rules with `applies_to_all_work_item_types` and `issue_type_ids`.

::: warning Changing scope can delete recorded values
Every scope edit re-resolves which context each work item uses, and values that no longer have a home are removed:

- A work item whose project and type are no longer covered by **any** context on this property loses its value for that property.
- An option-typed value keeps its cell but points at an option owned by a context that no longer resolves there — that value is dropped too, because the resolved context's option list is the only one Plane will offer.

Narrowing a context, or widening one so it outranks another with a different option list, both trigger this. Read the property's full context list before changing a boundary, and treat scope edits as a migration rather than a cosmetic change.
:::

## Overrides apply wherever this context resolves

`is_required`, `is_multi`, `default_value`, `settings`, and `options` take effect as soon as the request succeeds, on every work item that resolves to this context. They replace the property's own values there rather than combining with them, so editing the property itself will not change behavior in a scope that a context already covers.

Which work items that is depends on the other contexts on the property — a more specific one still outranks this one. See [Property contexts overview](/api-reference/v2/work-item-property-contexts/overview) for the precedence rules, and [List property contexts](/api-reference/v2/work-item-property-contexts/list-property-contexts) to see them all at once.
