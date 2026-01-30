---
title: Manage licenses
description: Upgrade to paid plans in Plane, activate license keys on self-hosted instances, manage seats, and handle subscription changes.
---
# Manage licenses for Commercial Edition

::: warning
If you are on the self-hosted Community edition and want to upgrade to the Commercial Edition, see [Upgrade from Community](https://developers.plane.so/self-hosting/upgrade-from-community).
:::

## Activate license 
Activate a paid plan license on your self-hosted Plane instance using a license key from the Prime portal.


1.  Login to the [Prime portal](https://prime.plane.so/licenses) with the same email address you used to purchase one of our paid plans.

2.  Go to [Manage licenses](https://prime.plane.so/licenses). Copy the value of the **License key** for the license you want to activate. 

    ![Manage licenses](https://media.docs.plane.so/activate-license/copy-license-key.webp#hero)
    :::note
    Click the **Get more licenses** button as in the image above on the [Prime portal](https://prime.plane.so/licenses/plans) to buy more licenses.
    :::
3.  On the Plane app, navigate to **Workspace Settings > Billing and plans** 
4.  Click the **Activate this Workspace** button.

    ![Activate workspace](https://media.docs.plane.so/activate-license/enter-license-key-selfhosted.webp#hero-tr)
5.  Paste the license key in the **Enter license key** box.
6.  Click **Activate**. You will see a confirmation.
7.  That's it. To check your plan at any time and find additional details, just go to the **Billing and plans** tab in **Workspace Settings**.

    ![Manage subscription](https://media.docs.plane.so/activate-license/pro-activated-cloud.webp#hero-tr)

## Sync plan

If you've made changes to your subscription, like renewing your license, upgrading your plan, or adjusting seats, use **Sync plan** to pull those updates into your workspace.

Syncing refreshes your workspace with the latest subscription information from the Prime server, including plan type, seat count, expiration dates, and feature access.

**To sync your plan:**

1. Navigate to **Workspace Settings > Billing and plans**.
2. Click **Sync plan**.
3. Wait for the sync to complete. You'll see a confirmation once your workspace is updated.

Use this whenever you see a mismatch between what's in the Prime portal and what appears in your workspace, or after making any subscription changes externally.

## Delink license key

Your license key is linked to both a workspace and an instance, meaning it can only be used on one workspace on one machine at a time. If you switch machines or reinstall the Commercial edition, you’ll need to reactivate your workspace. This helps prevent any misuse of the license on multiple machines or workspaces.

To make it easier for you to move between machines or workspaces, we've added a new Delink feature. This lets you free up your license from its current workspace, so you can reuse it on a new machine or workspace.

Here’s how to delink your license key from a workspace:

1. Head over to the **Billing and Plans** screen of the workspace that's currently using the license.
2. Click **Delink license key**. This will release the license key, making it available for use on another machine or workspace.

   ![Delink license key](https://media.docs.plane.so/activate-license/delink-license-key.webp#hero-tl)
3. Restart the instance using `prime-cli restart`.
4. If you’re switching machines or reinstalling the Commercial edition, see [Move Plane instance to another server](https://developers.plane.so/self-hosting/manage/migrate-plane).
5. Ensure you are connected to the internet and reactivate the new workspace using the license key you delinked earlier.


