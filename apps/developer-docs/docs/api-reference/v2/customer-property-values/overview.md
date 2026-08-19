---
title: Customer property values overview
description: The Plane API v2 customer property value object. Attributes, endpoints, OAuth scopes and behavior.
keywords: plane api v2, customer property values, customer property value object
---

# Customer property values overview

Customer property values hold a customer's answers to the workspace property catalog.

## Endpoints

| Method | Path                                                                 | Description                   |
| ------ | -------------------------------------------------------------------- | ----------------------------- |
| `GET`  | `/api/v2/workspaces/{slug}/customers/{customer_id}/property-values/` | List customer property values |
| `POST` | `/api/v2/workspaces/{slug}/customers/{customer_id}/property-values/` | Set customer property values  |

## Response shaping

Every customer property value read accepts `?fields=` for sparse responses — see [Sparse fields](/api-reference/v2/sparse-fields). Errors follow the shared [problem+json contract](/api-reference/v2/errors).
