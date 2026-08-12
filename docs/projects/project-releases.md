---
title: Project Releases
description: Group a single project's work items into named versions, track delivery progress, and publish a changelog, all within the project.
---

# Project Releases <Badge type="tip" text="Business" />

Project releases let you group work items from **one project** into a named, versioned deliverable, track its progress, and publish a changelog. They are the project-scoped version of Plane's [Releases](/releases) feature: the same release model, but each release belongs to a single project and is managed from within that project.

Use project releases when a project ships on its own cadence and you want its versions kept inside the project, rather than as workspace-wide releases that span several projects.

## Project releases vs workspace releases

Both work the same way. The only difference is scope and where they live.

| | Project releases | Workspace releases |
| --- | --- | --- |
| Scope | One project | The whole workspace |
| Work items a release can contain | Only work items from that project | Work items from any project |
| Where you manage them | The project's **Releases** tab | **Releases** in the workspace sidebar |
| Enabled | Per project, in project settings | Per workspace, in workspace settings |

If you need a single release to pull work from several projects at once, use [workspace releases](/releases) instead.

## Enable releases for a project

Project releases are off until an admin turns them on for the project.

1. Go to **Project settings → Features**.
2. Find **Releases** and toggle it on ("Create releases in this project, add work items to them, and ship them together").

Once enabled, a **Releases** tab appears in the project, and work items in the project gain a Releases property.

## Where to find them

Open the project and select the **Releases** tab. Releases are listed and grouped by status (Unreleased, Released, Cancelled). From here you create a release and open any release to work on it.

## Create and work with a release

Creating a release, its **Unreleased / Released / Cancelled** lifecycle, the **Overview**, **Scope**, and **Changelog** tabs, the progress rollup, and the manually written changelog all behave exactly as they do for workspace releases. See [Releases](/releases) for the full walkthrough. A quick summary:

- **Create** a release with a name, description, status, tag, labels, target date, and lead. Names are unique across the workspace.
- **Overview** shows the release's properties and a live progress bar (completed, pending, and cancelled counts based on each work item's state).
- **Scope** is the set of work items in the release.
- **Changelog** is a separate rich-text document for your outward-facing release notes. It starts blank and is written by hand; Plane does not generate it from the work items.
- **Status** is set manually. Marking a release **Released** does not happen automatically when all work is done, and you can record the actual release date at that point.

## Add work items (the key difference)

A project release can only contain work items from its **own project**. When you open the release's **Scope** tab and click **Add work items**, the search is limited to that project. Trying to add a work item from another project is rejected.

This is the one behavioral difference from workspace releases, which can pull work items from any project. Everything else about adding and removing scope is the same: adding a work item creates a link without moving or changing it, and removing it only removes the link.

## Link releases from a work item

Work items in a release-enabled project have a **Releases** property in their detail panel, next to Cycle and Module, and as a column in the spreadsheet and board layouts. You can link a release from the work item instead of from the Scope tab, and a work item can belong to more than one release.

In the release picker, releases are grouped into **Project releases** and **Workspace releases**, so you can tell which scope each one belongs to.

For the full behavior of the Releases property, the separate **Release picker** custom property, and filtering work items by release including in [PQL](/core-concepts/issues/plane-query-language), see [Releases](/releases).

## Availability and permissions

- Project releases require the project releases entitlement on your plan, and the per-project **Releases** feature toggle must be on. This entitlement is separate from workspace releases, so a workspace can have one, the other, or both.
- Managing releases (create, edit, delete, change scope) follows your project role. Members with the release permissions in the project can manage them; others can view.
