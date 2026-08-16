---
title: OAuth Scopes
description: Complete reference of all OAuth scopes available when building a Plane app. Includes read and write permissions for projects, work items, cycles, modules, and more.
keywords: plane oauth scopes, plane api permissions, oauth read write scopes, plane app authorization, plane api access control, workspace scopes, project scopes
---

# OAuth scopes

This document lists all OAuth scopes available when building a Plane app. Request only the scopes your app needs.

## Project scopes

| Scope                                       | Description                                  |
| ------------------------------------------- | -------------------------------------------- |
| `projects:read`                             | Read projects                                |
| `projects:write`                            | Create and update projects                   |
| `projects.features:read`                    | Read project features                        |
| `projects.features:write`                   | Create and update project features           |
| `projects.members:read`                     | Read project members                         |
| `projects.members:write`                    | Manage project members                       |
| `projects.states:read`                      | Read project states                          |
| `projects.states:write`                     | Create and update project states             |
| `projects.labels:read`                      | Read project labels                          |
| `projects.labels:write`                     | Create and update project labels             |
| `projects.intakes:read`                     | Read project intakes                         |
| `projects.intakes:write`                    | Create and update project intakes            |
| `projects.epics:read`                       | Read project epics                           |
| `projects.epics:write`                      | Create and update project epics              |
| `projects.cycles:read`                      | Read project cycles                          |
| `projects.cycles:write`                     | Create and update project cycles             |
| `projects.pages:read`                       | Read project pages                           |
| `projects.pages:write`                      | Create and update project pages              |
| `projects.modules:read`                     | Read project modules                         |
| `projects.modules:write`                    | Create and update project modules            |
| `projects.work_items:read`                  | Read project work items                      |
| `projects.work_items:write`                 | Create and update project work items         |
| `projects.work_items.comments:read`         | Read work item comments                      |
| `projects.work_items.comments:write`        | Create and update work item comments         |
| `projects.work_items.attachments:read`      | Read work item attachments                   |
| `projects.work_items.attachments:write`     | Create and update work item attachments      |
| `projects.work_items.links:read`            | Read work item links                         |
| `projects.work_items.links:write`           | Create and update work item links            |
| `projects.work_items.relations:read`        | Read work item relations                     |
| `projects.work_items.relations:write`       | Create and update work item relations        |
| `projects.work_items.activities:read`       | Read work item activities                    |
| `projects.work_items.activities:write`      | Create and update work item activities       |
| `projects.work_items.worklogs:read`         | Read work item worklogs                      |
| `projects.work_items.worklogs:write`        | Create and update work item worklogs         |
| `projects.work_item_types:read`             | Read work item types                         |
| `projects.work_item_types:write`            | Create and update work item types            |
| `projects.work_item_properties:read`        | Read work item properties                    |
| `projects.work_item_properties:write`       | Create and update work item properties       |
| `projects.work_item_property_options:read`  | Read work item property options              |
| `projects.work_item_property_options:write` | Create and update work item property options |
| `projects.work_item_property_values:read`   | Read work item property values               |
| `projects.work_item_property_values:write`  | Create and update work item property values  |
| `projects.milestones:read`                  | Read project milestones                      |
| `projects.milestones:write`                 | Create and update project milestones         |

## Wiki scopes

| Scope              | Description                  |
| ------------------ | ---------------------------- |
| `wiki.pages:read`  | Read wiki pages              |
| `wiki.pages:write` | Create and update wiki pages |

## Customer scopes

| Scope                             | Description                                |
| --------------------------------- | ------------------------------------------ |
| `customers:read`                  | Read customers                             |
| `customers:write`                 | Create and update customers                |
| `customers.requests:read`         | Read customer requests                     |
| `customers.requests:write`        | Create and update customer requests        |
| `customers.properties:read`       | Read customer properties                   |
| `customers.properties:write`      | Create and update customer properties      |
| `customers.property_values:read`  | Read customer property values              |
| `customers.property_values:write` | Create and update customer property values |
| `customers.work_items:read`       | Read customer work items                   |
| `customers.work_items:write`      | Create and update customer work items      |

## Initiatives scopes

| Scope                        | Description                           |
| ---------------------------- | ------------------------------------- |
| `initiatives:read`           | Read initiatives                      |
| `initiatives:write`          | Create and update initiatives         |
| `initiatives.projects:read`  | Read initiative projects              |
| `initiatives.projects:write` | Create and update initiative projects |
| `initiatives.epics:read`     | Read initiative epics                 |
| `initiatives.epics:write`    | Create and update initiative epics    |
| `initiatives.labels:read`    | Read initiative labels                |
| `initiatives.labels:write`   | Create and update initiative labels   |

## Workspace scopes

| Scope                       | Description                          |
| --------------------------- | ------------------------------------ |
| `workspaces.members:read`   | Read workspace members               |
| `workspaces.members:write`  | Manage workspace members             |
| `workspaces.features:read`  | Read workspace features              |
| `workspaces.features:write` | Create and update workspace features |

## Stickies scopes

| Scope            | Description                |
| ---------------- | -------------------------- |
| `stickies:read`  | Read stickies              |
| `stickies:write` | Create and update stickies |

## Teamspaces scopes

| Scope                       | Description                          |
| --------------------------- | ------------------------------------ |
| `teamspaces:read`           | Read teamspaces                      |
| `teamspaces:write`          | Create and update teamspaces         |
| `teamspaces.projects:read`  | Read teamspace projects              |
| `teamspaces.projects:write` | Create and update teamspace projects |
| `teamspaces.members:read`   | Read teamspace members               |
| `teamspaces.members:write`  | Create and update teamspace members  |

## Profile scopes

| Scope          | Description       |
| -------------- | ----------------- |
| `profile:read` | Read user profile |

## Assets scopes

| Scope          | Description              |
| -------------- | ------------------------ |
| `assets:read`  | Read assets              |
| `assets:write` | Create and update assets |

## Agent Run scopes

| Scope                         | Description                            |
| ----------------------------- | -------------------------------------- |
| `agents.runs:read`            | Read agent runs                        |
| `agents.runs:write`           | Create and update agent runs           |
| `agents.run_activities:read`  | Read agent run activities              |
| `agents.run_activities:write` | Create and update agent run activities |
