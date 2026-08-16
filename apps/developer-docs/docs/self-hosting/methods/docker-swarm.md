---
title: Deploy Plane with Docker Swarm
description: Deploy Plane on Docker Swarm cluster. Guide for running Plane in a distributed Docker Swarm environment with high availability.
keywords: plane docker swarm, swarm deployment, distributed containers, high availability, plane cluster, docker orchestration, self-hosting
---

# Deploy Plane with Docker Swarm <Badge type="info" text="Commercial Edition" />

This guide shows you the steps to deploy a self-hosted instance of the Plane Commercial Edition using Docker Swarm.

## Install Plane

### Prerequisites

- Before you get started, make sure you have a Docker Swarm environment set up and ready to go.
- Your setup should support either amd64 or arm64 architectures.

### Procedure

1. **Download the required deployment files**
   - `swarm-compose.yml` – Defines Plane's services and dependencies.

   ```bash
   curl -fsSL https://prime.plane.so/releases/<plane-version>/swarm-compose.yml -o swarm-compose.yml
   ```

   - `variables.env` – Stores environment variables for your deployment.

   ```bash
   curl -fsSL https://prime.plane.so/releases/<plane-version>/variables.env -o plane.env
   ```

   ::: warning
   The `<plane-version>` value should be v1.8.3 or higher.
   :::

2. **Configure environment variables**  
   Before deploying, edit the `variables.env` file in your preferred text editor and update the following values:
   - `DOMAIN_NAME` – (required) Your application's domain name.
   - `SITE_ADDRESS` – (required) The full domain name (FQDN) of your instance.
   - `MACHINE_SIGNATURE` – (required) A unique identifier for your machine. You can generate this by running below code in terminal:
     ```sh
     sed -i 's/MACHINE_SIGNATURE=.*/MACHINE_SIGNATURE='$(openssl rand -hex 16)'/' plane.env
     ```
   - `CERT_EMAIL` – (optional) Email address for SSL certificate generation (only needed if you're setting up HTTPS).

3. **Configure external DB, Redis, and RabbitMQ**
   ::: warning
   When self-hosting Plane for production use, it is strongly recommended to configure external database and storage. This ensures that your data remains secure and accessible even if the local machine crashes or encounters hardware issues. Relying solely on local storage for these components increases the risk of data loss and service disruption.
   :::
   - `DATABASE_URL` – Connection string for your external database.
   - `REDIS_URL` – Connection string for your external Redis instance.
   - `AMQP_URL` – Connection string for your external RabbitMQ server.

4. **Load the environment variables**

   ```bash
   set -o allexport; source <path-to variables.env>; set +o allexport;
   ```

5. **Deploy the stack**

   ```bash
   docker stack deploy -c <path-to swarm-compose.yml> plane
   ```

   That's it! This will deploy Plane as a Swarm stack, and your instance should be accessible on your configured domain.

6. If you've purchased a paid plan, [activate your license key](/self-hosting/manage/manage-licenses/activate-pro-and-business#activate-your-license) to unlock premium features.
