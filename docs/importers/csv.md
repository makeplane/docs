---
title: Import data from CSV file
description: Import work items from CSV files to Plane using the CSV Importer
---

# Import your CSV data to Plane

The CSV Importer lets you bring work items into Plane from a CSV file.

:::info
Plane also offers a [Flatfile Importer](/importers/flatfile) with interactive field mapping and inline editing. The Flatfile Importer is only available on Plane Cloud.
:::

## Prepare your CSV

Your CSV file should include columns for the fields you want to import.

[Download the sample CSV](https://media.docs.plane.so/importers/csv/plane_csv_sample.csv) to see the expected format, or use it as a starting point.

The expected columns are:

```csv
name,description_html,priority,start_date,target_date,state_group
Quarterly report,<p>Compile Q2 results for stakeholder review.</p>,high,2025-04-01,2025-04-10,started
Update vendor contracts,,medium,2025-04-05,2025-04-20,unstarted
Office supply restock,,low,,,backlog
```

:::tip
Save your CSV file with UTF-8 encoding.
:::

A few things to note:

- **description_html** supports HTML markup. Plain text works too, but wrap it in `<p>` tags if you want paragraph formatting preserved.
- **priority** accepts `urgent`, `high`, `medium`, `low`, or `none`.
- **start_date** and **target_date** use `YYYY-MM-DD` format.
- **state_group** maps to Plane's state groups: `backlog`, `unstarted`, `started`, `completed`, or `cancelled`.

:::warning
Make sure your CSV is properly formatted before uploading. Malformed rows or mismatched columns may cause individual rows to fail during import.
:::

## Import from CSV

> **Role**: Workspace Admin

1. Go to **Workspace Settings > Imports**.

2. Find the **CSV** tile and click **Import**.

   ![CSV Importer](https://media.docs.plane.so/importers/csv/csv-importer-landing.webp#hero)

3. On the **Select Project** step, choose the Plane project where you want to import your work items. The project must already exist — create it first if needed.

   ![Select project](https://media.docs.plane.so/importers/csv/select-project.webp#hero)

4. Click **Next**.

5. On the **Upload CSV** step, upload your CSV file by dragging it onto the upload area or clicking to browse.

   ![Upload CSV](https://media.docs.plane.so/importers/csv/upload-csv.webp#hero)

6. Click **Import CSV**.

The importer processes your file and creates work items in the selected project. You'll see the import job appear in the **Migrations** table with a status of **Transforming** while it's in progress.

Once complete, the status changes to **Finished**.

![Import finished](https://media.docs.plane.so/importers/csv/import-finished.webp#hero)

## View import summary

After an import finishes, click **Summary** in the Migrations table to download a JSON report. The report includes the total number of rows processed, how many were successfully imported, and how many failed. For failed rows, the report lists the specific errors so you can fix your CSV and re-import.

:::tip
The CSV Importer creates new work items on every import — it does not update existing ones. If you import the same file twice, you'll get duplicate work items.
:::

## Imported fields

| Column             | Notes                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------- |
| `name`             | Required. Used as the work item title.                                                        |
| `description_html` | Supports HTML markup. Plain text is also accepted.                                            |
| `priority`         | Accepts `urgent`, `high`, `medium`, `low`, or `none`.                                         |
| `start_date`       | Format: `YYYY-MM-DD`.                                                                         |
| `target_date`      | Format: `YYYY-MM-DD`. Used as the work item's due date.                                       |
| `state_group`      | Maps to Plane's state groups: `backlog`, `unstarted`, `started`, `completed`, or `cancelled`. |
