---
title: Create and manage projects
description: Create and manage projects, configure settings, add team members, and enable features.
---

# Create and manage projects

Projects organize your team's work within a workspace. Each project contains work items, cycles, modules, pages, and other resources needed to accomplish your goals.

## Create a project

**Quick access:** Press `P` from anywhere in Plane.

1. Navigate to **Projects** in the sidebar.
2. Click **Add Project**.
3. Fill in the project details (described below).
4. Click **Create project**.

![Create project](https://media.docs.plane.so/projects/create-project.webp#hero)

**Project details:**

- **Project name** (required)  
  Give your project a clear and meaningful name that helps your team identify what it's for.

- **Project identifier** (required)  
  This is a unique code that gets attached to every work item in the project (for example, PROJ-123, DEV-456). The identifier makes it easier to track and reference work items across your workspace. You can update this identifier later in project settings if needed.

- **Description** (optional)  
  Provide a brief description to help your team understand what the project is about and what goals it serves.

- **Access** (required)  
  Choose whether the project is **Private** or **Public**. This determines who can see and join the project. See [Set project visibility](#set-project-visibility) below for details on each option.

- **Lead** (optional)  
  You can designate a lead for the project. This person will be the go-to for queries related to the project's execution and can help guide the team's work.

Your new project appears in the sidebar and you're taken to the project dashboard. All project details can be edited later under the **General** tab in project settings.

## Set project visibility

Choose who can access your project when creating it or change visibility later in settings.

### Public projects

**Who can access:**
- All workspace members (Admins and Members)
- Guests cannot access public projects unless explicitly invited to them

**Who can join:**
- Any workspace member can discover and join public projects on their own
- No invitation required for members to join

**Best for:**
- Company-wide initiatives where everyone should have visibility
- Shared resources or documentation that benefits the entire team
- Cross-team collaboration projects
- Open projects where transparency and broad participation are valuable

### Private projects

**Who can access:**
- Only members who have been explicitly invited to the project
- Workspace Admins automatically have access to all private projects

**Who can join:**
- Only Project Admins can add new members to the project
- Members must receive an invitation and cannot join on their own

**Best for:**
- Confidential or sensitive work that needs restricted access
- Client projects where only specific team members should have visibility
- Small team projects where you want to control exactly who participates
- Projects requiring tight access control for security or privacy reasons

**Change visibility**
1. Open **Project Settings** (click **…** next to project name in sidebar).
2. Navigate to **General** tab.
3. Change **Access** setting to Public or Private.
4. Save changes.

::: warning
When you change a project from Private to Public, it becomes visible to all workspace members immediately. Make sure this is what you want before making the change, as you cannot undo the visibility that members gained.
:::

## Configure project settings

Access project settings to modify project details, manage members, and configure features.

1. Click the **…** icon next to your project name in the sidebar.
2. Select **Settings**.

![Project settings](https://media.docs.plane.so/projects/project-settings.webp#hero-bl)

**Available settings tabs:**

- **General** - Edit project name, identifier, description, visibility, lead, and timezone
- **Members** - Manage project members, their roles, and invite new members
- **Features** - Enable or disable project features like cycles, modules, pages
- **States** - Configure work item states and workflows
- **Labels** - Create and manage labels for organizing work items
- **Estimates** - Set up your estimation system for work items
- **Automations** - Configure automated actions and rules

## Set project timezone

Each project can have its own timezone setting, which is independent of individual member timezone preferences. Only Project Admins can change the project timezone.

1. Navigate to **Project Settings**.
2. Go to **General** tab.
3. Select your desired timezone from the dropdown.
4. Save changes.

**What the project timezone affects**
- Cycle start and end dates and times
- Project-level date displays in the interface

**How timezone works for members**  
While the project has its own timezone, individual members will see cycle and module times converted to their personal timezone (set in their [Account preferences](/core-concepts/account/settings#timezone-and-language)). 

For example, if a cycle is set to end at 5:00 PM in the project timezone (Pacific), a member in Eastern timezone will see the cycle ending at 8:00 PM their time. This ensures everyone sees times in their local timezone while maintaining consistent scheduling across the project.

## Enable project features

Control which features are available in your project based on how your team works. You can enable only the features you need and keep your project interface clean and focused.

1. Navigate to **Project Settings**.
2. Go to **Features** tab.
3. Toggle each feature on or off as needed.
4. Changes take effect immediately.

![Project features](https://media.docs.plane.so/projects/project-features.webp#hero)

**Available features**

- **Cycles**  
Timebox your work items into sprints or iterations. Cycles help you organize work into manageable time periods, track progress over defined intervals, and build momentum with regular delivery cadence. Perfect for agile teams running sprints.

- **Modules**  
Group related work items together logically. Modules help you organize large projects into manageable components or features, making it easier to track progress on specific parts of your project. Useful for breaking down complex work into logical groupings.

- **Views**  
Create custom filtered views of your work items and save them for quick access. Views let you define specific filters, sorts, and display options, then save them so you and your team can quickly access frequently-used perspectives on your work.

- **Pages**  
Document project information, create guides, and build knowledge bases. Pages provide a space for your team to collaborate on documentation, meeting notes, specifications, and any other written content related to your project.

- **Intake**  
Capture incoming requests from team members, stakeholders, or guests. The Intake feature provides a way to collect, review, and triage requests before adding them to your project backlog. Useful for managing feature requests, bug reports, and ad-hoc work requests.

- **Time Tracking**  
Log time spent on work items and track effort across your project. Time tracking lets team members record hours worked on specific work items and provides reports on time spent. You can download worklog data for analysis or billing purposes.

## Archive a project

Archive projects you're no longer actively working on but want to keep for reference or historical purposes.

1. Navigate to **Project Settings**.
2. Scroll to the bottom of the **General** tab.
3. Click **Archive project**.
4. Confirm the action.

**What happens when you archive:**
- The project is removed from your sidebar to reduce clutter.
- The project remains fully accessible in the **Archived projects** section.
- The project can be restored at any time with all data intact.
- The project no longer appears in workspace search results or active project lists.

## Restore archived projects
1. Navigate to **Projects** in the sidebar.
2. Scroll to the bottom to find the **Archived projects** section.
3. Click **Restore project** on any archived project.
4. The project returns to your active project list in the sidebar

![Archived Projects](https://media.docs.plane.so/projects/archived-projects.webp#hero-bl)

## Delete a project

Permanently remove a project and all its data from your workspace. Use this when you're certain you no longer need the project or any of its contents.

::: warning
Deleting a project is permanent and cannot be undone. All work items, cycles, modules, views, pages, and other project data will be permanently deleted. Plane does not provide any way to recover a deleted project, so make sure you're certain before proceeding.
:::

**Before deleting, consider:**
- Exporting any data you might need to keep for records or future reference
- Notifying all project members that the project will be deleted
- Archiving the project instead if you might need it later

**To delete a project:**
1. Navigate to **Project Settings**.
2. Scroll to the bottom of the **General** tab.
3. Click **Delete project**.
4. Confirm deletion by typing the exact project name as prompted.
5. Click the final **Delete** button.

## Troubleshooting

### Unable to create new projects

When attempting to create a new project, the page auto-refreshes, but no project is created.

This issue typically occurs in **self-hosted instances** when the Unsplash API key configured in your instance has expired or is invalid.

Update the [Unsplash Access key](https://developers.plane.so/self-hosting/govern/instance-admin#images-in-plane) in God mode to resolve this issue.
