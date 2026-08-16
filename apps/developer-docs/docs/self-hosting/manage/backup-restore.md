---
title: Backup and restore data
description: Backup and restore Plane data. Complete guide for backing up database, storage, and configuration files.
keywords: plane backup, plane restore, database backup, postgresql backup, data recovery, plane data export, self-hosting
---

# Backup and restore data <Badge type="info" text="Commercial Edition" />

Backing up your data regularly helps prevent data loss and allows you to restore your system quickly if necessary. Follow these instructions to back up and restore your data using Plane’s command-line interface.

## For Docker Compose

### Backup data

::: warning
**Prime CLI is for Docker installations only.** These commands only work on Plane instances originally installed using `prime-cli`.
:::

Create a backup of your Plane data with ↓:

```bash
sudo prime-cli backup
```

This command initiates a full backup of all critical data, storing it in the default backup location at:

```bash
/opt/plane/backups
```

Each backup file will be timestamped to ensure you can easily identify the latest or a specific backup if needed.

### Backup plane.env

If you need to back up only the `plane.env` file, you'll need to do it manually. Here’s how:

1. Navigate to the `/opt/plane` folder on your machine or server where Plane is installed..
2. Locate the `plane.env` file.
3. Copy this file to a different location as a backup, so you can restore it if needed.

### Restore data

You can restore your data from a previous backup with ↓:

```bash
sudo prime-cli restore
```

This command prompts the restoration process, which will overwrite the current data with the data from the most recent backup file. Ensure you have selected the correct backup before running this command, as restoring will replace your current data.

::: details Community Edition

#### Backup data

To create a backup, start by running the setup script:

```bash
./setup.sh
```

You’ll see a menu of options—just type 7 to select "Backup Data."

```
Select an Action you want to perform:
   1) Install (x86_64)
   2) Start
   3) Stop
   4) Restart
   5) Upgrade
   6) View Logs
   7) Backup Data
   8) Exit

Action [2]: 7
```

The system will start backing up the PostgreSQL, Redis, and upload data:

```
Backing Up plane-app_pgdata
Backing Up plane-app_redisdata
Backing Up plane-app_uploads

Backup completed successfully. Backup files are stored in /....../plane-app/backup/20240502-1120
```

The backup files are stored locally, so you can copy them to an external storage service if needed for extra security.

#### Backup plane.env

If you need to back up only the `plane.env` file, you'll need to do it manually. Here’s how:

1. Navigate to the folder on your machine or server where Plane is installed..
2. Locate the `plane.env` file.
3. Copy this file to a different location as a backup, so you can restore it if needed.

---

#### Restore data

Follow these steps to restore data from a backup:

1. Make sure Plane-CE is installed and started, then stop it. This ensures the necessary Docker volumes are ready.

2. Use the command ↓ to download the restore script. It’s easiest to save it in the same directory as `setup.sh`.

   ```bash
   curl -fsSL -o restore.sh https://raw.githubusercontent.com/makeplane/plane/refs/heads/preview/deployments/cli/community/restore.sh
   chmod +x restore.sh
   ```

3. Now, run the command ↓ to restore your data, specifying the path to your backup folder (the folder with the `*.tar.gz` files):

   ```bash
   ./restore.sh <path to backup folder containing *.tar.gz files>
   ```

   Here’s an example output for restoring from /opt/plane-selfhost/plane-app/backup/20240722-0914:

   ```bash
       --------------------------------------------
       ____  _                          /////////
       |  _ \| | __ _ _ __   ___         /////////
       | |_) | |/ _` | '_ \ / _ \   /////    /////
       |  __/| | (_| | | | |  __/   /////    /////
       |_|   |_|\__,_|_| |_|\___|        ////
                                       ////
       --------------------------------------------
       Project management tool from the future
       --------------------------------------------
       Found /opt/plane-selfhost/plane-app/backup/20240722-0914/pgdata.tar.gz
       .....Restoring plane-app_pgdata
       .....Successfully restored volume plane-app_pgdata from pgdata.tar.gz

       Found /opt/plane-selfhost/plane-app/backup/20240722-0914/redisdata.tar.gz
       .....Restoring plane-app_redisdata
       .....Successfully restored volume plane-app_redisdata from redisdata.tar.gz

       Found /opt/plane-selfhost/plane-app/backup/20240722-0914/uploads.tar.gz
       .....Restoring plane-app_uploads
       .....Successfully restored volume plane-app_uploads from uploads.tar.gz


       Restore completed successfully.
   ```

4. Start your Plane instance again with ↓:
   ```bash
   ./setup.sh start
   ```

That’s it! You’re back up and running with your restored data.

:::

## Other deployment methods

For Kubernetes, or other deployment methods, use your platform's native backup tools. Plane stores data in two places that need to be backed up:

| Component               | What it contains                                                             |
| ----------------------- | ---------------------------------------------------------------------------- |
| **PostgreSQL database** | All Plane data — workspaces, projects, work items, users, comments, settings |
| **Object storage**      | Attachments, uploaded images, files (MinIO, S3, or S3-compatible storage)    |

### Configuration files

Also back up your environment configuration — this includes database connection strings, storage credentials, and other settings.

- **Kubernetes:** Helm values file, ConfigMaps, and Secrets
- **Other platforms:** Environment variables or configuration files specific to your setup

:::tip
Store backups in a separate location from your Plane installation — ideally offsite or in a different cloud region.
:::
