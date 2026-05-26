---
title: Work Item Types
description: Create specialized work item types in Plane with custom properties, icons, and colors for different teams and workflows to streamline project management.
---

# Project Work Item Types <Badge type="info" text="Pro" />

Every work item in Plane has a type. When you enable Work Item Types, Plane creates two types for your project automatically: **Task** (the default) and **Epic**. Work Item Types let you go further by creating named types like Bug, Story, or Feature Request with the exact custom properties each type needs.

A Bug might need Version, Environment, and Steps to reproduce. A Content Request might need Channel, Reviewer, and Go-live date. A Feature Request might need Business value and Customer impact. Once you define a type, those properties appear automatically on every work item of that type.

:::info
On the Enterprise Grid, types are managed at the workspace level rather than at the project level. See [Workspace Work Item Types](/work-items/workspace-work-item-types) for that configuration.
:::

<!--
<div style="position: relative; padding-bottom: calc(56.67989417989418% + 41px); height: 0; width: 100%">
  <iframe
    src="https://demo.arcade.software/V1jNWxXip4waqo9CgkO3?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
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

## Create work item types

::: warning
**Work Item Types cannot be disabled once turned on for a project.** The feature itself is irreversible, though individual types can be disabled at any time.
:::

> **Role**: Project Admins

![Work item types](https://media.docs.plane.so/work-item-types/work-item-types.webp#hero)

1. Click the … icon next to your project name on the sidebar and click **Settings**.
2. Select **Work item Types** in the settings panel. If Work Item Types haven't been enabled yet, you'll see the option to turn them on.
3. Click **Enable**. A confirmation prompt reminds you that this cannot be reversed. Confirm to proceed.
4. Two types appear in the list - the default **Task** type and an **Epic** type. You can now create additional types.
5. Click the **Add Work item Type** button to create a new work item type.
6. In the **Create work item type** modal, type name, and description, and choose a background color and an icon to represent the work item type. Click the **Create work item type** button.
7. Switch on the toggle button to allow users to select the work item type when creating work items and sub-work items.

### Examples of work item types

- _IT development teams_  
  `Bug` `Improvement` `Epic` `Story`

- _IT support teams_  
  `Incident` `Change` `Service request` `New feature`

- _Product management_  
  `Product launches` `User research` `Feature development` `Market analysis`

- _Production units (automobile)_  
  `Production planning`, `Material procurement`, `Quality control`, `Inventory management`

- _Design agencies_  
  `Revision requests` `Design drafting` `Client presentation` `Quality assurance`

## Add custom properties

> **Role**: Project Admins

You can add custom properties to all your work item types.

1. Under the work item type, click **Add New Property** to create custom fields.

   ![Add new property](https://media.docs.plane.so/work-item-types/add-new-property.webp#hero)

2. Specify values for **Title**, **Description** and **Property type** of the new property.
3. Select the **Mandatory property** checkbox if it's a required field. Select the **Active** checkbox to make the property visible in work items.
4. Click **Create** to add the property to the work item type.

::: warning
Before you delete properties, switch off the **Active** toggle button to avoid data loss.
:::

### Property types

Here's a list of all the property types and attributes that Plane provides for creating custom fields:

| Property&nbsp;type     | Attributes                               | Notes                                                                                                                                                                                                                   |
| ---------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Text**               | Single line, Paragraph, Read-only        | The **Read-only** attribute cannot be marked as mandatory. Enter text in the Read only data box for this option.                                                                                                        |
| **Number**             | Default value                            | An optional default value can be given to this property type.                                                                                                                                                           |
| **Dropdown**           | Single select, Multi select, Add options | Specify the values for the dropdown under **Add options**.                                                                                                                                                              |
| **Boolean**            | True/False                               | Default value is false. This attribute cannot be marked as mandatory.                                                                                                                                                   |
| **Date**               | Date Format                              | Consistent date format across all properties.                                                                                                                                                                           |
| **Member&nbsp;picker** | Single Select, Multi select              | Displays a list of all project members. Members selected via a member picker property are automatically added as subscribers to the work item, so they receive notifications for updates, comments, and status changes. |
| **Release picker** | One or more releases | Multi select |
| **URL** | | A URL field for linking to external resources. |

### Examples of custom properties

- _Product launch_  
  `Launch date` `Geography` `Budget` `Approval status` `Stakeholder`

- _Bug_  
  `Affected version` `Resolved version` `Environment` `Steps to reproduce` `Approval status` `Customer impact`

- _Final design approval_  
  `Final design files` `Approval checklist` `Client approval date` `Responsible person`

## Use work item types

Once the project Admin sets up the work item types any project member can use them when creating work items or sub-work items.

- In the **Create new work item** modal, the user can choose the desired work item type from the list at the top left corner. By default, the work item type `Task` is selected displaying both system-defined and custom properties.
- Changing the work item type will update the modal to display the relevant properties for that type.
- When a member picker property is filled in, the selected members are automatically subscribed to the work item. This means reviewers, stakeholders, or anyone added through a member picker stay informed without needing to be manually subscribed.
- The system ensures that all properties marked as mandatory are filled before creating the work item.

  ![Use work item types](https://media.docs.plane.so/work-item-types/use-issue-types.webp#hero)

When viewing work items, the work item type is displayed with an icon near the title for easy identification. Any custom properties added will also appear in the list of properties, and changes to these values are tracked in the work item's activity trail.

### Switch work item types

You can easily switch the work item's type at any time. Just follow these steps:

1. Open the work item you’d like to update.
2. Hover over to the right of the work item ID and click **Switch work item type**. Alternatively, you can click **Edit** from the work item's ellipsis (•••) menu to open the **Update work item** modal directly.

   ![Switch work item type](https://media.docs.plane.so/work-item-types/switch-issue-type.webp#hero-tl)

3. Choose the new work item type from the dropdown next to your project name.

4. Click **Update** to save your changes.

### Bulk update work item types

You can change the work item types for several work items at once. Here’s how:

1. Switch to the **Table** layout in the Work Items page.
2. Select the work items you want to update. A bulk operations bar appears at the bottom of the screen.
3. Select the new type. An **Update** button appears.
4. Click **Update**.

## Set the default work item type

The default work item type is pre-selected whenever someone creates a new work item. Initially this is set to the built-in `Task` type, but you can change it to any active work item type.

1. Navigate to **Project Settings → Work item Types**.
2. Click the **…** menu next to the work item type you want to make the default.
3. Select **Set as default**.

The selected type now shows a **Default** badge and is automatically pre-selected in the Create new work item modal. You can change the default at any time by repeating these steps for a different type.

## Edit or delete work item types

To modify an existing work item type, click the **…** menu next to it and select **Edit**. You can update the name, description, icon, and background color.

To remove a work item type, click the **…** menu and select **Delete**. Existing work items of that type are not deleted — they retain the type until individually changed.

## Disable work item types

Disabling a type hides it from the type selector when creating new work items. Existing work items of that type are not affected.

1. Go to **Project Settings → Work item Types**.
2. Find the type you want to pause.
3. Toggle off the **Active** switch next to it.

To re-enable, toggle it back on.

:::info
The default type cannot be disabled.
:::
