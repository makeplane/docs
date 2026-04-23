---
title: Subscribers
description: Learn how to subscribe to work items and epics in Plane, manage subscriber lists, set up project-level auto-subscriptions, and understand how Plane subscribes you automatically.
---

# Subscribers

A subscription is how you tell Plane to keep you in the loop on a work item or epic. When you're subscribed, you get notified whenever something changes — a state update, a new comment, a priority shift, an assignee change.

You don't always have to subscribe manually. Plane adds you automatically in a few situations: when you're assigned to something, when someone @-mentions you, or when an admin has set you up as a project-level subscriber. Everything else is opt-in.

## Subscribe to a work item

Open any work item and look for the **Subscribe** button — you'll find it in the detail panel on the right side, or in the peek view. Click it once and you're subscribed. The button switches to **Unsubscribe** to confirm.

From that point on, you'll get in-app and email notifications whenever someone makes a change to that work item.

## Unsubscribe from a work item

Open the work item and click **Unsubscribe**. That's it — you'll stop receiving notifications for it immediately.

If you were auto-subscribed (because you were assigned, for example), unsubscribing works the same way. Being removed as an assignee doesn't automatically unsubscribe you — you have to do that yourself if you want to stop getting notifications.

## Subscribe to an epic <Badge type="info" text="Pro" />

Epics have their own subscribe flow, separate from work items.

Open an epic and click the **Subscribe** button in the detail panel. You'll get notified when the epic itself changes — field updates, state changes, comments, and when an epic update (a progress or status post) is published.

Epics work the same way as work items for most notifications. The one thing that's different is **epic updates**. When someone publishes a progress or status update on an epic, Plane sends an email specifically to all epic subscribers. This is separate from the usual change notifications — it's more like a broadcast, letting stakeholders know about deliberate progress posts rather than individual field edits.

If you're subscribed to an epic, you get both: notifications for changes to the epic itself, and emails when an epic update is published.

To unsubscribe, click **Unsubscribe** from the same panel.

## Subscribe to multiple work items at once <Badge type="info" text="Pro" />

If you need to subscribe to several work items in one go:

1. Select the work items you want from a project list view.
2. In the bulk operations toolbar that appears, click the bell icon.
3. Click **Subscribe** in the modal and you'll be subscribed to all selected items.

This subscribes you, specifically. It doesn't change anyone else's subscriptions.

## Set up project-level subscribers <Badge type="warning" text="Enterprise Grid" />

> Role: Project Admin

Project subscribers are members who are automatically subscribed to every work item in a project — both existing ones and any new ones created going forward.

1. Go to **Project Settings → Members**.
2. Find the **Project subscribers** section.
3. Add the members you want to auto-subscribe.

When you add someone as a project subscriber, Plane subscribes them to all current work items in the project in the background. They'll also be subscribed automatically to any new work items created afterward.

The trade-off is volume. Project subscribers get notifications for every tracked change on every work item in the project. If a project is active, that adds up quickly. Notification preferences help here — you can reduce the email noise without losing in-app visibility.

## Manage who's subscribed to a work item <Badge type="warning" text="Enterprise Grid" />

You can see and edit the subscriber list directly from a work item.

1. Open the work item.
2. Next to the Subscribe button, you'll see a member selector showing current subscribers.
3. Add or remove members as needed.

Only workspace members can be added as subscribers. You need edit permission on the work item to make changes here.

## View all work items you're subscribed to

You can see every work item you're currently subscribed to. Go to the [Your Work](/your-work) page and look for the **Subscribed** tab. It shows all work items across all projects where you're an active subscriber.

## How you get auto-subscribed

| Situation                                   | Subscribed automatically?                     |
| ------------------------------------------- | --------------------------------------------- |
| You are assigned to a work item             | Yes                                           |
| You @-mention someone (they get subscribed) | Yes, the mentioned person                     |
| You create a work item                      | No — but you're still notified as the creator |
| You comment on a work item                  | Yes                                           |
| You are a project subscriber                | Yes, to all work items in the project         |

## See also

- [Notifications](/communication-and-collaboration/notifications)
- [Inbox](/communication-and-collaboration/inbox)
