---
title: How billing works
toc_max_heading_level: 4
description: Learn how Plane's per-seat billing works, and how billing cycles, upgrades, and payments are handled.
---

# How billing works

Plane uses a per-seat billing model for paid plans. You pay for the number of seats in your workspace, not the total number of users. Understanding this distinction helps you manage costs effectively while giving you the flexibility to map seats to your teams.

## Why per-seat instead of per-user

Most SaaS tools charge per user. Every person who accesses the system counts toward your bill. Plane takes a different approach.

**The per-seat model separates billing from user roles.** You purchase seats for users who need full access—Admins and Members—while users who need limited access—Guests—are not billed at all. This reflects how teams actually work. Not everyone needs the same level of access.

For example, a typical workspace might have 20 Admins and Members and 100 Guests spanning non-participating stakeholders, clients, contractors, and other users. With per-seat pricing, you pay for 20 seats and get 5 Guest slots per paid seat for a total 100 Guest slots. Guests cost nothing extra. This model becomes more cost-effective as your Guest population grows.

:::warning
Guest allocation works differently on Enterprise Grid. Since Enterprise Grid includes Granular Access Control (GAC) where any role can have any permission, the preset system-defined roles don't apply. All users at the instance level are billable seats.
:::

## How seat-based billing works

### Pro and Business plans

Billing happens per workspace. If you have multiple workspaces, each requires its own subscription. When you upgrade a workspace to a paid plan, you're charged for all seats, regardless of how those seats are distributed across projects.

### Enterprise Grid

Billing happens at the instance or the tenant level. A single Enterprise Grid license covers the entire instance, including all workspaces within it. This means you can have multiple workspaces under one license.

### Seat allocation and usage

**Seats are resources that you assign to users.** When you upgrade, you purchase a specific number of seats. Those seats form a pool that you allocate to users.

For example, you might upgrade with 50 seats, assign 45 to current Admins and Members, and keep 5 available for the future.

**The initial seat count matches your current team size.** When upgrading through Plane's interface, you automatically get as many seats as the number of Admins and Members currently in your workspace. On self-hosted instances upgrading through the Prime portal, you specify the seat count yourself.

![Add seats](https://media.docs.plane.so/activate-license/add-seats.webp#hero)

### Guest allocation

On Pro and Business plans, every paid seat includes 5 Guest slots. These Guest slots are pooled at the workspace level, just like seats. If you have 20 paid seats, you get 100 Guest slots total (20 × 5).

This does not apply to Enterprise Grid. All users are billable seats at the instance level regardless of role. This is because Enterprise Grid includes [Granular Access Control (GAC)](/roles-and-permissions/overview#two-layers-rbac-and-gac), which lets you define custom permissions for any role. The preset system-defined roles no longer apply in the same way. In addition, your Enterprise Grid license isn't tied to a single workspace — you can have multiple workspaces with Enterprise features turned on under one license.

## Managing seats over time

### Adding seats

**You must add seats before adding new paid users.** If all your seats are assigned and you want to add another Admin or Member, you first [purchase additional seats](/workspaces-and-users/add-remove-seats#add-seats) from **Workspace Settings > Members > Manage seats**.

New seats are charged immediately to your card on file. The charge is prorated if you're mid-cycle or at full price if you're at the start of a cycle. See [How proration works](#how-proration-works) for more.

:::warning
If you don't have an online payment method on file or you have an offline subscription, you must contact [Plane support](/support/get-help) to adjust your seat count. The system can't automatically charge for new seats without payment information.
:::

### Removing seats

**Removing members doesn't reduce your bill.** When you remove a user from your workspace, their seat becomes available in the pool. You can reassign it to someone else. Your seat count and billing remain unchanged.

To actually reduce your billing, you must explicitly [remove seats](/workspaces-and-users/add-remove-seats#remove-unused-seats) from **Workspace Settings > Members > Manage seats**. This action removes any seats that aren't currently assigned to users.

When you remove seats, the prorated amount for the unused portion of the billing cycle is deducted from your next invoice. See [How proration works](#how-proration-works) for more.

### The seats-versus-members distinction

This distinction causes confusion, so it's worth emphasizing:

**Seats are billing units.** They represent capacity, the maximum number of paid users you can have.

**Members are people.** They're the actual users in your workspace.

Actions on members—adding, removing, changing roles—don't automatically affect your seat count or billing. Actions on seats—purchasing, removing—directly affect your billing.

### How proration works

Proration ensures you only pay for what you use. Whenever you change your seat count mid-cycle, Plane calculates the charge or deduction based on how much of the billing cycle remains.

**When you add seats mid-cycle**, you're charged immediately at the prorated price for the remaining days. If you add 10 seats halfway through a monthly billing cycle, you pay for 10 seats × the remaining 15 days, roughly half the monthly price per seat. Those seats then renew at full price in the next billing cycle.

**When you remove seats mid-cycle**, the unused portion is deducted from your next invoice. If you remove 10 seats halfway through a monthly billing cycle, your next invoice is reduced by the value of 10 seats × the remaining 15 days.

Proration applies to both monthly and annual billing cycles, calculated proportionally based on the number of days remaining in the cycle.

## Subscription lifecycle

### Automatic renewals

Subscriptions renew automatically at the start of each billing cycle, monthly or annual, depending on what you selected. The renewal charge is processed through your payment method on file.

Stripe, Plane's payment processor, handles the renewal.

1. An invoice is generated at the renewal date.
2. The charge is attempted on your payment method.
3. If successful, your subscription continues.
4. If unsuccessful, Stripe retries the payment 3-5 times over 14 days.
5. After 14 days of failed attempts, the subscription is automatically cancelled.

You receive email alerts before each billing attempt and after failed payments.

### Mid-cycle changes

**Billing frequency changes**—monthly to annual, or vice versa—take effect at your next billing cycle. You can request this change from **Workspace Settings > Billing and plans > Manage Subscription**.

On Cloud, the change happens automatically. On self-hosted instances, you accept the change in the Stripe portal, then return to Plane and click [Sync plan](/workspaces-and-users/manage-licenses#sync-plan) from Workspace Settings to apply the changes locally.

**Plan upgrades** happen immediately. On Cloud, change the plan from **Manage Subscription**. Any additional cost is prorated and charged immediately. If the new plan costs less per seat, the difference is deducted from your next invoice. On self-hosted instances, this currently requires purchasing a new license and activating it. This process will be simplified in future releases.

### Price stability

Your subscription price doesn't change mid-cycle unless you add or remove seats. Monthly subscriptions renew at the same price each month. Annual subscriptions remain constant for the full year.

**The exception**  
Limited-period discounts that some workspaces get during promotional periods expire according to their specific terms.

## Downgrade your plan

You can downgrade from a higher plan to a lower one or cancel your subscription entirely to return to the Free plan.

### Downgrade to a lower paid plan

1. Go to **Workspace Settings > Billing and plans**.
2. Click **Manage Subscription**. This opens the Stripe portal.
3. Click **Update subscription**.
4. Select the plan you want to downgrade to and click **Continue**.
5. Confirm the change.

The downgrade takes effect at the end of your current billing cycle. You keep access to the higher plan's features until the cycle ends. The difference in cost is deducted from your next invoice.

### Cancel and return to the Free plan

1. Go to **Workspace Settings > Billing and plans**.
2. Click **Manage Subscription**. This opens the Stripe portal.
3. Click **Cancel subscription**.
4. Confirm the cancellation.

Your workspace retains all paid features until the end of the current billing cycle.

If your workspace exceeds the Free plan's 12-seat limit when your subscription ends, the workspace enters a locked state. Only the **Members** page is accessible. Workspace Admins can either remove users to get below 12 seats or reactivate a paid subscription to regain full access.

## Free plan and trial access

### Free trial for new workspaces

When you create a new Plane workspace on our Cloud, you automatically start a 14-day free trial of the Business plan. This gives you full access to premium features without requiring payment information.

The trial includes all Business plan features, full seat capacity for your team, and AI credits for Plane AI features. No payment method is required.

After 14 days, your workspace automatically reverts to the Free plan if you haven't upgraded to a paid subscription, and you won’t be charged if a payment method was never added.

### Free plan seat limits

The Free plan supports up to 12 seats.

**Grandfathered workspaces**  
Cloud workspaces on the Free tier before December 17th, 2024 were grandfathered at their current seat count. If you had 20 Admins and Members when the limit was introduced, your Free workspace retains 20 seats.

Grandfathered workspaces keep their higher seat count until you manually remove seats. Once you drop to 12 seats, you lose grandfathered status and cannot add seats without upgrading.

If you upgrade a grandfathered workspace to a paid plan, you're charged for all grandfathered seats. A workspace with 20 grandfathered seats would be billed for 20 seats on a paid plan.

## AI credits and usage

Plane AI uses a separate credit-based system for AI features. Credits measure the computational work required for AI tasks, from quick queries to bulk automations.

Each plan includes monthly AI credits per seat that pool at the workspace level. AI credits are separate from your seat-based subscription. You can run out of AI credits without affecting your paid seats, and vice versa. Learn more about [how AI credits work](/ai/plane-ai-credits) including consumption rates, rollover policies, and top-up options.

::: warning IMPORTANT
AI credits apply only to Plane Cloud.
On self-hosted instances, you use your own AI provider's API keys, and all AI usage and costs are managed directly through your provider.
:::

## Payment and invoicing

### Payment methods

Plane requires a payment method on file for all paid subscriptions created through the standard upgrade flow. Stripe, Plane's payment processor, doesn't allow removing all payment methods once a subscription is active.

You can update your payment method anytime from **Workspace Settings > Billing and plans > Manage Subscription**.

### Download invoices

All invoices are available from **Workspace Settings > Billing and plans > Manage Subscription**. You can view and download past invoices from that screen.

### Failed payments

When a payment fails, Stripe attempts to collect payment 3-5 times over 14 days. You receive email notifications after each failed attempt.

If all payment attempts fail, Cloud workspaces are cancelled after 14 days. Self-hosted workspaces are cancelled 7 days after the failed payment cycle.

## Unpaid bills

If you have an active subscription with unpaid invoices, you receive a 30-day notice to clear the balance. After 30 days, your workspace enters a restricted state where all members except Workspace Admins are locked out. Workspace Admins can access **Billing and plans** page, but no project work is accessible until bills are paid.

Once you pay outstanding invoices, full workspace access is restored immediately.

## Cloud versus self-hosted billing differences

Most billing mechanics work identically across Cloud and self-hosted instances, with a few key differences:

**License activation**  
Self-hosted instances require [license key activation](https://developers.plane.so/self-hosting/manage/manage-licenses/activate-pro-and-business). On Pro and Business, each license key unlocks one workspace on one instance. On Enterprise, the license activates at the instance level, covering all workspaces within it. Cloud workspaces activate directly through the billing portal. There is no need to activate using a license key.

**Plan changes**  
Cloud workspaces handle plan changes—upgrades, frequency changes—automatically. Self-hosted instances require using [Sync plan](/workspaces-and-users/manage-licenses#sync-plan) from Workspace Settings after accepting changes in the billing portal.

**License portability**  
On Pro and Business, license keys are tied to both a workspace and a machine. If you switch servers or workspaces, you must [delink your license key](https://developers.plane.so/self-hosting/manage/manage-licenses/activate-pro-and-business#delink-license-key) from the old workspace before reactivating it elsewhere. On Enterprise Grid, [license activation](https://developers.plane.so/self-hosting/manage/manage-licenses/activate-enterprise) and delinking happens at the instance level through [God mode](https://developers.plane.so/self-hosting/govern/instance-admin).

## Refund policy

Plane doesn't offer refunds except in exceptional circumstances. Billing happens automatically with advance email notifications before each charge.

If you believe you have an exceptional case warranting a refund, contact [Plane support](/support/get-help) with details about your situation.

## See also

- [Upgrade to a paid plan](/workspaces-and-users/upgrade-plan)
- [Add or remove seats](/workspaces-and-users/add-remove-seats)
- [Manage licenses for self-hosted](/workspaces-and-users/manage-licenses)
