---
title: Running your project
description: Projects have states, labels, estimations along with integrations and automations which can be setup to run your project smoothly.
---

## Build project workflow with states

Work items within a project can transition through various states to reflect the progression of work in your project. This movement of work items through states constitutes the project workflow.

### State groups

Plane provides five sets of state groups to categorize all your project states:

- **Backlog**: Useful for work items not yet prioritized by project members. Work items in this group require more work or discussions before they move forward. Plane creates a default state in this group called "Backlog".
- **Unstarted**: Useful for work items planned to be picked up by project members. Work items in this state represent upcoming work for members. Plane creates a default state called "To-do" in this group.
- **Started**: Useful for work items picked up by project members. Work items in this state represent work that is currently happening in your project. Plane creates a default state called "In-progress" in this group.
- **Completed**: Work items in this state represent completed work in your project. Plane creates a default state called "Done" in this group.
- **Cancelled**: Work items in this state represent cancelled work in your project. Plane creates a default state called "Cancelled" in this group.

![Project state](https://media.docs.plane.so/projects/issue-states.webp#hero)

### Add, edit or remove states

Each state group can contain multiple states, which can be created and ordered according to your project's workflow. These options can be found under the States tab inside Project &gt; Settings.

To add a new state, click on the "+" button beside the state group of your choice. After adding the state, you can rearrange it with other states in the group.

![Project state](https://media.docs.plane.so/projects/project-new-state.webp#hero)

You can also choose to mark the state as the default for the project to ensure all new work items without a state are assigned to this state.

To remove a state, ensure no work items are assigned to the state you want to remove.

## Estimates

An ordered set of points, Estimates quantify the effort needed per work item using points you declare as a proxy.

### Set up estimates

By default, no estimate system is added to your project. Find the `Estimates` tab in `Project` / `Settings` to do that.

Start by choosing an estimate system from the two below.

- **Points**

  Use this if you prefer progressive numbers to estimate effort. You can choose from `Linear`, `Fibonacci`, or `Squares` or create your own progression with `Custom`.

- **Category**
  Use this if you would like to estimate effort by alphabetical text. Typical examples include T-shirt sizing or easy-to-hard estimate systems.

When you are done, you can turn on estimates by toggling on `Enable estimates for my project`. You can also change the type of the system by clicking the pencil icon next to each system you have set.

::: warning
In previous versions of Estimates we let you add more than one estimate system so you could switch between them. After overwhelming feedback to make it simpler for you, we now let you create one system per project. Inactive estimate systems from previous versions are now archived.
:::

## Manage labels

Similar to states, labels on projects aid in filtering, differentiating, and categorizing work items within your project. You can create and control as many work item labels as needed.

::: info
Labels can also be created directly from the work item detail page.
:::

You can access these options under the Labels tab inside Project > Settings.
![Project labels](https://media.docs.plane.so/projects/project-labels.webp#hero)

## Connect integrations

## Set up automations

Within your project, you can set up automations to perform the following tasks:

1. **Auto-archive closed work items**: You can configure an automation to archive work items that are closed in your project based on a customizable time period. Once set up, the automation will move all work items matching the time period to archives.
   ![Project archive automation](https://media.docs.plane.so/projects/auto-archive-closed-issues.webp#hero)
2. **Auto-close work items**: You can configure an automation to close work items that are open in your project based on a customizable time period. Once set up, the automation will move all open work items matching the time period to the selected closed state.
   ![Project close automation](https://media.docs.plane.so/projects/auto-close-issues.webp#hero)
