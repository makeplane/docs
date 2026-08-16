---
title: Mandatory checkpoint at v0.14.0
description: Upgrade self-hosted Plane to the latest version. Step-by-step guide for updating your Plane installation safely.
keywords: plane v0.14 upgrade, mandatory checkpoint, plane migration 0.13, breaking changes, version upgrade, self-hosting update
---

# Mandatory checkpoint at v0.14.0 <Badge type="info" text="Community Edition" />

If you’re upgrading from `v0.13.2` or below, there are some additional migration steps due to significant changes in the self-hosting setup. Follow these instructions to migrate your data to the new volume structure in `v0.14.0`.

1. First, stop the running `v0.13-2` (or older) instance of Plane. If it's still running, you might hit a "ports not available" error, which will prevent the `v0.14-0` containers from starting up correctly.

   ```bash
   docker compose down
   ```

2. Create a new folder for `v0.14-0` to ensure a clean installation.

   ```bash
   mkdir plane-selfhost
   cd plane-selfhost
   ```

3. Set up the environment variable for the `RELEASE` variable, then download and prepare the installation script:

   ```bash
   export RELEASE=v0.14-dev
   curl -fsSL https://raw.githubusercontent.com/makeplane/plane/master/deploy/selfhost/install.sh | sed -e 's@BRANCH=${BRANCH:-master}@BRANCH='"$RELEASE"'@' -e 's@APP_RELEASE="stable"@APP_RELEASE='"$RELEASE"'@' > setup.sh
   chmod +x setup.sh
   ```

4. Execute the script to install Plane:

   ```bash
   ./setup.sh install
   ```

5. Start up your new v0.14-0 Plane instance:

   ```bash
   ./setup.sh start
   ```

6. Now stop the instance to initialize the new Docker volumes:

   ```bash
   ./setup.sh stop
   ```

7. Download the migration script:

   ```bash
   curl -fsSL -o migrate.sh https://raw.githubusercontent.com/makeplane/plane/master/deploy/selfhost/migration-0.13-0.14.sh
   chmod +x migrate.sh
   ```

8. Run the migration script:

   ```bash
   ./migrate.sh
   ```

   You’ll see the following instructions:

   ```
   ******************************************************************

   This script is solely for the migration purpose only.
   This is a 1 time migration of volume data from v0.13.2 => v0.14.x

   Assumption:
   1. Postgres data volume name ends with _pgdata
   2. Minio data volume name ends with _uploads
   3. Redis data volume name ends with _redisdata

   Any changes to this script can break the migration.

   Before you proceed, make sure you run the below command
   to know the docker volumes

   docker volume ls -q | grep -i "_pgdata"
   docker volume ls -q | grep -i "_uploads"
   docker volume ls -q | grep -i "_redisdata"

   *******************************************************

   Given below list of REDIS volumes, identify the prefix of source and destination volumes leaving "_redisdata"
   ---------------------
   plane-app_redisdata
   v0132_redisdata

   Provide the Source Volume Prefix :
   ```

9. Open a second terminal and run the commands shown above to identify your source and destination volume prefixes. For example, if you run `docker volume ls -q | grep -i "_pgdata"`, you might see something like:

   ![](/images/update-plane/docker-volumes.png)

   In this example, `plane-013-dev` is the prefix for `v0.13.2`, and `plane-app` is the prefix for `v0.14.0`.

10. Return to the original terminal, enter the source volume prefix `plane-013-dev` and destination volume prefix `plane-app`, and press ENTER:

    ```bash
    Provide the Source Volume Prefix : plane-013-dev
    Provide the Destination Volume Prefix : plane-app
    ```

    If there are any issues, an error will appear. For a successful migration, there will be no error, and the process will exit quietly.

11. Restart the upgraded v0.14.0 instance with:

    ```bash
    ./setup.sh restart
    ```

12. Login as instance admin by appending `/god-mode` to your domain.

13. Once logged in, just click **Save Changes** to finalize your setup.

14. You’re all set! Log in to your updated `v0.14-0` instance to check if all of your data has migrated successfully.

15. Now, [update to the latest version](/self-hosting/manage/upgrade-plane#update-version).
