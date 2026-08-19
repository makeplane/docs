---
title: Create a property context
description: Create a context that scopes a workspace-level work item property to specific projects and work item types with the Plane v2 REST API. Wildcard flags, id lists, overrides, OAuth scopes, error codes, and code examples.
keywords: plane api v2, create property context, applies_to_all_projects, applies_to_all_work_item_types, project_ids, issue_type_ids, property override, POST contexts
---

# Create a property context

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-properties/{property_id}/contexts/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Add a context to a workspace-level property. The context names the projects and work item types it covers, and carries the `is_required`, `is_multi`, `default_value`, `settings`, and option list that apply inside that scope.

Reach for this when one property definition needs different rules in different places — for example a `Severity` property that is required on `Bug` work items in two projects and optional everywhere else.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="property_id" type="string (uuid)" :required="true">

The workspace-level property the context belongs to. A project-level property id is not addressable here and returns `404 not_found`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

No single field is required by the schema, but the **scope is**: each of the two axes must be pinned down, either by setting its wildcard flag to `true` or by supplying a non-empty id list. Both flags default to `false`, so a body that omits `project_ids` and `issue_type_ids` entirely is a `400`, not a context that covers everything.

<div class="params-list">

<ApiParam name="name" type="string" :required="false">

Display name, unique among this property's contexts. Maximum 255 characters. Always send one — the context Plane seeded with the property already occupies the name `Default`.

</ApiParam>

<ApiParam name="applies_to_all_projects" type="boolean" :required="false">

Set to `true` to cover every project in the workspace instead of listing them. Defaults to `false`, which means `project_ids` is required.

Only one context per property may set this to `true`, and the seeded context normally holds that slot, so a second all-projects context returns `400`.

</ApiParam>

<ApiParam name="project_ids" type="array of string (uuid)" :required="false">

The exact projects this context covers. Required when `applies_to_all_projects` is `false`, and rejected with a `400` when it is `true` — the flag and the list are alternatives, never a combination.

Every id must belong to this workspace, and duplicates are rejected. This field is write-only as an input, but the resulting links are echoed back in the response's read-only `project_ids`.

</ApiParam>

<ApiParam name="applies_to_all_work_item_types" type="boolean" :required="false">

Set to `true` to cover every work item type in the workspace instead of listing them. Defaults to `false`, which means `issue_type_ids` is required.

</ApiParam>

<ApiParam name="issue_type_ids" type="array of string (uuid)" :required="false">

The exact work item types this context covers. Required when `applies_to_all_work_item_types` is `false`, and rejected with a `400` when it is `true`.

Every id must belong to this workspace, and duplicates are rejected. Write-only as an input; the response echoes the stored links in `issue_type_ids`.

</ApiParam>

<ApiParam name="is_required" type="boolean" :required="false">

Whether the property must be filled in on work items inside this scope. This replaces the property's own `is_required` here — it does not combine with it.

</ApiParam>

<ApiParam name="is_multi" type="boolean" :required="false">

Whether the property accepts several values inside this scope. Replaces the property's own `is_multi` here.

</ApiParam>

<ApiParam name="default_value" type="array of string" :required="false">

Values applied when a work item in this scope has nothing set. For `OPTION` properties, any option in this context flagged `is_default` takes precedence over this array.

</ApiParam>

<ApiParam name="options" type="array of object" :required="false">

The choices this context offers for an `OPTION` property. Options belong to a context, so this list — not the property's full option list — is what work items in this scope can pick from.

Each entry either references an existing option of the property or creates a new one:

- `id` _string (uuid)_ — an existing option of this property. Duplicate ids and ids from another property are rejected.
- `name` _string_ — creates a new option. Maximum 255 characters. Names must be unique within the payload, case-insensitively.
- `description` _string_ — free-form description of the option.
- `is_default` _boolean_ — preselect this option for new work items in this scope. Defaults to `false`.

Send either `id` or `name` on each entry — an entry with neither is a `400`. Write-only as an input; the response returns the resulting options with their ids.

An option's own `sort_order` is read-only: Plane assigns it from the order of the entries you send, and it is returned on each option in the response.

</ApiParam>

<ApiParam name="settings" type="any" :required="false">

Type-specific configuration for this scope, as a JSON object. Replaces the property's own `settings` here.

</ApiParam>

<ApiParam name="sort_order" type="number" :required="false">

Ordering weight among this property's contexts. Lower values sort first. Omit it and Plane places the new context after the ones that already exist. Ordering is presentational — it does not affect which context wins.

</ApiParam>

<ApiParam name="external_id" type="string" :required="false">

Your system's identifier for this context, for sync and import correlation. Maximum 255 characters. Must be sent together with `external_source`, and the pair must be unique within the property.

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

| Status | Code                     | Cause                                                                                                                                                                               |
| ------ | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `400`  | `invalid_request`        | An axis left unpinned, a list sent alongside its wildcard flag, an id outside the workspace, a duplicate name, a half-filled external pair, or an overlap with a same-tier context. |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                                                                                                                     |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off.                                                                                                |
| `403`  | `forbidden`              | Your role or token scope can't change workspace property settings.                                                                                                                  |
| `404`  | `not_found`              | No such workspace or property, the property is project-level, or it's outside your tenant.                                                                                          |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                                                                                                                |
| `409`  | `conflict`               | This workspace manages work item types per project, so workspace-level property writes are refused.                                                                                 |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                                                                                                                            |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                                                                                                                 |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                                                                                                                          |

</div>

::: warning Same-tier overlap is rejected
Two contexts on the same property may overlap only when one is strictly more specific than the other — that is what makes narrow rules beat broad ones. Two contexts at the same level of specificity that share a project return `400`: two listed-project/listed-type contexts sharing a project **and** a type, or two listed-project/all-type contexts sharing a project.
:::

::: info Workspace mode only
Creating a context requires the workspace to manage work item types at the workspace level. In project mode the request returns `409 work_item_types_managed_at_project` — the capability exists, it just lives on the project surface. Reads are unaffected. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

</div>

<div class="api-right">

<CodePanel title="Create a property context" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/d1f7a3c9-5b62-4e08-9a41-7c3e2f8b6d05/contexts/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Bug severity",
  "applies_to_all_projects": false,
  "project_ids": [
    "4af68566-94a4-4eb3-94aa-50dc9427067b",
    "9c3d7e21-6b45-4a80-8f19-2e0c7b5d3a64"
  ],
  "applies_to_all_work_item_types": false,
  "issue_type_ids": ["b7e04a95-2f18-4c63-9d57-8a12e6b0f439"],
  "is_required": true,
  "is_multi": false,
  "options": [
    { "name": "S1 — Critical" },
    { "name": "S2 — Major", "is_default": true },
    { "name": "S3 — Minor" }
  ]
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/d1f7a3c9-5b62-4e08-9a41-7c3e2f8b6d05/contexts/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "name": "Bug severity",
        "applies_to_all_projects": False,
        "project_ids": [
            "4af68566-94a4-4eb3-94aa-50dc9427067b",
            "9c3d7e21-6b45-4a80-8f19-2e0c7b5d3a64",
        ],
        "applies_to_all_work_item_types": False,
        "issue_type_ids": ["b7e04a95-2f18-4c63-9d57-8a12e6b0f439"],
        "is_required": True,
        "is_multi": False,
        "options": [
            {"name": "S1 — Critical"},
            {"name": "S2 — Major", "is_default": True},
            {"name": "S3 — Minor"},
        ],
    },
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/d1f7a3c9-5b62-4e08-9a41-7c3e2f8b6d05/contexts/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Bug severity",
      applies_to_all_projects: false,
      project_ids: ["4af68566-94a4-4eb3-94aa-50dc9427067b", "9c3d7e21-6b45-4a80-8f19-2e0c7b5d3a64"],
      applies_to_all_work_item_types: false,
      issue_type_ids: ["b7e04a95-2f18-4c63-9d57-8a12e6b0f439"],
      is_required: true,
      is_multi: false,
      options: [
        { name: "S1 — Critical" },
        { name: "S2 — Major", is_default: true },
        { name: "S3 — Minor" },
      ],
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
  "id": "6e2b90d4-1c73-4f58-a09e-3d8b5c14e7f2",
  "name": "Bug severity",
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
  "issue_type_ids": ["b7e04a95-2f18-4c63-9d57-8a12e6b0f439"],
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

<ResponsePanel status="400" title="AXIS LEFT UNPINNED">

```json
{
  "type": "invalid_request",
  "code": "invalid_request",
  "detail": "The request body failed validation.",
  "errors": [
    {
      "field": "project_ids",
      "code": "invalid",
      "message": "Required when applies_to_all_projects is false."
    }
  ]
}
```

</ResponsePanel>

<ResponsePanel status="409" title="WRONG MODE">

```json
{
  "type": "conflict",
  "code": "work_item_types_managed_at_project",
  "detail": "Work item types are managed at the project level for this workspace."
}
```

</ResponsePanel>

</div>
</div>

## Pinning each axis

A context covers the intersection of a project set and a work item type set, and each set is expressed either by its wildcard flag or by its id list. Four shapes are valid, and they map one-to-one onto the precedence tiers Plane uses when it resolves a work item:

| Projects                        | Work item types                        | Covers                                                    |
| ------------------------------- | -------------------------------------- | --------------------------------------------------------- |
| `project_ids: [...]`            | `issue_type_ids: [...]`                | Those types, in those projects. Most specific.            |
| `project_ids: [...]`            | `applies_to_all_work_item_types: true` | Every type, in those projects                             |
| `applies_to_all_projects: true` | `issue_type_ids: [...]`                | Those types, in every project                             |
| `applies_to_all_projects: true` | `applies_to_all_work_item_types: true` | Everything. Least specific — normally the seeded context. |

Two mistakes produce a `400` rather than a surprising context:

- **Neither the flag nor the list.** Omitting `project_ids` while `applies_to_all_projects` is `false` does not quietly mean "all projects"; it means the context would cover nothing, so it is rejected.
- **Both the flag and the list.** Sending `project_ids` with `applies_to_all_projects: true` is rejected because the list could never take effect. Omit it.

The same two rules apply on the work item type axis.

::: tip Verify with a read-back
The response echoes `project_ids` and `issue_type_ids` as stored. A wildcard context always reads back with the matching list empty — `"applies_to_all_projects": true` with `"project_ids": []` means every project, not none. Read the flag first.
:::

## What the new context changes

Inside its scope, the context's `is_required`, `is_multi`, `default_value`, `settings`, and options replace the property's own values wholesale. Nothing is merged, and option lists are not unioned: a `Bug` in the Platform project can only choose from `S1`, `S2`, and `S3` above, even if the property's other contexts offer more.

Outside its scope, nothing changes — work items keep resolving to whichever context was already the most specific match for them.

See [Property contexts overview](/api-reference/v2/work-item-property-contexts/overview) for the full precedence rules, and [Update a context](/api-reference/v2/work-item-property-contexts/update-property-context) for how scope changes affect values that were already recorded.
