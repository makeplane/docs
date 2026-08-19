---
title: Delete a work item
description: Delete a work item in a Plane project with the v2 REST API. Soft-delete behavior, the 204 response, when to archive instead, OAuth scopes, error codes, and code examples.
keywords: plane api v2, delete work item, DELETE work item, soft delete, 204 no content, archive vs delete
---

# Delete a work item

<div class="api-endpoint-badge">
  <span class="method delete">DELETE</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-items/{pk}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Delete a work item. The delete is a soft delete — the row is retained internally — but it is gone from every API
surface, and there is no endpoint to bring it back.

A successful delete returns `204` with an empty body. Deleting a work item that is already gone returns `404`, so the
call is not idempotent from the client's point of view.

If you want the work item out of the way but recoverable, use
[Archive a work item](/api-reference/v2/work-items/archive-work-item) instead.

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project the work item belongs to.

</ApiParam>

<ApiParam name="pk" type="string (uuid)" :required="true">

The work item's UUID. This lookup is UUID-only — a `PROJ-142` identifier here returns `404`.

</ApiParam>

</div>
</div>

::: warning Deleting is not reversible through the API
There is no undelete endpoint. Confirm with the user before wiring this into an automation, and prefer archiving for
anything you might want back.
:::

<div class="params-section">

### Response shaping

<div class="params-list">

<ApiParam name="fields" type="string" :required="false">

Comma-separated list of fields to return. Unrequested keys are **omitted** from the response, not returned as `null`, so absent means "not requested" and `null` means "actually null". `id` always comes back whether or not you name it.

Pass `all` for every requestable field. An unknown name is a `400` that lists the valid set and suggests the closest match, so a typo can't silently cost you the saving.

Requestable here: `archived_at`, `assignee_ids`, `created_at`, `created_by_id`, `custom_fields`, `cycle_id`, `id`, `identifier`, `is_draft`, `label_ids`, `module_ids`, `name`, `parent_id`, `priority`, `project_id`, `sequence_id`, `start_date`, `state_id`, `target_date`, `type_id`.

See [Sparse fields](/api-reference/v2/sparse-fields).

</ApiParam>

<ApiParam name="expand" type="string" :required="false">

Comma-separated relations to embed alongside the ids: `assignees` (the assigned users), `cycle` (the cycle it belongs to), `labels` (the applied labels), `modules` (the modules it belongs to), `parent` (its parent work item), `state` (the work item's state object), `type` (its work item type).

Expansion is separate-key: `?expand=state` keeps `state_id` and adds a `state` object next to it, so an id is never replaced by an object. An unknown value is a `400`.

`?fields=` and `?expand=` are independent namespaces. Relation names are not valid `?fields=` tokens (and vice versa), and an expanded object survives field filtering — `?fields=id,name&expand=state` returns `id`, `name` and `state`. See [Expanding relations](/api-reference/v2/expanding-relations).

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_items:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `400`  | `invalid_request`        | The request could not be processed — for example a `pk` that isn't a valid UUID.     |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                      |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`              | Your role or token scope can't delete this work item.                                |
| `404`  | `not_found`              | No such work item, or it's outside your project or tenant.                           |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | The delete collides with a protected-resource constraint.                            |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="Delete a work item" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X DELETE \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/" \
  -H "X-Api-Key: $PLANE_API_KEY"
```

</template>
<template #python>

```python
import requests

response = requests.delete(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b"
    "/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/",
    headers={"X-Api-Key": "your-api-key"},
)
print(response.status_code)  # 204
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b" +
    "/work-items/8f4c2b1e-0d3a-4f7b-9c21-6e5a8b7d4f13/",
  {
    method: "DELETE",
    headers: { "X-Api-Key": "your-api-key" },
  },
);
console.log(response.status); // 204
```

</template>
</CodePanel>

<ResponsePanel status="204">

```text
No content.
```

</ResponsePanel>

<ResponsePanel status="403">

```json
{
  "type": "forbidden",
  "code": "forbidden",
  "detail": "You do not have permission to delete this work item."
}
```

</ResponsePanel>

</div>
</div>

## Who can delete

Deleting is gated per work item, not just per project. Depending on how the project's roles are configured, the right
to delete may be limited to administrators plus the work item's own creator — so a token that can edit a work item may
still get a `403` when it tries to delete one it didn't create. The response is `403 forbidden` and nothing is written.

## Delete or archive?

|                 | Delete                    | Archive                                                                |
| --------------- | ------------------------- | ---------------------------------------------------------------------- |
| Endpoint        | This page                 | [Archive](/api-reference/v2/work-items/archive-work-item)              |
| Response        | `204`, empty body         | `200` with the work item                                               |
| Reversible      | No                        | Yes, via [unarchive](/api-reference/v2/work-items/unarchive-work-item) |
| Effect on reads | Gone everywhere           | Excluded from the default list and detail reads                        |
| Use it for      | Mistakes, spam, test data | Finished or abandoned work you want to keep                            |
