---
title: Deploy Plane with Podman Quadlets
description: Install Plane using Podman Quadlets. Guide for deploying Plane with Podman as a Docker alternative with systemd integration.
keywords: plane podman, podman quadlets, systemd containers, docker alternative, rootless containers, plane podman deployment, self-hosting
---

# Deploy Plane with Podman Quadlets <Badge type="info" text="Commercial Edition" />

This guide shows you the steps to deploy a self-hosted instance of Plane using Podman Quadlets.

## Prerequisites

Before we start, make sure you've got these covered:

- A non-root user account with `systemd --user support` (most modern Linux setups have this)
- Podman version **4.4 or higher**

## Set up Podman

1. Add the Podman repository.

   ```bash
   echo 'deb http://download.opensuse.org/repositories/home:/alvistack/Debian_12/ /' | sudo tee /etc/apt/sources.list.d/home:alvistack.list
   ```

2. Add the GPG key.

   ```bash
   curl -fsSL https://download.opensuse.org/repositories/home:alvistack/Debian_12/Release.key | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/home_alvistack.gpg > /dev/null
   ```

3. Refresh your package lists.

   ```bash
   sudo apt update
   ```

4. Install Podman and its dependencies.

   ```bash
   sudo apt install -y podman uidmap netavark passt
   ```

   The `uidmap` package handles user namespace mapping, `netavark` takes care of networking, and `passt` helps with network connectivity.

5. Download and extract Podman Quadlets.

   ```bash
   mkdir podman-quadlets
   curl -fsSL https://prime.plane.so/releases/v2.6.3/podman-quadlets.tar.gz -o podman-quadlets.tar.gz
   tar -xvzf podman-quadlets.tar.gz -C podman-quadlets
   ```

   The directory contains an `install.sh` script that will handle the installation and configuration.

## Install Plane

The installation script sets up Plane and configures all required services. You have two options:

### Without sudo access

```bash
./install.sh --domain your-domain.com --base-dir /your/custom/path
```

This installs Plane in your specified directory, which is useful if you want to maintain control over the installation location.

### With sudo access

```bash
./install.sh --domain your-domain.com
```

This installs Plane in `/opt/plane`, which is a standard system location.

::: info
Systemd configurations are installed in `~/.config/containers/systemd/`
:::

## Configure external services (optional)

If you use external services for database, Redis, RabbitMQ, OpenSearch, or object storage (MinIO/S3), edit `plane.env` in your Plane installation directory (e.g. `/opt/plane` or your custom path from `--base-dir`) before starting services.
See [Environment variables](/self-hosting/govern/environment-variables) for more details.

- **Database** — In the **DB SETTINGS** section, set `DATABASE_URL` or individual variables (`PGHOST`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_PORT`).

- **Redis** — In the **REDIS SETTINGS** section, set `REDIS_URL` or `REDIS_HOST` and `REDIS_PORT`.

- **RabbitMQ** — Set `AMQP_URL` (e.g. `amqp://username:password@your-rabbitmq-host:5672/vhost`).

- **OpenSearch** — Set `OPENSEARCH_ENABLED=1`, `OPENSEARCH_URL`, and optionally `OPENSEARCH_USERNAME` and `OPENSEARCH_PASSWORD`. See [Configure OpenSearch for advanced search](/self-hosting/govern/advanced-search).

- **MinIO / S3** — In the **DATA STORE SETTINGS** section, set `USE_MINIO=0` for external S3, then set `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_ENDPOINT_URL`, and `AWS_S3_BUCKET_NAME`.

After editing `plane.env`, start or restart services as described in [Start Plane](#start-plane) so the changes take effect.

## Start Plane

::: warning
Note that you should run these commands without `sudo`.
:::

1. Reload systemd to recognize new configurations.

   ```bash
   systemctl --user daemon-reload
   ```

2. Start the network service.

   ```bash
   systemctl --user start plane-nw-network.service
   ```

3. Start core dependencies.

   ```bash
   systemctl --user start plane-{db,redis,mq,minio}.service
   ```

4. Start backend services.

   ```bash
   systemctl --user start {api,worker,beat-worker,migrator,monitor}.service
   ```

5. Start frontend services.

   ```bash
   systemctl --user start {web,space,admin,live,proxy}.service
   ```

   The startup sequence is important: network first, then dependencies, followed by backend services, and finally frontend services.

6. If you've purchased a paid plan, [activate your license key](/self-hosting/manage/manage-licenses/activate-pro-and-business#activate-your-license) to unlock premium features.

### Verify service status

Check that all services are running correctly:

1. Check network status.

   ```bash
   systemctl --user status plane-nw-network.service
   ```

2. Check core dependencies.

   ```bash
   systemctl --user status plane-{db,redis,mq,minio}.service
   ```

3. Check backend services.

   ```bash
   systemctl --user status {api,worker,beat-worker,migrator,monitor}.service
   ```

4. Check frontend services.
   ```bash
   systemctl --user status {web,space,admin,live,proxy}.service
   ```

Your Plane installation should now be running successfully with Podman Quadlets. This setup provides automatic service restart capabilities and standard systemd management commands for maintaining your installation.

## Troubleshoot

To debug service issues, examine the logs using:

```bash
journalctl --user -u <service-name> --no-pager
```

The logs will provide detailed information about any configuration issues or errors that may occur.
