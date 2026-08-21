---
title: Configure OpenTelemetry
description: Export traces, metrics, and logs from a self-hosted Plane instance to any OpenTelemetry-compatible backend using the plane-enterprise Helm chart.
keywords: plane opentelemetry, otel, observability, distributed tracing, otlp, traces, metrics, plane kubernetes observability, self-hosting
---

# Configure OpenTelemetry <Badge type="info" text="Commercial Edition" />

Plane ships with built-in [OpenTelemetry](https://opentelemetry.io/) (OTel) instrumentation across its backend services. When enabled, Plane exports traces, metrics, and logs over OTLP to any OpenTelemetry-compatible backend you run — an OpenTelemetry Collector, Grafana Tempo, Datadog, Honeycomb, and others.

OpenTelemetry support is off by default and is fully opt-in. When disabled, no OTel configuration is rendered and your deployment is unchanged.

::: info
This guide covers Kubernetes deployments using the `plane-enterprise` Helm chart version **3.3.0 or later**. Plane does **not** deploy a collector for you — you bring your own OTLP endpoint.
:::

## How it works

When you enable OpenTelemetry, the Helm chart:

1. Renders a ConfigMap (`<release>-otel-vars`) with the standard `OTEL_*` environment variables built from your Helm values.
2. Renders a Secret (`<release>-otel-secrets`) holding `OTEL_EXPORTER_OTLP_HEADERS` if you configure authentication headers, or references a secret you manage yourself.
3. Injects both into Plane's backend workloads, along with a per-service `OTEL_SERVICE_NAME`, so each service reports under its own name.

The following services are instrumented:

| Service                                                                                                                                          | Signals exported                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| `api`, `external-api`, `worker`, `worker-importers`, `beat-worker`, `automation-consumer`, `agent-consumer`, `webhook-consumer`, `outbox-poller` | Traces and metrics over OTLP; JSON logs on stdout are enriched with trace and span IDs |
| `live`, `live-exporter`, `silo`                                                                                                                  | Traces, logs, and metrics over OTLP                                                    |
| `space` (server-side rendering)                                                                                                                  | Logs and request spans over OTLP/HTTP                                                  |
| `pi-api`, `pi-worker`, `pi-beat` (Plane AI)                                                                                                      | Logs over OTLP/HTTP                                                                    |
| `web`, `admin`, `space` (browser)                                                                                                                | Optional browser traces and logs — see [Browser tracing](#browser-tracing)             |

The Python API instruments Django, Celery, PostgreSQL, Redis, and outgoing HTTP calls; trace context propagates from incoming HTTP requests through Celery tasks. The Node services (`live`, `silo`) use auto-instrumentation for HTTP, Express, PostgreSQL, Redis, and AMQP, and bridge their application logs into the OTLP logs pipeline with trace correlation.

## Prerequisites

- The `plane-enterprise` Helm chart version 3.3.0 or later. See the [Kubernetes installation guide](/self-hosting/methods/kubernetes) to install or upgrade.
- An OTLP endpoint reachable from the pods in your cluster — typically an [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) running in the same cluster.

::: tip Choosing the protocol
The Django and Node services support both OTLP/gRPC (usually port `4317`) and OTLP/HTTP (usually port `4318`). The Plane AI (`pi-*`) services and `space` server-side rendering export over OTLP/HTTP only. If you run Plane AI, expose your collector's HTTP receiver and use `protocol: http/protobuf` with the HTTP port so every service can export to the same endpoint.
:::

## Enable OpenTelemetry

Enable it with two values — the toggle and the endpoint:

```bash
helm upgrade plane-app plane/plane-enterprise \
  --namespace plane \
  --reuse-values \
  --set observability.otel.enabled=true \
  --set observability.otel.endpoint=http://otel-collector.observability.svc.cluster.local:4317
```

Or in your values file:

```yaml
observability:
  otel:
    enabled: true
    endpoint: http://otel-collector.observability.svc.cluster.local:4317
```

If `endpoint` is left empty, the services skip OTel setup even when `enabled` is `true`, so nothing is exported.

## Configuration reference

All settings live under `observability.otel` in the chart values:

| Value                | Default            | Maps to                       | Description                                                                                                   |
| -------------------- | ------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `enabled`            | `false`            | `OTEL_ENABLED`                | Master switch. When `false`, no OTel resources or environment variables are created.                          |
| `endpoint`           | `""`               | `OTEL_EXPORTER_OTLP_ENDPOINT` | OTLP receiver URL. An `https://` endpoint uses a secure connection.                                           |
| `protocol`           | `grpc`             | `OTEL_EXPORTER_OTLP_PROTOCOL` | `grpc` or `http/protobuf`.                                                                                    |
| `headers`            | `""`               | `OTEL_EXPORTER_OTLP_HEADERS`  | Exporter headers such as ingestion credentials, in `key=value,key=value` form. Stored in a Kubernetes Secret. |
| `environment`        | `""`               | `OTEL_ENVIRONMENT`            | Sets the `deployment.environment.name` resource attribute (for example, `production`).                        |
| `resourceAttributes` | `""`               | `OTEL_RESOURCE_ATTRIBUTES`    | Additional resource attributes, in `key=value,key=value` form.                                                |
| `sampler`            | `always_on`        | `OTEL_TRACES_SAMPLER`         | Trace sampler: `always_on`, `parentbased_traceidratio`, `traceidratio`, or `always_off`.                      |
| `samplerArg`         | `"1.0"`            | `OTEL_TRACES_SAMPLER_ARG`     | Sampling ratio for the ratio-based samplers. Ignored by `always_on`.                                          |
| `debugConsole`       | `false`            | `OTEL_DEBUG_CONSOLE`          | Also prints spans to stdout. For debugging only.                                                              |
| `frontend.enabled`   | `false`            | `FRONTEND_OTEL_ENABLED`       | Enables browser tracing for the web, admin, and space apps. Requires `frontend.endpoint`.                     |
| `frontend.endpoint`  | `""`               | `FRONTEND_OTLP_ENDPOINT`      | Browser-reachable OTLP/HTTP endpoint. This value is public — see [Browser tracing](#browser-tracing).         |
| `frontend.headers`   | `x-otlp-browser=1` | `FRONTEND_OTLP_HEADERS`       | Headers sent by the browser exporter. These are visible to anyone using the app, so never put secrets here.   |

A production-style example:

```yaml
observability:
  otel:
    enabled: true
    endpoint: https://otlp.vendor.example.com:4317
    protocol: grpc
    environment: production
    resourceAttributes: "cluster=eu-1"
    sampler: parentbased_traceidratio
    samplerArg: "0.25"
```

## Authentication headers

If your backend requires an ingestion key, you have two options.

**Let the chart manage the secret.** Set `observability.otel.headers` and the chart creates the `<release>-otel-secrets` Secret for you:

```bash
--set observability.otel.headers='x-api-key=your_ingestion_key'
```

**Bring your own secret.** If you manage secrets externally (for example, with the [External Secrets Operator](/self-hosting/govern/external-secrets)), point the chart at a Secret you own. The chart then skips creating its own Secret and references yours instead:

```yaml
external_secrets:
  otel_env_existingSecret: my-otel-headers
```

The Secret is injected into the pods with `envFrom`, so the data key must be named exactly like the environment variable it supplies:

| Key                          | Required | Value                                                                                      |
| ---------------------------- | -------- | ------------------------------------------------------------------------------------------ |
| `OTEL_EXPORTER_OTLP_HEADERS` | Yes      | Exporter headers in `key=value,key=value` form, for example `x-api-key=your_ingestion_key` |

Created manually, it looks like this:

```bash
kubectl create secret generic my-otel-headers \
  --namespace plane \
  --from-literal=OTEL_EXPORTER_OTLP_HEADERS='x-api-key=your_ingestion_key'
```

Or as an `ExternalSecret` target synced by the External Secrets Operator:

```yaml
apiVersion: external-secrets.io/v1
kind: ExternalSecret
metadata:
  name: otel-external-secret
  namespace: plane
spec:
  refreshInterval: 1m
  secretStoreRef:
    name: cluster-aws-secretsmanager
    kind: ClusterSecretStore
  target:
    name: my-otel-headers # referenced by external_secrets.otel_env_existingSecret
    creationPolicy: Owner
  data:
    - secretKey: OTEL_EXPORTER_OTLP_HEADERS
      remoteRef:
        key: prod/secrets/otel
        property: OTEL_EXPORTER_OTLP_HEADERS
```

Keep the following in mind:

- The Secret must live in the same namespace as the Plane release and is referenced as non-optional — if it doesn't exist yet (for example, ESO hasn't synced it), the instrumented pods won't start until it appears.
- Because the Secret is applied with `envFrom`, any other keys in it also become environment variables on every instrumented pod. Keep it limited to the `OTEL_*` values you intend to set.

## Sampling

The chart defaults to `always_on`, which exports every trace. That's the right starting point for evaluating the integration, but on a busy instance you'll likely want head sampling to control volume and cost:

```yaml
observability:
  otel:
    sampler: parentbased_traceidratio
    samplerArg: "0.1" # keep 10% of traces
```

`parentbased_traceidratio` respects the sampling decision of an incoming trace context, so distributed traces stay complete.

## Browser tracing

Backend telemetry stays inside your cluster, but you can optionally have the `web`, `admin`, and `space` apps report traces and logs from users' browsers:

```yaml
observability:
  otel:
    enabled: true
    endpoint: http://otel-collector.observability.svc.cluster.local:4317
    frontend:
      enabled: true
      endpoint: https://otlp-browser.example.com
```

Keep the following in mind:

- The endpoint must be reachable from your users' browsers and must be an OTLP/**HTTP** receiver — browsers can't speak gRPC. The apps append `/v1/traces` and `/v1/logs` to the endpoint you configure.
- The receiver must allow cross-origin requests (CORS) from your Plane domain.
- `frontend.endpoint` and `frontend.headers` are served to every visitor through Plane's public instance configuration. Treat them as public values and use a dedicated, rate-limited receiver rather than credentials you care about.
- Keep `frontend.headers` non-empty. A custom header forces the browser exporter to send over XHR instead of `navigator.sendBeacon` — beacon requests include credentials, which fail CORS against a wildcard `Access-Control-Allow-Origin` and silently break browser export. The default `x-otlp-browser=1` exists for exactly this reason.

Browser tracing is read by the Plane API and delivered to the apps at runtime — you don't need to rebuild any images to turn it on or off.

## Verify the setup

1. Confirm the ConfigMap rendered with your values:

   ```bash
   kubectl get configmap <release>-otel-vars -n plane -o yaml
   ```

2. Check the API pod's startup logs for the confirmation line:

   ```bash
   kubectl logs deploy/<release>-api -n plane | grep "OpenTelemetry configured"
   ```

   You should see something like `OpenTelemetry configured: service=api, endpoint=..., protocol=grpc, sampler=always_on(1.0)`.

3. Generate some traffic in Plane and look for spans from `api` in your backend. Traces from a single request should span the API, Celery workers, and database calls.

If nothing arrives, check that the endpoint is reachable from a pod in the Plane namespace, and that the protocol matches the receiver port — gRPC receivers usually listen on `4317` and HTTP receivers on `4318`.
