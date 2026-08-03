---
title: Workflows to control work item state transitions
description: Set up workflows to control how work items move through states, define transition rules, and require approvals before work progresses.
---

# Workflows and Approvals <Badge type="tip" text="Business" />

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

## Where workflows live depends on your plan

Every plan builds workflows the same way, with the same states, flows, and conditions. What differs is **where** they are configured and **who** manages them. Find your setup below.

| Plan / setup                                                                                    | Where you configure workflows                                          | What you get                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Business**                                                                                    | Inside each project, under **Project Settings → Workflows**            | One **default workflow** per project that governs all work items in it.                                                                                                                           |
| **Enterprise Grid** (project-managed)                                                           | Inside each project, under **Project Settings → Workflows**            | Everything above, plus **approval flows**, **transition conditions**, and **multiple custom workflows** scoped to specific work item types.                                                       |
| **Enterprise Grid with [Workspace Governance](/workspace-administration/workspace-governance)** | Once for the whole workspace, under **Workspace Settings → Workflows** | Workflows are defined centrally by a workspace admin and applied to every project. Project admins no longer edit workflows inside a project; they choose from the workflows the workspace allows. |

**In short**

- If you're on **Business** or **Enterprise Grid without governance**, workflows live in **project settings**. Everything in [Set up workflows](#set-up-workflows) below is where you work.
- If your workspace has turned on **[Workspace Governance](/workspace-administration/workspace-governance)**, workflow management moves to the **workspace level**. You still build workflows the same way, but in workspace settings, and projects consume them within the limits you set. See [Workspace level workflows](#workspace-level-workflows).

:::warning Turning on governance moves workflows to the workspace
Enabling workspace governance is a one-way change that relocates workflow management from individual projects to the workspace. Existing project workflows are migrated up and preserved. Read [Workspace Governance](/workspace-administration/workspace-governance) before enabling it.
:::

## Set up workflows

The rest of this section describes how to build and run a workflow. It applies whether you manage workflows in **project settings** or in **workspace settings** (Enterprise Grid with governance) - the builder is identical. Where a step differs at the workspace level, it's called out inline.

### Turn on workflows

Head over to your [Project Settings](https://docs.plane.so/core-concepts/projects/overview#configure-project-settings) and select **Workflows** from the sidebar. Toggle **Enable workflows** on at the top of the page.

Once enabled, you'll see your project's default workflow listed with **Default** and **Active** badges. This workflow is active by default and governs all work items in the project.

![Workflows settings page](https://media.docs.plane.so/workflows/workflows-settings-page.webp#hero)

The workflows list includes a search bar to find workflows by name. You can also filter the list by status (Active or Inactive) and by work item type, and sort it by name, date created, or date modified in ascending or descending order.

::: warning **Enterprise Grid with governance**
There is no per-project **Enable workflows** toggle. Workflows are managed centrally under **Settings → Workflows** at the workspace level, and the workspace always has one default workflow. The list additionally shows how many **projects** and **work item types** use each workflow.
:::

### Define a workflow

Whether you're editing the default workflow or a type-specific one, the workflow detail page works the same way. It lists all the states included in the workflow and lets you add flows that control how work items move between them.

#### Add states

The default workflow includes all states configured in your project. When you create a new workflow, it starts empty. You choose which states to include by clicking **Add states** in the top-right corner of the "Define workflow" section. A panel lists all available project states grouped by category. Select the ones you need and click **Add selected**.

![Select states](https://media.docs.plane.so/workflows/select-states.webp#hero)

::: warning **Enterprise Grid with governance**
The states you add come from the workspace's shared [states](/core-concepts/issues/states#where-to-configure-states) catalog, not a project-specific list.
:::

#### Allow new work items

Each state has an **Allow new work items** toggle on the right side. When this is on, team members can create work items directly in that state. Turn it off for states that should only be reached through progression.

![Workflow states with allow new work items](https://media.docs.plane.so/workflows/allow-new-work-items.webp#hero)

#### Add flows

Flows define the rules for moving a work item from one state to another. To add a flow, expand a state by clicking its arrow, then click **+ Add flow**. A panel appears on the right where you choose the flow type - **Transition** or **Approval** - then click **Next** to configure it.

You can add multiple flows to a single state, but they must all be the same type - either all transitions or all approvals.

##### Transition flows

A transition flow defines a permitted state change. When you add one, you configure three fields:

- **via** - shows **Transition** to indicate the flow type.
- **move to** - the destination state. Click to select from available project states on the right pane.
- **by** - who can make this transition. Defaults to **All**, meaning any project member. To restrict it, open the Members panel and select specific individuals.
- **with** - optional conditions that run before or after the transition. See [Transition conditions](#transition-conditions) below.

![Transition flow](https://media.docs.plane.so/workflows/transition-flow.webp#hero)

Click **Save** to confirm the flow, or **Discard** to cancel it.

##### Approval flows <Badge type="warning" text="Enterprise Grid" />

An approval flow adds a gate: the work item won't move forward until designated approvers accept or reject it. When you add one, you configure:

- **via** - shows "Approval" to indicate the flow type.
- **on approve, move to** - the state the item moves to when approved.
- **on reject, move to** - the state the item falls back to when rejected.
- **by** - who can approve or reject. Defaults to **All**, but you can restrict it to specific members.
- **with** - optional conditions that run before or after the approval decision. See [Transition conditions](#transition-conditions) below.

::: warning **Enterprise Grid with governance**
The members you pick under **by** are **workspace** members. At the project level they are the project's members.
:::

![Approval flow](https://media.docs.plane.so/workflows/approval-flow.webp#hero)

For example, you might add an approval flow on "Testing" so that moving to "Ready for Release" requires sign-off from a QA lead. If rejected, the item moves back to "In Development" for further work.

### Transition conditions <Badge type="warning" text="Enterprise Grid" />

Transition conditions let you attach custom logic to any transition or approval flow. They use [Plane Runner](/automations/plane-runner) scripts to validate whether a transition should proceed and to perform follow-up actions after it completes.

When you click the **Conditions** option in the "with" column of a flow, a panel opens on the right with two sections: **Pre validation** and **Post actions**.

#### Pre-validation

Pre-validation scripts run **before** a transition happens. They verify that the work item is ready to move - for example, checking that all required fields are filled, that an estimate exists, or that a linked document has been approved.

If a pre-validation script returns `{ success: false }` or throws an error, the transition is blocked and the user sees an error message explaining why. If all pre-validation scripts return `{ success: true }`, the transition proceeds.

You can chain multiple pre-validation scripts - they run in the numbered order shown (#1, #2, etc.). All must pass for the transition to proceed.

**To add a pre-validation script:**

1. In the Conditions panel, under **Pre validation**, click **+ Select script**.
2. Choose an existing Runner script of type "Workflow Transition" from the list.
3. Or click **New Script** to create one inline - the script editor opens with the type pre-set to "Workflow Transition" and a template showing the return rules:
   - `return { success: true }` - allow the transition.
   - `return { success: false }` - block the transition.
   - `throw new Error("reason")` - block the transition with a specific message shown to the user.
4. Click **Save and use** to save the script and attach it to the condition in one step.
5. Click **+ Add more** to chain additional pre-validation scripts.

#### Post actions

Post-action scripts run **after** a transition completes successfully. They handle follow-up work - posting a Slack notification, creating a linked work item in another project, adding a comment, updating a custom property, or calling an external API.

Post-action scripts don't block the transition (it has already happened). If a post-action script fails, the transition still stands, but the error is logged in the script's execution history.

**To add a post-action script:**

1. Under **Post actions**, click **+ Select script**.
2. Choose an existing Runner script or create one inline.
3. Click **+ Add more** to chain additional post-action scripts.

#### Example: enforcing quality gates

A common pattern is combining pre-validation and post-actions on a single transition:

**Transition: "In Development" → "In Review"**

Pre-validation:

- Script #1: Verify the work item has at least one assignee and an estimate.
- Script #2: Verify all sub-work items are completed.

Post actions:

- Script #1: Post a message to Slack notifying the review channel.
- Script #2: Add a "Ready for Review" label to the work item.

If either pre-validation script fails, the developer sees an error message and the work item stays in "In Development." If both pass, the transition happens and the post-action scripts fire in sequence.

For details on writing Runner scripts, including the full SDK reference, available globals, and security model, see [Plane Runner](/automations/plane-runner).

### Activate the workflow

Once you've defined all the states and flows you need, toggle the workflow on from the Workflows settings page to make it active. You can toggle it off at any time to pause enforcement without losing your configuration.

### Additional options

The three-dot menu on each workflow provides three options:

- **Edit** - update the workflow's name, description, or assigned work item types.
- **View change history** - see a log of all modifications made to the workflow, including who made each change and when.
- **Delete** - permanently remove the workflow. Work items previously governed by this workflow will fall back to the default workflow.

## Create a custom workflow <Badge type="warning" text="Enterprise Grid" />

A custom workflow lets you define separate rules for different kinds of work. For example, you might want bug fixes to go through a stricter approval process than feature work, or you might want improvements to skip certain states entirely. When a work item matches a type-specific workflow, that workflow takes precedence over the default.

To create one:

1. On the Workflows settings page, click **Add new workflow**.

2. Give the workflow a unique name and an optional description.

3. Under **Select types**, choose one or more work item types that this workflow will govern.

   ![Create new workflow](https://media.docs.plane.so/workflows/create-new-type-workflow.webp#hero)

4. Click **Create**.

You'll land on the workflow detail page, where you can [define its states and flows](#define-a-workflow).

::: warning **Enterprise Grid with governance**
The workflow name must be unique across the workspace, and you attach workflows to work item types through **governance modes** rather than a simple type assignment. See [Workspace level workflows](#workspace-level-workflows).
:::

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

## Workspace level workflows <Badge type="warning" text="Enterprise Grid" />

On **Enterprise Grid with [Workspace Governance](/workspace-administration/workspace-governance)** enabled, workflows are managed once for the entire workspace instead of project by project. A workspace admin builds a shared catalog of workflows under **Settings → Workflows**, and every project uses workflows from that catalog. Project admins no longer create or edit workflows inside a project; they choose from what the workspace allows.

You build these workspace workflows exactly as described in [Set up workflows](#set-up-workflows) above. This section covers only what's different at the workspace level: the shared catalog, the default workflow, and how projects consume workflows.

### The shared catalog and default workflow

- All workflows live in one workspace-level catalog. Each is listed with its status (Active or Disabled), its states, and how many projects and work item types use it.
- The workspace has exactly **one default workflow**. It is the fallback for any project and work item type not bound to a more specific workflow, and it **cannot be deleted**.
- Workflow names must be **unique across the workspace**.

### How projects use a shared workflow

You control how much freedom each project has to pick its own workflow, set **per work item type** using a **governance mode**:

| Mode            | What a project admin can do                                               |
| --------------- | ------------------------------------------------------------------------- |
| **Any**         | Choose any active workspace workflow for that work item type.             |
| **Constrained** | Choose only from an **allowlist** of workflows you approve for that type. |
| **Required**    | No choice. One workflow is mandated, and every project uses it.           |

**Pins** - in **Any** or **Constrained** mode, you can **pin** a specific project to a specific workflow. This forces that one project's choice while leaving other projects free. Pins are unavailable in Required mode, and are removed automatically if a type is later switched to Required.

**Effective workflow resolution** - for any project and work item type, the workflow that actually applies resolves in this order:

1. The **required** workflow, if the type's mode is Required.
2. The project's **pin**, if one exists.
3. The project's own **choice**, if set.
4. Otherwise, the **workspace default workflow**.

The effective workflow determines the starting states, which states allow creation, and the allowed transitions for work items of that type in that project.

:::warning Switching a workflow can move work items
When a project's effective workflow changes - for example, because a type is set to Required - work items whose current state is not part of the new workflow are moved to a fallback state. Always review the preview before confirming a workflow change.
:::

These controls are configured on the work item type. For the full details, see [Work item types](/work-items/workspace-work-item-types) and [Workspace governance](/workspace-administration/workspace-governance#how-projects-use-shared-workflows).

### What project admins see

From a project's work item type settings, a project admin sees, per type: whether the type is free to choose, **constrained** to an allowlist, **mandated** (required), or **pinned**; the current effective workflow and any workflows they may pick; and a **preview** of how existing work items would be remapped if they switch, before applying the change.

If a project admin tries to change a workflow they are not allowed to change, they get an error explaining that the workflow is mandated by the workspace, assigned by the workspace (pinned), or outside the allowed list.
