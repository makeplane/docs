---
title: Overview
description: Plane Workspace Features API overview. Learn how to inspect and update workspace feature flags with the Plane API.
keywords: plane, plane api, rest api, api integration, workspace features, feature flags
---

# Overview

Workspace features control which major Plane capabilities are enabled for a workspace.

[Learn more about using the Plane API](https://developers.plane.so/api-reference/introduction)

<div class="api-two-column">
<div class="api-left">

## The Workspace Feature Object

### Attributes

- `project_grouping` _boolean_

  Project grouping.

- `initiatives` _boolean_

  Initiatives.

- `teams` _boolean_

  Teams.

- `customers` _boolean_

  Customers.

- `wiki` _boolean_

  Wiki.

- `pi` _boolean_

  Pi.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE WORKSPACE FEATURE OBJECT">

```json
{
  "project_grouping": true,
  "initiatives": true,
  "teams": true,
  "customers": true,
  "wiki": true,
  "pi": true
}
```

</ResponsePanel>

</div>
</div>
