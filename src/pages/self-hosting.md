---
title: Self Hosting Plane
pageTitle: Self Hosting | Plane
description: This section helps you get comfortable with Plane and find your way around more effectively.
---

Plane is still in its early days, not everything is perfect yet, and
hiccups may happen. Please let us know of any suggestions, ideas, or bugs that
you encounter on our [Discord](https://discord.com/invite/A92xrEGCge).

This guide assumes you already have Docker installed
and have permissions to run Docker containers.
See the [Install on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
guide which explains installing Docker on your machine.

## Install with Docker Compose (recommended way)

### Clone the Repository and change the directory

```bash
git clone --depth 1 -b master https://github.com/makeplane/plane.git && cd plane
```

### Run setup.sh

This script sets up the environment with the IP address or the Domain name you provided.

```bash
./setup.sh
```

### Environment Variables

The Docker setup has undergone a major overhaul. Instead of a single `.env` file, there are now four distinct `.env` files. The `setup.sh` script no longer requires an argument; you can run it without specifying one. It will copy all four `.env.example` files and replace them with the corresponding `.env` files in three different folders. Additionally, it will append the `SECRET_KEY` to the `apiserver/.env` file.

#### web/.env.example

```
# Enable/Disable OAUTH - default 0 for selfhosted instance
NEXT_PUBLIC_ENABLE_OAUTH=0
# Public boards deploy URL
NEXT_PUBLIC_DEPLOY_URL="http://localhost/spaces"
```

#### spaces/.env.example

```
# Flag to toggle OAuth
NEXT_PUBLIC_ENABLE_OAUTH=0
```

#### apiserver/.env

```
# Backend
# Debug value for api server use it as 0 for production use
DEBUG=0
DJANGO_SETTINGS_MODULE="plane.settings.selfhosted"

# Error logs
SENTRY_DSN=""

# Database Settings
PGUSER="plane"
PGPASSWORD="plane"
PGHOST="plane-db"
PGDATABASE="plane"
DATABASE_URL=postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}

# Redis Settings
REDIS_HOST="plane-redis"
REDIS_PORT="6379"
REDIS_URL="redis://${REDIS_HOST}:6379/"

# Email Settings
EMAIL_HOST=""
EMAIL_HOST_USER=""
EMAIL_HOST_PASSWORD=""
EMAIL_PORT=587
EMAIL_FROM="Team Plane <team@mailer.plane.so>"
EMAIL_USE_TLS="1"
EMAIL_USE_SSL="0"

# AWS Settings
AWS_REGION=""
AWS_ACCESS_KEY_ID="access-key"
AWS_SECRET_ACCESS_KEY="secret-key"
AWS_S3_ENDPOINT_URL="http://plane-minio:9000"
# Changing this requires change in the nginx.conf for uploads if using minio setup
AWS_S3_BUCKET_NAME="uploads"
# Maximum file upload limit
FILE_SIZE_LIMIT=5242880

# GPT settings
OPENAI_API_BASE="https://api.openai.com/v1" # change if using a custom endpoint
OPENAI_API_KEY="sk-" # add your openai key here
GPT_ENGINE="gpt-3.5-turbo" # use "gpt-4" if you have access

# Github
GITHUB_CLIENT_SECRET="" # For fetching release notes

# Settings related to Docker
DOCKERIZED=1
# set to 1 If using the pre-configured minio setup
USE_MINIO=1

# Nginx Configuration
NGINX_PORT=80

# Default Creds
DEFAULT_EMAIL="captain@plane.so"
DEFAULT_PASSWORD="password123"

# SignUps
ENABLE_SIGNUP="1"

# Email Redirection URL
WEB_URL="http://localhost"
```

#### .env

```
# Database Settings
PGUSER="plane"
PGPASSWORD="plane"
PGHOST="plane-db"
PGDATABASE="plane"
DATABASE_URL=postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}

# Redis Settings
REDIS_HOST="plane-redis"
REDIS_PORT="6379"
REDIS_URL="redis://${REDIS_HOST}:6379/"

# AWS Settings
AWS_REGION=""
AWS_ACCESS_KEY_ID="access-key"
AWS_SECRET_ACCESS_KEY="secret-key"
AWS_S3_ENDPOINT_URL="http://plane-minio:9000"
# Changing this requires change in the nginx.conf for uploads if using minio setup
AWS_S3_BUCKET_NAME="uploads"
# Maximum file upload limit
FILE_SIZE_LIMIT=5242880

# GPT settings
OPENAI_API_BASE="https://api.openai.com/v1" # change if using a custom endpoint
OPENAI_API_KEY="sk-" # add your openai key here
GPT_ENGINE="gpt-3.5-turbo" # use "gpt-4" if you have access

# Settings related to Docker
DOCKERIZED=1
# set to 1 If using the pre-configured minio setup
USE_MINIO=1

# Nginx Configuration
NGINX_PORT=80
```

- The environment variable NEXT_PUBLIC_API_BASE_URL has been removed from both the web and space projects.
- The naming convention for containers and images has been updated.
- The plane-worker image will no longer be maintained, as it has been merged with plane-backend.
- The Tiptap pro-extension dependency has been removed, eliminating the need for Tiptap API keys.
- The image name for Plane deployment has been changed to plane-space.

### Bootstrap Plane with Docker Compose

```bash
docker compose -f docker-compose-hub.yml up
```

### Log in and enjoy your new and shiny Plane instance!

Open your browser and navigate to `http://<your_ip|domain_name>/` to login onto your Plane instance.

{% callout type="note" %}

In the 0.13.2 release, the default value for DJANGO_SETTINGS_MODULE has been changed back to plane.settings.production in the apiserver/.env file.

Additionally, you can configure the following settings `apiserver/.env` file:

- To enable email password-based login, set:

```bash
ENABLE_EMAIL_PASSWORD="1"
```

- To enable magic link-based login, set:

```bash
ENABLE_MAGIC_LINK_LOGIN="0"
```

- You can adjust email redirections and Minio domain settings by configuring:

```bash
WEB_URL="http://localhost"
```

- For Google OAuth login methods, you can add the respective client IDs:

```bash
GOOGLE_CLIENT_ID="" # Add Google client ID for google login
```

{% /callout %}

{% callout type="note" %}
Version 0.12 and Above Setup:

- Update your codebase by pulling the latest changes from the master branch.

- Optionally, execute the setup.sh script to apply new default values.

- Restart the containers using: docker compose -f docker-compose-hub.yml.

These steps ensure your environment is up-to-date and configured correctly for version 0.12 and later.
{% /callout %}

{% callout type="note" %}
For Version 0.7.1 Update:

- The Plane self-hosted setup has been updated with version 0.7.1. If you encounter a database connection error after updating from an older version, it's likely due to PostgreSQL container username and password changes.

- To resolve this error, if you were using default credentials, set `PGUSER=plane` as the username and `PGPASSWORD=xyzzyspoon` as the old password in your generated env file. Then, restart the containers.

{% /callout %}
