---
title: Work item relation definitions overview
description: The Plane API v2 relation definition object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, work item relation definitions, relation definition object
---

# Work item relation definitions overview

Relation definitions are the workspace registry of typed work item relationships.

<div class="api-two-column">
<div class="api-left">

## The relation definition object

### Attributes

- `color` _string_

  Hex color used wherever this is rendered, for example `#3f76ff`.

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `description` _string_

  Free-form description.

- `external_id` _string_

  Your system's identifier for this record, for sync and import correlation.

- `external_source` _string_

  The system `external_id` came from, for example `github` or `jira`.

- `id` _string (uuid)_

  Unique identifier.

- `inward` _string_

  The inward.

- `is_active` _boolean_

  Whether the record is active.

- `is_default` _boolean_

  Make this the default for its parent. Setting it clears the flag on the previous default.

- `logo_props` _string_

  Editor-owned logo descriptor. Pass back what you read rather than composing it by hand.

- `name` _string_

  Display name.

- `outward` _string_

  The outward.

- `sort_order` _number_

  Manual ordering weight. Lower sorts first.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE RELATION DEFINITION OBJECT">

```json
{
  "color": "#3f76ff",
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "description": "What this is for.",
  "external_id": null,
  "external_source": null,
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "inward": "example",
  "is_active": true,
  "is_default": false,
  "logo_props": null,
  "name": "Example name",
  "outward": "example",
  "sort_order": 65535
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                             | Description                  |
| -------- | ---------------------------------------------------------------- | ---------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/work-item-relation-definitions/`      | List relation definitions    |
| `GET`    | `/api/v2/workspaces/{slug}/work-item-relation-definitions/{pk}/` | Get a relation definition    |
| `POST`   | `/api/v2/workspaces/{slug}/work-item-relation-definitions/`      | Create a relation definition |
| `PATCH`  | `/api/v2/workspaces/{slug}/work-item-relation-definitions/{pk}/` | Update a relation definition |
| `DELETE` | `/api/v2/workspaces/{slug}/work-item-relation-definitions/{pk}/` | Delete a relation definition |

## Response shaping

Every relation definition read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
