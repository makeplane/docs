---
title: Self Hosting Plane
pageTitle: Self Hosting | Plane
description: This section helps you get comfortable with Plane and find your way around more effectively.
---

Plane is still in its early days, not everything is perfect yet, and
hiccups may happen. Please let us know of any suggestions, ideas, or bugs that
you encounter on our {% link href="https://discord.com/invite/A92xrEGCge" target="_blank" %}Discord{% /link %}

This guide assumes you already have Docker installed
and have permissions to run Docker containers.
See the {% link href="https://docs.docker.com/engine/install/ubuntu/" target="_blank" %}Install on Ubuntu{% /link%}
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

### Log in and enjoy your new and shiny Plane instance

Open your browser and navigate to `http://<your_ip|domain_name>/` to login onto your Plane instance.

There is a default user: `captain@plane.so` with the password `password123`.

{% callout type="note" %}
Our sign-up and log-in flows have changed. See [Sign up and sign in](/sign-up-sign-in) to learn more.
{% /callout %}
