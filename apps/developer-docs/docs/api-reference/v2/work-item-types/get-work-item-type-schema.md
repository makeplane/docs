---
title: Get a work item type schema
description: Discover the fields and custom properties a Plane work item type accepts with the v2 REST API. The include parameter, fields and custom_fields shapes, OAuth scopes, error codes, and code examples.
keywords: plane api v2, work item type schema, custom properties, discovery endpoint, custom_fields, include members labels, agent tooling
---

# Get a work item type schema

<div class="api-endpoint-badge">
  <span class="method get">GET</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-types/{pk}/schema/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Ask the API what a work item of this type accepts. The response describes the **standard fields** every work item has — with the project's actual states, priorities, and estimate points inlined as valid options — plus the **custom properties** attached to this type, including which ones are required and what values they allow.

This is the discovery endpoint. A client that is about to create a work item calls this first, then builds its request body from the answer instead of hardcoding a field list. That matters most for two callers:

- **Integrations**, which must adapt when an admin adds a required property to a type. Reading the schema each time means a new required field surfaces as a field to fill, not as a `400` in production.
- **AI agents and generated tooling**, which need a machine-readable contract. `fields` and `custom_fields` are shaped to be handed straight to a function-calling schema: every entry carries a type, a required flag, and its allowed options.

Reads are unaffected by [work item type mode](/api-reference/v2/work-item-type-modes) — the schema resolves the type's properties whether they are owned by the project or by the workspace.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the type belongs to. The schema is project-specific: states, labels, members, and estimate points all come from this project.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The id of the work item type whose schema you want.

</ApiParam>

</div>
</div>

<div class="params-section">

### Query Parameters

<div class="params-list">

<ApiParam name="include" type="string" :required="false">

Comma-separated extra option lists to inline. Two values are recognized:

- `members` — inlines the project's active members as the options for `assignee_ids`, and for any custom property that is a user relation
- `labels` — inlines the project's labels as the options for `label_ids`

Omit it and those fields still appear, they just describe themselves without an option list. These lists can be large in a big workspace, so ask for them only when you are actually rendering a picker — for example `?include=members,labels`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response Fields

<div class="params-list">

<ApiParam name="type_id" type="string (uuid)" :required="true">

The type this schema describes. Send it as `type_id` on the work item you create. Nullable.

</ApiParam>

<ApiParam name="type_name" type="string" :required="true">

The type's display name, for example `Bug`. Nullable.

</ApiParam>

<ApiParam name="type_description" type="string" :required="true">

The type's description. This is the text a human or an agent reads to decide whether this is the right type for the work at hand, which is why filling it in on [create](/api-reference/v2/work-item-types/create-work-item-type) is worth the effort. Nullable.

</ApiParam>

<ApiParam name="type_logo_props" type="any" :required="true">

The icon and background color rendered next to the type. Nullable.

</ApiParam>

<ApiParam name="fields" type="any" :required="true">

The standard work item fields, keyed by the body parameter name you would send — `name`, `description_html`, `priority`, `state_id`, `assignee_ids`, `label_ids`, `start_date`, `target_date`, `parent_id`. Each entry carries a `type`, a `required` flag, and where it applies an `is_multi` flag, a `default`, a `max_length`, a `format`, or an `options` array.

`state_id` and `priority` always arrive with their options inlined, because those are the two fields a client cannot guess. `estimate_point_id` appears only when the project has an estimate system configured.

</ApiParam>

<ApiParam name="custom_fields" type="any" :required="true">

The custom properties attached to this type, keyed by property name. Each entry carries the property `id`, its `type`, `name`, `display_name`, `description`, a `required` flag, and an `is_multi` flag.

- `OPTION` properties also carry an `options` array of `{ id, name, logo_props }`, narrowed to the options this type allows.
- `RELATION` properties also carry a `relation_type`.

Empty when the type has no properties attached, or when custom properties are not available for the workspace.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_item_types:read`

</div>

<div class="params-section">

### Errors

| Status | Code               | Cause                                                                                |
| ------ | ------------------ | ------------------------------------------------------------------------------------ |
| `401`  | `unauthorized`     | Missing or invalid credentials.                                                      |
| `402`  | `payment_required` | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`        | Your role or token scope can't read this project's work item types.                  |
| `404`  | `not_found`        | No such type, project, or workspace — or the type belongs to another project.        |
| `406`  | `not_acceptable`   | The `Accept` header asks for a representation the API can't produce.                 |
| `429`  | `rate_limited`     | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="Get a work item type schema" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X GET \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/d1e7a4c9-2b58-4f36-9a0e-7c3b5d81f240/schema/?include=members,labels" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.get(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/d1e7a4c9-2b58-4f36-9a0e-7c3b5d81f240/schema/",
    headers={"X-Api-Key": "your-api-key"},
    params={"include": "members,labels"},
)
schema = response.json()

required = [name for name, field in schema["custom_fields"].items() if field["required"]]
print(schema["type_name"], "requires:", required)
```

</template>
<template #javascript>

```javascript
const params = new URLSearchParams({ include: "members,labels" });
const response = await fetch(
  `https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/d1e7a4c9-2b58-4f36-9a0e-7c3b5d81f240/schema/?${params}`,
  {
    headers: {
      "X-Api-Key": "your-api-key",
    },
  },
);
const schema = await response.json();

const required = Object.entries(schema.custom_fields)
  .filter(([, field]) => field.required)
  .map(([name]) => name);
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "type_id": "d1e7a4c9-2b58-4f36-9a0e-7c3b5d81f240",
  "type_name": "Bug",
  "type_description": "Something is broken and needs a fix",
  "type_logo_props": {
    "in_use": "icon",
    "icon": {
      "name": "AlertCircle",
      "background_color": "#EF5974"
    }
  },
  "fields": {
    "name": {
      "type": "string",
      "required": true,
      "max_length": 255
    },
    "description_html": {
      "type": "string",
      "required": false
    },
    "priority": {
      "type": "option",
      "required": false,
      "default": "none",
      "options": [
        { "value": "urgent", "label": "Urgent" },
        { "value": "high", "label": "High" },
        { "value": "medium", "label": "Medium" },
        { "value": "low", "label": "Low" },
        { "value": "none", "label": "None" }
      ]
    },
    "state_id": {
      "type": "uuid",
      "required": false,
      "options": [
        {
          "id": "2c4d16f8-9b3e-4a52-8d71-1f0e6c9a5b48",
          "name": "Backlog",
          "color": "#8b8d98",
          "group": "backlog"
        },
        {
          "id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
          "name": "In Progress",
          "color": "#3f76ff",
          "group": "started"
        },
        {
          "id": "7b1e9d40-3c86-4f2a-9a5d-8e2b0c47d613",
          "name": "Done",
          "color": "#26a05f",
          "group": "completed"
        }
      ]
    },
    "assignee_ids": {
      "type": "uuid",
      "is_multi": true,
      "required": false,
      "options": [
        {
          "id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
          "display_name": "rin",
          "email": "rin@my-team.dev"
        }
      ]
    },
    "label_ids": {
      "type": "uuid",
      "is_multi": true,
      "required": false,
      "options": [
        {
          "id": "5e0c7b93-1a24-4d68-8f31-9b7e2c05a4d7",
          "name": "regression",
          "color": "#f5a623"
        }
      ]
    },
    "start_date": {
      "type": "date",
      "required": false,
      "format": "YYYY-MM-DD"
    },
    "target_date": {
      "type": "date",
      "required": false,
      "format": "YYYY-MM-DD"
    },
    "parent_id": {
      "type": "uuid",
      "required": false
    }
  },
  "custom_fields": {
    "severity": {
      "id": "a8b31d67-5e42-4c09-9f78-2d6b41e0c395",
      "type": "OPTION",
      "name": "severity",
      "display_name": "Severity",
      "description": "How badly this breaks the product",
      "required": true,
      "is_multi": false,
      "options": [
        {
          "id": "3f8c2a71-6d90-4e15-b243-0c9e7a5b16f8",
          "name": "S1",
          "logo_props": {}
        },
        {
          "id": "b47e0d29-8153-4a6c-9e70-2f1d5c83a904",
          "name": "S2",
          "logo_props": {}
        }
      ]
    },
    "found_by": {
      "id": "c0a95f38-7b1e-4d62-8305-6e4a9b27fd51",
      "type": "RELATION",
      "name": "found_by",
      "display_name": "Found by",
      "description": "",
      "required": false,
      "is_multi": false,
      "relation_type": "USER",
      "options": [
        {
          "id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
          "display_name": "rin",
          "email": "rin@my-team.dev"
        }
      ]
    }
  }
}
```

</ResponsePanel>

</div>
</div>

## How to use the schema

The response is a plan for the next request. A client that reads it correctly needs no hardcoded knowledge of the project's configuration.

1. **Pick the type.** Read `type_name` and `type_description` to confirm this is the right type, and carry `type_id` into the work item body.
2. **Fill the standard fields from `fields`.** Anything with `"required": true` must be present. Where an entry has `options`, send one of those `id` values — a state id from another project is a `400`, never a silent link.
3. **Fill the custom properties from `custom_fields`.** Send them under `custom_fields` on the work item, keyed by the same property name. Entries with `"required": true` must be present on create.
4. **Respect `is_multi`.** A field with `"is_multi": true` takes an array; one without takes a single value.

::: tip Re-read the schema, don't cache it forever
Admins add and retire properties. A property that became required since your last sync is the most common cause of a surprise `400` on work item create. Reading the schema at the start of a sync run costs one request and removes the failure mode entirely.
:::

## Property types

`custom_fields` entries carry the property's `type`. The possible values are `TEXT`, `DATETIME`, `DECIMAL`, `BOOLEAN`, `OPTION`, `RELATION`, `URL`, `EMAIL`, `FILE`, and `FORMULA`.

A `RELATION` property additionally carries `relation_type`, one of `ISSUE`, `USER`, `RELEASE`, or `RICH_TEXT`, telling you what kind of id its value refers to.

::: info Options are narrowed per type
The `options` list on an `OPTION` property is what **this type** allows, which can be a subset of every option defined on the property. Read the options from the schema rather than from [the property options endpoint](/api-reference/v2/work-item-property-options/list-property-options) when you want the values valid for this specific type.
:::

## Related

- [Attach a property to a type](/api-reference/v2/work-item-type-properties/attach-type-property) — what puts an entry into `custom_fields`
- [Create a work item property](/api-reference/v2/work-item-properties/create-work-item-property) — defining the property in the first place
- [Create a work item](/api-reference/v2/work-items/create-work-item) — where the schema gets spent
