---
title: Upgrade from Community to Airgapped Edition
description: Deploy Plane in airgapped environment without internet access. Complete guide for offline Plane installation.
keywords: plane community to airgapped, edition upgrade, airgapped migration, offline deployment, air-gapped plane, self-hosting
---

# Upgrade from Community to Airgapped Edition

This guide walks you through migrating your existing Plane Community Edition data to an air-gapped environment. You'll backup your current installation, transfer the data, and restore it in your air-gapped setup.

::: warning
**Important**  
Make sure you already have Commercial Airgapped Edition installed on a fresh machine before starting this migration. If you haven't installed it yet, follow our [airgapped installation guide](/self-hosting/methods/airgapped-edition) first.
:::

## Prerequisites

- Install the [Commercial Airgapped Edition](/self-hosting/methods/airgapped-edition) on a fresh machine, not the one running the Community Edition.
- Be sure to log in as the root user or as a user with sudo access. The `/opt` folder requires sudo or root privileges.

## Backup data on Community instance

1. Download the latest version of `setup.sh`.

```bash
curl -fsSL https://github.com/makeplane/plane/releases/latest/download/setup.sh -o setup.sh
```

2. Run the setup.sh backup script to take the backup of the Community Edition instance.

```bash
./setup.sh backup
```

This will create a backup of the plane community instance in the `backup/` folder with the timestamp as the folder name.

```bash
backup/
└── 20250605-0938
   ├── pgdata.tar.gz
   ├── rabbitmq_data.tar.gz
   ├── redisdata.tar.gz
   └── uploads.tar.gz
```

## Restore data on Airgapped instance

1. Download the latest version of `restore-airgapped.sh`

   ```bash
   curl -fsSL https://github.com/makeplane/plane/releases/latest/download/restore-airgapped.sh -o restore-airgapped.sh
   chmod +x restore-airgapped.sh
   ```

   This allows you to restore the Community Edition data to the Commercial Airgapped instance.

2. Copy the `restore-airgapped.sh` script into your backup folder.

3. Move your entire backup folder to the server running the Commercial Airgapped Edition.

4. Open terminal, and execute the following command:

   ```bash
   sudo bash restore-airgapped.sh ./20250605-0938
   ```

   This will prompt you to enter the Commercial Airgapped Edition installation folder using whatever secure method works in your environment.

5. After the data restore is finished, start the instance.

   ```bash
   cd <airgapped-instance-folder>
   sudo docker compose -f docker-compose.yml --env-file plane.env up -d
   ```

   You can now access the Commercial Airgapped instance at `http://<ip-address|domain-name>`

Once your migration is complete, verify that all your projects, issues, and team data have been successfully transferred to your air-gapped environment.
