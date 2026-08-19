---
title: Overview
description: Plane Customer API overview. Learn about endpoints, request/response format, and how to work with customer via REST API.
keywords: plane, plane api, rest api, api integration, customers, crm, customer management
---

# Overview

Customers allow you to manage customer relationships and track customer-related work items, requests, and custom properties within a workspace.

[Learn more about Customers](https://docs.plane.so/customers)

<div class="api-two-column">
<div class="api-left">

## The Customer Object

### Attributes

- `id` _uuid_

  Unique identifier for the customer

- `name` _string_ **(required)**

  Name of the customer

- `email` _string_

  Email address of the customer

- `workspace` _uuid_

  Workspace UUID which is automatically saved

- `created_at` _timestamp_

  The timestamp when the customer was created

- `updated_at` _timestamp_

  The timestamp when the customer was last updated

- `created_by` _uuid_

  ID of the user who created the customer

- `updated_by` _uuid_

  ID of the user who last updated the customer

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE CUSTOMER OBJECT">

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "created_at": "2023-11-19T11:56:55.176802Z",
  "updated_at": "2023-11-19T11:56:55.176809Z",
  "name": "Acme Corporation",
  "email": "contact@acme.com",
  "workspace": "cd4ab5a2-1a5f-4516-a6c6-8da1a9fa5be4"
}
```

</ResponsePanel>

</div>
</div>
