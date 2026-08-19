---
title: Customers overview
description: The Plane API v2 customer object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, customers, customer object
---

# Customers overview

Customers are the workspace CRM records you attach requests and work items to.

<div class="api-two-column">
<div class="api-left">

## The customer object

### Attributes

- `archived_at` _string (date-time)_

  When the record was archived, or `null` if it is active.

- `contract_status` _string_

  Current contract state, in your own vocabulary.

- `created_at` _string (date-time)_

  When the record was created.

- `created_by_id` _string (uuid)_

  The user who created the record.

- `customer_request_count` _integer_

  How many customer requests are attached.

- `description` _string_

  Free-form description.

- `description_html` _string_

  Rich-text body as HTML. This is the field the Plane editor round-trips.

- `domain` _string_

  The customer's primary domain, for example `example.com`.

- `email` _string (email)_

  Email address.

- `employees` _integer_

  Headcount, for segmentation.

- `external_id` _string_

  Your system's identifier for this record, for sync and import correlation.

- `external_source` _string_

  The system `external_id` came from, for example `github` or `jira`.

- `id` _string (uuid)_

  Unique identifier.

- `logo_asset_id` _string (uuid)_

  The related logo asset.

- `logo_props` _string_

  Editor-owned logo descriptor. Pass back what you read rather than composing it by hand.

- `logo_url` _string_

  URL of the logo image.

- `name` _string_

  Display name.

- `revenue` _string_

  Annual revenue, for segmentation.

- `stage` _string_

  Where the customer sits in your funnel.

- `website_url` _string (uri)_

  Public website URL.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE CUSTOMER OBJECT">

```json
{
  "archived_at": null,
  "contract_status": "active",
  "created_at": "2026-01-14T09:22:41.478363Z",
  "created_by_id": "16c61a3a-512a-48ac-b0be-b6b46fe6f430",
  "customer_request_count": 3,
  "description": "What this is for.",
  "description_html": "<p>Details go here.</p>",
  "domain": "example.com",
  "email": "ana@example.com",
  "employees": 250,
  "external_id": null,
  "external_source": null,
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "logo_asset_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f",
  "logo_props": null,
  "logo_url": "https://example.com/logo.png",
  "name": "Example name",
  "revenue": "4.2M",
  "stage": "customer",
  "website_url": "https://example.com"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method   | Path                                                   | Description                        |
| -------- | ------------------------------------------------------ | ---------------------------------- |
| `GET`    | `/api/v2/workspaces/{slug}/customers/`                 | List customers                     |
| `GET`    | `/api/v2/workspaces/{slug}/customers/{pk}/`            | Get a customer                     |
| `POST`   | `/api/v2/workspaces/{slug}/customers/`                 | Create a customer                  |
| `PATCH`  | `/api/v2/workspaces/{slug}/customers/{pk}/`            | Update a customer                  |
| `DELETE` | `/api/v2/workspaces/{slug}/customers/{pk}/`            | Delete a customer                  |
| `POST`   | `/api/v2/workspaces/{slug}/customers/upsert/`          | Upsert a customer                  |
| `POST`   | `/api/v2/workspaces/{slug}/customers/{pk}/work-items/` | Link or unlink customer work items |

## Response shaping

Every customer read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
