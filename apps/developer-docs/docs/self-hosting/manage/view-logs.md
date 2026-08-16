---
title: View container logs
description: View and debug container logs for self-hosted Plane. Monitor Docker and Kubernetes service logs to troubleshoot issues.
keywords: plane logs, container logs, docker logs, kubernetes logs, plane debugging, plane troubleshooting, self-hosting
---

# View container logs

If you need to check the logs for troubleshooting or to monitor what’s happening in specific Plane services like the API or Worker, you can access them directly from the command line.

To view logs, start by running the command ↓:

```bash
sudo prime-cli monitor
```

This brings up a table where you can select which container logs you want to view.

![Container logs](/images/view-logs/container-logs.webp#hero)

::: warning
**Prime CLI is for Docker installations only.** These commands only work on Plane instances originally installed using `prime-cli`.
:::

::: details Community Edition

Here’s how to view logs for any service in Plane Community Edition, whether it’s the API, Worker, Redis, or others. This can be really helpful when troubleshooting or just getting insights into how each service is running.

1. Start by running the setup script:

   ```bash
   ./setup.sh
   ```

   This will bring up the main menu with options. Select `6` to view logs.

   ```
   Select a Action you want to perform:
      1) Install (x86_64)
      2) Start
      3) Stop
      4) Restart
      5) Upgrade
      6) View Logs
      7) Backup Data
      8) Exit

   Action [2]: 6
   ```

2. After choosing `6`, you’ll see a sub-menu listing all available services:

   ```
   Select a Service you want to view the logs for:
      1) Web
      2) Space
      3) API
      4) Worker
      5) Beat-Worker
      6) Migrator
      7) Proxy
      8) Redis
      9) Postgres
      10) Minio
      0) Back to Main Menu

   Service:
   ```

3. Pick the service whose logs you’d like to check. For example, if you want to view the **API logs**, type `3`.

   After selecting a service, you’ll see the logs in real-time. Here’s an example of what API logs might look like:

   ```
   api-1  | Waiting for database...
   api-1  | Database available!
   api-1  | Waiting for database migrations to complete...
   api-1  | Waiting for database migrations to complete...
   api-1  | Waiting for database migrations to complete...
   api-1  | Waiting for database migrations to complete...
   api-1  | Waiting for database migrations to complete...
   api-1  | Waiting for database migrations to complete...
   api-1  | Waiting for database migrations to complete...
   api-1  | No migrations Pending. Starting processes ...
   api-1  | Instance registered
   api-1  | ENABLE_SIGNUP loaded with value from environment variable.
   api-1  | ENABLE_EMAIL_PASSWORD loaded with value from environment variable.
   api-1  | ENABLE_MAGIC_LINK_LOGIN loaded with value from environment variable.
   api-1  | GOOGLE_CLIENT_ID loaded with value from environment variable.
   api-1  | GITHUB_CLIENT_ID loaded with value from environment variable.
   api-1  | GITHUB_CLIENT_SECRET loaded with value from environment variable.
   api-1  | EMAIL_HOST loaded with value from environment variable.
   api-1  | EMAIL_HOST_USER loaded with value from environment variable.
   api-1  | EMAIL_HOST_PASSWORD loaded with value from environment variable.
   api-1  | EMAIL_PORT loaded with value from environment variable.
   api-1  | EMAIL_FROM loaded with value from environment variable.
   api-1  | EMAIL_USE_TLS loaded with value from environment variable.
   api-1  | EMAIL_USE_SSL loaded with value from environment variable.
   api-1  | OPENAI_API_KEY loaded with value from environment variable.
   api-1  | GPT_ENGINE loaded with value from environment variable.
   api-1  | UNSPLASH_ACCESS_KEY loaded with value from environment variable.
   api-1  | Checking bucket...
   api-1  | Bucket 'uploads' does not exist. Creating bucket...
   api-1  | Bucket 'uploads' created successfully.
   api-1  | Public read access policy set for bucket 'uploads'.
   api-1  | Cache Cleared
   api-1  | [2024-05-02 03:56:01 +0000] [1] [INFO] Starting gunicorn 21.2.0
   api-1  | [2024-05-02 03:56:01 +0000] [1] [INFO] Listening at: http://0.0.0.0:8000 (1)
   api-1  | [2024-05-02 03:56:01 +0000] [1] [INFO] Using worker: uvicorn.workers.UvicornWorker
   api-1  | [2024-05-02 03:56:01 +0000] [25] [INFO] Booting worker with pid: 25
   api-1  | [2024-05-02 03:56:03 +0000] [25] [INFO] Started server process [25]
   api-1  | [2024-05-02 03:56:03 +0000] [25] [INFO] Waiting for application startup.
   api-1  | [2024-05-02 03:56:03 +0000] [25] [INFO] ASGI 'lifespan' protocol appears unsupported.
   api-1  | [2024-05-02 03:56:03 +0000] [25] [INFO] Application startup complete.
   ```

4. To exit the logs, use `CTRL+C`. This will take you back to the main menu where you can select another action or view logs from a different service.

:::
