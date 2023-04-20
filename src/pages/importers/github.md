---
title: GitHub Importer
pageTitle: GitHub Importer | Plane
description: Import issues from your Github repository into Plane.
---

Import issues from your Github repository into Plane.

{% callout type="note" %}
This feature is only available on Plane Cloud, and will be soon shipped for Plane self-hosted version.
{% /callout %}

## GitHub Importer

With Plane's GitHub importer, importing issues from a selected GitHub repository to a chosen project on Plane is just a few clicks away.

This effortless process allows you to conveniently plan and adopt issues into your internal team by utilizing the powerful features of Cycles, Modules, and other tools available on Plane.

## What will be Importing?

We'll map the following fields in GitHub Issues to these fields in Plane:

| GitHub Issues | Plane       |
| ------------- | ----------- |
| Title         | Title       |
| Description   | Description |
| Labels        | Labels      |
| Comments      | Comments    |

## Instructions to use GitHub Importer

### Integrate GitHub on your Workspace

All the importers are managed under Workspace settings, to use GitHub importer the first step is to navigate to `Workspace Settings > Integrations`.

![workspace-settings](/images/workspace-settings.png)

To begin, click on the `Add Installation` button. This will prompt you to authorize your GitHub account. You can choose to grant full permission or select specific organizations based on the issues you want to import from.

After, integrating GitHub onto your Workspace, you’ll see the integration status saying `Installed`.

![integration](/images/integration.png)

### Starting the Import

After integrating GitHub to your Workspace, navigate to the `Import/Export` tab in the workspace settings. Here, you should see a message indicating a successful connection status under the `Configure` tab.

![configure](/images/configure.png)

### Choose the GitHub repository and the Plane project

The next step is to select the GitHub repository from which you want to import issues, as well as the Plane project to which you want to import them. Finally, toggle the `Sync Issues` option to perform a final check.

![sync](/images/sync.png)

### Verify the Details

During this step, you will be able to see the number of issues, labels, and users that are being imported from the GitHub repository onto the Plane project.

![verify](/images/verify.png)

### Map the users from GitHub to Plane

While importing, you have the option to map users from GitHub to Plane, or choose not to do so. We provide you with three options:

- Map to existing users
- Invite by email if the user is not already on Plane
- Do not import users

![map](/images/map.png)

### Confirm, Import and Refresh

The final step is to hit `Confirm` in order to import your GitHub data onto Plane. The import process may take anywhere from 1 to 5 minutes depending on the number of issues in the GitHub repository.

![confirm](/images/confirm.png)

![import](/images/import.png)

### Verifying your Imports

When you navigate to the Plane project where you have imported the GitHub issues, you will see all the new issues from GitHub labeled as `GitHub-Migrated`. This label will indicate that these issues have been moved without raising conflicts with existing issues.

![merge](/images/merge.png)

All the properties mentioned above, including comments, will be imported.

![comments](/images/comments.png)

{% callout type="note" %}
Please note that the importer services are still a work in progress. We plan to make this open-source soon and will also extend its features based on community requirements.
{% /callout %}
