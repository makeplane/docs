---
title: Configure embedding model for semantic search
description: Configure an embedding model for Plane AI semantic search, duplicate detection, and vector retrieval over work items and pages.
keywords: plane ai semantic search, opensearch, embedding model, vector search, cohere, openai embeddings, bedrock embeddings
---

# Configure embedding model for semantic search

Configuring the embedding model is optional. Without it, Plane AI uses BM25 keyword search. With it, you get vector similarity search, duplicate issue detection, and semantic retrieval over work items and pages.

This builds on the OpenSearch connection configured in [Configure Plane AI](/self-hosting/govern/plane-ai/configure-plane-ai). Make sure `OPENSEARCH_URL`, `OPENSEARCH_USERNAME`, and `OPENSEARCH_PASSWORD` are already set before continuing.

## Supported embedding models

| Provider        | Model                                  | Dimension |
| --------------- | -------------------------------------- | --------- |
| **Cohere**      | `cohere/embed-v4.0`                    | 1536      |
|                 | `cohere/embed-english-v3.0`            | 1024      |
|                 | `cohere/embed-english-v2.0`            | 4096      |
| **OpenAI**      | `openai/text-embedding-ada-002`        | 1536      |
|                 | `openai/text-embedding-3-small`        | 1536      |
|                 | `openai/text-embedding-3-large`        | 3072      |
| **AWS Bedrock** | `bedrock/amazon.titan-embed-text-v1`   | 1536      |
|                 | `bedrock/amazon.titan-embed-text-v2`   | 1024      |
|                 | `bedrock/cohere.embed-english-v3`      | 1024      |
|                 | `bedrock/cohere.embed-multilingual-v3` | 1024      |

## Configure the embedding model

Two options depending on your OpenSearch setup.

### Option A: Use an existing OpenSearch model ID

Use this if you've already deployed an embedding model in OpenSearch - either via the [AWS OpenSearch embedding guide](/self-hosting/govern/plane-ai/aws-opensearch-embedding) or manually on self-hosted OpenSearch.

```bash
EMBEDDING_MODEL=cohere/embed-v4.0          # must match the deployed model
OPENSEARCH_ML_MODEL_ID=<your-model-id>     # model ID returned by OpenSearch on deploy
# OPENSEARCH_EMBEDDING_DIMENSION=1024      # only if not using default 1536
```

:::tip
`OPENSEARCH_EMBEDDING_DIMENSION` must match the model's actual output dimension (see table above). It defaults to `1536` - only set it explicitly if your model uses a different value. A mismatch between the configured dimension and the model's real output breaks indexing.
:::

### Option B: Automatic deployment (self-hosted OpenSearch only)

Plane AI can create and deploy the embedding model automatically when the migrator starts. Provide the model name and provider credentials - no manual OpenSearch setup needed.

**Cohere:**

```bash
EMBEDDING_MODEL=cohere/embed-v4.0
COHERE_API_KEY=your-cohere-api-key
```

**OpenAI:**

```bash
EMBEDDING_MODEL=openai/text-embedding-3-small
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
```

**AWS Bedrock:**

```bash
EMBEDDING_MODEL=bedrock/amazon.titan-embed-text-v1
BR_AWS_ACCESS_KEY_ID=your-access-key
BR_AWS_SECRET_ACCESS_KEY=your-secret-key
BR_AWS_REGION=us-east-1
```

:::warning IAM permission required for Bedrock
The IAM user for `BR_AWS_ACCESS_KEY_ID` and `BR_AWS_SECRET_ACCESS_KEY` needs `bedrock:InvokeModel` permission on the Titan foundation model. Without it, embedding requests fail with a 403 error.

Attach this policy to the IAM user:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "bedrock:InvokeModel",
      "Resource": "arn:aws:bedrock:<your-region>::foundation-model/amazon.titan-embed-text-v1"
    }
  ]
}
```

Replace `<your-region>` with your `BR_AWS_REGION` value.
:::

:::info AWS managed OpenSearch
Auto-deploy requires direct ML access to OpenSearch. AWS managed OpenSearch restricts this, so deploy the model manually using the [AWS OpenSearch embedding guide](/self-hosting/govern/plane-ai/aws-opensearch-embedding), then use the model ID option above.
:::

## Restart Plane

After updating `/opt/plane/plane.env`, restart Plane.

The Plane AI migrator runs automatically on start and handles embedding model deployment, index creation, and pipeline setup.

## Vectorize existing data

New content is indexed automatically. For existing work items and pages, run this in the API container:

Generate embeddings for your existing content by running this command in the API container.

**Docker:**

```bash
docker exec -it plane-api-1 sh
python manage.py manage_search_index --background --vectorize document index --force
```

**Kubernetes:**

```bash
API_POD=$(kubectl get pods -n plane --no-headers | grep api | head -1 | awk '{print $1}')
kubectl exec -n plane $API_POD -- python manage.py manage_search_index --background --vectorize document index --force
```

The `--background` flag processes vectorization through Celery workers. This is recommended for instances with large amounts of existing content.

## Changing the embedding model

If you update the model or manually override the dimension size by setting `OPENSEARCH_EMBEDDING_DIMENSION`, you must recreate your search indices so they adopt the new dimension size, then reindex and revectorize your workspace. Ensure that the model associated with your `OPENSEARCH_ML_MODEL_ID` and your `EMBEDDING_MODEL` configuration share this same dimension size.

### Model only (same dimension)

Update `EMBEDDING_MODEL` and provider credentials in `/opt/plane/plane.env`, restart Plane, then revectorize:

```bash
docker exec -it plane-api-1 sh
python manage.py manage_search_index --background --vectorize document index --force
```

### Dimension change

Update `EMBEDDING_MODEL`, `OPENSEARCH_EMBEDDING_DIMENSION`, and provider credentials in `/opt/plane/plane.env`, restart Plane, then rebuild and revectorize:

```bash
# Rebuild indices with the new dimension
python manage.py manage_search_index index rebuild --force

# Reindex and revectorize all existing documents
python manage.py manage_search_index --background --vectorize document index --force
```

`OPENSEARCH_EMBEDDING_DIMENSION` must match the actual output dimension of the model in `EMBEDDING_MODEL`. A mismatch breaks indexing.
