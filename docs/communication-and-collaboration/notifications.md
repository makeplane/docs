---
title: Notifications
description: Understand what triggers notifications in Plane, how in-app, email, and push notifications work, how to set your notification preferences, and how stacked emails reduce inbox noise.
---

# Notifications

Notifications are how Plane tells you something changed on a work item you care about. Every time a tracked change happens, Plane builds a list of people who should know — subscribers, assignees, and the creator — and sends them a notification.

There are three channels: in-app inbox, email, and push (mobile). You can control which events send you emails.

## Set your notification preferences

You can control which types of changes send you email notifications — you don't have to receive emails for everything.

1. Go to **Profile Settings → Notifications**.
2. Toggle on or off:
   - **Property changes** — assignee, label, priority, due date, and other field changes
   - **State changes** — when a work item moves to a different state
   - **Issue completed** — specifically when a work item reaches a completed state (sub-toggle under state changes)
   - **Comments** — new or updated comments
   - **Mentions** — when someone @-mentions you

These preferences apply across your whole workspace — there's no per-project setting. Changes save immediately.

Inbox notifications always come through regardless of these settings. These toggles only affect emails.

## Events that trigger notifications

| Event                                                             | Notifies?                                                |
| ----------------------------------------------------------------- | -------------------------------------------------------------------- |
| Work item created                                                 | Yes                                                                  |
| Any field updated (state, priority, assignee, label, dates, etc.) | Yes                                                                  |
| Comment added                                                     | Yes                                                                  |
| Comment edited                                                    | Yes                                                                  |
| Comment deleted                                                   | Yes                                                                  |
| Link added, updated, or removed                                   | Yes                                                                  |
| Attachment added or removed                                       | Yes                                                                  |
| Work item relation added or removed (blocked by, duplicate, etc.) | Yes                                                                  |
| Work item deleted                                                 | Yes                                                                  |
| @mention in description or comment                                | Yes (mention notification)                                           |
| Epic field updated                                                | Yes                                                                  |
| Epic update published (progress or status post)                   | Yes — all epic subscribers get an email                              |
| Due date approaching (reminder)                                   | Yes — subscribers and assignees get an in-app and email notification |

## Notification channels

| Channel       | When it fires                           | Can be turned off?                |
| ------------- | --------------------------------------- | --------------------------------- |
| Inbox         | Every tracked event                     | No                                |
| Email         | Tracked events, batched every 5 minutes | Yes, via notification preferences |
| Push (mobile) | Every tracked event                     | Yes                               |

Emails are batched — they don't go out the instant something changes. Plane groups pending email notifications and sends them every 5 minutes.

## Batched email notifications

Plane doesn't send one email per change. Multiple changes to the same work item are grouped into a single email, sent every 5 minutes. If someone updates the priority, changes the state, and adds a comment in quick succession, you get one email covering all three — not three separate ones.

This means there's always a short delay before an email arrives, but it also means your email inbox doesn't fill up when a work item goes through a burst of activity.

## Who gets notified

For each change, Plane notifies:

- Everyone subscribed to the work item
- All current assignees
- The person who created the work item

The person who made the change is excluded — you don't get notified about your own actions.

If someone is @-mentioned in the same activity, they get a mention notification specifically, not an additional subscriber notification.

## Notification preferences

These settings live in **Profile Settings → Notifications** and apply globally across all your projects.

| Preference       | What it controls                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| Property changes | Emails for any field update (assignee, label, priority, dates, etc.)                             |
| State changes    | Emails when a work item moves to a different state                                               |
| Issue completed  | Emails specifically when a work item reaches a completed state (sub-setting under state changes) |
| Comments         | Emails for new or updated comments                                                               |
| Mentions         | Emails when you are @-mentioned                                                                  |

Turning off a preference stops the email — it does not stop the in-app notification.

## The difference between inbox and email notifications

In-app notifications always come through — your notification preferences don't affect them. They accumulate in the Inbox panel and you can read, snooze, or archive them from there.

Email notifications are the ones you can control. Your preferences in Profile Settings let you decide which types of changes are worth an email. If you want in-app pings for everything but only emails for comments and mentions, you can set that up.

## Due date reminders

Due date reminders are a special notification type configured at the project level (in Project Settings → Automations). When enabled, Plane sends a notification to both the work item's subscribers and its assignees when the due date is within the configured window — say, 3 days out.

These are one-time per window. If you've set a 3-day reminder and someone already received it, they won't get another one until the window resets. Reminders only go out for work items that are still in progress — completed and cancelled items are skipped. See [Set up due date reminders](/automations/overview#set-up-due-date-reminders).

## See also

- [Subscribers](/communication-and-collaboration/subscribers)
- [Inbox](/communication-and-collaboration/inbox)
