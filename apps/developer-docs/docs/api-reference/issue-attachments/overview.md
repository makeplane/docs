---
title: Overview
description: Plane Issue-Attachments API overview. Learn about endpoints, request/response format, and how to work with issue-attachments via REST API.
keywords: plane, plane api, rest api, api integration, work items, issues, tasks, attachments, files, uploads
---

# Overview

Allows you to manage file attachments associated with work items and Intake work items. You can upload new attachments and retrieve existing attachments for a specific work item.

[Learn more about Attachments](https://docs.plane.so/core-concepts/issues/overview#add-links-and-attachments)

## Upload process

1. Get the [upload credentials](/api-reference/issue-attachments/get-upload-credentials).
2. [Upload the file](/api-reference/issue-attachments/upload-file) to storage.
3. [Complete attachment upload](/api-reference/issue-attachments/complete-upload) to notify server.

<div class="api-two-column">
<div class="api-left">

## The Attachment Object

### Attributes

- `id` _string_

  Unique identifier for the attachment

- `created_at` , `updated_at`, `deleted_at` _timestamp_

  Timestamp when the attachment was created, when it was last modified or deleted

- `attributes` _object_

  Contains file metadata:
  - `name` _string_

  Original filename of the attachment
  - `size` _integer_

  File size in bytes
  - `type` _string_

  MIME type of the file

- `asset` _string_

  Storage path/identifier for the attachment file

- `entity_type` _string_

  Always `ISSUE_ATTACHMENT` for work item attachments

- `entity_identifier` _string_

  Entity identifier for the attachment

- `is_deleted` _boolean_

  Whether the attachment has been deleted

- `is_archived` _boolean_

  Whether the attachment has been archived

- `external_id` _string_ or _null_

  External identifier if the issue and its attachments are imported to Plane

- `external_source` _string_ or _null_

  Name of the source if the issue and its attachments are imported to Plane

- `size` _integer_

  File size in bytes

- `is_uploaded` _boolean_

  Whether the file has been successfully uploaded

- `storage_metadata` _object_

  Cloud storage metadata:
  - `ETag` _string_

  Storage provider's entity tag
  - `Metadata` _object_

  Additional storage metadata
  - `ContentType` _object_

  MIME type of stored file
  - `LastModified` _timestamp_

  Last modification time in storage
  - `ContentLength` _integer_

  File size in bytes

- `created_by` _string_

  ID of user who created the attachment

- `updated_by` _string_

  ID of user who last modified the attachment

- `deleted_by` _string_

  ID of user who deleted the attachment

- `workspace` _string_

  ID of workspace containing the attachment

- `project` _string_

  ID of project containing the work item

- `issue` _string_

  ID of work item containing the attachment

- `user` _string_

  ID of user associated with the attachment

- `draft_issue` _string_

  ID of draft work item if applicable

- `comment` _string_

  ID of comment if attachment is associated with a comment

- `page` _string_

  ID of page if attachment is associated with a page

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE ATTACHMENT OBJECT">

```json
{
  "id": "8caf3ed5-4f57-9674-76c4fce146b2",
  "created_at": "2024-10-30T09:32:32.815273Z",
  "updated_at": "2024-10-30T09:32:35.533136Z",
  "deleted_at": null,
  "attributes": {
    "name": "plane-logo.png",
    "size": 135686,
    "type": "image/png"
  },
  "asset": "9b8aab8a-9052-fc735350abe8/6893d862ecb740d4b7f9f6542cda539c-plane.png",
  "entity_type": "ISSUE_ATTACHMENT",
  "is_deleted": false,
  "is_archived": false,
  "external_id": null,
  "external_source": null,
  "size": 135686.0,
  "is_uploaded": true,
  "storage_metadata": {
    "ETag": "\"72d0d4be99999fe60c2fbc08c8b\"",
    "Metadata": {},
    "ContentType": "image/png",
    "LastModified": "2024-10-30T09:32:34+00:00",
    "ContentLength": 135686
  },
  "created_by": "575de6bf-e120-43bb-9f6a-eae276210575",
  "updated_by": "575de6bf-e120-43bb-9f6a-eae276210575",
  "workspace": "9b8aab8a-9s6a-99ac-fc735350abe8",
  "project": "1790bd-5262-42fb-ac55-568c19a5",
  "issue": "7ba090-7702-4e26-a61e-aa6b866f7"
}
```

</ResponsePanel>

</div>
</div>
