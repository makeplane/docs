---
title: Configure Plane AI
description: Enable Plane AI on your self-hosted instance. Set up a dedicated database, configure OpenSearch, add an LLM API key, and connect PI to your Plane deployment.
keywords: plane ai setup, self-hosted ai, llm api key, openai, anthropic, opensearch, enable plane ai
---

# Configure Plane AI <Badge type="info" text="Commercial Edition" />

Plane AI brings AI-powered features to your workspace, including natural language chat, duplicate detection, and search across work items, pages, and projects. This guide walks you through configuring Plane AI on your self-hosted instance.

For an overview of what Plane AI can do, see [Plane AI](https://docs.plane.so/ai/pi-chat).

## Prerequisites

Plane AI requires four things to work:

1. **An LLM API key** (OpenAI or Anthropic) - powers AI responses.
2. **OpenSearch** - An OpenSearch instance running version 2.19 or later (self-hosted or AWS OpenSearch) configured for [advanced search](/self-hosting/govern/advanced-search). Search over your workspace data (work items, pages, cycles) runs through OpenSearch indices.
3. **A dedicated database** - Plane AI must not share the main Plane application database.
4. **Read access to the main Plane database** - PI reads workspace data directly from the main Plane DB.

## Supported LLM providers

### OpenAI

- GPT-5.4
- GPT-5.2

### Anthropic

- Claude Sonnet 4.5
- Claude Sonnet 4.6

You can provide API keys for both OpenAI and Anthropic, making all models available to users. If you provide only one key, users will only have access to that provider's models.

:::tip Custom or self-hosted models
To use Ollama, Groq, LiteLLM, AWS Bedrock, or any OpenAI-compatible endpoint, see [Custom LLM models](#custom-llm-models).
:::

## Set up databases

Plane AI needs two database connections.

```bash
PLANE_PI_DATABASE_URL=postgresql://user:password@host:5432/plane-pi
FOLLOWER_POSTGRES_URI=postgresql://user:password@host:5432/plane
```

- **`PLANE_PI_DATABASE_URL`** - PI's own dedicated database. Must not be shared with the main Plane application database.
- **`FOLLOWER_POSTGRES_URI`** - Read connection to the main Plane database. PI reads workspace data (issues, pages, projects) directly from here. Can be a read replica.

Both are checked at startup - PI will not start if either is unreachable.

## Configure OpenSearch

Add to `/opt/plane/plane.env`:

```bash
OPENSEARCH_URL=https://your-opensearch-instance:9200/
OPENSEARCH_USERNAME=admin
OPENSEARCH_PASSWORD=your-secure-password
```

If you haven't set up OpenSearch yet, see [OpenSearch for advanced search](/self-hosting/govern/advanced-search) first.

## Configure an LLM provider

Add at least one to `/opt/plane/plane.env`:

```bash
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
CLAUDE_API_KEY=xxxxxxxxxxxxxxxx
```

### Custom LLM models

:::warning
The custom model should have at least 1 trillion parameters for all Plane AI features to work reliably. Larger, more capable models yield better results.
:::

Plane AI supports one custom LLM alongside OpenAI and Anthropic.

- OpenAI-compatible - any model exposed via an OpenAI Chat Completions API, including models served by Ollama, Groq, Cerebras, and similar runtimes.
- AWS Bedrock - models accessed directly through Amazon Bedrock using your AWS credentials.
  One custom model can be configured alongside your public provider keys.

:::tip No OpenAI-compatible API?
Proxy any model through - it exposes any LLM behind the OpenAI API. Then use the OpenAI-compatible setup below.

If you need to use an LLM that isn't from OpenAI or Anthropic - for example, an open-source model or a regional provider for compliance reasons - you can proxy it through [LiteLLM](https://docs.litellm.ai).Then use the OpenAI-compatible setup below.
:::

#### OpenAI-compatible

Add to `/opt/plane/plane.env`:

```bash
CUSTOM_LLM_ENABLED=true
CUSTOM_LLM_PROVIDER=openai
CUSTOM_LLM_MODEL_KEY=your-model-id        # model ID as the endpoint expects it
CUSTOM_LLM_BASE_URL=https://your-endpoint/v1
CUSTOM_LLM_API_KEY=your-api-key           # use any non-empty string if no key is required
CUSTOM_LLM_NAME=Your Model Name           # display name shown to users
CUSTOM_LLM_MAX_TOKENS=64000               # optional; max output tokens per response
```

**Examples:**

```bash
# Groq
CUSTOM_LLM_MODEL_KEY=llama-3.3-70b-versatile
CUSTOM_LLM_BASE_URL=https://api.groq.com/openai/v1
CUSTOM_LLM_API_KEY=gsk_xxxxxxxxxxxx

# Ollama (local)
CUSTOM_LLM_MODEL_KEY=llama3
CUSTOM_LLM_BASE_URL=http://localhost:11434/v1
CUSTOM_LLM_API_KEY=ollama

# LiteLLM proxy
CUSTOM_LLM_MODEL_KEY=your-litellm-model
CUSTOM_LLM_BASE_URL=http://litellm:4000/v1
CUSTOM_LLM_API_KEY=your-litellm-master-key
```

#### AWS Bedrock

##### Standard credentials

Use for IAM user access with an explicit access key and secret.

```bash
CUSTOM_LLM_ENABLED=true
CUSTOM_LLM_PROVIDER=bedrock
CUSTOM_LLM_MODEL_KEY=anthropic.claude-3-5-sonnet-20241022-v2:0  # Bedrock model ID
CUSTOM_LLM_API_KEY=your-aws-secret-access-key
CUSTOM_LLM_AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-aws-access-key-id  # standard AWS env var, picked up by boto3
CUSTOM_LLM_NAME=Claude via Bedrock
CUSTOM_LLM_MAX_TOKENS=64000               # optional; max output tokens per response
```

:::warning IAM permission required
The IAM user must have `bedrock:InvokeModel` permission on the target model.
:::

#### Inference profile (IRSA / EKS Pod Identity)

Use for Kubernetes deployments where the pod has an ambient IAM role. No static credentials needed.

```bash
CUSTOM_LLM_ENABLED=true
CUSTOM_LLM_PROVIDER=bedrock
CUSTOM_LLM_MODEL_KEY=claude-sonnet-4-6
CUSTOM_LLM_AWS_REGION=us-east-1
BEDROCK_INFERENCE_PROFILE_ARN=arn:aws:bedrock:us-east-1:123456789012:application-inference-profile/xxxx
# or use BEDROCK_INFERENCE_PROFILE_ID=global.anthropic.claude-sonnet-4-6
CUSTOM_LLM_NAME=Claude via Inference Profile
CUSTOM_LLM_MAX_TOKENS=64000               # optional; max output tokens per response
```

Plane AI activates inference profile mode automatically when a profile ARN or ID is set and ambient AWS credentials are present (`AWS_ROLE_ARN`, `AWS_WEB_IDENTITY_TOKEN_FILE`, `AWS_CONTAINER_CREDENTIALS_FULL_URI`, or `AWS_CONTAINER_AUTHORIZATION_TOKEN_FILE`).

## Connect Plane AI to your Plane deployment

Plane AI runs as a separate service and must be wired to your Plane deployment. Two things matter here.

**In the Plane API env** (`/opt/plane/plane.env`), tell Plane where PI is reachable:

```bash
PI_BASE_URL=https://plane.example.com
```

Plane builds the PI URL as `PI_BASE_URL + PI_BASE_PATH` - with the default `PI_BASE_PATH=/pi` this becomes `https://plane.example.com/pi`.

**In the PI env** (`/opt/plane/plane.env`), set the OAuth redirect URI to match:

```bash
PLANE_OAUTH_REDIRECT_URI=https://plane.example.com/pi/api/v1/oauth/callback/
```

## Enable Plane AI services

:::tip Other deployment methods
For Coolify, Portainer, Docker Swarm, and Podman Quadlets, use the same environment variables as Docker Compose - only the replica variables differ.
:::

:::tabs key:deployment-method

== Docker Compose {#docker-compose}

In `/opt/plane/plane.env`, set replica counts to `1`:

```bash
PI_API_REPLICAS=1
PI_BEAT_REPLICAS=1
PI_WORKER_REPLICAS=1
PI_MIGRATOR_REPLICAS=1
```

== Kubernetes {#kubernetes}

In `values.yaml`, enable the Plane AI service:

```yaml
services:
  pi:
    enabled: true
```

This activates the Plane AI API, worker, beat-worker, and migrator workloads. Configure replicas and resource limits through the [Plane AI values block](/self-hosting/methods/kubernetes#plane-ai-deployment).
:::

## Optional configuration

### Voice input

Enables speech-to-text in Plane AI chat. Get a key at [console.groq.com](https://console.groq.com).

```bash
GROQ_API_KEY=your-groq-api-key
```

### File uploads

Enables file attachments in Plane AI.

```bash
AWS_S3_BUCKET_NAME=your-bucket-name
AWS_S3_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

For MinIO or S3-compatible storage, also add:

```bash
AWS_S3_ENDPOINT_URL=http://your-minio-host:9000
USE_MINIO=1
```

## Restart Plane

:::tabs key:deployment-method

== Docker Compose {#docker-compose}

```bash
prime-cli restart
```

Or directly:

```bash
docker compose down
docker compose up -d
```

== Kubernetes {#kubernetes}

```bash
helm upgrade --install plane-app plane/plane-enterprise \
    --namespace plane \
    -f values.yaml \
    --wait
```

:::
