---
title: AWS OpenSearch embedding
description: Step-by-step guide to deploying a Cohere embedding model on AWS OpenSearch for use with Plane AI semantic search.
keywords: aws opensearch, embedding model, cohere, plane ai, semantic search, ml commons, opensearch connector
---

# Deploy an embedding model on AWS OpenSearch

This guide walks you through deploying a Cohere embedding model on AWS OpenSearch (managed) for Plane AI semantic search.

For other connector blueprints and embedding model configurations, see the [OpenSearch ML Commons remote inference blueprints](https://github.com/opensearch-project/ml-commons/tree/2.x/docs/remote_inference_blueprints).

## Before you begin

Make sure you have:

- An AWS OpenSearch domain with **fine-grained access control** enabled.
- Admin access to OpenSearch Dashboards.
- AWS CLI configured locally.
- An IAM user with permissions to create roles, policies, and access Secrets Manager.
- A Cohere API key.

## Create an IAM policy

1. Go to **IAM → Policies → Create Policy**.
2. Select **JSON** and paste the following:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PassRoleAccess",
         "Effect": "Allow",
         "Action": "iam:PassRole",
         "Resource": "arn:aws:iam::<aws-account-number>:role/plane-opensearch-access-role"
       },
       {
         "Sid": "SecretManagerAccess",
         "Effect": "Allow",
         "Action": ["secretsmanager:GetSecretValue", "secretsmanager:DescribeSecret", "secretsmanager:ListSecrets"],
         "Resource": "*"
       }
     ]
   }
   ```

3. Click **Next**, name the policy `plane-opensearch-access-policy`, and click **Create Policy**.

## Create an IAM role

Create an IAM role that OpenSearch can assume to access Secrets Manager.

1. Go to **IAM → Roles → Create Role**.
2. Name the role `plane-opensearch-access-role`.
3. Set this **Trust Relationship**:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
           "Service": "ec2.amazonaws.com"
         },
         "Action": "sts:AssumeRole"
       },
       {
         "Effect": "Allow",
         "Principal": {
           "AWS": "arn:aws:iam::<aws-account-number>:user/<opensearch-user>"
         },
         "Action": "sts:AssumeRole"
       }
     ]
   }
   ```

4. Attach the `plane-opensearch-access-policy` you created in Step 1.
5. Click **Create Role** and note the role ARN.

## Grant ML permissions to the IAM role

1. Open **OpenSearch Dashboards**.
2. Go to **Security → Roles → `ml_full_access`**.
3. Open the **Mapped users** tab and click **Map users**.
4. Under **Backend roles**, add the role ARN:

   ```
   arn:aws:iam::<aws-account-number>:role/plane-opensearch-access-role
   ```

## Assume the role locally

Run this command to get temporary credentials:

```bash
aws sts assume-role \
  --role-arn arn:aws:iam::<aws-account-number>:role/plane-opensearch-access-role \
  --role-session-name session
```

Export the credentials from the response:

```bash
export AWS_ACCESS_KEY_ID=<AccessKeyId>
export AWS_SECRET_ACCESS_KEY=<SecretAccessKey>
export AWS_SESSION_TOKEN=<SessionToken>
```

## Store the Cohere API key in Secrets Manager

1. Go to **Secrets Manager → Store a new secret**.
2. Select **Other type of secret**.
3. Set the key to `azure_ai_foundry_key_cohere` and the value to your Cohere API key.
4. Click **Next**, name the secret `plane-ai/cohere`, and click **Store**.
5. Note the **Secret ARN** — you'll need it in the next step.

## Create a Cohere connector in OpenSearch

Using the temporary credentials from Step 4, send a `POST` request to your OpenSearch cluster.

**Endpoint:** `POST https://<opensearch-domain>/_plugins/_ml/connectors/_create`

**Request body:**

```json
{
  "name": "Cohere",
  "description": "Cohere embedding connector",
  "version": "1",
  "protocol": "http",
  "parameters": {
    "endpoint": "https://azureaitrials-resource.services.ai.azure.com/models",
    "model": "embed-v-4-0",
    "api_version": "2024-05-01-preview",
    "input_type": "search_document",
    "truncate": "END"
  },
  "credential": {
    "secretArn": "<cohere-secret-arn>",
    "roleArn": "arn:aws:iam::<aws-account-number>:role/plane-opensearch-access-role"
  },
  "actions": [
    {
      "action_type": "predict",
      "method": "POST",
      "url": "${parameters.endpoint}/embeddings?api-version=${parameters.api_version}",
      "headers": {
        "api-key": "${credential.secretArn.azure_ai_foundry_key_cohere}",
        "x-ms-model-mesh-model-name": "embed-v-4-0"
      },
      "request_body": "{ \"texts\": ${parameters.texts}, \"truncate\": \"${parameters.truncate}\", \"model\": \"${parameters.model}\", \"input_type\": \"${parameters.input_type}\" }",
      "pre_process_function": "connector.pre_process.cohere.embedding",
      "post_process_function": "connector.post_process.cohere.embedding"
    }
  ]
}
```

Save the `connector_id` from the response.

## Configure the OpenSearch cluster

Run these commands in **Dev Tools** in OpenSearch Dashboards.

### Allow the connector's external endpoints

```json
PUT /_cluster/settings
{
  "persistent": {
    "plugins.ml_commons.trusted_connector_endpoints_regex": [
      "^https://api\\.cohere\\.ai(/.*)?$",
      "^https://azureaitrials-resource\\.services\\.ai\\.azure\\.com(/.*)?$"
    ]
  }
}
```

### Register the embedding model

```json
POST /_plugins/_ml/models/_register
{
  "name": "cohere_4_0_embed",
  "function_name": "remote",
  "connector_id": "<connector-id>",
  "description": "Cohere Embedding Model"
}
```

Save the `model_id` from the response.

### Deploy the model

```
POST /_plugins/_ml/models/<model_id>/_deploy
```

### Verify deployment status

```
GET /_plugins/_ml/models/<model_id>
```

Wait until the response shows:

```json
"model_state": "DEPLOYED"
```

### Test inference (optional)

```json
POST /_plugins/_ml/models/<model_id>/_predict
{
  "parameters": {
    "inputs": ["hello world"]
  }
}
```

## Configure Plane

Add the deployed model ID and configuration to `/opt/plane/plane.env`:

```bash
OPENSEARCH_ML_MODEL_ID=<model_id>
EMBEDDING_MODEL=cohere/embed-v4.0
OPENSEARCH_EMBEDDING_DIMENSION=1536
```

Restart Plane and complete the remaining steps in [Configure embedding model](/self-hosting/govern/plane-ai/configure-embedding-model).
