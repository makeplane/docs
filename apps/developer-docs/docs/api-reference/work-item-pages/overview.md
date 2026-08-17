---
title: Overview
description: Plane Work Item Pages API overview. Learn how to link pages to work items using the Plane API.
keywords: plane, plane api, rest api, api integration, work item pages, wiki pages
---

# Overview

Work item pages create links between work items and wiki pages so related documentation stays close to execution.

[Learn more about Work Items](https://docs.plane.so/core-concepts/issues)

<div class="api-two-column">
<div class="api-left">

## The Work Item Page Link Object

### Attributes

- `id` _string_

  Id.

- `page` _object_

  Lightweight page serializer for work item page links.

Provides essential page information including identifiers,
name, timestamps, and visual properties for work item page associations.

- `issue` _string_

  Issue.

- `project` _string_

  Project.

- `workspace` _string_

  Workspace.

- `created_at` _string_

  Created at.

- `updated_at` _string_

  Updated at.

- `created_by` _string_

  Created by.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE WORK ITEM PAGE LINK OBJECT">

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "page": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Example Name",
    "description_html": "<p>Example content</p>",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z",
    "created_by": "550e8400-e29b-41d4-a716-446655440000",
    "is_global": false,
    "logo_props": {}
  },
  "issue": "550e8400-e29b-41d4-a716-446655440000",
  "project": "550e8400-e29b-41d4-a716-446655440000",
  "workspace": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z",
  "created_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

</ResponsePanel>

</div>
</div>
