---
title: Import data from CSV file
description: Import work items from CSV files to Plane using the Flatfile importer.
---

# Import your CSV data to Plane

The Flatfile importer provides a streamlined way to bring your work items into Plane from CSV files. With intelligent field mapping and data validation, you can migrate your data accurately and efficiently.

::: info
The Flatfile importer is only available on Plane Cloud. If you're using the self-hosted Commercial Edition, use the [CSV importer](/importers/csv) instead.
:::

## Import from CSV

> **Role**: Workspace admins

Here's how to get started:

1. Click your Workspace name at the top left on the sidebar.

2. Select **Settings**.

3. In the right pane, click **Imports**.

4. Look for the **Flatfile Importer** tile (marked Beta) and click the **Import** button.

   ![Flatfile Importer on Imports page](https://media.docs.plane.so/importers/flatfile/flatfile-imports-page.webp#hero)

5. **Configure your destination project**

   Select the Plane project where you want your CSV data to go. If you haven't created your destination project yet, you'll need to create it first before proceeding.

   ![Configure Plane project](https://media.docs.plane.so/importers/flatfile/configure-plane.webp#hero)

   Click **Next** to continue.

6. **Upload your CSV file**

   Click **Upload CSV** to begin the upload process.

   ![Upload CSV screen](https://media.docs.plane.so/importers/flatfile/upload-csv.webp#hero)

   You can either drag and drop your file onto the upload area, click to browse your files, or manually enter data if you prefer to input information directly.

   ::: tip Sample CSV template
   Download our [sample CSV file](https://media.docs.plane.so/importers/flatfile/flatfile-import-sample.csv) to see the correct format and field structure for importing your data.

   Make sure your CSV is properly formatted before uploading. Save your CSV file with UTF-8 encoding. Malformed rows or mismatched columns may cause individual rows to fail during import.
   :::

7. **Map your fields**

   The field mapping screen appears with two columns:
   - **INCOMING FIELDS** (left): Your CSV column headers
   - **DESTINATION FIELDS** (right): Corresponding Plane fields

   ![Map fields screen](https://media.docs.plane.so/importers/flatfile/map-fields.webp#hero)

   The importer automatically maps fields when column names match Plane's field names. You can adjust any mapping by clicking the dropdown next to each incoming field.

   Required fields are marked with an asterisk (\*).

   ::: warning User fields require email addresses
   For fields like **Assignees** and **Created By**, you must use email addresses rather than usernames. This ensures team members are correctly linked to their work items in Plane.
   :::

8. **Validate field values**

   For fields like State and Priority, you'll need to map your CSV values to valid Plane options:
   - The screen shows each unique value from your CSV under "Incoming Values"
   - Select the matching Plane value from the "Destination Values" dropdown
   - The mapping count shows your progress (e.g., "0 of 2 values mapped")

   ![Validate field values](https://media.docs.plane.so/importers/flatfile/validate-fields.webp#hero)

   Continue mapping until all values are matched to valid Plane options.

   Click **Continue** when all fields are properly mapped.

9. **Review your data**

   You'll see a table preview of your data with all mapped fields. This is your last chance to verify everything looks correct before import.

   ![Data preview table](https://media.docs.plane.so/importers/flatfile/data-preview.webp#hero)
   - Review each row to ensure the data appears as expected
   - Check that field mappings are correct
   - If something's not right, click **Back** to adjust your field mapping

   When you're satisfied, click **Submit** to start the import.

10. **Track your import**

    Once submitted, your import appears in the Migrations list with:
    - Status indicator (Finished, In Progress, or Failed)
    - Total batches and imported batches count
    - Start time
    - Options to **Re Run** or **Cancel** the migration

    ![Migrations list](https://media.docs.plane.so/importers/flatfile/migrations-list.webp#hero)

    For large datasets, the import might take a few minutes to process. You can monitor progress from this screen.

11. **Verify your data**

    After the import shows "Finished" status, navigate to **Work Items** in your Plane project to confirm your data imported successfully.

## Imported fields

When bringing your data from CSV into Plane, here's exactly what you can transfer over:

| Field          | Notes                                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------------- |
| Title          | Required for all items                                                                                      |
| Description    | Plain text only - any formatting, images, or tags will be imported as raw text                              |
| Work Item Type | Make sure the [Work item types](/core-concepts/issues/issue-types) feature is enabled in your Plane project |
| State          | Must map to valid states in your Plane project                                                              |
| Assignees      | **Must be email addresses**, not usernames - this is how Plane connects work items to users                 |
| Priority       | Must map to valid priority values in your Plane project                                                     |
| Created By     | **Must be email addresses** - allows Plane to track who originally created the item                         |
| Start Date     |                                                                                                             |
| Target Date    |                                                                                                             |
| Labels         |                                                                                                             |
| Cycle          |                                                                                                             |
| Module         |                                                                                                             |
| Created At     |                                                                                                             |

## Managing your imports

After completing imports, you can:

- **View import history**: All your imports appear in the Migrations list on the Flatfile Importer page.
- **Re-run imports**: Click **Re Run** if you need to import the same data again.
- **Cancel imports**: Use **Cancel** to stop an in-progress import.

This migration history helps you track when data was imported and troubleshoot any issues that arise.
