---
title: Upgrade Airgapped Edition (Docker)
description: Upgrade your airgapped Plane instance running on Docker by cloning images, replacing configuration files, and uploading a new license.
keywords: plane airgapped upgrade, air-gapped docker upgrade, plane offline update
---

# Update Airgapped Edition on Docker

Since airgapped instances can't pull updates from the internet, updating the version requires manually transferring the latest Docker images and configuration files from a machine with internet access.

## Prerequisites

- A machine with internet access to download images and files.
- Access to your airgapped Docker registry.
- Your current `plane.env` file backed up.

## Update Plane

1. On a machine with internet access, pull the latest Plane images and push them to your airgapped Docker registry. Follow the guide for [cloning and pushing Plane Docker images](https://developers.plane.so/self-hosting/methods/clone-docker-images).

   Once complete, the latest Plane images are available in your internal registry.

2. On the same machine with internet access, download the updated `docker-compose.yml` and environment template for your target version.

   ```bash
   # Download docker-compose.yml
   curl -fsSL https://prime.plane.so/releases/<plane_version>/docker-compose-airgapped.yml -o docker-compose.yml

   # Download environment template
   curl -fsSL https://prime.plane.so/releases/<plane_version>/variables-airgapped.env -o plane.env
   ```

   Transfer both files to your airgapped instance and replace the existing ones. Before replacing your existing `plane.env`, compare it with the new template. Copy over any custom values from your old plane.env into the new template. The new template may include additional variables required by the latest version, so always use the new file as the base and bring your existing values into it.

   :::info
   Replace `<plane_version>` with the version you're upgrading to (e.g., v2.6.3). Check the [release notes](https://plane.so/changelog?category=self-hosted) for the latest available release version.
   :::

3. Download the latest license file for the new version from [prime.plane.so](https://prime.plane.so). Follow [this guide](https://developers.plane.so/self-hosting/manage/manage-licenses/activate-airgapped) to activate license.

4. Restart the instance to bring the instance back up with the new configuration.

   ```bash
   docker compose up -d
   ```

Verify the upgrade by checking the version in your Plane application.
