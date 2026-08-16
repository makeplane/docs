---
title: Configure external secrets for Kubernetes deployments
description: Use external secrets operators with Plane on Kubernetes. Integrate AWS Secrets Manager, HashiCorp Vault, or Azure Key Vault for secure configuration.
keywords: plane external secrets, kubernetes secrets, vault integration, aws secrets manager, secret management, self-hosting
---

# Configure external secrets for Kubernetes deployments

This guide explains how to integrate Plane with external secret management solutions, enabling secure and centralized management of sensitive configuration data. The examples provided cover AWS Secrets Manager and HashiCorp Vault integrations, but you can adapt these patterns to your preferred secret management solution.

## AWS Secrets Manager

1. Create a dedicated IAM user (e.g., `external-secret-access-user`). You can uncheck **Console Access Required**.
2. Generate `ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` and keep them handy.
3. Note the user's ARN for later use (format: `arn:aws:iam::<account-id>:user/<user-name>`).

4. Create IAM policy (e.g., `external-secret-access-policy`) with the following JSON:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "secretsmanager:GetResourcePolicy",
           "secretsmanager:GetSecretValue",
           "secretsmanager:DescribeSecret",
           "secretsmanager:ListSecretVersionIds"
         ],
         "Resource": ["arn:aws:secretsmanager:<REGION>:<ACCOUNT-ID>:secret:*"]
       }
     ]
   }
   ```

   Replace `<REGION>` and `<ACCOUNT-ID>` with your AWS region and account ID.

5. Create IAM role (e.g., external-secret-access-role) with the following trust relationship:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
           "AWS": "<IAM-USER-ARN>"
         },
         "Action": "sts:AssumeRole"
       }
     ]
   }
   ```

   Replace `<IAM-USER-ARN>` with the ARN of the user created in step 1.

6. Attach the AWS IAM policy created in step 4 to the IAM role.

7. Create secrets in AWS Secrets Manager with your Plane configuration values. For example, store RabbitMQ credentials with a name like `prod/secrets/rabbitmq`.

   | Key                   | Value    |
   | --------------------- | -------- |
   | RABBITMQ_DEFAULT_USER | plane    |
   | RABBITMQ_DEFAULT_PASS | plane123 |

   Follow this pattern to manage all the [environment variables](/self-hosting/methods/kubernetes#external-secrets-config) in AWS Secrets Manager.

8. Create a Kubernetes secret containing AWS credentials in your application namespace:

   ```sh
   kubectl create secret generic aws-creds-secret \
   --from-literal=access-key=<AWS_ACCESS_KEY_ID> \
   --from-literal=secret-access-key=<AWS_SECRET_ACCESS_KEY> \
   -n <application_namespace>
   ```

9. Apply the following YAML to create a ClusterSecretStore resource:

   ```yaml
   apiVersion: external-secrets.io/v1
   kind: ClusterSecretStore
   metadata:
     name: cluster-aws-secretsmanager
     namespace: <application_namespace>
   spec:
     provider:
       aws:
         service: SecretsManager
         role: arn:aws:iam::<ACCOUNT-ID>:role/<IAM ROLE>
         region: eu-west-1
         auth:
           accessKeyIDSecretRef:
             name: aws-creds-secret
             key: access-key
           secretAccessKeySecretRef:
             name: aws-creds-secret
             key: secret-access-key
   ```

   Replace `<ACCOUNT-ID>` and `<IAM ROLE>` with your AWS account ID and the role name created in Step 5.

10. Create an ExternalSecret resource to fetch secrets from AWS and create a corresponding Kubernetes secret:
    ```yaml
    apiVersion: external-secrets.io/v1
    kind: ExternalSecret
    metadata:
      name: rabbitmq-external-secrets
      namespace: <application_namespace>
    spec:
      refreshInterval: 1m
      secretStoreRef:
        name: cluster-aws-secretsmanager # ClusterSecretStore name
        kind: ClusterSecretStore
      target:
        name: rabbitmq-secret # Target Kubernetes secret name
        creationPolicy: Owner
      data:
        - secretKey: RABBITMQ_DEFAULT_USER
          remoteRef:
            key: prod/secrets/rabbitmq
            property: RABBITMQ_DEFAULT_USER
        - secretKey: RABBITMQ_DEFAULT_PASS
          remoteRef:
            key: prod/secrets/rabbitmq
    ```

Make sure to set all [environment variables](/self-hosting/methods/kubernetes#external-secrets-config) in the AWS Secrets Manager, and then access them via ExternalSecret resources in your Kubernetes cluster.

## HashiCorp Vault

1. Access the Vault UI at `https://<vault-domain>/`.

2. Set up a KV secrets engine if not already configured.

3. Create a secret with your Plane configuration values (e.g., `secrets/rabbitmq_secrets`). For this example, we're setting up RabbitMQ credentials:

   | Key                   | Value    |
   | --------------------- | -------- |
   | RABBITMQ_DEFAULT_USER | plane    |
   | RABBITMQ_DEFAULT_PASS | plane123 |

   Follow this pattern to manage all the other [environment variables](/self-hosting/methods/kubernetes#external-secrets-config) in the Vault.

4. Create a Kubernetes secret containing your Vault token in your application namespace:

   ```sh
   kubectl create secret generic vault-token -n <application_namespace> --from-literal=token=<VAULT-TOKEN>
   ```

5. Apply the following YAML to create a ClusterSecretStore resource:

   ```yaml
   apiVersion: external-secrets.io/v1
   kind: ClusterSecretStore
   metadata:
     name: vault-backend
     namespace: <application_namespace>
   spec:
     provider:
       vault:
         server: "https://<vault-domain>" # the address of your vault instance
         path: "secrets" # path for accessing the secrets
         version: "v2" # Vault API version
         auth:
           tokenSecretRef:
             name: "vault-token" # Use a k8s secret called vault-token
             key: "token" # Use this key to access the vault token
   ```

   Replace `<vault-domain>` with your Vault server address.

6. Create an ExternalSecret resource to fetch secrets from Vault and create a corresponding Kubernetes secret:
   ```yaml
   apiVersion: external-secrets.io/v1
   kind: ExternalSecret
   metadata:
     name: rabbitmq-external-secrets
     namespace: <application_namespace> # application-namespace
   spec:
     refreshInterval: "1m"
     secretStoreRef:
       name: vault-backend # ClusterSecretStore name
       kind: ClusterSecretStore
     target:
       name: rabbitmq-secret # Target Kubernetes secret name
       creationPolicy: Owner
     data:
       - secretKey: RABBITMQ_DEFAULT_USER
         remoteRef:
           key: secrets/data/rabbitmq_secrets
           property: RABBITMQ_DEFAULT_USER
       - secretKey: RABBITMQ_DEFAULT_PASS
         remoteRef:
           key: secrets/data/rabbitmq_secrets
   ```

Follow this pattern to manage all the environment variables in the Vault, then access them via ExternalSecret resources in your Kubernetes cluster.
