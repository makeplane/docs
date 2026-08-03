---
title: Workspace Governance
sidebar_label: Workspace Governance
description: Centralize and standardize how projects are configured by managing states, workflows, work item types, and custom properties at the workspace level.
---

# Workspace Governance <Badge type="warning" text="Enterprise Grid" />

Workspace governance lets workspace admins define shared configuration once, at the workspace level, and have every project use it. Instead of each project defining its own states, workflows, and work item types, governance centralizes these so your projects stay consistent and comply with a standard you control.

When governance is on, workspace admins own the shared building blocks. Project admins can use those building blocks, but cannot create or modify them independently.

:::danger Enabling governance is permanent
Turning on workspace governance is a **one-way** change. It cannot be disabled or undone. Once enabled, project admins permanently lose the ability to create or edit states, workflows, work item types, templates, automations, and recurring work items inside their projects. Read this page in full before enabling.
:::

## What governance centralizes

Enabling governance lifts all of the following from the project level to the workspace level. Each has its own detailed page:

- [**States**](/core-concepts/issues/states) - the shared set of states for the whole workspace, including a single workspace triage state.
- [**Workflows and approvals**](/workflows-and-approvals/workflows) - shared workflows that define how work items move between states.
- [**Work item types and custom properties**](/work-items/workspace-work-item-types) - defined once and rolled out to projects.
- [**Automations**](/automations/custom-automations#create-a-workspace-automation) - workspace-level automations.

After governance is on, all of these are **workspace-managed**. Projects import and use them.

## How governance works

Governance is a **binding layer**, not a copy and not a blanket override. This is the single most important thing to understand:

- Workspace configuration is **not duplicated** into each project. Projects **reference** the shared workspace resources.
- Governance does **not** force every project to look identical. It standardizes where you require it, and allows per-project flexibility where you permit it.
- For workflows specifically, each project resolves an **effective workflow** for each work item type. The workspace controls how much freedom a project has over that choice. See [How projects use shared workflows](#how-projects-use-shared-workflows).

## Enable governance

Governance moves through three states: **Disabled → Migration in progress → Enabled**.

1. Go to **Settings → Workspace Governance**.
2. Click **Enable governance**.
3. Step through the migration wizard. It has one step for each kind of configuration being centralized: **states, work item types, workflows, templates, automations, and recurring work items**. Each step shows a preview of what will be migrated so you can review before committing.
4. Confirm to start the migration.

### During migration

While the migration runs, the workspace is temporarily **frozen for writes** so configuration can be moved safely and consistently. Requests to change configuration during this window are rejected until the migration completes. Do not plan configuration changes during the migration.

### After migration

When the migration finishes, the governance page shows a summary: **Status** (Enabled), **Enabled on** (date), **Enabled by** (the admin), and **Entities migrated** (counts).

:::warning
The migration freeze makes the affected configuration temporarily read-only, and enabling cannot be reversed once it completes. Enable governance during a low-activity window.
:::

## What changes for projects after governance is on

- Project admins can no longer **create or edit** states, workflows, work item types, templates, automations, or recurring work items inside a project. Editing one returns a "managed at the workspace level" error.
- Projects **use** the workspace's shared configuration instead.
- **New projects** created after governance is on automatically use the workspace's shared configuration, resolving to the workspace **default workflow** for each work item type unless the workspace mandates or pins a different one.
- Work item types are enabled workspace-wide as part of governance.

## How projects use shared workflows

You control how much choice a project has over which workflow applies to each work item type. This is set **per work item type**, using a **governance mode**:

| Mode            | What a project admin can do                                                |
| --------------- | -------------------------------------------------------------------------- |
| **Any**         | Choose any active workspace workflow for that work item type.              |
| **Constrained** | Choose only from an **allowlist** of workflows you define for that type.   |
| **Required**    | No choice. The workspace mandates one workflow, and every project uses it. |

### Pins

In **Any** or **Constrained** mode, you can **pin** a specific project to a specific workflow. This forces that one project's choice while leaving other projects free to choose. Pins are removed automatically if the type is later switched to Required.

:::warning Setting a type to Required overrides all projects
Switching a work item type to **Required** locks every project to the single mandated workflow. Any project currently using a different workflow is moved to the mandated one, and existing per-project pins for that type are removed. Preview the impact before switching.
:::

### Effective workflow resolution

For any project and work item type, the workflow that actually applies (the **effective workflow**) is resolved in this order:

1. The project's **required** workflow, if the type is Required.
2. The project's **pin**, if one exists.
3. The project's **chosen** workflow (its pick), if set.
4. Otherwise, the **workspace default workflow**.

The effective workflow determines the starting state, which states allow creation, and the allowed transitions for work items of that type in that project.

### The project admin's view

From a project's work item type settings, a project admin sees, per type: a label showing whether the type is free to choose, **constrained** to an allowlist, **mandated** (required), or **pinned**; the current effective workflow and any workflows they may pick; and a **preview** of how existing work items would be remapped if they switch workflow, before applying the change.

If a project admin tries to change a workflow they are not allowed to change, they get an error: the workflow is mandated by the workspace, assigned by the workspace (pinned), or outside the allowed list.

:::warning Switching a workflow can move work items
When a project's effective workflow changes, work items whose current state is not part of the new workflow are moved to a fallback state. Always review the preview before confirming a workflow change.
:::
