---
title: Project Audit Logs
description: Give project admins a tamper-evident record of who changed a project's configuration, membership, permissions, and settings, with filtering and export.
---

# Project Audit Logs <Badge type="warning" text="Enterprise Grid" />

The project audit log is a focused record of security-relevant activity **within a single project**. It gives project admins an accountable, time-stamped history of who changed the project's configuration, membership, permissions, and settings.

Like [Workspace Audit Logs](/workspaces-and-users/audit-logs), project audit entries are **append-only** and **tamper-evident**: they are written once and can never be edited or deleted, by anyone, including administrators. In fact, project and workspace audit entries are the same underlying records. The project audit log is the slice scoped to one project, so a project admin can review their own project's history without needing access to the whole workspace.

## Where to find it

Go to **Project settings → Audit logs**. The page shows the most recent events first, with filters and an export option at the top.

## What gets tracked

The project audit log records actions taken on this project:

| Category                | Events tracked                                                                                                                                                                          |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Project**             | Project settings updated; create, update, or delete of the project's states, labels, modules, cycles, views, workflows, and automations (including enabling or disabling an automation) |
| **Member**              | Member added to the project, member removed from the project                                                                                                                            |
| **Role and permission** | Project member role changed                                                                                                                                                             |
| **Security**            | Audit log searched, exported, and export downloaded                                                                                                                                     |

Reading and exporting the project audit log are themselves recorded as events, so every access to the log is accountable.

The project audit log deliberately covers only project-scoped activity. Workspace-wide events, such as sign-ins, plan changes, API tokens, and webhooks, are not shown here. Those belong to the [workspace audit log](/workspaces-and-users/audit-logs) and the instance-level logs.

## Read the log

Each row represents one event, with these columns:

| Column           | What it shows                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| **Timestamp**    | The date and time the event occurred, in your local time                                          |
| **Actor**        | Who performed the action, shown by name or email. System-generated actions show as **System**     |
| **Event**        | The action that took place, for example "Project member role changed"                             |
| **Event object** | The target the action was performed on, for example the affected member or the label that changed |
| **Category**     | The category the event belongs to, with an icon                                                   |

Behind each entry, the log also captures additional context that appears in exports, including the actor type (user, API token, system, or anonymous), the outcome (success or failure), the IP address, the user agent, and, where relevant, the old and new values that changed.

Actor identity is stored as a snapshot at the time of the event. If a member is later renamed or removed, historical entries still show who they were when the action happened.

## Filter and search

Use the filters at the top of the page to narrow the log:

- **Category** — Project, Member, Role & Permission, or Security
- **Outcome** — successful or failed events
- **Actor** — events performed by a specific person
- **Date range** — events within a start and end date
- **Search** — free-text search across events

Filters combine, and the filters you apply also determine what is included when you export.

## Export the log

You can export the project audit log for offline review, archiving, or handing to auditors.

1. Apply any filters you want the export to respect.
2. Click the **Download** button.
3. Choose a format: **CSV**, **JSON**, or **Excel (XLSX)**.

The export runs in the background. When it is ready, download it from the **Previous exports** list, which records who exported, when, the format, and the status. Because exporting reflects your current filters, you can produce a targeted export, for example only this month's membership changes, rather than the entire log.

## Data integrity

The project audit log is designed so it can be trusted as evidence:

- **Append-only.** Entries cannot be modified or deleted after they are written. This is enforced in the application and at the database level, so there is no path, even for an administrator, to alter history.
- **Tamper-evident.** Each entry is cryptographically chained to the one before it. If any entry were altered or removed, the chain would no longer validate. Programmatic chain verification is available through the audit log API at the workspace level.

## Notes and limits

- Project audit entries are permanent. There is no way to clear or prune the log, and logs are retained indefinitely.
- The project audit log is not an activity feed for individual work items. For the history of a specific work item, use that work item's activity view.
- Project audit entries also appear in the [workspace audit log](/workspaces-and-users/audit-logs), which a workspace admin can use to review activity across every project at once.
- The tracked event set expands over time as coverage grows.

## Frequently asked questions

**Can a project admin delete an entry to hide an action?**
No. The log is append-only and enforced at the database level. No one, including workspace owners, can edit or delete entries.

**Do login events show up in the project audit log?**
No. Sign-in and authentication events are recorded at the instance level, not in the project or workspace audit log.

**Does viewing the project audit log show up in the log?**
Yes. Searching and exporting the log are recorded as events, so access to the log is itself accountable.

**Who can see the project audit log?**
Project Admins, plus Workspace Admins and Owners. It is hidden from members and guests.
