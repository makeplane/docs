---
title: Docker AIO (All-in-One)
description: Deploy Plane with Docker All-in-One (AIO) setup. Quick installation guide for running Plane in a single Docker container.
keywords: plane docker aio, all-in-one container, single container deployment, quick install, plane docker setup, self-hosting
---

# Docker AIO (All-in-One) <Badge type="info" text="Commercial Edition" />

The Plane Commercial All-in-One (AIO) Docker image packages all Plane services into a single container, making it the fastest way to get Plane running.

## What's included

Your single AIO container includes all these services running together:

- **Web App** - The main Plane web interface you'll use
- **Space** - Public project spaces for external collaboration
- **Admin** - Administrative interface
- **API Server** - Backend API
- **Live Server** - Real-time collaboration features
- **Silo** - Integration services
- **Monitor** - Feature flags and payments
- **Email Server** - SMTP server for notifications
- **Proxy** (Port 80, 20025, 20465, 20587) - Caddy reverse proxy
- **Worker and Beat Worker** - Background task processing

### Port Mapping

The following ports are exposed:

- `80`: Main web interface (HTTP)
- `443`: HTTPS (if SSL configured)
- `20025`: SMTP port 25
- `20465`: SMTP port 465 (SSL/TLS)
- `20587`: SMTP port 587 (STARTTLS)

## Prerequisites

- [Docker](https://docs.docker.com/engine/)
- Set up these external services:
  - _PostgreSQL_  
    For data storage
  - _Redis_  
    For caching and session management
  - _RabbitMQ_
    For message queuing
  - _S3-compatible storage_  
    For file uploads (AWS S3 or MinIO)

## Install Plane

1. Download the image with:

   ```bash
   docker pull makeplane/plane-aio-commercial:stable
   ```

2. Run the following command to deploy the Plane AIO container. Make sure to replace all placeholder values (e.g., `your-domain.com`, `user:pass`) with your actual configuration.

   ::: warning
   All environment variables are required for the container to function correctly.
   :::

   ```bash
   docker run --name plane-aio --rm -it \
       -p 80:80 \
       -p 20025:20025 \
       -p 20465:20465 \
       -p 20587:20587 \
       -e DOMAIN_NAME=your-domain.com \
       -e DATABASE_URL=postgresql://user:pass@host:port/database \
       -e REDIS_URL=redis://host:port \
       -e AMQP_URL=amqp://user:pass@host:port/vhost \
       -e AWS_REGION=us-east-1 \
       -e AWS_ACCESS_KEY_ID=your-access-key \
       -e AWS_SECRET_ACCESS_KEY=your-secret-key \
       -e AWS_S3_BUCKET_NAME=your-bucket \
       makeplane/plane-aio-commercial:stable
   ```

   If you're running on an IP address, use this example:

   ```bash
   MYIP=192.168.68.169
   docker run --name myaio --rm -it \
   -p 80:80 \
   -p 20025:20025 \
   -p 20465:20465 \
   -p 20587:20587 \
   -e DOMAIN_NAME=${MYIP} \
   -e DATABASE_URL=postgresql://plane:plane@${MYIP}:15432/plane \
   -e REDIS_URL=redis://${MYIP}:16379 \
   -e AMQP_URL=amqp://plane:plane@${MYIP}:15673/plane \
   -e AWS_REGION=us-east-1 \
   -e AWS_ACCESS_KEY_ID=<YOUR_AWS_ACCESS_KEY_ID> \
   -e AWS_SECRET_ACCESS_KEY=<YOUR_AWS_SECRET_ACCESS_KEY> \
   -e AWS_S3_BUCKET_NAME=plane-app \
   -e AWS_S3_ENDPOINT_URL=http://${MYIP}:19000 \
   -e FILE_SIZE_LIMIT=10485760 \
   makeplane/plane-aio-commercial:stable
   ```

3. Once it's running, you can access the Plane application on the domain you provided during the deployment.

4. If you've purchased a paid plan, [activate your license key](/self-hosting/manage/manage-licenses/activate-pro-and-business#activate-your-license) to unlock premium features.

## Volume mounts

### Recommended persistent volumes

```bash
-v /path/to/logs:/app/logs \
-v /path/to/data:/app/data
```

### Workspace license DB

```bash
-v /path/to/monitordb:/app/monitor
```

### SSL certificate support

For HTTPS support, mount certificates:

```bash
-v /path/to/certs:/app/email/tls
```

## Environment variables (optional)

### Network and Protocol

- `SITE_ADDRESS`: Server bind address (default: `:80`)
- `APP_PROTOCOL`: Protocol to use (`http` or `https`, default: `http`)

### Email configuration

- `INTAKE_EMAIL_DOMAIN`: Domain for intake emails (default: `intake.<DOMAIN_NAME>`)
- `LISTEN_SMTP_PORT_25`: SMTP port 25 mapping (default: `20025`)
- `LISTEN_SMTP_PORT_465`: SMTP port 465 mapping (default: `20465`)
- `LISTEN_SMTP_PORT_587`: SMTP port 587 mapping (default: `20587`)
- `SMTP_DOMAIN`: SMTP server domain (default: `0.0.0.0`)
- `TLS_CERT_PATH`: Path to TLS certificate file (optional)
- `TLS_PRIV_KEY_PATH`: Path to TLS private key file (optional)

### Security and secrets

- `MACHINE_SIGNATURE`: Unique machine identifier (auto-generated if not provided)
- `SECRET_KEY`: Django secret key (default provided)
- `SILO_HMAC_SECRET_KEY`: Silo HMAC secret (default provided)
- `AES_SECRET_KEY`: AES encryption key (default provided)
- `LIVE_SERVER_SECRET_KEY`: Live server secret (default provided)

### File handling

- `FILE_SIZE_LIMIT`: Maximum file upload size in bytes (default: `5242880` = 5MB)

### Integration callbacks

- `INTEGRATION_CALLBACK_BASE_URL`: Base URL for OAuth callbacks

### API configuration

- `API_KEY_RATE_LIMIT`: API key rate limit (default: `60/minute`)

### Third-party integrations

- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`: GitHub integration
- `GITHUB_APP_NAME`, `GITHUB_APP_ID`, `GITHUB_PRIVATE_KEY`: GitHub App integration
- `SLACK_CLIENT_ID`, `SLACK_CLIENT_SECRET`: Slack integration
- `GITLAB_CLIENT_ID`, `GITLAB_CLIENT_SECRET`: GitLab integration

## Build the image

To build the AIO image yourself:

```bash
cd deploy/aio/commercial
./build.sh --release=v1.11.1
```

Available build options:

- `--release`: Plane version to build (required)
- `--image-name`: Custom image name (default: `plane-aio-commercial`)

## Troubleshoot

The container will validate required environment variables on startup and display helpful error messages if any are missing.

### Logs

All service logs are available in `/app/logs/`:

- Access logs: `/app/logs/access/`
- Error logs: `/app/logs/error/`

### Health checks

The container runs multiple services managed by Supervisor. Check service status:

```bash
docker exec -it <container-name> supervisorctl status
```

## Production considerations

- Use proper SSL certificates for HTTPS
- Configure proper backup strategies for data
- Monitor resource usage and scale accordingly
- Use external load balancer for high availability
- Regularly update to latest versions
- Secure your environment variables and secrets
