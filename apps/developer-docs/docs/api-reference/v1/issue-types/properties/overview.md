---
title: Overview
description: Plane Properties API overview. Learn about endpoints, request/response format, and how to work with properties via REST API.
keywords: plane, plane api, rest api, api integration, work items, issues, tasks
---

# Overview

Custom properties allow you to extend work items with additional fields specific to your workflow and processes.

[Learn more about Custom properties](https://docs.plane.so/core-concepts/issues/work-item-types#add-custom-properties)

<div class="api-two-column">
<div class="api-left">

## The Properties Object

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

<ResponsePanel status="200" title="THE PROPERTIES OBJECT">

```json
{
  "id": "f962febb-98bc-43ca-8bfb-8012e4d54dae",
  "created_at": "2024-10-23T07:38:58.231897Z",
  "updated_at": "2024-10-23T07:38:58.231920Z",
  "deleted_at": null,
  "name": "first-issue-property",
  "display_name": "first issue property",
  "description": "first issue property",
  "logo_props": {},
  "sort_order": 75535.0,
  "property_type": "OPTION",
  "relation_type": null,
  "is_required": false,
  "default_value": [],
  "settings": {},
  "is_active": false,
  "is_multi": false,
  "validation_rules": {},
  "external_source": null,
  "external_id": null,
  "created_by": "9d6d1ecd-bf73-4169-80c8-7dee79b217f4",
  "updated_by": "9d6d1ecd-bf73-4169-80c8-7dee79b217f4",
  "workspace": "70b6599f-9313-4c0d-b5c0-406a13a05647",
  "project": "03a9bf56-84f4-4afe-b232-9400eb9b7b6b",
  "issue_type": "1800681a-a749-487b-9003-3279031fea35"
}
```

</ResponsePanel>

</div>
</div>
