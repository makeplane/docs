---
title: Configure DNS for Intake Email
description: Configure DNS MX records for Plane intake email. Route incoming emails to create work items automatically in your self-hosted instance.
keywords: plane dns configuration, mx records, intake email, email to issue, self-hosting, plane email setup, dns setup
---

# Configure DNS for Intake Email <Badge type="tip" text="Business" />

This guide explains how to configure DNS settings to enable the [Intake Email](https://docs.plane.so/intake/intake-email) feature for your self-hosted Plane instance. These configurations enable your server to accept messages sent to your project's dedicated Intake address, which are then converted into work items in your project's Intake section.

## Prerequisites

Ensure that the Plane server allows inbound traffic on the following email-related ports: `25`, `465`, and `587`.

If any of these ports are currently in use, you can free them by running:

```bash
fuser -k 25/tcp 465/tcp 587/tcp
```

## Generate SSL/TLS Certificate for Email Domain

::: warning
Mandatory for Docker Compose deployments only.
:::
Before configuring DNS records for Intake Email, secure your email domain with an SSL/TLS certificate. This ensures encrypted communication between mail servers and improves email trust and deliverability.

1.  **Install Certbot**  
    Update your system and install Certbot.

    ```bash
    sudo apt update && sudo apt install certbot
    ```

    For NGINX:

    ```bash
    sudo apt install python3-certbot-nginx
    ```

    For Apache:

    ```bash
    sudo apt install python3-certbot-apache
    ```

2.  **Generate SSL Certificate**  
    Choose the method that matches your web server setup:

    For NGINX:

    ```bash
    sudo certbot --nginx -d <mail-domain>
    ```

    For Apache:

    ```bash
    sudo certbot --apache -d <mail-domain>
    ```

    For standalone (no web server):

    ```bash
    sudo certbot certonly --standalone -d <mail-domain>
    ```

3.  **Copy Certificate Files**  
    Copy the generated certificate files to Plane's expected directory:

    ```bash
    sudo cp /etc/letsencrypt/live/<mail-domain>/fullchain.pem /opt/plane/data/email/tls/cert.pem
    sudo cp /etc/letsencrypt/live/<mail-domain>/privkey.pem /opt/plane/data/email/tls/key.pem
    ```

4.  **Configure Environment Variables**  
    Add the following settings to your plane.env file:

    ```bash
    # If using SMTP_DOMAIN as FQDN (e.g., intake.example.com),
    # generate a valid SSL certificate and set these paths accordingly.
    SMTP_DOMAIN=intake.example.com
    TLS_CERT_PATH=tls/cert.pem
    TLS_PRIV_KEY_PATH=tls/key.pem
    INTAKE_EMAIL_DOMAIN=intake.example.com
    ```

    ::: warning
    Important: `SMTP_DOMAIN` and `INTAKE_EMAIL_DOMAIN` must be identical.
    :::

## Configure DNS records

1.  **Create an A Record**  
    This record points to the server running your email service.

    ```bash
    Type: A
    Host: <host-domain>           # Example: plane.example.com
    Value: <public-ip-address>    # Your server's public IP address
    TTL: Auto | 3600
    ```

    ::: tip
    You can alternatively use a CNAME record if you're using a cloud load balancer.
    :::

2.  **Add an MX Record**  
     This record directs email traffic to your mail server.

    ```bash
    Type: MX
    Host: <mail-domain>           # Example: intake.example.com
    Value: <host-domain>          # Same as your A record host
    Priority: 10
    TTL: Auto | 3600
    ```

3.  **Configure an SPF Record**  
    This record helps prevent email spoofing.

    ```bash
    Type: TXT
    Host: <mail-domain>           # Example: intake.example.com
    Value: "v=spf1 ip4:<A-record-ip-host-domain> -all"
    TTL: Auto | 3600
    ```

4.  **Set Up a DMARC record**  
    This record specifies how receiving mail servers should handle authentication failures.

    ```bash
    Type: TXT
    Host: _dmarc.<mail-domain>    # Example: _dmarc.intake.example.com
    Value: "v=DMARC1; p=reject; rua=mailto:<valid-email-addr>"
    TTL: Auto | 3600
    ```

## Verify your configuration

After setting up your DNS records, verify that they're correctly configured:

```bash
# Verify A record
dig A <mail-domain>

# Verify MX record
dig MX <mail-domain>

# Verify SPF record
dig TXT <mail-domain>

# Verify DMARC record
dig TXT _dmarc.<mail-domain>
```

You can also use [MXToolbox](https://mxtoolbox.com) to check for any issues with your DNS configuration.

## Test your mail server

Once your DNS records have propagated, test your SMTP connections:

```bash
# Test SMTP connection on standard ports
telnet <host-domain> 25
telnet <host-domain> 465
telnet <host-domain> 587
```

## Troubleshooting

- MX Record issues
  - Ensure there's a proper dot at the end of the domain.
  - Check that the priority number is correct (lower = higher priority).
  - Allow 24-48 hours for DNS changes to fully propagate.

- A Record issues
  - Verify that the IP address is correct.
  - Ensure your mail subdomain matches the MX record.

## See also

[Intake Email](https://docs.plane.so/intake/intake-email)
