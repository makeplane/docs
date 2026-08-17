---
title: Overview
description: Plane Work Item Relations API overview. Learn how to list, create, and remove work item relationships using the Plane API.
keywords: plane, plane api, rest api, api integration, work item relations, dependencies, blocking relationships
---

# Overview

Work item relations let you model dependencies and planning constraints between work items, including blocking, duplicate, relates-to, and scheduling relationships.

[Learn more about Work Items](https://docs.plane.so/core-concepts/issues)

<div class="api-two-column">
<div class="api-left">

## The Work Item Relations Response

### Attributes

- `blocking` _array_

  List of issue IDs that are blocking this issue

- `blocked_by` _array_

  List of issue IDs that this issue is blocked by

- `duplicate` _array_

  List of issue IDs that are duplicates of this issue

- `relates_to` _array_

  List of issue IDs that relate to this issue

- `start_after` _array_

  List of issue IDs that start after this issue

- `start_before` _array_

  List of issue IDs that start before this issue

- `finish_after` _array_

  List of issue IDs that finish after this issue

- `finish_before` _array_

  List of issue IDs that finish before this issue

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE WORK ITEM RELATIONS RESPONSE">

```json
{
  "blocking": ["550e8400-e29b-41d4-a716-446655440000", "550e8400-e29b-41d4-a716-446655440000"],
  "blocked_by": ["550e8400-e29b-41d4-a716-446655440000"],
  "duplicate": [],
  "relates_to": ["550e8400-e29b-41d4-a716-446655440000"],
  "start_after": [],
  "start_before": ["550e8400-e29b-41d4-a716-446655440000"],
  "finish_after": [],
  "finish_before": []
}
```

</ResponsePanel>

</div>
</div>
