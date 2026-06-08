---
title: Intake in the Plane mobile app
description: Triage incoming requests on mobile by accepting, declining, snoozing, or marking intake items as duplicates.
---

# Intake

Intake is where incoming requests land before they become work items in a project. On mobile you can review requests and decide what happens to each one. To learn the concept, see [Intake](/core-concepts/intake) on the web.

## Review intake requests

Open a project's **Intake** to see its requests. Each request has a status:

- **Pending** is waiting for a decision.
- **Snoozed** is hidden until a date you choose.
- **Accepted** has become a work item in the project.
- **Declined** was rejected.
- **Duplicate** was marked as a duplicate of another work item.

Use **Sort by** and the **Filters** to organize the list by status, priority, assignee, created by, and labels. You can also search across intake requests.

## Act on a request

Open a request to take action:

- **Accept** adds the request to the project as a work item.
- **Decline** rejects the request.
- **Snooze** hides the request until a date you set, and **Un-snooze** brings it back.
- **Mark as duplicate** links it to an existing work item and closes it.
- **Open work item** jumps to the linked work item once a request has been accepted.

You can also create a new intake request from the app.

::: info
Accepting, declining, and snoozing intake requests require the right role in the project. Intake is available from self-hosted `v1.13.0`.
:::

<!-- TODO screenshot: an intake request with Accept, Decline, Snooze, and Mark as duplicate actions. Upload as media.docs.plane.so/mobile/app-intake.webp -->

For public intake forms and email-to-intake, which are configured on the web, see the [Intake overview](/intake/overview).
