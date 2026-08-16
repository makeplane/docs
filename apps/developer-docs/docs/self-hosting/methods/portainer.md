---
title: Deploy Plane with Portainer
description: Deploy and manage Plane using Portainer container management UI. Visual Docker management with stack deployment and monitoring.
keywords: plane portainer, portainer deployment, docker management ui, plane container management, portainer stack, self-hosting
---

# Deploy Plane with Portainer <Badge type="info" text="Commercial Edition" />

This guide shows you the steps to deploy a self-hosted instance of Plane using Portainer.

## Install Plane

### Prerequisites

- Before you get started, make sure you have a Portainer environment set up and ready to go.
- Your setup should support either amd64 or arm64 architectures.

### Procedure

1. **Download the required deployment files**

   `portainer-compose.yml` – Defines Plane's services and dependencies.

   ```bash
   curl -fsSL https://prime.plane.so/releases/<plane-version>/portainer-compose.yml -o portainer-compose.yml
   ```

   `variables.env` – Stores environment variables for your deployment.

   ```bash
   curl -fsSL https://prime.plane.so/releases/<plane-version>/variables.env -o plane.env
   ```

   ::: warning
   The `<plane-version>` value should be v1.8.2 or higher.
   :::

2. Click **+ Add stack** on Portainer.

3. Copy and paste the contents of `portainer-compose.yml` into the editor.

4. Load environment variables from the `variables.env` file.

5. **Configure environment variables**  
   Before deploying, edit the following variables:
   - `DOMAIN_NAME` – (required) Your application's domain name.
   - `SITE_ADDRESS` – (required) The full domain name (FQDN) of your instance.
   - `MACHINE_SIGNATURE` – (required) A unique identifier for your machine. You can generate this by running below code in terminal:
     ```sh
     sed -i 's/MACHINE_SIGNATURE=.*/MACHINE_SIGNATURE='$(openssl rand -hex 16)'/' plane.env
     ```
   - `CERT_EMAIL` – (optional) Email address for SSL certificate generation (only needed if you're setting up HTTPS).

6. **Configure external DB, Redis, and RabbitMQ**
   ::: warning
   When self-hosting Plane for production use, it is strongly recommended to configure external database and storage. This ensures that your data remains secure and accessible even if the local machine crashes or encounters hardware issues. Relying solely on local storage for these components increases the risk of data loss and service disruption.
   :::
   - `DATABASE_URL` – Connection string for your external database.
   - `REDIS_URL` – Connection string for your external Redis instance.
   - `AMQP_URL` – Connection string for your external RabbitMQ server.

7. Click **Deploy the stack**.
   That's it! Once the deployment is complete, Plane should be up and running on your configured domain.

8. If you've purchased a paid plan, [activate your license key](/self-hosting/manage/manage-licenses/activate-pro-and-business#activate-your-license) to unlock premium features.
