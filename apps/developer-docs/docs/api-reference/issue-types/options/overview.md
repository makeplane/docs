---
title: Overview
description: Plane Options API overview. Learn about endpoints, request/response format, and how to work with options via REST API.
keywords: plane, plane api, rest api, api integration, work items, issues, tasks
---

# Overview

Custom property options define the available choices for dropdown-style custom properties on work items.

<div class="api-two-column">
<div class="api-left">

## The Options Object

### Attributes

- `workspace` _uuid_

  The workspace which the issue is part of auto generated from backend

- `project` _uuid_

  The project which the issue is part of auto generated from backend

- `created_at` , `updated_at` timestamp

  Timestamp of the issue when it was created and when it was last updated.

- `created_by` & `updated_by`

  This values are auto saved and represent the id of the user that created or the updated the project.

- `external_id` & `external_source`

  This values are auto saved and represent the id of the user that created or the updated the project.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE OPTIONS OBJECT">

```json
{
  "id": "51a869d1-f612-4315-ac91-ffef3e96c20e",
  "created_at": "2024-10-23T07:44:42.883820Z",
  "updated_at": "2024-10-23T07:44:42.883855Z",
  "deleted_at": null,
  "name": "issue property option 3",
  "sort_order": 10000.0,
  "description": "issue property option 3 description",
  "logo_props": {},
  "is_active": true,
  "is_default": false,
  "external_source": null,
  "external_id": null,
  "created_by": "9d6d1ecd-bf73-4169-80c8-7dee79b217f4",
  "updated_by": "9d6d1ecd-bf73-4169-80c8-7dee79b217f4",
  "workspace": "70b6599f-9313-4c0d-b5c0-406a13a05647",
  "project": "03a9bf56-84f4-4afe-b232-9400eb9b7b6b",
  "property": "f962febb-98bc-43ca-8bfb-8012e4d54dae",
  "parent": null
}
```

</ResponsePanel>

</div>
</div>
