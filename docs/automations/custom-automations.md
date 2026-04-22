---
title: Automate project tasks with trigger based workflows
description: Automate repetitive project tasks with trigger-based workflows. Set up rules to automatically update work item properties, assign team members, and manage priorities when specific conditions are met.
---

# Custom automations <Badge type="tip" text="Business" />

Custom automations let you streamline your project management workflow by automatically performing actions based on specific triggers and conditions. This powerful feature eliminates repetitive manual tasks, ensures consistency in your processes, and helps your team maintain focus on high-value work by letting the system handle routine operations.

Think of automations as your digital assistant that watches for specific events in your projects and responds according to rules you define. Whether it's updating work item statuses, assigning team members, adding labels, or posting comments, automations work behind the scenes to keep your projects moving smoothly.

![Create automations](https://media.docs.plane.so/automations/create-automation.webp#hero)

For built-in automations, see [Automations](/automations/overview).

## How custom automations work

Automations follow a simple but powerful logic: When [trigger] happens, if [conditions] are met, then perform [actions]. This trigger-condition-action framework allows you to create sophisticated workflows that adapt to your team's specific needs.

Every custom automation has three components.

**Triggers** are events that start the automation. A single event fires the automation, which then evaluates conditions before executing actions.

| Trigger           | Fires when…                                     |
| ----------------- | ----------------------------------------------- |
| Work item created | A new work item is added to the project         |
| Work item updated | Any property on a work item changes             |
| State changed     | A work item moves to a different workflow state |
| Assignee changed  | A work item's assignee is added or removed      |
| Comment created   | Someone adds a comment to a work item           |

**Conditions** are optional filters that must be satisfied for the automation to proceed. If you add multiple conditions, all of them must be met (AND logic).

| Condition  | Filters on…                          |
| ---------- | ------------------------------------ |
| State      | A specific workflow state            |
| Type       | A specific work item type            |
| Label      | One or more project labels           |
| Assignees  | Specific team members                |
| Created by | The person who created the work item |
| Priority   | A specific priority level            |

**Actions** are what the automation does when fired. Multiple actions execute in sequence.

| Action          | What it does                                                                                                                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Add comment     | Posts an automatic comment on the work item                                                                                                                                                                                                 |
| Change property | Updates a work item property: state, priority, assignee, labels, start date, or due date                                                                                                                                                    |
| Run Script      | Executes a [Plane Runner](/automations/plane-runner) script, giving you full programmatic control — call external APIs, create linked work items, enforce custom business logic, or anything else you can write in JavaScript or TypeScript |

## Set up automations

![Configure trigger and action](https://media.docs.plane.so/automations/configure-trigger-and-action.webp#hero)

1. Navigate to **Project Settings → Automations**.
2. In the **Custom automations** section, click **Create automation**.
3. Give your automation a descriptive name and an optional description, then save.
4. Click **Add trigger** and choose the event that should start the automation.
5. Optionally click **Add condition** to narrow when the automation runs. You can add multiple conditions — the automation only fires when all conditions are met.
6. Click **Add action** to define what happens. Choose from **Add comment**, **Change property**, or **Run Script** <Badge type="warning" text="Enterprise Grid" />. You can add multiple actions — they execute in sequence.
7. Click **Enable** in the top right corner to activate the automation.

::: tip
You can add multiple conditions to create more specific rules and multiple actions to perform several operations in sequence on a single trigger.
:::

## Manage automations

![Manage automations](https://media.docs.plane.so/automations/manage-automations.webp#hero)

### Activity monitoring

Track your automation's performance through the Activity panel, which shows:

- When the automation was created
- Trigger additions and modifications
- Condition updates
- Action changes
- Execution history

Filter the activity view to see only relevant events or view the complete run history to understand your automation's impact.

### Enable or disable automations

Toggle automations on or off as needed without deleting them. This is useful for:

- Temporarily suspending automations during maintenance
- Testing new workflows before full deployment
- Seasonal or project-phase-specific automations

### Edit and delete automations

- Modify triggers, conditions, and actions using the **Edit** option
- Remove automations that are no longer needed

## Common use cases

**State management.** Automatically transition work items between workflow states when conditions are met — for example, move a work item to "In Review" when an assignee is added, or to "Done" when all sub-items are completed.

**Team assignment and handoffs.** Auto-assign team members when work items reach specific stages. Reassign work based on type or priority to ensure proper handoffs between teams.

**Priority and categorization.** Auto-adjust priorities based on labels or assignees. Apply consistent labeling across similar work item types to keep projects organized.

**Communication.** Post automatic comments when work items are assigned, reassigned, or move between stages. This keeps stakeholders informed without requiring manual updates.

---

Automations transform reactive project management into proactive workflow orchestration, allowing teams to focus on solving problems rather than managing processes. With the ability to monitor, edit, and control when automations run, you maintain full control over your automated workflows while reducing manual overhead.
