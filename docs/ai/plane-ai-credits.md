---
title: How Plane AI credits work
description: Understand seat-based AI credits, what happens when included credits run out, and how workspace overage keeps your team moving.
---

# Plane AI credits

Plane AI credits measure AI usage in Plane Cloud.

::: warning IMPORTANT
AI credits apply only to Plane Cloud.

On self-hosted instances, you use your own AI provider [API key](https://developers.plane.so/self-hosting/govern/instance-admin#artificial-intelligence), and all AI usage and costs are managed directly through your provider.
:::

## How credits are assigned

Credits are included **per paid seat**.

- Each active seat gets a monthly included credit amount based on your plan.
- Included credits are account-level entitlements tied to seats.
- This model is designed to be simple and predictable, similar to how modern AI products commonly package usage.

For current included amounts by plan, check the latest pricing details on [Plane pricing](https://plane.so/pricing#ai-&-credits).

## No default pooling

Plane AI credits are **not pooled by default**.

That means one member's unused included credits are not automatically shared across the rest of the workspace.

## What happens when included credits run out

If a member (or your workspace's included capacity) runs out of available credits for the billing period, AI usage can stop unless overage is enabled.

Workspace admins can enable a workspace-level overage setting so teams can continue using AI after included credits are exhausted.

## Workspace overage

When workspace overage is enabled:

- AI usage continues after included credits are consumed.
- Additional usage is billed at the workspace level.
- Admins stay in control of whether overage is allowed.

If overage is disabled, new AI actions are paused after included credits are exhausted until credits reset or additional capacity is purchased/enabled.

## Tracking and controls

Plane provides usage visibility so admins can manage cost and adoption:

- Current credit balance and consumption trends
- Workspace-level usage monitoring
- Billing visibility for additional usage when overage is enabled

## FAQs

::: details Are credits shared automatically across all users in my workspace?
No. Plane does not use automatic credit pooling by default.
:::

::: details Do I get credits for each seat?
Yes. Included credits are assigned per paid seat based on your plan.
:::

::: details Can we keep using AI after included credits are used up?
Yes, if a workspace admin enables overage at the workspace level.
:::

::: details Where can I see the latest included credit amounts?
Visit [Plane pricing](https://plane.so/pricing#ai-&-credits) for the most up-to-date plan details.
:::
