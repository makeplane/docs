---
title: MCP server tool reference
description: Reference for the 28 tools and 183 actions exposed by the Plane MCP server — work items, cycles, modules, releases, customers, pages, and more.
keywords: plane mcp tools, mcp tool reference, plane mcp actions, workitem tool, cycle tool, release tool, customer tool
---

# Tool reference

The Plane MCP server exposes 28 tools, one per resource. Resource tools take an `action` parameter that selects one of 183 operations; `get_pql_reference` is the only exception. Every transport—hosted OAuth, hosted access token, local stdio, and deprecated SSE—exposes the same surface.

The description your MCP client receives is generated from each tool's action declarations. It is the authoritative reference at call time, including required and optional parameters.

**Totals:** 28 tools, 183 actions, and 169 retired-name aliases.

For connection and authentication instructions, see [MCP server](/dev-tools/mcp-server).

## How to read this page

Each tool table has these columns:

- **Action** is the value to pass as `action`.
- **Required** parameters must be present for that action.
- **Optional** parameters are accepted only for that action.
- **Notes** include action-specific behavior and the **Read-only** or **Destructive** flags.

Actions with `cursor` and `per_page` return a `next_cursor` when another page is available. Follow it until it is empty. Update actions change only the fields you pass.

Parameter values are plain strings, numbers, booleans, and lists. The server also coerces string-encoded lists, integers, and booleans. If you pass an argument that belongs to another action, validation rejects it and names the permitted parameters.

## Conventions

### Identifiers

Most actions take UUIDs for projects, work items, states, labels, members, and other resources. List or resolve the relevant resource first when you have only its name or short identifier.

`workitem retrieve_by_identifier` is the exception: its `workitem_identifier` accepts a readable identifier such as `ENG-42`. Other `workitem` actions use the work item's UUID in `workitem_id`.

### Project vs workspace scope

Pages, work item types, and work item properties can belong to a project or the workspace. Supply `project_id` for the project's own set; omit it for the workspace's set.

Some workspaces centrally govern the type and property vocabulary. In that mode, project-scoped writes are refused. Use `workitem_type resolve` to find or create a usable type without duplicates, or `workitem_type import_to_project` to link existing workspace types to a project.

### PQL

`workitem list`, `workitem list_archived`, `workitem count`, `cycle list_workitems`, and `module list_workitems` accept a `pql` filter. Call `get_pql_reference` with `detail="brief"` or `detail="full"` before composing a query, and see the [Plane Query Language guide](https://docs.plane.so/core-concepts/issues/plane-query-language).

UUID-backed PQL fields—such as project, assignee, state, label, cycle, module, type, milestone, and creator—need UUIDs. Resolve names before inserting them into a query.

### Epics

Plane represents an epic as a work item whose type is named **Epic**. There is no separate epic tool.

1. Call `workitem_type resolve` with `project_id` and `name="Epic"`, then keep the returned type `id`.
2. Call `workitem create` with the project, name, and that `type_id`.
3. List epics with `workitem list` and `pql='type = "<type id>"'`.
4. Read, edit, or delete an epic with `workitem retrieve`, `workitem update`, or `workitem delete`. To nest a work item under it, pass the epic's work item UUID as `parent` to `workitem update` or `workitem create`.
5. List an epic's children with `workitem list` and `pql='childOf("PROJ-12")'`, using the epic's readable identifier.

### Plan availability

The server declares feature gates for `work_log` (**Time tracking**), `workitem_type` (**Work item types**), `workitem_property` (**Work item properties**), and some `project` features. Customers, initiatives, releases, and pages can also be gated by the Plane API and your plan. When a feature is unavailable, the error names it.

## Tools by resource group

Tools are grouped by the Plane resource they manage. Each group opens with an example prompt.

## Work items

_Example prompt: “Summarize what changed on ENG-42 this week, including comments, state changes, and assignees.”_

### `workitem` — Work items

Work items -- issues, tasks and epics.

| Action                   | Required                    | Optional                                                                                                                                                                                                                                | Notes                                                                                                        |
| ------------------------ | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `list`                   | —                           | `project_id`, `pql`, `order_by`, `per_page`, `cursor`, `expand`, `fields`, `external_id`, `external_source`                                                                                                                             | omit project_id to search the whole workspace; Read-only                                                     |
| `list_archived`          | `project_id`                | `pql`, `order_by`, `per_page`, `cursor`, `expand`, `fields`, `external_id`, `external_source`                                                                                                                                           | Read-only                                                                                                    |
| `retrieve`               | `project_id`, `workitem_id` | `expand`, `fields`, `external_id`, `external_source`, `order_by`                                                                                                                                                                        | Read-only                                                                                                    |
| `retrieve_by_identifier` | `workitem_identifier`       | `expand`, `fields`, `external_id`, `external_source`, `order_by`                                                                                                                                                                        | identifier is PROJECT-N, e.g. ENG-42; Read-only                                                              |
| `search`                 | `query`                     | `expand`, `fields`, `external_id`, `external_source`, `order_by`                                                                                                                                                                        | Read-only                                                                                                    |
| `count`                  | —                           | `project_id`, `pql`, `group_by`, `sub_group_by`                                                                                                                                                                                         | counts the whole workspace unless project_id narrows it; Read-only                                           |
| `create`                 | `project_id`, `name`        | `assignees`, `labels`, `type_id`, `point`, `description_html`, `description_stripped`, `priority`, `start_date`, `target_date`, `sort_order`, `is_draft`, `parent`, `state`, `estimate_point`, `external_source`, `external_id`         | —                                                                                                            |
| `update`                 | `project_id`, `workitem_id` | `name`, `assignees`, `labels`, `type_id`, `point`, `description_html`, `description_stripped`, `priority`, `start_date`, `target_date`, `sort_order`, `is_draft`, `parent`, `state`, `estimate_point`, `external_source`, `external_id` | only the fields you pass are changed                                                                         |
| `delete`                 | `project_id`, `workitem_id` | —                                                                                                                                                                                                                                       | Destructive                                                                                                  |
| `archive`                | `project_id`, `workitem_id` | `archive`                                                                                                                                                                                                                               | archive defaults to true; pass archive=false to unarchive. Only completed or cancelled items can be archived |
| `manage_assignee`        | `project_id`, `workitem_id` | `add_user_id`, `remove_user_id`                                                                                                                                                                                                         | each takes one id or several; the list is merged, not replaced, and removals apply first                     |
| `manage_label`           | `project_id`, `workitem_id` | `add_label_id`, `remove_label_id`                                                                                                                                                                                                       | each takes one id or several; the list is merged, not replaced, and removals apply first                     |

**Notes:** priority: urgent, high, medium, low, none. UUID fields (assignees, labels, state, parent, type_id) need UUIDs -- list the relevant resource first if you only have a name. description_stripped is plain text and is wrapped into HTML on save; description_html wins if both are given. fields is a sparse fieldset: use `project`, not project_id, and `description_html`, not description. count group_by and sub_group_by accept: state_id, state\_\_group, priority, project_id, type_id, labels\_\_id, assignees\_\_id, issue_module\_\_module_id, release_work_items\_\_release_id, cycle_id, milestone_id, created_by, target_date, start_date. These are grouping keys only -- they are not PQL filter fields, and filtering on state\_\_group is rejected.

### `workitem_comment` — Work item comments

Comments on a work item.

| Action     | Required                                    | Optional                                                   | Notes       |
| ---------- | ------------------------------------------- | ---------------------------------------------------------- | ----------- |
| `list`     | `project_id`, `workitem_id`                 | `cursor`, `per_page`                                       | Read-only   |
| `retrieve` | `project_id`, `workitem_id`, `comment_id`   | —                                                          | Read-only   |
| `create`   | `project_id`, `workitem_id`, `comment_html` | `access`, `external_source`, `external_id`                 | —           |
| `update`   | `project_id`, `workitem_id`, `comment_id`   | `comment_html`, `access`, `external_source`, `external_id` | —           |
| `delete`   | `project_id`, `workitem_id`, `comment_id`   | —                                                          | Destructive |

**Notes:** comment_html is HTML, e.g. '&lt;p&gt;Looks good.&lt;/p&gt;'. access is INTERNAL or EXTERNAL.

### `workitem_activity` — Work item activity

Change history for a work item.

| Action     | Required                                   | Optional             | Notes     |
| ---------- | ------------------------------------------ | -------------------- | --------- |
| `list`     | `project_id`, `workitem_id`                | `cursor`, `per_page` | Read-only |
| `retrieve` | `project_id`, `workitem_id`, `activity_id` | —                    | Read-only |

### `workitem_attachment` — Work item attachments

Files attached to a work item.

| Action            | Required                                     | Optional | Notes                                                                         |
| ----------------- | -------------------------------------------- | -------- | ----------------------------------------------------------------------------- |
| `list`            | `project_id`, `workitem_id`                  | —        | Read-only                                                                     |
| `read`            | `project_id`, `workitem_id`, `attachment_id` | —        | returns images and text inline; use download_url for anything else; Read-only |
| `download_url`    | `project_id`, `workitem_id`, `attachment_id` | —        | Read-only                                                                     |
| `upload_from_url` | `project_id`, `workitem_id`, `url`           | `name`   | —                                                                             |
| `delete`          | `project_id`, `workitem_id`, `attachment_id` | —        | Destructive                                                                   |

**Notes:** read supports PNG/JPEG/GIF/WEBP up to 5 MB and TXT/MD/CSV/HTML/XML/YAML/JSON up to 1 MB. Get attachment_id from the list action. upload_from_url fetches the file server-side, so the URL must be reachable without authentication and must not resolve to a private address.

### `workitem_link` — Work item links

External links attached to a work item.

| Action     | Required                                      | Optional             | Notes       |
| ---------- | --------------------------------------------- | -------------------- | ----------- |
| `list`     | `project_id`, `workitem_id`                   | `cursor`, `per_page` | Read-only   |
| `retrieve` | `project_id`, `workitem_id`, `link_id`        | —                    | Read-only   |
| `create`   | `project_id`, `workitem_id`, `url`            | —                    | —           |
| `update`   | `project_id`, `workitem_id`, `link_id`, `url` | —                    | —           |
| `delete`   | `project_id`, `workitem_id`, `link_id`        | —                    | Destructive |

### `workitem_relation` — Work item relations

Relations between work items, and the definitions that type them.

| Action              | Required                                           | Optional                                                               | Notes                                                                                                                                                       |
| ------------------- | -------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `list`              | `project_id`, `workitem_id`                        | —                                                                      | Read-only                                                                                                                                                   |
| `create`            | `project_id`, `workitem_id`, `workitem_ids`        | `relation_type`, `relation_definition_id`, `relation_definition_label` | pass relation_type for a dependency, or definition id + label for a custom relation                                                                         |
| `delete`            | `project_id`, `workitem_id`, `related_workitem_id` | `is_dependency`                                                        | removes one relation; dependencies and custom relations are independent, so is_dependency must match the kind that was created (default false); Destructive |
| `list_definitions`  | —                                                  | `is_default`, `is_active`                                              | Read-only                                                                                                                                                   |
| `create_definition` | `name`                                             | `outward`, `inward`, `is_active`, `color`                              | —                                                                                                                                                           |
| `update_definition` | `definition_id`                                    | `name`, `outward`, `inward`, `is_active`, `color`                      | —                                                                                                                                                           |
| `delete_definition` | `definition_id`                                    | —                                                                      | Destructive                                                                                                                                                 |

**Notes:** Call list_definitions first and match the user's wording to an entry. A built_in_dependencies value (blocking, blocked_by, start_before, start_after, finish_before, finish_after) goes in relation_type; a custom definition needs its id in relation_definition_id and the matched outward or inward label in relation_definition_label, which sets direction.

### `work_log` — Work logs

Time logged against a work item.

| Action   | Required                                   | Optional                  | Notes       |
| -------- | ------------------------------------------ | ------------------------- | ----------- |
| `list`   | `project_id`, `workitem_id`                | `cursor`, `per_page`      | Read-only   |
| `create` | `project_id`, `workitem_id`, `duration`    | `description`             | —           |
| `update` | `project_id`, `workitem_id`, `work_log_id` | `duration`, `description` | —           |
| `delete` | `project_id`, `workitem_id`, `work_log_id` | —                         | Destructive |

**Notes:** duration is in minutes.

## Types, properties and estimates

_Example prompt: “Create an Epic type for ENG, add a Customer impact property, and set up point estimates.”_

### `workitem_type` — Work item types

Work item types, at project or workspace scope.

| Action              | Required                          | Optional                                                                                          | Notes                                                                 |
| ------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `list`              | —                                 | `project_id`, `cursor`, `per_page`                                                                | workspace scope when project_id is omitted; Read-only                 |
| `retrieve`          | `workitem_type_id`                | `project_id`                                                                                      | Read-only                                                             |
| `resolve`           | `project_id`, `name`              | —                                                                                                 | finds or creates a named type usable in the project; never duplicates |
| `create`            | `name`                            | `project_id`, `description`, `project_ids`, `is_active`, `external_source`, `external_id`         | —                                                                     |
| `update`            | `workitem_type_id`                | `project_id`, `name`, `description`, `project_ids`, `is_active`, `external_source`, `external_id` | only the fields you pass are changed                                  |
| `delete`            | `workitem_type_id`                | `project_id`                                                                                      | Destructive                                                           |
| `import_to_project` | `project_id`, `workitem_type_ids` | —                                                                                                 | links workspace types to a project                                    |

**Notes:** Omit project_id to work at workspace scope. A type's id is the type_id for `workitem create` and the workitem_type_id for `workitem_property list`. Prefer resolve over create when you just need a usable type such as Epic or Initiative: it handles both modes, matches exactly (case-sensitive, whitespace-stripped) and never duplicates. Where the workspace owns the vocabulary, creating a type on a project is rejected and importing is the only valid path -- resolve does that for you.

### `workitem_property` — Work item properties

Custom work item properties and their options.

| Action                   | Required                                            | Optional                                                                                                                                                                                                       | Notes                                                                                                                |
| ------------------------ | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `list`                   | —                                                   | `project_id`, `workitem_type_id`, `cursor`, `per_page`                                                                                                                                                         | no ids lists every workspace property in one call -- the fast path for PQL; Read-only                                |
| `retrieve`               | `workitem_property_id`                              | `project_id`, `workitem_type_id`                                                                                                                                                                               | Read-only                                                                                                            |
| `create`                 | `display_name`, `property_type`                     | `project_id`, `workitem_type_id`, `description`, `relation_type`, `is_required`, `is_multi`, `is_active`, `default_value`, `options`, `display_format`, `external_source`, `external_id`                       | —                                                                                                                    |
| `update`                 | `workitem_property_id`                              | `project_id`, `workitem_type_id`, `display_name`, `property_type`, `description`, `relation_type`, `is_required`, `is_multi`, `is_active`, `default_value`, `display_format`, `external_source`, `external_id` | only the fields you pass are changed                                                                                 |
| `delete`                 | `workitem_property_id`                              | `project_id`, `workitem_type_id`                                                                                                                                                                               | Destructive                                                                                                          |
| `manage_type_properties` | `workitem_type_id`                                  | `project_id`, `attach_ids`, `detach_ids`                                                                                                                                                                       | omit project_id where the workspace owns types; detach removes the association only, it does not delete the property |
| `list_options`           | `property_id`                                       | `project_id`                                                                                                                                                                                                   | Read-only                                                                                                            |
| `retrieve_option`        | `property_id`, `option_id`                          | `project_id`                                                                                                                                                                                                   | Read-only                                                                                                            |
| `create_option`          | `property_id`, `name`                               | `project_id`, `description`, `color`, `is_default`, `external_source`, `external_id`                                                                                                                           | —                                                                                                                    |
| `update_option`          | `property_id`, `option_id`                          | `project_id`, `name`, `description`, `color`, `is_default`, `external_source`, `external_id`                                                                                                                   | —                                                                                                                    |
| `delete_option`          | `property_id`, `option_id`                          | `project_id`                                                                                                                                                                                                   | Destructive                                                                                                          |
| `get_value`              | `project_id`, `workitem_id`, `property_id`          | —                                                                                                                                                                                                              | Read-only                                                                                                            |
| `set_value`              | `project_id`, `workitem_id`, `property_id`, `value` | `external_source`, `external_id`                                                                                                                                                                               | upsert; for a multi-value property this replaces every existing value                                                |
| `delete_value`           | `project_id`, `workitem_id`, `property_id`          | —                                                                                                                                                                                                              | Destructive                                                                                                          |

**Notes:** property_type is one of: TEXT, DATETIME, DECIMAL, BOOLEAN, OPTION, RELATION, URL, EMAIL, FILE, FORMULA. relation_type (for RELATION properties) is one of: ISSUE, USER, RELEASE, RICH_TEXT. A property id is what goes in a PQL cf["&lt;id&gt;"] filter; for OPTION properties the value is an option id. options takes a JSON array of {"name", "color", "is_default"} objects. display_format is required by TEXT (single-line, multi-line, readonly) and DATETIME (MMM dd, yyyy, dd/MM/yyyy, MM/dd/yyyy, yyyy/MM/dd) properties. A property lives with its type: where the workspace owns types, pass workitem_type_id without project_id and it is created in the workspace catalogue and associated for you. list resolves scope in this order: project_id + workitem_type_id is type-scoped (falling back to project-flat then workspace when empty), project_id alone is every property in the project, and neither is every workspace property. To filter by property name in PQL, call list with no ids -- one workspace-wide fetch beats iterating types -- then match display_name in memory to get the id for a cf[] condition. The \*\_value actions read and write a property on one work item: pass value in the type the property expects -- TEXT/URL/EMAIL/FILE as a string; DATETIME as a YYYY-MM-DD or YYYY-MM-DD HH:MM:SS string; DECIMAL as a number; BOOLEAN as true or false; OPTION and RELATION as an option or record id string, or an array of them when the property is multi-value. Send the value's own type, not a stringified form: "007" stays the text 007, whereas 7 is the number.

### `project_estimate` — Project estimates

A project's estimate system and its points.

| Action          | Required                                         | Optional                                                             | Notes                                         |
| --------------- | ------------------------------------------------ | -------------------------------------------------------------------- | --------------------------------------------- |
| `retrieve`      | `project_id`                                     | —                                                                    | a project has at most one estimate; Read-only |
| `create`        | `project_id`, `name`                             | `type`, `description`, `last_used`, `external_source`, `external_id` | —                                             |
| `update`        | `project_id`                                     | `name`, `description`, `external_source`, `external_id`              | —                                             |
| `delete`        | `project_id`                                     | —                                                                    | Destructive                                   |
| `link`          | `project_id`, `estimate_id`                      | —                                                                    | makes that estimate the project's active one  |
| `list_points`   | `project_id`, `estimate_id`                      | —                                                                    | Read-only                                     |
| `create_points` | `project_id`, `estimate_id`, `points`            | —                                                                    | —                                             |
| `update_point`  | `project_id`, `estimate_id`, `estimate_point_id` | `value`, `key`, `description`, `external_source`, `external_id`      | —                                             |
| `delete_point`  | `project_id`, `estimate_id`, `estimate_point_id` | —                                                                    | Destructive                                   |

**Notes:** type is one of: categories, points, time. A point's `value` is its display label ("5", "XL") and its `key` is the sort order. points takes a JSON array such as [{"value": "1", "key": 0}]. To set a work item's estimate: retrieve to get the estimate_id, list_points to see the available values, then pass the chosen point's id to `workitem update` as estimate_point.

## Planning

_Example prompt: “Move unfinished work from Sprint 14 to Sprint 15, then count it by priority.”_

### `cycle` — Cycles

Cycles (time-boxed iterations) in a project.

| Action               | Required                                 | Optional                                                                                                  | Notes                                                                                      |
| -------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `list`               | `project_id`                             | `archived`, `status`, `cursor`, `per_page`, `order_by`                                                    | Read-only                                                                                  |
| `retrieve`           | `project_id`, `cycle_id`                 | —                                                                                                         | Read-only                                                                                  |
| `create`             | `project_id`, `name`, `owned_by`         | `description`, `start_date`, `end_date`, `timezone`, `external_source`, `external_id`                     | —                                                                                          |
| `update`             | `project_id`, `cycle_id`                 | `name`, `description`, `start_date`, `end_date`, `owned_by`, `timezone`, `external_source`, `external_id` | only the fields you pass are changed                                                       |
| `delete`             | `project_id`, `cycle_id`                 | —                                                                                                         | Destructive                                                                                |
| `list_workitems`     | `project_id`, `cycle_id`                 | `pql`, `order_by`, `cursor`, `per_page`, `expand`, `fields`                                               | Read-only                                                                                  |
| `manage_workitems`   | `project_id`, `cycle_id`                 | `add_ids`, `remove_ids`                                                                                   | pass at least one of add_ids or remove_ids; returns nothing, read back with list_workitems |
| `transfer_workitems` | `project_id`, `cycle_id`, `new_cycle_id` | —                                                                                                         | moves everything to new_cycle_id                                                           |
| `complete`           | `project_id`, `cycle_id`                 | —                                                                                                         | sets end_date to today                                                                     |
| `archive`            | `project_id`, `cycle_id`                 | —                                                                                                         | ends the cycle first if it is still running                                                |
| `unarchive`          | `project_id`, `cycle_id`                 | —                                                                                                         | —                                                                                          |

**Notes:** status filters active cycles: current, upcoming, completed, draft, incomplete; it is ignored when archived is true. Dates are ISO 8601 (YYYY-MM-DD). owned_by is a member id. Optional Plane Query Language (PQL) filter. Examples: `priority = "urgent" AND assignee = currentUser()`, `stateGroup IN openStates() AND isOverdue()`. UUID fields (project, assignee, state, label, cycle, module, type, milestone, createdBy) need UUIDs — resolve a name to its UUID first if you only have a name or short identifier (e.g. `LSS` → `project list` and match `identifier` to get `id`). Call `get_pql_reference` for full PQL syntax before composing complex queries.

### `module` — Modules

Modules (feature groupings) in a project.

| Action             | Required                  | Optional                                                                                                          | Notes                                                                                      |
| ------------------ | ------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `list`             | `project_id`              | `archived`, `cursor`, `per_page`, `order_by`                                                                      | Read-only                                                                                  |
| `retrieve`         | `project_id`, `module_id` | —                                                                                                                 | Read-only                                                                                  |
| `create`           | `project_id`, `name`      | `description`, `start_date`, `target_date`, `status`, `lead`, `members`, `external_source`, `external_id`         | —                                                                                          |
| `update`           | `project_id`, `module_id` | `name`, `description`, `start_date`, `target_date`, `status`, `lead`, `members`, `external_source`, `external_id` | only the fields you pass are changed                                                       |
| `delete`           | `project_id`, `module_id` | —                                                                                                                 | Destructive                                                                                |
| `list_workitems`   | `project_id`, `module_id` | `pql`, `order_by`, `cursor`, `per_page`, `expand`, `fields`                                                       | Read-only                                                                                  |
| `manage_workitems` | `project_id`, `module_id` | `add_ids`, `remove_ids`                                                                                           | pass at least one of add_ids or remove_ids; returns nothing, read back with list_workitems |
| `archive`          | `project_id`, `module_id` | —                                                                                                                 | —                                                                                          |
| `unarchive`        | `project_id`, `module_id` | —                                                                                                                 | —                                                                                          |

**Notes:** status is one of: backlog, planned, in-progress, paused, completed, cancelled. Dates are ISO 8601 (YYYY-MM-DD). lead and members are member ids. Optional Plane Query Language (PQL) filter. Examples: `priority = "urgent" AND assignee = currentUser()`, `stateGroup IN openStates() AND isOverdue()`. UUID fields (project, assignee, state, label, cycle, module, type, milestone, createdBy) need UUIDs — resolve a name to its UUID first if you only have a name or short identifier (e.g. `LSS` → `project list` and match `identifier` to get `id`). Call `get_pql_reference` for full PQL syntax before composing complex queries.

### `milestone` — Milestones

Milestones within a project.

| Action             | Required                     | Optional                                                 | Notes                                                                                      |
| ------------------ | ---------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `list`             | `project_id`                 | `cursor`, `per_page`                                     | Read-only                                                                                  |
| `retrieve`         | `project_id`, `milestone_id` | —                                                        | Read-only                                                                                  |
| `create`           | `project_id`, `title`        | `target_date`, `external_source`, `external_id`          | —                                                                                          |
| `update`           | `project_id`, `milestone_id` | `title`, `target_date`, `external_source`, `external_id` | only the fields you pass are changed                                                       |
| `delete`           | `project_id`, `milestone_id` | —                                                        | Destructive                                                                                |
| `list_workitems`   | `project_id`, `milestone_id` | `cursor`, `per_page`                                     | Read-only                                                                                  |
| `manage_workitems` | `project_id`, `milestone_id` | `add_ids`, `remove_ids`                                  | pass at least one of add_ids or remove_ids; returns nothing, read back with list_workitems |

**Notes:** target_date is ISO 8601 (YYYY-MM-DD). add_ids and remove_ids take work item UUIDs.

### `initiative` — Initiatives

Workspace initiatives.

| Action            | Required                       | Optional                                                              | Notes                                                                |
| ----------------- | ------------------------------ | --------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `list`            | —                              | —                                                                     | returns every initiative; this endpoint does not paginate; Read-only |
| `retrieve`        | `initiative_id`                | —                                                                     | Read-only                                                            |
| `create`          | `name`                         | `description_html`, `start_date`, `end_date`, `state`, `lead`         | —                                                                    |
| `update`          | `initiative_id`                | `name`, `description_html`, `start_date`, `end_date`, `state`, `lead` | only the fields you pass are changed                                 |
| `delete`          | `initiative_id`                | —                                                                     | Destructive                                                          |
| `list_projects`   | `initiative_id`                | `cursor`, `per_page`                                                  | Read-only                                                            |
| `add_projects`    | `initiative_id`, `project_ids` | —                                                                     | returns nothing, read back with list_projects                        |
| `remove_projects` | `initiative_id`, `project_ids` | —                                                                     | returns nothing, read back with list_projects; Destructive           |

**Notes:** state is one of: DRAFT, PLANNED, ACTIVE, COMPLETED, CLOSED. Dates are ISO 8601 (YYYY-MM-DD). lead is a member id. project_ids takes project UUIDs.

## Releases

_Example prompt: “Create release v1.8.0, add ENG-40 through ENG-45, and draft its changelog.”_

### `release` — Releases

Releases in the workspace.

| Action             | Required     | Optional                                                                                                                            | Notes                                                                                      |
| ------------------ | ------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `list`             | —            | `cursor`, `per_page`                                                                                                                | Read-only                                                                                  |
| `retrieve`         | `release_id` | —                                                                                                                                   | Read-only                                                                                  |
| `create`           | `name`       | `description_html`, `status`, `release_date`, `target_date`, `tag_id`, `lead_id`, `is_prerelease`, `external_source`, `external_id` | —                                                                                          |
| `update`           | `release_id` | `name`, `description_html`, `status`, `release_date`, `target_date`, `tag_id`, `lead_id`, `is_prerelease`                           | only the fields you pass are changed                                                       |
| `delete`           | `release_id` | —                                                                                                                                   | Destructive                                                                                |
| `get_changelog`    | `release_id` | —                                                                                                                                   | Read-only                                                                                  |
| `update_changelog` | `release_id` | `description_html`, `description_stripped`                                                                                          | —                                                                                          |
| `list_workitems`   | `release_id` | `cursor`, `per_page`                                                                                                                | Read-only                                                                                  |
| `manage_workitems` | `release_id` | `add_ids`, `remove_ids`                                                                                                             | pass at least one of add_ids or remove_ids; returns nothing, read back with list_workitems |

**Notes:** status is one of: unreleased, released, cancelled, defaulting to unreleased. release_date is what the Plane UI labels "Target date" (YYYY-MM-DD); target_date is a separate stored date that the UI does not show. tag_id comes from `release_tag list`, lead_id from `member list_workspace`. For the changelog pass description_html, or description_stripped for plain text. A changelog is created empty with the release, so get_changelog always returns one.

### `release_tag` — Release tags

Release tags (version markers).

| Action     | Required  | Optional                                           | Notes                                |
| ---------- | --------- | -------------------------------------------------- | ------------------------------------ |
| `list`     | —         | `cursor`, `per_page`                               | Read-only                            |
| `retrieve` | `tag_id`  | —                                                  | Read-only                            |
| `create`   | `version` | `description`, `commit_hash`, `git_tag`            | —                                    |
| `update`   | `tag_id`  | `version`, `description`, `commit_hash`, `git_tag` | only the fields you pass are changed |
| `delete`   | `tag_id`  | —                                                  | Destructive                          |

**Notes:** version is a version string such as "v1.2.0". A tag id is what release takes as tag_id.

### `release_label` — Release labels

Release labels, workspace palette and per release.

| Action   | Required                  | Optional                           | Notes                                                       |
| -------- | ------------------------- | ---------------------------------- | ----------------------------------------------------------- |
| `list`   | —                         | `release_id`, `cursor`, `per_page` | the workspace palette unless release_id is given; Read-only |
| `create` | `name`                    | `color`, `sort_order`              | adds to the workspace palette                               |
| `update` | `label_id`                | `name`, `color`, `sort_order`      | —                                                           |
| `delete` | `label_id`                | —                                  | removes it from the palette entirely; Destructive           |
| `attach` | `release_id`, `label_ids` | —                                  | returns nothing, read back with list                        |
| `detach` | `release_id`, `label_ids` | —                                  | returns nothing, read back with list; Destructive           |

**Notes:** color is a hex code such as #4E5355. label_ids takes palette label ids. Detaching a label leaves it in the palette; delete removes it for everyone.

## Projects and workspace

_Example prompt: “List my active projects and show the work currently assigned to me.”_

### `project` — Projects

Projects in a workspace.

| Action            | Required             | Optional                                                                                                                                                                                                                                    | Notes                                                   |
| ----------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `list`            | —                    | `cursor`, `per_page`, `order_by`                                                                                                                                                                                                            | trimmed fields; use retrieve for full detail; Read-only |
| `retrieve`        | `project_id`         | —                                                                                                                                                                                                                                           | Read-only                                               |
| `create`          | `name`, `identifier` | `description`, `project_lead`, `default_assignee`, `emoji`, `cover_image`, `timezone`, `archive_in`, `close_in`, `external_source`, `external_id`                                                                                           | —                                                       |
| `update`          | `project_id`         | `name`, `description`, `identifier`, `project_lead`, `default_assignee`, `emoji`, `cover_image`, `network`, `timezone`, `archive_in`, `close_in`, `default_state`, `estimate`, `is_time_tracking_enabled`, `external_source`, `external_id` | only the fields you pass are changed                    |
| `delete`          | `project_id`         | —                                                                                                                                                                                                                                           | Destructive                                             |
| `archive`         | `project_id`         | —                                                                                                                                                                                                                                           | —                                                       |
| `unarchive`       | `project_id`         | —                                                                                                                                                                                                                                           | —                                                       |
| `worklog_summary` | `project_id`         | —                                                                                                                                                                                                                                           | Read-only                                               |
| `get_features`    | `project_id`         | —                                                                                                                                                                                                                                           | Read-only                                               |
| `update_features` | `project_id`         | `modules`, `cycles`, `views`, `pages`, `intakes`, `workitem_types`, `epics`, `parallel_cycles`, `project_updates`, `workflows`                                                                                                              | toggles project features on or off                      |

**Notes:** identifier is the short work item prefix, such as ENG. network is 0 for secret or 2 for public. project_lead and default_assignee are member ids -- get them from `member list_workspace`. Feature toggles are booleans; omitted ones are left as they are.

### `state` — Workflow states

Workflow states within a project.

| Action     | Required                      | Optional                                                                                     | Notes                                |
| ---------- | ----------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------ |
| `list`     | `project_id`                  | `cursor`, `per_page`                                                                         | Read-only                            |
| `retrieve` | `project_id`, `state_id`      | —                                                                                            | Read-only                            |
| `create`   | `project_id`, `name`, `color` | `description`, `sequence`, `group`, `is_triage`, `default`, `external_source`, `external_id` | —                                    |
| `update`   | `project_id`, `state_id`      | `name`, `color`, `description`, `sequence`, `group`, `is_triage`, `default`                  | only the fields you pass are changed |
| `delete`   | `project_id`, `state_id`      | —                                                                                            | Destructive                          |

**Notes:** group is one of: backlog, unstarted, started, completed, cancelled, triage. color is a hex code such as #EF4444.

### `label` — Labels

Labels within a project.

| Action     | Required                 | Optional                                                                                 | Notes                                |
| ---------- | ------------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------ |
| `list`     | `project_id`             | `cursor`, `per_page`                                                                     | Read-only                            |
| `retrieve` | `project_id`, `label_id` | —                                                                                        | Read-only                            |
| `create`   | `project_id`, `name`     | `color`, `description`, `parent`, `sort_order`, `external_source`, `external_id`         | —                                    |
| `update`   | `project_id`, `label_id` | `name`, `color`, `description`, `parent`, `sort_order`, `external_source`, `external_id` | only the fields you pass are changed |
| `delete`   | `project_id`, `label_id` | —                                                                                        | Destructive                          |

**Notes:** color is a hex code such as #EF4444. parent is the UUID of another label, for nesting.

### `member` — Members and roles

Workspace and project members, and role definitions.

| Action           | Required     | Optional                                                                                                                 | Notes                                                                 |
| ---------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| `me`             | —            | —                                                                                                                        | the authenticated user; Read-only                                     |
| `list_workspace` | —            | `first_name`, `last_name`, `email`, `display_name`, `role_slug`, `is_active`, `is_bot`, `cursor`, `per_page`, `order_by` | name filters match case-insensitively and combine with AND; Read-only |
| `list_project`   | `project_id` | —                                                                                                                        | Read-only                                                             |
| `list_roles`     | —            | `namespace`, `cursor`, `per_page`                                                                                        | Read-only                                                             |
| `retrieve_role`  | `role_id`    | —                                                                                                                        | Read-only                                                             |

**Notes:** namespace is 'workspace' (Owner/Admin/Member/Guest) or 'project' (Admin/Contributor/Commenter/Guest); omit for both. A role slug is stable but not globally unique -- key on (namespace, slug).

### `workspace` — Workspace settings

Workspace-level feature flags.

| Action            | Required | Optional                                                              | Notes                                              |
| ----------------- | -------- | --------------------------------------------------------------------- | -------------------------------------------------- |
| `get_features`    | —        | —                                                                     | feature flags for the current workspace; Read-only |
| `update_features` | —        | `project_grouping`, `initiatives`, `teams`, `customers`, `wiki`, `pi` | only the flags you pass are changed                |

**Notes:** For a project's feature flags use `project get_features` and `project update_features`.

### `intake` — Intake queue

The intake (triage) queue for a project.

| Action     | Required                    | Optional                                                           | Notes                                 |
| ---------- | --------------------------- | ------------------------------------------------------------------ | ------------------------------------- |
| `list`     | `project_id`                | `cursor`, `per_page`                                               | Read-only                             |
| `retrieve` | `project_id`, `workitem_id` | —                                                                  | Read-only                             |
| `create`   | `project_id`, `name`        | `description_html`, `priority`                                     | —                                     |
| `update`   | `project_id`, `workitem_id` | `status`, `snoozed_till`, `duplicate_to`, `source`, `source_email` | pass status to make a triage decision |
| `delete`   | `project_id`, `workitem_id` | —                                                                  | Destructive                           |

**Notes:** workitem_id is the `issue` field of an intake record, not the record's own id. status: -2 pending, -1 declined, 0 snoozed (needs snoozed_till), 1 accepted, 2 duplicate (needs duplicate_to). priority is one of: urgent, high, medium, low, none.

### `page` — Pages

Pages at workspace or project scope.

| Action                 | Required                                        | Optional                                                                       | Notes                                                                                  |
| ---------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| `list`                 | —                                               | `project_id`, `cursor`, `per_page`                                             | workspace pages unless project_id is given; Read-only                                  |
| `retrieve`             | `page_id`                                       | `project_id`                                                                   | Read-only                                                                              |
| `create`               | `name`, `description_html`                      | `project_id`, `access`, `color`, `is_locked`, `external_source`, `external_id` | —                                                                                      |
| `list_workitem_pages`  | `project_id`, `workitem_id`                     | —                                                                              | Read-only                                                                              |
| `attach_to_workitem`   | `project_id`, `workitem_id`, `page_id`          | —                                                                              | —                                                                                      |
| `detach_from_workitem` | `project_id`, `workitem_id`, `workitem_page_id` | —                                                                              | workitem_page_id is the link id from list_workitem_pages, not the page id; Destructive |

**Notes:** description_html is the page body as HTML. access is the page access level. Omit project_id to work with workspace-level pages.

## Customers

_Example prompt: “Create Acme as a customer and link its checkout request to the relevant work items.”_

### `customer` — Customers

Customers in the workspace.

| Action             | Required      | Optional                                                                                                                                           | Notes                                                                                       |
| ------------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `list`             | —             | `query`, `cursor`, `per_page`                                                                                                                      | Read-only                                                                                   |
| `retrieve`         | `customer_id` | —                                                                                                                                                  | Read-only                                                                                   |
| `create`           | `name`        | `description_html`, `email`, `website_url`, `domain`, `employees`, `stage`, `contract_status`, `revenue`, `external_source`, `external_id`         | upsert: matches on external_source + external_id, else on name, so it never duplicates      |
| `update`           | `customer_id` | `name`, `description_html`, `email`, `website_url`, `domain`, `employees`, `stage`, `contract_status`, `revenue`, `external_source`, `external_id` | only the fields you pass are changed                                                        |
| `delete`           | —             | `customer_id`, `external_source`, `external_id`                                                                                                    | address by customer_id, or by external_source plus external_id; Destructive                 |
| `list_workitems`   | `customer_id` | `customer_request_id`, `search`                                                                                                                    | Read-only                                                                                   |
| `manage_workitems` | `customer_id` | `link_ids`, `unlink_ids`, `customer_request_id`                                                                                                    | pass at least one of link_ids or unlink_ids; returns nothing, read back with list_workitems |

**Notes:** domain is the customer's industry, shown as "Industry" in Plane -- the website goes in website_url. stage renders as one of: lead, sales_qualified_lead, contract_negotiation, closed_won, closed_lost. contract_status renders as one of: active, pre_contract, signed, inactive. Both are stored free-form; anything else is kept but not displayed. revenue is annual revenue as a string.

### `customer_request` — Customer requests

Requests raised by a customer.

| Action     | Required                    | Optional                                   | Notes                                                                                     |
| ---------- | --------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `list`     | `customer_id`               | `query`, `cursor`, `per_page`              | Read-only                                                                                 |
| `retrieve` | `customer_id`, `request_id` | —                                          | Read-only                                                                                 |
| `create`   | `customer_id`, `name`       | `description_html`, `link`, `workitem_ids` | workitem_ids can only be set here; change links afterwards with customer manage_workitems |
| `update`   | `customer_id`, `request_id` | `name`, `description_html`, `link`         | only the fields you pass are changed                                                      |
| `delete`   | `customer_id`, `request_id` | —                                          | Destructive                                                                               |

**Notes:** link is a URL associated with the request. workitem_ids is never echoed back -- read the links with `customer list_workitems`.

### `customer_property` — Customer properties

Custom properties on customers.

| Action       | Required                        | Optional                                                                                                                                               | Notes                                                           |
| ------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| `list`       | —                               | `cursor`, `per_page`                                                                                                                                   | Read-only                                                       |
| `retrieve`   | `property_id`                   | —                                                                                                                                                      | Read-only                                                       |
| `create`     | `display_name`, `property_type` | `relation_type`, `description`, `is_required`, `is_multi`, `is_active`, `default_value`, `options`, `display_format`, `external_source`, `external_id` | —                                                               |
| `update`     | `property_id`                   | `display_name`, `relation_type`, `description`, `is_required`, `is_multi`, `is_active`, `default_value`, `options`, `external_source`, `external_id`   | only the fields you pass are changed                            |
| `delete`     | `property_id`                   | —                                                                                                                                                      | Destructive                                                     |
| `get_values` | `customer_id`                   | `property_id`                                                                                                                                          | omit property_id to read them all; Read-only                    |
| `set_values` | `customer_id`, `values`         | —                                                                                                                                                      | replaces the values of the properties named; others keep theirs |

**Notes:** display_name is the user-facing label and must be unique in the workspace -- the stored name is derived from it. property_type is one of: TEXT, DATETIME, DECIMAL, BOOLEAN, OPTION, RELATION, URL, EMAIL, FILE, FORMULA. relation_type (required for RELATION) is one of: ISSUE, USER, RELEASE, RICH_TEXT. display_format is required by TEXT (single-line, multi-line, readonly) and DATETIME (MMM dd, yyyy, dd/MM/yyyy, MM/dd/yyyy, yyyy/MM/dd). options takes a JSON array of {"name", "description", "is_default"} objects. values takes a JSON object of property id to a list of strings, e.g. {"&lt;id&gt;": ["Enterprise"]} -- every value is a string whatever the property type, and a single-item list unless is_multi.

## Query

_Example prompt: “Show the PQL syntax for overdue, in-progress work assigned to the current user.”_

### `get_pql_reference` — PQL reference

Plane Query Language (PQL) syntax reference. Call this before composing a `pql` filter for the workitem list, list_archived or count actions.

Takes `detail`: `full` (default) or `brief`. This tool has no `action` parameter.

**Notes:** detail 'full' gives operators, functions, common mistakes and worked examples; 'brief' gives the compact field and operator quick reference.

## Retired tool names

Plane MCP server 0.3.0 consolidated 177 per-operation tools into 28 resource tools. Of those 177 names, the 169 aliases below still resolve, stay hidden from tool listings, and accept their original parameter names; `get_pql_reference` is unchanged; and seven cannot be mapped to one action and instead return a message naming the replacement. The server logs each alias resolution.

### Names without an alias

| Retired name                 | Use instead                                                 |
| ---------------------------- | ----------------------------------------------------------- |
| `manage_customer_work_items` | `customer manage_workitems` with `link_ids` or `unlink_ids` |
| `manage_cycle_archive`       | `cycle archive` or `cycle unarchive`                        |
| `manage_initiative_projects` | `initiative add_projects` or `initiative remove_projects`   |
| `manage_module_archive`      | `module archive` or `module unarchive`                      |
| `manage_project_archive`     | `project archive` or `project unarchive`                    |
| `manage_release_labels`      | `release_label attach` or `release_label detach`            |
| `manage_release_work_items`  | `release manage_workitems` with `add_ids` or `remove_ids`   |

### Alias table

::: details Show all 169 aliases

#### `customer`

| Retired name               | Now                       |
| -------------------------- | ------------------------- |
| `list_customers`           | `customer list`           |
| `retrieve_customer`        | `customer retrieve`       |
| `create_customer`          | `customer create`         |
| `update_customer`          | `customer update`         |
| `delete_customer`          | `customer delete`         |
| `list_customer_work_items` | `customer list_workitems` |

#### `customer_property`

| Retired name                   | Now                            |
| ------------------------------ | ------------------------------ |
| `list_customer_properties`     | `customer_property list`       |
| `retrieve_customer_property`   | `customer_property retrieve`   |
| `create_customer_property`     | `customer_property create`     |
| `update_customer_property`     | `customer_property update`     |
| `delete_customer_property`     | `customer_property delete`     |
| `get_customer_property_values` | `customer_property get_values` |
| `set_customer_property_values` | `customer_property set_values` |

#### `customer_request`

| Retired name                | Now                         |
| --------------------------- | --------------------------- |
| `list_customer_requests`    | `customer_request list`     |
| `retrieve_customer_request` | `customer_request retrieve` |
| `create_customer_request`   | `customer_request create`   |
| `update_customer_request`   | `customer_request update`   |
| `delete_customer_request`   | `customer_request delete`   |

#### `cycle`

| Retired name                | Now                        |
| --------------------------- | -------------------------- |
| `list_cycles`               | `cycle list`               |
| `retrieve_cycle`            | `cycle retrieve`           |
| `create_cycle`              | `cycle create`             |
| `update_cycle`              | `cycle update`             |
| `delete_cycle`              | `cycle delete`             |
| `list_cycle_work_items`     | `cycle list_workitems`     |
| `manage_cycle_work_items`   | `cycle manage_workitems`   |
| `transfer_cycle_work_items` | `cycle transfer_workitems` |
| `complete_cycle`            | `cycle complete`           |

#### `initiative`

| Retired name               | Now                        |
| -------------------------- | -------------------------- |
| `list_initiatives`         | `initiative list`          |
| `retrieve_initiative`      | `initiative retrieve`      |
| `create_initiative`        | `initiative create`        |
| `update_initiative`        | `initiative update`        |
| `delete_initiative`        | `initiative delete`        |
| `list_initiative_projects` | `initiative list_projects` |

#### `intake`

| Retired name                | Now               |
| --------------------------- | ----------------- |
| `list_intake_work_items`    | `intake list`     |
| `retrieve_intake_work_item` | `intake retrieve` |
| `create_intake_work_item`   | `intake create`   |
| `update_intake_work_item`   | `intake update`   |
| `delete_intake_work_item`   | `intake delete`   |

#### `label`

| Retired name     | Now              |
| ---------------- | ---------------- |
| `list_labels`    | `label list`     |
| `retrieve_label` | `label retrieve` |
| `create_label`   | `label create`   |
| `update_label`   | `label update`   |
| `delete_label`   | `label delete`   |

#### `member`

| Retired name            | Now                     |
| ----------------------- | ----------------------- |
| `get_me`                | `member me`             |
| `get_workspace_members` | `member list_workspace` |
| `get_project_members`   | `member list_project`   |
| `list_roles`            | `member list_roles`     |
| `retrieve_role`         | `member retrieve_role`  |

#### `milestone`

| Retired name                  | Now                          |
| ----------------------------- | ---------------------------- |
| `list_milestones`             | `milestone list`             |
| `retrieve_milestone`          | `milestone retrieve`         |
| `create_milestone`            | `milestone create`           |
| `update_milestone`            | `milestone update`           |
| `delete_milestone`            | `milestone delete`           |
| `list_milestone_work_items`   | `milestone list_workitems`   |
| `manage_milestone_work_items` | `milestone manage_workitems` |

#### `module`

| Retired name               | Now                       |
| -------------------------- | ------------------------- |
| `list_modules`             | `module list`             |
| `retrieve_module`          | `module retrieve`         |
| `create_module`            | `module create`           |
| `update_module`            | `module update`           |
| `delete_module`            | `module delete`           |
| `list_module_work_items`   | `module list_workitems`   |
| `manage_module_work_items` | `module manage_workitems` |

#### `page`

| Retired name                 | Now                         |
| ---------------------------- | --------------------------- |
| `list_pages`                 | `page list`                 |
| `retrieve_page`              | `page retrieve`             |
| `create_page`                | `page create`               |
| `list_work_item_pages`       | `page list_workitem_pages`  |
| `attach_page_to_work_item`   | `page attach_to_workitem`   |
| `detach_page_from_work_item` | `page detach_from_workitem` |

#### `project`

| Retired name                  | Now                       |
| ----------------------------- | ------------------------- |
| `list_projects`               | `project list`            |
| `retrieve_project`            | `project retrieve`        |
| `create_project`              | `project create`          |
| `update_project`              | `project update`          |
| `delete_project`              | `project delete`          |
| `get_project_worklog_summary` | `project worklog_summary` |
| `update_project_features`     | `project update_features` |

#### `project_estimate`

| Retired name                     | Now                              |
| -------------------------------- | -------------------------------- |
| `get_project_estimate`           | `project_estimate retrieve`      |
| `create_project_estimate`        | `project_estimate create`        |
| `update_project_estimate`        | `project_estimate update`        |
| `delete_project_estimate`        | `project_estimate delete`        |
| `link_estimate_to_project`       | `project_estimate link`          |
| `list_project_estimate_points`   | `project_estimate list_points`   |
| `create_project_estimate_points` | `project_estimate create_points` |
| `update_project_estimate_point`  | `project_estimate update_point`  |
| `delete_project_estimate_point`  | `project_estimate delete_point`  |

#### `release`

| Retired name               | Now                        |
| -------------------------- | -------------------------- |
| `list_releases`            | `release list`             |
| `retrieve_release`         | `release retrieve`         |
| `create_release`           | `release create`           |
| `update_release`           | `release update`           |
| `delete_release`           | `release delete`           |
| `get_release_changelog`    | `release get_changelog`    |
| `update_release_changelog` | `release update_changelog` |
| `list_release_work_items`  | `release list_workitems`   |

#### `release_label`

| Retired name           | Now                    |
| ---------------------- | ---------------------- |
| `list_release_labels`  | `release_label list`   |
| `create_release_label` | `release_label create` |
| `update_release_label` | `release_label update` |
| `delete_release_label` | `release_label delete` |

#### `release_tag`

| Retired name           | Now                    |
| ---------------------- | ---------------------- |
| `list_release_tags`    | `release_tag list`     |
| `retrieve_release_tag` | `release_tag retrieve` |
| `create_release_tag`   | `release_tag create`   |
| `update_release_tag`   | `release_tag update`   |
| `delete_release_tag`   | `release_tag delete`   |

#### `state`

| Retired name     | Now              |
| ---------------- | ---------------- |
| `list_states`    | `state list`     |
| `retrieve_state` | `state retrieve` |
| `create_state`   | `state create`   |
| `update_state`   | `state update`   |
| `delete_state`   | `state delete`   |

#### `work_log`

| Retired name      | Now               |
| ----------------- | ----------------- |
| `list_work_logs`  | `work_log list`   |
| `create_work_log` | `work_log create` |
| `update_work_log` | `work_log update` |
| `delete_work_log` | `work_log delete` |

#### `workitem`

| Retired name                       | Now                               |
| ---------------------------------- | --------------------------------- |
| `list_work_items`                  | `workitem list`                   |
| `list_archived_work_items`         | `workitem list_archived`          |
| `retrieve_work_item`               | `workitem retrieve`               |
| `retrieve_work_item_by_identifier` | `workitem retrieve_by_identifier` |
| `search_work_items`                | `workitem search`                 |
| `count_work_items`                 | `workitem count`                  |
| `create_work_item`                 | `workitem create`                 |
| `update_work_item`                 | `workitem update`                 |
| `delete_work_item`                 | `workitem delete`                 |
| `manage_work_item_archive`         | `workitem archive`                |
| `manage_work_item_assignee`        | `workitem manage_assignee`        |
| `manage_work_item_label`           | `workitem manage_label`           |

#### `workitem_activity`

| Retired name                  | Now                          |
| ----------------------------- | ---------------------------- |
| `list_work_item_activities`   | `workitem_activity list`     |
| `retrieve_work_item_activity` | `workitem_activity retrieve` |

#### `workitem_attachment`

| Retired name                            | Now                                   |
| --------------------------------------- | ------------------------------------- |
| `list_work_item_attachments`            | `workitem_attachment list`            |
| `read_work_item_attachment`             | `workitem_attachment read`            |
| `get_work_item_attachment_download_url` | `workitem_attachment download_url`    |
| `upload_work_item_attachment_from_url`  | `workitem_attachment upload_from_url` |
| `delete_work_item_attachment`           | `workitem_attachment delete`          |

#### `workitem_comment`

| Retired name                 | Now                         |
| ---------------------------- | --------------------------- |
| `list_work_item_comments`    | `workitem_comment list`     |
| `retrieve_work_item_comment` | `workitem_comment retrieve` |
| `create_work_item_comment`   | `workitem_comment create`   |
| `update_work_item_comment`   | `workitem_comment update`   |
| `delete_work_item_comment`   | `workitem_comment delete`   |

#### `workitem_link`

| Retired name              | Now                      |
| ------------------------- | ------------------------ |
| `list_work_item_links`    | `workitem_link list`     |
| `retrieve_work_item_link` | `workitem_link retrieve` |
| `create_work_item_link`   | `workitem_link create`   |
| `update_work_item_link`   | `workitem_link update`   |
| `delete_work_item_link`   | `workitem_link delete`   |

#### `workitem_property`

| Retired name                         | Now                                        |
| ------------------------------------ | ------------------------------------------ |
| `list_work_item_properties`          | `workitem_property list`                   |
| `retrieve_work_item_property`        | `workitem_property retrieve`               |
| `create_work_item_property`          | `workitem_property create`                 |
| `update_work_item_property`          | `workitem_property update`                 |
| `delete_work_item_property`          | `workitem_property delete`                 |
| `manage_work_item_type_properties`   | `workitem_property manage_type_properties` |
| `list_work_item_property_options`    | `workitem_property list_options`           |
| `retrieve_work_item_property_option` | `workitem_property retrieve_option`        |
| `create_work_item_property_option`   | `workitem_property create_option`          |
| `update_work_item_property_option`   | `workitem_property update_option`          |
| `delete_work_item_property_option`   | `workitem_property delete_option`          |
| `get_work_item_property_value`       | `workitem_property get_value`              |
| `set_work_item_property_value`       | `workitem_property set_value`              |
| `delete_work_item_property_value`    | `workitem_property delete_value`           |

#### `workitem_relation`

| Retired name                           | Now                                   |
| -------------------------------------- | ------------------------------------- |
| `list_work_item_relations`             | `workitem_relation list`              |
| `create_work_item_relation`            | `workitem_relation create`            |
| `remove_work_item_relation`            | `workitem_relation delete`            |
| `list_work_item_relation_definitions`  | `workitem_relation list_definitions`  |
| `create_work_item_relation_definition` | `workitem_relation create_definition` |
| `update_work_item_relation_definition` | `workitem_relation update_definition` |
| `delete_work_item_relation_definition` | `workitem_relation delete_definition` |

#### `workitem_type`

| Retired name                        | Now                               |
| ----------------------------------- | --------------------------------- |
| `list_work_item_types`              | `workitem_type list`              |
| `retrieve_work_item_type`           | `workitem_type retrieve`          |
| `resolve_work_item_type`            | `workitem_type resolve`           |
| `create_work_item_type`             | `workitem_type create`            |
| `update_work_item_type`             | `workitem_type update`            |
| `delete_work_item_type`             | `workitem_type delete`            |
| `import_work_item_types_to_project` | `workitem_type import_to_project` |

#### `workspace`

| Retired name                | Now                         |
| --------------------------- | --------------------------- |
| `get_features`              | `workspace get_features`    |
| `update_workspace_features` | `workspace update_features` |

:::

## See also

- [Set up the MCP server](/dev-tools/mcp-server)
- [Self-host the MCP server](/dev-tools/mcp-server-self-host)
- [Tool architecture and extension guide](https://github.com/makeplane/plane-mcp-server/blob/v0.3.0/plane_mcp/tools/README.md)
