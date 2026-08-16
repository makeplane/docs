---
title: Storage errors
description: Troubleshoot Plane storage and upload errors. Fix S3, MinIO, and file upload issues for self-hosted Plane instances.
keywords: plane storage errors, s3 errors, minio issues, file upload errors, storage troubleshooting, plane uploads, self-hosting
---

# Storage errors

This guide is designed to help you resolve common issues encountered while configuring storage in Plane. Each section includes potential causes and step-by-step solutions for identified problems.

## Bucket policy exceeds size limit

<div style="color: red"> 
    Error: An error occurred (PolicyTooLarge) when calling the PutBucketPolicy operation: Policy exceeds the maximum allowed document size.
</div>

This error occurs when the bucket policy exceeds the 20KB size limit allowed by MinIO. It typically happens when trying to add complex policies or when unnecessary data bloats the policy size.

To resolve this issue, you can define a streamlined bucket policy file and apply it correctly within the MinIO container. Follow these steps:

1. **Create a bucket policy JSON file**
   - On your local machine, create a file named `bucket-policy.json` with the following content:

     ```json
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Effect": "Allow",
           "Principal": {
             "AWS": ["*"]
           },
           "Action": ["s3:GetObject"],
           "Resource": ["arn:aws:s3:::uploads/*"],
           "Condition": {
             "StringEquals": {
               "s3:ExistingObjectTag/publicAccess": ["true"]
             }
           }
         }
       ]
     }
     ```

   - Save this file in an accessible location.

2. **Set up and apply the policy**  
   ::: warning
   **IMPORTANT**  
   Make sure to execute all the `mc` commands **within the MinIO container** (either by attaching to it or using `docker exec`).
   :::

- Configure MinIO alias:

```bash
mc alias set myminio http://plane-plane-minio:9000 <minio-username> <minio-password>
```

Replace `plane-plane-minio:9000` with your MinIO server address.

- Tag existing objects:

```bash
mc find myminio/uploads --exec "mc tag set {} publicAccess=true"
```

- Copy the policy file to the MinIO container:

```bash
docker cp bucket-policy.json <minio-container-id>:/tmp
```

Replace `<minio-container-id>` with the actual ID of your MinIO container. You can find the container ID by running `docker ps`.

- Apply the policy to the bucket:

```bash
mc anonymous set-json /tmp/bucket-policy.json myminio/uploads
```

3. **Verification**
   - Verify that objects are correctly tagged:

     ```bash
     mc tag list myminio/uploads/<object-name>
     ```

   - Test public access using:
     ```bash
     curl http://<minio-server>:9000/uploads/<object-name>
     ```

### Notes

- Verify that the `access-key` and `secret-key` used for setting up the alias have adequate permissions to manage the bucket.
- If your MinIO server is hosted on a different machine or address, replace `plane-plane-minio:9000` with the appropriate server URL.
- After applying the policy, test the setup to confirm it is working as expected.
