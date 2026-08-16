---
title: Deployment methods
description: Choose the best deployment method for your infrastructure. Deploy Plane with Docker, Kubernetes, Podman, or in airgapped environments.
keywords: plane deployment methods, docker compose, kubernetes, helm, podman, airgapped deployment, self-hosting
---

# Install Plane

Choose a deployment method based on your infrastructure and requirements.

## System requirements

- **CPU:** 2 cores (x64/AMD64 or AArch64/ARM64)
- **RAM:** 4GB (8GB recommended for production)
- **OS:** Ubuntu, Debian, CentOS, Amazon Linux 2 or 2023, macOS, Windows with WSL2

## Deployment methods

Plane supports a wide range of deployment options from simple single-container setups to enterprise-grade Kubernetes clusters.

### Container deployments

Core deployment methods for running Plane with containerized services:

<CardGroup>
  <Card title="Docker Compose" icon="docker" href="/self-hosting/methods/docker-compose">
    Install Plane using Docker Compose with all required services. Ideal for small to medium teams.
  </Card>
  <Card title="Docker AIO" icon="docker" href="/self-hosting/methods/docker-aio">
    Single container with all Plane services. Perfect for testing and small deployments.
  </Card>
</CardGroup>

<CardGroup>

  <Card title="Kubernetes" icon="kubernetes" href="/self-hosting/methods/kubernetes">
    Production-grade deployment using Helm charts for high availability and auto-scaling.
  </Card>
</CardGroup>

### Platform deployments

Deploy Plane using specialized platforms and orchestration tools:

<CardGroup>
  <Card title="Docker Swarm" icon="docker" href="/self-hosting/methods/docker-swarm">
    Deploy Plane on Docker Swarm cluster for distributed container orchestration.
  </Card>
  <Card title="Podman Quadlets" icon="podman" href="/self-hosting/methods/podman-quadlets">
    Deploy with Podman as a Docker alternative using systemd integration.
  </Card>
</CardGroup>

<CardGroup>
  <Card title="Coolify" icon="coolify" href="/self-hosting/methods/coolify">
    Deploy Plane using Coolify's platform for simplified container management.
  </Card>
  <Card title="Portainer" icon="portainer" href="/self-hosting/methods/portainer">
    Deploy and manage Plane through Portainer's web interface.
  </Card>
</CardGroup>

### Airgapped deployments

For environments without internet access or with strict security requirements:

<CardGroup>
  <Card title="Airgapped Docker" icon="docker" href="/self-hosting/methods/airgapped-edition">
    Deploy Plane in isolated networks using Docker Compose with pre-loaded images.
  </Card>
  <Card title="Airgapped Kubernetes" icon="kubernetes" href="/self-hosting/methods/airgapped-edition-kubernetes">
    Deploy in airgapped Kubernetes clusters using Helm charts with offline images.
  </Card>
</CardGroup>
