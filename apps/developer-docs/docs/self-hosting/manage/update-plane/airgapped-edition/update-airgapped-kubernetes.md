---
title: Upgrade Airgapped Edition on Kubernetes
description: Upgrade your airgapped Plane instance running on Kubernetes by cloning images, updating the Helm chart, and redeploying.
keywords: plane airgapped kubernetes upgrade, air-gapped helm chart upgrade, plane offline k8s update
---

# Update Airgapped Edition on Kubernetes

Since airgapped clusters can't pull updates from the internet, upgrading requires manually transferring Docker images to your private registry and updating the Helm chart.

## Prerequisites

- A machine with internet access to download images and the Helm chart.
- Access to your airgapped Docker registry used by the cluster.
- Your current Helm `values.yaml` file backed up.

## Update Plane

1. On a machine with internet access, pull the latest Plane images and push them to your air-gapped Docker registry. Follow the guide for [cloning and pushing Plane Docker images](https://developers.plane.so/self-hosting/methods/clone-docker-images).

   Once complete, the latest Plane images are available in your internal registry.

2. Download the latest Plane Enterprise Helm chart. You can check the most recent version on [Artifact Hub](https://artifacthub.io/packages/helm/makeplane/plane-enterprise).

   ```bash
   # Using wget
   wget https://github.com/makeplane/helm-charts/releases/download/plane-enterprise-<chart_version>/plane-enterprise-<chart_version>.tgz

   # Using curl
   curl -L -O https://github.com/makeplane/helm-charts/releases/download/plane-enterprise-<chart_version>/plane-enterprise-<chart_version>.tgz
   ```

   Transfer the `.tgz` file to a machine that can access the cluster.

   :::info
   Replace <chart_version> with the latest Helm chart version (e.g., 2.2.4). You can check the most recent version on [Artifact Hub](https://artifacthub.io/packages/helm/makeplane/plane-enterprise).
   :::

   Before replacing your existing `values.yaml`, compare it with the new Helm chart's default values. Copy over any custom configuration from your old `values.yaml` into the new template. The new chart version may include additional or renamed fields, so always use the new default values as the base and bring your existing configuration into it.

3. In your `values.yaml`, update `planeVersion` to match the version of Plane images you pushed to the registry.

   ```yaml
   planeVersion: <plane_version>
   ```

   :::info
   Replace `<plane_version>` with the version you're upgrading to (e.g., v2.6.3). Check the [release notes](https://plane.so/changelog?category=self-hosted) for the latest available release version.
   :::

4. Once the Helm chart and `values.yaml` file are updated, redeploy the Helm release in your Kubernetes cluster to complete the update.

Verify the upgrade by checking the version in your Plane application.
