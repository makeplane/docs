---
title: Collect and triage external work requests
description: Use Intake to collect work items from guests, forms, and email submissions, then triage and manage them before adding to your project workflow.
---
# Intake overview

Intake helps you collect, review, and triage work items from external sources before adding them to your project workflow. Whether you're gathering bug reports from customers, feature requests from stakeholders, or support tickets from clients, Intake provides a dedicated space to evaluate and organize incoming requests.

## How Intake works

Intake creates a buffer between external submissions and your active project work. Items submitted through any intake channel land in a *Triage* state where your team can review, add context, and decide whether to accept them into your workflow or decline them.

This approach helps you:
- Keep your project backlog focused and intentional
- Give external users an easy way to submit requests without project access
- Review and add context to submissions before they enter your workflow
- Maintain control over what work enters your project

## Intake channels

Plane offers three ways to collect work items through Intake:

### Intake In-app
Allow guests in a project to create work items through Plane's interface. Best for stakeholders who need regular access to submit requests.

[Learn about Intake In-app →](/core-concepts/intake)

### Intake Forms
Share a public web form where anyone can submit work items without creating an account. Perfect for collecting bug reports, feature requests, or support tickets from a wider audience.

[Learn about Intake Forms →](/intake/intake-forms)

### Intake Email
Get a dedicated email address that automatically converts incoming messages into work items. Ideal for customers or clients who prefer email communication.

[Learn about Intake Email →](/intake/intake-email)

## Turn on Intake

Intake operates at the project level and is disabled by default. Project admins can enable Intake and choose which channels to activate:

1. Navigate to your project settings.
2. Select the **Features** tab.
3. Toggle on the **Intake** feature to enable the core functionality.
4. Enable individual channels (Forms, Email) as needed for your workflow.

Once enabled, you'll see an **Intake** section under your project in the sidebar where all incoming work items appear.

<div class="tag-wrapper">
  ## Intake responsbility
  <Tags :tags='[{ name: "Business", additionalClass: "business" }]' />
</div>

Assign a team member to take ownership of incoming work items and ensure nothing falls through the cracks. When you designate an intake responsible person, they'll automatically be assigned to and notified about every new work item that comes through any intake channel (in-app, forms, or email).

This helps teams:
- Ensure someone is always accountable for reviewing new requests
- Get timely notifications when work items arrive
- Smooth the transition from intake to your project workflow
- Avoid missed or overlooked requests

### Assign intake responsibility

**Role:** Project Admin

![intake-responsibility](https://media.docs.plane.so/intake/intake-responsibility.webp#hero)

1. Go to your project settings.
2. Navigate to the **Features > Intake** section.
3. Scroll to **Intake responsibility**.
4. Select the team member who should receive intake assignments.

The designated person will now be automatically assigned to all new work items created through in-app intake, intake forms, or intake email. They'll receive notifications for each new item, allowing them to triage, add details, or reassign as needed.

::: tip
The intake responsible person can still reassign work items after initial review. This role is about ensuring accountability for the intake process, not permanent ownership of every request.
:::

## Intake state
All work items in Intake use a single state called **Triage**, regardless of which channel they came through. This intake-specific state keeps incoming requests separate from your project's workflow and doesn't appear in your project's state groups.

When you accept an intake work item into your project, you can choose which project state it should move to. By default, it moves to your project's default state, but you can select any state during the acceptance process.

Work items that are declined or marked as duplicates remain in Intake under the Triage state for your records.
