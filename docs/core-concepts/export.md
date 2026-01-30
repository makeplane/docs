---
title: Export work items from project
description: Export work items from Plane in CSV, Excel, or JSON formats for backup, analysis, or sharing.
---

# Export data

Plane allows you to export all your work items, from a single project or multiple projects, so you can access your data outside of Plane. You can export work items into CSV, Excel, or JSON formats.

## Export projects

> **Role**: Workspace Admins

1.  Go to your [Workspace Settings](/core-concepts/workspaces/overview#access-workspace-settings).
2.  In the left pane, select **Exports**.

    ![Export data](https://media.docs.plane.so/workspaces/export-data.webp#hero)

3.  **Select Project**  
    - Choose to export work items from all projects or a specific project using the dropdown.

4.  **Choose format**  
    You can export work items in one of the following formats: 
    - CSV: A plain text file with values separated by commas. 
    - Excel: A formatted spreadsheet file. 
    - JSON: A lightweight, machine-readable format.

5. **Apply filters**  
Narrow down your export by filtering work items based on available filters. 

6. **Click Export**    
This will package the export into a ZIP file.

::: info
Exporting large workspaces may take some time depending on the number of work items.
:::

7. **Download file**  
   You can view the history of your exports under **Previous exports**. For each export:

- You'll see its status (e.g., Queued, Completed).
- The date and the name of the user who triggered the export.
- The format used for the export.

Once completed, click **Download** to get your file. Use the **Refresh status** button to check for the latest updates.

::: warning
Exported files remain downloadable for a limited time (7 days). After this period, they will show as "Expired" and you'll need to create a new export.
:::

<div class="tag-wrapper">
  ## Custom exports
  <Tags :tags='[{ name: "Pro", link: "https://plane.so/pricing", additionalClass: "pro" }]' />
</div>

Export filtered work items, cycles, views, or modules directly from your project. Custom exports let you export exactly what you see after applying filters and display options—perfect for reports, analysis, or sharing specific data sets.

You can export data from:

- Work items: Export filtered work item lists from any view
- Cycles: Export work items within a specific cycle
- Modules: Export work items within a specific module
- Views: Export custom filtered views you've saved

### How to export

![Export work items](https://media.docs.plane.so/issues/export-work-items.webp#hero)

1. Navigate to the work items, cycle, module, or view you want to export.
2. Apply any filters or display options to narrow down your data.
3. Click the ⋯ (more options) menu in the top right.
4. Select **Export**.
5. Choose your format:
    - CSV: For spreadsheet applications.
    - JSON: For programmatic use or data processing.
6. Click **Continue** to download your file.

The exported file will include all visible work items based on your current filters and settings.