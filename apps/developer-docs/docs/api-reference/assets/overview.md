---
title: Overview
description: Plane Assets API overview. Learn how user and workspace asset uploads work through the Plane API.
keywords: plane, plane api, rest api, api integration, assets, uploads, files
---

# Overview

Assets let you upload and manage files used across user profiles and workspaces, including images and other binary resources.

[Learn more about using the Plane API](https://developers.plane.so/api-reference/introduction)

<div class="api-two-column">
<div class="api-left">

## The Asset Object

### Attributes

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE ASSET OBJECT">

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "design-spec.pdf",
  "type": "application/pdf",
  "asset_url": "https://cdn.example.com/workspace-assets/design-spec.pdf",
  "attributes": {
    "entity_type": "WORKSPACE"
  }
}
```

</ResponsePanel>

</div>
</div>
