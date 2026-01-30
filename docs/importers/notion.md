---
title: Import data from Notion
description: Import data from Notion to Plane.
---

<div class="tag-wrapper">
# Import your Notion data to Plane
<Tags :tags='[ 
    { name: "Business", link:"https://plane.so/pricing", additionalClass: "business" }
  ]' />
</div>

The Notion to Plane importer lets you transfer your Notion pages and content to Plane's Wiki. This is useful when you want to bring your documentation, notes, and structured content from Notion into your Plane workspace as Wiki pages.

The importer takes exported Notion content and converts it into Plane wiki pages. It preserves your page structure, including subpages, and maintains the hierarchical organization of your Notion workspace within Plane's wiki system.

## Export your Notion content

1. Open the Notion page you want to export.
2. Click the three-dot menu (⋯) in the top-right corner of the page.
3. Select **Export** from the dropdown menu.
4. In the export dialog:
  - **Export format**: Choose **HTML**
  - **Include databases**: Select **Current view**
  - **Include content**: Choose **Everything**
  - **Include subpages**: Toggle this **ON**
  - **Create folders for subpages**: Toggle this **ON**
  - **Export comments**: Toggle this **OFF** (unless you want comments included)

  :::info
  Only HTML exports from Notion are supported. Make sure to select HTML as your export format.
  :::

5. Click **Export**.
6. Notion will generate a ZIP file containing your exported content.

## Import Notion content

    ![Import from Notion](https://media.docs.plane.so/importers/notion/import-notion.webp#hero)

Once you have your exported ZIP file:

1. Go to your Workspace Settings.

2. Select **Imports** on the left pane and click **Import** next to Notion.

3. On the Notion import page, click **Upload Notion Exported ZIP**.
4. Select and upload the ZIP file you exported from Notion.
    
    ![Upload notion file](https://media.docs.plane.so/importers/notion/upload-notion-file.webp#hero)

5. Wait for the upload to complete. You'll see a "Upload complete!" message.
6. Click **Start Import** to begin processing your Notion data.
7. The import will process in phases. Once finished, the status will change to "Finished".

    ![Notion file uploaded](https://media.docs.plane.so/importers/notion/notion-file-uploaded.webp#hero)

8. After the import completes, your Notion pages will be available in Plane's **Wiki** section. The page hierarchy from Notion will be preserved, with main pages and their nested pages organized in the same structure.

## Imported blocks

Here's how different Notion elements are handled during import:

| Notion | Plane |
|----------------|--------------|
| Markdown | Markdown |
| Videos | Links |
| Embeds | Links |
| Attachments | Links |
| Text and background colors | Text and background colors |
| Page icons | Page icons |
| Page banner | Not imported |
| Links | Links |
| Subpages | Nested pages |
| Page mentions | Links |
| User mentions | Text (Not imported) |
| Table background colors | Not imported |
| Block highlight | Text Highlight (not supported) |
| Columns | Rendered vertically (not supported) |
| Comments | Not supported |
| Databases | Tables |