---
title: Configure Bitbucket for Plane integration
description: Connect Bitbucket to your self-hosted Plane instance. Sync pull requests and commits with Plane work items for development workflow tracking.
keywords: plane bitbucket integration, bitbucket cloud, bitbucket data center, bitbucket sync, pull request tracking
---

# Configure Bitbucket for Plane integration <Badge type="info" text="Pro" />

This guide walks you through setting up a Bitbucket application to enable Bitbucket integration for your Plane workspace on a self-hosted instance. Since self-hosted environments don't come pre-configured for Bitbucket, you'll need to create an OAuth consumer or application link, configure authentication, and set the necessary permissions to ensure seamless integration.

This guide covers configuration for both:

- **[Bitbucket Cloud](/self-hosting/govern/integrations/bitbucket#bitbucket-cloud)**
  The standard cloud-hosted Bitbucket service at bitbucket.org

- **[Bitbucket Data Center](/self-hosting/govern/integrations/bitbucket#bitbucket-data-center)**
  Self-hosted Bitbucket instances for organizations with specific compliance or security requirements

In this guide, you'll:

1. [Create and configure a Bitbucket application](/self-hosting/govern/integrations/bitbucket#create-bitbucket-application)
2. [Configure your Plane instance](/self-hosting/govern/integrations/bitbucket#configure-plane-instance)

::: warning
**Activate Bitbucket integration**

After creating and configuring the Bitbucket application and configuring the instance as detailed on this page, you'll need to [setup the Bitbucket integration](https://docs.plane.so/integrations/bitbucket) within Plane.
:::

## Create Bitbucket Application

:::tabs key:bitbucket-edition

== Bitbucket Cloud {#bitbucket-cloud}

Follow these steps to register an OAuth consumer in your Bitbucket workspace, set the callback URL and scopes, and then configure your Plane instance so it can sync pull requests and commits.

#### Bitbucket Cloud

1. Log in to Bitbucket Cloud and navigate to your workspace.

2. Go to **Workspace Settings → Apps & Features → OAuth Consumers**.

3. Click **Add consumer** to begin the setup.

4. Provide a **Name** for your OAuth consumer.

5. Enter the following **Callback URL**, replacing `[YOUR_DOMAIN]` with your actual domain:

   ```bash
   https://[YOUR_DOMAIN]/silo/api/oauth/bitbucket/auth/callback
   ```

6. Set permissions by selecting the required **Scopes**. The table below explains each scope:

   | Category      | Permission | Explanation                                                            |
   | ------------- | ---------- | ---------------------------------------------------------------------- |
   | Account       | `email`    | Read the user's primary email address.                                 |
   | Account       | `read`     | Read the user's account information and workspace memberships.         |
   | Repositories  | `read`     | Read access to repositories, including source code and metadata.       |
   | Repositories  | `write`    | Write access to repositories, required for creating and updating refs. |
   | Pull requests | `read`     | Read pull requests, comments, and activity on repositories.            |
   | Pull requests | `write`    | Create and update pull requests and post comments.                     |
   | Projects      | `read`     | Read project metadata and repository associations.                     |
   | Issues        | `read`     | Read issues and their comments on repositories.                        |
   | Issues        | `write`    | Create and update issues and post comments.                            |
   | Webhooks      | `read`     | Read webhook subscriptions on repositories and workspaces.             |
   | Webhooks      | `write`    | Create and manage webhook subscriptions.                               |

7. Click **Save** to finalize the setup.

== Bitbucket Data Center {#bitbucket-data-center}

These instructions cover registering an application link on your self-hosted Bitbucket Data Center instance, setting the redirect URL, and assigning the required permissions for Plane to access your repositories.

#### Bitbucket Data Center

1. Log in to your Bitbucket Data Center instance as an administrator.

2. Go to **Settings → Application Links**.

3. Click **Create link** to begin configuring a new application link.

4. Enter the URL of your Plane instance and click **Continue**.

5. Enter the following **Redirect URL**, replacing `[YOUR_DOMAIN]` with your actual domain:

   ```bash
   https://[YOUR_DOMAIN]/silo/api/oauth/bitbucket-dc/auth/callback
   ```

6. Set the required **Application Permissions**:

   | Resource     | Permission Level | Explanation                                                         |
   | ------------ | ---------------- | ------------------------------------------------------------------- |
   | Projects     | `Admin`          | Required to read project metadata and manage webhook subscriptions. |
   | Repositories | `Read`           | Read access to repository metadata, branches, and commits.          |
   | Repositories | `Write`          | Write access to create refs and update repository content.          |
   | Repositories | `Admin`          | Required to manage repository-level webhooks.                       |

7. Click **Save** to create the application link.

:::

## Configure Plane instance

:::tabs key:bitbucket-edition

== Bitbucket Cloud {#bitbucket-cloud}

1. Copy the **Key** and **Secret** from the newly created OAuth consumer.

2. Add these environment variables with the values to your Plane instance's `.env` file.

   ```bash
   BITBUCKET_CLIENT_ID=<key>
   BITBUCKET_CLIENT_SECRET=<secret>
   BITBUCKET_WEBHOOK_SECRET=<random-string>
   ```

3. Save the file and restart the instance.

4. Once you've completed the instance configuration, [activate the Bitbucket integration in Plane](https://docs.plane.so/integrations/bitbucket?edition=bitbucket-cloud).

:::
