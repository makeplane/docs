---
title: Workspace features overview
description: The Plane API v2 workspace feature object. Every feature flag explained, how is_work_item_types_enabled selects the work item type mode, and how to read and toggle features.
keywords: plane api v2, workspace features, feature flags, is_work_item_types_enabled, work item type mode, is_teams_enabled, is_wiki_enabled, workspace settings
---

# Workspace features overview

Workspace features are the switches that decide which parts of Plane exist for a workspace. One object, one `GET`, one `PATCH` — but it is the object every capable client reads first, because two of its fields change how the rest of the API behaves.

The important one is `is_work_item_types_enabled`. It is the **mode discriminator for work item types**: it tells you whether types and their properties are owned by the workspace or by each project, and therefore which endpoints will accept your writes. Getting it wrong is a `409`, not a `404` or a `403`.

<div class="api-two-column">
<div class="api-left">

## The workspace feature object

### Attributes

- `id` _string (uuid)_

  Unique identifier for the workspace's feature record.

- `is_work_item_types_enabled` _boolean_

  Whether work item types are managed at the **workspace** level. `true` means workspace mode — types and properties are defined once for the workspace and imported into projects. `false` means project mode — each project owns its own types. This is the field to read before any type or property write. See [Work item type modes](/api-reference/v2/work-item-type-modes).

- `work_item_type_default_level` _integer_

  The default level applied to work item types in this workspace. The schema constrains it to an integer and declares no enum, so treat any value as legal and leave it as returned unless you are deliberately changing type levels.

- `is_workitem_hierarchy_enabled` _boolean_

  Whether work items can be nested into a parent and child hierarchy in this workspace.

- `is_project_grouping_enabled` _boolean_

  Whether projects can be organized into groups in the workspace.

- `is_teams_enabled` _boolean_

  Whether teamspaces are available. Teamspaces have their own endpoints under the `teamspaces:*` scopes.

- `is_wiki_enabled` _boolean_

  Whether the workspace-level wiki is available, behind the `wiki.pages:*` scopes.

- `is_initiative_enabled` _boolean_

  Whether initiatives — the layer that groups projects and epics toward a larger outcome — are available.

- `is_customer_enabled` _boolean_

  Whether customers and customer requests are available, behind the `customers:*` scopes.

- `is_release_enabled` _boolean_

  Whether releases are available, behind the `releases:*` scopes.

- `is_state_duration_enabled` _boolean_

  Whether Plane records how long work items spend in each state.

- `is_pi_enabled` _boolean_

  Whether Pi, Plane's AI assistant, is available in the workspace.

- `created_at` _string (date-time)_

  When the feature record was created.

::: warning Watch the spelling of the hierarchy flag
It is `is_workitem_hierarchy_enabled` — no underscore between `work` and `item` — while its neighbor is `is_work_item_types_enabled`. Unknown keys in a `PATCH` body do not toggle anything, so a misspelling looks like a silent no-op. Read the response back and confirm the flag actually moved.
:::

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE WORKSPACE FEATURE OBJECT">

```json
{
  "id": "a72f1c40-5b8e-4d19-9f2a-3c6d8e1b7a55",
  "is_work_item_types_enabled": true,
  "work_item_type_default_level": 0,
  "is_workitem_hierarchy_enabled": false,
  "is_project_grouping_enabled": false,
  "is_teams_enabled": true,
  "is_wiki_enabled": true,
  "is_initiative_enabled": false,
  "is_customer_enabled": false,
  "is_release_enabled": false,
  "is_state_duration_enabled": false,
  "is_pi_enabled": false,
  "created_at": "2026-01-14T09:22:41.478363Z"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method  | Path                                  | Description               |
| ------- | ------------------------------------- | ------------------------- |
| `GET`   | `/api/v2/workspaces/{slug}/features/` | Get workspace features    |
| `PATCH` | `/api/v2/workspaces/{slug}/features/` | Update workspace features |

There is one feature record per workspace, so the path has no id and there is nothing to create or delete.

## Discovering the work item type mode

A workspace manages work item types in exactly one mode, and this endpoint is how a client finds out which:

```bash
curl "https://api.plane.so/api/v2/workspaces/my-team/features/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

- `is_work_item_types_enabled: true` → **workspace mode**. Type and property writes go to `/api/v2/workspaces/{slug}/work-item-types/` and friends. The project-level equivalents return `409 work_item_types_managed_at_workspace`.
- `is_work_item_types_enabled: false` → **project mode**. Those writes go to `/api/v2/workspaces/{slug}/projects/{project_id}/work-item-types/`. The workspace-level equivalents return `409 work_item_types_managed_at_project`.

**Reads are unaffected by mode.** A project lists its types in either mode, so a read-only integration never has to branch. Only writes are gated.

Full walkthrough, including how each surface differs: [Work item type modes](/api-reference/v2/work-item-type-modes).

::: tip Read the mode, do not guess it
Branching on the `409` you got last time bakes yesterday's configuration into your client. Read `is_work_item_types_enabled`, cache it briefly, and re-read it when a write comes back `409` — the mode may have been switched by an admin between your calls.
:::

## Flags change what other endpoints do

A disabled feature is not a hidden endpoint. Turning a flag off removes the capability from the workspace, so calls that depend on it stop being useful even when they remain routable. Two consequences worth designing for:

- **Toggling `is_work_item_types_enabled` moves the write surface for every client in the workspace**, not just yours. Treat it as an administrative action, not something an integration flips at runtime.
- **A flag being `true` is necessary, not sufficient.** Features also have to be available on the workspace's plan. Treat a successful call, not the flag alone, as proof a capability is live.

## Scopes

| Operation | Scope                       |
| --------- | --------------------------- |
| `GET`     | `workspaces.features:read`  |
| `PATCH`   | `workspaces.features:write` |

## Changed from v1

- Flags are now prefixed and suffixed consistently: v1's `project_grouping`, `initiatives`, `teams`, `customers`, `wiki`, and `pi` are `is_project_grouping_enabled`, `is_initiative_enabled`, `is_teams_enabled`, `is_customer_enabled`, `is_wiki_enabled`, and `is_pi_enabled`.
- New in v2: `is_work_item_types_enabled`, `work_item_type_default_level`, `is_workitem_hierarchy_enabled`, `is_release_enabled`, and `is_state_duration_enabled`.
- The response now carries `id` and `created_at` alongside the flags.

See [Migrating from v1](/api-reference/v2/migrating-from-v1) for the full list.

## Related

- [Get workspace features](/api-reference/v2/workspace-features/get-workspace-features)
- [Update workspace features](/api-reference/v2/workspace-features/update-workspace-features)
- [Work item type modes](/api-reference/v2/work-item-type-modes)
