---
title: Editor blocks for pages
description: Explore all available content blocks in Plane's Page editor.
outline: 2
---

# Editor blocks

List of all the content blocks available in the page, description and comment editors.

## Text

The standard block for paragraph text and general content.

## Headings (H1 - H6)

Organize your content hierarchically using six heading levels:

- **H1**: Main page title (use only once per page)
- **H2**: Primary sections
- **H3**: Subsections
- **H4-H6**: Further content subdivision when needed

## To do

Adds checkable items for tracking tasks and their completion status.

## Bullet list

Creates unordered lists for items where sequence doesn't matter.

## Numbered list

Creates ordered lists when sequence or priority matters.

## Table

Organizes information in rows and columns for structured data presentation.

## Quote

Highlights quoted text or important statements with distinct formatting.

## Code

Displays code snippets or command-line text with proper formatting and syntax highlighting.

## Embed <Badge type="info" text="Pro" />

Seamlessly integrate external content directly into your documents with rich, interactive embeds. The embed feature supports a wide variety of platforms and content types, making it easy to enhance your documentation with multimedia and interactive elements.

![Embed](https://media.docs.plane.so/pages/external-embeds.webp#hero)

Use the `/embed` slash command to quickly insert an embed block.

This opens an embed dialog where you can paste any supported link. The system automatically detects the content type and creates an appropriate embed with a rich preview. This eliminates the need for users to navigate away from your content to view referenced materials.

## Embed Dashboard widget <Badge type="warning" text="Enterprise Grid" />

Embed a live dashboard widget directly in a page. Instead of linking out to a dashboard, you bring a single chart, table, or metric from an existing dashboard into your page. It renders inline and stays in sync with your data.

Type `/` in the editor and search for **Link dashboard widgets** to insert a dashboard widget block.

When you insert the block, a selector opens where you choose a dashboard and then pick the specific widget you want to embed. The widget appears inline in your page.

You can change the widget at any time by hovering over the block and clicking **Change widget**. To remove it, click **Delete** from the block menu.

:::tip
You need at least one dashboard with widgets already set up before you can embed one in a page. See [Dashboards](/dashboards) to get started.
:::

## Image

Inserts and displays images within your content.

## Attachment <Badge type="info" text="Pro" />

Uploads and embeds files directly into your content, supporting documents, images, and other file types up to 100MB each.

#### Show video preview

When you upload video files as attachments, you can display them with inline playback controls. Just hover over the block and click the **⋮⋮** icon that appears. Select **Show preview** to convert the file link into an embedded video player. This works for all supported video formats.

![Show preview](https://media.docs.plane.so/pages/show-preview.webp#hero)

## Columns <Badge type="info" text="Pro" />

Organize content side-by-side using multi-column layouts. Columns help you create visually structured pages for comparisons, parallel information, or more efficient use of horizontal space.

![Columns](https://media.docs.plane.so/pages/columns.webp#hero)

Use the slash command to insert the layout you need:

- `/2 Columns`
- `/3 Columns`
- `/4 Columns`

Each column appears with an "Add content" placeholder where you can add any block type - text, lists, code, images, and more.

## Tabs <Badge type="tip" text="Business" />

Tabs let you organize content into a tabbed block within a page, so related sections can share one space and readers switch between them instead of scrolling. You can lay tabs out horizontally (along the top) or vertically (down the side).

### Insert tabs

Type `/tabs` in the editor and choose one of:

- **Horizontal tabs** - the tab labels run along the top of the block.
- **Vertical tabs** - the tab labels run down the side of the block.

A new block is inserted with two tabs, named "Tab 1" and "Tab 2". Each tab holds its own content, and you can put any editor content inside a tab, including text, lists, images, and other blocks.

### Rename a tab

Double-click a tab label, type the new name, and press Enter (or click away) to save.

### Change the layout

While editing, use the layout controls on the block to switch between horizontal and vertical orientation at any time. Your tabs and their content are preserved.

### Notes

- Tabs cannot be nested. You cannot insert a tabs block inside another tabs block.
- In read-only or published pages, readers can switch between tabs but cannot add, rename, delete, or edit them.

## Video <Badge type="info" text="Pro" />

Embeds video content directly into your pages for rich multimedia documentation.

![Embed videos](https://media.docs.plane.so/pages/embed-videos.webp#hero)

Type `/video` to insert a video block, then upload a video file. The video appears inline with playback controls, allowing viewers to watch without leaving the page. Supported video formats include MP4, MPEG, OGG Video, WebM, QuickTime, AVI, and WMV.

#### Show as attachment

If you have a video displayed with inline preview and want to convert it to a simple file link, hover over the video block and select **Show as attachment** from the actions menu. This collapses the video player into a compact attachment link.

![Show as attachment](https://media.docs.plane.so/pages/show-as-attachment.webp#hero)

## Math equations <Badge type="tip" text="Business" />

Add mathematical expressions and formulas to your Pages using LaTeX syntax. Whether you need to document complex calculations, display statistical formulas, or include scientific notations, Plane supports both inline and block-style mathematical equations. This is perfect for technical documentation, engineering specs, data analysis reports, and any content requiring precise mathematical notation.

![Math equations](https://media.docs.plane.so/pages/math-equations.webp#hero)

### Block equation

Creates standalone mathematical expressions using LaTeX syntax. Block equations are displayed on their own line with centered formatting, perfect for formulas, theorems, and complex mathematical statements that need emphasis.

Use the `/blockequation` slash command:

```
\lim_{x \to \infty} \frac{1}{x} = 0
```

Or use double dollar syntax:

```latex
$$ \int_a^b f(x)\,dx = F(b) - F(a) $$
```

### Inline equation

Embeds mathematical expressions within regular text flow using LaTeX syntax. Inline equations maintain the same text baseline, allowing you to seamlessly integrate mathematical notation into sentences and paragraphs.

Use the `/inlineequation` slash command:

```
\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i
```

Or use single dollar syntax:

```latex
$ a^2 + b^2 = c^2 $
```

Both equation types support full LaTeX rendering with built-in validation and error handling for invalid mathematical expressions.

## Draw.io diagrams <Badge type="tip" text="Business" />

::: tip Prerequisites
Before you can add Draw.io diagrams to Pages or Wiki, you need to [connect the Draw.io integration](/integrations/draw-io) from Workspace Settings.
:::

Create and manage interactive diagrams and whiteboards directly within your Pages using the integrated Draw.io editor. Whether you need professional flowcharts, system architecture diagrams, or freehand sketches for brainstorming, the diagram feature provides powerful visual documentation capabilities without leaving Plane.

![Draw.io diagram](https://media.docs.plane.so/pages/draw-io-diagram.webp#hero)

### Diagram

Create professional diagrams, flowcharts, and visual documentation using the full Draw.io editor with comprehensive shape libraries. Perfect for technical documentation, process flows, system architecture, network diagrams, and organizational charts.
Use the `/diagram` or `/drawio-diagram` slash command to insert a diagram block. Click the placeholder to launch the Draw.io editor.

### Board

Create whiteboards with freehand drawing and sketching capabilities using a simplified interface. Ideal for brainstorming sessions, quick mockups, concept visualization, and collaborative ideation.
Use the `/board` or `/drawio-board` slash command to insert a whiteboard block. Click the placeholder that says "Click to start editing whiteboard" to launch the board interface.

Both modes feature a consistent toolbar with **Save** and **Exit** buttons, making it easy to preserve your work and return to your Page. All diagrams are fully interactive—simply click any saved diagram to edit it again.

## HTML artifact <Badge type="tip" text="Business" />

An HTML artifact embeds a self-contained HTML file as a live, interactive block inside a page. Instead of pasting a link or a screenshot, you upload an `.html` file and it renders inline, right where you put it. This is useful for embedding things like a prototype, a self-contained report, a chart exported as HTML, or any standalone web snippet.

The rendered artifact is fully interactive: scripts in the file run, so buttons, tabs, and other in-page interactions work.

Hover over the block to reveal its toolbar:

- **Open in new tab** opens the artifact in its own browser tab.
- **View full screen** opens the artifact in a large modal for a closer look.
- **Replace file** (edit mode) swaps in a different HTML file, keeping the block in place.
- **Download** (edit mode) downloads the original HTML file.
- **Delete artifact** (edit mode) removes the block.

**Resize:** in edit mode, drag the bottom edge of the block to change its height. The height is saved with the page.

In read-only or published pages, the artifact still renders and stays interactive. Readers get the **Open in new tab** and **View full screen** actions, but not the edit-only controls (replace, download, delete, resize).

HTML artifacts run in a sandboxed frame that is isolated from Plane. The embedded file can run its own scripts and open links, but it cannot access your Plane session, your workspace data, or the surrounding page. Treat an artifact like any embedded third-party web page: only embed files you trust.

### Notes

- Accepted file types are `.html` and `.htm` only.
- Deleting an artifact block also removes its uploaded file, unless the same file is embedded elsewhere in the page.
- HTML artifacts are available in pages and other rich text fields (such as work item descriptions), wherever the editor is used.

## Callout

Creates visually distinct sections with customizable icons and colors for highlighting warnings, tips , and calls-to-action.

## Toggle <Badge type="tip" text="Business" />

A toggle is a collapsible block that hides its content behind a title. Readers see the title, and click to expand it when they want the detail. Toggles keep long documents tidy: use them for optional context, FAQs, step-by-step details, or anything you want available without cluttering the page.

Toggles are available anywhere you use the editor, including **pages**, **wiki pages**, and **work item descriptions**.

### Insert a toggle

1. Place your cursor where you want the toggle.
2. Type `/` to open the command menu.
3. Search for **Toggle**. You can also type `/accordion`, `/expand`, `/collapse`, `/details`, or `/summary` to find it.
4. Select it. Plane inserts an open toggle with the cursor in its title, ready for you to type.

### Add a title and content

A toggle has two parts:

- **The title** is the line that always stays visible. Type the title first. An empty title shows the hint "Give this a title..."
- **The body** is the content that expands and collapses. Press **Enter** from the title to move into the body, then add your content. An empty body shows "Empty toggle. Click or drop a block inside."

The body can hold almost anything the editor supports: paragraphs, lists, headings, images, callouts, and more. You can also **nest toggles inside toggles** to build layered, collapsible sections.

### Expand and collapse

Click the arrow next to the title to expand or collapse a toggle. A newly inserted toggle starts **expanded** so you can add content right away.

Toggles keep working in read-only and published views: anyone viewing the page can click to expand and collapse them, even when they cannot edit.

### Things to know

- **The open or closed state is not saved.** Collapsing or expanding a toggle changes what you see, but it is not written into the document. If you reload the page, toggles return to their default state rather than staying exactly as you left them. This also means every reader sees toggles in their default state, not whatever a previous viewer left behind.
- **Removing a toggle.** Pressing **Backspace** at the start of an empty title removes the toggle and keeps you in the document.

## Table of contents <Badge type="tip" text="Business" />

On a long page, a table of contents gives readers a quick map of the content and a way to jump straight to any section. Plane builds it from the **headings** in your page, so there is nothing to maintain by hand: as you add, rename, reorder, or remove headings, the table of contents updates on its own.

The table of contents is available on **pages** and **wiki pages**. It is not available in work item descriptions or comments, which don't track headings.

A table of contents only shows what it can find, so start by giving your page headings. Type `/` and choose a heading (Heading 1, Heading 2, or Heading 3), or use Markdown shortcuts by starting a line with `#`, `##`, or `###`. Until a page has at least one heading, the table of contents shows an empty message.

### Insert a table of contents

1. Place your cursor where you want the table of contents, usually near the top of the page.
2. Type `/` to open the command menu.
3. Search for **Table of contents**. You can also type `/toc`, `/contents`, `/outline`, or `/headings` to find it.
4. Select it. Plane inserts the block, described as "a live outline of this page's headings," and adds an empty line after it so you can keep writing.

The block lists every heading on the page, indented by level so the structure is easy to scan.

### How it behaves

- **Shows every heading level.** Headings from level 1 through level 6 all appear, each indented according to its level.
- **Stays up to date.** The list rebuilds automatically whenever you add, edit, reorder, or delete a heading. You never edit the table of contents directly.
- **Jumps to a section.** Click any entry to smoothly scroll the page to that heading.
- **Handles empty headings.** A heading with no text yet appears as "Untitled heading" until you name it.

Because it is a normal block, you can drag it to move it elsewhere on the page, or delete it like any other block.

## AI block <Badge type="tip" text="Business" />

Generate or transform content directly within your pages using AI. The AI Block lets you draft new content, summarize existing text, or run custom prompts without leaving the editor.

![AI Block](https://media.docs.plane.so/pages/ai-block.webp#hero)

Type `/ai` to insert an AI Block. The block appears with a prompt input area and a dropdown to select the action type.

#### Action types

**Summarize page**  
Generates a concise summary of your page content. Useful for creating executive summaries, TL;DRs, or quick overviews of longer documents.

**Custom prompt**  
Write your own instructions to generate or transform content. Use this for drafting sections, rewriting text, structuring notes, expanding ideas, or any other AI-assisted writing task. 

## Work item <Badge type="info" text="Pro" />

References work items directly in the editor to track details and progress.

## Divider

Adds a horizontal line to separate content sections visually.

## Emoji

Add emojis to your content across all Plane editors. Type `/emoji` to open the picker or use `:` and start typing for suggestions like `:smile:`. Choose from standard Unicode emojis and GitHub's extended collection.

## Date block <Badge type="info" text="Pro" />

The date block inserts an inline date picker anywhere in a page. It renders as a small pill showing a formatted date and can be clicked to open a calendar and change the selection.

#### Insert a date block

Type `/date` in the editor to open the slash command menu and select **Date**. You can also search for it by typing `/calendar`, `/deadline`, or `/due`.

The block is inserted at the cursor position with no date selected.

#### Pick a date

Click the date pill to open a calendar popover. Select any date. The popover closes and the pill updates to show the selected date formatted as `Jan 15, 2025`.

Click the pill again at any time to change the date.

#### In read-only pages

The date renders as plain formatted text. It cannot be clicked or changed.

## Status block <Badge type="info" text="Pro" />

The status block inserts an inline colored label anywhere in a page. You define the text and choose from six colors. Use it to mark sections of a page with a state, flag, or category without creating a separate work item.

#### Insert a status block

Type `/status` in the editor and select **Status**. You can also search for it by typing `/label`, `/badge`, or `/tag`.

The block is inserted with the default text "STATUS" and a gray background.

#### Edit the label

Click the status badge to open a popover with a text field and a color picker.

Type your label text in the field. Changes appear on the badge as you type.

Select a color from the six options: Gray, Emerald, Crimson, Yellow, Indigo, Purple.

Press **Enter** or click outside the popover to close it and save.

#### In read-only pages

The status badge renders with its color and text preserved. It cannot be clicked or edited.
