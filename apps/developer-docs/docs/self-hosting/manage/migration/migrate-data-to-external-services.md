---
title: Migrate to external services
description: Move your Plane data from the default local Postgres and MinIO containers to managed cloud services for a production ready deployment.
keywords: Plane migration, external Postgres, cloud storage, MinIO migration, self-hosted Plane, production deployment, pg_dump, pg_restore, S3-compatible storage
---

# Migrate to external Postgres and storage

The default Plane installation includes a local PostgreSQL container and a local MinIO container for storage. These are convenient for getting started, but not recommended for production. For production deployments, use a managed database service and an S3-compatible object store.

This guide walks through moving your existing data from the local containers to your cloud-managed services. Follow these steps during a maintenance window as the migration requires Plane to be offline.

## Before you begin

You need:

- Docker and Docker Compose installed on the host running Plane
- The PostgreSQL client `psql` and `pg_restore` installed on your local machine
- Your cloud Postgres connection details: host, username, database name, and password
- Your cloud storage connection details: endpoint URL, access key, secret key, and bucket name
- Your cloud PostgreSQL version should ideally match your source PostgreSQL version

## Stop Plane

Take Plane offline before starting. This prevents new writes during the migration.

```bash
docker compose down
```

Do not stop the database and MinIO containers yet, you still need them running to export data.

Start only the database and MinIO:

```bash
docker compose up -d plane-db plane-minio
```

## Export the database

Run `pg_dump` inside the running database container. This creates a compressed binary dump file in your current directory.

```bash
docker exec \
    -e PGPASSWORD=plane \
    -e PGUSER=plane \
    -e PGDATABASE=plane \
    plane-app-plane-db-1 \
    pg_dump -Fc > plane-backup.dump
```

Verify the file was created and is not empty:

```bash
ls -lh plane-backup.dump
```

## Restore the database to your cloud Postgres

Before restoring, clear the existing schema in your cloud database.

```bash
psql \
    -h "your-cloud-host.com" \
    -U "cloud-username" \
    -d "cloud-database-name" \
    -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
```

Restore the dump using `pg_restore`.

The `--no-owner` flag prevents ownership errors when the source database roles do not exist in your cloud database.

The `--no-privileges` flag skips grants for roles that may not exist in the target database.

```bash
pg_restore \
    --no-owner \
    --no-privileges \
    --verbose \
    -h "your-cloud-host.com" \
    -U "cloud-username" \
    -d "cloud-database-name" \
    plane-backup.dump
```

You will be prompted for your cloud database password.

### PostgreSQL version compatibility

Use a `pg_restore` version that matches your target PostgreSQL version when possible.

For example, if your cloud database is PostgreSQL 15, use PostgreSQL 15 client tools.

If you use a newer `pg_restore` version, you may see:

```text
ERROR: unrecognized configuration parameter "transaction_timeout"
Command was: SET transaction_timeout = 0;
```

This warning can be ignored if the restore continues successfully. Using matching PostgreSQL client tools avoids this warning.

## Sync storage to your cloud bucket

MinIO ships with the `mc` client. Use it from inside the MinIO container to sync your local uploads to your cloud storage.

### 1. Create an alias for your local MinIO

Your MinIO credentials are in `plane.env` as `MINIO_ROOT_USER` and `MINIO_ROOT_PASSWORD`.

```bash
docker compose --env-file plane.env exec plane-minio \
    mc alias set localminio http://localhost:9000 \
    <MINIO_ROOT_USER> <MINIO_ROOT_PASSWORD>
```

### 2. Create an alias for your cloud storage

For AWS S3, use the S3 endpoint.

Default AWS endpoint:

```bash
docker compose --env-file plane.env exec plane-minio \
    mc alias set cloudminio https://s3.amazonaws.com \
    <CLOUD_ACCESS_KEY> <CLOUD_SECRET_KEY>
```

Regional AWS S3 endpoint:

```bash
docker compose --env-file plane.env exec plane-minio \
    mc alias set cloudminio https://s3.<aws-region>.amazonaws.com \
    <CLOUD_ACCESS_KEY> <CLOUD_SECRET_KEY>
```

For other S3-compatible providers, replace the endpoint with your provider's S3 endpoint.

Verify the connection:

```bash
docker compose --env-file plane.env exec plane-minio \
    mc ls cloudminio
```

### 3. Mirror local data to your cloud bucket

```bash
docker compose --env-file plane.env exec plane-minio \
    mc mirror localminio/uploads cloudminio/<bucket-name> --overwrite
```

Example:

```bash
docker compose --env-file plane.env exec plane-minio \
    mc mirror localminio/uploads cloudminio/my-plane-bucket --overwrite
```

This copies all files from the local uploads bucket to your cloud bucket. The `--overwrite` flag replaces existing files with the same name.

Wait for the sync to complete before continuing.

## Update your environment configuration

Open `plane.env` and update the database and storage settings to point to your cloud services.

### Database

```bash
DATABASE_URL=postgresql://cloud-username:cloud-password@your-cloud-host.com:5432/cloud-database-name
```

### Storage

For AWS S3:

```bash
AWS_ACCESS_KEY_ID=<CLOUD_ACCESS_KEY>
AWS_SECRET_ACCESS_KEY=<CLOUD_SECRET_KEY>
AWS_S3_ENDPOINT_URL=https://s3.amazonaws.com
AWS_S3_BUCKET_NAME=<bucket-name>
AWS_REGION=<aws-region>
```

For other S3-compatible providers, replace `AWS_S3_ENDPOINT_URL` with your provider endpoint.

## Restart Plane

Bring all services back up:

```bash
docker compose up -d
```

Open Plane in a browser and verify that your data, attachments, and pages are intact.

## After migration

Keep `plane-backup.dump` in a safe location as a point-in-time backup.
