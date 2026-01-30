---
title: Import data from ClickUp
description: Import work items from ClickUp to Plane.
---
# Import your ClickUp data to Plane

The ClickUp importer helps you transfer your project data from ClickUp to Plane. It pulls information from your ClickUp workspace and maps it to the corresponding structure in Plane. This includes your projects, tasks, team members, custom fields, attachments, and comments.

## Prerequisites

- A ClickUp Personal Access Token from your ClickUp App Settings.
- ClickUp Lists organized within Folders.

::: tip
To import custom task types from ClickUp, make sure the [Work item types](/core-concepts/issues/issue-types) feature is enabled in your Plane project.
:::

## Import from ClickUp
> **Role**: Workspace admins

    ![Import from ClickUp](https://media.docs.plane.so/importers/clickup/import-clickup.webp#hero)
1. Go to your Workspace Settings.
   
2. Select **Imports** on the left pane and click **Import** next to ClickUp.

    ![Personal access token](https://media.docs.plane.so/importers/clickup/personal-access-token.webp#hero)

3. Enter your ClickUp Personal Access Token on the Migration Assistant page. If you don't have one, go to your ClickUp settings under **Apps** to generate it. Click **Connect ClickUp** after entering the token.

4. Choose what to import:
    
    ![Configure ClickUp](https://media.docs.plane.so/importers/clickup/configure-clickup.webp#hero)
    1. Select your ClickUp team (workspace).
    2. Pick your ClickUp space.
    3. Choose the folders to migrate.
    4. Check "Import comments and attachments" if you want these included.
    5. Click **Next** to continue.

5. Match your ClickUp priorities to Plane priorities using the dropdown menus. This keeps your task prioritization consistent after migration.
  
    ![Map priorities](https://media.docs.plane.so/importers/clickup/map-priorities.webp#hero)

6. Review the mappings and make any changes if needed. Click **Back** to adjust.

7. You can check "Skip importing User data" if you don't want to migrate user information and manually add them later.
    :::warning
    If you skip user import, work items and comments will show the name of the person who performed the migration, and the Assignees field will be empty.
    :::

9. Click **Confirm** to start.

    The migration runs in batches with real-time status updates. You'll see progress indicators and can cancel if needed. Migration time depends on your data size rate limits.

10. After completion, review your imported projects in Plane. Check that work items, modules, and custom fields transferred correctly.

## Data mapping

Here's how your ClickUp structure converts to Plane:

| ClickUp | Plane |
|---------|--------|
| Users | Members |
| Folders | Projects |
| Lists within folders | Modules within projects |
| Tasks | Work items |
| Custom task types | Work item types |
| Custom fields | Custom properties at project level |
| Task attachments | Work item attachments |
| Task comments | Work item comments |
| Task data | Work item data |

### Supported custom fields

The importer handles these custom field types:

- User fields
- Short text and textarea fields
- Date fields
- Checkboxes
- Dropdowns
- Numbers
- Email, phone, and website fields

## Sync ClickUp to Plane

After the import, if there are any new or updated issues in ClickUp, you can easily sync these changes to Plane:

![Rerun import](https://media.docs.plane.so/importers/clickup/rerun-import.webp#hero)

1. Go to **Workspace settings**.
2. Select **Imports** on the left pane.
3. Click the **Re run** button next to the project you want to sync.

