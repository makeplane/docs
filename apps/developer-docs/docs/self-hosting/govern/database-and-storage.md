---
title: Configure external services
description: Configure external database and storage for Plane. Setup PostgreSQL, Redis, and S3-compatible storage services.
keywords: plane external database, postgresql setup, redis configuration, s3 storage, minio, self-hosting, plane storage
---

# Configure external services <Badge type="info" text="Commercial Edition" />

The Prime CLI lets you easily configure your Commercial Edition instance, providing options to customize the PostgreSQL database, Redis, external storage, and other advanced settings.

::: warning
**Prime CLI is for Docker installations only.** These commands only work on Plane instances originally installed using `prime-cli`.
:::

1.  Run the Prime CLI with ↓:

`sudo prime-cli`

2.  Once the CLI is running, enter `configure`, which will guide you through a step-by-step form where you can specify the following:

- `Listening port`  
  Define the port for the built-in reverse proxy.  
  _Default_: `80`

- `Max file-upload size`  
  Set the maximum file size (in MB) that members can upload.
  _Default_: `5 MB`

- `External Postgres URL`  
  Provide the URL of your external PostgreSQL instance if you want to switch from the default Plane configuration.
  _Default_: `Postgres 15.5` in the Docker container.

::: warning
Don’t use a database on your local machine. If you use `localhost` in the URL, it won’t work. Make sure to use a database hosted on a network-accessible server.

Avoid using special characters in your PostgreSQL password.
:::

- `External Redis URL`  
  Specify the URL of your external Redis instance to override the default Redis configuration.  
  _Default_: `Redis 7.2.4`

- `External storage`  
  Plane currently supports only S3 compatible storages.  
  _Default_: `MinIO`
  1. Ensure your IAM user has the following permissions on your S3 bucket.
  - **s3:GetObject**  
    To access the objects.
  - **s3:PutObject**  
    To upload new assets using the presigned url.
  2. Configure the CORS policy on your bucket to enable presigned uploads. Use the example policy below, making sure to replace `<YOUR_DOMAIN>` with your actual domain.

  ```
  [
        {
           "AllowedHeaders": [
              "*"
           ],
           "AllowedMethods": [
              "GET",
              "POST",
              "PUT",
              "DELETE",
              "HEAD"
           ],
           "AllowedOrigins": [
              "<YOUR_DOMAIN>",
           ],
           "ExposeHeaders": [
              "ETag",
              "x-amz-server-side-encryption",
              "x-amz-request-id",
              "x-amz-id-2"
           ],
           "MaxAgeSeconds": 3000
        }
  ]
  ```

  3. Switch to your external storage by providing the following values:
     - S3 access key ID 
     - S3 secret access key
     - S3 bucket name
     - S3 region 
     - S3 endpoint URL

3.  After confirming your choices, your instance will automatically restart with the updated configuration.

::: details Community Edition

To configure external Postgres, Redis, and S3 storage for the Plane Community Edition, you’ll need to adjust several environment variables in the plane.env file. Follow this guide to set up each component using the correct values for your external services.

1.  Open the `plane.env` file on your server where Plane is installed.

2.  In the **DB SETTINGS** section, update the variables to connect to your external Postgres instance:

    ```bash
    # DB SETTINGS
    PGHOST=your-external-postgres-host          # Replace with the hostname or IP address of your Postgres server.
    PGDATABASE=                                 # Leave blank when using external database.
    POSTGRES_USER=your-postgres-username        # The username to access Postgres.
    POSTGRES_PASSWORD=your-postgres-password    # Password for the Postgres user.
    POSTGRES_DB=your-database-name              # The name of the database Plane should connect to.
    POSTGRES_PORT=5432                          # Port where Postgres is accessible (usually 5432).
    PGDATA=/var/lib/postgresql/data             # No need to change this for external Postgres.
    DATABASE_URL=                               # Leave this empty if you're providing values for the variables above. If you choose to use the DATABASE_URL, you can leave all the other database-related variables empty.
    ```

    ::: warning
    Don’t use a database on your local machine. If you use `localhost` in the URL, it won’t work. Make sure to use a database hosted on a network-accessible server.

    Avoid using special characters in your PostgreSQL password.
    :::

3.  In the **REDIS SETTINGS** section, update the variables to connect to your external Redis instance:

    ```bash
    # REDIS SETTINGS
    REDIS_HOST=your-external-redis-host         # Hostname or IP of the Redis server.
    REDIS_PORT=6379                             # Port where Redis is accessible (default is 6379).
    REDIS_URL=                                  # Leave this empty if you're providing values for the variables above. If you choose to use the REDIS_URL, you can leave all the other redis-related variables empty.
    ```

4.  In the **DATA STORE SETTINGS** section, update the variables for any S3-compatible storage:
    ```bash
    # DATA STORE SETTINGS
    USE_MINIO=0                                 # Set to 0 if using an external S3, 1 if using MinIO (default).
    AWS_REGION=your-s3-region                   # For AWS, set the region, e.g., "us-west-1".
    AWS_ACCESS_KEY_ID=your-s3-access-key        # Access key for S3.
    AWS_SECRET_ACCESS_KEY=your-s3-secret-key    # Secret key for S3.
    AWS_S3_ENDPOINT_URL=https://your-s3-endpoint # URL for S3 API endpoint (e.g., "https://s3.amazonaws.com" for AWS).
    AWS_S3_BUCKET_NAME=your-s3-bucket-name      # Name of the S3 bucket for storing Plane data.
    MINIO_ROOT_USER=                            # Leave blank when using external S3.
    MINIO_ROOT_PASSWORD=                        # Leave blank when using external S3.
    BUCKET_NAME=                                # Leave blank when using external S3.
    FILE_SIZE_LIMIT=5242880                     # Set maximum file upload size in bytes (5MB here).
    ```
5.  Save your changes to the `plane.env` file.

6.  Restart Plane services to apply the new settings using the `setup.sh` script.

:::
