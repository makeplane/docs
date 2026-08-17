---
title: Move Plane instance to a new server
description: Migrate Plane between servers or environments. Guide for moving your Plane installation to new infrastructure.
keywords: plane migration, server migration, plane data transfer, infrastructure move, plane backup restore, self-hosting
---

# Move Plane instance to a new server <Badge type="info" text="Commercial Edition" />

Switching to another machine is straightforward on the Commercial Edition.

## Prerequisites

Before we dive in, ensure:

- You’re running Plane's Commercial Edition.
- You have a different machine with our standard config to migrate to.
- You understand the same domain will be used to host the app as the current machine.

::: warning
If you need to change your domain during migration, contact our support team for assistance.
:::

## Steps

1.  **Delink licenses**  
    Log in to Plane on your current server. Head to each paid workspace like Pro or Business and [delink the licenses](/self-hosting/manage/manage-licenses/activate-pro-and-business#delink-license-key). This will free up the licenses for activation on your new server. Ideally, you have just one paid workspace.

2.  **Backup data**  
    Create a backup of your Plane instance with ↓:

```bash
prime-cli backup
```

This command will generate a backup file in the path: `/opt/plane/backups`.

::: warning
**Prime CLI is for Docker installations only.** These commands only work on Plane instances originally installed using `prime-cli`.
:::

3.  **Set up Plane on the new server**  
    Follow the [installation guide](/self-hosting/methods/docker-compose#install-plane) to deploy Plane on the new instance.

4.  **Transfer backup files**  
    Copy the `backups` folder from the old server, created in step 2, to the new server. Place the backup in the folder `/opt/plane`.

5.  **Restore data**  
    On the new server, restore your data with ↓:

```bash
prime-cli restore
```

Follow the prompts during the restore process to make sure everything is set up correctly.

6.  **Reactivate license**  
    Finally, [reactivate your license keys](/self-hosting/manage/manage-licenses/activate-pro-and-business#activate-your-license) on the new instance.

This should get your Plane instance up and running on the new server.
