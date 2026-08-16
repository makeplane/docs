---
title: CLI errors
description: Troubleshoot cli errors. Common issues, error messages, and solutions for self-hosted Plane.
keywords: plane cli errors, prime cli troubleshooting, command line issues, plane cli fix, self-hosting troubleshooting
---

# CLI errors

This page helps you troubleshoot common issues you might run into when using the Plane CLI tools. It covers potential causes of errors and provides straightforward steps to resolve them.

## Failed to update Prime CLI

<div style="color: red"> 
    Error: Failed to update Prime CLI, please contact support or try again later.
</div>

This error typically happens if you're using an older version of the Prime CLI. To fix it, follow these steps:

1. Start by taking a [data backup](/self-hosting/manage/backup-restore#backup-data) to be safe.
2. Run this command to remove the existing CLI:
   ```bash
   rm -rf /usr/bin/prime-cli
   ```
3. Install the latest version of the CLI with:
   ```bash
   curl -fsSL https://prime.plane.so/install/ | sh
   ```
