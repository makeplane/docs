---
title: Webhook logs overview
description: The Plane API v2 webhook log object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, webhook logs, webhook log object
---

# Webhook logs overview

Webhook logs are the delivery history for one webhook.

<div class="api-two-column">
<div class="api-left">

## The webhook log object

### Attributes

- `created_at` _string (date-time)_

  When the record was created.

- `duration_ms` _integer_

  The duration ms.

- `error_message` _string_

  The error message.

- `event_type` _string_

  The event type.

- `id` _string (uuid)_

  Unique identifier.

- `request_body` _string_

  The request body.

- `request_headers` _string_

  The request headers.

- `request_method` _string_

  The request method.

- `response_body` _string_

  The response body.

- `response_headers` _string_

  The response headers.

- `response_status` _string_

  The response status.

- `retry_count` _integer_

  How many retrys are attached.

- `status_text` _string_

  The status text.

- `webhook_id` _string (uuid)_

  The related webhook.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE WEBHOOK LOG OBJECT">

```json
{
  "created_at": "2026-01-14T09:22:41.478363Z",
  "duration_ms": 1,
  "error_message": "example",
  "event_type": "example",
  "id": "b7e42a19-3c5d-4f80-9a26-8d1c0f4e7b53",
  "request_body": "example",
  "request_headers": "example",
  "request_method": "example",
  "response_body": "example",
  "response_headers": "example",
  "response_status": "example",
  "retry_count": 3,
  "status_text": "example",
  "webhook_id": "f960d3c2-8524-4a41-b8eb-055ce4be2a7f"
}
```

</ResponsePanel>

</div>
</div>

## Endpoints

| Method | Path                                                        | Description       |
| ------ | ----------------------------------------------------------- | ----------------- |
| `GET`  | `/api/v2/workspaces/{slug}/webhook-logs/{webhook_id}/`      | List webhook logs |
| `GET`  | `/api/v2/workspaces/{slug}/webhook-logs/{webhook_id}/{pk}/` | Get a webhook log |

## Response shaping

Every webhook log read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
