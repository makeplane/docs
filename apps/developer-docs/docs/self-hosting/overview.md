---
title: Deploy Plane on your infrastructure
description: Deploy Plane on your own infrastructure with Docker, Kubernetes, or Podman. Complete self-hosting guides for open-source project management with full control and customization.
keywords: self-host plane, plane docker, plane kubernetes, self-hosted project management, docker compose plane, kubernetes helm plane, on-premise deployment
---

# Deploy Plane on your infrastructure

Take complete control of your project management infrastructure by deploying Plane on your own servers. Self-hosting Plane gives you full ownership of your data and the flexibility to deploy wherever you need - from a single Docker container to enterprise Kubernetes clusters.

## Why self-host Plane?

**Data sovereignty and privacy**  
Keep all your project data within your own infrastructure. Perfect for organizations with strict data residency requirements or privacy regulations.

**Complete control**  
Customize every aspect of Plane to match your workflows. Control when and how updates are applied, and integrate with your existing tools and infrastructure.

**Compliance and security**  
Meet regulatory requirements like GDPR, HIPAA, SOC 2, or industry-specific standards by maintaining full control over data storage and access.

**No vendor lock-in**  
Your data remains accessible in open formats. Migrate, backup, or customize without restrictions.

## Deployment methods

Choose the deployment method that best fits your infrastructure and team size:

<CardGroup>
  <Card title="Docker Compose" icon="docker" href="/self-hosting/methods/docker-compose">
    Quick setup with minimal configuration, ideal for small to medium teams.
  </Card>
  <Card title="Kubernetes" icon="kubernetes" href="/self-hosting/methods/kubernetes">
    Production-grade deployment using Helm for high availability and auto-scaling.
  </Card>
</CardGroup>

[Other deployment methods](/self-hosting/methods/overview)

## Configuration and governance

Once deployed, configure your Plane instance to match your organization's needs:

<CardGroup>
  <Card title="Instance Admin and God Mode" icon="user-star" href="/self-hosting/govern/instance-admin">
    Configure instance-wide settings, manage users, and access God Mode for advanced administrative controls.
  </Card>
  <Card title="Authentication" icon="key-round" href="/self-hosting/govern/authentication">
    Set up SSO, OAuth, LDAP, or other authentication methods. Support for Google, GitHub, GitLab, and custom providers.
  </Card>
</CardGroup>

<CardGroup>
  <Card title="Email and communication" icon="mail" href="/self-hosting/govern/communication">
    Configure SMTP for email notifications, invitations, and alerts. Integrate with SendGrid, AWS SES, or your own mail server.
  </Card>
  <Card title="External services" icon="database" href="/self-hosting/govern/database-and-storage">
    Connect to managed databases (PostgreSQL, Redis) and cloud storage (S3, MinIO, GCS) for scalable, production-ready deployments.
  </Card>
</CardGroup>
