---
title: Edit Microsoft Office Files
description: Edit Word, Excel, and PowerPoint files attached to a wiki page directly in your desktop Microsoft Office app, with changes saved back to Plane.
---

# Edit Microsoft Office Files <Badge type="warning" text="Enterprise Grid" />

You can edit Microsoft Office files that are attached to a **wiki page** without downloading them, re-uploading them, and losing track of versions. Plane opens the attachment in the **Microsoft Office desktop app** already installed on your computer, and when you save in Office, the changes are written straight back to the same attachment on the page.

This is real editing of the file in place, not a preview and not a separate copy. The attachment keeps its place on the page, and everyone sees the updated version.

## Requirements

- You need the **Microsoft Office desktop app** (Word, Excel, or PowerPoint) installed on your computer. Plane opens the file in that app; it is not an in-browser editor.
- You need a **desktop web browser**. This does not work on mobile.
- Your Plane site must be served over **HTTPS**. On Plane Cloud this is always the case. Self-hosted instances must be configured with HTTPS.

## Supported file types

Editing works with the standard Office formats:

- **Word:** `.doc`, `.docx`
- **Excel:** `.xls`, `.xlsx`
- **PowerPoint:** `.ppt`, `.pptx`

## Where it works

This feature is limited to **attachments on wiki pages**. Office files attached to work items or added to comments cannot be edited this way; they can still be downloaded and re-uploaded as usual.

## Edit a file

1. Attach an Office file to a wiki page, or open a page that already has one.
2. On the attachment, click **Edit**.
3. Your browser asks to open the file in the matching Microsoft Office app. Allow it.
4. The file opens in the desktop app. Make your changes and **save** in Office as you normally would.
5. Your saves are written back to the attachment in Plane. When you are done, close the file in Office.

You do not need to re-upload anything. The file on the page updates in place and keeps the same attachment.

## While you are editing

To prevent two people from overwriting each other, the file is **locked** while it is open for editing. During that time, another person cannot start editing the same attachment. The lock is released when you finish, and it also expires on its own after a period of inactivity, so a file is never left locked forever if an editing session is abandoned.

## Notes and limits

- **Desktop only.** Editing requires the desktop Office app and a desktop browser. There is no in-browser or mobile editing.
- **Your local Office app does the editing.** Plane does not convert the file or render it in the browser. It hands the file to Word, Excel, or PowerPoint on your machine over a secure connection, and commits your saves back.
- **The file stays the same file.** Edits keep the same attachment rather than creating a new copy, so links to it stay valid and its history stays in one place.
- **Wiki pages only.** Work item and comment attachments are not covered.
