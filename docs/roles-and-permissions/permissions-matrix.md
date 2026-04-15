---
title: Permissions matrix
description: Complete permissions reference for every role in Plane. Organized by the same permission groups used in the role builder so you can compare exactly what each role can and can't do.
---

# Permissions matrix

This is the exhaustive permissions reference for every system defined role in Plane.

For conceptual background, see [Roles and permissions](/roles-and-permissions/overview). For the role catalog, see [Member roles](/roles-and-permissions/member-roles).

## How to read this page

**Legend**

- ✓ - the role has unconditional access to this permission.
- **+Creator** - the role can perform the action only on resources they created.
- **+Lead** - the role can perform the action only if they're the teamspace lead.
- x - the role does not have this permission.

**Owner has full access.** Workspace Owner holds a full-access wildcard and matches every permission in this document. The Owner column is omitted from individual tables and assumed ✓ throughout.

**Workspace Admin and Owner bypass projects.** Both have wildcard access to every project resource type, so they appear as ✓ on all project-level permissions even without explicit project membership.

## Workspace permissions

### Workspace settings

Core workspace configuration: name, logo, currency, domain, archival, deletion, and ownership transfer.

| Permission              | Owner | Admin | Member | Guest |
| ----------------------- | ----- | ----- | ------ | ----- |
| View Workspace          | ✓     | ✓     | ✓      | ✓     |
| Edit Workspace Settings | ✓     | ✓     | x      | x     |
| Manage Workspace        | ✓     | ✓     | x      | x     |
| Invite Members          | ✓     | ✓     | x      | x     |
| Archive Workspace       | ✓     | ✓     | x      | x     |
| Delete Workspace        | ✓     | x     | x      | x     |
| Transfer Ownership      | ✓     | x     | x      | x     |

Only Owner can delete the workspace or transfer ownership.

### Member management

Inviting, editing, importing, and removing workspace members.

| Permission                 | Owner | Admin | Member | Guest |
| -------------------------- | ----- | ----- | ------ | ----- |
| View Members               | ✓     | ✓     | ✓      | ✓     |
| Invite Members             | ✓     | ✓     | x      | x     |
| Edit Member Details        | ✓     | ✓     | x      | x     |
| Import Members (CSV / SSO) | ✓     | ✓     | x      | x     |
| Change Member Role         | ✓     | ✓     | x      | x     |
| Remove Members             | ✓     | ✓     | x      | x     |

Role hierarchy is enforced. Admins cannot modify members at the same or higher level than their own.

### Project management

Creating and managing projects from the workspace context.

| Permission                     | Owner | Admin | Member | Guest |
| ------------------------------ | ----- | ----- | ------ | ----- |
| Browse Projects                | ✓     | ✓     | ✓      | x     |
| View Project Details           | ✓     | ✓     | ✓      | x     |
| Create Projects                | ✓     | ✓     | ✓      | x     |
| Edit Project Settings          | ✓     | ✓     | x      | x     |
| React to Projects              | ✓     | ✓     | ✓      | x     |
| Publish Projects (make public) | ✓     | ✓     | ✓      | x     |
| Archive Projects               | ✓     | ✓     | x      | x     |
| Delete Projects                | ✓     | ✓     | x      | x     |
| Manage Project Access          | ✓     | ✓     | x      | x     |

Guests can only see projects they've been explicitly added to.

### Role administration

Creating and managing custom roles and project roles.

| Permission              | Owner | Admin | Member | Guest |
| ----------------------- | ----- | ----- | ------ | ----- |
| View Custom Roles       | ✓     | ✓     | x      | x     |
| Create Custom Roles     | ✓     | ✓     | x      | x     |
| Edit Custom Roles       | ✓     | ✓     | x      | x     |
| Delete Custom Roles     | ✓     | ✓     | x      | x     |
| View Project Roles      | ✓     | ✓     | x      | x     |
| Create Project Roles    | ✓     | ✓     | x      | x     |
| Edit Project Roles      | ✓     | ✓     | x      | x     |
| Delete Project Roles    | ✓     | ✓     | x      | x     |
| Define Role Permissions | ✓     | ✓     | x      | x     |

Custom roles and permission schemes are an Enterprise feature.

### Wiki

Workspace-level wikis.

| Permission            | Owner | Admin | Member | Guest |
| --------------------- | ----- | ----- | ------ | ----- |
| View Wiki             | ✓     | ✓     | ✓      | x     |
| Create Wiki Pages     | ✓     | ✓     | ✓      | x     |
| Edit Wiki Pages       | ✓     | ✓     | ✓      | x     |
| Share Wiki Pages      | ✓     | ✓     | ✓      | x     |
| Delete Wiki Pages     | ✓     | ✓     | ✓      | x     |
| Comment on Wiki Pages | ✓     | ✓     | ✓      | x     |

### Workspace Views

Workspace-level saved filters and view management.

| Permission              | Owner | Admin | Member   | Guest |
| ----------------------- | ----- | ----- | -------- | ----- |
| View Workspace Views    | ✓     | ✓     | ✓        | ✓     |
| Create Workspace Views  | ✓     | ✓     | ✓        | x     |
| Edit Workspace Views    | ✓     | ✓     | +Creator | x     |
| Share Workspace Views   | ✓     | ✓     | ✓        | x     |
| Publish Workspace Views | ✓     | ✓     | ✓        | x     |
| Export Workspace Views  | ✓     | ✓     | ✓        | x     |
| Delete Workspace Views  | ✓     | ✓     | +Creator | x     |

Members can only edit and delete views they created themselves.

### Initiatives

Cross-project initiative tracking, including comments, attachments, links, and updates.

| Permission                    | Owner | Admin | Member   | Guest |
| ----------------------------- | ----- | ----- | -------- | ----- |
| View Initiatives              | ✓     | ✓     | ✓        | x     |
| Create Initiatives            | ✓     | ✓     | x        | x     |
| Edit Initiatives              | ✓     | ✓     | x        | x     |
| Manage Initiatives            | ✓     | ✓     | x        | x     |
| Delete Initiatives            | ✓     | ✓     | x        | x     |
| Edit Initiative Comments      | ✓     | ✓     | +Creator | x     |
| Delete Initiative Comments    | ✓     | ✓     | +Creator | x     |
| Delete Initiative Attachments | ✓     | ✓     | +Creator | x     |
| Post Initiative Updates       | ✓     | ✓     | ✓        | x     |
| Edit Initiative Updates       | ✓     | ✓     | ✓        | x     |
| Delete Initiative Updates     | ✓     | ✓     | ✓        | x     |

### Teamspaces

Browsing, creating, and managing teamspaces.

| Permission               | Owner | Admin | Member | Guest |
| ------------------------ | ----- | ----- | ------ | ----- |
| Browse Teamspaces        | ✓     | ✓     | ✓      | x     |
| View Teamspace Details   | ✓     | ✓     | ✓      | x     |
| Create Teamspaces        | ✓     | ✓     | x      | x     |
| Edit Teamspaces          | ✓     | ✓     | +Lead  | x     |
| Manage Teamspace Members | ✓     | ✓     | +Lead  | x     |
| Delete Teamspaces        | ✓     | ✓     | +Lead  | x     |

Editing, deleting, or managing members on a teamspace requires being the teamspace lead. Workspace Admin role alone is not sufficient.

### Integrations

Third-party integrations, webhooks, and API tokens.

| Permission             | Owner | Admin | Member | Guest |
| ---------------------- | ----- | ----- | ------ | ----- |
| View Integrations      | ✓     | ✓     | ✓      | x     |
| Create Integrations    | ✓     | ✓     | ✓      | x     |
| Configure Integrations | ✓     | ✓     | ✓      | x     |
| Delete Integrations    | ✓     | ✓     | x      | x     |
| View Webhooks          | ✓     | ✓     | x      | x     |
| Create Webhooks        | ✓     | ✓     | x      | x     |
| Edit Webhooks          | ✓     | ✓     | x      | x     |
| Delete Webhooks        | ✓     | ✓     | x      | x     |
| View API Tokens        | ✓     | ✓     | ✓      | x     |
| Create API Tokens      | ✓     | ✓     | ✓      | x     |
| Delete API Tokens      | ✓     | ✓     | ✓      | x     |

### Analytics and reporting

Dashboards, analytics, and work logs.

| Permission        | Owner | Admin | Member | Guest |
| ----------------- | ----- | ----- | ------ | ----- |
| View Analytics    | ✓     | ✓     | ✓      | x     |
| Export Analytics  | ✓     | ✓     | ✓      | x     |
| View Dashboards   | ✓     | ✓     | ✓      | x     |
| Create Dashboards | ✓     | ✓     | x      | x     |
| Edit Dashboards   | ✓     | ✓     | x      | x     |
| Delete Dashboards | ✓     | ✓     | x      | x     |
| View Work Logs    | ✓     | ✓     | ✓      | x     |
| Export Work Logs  | ✓     | ✓     | ✓      | x     |
| Use AI Features   | ✓     | ✓     | ✓      | x     |

### Customers

Customer and customer request management.

| Permission                  | Owner | Admin | Member | Guest |
| --------------------------- | ----- | ----- | ------ | ----- |
| View Customers              | ✓     | ✓     | x      | x     |
| Create Customers            | ✓     | ✓     | x      | x     |
| Edit Customers              | ✓     | ✓     | x      | x     |
| Delete Customers            | ✓     | ✓     | x      | x     |
| Add Customer Attachments    | ✓     | ✓     | x      | x     |
| Delete Customer Attachments | ✓     | ✓     | x      | x     |

### Work Item Relations

Managing custom relation type definitions for work items.

| Permission                  | Owner | Admin | Member | Guest |
| --------------------------- | ----- | ----- | ------ | ----- |
| View Relation Definitions   | ✓     | ✓     | ✓      | ✓     |
| Create Relation Definitions | ✓     | ✓     | x      | x     |
| Edit Relation Definitions   | ✓     | ✓     | x      | x     |
| Delete Relation Definitions | ✓     | ✓     | x      | x     |

### Templates

Creating and managing workspace-level work item, page, and project templates.

| Permission       | Owner | Admin | Member | Guest |
| ---------------- | ----- | ----- | ------ | ----- |
| View Templates   | ✓     | ✓     | ✓      | x     |
| Create Templates | ✓     | ✓     | x      | x     |
| Edit Templates   | ✓     | ✓     | x      | x     |
| Delete Templates | ✓     | ✓     | x      | x     |

### Plane Runner

Workspace-level automation rules and configurations.

| Permission                   | Owner | Admin | Member | Guest |
| ---------------------------- | ----- | ----- | ------ | ----- |
| View Workspace Automations   | ✓     | ✓     | ✓      | x     |
| Create Workspace Automations | ✓     | ✓     | x      | x     |
| Edit Workspace Automations   | ✓     | ✓     | x      | x     |
| Delete Workspace Automations | ✓     | ✓     | x      | x     |

## Project permissions

Workspace Owner and workspace Admin have wildcard access to all project resource types and appear as ✓ throughout the project tables. The columns below cover project-level role assignments only.

### Project Members

Inviting, editing, and removing project members.

| Permission           | P-Admin | Contributor | Commenter | Guest |
| -------------------- | ------- | ----------- | --------- | ----- |
| View Project Members | ✓       | ✓           | ✓         | ✓     |
| Invite Members       | ✓       | x           | x         | x     |
| Edit Member Details  | ✓       | x           | x         | x     |
| Change Member Role   | ✓       | x           | x         | x     |
| Remove Members       | ✓       | x           | x         | x     |

### Work Items

The primary issue surface, including comments, attachments, links, relations, and custom properties.

| Permission             | P-Admin | Contributor | Commenter | Guest    |
| ---------------------- | ------- | ----------- | --------- | -------- |
| View Issues            | ✓       | ✓           | ✓         | +Creator |
| Create Issues          | ✓       | ✓           | x         | x        |
| Edit Issues            | ✓       | ✓           | +Creator  | +Creator |
| Bulk Edit Issues       | ✓       | ✓           | x         | x        |
| Export Issues          | ✓       | ✓           | x         | x        |
| React to Issues        | ✓       | ✓           | ✓         | x        |
| Delete Issues          | ✓       | +Creator    | x         | x        |
| Add Comments           | ✓       | ✓           | ✓         | x        |
| Edit Comments          | ✓       | +Creator    | +Creator  | x        |
| React to Comments      | ✓       | ✓           | ✓         | ✓        |
| Delete Comments        | ✓       | +Creator    | +Creator  | x        |
| View Attachments       | ✓       | ✓           | ✓         | ✓        |
| Add Attachments        | ✓       | ✓           | ✓         | x        |
| Delete Attachments     | ✓       | +Creator    | +Creator  | x        |
| View Work Item Links   | ✓       | ✓           | ✓         | x        |
| Add Work Item Links    | ✓       | ✓           | x         | x        |
| Edit Work Item Links   | ✓       | ✓           | x         | x        |
| Delete Work Item Links | ✓       | ✓           | x         | x        |
| View Custom Properties | ✓       | ✓           | ✓         | x        |
| Edit Custom Properties | ✓       | ✓           | x         | x        |

Project Guest sees only their own work items (issues created via intake). All other Guest views of issues are filtered to creator.

### Epics

Epic lifecycle, including links, properties, and update threads.

| Permission                  | P-Admin | Contributor | Commenter | Guest |
| --------------------------- | ------- | ----------- | --------- | ----- |
| View Epics                  | ✓       | ✓           | ✓         | x     |
| Create Epics                | ✓       | ✓           | x         | x     |
| Edit Epics                  | ✓       | ✓           | x         | x     |
| Delete Epics                | ✓       | +Creator    | x         | x     |
| View Epic Properties        | ✓       | ✓           | ✓         | x     |
| Edit Epic Properties        | ✓       | ✓           | x         | x     |
| View Epic Updates           | ✓       | ✓           | ✓         | x     |
| Post Epic Updates           | ✓       | ✓           | x         | x     |
| Edit Epic Updates           | ✓       | +Creator    | x         | x     |
| Delete Epic Updates         | ✓       | +Creator    | x         | x     |
| Edit Epic Update Comments   | ✓       | +Creator    | x         | x     |
| Delete Epic Update Comments | ✓       | +Creator    | x         | x     |

### Modules and Cycles

Feature grouping and sprint/cycle management.

| Permission            | P-Admin | Contributor | Commenter | Guest |
| --------------------- | ------- | ----------- | --------- | ----- |
| View Modules          | ✓       | ✓           | ✓         | x     |
| Create Modules        | ✓       | ✓           | x         | x     |
| Edit Modules          | ✓       | ✓           | x         | x     |
| Manage Module Members | ✓       | ✓           | x         | x     |
| Archive Modules       | ✓       | ✓           | x         | x     |
| Export Modules        | ✓       | ✓           | x         | x     |
| Delete Modules        | ✓       | +Creator    | x         | x     |
| View Cycles           | ✓       | ✓           | ✓         | x     |
| Create Cycles         | ✓       | ✓           | x         | x     |
| Edit Cycles           | ✓       | ✓           | x         | x     |
| Delete Cycles         | ✓       | +Creator    | x         | x     |

### Pages and Views

Project-level pages and saved views.

| Permission            | P-Admin | Contributor | Commenter | Guest |
| --------------------- | ------- | ----------- | --------- | ----- |
| View Pages            | ✓       | ✓           | ✓         | ✓     |
| Create Pages          | ✓       | ✓           | x         | x     |
| Edit Pages            | ✓       | ✓           | x         | x     |
| Share Pages           | ✓       | ✓           | x         | x     |
| Delete Pages          | ✓       | x           | x         | x     |
| View Project Views    | ✓       | ✓           | ✓         | ✓     |
| Create Project Views  | ✓       | ✓           | x         | x     |
| Edit Project Views    | ✓       | +Creator    | x         | x     |
| Share Project Views   | ✓       | +Creator    | x         | x     |
| Publish Project Views | ✓       | +Creator    | x         | x     |
| Export Project Views  | ✓       | ✓           | x         | x     |
| Delete Project Views  | ✓       | +Creator    | x         | x     |

Page deletion is restricted to project Admins only. Contributors can edit pages but cannot delete them.

### Intake

Issue intake and triage workflow.

| Permission                                 | P-Admin | Contributor | Commenter | Guest    |
| ------------------------------------------ | ------- | ----------- | --------- | -------- |
| View Intake                                | ✓       | ✓           | ✓         | x        |
| Create Intake Items                        | ✓       | ✓           | ✓         | ✓        |
| Submit Intake Requests                     | ✓       | ✓           | ✓         | ✓        |
| Edit Intake Items                          | ✓       | +Creator    | +Creator  | +Creator |
| React to Intake Items                      | ✓       | ✓           | ✓         | x        |
| Manage Intake Items (accept/reject/snooze) | ✓       | x           | x         | x        |
| Configure Intake                           | ✓       | x           | x         | x        |
| Export Intake                              | ✓       | ✓           | x         | x        |
| Delete Intake Items                        | ✓       | +Creator    | +Creator  | +Creator |

Status changes (accept, reject, snooze, mark duplicate) are admin-only. Editing is restricted to creators for non-admin roles, with editable fields limited to name, description, priority, target/start dates, labels, and assignees.

### Project Configuration

Labels, states, estimates, and milestones.

| Permission        | P-Admin | Contributor | Commenter | Guest |
| ----------------- | ------- | ----------- | --------- | ----- |
| View Labels       | ✓       | ✓           | ✓         | ✓     |
| Create Labels     | ✓       | x           | x         | x     |
| Edit Labels       | ✓       | x           | x         | x     |
| Delete Labels     | ✓       | x           | x         | x     |
| View States       | ✓       | ✓           | ✓         | ✓     |
| Create States     | ✓       | x           | x         | x     |
| Edit States       | ✓       | x           | x         | x     |
| Delete States     | ✓       | x           | x         | x     |
| View Estimates    | ✓       | ✓           | ✓         | ✓     |
| Create Estimates  | ✓       | x           | x         | x     |
| Edit Estimates    | ✓       | x           | x         | x     |
| Delete Estimates  | ✓       | x           | x         | x     |
| View Milestones   | ✓       | ✓           | ✓         | x     |
| Create Milestones | ✓       | ✓           | x         | x     |
| Edit Milestones   | ✓       | ✓           | x         | x     |
| Delete Milestones | ✓       | ✓           | x         | x     |

### Automation and Workflows

Automations, workflow rules, and recurring work items.

| Permission             | P-Admin | Contributor | Commenter | Guest |
| ---------------------- | ------- | ----------- | --------- | ----- |
| View Automations       | ✓       | ✓           | x         | x     |
| Create Automations     | ✓       | x           | x         | x     |
| Edit Automations       | ✓       | x           | x         | x     |
| Delete Automations     | ✓       | x           | x         | x     |
| View Workflows         | ✓       | ✓           | ✓         | ✓     |
| Create Workflows       | ✓       | x           | x         | x     |
| Edit Workflows         | ✓       | x           | x         | x     |
| Delete Workflows       | ✓       | x           | x         | x     |
| View Recurring Items   | ✓       | ✓           | x         | x     |
| Create Recurring Items | ✓       | ✓           | x         | x     |
| Edit Recurring Items   | ✓       | ✓           | x         | x     |
| Delete Recurring Items | ✓       | ✓           | x         | x     |

### Project Updates

Progress updates and comments on updates.

| Permission                     | P-Admin | Contributor | Commenter | Guest |
| ------------------------------ | ------- | ----------- | --------- | ----- |
| View Project Updates           | ✓       | ✓           | ✓         | ✓     |
| Post Project Updates           | ✓       | ✓           | x         | x     |
| Edit Project Updates           | ✓       | +Creator    | x         | x     |
| Delete Project Updates         | ✓       | +Creator    | x         | x     |
| Edit Project Update Comments   | ✓       | +Creator    | x         | x     |
| Delete Project Update Comments | ✓       | +Creator    | x         | x     |

### Analytics and Activity

Project analytics and activity logs.

| Permission        | P-Admin | Contributor | Commenter | Guest |
| ----------------- | ------- | ----------- | --------- | ----- |
| View Activity Log | ✓       | ✓           | ✓         | x     |

### Project Links

Project-level links.

| Permission           | P-Admin | Contributor | Commenter | Guest |
| -------------------- | ------- | ----------- | --------- | ----- |
| View Project Links   | ✓       | ✓           | ✓         | x     |
| Add Project Links    | ✓       | ✓           | x         | x     |
| Edit Project Links   | ✓       | ✓           | x         | x     |
| Delete Project Links | ✓       | ✓           | x         | x     |

### Templates

Project-scoped work item and page templates.

| Permission       | P-Admin | Contributor | Commenter | Guest |
| ---------------- | ------- | ----------- | --------- | ----- |
| View Templates   | ✓       | ✓           | x         | x     |
| Create Templates | ✓       | x           | x         | x     |
| Edit Templates   | ✓       | x           | x         | x     |
| Delete Templates | ✓       | x           | x         | x     |

## Teamspace permissions

Teamspace content access requires teamspace membership. Workspace Owner has full bypass via wildcard. Workspace Admin has resource-level wildcards for teamspace content (view, create, edit, delete teamspace content) but does **not** automatically have teamspace edit, delete, or member management. Those require the teamspace lead condition.

### Teamspace

| Permission     | TS-Member | TS-Member +Lead |
| -------------- | --------- | --------------- |
| View           | ✓         | ✓               |
| Edit settings  | x         | ✓ +Lead         |
| Delete         | x         | ✓ +Lead         |
| Manage members | x         | ✓ +Lead         |

### Teamspace Comments

| Permission       | TS-Member     | TS-Member +Lead |
| ---------------- | ------------- | --------------- |
| View             | ✓             | ✓               |
| Create           | ✓             | ✓               |
| Edit (own)       | +Creator      | ✓ (any)         |
| Delete (own/any) | +Creator only | ✓ (any)         |
| React            | ✓             | ✓               |

### Teamspace Views

| Permission | TS-Member     | TS-Member +Lead |
| ---------- | ------------- | --------------- |
| View       | ✓             | ✓               |
| Create     | ✓             | ✓               |
| Edit       | +Creator only | ✓ (any)         |
| Delete     | +Creator only | ✓ (any)         |

### Teamspace Pages

| Permission        | TS-Member         | TS-Member +Lead |
| ----------------- | ----------------- | --------------- |
| View              | ✓                 | ✓               |
| Create            | ✓                 | ✓               |
| Edit              | ✓ (collaborative) | ✓               |
| Delete            | Owner only        | ✓ (any)         |
| Archive/Unarchive | Owner only        | ✓ (any)         |
| Lock/Unlock       | Owner only        | ✓ (any)         |

### Teamspace Page Comments

| Permission        | TS-Member     | TS-Member +Lead |
| ----------------- | ------------- | --------------- |
| Create            | ✓             | ✓               |
| Edit              | +Creator only | ✓ (any)         |
| Delete            | +Creator only | ✓ (any)         |
| React             | ✓             | ✓               |
| Resolve/Unresolve | ✓             | ✓               |

## Edge cases and behavioral nuances

### Workspace Owners and Admins can't be locked out of projects

Removing a workspace Owner or Admin from a project removes the project-level membership record but has no functional effect. Their workspace-level wildcards still grant access through inheritance.

### Hidden permissions reserved for specific roles

| Permission                      | Holder        | Notes                                   |
| ------------------------------- | ------------- | --------------------------------------- |
| Delete Workspace                | Owner only    | Cannot be granted via custom roles      |
| Transfer Ownership              | Owner only    | Cannot be granted via custom roles      |
| Manage Billing                  | Owner + Admin | Billing access                          |
| Manage Integrations (uninstall) | Admin only    | Some destructive integration operations |

### Creator-only business rules

Some restrictions apply regardless of role level. Even an Admin cannot bypass them:

- A workspace view can only be edited by its creator.
- A project view can only be edited by its creator.

### Permissions that cannot be added to custom roles

| Permission         | Why                |
| ------------------ | ------------------ |
| Full access (`*`)  | Reserved for Owner |
| Delete Workspace   | Reserved for Owner |
| Transfer Ownership | Reserved for Owner |

### Permission dependencies

Some permissions require others to function. The role builder enforces these automatically. Enabling a permission auto-enables its prerequisites, and disabling a prerequisite auto-disables permissions that depend on it.

Common dependencies:

- Edit requires View on the same resource type.
- Delete requires View on the same resource type.
- Member management actions require View Members on the relevant scope.

## Feature flags that gate permissions

Some permissions only become available when the corresponding feature is enabled at the workspace or project level. If a feature is disabled, the related permissions exist in the role definition but have no effect.

## Conditional grants summary

For convenience, here are all the conditional grants in the system:

| Role                | Permission                                       | Condition |
| ------------------- | ------------------------------------------------ | --------- |
| Project Contributor | Delete work items, epics, modules, cycles        | Creator   |
| Project Contributor | Edit and delete comments and attachments         | Creator   |
| Project Contributor | Edit, delete, share, and publish views           | Creator   |
| Project Contributor | Edit and delete intake items                     | Creator   |
| Project Contributor | Edit and delete project, epic, and cycle updates | Creator   |
| Project Contributor | Edit and delete project assets                   | Creator   |
| Project Commenter   | Edit and delete work items                       | Creator   |
| Project Commenter   | Edit and delete comments                         | Creator   |
| Project Commenter   | Edit and delete intake items                     | Creator   |
| Project Guest       | View, edit, and delete intake items              | Creator   |
| Workspace Member    | Edit and delete workspace views                  | Creator   |
| Workspace Member    | Edit and delete wiki collections                 | Creator   |
| Workspace Member    | Edit and delete initiative comments              | Creator   |
| Workspace Member    | Delete initiative attachments                    | Creator   |
| Workspace Member    | Delete workspace drafts                          | Creator   |
| Teamspace Member    | Edit, delete, and manage teamspace               | Lead      |
| Teamspace Member    | Edit and delete teamspace comments               | Creator   |
| Teamspace Member    | Edit and delete teamspace views                  | Creator   |

## See also

- [Roles and permissions](/roles-and-permissions/overview)
- [Member roles](/roles-and-permissions/member-roles)
- [Manage workspace members](/core-concepts/workspaces/members)
- [Manage project members](/core-concepts/projects/manage-project-members)
- [Create custom roles](/roles-and-permissions/custom-roles)
