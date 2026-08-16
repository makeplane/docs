---
title: Configure custom domain
description: Configure custom domain for self-hosted Plane. Setup your own domain name for your Plane instance.
keywords: plane custom domain, domain setup, dns configuration, self-hosting, plane domain name, custom url
---

# Configure custom domain <Badge type="info" text="Commercial Edition" />

During installation, you configure a domain for your instance. If you need to change that domain later, whether you're moving to a production domain, switching to a different hostname, or updating your DNS configuration, this guide walks you through the process.

:::info
**Prime CLI is for Docker installations only.** These commands only work on Plane instances originally installed using `prime-cli`.

If you're running Kubernetes or another deployment method, the environment variable names are the same, but the configuration method differs based on your setup.
:::

:::warning
**Plan for downtime**  
Changing domains requires restarting Plane services. Your instance will be unavailable for a few minutes during the restart. Plan accordingly or notify your users.
:::

## Check current domain configuration

First, see which environment variables currently reference your old domain. This helps you identify exactly what needs updating.

```bash
cat /opt/plane/plane.env | grep <old_domain>
```

**Example output:**

```ini
DOMAIN_NAME=localhost
SITE_ADDRESS=http://localhost
WEB_URL=http://localhost
CORS_ALLOWED_ORIGINS=http://localhost,https://localhost
```

This shows you all the variables that contain your current domain. You'll update each of these in the next step.

## Update domain in environment file

1. Open the Plane environment configuration file:

   ```bash
   vim /opt/plane/plane.env
   ```

2. Find and update these environment variables with your new domain:
   - **DOMAIN_NAME**

   Set this to your bare domain name without protocol:

   ```ini
   DOMAIN_NAME=plane.company.com
   ```

   Don't include `http://` or `https://` here, just the hostname.
   - **SITE_ADDRESS**

   Set this to your full domain URL:

   ```ini
   SITE_ADDRESS=https://plane.company.com
   ```

   Include the protocol (`https://` for SSL, `http://` if you haven't set up SSL yet).
   - **WEB_URL**

   This should match your SITE_ADDRESS:

   ```ini
   WEB_URL=https://plane.company.com
   ```

   Again, include the full protocol.

   **CORS_ALLOWED_ORIGINS**

   List all domains that should be allowed to make cross-origin requests to your Plane instance. This typically includes both HTTP and HTTPS versions of your domain:

   ```ini
   CORS_ALLOWED_ORIGINS=https://plane.company.com,http://plane.company.com
   ```

   Separate multiple entries with commas, no spaces. If you have multiple domains or subdomains that need access, add them all here.

## Restart Plane services

Apply your configuration changes by restarting Plane:

```bash
sudo prime-cli restart
```

This process typically takes a few minutes. You'll see output indicating the status of each service as it restarts.

::: details Community Edition

Our steps differ slightly depending on whether you are hosting on a public IP or a private/internal IP. Follow the steps listed below.

#### Update configuration in .env file

Open your project's `.env` file in a text editor. This file contains configuration settings for your application. Locate the following lines:

```
WEB_URL=<your domain name with http/https>
CORS_ALLOWED_ORIGINS=<your domain name with http/https>
```

Replace `<your domain name with http/https>` with your actual domain name, including the protocol (http:// or https://). For example:

```
WEB_URL=https://example.com
CORS_ALLOWED_ORIGINS=https://example.com
```

If you are hosting Plane on a public IP, then follow the steps here. However, if you are hosting Plane on an internal IP then follow these steps.

#### Set DNS A record (for public IP)

If your server has a public IP address, you need to configure the DNS A record to point to this IP address. This allows users to access your application using your custom domain name. Here’s how to do it:

- Log in to your domain registrar's website or DNS hosting provider.
- Navigate to the DNS management section.
- Find the option to edit your domain's DNS records.
- Add a new A record with the hostname set to `@` (or your subdomain if applicable) and the IP address set to your server's public IP address.
- Save the changes. It may take some time for the DNS changes to propagate.

#### Configure reverse proxy (for internal IP)

If your server is behind a firewall or router and has an internal IP address, you'll need to set up a reverse proxy to route requests from your custom domain to your server. Follow these steps:

- Configure a CNAME record in your domain's DNS settings that points to your reverse proxy server's hostname. This allows your domain to resolve to the reverse proxy server.

- Set up reverse proxy redirection on your reverse proxy server to forward incoming requests to your server's internal IP address and port.

- Depending on the reverse proxy software you're using (e.g., Nginx, Apache, etc.), the configuration process may vary. Refer to the documentation for your specific reverse proxy server for detailed instructions on setting up reverse proxy redirection.

- Once the reverse proxy is properly configured, ensure that your firewall/router allows incoming traffic on the necessary ports to reach your server.

By following these steps, you will be able to access your self-hosted instance of Plane using your custom domain name, whether your server has a public IP address or is behind a firewall with an internal IP address.
