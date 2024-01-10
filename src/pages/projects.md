---
title: Projects
pageTitle: Projects | Plane
description: Projects let you manage teams and tasks within your Workspace. After creating your Workspace, you will need to create a new project.
---

Projects let you manage teams and tasks within your Workspace. After creating
your [Workspace](/workspaces), you will need to create a new project.

{% callout type="note" %}
Before inviting a user to a project, you'll need to invite them to the
workspace. Then, you can choose to add them to the project from the list of
users on the workspace.
{% /callout %}

## Key project attributes

Every project comes with two key attributes that make it easier to plan and set permissions for users on the workspace.

- **Identifier**: The project identifier is attached to every issue in the project to make it easier to track and differentiate each issue across projects and the workspace.

{% callout type="note" %}
You can always choose to update your identifier. This will only replace the ID
string on the issue, but not the number next to it. Note that identifiers can
only contain uppercase text and no special characters or numbers.
{% /callout %}

These options can be found under the General tab inside Project>Settings ⬇️

<project-name>/projects/<id>/settings.

- **Network**: To restrict other users on the workspace, you can set the network of the project to either Private or Secret. When made public, all users on the workspace can choose to join the project. When set to secret, admins need to invite workspace members to join the project.

## Project controls

When working on multiple projects, you can set project controls to make it
easier. These controls include a project lead and default issue assignee.

- **Project lead**: The project lead will help you identify and connect with the project leader to make it easier for you to assign tasks or communicate.

- **Default issue assignee**: Everything inside a project is broken down into [issues](/issues). If you want every issue to be assigned, you can choose to set a default assignee for times when an issue is created without any assignees

These options can be found under the Control tab inside Project>Settings ⬇️

<project-name>/projects/<id>/settings/control.

## Project members

When the project is set to the Public network under project controls, it is open to all members on the workspace. When set to Secret network, workspace members must be invited to the project to gain access.

For every member that is invited to the project, you can control their roles
just [like on the workspace](workspace/#workspace-roles). All roles (Admin, Member, Guest, Viewer) are
supported.

These options can be found under the Members tab inside Project>Settings ⬇️

<project-name>/projects/<id>/settings/members.

## Project states

To organize issues based on the principles of project management, we allow you
to create custom states in the default grouped states. This will make it
easier to use project views and filtering.

Default states:

- Backlog
- Unstarted
- Started
- Completed
- Cancelled

Inside these default states, you can create as many states as you like based
on the type of default state.

These options can be found under the States tab inside Project>Settings ⬇️

<project-name>/projects/<id>/settings/states.

## Project labels

Similar to states, labels on projects help you filter or differentiate issues
within your project. You can create and control as many issue labels as
needed.

{% callout type="note" %}Labels can also be created from the issue detail page.{% /callout %}

These options can be found under the Labels tab inside Project>Settings ⬇️

<project-name>/projects/<id>/settings/labels.

## Delete a project

We restrict the delete access to project admin, _we plan to extend this feature to workspace owners as well_.

These options can be found under the General tab inside Project>Settings ⬇️

<project-name>/projects/<id>/settings/general.

{% callout type="note" %}
If a project is deleted, all of its content, issues, cycles, and modules will
also be deleted. Currently, Plane does not offer a automatic backup service on
cloud or self-hosted versions, but it is planned on our roadmap.
{% /callout %}

## Project shortcuts

1. Create a new project: CTRL/CMD + P

## Project plans

- **Cloud**: All-plans, no suggestion, no limits.
- **Self-hosted**: No plans, no suggestion, no limits.
