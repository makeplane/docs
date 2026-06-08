---
title: Work items in the Plane mobile app
description: Create, track, and update work items on mobile, including properties, relations, sub-work items, links, attachments, comments, and activity.
---

# Work items

Work items are the core unit of work in Plane. On mobile you can create them, update every property, link them to other items, attach files, and follow the full activity history. To learn the concepts behind work items, see [Manage work items](/core-concepts/issues/overview) on the web.

## Create a work item

Tap **Create** in the navigation bar and choose **Work item**, or use the **Create** button inside a project.

1. Select the project from the project name at the top.
2. Add a **title** and a **description**. Use the toolbar to format the description and add content blocks.
3. Tap the **+** icon at the bottom left to set properties such as assignees, priority, state, dates, cycle, module, and labels.
4. Tap **Create** to add it to the project.

<div class="mobile-img-container">
  <div class="box">
    <img src="https://media.docs.plane.so/mobile/app-create-issue.webp" alt="Create a work item" width="320" />
  </div>
  <div class="box">
    <img src="https://media.docs.plane.so/mobile/app-issue-properties.webp" alt="Work item properties" width="320" />
  </div>
</div>

## Browse and organize the list

Open a project and tap **Work items** to see its list.

Use the Filters and Display buttons at the top of the tab to shape the list:

- **Filter** by priority, state, assignees, created by, and labels.
- **Display** to choose which properties show on each card, such as priority, state, assignee, and work item ID.
- **Group by** state, priority, assignee, labels, or none.
- **Order by** manual, last created, last updated, or start date.
- **Search** to find a work item by title.

<div class="mobile-img-container">
  <div class="box">
    <img src="https://media.docs.plane.so/mobile/app-issues.webp" alt="Work items list" width="320" />
  </div>
  <div class="box">
    <img src="https://media.docs.plane.so/mobile/app-issue-details.webp" alt="Work item details" width="320" />
  </div>
</div>

## Update properties

Open a work item to view and edit its details. In the **Properties** section, tap a property card to update values such as priority, state, start date, target date, cycle, and module. You can also tap a property chip for quick access and editing.

From the same screen you can:

- Edit the **title** and the **description**.
- Set **assignees** and **labels**.
- Add the item to a **cycle** or one or more **modules**.

For the full list of properties and what they mean, see [Work item properties](/core-concepts/issues/properties), [states](/core-concepts/issues/states), and [labels](/core-concepts/issues/labels).

::: tip
Most property changes are available from `v1.7.0` on self-hosted instances. On older versions, some edits are read-only on mobile.
:::

## Sub-work items and relations

Tap **+ Add** at the bottom right of a work item to break work down and connect it to other items. Scroll through the detail screen to access the sub-work items, relations, links, pages, and attachments sections.

- **Sub-work items** are child items that roll up under this one. Add new ones or link existing work items.
- **Relations** connect this item to others by type, including relates to, blocking, blocked by, duplicate of, starts before, starts after, finishes before, finishes after, implements, and implemented by.

## Links, pages, and attachments

- **Links.** Add a URL with an optional display title to point to anything outside Plane.
- **Pages.** Link Plane pages to a work item so related notes and docs stay together.
- **Attachments.** Attach photos or documents. Choose **Photos** to pick images or **Document** to select a file, then upload. You can download an attachment to your device or remove it.

## Comments and reactions

Open the **Comments** section to discuss a work item with your team.

- Add a comment using the rich text editor.
- Reply in a thread to keep conversations organized.
- React to a comment with an emoji.
- Copy a comment’s text, copy or share its link.

::: info
Comment reactions are available from self-hosted `v1.11.0`.
:::

## Activity

Every change to a work item is recorded in **Activity**. Filter the feed to see **All** entries, just **Updates** (property changes), or just **Comments**. The feed captures who created the item, property changes, cycle and module changes, relation changes, attachments, and archive or restore actions.

## Share and more actions

From a work item you can:

- **Copy link** to the work item.
- **Share link** through your device's share sheet with a personalized message.
- **Delete** the work item if you have permission. Deleting removes all of its data and cannot be undone.

