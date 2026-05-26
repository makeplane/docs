---
title: Epics
description: Epics are now a work item type in Plane. Learn what changed, what stayed the same, and where to go next.
---

# Epics <Badge type="info" text="Pro" />

Epics in Plane have moved. They're now a [**work item type**](/work-items/project-work-item-types), living in the same Work Items list as other types your team tracks. If you've been using Epics, this page explains what changed, what stayed the same, and where everything is now.

## What changed

Previously, Epics had their own dedicated tab in the project sidebar. You managed them separately from work items, and they had their own filtered view, their own settings toggle, and their own sidebar entry.

That separate layer is gone.

Epic is now a **work item type** and is treated exactly like any other type. You filter, group, sort, and manage Epics the same way you work with any other work item. The creation form, the detail view, the bulk editor, the filters, all of it is shared.

What this means in practice:

- **The Epics tab in the sidebar is removed.** Epics live in **Work Items**, filterable by type.
- **The Epics toggle in Project Settings is gone.** Epic is now managed under **Work item Types** settings. If Work Item Types are enabled for your project, Epic is there.
- **Epic is created automatically.** When you enable Work Item Types for a project, Plane creates two types: the default **Task** type and an **Epic** type. You don't set them up manually.
- **Work Item Updates - On Track, At Risk, Off Track - are no longer exclusive to epics.** They're now available on every work item of every type.

The levels aren't arbitrary. Task is created at level 0 and Epic at level 1 - this is the default hierarchy structure built into the product. If your workspace has the Hierarchy feature enabled, that structure is enforced automatically: Epics sit above Tasks, Tasks can be sub-items of Epics, and Tasks cannot contain Epics. You don't configure this; it's there by default the moment Work Item Types are enabled.

## What stayed the same

The data is fully intact. Every comment, every activity log entry, every update, every sub-work item relationship, and every initiative link on your existing epics carried over. Nothing was lost.

The way Epics work conceptually hasn't changed either. An epic is still the parent layer above individual work items. Work items still link to an epic through the **Parent** field. Updates from epics still feed into initiative streams as for all work items.

## Where to find your epics now

Open **Work Items** in your project. Click **Filters**, add a **Type** filter, and select **Epic**. Your epics are there, exactly as you left them.

You can also group your Work Items view by **Type** to see epics and other types side by side.

