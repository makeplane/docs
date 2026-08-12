---
title: How Plane AI credits work
description: Understand how Plane AI credits work on Plane Cloud: per-seat monthly allowances, what happens when they run out, workspace overage, and how to monitor usage.
---

# Plane AI credits

Plane AI credits measure how much Plane AI (Pi) your workspace uses on Plane Cloud. Your plan includes a monthly allowance, and AI features draw from it as your team uses them.

To see how much of your allowance you have used, open the [AI usage](/ai/ai-usage) dashboard. It shows your consumption for the current month as a percentage of your allowance.

::: warning Credits apply only to Plane Cloud
On self-hosted instances you connect your own AI provider [API key](https://developers.plane.so/self-hosting/govern/instance-admin#artificial-intelligence), so there are no Plane credits. All AI usage and costs are handled directly through your provider, and members are not metered by Plane.
:::

## How credits are assigned

Credits are included with your plan and refresh every month.

- Each active paid seat gets a monthly included allowance based on your plan.
- The allowance is an entitlement tied to seats, so your total capacity scales with your team.
- Allowances reset at the start of each monthly billing period.

AI **agents** draw from a separate, workspace-level allowance rather than from any one member's. Automated agent activity does not consume a person's individual credits.

For current included amounts by plan, see [Plane pricing](https://plane.so/pricing#ai-&-credits).

## Credits are not pooled by default

Each member has their own monthly allowance. One member's unused credits are not automatically shared with the rest of the workspace. This keeps each person's available capacity predictable.

## What happens when credits run out

As a member approaches their allowance, at around 80% used, Plane shows a warning so they can plan ahead.

When the allowance is fully used for the month, what happens depends on whether workspace overage is enabled:

- **Overage off (the default).** Plane AI features pause for that member until the allowance resets at the start of the next month. The request that reaches the limit still finishes, and the next one is paused. The member sees a message that AI is temporarily unavailable until the reset date.
- **Overage on.** AI keeps working past the included allowance, and the additional usage is billed at the workspace level.

The same applies to the workspace's agent allowance: agents pause when it is used up, unless overage is enabled.

## Workspace overage

Overage is a workspace-level setting that keeps your team moving after included credits are used up.

- When enabled, AI usage continues past the included allowance.
- The additional usage is billed to the workspace.
- Workspace admins decide whether to allow it, so cost stays in your control.

If overage is off, AI pauses at the limit until credits reset or more capacity is added to the workspace.

## Monitor usage

Track consumption from the [AI usage](/ai/ai-usage) dashboard:

- A **monthly meter** shows how much of the allowance has been used, as a percentage.
- A **usage trend** chart shows how consumption changes over time.
- An **analytics breakdown** shows where AI is being used, by member, feature, project, model, and agent.

Every member can see their own usage. Workspace admins and owners can also see workspace-wide usage.

## FAQs

::: details Are credits shared automatically across all users in my workspace?
No. Credits are not pooled by default. Each member has their own monthly allowance.
:::

::: details Do I get credits for each seat?
Yes. An included allowance is assigned per paid seat based on your plan. AI agents draw from a separate, workspace-level allowance.
:::

::: details Can we keep using AI after included credits are used up?
Yes, if a workspace admin enables overage. Otherwise, AI pauses for that member until the allowance resets at the start of the next month.
:::

::: details How do I see how much AI we have used?
Open the [AI usage](/ai/ai-usage) dashboard. It shows your usage as a percentage of your allowance, along with trends and a breakdown by member, feature, project, model, and agent.
:::

::: details Where can I see the latest included credit amounts?
Visit [Plane pricing](https://plane.so/pricing#ai-&-credits) for the most up-to-date plan details.
:::
