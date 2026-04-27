---
title: Member roles
description: Reference for every system role in Plane — Owner, Admin, Member, Guest at the workspace level, and Admin, Contributor, Commenter, Guest at the project level. Includes plan availability, role slugs, and guidance on when to use each.
---

# Member roles

Every user in Plane holds a role at the workspace level and, for each project they're added to, a role at the project level. This page is a reference for all system roles and what they're for.

For the conceptual background, see [Roles and permissions](/roles-and-permissions/overview). For exhaustive permission breakdowns, see the [Permissions matrix](/roles-and-permissions/permissions-matrix).

## Workspace roles

Workspace roles control access to workspace-level resources — settings, members, billing, integrations, the wiki, workspace views, initiatives, and the project list. They also determine what a user can do across the projects they're added to.

### Owner

Owner is the highest workspace role. It carries full access to everything in the workspace, including the two operations no other role can perform: deleting the workspace and transferring ownership to another user.

Use Owner for the founder or principal administrator of the workspace. Most workspaces only have one Owner.

::: info Renamed from "Admin"
The role previously called "Admin" at the workspace level is now called "Owner."
:::

### Admin <Badge type="tip" text="Business" /> <Badge type="warning" text="Enterprise Grid" />

Admin gives full management of the workspace — settings, members, billing, projects, integrations, webhooks, and roles — without the ability to delete the workspace or transfer ownership.

An Admin can access any project's content without being added as a project member. This is by design: workspace administrators sometimes need to step into a project to fix a misconfiguration or audit work, and forcing them to be added to every project would be impractical.

Use Admin for technical leads, ops staff, or anyone who needs to administer the workspace without being its principal owner.

### Member

Member is the standard role for internal contributors. A Member can view the workspace, browse the project list, create and contribute to wiki pages, create workspace views, view analytics, and use integrations.

Members do not have access to project content unless they're explicitly added to a project. When they join a public project, they automatically become a Contributor on it.

Use Member for full-time team members who actively work on projects.

### Guest

Guest is the most restricted workspace role. A Guest can only see projects they've been explicitly added to.

When a workspace Guest is added to a project, they can only be assigned the Guest or Commenter role. They cannot be promoted to Contributor or Admin within a project. This guardrail prevents external collaborators from being accidentally over-privileged.

Use Guest for clients, contractors, or external stakeholders who need restricted access to specific projects only.

## Project roles

Project roles control what a user can do inside a specific project.

### Project Admin

Project Admin has full control over the project — settings, members, work items, epics, cycles, modules, pages, views, intake, automations, workflows, labels, states, and estimates. Project Admins can also delete or archive the project itself.

Use Project Admin for project leads, managers, or anyone responsible for the project's setup and execution.

### Contributor

Contributor is the standard project role for people doing the work. Contributors can create and edit work items, epics, modules, cycles, pages, and views. They can delete content they created themselves, but not content created by others. They can add comments, attach files, log work, and add reactions.

Contributors cannot manage project settings, change member roles, manage labels or states, or delete content created by others.

::: info Renamed from "Member"
The role previously called "Member" at the project level is now called "Contributor."
:::

Use Contributor for everyone who actively works on the project's content.

### Commenter

Commenter can view all work items and add comments and reactions. They can also create Intake submissions. They cannot create or edit work items, modules, cycles, or pages.

::: info Replaces "Guest view access"
Previously, a project Guest could be granted view access via a project-level toggle. That toggle no longer exists. To give someone view-only access to work items plus commenting, assign them the Commenter role.
:::

Use Commenter for stakeholders who need to follow along, leave feedback, and submit intake requests, but shouldn't create or modify work.

### Guest

Project Guest is the most restricted project role. They can submit intake forms and view, edit, and delete intake issues they created themselves. They cannot see or create work items in the project.

Use Guest for external collaborators whose only interaction with the project is submitting requests through intake.

## Teamspace role

Teamspaces have a single role, and conditions on the lead determine what each member can do beyond their own content.

All teamspace members can view the teamspace and its pages, views, and comments. They can create new pages, views, and comments, and they can edit pages collaboratively. Each member can edit and delete their own comments and views.

Only the **teamspace lead** can edit the teamspace's settings, delete the teamspace, manage its members, or delete content created by other members.

## When to use each role

For workspace assignments:

- **Owner** — the principal owner of the workspace. Reserve for one or two people.
- **Admin** — anyone who needs to manage workspace settings, billing, integrations, members, or roles.
- **Member** — internal contributors who do project work.
- **Guest** — external clients, contractors, or stakeholders with project-specific access only.

For project assignments:

- **Admin** — project leads who own the project's setup and execution.
- **Contributor** — anyone actively doing the work.
- **Commenter** — stakeholders who need read access plus the ability to comment and submit intake.
- **Guest** — external collaborators interacting only via intake.

## Role hierarchy

Roles have an internal authority level used to enforce who can manage whom. A user can only modify members whose role level is lower than their own.

- Only Owners can manage other Owners.
- Owners and Admins can manage Admins.
- The last Admin or Owner of a workspace cannot leave or be demoted.
- The last Admin of a project cannot leave.

## Custom roles <Badge type="warning" text="Enterprise Grid" />

Workspace owners and admins can create custom roles composed from any combination of permission schemes. Custom roles cannot include workspace deletion or ownership transfer (those are reserved for Owner).

For details, see [Create custom roles](/roles-and-permissions/custom-roles).

## Paid seat classification

Most workspace roles count as paid seats for billing purposes. Workspace Guest is the only role that does not.

| Role         | Counts as paid seat |
| ------------ | ------------------- |
| Owner        | Yes                 |
| Admin        | Yes                 |
| Member       | Yes                 |
| Guest        | No                  |
| Custom roles | Yes                 |

## See also

- [Roles and permissions](/roles-and-permissions/overview)
- [Permissions matrix](/roles-and-permissions/permissions-matrix)
- [Manage workspace members](/core-concepts/workspaces/members)
- [Manage project members](/core-concepts/projects/manage-project-members)
