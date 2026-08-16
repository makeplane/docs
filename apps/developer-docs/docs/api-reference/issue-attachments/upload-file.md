---
title: Upload file
description: Upload a file to the presigned storage URL returned by Plane. Includes the required multipart form fields for attachment uploads.
keywords: plane, plane api, rest api, api integration, attachments, uploads, s3
---

# Upload file

<div class="api-endpoint-badge">
  <span class="method post">POST</span>
  <span class="path">https://planefs-uploads.s3.amazonaws.com/</span>
</div>

<div class="api-two-column">
<div class="api-left">

Use the presigned form fields returned by the attachment upload-credentials endpoint to upload the binary file directly to object storage.

<div class="params-section">

### Body Parameters

<div class="params-list">

<ApiParam name="Content-Type" type="string" :required="true">

MIME type of the file being uploaded.

</ApiParam>

<ApiParam name="key" type="string" :required="true">

Storage key returned by Plane for this upload.

</ApiParam>

<ApiParam name="policy" type="string" :required="true">

Base64-encoded upload policy returned by Plane.

</ApiParam>

<ApiParam name="x-amz-signature" type="string" :required="true">

AWS signature returned by Plane.

</ApiParam>

<ApiParam name="file" type="file" :required="true">

Binary file contents to upload.

</ApiParam>

</div>
</div>

</div>
<div class="api-right">

<CodePanel title="Upload file" :languages="['cURL', 'Python', 'JavaScript']">
<template #curl>

```bash
curl -X POST \
  "https://planefs-uploads.s3.amazonaws.com/" \
  -F "Content-Type=image/png" \
  -F "key=attachments/550e8400-e29b-41d4-a716-446655440000/example-image.png" \
  -F "policy=example-policy" \
  -F "x-amz-signature=example-signature" \
  -F "file=@./example-image.png"
```

</template>
<template #python>

```python
import requests

with open("example-image.png", "rb") as file_handle:
    response = requests.post(
"https://planefs-uploads.s3.amazonaws.com/",
files={"file": file_handle},
data={
    "Content-Type": "image/png",
    "key": "attachments/550e8400-e29b-41d4-a716-446655440000/example-image.png",
    "policy": "example-policy",
    "x-amz-signature": "example-signature",
},
    )
print(response.status_code)
```

</template>
<template #javascript>

```javascript
const formData = new FormData();
formData.append("Content-Type", "image/png");
formData.append("key", "attachments/550e8400-e29b-41d4-a716-446655440000/example-image.png");
formData.append("policy", "example-policy");
formData.append("x-amz-signature", "example-signature");
formData.append("file", fileInput.files[0]);

const response = await fetch("https://planefs-uploads.s3.amazonaws.com/", {
  method: "POST",
  body: formData,
});
```

</template>
</CodePanel>

<ResponsePanel status="204">

No response body.

</ResponsePanel>

</div>
</div>
