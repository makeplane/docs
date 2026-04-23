---
title: Automate project tasks with trigger based workflows
description: Automate repetitive project tasks with trigger-based workflows. Set up rules to automatically update work item properties, assign team members, and manage priorities when specific conditions are met.
---

# Custom automations <Badge type="tip" text="Business" />

Custom automations let you streamline your project management workflow by automatically performing actions based on specific triggers and conditions. This powerful feature eliminates repetitive manual tasks, ensures consistency in your processes, and helps your team maintain focus on high-value work by letting the system handle routine operations.

![Create automations](https://media.docs.plane.so/automations/create-automation.webp#hero)

For default automations, see [Automations](/automations/overview).

Every custom automation has three components. When [trigger] happens, if [conditions] are met, then perform [actions]. This trigger-condition-action framework allows you to create sophisticated workflows that adapt to your team's specific needs.

- **Triggers** are events that start the automation. A single event fires the automation, which then evaluates conditions before executing actions.
- **Conditions** are optional filters that must be satisfied for the automation to proceed. If you add multiple conditions, all of them must be met (AND logic).
- **Actions** are what the automation does when fired. Multiple actions execute in sequence.

## Create a custom project automation

Project automations apply to work items within a single project.

![Configure trigger and action](https://media.docs.plane.so/automations/configure-trigger-and-action.webp#hero)

1. Navigate to **Project Settings → Automations**.
2. In the **Custom automations** section, click **Create automation**.
3. Give your automation a descriptive name and an optional description, then save.
4. Click **Add trigger** and choose the event that should start the automation.
5. Optionally click **Add condition** to narrow when the automation runs. You can add multiple conditions — the automation only fires when all conditions are met.
6. Click **Add action** to define what happens. Choose from **Add comment**, **Change property**, or **Run Script**. You can add multiple actions — they execute in sequence.
7. Click **Confirm**.
8. Click **Enable** when you're ready for it to go live.

An automation needs at least one trigger and one action before you can enable it. Until you enable it, it stays in draft and doesn't run.

::: tip
You can add multiple conditions to create more specific rules and multiple actions to perform several operations in sequence on a single trigger.
:::

## Create a workspace automation <Badge type="warning" text="Enterprise Grid" />

Workspace automations can span your entire workspace or a specific set of projects.

1. Go to **Workspace Settings → Automations**.
2. Click **Create automation**.
3. Choose which projects the automation should apply to — all projects in the workspace, or a specific subset.
4. Follow the same steps as a project automation: name → trigger → conditions → actions.
5. Enable when ready.

## Configure a scheduled trigger

If you want an automation to run on a timer rather than in response to an event:

1. Open the automation and go to the **Trigger** tab.
2. Select **Scheduled**.
3. Choose a frequency: **Daily**, **Weekly**, or **Monthly**.
   - Weekly: pick which days of the week.
   - Monthly: pick the day of the month (1–31).
4. Set the time (hour and minute) and your timezone.
5. Alternatively, switch to **Cron mode** and enter a 5-field cron expression directly.

When you use a scheduled trigger, the only available action is **Run script**. There's no work item event to react to, so the script handles the logic of fetching and modifying work items itself.

## Add conditions

Conditions filter which work items an automation acts on. Without them, the automation runs on every work item that matches the trigger.

1. Open the automation and go to the **Trigger** tab.
2. Scroll to **Conditions** and click **Add condition**.
3. Choose a field (Priority, State, Assignees, Labels, Work Item Type, or Created By).
4. Choose an operator (is, in, contains, etc.) and set the value.
5. Add more conditions as needed.

Multiple conditions use **AND** logic by default — all of them must match. You can also create **OR** groups where only one condition in the group needs to match.

## Add actions

1. Open the automation and go to the **Action** tab.
2. Click **Add action** and choose a type:
   - **Change property** — update a field on the work item
   - **Add comment** — post a comment on the work item
   - **Run script** — execute a saved script via the Runner
3. Configure the action details (see [Actions](#actions) for parameters).
4. Add more actions if needed. They run in the order listed.

## Manage automations

### Enable or disable an automation

- **Enable**: open the automation and click **Enable**. The automation must have at least one trigger and one action.
- **Disable**: open the automation and click **Disable** or toggle the status off.

You can't delete an enabled automation — disable it first.

### Check automation run history

Open any automation and click the **Activity** button on the top right. You'll see every run, the work items it acted on, whether the run succeeded or failed, and the full execution log.

## Reference

### Triggers

| Trigger           | Fires when                                    |
| ----------------- | --------------------------------------------- |
| Work item created | A work item is created                        |
| Work item updated | Any field on a work item changes              |
| State changed     | A work item's state changes                   |
| Assignee changed  | An assignee is added or removed               |
| Comment added     | A comment is added to a work item             |
| Scheduled         | A configured time or cron schedule is reached |

#### Scheduled trigger options

| Option   | Notes                                                               |
| -------- | ------------------------------------------------------------------- |
| Daily    | Runs once a day at the time you set                                 |
| Weekly   | Runs on the days of the week you pick, at the time you set          |
| Monthly  | Runs on the day of the month you pick (1–31), at the time you set   |
| Cron     | Enter a 5-field cron expression for custom schedules                |
| Time     | Hour and minute (0–23 and 0–59)                                     |
| Timezone | Defaults to the project timezone, then workspace timezone, then UTC |

### Conditions

Conditions let you filter which work items an automation acts on. You can combine multiple conditions with AND or OR logic.

#### Fields you can filter on

| Field          | What it checks                     |
| -------------- | ---------------------------------- |
| State          | The work item's current state      |
| Priority       | Urgent, High, Medium, Low, or None |
| Assignees      | Who the work item is assigned to   |
| Labels         | Labels applied to the work item    |
| Work item type | The type set on the work item      |
| Created by     | Who created the work item          |

#### Operators

| Operator                 | Use when                                        |
| ------------------------ | ----------------------------------------------- |
| Is                       | The field exactly matches a specific value      |
| Is not                   | The field does not match a specific value       |
| In                       | The field matches any value in a set            |
| Contains                 | The field includes the value                    |
| Greater than             | The field is greater than the value             |
| Greater than or equal to | The field is greater than or equal to the value |
| Less than                | The field is less than the value                |
| Less than or equal to    | The field is less than or equal to the value    |

### Actions

#### Change property

Updates a field on the work item.

| Property   | What you can do                                                        |
| ---------- | ---------------------------------------------------------------------- |
| Priority   | Set, add, or remove a priority level (Urgent, High, Medium, Low, None) |
| State      | Move the work item to a specific state                                 |
| Assignees  | Add or remove assignees                                                |
| Labels     | Add, remove, or replace all labels                                     |
| Start date | Set, update, or remove the start date                                  |
| Due date   | Set, update, or remove the due date                                    |

#### Add comment

Posts a comment on the work item. You write the comment text in a rich text editor. The comment is always internal and appears as coming from Automation Bot in the activity log.

You can include dynamic values in the comment using template variables — for example, inserting the current priority or state name into the comment text.

**Example:** Say you have an automation that triggers when a work item's state changes. You want to leave a note with context each time that happens. Your comment template might look like:

```
This item has been moved to a new state. Current priority: {{priority}}. Please check if the due date needs updating.
```

#### Run script <Badge type="warning" text="Enterprise Grid" />

Runs a saved script from your [Plane Runner](/automations/plane-runner) library. You pick the script from a dropdown. This is the only action available when using a scheduled trigger.

## How custom automations work

### How automations run

Every time something changes in Plane — a work item is created, a state changes, a comment is posted — Plane checks whether any of your enabled automations should respond. If a trigger matches, Plane evaluates any conditions you've set. If those pass, it runs the actions in order.

That's the whole flow: something happens → conditions are checked → actions run. If a condition doesn't match, nothing happens and the automation sits quietly. If an action runs into a problem, Plane stops there and marks that run as failed — you can see exactly what happened in the Activity tab.

Each event is only processed once per automation, so you won't end up with the same action firing twice on the same work item.

### Project automations vs. workspace automations

The distinction comes down to scope and reuse.

**Project automations** are the right choice when the rule is specific to one project. They're simpler to configure — the states, labels, and members you pick from are all scoped to that project.

**Workspace automations** are the right choice when you want the same behavior across multiple projects. Instead of recreating the same automation in five different places, you define it once and choose which projects it applies to — all of them, or just a specific subset.

Either way, automations always act on individual work items. Workspace automations aren't doing anything different — they're just defined once and applied more broadly.

### What "Automation Bot" is and why you'll see it

Every custom automation acts through its own dedicated bot account. When an automation changes a field or posts a comment, the activity log shows it came from "Automation Bot" — not from any person on your team.

There are two reasons this matters:

**You always know what made a change.** If a work item's priority changed unexpectedly, one glance at the activity log tells you whether it was a person or an automation. No guessing.

**Automations don't trigger themselves.** Plane knows when a change originates from an automation, so it doesn't feed that change back in as a new event. A "state changed" automation that updates a state won't keep firing on its own output.

### Why scheduled automations only run scripts

Most automations respond to something happening — a trigger gives them a specific work item to act on. Scheduled automations are different. They fire at a time you set, not because of any particular event.

Since there's no work item that kicked off the run, Plane has nothing to apply a property change or comment to. That's why the only available action for scheduled automations is Run script. The script defines the logic — what to look for, which items to act on, and what to do with them.

Scheduled automations check whether they're due roughly every 5 minutes. The time you configure follows your project's timezone, falling back to the workspace timezone, then UTC.

### Why your trigger isn't enough on its own

Triggers tell Plane _what type of event_ to watch for — not which work items to care about. A "state changed" trigger fires for every single state change in the project, across every work item, regardless of type, priority, or who it's assigned to.

Without conditions, an action like "set priority to Urgent" would run on every state change in the project. That's almost never what you want.

Conditions are what make an automation surgical. They let you say "only run this when the work item is a Bug, assigned to this person, with no due date set" — whatever combination of criteria actually defines the case you're building for.

One thing worth knowing: when a work item is first created, some fields like assignees and labels can take a moment to register, even if someone filled them in during creation. Plane handles this — it checks the latest state of those fields before evaluating your conditions, so a filter like "assignee is X" on a creation trigger will work as expected.

## Common use cases

Some common things people use automations for.

- **State management.** Automatically move work items through your workflow when something changes — for example, transition a work item to "In Review" when an assignee is added, or back to "Backlog" when an assignee is removed.

- **Triage and routing.** Make sure new work lands in the right place without manual intervention — for example, assign a default owner whenever a specific work item type is created, or apply a label to every incoming bug so nothing slips through untagged.

- **Priority escalation.** React to signals that indicate urgency — for example, automatically mark a work item as Urgent when a specific label is applied, or raise priority when it gets reassigned to a senior team member.

- **Contextual reminders.** Surface the right information at the right moment — for example, post an internal comment with a checklist when a work item enters "Ready for QA," or flag missing information when a work item is created without an assignee.

- **Scheduled operations.** Run scripts on a timer to handle things that don't map to a single event — for example, sweep stale items weekly, sync data to an external tool nightly, or generate a status comment on open items every Monday morning.
