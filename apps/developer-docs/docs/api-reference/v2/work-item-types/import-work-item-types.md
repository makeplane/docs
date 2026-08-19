---
title: Import work item types
description: Import workspace-level work item types into a Plane project with the v2 REST API. Body parameters, mode requirements, OAuth scopes, error codes, and code examples.
keywords: plane api v2, import work item types, workspace types, workspace mode, project types, POST import
---

# Import work item types

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">/api/v2/workspaces/{slug}/projects/{project_id}/work-item-types/import/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Make a set of **workspace-level** work item types available inside one project. Import does not create anything: the types already exist on the workspace, and this call adds them to a project's roster so work items there can use them.

This is the workspace-mode way to answer "which types does this project use". Reach for it when a workspace defines `Bug`, `Task`, and `Incident` centrally and a new project should offer `Bug` and `Task` but not `Incident`. List the candidates with [List workspace work item types](/api-reference/v2/workspace-work-item-types/list-workspace-work-item-types), then send the ids you want.

After a successful import, the imported types show up in [List work item types](/api-reference/v2/work-item-types/list-work-item-types) for the project and each one's [schema](/api-reference/v2/work-item-types/get-work-item-type-schema) resolves against this project's states, labels, and members.

::: warning This is the one write here that requires workspace mode
Every other write in this group requires project mode. Import is the opposite: the types it moves are workspace-owned, so it only makes sense when the workspace manages types at the workspace level.

Calling it while the workspace runs in **project** mode returns `409 work_item_types_managed_at_project` — in that mode a project authors its own types with [Create a work item type](/api-reference/v2/work-item-types/create-work-item-type) and there is nothing to import. See [Work item type modes](/api-reference/v2/work-item-type-modes).
:::

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="slug" type="string" :required="true">

The workspace slug. It appears in your Plane URLs — in `https://app.plane.so/my-team/projects/`, the slug is `my-team`.

</ApiParam>

<ApiParam name="project_id" type="string (uuid)" :required="true">

The project to import the types into.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="work_item_types" type="array of string (uuid)" :required="true">

The ids of the workspace work item types to make available in this project. Send them in one request rather than looping — the import is applied as a batch.

An id that does not resolve to a work item type on this workspace is rejected with `400 invalid_request`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`projects.work_item_types:write`

</div>

<div class="params-section">

### Errors

| Status | Code                     | Cause                                                                                |
| ------ | ------------------------ | ------------------------------------------------------------------------------------ |
| `400`  | `invalid_request`        | `work_item_types` missing, or an entry that isn't a UUID.                            |
| `401`  | `unauthorized`           | Missing or invalid credentials.                                                      |
| `402`  | `payment_required`       | The feature this endpoint belongs to isn't enabled on your plan, or is switched off. |
| `403`  | `forbidden`              | Your role or token scope can't configure this project's work item types.             |
| `404`  | `not_found`              | No such workspace or project, or it's outside your tenant.                           |
| `406`  | `not_acceptable`         | The `Accept` header asks for a representation the API can't produce.                 |
| `409`  | `conflict`               | The workspace manages types per project. Create the type in the project instead.     |
| `413`  | `payload_too_large`      | The request body is over the size limit.                                             |
| `415`  | `unsupported_media_type` | The `Content-Type` isn't one this endpoint accepts.                                  |
| `429`  | `rate_limited`           | Throttled. Honor the `Retry-After` header before retrying.                           |

</div>

</div>

<div class="api-right">

<CodePanel title="Import work item types" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/import/" \
  -H "X-Api-Key: $PLANE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
  "work_item_types": [
    "9c2f8e51-4a63-47d8-b1e0-5f7a2c40d693",
    "d1e7a4c9-2b58-4f36-9a0e-7c3b5d81f240"
  ]
}'
```

</template>
<template #python>

```python
import requests

response = requests.post(
    "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/import/",
    headers={"X-Api-Key": "your-api-key"},
    json={
        "work_item_types": [
            "9c2f8e51-4a63-47d8-b1e0-5f7a2c40d693",
            "d1e7a4c9-2b58-4f36-9a0e-7c3b5d81f240",
        ]
    },
)
print(response.status_code)  # 200
```

</template>
<template #javascript>

```javascript
const response = await fetch(
  "https://api.plane.so/api/v2/workspaces/my-team/projects/4af68566-94a4-4eb3-94aa-50dc9427067b/work-item-types/import/",
  {
    method: "POST",
    headers: {
      "X-Api-Key": "your-api-key",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      work_item_types: [
        "9c2f8e51-4a63-47d8-b1e0-5f7a2c40d693",
        "d1e7a4c9-2b58-4f36-9a0e-7c3b5d81f240",
      ],
    }),
  },
);
console.log(response.status); // 200
```

</template>
</CodePanel>

<ResponsePanel status="200">

```text
(empty body)
```

</ResponsePanel>

<ResponsePanel status="409">

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

::: info The response tells you nothing — read the list instead
A successful import returns `200` with an empty body, not the types it imported. To confirm the result, follow it with [List work item types](/api-reference/v2/work-item-types/list-work-item-types) for the project.
:::

::: tip Re-importing is safe
Sending an id the project already has is not an error and does not duplicate anything. That makes the call safe to run on every provisioning pass: send the full desired set each time rather than diffing first.
:::

## When to import versus create

| Situation                                                           | Use                                                                                                                       |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| The workspace owns types and this project should offer some of them | Import                                                                                                                    |
| The project owns its own types                                      | [Create a work item type](/api-reference/v2/work-item-types/create-work-item-type)                                        |
| You need a new type that does not exist at the workspace level yet  | [Create it on the workspace](/api-reference/v2/workspace-work-item-types/create-workspace-work-item-type), then import it |
