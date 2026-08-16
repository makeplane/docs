---
title: Switch from public to private buckets • Commercial Edition
description: Switch Plane storage from public to private S3 buckets. Secure file uploads with signed URLs and access control for commercial editions.
keywords: plane private bucket, s3 private storage, signed urls, secure file uploads, storage migration, self-hosting, plane storage security
---

# Switch from public to private buckets • Commercial Edition

::: warning
Starting with v1.4.0 of the Commercial edition Plane will use private storage buckets for any file uploaded to your Plane instance.
:::

::: info
New installations with default storage, which is MiniO, don't need to change anything. For S3 or S3-compatible storage, please see [this](https://developers.plane.so/self-hosting/govern/database-and-storage).
:::

While you can use the current public storage paradigm that Plane has followed so far, we highly recommend you migrate to private storage buckets which ensure greater security and give you more control over how files are accessed.

::: info
To keep public storage on external S3 compatible services, you still have to update your CORS policy.
:::

See the instructions to switch to private storage by the provider you use below.

## For default MinIO storage

Simply run the command ↓.

```bash
docker exec -it <api_container> python manage.py update_bucket
```

A successful run keeps any public files you already have accessible while moving you to private storage.

## For external storage • S3 or S3 compatible

There are two parts to this—updating your CORS policy and then switching to private storage.

### Update bucket's CORS policy

::: warning
This step is critical if you are using external storage to ensure continued functionality.
:::

Here’s a sample CORS policy for your reference. Just replace `<YOUR_DOMAIN>` with your actual domain and apply the policy to your bucket.

```bash
[
    {
        "AllowedHeaders": [
                "*"
        ],
        "AllowedMethods": [
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "HEAD"
        ],
        "AllowedOrigins": [
            "<YOUR_DOMAIN>",
        ],
        "ExposeHeaders": [
            "ETag",
            "x-amz-server-side-encryption",
            "x-amz-request-id",
            "x-amz-id-2"
        ],
        "MaxAgeSeconds": 3000
    }
]
```

### Switch to private storage

::: warning
Don't start from here if you haven't updated your CORS policy.
:::

To migrate from public to private bucket storage, follow the instructions below:

1. First, make sure you have the following permissions on your S3 bucket. If you don't, make changes to get those permissions on your bucket first.
   - **s3:GetObject**  
     So you can access your public files so far To access existing objects publicly

   - **s3:ListBucket**  
     So you can apply policies to your bucket for public access

   - **s3:PutObject**  
     So you can create new files

   - **s3:PutBucketPolicy**  
     So you can update your buckets' policy

2. Now, run the command ↓.

   ```bash
   docker exec -it <api_container> python manage.py update_bucket
   ```

   ::: tip
   1. If the command finds the necessary permissions missing, it will generate a `permissions.json` file which you can use to update your bucket policy manually. Here’s how the `permissions.json` file should look.

   ```bash
       {
       "Version": "2012-10-17",
       "Statement": [
           {
           "Effect": "Allow",
           "Principal": "*",
           "Action": "s3:GetObject",
           "Resource": [
               "arn:aws:s3:::<bucket_name>/<object_1>",
               "arn:aws:s3:::<bucket_name>/<object_2>"
           ]
           }
       ]
       }
   ```

   2. To copy the `permissions.json` file to the local machine, run the command ↓.

   ```bash
   docker cp <api_container>:/code/permissions.json .
   ```

   :::

## Troubleshoot

- [Bucket policy exceeds size limit](/self-hosting/troubleshoot/storage-errors#bucket-policy-exceeds-size-limit)
