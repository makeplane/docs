---
title: Update an initiative
description: Update an initiative via Plane API. HTTP request format, parameters, scopes, and example responses for update an initiative.
keywords: plane, plane api, rest api, api integration, initiative, update an initiative
---

# Update an initiative

<div class="api-endpoint-badge">
  <span class="method patch">PATCH</span>
  <span class="path">/api/v1/workspaces/{workspace_slug}/initiatives/{initiative_id}/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Update an initiative by its ID

<div class="params-section">

### Path Parameters

<div class="params-list">

<ApiParam name="initiative_id" type="string" :required="true">

The unique identifier of the initiative.

</ApiParam>

<ApiParam name="initiative_id" type="string" :required="true">

The unique identifier of the initiative.

</ApiParam>

<ApiParam name="workspace_slug" type="string" :required="true">

The workspace_slug represents the unique workspace identifier for a workspace in Plane. It can be found in the URL. For example, in the URL `https://app.plane.so/my-team/projects/`, the workspace slug is `my-team`.

</ApiParam>

</div>
</div>

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="name" type="string" :required="false">

Name.

</ApiParam>

<ApiParam name="description" type="string" :required="false">

Description.

</ApiParam>

<ApiParam name="description_html" type="string" :required="false">

Description html.

</ApiParam>

<ApiParam name="description_stripped" type="string" :required="false">

Description stripped.

</ApiParam>

<ApiParam name="start_date" type="string" :required="false">

Start date.

</ApiParam>

<ApiParam name="end_date" type="string" :required="false">

End date.

</ApiParam>

<ApiParam name="logo_props" type="object" :required="false">

Logo props.

</ApiParam>

<ApiParam name="state" type="string" :required="false">

- `DRAFT` - Draft
- `PLANNED` - Planned
- `ACTIVE` - Active
- `COMPLETED` - Completed
- `CLOSED` - Closed

</ApiParam>

<ApiParam name="archived_at" type="string" :required="false">

Archived at.

</ApiParam>

<ApiParam name="created_by" type="string" :required="false">

Created by.

</ApiParam>

<ApiParam name="updated_by" type="string" :required="false">

Updated by.

</ApiParam>

<ApiParam name="lead" type="string" :required="false">

Lead.

</ApiParam>

</div>
</div>

<div class="params-section">

### Scopes

`initiatives:write`

</div>

</div>

<div class="api-right">

<CodePanel title="Update an initiative" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X PATCH \
  "https://api.plane.so/api/v1/workspaces/my-workspace/initiatives/initiative-uuid/" \
  -H "X-API-Key: $PLANE_API_KEY" \
  # Or use -H "Authorization: Bearer $PLANE_OAUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
  "name": "Example Name",
  "description": "Example description",
  "description_html": "<p>Example content</p>",
  "description_stripped": "Example description",
  "start_date": "2024-01-01T00:00:00Z",
  "end_date": "2024-01-01T00:00:00Z",
  "logo_props": "example-value",
  "state": "DRAFT",
  "archived_at": "2024-01-01T00:00:00Z",
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "updated_by": "550e8400-e29b-41d4-a716-446655440000",
  "lead": "550e8400-e29b-41d4-a716-446655440000"
}'
```

</template>
<template #python>

```python
import requests

response = requests.patch(
    "https://api.plane.so/api/v1/workspaces/my-workspace/initiatives/initiative-uuid/",
    headers={"X-API-Key": "your-api-key"},
    json={
      "name": "Example Name",
      "description": "Example description",
      "description_html": "<p>Example content</p>",
      "description_stripped": "Example description",
      "start_date": "2024-01-01T00:00:00Z",
      "end_date": "2024-01-01T00:00:00Z",
      "logo_props": "example-value",
      "state": "DRAFT",
      "archived_at": "2024-01-01T00:00:00Z",
      "created_by": "550e8400-e29b-41d4-a716-446655440000",
      "updated_by": "550e8400-e29b-41d4-a716-446655440000",
      "lead": "550e8400-e29b-41d4-a716-446655440000"
    }
)
print(response.json())
```

</template>
<template #javascript>

```javascript
const response = await fetch("https://api.plane.so/api/v1/workspaces/my-workspace/initiatives/initiative-uuid/", {
  method: "PATCH",
  headers: {
    "X-API-Key": "your-api-key",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Example Name",
    description: "Example description",
    description_html: "<p>Example content</p>",
    description_stripped: "Example description",
    start_date: "2024-01-01T00:00:00Z",
    end_date: "2024-01-01T00:00:00Z",
    logo_props: "example-value",
    state: "DRAFT",
    archived_at: "2024-01-01T00:00:00Z",
    created_by: "550e8400-e29b-41d4-a716-446655440000",
    updated_by: "550e8400-e29b-41d4-a716-446655440000",
    lead: "550e8400-e29b-41d4-a716-446655440000",
  }),
});
const data = await response.json();
```

</template>
</CodePanel>

<ResponsePanel status="200">

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Example Name",
  "description": "Example description"
}
```

</ResponsePanel>

</div>

</div>
