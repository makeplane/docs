---
title: Overview
description: Plane Types API overview. Learn about endpoints, request/response format, and how to work with types via REST API.
keywords: plane, plane api, rest api, api integration, work items, issues, tasks
---

# Overview

Work item types categorize different kinds of work in your project (e.g., "Task", "Bug", "Feature").

[Learn more about Work Item Types](https://docs.plane.so/core-concepts/issues/work-item-types)

<div class="api-two-column">
<div class="api-left">

## The Work Item Type object

### Attributes

- `id` _uuid_

  Unique identifier for the work item type

- `name` _string_

  Name of the work item type

- `description` _string_

  Description of the work item type

- `logo_props` _object_

  Logo properties for the work item type

- `is_epic` _boolean_

  Whether this work item type is an epic

- `is_default` _boolean_

  Whether this is the default work item type

- `is_active` _boolean_

  Whether this work item type is active

- `level` _number_

  Level of the work item type

- `workspace` _uuid_

  The workspace which the work item type is part of (auto generated from backend)

- `project` _uuid_

  The project which the work item type is part of (auto generated from backend)

- `created_at` _timestamp_

  Timestamp when the work item type was created

- `updated_at` _timestamp_

  Timestamp when the work item type was last updated

- `created_by` _uuid_

  ID of the user who created the work item type (auto saved)

- `updated_by` _uuid_

  ID of the user who last updated the work item type (auto saved)

- `deleted_at` _timestamp_

  Timestamp when the work item type was deleted (null if not deleted)

- `external_id` _string_

  External ID for the work item type (auto saved)

- `external_source` _string_

  External source for the work item type (auto saved)

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE WORK ITEM TYPE OBJECT">

```json
{
  "id": "d6af3c13-3459-43ab-b91c-c33ef2fd7131",
  "name": "Postman work item type",
  "description": "Postman work item type description",
  "logo_props": {},
  "is_epic": false,
  "is_default": false,
  "is_active": true,
  "level": 0,
  "workspace": "70b6599f-9313-4c0d-b5c0-406a13a05647",
  "project": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "created_at": "2024-10-23T06:54:46.169344Z",
  "updated_at": "2024-10-23T06:54:46.169390Z",
  "created_by": "9d6d1ecd-bf73-4169-80c8-7dee79b217f4",
  "updated_by": "9d6d1ecd-bf73-4169-80c8-7dee79b217f4",
  "deleted_at": null,
  "external_id": null,
  "external_source": null
}
```

</ResponsePanel>

</div>
</div>
