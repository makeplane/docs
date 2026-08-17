---
title: Overview
description: Plane Milestones API overview. Learn how to manage milestones and milestone work items through the Plane API.
keywords: plane, plane api, rest api, api integration, milestones, project planning
---

# Overview

Milestones help teams group work items around important dates, releases, and delivery checkpoints inside a project.

[Learn more about Projects](https://docs.plane.so/core-concepts/projects/overview)

<div class="api-two-column">
<div class="api-left">

## The Milestone Object

### Attributes

- `id` _string_

  Id.

- `title` _string_

  Title.

- `target_date` _string_

  Target date.

- `external_id` _string_

  External id.

- `external_source` _string_

  External source.

- `created_at` _string_

  Created at.

- `updated_at` _string_

  Updated at.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE MILESTONE OBJECT">

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Example Name",
  "target_date": "2024-01-01",
  "external_id": "550e8400-e29b-41d4-a716-446655440000",
  "external_source": "github",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

</ResponsePanel>

</div>
</div>
