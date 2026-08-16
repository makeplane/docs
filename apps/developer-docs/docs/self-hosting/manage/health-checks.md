---
title: Health checks
description: Liveness, readiness, and health endpoints for self-hosted Plane services, and how to wire them into uptime monitors, load balancers, and Kubernetes or Docker Compose probes.
keywords: plane health check, liveness probe, readiness probe, self-hosting monitoring, kubernetes probe, docker compose healthcheck, uptime monitor, /api/ready, /api/live, /api/health
---

# Health checks <Badge type="info" text="Commercial Edition" />

Self-hosted Plane services expose HTTP health endpoints so you can wire up uptime monitoring, load-balancer health checks, and container or orchestrator probes. This page documents every endpoint that ships with Plane, exactly what each one checks, and how to consume them from Kubernetes, Docker Compose, and external monitors.

::: info Edition availability
The dedicated liveness, readiness, and detailed health probes documented here — `/api/live/`, `/api/ready/`, `/api/health/`, and the per-service endpoints — ship with **Commercial Edition** (Pro, Business, and Enterprise) deployments. **Community Edition** exposes only the basic root health check at `/` that returns `{ "status": "OK" }` (see [A note on the root endpoint](#a-note-on-the-root-endpoint)).
:::

## Liveness vs. readiness vs. health

Plane follows the standard three-tier probe model. Knowing which one to point a given tool at matters:

- **Liveness** — "is the process up?" A liveness probe answers a single question: is the service running and able to respond to HTTP at all. It performs no dependency checks. If a liveness probe fails, your orchestrator should **restart** the container. Liveness endpoints in Plane never return a failure body — if the process is alive, you get `200`; if it isn't, the request simply fails to connect.
- **Readiness** — "should this instance receive traffic right now?" A readiness probe verifies that the service's critical dependencies (database, cache, Redis) are reachable. If a readiness probe fails, your orchestrator or load balancer should **stop routing traffic** to that instance until it recovers — but it should not restart it, since the process itself is fine. Readiness endpoints return `200` when ready and `503` when a dependency is unavailable.
- **Health / detailed** — "what is the current state of this instance?" A detailed health endpoint returns the same up/down signal as readiness but with structured diagnostic detail (timestamps, uptime, per-dependency connection status). Use this for dashboards and debugging rather than as the gate for an orchestrator.

::: tip Why the distinction matters for self-hosting
If you point a liveness probe at an endpoint that checks the database, a transient database blip will cause your orchestrator to **kill and restart healthy pods**, turning a small dependency hiccup into a restart storm. Always point liveness at the liveness endpoint and readiness at the readiness endpoint.
:::

## Primary API probes

The Plane Django API is the main REST API and web application server. Its probes are the ones most operators need, and they are reachable externally through the reverse proxy under `/api/`. All three are unauthenticated `GET` requests, and all Django routes use a **trailing slash**.

| Endpoint       | Type              | Checks                                | Healthy | Unhealthy          |
| -------------- | ----------------- | ------------------------------------- | ------- | ------------------ |
| `/api/live/`   | Liveness          | Process running                       | `200`   | (connection fails) |
| `/api/ready/`  | Readiness         | Database + cache connectivity         | `200`   | `503`              |
| `/api/health/` | Health (detailed) | Database + cache connectivity, uptime | `200`   | `503`              |

### `/api/live/`

Returns `200` as long as the process can serve HTTP. No dependency checks are performed.

```bash
curl -i https://your-plane-domain.com/api/live/
```

```json
{ "alive": true }
```

### `/api/ready/`

Returns `200` when the database and cache are both reachable, and `503` if either is down. The failure response includes a sanitized `reason` field.

```bash
curl -i https://your-plane-domain.com/api/ready/
```

Healthy (`200`):

```json
{ "ready": true }
```

Not ready (`503`):

```json
{ "ready": false, "reason": "<sanitized reason string>" }
```

The database check runs a `SELECT 1` query; the cache check sets and verifies a probe key. Failure reasons are **sanitized** in the response (the full exception is logged server-side only) so probes do not leak internal details.

### `/api/health/`

Returns a detailed status payload. Use this for dashboards and diagnostics. It performs the same database and cache checks as readiness, but reports each dependency individually along with a timestamp and uptime.

```bash
curl -i https://your-plane-domain.com/api/health/
```

Healthy (`200`):

```json
{
  "status": "ok",
  "timestamp": 1717346400000,
  "uptime": 12345,
  "database": { "connected": true },
  "cache": { "connected": true }
}
```

Degraded (`503`):

```json
{
  "status": "degraded",
  "timestamp": 1717346400000,
  "uptime": 12345,
  "database": { "connected": false },
  "cache": { "connected": false }
}
```

::: info 5-second result caching
The `/api/ready/` and `/api/health/` endpoints cache their dependency-check results for **5 seconds per process** (`_RESULT_TTL_SECONDS=5`). This caps real database and cache hits at one per worker process per 5-second window, even under a flood of probe requests, so aggressive monitoring will not thrash your database or cache. The same 5-second per-worker caching applies to the Plane AI (pi) readiness check.
:::

### A note on the root endpoint

The Django API also serves a minimal health indicator at the root path:

| Endpoint      | Type             | Healthy body                    |
| ------------- | ---------------- | ------------------------------- |
| `/`           | Health (minimal) | `{ "status": "OK" }`            |
| `/robots.txt` | Other            | `User-agent: *` / `Disallow: /` |

The root `/` and `/robots.txt` endpoints are mounted at the Django root level, while the detailed probes (`/api/live/`, `/api/ready/`, `/api/health/`) are mounted under `/api/`. This minimal root check is the only health endpoint present in **Community Edition** — the `/api/*` probes and the per-service endpoints below are Commercial Edition only.

::: warning Root path routing through the proxy
In the reverse proxy (Caddyfile), `/` is a catch-all that routes to the web frontend (`web:3000`), not to the Django API. A request to `/` through the proxy will hit the frontend rather than the API's root health indicator. **Use the `/api/` probes for monitoring** — they route to the API service explicitly. See [Reverse proxy](/self-hosting/govern/reverse-proxy) for routing details.
:::

## All services and probe endpoints

The table below lists every health-related endpoint across all Plane services. The **External path** column shows how the endpoint is reached through the reverse proxy; endpoints marked **internal only** are not exposed through the proxy and must not be made publicly reachable.

| Service       | Type               | External path             | Internal route       | Checks                        | Success              | Reachable               |
| ------------- | ------------------ | ------------------------- | -------------------- | ----------------------------- | -------------------- | ----------------------- |
| API (Django)  | Liveness           | `/api/live/`              | `/api/live/`         | process running               | `200`                | External                |
| API (Django)  | Readiness          | `/api/ready/`             | `/api/ready/`        | database, cache               | `200` (`503` fail)   | External                |
| API (Django)  | Health             | `/api/health/`            | `/api/health/`       | database, cache, uptime       | `200` (`503` fail)   | External                |
| API (Django)  | Health (min)       | `/`                       | `/`                  | none                          | `200`                | Via proxy hits frontend |
| Plane AI (pi) | Liveness           | `/pi/live/`               | `/live/`             | process running               | `200`                | External                |
| Plane AI (pi) | Readiness          | `/pi/ready/`              | `/ready/`            | database                      | `200` (`503` fail)   | External                |
| Plane AI (pi) | Health             | `/pi/health/`             | `/health/`           | database, uptime              | `200` (`503` fail)   | External                |
| Plane AI (pi) | Other (deprecated) | `/pi/api/v1/health/`      | `/api/v1/health/`    | none                          | `200`                | External                |
| Plane AI (pi) | Other (deprecated) | `/pi/api/v2/health/`      | `/api/v2/health/`    | none                          | `200`                | External                |
| live          | Health             | `/live/health/`           | `/health/`           | process running, server agent | `200`                | External                |
| live          | Other (metrics)    | `/live/health/memory`     | `/health/memory`     | memory, agent metrics         | `200` (`401` no key) | External (secret-key)   |
| silo          | Liveness           | `/silo/health/`           | `/health/`           | process running               | `201` (`500` fail)   | External                |
| silo          | Other              | `/silo/health/check-hmac` | `/health/check-hmac` | API connectivity              | `201` (`500` fail)   | External                |
| silo          | Readiness          | `/silo/health/check-db`   | `/health/check-db`   | database                      | `200` (`500` fail)   | External                |
| flux          | Health             | internal only             | `/health`            | redis, process running        | `200` (`503` fail)   | Internal                |
| flux          | Readiness          | internal only             | `/ready`             | redis                         | `200` (`503` fail)   | Internal                |
| flux          | Liveness           | internal only             | `/live`              | process running               | `200`                | Internal                |
| node-runner   | Health             | internal only             | `/health`            | process running               | `200`                | Internal                |
| monitor       | (prober)           | internal only             | —                    | watches other services        | —                    | Internal                |

::: warning Internal-only endpoints
The **flux**, **node-runner**, and **monitor** services are not exposed through the reverse proxy. Their endpoints are reachable only on the internal Docker/Kubernetes network. Do not expose them publicly. The `live` memory-metrics endpoint (`/live/health/memory`) is reachable through the proxy but is secret-key protected — keep it that way.
:::

## Per-service details

### live (real-time collaboration)

The `live` service is the real-time collaboration server for document editing (WebSocket via Hocuspocus), running on internal port `3000` and exposed under the `/live` proxy prefix.

**Public health endpoint** — unauthenticated, suitable for probes:

```bash
curl -i https://your-plane-domain.com/live/health/
```

```json
{ "status": "OK", "timestamp": "2026-06-02T00:00:00.000Z", "version": "1.0.0" }
```

This endpoint always returns `200` when the process is up; it has no failure state. Point readiness/liveness probes here.

**Memory metrics endpoint** — for internal monitoring only, protected by a secret key:

```bash
curl -i \
  -H "live-server-secret-key: $LIVE_SERVER_SECRET_KEY" \
  https://your-plane-domain.com/live/health/memory
```

```json
{
  "status": "ok",
  "timestamp": "2026-06-02T00:00:00.000Z",
  "memory": {
    "heapUsed": "120MB",
    "heapTotal": "256MB",
    "heapPercent": "47%",
    "rss": "300MB",
    "external": "5MB",
    "arrayBuffers": "2MB"
  },
  "serverAgent": { "connections": 42, "recentActivity": [] },
  "hocuspocus": {},
  "uptime": "3600s"
}
```

The `live-server-secret-key` header is checked against the `LIVE_SERVER_SECRET_KEY` environment variable; a missing or invalid key returns `401 Unauthorized`. Memory values are human-readable strings (e.g. `"120MB"`), `serverAgent.recentActivity` is truncated to the last 10 connections, and `uptime` is a string in seconds.

::: info Status-string inconsistency
The `/live/health/` endpoint returns `"status": "OK"` (uppercase) while `/live/health/memory` returns `"status": "ok"` (lowercase). If you parse these programmatically, account for the case difference.
:::

### silo (integrations engine)

The `silo` service is the integrations engine (ETL, OAuth, webhooks, and sync for GitHub, Jira, Linear, Asana, Slack, etc.). It runs on internal port `3000` and is exposed under the `/silo` proxy prefix. The base path is configurable via the `SILO_BASE_PATH` environment variable (default `/silo`).

```bash
# Liveness — process running
curl -i https://your-plane-domain.com/silo/health/

# API connectivity check (despite the name, this validates API connectivity, not HMAC)
curl -i https://your-plane-domain.com/silo/health/check-hmac

# Readiness — database (SELECT 1)
curl -i https://your-plane-domain.com/silo/health/check-db
```

Success bodies:

```json
{ "message": "Welcome to Silo health check" }
```

```json
{ "message": "Welcome to Silo API health check" }
```

```json
{ "message": "Silo DB is up and running" }
```

A database failure on `check-db` returns `500`:

```json
{ "status": 500, "message": "Internal Server Error", "errors": { "message": "Database is not running" } }
```

::: warning Non-standard status codes
Silo's status codes are inconsistent with the other services. `/silo/health/` and `/silo/health/check-hmac` return **`201`** on success (not `200`), while `/silo/health/check-db` returns `200`. All three return `500` on failure. If you configure an external monitor that expects `2xx`, this works; if you expect exactly `200`, treat `201` as healthy. The `check-hmac` name is historical — it actually validates API connectivity to the Plane API, not HMAC.
:::

### Plane AI (pi)

The Plane AI service (`pi`) is a FastAPI service for AI features (chat, embeddings, transcription, LLM proxy). It runs on internal port `8000` and is exposed under the `/pi` proxy prefix. Health routes are mounted at the app root; the prefix is controlled by `PI_BASE_PATH` (default empty), and the proxy adds the `/pi` prefix without stripping it.

```bash
# Liveness — process running
curl -i https://your-plane-domain.com/pi/live/

# Readiness — database connectivity
curl -i https://your-plane-domain.com/pi/ready/

# Health (detailed) — database connectivity + uptime
curl -i https://your-plane-domain.com/pi/health/
```

Liveness (`200`):

```json
{ "alive": true }
```

Readiness — healthy (`200`) / not ready (`503`):

```json
{ "ready": true }
```

```json
{ "ready": false, "reason": "database unavailable" }
```

Health — healthy (`200`) / degraded (`503`):

```json
{
  "status": "ok",
  "timestamp": 1717346400000,
  "uptime": 12345,
  "database": { "connected": true }
}
```

```json
{
  "status": "degraded",
  "timestamp": 1717346400000,
  "uptime": 12345,
  "database": { "connected": false }
}
```

The database readiness check caches results for **5 seconds per worker** to avoid connection-pool exhaustion under probe floods.

::: info Deprecated pi endpoints
`/pi/api/v1/health/` and `/pi/api/v2/health/` are **deprecated** in favor of the root-level probes above. They return a legacy payload `{ "status": "alive" }` and emit deprecation headers (per RFC 8594). Use `/pi/live/`, `/pi/ready/`, and `/pi/health/` instead.
:::

### flux (real-time event server)

The `flux` service is a WebSocket server for real-time collaborative events, backed by Redis. It runs internally (default port `3004`, configurable via `PORT`) and is **internal-only** — it is not exposed through the reverse proxy. Its routes sit under the base path set by `FLUX_BASE_PATH` (default `/flux`), so they are reachable as `/flux/health`, `/flux/ready`, and `/flux/live` on the internal network:

```bash
# From within the internal network / cluster (paths are relative to FLUX_BASE_PATH)
curl -i http://flux:3004/flux/live      # liveness — process running
curl -i http://flux:3004/flux/ready     # readiness — Redis connectivity
curl -i http://flux:3004/flux/health    # health (detailed) — Redis + connection counts
```

Liveness (`200`):

```json
{ "alive": true }
```

Readiness — healthy (`200`) / not ready (`503`):

```json
{ "ready": true }
```

```json
{ "ready": false, "reason": "Redis not connected" }
```

Health — healthy (`200`) / degraded (`503`):

```json
{
  "status": "ok",
  "timestamp": 1717346400000,
  "uptime": 12345,
  "connections": { "total": 5, "channels": 10 },
  "redis": { "connected": true }
}
```

```json
{
  "status": "degraded",
  "timestamp": 1717346400000,
  "uptime": 12345,
  "connections": { "total": 5, "channels": 10 },
  "redis": { "connected": false }
}
```

Liveness always returns `200`; readiness and health both gate on Redis connectivity. Note the degraded status string is `"degraded"`, not `"unhealthy"`.

### node-runner (automation execution)

The `node-runner` service executes automation scripts (build, validate, sandboxed execution). It runs on internal port `3000` and is **internal-only** — not reachable through the reverse proxy.

Its own health endpoint is reachable only on the internal network:

```bash
curl -i http://node-runner:3000/health
```

```json
{ "status": "ok" }
```

Runner health is also surfaced through the Django API at `/api/workspaces/{slug}/runnerctl/health/` (a `GET` that requires session authentication and workspace-admin permission). That endpoint checks the node-runner service and returns `{ "is_available": <boolean> }` with status `200`. Use the Django-exposed endpoint if you need to observe runner health without internal network access.

### monitor (internal prober)

The `monitor` service is a Go-based **prober** — it is not a service you probe. It runs internally on port `8080` (not exposed through the reverse proxy) and **does not expose any liveness/readiness/health endpoint of its own**. Instead, it periodically checks the other Plane services and reports their status.

What it does:

- **Health-check cron job** (default every 5 minutes, configurable via `--health-check-interval`): runs HTTP or TCP probes against the services you define via `SERVICE_*` environment variables. HTTP probes (`HTTP_TEST_METHOD`) issue `GET` requests and treat `200`–`399` as healthy; TCP probes (`TCP_TEST_METHOD`) attempt a raw connection. Each service is probed with `maxRetries=5`, `confirmTries=3`, a 5s timeout, and a 2s retry interval. Results are posted to the monitoring API at `HOST/api/service-status/`.
- **Flag/license resync cron job** (default every 300 minutes, configurable via `--resync-flags-interval`): refreshes feature flags and licenses from the monitoring server.

Services are declared as environment variables in the form `SERVICE_<METHOD>_<NAME>=hostname:port/path`. Examples:

```bash
SERVICE_HTTP_WEB=web:3000
SERVICE_HTTP_API=api:8000
SERVICE_HTTP_LIVE=live:3000/live/health
SERVICE_HTTP_PROXY=proxy:80
SERVICE_HTTP_MINIO=plane-minio:9090
SERVICE_TCP_REDIS=plane-redis:6379
SERVICE_TCP_POSTGRES=plane-db:5432
```

For an unreachable service, monitor posts status code `500`; for a non-`2xx`/`3xx` HTTP response, it posts the actual status code.

## Using these in your infrastructure

### Kubernetes liveness and readiness probes

Point `livenessProbe` at the liveness endpoint and `readinessProbe` at the readiness endpoint. The following mirrors the probe configuration Plane's own Helm charts use for the API service:

```yaml
# api deployment
livenessProbe:
  httpGet:
    path: /api/live/
    port: 8000
  initialDelaySeconds: 30
  periodSeconds: 30
  timeoutSeconds: 5
  failureThreshold: 3
readinessProbe:
  httpGet:
    path: /api/ready/
    port: 8000
  initialDelaySeconds: 10
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 3
```

The Plane AI (`pi-api`) service uses the same pattern against its own paths:

```yaml
# pi-api deployment
livenessProbe:
  httpGet:
    path: /pi/live/ # or {PI_BASE_PATH}/live/
    port: 8000
  initialDelaySeconds: 30
  periodSeconds: 30
  timeoutSeconds: 5
  failureThreshold: 3
readinessProbe:
  httpGet:
    path: /pi/ready/ # or {PI_BASE_PATH}/ready/
    port: 8000
  initialDelaySeconds: 10
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 3
```

The `live` and `silo` services use a readiness-only probe (no liveness) against their `/health` path, with a lenient `failureThreshold` to allow for slow startups:

```yaml
# live deployment (silo is identical against {SILO_BASE_PATH}/health)
readinessProbe:
  httpGet:
    path: /live/health # {LIVE_BASE_PATH}/health
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 10
  timeoutSeconds: 1
  failureThreshold: 30
  successThreshold: 1
```

::: info Timing implications
With `initialDelaySeconds: 30` plus the start period, the API and pi-api pods take roughly 90 seconds before they are considered ready — this is intentional, giving migrations and warm-up time to complete. The `live`/`silo` readiness probe with `failureThreshold: 30` at a 10s period tolerates up to ~305 seconds of startup before marking the pod unhealthy.
:::

### Docker Compose healthcheck

Plane's Compose deployments probe the API by calling its readiness endpoint from inside the container with Python (no extra tooling needed):

```yaml
# api service
healthcheck:
  test:
    [
      "CMD",
      "python",
      "-c",
      "import urllib.request; urllib.request.urlopen('http://localhost:8000/api/ready/', timeout=5)",
    ]
  interval: 30s
  timeout: 10s
  retries: 5
  start_period: 60s
```

The `pi-api` service follows the same approach, honoring its configurable base path:

```yaml
# pi-api service
healthcheck:
  test:
    [
      "CMD",
      "python",
      "-c",
      'import os,urllib.request; urllib.request.urlopen(f"http://localhost:8000{os.environ.get(''PI_BASE_PATH'','''')}/ready/", timeout=5)',
    ]
  interval: 30s
  timeout: 10s
  retries: 5
  start_period: 60s
```

Stateful dependencies are probed with their native CLIs rather than HTTP:

```yaml
# plane-db (PostgreSQL)
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
  interval: 10s
  timeout: 5s
  retries: 5
  start_period: 10s

# plane-mq (RabbitMQ)
healthcheck:
  test: ["CMD", "rabbitmq-diagnostics", "-q", "ping"]
  interval: 10s
  timeout: 10s
  retries: 5
```

Other services then declare `depends_on` with `condition: service_healthy` so they start only after their dependencies are healthy.

### External uptime monitors and load balancers

For an external uptime monitor (UptimeRobot, Better Stack, Pingdom, etc.) or a load balancer health check, target the reverse-proxy URL of the **readiness** endpoint over HTTPS:

```bash
# Load balancer / uptime monitor target
GET https://your-plane-domain.com/api/ready/
# Healthy: HTTP 200    Unhealthy: HTTP 503
```

Guidelines:

- Use **`/api/ready/`** as the load-balancer health check so traffic is only routed to instances whose database and cache are reachable. Treat `200` as healthy and `503` as unhealthy.
- Use **`/api/health/`** for richer dashboards where you want to display per-dependency status, timestamps, and uptime.
- All API probes are **unauthenticated**, so no credentials are needed. The 5-second per-worker result cache means a frequent polling interval (e.g. every 15–30 seconds) will not stress your database or cache.
- Mind the **trailing slash** — Django routes require it (`/api/ready/`, not `/api/ready`).
- Do not point external monitors at internal-only services (`flux`, `node-runner`, `monitor`); they are not reachable through the proxy by design.

## Troubleshooting

- **`503` from `/api/ready/` or `/api/health/`** — the database or cache is unreachable. Check that PostgreSQL and Redis/Valkey are running and reachable from the API container. The `reason` field on `/api/ready/` and the per-dependency `connected` flags on `/api/health/` tell you which dependency failed. Remember the full exception is logged server-side (the probe response is sanitized), so check the API logs for details.
- **`503` from `/pi/ready/`** — the Plane AI service cannot reach its database (`"reason": "database unavailable"`). Verify database connectivity from the `pi` container.
- **`503` from flux `/ready` or `/health` (`"status": "degraded"`)** — Redis is not connected (`"reason": "Redis not connected"`). Check Redis availability on the internal network.
- **`401` from `/live/health/memory`** — the `live-server-secret-key` header is missing or does not match `LIVE_SERVER_SECRET_KEY`. Confirm the env var is set and the header value matches.
- **`500` from `/silo/health/check-db`** — Silo cannot reach its database (`"message": "Database is not running"`). Note that silo's other health endpoints return `201` on success, not `200`.
- **A pod restart loop in Kubernetes** — confirm the `livenessProbe` points at a _liveness_ path (`/api/live/`, `/pi/live/`), not a readiness or health path. A liveness probe that checks the database will restart healthy pods during a transient dependency outage.
- **Probes failing right after deploy** — the API and pi-api need ~90 seconds before they report ready (30s initial delay plus start period). Make sure your probe `initialDelaySeconds` and `start_period` allow for startup and migrations before marking the service down.
