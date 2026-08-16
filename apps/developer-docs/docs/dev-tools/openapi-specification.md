---
title: OpenAPI Specification
description: Generate and access the OpenAPI 3.0 specification for the Plane public REST API using drf-spectacular.
keywords: plane, developer tools, openapi, api specification, swagger, redoc, drf-spectacular, api documentation
---

# OpenAPI Specification

Plane uses [drf-spectacular](https://drf-spectacular.readthedocs.io/) to generate an OpenAPI 3.0 specification for the public REST API (`/api/v1/`). The feature is **disabled by default** and must be explicitly enabled.

## Enable the OpenAPI spec

Add the following to your `.env` file (at the project root or `apps/api/.env`):

```ini
ENABLE_DRF_SPECTACULAR=1
```

Then restart the API server so it picks up the new variable.

| Variable                 | Required value | Default | Description                                                  |
| ------------------------ | -------------- | ------- | ------------------------------------------------------------ |
| `ENABLE_DRF_SPECTACULAR` | `1`            | `0`     | Activates drf-spectacular and registers the schema endpoints |

No other environment variables are needed — everything else (schema path prefix, tags, auth schemes, servers) is pre-configured in `apps/api/plane/settings/openapi.py`.

## Access the OpenAPI spec

> Replace `{domain_name}` below with your self-hosted Plane domain (e.g. `plane.example.com`).

Once the API server is running with the variable enabled, three endpoints are available:

| Endpoint                      | URL                                            | Description                |
| ----------------------------- | ---------------------------------------------- | -------------------------- |
| `GET /api/schema/`            | `https://{domain_name}/api/schema/`            | Raw OpenAPI schema (YAML)  |
| `GET /api/schema/swagger-ui/` | `https://{domain_name}/api/schema/swagger-ui/` | Interactive Swagger UI     |
| `GET /api/schema/redoc/`      | `https://{domain_name}/api/schema/redoc/`      | ReDoc documentation viewer |

## Download the OpenAPI spec

### Browser

Open `https://{domain_name}/api/schema/` and save the page. The default format is YAML.

For JSON, append the `format` query parameter:

```text
https://{domain_name}/api/schema/?format=openapi-json
```

### curl

```bash
# YAML
curl -o openapi.yaml https://{domain_name}/api/schema/

# JSON
curl -o openapi.json https://{domain_name}/api/schema/?format=openapi-json
```

### Management command (offline, no running server required)

```bash
# From apps/api/
ENABLE_DRF_SPECTACULAR=1 python manage.py spectacular --file openapi.yaml
ENABLE_DRF_SPECTACULAR=1 python manage.py spectacular --file openapi.json --format openapi-json
```
