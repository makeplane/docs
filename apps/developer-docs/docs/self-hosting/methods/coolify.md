---
title: Deploy Plane with Coolify
description: Deploy Plane using Coolify, an open-source PaaS. One-click deployment with automatic SSL, domain configuration, and container management.
keywords: plane coolify, coolify deployment, plane paas, one-click deployment, plane hosting platform, self-hosting
---

# Deploy Plane with Coolify <Badge type="info" text="Commercial Edition" />

This guide shows you the steps to deploy a self-hosted instance of Plane using Coolify.

## Install Plane

### Prerequisites

- Before you get started, make sure you have a Coolify environment set up and ready to go.
- Your setup should support either amd64 or arm64 architectures.

### Procedure

1. **Download the required deployment files**

`coolify-compose.yml` – Defines Plane's services and dependencies.

```bash
curl -fsSL https://prime.plane.so/releases/<plane-version>/coolify-compose.yml -o coolify-compose.yml
```

::: warning
The `<plane-version>` value should be v1.8.2 or higher.
:::

2. Create a new project in Coolify.

3. Add a new resource.

4. Select **Docker Compose Empty** as the deployment method.

5. Copy and paste the contents of the `coolify-compose.yml` file into the editor.

6. Configure external DB, Redis, RabbitMQ and any other required environment variables in the UI.
   ::: warning
   When self-hosting Plane for production use, it is strongly recommended to configure external database and storage. This ensures that your data remains secure and accessible even if the local machine crashes or encounters hardware issues. Relying solely on local storage for these components increases the risk of data loss and service disruption.
   :::

- `DATABASE_URL` – Connection string for your external database.
- `REDIS_URL` – Connection string for your external Redis instance.
- `AMQP_URL` – Connection string for your external RabbitMQ server.

7. Deploy to launch your Plane instance.
   Once the deployment is complete, your Plane instance should be accessible on the configured domain.

8. If you've purchased a paid plan, [activate your license key](/self-hosting/manage/manage-licenses/activate-pro-and-business#activate-your-license) to unlock premium features.
