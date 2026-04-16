---
title: Create permission schemes
description: Build reusable permission bundles that can be combined to compose custom roles. Permission schemes group related permissions so you can manage access in modular pieces.
---

# Create permission schemes <Badge type="warning" text="Enterprise Grid" />

A **permission scheme** is a named bundle of permissions that you can attach to one or more roles. Schemes are the modular building blocks of custom roles — instead of defining every permission individually for each role, you create reusable schemes and combine them.

For background, see [Roles and permissions](/roles-and-permissions/overview). To create roles that use schemes, see [Create custom roles](/roles-and-permissions/custom-roles).

## Why use permission schemes

Permission schemes give you three advantages:

- **Reuse.** The same scheme can power multiple roles. Update the scheme once, and every role using it picks up the change.
- **Modularity.** Build focused schemes that do one thing well, then combine them. A "Release Manager" role might combine **Project Contributor** + a custom **Release Publishing** scheme.
- **Clarity.** Schemes have descriptive names and clear scopes, making role definitions easier to read and audit.

![Custom permission schemes](https://media.docs.plane.so/roles-and-permissions/workspace-custom-permission-scheme.webp#hero)

## Create a workspace permission scheme

Workspace schemes contain permissions that apply at the workspace level.

1. Navigate to **Workspace settings > Roles and permissions schemes > Workspace**.
2. Click the **Permission Schemes** tab.
3. Click **Create Permission Scheme** in the top right.
4. In the **Create permission scheme** form:
   - **Scheme name** — a short, descriptive name.
   - **Description** — optional explanation of the scheme's purpose.
5. In the permissions section, check the boxes for the permissions this scheme should grant.
6. Use **Select All** within a group to enable every permission in that group, or **Search permissions** at the top to find specific permissions.
7. Click **Create permission scheme**.

The scheme is saved and immediately available to attach to roles.

## Create a project permission scheme

Project schemes contain permissions that apply within projects.

1. Navigate to **Workspace settings > Roles and permissions schemes > Project**.
2. Click the **Permission Schemes** tab.
3. Click **Create Permission Scheme**.
4. Fill in the scheme name and description.
5. Select permissions from the project-level groups.
6. Click **Create permission scheme**.

## Edit a permission scheme

1. Navigate to the **Permission Schemes** tab.
2. Click the **…** menu next to the scheme.
3. Select **Edit permission scheme**.
4. Update the name, description, or selected permissions.
5. Save your changes.

::: warning Changes propagate to roles
Editing a scheme immediately updates the effective permissions of every role that has it attached. Members assigned those roles will have their permissions refreshed on their next request.
:::

## Delete a permission scheme

1. Click the **…** menu next to the scheme.
2. Select **Delete permission scheme**.
3. Confirm.

::: warning Schemes attached to roles
Deleting a scheme removes its permissions from any role using it. If a role had that scheme as its only source of permissions, the role will be left with no effective permissions until you attach another scheme.
:::

::: info System schemes can't be deleted
System schemes (e.g., **Workspace Owner**, **Workspace Admin**, **Workspace Member**, **Workspace Guest**) are tagged "System" and cannot be edited or deleted.
:::

## Attach a scheme to a role

1. Open the role from the **Roles** tab.
2. In the **Permissions Schemes** section, click **Attach Permissions Schemes**.
3. Check the schemes you want to attach.
4. Click **Add**.

The role's effective permissions become the union of all attached schemes.

## How permissions combine

When a role has multiple schemes attached, the effective permission set is the union of all of them. The combination rules are:

- **Unconditional grants win over conditional ones.** If one scheme grants `workitem:delete` and another grants `workitem:delete+creator`, the role gets unconditional `workitem:delete`.
- **More permissive wins.** If schemes grant the same permission, it's still granted (there's no "negative override" within scheme combinations — that requires GAC).
- **Permission dependencies are auto-managed.** Enabling a permission auto-enables its prerequisites (e.g., enabling Edit auto-enables View). Disabling a prerequisite auto-disables permissions that depend on it.

## See also

- [Create custom roles](/roles-and-permissions/custom-roles)
- [Roles and permissions](/roles-and-permissions/overview)
- [Permissions matrix](/roles-and-permissions/permissions-matrix)
