---
title: Organize related work items with Epics
description: Create and manage Epics in Plane to organize related work items, track progress across multiple tasks, and align your team around larger objectives.
---

# Organize related work items with Epics
<div class="tag-wrapper">
  # Organize and track your work items with Epics
  <Tags :tags='[{ name: "Pro", link: "https://plane.so/pricing", additionalClass: "pro" }]' />
</div>

Epics help you group related tasks into a larger work item, providing a hierarchical structure for managing complex projects. This feature is ideal for breaking down major objectives into smaller, manageable pieces while keeping everything organized within a project.

Use Epics when you need to:

- Organize tasks related to a larger objective or feature.
- Track progress and dependencies across multiple related work items.
- Improve visibility into how individual tasks contribute to broader goals.

::: tip
Use an Epic for larger bodies of work that span multiple cycles and extend across different modules.
:::

## Turn on Epics

![Enable Epics](https://media.docs.plane.so/epics/enable-epics.webp#hero)

To start using Epics, turn on the feature for your project:

1. Go to the [Project settings](/core-concepts/projects/overview#configure-project-settings) for the desired project.
2. Navigate to the **Epics** section on the right pane.
3. Click the **Enable** button.

Once turned on, the Epics tab will appear in the project's sidebar, giving you quick access to create and manage Epics.

## Add custom properties to Epics

Custom properties allow you to add specialized fields to your Epics, helping you track additional information specific to your project's needs. These properties can be configured to capture various types of data.

![Add custom properties](https://media.docs.plane.so/epics/add-custom-properties.webp#hero)

To add custom properties to an Epic:

1. Click the **Add new property** button on the Epics pane.
2. In the **Custom Properties** section, fill in the following fields:
   - **Title**: Enter a name for your property
   - **Description**: Add details about what this property represents
   - **Property type**: Select from the available options:
     - **Text**: For free-form text input
     - **Number**: For numerical values
     - **Dropdown**: For predefined selection options
     - **Boolean**: For yes/no or true/false values
     - **Date**: For temporal information
     - **Member picker**: For assigning team members

## Create Epics

![Create Epics](https://media.docs.plane.so/epics/create-epics.webp#hero)

Follow these steps to create a new Epic:

1. Navigate to the **Epics** section under your project.
2. Click the **New Epic** button at the top right of the screen.
3. Provide the following details:
   - **Title**: Name your Epic.
   - **Description**: Add context for the Epic’s purpose.
   - **Properties**: Assign metadata like priority, assignees, labels, and due dates.
4. Click **Save** to create the Epic.

## View and manage Epics

Once created, all Epics can be accessed from the **Epics** section under your project. The Epics screen provides a high-level view of all Epics within a project.

![Epics screen](https://media.docs.plane.so/epics/epics-screen.webp#hero)

::: tip Sort and filter Epics
To help you manage Epics effectively, Plane offers flexible sorting and filtering options.
:::

Clicking on an Epic opens a detailed view where you can quickly view and manage an Epic without leaving your current context.

## Add work items to Epic

![Add work items to Epic](https://media.docs.plane.so/epics/add-issues.webp#hero)

You can add existing work items to the Epic or create new ones directly from the Epic.

::: warning important
A work item can belong to only one Epic. This ensures clarity in organization and avoids overlapping tasks across multiple Epics.
:::

<div class="tag-wrapper">
  ## Duplicate Epics
  <Tags :tags='[{ name: "Pro", link: "https://plane.so/pricing", additionalClass: "pro" }]' />
</div>
When you need to create similar Epics or replicate an Epic's structure across projects, Plane allows you to duplicate existing Epics either within the same project or to different projects in your workspace.

To duplicate an Epic, click the ••• menu in the Epic header and select Make a copy. You'll see two options:

### Copy in same project
Creates an identical Epic within the current project with all the same properties, description, and custom field values. The new Epic gets a fresh identifier and maintains the same title, description state, priority, start and due dates.

### Copy in different project
Duplicates the Epic to another project in your workspace that has Epics enabled. This is particularly useful when you have similar large-scale objectives across multiple projects or want to replicate Epics between projects. The copied Epic adapts to the destination project's identifier format and default state.

## Work items list and relations

![Work items and Relations](https://media.docs.plane.so/epics/issues-and-relations.webp#hero)

- See the full list of work items grouped under the Epic.
- Add or remove work items from the Epic.
- Manage work items directly by updating their status, assignee, or priority.

## Epic progress

![Epic progress](https://media.docs.plane.so/epics/epic-progress.webp#hero)

You can track Epic progress visually with a color-coded progress bar that shows:

- Task completion status (e.g., Backlog, Started, Completed).
- Work item counts and completion percentage for each status category.

## Epic updates

Share epic status using updates. This helps keep your team informed and create a timeline of epic progress.

1. Select the tab with rocket icon in the side panel.
2. Click the **Add Update** button.
3. Select the status. Each update can be marked as:
   - 🚀 **On Track** - Epic is progressing as planned
   - ⚠️ **At Risk** - There are potential work items that need attention
   - ❗ **Off Track** - Epic has significant blockers or delays
4. Add your update message.
5. Click **Add update**.

![Add epic updates](https://media.docs.plane.so/epics/add-epic-updates.webp#hero-tr)

### Collaborate on updates

- Start threaded discussions around specific updates or tasks.
- Use emoji reactions for quick feedback.

## Properties, comments, and activity

- View and update the Epic’s key properties like assignee, priority, timelines, and other custom properties.
  
  ![Epic properties](https://media.docs.plane.so/epics/epic-properties.webp#hero-tr)

- Add comments to collaborate with your team and to discuss progress, blockers, or updates.
  
  ![Epic comments](https://media.docs.plane.so/epics/epic-comments.webp#hero-tr)
- Access the activity log for a history of changes made to the Epic, ensuring transparency and accountability.
  
  ![Epic activity](https://media.docs.plane.so/epics/epic-activity.webp#hero-tr)

## Link Work items to Epics

For each work item, you can assign or change a work item's Epic directly in the **Parent** property.

![Link Work items to Epics](https://media.docs.plane.so/epics/link-issue-epic.webp#hero)

<div class="tag-wrapper">
  ## Convert Epics to Work Items
  <Tags :tags='[{ name: "Business", link: "https://plane.so/pricing", additionalClass: "business" }]' />
</div>

Sometimes you realize that what you thought was a big, complex epic is actually something smaller and more focused. That's where converting an epic to a work item comes in handy. This feature lets you transform an epic into a regular work item, making it easier to track and manage as a single deliverable rather than a collection of tasks.

![convert epic to work item](https://media.docs.plane.so/issues/convert-epic-to-work-item.webp#hero-tr)

From any epic, look for the conversion option in the interface. Click **Convert to work item** and the system will transform your epic while preserving all the important details like title, description, and basic properties.

You can also [convert Work items to Epics](/core-concepts/issues/overview#convert-work-items-to-epics).

---

Epics provide a simple yet powerful way to manage larger goals while keeping your projects organized and your team aligned.
