---
title: Clone Docker images to your private registry
description: Mirror Plane Docker images to your private container registry. Pull, tag, and push images for airgapped or restricted network deployments.
keywords: plane docker images, private registry, container mirroring, docker pull, image cloning, airgapped docker, self-hosting
---

# Clone Docker images to your private registry

::: info
**Part of airgapped deployment**  
This guide is part of the airgapped deployment process. If you're setting up Plane in an airgapped environment, return to that guide after copying your images.
:::

This guide shows you how to copy Docker images from the Plane artifact registry to your destination registry using the `crane` tool.

## Prerequisites

### Install crane

Crane is a tool for interacting with remote container images and registries. Install it on a machine with internet access.

**macOS:**

```bash
brew install crane
```

**Linux:**

```bash
# Download the latest release
VERSION=$(curl -s https://api.github.com/repos/google/go-containerregistry/releases/latest | grep '"tag_name"' | cut -d'"' -f4)
curl -sL "https://github.com/google/go-containerregistry/releases/download/${VERSION}/go-containerregistry_Linux_x86_64.tar.gz" | tar xz crane
sudo mv crane /usr/local/bin/

# Verify installation
crane version
```

**Windows (using WSL or Git Bash):**

```bash
# Download and extract
curl -sL "https://github.com/google/go-containerregistry/releases/latest/download/go-containerregistry_Windows_x86_64.tar.gz" | tar xz crane.exe
```

## Plane images to copy

The following Plane Commercial images need to be transferred to your private registry:

```
makeplane/admin-commercial:${APP_RELEASE_VERSION}
makeplane/web-commercial:${APP_RELEASE_VERSION}
makeplane/space-commercial:${APP_RELEASE_VERSION}
makeplane/live-commercial:${APP_RELEASE_VERSION}
makeplane/monitor-commercial:${APP_RELEASE_VERSION}
makeplane/backend-commercial:${APP_RELEASE_VERSION}
makeplane/iframely:v2.5.3
makeplane/silo-commercial:${APP_RELEASE_VERSION}
makeplane/email-commercial:${APP_RELEASE_VERSION}
makeplane/plane-pi-commercial:${APP_RELEASE_VERSION}
makeplane/node-runner-commercial:${APP_RELEASE_VERSION}
makeplane/proxy-commercial:${APP_RELEASE_VERSION}
```

::: warning
**Infrastructure images not included:** The Plane artifact registry does not include infrastructure images. If you're using `local_setup: true` for any infrastructure services, you'll need to pull these separately from public registries:

- `valkey/valkey:7.2.11-alpine`
- `postgres:15.7-alpine`
- `rabbitmq:3.13.6-management-alpine`
- `minio/minio:latest`
- `minio/mc:latest`
  :::

## Configure environment variables

Set your version and destination registry before copying images.

```bash
# Set your Plane version
export APP_RELEASE_VERSION="v3.1.0"  # Replace with your desired version

# Set your destination registry
export DESTINATION_REGISTRY="your-registry.io/your-namespace"
```

**Example destination registry values:**

```bash
# Docker Hub
export DESTINATION_REGISTRY="docker.io/yourcompany"

# Google Container Registry
export DESTINATION_REGISTRY="gcr.io/your-project"

# Private registry
export DESTINATION_REGISTRY="your-private-registry.com/plane"

# AWS ECR
export DESTINATION_REGISTRY="123456789012.dkr.ecr.us-east-1.amazonaws.com/plane"

# Azure Container Registry
export DESTINATION_REGISTRY="yourregistry.azurecr.io/plane"
```

## Authenticate to your destination registry

Before copying images, authenticate crane to your destination registry.

**Docker Hub:**

```bash
crane auth login docker.io -u YOUR_USERNAME -p YOUR_PASSWORD
```

**Google Container Registry:**

```bash
gcloud auth configure-docker
```

**AWS ECR:**

```bash
aws ecr get-login-password --region REGION | crane auth login --username AWS --password-stdin AWS_ACCOUNT_ID.dkr.ecr.REGION.amazonaws.com
```

**Azure Container Registry:**

```bash
az acr login --name YOUR_REGISTRY_NAME
```

**Harbor or other private registries:**

```bash
crane auth login your-registry.com -u YOUR_USERNAME -p YOUR_PASSWORD
```

## Copy images to your registry

You can copy images individually or use the provided script to copy all images at once.

### Option 1: Copy individual images

**Basic image copy:**

```bash
crane copy \
  makeplane/backend-commercial:${APP_RELEASE_VERSION} \
  ${DESTINATION_REGISTRY}/backend-commercial:${APP_RELEASE_VERSION}
```

**Copy with specific platform (architecture):**

```bash
crane copy \
  --platform linux/amd64 \
  makeplane/backend-commercial:${APP_RELEASE_VERSION} \
  ${DESTINATION_REGISTRY}/backend-commercial:${APP_RELEASE_VERSION}
```

**Verify source image before copying:**

```bash
# Check if source image exists
crane manifest makeplane/backend-commercial:${APP_RELEASE_VERSION}

# List all available tags
crane ls makeplane/backend-commercial
```

**Verify image after copying:**

```bash
# Get image digest
crane digest ${DESTINATION_REGISTRY}/backend-commercial:${APP_RELEASE_VERSION}

# Verify manifest
crane manifest ${DESTINATION_REGISTRY}/backend-commercial:${APP_RELEASE_VERSION}
```

### Option 2: Copy all images with a script

Create a file named `copy-plane-images.sh`:

```bash
#!/bin/bash

set -e

# Configuration
APP_RELEASE_VERSION="${APP_RELEASE_VERSION:-v3.1.0}"
DESTINATION_REGISTRY="${DESTINATION_REGISTRY}"

if [ -z "$DESTINATION_REGISTRY" ]; then
    echo "Error: DESTINATION_REGISTRY environment variable is not set"
    echo "Example: export DESTINATION_REGISTRY='docker.io/yourcompany'"
    exit 1
fi

# Source registry
SOURCE_REGISTRY="makeplane"

# Image list
declare -a IMAGES=(
    "admin-commercial:${APP_RELEASE_VERSION}"
    "web-commercial:${APP_RELEASE_VERSION}"
    "space-commercial:${APP_RELEASE_VERSION}"
    "live-commercial:${APP_RELEASE_VERSION}"
    "monitor-commercial:${APP_RELEASE_VERSION}"
    "backend-commercial:${APP_RELEASE_VERSION}"
    "iframely:v2.5.3"
    "silo-commercial:${APP_RELEASE_VERSION}"
    "email-commercial:${APP_RELEASE_VERSION}"
    "plane-pi-commercial:${APP_RELEASE_VERSION}"
    "node-runner-commercial:${APP_RELEASE_VERSION}"
    "proxy-commercial:${APP_RELEASE_VERSION}"
)

echo "Starting image copy process..."
echo "Source: ${SOURCE_REGISTRY}"
echo "Destination: ${DESTINATION_REGISTRY}"
echo "Version: ${APP_RELEASE_VERSION}"
echo ""

# Copy each image
for IMAGE in "${IMAGES[@]}"; do
    SOURCE="${SOURCE_REGISTRY}/${IMAGE}"
    DESTINATION="${DESTINATION_REGISTRY}/${IMAGE}"

    echo "Copying: ${SOURCE} -> ${DESTINATION}"
    crane copy "${SOURCE}" "${DESTINATION}"

    if [ $? -eq 0 ]; then
        echo "✓ Successfully copied ${IMAGE}"
    else
        echo "✗ Failed to copy ${IMAGE}"
        exit 1
    fi
    echo ""
done

echo "All images copied successfully!"
```

Make the script executable and run it:

```bash
chmod +x copy-plane-images.sh
./copy-plane-images.sh
```

The script will copy all Plane images to your destination registry. Each image copy is verified, and the script exits if any copy fails.

## Troubleshooting

### Authentication issues

**Error:** `unauthorized: authentication required`

**Solution:** Re-authenticate to your destination registry:

```bash
crane auth login your-destination-registry.com
```

Verify your credentials are correct and that you have push permissions to the registry.

### Network timeouts

**Error:** Large images timing out during transfer

**Solution:** Crane handles retries automatically, but you can also:

- Check your network connection stability
- Try copying during off-peak hours
- Use a machine with better network connectivity
- Copy images individually rather than using the batch script

### Permission denied

**Error:** `denied: requested access to the resource is denied`

**Solution:**

- Ensure you have push permissions to the destination registry
- Verify your authentication credentials are correct
- Check that the destination repository exists, or that you have permission to create it
- For organizational registries, confirm your account has the necessary roles

### Image not found

**Error:** `MANIFEST_UNKNOWN: manifest unknown`

**Solution:**

- Verify the source image exists:

```bash
  crane ls makeplane/backend-commercial
```

- Check that you're using the correct version tag
- Ensure `APP_RELEASE_VERSION` is set correctly
- Verify the image name is spelled correctly

### Rate limiting

**Error:** `429 Too Many Requests`

**Solution:**

- Wait a few minutes and retry
- Authenticate to increase rate limits
- For Docker Hub, ensure you're using an authenticated account (free accounts have higher limits than anonymous)
- Spread out image copies over time if hitting limits repeatedly

## Additional resources

- [Crane documentation](https://github.com/google/go-containerregistry/blob/main/cmd/crane/doc/crane.md)
- [Crane GitHub repository](https://github.com/google/go-containerregistry)
