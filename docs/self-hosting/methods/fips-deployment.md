---
title: FIPS deployment
description: Deploy the FIPS variant of Plane Enterprise on a FIPS-enforcing host, including prerequisites, image list, verification, and scope of coverage.
keywords: plane fips, fips 140-3 deployment, plane commercial fips, govcloud plane, federal self-hosting, fips enabled containers
head:
  - - meta
    - name: robots
      content: noindex, nofollow
---

# FIPS deployment <Badge type="warning" text="Enterprise Grid" />

Plane Enterprise publishes a FIPS variant of every application image alongside the standard set.
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
There is no FIPS All-in-One (AIO) image. The AIO image is built on an Alpine base, which has no FIPS-validated cryptography, so a FIPS deployment uses the multi-container Compose stack below, not the AIO image.
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

On AL2023 `/boot` lives on the root filesystem, so no separate partition is required. On RHEL/Rocky/Alma with a **separate** `/boot` (or `/boot/efi`) partition, that partition must be mounted so `fips-mode-setup` can update the bootloader.

**RHEL 10** - `fips-mode-setup` has been **removed**, and switching an already-installed system to FIPS mode is **not supported**. FIPS mode must be enabled **at install time** by adding `fips=1` to the kernel command line (or `fips = true` in a RHEL image-builder blueprint). A post-install `update-crypto-policies --set FIPS` is **not** sufficient for FIPS 140 compliance - the only supported path on a non-FIPS install is reinstalling.

**Other** - boot a vendor FIPS image (a RHEL FIPS AMI, Ubuntu Pro FIPS), or install OpenShift with FIPS enabled.

In all cases, the definitive check is the kernel flag above (`/proc/sys/crypto/fips_enabled` = `1`).

As a safeguard, the shipped Compose file sets `PLANE_REQUIRE_FIPS=1`, so the containers **refuse to
start** if the host is not in FIPS mode. Set it to `0` to downgrade that to a startup warning.

## Deploy

Each Plane Enterprise FIPS release ships a deployment bundle containing the files below. The
Plane Enterprise source repository is private, so these files are not publicly browsable - they
are distributed with the release. If you don't have the bundle for your release, request it from
your Plane account team or [contact support](https://plane.so/contact).

- `docker-compose-fips.yml` - the FIPS stack
- `variables.env` - environment template
- `README-FIPS.md` - the authoritative operations reference
- `verify-fips.sh` - the verification script (see [Verify](#verify))

```bash
# 1. Confirm the host is in FIPS mode (above).
# 2. Prepare the environment file.
cp variables.env .env
#    Edit at least: DOMAIN_NAME, WEB_URL, SECRET_KEY, MACHINE_SIGNATURE.

# 3. Bring the stack up.
docker compose -f docker-compose-fips.yml up -d
```

Each container logs its posture on startup:

```text
plane: FIPS mode ACTIVE (host kernel reports fips_enabled=1)
```

The Go services (monitor, email, proxy) log a corresponding line, for example
`Go FIPS 140-3 module ACTIVE`.

## Verify

`verify-fips.sh` checks the posture across the running stack - the kernel flag inside each container, that the
validated OpenSSL provider is loaded and active, that a non-approved digest is refused, that Node's
`crypto.getFips()` returns 1, and that the Go services report the module. It is designed to exit
non-zero when a check does not hold, so it can gate a deployment pipeline:

```bash
./verify-fips.sh
```

## Configuration defaults specific to FIPS images

The FIPS images default to a stricter security posture than the standard images. Each default is
overridable with an environment variable, in either direction. These matter mainly if you are
moving an existing standard deployment onto the FIPS images; a fresh FIPS install needs none of
them changed.

| Setting                            | FIPS default        | Standard default | Notes                                                                                                                                                                                      |
| ---------------------------------- | ------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `LDAP_TLS_REQUIRE_CERT`            | `demand`            | `never`          | Validates the directory server's TLS certificate. See [LDAP](#ldap-certificate-validation).                                                                                                |
| `SAML_REJECT_DEPRECATED_ALGORITHM` | on                  | off              | Rejects assertions signed with RSA-SHA1. The IdP must sign with SHA-256.                                                                                                                   |
| `SECRET_ENCRYPTION_V2`             | on                  | off              | Writes at-rest secrets as AES-256-GCM instead of the legacy format. Both formats are always readable.                                                                                      |
| `USAGE_ID_DIGEST`                  | `sha256` (required) | `md5`            | Digest for Plane AI usage-ledger keys. Under FIPS this is **not** an "either direction" override: a FIPS-mode Postgres refuses `md5()`, so `sha256` is required and `md5` is incompatible. |

### LDAP certificate validation

On the FIPS images, LDAP TLS certificate validation is on by default. For it to succeed, **both** of
the following must hold:

1. The directory certificate chains to a trusted CA. For a private or self-signed CA, point
   `LDAP_TLS_CA_CERTFILE` at your CA bundle (PEM).
2. The certificate's CN/SAN matches the host in `LDAP_SERVER_URI`. An IP address or short hostname
   that is not in the certificate's SAN fails hostname verification **even with the correct CA
   bundle** - use the fully qualified name the certificate was issued for.

Setting `LDAP_TLS_REQUIRE_CERT=never` restores the previous behaviour and logs a warning on every
connection.

## Running under a non-root or arbitrary UID (OpenShift)

The FIPS application images run non-root, and FIPS mode itself requires no privilege. How you set
the pod security context depends on the platform:

**Plain Kubernetes.** Pin the image's built-in user with `runAsUser: 1000`. If you run under a
different UID, also set `runAsGroup: 0` and `fsGroup: 0` so that UID keeps write access through the
images' group-`0`-writable directories.

**OpenShift (`restricted-v2`).** Do **not** set `runAsUser`, `runAsGroup`, or `fsGroup` yourself. The
SCC assigns an arbitrary high UID that is a member of group `0`, and it allocates `fsGroup` from the
namespace's `openshift.io/sa.scc.supplemental-groups` range - an explicit `fsGroup: 0` is rejected
unless that range includes `0`. No image change or group override is needed: the images' writable
directories are already group-`0` writable, which is exactly what the assigned UID needs.

The bundled proxy is the one exception: Caddy binds `:80`/`:443`, which `restricted-v2` forbids for a
non-root process. Front it with an OpenShift Route (running Caddy on high ports), or grant it an SCC
that permits `NET_BIND_SERVICE`. Ingress-based deployments do not use the bundled proxy.

## Scope of coverage

**Covered.** The Plane application images run their cryptography against FIPS-validated modules on a
FIPS-enforcing host. Non-approved algorithms are refused.

**The bundled data plane is not FIPS.** The `postgres`, `valkey`, `rabbitmq`, `minio`, and
`iframely` services in the Compose file are upstream Alpine/musl images with no FIPS-validated
cryptography - there are no FIPS variants of them. They are suitable for evaluation only. For an
accreditable deployment, replace them with externally managed datastores on FIPS endpoints and
repoint the connection variables:

| Service       | Replace with                      | Variables                                     |
| ------------- | --------------------------------- | --------------------------------------------- |
| `plane-db`    | RDS / Aurora PostgreSQL           | `DATABASE_URL`, `PGHOST`, `POSTGRES_*`        |
| `plane-redis` | ElastiCache (Valkey/Redis)        | `REDIS_URL`, `REDIS_HOST`, `REDIS_PORT`       |
| `plane-mq`    | Amazon MQ (RabbitMQ)              | `AMQP_URL`, `RABBITMQ_*`                      |
| `plane-minio` | S3 on a FIPS endpoint, or similar | `AWS_S3_ENDPOINT_URL`, `AWS_*`, `USE_MINIO=0` |

Then set the corresponding `*_REPLICAS` to `0`, or remove those services, so the bundled ones do
not start.

**TLS termination.** The bundled proxy (Caddy) is built against a FIPS-validated module, but for an
accredited topology the recommended pattern is to terminate TLS at a validated endpoint in front of
the deployment - such as a FIPS-enabled load balancer - and have the proxy serve HTTP internally.

**FIPS validation applies to the cryptographic modules, not to Plane as a product.** FIPS 140-3
certificates are held by the module vendors (Red Hat and the Go project). This deployment ensures
Plane's cryptography _uses_ those validated modules on a compliant host; it does not make Plane
itself a FIPS-certified product.
