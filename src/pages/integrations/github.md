---
title: GitHub Sync
pageTitle: GitHub Sync | Plane
description: GitHub Sync allows users to connect any GitHub repository to a Plane project, enabling cross-synchronization of issues between Plane and GitHub in both directions.
---

GitHub Sync allows users to connect any GitHub repository to a Plane project,
enabling cross-synchronization of issues between Plane and GitHub in both
directions.

By connecting a GitHub repository to a Plane project, users can easily track
issues and changes in both platforms. This allows for a more streamlined
workflow, as users can manage their GitHub issues and pull requests from
within the Plane platform.

The bi-directional synchronization means that changes made in either platform
will be reflected in the other. For example, if a user creates a new issue in
Plane, it will automatically be synced with the corresponding repository in
GitHub. Similarly, if a user closes an issue in GitHub, it will be reflected
in Plane as well.

{% callout type="note" %}
Plane is still in development, if there are any hiccups in
Integrations, please report them to us on our [Discord server]() or [Github issues]().
{% /callout %}

## Plane to Github Synchronization Overivew

![Connect workspace](https://ik.imagekit.io/rdws4iz4v/Plane_Arch__1_.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677529077471)

## Configure GitHub Integration

**1.** Install and authenticate GitHub Sync
{% callout type="note" %}
Obviously, GitHub Sync requires you to authenticate with your account
to add the Plane GitHub application.
Also, if you want to use GitHub Sync in an organization, you may need to
ask an admin to allow Plane to access the organization, or do that yourself:
Organization settings => GitHub Apps (_enter sudo mode_) => approve the request for the Plane integration.
{% /callout %}

![Add GitHub Sync to your project](https://ik.imagekit.io/rdws4iz4v/ezgif-2-c71e43f5de.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1677526036094)

**2.** Connect GitHub repository with project

![Connect the repo to your project](https://ik.imagekit.io/rdws4iz4v/ezgif-2-cea843f5f8.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1677526558466)

**3.** Create a new one or use an existing issue on Plane

![Find or create an issue](https://ik.imagekit.io/rdws4iz4v/ezgif-5-71aa60e87f.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1677527704371)

**4.** Add the `GitHub` label to Plane issue (Plane -> GitHub)

![GitHub label on Plane issue](https://ik.imagekit.io/rdws4iz4v/ezgif-5-58a5ac3b67.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1677527944556)

**5.** Add the `Plane` label to GitHub issue (GitHub -> Plane)

![Plane label on GitHub issue](https://ik.imagekit.io/rdws4iz4v/ezgif-5-ccce270df6.gif?ik-sdk-version=javascript-1.4.3&updatedAt=1677528064644)
