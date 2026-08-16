---
title: Integrate Bitbucket to sync repositories with projects
description: Integrate Plane with Bitbucket Cloud and Bitbucket Data Center to automate pull request tracking and work item state mapping. Connect repositories to projects for seamless development workflows.
---

# Bitbucket Integration <Badge type="info" text="Pro" />

Integrating Bitbucket with Plane allows you to sync your development workflow by linking Bitbucket pull requests with Plane work items. This connection enables automated state updates and keeps your development activity visible alongside project planning.

Plane supports integration with:

- **Bitbucket Cloud**  
  The standard cloud-hosted Bitbucket service at bitbucket.org

- **Bitbucket Data Center**  
  Self-hosted Bitbucket instances for organizations with specific compliance or security requirements

::: info
Bitbucket integration supports **pull request automation only**. Issue sync between Bitbucket and Plane is not available.
:::

This guide walks you through connecting your Bitbucket account, linking repositories to Plane, and configuring pull request automation.

## Set up Bitbucket integration

To get started, you'll need to connect your Bitbucket account, link repositories, and configure Plane projects for PR automation. Follow the steps below:

1. [Connect your Bitbucket account](/integrations/bitbucket#connect-bitbucket-account)
2. [Connect a Bitbucket repository](/integrations/bitbucket#connect-bitbucket-repository)
3. [Connect Plane project](/integrations/bitbucket#connect-plane-project)

### Connect Bitbucket account

Link your Bitbucket account to your Plane workspace to start syncing pull requests.

:::tabs key:bitbucket-edition

== Bitbucket Cloud {#bitbucket-cloud}

> [!CAUTION] Self-hosted Plane instance (Commercial Edition)
> If you're running a self-hosted instance of Plane, you'll need to configure Bitbucket OAuth app credentials before proceeding. Check out the [setup guide](https://developers.plane.so/self-hosting/govern/integrations/bitbucket?edition=bitbucket-cloud) first before diving into the steps on this page.

1. Navigate to [Workspace Settings](/core-concepts/workspaces/overview#access-workspace-settings) in Plane.
2. Go to the **Integrations** tab.
3. Locate the **Bitbucket** integration section.
4. Click **Connect** to authenticate your Bitbucket account and initiate the connection.

   ![Connect Bitbucket](https://media.docs.plane.so/integrations/bitbucket/connect-bitbucket.webp#hero)

5. Review the requested permissions and click **Grant access** to authorize Plane.
6. Once authenticated, your Bitbucket account will appear as connected.

== Bitbucket Data Center {#bitbucket-dc}

> [!CAUTION] Plane Cloud and self-hosted instances
> Before integrating with Bitbucket Data Center, you must first create a Application Link in your Bitbucket DC admin panel. This is required for both Plane Cloud and self-hosted users.
>
> Follow this [setup guide](https://developers.plane.so/self-hosting/govern/integrations/bitbucket?edition=bitbucket-datacenter) first before diving into the steps on this section.

1. Navigate to [Workspace Settings](/core-concepts/workspaces/overview#access-workspace-settings) in Plane.
2. On the right pane, select **Integrations**.
3. Find the **Bitbucket Data Center** integration and click **Configure**.
4. In the **Connect Account** section, click **Connect**.
5. Fill in the form with your Bitbucket Data Center instance details:
   - **Base URL** — The URL of your Bitbucket DC instance (e.g. `https://bitbucket.yourcompany.com`)
   - **Client ID** — From the OAuth consumer you created in Bitbucket DC
   - **Client Secret** — From the OAuth consumer you created in Bitbucket DC
   - **Webhook Secret** — Optional but recommended for webhook signature verification
6. Click **Connect** to start the OAuth flow.
7. Authorize the Plane app on your Bitbucket DC instance.
8. After authorization, you'll be redirected back to Plane with your account shown as connected.

:::

At this stage, your Bitbucket account is linked to Plane, but you still need to connect specific repositories.

### Connect Bitbucket repository

Connecting a Bitbucket repository allows Plane to receive pull request events from that repository via webhooks. Plane automatically creates the required webhook on the repository when you connect it.

To connect a repository:

1. In the **Repository Connections** section, click **Add**.
2. Search for and select the **Bitbucket repository** you want to link.
3. Click **Continue** to confirm the selection.

Once connected, the repository will appear in the list and Plane will begin listening for pull request events from it.

### Connect Plane project

After linking a Bitbucket repository, associate it with a Plane project to enable PR state automation. This connection determines which Plane project's work items are updated when pull requests change state.

1. Select the **Plane project** you want to connect.

2. In the **Pull Request Automation** section, configure how Plane should update work item states based on pull request lifecycle events.

3. Once configured, the project connection will appear in the **Plane Project Connections** section.

### Connect personal Bitbucket account

This step allows comments made in Plane to appear in Bitbucket under your personal Bitbucket user account, rather than the Plane integration bot.

Workspace admins can connect their personal Bitbucket account from the Bitbucket integration page.

1. In the **Connect personal account** section under **Integrations**, click **Connect**.
2. Review the required permissions and authorize Plane to access your Bitbucket account.
3. After granting permissions, the status will update to show your personal account is connected.

::: info
Only one Workspace Admin can connect their Bitbucket account via Workspace Settings. Other workspace members can connect their accounts through [Profile Settings](/integrations/github#from-profile-settings).
:::

All other workspace members can connect their personal Bitbucket accounts from the **Connections** page in Workspace Settings.

1. Go to [Workspace Settings](/core-concepts/workspaces/overview#access-workspace-settings).
2. Select the **Connections** tab in the sidebar.
3. Click **Connect** in the Bitbucket section, which will redirect you to Bitbucket for authentication.
   ::: info
   If your workspace doesn't have Bitbucket integration enabled, you won't be able to connect your personal account. Contact your Workspace Admin to enable it.
   :::
4. Once connected, your Bitbucket account will be listed in Plane.

## Configure PR state automation

Pull requests in connected Bitbucket repositories are synchronized with Plane work items to keep your project tracking accurate throughout the development lifecycle.

To automate pull request state changes with Plane work items:

1. Reference Plane work items in your Bitbucket PR title or description using the appropriate format. See [Reference formats](#reference-formats) below.
2. Plane automatically updates the work item state based on the Bitbucket PR state, as defined in your PR state mapping.

### Reference formats

There are two ways to reference Plane work items in your Bitbucket pull requests:

#### With brackets [WEB-344] — State automation

- Links the work item to the PR
- Adds a comment from the Plane bot showing linked work items
- Automatically updates the work item state based on PR state changes (as configured in your PR state mapping)

#### Without brackets WEB-344 — Link only

- Links the work item to the PR as a reference
- Adds a comment from the Plane bot showing referenced work items
- Does not trigger automatic state updates

_Example_

```
PR Title: [WEB-344] Add user authentication feature
PR Description: Implements login functionality for WEB-345
```

In this example:

- WEB-344 will be fully automated — its state changes along with the PR state
- WEB-345 will be linked as a reference only — no state automation

### PR lifecycle mapping

The lifecycle of a Bitbucket pull request can be mapped to workflow states in Plane. The following PR states are available for mapping:

- A PR is opened
- A PR is updated
- The PR is merged
- The PR is declined (closed without merging)

:::tabs key:bitbucket-edition

== Bitbucket Cloud {#bitbucket-cloud-pr}

Bitbucket Cloud fires events at each stage of the pull request lifecycle:

- `pullrequest:created` — A new PR is opened
- `pullrequest:updated` — The PR title, description, or reviewers change
- `pullrequest:fulfilled` — The PR is successfully merged
- `pullrequest:rejected` — The PR is declined/closed without merging

== Bitbucket Data Center {#bitbucket-dc-pr}

Bitbucket Data Center fires the following pull request events:

- `pr:opened` — A new PR is opened (including draft PRs)
- `pr:modified` — The PR title, description, or reviewers change
- `pr:merged` — The PR is successfully merged
- `pr:declined` — The PR is declined/closed without merging

:::

### Work item backlinks in pull requests

When a PR references Plane work items, Plane posts a confirmation comment on the pull request listing all linked and referenced work items. This keeps Bitbucket reviewers informed about which Plane issues the PR relates to.
