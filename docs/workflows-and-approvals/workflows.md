---
title: Workflows to control work item state transitions
description: Set up workflows to control how work items move through states, define transition rules, and require approvals before work progresses.
---

# Workflows and Approvals

Plan - <Badge type="tip" text="Business" />

Workflows give you control over how work items move through states in your project. Think of it as creating guardrails that ensure work follows your team's agreed-upon path, with the right people making decisions at each step.

You define which transitions are allowed, who can make them, and whether certain moves need approval before they take effect.

Every project has a single default workflow that applies to all work items regardless of type. On the Enterprise Grid, you can create additional workflows, each scoped to specific work item types, so different kinds of work can follow their own process.

:::tip
If you already had a workflow configured before, it's now your project's default workflow. All your existing transition rules and reviewer settings have been preserved. You can edit them at any time from the Workflows settings page.
:::

<!--
<div style="position: relative; padding-bottom: calc(56.67989417989418% + 41px); height: 0; width: 100%">
  <iframe
    src="https://demo.arcade.software/F2dAIS5BLVXcbgWUCQgl?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
    frameborder="0"
    loading="lazy"
    webkitallowfullscreen
    mozallowfullscreen
    allowfullscreen
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; color-scheme: light"
    title="Set up your workspace"
  ></iframe>
</div>
-->

## Turn on workflows

Head over to your [Project Settings](https://docs.plane.so/core-concepts/projects/overview#configure-project-settings) and select **Workflows** from the sidebar. Toggle **Enable workflows** on at the top of the page.

Once enabled, you'll see your project's default workflow listed with **Default** and **Active** badges. This workflow is active by default and governs all work items in the project.

![Workflows settings page](https://media.docs.plane.so/workflows/workflows-settings-page.webp#hero)

The workflows list includes a search bar to find workflows by name. You can also filter the list by status (Active or Inactive) and by work item type, and sort it by name, date created, or date modified in ascending or descending order.

## Define a workflow

Whether you're editing the default workflow or a type-specific one, the workflow detail page works the same way. It lists all the states included in the workflow and lets you add flows that control how work items move between them.

### Add states

The default workflow includes all states configured in your project. When you create a new workflow, it starts empty. You choose which states to include by clicking **Add states** in the top-right corner of the "Define workflow" section. A panel lists all available project states grouped by category. Select the ones you need and click **Add selected**.

![Select states](https://media.docs.plane.so/workflows/select-states.webp#hero)

### Allow new work items

Each state has an **Allow new work items** toggle on the right side. When this is on, team members can create work items directly in that state. Turn it off for states that should only be reached through progression.

![Workflow states with allow new work items](https://media.docs.plane.so/workflows/allow-new-work-items.webp#hero)

### Add flows

Flows define the rules for moving a work item from one state to another. To add a flow, expand a state by clicking its arrow, then click **+ Add flow**. A panel appears on the right where you choose the flow type - **Transition** or **Approval** - then click **Next** to configure it.

You can add multiple flows to a single state, but they must all be the same type - either all transitions or all approvals.

#### Transition flows

A transition flow defines a permitted state change. When you add one, you configure three fields:

- **via** - shows **Transition** to indicate the flow type.
- **move to** - the destination state. Click to select from available project states on the right pane.
- **by** - who can make this transition. Defaults to **All**, meaning any project member. To restrict it, open the Members panel and select specific individuals.

![Transition flow](https://media.docs.plane.so/workflows/transition-flow.webp#hero)

Click **Save** to confirm the flow, or **Discard** to cancel it.

#### Approval flows

Plan - <Badge type="warning" text="Enterprise Grid" />

An approval flow adds a gate: the work item won't move forward until designated approvers accept or reject it. When you add one, you configure:

- **via** - shows "Approval" to indicate the flow type.
- **on approve, move to** - the state the item moves to when approved.
- **on reject, move to** - the state the item falls back to when rejected.
- **by** - who can approve or reject. Defaults to **All**, but you can restrict it to specific members.

![Approval flow](https://media.docs.plane.so/workflows/approval-flow.webp#hero)

For example, you might add an approval flow on "Testing" so that moving to "Ready for Release" requires sign-off from a QA lead. If rejected, the item moves back to "In Development" for further work.

### Activate the workflow

Once you've defined all the states and flows you need, toggle the workflow on from the Workflows settings page to make it active. You can toggle it off at any time to pause enforcement without losing your configuration.

### Additional options

The three-dot menu on each workflow provides three options:

- **Edit** - update the workflow's name, description, or assigned work item types.
- **View change history** - see a log of all modifications made to the workflow, including who made each change and when.
- **Delete** - permanently remove the workflow. Work items previously governed by this workflow will fall back to the default workflow.

## Create a custom workflow

Plan - <Badge type="warning" text="Enterprise Grid" />

A custom workflow lets you define separate rules for different kinds of work. For example, you might want bug fixes to go through a stricter approval process than feature work, or you might want improvements to skip certain states entirely. When a work item matches a type-specific workflow, that workflow takes precedence over the default.

To create one:

1. On the Workflows settings page, click **Add new workflow**.

2. Give the workflow a unique name and an optional description.

3. Under **Select types**, choose one or more work item types that this workflow will govern.

   ![Create new workflow](https://media.docs.plane.so/workflows/create-new-type-workflow.webp#hero)

4. Click **Create**.

You'll land on the workflow detail page, where you can [define its states and flows](#define-a-workflow).

## How workflows work

Once a workflow is active, work items in the project follow its rules:

**State creation restrictions**  
Items can only be created in states where **Allow new work items** is enabled. If a member tries to create a work item in a restricted state, they won't be able to.

**Transition enforcement**  
Members can only move items along the transitions you've defined. If someone tries to make a state change that isn't permitted, they'll see a blocker message explaining why.

![Blocker message](https://media.docs.plane.so/workflows/blocker-message.webp#hero)

**Approval gates**  
When a work item reaches a state with an approval flow, it enters a pending state. Approvers see **Approve** and **Reject** buttons at the top of the work item detail view. The item moves to the appropriate destination based on the approver's decision.

![Approve and reject buttons on a work item](https://media.docs.plane.so/workflows/approval-buttons.webp#hero)

**Workflow precedence**  
If a work item's type matches a type-specific workflow, that workflow's rules apply instead of the default. For example, if you have a type-specific workflow for bugs, any bug in the project follows that workflow's transition and approval rules. All other work item types continue to follow the default workflow.
