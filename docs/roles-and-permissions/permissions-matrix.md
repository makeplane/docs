---
title: Permissions matrix
description: Complete permissions reference for every role in Plane. Organized by the same permission groups used in the role builder so you can compare exactly what each role can and can't do.
---

# Permissions matrix

This is the exhaustive permissions reference for every system defined role in Plane.

For conceptual background, see [Roles and permissions](/roles-and-permissions/overview). For the role catalog, see [Member roles](/roles-and-permissions/member-roles).

Plane has two sets of roles: workspace roles that control what someone can do across the entire workspace, and project roles that control what they can do inside a specific project. A person's project role is independent of their workspace role — you can be a workspace Member but a project Admin.

## Symbols used on this page

- ✓ - the role has unconditional access to this permission.
- **+Creator** - the role can perform the action only on resources they created.
- **+Lead** - the role can perform the action only if they're the teamspace lead.
- x - the role does not have this permission.

## Workspace Permissions

> **Owner and Admin bypass:** Workspace Owners have unconditional full access. Workspace Admins have full access to all workspace resources and all project resources — without needing project membership.

### Workspace settings

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View workspace settings | ✓ | ✓ | ✓ | ✓ |
| Edit workspace settings | ✓ | ✓ | — | — |
| Delete workspace | ✓ | — | — | — |
| Transfer ownership | ✓ | — | — | — |

---

### Workspace members

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View member list | ✓ | ✓ | ✓ | ✓ |
| Invite by email | ✓ | ✓ | — | — |
| Import members (CSV / SSO) | ✓ | ✓ | — | — |
| Change a member's role | ✓ | ✓ | — | — |
| Assign Owner role | ✓ | — | — | — |
| Assign Admin role | ✓ | ✓ | — | — |
| Remove a member | ✓ | ✓ | — | — |

### Custom Roles

Custom roles are workspace-defined role definitions extending the base system roles.

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View custom roles | ✓ | ✓ | — | — |
| Create a custom role | ✓ | ✓ | — | — |
| Edit a custom role | ✓ | ✓ | — | — |
| Delete a custom role | ✓ | ✓ | — | — |

### Projects (Workspace-level management)

This covers project creation, discovery, and admin operations from the workspace level. For content access inside a project, see [Project permissions](#project-permissions).

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| Browse / list all projects | ✓ | ✓ | ✓ | — |
| Create a project | ✓ | ✓ | — | — |
| Self-join a public project | ✓ | ✓ | ✓ | — |
| Self-join a private project | ✓ | ✓ | — | — |
| Edit project settings | ✓ | ✓ | — | — |
| Archive a project | ✓ | ✓ | — | — |
| Delete a project | ✓ | ✓ | — | — |
| Publish project (make public) | ✓ | ✓ | — | — |

> Workspace Owners and Admins have full access to all project content without needing explicit project membership.

**Auto-join project role mapping** (when a workspace member self-joins a project):

| Workspace role | Project role assigned |
|---|---|
| Owner | Admin |
| Admin | Admin |
| Member | Contributor |
| Guest | — (cannot self-join) |
| Custom role | Contributor |

### Initiatives

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View initiatives | ✓ | ✓ | ✓ | — |
| Create | ✓ | ✓ | — | — |
| Edit | ✓ | ✓ | — | — |
| Delete | ✓ | ✓ | — | — |
| React | ✓ | ✓ | ✓ | — |
| Add / remove epics | ✓ | ✓ | — | — |
| Add / remove projects in scope | ✓ | ✓ | — | — |
| Drag and drop (reorder) | ✓ | ✓ | — | — |

#### Initiative links

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View links | ✓ | ✓ | ✓ | — |
| Add a link | ✓ | ✓ | — | — |
| Edit a link | ✓ | ✓ | — | — |
| Delete a link | ✓ | ✓ | — | — |

#### Initiative attachments

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | ✓ | — |
| Add attachment | ✓ | ✓ | — | — |
| Edit attachment | ✓ | ✓ | — | — |
| Delete any attachment | ✓ | ✓ | — | — |

#### Initiative comments

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View comments | ✓ | ✓ | ✓ | — |
| Create a comment | ✓ | ✓ | ✓ | — |
| Edit own comment | ✓ | ✓ | Own | — |
| Delete own comment | ✓ | ✓ | Own | — |
| Delete any comment | ✓ | ✓ | — | — |
| React to a comment | ✓ | ✓ | ✓ | — |

#### Initiative updates

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View updates | ✓ | ✓ | ✓ | — |
| Create an update | ✓ | ✓ | — | — |
| Edit an update | ✓ | ✓ | — | — |
| Delete an update | ✓ | ✓ | — | — |
| React to an update | ✓ | ✓ | ✓ | — |
| Comment on an update | ✓ | ✓ | ✓ | — |
| Edit own update comment | ✓ | ✓ | — | — |
| Delete own update comment | ✓ | ✓ | — | — |
| React to an update comment | ✓ | ✓ | ✓ | — |

> Members can react and comment on initiative updates but cannot edit or delete those comments.

### Teamspaces (Workspace-level management)

This covers workspace-admin operations over teamspaces. For actions taken by teamspace members inside a teamspace, see [Teamspace permissions](#teamspace-permissions).

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| Browse / list teamspaces | ✓ | ✓ | — | — |
| Create a teamspace | ✓ | ✓ | — | — |
| View a teamspace | ✓ | ✓ | Members only¹ | — |
| Edit teamspace settings | ✓ | ✓ | — | — |
| Delete a teamspace | ✓ | ✓ | — | — |
| Add members to teamspace | ✓ | ✓ | — | — |
| Remove members from teamspace | ✓ | ✓ | — | — |
| Assign Lead designation | ✓ | ✓ | — | — |
| Link a project to teamspace | ✓ | ✓ | — | — |
| Unlink a project from teamspace | ✓ | ✓ | — | — |

> ¹ Workspace Members must be explicit teamspace members to view a teamspace's content. Owners and Admins bypass this.

### Wiki

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View a page | ✓ | ✓ | ✓ | — |
| Create a page | ✓ | ✓ | ✓ | — |
| Edit page content / title | ✓ | ✓ | ✓ | — |
| Lock / unlock a page | ✓ | ✓ | ✓ | — |
| Make page public / private | ✓ | ✓ | ✓ | — |
| Share a page | ✓ | ✓ | ✓ | — |
| Archive a page | ✓ | ✓ | ✓ | — |
| Restore a page | ✓ | ✓ | ✓ | — |
| Duplicate a page | ✓ | ✓ | ✓ | — |
| Delete a page | ✓ | ✓ | ✓ | — |
| Move a page | ✓ | ✓ | ✓ | — |
| Update page icon / logo | ✓ | ✓ | ✓ | — |
| Export / download | ✓ | ✓ | ✓ | — |
| Favourite a page | ✓ | ✓ | ✓ | — |
| Comment on a page | ✓ | ✓ | — | — |

> Commenting on workspace pages requires Owner or Admin.

#### Wiki Collections

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View collections | ✓ | ✓ | ✓ | — |
| Create a collection | ✓ | ✓ | ✓ | — |
| Edit own collection | ✓ | ✓ | Own | — |
| Edit any collection | ✓ | ✓ | — | — |
| Delete own collection | ✓ | ✓ | Own | — |
| Delete any collection | ✓ | ✓ | — | — |

### Workspace Views

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View all workspace views | ✓ | ✓ | ✓ | ✓¹ |
| Create a view | ✓ | ✓ | ✓ | — |
| Edit own view | ✓ | ✓ | Own | — |
| Edit any view | ✓ | ✓ | — | — |
| Delete own view | ✓ | ✓ | Own | — |
| Delete any view | ✓ | ✓ | — | — |
| Share / make public | ✓ | ✓ | — | — |
| Publish externally | ✓ | ✓ | — | — |
| Export | ✓ | ✓ | ✓ | — |
| Favourite / pin | ✓ | ✓ | ✓ | — |

> ¹ Guests can view workspace views but only see work items from projects they have explicit access to.

### Workspace Drafts

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View drafts | ✓ | ✓ | ✓ | — |
| Create a draft | ✓ | ✓ | ✓ | — |
| Edit a draft | ✓ | ✓ | ✓ | — |
| Delete own draft | ✓ | ✓ | Own | — |
| Delete any draft | ✓ | ✓ | — | — |
| Duplicate a draft | ✓ | ✓ | ✓ | — |
| Move draft to a project | ✓ | ✓ | ✓ | — |
| Manage drafts (bulk operations) | ✓ | ✓ | ✓ | — |

### Releases

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View releases | ✓ | ✓ | ✓ | — |
| Create a release | ✓ | ✓ | — | — |
| Edit a release | ✓ | ✓ | — | — |
| Delete a release | ✓ | ✓ | — | — |
| Add work items to a release | ✓ | ✓ | — | — |
| Remove work items from a release | ✓ | ✓ | — | — |
| Add / edit / delete links | ✓ | ✓ | — | — |
| Add attachment | ✓ | ✓ | — | — |
| Delete attachment | ✓ | ✓ | — | — |
| Edit changelog | ✓ | ✓ | — | — |
| Manage tags | ✓ | ✓ | — | — |
| Add a comment | ✓ | ✓ | — | — |
| Edit own comment | ✓ | ✓ | — | — |
| Delete own comment | ✓ | ✓ | — | — |
| React to a comment | ✓ | ✓ | — | — |
| View activity | ✓ | ✓ | ✓ | — |

### Customers

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View customers | ✓ | ✓ | — | — |
| Create a customer | ✓ | ✓ | — | — |
| Edit a customer | ✓ | ✓ | — | — |
| Delete a customer | ✓ | ✓ | — | — |
| Add attachment | ✓ | ✓ | — | — |
| Delete attachment | ✓ | ✓ | — | — |

### Workspace Analytics

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | ✓ | — |
| Export | ✓ | ✓ | ✓ | — |
| Apply filters | ✓ | ✓ | ✓ | — |

### Dashboards

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View dashboards | ✓ | ✓ | ✓ | — |
| Create a dashboard | ✓ | ✓ | — | — |
| Edit a dashboard (rename, settings) | ✓ | ✓ | — | — |
| Delete a dashboard | ✓ | ✓ | — | — |
| Add a widget | ✓ | ✓ | — | — |
| Edit a widget | ✓ | ✓ | — | — |
| Delete a widget | ✓ | ✓ | — | — |
| Rearrange widgets | ✓ | ✓ | — | — |
| Apply quick filters (view only) | ✓ | ✓ | ✓ | — |
| Favourite a dashboard | ✓ | ✓ | — | — |

### Worklogs

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | ✓ | — |
| Export | ✓ | ✓ | ✓ | — |

### Workspace Activity Logs

Audit trail of all changes made across the workspace.

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View workspace activity | ✓ | ✓ | ✓ | — |
| Export workspace activity | ✓ | ✓ | ✓ | — |

### User Activity Logs

Per-member activity history showing what a specific workspace member has done.

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View user activity | ✓ | ✓ | ✓ | — |
| Export user activity | ✓ | ✓ | ✓ | — |

### Workspace Automations

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | — | — |
| Create | ✓ | ✓ | — | — |
| Edit | ✓ | ✓ | — | — |
| Enable / disable | ✓ | ✓ | — | — |
| Delete | ✓ | ✓ | — | — |

### Workspace Assets

Files and images uploaded at workspace scope (logos, avatars, rich-text embeds not tied to a specific project).

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View / download | ✓ | ✓ | ✓ | ✓ |
| Upload | ✓ | ✓ | ✓ | — |
| Edit | ✓ | ✓ | — | — |
| Delete | ✓ | ✓ | — | — |
| Manage (bulk) | ✓ | ✓ | — | — |

### Workspace Project States

Workspace-level project status definitions used for project grouping (Enterprise).

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | ✓ | ✓ |
| Create | ✓ | ✓ | ✓ | — |
| Edit | ✓ | ✓ | ✓ | — |
| Delete | ✓ | ✓ | ✓ | — |

### Workspace Features

Controls for toggling workspace-level features on or off.

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View feature settings | ✓ | ✓ | — | — |
| Enable / disable features | ✓ | ✓ | — | — |

### Workspace Work Item Types

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | — | — |
| Create | ✓ | ✓ | — | — |
| Edit | ✓ | ✓ | — | — |
| Delete | ✓ | ✓ | — | — |

### Workspace Custom Properties

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | — | — |
| Create | ✓ | ✓ | — | — |
| Edit | ✓ | ✓ | — | — |
| Delete | ✓ | ✓ | — | — |

### 1.21 Custom Relations

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | ✓ | ✓ |
| Create | ✓ | ✓ | ✓ | — |
| Edit | ✓ | ✓ | ✓ | — |
| Delete | ✓ | ✓ | ✓ | — |

### Favorites

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View own favorites | ✓ | ✓ | ✓ | — |
| Add a favorite | ✓ | ✓ | ✓ | — |
| Edit (rename) a favorite | ✓ | ✓ | ✓ | — |
| Remove a favorite | ✓ | ✓ | ✓ | — |

### Integrations

Third-party integration connections (GitHub, Slack, Jira, Linear, etc.).

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View integrations | ✓ | ✓ | ✓ | — |
| Connect an integration | ✓ | ✓ |  — | — |
| Configure an integration | ✓ | ✓ |  — | — |
| Disconnect an integration | ✓ | ✓ |  — | — |
| Admin-only operations (manage) | ✓ | ✓ | — | — |
| Create integration | ✓ | ✓ |  — | — |
| Delete integration | ✓ | ✓ |  — | — |

### Webhooks

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | — | — |
| Create | ✓ | ✓ | — | — |
| Edit | ✓ | ✓ | — | — |
| Delete | ✓ | ✓ | — | — |

### Workspace API Tokens

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | — | — |
| Create | ✓ | ✓ | — | — |
| Delete | ✓ | ✓ | — | — |


### Billing

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View billing | ✓ | ✓ | — | — |
| Manage billing | ✓ | ✓ | — | — |


### Plane AI

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| Use AI features | ✓ | ✓ | ✓ | — |

### Work Item Templates

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | — | — |
| Create | ✓ | ✓ | — | — |
| Edit | ✓ | ✓ | — | — |
| Delete | ✓ | ✓ | — | — |

### Page Templates

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | — | — |
| Create | ✓ | ✓ | — | — |
| Edit | ✓ | ✓ | — | — |
| Delete | ✓ | ✓ | — | — |

### Project Templates

| Action | Owner | Admin | Member | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | — | — |
| Use to create a project | ✓ | ✓ | ✓ | — |
| Publish | ✓ | ✓ | — | — |
| Create | ✓ | ✓ | — | — |
| Edit | ✓ | ✓ | — | — |
| Delete | ✓ | ✓ | — | — |

## Project permissions

> **Workspace Owner / Admin bypass:** Workspace Owners and Admins have full access to all content in every project in their workspace without holding explicit project membership.

### Project Settings

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View project settings | ✓ | ✓ | ✓ | ✓ |
| Edit project settings | ✓ | — | — | — |
| Archive project | ✓ | — | — | — |
| Restore project | ✓ | — | — | — |
| Delete project | ✓ | — | — | — |
| Publish project (make public) | ✓ | — | — | — |

### Project Members

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View member list | ✓ | ✓ | ✓ | ✓ |
| Invite by email | ✓ | — | — | — |
| Invite existing workspace member | ✓ | — | — | — |
| Change a member's role | ✓ | — | — | — |
| Remove a member | ✓ | — | — | — |
| Leave project | ✓ | ✓ | ✓ | ✓ |

### Work Items

#### Core actions

| Action | Admin | Contributor | Commenter | Guest | Notes |
|---|:---:|:---:|:---:|:---:|---|
| View work items | ✓ | ✓ | ✓ | Own | Guest: own intake submissions only |
| Create a work item | ✓ | ✓ | — | — | |
| Edit a work item | ✓ | ✓ | Own | Own | Blocked on archived items |
| Delete a work item | ✓ | Own | Own | Own | |
| Bulk edit | ✓ | ✓ | — | — | |
| Assign to a user | ✓ | ✓ | — | — | |
| Duplicate a work item | ✓ | ✓ | — | — | |
| Archive a work item | ✓ | ✓ | — | — | |
| Restore from archive | ✓ | ✓ | — | — | |
| Export work items | ✓ | ✓ | — | — | |
| Import work items | ✓ | — | — | — | |
| Move to another project | ✓ | ✓¹ | — | — | ¹ Requires Contributor on both projects |
| Mark as draft | ✓ | ✓ | — | — | |
| React | ✓ | ✓ | ✓ | — | |
| Subscribe / unsubscribe | ✓ | ✓ | Own | — | Tied to edit permission |
| Vote | ✓ | ✓ | ✓ | — | |

#### Property changes (all require edit permission)

| Property | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| State | ✓ | ✓ | — | — |
| Priority | ✓ | ✓ | — | — |
| Assignees | ✓ | ✓ | — | — |
| Labels | ✓ | ✓ | — | — |
| Work item type | ✓ | ✓ | — | — |
| Parent (sub-task of) | ✓ | ✓ | — | — |
| Start date | ✓ | ✓ | — | — |
| Due date | ✓ | ✓ | — | — |
| Estimate | ✓ | ✓ | — | — |
| Cycle | ✓ | ✓ | — | — |
| Module | ✓ | ✓ | — | — |
| Milestone | ✓ | ✓ | — | — |
| Drag and drop / reorder | ✓ | ✓ | — | — |
| Restore description version | ✓ | ✓ | — | — |

#### Conversion and structure

| Action | Admin | Contributor | Commenter | Guest | Notes |
|---|:---:|:---:|:---:|:---:|---|
| Add sub-work item | ✓ | ✓ | — | — | Blocked on archived items |
| Convert to epic | ✓ | ✓ | — | — | Blocked on archived items |
| Convert to sub-task | ✓ | ✓ | — | — | |
| Switch work item type | ✓ | ✓ | — | — | Blocked on archived items |

#### Work Item Relations

| Action | Admin | Contributor | Commenter | Guest | Notes |
|---|:---:|:---:|:---:|:---:|---|
| Add relation | ✓ | ✓ | — | — | |
| Edit a relation | ✓ | ✓ | — | — | |
| Remove a relation | ✓ | ✓ | — | — | |
| View relations | ✓ | ✓ | ✓ | ✓ | |

#### Work Item Links

| Action | Admin | Contributor | Commenter | Guest | Notes |
|---|:---:|:---:|:---:|:---:|---|
| Add a link | ✓ | ✓ | — | — | |
| Edit a link | ✓ | ✓ | — | — | |
| Delete a link | ✓ | ✓ | — | — | |
| View links | ✓ | ✓ | ✓ | — | |

#### Work Item Attachments

| Action | Admin | Contributor | Commenter | Guest | Notes |
|---|:---:|:---:|:---:|:---:|---|
| View attachments | ✓ | ✓ | ✓ | — | |
| Add attachment | ✓ | ✓ | ✓ | — | Commenter: upload only |
| Edit own attachment | ✓ | Own | — | — | |
| Delete own attachment | ✓ | Own | — | — | |
| Delete any attachment | ✓ | — | — | — | Admin only |

#### Worklogs

| Action | Admin | Contributor | Commenter | Guest | Notes |
|---|:---:|:---:|:---:|:---:|---|
| Log work (add work log) | ✓ | ✓ | — | — | Blocked on intake work items |
| Edit own work log | ✓ | Own | — | — | |
| Delete own work log | ✓ | Own | — | — | |

### Comments

| Action | Admin | Contributor | Commenter | Guest | Notes |
|---|:---:|:---:|:---:|:---:|---|
| Create comment | ✓ | ✓ | ✓ | — | Blocked on archived work items |
| Edit own comment | ✓ | Own | Own | — | Blocked on archived work items |
| Delete own comment | ✓ | Own | Own | — | Not blocked by archived status |
| Delete any comment | ✓ | — | — | — | Admin only |
| React to comment | ✓ | ✓ | ✓ | ✓ | |
| Resolve a comment | ✓ | ✓ | ✓ | — | |

### Epics

#### Core actions

| Action | Admin | Contributor | Commenter | Guest | Notes |
|---|:---:|:---:|:---:|:---:|---|
| View epics | ✓ | ✓ | ✓ | — | |
| Create an epic | ✓ | ✓ | — | — | |
| Edit an epic | ✓ | ✓ | — | — | Blocked on archived items |
| Delete an epic | ✓ | Own | — | — | |
| Archive / restore | ✓ | ✓ | — | — | |
| Duplicate | ✓ | ✓ | — | — | |
| Export | ✓ | ✓ | — | — | |
| React | ✓ | ✓ | ✓ | — | |
| Subscribe / unsubscribe | ✓ | ✓ | — | — | |
| Convert to work item | ✓ | ✓ | — | — | |
| Add sub-work items | ✓ | ✓ | — | — | |
| Add / remove relations | ✓ | ✓ | — | — | |

#### Epic Links

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View links | ✓ | ✓ | ✓ | — |
| Add a link | ✓ | ✓ | — | — |
| Edit a link | ✓ | ✓ | — | — |
| Delete a link | ✓ | ✓ | — | — |

#### Epic Custom Properties

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View custom properties | ✓ | ✓ | ✓ | — |
| Edit property values | ✓ | ✓ | — | — |
| Create / delete epic property definitions | ✓ | ✓ | — | — |

#### Epic Updates

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View updates | ✓ | ✓ | ✓ | — |
| Create an update | ✓ | ✓ | — | — |
| Edit own update | ✓ | Own | — | — |
| Delete own update | ✓ | Own | — | — |
| React to an update | ✓ | ✓ | — | — |
| Comment on an update | ✓ | ✓ | — | — |
| Edit own comment | ✓ | Own | — | — |
| Delete own comment | ✓ | Own | — | — |
| React to a comment | ✓ | ✓ | — | — |

### Project Updates

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View updates | ✓ | ✓ | ✓ | ✓ |
| Create an update | ✓ | ✓ | — | — |
| Edit own update | ✓ | Own | — | — |
| Delete own update | ✓ | Own | — | — |
| React to an update | ✓ | ✓ | ✓ | — |
| Comment on an update | ✓ | ✓ | — | — |
| Edit own comment | ✓ | Own | — | — |
| Delete own comment | ✓ | Own | — | — |
| React to a comment | ✓ | ✓ | ✓ | — |

### Cycles

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View cycles | ✓ | ✓ | ✓ | — |
| Create a cycle | ✓ | ✓ | — | — |
| Edit a cycle | ✓ | ✓ | — | — |
| Archive a cycle | ✓ | ✓ | — | — |
| Restore (unarchive) | ✓ | ✓ | — | — |
| Delete a cycle | ✓ | Own | — | — |
| Manage cycle (admin operations) | ✓ | — | — | — |
| Add work items to cycle | ✓ | ✓ | — | — |
| Remove work items from cycle | ✓ | ✓ | — | — |
| Transfer work items to next cycle | ✓ | ✓ | — | — |
| Edit cycle filters | ✓ | ✓ | — | — |
| Export cycle | ✓ | ✓ | — | — |
| Favourite a cycle | ✓ | ✓ | ✓ | — |

### Modules

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View modules | ✓ | ✓ | ✓ | — |
| Create a module | ✓ | ✓ | — | — |
| Edit a module | ✓ | ✓ | — | — |
| Archive a module | ✓ | ✓ | — | — |
| Restore (unarchive) | ✓ | ✓ | — | — |
| Delete a module | ✓ | Own | — | — |
| Manage module (admin operations) | ✓ | — | — | — |
| Add work items to module | ✓ | ✓ | — | — |
| Remove work items from module | ✓ | ✓ | — | — |
| Add members to module | ✓ | ✓ | — | — |
| Remove members from module | ✓ | ✓ | — | — |
| Export module | ✓ | ✓ | — | — |

### Milestones

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View milestones | ✓ | ✓ | ✓ | — |
| Create a milestone | ✓ | ✓ | — | — |
| Edit a milestone | ✓ | ✓ | — | — |
| Delete a milestone | ✓ | ✓ | — | — |
| Add work items to milestone | ✓ | ✓ | — | — |
| Remove work items from milestone | ✓ | ✓ | — | — |

### Intake

| Action | Admin | Contributor | Commenter | Guest | Notes |
|---|:---:|:---:|:---:|:---:|---|
| Submit a new intake item | ✓ | ✓ | ✓ | ✓ | All roles can submit |
| View all submissions | ✓ | ✓ | ✓ | Own | Guest: own only |
| Edit own submission | ✓ | Own | Own | Own | |
| Delete own submission | ✓ | Own | Own | Own | |
| Add attachment to own submission | ✓ | Own | Own | Own | |
| Accept a submission | ✓ | — | — | — | Only while in actionable status |
| Decline a submission | ✓ | — | — | — | Only while in actionable status |
| Snooze a submission | ✓ | — | — | — | |
| Mark as duplicate | ✓ | — | — | — | |
| Mark as spam | ✓ | — | — | — | |
| React to a submission | ✓ | ✓ | ✓ | ✓ | |
| Comment on a submission | ✓ | ✓ | ✓ | — | |
| Export intake | ✓ | ✓ | — | — | |
| Configure intake settings | ✓ | — | — | — | |
| Manage intake | ✓ | — | — | — | |

### Pages

| Action | Admin | Contributor | Commenter | Guest | Notes |
|---|:---:|:---:|:---:|:---:|---|
| View a page | ✓ | ✓ | ✓ | ✓ | Public pages viewable without role check |
| Create a page | ✓ | ✓ | — | — | |
| Edit page content / title | ✓ | ✓ | — | — | Blocked if archived or locked |
| Lock a page | ✓ | ✓ | — | — | |
| Unlock a page | ✓ | ✓ | — | — | |
| Archive a page | ✓ | ✓ | — | — | |
| Restore (unarchive) | ✓ | ✓ | — | — | |
| Delete a page | ✓ | — | — | — | Admin only |
| Duplicate a page | ✓ | ✓ | — | — | |
| Make page public / private | ✓ | ✓ | — | — | |
| Share page (publish link) | ✓ | Own | — | — | Contributor: own pages only |
| Update page icon / logo | ✓ | ✓ | — | — | |
| Move a page (reparent) | ✓ | ✓ | — | — | |
| Favourite a page | ✓ | ✓ | — | — | |
| Add comment on page | ✓ | ✓ | — | — | Uses page edit permission |
| Export / download | ✓ | ✓ | ✓ | ✓ | Anyone who can view |

### Views

| Action | Admin | Contributor | Commenter | Guest | Notes |
|---|:---:|:---:|:---:|:---:|---|
| View all views | ✓ | ✓ | ✓ | ✓ | |
| Create a view | ✓ | ✓ | — | — | |
| Edit own view | ✓ | Own | — | — | |
| Edit any view | ✓ | — | — | — | Admin only |
| Delete own view | ✓ | Own | — | — | |
| Delete any view | ✓ | — | — | — | Admin only |
| Share / make public | ✓ | Own | — | — | |
| Publish externally | ✓ | Own | — | — | |
| Export | ✓ | ✓ | — | — | |
| Favourite / pin | ✓ | ✓ | ✓ | — | Personal favourite |
| Configure views (admin) | ✓ | — | — | — | |

### States

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | ✓ | ✓ |
| Create | ✓ | — | — | — |
| Edit | ✓ | — | — | — |
| Delete | ✓ | — | — | — |
| Reorder | ✓ | — | — | — |
| Mark as default | ✓ | — | — | — |

### Labels

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | ✓ | ✓ |
| Create | ✓ | — | — | — |
| Edit | ✓ | — | — | — |
| Delete | ✓ | — | — | — |
| Reorder | ✓ | — | — | — |

### Estimates

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | ✓ | ✓ |
| Create | ✓ | — | — | — |
| Edit | ✓ | — | — | — |
| Delete | ✓ | — | — | — |

### Workflows

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | — | — |
| Create / edit / delete | ✓ | — | — | — |
| Manage | ✓ | — | — | — |

### Automations

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View automations | ✓ | ✓ | — | — |
| Create | ✓ | — | — | — |
| Edit | ✓ | — | — | — |
| Enable / disable | ✓ | — | — | — |
| Delete | ✓ | — | — | — |
| View run history | ✓ | ✓ | — | — |

### Recurring Work Items

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | — | — |
| Create | ✓ | ✓ | — | — |
| Edit | ✓ | ✓ | — | — |
| Delete | ✓ | ✓ | — | — |

### Work Item Types and Custom Properties

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | ✓ | — |
| Create | ✓ | ✓ | — | — |
| Edit | ✓ | ✓ | — | — |
| Delete | ✓ | ✓ | — | — |

### Work Item Templates

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | — | — |
| Create | ✓ | — | — | — |
| Edit | ✓ | — | — | — |
| Delete | ✓ | — | — | — |

### Page Templates

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | — | — |
| Create | ✓ | — | — | — |
| Edit | ✓ | — | — | — |
| Delete | ✓ | — | — | — |

### Project Analytics

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | ✓ | — |
| Export | ✓ | ✓ | — | — |

### Project Links

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View | ✓ | ✓ | ✓ | — |
| Add a link | ✓ | ✓ | — | — |
| Edit a link | ✓ | ✓ | — | — |
| Delete a link | ✓ | — | — | — |

### Project Assets

Files and images uploaded within project scope — includes images embedded in pages or comments, and project-scoped uploads. Commenters can upload because they need to embed images in comments.

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View / download | ✓ | ✓ | ✓ | ✓ |
| Upload | ✓ | ✓ | ✓ | — |
| Edit own upload | ✓ | Own | Own | — |
| Delete own upload | ✓ | Own | Own | — |
| Delete any upload | ✓ | — | — | — |

### Project Activity Logs

Audit trail for all changes within the project.

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View project activity | ✓ | ✓ | ✓ | ✓ |

#### Project Member Activity

Per-member activity scoped to this project — who changed what.

| Action | Admin | Contributor | Commenter | Guest |
|---|:---:|:---:|:---:|:---:|
| View member activity | ✓ | — | — | — |

## Teamspace Permissions

> Workspace Owners and Admins have full access to all teamspace content without being teamspace members — they effectively hold wildcard grants on all teamspace resources.  
> Workspace Guests cannot be added to teamspaces.

The tables below apply to users who are explicit **teamspace members**. Lead is a designation (condition), not a separate role level.

> Workspace Owners and Admins have full access to all teamspace content without being teamspace members — they effectively hold wildcard grants on all teamspace resources.  
> Workspace Guests cannot be added to teamspaces.

The tables below apply to users who are explicit **teamspace members**. Lead is a designation (condition), not a separate role level.

### Teamspace management (within a Teamspace)

| Action | Member | Lead |
|---|:---:|:---:|
| View teamspace | ✓ | ✓ |
| Edit teamspace settings (name, logo, description) | — | ✓ |
| Delete teamspace | — | ✓ |
| Manage teamspace | — | ✓ |
| Add members | — | ✓ |
| Remove members | — | ✓ |
| Assign Lead designation | — | ✓ |
| Link a project to teamspace | — | ✓ |
| Unlink a project from teamspace | — | ✓ |
| Create a work item in teamspace context | — | ✓ |

### Teamspace entity comments

Comments posted directly on the teamspace entity (not on a page or view within it).

| Action | Member | Lead | Notes |
|---|:---:|:---:|---|
| View comments | ✓ | ✓ | Also: Workspace Owner / Admin |
| Create a comment | ✓ | ✓ | |
| Edit own comment | Own | Own | |
| Delete own comment | Own | Own | |
| Delete any comment | — | — | Workspace Owner / Admin only |
| React to a comment | ✓ | ✓ | |

### Teamspace Views

| Action | Member | Lead |
|---|:---:|:---:|
| View all teamspace views | ✓ | ✓ |
| Create a view | ✓ | ✓ |
| Edit own view | Own | Own |
| Edit any view | — | ✓ |
| Delete own view | Own | Own |
| Delete any view | — | ✓ |
| Favourite / pin a view | ✓ | ✓ |

### Teamspace Pages

| Action | Member | Lead | Notes |
|---|:---:|:---:|---|
| View a page | ✓ | ✓ | Private pages: owner + shared-access users only |
| Create a page | ✓ | ✓ | |
| Edit page content / title | ✓ | ✓ | Blocked if archived or locked |
| Lock a page | ✓ | ✓ | |
| Unlock a page | ✓ | ✓ | |
| Duplicate a page | ✓ | ✓ | |
| Move a page (reparent) | ✓ | ✓ | |
| Update page icon / logo | ✓ | ✓ | |
| Archive a page | Own | ✓ | Member: own pages only |
| Restore (unarchive) | Own | ✓ | |
| Delete a page | Own | ✓ | Member: own pages only |
| Export / download | ✓ | ✓ | |
| Favourite a page | ✓ | ✓ | |
| Make page public / private | — | — | Not supported for teamspace pages |

> Making a teamspace page public or private is hardcoded off — it is not a role restriction, the feature simply does not exist for teamspace pages.

### Teamspace Page Comments

| Action | Member | Lead |
|---|:---:|:---:|
| Create a comment | ✓ | ✓ |
| Edit own comment | ✓ | ✓ |
| Delete own comment | ✓ | ✓ |
| Delete any comment | — | ✓ |
| React to a comment | ✓ | ✓ |
| Resolve a comment | ✓ | ✓ |

## See also

- [Roles and permissions](/roles-and-permissions/overview)
- [Member roles](/roles-and-permissions/member-roles)
- [Manage workspace members](/core-concepts/workspaces/members)
- [Manage project members](/core-concepts/projects/manage-project-members)
- [Create custom roles](/roles-and-permissions/custom-roles)
