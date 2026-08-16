---
title: Docker Compose
description: Install Plane using Docker Compose. Step-by-step guide for deploying Plane with Docker on your server with all required services.
keywords: plane commercial docker, commercial edition docker compose, plane pro docker, self-hosting commercial
search: false
sidebar: false
head:
  - - meta
    - name: robots
      content: noindex, nofollow
---

# Docker Compose

This guide shows you the steps to deploy a self-hosted instance of Plane using Docker.

## Install Plane

Plane Pro and Plane Business are enabled on this edition, so the Free plan on this edition is easier to trial our paid plans from.

### Prerequisites

- A virtual or on-prem machine with at least 2 vCPUs and 4 GB RAM (8 GB RAM recommended)
- `x64` AKA `AMD 64` or `AArch 64` AKA `ARM 64` CPUs
- Supported operating systems:
  - Ubuntu
  - Debian
  - CentOS
  - Amazon Linux 2 or Linux 2023

::: info
Ensure you're using the **latest version of Docker Compose**. Check your Docker Compose version with `docker-compose --version` and update if needed.
:::

### Procedure

1.  `ssh` into your machine as the root user (or user with sudo access) per the norms of your hosting provider.
2.  Run the command below:
    ```
    curl -fsSL https://prime.plane.so/install/ | sh -
    ```
3.  Follow the instructions on the terminal. Hit `Enter` or `Return` to continue.
4.  Enter the domain name where you will access the Plane app in the format `domain.tld` or `subdomain.domain.tld`.
5.  Choose one of the options below:
    - **Express**: Plane installs with the default configurations.
    - **Advanced**: You can customize the database, Redis, storage and other settings.
      ::: warning
      When self-hosting Plane for production use, it is strongly recommended to configure [external database and storage](/self-hosting/govern/database-and-storage). This ensures that your data remains secure and accessible even if the local machine crashes or encounters hardware issues. Relying solely on local storage for these components increases the risk of data loss and service disruption.
      :::
6.  The installation will take a few minutes to complete and you will see the message **Plane has successfully installed**. You can access the Plane application on the domain you provided during the installation.
7.  If you've purchased a paid plan, [activate your license key](/self-hosting/manage/manage-licenses/activate-pro-and-business#activate-your-license) to unlock premium features.
