---
title: Manage project access with IdP groups
sidebar_label: Group Sync
hide_title: true
description: Automatically provision project memberships based on identity provider groups.
---

# Manage project access with IdP groups <Badge type="warning" text="Enterprise Grid" />

:::info
Group syncing is currently available on the self-hosted Commercial Edition and supports OIDC only. SAML and LDAP support is coming soon.
:::

Group syncing lets workspace admins map identity provider groups to Plane projects. When users sign in via OIDC, their project memberships are provisioned and kept in sync automatically.

## Prerequisites

- OIDC SSO configured and working
- Identity provider configured to send group claims in the OIDC token

## Turn on group syncing

1. Navigate to **Workspace Settings → Group syncing**.
2. Toggle on **Enable group syncing**.

![Group syncing](https://media.docs.plane.so/sso/enable-group-sync.webp#hero)

## Configure sync settings

| Setting                 | Description                                                                  | Default               |
| ----------------------- | ---------------------------------------------------------------------------- | --------------------- |
| **Sync on login**       | Update group membership and project access when a user signs in              | Enabled (recommended) |
| **Offline sync**        | Run sync automatically every six hours, without waiting for users to log in  | Disabled              |
| **Auto remove**         | Automatically remove users from projects when they no longer match the group | Disabled              |
| **Group attribute key** | The identity provider attribute used to identify and sync user groups        | `groups`              |

Set **Group attribute key** to match exactly what your IdP sends. Common values include `groups` (default), `roles`, `memberOf`, or `custom:groups`.

## Add group mappings

Each mapping links an IdP group to a Plane project with a default role.

1. Under **Group mapping**, click **Add new group sync**.
2. Enter the **User group** name exactly as it appears in your IdP.
3. Select the **Project** to grant access to.
4. Choose the **Project role**: Admin, Member, or Guest.
5. Click **Add**.

![Add new group sync](https://media.docs.plane.so/sso/add-new-group-sync.webp#hero)

Repeat for additional group-to-project mappings.

## What happens on login

| Condition                                              | Result                                                        |
| ------------------------------------------------------ | ------------------------------------------------------------- |
| User not in workspace, but in a mapped group           | Added to workspace as Member, then added to mapped project(s) |
| User in workspace, in mapped group, not yet in project | Added to project with configured role                         |
| User in workspace, in mapped group, already in project | No change                                                     |
| User in workspace, not in any mapped group             | No action                                                     |

## When users leave IdP groups

If a user is removed from an IdP group and **Auto remove** is enabled, they're removed from the corresponding project. They are never removed from the workspace.

**These users are never auto-removed**

- Users who were manually added to the project
- Users who are the sole project admin

## Sync behavior

- Users in multiple groups mapped to the same project receive the highest role across all matching groups.
- Roles assigned manually in Plane are never downgraded by group syncing.
- Workspace guests cannot be assigned as project admins, regardless of group mapping.
- Members manually invited to the project are never auto-removed.
- Workspace membership is always preserved.
- Sole project admins are protected from removal.
- Sync errors never block user login.

## Common usecases

**New hire provisioning**  
Map your `engineering` group to all engineering projects. New engineers get access on first login without admin intervention.

**Department scoping**  
Map `product-team`, `design-team`, and `marketing-team` to their respective projects. Users only see what's relevant to them.

**Contractor offboarding**  
Map `contractors` to projects with Guest role and enable Auto remove. Access is revoked the moment they're removed from the IdP group.
