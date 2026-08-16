---
title: Installation errors
description: Troubleshoot installation errors. Common issues, error messages, and solutions for self-hosted Plane.
keywords: plane installation errors, deployment issues, docker errors, kubernetes errors, plane setup troubleshooting, self-hosting
---

# Installation errors

This guide is designed to help you resolve common issues encountered while installing Plane. Each section includes potential causes and step-by-step solutions for identified problems.

## Error during Docker Compose execution

<div style="color: red"> 
    Error: Error during docker compose execution. Please check permissions and try again.
</div>

- This error typically occurs when the user doesn't have sudo or root privileges. To resolve this, ensure you're logged in as the root user or as a user with sudo access before attempting the installation again.

- The issue may also be caused by using the older version of Docker Compose `docker-compose`. To fix this, install the latest version of Docker Compose `docker compose` and make sure the old version is removed.

## Migrator container exited

<div style="color: red"> 
    Error: plane-migrator-1 container exited with status 1
</div>

This error typically occurs if you have configured an external database that is running on localhost. Since the connection is being attempted from inside the container, localhost won’t work, as the database is not running within the container.

To resolve this issue, ensure that the database is hosted on a network-accessible server rather than localhost. Update the database URL to reflect the correct server address. See [how to configure external db](/self-hosting/govern/database-and-storage).
