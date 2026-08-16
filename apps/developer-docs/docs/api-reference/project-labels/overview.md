---
title: Overview
description: Plane Project Labels API overview. Learn how to manage workspace-level project labels with the Plane API.
keywords: plane, plane api, rest api, api integration, project labels, workspace labels
---

# Overview

Project labels define reusable classifications that can be attached to projects across a workspace.

[Learn more about Projects](https://developers.plane.so/api-reference/project/overview)

<div class="api-two-column">
<div class="api-left">

## The Project Label Object

### Attributes

- `id` _string_

  Id.

- `name` _string_

  Name.

- `description` _string_

  Description.

- `color` _string_

  Color.

- `sort_order` _number_

  Sort order.

- `workspace` _string_

  Workspace.

- `created_at` _string_

  Created at.

- `updated_at` _string_

  Updated at.

- `created_by` _string_

  Created by.

- `updated_by` _string_

  Updated by.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE PROJECT LABEL OBJECT">

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Example Name",
  "color": "#f39c12",
  "description": "Example description",
  "sort_order": 65535,
  "workspace": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z",
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "updated_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

</ResponsePanel>

</div>
</div>
