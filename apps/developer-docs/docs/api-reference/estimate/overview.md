---
title: Overview
description: Plane Estimate API overview. Learn about estimate objects, estimate points, and how to work with estimates via REST API.
keywords: plane, plane api, rest api, api integration, estimates, estimate points
---

# Overview

Estimates define how work is sized in a project. An estimate represents the scale (categories, points, or time), and
estimate points represent the allowed values on work items.

<div class="api-two-column">
<div class="api-left">

## The Estimate Object

### Attributes

- `name` _string_ **(required)**

  Name of the estimate

- `description` _string_

  Description of the estimate

- `type` _string_

  Type of estimate. Possible values: `categories`, `points`, `time`

- `last_used` _boolean_

  Whether this estimate is the most recently used estimate for the project

- `external_id` _string_ or _null_

  External ID from an external system

- `external_source` _string_ or _null_

  External source identifier

- `created_at`, `updated_at` _timestamp_

  Timestamps when the estimate was created and last updated

- `created_by`, `updated_by` _uuid_

  IDs of the users who created and last updated the estimate

- `project` _uuid_

  Project ID associated with the estimate

- `workspace` _uuid_

  Workspace ID associated with the estimate

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE ESTIMATE OBJECT">

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T12:10:00Z",
  "name": "Story Points",
  "description": "Standard story point scale",
  "type": "points",
  "last_used": true,
  "external_id": "sp-001",
  "external_source": "jira",
  "created_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "updated_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "project": "4af68566-94a4-4eb3-94aa-50dc9427067b",
  "workspace": "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4"
}
```

</ResponsePanel>

</div>
</div>

<div class="api-two-column">
<div class="api-left">

## The Estimate Point Object

### Attributes

- `estimate` _uuid_ **(required)**

  Estimate ID this point belongs to

- `key` _integer_

  Numeric key used for ordering and display

- `value` _string_ **(required)**

  Display value for the estimate point (max 20 characters)

- `description` _string_

  Description of the estimate point

- `external_id` _string_ or _null_

  External ID from an external system

- `external_source` _string_ or _null_

  External source identifier

- `created_at`, `updated_at` _timestamp_

  Timestamps when the estimate point was created and last updated

- `created_by`, `updated_by` _uuid_

  IDs of the users who created and last updated the estimate point

- `project` _uuid_

  Project ID associated with the estimate point

- `workspace` _uuid_

  Workspace ID associated with the estimate point

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE ESTIMATE POINT OBJECT">

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440010",
  "created_at": "2024-01-15T10:40:00Z",
  "updated_at": "2024-01-20T12:15:00Z",
  "estimate": "550e8400-e29b-41d4-a716-446655440000",
  "key": 3,
  "value": "3",
  "description": "Small",
  "external_id": "sp-3",
  "external_source": "jira",
  "created_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "updated_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "project": "4af68566-94a4-4eb3-94aa-50dc9427067b",
  "workspace": "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4"
}
```

</ResponsePanel>

</div>
</div>
