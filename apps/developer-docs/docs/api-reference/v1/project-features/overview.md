---
title: Overview
description: Plane Project Features API overview. Learn how to inspect and update project feature flags with the Plane API.
keywords: plane, plane api, rest api, api integration, project features, feature flags
---

# Overview

Project features control which project-level capabilities are enabled for an individual project.

[Learn more about Projects](https://docs.plane.so/core-concepts/projects/overview)

<div class="api-two-column">
<div class="api-left">

## The Project Feature Object

### Attributes

- `epics` _boolean_

  Epics.

- `modules` _boolean_

  Modules.

- `cycles` _boolean_

  Cycles.

- `views` _boolean_

  Views.

- `pages` _boolean_

  Pages.

- `intakes` _boolean_

  Intakes.

- `work_item_types` _boolean_

  Work item types.

</div>
<div class="api-right">

<ResponsePanel status="200" title="THE PROJECT FEATURE OBJECT">

```json
{
  "epics": true,
  "modules": true,
  "cycles": true,
  "views": true,
  "pages": true,
  "intakes": true,
  "work_item_types": true
}
```

</ResponsePanel>

</div>
</div>
