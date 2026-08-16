---
title: Configure external reverse proxy
description: Configure Nginx, Caddy, or Traefik as a reverse proxy for self-hosted Plane. Setup upstream proxying, headers, and WebSocket support.
keywords: plane reverse proxy, nginx proxy, traefik, caddy, upstream proxy, proxy configuration, self-hosting
---

# Configure external reverse proxy <Badge type="info" text="Commercial Edition" />

This page provides configuration for setting up an external reverse proxy with Plane.

## Plane environment setup

Make sure to update the following environment variables in your plane.env file.

1. Assign free ports for Plane to listen on. Update the following variables with two different unsused ports:

   ```bash
   LISTEN_HTTP_PORT=
   LISTEN_HTTPS_PORT=
   ```

2. Update the SITE_ADDRESS variable to `:80`

   ```bash
     SITE_ADDRESS=:80
   ```

   This is required so that generated links and redirects work correctly behind the proxy:

3. After editing plane.env, restart your instance so the changes take effect:
   ```bash
   sudo prime-cli restart
   ```

::: warning
**Prime CLI is for Docker installations only.** These commands only work on Plane instances originally installed using `prime-cli`.
:::

## Proxy setup

1. Choose the appropriate [configuration template](#configuration-templates) for your reverse proxy.

2. Replace the following placeholders:
   - `<domain>`  
     Your Plane application's domain name.
   - `<plane-host-ip>`  
     The IP address where Plane is hosted.
   - `<plane-host-port>`  
     The port Plane listens on.
3. For Traefik, also update `your-email@example.com` with your email.

Ensure that your reverse proxy setup follows the template provided, and that the forwarded headers and ports are correctly set to match the environment variable configuration.

## Configuration templates

All configurations include:

- Automatic HTTPS redirection
- WebSocket support
- Standard proxy headers
- SSL/TLS certificate management
  - NGINX: Uses Certbot
  - Caddy: Handles certificates automatically
  - Traefik: Uses Let’s Encrypt

::: details NGINX configuration

```bash
server {
    server_name <domain>;

    location / {
        proxy_pass http://<plane-host-ip>:<plane-host-port>/;

        # Set headers for proxied request
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host  $host;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP         $remote_addr;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $http_host;
        proxy_http_version 1.1;
    }

    client_max_body_size 10M;

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/<domain>/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/<domain>/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    if ($host = <domain>) {
        return 301 https://$host$request_uri;
    }

    listen 80;
    server_name <domain>;
    return 404;
}
```

:::

::: details Caddy configuration

```bash
<domain> {
    tls {
        # Caddy will automatically handle certificates
    }

    redir / https://{host}{uri} permanent

    reverse_proxy <plane-host-ip>:<plane-host-port> {
        header_up X-Forwarded-Proto {scheme}
        header_up X-Forwarded-Host {host}
        header_up X-Real-IP {remote_host}
        header_up X-Forwarded-For {remote_host}
        header_up Host {http.request.host}

        header_up Upgrade {http.request.header.Upgrade}
        header_up Connection {http.request.header.Connection}

        transport http {
            tls_insecure_skip_verify
            read_buffer 4096
            write_buffer 4096
        }
    }

    request_body {
        max_size 10MB
    }
}
```

:::

::: details Traefik configuration

```bash
entryPoints:
  web:
    address: ":80"
    http:
      redirections:
        entryPoint:
          to: websecure
          scheme: https
          permanent: true

  websecure:
    address: ":443"

certificatesResolvers:
  letsencrypt:
    acme:
      email: your-email@example.com  # Replace with your email
      storage: acme.json
      httpChallenge:
        entryPoint: web

providers:
  http:
    routers:
      plane-router:
        rule: "Host(`<domain>`)"
        service: plane-service
        entryPoints:
          - websecure
        tls:
          certResolver: letsencrypt

    services:
      plane-service:
        loadBalancer:
          servers:
            - url: "http://<plane-host-ip>:<plane-host-port>"
          passHostHeader: true
          responseForwarding:
            flushInterval: "100ms"
          serversTransport:
            maxIdleConnsPerHost: 100
            forwardingTimeouts:
              dialTimeout: 30s
              responseHeaderTimeout: 30s
              idleConnTimeout: 90s

    middlewares:
      headers:
        headers:
          customRequestHeaders:
            X-Forwarded-Proto: "https"
            X-Real-IP: "{{ .RemoteAddr }}"
```

:::
