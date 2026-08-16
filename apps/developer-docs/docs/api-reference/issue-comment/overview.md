---
title: Overview
description: Plane Issue-Comment API overview. Learn about endpoints, request/response format, and how to work with issue-comment via REST API.
keywords: plane, plane api, rest api, api integration, work items, issues, tasks, comments, discussion, collaboration
---

# Overview

Comments allow team members to discuss and collaborate on work items by adding text, mentions, and attachments.

[Learn more about Work Item Comments](https://docs.plane.so/core-concepts/issues/overview#comment-on-work-items)

<div class="api-two-column">
<div class="api-left">

## The Comments Object

### Attributes

- `id` _uuid_

  Unique identifier for the comment

- `created_at` _timestamp_

  The timestamp when the comment was created

- `updated_at` _timestamp_

  The timestamp when the comment was last updated

- `deleted_at` _timestamp_ or _null_

  The timestamp when the comment was deleted (if deleted)

- `edited_at` _timestamp_ or _null_

  The timestamp when the comment was last edited

- `comment_html` _string_

  HTML string version of the comment

- `comment_stripped` _string_

  Stripped string version of the comment

- `comment_json` _object_

  JSON object version of the comment

- `attachments` _string[]_

  Array of attachment URLs

- `access` _string_

  If the comment should be visible externally also if the project is published or not. Takes in two values
  - INTERNAL
  - EXTERNAL

- `external_source` _string_

  External source identifier

- `external_id` _string_

  External ID from the external source

- `is_member` _boolean_

  Whether the current user is a member of the project

- `created_by` , `updated_by` _uuid_

  These values are auto saved and represent the id of the user that created or updated the comment

- `project` uuid

  It contains project uuid which is automatically saved.

- `workspace` uuid

  It contains workspace uuid which is automatically saved

- `issue` _uuid_

  The work item the comment is attached to

- `actor` _uuid_

  UUID of the user who commented.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE COMMENTS OBJECT">

```json
{
  "id": "f3e29f26-708d-40f0-9209-7e0de44abc49",
  "created_at": "2023-11-20T09:26:10.383129Z",
  "updated_at": "2023-11-20T09:26:10.383140Z",
  "comment_stripped": "Initialf ThoughtsaMy initial thoughts on this are very  good",
  "comment_json": {},
  "comment_html": "<h1>Initialf Thoughts</h1>a<p>My initial thoughts on this are very  good</p>",
  "attachments": [],
  "access": "INTERNAL",
  "created_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "updated_by": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "project": "4af68566-94a4-4eb3-94aa-50dc9427067b",
  "workspace": "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4",
  "issue": "e1c25c66-5bb8-465e-a818-92a483423443",
  "actor": "16c61a3a-512a-48ac-b0be-b6b46fe6f430"
}
```

</ResponsePanel>

</div>
</div>
