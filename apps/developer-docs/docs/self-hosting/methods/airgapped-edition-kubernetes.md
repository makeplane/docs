---
title: Deploy Plane with airgapped Kubernetes
description: Deploy Plane on Kubernetes using Helm charts. Complete guide for production-ready Kubernetes deployment with scaling and management.
keywords: plane airgapped kubernetes, offline k8s deployment, air-gapped helm, kubernetes offline, plane helm airgapped, self-hosting
---

# Deploy Plane Airgapped on Kubernetes <Badge type="warning" text="Enterprise Grid" />

::: info
Airgapped deployments are available exclusively for Enterprise Grid customers with a minimum commitment of 100 seats. Contact our [Sales team](mailto:sales@plane.so) for trials, exceptions to the seat cut-off, tailored pricing, and licensing info.
:::

This guide walks you through deploying Plane Commercial in an airgapped Kubernetes environment using Helm charts and pre-packaged Docker images.

## What you'll need

Before starting, ensure you have:

- Kubernetes cluster (v1.31 - v1.33)
- Helm 3.x installed
- `kubectl` configured to access your cluster
- `cert-manager` available in the cluster
- A valid and working ingress controller (nginx, traefik, etc)
- Required ports opened to access the application (80, 443)
- SMTP ports opened if using email intake (25, 465, 587)

::: warning
While Kubernetes can run stateful services with persistent volumes, and Plane's Helm chart supports deploying PostgreSQL, MinIO, RabbitMQ, and Redis, we strongly recommend using external managed services for better reliability in backup/restore operations and disaster recovery.

Consider these alternatives:

- **MinIO**: Replace with AWS S3, Google Cloud Storage, or any S3-compatible service
- **Redis**: Replace with Valkey or a managed Redis service
- **PostgreSQL**: Use a managed PostgreSQL service
- **RabbitMQ**: Use a managed message queue service
- **OpenSearch**: Use a managed OpenSearch service
  :::

## Install Plane

1. **Download Plane Enterprise Helm chart**

   Get the Plane Enterprise Helm chart from the official release. Check for the latest version at [Artifact Hub](https://artifacthub.io/packages/helm/makeplane/plane-enterprise).

   ```bash
   # Using wget
   wget https://github.com/makeplane/helm-charts/releases/download/plane-enterprise-1.6.4/plane-enterprise-1.6.4.tgz

   # Using curl
   curl -L -O https://github.com/makeplane/helm-charts/releases/download/plane-enterprise-1.6.4/plane-enterprise-1.6.4.tgz
   ```

2. **Prepare Docker images for airgapped environment**

   Refer to [this document](/self-hosting/methods/clone-docker-images) to download the Docker images from the public repository to your internal repository.

   ::: info
   This process will NOT download or clone these infrastructure images:
   - `valkey:7.2.5-alpine`
   - `postgres:15.7-alpine`
   - `rabbitmq:3.13.6-management-alpine`
   - `minio/minio:latest`
   - `minio/mc:latest`
   - `opensearchproject/opensearch:3.3.2`

   If you're using `local_setup: true` for any of these services, you'll need to pull and transfer these images separately.
   :::

3. **Configure custom values file**

   a. Extract the default values from the Helm chart.

   ```bash
   helm show values plane-enterprise-1.6.4.tgz > custom-values.yaml
   ```

   b. Update Docker image references

   Edit the `custom-values.yaml` file to point to your local or private registry images and configure important settings.

   **Basic configuration:**

   ```yaml
   # Specify the Plane version
   planeVersion: <plane-version>

   # Enable airgapped mode (REQUIRED)
   airgapped:
     enabled: true # Must be TRUE for airgapped installations
     # If using custom root CA for S3 storage
     s3Secrets:
       - name: plane-s3-ca
         key: s3-custom-ca.crt
       - name: plane-s3-ca-2
         key: s3-custom-ca-2.crt
   ```

   **Service images:**

   ```yaml
   services:
     web:
       image: /web-commercial

     api:
       image: /backend-commercial

     space:
       image: /space-commercial

     admin:
       image: /admin-commercial

     live:
       image: /live-commercial

     monitor:
       image: /monitor-commercial

     email_service:
       enabled: true
       image: /email-commercial

     silo:
       enabled: true
       image: /silo-commercial

     iframely:
       enabled: true
       image: /iframely:v1.2.0
   ```

   **Infrastructure services:**

   Configure whether to use local (in-cluster) or external services:

   ```yaml
   services:
     # Database and infrastructure images
     redis:
       local_setup: true # Set to false if using external service
       image: valkey/valkey:7.2.11-alpine

     postgres:
       local_setup: true # Set to false if using external service
       image: postgres:15.7-alpine

     rabbitmq:
       local_setup: true # Set to false if using external service
       image: rabbitmq:3.13.6-management-alpine
       external_rabbitmq_url: "" # Required only if using remote RabbitMQ

     minio:
       local_setup: true # Set to false if using external service
       image: minio/minio:latest
       image_mc: minio/mc:latest
   ```

   **Environment variables:**

   ```yaml
   env:
     storageClass: ""
     remote_redis_url: "" # Required only if using remote Redis
     pgdb_remote_url: "" # Required only if using remote PostgreSQL
     # Required if MinIO local_setup is false
     aws_access_key: ""
     aws_secret_access_key: ""
     aws_region: ""
     aws_s3_endpoint_url: ""
   ```

   c. **Configure integrations and importers**

   To set up integrations with external systems like Slack, GitHub, and GitLab, configure these values in `custom-values.yaml`:

   ```yaml
   services:
     silo:
       enabled: true
       connectors:
         slack:
           enabled: false
           client_id: ""
           client_secret: ""
         github:
           enabled: false
           client_id: ""
           client_secret: ""
           app_name: ""
           app_id: ""
           private_key: ""
         gitlab:
           enabled: false
           client_id: ""
           client_secret: ""

   env:
     silo_envs:
       batch_size: 100
       mq_prefetch_count: 1
       request_interval: 400
       hmac_secret_key: ""
       aes_secret_key: "dsOdt7YrvxsTIFJ37pOaEVvLxN8KGBCr"
   ```

   d. **Configure intake email**

   The email intake feature in Plane lets you capture incoming emails. Before or after setting up the application, configure DNS settings following [this guide](https://developers.plane.so/self-hosting/govern/configure-dns-email-service).

   Add these required values to `custom-values.yaml`:

   ```yaml
   ingress:
       enabled: true
       ingressClass: 'nginx'  # Or as per your cluster
       ingress_annotations: {}

   ssl:
       tls_secret_name: ''  # If you have a custom TLS secret name
       # If you want to use Let's Encrypt, set createIssuer and generateCerts to true
       createIssuer: false
       issuer: http  # Allowed: cloudflare, digitalocean, http
       token: ''  # Not required for http
       server: https://acme-v02.api.letsencrypt.org/directory
       email: plane@example.com  # A valid email address
       generateCerts: true

   services:
       email_service:
           enabled: true
           replicas: 1
           memoryLimit: 1000Mi
           cpuLimit: 500m
           memoryRequest: 50Mi
           cpuRequest: 50m
           image: /email-commercial:
           pullPolicy: Always
           nodeSelector: {}
           tolerations: []
           affinity: {}
           labels: {}
           annotations: {}

   env:
       email_service_envs:
           smtp_domain: ''
   ```

4. **Install or upgrade with custom values**

   Install Plane Enterprise using your customized values file:

   ```bash
   helm upgrade plane-app plane-enterprise-1.6.4.tgz \
       --install \
       --create-namespace \
       --namespace plane \
       -f custom-values.yaml \
       --timeout 10m \
       --wait \
       --wait-for-jobs
   ```

5. **Verify installation**

   Check that all components are running:

   ```bash
   # Check all pods
   kubectl get pods -n plane

   # Check services
   kubectl get services -n plane

   # Check ingress
   kubectl get ingress -n plane

   # Check persistent volumes
   kubectl get pv,pvc -n plane

   # Get the ingress URL
   kubectl get ingress -n plane -o wide
   ```

   You now have Plane running in your air-gapped environment. If you run into any issues, check the logs using the commands above, or reach out to our support team for assistance.

6. [Activate your license key](/self-hosting/manage/manage-licenses/activate-airgapped).

## Additional configuration

For more advanced Plane configuration options, refer to the [Kubernetes documentation](https://developers.plane.so/self-hosting/methods/kubernetes#configuration-settings).
