---
title: Roles and permissions
description: Understand how roles, permissions, and access control work in Plane — including system roles, custom roles, conditional grants, and how access is evaluated across workspaces, projects, and teamspaces.
---

# Roles and permissions

Plane's access control system determines what every user can see and do. This page explains how that system works conceptually so you can design role assignments confidently.

If you're looking for what a specific role can or can't do, see the [Permissions matrix](/roles-and-permissions/permissions-matrix). If you want a list of system roles, see [Member roles](/roles-and-permissions/member-roles). If you want to perform a task, see the how-to guides linked at the bottom of this page.

## How RBAC and GAC fit together

Plane uses **Role-Based Access Control (RBAC)**. Every user holds a role — either a system-defined role (Owner, Admin, Member, Guest, Contributor, or Commenter) or a [custom role](/roles-and-permissions/custom-roles) — and that role carries a defined set of permissions.

The permissions inside a role are fine-grained. **Granular Access Control (GAC)** is the term for that granularity: each capability the system can permit (creating a work item, deleting a module, editing project settings, publishing a page) is its own permission. RBAC is what bundles those granular permissions into a role you can assign.

On Enterprise Grid, [custom roles](/roles-and-permissions/custom-roles) and [permission schemes](/roles-and-permissions/permission-schemes) are the user-facing way to compose any combination of granular permissions into a role tailored to your organization. Custom roles aren't a separate layer above RBAC — they are RBAC with the permission catalog opened up for you to pick from.

:::tip
Owner, Member, and Guest are available on all plans. Other system-defined roles are exclusive to the Business plan and higher. See [Plan availability](/roles-and-permissions/overview#plan-availability).
:::

## What changed from earlier versions

Three things were renamed or restructured:

- **"Workspace Admin" is now called "Workspace Owner."** The highest-privilege workspace role — the one that can delete the workspace and transfer ownership — was renamed from "Admin" to "Owner." On Business and Enterprise Grid, a separate "Admin" role exists below Owner (full workspace management without the ability to delete the workspace or transfer ownership). See [Workspace roles](/roles-and-permissions/member-roles#workspace-roles).
- **"Project Member" is now called "Contributor."**
- **"Guest view access to Guests" is now the Commenter role.** Previously, you toggled "Grant guest users view access to all the project work items" on a Guest. Now, instead of toggling, you assign the user the Commenter role. The role gives view access to project content plus the ability to add comments.

If you've used Plane before, your existing assignments are mapped automatically — no action required.

## Scope hierarchy

Plane's permission system operates at three scopes:

```
Workspace
  ├── Project
  │     ├── Work items, Epics, Modules, Cycles
  │     ├── Pages, Views, Intake
  │     └── Labels, States, Estimates, ...
  ├── Teamspace ──(grants access to)──► Project
  ├── Wiki, Initiatives, Releases, Dashboards
  └── Integrations, Webhooks, Analytics, ...
```

Permissions inherit upward. If a user has Admin on a project, they have access to everything inside that project. If a user has Admin on the workspace, they have access to all projects and their content.

## Roles, schemes, and how they fit together

A **role** is what you assign to a user. A **permission scheme** is a named bundle of permissions that a role is built from.

System roles ship with a single matching scheme — for example, the "Workspace Owner" role uses the "Workspace Owner" scheme. Custom roles can compose from one scheme or several. The role's effective permissions are the union of all schemes attached to it.

This design exists so admins can build roles by combining focused, reusable scheme bundles rather than ticking hundreds of individual checkboxes for every role.

## Plan availability

Different roles and capabilities are available on different plans.

| Capability                                   | Free | Pro | Business | Enterprise Grid |
| -------------------------------------------- | ---- | --- | -------- | --------------- |
| Workspace Owner, Member, Guest               | ✓    | ✓   | ✓        | ✓               |
| Project Admin, Contributor, Commenter, Guest | ✓    | ✓   | ✓        | ✓               |
| **Workspace Admin role**                     | —    | —   | ✓        | ✓               |
| **Custom roles**                             | —    | —   | —        | ✓               |
| **Custom permission schemes**                | —    | —   | —        | ✓               |

## Conditional grants

Some permissions only apply when a condition is met. The two conditions used in Plane are:

- **Creator** — the user must have created the resource. A Contributor can delete work items they created, but not work items created by others.
- **Lead** — the user must be the lead of the teamspace. A teamspace Member can edit teamspace settings only if they're the lead.

When permissions combine, an unconditional grant always wins over a conditional one. If a user holds both `workitem:delete` and `workitem:delete+creator`, they can delete any work item — the unconditional grant takes effect and the condition is irrelevant.

## How permission checks work

When a user attempts an action, the system evaluates access in a fixed order, starting at the most specific scope and walking upward.

1. **Role permissions** on this scope:
   - Unconditional match → allowed.
   - Conditional match → check the condition (creator, lead). If it's satisfied, allowed.
2. **Link relations** — does the user have access via a Teamspace linked to this project?
3. **Inherit from parent scope** — repeat the same checks one level up (project → workspace).
4. If nothing matched after walking the full chain → **denied by default**.

A few worked examples make this concrete.

**Can Bob edit work items?** Bob has the Contributor role on the project. The system finds Bob's Contributor role on the project, sees that Contributor includes `workitem:edit`, and allows the edit.

**Can Carol delete modules?** Carol has the Contributor role on the project. Contributor has `module:delete+creator`. The system checks whether Carol created the module — if yes, allowed; if no, denied.

**Can Dave (a workspace Admin with no project membership) view work items?** No project-level grant exists for Dave. The system walks up to the workspace, finds Dave's Admin role, which includes wildcard access to all project resource types, and allows the view.

## How workspace, project, and teamspace roles interact

Permissions check from the most specific scope upward, which means workspace-level roles can grant project-level access without an explicit project membership.

**Workspace Owners and Admins** have wildcard grants over all project resource types. They can access any project's content without being added to it explicitly. Removing a workspace Owner or Admin from a project has no functional effect — their workspace role still grants access via inheritance.

**Auto-join role mapping.** When a workspace member joins a public project, their project role is derived from their workspace role:

| Workspace role        | → Project role |
| --------------------- | -------------- |
| Owner                 | Admin          |
| Admin                 | Admin          |
| Member or custom role | Contributor    |
| Guest                 | Guest          |

**Teamspace → project link relations.** A teamspace can be linked to one or more projects, and the link carries a role. All teamspace members get that role on the linked project without a separate project membership being created. A user can have both a direct project membership and teamspace-derived access — both are evaluated, and access resolves to whichever permits the action.

**Guest ceiling.** Workspace Guests are restricted from receiving high-privilege project roles. When you add a workspace Guest to a project, you can only assign them the Guest or Commenter role — both default and custom project roles beyond these are blocked. Attempting to assign Admin, Contributor, or any custom project role returns an error. This prevents privilege escalation through project assignment.

## Caching and timing

Permission decisions are cached per user for 5 minutes, and role definitions are cached for 24 hours. When an admin changes a user's role or modifies a role definition, the relevant caches are invalidated immediately. The user's next request fetches fresh permissions.

## Audit trail (coming soon)

Every permission change is logged with the actor, the subject, the affected resource, the role before and after the change, and a timestamp. Role definition changes are tracked field by field, so you can see exactly which permission was added or removed and by whom.

This audit trail is available to workspace admins for compliance reporting and access troubleshooting.

## Where to go next

- For lookups about what a specific role can do, see the [Permissions matrix](/roles-and-permissions/permissions-matrix).
- For the system role catalog, see [Member roles](/roles-and-permissions/member-roles).
- To add and manage workspace members, see [Manage workspace members](/core-concepts/workspaces/members).
- To add and manage project members, see [Manage project members](/core-concepts/projects/manage-project-members).
- To create custom roles, see [Create custom roles](/roles-and-permissions/custom-roles).
- To build reusable permission bundles, see [Create permission schemes](/roles-and-permissions/permission-schemes).
