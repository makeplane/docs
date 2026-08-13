---
title: Applets
description: Ask Plane AI to generate live report and dashboard pages from your work items, with charts, tables, and metrics that stay up to date and drill down into the underlying work.
---

# Applets <Badge type="tip" text="Beta" />

An applet is a live report page that Plane AI builds for you from a plain language request. You describe the report or dashboard you want, and Plane generates a page for it with metrics, charts, and tables. Open the applet any time and it shows current data, so it stays useful long after you first ask for it.

Applets are generated, not hand-built. You do not lay out charts or write any code. You ask Plane AI for what you want, and the applet appears in your Applets list, ready to open.

## What you can ask for

You create an applet by describing it to Plane AI. Applets are built from your **work items** and the things around them: projects, cycles, modules, states, labels, and members. You can filter by state, priority, and assignee, and focus on a single project or the whole workspace.

Some examples you could ask for:

- "Show a workspace overview of open work items by state group, as a bar chart."
- "Build a report of my assigned work items grouped by priority."
- "Show cycle progress for the Web project: completed versus remaining work items."
- "Break down work items by assignee across the workspace, in a table I can drill into."
- "Urgent and high-priority work items per project, with a project filter."
- "A delivery trend showing work created versus completed by cycle."

Applets are **read-only**. They display and summarize data, and they never change your work items. They also do not reach every kind of data. For example, they do not pull intake or customers.

## What an applet looks like

Plane assembles applets from a consistent set of building blocks, so they look at home in Plane and adapt to light and dark themes:

- **Metric tiles** for headline numbers.
- **Charts** (bar, line, and donut).
- **Tables** for detailed rows.
- **Cards, sections, and status badges** to organize the page.
- **Drill-downs.** Click a number and a panel opens listing the actual work items behind it.
- **Filters.** Some applets include dropdowns so you can narrow the view, for example by project, without regenerating the applet.

## Applets vs dashboards

Applets and [dashboards](/dashboards) both visualize your work, but you build them in opposite ways. Use whichever fits.

| | Applets | Dashboards |
| --- | --- | --- |
| How you build it | Describe it to Plane AI in plain language | Add and configure widgets by hand |
| What it is | An AI-generated report page | A canvas of widgets you place and size |
| Control | Plane decides the layout from your request | You control every widget precisely |
| Editing | Ask Plane AI to change it | Add, configure, and move widgets yourself |
| Best for | A quick or evolving report you can describe in a sentence | A curated, stable dashboard you tune widget by widget |


::: info
An **admin** must turn them on for the workspace, and **[Plane AI](/ai/plane-ai)** must be enabled. Applets are available to **workspace Admins and Owners** only. Members and guests do not see the Applets area.
:::

## Enable applets

> **Role:** Workspace admin

1. Go to **Workspace settings → Plane Intelligence**.
2. Turn on **Enable applets** ("Turn on applets for all members of this workspace").

Once enabled, the **Applets** area appears in the workspace sidebar.

## Create an applet

You create an applet by asking Plane AI for it, not from a form or a template gallery.

1. Open Plane AI and describe the report you want (see the examples above).
2. Plane AI generates the applet and gives you a link to open it.
3. The applet also appears in the **Applets** area so you can find it again later.

There is no "create applet" button and no gallery of pre-made applets. Each applet is generated uniquely for what you asked.

> When you chat with Plane AI, it may call the applet a "report" or "dashboard." That is the same thing as an applet, just different wording.

## Where applets live

Open the **Applets** area from the workspace sidebar to see every applet in the workspace. You can also jump there from the command menu with "Go to applets." Select an applet to open it.

If you have not created any yet, the area shows "No applets yet" with a prompt to ask Plane AI to generate one.

## How applets work

- **Live data.** An applet queries Plane when you open it, so it always reflects the current state of your work rather than a saved snapshot. It refreshes on its own while open.
- **Scoped to you.** An applet reads data using your own access, so it shows only what you are allowed to see. Two people can open the same applet and each sees their own permitted data.
- **Read-only.** Applets display and summarize data. They do not change work items.
- **Self-contained.** Each applet is a complete page that Plane renders for you. There is nothing to install.

An applet can cover your whole workspace or focus on a single project, depending on what you asked for.

## Refine an applet

Applets are not one-shot. Open an applet and keep talking to Plane AI about it to change what it shows or how it looks. Plane updates the applet in place, so it stays in your list and keeps the same link. You do not need to recreate it.

Editing happens **through Plane AI**. There are no manual controls on the applet itself to rename it, restore an earlier version, or delete it. To change an applet, ask Plane AI.

## Who can see applets

While the feature is in Beta, applets are limited to **workspace Admins and Owners**. Any admin or owner sees **all** of the workspace's applets in the list, not only the ones they created. This is why the Applets area does not appear for members and guests.

There is no public link or external sharing for applets today. They stay inside your workspace.

## Notes and limits

- Applets are in **Beta**, so expect the experience to keep changing.
- Applets are **read-only reports**. They are not a way to edit work items, and they are not third-party apps, plugins, or integrations.
- Applets are generated and edited **only through Plane AI**. There is no manual builder, version history, rename, or delete control in the applet UI today.
- Because applets use Plane AI, activity counts toward your workspace's AI usage. See [AI usage](/ai/ai-usage).
