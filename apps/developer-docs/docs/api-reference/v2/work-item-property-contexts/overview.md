---
title: Property contexts overview
description: The Plane API v2 work item property context object. How a workspace-level property is scoped to projects and work item types, how the applies_to_all wildcards interact with explicit id lists, and how a context overrides the property it belongs to.
keywords: plane api v2, property contexts, work item property scope, applies_to_all_projects, applies_to_all_work_item_types, project_ids, issue_type_ids, property override
---

# Property contexts overview

A context scopes a **workspace-level** work item property to a set of projects and a set of work item types, and overrides how that property behaves inside that scope.

A property is defined once for the whole workspace, so it carries exactly one `is_required` flag, one `is_multi` flag, one default value, and one list of options. That is rarely what a real workspace wants. Contexts are how one property definition expresses different rules in different places.

## The problem a context solves

Your workspace has a `Severity` property. You want it to be **required** on `Bug` work items in the Platform and Mobile projects, with a full `S1`/`S2`/`S3` scale — and **optional**, with a shorter list, everywhere else.

That is two sets of rules for one property, so it takes two contexts:

- The context Plane seeds with the property covers all projects and all work item types. Leave it at `is_required: false`. This is the "everywhere else" rule.
- A second context names the two projects and the `Bug` type, and sets `is_required: true` with its own options. This is the narrow rule.

The narrow context is the one that wins on a Bug in Platform, because Plane always resolves the **most specific** matching context. On a Task in Platform, or on a Bug in a third project, nothing narrow matches and the seeded context applies instead.

Creating the narrow rule is a single request:

```json
{
  "name": "Bug severity",
  "applies_to_all_projects": false,
  "project_ids": ["4af68566-94a4-4eb3-94aa-50dc9427067b", "9c3d7e21-6b45-4a80-8f19-2e0c7b5d3a64"],
  "applies_to_all_work_item_types": false,
  "issue_type_ids": ["b7e04a95-2f18-4c63-9d57-8a12e6b0f439"],
  "is_required": true,
  "is_multi": false,
  "options": [
    { "name": "S1 — Critical" },
    { "name": "S2 — Major", "is_default": true },
    { "name": "S3 — Minor" }
  ]
}
```

::: info Every property already has one context
When you create a workspace-level property, Plane seeds a context named `Default` that covers all projects and all work item types and mirrors the property's own `is_required`, `is_multi`, `default_value`, and `settings`. It is a normal context — you can read it, update it, and delete it through these endpoints. Its `is_default` flag is a historical marker and does not affect resolution.
:::

<div class="api-two-column">
<div class="api-left">

## The property context object

### Attributes

- `id` _string (uuid)_

  Unique identifier for the context.

- `name` _string_

  Display name, unique among the contexts of this property. Maximum 255 characters.

- `is_required` _boolean_

  Whether the property must be filled in inside this scope. Overrides the property's own `is_required`.

- `is_multi` _boolean_

  Whether the property accepts several values inside this scope. Overrides the property's own `is_multi`.

- `is_default` _boolean_

  `true` on the context Plane seeded with the property. It is a marker only — precedence is decided by the scope flags, not by this field.

- `default_value` _array of string_

  Values applied when a work item in this scope has nothing set. For `OPTION` properties, options in this context flagged `is_default` take precedence over this array.

- `settings` _any_

  Type-specific configuration for this scope, as a JSON object. Overrides the property's own `settings`.

- `sort_order` _number_

  Ordering weight among this property's contexts. Lower values sort first, and lists are returned in this order by default.

- `applies_to_all_projects` _boolean_

  When `true`, the context covers every project in the workspace and `project_ids` is empty. When `false`, `project_ids` is the exact list of projects covered.

- `applies_to_all_work_item_types` _boolean_

  When `true`, the context covers every work item type and `issue_type_ids` is empty. When `false`, `issue_type_ids` is the exact list of types covered.

- `project_ids` _array of any_

  The ids of the projects this context covers. Empty when `applies_to_all_projects` is `true` — read the flag before reading this list.

- `issue_type_ids` _array of any_

  The ids of the work item types this context covers. Empty when `applies_to_all_work_item_types` is `true`.

- `options` _array of any_

  The choices this context offers for an `OPTION` property. Each entry has `id`, `name`, `is_default`, and `sort_order`. Options belong to a context, not to the property, so two contexts on the same property can offer different lists.

- `external_id` , `external_source` _string_

  Correlation fields for sync and import. Together they let you map a context to a record in another system and find it again later. A pair is unique within a property.

- `created_at` _string (date-time)_

  When the context was created.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE PROPERTY CONTEXT OBJECT">

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
  "created_at": "2026-01-14T09:22:41.478363Z",
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

</div>
</div>

## Endpoints

| Method   | Path                                                                          | Description      |
| -------- | ----------------------------------------------------------------------------- | ---------------- |
| `GET`    | `/api/v2/workspaces/{slug}/work-item-properties/{property_id}/contexts/`      | List contexts    |
| `POST`   | `/api/v2/workspaces/{slug}/work-item-properties/{property_id}/contexts/`      | Create a context |
| `GET`    | `/api/v2/workspaces/{slug}/work-item-properties/{property_id}/contexts/{pk}/` | Get a context    |
| `PATCH`  | `/api/v2/workspaces/{slug}/work-item-properties/{property_id}/contexts/{pk}/` | Update a context |
| `DELETE` | `/api/v2/workspaces/{slug}/work-item-properties/{property_id}/contexts/{pk}/` | Delete a context |

`{property_id}` must be a workspace-level property. A project-level property id is not addressable here and returns `404 not_found`.

## Scope: wildcards and explicit lists

A context covers the **intersection** of a project set and a work item type set. Each of those two sets is expressed in one of two ways, and the wildcard flag decides which:

| Flag                                    | Companion list          | Coverage                              |
| --------------------------------------- | ----------------------- | ------------------------------------- |
| `applies_to_all_projects: true`         | `project_ids` empty     | Every project in the workspace        |
| `applies_to_all_projects: false`        | `project_ids` listed    | Exactly the projects you listed       |
| `applies_to_all_work_item_types: true`  | `issue_type_ids` empty  | Every work item type in the workspace |
| `applies_to_all_work_item_types: false` | `issue_type_ids` listed | Exactly the types you listed          |

The flag and the list are alternatives, never a combination:

- **On write**, sending `project_ids` alongside `applies_to_all_projects: true` is a `400` — the list would have no meaning, so Plane rejects it rather than silently dropping it. The same rule applies to `issue_type_ids` and `applies_to_all_work_item_types`.
- **On read**, `project_ids` and `issue_type_ids` are computed from the links Plane actually stores. Turning a wildcard on removes those links, so a wildcard context always reads back with an empty list.

::: warning An empty list does not mean "nothing"
`"project_ids": []` with `"applies_to_all_projects": true` means **every project**. `"project_ids": []` never appears with the flag `false`, because a context can never be scoped to nothing. Always branch on the flag first, then read the list.
:::

Each axis must be pinned down one way or the other. On create, omitting both the flag and the list for an axis is a `400` — see [Create a context](/api-reference/v2/work-item-property-contexts/create-property-context). On update, you cannot leave an axis empty either: turning a wildcard off has to arrive in the same request as the ids that replace it.

::: info Only one context per property can use `applies_to_all_projects`
That slot is occupied by the context Plane seeds with the property. Creating a second all-projects context returns `400`. To move it, update the seeded context or delete it first.
:::

## How Plane picks the context

For a given work item, Plane resolves one context from the property's list by walking four tiers, most specific first, using the work item's project and type:

1. Listed project **and** listed type.
2. Listed project **and** all types.
3. All projects **and** listed type.
4. All projects **and** all types — the seeded context.

The first tier with a match wins outright; the remaining tiers are not consulted and nothing is merged between them. Contexts at _different_ tiers are meant to overlap — that overlap is exactly how a narrow rule beats a broad one. Overlap _within the same tier_ is a genuine ambiguity and is rejected at write time with a `400`.

::: warning No matching context means the property disappears
If no tier matches a work item's project and type, the property does not surface on that work item at all. This is the practical consequence of deleting the all-projects, all-types context — see [Delete a context](/api-reference/v2/work-item-property-contexts/delete-property-context).
:::

## What a context overrides

The resolved context replaces the property's values wholesale for work items in its scope — `is_required`, `is_multi`, `default_value`, `settings`, and the list of selectable options all come from the context, not from the property.

Working through the `Severity` example, with the seeded context left at its defaults:

| Field         | On the seeded context | On the `Bug severity` context | Bug in Platform | Task in Platform |
| ------------- | --------------------- | ----------------------------- | --------------- | ---------------- |
| Tier          | 4 (all / all)         | 1 (listed / listed)           | Tier 1 wins     | Tier 4 wins      |
| `is_required` | `false`               | `true`                        | Required        | Optional         |
| `is_multi`    | `false`               | `false`                       | Single value    | Single value     |
| Options       | `Low`, `High`         | `S1`, `S2`, `S3`              | `S1`/`S2`/`S3`  | `Low`/`High`     |
| Default       | none                  | `S2 — Major` (`is_default`)   | `S2 — Major`    | none             |

The Bug in Platform never sees `Low` or `High`: option lists are not unioned across contexts, and the resolved context's list is the whole set of permitted values.

## Options belong to a context

Options created through the [property options endpoints](/api-reference/v2/workspace-work-item-property-options/overview) attach to the property's all-projects, all-types context. To give a narrower context its own choices, send the `options` array when you [create](/api-reference/v2/work-item-property-contexts/create-property-context) or [update](/api-reference/v2/work-item-property-contexts/update-property-context) the context. Each entry either references an existing option of the property by `id` or creates a new one by `name`.

On update, `options` is a replacement for the whole list, not an addition to it — an option you leave out is removed from the context along with the values recorded through it.

## Contexts are workspace mode only

These endpoints exist because the property they hang off is defined at the workspace level. `POST`, `PATCH`, and `DELETE` therefore require the workspace to be managing work item types at the workspace level; if it manages them per project, the write returns `409 work_item_types_managed_at_project` instead. Reads are unaffected by the mode.

See [Work item type modes](/api-reference/v2/work-item-type-modes) for how to check which mode a workspace is in.

## Scopes

| Operation              | Scope                                   |
| ---------------------- | --------------------------------------- |
| List, Get              | `workspaces.work_item_properties:read`  |
| Create, Update, Delete | `workspaces.work_item_properties:write` |
