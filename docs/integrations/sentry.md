---
title: Integrate Sentry for automatic error tracking sync
description: Integrate Plane with Sentry to automatically create work items from Sentry issues, sync issue states, and streamline your error tracking workflow.
---

# Integrate Sentry for automatic error tracking sync

<Tags :tags='[{ name: "Pro", link: "https://plane.so/pricing", additionalClass: "pro" }]' />

Integrating Sentry with Plane allows your team to automatically create work items from Sentry issues and keep your error tracking workflow streamlined. Whether you're syncing issue states, creating work items from errors, or collaborating on bug fixes, this integration brings the power of Sentry and Plane together for a more connected development workflow.

This guide will walk you through how to set up and connect your Sentry account to Plane.

## Set up Sentry integration

Follow the steps below to complete the setup:

1. [Connect your Sentry account](/integrations/sentry#connect-your-sentry-account)
2. [Set up Resolution States](/integrations/sentry#set-up-resolution-states)

### Connect your Sentry account

To get started, you need to connect your Sentry account to Plane.

![Connect Sentry](https://media.docs.plane.so/sentry/sentry_install.png#hero#hero)

1. Navigate to [Workspace Settings](/core-concepts/workspaces/overview#access-workspace-settings) in Plane.
2. On the right pane, select **Integrations**.
3. Find the **Sentry** integration and click **Configure**.
4. Click the **Install** button. This will redirect you to Sentry's authentication page. Sentry will ask you to review the permissions it needs to integrate with Plane. Make sure to allow them.
5. After allowing permissions, you'll be redirected back to Plane. You should now see that your Sentry account is successfully connected.

That's it! Your Sentry account is now integrated with Plane.

### Set up Resolution States

Select resolution states for Sentry issues. Configure which states to use when a Sentry issue is resolved or unresolved and vice versa.

1. In the **Sentry** integration settings, find the **State Mapping** section.
2. Select the Plane project you want to sync Sentry issues to.
3. Configure how Sentry issue states should map to Plane project states:
   - **Unresolved** → Select the appropriate Plane project status (e.g., "Open" or "In Progress")
   - **Resolved** → Select the appropriate Plane project status (e.g., "Done" or "Closed")
4. Click **Save** to apply your state mapping configuration.

![State Mapping](https://media.docs.plane.so/sentry/sentry_project_mapping.png#hero)

![Post State Mapping](https://media.docs.plane.so/sentry/sentry_config.png#hero#hero)

::: info
State mapping ensures that when Sentry issues are automatically synced to Plane, they appear with the correct state. You can always modify these mappings later if your workflow changes.
:::

## Use the Sentry integration

Now that Sentry is connected to your Plane workspace, we can resolve Sentry issues from Plane and vice versa.

### Set up Sentry alerts

In Sentry alerts, users can setup an action to auto create a work item in Plane when trigger and conditions are met.

![Sentry Alert Setup](https://media.docs.plane.so/sentry/create_issue_alert.png#hero)

![Sentry Plane Sync Modal](https://media.docs.plane.so/sentry/create_workitem_modal.png#hero)

1. Navigate to your Sentry project settings.
2. Go to **Alerts** and click **Create Alert Rule**.
3. Select environment and project.
4. Setup conditions to filter the alerts (e.g., error rate threshold, issue frequency, etc.).
5. Create an action to create a Plane work item.
6. Click **Settings** and open the modal to configure the properties on work item that will be created on Plane like priority, assignee, etc.
7. Save your alert rule.

::: info
Once configured, Sentry will automatically create work items in your selected Plane project whenever the alert conditions are met. This ensures that critical errors are immediately tracked and assigned to your development team.
:::

### Link Sentry issues to Plane work items

On a Sentry issue, you can use Makeplane in the "Issue Tracking" section to link the current issue to a Plane work item. This will start a bi-directional state sync between Sentry issues and Plane work items.

1. Navigate to any Sentry issue in your project.
2. Scroll down to the **Issue Tracking** section.
3. Click on **Makeplane** to link this issue to a Plane work item.
4. Search for and select the existing Plane work item you want to link, or create a new one.
5. Click **Save Changes** to establish the connection.

![Link Sentry Issue](https://media.docs.plane.so/sentry/issue_tracking.png#hero)

![Create / Link Work Item](https://media.docs.plane.so/sentry/create_link.png#hero)

Once linked, the Sentry issue and Plane work item will sync bi-directionally:

- If the issue is resolved on Sentry, it will be closed on Plane.
- If the work item is marked as done on Plane, it will be resolved on Sentry.

::: info
This bi-directional sync keeps your error tracking and project management in perfect alignment, ensuring that issue resolution status is consistent across both platforms.
:::

### Update work item status from Plane

Once the state on a work item is moved to the resolved state specified during state mapping, the Sentry issue will get automatically resolved.

1. Navigate to the linked work item in Plane.
2. Change the work item state to the resolved state you configured during state mapping.
3. The Sentry issue will automatically be marked as resolved.

If the status is changed back to the unresolved state of your Sentry mapping, it will mark the Sentry issue as "unresolved" as well.

::: info
This automatic status synchronization works both ways - changes in Plane reflect in Sentry, and changes in Sentry reflect in Plane, keeping your error tracking and project management perfectly synchronized.
:::
