---
title: Upgrade from Community to Commercial Edition
description: Upgrade self-hosted Plane to the latest version. Step-by-step guide for updating your Plane installation safely.
keywords: plane upgrade community to commercial, edition migration, plane pro upgrade, plane business upgrade, self-hosting upgrade
---

# Upgrade from Community to Commercial Edition

The Commercial edition comes with the free plan and the flexibility to upgrade to a paid plan at any point.

> [!WARNING]
> The instructions provided on this page are specific to installations using Docker. If you are running Plane on Kubernetes, you'll need to manually create a database dump and back up your file storage by copying the relevant volumes or storage paths.

## Prerequisites

- Install the [Commercial Edition](/self-hosting/methods/docker-compose#install-plane) on a fresh machine, not the one running the Plane Community Edition.
- Be sure to log in as the root user or as a user with sudo access. The `/opt` folder requires sudo or root privileges.

:::tabs key:upgrade-options
== Standard setup (built-in DB & storage) {#standard-setup}

This upgrade path is for installations using Plane's default PostgreSQL database and MinIO object storage.

## Back up data on Community instance

1. Download the latest version of `setup.sh`.

   ```bash
   curl -fsSL https://github.com/makeplane/plane/releases/latest/download/setup.sh -o setup.sh
   ```

2. Run the setup.sh backup script to take the backup of the Community Edition instance.

   ```bash
   ./setup.sh backup
   ```

3. When done, your data will be backed up to the folder shown on the screen.
   e.g., `/plane-selfhost/plane-app/backup/20240522-1027`
   This folder will contain 3 `tar.gz` files.
   - `pgdata.tar.gz`
   - `redisdata.tar.gz`
   - `uploads.tar.gz`

4. Copy all the three files from the server running the Community Edition to any folder on the server running the Commercial Edition.

   e.g., `~/ce-backup`

## Restore data on Commercial instance

1. Start any command-line interface like Terminal and go into the folder with the back-up files.
   ```
   cd ~/ce-backup
   ```
2. Copy and paste the script below on Terminal and hit Enter.

   ```
    TARGET_DIR=/opt/plane/data
    sudo mkdir -p $TARGET_DIR

    for FILE in *.tar.gz; do
        if [ -e "$FILE" ]; then
            tar -xzvf "$FILE" -C "$TARGET_DIR"
        else
            echo "No .tar.gz files found in the current directory."
            exit 1
        fi
    done

    # Remove destinations first, then mv
    sudo rm -rf $TARGET_DIR/db && mv $TARGET_DIR/pgdata $TARGET_DIR/db
    sudo rm -rf $TARGET_DIR/redis && mv $TARGET_DIR/redisdata $TARGET_DIR/redis

    mkdir -p $TARGET_DIR/minio
    sudo rm -rf $TARGET_DIR/minio/uploads && mv $TARGET_DIR/uploads $TARGET_DIR/minio/uploads
   ```

3. This script will extract your Community Edition data and restore it to `/opt/plane/data`.

== Managed services (external DB and storage) {#managed-services}

This upgrade path is for installations using external or managed database and object storage services (like AWS RDS and S3). Since your data already lives in external services, you only need to update your configuration — no backup and restore required.

## Update configuration for Commercial Edition

1.  Open the `plane.env` file located at `/opt/plane/plane.env`.

2.  Configure database connection.
    1. Find the `DATABASE_URL` environment variable.
    2. Verify it points to your external database:

       ```ini
       DATABASE_URL=postgresql://user:password@your-db-host:5432/plane
       ```

       If you need to change it, update the value with your managed database connection string.

    3. Configure object storage
       1. Find the `#DATASTORE SETTINGS` section in `plane.env`
       2. Update these environment variables for your external storage:

       ```ini
       USE_MINIO=0
       AWS_REGION=us-east-1
       AWS_ACCESS_KEY_ID=<your-access-key>
       AWS_SECRET_ACCESS_KEY=<your-secret-key>
       AWS_S3_ENDPOINT_URL=https://s3.amazonaws.com
       AWS_S3_BUCKET_NAME=plane-uploads
       ```

       :::info
       Setting `USE_MINIO=0` disables the local MinIO service and enables external object storage (S3 or S3-compatible services).
       :::

3.  Restart Plane services to apply the configuration:
    ```bash
    prime-cli restart
    ```

Your Commercial Edition instance is now connected to your existing external database and storage.
:::

:::details Manual backup and restore without CLI

Use this method if you prefer to back up data manually or if the setup.sh script isn't working for your environment.

### What gets migrated

- PostgreSQL database (all Plane data)
- MinIO uploads (attachments, images, files)

### Prerequisites

- Plane CE and Commercial versions should be compatible
- Shell access to both servers
- Docker installed on both servers

### Back up data on Community instance

1. Create backup folders:

   ```bash
   mkdir -p ~/ce-backups/db
   mkdir -p ~/ce-backups/minio/uploads
   cd ~/ce-backups
   ```

2. Back up PostgreSQL data:

   ```bash
   docker cp plane-app-plane-db-1:/var/lib/postgresql/data/. db/
   ```

3. Back up MinIO uploads:

   ```bash
   docker cp plane-app-plane-minio-1:/export/uploads minio/uploads/
   ```

4. Verify backup sizes:

   ```bash
   du -sh db minio/uploads
   ```

   Make sure sizes look reasonable (not just a few KB).

5. Transfer backup to Commercial server:

   ```bash
   scp -r ~/ce-backups user@commercial-server:/tmp/
   ```

### Restore data on Commercial instance

1. Stop Plane:

   ```bash
   prime-cli stop
   ```

   Verify all containers are down:

   ```bash
   docker ps
   ```

2. Back up existing Commercial data (safety precaution):

   ```bash
   mv /opt/plane/data/db /opt/plane/data/db.bak
   mv /opt/plane/data/minio/uploads /opt/plane/data/minio/uploads.bak
   ```

3. Restore PostgreSQL:

   ```bash
   mv /tmp/ce-backups/db /opt/plane/data/db
   ```

4. Restore MinIO uploads:

   ```bash
   mv /tmp/ce-backups/minio/uploads /opt/plane/data/minio/uploads
   ```

5. Start Plane:

   ```bash
   prime-cli restart
   ```

### Validate the migration

- Login works
- Projects are visible
- Attachments open correctly

### Rollback

If something fails, restore from the backup you created in step 2:

```bash
prime-cli stop

rm -rf /opt/plane/data/db
mv /opt/plane/data/db.bak /opt/plane/data/db

rm -rf /opt/plane/data/minio/uploads
mv /opt/plane/data/minio/uploads.bak /opt/plane/data/minio/uploads

prime-cli restart
```

:::

## What's next

- [Activate a paid plan license](/self-hosting/manage/manage-licenses/activate-pro-and-business).
