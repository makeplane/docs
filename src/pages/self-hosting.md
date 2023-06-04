---
title: Self Hosting Plane
pageTitle: Self Hosting | Plane
description: This section helps you get comfortable with Plane and find your way around more effectively.
---

Plane is still in its early days, not everything is perfect yet, and
hiccups may happen. Please let us know of any suggestions, ideas, or bugs that
you encounter on our [Discord](https://discord.com/invite/A92xrEGCge).

This guide assumes you already have Docker installed
and have permissions to run Docker containers.
See the [Install on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
guide which explains installing Docker on your machine.

## Install with Docker Compose (recommended way)

### Clone the Repository and change the directory

```bash
git clone https://github.com/makeplane/plane
cd plane
chmod +x setup.sh
```

### Run setup.sh

This script sets up the environment with the IP address or the Domain name you provided.

```bash
./setup.sh http://<your_ip|domain_name>
```

{% callout type="note" %}
`<your_ip>` is a placeholder for the actual IP address
that you'd want your Plane instance to be available on.

If you are setting Plane up, for example, on your own PC,
it is recommended to use `http://localhost` for the IP address.
{% /callout %}

### Export Environment Variables
```bash
set -a; source .env; set +a;
```

### Bootstrap Plane with Docker Compose

```bash
docker compose up -d
```

### Log in and enjoy your new and shiny Plane instance!

Open your browser and navigate to `http://localhost/` to login onto your Plane instance.

There is a default user: `captain@plane.so` with the password `password123`.
