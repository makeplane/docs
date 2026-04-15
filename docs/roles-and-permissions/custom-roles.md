---
title: Custom roles
description: Create custom workspace and project roles tailored to your organization. Compose roles from permission schemes, base them on system roles, and assign them to members.
---

# Custom roles <Badge type="warning" text="Enterprise Grid" />

Custom roles let you define exactly what users in your workspace can do. 

Build a "Release Manager" role that can publish but not delete, a "QA Reviewer" who can comment and edit but not create, or anything else your organization needs.

For background, see [Roles and permissions](/roles-and-permissions/member-roles-and-permissions). To understand permission schemes (the building blocks of custom roles), see [Create permission schemes](/workspaces-and-users/create-permission-schemes).

![Custom roles](https://media.docs.plane.so/roles-and-permissions/workspace-custom-role.webp#hero)

## Create a custom workspace role

Custom workspace roles control access to workspace-level resources — settings, members, integrations, the wiki, and more.

1. Navigate to **Workspace settings > Roles and permissions schemes > Workspace**.
2. Click the **Roles** tab.
3. Click **Create Role** in the top right.
4. In the **Create new role** modal:
   - Enter a **Role title** (e.g., "Billing Administrator").
   - Add an optional **Description** to clarify the role's purpose.
5. Click **Create role**.

The role is created with no permissions attached. You'll be taken to the role's detail page where you can attach permission schemes.

## Create a custom project role

Custom project roles control access within projects.

1. Navigate to **Workspace settings > Roles and permissions schemes > Project**
2. Click the **Roles** tab.
3. Click **Create Role**.
4. Enter the **Role title** and **Description**.
5. Click **Create role**.

## Attach permission schemes to a role

A role's effective permissions are the combined set of all schemes attached to it.

1. Open the role from the **Roles** tab.
2. In the **Permissions Schemes** section, click **Attach Permissions Schemes**.
3. Select one or more schemes from the right-hand panel:
   - System schemes (e.g., **Workspace Member**, **Workspace Admin**, **Project Contributor**) come pre-built and cannot be modified.
   - Custom schemes can be created and edited — see [Create permission schemes](/workspaces-and-users/create-permission-schemes).
4. Click **Add**.

The role now has all permissions from the selected schemes. If a scheme grants `workitem:edit` and another scheme grants `workitem:edit+creator`, the unconditional permission wins — the role can edit any work item.

## Edit a custom role

1. Navigate to **Workspace settings > Workspace** or **Project** under **Roles And Permissions Schemes**.
2. Click the **…** menu next to the role.
3. Select **Edit role**.
4. Update the title, description, or attached permission schemes.

Changes take effect immediately for all members assigned the role. Cached permission decisions for affected users are invalidated automatically.

## Delete a custom role

1. Click the **…** menu next to the role.
2. Select **Delete role**.
3. If members are assigned the role, you'll be prompted to choose a replacement role. All affected members will be reassigned to the replacement.
4. Confirm.

::: warning System roles can't be deleted
System roles (Owner, Admin, Member, Guest, Contributor, Commenter) cannot be deleted.
:::

## Constraints on custom roles

A few rules govern what custom roles can and cannot do:

- **Cannot include reserved permissions.** Custom roles cannot grant **Delete Workspace**, **Transfer Ownership**, or full-access wildcards. These are reserved for the Owner role.
- **Workspace-scoped.** Custom roles are defined per workspace. They don't propagate to other workspaces.
- **Counted as paid seats.** Members assigned custom roles count as paid seats for billing.

## Base a custom role on a system role

A common pattern is to create a custom role that's "system role X plus extra permissions." For example, a "Senior Contributor" role that has all Contributor permissions plus the ability to manage labels and states.

1. Create the new role with a title and description.
2. Attach the system permission scheme (e.g., **Project Contributor**) to inherit those permissions.
3. Create or attach a custom scheme that adds the extra permissions you want.

::: info One-time inheritance
The custom role inherits the system scheme's permissions at the moment of attachment. If the system scheme is updated later, your custom role automatically reflects the changes (since it references the same scheme).
:::

## See also

- [Create permission schemes](/workspaces-and-users/create-permission-schemes)
- [Roles and permissions](/roles-and-permissions/member-roles-and-permissions)
- [Permissions matrix](/roles-and-permissions/permissions-matrix)