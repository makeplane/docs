---
title: Set up SSL
description: Configure SSL/TLS certificates for Plane. Setup HTTPS encryption for secure self-hosted Plane deployment.
keywords: plane ssl, https setup, tls certificate, ssl configuration, lets encrypt, secure deployment, self-hosting security
---

# Set up SSL <Badge type="info" text="Commercial Edition" />

This guide shows you how to configure SSL/TLS certificates for your self-hosted Plane instance. Plane handles certificate provisioning and renewal automatically using Let's Encrypt.

::: info
**Applies to:** Docker deployments of Plane Commercial Edition without an external reverse proxy.

If you're using an external reverse proxy (nginx, Caddy, Traefik) or a load balancer, configure SSL there instead and skip this guide.
:::

## Before you begin

Ensure you have:

- A registered domain name pointing to your Plane server
- DNS records configured (A or CNAME record pointing to your server's IP)
- Ports 80 and 443 open on your server's firewall
- Prime CLI installed (included with Plane Commercial Edition)

::: warning
**DNS must be configured first.** Let's Encrypt validates domain ownership by making HTTP requests to your domain. Ensure your domain resolves to your server's IP address before proceeding.
:::

## Configure SSL settings

### Open the configuration file

Edit your Plane environment configuration:

```bash
vim /opt/plane/plane.env
```

### Set required variables

Add or update these environment variables:

```bash
# SSL Configuration
CERT_EMAIL=admin@yourcompany.com
SITE_ADDRESS=plane.yourcompany.com
WEB_URL=https://plane.yourcompany.com
```

**Variable explanations:**

**CERT_EMAIL**  
A valid email address for Let's Encrypt certificate registration. Let's Encrypt uses this to send renewal reminders and important notices about your certificates.

**SITE_ADDRESS**  
Your domain name **without** protocol. Use only the domain (e.g., `plane.company.com`), not `https://plane.company.com`. Plane's built-in proxy uses this to request certificates from Let's Encrypt.

**WEB_URL**  
Your full Plane URL **with** the `https://` protocol. This tells Plane services how to construct URLs for redirects, emails, and API responses.

### DNS provider configuration (optional)

If you're using Cloudflare or another DNS provider with API access, you can use DNS validation instead of HTTP validation. This is useful if:

- Your server is behind a firewall that blocks port 80
- You need wildcard certificates
- HTTP validation isn't working due to network restrictions

**For Cloudflare:**

```bash
CERT_ACME_DNS=acme_dns cloudflare <cloudflare-api-token>
```

Replace `<cloudflare-api-token>` with your Cloudflare API token. Create one at **Cloudflare Dashboard** → **My Profile** → **API Tokens** with **Zone:DNS:Edit** permissions.

**For other DNS providers:**

Check the [acme.sh DNS API documentation](https://github.com/acmesh-official/acme.sh/wiki/dnsapi) for provider-specific configuration.

## Apply SSL configuration

Restart Plane to apply the SSL settings:

```bash
sudo prime-cli restart
```

Prime CLI will:

1. Stop all Plane services
2. Request a new SSL certificate from Let's Encrypt
3. Configure the built-in proxy to use HTTPS
4. Restart all services with SSL enabled

This process typically takes 30-60 seconds.

## Verify SSL is working

Check that your Plane instance is accessible via HTTPS:

```bash
curl -I https://plane.yourcompany.com
```

You should see a response with `HTTP/2 200` or `HTTP/1.1 200` and SSL-related headers.

Visit your Plane instance in a browser at `https://plane.yourcompany.com`. You should see a secure connection (padlock icon) without certificate warnings.

## Using custom SSL certificates

Custom SSL certificates (from a corporate CA or purchased certificates) are not currently supported in Plane's deployment.
