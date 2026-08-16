---
title: Plane self-hosted architecture
description: Understand Plane self-hosted architecture including web server, API, workers, database, Redis, and storage components. System requirements and service topology.
keywords: plane architecture, plane system design, plane components, plane services, postgresql, redis, minio, plane infrastructure
---

# Plane self-hosted architecture

Plane consists of multiple services working together to provide project management capabilities.

![Plane architecture](/images/airgapped/plane-architecture.webp#hero)

### Frontend services

**Web**  
The main application interface where users interact with projects, work items, and pages. This service serves the UI and handles client-side routing.

**Space**  
This powers public sharing. It lets you publish projects, views, pages to the web, so others can view without needing to log in.

**Admin**  
Instance administration interface for workspace owners and administrators. Manages billing, licensing, workspace settings, and user permissions.

### API server

**API**  
The core REST API that handles all data operations. All frontend services communicate with this API for creating, reading, updating, and deleting data.

**Worker**  
Background job processor that handles async operations like file processing, notification dispatch, and data imports. Workers pull jobs from RabbitMQ and execute them independently.

**Beat worker**  
Scheduled task executor that runs periodic jobs like data cleanup, report generation, and reminder notifications. Uses a cron-like scheduling system.

**Migrator**  
Database schema management service that runs on deployment to apply schema changes and data migrations. Runs once during upgrades then exits.

### Supporting services

**Proxy**  
Handles incoming traffic and routes it to the appropriate services. Manages certificates and reverse proxying. In Docker deployments, Plane uses Caddy for automatic SSL certificate management and traffic routing.

**Live**  
Real-time collaboration service powered by WebSockets. Handles cursor positions, live updates, and presence indicators for multiple users working simultaneously.

**Monitor**  
Used for license validation and activation. It checks the license status and ensures your instance is compliant.

**Silo**  
Integration backend that manages connections to GitHub, GitLab, and Slack. Handles OAuth flows, webhook processing, and API communication with external systems.

**Intake**  
Email ingestion service that converts incoming emails into work items or comments. Requires SMTP configuration and DNS setup.

### Infrastructure dependencies

**PostgreSQL**  
Primary relational database storing all application data including projects, work items, users, and configuration. Plane requires PostgreSQL 15.7+ or 16.x.

**Redis/Valkey**  
In-memory cache and session store. Used for caching frequently accessed data, storing user sessions, and managing real-time collaboration state.

**RabbitMQ**  
Message queue for asynchronous task processing. Workers pull jobs from queues for background operations like imports, exports, and notifications.

**MinIO/S3**  
Object storage for file uploads, attachments, and generated exports; can be replaced with any S3-compatible storage system.

**OpenSearch**  
Optional search indexing service for enhanced search capabilities. Not required for basic Plane functionality.
