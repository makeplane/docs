---
title: AI usage
description: Monitor how much Plane AI your workspace and its members consume each month, view usage trends and breakdowns, and understand your monthly allowance and limits.
---

# AI usage

AI usage shows how much Plane AI your workspace consumes. It gives you a monthly meter, a usage trend over time, and a detailed breakdown of where AI is being used, so you can keep an eye on consumption and stay ahead of your monthly allowance.

AI usage is read-only. It reports consumption, and it does not change any settings or data.

## Where to find it

Open Plane AI and use the sidebar to reach two screens:

- **Usage** shows your monthly meter and usage trend.
- **Analytics** shows a detailed breakdown of consumption.

## Personal and workspace views

Both screens have a **Personal** and a **Workspace** view:

- **Personal** shows your own AI consumption. Any member can see this.
- **Workspace** shows consumption across the whole workspace, including every member and any AI agents. Only **Admins** and **Owners** can see the Workspace view.

## The Usage screen

**Monthly meter.** A meter shows how much of your monthly allowance has been used in the current period. On Plane Cloud this is shown as a **percentage** of your allowance. The meter can read above 100% because the limit is applied after a request completes, not partway through it.

**Reset date.** Below the meter, Plane shows where you are in the current cycle (for example, the day within the month) and the date the allowance **resets**. Allowances reset monthly.

**Usage trend.** A chart plots consumption over time. You can switch the interval between **Week** and **Month** and move between periods to see how usage is changing.

On self-hosted deployments, usage is measured in **tokens** rather than a percentage, and the Usage screen also shows total **tokens in** and **tokens out**.

## The Analytics screen

The Analytics screen breaks usage down so you can see exactly where AI is being spent. Choose a dimension to group by:

- **Models** — which AI models were used
- **Users** — consumption per member
- **Agents** — consumption by AI agents
- **Features** — which AI features were used (for example chat, page actions, or predictions)
- **Projects** — consumption per project

The breakdown is a table with the group's name, its **share of usage**, the **tokens used**, and the number of **requests**. The table is paginated, and you can **export** it to CSV for offline analysis.

The Users, Agents, and Projects breakdowns are part of the Workspace view, so they require Admin or Owner access.

## Your monthly allowance and limits

Each workspace has a monthly AI allowance that depends on your plan. Consumption counts against that allowance during the billing month and resets at the start of the next one.

- **Nearing your limit.** When you reach about 80% of your allowance, Plane shows a warning so you can plan ahead.
- **Reaching your limit.** When the allowance is used up, Plane AI features are **paused** for that subject (a member or the workspace's agents) until the next monthly reset. The request that crosses the limit still finishes; the next one is blocked. You will see a message that AI capabilities are temporarily disabled until the reset date.

Because the limit is applied after a request rather than partway through, your meter can briefly show slightly over 100%.

For how allowances are assigned per plan, what overage does, and how billing works, see [Plane AI credits](/ai/ai-credits).

## Plane Cloud and self-hosted

How usage is measured depends on where Plane runs:

- **On Plane Cloud**, usage is shown as a **percentage** of a monthly allowance that scales with your plan. Members and AI agents each have their own allowance.
- **On self-hosted deployments**, you connect your own AI provider, so **members are not metered**. Usage is reported in **tokens**, and only the shared pool used by AI agents is bounded, and only if your administrator has configured a token budget for it. If no agent budget is configured, agent features are unavailable rather than metered.

## Availability

AI usage is part of **Plane AI** and appears only where Plane AI is enabled for your workspace. If Plane AI is not enabled, the Usage and Analytics screens are not available. See [Plane AI](/ai/plane-ai) for how to enable it.
