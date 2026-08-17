---
title: Handling webhooks
description: Receive and verify webhooks from Plane in your application. Learn about webhook headers, signature verification, event types, and payload handling.
keywords: plane webhooks, webhook verification, plane event notifications, webhook signature, plane webhook handler, real-time events, plane webhook payload
---

# Handling webhooks

When events occur in Plane, webhooks are sent to your Webhook URL.

## Webhook headers

| Header              | Description                                 |
| ------------------- | ------------------------------------------- |
| `X-Plane-Delivery`  | Unique delivery ID                          |
| `X-Plane-Event`     | Event type (e.g., `issue`, `issue_comment`) |
| `X-Plane-Signature` | HMAC-SHA256 signature for verification      |

## Verify signature

Always verify the `X-Plane-Signature` header:

:::tabs key:language
== Python {#python}

```python
import hmac
import hashlib

def verify_signature(payload: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(secret.encode(), payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)
```

== TypeScript {#typescript}

```typescript
import crypto from "crypto";

function verifySignature(payload: string, signature: string, secret: string): boolean {
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
```

:::

## Webhook payload

```json
{
  "event": "issue",
  "action": "created",
  "webhook_id": "webhook-uuid",
  "workspace_id": "workspace-uuid",
  "data": { ... },
  "activity": {
    "actor": { "id": "user-uuid", "display_name": "John Doe" }
  }
}
```

See [Webhook Events](/dev-tools/intro-webhooks) for all event types.
