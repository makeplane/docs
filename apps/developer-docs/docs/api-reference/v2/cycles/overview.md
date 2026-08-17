---
title: Cycles overview
description: The Plane API v2 cycle object. Attributes, start and end dates, time zones, cycle ownership, and the endpoints for managing project cycles.
keywords: plane api v2, cycles, sprints, iterations, start_date, end_date, cycle timezone, owned_by_id
---

# Cycles overview

A cycle is a time-boxed iteration inside a project — a sprint, a release window, or any fixed period a team commits work to. A cycle belongs to exactly one project and is never shared across projects.

Cycles are defined by a `start_date` and an `end_date`, interpreted in the cycle's own `timezone`. Both dates are optional, so a cycle can exist as an unscheduled container and be given dates later.

[Learn more about cycles](https://docs.plane.so/core-concepts/cycles)

<div class="api-two-column">
<div class="api-left">

## The cycle object

### Attributes

- `id` _string (uuid)_

  Unique identifier for the cycle.

- `name` _string_

  Display name, unique within the project. Maximum 255 characters.

- `description` _string_

  Free-form description of what the cycle covers.

- `start_date` _string (date-time)_

  When the cycle opens. `null` if the cycle has not been scheduled.

- `end_date` _string (date-time)_

  When the cycle closes. `null` if the cycle has not been scheduled.

- `timezone` _string_

  The IANA time zone the cycle's dates are interpreted in, for example `America/New_York` or `UTC`. This is what makes a cycle boundary land at local midnight rather than UTC midnight for a distributed team.

- `owned_by_id` _string (uuid)_

  The user who owns the cycle. Read-only — assigned by Plane and not settable through the API. Use it to filter cycles on list.

- `sort_order` _number_

  Ordering weight for the cycle within the project. Lower values sort first when you order by `sort_order`.

- `logo_props` _any_

  JSON blob holding the cycle's icon configuration, as written by Plane clients. Passed through unchanged.

- `external_id` , `external_source` _string_

  Correlation fields for sync and import. Together they let you map a cycle to a record in another system and find it again later — both are exposed as list filters.

- `created_at` _string (date-time)_

  When the cycle was created.

- `created_by_id` _string (uuid)_

  The user who created the cycle.

::: info Dates are timestamps, not calendar days
`start_date` and `end_date` are full date-times. Send them as ISO 8601 timestamps and read `timezone` to interpret where the boundary falls.
:::

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE CYCLE OBJECT">

```json
{
  "id": "7c1f9a4e-3b6d-4a52-8f0c-2d9e6b18c3a7",
  "name": "Sprint 24",
  "description": "Checkout rewrite and billing cleanup",
  "start_date": "2026-01-05T00:00:00Z",
  "end_date": "2026-01-19T00:00:00Z",
  "timezone": "America/New_York",
  "owned_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "sort_order": 65535,
  "logo_props": {},
  "external_id": null,
  "external_source": null,
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                                      | Description                        |
| -------- | ------------------------------------------------------------------------- | ---------------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/cycles/`                 | List cycles                        |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/cycles/`                 | Create a cycle                     |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/cycles/bulk/`            | Bulk write cycles                  |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/cycles/upsert/`          | Upsert a cycle                     |
| `DELETE` | `/api/v2/workspaces/{slug}/projects/{project_id}/cycles/{pk}/`            | Delete a cycle                     |
| `GET`    | `/api/v2/workspaces/{slug}/projects/{project_id}/cycles/{pk}/`            | Get a cycle                        |
| `PATCH`  | `/api/v2/workspaces/{slug}/projects/{project_id}/cycles/{pk}/`            | Update a cycle                     |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/cycles/{pk}/transfer/`   | Transfer work items between cycles |
| `POST`   | `/api/v2/workspaces/{slug}/projects/{project_id}/cycles/{pk}/work-items/` | Add or remove cycle work items     |

## Names are unique per project

Cycle names must be unique within a project. Creating a second cycle with a name already in use, or renaming a cycle onto an existing name, returns `409 conflict`. Uniqueness is scoped to the project, so two different projects can both have a `Sprint 24`.

## Ownership is read-only

`owned_by_id` is returned on every read but is not part of the write body — you cannot assign a cycle owner through the v2 API. You can still filter by owner on list with `?owned_by_id=`, which is the common case for building "my cycles" views.

## No `?expand=` on cycles

Cycles do not support `?expand=`. Related records are referenced by id only — resolve `owned_by_id` and `created_by_id` against the members endpoints when you need names.

## Cycle work items are v1-only

v2 does not yet expose the cycle work-item sub-resources. Adding work items to a cycle, listing a cycle's work items, removing one, or transferring work items between cycles are all still v1 operations.

::: warning Use v1 for cycle membership
Create and manage the cycle itself in v2, then use the v1 cycle work-item endpoints to populate it. See the
[v1 cycle reference](/api-reference/v1/cycle/overview).
:::

Archiving is likewise not part of the v2 cycles surface — v2 exposes create, read, update, and delete only.

## Changed from v1

- `owned_by` is now **`owned_by_id`**, and `created_by` is now **`created_by_id`**.
- `start_date` and `end_date` are **date-times**, not plain calendar dates.
- Reads no longer return `updated_at`, `updated_by`, `project`, `workspace`, or `view_props`.
- The list endpoint drops `cycle_view`, `expand`, and `fields`, and adds `search`, `owned_by_id`, `external_id`, and `external_source` filters.
- Updates are `PATCH` only — v2 has no `PUT`.

See [Migrating from v1](/api-reference/v2/migrating-from-v1) for the full list.
