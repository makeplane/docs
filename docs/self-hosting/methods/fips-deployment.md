---
title: FIPS deployment
description: Deploy the FIPS variant of Plane Enterprise on a FIPS-enforcing host, including prerequisites, image list, and verification.
keywords: plane fips, fips 140-3 deployment, plane commercial fips, govcloud plane, federal self-hosting, fips enabled containers
head:
  - - meta
    - name: robots
      content: noindex, nofollow
---

# FIPS deployment <Badge type="warning" text="Enterprise Grid" />

Plane publishes a FIPS variant of every application image alongside the standard set.
These images are built on Red Hat UBI 10, apply the system-wide FIPS cryptographic policy, and run
their cryptography against FIPS-validated modules (Red Hat's OpenSSL FIPS provider for the Python
and static services; the Go FIPS 140-3 module for the Go services). They are intended for
deployments that must meet FIPS 140-3 expectations, such as US Federal or GovCloud environments.

::: warning **The single most important prerequisite**
FIPS mode is a property of the **host**, not of the image. A FIPS image on a non-FIPS host starts cleanly and looks identical from the inside while providing none of the guarantees. Read [Host prerequisite](#host-prerequisite) first.
:::

## Images

The FIPS images use the same names as the standard `-commercial` images with a `-fips` suffix, in the `makeplane` Docker Hub organization:

| Service       | Image                                   |
| ------------- | --------------------------------------- |
| Backend / API | `makeplane/backend-commercial-fips`     |
| Web           | `makeplane/web-commercial-fips`         |
| Admin         | `makeplane/admin-commercial-fips`       |
| Space         | `makeplane/space-commercial-fips`       |
| Live          | `makeplane/live-commercial-fips`        |
| Silo          | `makeplane/silo-commercial-fips`        |
| Monitor       | `makeplane/monitor-commercial-fips`     |
| Email         | `makeplane/email-commercial-fips`       |
| Plane AI      | `makeplane/plane-pi-commercial-fips`    |
| Proxy         | `makeplane/proxy-commercial-fips`       |
| Flux          | `makeplane/flux-commercial-fips`        |
| Node runner   | `makeplane/node-runner-commercial-fips` |

Pin a specific release tag for any accredited deployment rather than tracking `latest` - a known,
fixed image version is part of the audit trail.

:::info
There is no FIPS All-in-One (AIO) image. The AIO image is built on an Alpine base, which has no FIPS-validated cryptography, so a FIPS deployment uses the multi-container stack, not the AIO image.
:::

## Host prerequisite

The host kernel must be booted in FIPS mode. The container inherits this through
`/proc/sys/crypto/fips_enabled` and **cannot set it itself**. Verify before deploying:

```bash
cat /proc/sys/crypto/fips_enabled     # must print 1
```

How you put the host into FIPS mode depends on the distribution and version:

**Amazon Linux 2023, RHEL 8/9 (and Rocky, Alma)** - enable in place, then reboot:

```bash
sudo dnf install -y crypto-policies-scripts
sudo fips-mode-setup --enable
sudo reboot
```

**RHEL 10** - `fips-mode-setup` has been removed and post-install switching is not supported: enable FIPS **at install time** with `fips=1` on the kernel command line.

**Other** - boot a vendor FIPS image (a RHEL FIPS AMI, Ubuntu Pro FIPS), or install OpenShift with FIPS enabled.

As a safeguard, run the FIPS images with `PLANE_REQUIRE_FIPS=1`: the containers then **refuse to
start** if the host is not in FIPS mode. Without it, a FIPS image on a non-FIPS host logs a startup
warning but runs.

## Deploy on Kubernetes

Use the same `plane-enterprise` Helm chart as a [standard Kubernetes install](/self-hosting/methods/kubernetes) -
FIPS is a values overlay, not a different chart. Three things change:

1. **Nodes** - provision a node pool whose machine image boots in FIPS mode (see
   [Host prerequisite](#host-prerequisite)). Label it (e.g. `fips: enabled`) and taint it (e.g.
   `fips=true:NoSchedule`) so only FIPS workloads land there.
2. **Images** - override every service image to its `-fips` variant.
3. **Scheduling** - every service must carry the matching `nodeSelector` and `toleration`. A pod
   that misses them schedules onto a stock node and **silently loses FIPS**.

```yaml
# values-fips.yaml
planeVersion: <release-tag>

# Non-root with group 0, matching the FIPS images' group-0-writable directories
# (see the non-root section below).
securityContext:
  enabled: true
  podSecurityContext:
    runAsGroup: 0
    fsGroup: 0

_fips_sched: &fips
  nodeSelector:
    fips: enabled
  tolerations:
    - key: fips
      operator: Equal
      value: "true"
      effect: NoSchedule

services:
  api:
    image: makeplane/backend-commercial-fips
    <<: *fips
  web:
    image: makeplane/web-commercial-fips
    <<: *fips
  space:
    image: makeplane/space-commercial-fips
    <<: *fips
  admin:
    image: makeplane/admin-commercial-fips
    <<: *fips
  live:
    image: makeplane/live-commercial-fips
    <<: *fips
  silo:
    image: makeplane/silo-commercial-fips
    <<: *fips
  monitor:
    image: makeplane/monitor-commercial-fips
    <<: *fips
  worker:
    <<: *fips
  beatworker:
    <<: *fips
  # Every additional service you enable needs the same <<: *fips block -
  # e.g. Plane AI also takes image: makeplane/plane-pi-commercial-fips, and
  # its pi_worker / pi_beat_worker need the block too.
  postgres:
    <<: *fips
  redis:
    <<: *fips
  rabbitmq:
    <<: *fips
  minio:
    <<: *fips
```

```bash
helm repo add plane https://helm.plane.so/
helm upgrade --install plane-app plane/plane-enterprise \
  --namespace plane --create-namespace \
  -f values-fips.yaml
```

On OpenShift, drop the `securityContext` override and see
[Running under a non-root or arbitrary UID](#running-under-a-non-root-or-arbitrary-uid-openshift).

## Verify

Each container logs its posture on startup:

```text
plane: FIPS mode ACTIVE (host kernel reports fips_enabled=1)
```

The Go services (monitor, email, proxy) log a corresponding line, for example
`Go FIPS 140-3 module ACTIVE`.

To check a running container directly:

```bash
# Kernel flag inherited from the host - must print 1
docker exec plane-api cat /proc/sys/crypto/fips_enabled

# The FIPS-validated OpenSSL provider must be loaded and "active"
docker exec plane-api openssl list -providers

# A non-approved digest must be refused - this must FAIL
docker exec plane-api sh -c 'echo x | openssl md5'

# Node services must report FIPS - must print 1
docker exec plane-live node -p "require('crypto').getFips()"
```

On Kubernetes, run the same checks with `kubectl exec` against any application pod, e.g.
`kubectl -n plane exec deploy/plane-app-api-wl -- cat /proc/sys/crypto/fips_enabled`.

## Configuration defaults specific to FIPS images

The FIPS images default to a stricter security posture than the standard images. A fresh FIPS
install needs none of these changed; they matter mainly when moving an existing standard
deployment onto the FIPS images.

| Setting                            | FIPS default        | Standard default | Notes                                                                                                            |
| ---------------------------------- | ------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| `LDAP_TLS_REQUIRE_CERT`            | `demand`            | `never`          | Validates the LDAP server's TLS certificate. Set to `never` to restore the previous behavior.                    |
| `SAML_REJECT_DEPRECATED_ALGORITHM` | on                  | off              | Rejects assertions signed with RSA-SHA1. The IdP must sign with SHA-256.                                         |
| `SECRET_ENCRYPTION_V2`             | on                  | off              | Writes at-rest secrets as AES-256-GCM instead of the legacy format. Both formats are always readable.            |
| `USAGE_ID_DIGEST`                  | `sha256` (required) | `md5`            | Digest for Plane AI usage-ledger keys. `md5` is incompatible with a FIPS-mode Postgres, so `sha256` is required. |

## Running under a non-root or arbitrary UID (OpenShift)

The FIPS application images run non-root, and FIPS mode itself requires no privilege.

**Plain Kubernetes** - set `runAsUser: 1000` (the images' built-in user). For any other UID, add
`runAsGroup: 0` and `fsGroup: 0`.

**OpenShift (`restricted-v2`)** - works out of the box. Don't set `runAsUser`/`runAsGroup`/`fsGroup`
yourself; the SCC assigns an arbitrary UID in group `0`, and the images' writable directories are
group-`0` writable by design. One exception: the bundled proxy binds ports 80/443, which
`restricted-v2` forbids - front it with an OpenShift Route instead. Ingress-based deployments don't
use the bundled proxy.
