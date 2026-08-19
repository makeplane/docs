---
title: Delete a workspace work item property
description: Delete a workspace-level custom property with the Plane v2 REST API. What deletion takes with it, mode conflicts, OAuth scopes, error codes, and code examples.
keywords: plane api v2, delete work item property, DELETE workspace custom property, retire property, work item type modes, 409 conflict
---

# Delete a workspace work item property

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v2/workspaces/{slug}/work-item-properties/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Remove a property from the workspace catalog. The delete is soft and the response is `204` with an empty body.

This is the wide blast radius option: the property leaves every project and work item type it reached, unlike
[detaching it from a single type](/api-reference/v2/workspace-work-item-type-properties/detach-workspace-type-property),
which only affects that one type.

::: tip Retire before you delete
If the property has been collecting values, `PATCH` it with `is_active: false` first. The definition stays
addressable while you migrate, and you can reverse the decision with a single field. Deleting is the move for
a property created by mistake.
:::

::: warning Wrong mode is a 409, not a 404
If the workspace manages work item types at the **project** level, this route returns `409` with the code
`work_item_types_managed_at_project`. Delete the property on the project-level resource instead. See
[Work item type modes](/api-reference/v2/work-item-type-modes).
:::

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is
`my-team`.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The property's id.

</ApiParam>

</div>
</div>

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `created_at`, `default_value`, `description`, `display_name`, `external_id`, `external_source`, `id`, `is_active`, `is_multi`, `is_required`, `logo_props`, `name`, `options`, `property_type`, `relation_type`, `settings`, `validation_rules`.

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

| Status | Code                     | Cause                                                                                |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `400`  | `invalid_request`        | The request failed validation — most often a `pk` that isn't a valid UUID.           |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                      |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`              | Your role or token scope can't write workspace work item properties.                 |
| `404`  | `not_found`              | No such workspace or property, or it's outside your tenant.                          |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | This workspace manages work item types at the project level.                         |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="Delete a workspace property" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/a7e3f1d0-5c92-4b68-8f31-2d4a6b9e0c15/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/a7e3f1d0-5c92-4b68-8f31-2d4a6b9e0c15/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/work-item-properties/a7e3f1d0-5c92-4b68-8f31-2d4a6b9e0c15/",
  {
    method: "DELETE",
    headers: {
      "X-Api-Key": "your-api-key",
    },
  },
);
console.log(response.status);
```

</template>
</CodePanel>

<ResponsePanel status="204">

```text
No content
```

</ResponsePanel>

<ResponsePanel status="409">

```json
{
  "type": "conflict",
  "code": "work_item_types_managed_at_project",
  "detail": "This workspace manages work item types at the project level. Use the project-level endpoint instead."
}
```

</ResponsePanel>

</div>
</div>

::: info Deleting the property takes its scoping with it
A property's [contexts](/api-reference/v2/work-item-property-contexts/overview) and
[options](/api-reference/v2/workspace-work-item-property-options/overview) are mounted underneath it. Once the
property is gone, those sub-resources are no longer addressable — `GET`s under the deleted `property_id`
return `404 not_found`.
:::
