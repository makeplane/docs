---
title: Customer properties overview
description: The Plane API v2 customer property object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, customer properties, customer property object
---

# Customer properties overview

Customer properties are the workspace-level custom field catalog for customers.

<div class="api-two-column">
<div class="api-left">

## The customer property object

### Attributes

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `default_value` _array of string_

  The default value.

- `description` _string_

  Free-form description.

- `display_name` _string_

  The display name.

- `external_id` _string_

  Your system's identifier for this record, for sync and import correlation.

- `external_source` _string_

  The system `external_id` came from, for example `github` or `jira`.

- `id` _string (uuid)_

  Unique identifier.

- `is_active` _boolean_

  Whether the record is active.

- `is_multi` _boolean_

  Whether is multi.

- `is_required` _boolean_

  Whether is required.

- `logo_props` _string_

  Editor-owned logo descriptor. Pass back what you read rather than composing it by hand.

- `name` _string_

  Display name.

- `options` _array of string_

  The options.

- `property_type` _string_

  The property type.

- `relation_type` _string_

  The relation type.

- `settings` _string_

  The settings.

- `sort_order` _number_

  Manual ordering weight. Lower sorts first.

- `validation_rules` _string_

  The validation rules.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE CUSTOMER PROPERTY OBJECT">

```json
{
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "default_value": ["example"],
  "description": "What this is for.",
  "display_name": "example",
  "external_id": null,
  "external_source": null,
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "is_active": true,
  "is_multi": false,
  "is_required": false,
  "logo_props": null,
  "name": "Example name",
  "options": [null],
  "property_type": "TEXT",
  "relation_type": null,
  "settings": null,
  "sort_order": 65535,
  "validation_rules": null
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                  | Description                |
| -------- | ----------------------------------------------------- | -------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/customer-properties/`      | List customer properties   |
| `POST`   | `/api/v2/workspaces/{slug}/customer-properties/`      | Create a customer property |
| `DELETE` | `/api/v2/workspaces/{slug}/customer-properties/{pk}/` | Delete a customer property |
| `GET`    | `/api/v2/workspaces/{slug}/customer-properties/{pk}/` | Get a customer property    |
| `PATCH`  | `/api/v2/workspaces/{slug}/customer-properties/{pk}/` | Update a customer property |

## Response shaping

Every customer property read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
