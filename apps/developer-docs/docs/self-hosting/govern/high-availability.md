---
title: High Availability Deployment
description: How to deploy Plane Commercial Edition on Kubernetes with high availability using the plane-enterprise Helm chart.
keywords: plane high availability, kubernetes ha, multi-az deployment, plane-enterprise helm chart, karpenter, pod disruption budget, hpa, self-hosting, plane kubernetes
---

# High Availability on Kubernetes <Badge type="info" text="Commercial Edition" />

This guide covers what high availability means, how the `plane-enterprise` Helm chart workloads behave under failure, and exactly what to configure so your deployment survives the loss of a single availability zone or node without manual recovery. The setup is cloud-agnostic. If you're deploying on AWS with Karpenter, there's a dedicated section for you.

Read this alongside the chart's [README](https://github.com/makeplane/helm-charts/blob/master/charts/plane-enterprise/README.md) and [values.yaml](https://github.com/makeplane/helm-charts/blob/master/charts/plane-enterprise/values.yaml).

## What HA means here

Plane Commercial Edition is a single-region application. There's one primary Postgres, one Redis, one message queue, one search cluster. High availability here means Plane keeps serving traffic when **one AZ or one node disappears**, not that you can run two independent active-active regions.

That's an important distinction for how you plan your infrastructure. You're engineering for node and AZ fault tolerance, not geographic redundancy. The playbook: run stateless workloads with multiple replicas spread across AZs, and replace every in-chart stateful service with a managed, multi-AZ equivalent.

## Workload tiers

Every workload in the chart falls into one of three tiers. The tier determines how you scale it, how it recovers from failure, and what HA configuration it needs.

### Tier 1 - Stateless, scale horizontally

These run as `Deployment`s with no local state. Scale them freely across nodes and AZs.

`api`, `web`, `space`, `admin`, `live`, `worker`, `silo`, `email_service`, `outbox_poller`, `automation_consumer`, `pi`, `pi_worker`, `runner`, `iframely`

Run at least `replicas: 2` per service. Use `replicas >= 2` for `api`, `worker`, `web`, and `live` - they carry the most traffic.

### Tier 2 - Singletons (replicas: 1 only)

These do scheduled or coordinator work. **Do not scale any of them past `replicas: 1`** - running two copies doubles job execution.

| Workload         | Kind        | Why it stays at 1                            |
| ---------------- | ----------- | -------------------------------------------- |
| `monitor`        | StatefulSet | Coordinator role; owns a `ReadWriteOnce` PVC |
| `beatworker`     | Deployment  | Celery beat - schedules periodic Plane jobs  |
| `pi_beat_worker` | Deployment  | PI beat - schedules periodic PI jobs         |
| `migrator`       | Job         | DB migration; runs once per release          |
| `pi-migrator`    | Job         | PI DB migration; runs once per release       |

The stateless singletons (`beatworker`, `pi_beat_worker`) reschedule onto a healthy node within seconds when their node fails.

`monitor` is different: it owns an AZ-bound `ReadWriteOnce` PVC. On AZ failure, Kubernetes has to reschedule it onto a node in a live AZ and reattach the volume - expect a **60–120 second** recovery window. That's acceptable because `monitor` is an internal component, not user-facing.

`migrator` and `pi-migrator` are run-once-per-release Jobs. They aren't long-running, but they still must not run in parallel.

### Tier 3 - Local stateful (not HA)

The chart ships optional in-cluster StatefulSets for development and small deployments:

`postgres`, `redis`, `rabbitmq`, `opensearch`, `minio`

These use single-replica `ReadWriteOnce` PVCs. They're **not HA.** Their data is pinned to one disk in one AZ, and the chart doesn't configure replication, failover, or quorum.

**For every HA deployment, set `local_setup: false` for every Tier-3 service** and point Plane at managed, multi-AZ equivalents. The [External managed services](#external-managed-services) section has the exact value keys.

## Cluster prerequisites

Your cluster needs the following before installing in HA mode.

**1. Worker nodes in at least three AZs.** Three is the minimum for any quorum service (etcd, Postgres synchronous replicas, OpenSearch master quorum). Two AZs survive single-AZ loss for stateless workloads but can't maintain quorum.

**2. A default `StorageClass` with `volumeBindingMode: WaitForFirstConsumer`.** This is non-negotiable when Tier-2 singletons run on nodes provisioned just-in-time (Karpenter, Cluster Autoscaler). Without it, a PVC can bind to a zone before the pod schedules, leaving the pod unable to find a matching node.

Example for AWS EBS gp2:

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: gp2
parameters:
  type: gp2
  fsType: ext4
provisioner: ebs.csi.aws.com
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Retain
allowVolumeExpansion: true
```

Then set this in `values.yaml`:

```yaml
env:
  storageClass: gp2
```

**3. A cross-zone load balancer.** Traffic must reach pods in any AZ.

| Cloud   | Recommendation                                    |
| ------- | ------------------------------------------------- |
| AWS     | NLB or ALB with cross-zone load balancing enabled |
| GCP     | Default global LB                                 |
| Azure   | Standard Load Balancer with zones `[1,2,3]`       |
| On-prem | MetalLB in BGP mode, or an external LB            |

**4. A working `IngressClass`.** The chart supports `traefik` (default) or `nginx`. Deploy the ingress controller with `replicas >= 2` spread across AZs.

**5. AZ-aware node labels.** Kubernetes uses `topology.kubernetes.io/zone` for AZ awareness. Managed clusters populate this automatically. Verify your nodes carry this label if you're on a self-managed cluster.

## Recommended topology

```text
                     ┌──────────────────────────┐
                     │   External Load Balancer │
                     │   (cross-zone enabled)   │
                     └────────────┬─────────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
         ┌────▼────┐         ┌────▼────┐         ┌────▼────┐
         │  AZ-a   │         │  AZ-b   │         │  AZ-c   │
         │         │         │         │         │         │
         │ ingress │         │ ingress │         │ ingress │
         │ api x N │         │ api x N │         │ api x N │
         │ web x N │         │ web x N │         │ web x N │
         │ worker  │         │ worker  │         │ worker  │
         │  …      │         │  …      │         │  …      │
         └─────────┘         └─────────┘         └─────────┘
                                  │
                ┌─────────────────┼─────────────────┐
                │                 │                 │
        ┌───────▼──────┐  ┌───────▼──────┐  ┌───────▼──────┐
        │  Managed     │  │  Managed     │  │  Object      │
        │  Postgres    │  │  Redis       │  │  Storage     │
        │  (multi-AZ)  │  │  (multi-AZ)  │  │  (S3-class)  │
        └──────────────┘  └──────────────┘  └──────────────┘
        ┌──────────────┐  ┌──────────────┐
        │  Managed     │  │  Managed     │
        │  RabbitMQ    │  │  OpenSearch  │
        │  (cluster)   │  │  (multi-AZ)  │
        └──────────────┘  └──────────────┘
```

Tier-1 pods spread across AZs. All Tier-3 state lives in managed services that handle their own replication and failover.

## External managed services

### Value keys

The chart supports pointing each stateful component at a remote managed service. Use these value keys.

| Component    | Disable local                            | External URL / credentials                                                                                                                                         |
| ------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Postgres     | `services.postgres.local_setup: false`   | `env.pgdb_remote_url`, `env.pg_pi_db_remote_url`; optional read replica via `services.postgres.read_replica.enabled` + `services.postgres.read_replica.remote_url` |
| Redis        | `services.redis.local_setup: false`      | `env.remote_redis_url`                                                                                                                                             |
| RabbitMQ     | `services.rabbitmq.local_setup: false`   | `services.rabbitmq.external_rabbitmq_url`                                                                                                                          |
| OpenSearch   | `services.opensearch.local_setup: false` | `env.opensearch_remote_url`, `env.opensearch_remote_username`, `env.opensearch_remote_password`; optional `env.opensearch_index_prefix` for multi-tenant clusters  |
| Object store | `services.minio.local_setup: false`      | `env.aws_access_key`, `env.aws_secret_access_key`, `env.aws_region`, `env.aws_s3_endpoint_url`, `env.docstore_bucket`                                              |

### What HA looks like for each service

Setting `local_setup: false` doesn't make your data tier HA on its own. The managed service you point Plane at must also be HA. Here's what each one needs.

- **Postgres** - Multi-AZ primary with synchronous replication and automated failover. Use RDS Multi-AZ, Cloud SQL HA, Azure Flexible Server zone-redundant, or self-managed Patroni.

- **Redis** - A replica group with automatic failover. Use ElastiCache Multi-AZ, Memorystore HA, or Redis Sentinel/Cluster. Redis failover drops in-flight connections; Plane reconnects automatically.

- **RabbitMQ** - A true cluster with quorum queues across ≥3 nodes in ≥3 AZs. CloudAMQP and Amazon MQ for RabbitMQ in cluster mode both work. A single-node managed RabbitMQ is **not** HA.

- **OpenSearch** - ≥3 master-eligible nodes across 3 AZs, plus data nodes spread across AZs.

- **Object storage** - S3, GCS, and Azure Blob are multi-AZ by design.

## Spreading pods across availability zones

### How the chart exposes scheduling controls

The chart exposes `nodeSelector`, `tolerations`, and `affinity` on every service (see `templates/_helpers.tpl` → `plane.podScheduling`). Use these to spread Tier-1 pods across AZs.

:::info
The chart doesn't natively support `topologySpreadConstraints` - that's on the roadmap. Use `podAntiAffinity` in the meantime. It's functionally equivalent for AZ spreading.
:::

### Recommended pattern: soft AZ anti-affinity + hard node anti-affinity

Use a hard rule to prevent two replicas landing on the same node, and a soft rule to prefer spreading across AZs. The soft AZ rule means the scheduler can still place pods if one AZ is under pressure.

```yaml
services:
  api:
    replicas: 3
    affinity:
      podAntiAffinity:
        # Hard: never put two api pods on the same node
        requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
                - key: app.name
                  operator: In
                  values:
                    - <namespace>-<release-name>-api
            topologyKey: kubernetes.io/hostname
        # Soft: prefer spreading api pods across AZs
        preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchExpressions:
                  - key: app.name
                    operator: In
                    values:
                      - <namespace>-<release-name>-api
              topologyKey: topology.kubernetes.io/zone
```

The chart labels every workload with `app.name` set to <code v-pre>{{ .Release.Namespace }}-{{ .Release.Name }}-&lt;svc&gt;</code>. For a release named `plane` in namespace `plane`, that's `plane-plane-api` for the API.

:::warning
**Watch for this**
The hard hostname anti-affinity rule requires at least as many schedulable nodes as the workload's replica count. Three `api` replicas need three nodes available, or pods sit `Pending`. If you can't guarantee that (small cluster, dedicated taints), relax the hostname rule to `preferredDuringSchedulingIgnoredDuringExecution`.
:::

Apply this pattern to every Tier-1 service: `web`, `space`, `admin`, `live`, `worker`, `silo`, `email_service`, `outbox_poller`, `automation_consumer`, `pi`, `pi_worker`, `runner`, `iframely`.

### Pinning workloads to specific node pools

Use `nodeSelector` and `tolerations` to route a workload to a specific pool - for example, spot instances for batch workers:

```yaml
services:
  worker:
    replicas: 6
    nodeSelector:
      workload-class: batch
    tolerations:
      - key: workload-class
        operator: Equal
        value: batch
        effect: NoSchedule
```

## PodDisruptionBudgets

:::info
Native PDB rendering is planned for a future release. Apply the manifests below yourself until then.
:::

PDBs protect Tier-1 deployments from voluntary disruption - a node drain or cluster upgrade - taking a service down entirely. Without them, Kubernetes can evict all pods of a deployment simultaneously.

Apply this manifest in the same namespace as your release. Replace `RELEASE` and `NAMESPACE` with your values.

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: plane-api-pdb
  namespace: NAMESPACE
spec:
  minAvailable: 1
  selector:
    matchLabels:
      app.name: NAMESPACE-RELEASE-api
---
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: plane-web-pdb
  namespace: NAMESPACE
spec:
  minAvailable: 1
  selector:
    matchLabels:
      app.name: NAMESPACE-RELEASE-web
---
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: plane-space-pdb
  namespace: NAMESPACE
spec:
  minAvailable: 1
  selector:
    matchLabels:
      app.name: NAMESPACE-RELEASE-space
---
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: plane-admin-pdb
  namespace: NAMESPACE
spec:
  minAvailable: 1
  selector:
    matchLabels:
      app.name: NAMESPACE-RELEASE-admin
---
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: plane-live-pdb
  namespace: NAMESPACE
spec:
  minAvailable: 1
  selector:
    matchLabels:
      app.name: NAMESPACE-RELEASE-live
---
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: plane-worker-pdb
  namespace: NAMESPACE
spec:
  minAvailable: 1
  selector:
    matchLabels:
      app.name: NAMESPACE-RELEASE-worker
---
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: plane-silo-pdb
  namespace: NAMESPACE
spec:
  minAvailable: 1
  selector:
    matchLabels:
      app.name: NAMESPACE-RELEASE-silo
```

Add similar PDBs for `pi`, `pi_worker`, `outbox_poller`, `automation_consumer`, `email_service`, `runner`, and `iframely` if you have enabled them.

:::warning
**Don't create PDBs for Tier-2 singletons** (`beatworker`, `pi_beat_worker`, `monitor`, `migrator`). A `minAvailable: 1` PDB on a `replicas: 1` workload blocks node drains entirely.
:::

## HorizontalPodAutoscalers

:::info
Native HPA rendering is planned for a future release. Apply the manifests below yourself until then.
:::

HPAs scale Tier-1 services automatically under load. The thresholds below match the default resource requests in `values.yaml`. Tune `averageUtilization` and `maxReplicas` based on observed production load.

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: plane-api-hpa
  namespace: NAMESPACE
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: RELEASE-api-wl
  minReplicas: 3
  maxReplicas: 12
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: plane-worker-hpa
  namespace: NAMESPACE
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: RELEASE-worker-wl
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: plane-web-hpa
  namespace: NAMESPACE
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: RELEASE-web-wl
  minReplicas: 2
  maxReplicas: 8
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

:::warning
**Never create an HPA for `beatworker`, `pi_beat_worker`, `monitor`, or any migration Job.** Scheduled jobs would fire multiple times.
:::

## Karpenter on AWS

If you're on EKS, Karpenter is the recommended node provisioner for Plane Commercial Edition. It's AZ-aware, provisions nodes in seconds, and lets you mix on-demand and spot capacity per workload type.

### Minimum versions

- Karpenter ≥ v1.0
- Kubernetes ≥ 1.29
- AWS Load Balancer Controller ≥ v2.7
- AWS EBS CSI driver installed

### EC2NodeClass

One `EC2NodeClass` covers most installs. Use AL2023, IMDSv2-only, and gp2 root volumes.

```yaml
apiVersion: karpenter.k8s.aws/v1
kind: EC2NodeClass
metadata:
  name: plane-default
spec:
  amiFamily: AL2023
  amiSelectorTerms:
    - alias: al2023@latest
  role: KarpenterNodeRole-CLUSTER_NAME
  subnetSelectorTerms:
    - tags:
        karpenter.sh/discovery: CLUSTER_NAME
  securityGroupSelectorTerms:
    - tags:
        karpenter.sh/discovery: CLUSTER_NAME
  blockDeviceMappings:
    - deviceName: /dev/xvda
      ebs:
        volumeType: gp2
        volumeSize: 100Gi
        encrypted: true
        deleteOnTermination: true
  metadataOptions:
    httpEndpoint: enabled
    httpTokens: required
    httpPutResponseHopLimit: 1
```

### NodePools

Two NodePools cover most deployments: an on-demand pool for general Tier-1 workloads, and a spot pool for batch workers (`worker`, `pi_worker`, `runner`, `outbox_poller`, `automation_consumer`).

```yaml
apiVersion: karpenter.sh/v1
kind: NodePool
metadata:
  name: plane-general
spec:
  template:
    spec:
      nodeClassRef:
        group: karpenter.k8s.aws
        kind: EC2NodeClass
        name: plane-default
      requirements:
        - key: kubernetes.io/arch
          operator: In
          values: [amd64]
        - key: karpenter.sh/capacity-type
          operator: In
          values: [on-demand]
        - key: karpenter.k8s.aws/instance-category
          operator: In
          values: [c, m]
        - key: karpenter.k8s.aws/instance-generation
          operator: Gt
          values: ["5"]
        - key: topology.kubernetes.io/zone
          operator: In
          values: [REGION-a, REGION-b, REGION-c]
      expireAfter: 720h
  limits:
    cpu: "200"
    memory: 400Gi
  disruption:
    consolidationPolicy: WhenEmptyOrUnderutilized
    consolidateAfter: 1m
---
apiVersion: karpenter.sh/v1
kind: NodePool
metadata:
  name: plane-spot
spec:
  template:
    spec:
      nodeClassRef:
        group: karpenter.k8s.aws
        kind: EC2NodeClass
        name: plane-default
      taints:
        - key: workload-class
          value: batch
          effect: NoSchedule
      requirements:
        - key: kubernetes.io/arch
          operator: In
          values: [amd64]
        - key: karpenter.sh/capacity-type
          operator: In
          values: [spot]
        - key: karpenter.k8s.aws/instance-category
          operator: In
          values: [c, m, r]
        - key: karpenter.k8s.aws/instance-generation
          operator: Gt
          values: ["5"]
        - key: topology.kubernetes.io/zone
          operator: In
          values: [REGION-a, REGION-b, REGION-c]
      expireAfter: 24h
  limits:
    cpu: "400"
    memory: 800Gi
  disruption:
    consolidationPolicy: WhenEmptyOrUnderutilized
    consolidateAfter: 5m
```

Match the spot NodePool taint with tolerations in your values:

```yaml
services:
  worker:
    tolerations:
      - key: workload-class
        operator: Equal
        value: batch
        effect: NoSchedule
    nodeSelector:
      karpenter.sh/nodepool: plane-spot
```

### How Karpenter interacts with AZ spread

- Karpenter respects `podAntiAffinity` when deciding which AZ to provision a node in. The affinity patterns from the previous section are sufficient to drive Karpenter's AZ distribution - no extra configuration needed.

- Don't add `karpenter.sh/do-not-disrupt: "true"` to Tier-1 pods. They're stateless. Let Karpenter consolidate them freely.

- Do add it to Tier-2 singletons (`beatworker`, `pi_beat_worker`, `monitor`) and to in-flight long-running Jobs (`migrator`). They tolerate rescheduling, but you don't want Karpenter bouncing them during a deployment:

```yaml
services:
  beatworker:
    annotations:
      karpenter.sh/do-not-disrupt: "true"
```

- `consolidateAfter: 1m` on the on-demand pool keeps the cluster cost-efficient. Raise it to `5m` or `10m` if you see churn during normal scaling. The spot pool's `expireAfter: 24h` forces daily node recycling, spreading the impact of spot interruptions across time rather than concentrating them.

## Ingress and load balancer

- Deploy the ingress controller (`traefik` or `nginx`) with `replicas >= 2` spread across AZs using the same `podAntiAffinity` pattern.

- Enable cross-zone load balancing on the cloud LB. On AWS:

  ```yaml
  service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: "true"
  ```

- The `live` service uses WebSockets. Make sure your ingress controller and LB don't have idle-timeout values that drop long-lived connections. The default AWS NLB idle timeout is 350s - that's usually fine. ALB defaults to 60s and needs raising for WebSocket connections.

- The chart configures request-body size limits via `ingress.traefik.maxRequestBodyBytes` (Traefik) and `nginx.ingress.kubernetes.io/proxy-body-size` (nginx). Tune these to your expected file upload size.

## Backup and disaster recovery

HA protects against AZ and node failure. Backups protect against logical corruption, accidental deletion, and ransomware. You need both.

| Component          | Backup mechanism                                                                                                            | Recommended retention  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| Postgres           | Managed-service automated backups + PITR                                                                                    | 30 days, PITR ≥ 7 days |
| Object storage     | Bucket versioning + lifecycle to a different bucket/region                                                                  | 90 days                |
| OpenSearch         | Snapshots to object storage                                                                                                 | 7 days                 |
| Redis              | Optional; treat as cache + queue. Document what your team loses on a full Redis failure (sessions, in-flight Celery tasks). | -                      |
| RabbitMQ           | Definitions export (users, queues, bindings) on a schedule; messages are transient                                          | -                      |
| Kubernetes objects | Velero, namespace-scoped, daily                                                                                             | 30 days                |

**Run a restore drill** before go-live and at least once per quarter. A backup that's never been restored is an assumption, not a guarantee.

## Pre-go-live checklist

Work through every item before sending real traffic.

- [ ] Cluster has worker nodes in ≥3 AZs
- [ ] Default `StorageClass` is `WaitForFirstConsumer`
- [ ] `env.storageClass` is set to that class
- [ ] All Tier-3 `local_setup` flags are `false`
- [ ] Managed Postgres is multi-AZ with synchronous replica
- [ ] Managed Redis has replica + auto-failover
- [ ] Managed RabbitMQ is a true cluster across ≥3 AZs
- [ ] Managed OpenSearch has ≥3 masters across ≥3 AZs
- [ ] Object storage is multi-AZ (S3/GCS/Blob) with versioning enabled
- [ ] Every Tier-1 service has `replicas >= 2` (3 for `api`, `worker`, `web`)
- [ ] Every Tier-1 service has a `podAntiAffinity` block (hostname + zone)
- [ ] Every Tier-1 service has a PDB
- [ ] HPAs applied for `api`, `worker`, `web` at minimum
- [ ] No HPA or PDB on `beatworker`, `pi_beat_worker`, `monitor`, `migrator`
- [ ] Ingress controller runs with `replicas >= 2` spread across AZs
- [ ] LB has cross-zone load balancing enabled
- [ ] Backups configured and a restore drill has succeeded
- [ ] Failure drill: cordon and drain every node in one AZ; Plane stays up
- [ ] Failure drill: kill the active Postgres node; Plane recovers

## Known chart gaps

The following capabilities aren't natively provided by the chart and need to be applied separately.

| Gap                                                            | Workaround                                                                                      |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| No native `topologySpreadConstraints` in `plane.podScheduling` | Use `podAntiAffinity` as shown in the spreading section - functionally equivalent for AZ spread |
| No PDBs rendered by the chart                                  | Apply the PDB manifests from the PodDisruptionBudgets section                                   |
| No HPAs rendered by the chart                                  | Apply the HPA manifests from the HorizontalPodAutoscalers section                               |
| In-chart Tier-3 StatefulSets are single-replica, RWO           | Set `local_setup: false` and use managed services                                               |
| `monitor` is a singleton StatefulSet                           | Accept the 60–120s reschedule window on AZ failure - it's internal and non-user-facing          |

## Reference values.yaml for HA

A minimal example that disables every local stateful service and gives each Tier-1 workload three replicas with AZ anti-affinity. Adapt names to your release.

```yaml
planeVersion: v2.6.3

license:
  licenseServer: https://prime.plane.so
  licenseDomain: plane.example.com

ingress:
  enabled: true
  ingressClass: traefik

env:
  storageClass: gp2
  pgdb_remote_url: "postgres://plane:***@pg-primary.example.internal:5432/plane?sslmode=require"
  pg_pi_db_remote_url: "postgres://plane:***@pg-primary.example.internal:5432/plane_pi?sslmode=require"
  remote_redis_url: "redis://:***@redis.example.internal:6379/0"
  opensearch_remote_url: "https://opensearch.example.internal:9200"
  opensearch_remote_username: plane
  opensearch_remote_password: "***"
  aws_access_key: "***"
  aws_secret_access_key: "***"
  aws_region: us-east-1
  aws_s3_endpoint_url: https://s3.us-east-1.amazonaws.com
  docstore_bucket: plane-uploads-prod
  web_url: https://plane.example.com
  instance_admin_email: admin@example.com
  cors_allowed_origins: https://plane.example.com

services:
  postgres:
    local_setup: false
    read_replica:
      enabled: true
      remote_url: "postgres://plane:***@pg-reader.example.internal:5432/plane?sslmode=require"
  redis:
    local_setup: false
  rabbitmq:
    local_setup: false
    external_rabbitmq_url: "amqps://plane:***@rabbitmq.example.internal:5671/plane"
  opensearch:
    local_setup: false
  minio:
    local_setup: false

  api:
    replicas: 3
    affinity: &spread-api
      podAntiAffinity:
        requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
                - { key: app.name, operator: In, values: [plane-plane-api] }
            topologyKey: kubernetes.io/hostname
        preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchExpressions:
                  - { key: app.name, operator: In, values: [plane-plane-api] }
              topologyKey: topology.kubernetes.io/zone

  web: { replicas: 3 }
  space: { replicas: 2 }
  admin: { replicas: 2 }
  live: { replicas: 3 }
  worker: { replicas: 4 }
  silo: { enabled: true, replicas: 2 }

  beatworker: { replicas: 1 } # singleton - do not scale
  pi_beat_worker: { replicas: 1 } # singleton - do not scale
```

Repeat the `affinity` block (varying the pod label) for every Tier-1 service. YAML anchors (`&spread-api` / `*spread-api`) help avoid repetition.
