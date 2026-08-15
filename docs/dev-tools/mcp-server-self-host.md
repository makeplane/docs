---
title: Self-host the MCP server
description: Deploy the Plane MCP server with Docker Compose or Helm, register OAuth callbacks, configure storage and security, and connect AI clients.
keywords: plane mcp server, self-hosted mcp, plane mcp deployment, docker compose mcp, helm mcp, plane oauth mcp, mcp server setup
---

# Self-host the MCP server

This guide is for teams that want to run their own instance of the Plane MCP server — either because they use a
self-hosted Plane installation that needs OAuth against their own domain, or because they want full control over the
MCP infrastructure.

If you're a Plane Cloud user connecting to `mcp.plane.so`, you don't need this. Use the
[MCP server setup guide](/dev-tools/mcp-server) instead.

## Prerequisites

- A running **Plane instance** (self-hosted or Cloud) with workspace admin access. OAuth application registration is
  available on Plane Cloud and Plane Commercial Edition; Plane Community Edition does not include it, so the OAuth
  transport cannot be used against a Community Edition instance. Community Edition users should run the server in
  [local (stdio) mode](/dev-tools/mcp-server#local-stdio) with a personal access token instead.
- **Docker** and Docker Compose v2+, _or_ **Kubernetes** v1.21+ with Helm v3+
- A **public URL** for the MCP server (e.g. `https://mcp.yourdomain.com`) — OAuth callbacks must reach it over HTTPS

---

## Register an OAuth app in Plane

The MCP server authenticates users through Plane's OAuth 2.0 system. You need to register an app to get a Client ID and Client Secret.

1. Go to **Workspace settings → Integrations**:

   ```text
   https://<your-plane-domain>/<workspace>/settings/integrations/
   ```

2. Click **Build your own**.

3. Fill in the application details:

   | Field            | Value                                                            |
   | ---------------- | ---------------------------------------------------------------- |
   | **App Name**     | Anything descriptive (e.g. `Plane MCP Server`)                   |
   | **Setup URL**    | Your MCP server's public URL (e.g. `https://mcp.yourdomain.com`) |
   | **Redirect URI** | Both URIs listed below, space-separated                          |
   | **Webhook URL**  | Leave empty unless you need webhook events                       |

   ::: tip Add both redirect URIs
   FastMCP exposes one callback under the HTTP mount and one under the SSE mount:

   | Transport        | Redirect URI                          |
   | ---------------- | ------------------------------------- |
   | Streamable HTTP  | `<MCP_SERVER_URL>/http/auth/callback` |
   | SSE (deprecated) | `<MCP_SERVER_URL>/auth/callback`      |

   For `https://mcp.yourdomain.com`, paste this into the Redirect URI field:

   ```text
   https://mcp.yourdomain.com/http/auth/callback https://mcp.yourdomain.com/auth/callback
   ```

   A previously registered `https://mcp.yourdomain.com/callback` URI is harmless but unnecessary.

   :::

4. Under **Scopes & permissions**, select both **read** and **write** scopes.

5. Save. Copy the generated **Client ID** and **Client Secret** - you'll need them in the next step.

::: warning
Never expose the Client Secret in client-side code or commit it to version control.
:::

For more detail on OAuth app creation, see [Create an OAuth Application](/dev-tools/build-plane-app/create-oauth-application).

---

## Deploy

### Option A: Docker Compose

**1. Create a `docker-compose.yaml`:**

```yaml
name: plane-mcp

services:
  mcp:
    image: makeplane/plane-mcp-server:${APP_RELEASE_VERSION:-latest}
    restart: always
    ports:
      - "8211:8211"
    env_file:
      - variables.env
    environment:
      REDIS_HOST: valkey
      REDIS_PORT: "6379"
    depends_on:
      valkey:
        condition: service_healthy

  valkey:
    image: valkey/valkey:8-alpine
    restart: always
    volumes:
      - valkey-data:/data
    healthcheck:
      test: ["CMD", "valkey-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  valkey-data:
```

**2. Create a `variables.env` with your OAuth credentials from Step 1:**

```env
# Image tag - pin to a specific version in production
APP_RELEASE_VERSION=latest

# Plane API URL - use your self-hosted instance URL or https://api.plane.so for Cloud
PLANE_BASE_URL=https://api.plane.so

# Optional: internal URL for server-to-server calls (same-network setups)
# PLANE_INTERNAL_BASE_URL=

# OAuth credentials from Step 1
PLANE_OAUTH_PROVIDER_CLIENT_ID=your-client-id
PLANE_OAUTH_PROVIDER_CLIENT_SECRET=your-client-secret

# Public URL where MCP clients reach this server (must match what you registered in Step 1)
PLANE_OAUTH_PROVIDER_BASE_URL=https://mcp.yourdomain.com
```

**3. Start:**

```bash
docker compose up -d
```

**4. Verify:**

```bash
docker compose logs -f mcp           # follow startup logs
curl http://localhost:8211/http/mcp  # expect: 401 or MCP protocol response
```

::: warning Terminate TLS in front of this container
The container listens on plain HTTP at `:8211`. Put it behind a reverse proxy (nginx, Caddy, Traefik, Cloudflare) that handles TLS. OAuth callbacks will fail without HTTPS, and `PLANE_OAUTH_PROVIDER_BASE_URL` must be the `https://` URL that proxy exposes.
:::

#### Environment variable reference

| Variable                             | Required | Description                                                                                                          |
| ------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `APP_RELEASE_VERSION`                | No       | Image tag to deploy. Defaults to `latest`. Pin in production.                                                        |
| `PLANE_BASE_URL`                     | No       | Public Plane API URL. Defaults to `https://api.plane.so`.                                                            |
| `PLANE_INTERNAL_BASE_URL`            | No       | Internal Plane URL for server-to-server calls. Falls back to `PLANE_BASE_URL`.                                       |
| `PLANE_OAUTH_PROVIDER_CLIENT_ID`     | Yes      | OAuth Client ID from Step 1.                                                                                         |
| `PLANE_OAUTH_PROVIDER_CLIENT_SECRET` | Yes      | OAuth Client Secret from Step 1.                                                                                     |
| `PLANE_OAUTH_PROVIDER_BASE_URL`      | Yes      | Public URL of **this MCP server**, not your Plane instance.                                                          |
| `PLANE_OAUTH_PROVIDER_ENABLE_CIMD`   | No       | Enables client ID metadata documents. Defaults to `false`.                                                           |
| `PLANE_OAUTH_ALLOWED_REDIRECT_URIS`  | No       | Comma-separated extra client redirect patterns. `*` can match a port, path segment, or subdomain; keep hosts pinned. |
| `MCP_PATH_PREFIX`                    | No       | Prefix for every route. For example, `/plane` serves MCP at `/plane/http/mcp`.                                       |
| `REDIS_HOST`                         | No       | Redis or Valkey host for persistent OAuth token storage. Without it, tokens use in-memory storage.                   |
| `REDIS_PORT`                         | No       | Redis or Valkey port.                                                                                                |
| `REDIS_PASSWORD`                     | No       | Static Redis or Valkey password.                                                                                     |
| `REDIS_SSL`                          | No       | Enables TLS for Redis or Valkey when set to `true`.                                                                  |
| `ELASTICACHE_SECRET_ARN`             | No       | AWS Secrets Manager ARN containing a rotating ElastiCache authentication token.                                      |
| `AWS_REGION`                         | No       | AWS region for `ELASTICACHE_SECRET_ARN`.                                                                             |
| `REDIS_AUTH_TOKEN_KEY`               | No       | JSON key that contains the rotating token in the AWS secret.                                                         |
| `LOG_USER_INFO`                      | No       | Logs the user's display name when `true`. Defaults to `false`; the display name is PII.                              |

#### Onboard a new MCP client

The built-in redirect allowlist contains:

- `http://localhost:*`, `http://localhost:*/*`, `http://127.0.0.1:*`, and
  `http://127.0.0.1:*/*`
- `cursor://anysphere.cursor-mcp/oauth/*` and `https://www.cursor.com/*`
- `https://vscode.dev/redirect` and `https://insiders.vscode.dev/redirect`
- `https://antigravity.google/oauth-callback`
- `https://claude.ai/*`
- `https://chatgpt.com/connector/oauth/*` and `https://chatgpt.com/connector_platform_oauth_redirect`

Append new client callbacks without releasing a new server version:

```env
PLANE_OAUTH_ALLOWED_REDIRECT_URIS=https://newclient.com/cb,https://other.app/oauth/*
```

The `*` wildcard can match any port, path segment, or subdomain. Keep the host pinned to a domain you trust.

#### Upgrading

```bash
docker compose pull
docker compose up -d
```

---

### Option B: Helm

**1. Add the Plane Helm repo:**

```bash
helm repo add plane https://helm.plane.so
helm repo update
```

**2. Create a `values.yaml`:**

```yaml
ingress:
  enabled: true
  host: mcp.yourdomain.com
  ingressClass: nginx
  ssl:
    enabled: true
    issuer: cloudflare # cloudflare | digitalocean | http
    email: you@yourdomain.com

services:
  api:
    plane_base_url: "https://api.plane.so"
    plane_oauth:
      enabled: true
      client_id: "<your-oauth-client-id>"
      client_secret: "<your-oauth-client-secret>"
      provider_base_url: "https://mcp.yourdomain.com"
```

**3. Install:**

```bash
helm install plane-mcp plane/plane-mcp-server \
  --namespace plane-mcp \
  --create-namespace \
  -f values.yaml
```

#### Helm values reference

| Value                                        | Default           | Description                                         |
| -------------------------------------------- | ----------------- | --------------------------------------------------- |
| `dockerRegistry.default_tag`                 | `latest`          | Image tag to deploy                                 |
| `ingress.enabled`                            | `true`            | Enable ingress                                      |
| `ingress.host`                               | `mcp.example.com` | Public hostname                                     |
| `ingress.ingressClass`                       | `nginx`           | Ingress class name                                  |
| `ingress.ssl.enabled`                        | `false`           | Enable TLS via cert-manager                         |
| `ingress.ssl.issuer`                         | `cloudflare`      | ACME issuer (`cloudflare`, `digitalocean`, `http`)  |
| `services.api.replicas`                      | `1`               | Number of MCP server replicas                       |
| `services.api.plane_base_url`                | `""`              | Plane API URL                                       |
| `services.api.plane_oauth.enabled`           | `false`           | Enable OAuth endpoints                              |
| `services.api.plane_oauth.client_id`         | `""`              | OAuth Client ID                                     |
| `services.api.plane_oauth.client_secret`     | `""`              | OAuth Client Secret                                 |
| `services.api.plane_oauth.provider_base_url` | `""`              | Public URL this server is reachable on              |
| `services.redis.local_setup`                 | `true`            | Deploy Valkey in-cluster                            |
| `services.redis.external_redis_url`          | `""`              | External Valkey/Redis URL (if not using in-cluster) |

Environment variables that have no Helm value — for example `PLANE_OAUTH_ALLOWED_REDIRECT_URIS` or `LOG_USER_INFO` —
must be set as environment variables on the MCP server deployment.

#### Upgrading

```bash
helm upgrade plane-mcp plane/plane-mcp-server \
  --namespace plane-mcp \
  -f values.yaml
```

#### Uninstalling

```bash
helm uninstall plane-mcp --namespace plane-mcp
```

---

## Logging and observability

The server emits structured JSON logs with the tool name, duration, status, opaque user ID, and workspace slug.

`LOG_USER_INFO` defaults to `false`. Setting it to `true` also logs the user's display name, which is personally
identifiable information.

Even with `LOG_USER_INFO=false`, log entries contain the opaque user ID and the workspace slug, which can identify a
person or organisation when combined with other data. Treat log storage as sensitive: restrict who can read it, set a
retention period, and redact those fields before sharing logs outside your team.

## Connect AI clients

Once the server is running, your available endpoints are:

| Endpoint                                      | Auth                                                      | Description                      |
| --------------------------------------------- | --------------------------------------------------------- | -------------------------------- |
| `https://mcp.yourdomain.com/http/mcp`         | OAuth                                                     | Recommended for most clients     |
| `https://mcp.yourdomain.com/http/api-key/mcp` | `Authorization: Bearer <PAT>`, `x-workspace-slug: <slug>` | CI, scripts, and headless setups |
| `https://mcp.yourdomain.com/sse`              | OAuth                                                     | Deprecated HTTP+SSE transport    |

Client configuration is identical to the [MCP server setup guide](/dev-tools/mcp-server). Swap
`https://mcp.plane.so` for your server's host in each configuration.

---

## Troubleshooting

**Server not starting:**

```bash
docker compose logs mcp
```

**Valkey not reachable:**

```bash
docker compose exec valkey valkey-cli ping
# Expect: PONG
```

If Valkey is unhealthy, tokens are stored in-memory and lost on restart. Verify `REDIS_HOST` and `REDIS_PORT` are set correctly in your environment.

**OAuth errors:**

- Confirm both redirect URIs are registered in your Plane OAuth app: `/http/auth/callback` and `/auth/callback`. An
  existing `/callback` registration is harmless but unnecessary.
- Check that `PLANE_OAUTH_PROVIDER_CLIENT_ID` and `PLANE_OAUTH_PROVIDER_CLIENT_SECRET` match what Plane generated.
- Check that `PLANE_OAUTH_PROVIDER_BASE_URL` is the publicly reachable `https://` URL of this MCP server - not your Plane instance URL.
- If the client reports `redirect_uri is not allowed`, add its exact callback or a host-pinned pattern to
  `PLANE_OAUTH_ALLOWED_REDIRECT_URIS`, then restart the deployment.
- Clear any cached auth tokens on the client side:

  ```bash
  rm -rf ~/.mcp-auth
  ```

**Reset Docker Compose** (deletes Valkey data):

```bash
docker compose down -v
docker compose up -d
```

**Still stuck:**

1. Double-check OAuth credentials and redirect URIs in Plane workspace settings.
2. Check the [plane-mcp-server](https://github.com/makeplane/plane-mcp-server) repo for known issues.
3. Contact support@plane.so.

---

→ For client configuration details, see the [MCP server setup guide](/dev-tools/mcp-server).
→ For the full list of available tools, see the [tool reference](/dev-tools/mcp-server-tools).
