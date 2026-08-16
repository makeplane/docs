---
title: Understanding Plane's editions
description: Compare Plane Community, Pro, Business, and Enterprise editions. Understand features, pricing tiers, and version differences for self-hosted deployments.
keywords: plane editions, plane community edition, plane pro, plane enterprise, plane business, self-hosting comparison, plane pricing tiers
---

# Understanding Plane's editions

Plane comes in four editions by how its deployed. Our Cloud is our only hosted edition as of 2025. Additionally, we offer three unique self-hosted editions tailored to meet two sets of unique needs—the open-source Community Edition, the recommended Commercial Edition, and the Airgapped Edition.

## About our self-hosted editions

### Community

Built with transparency in mind, the Community Edition,

- Is governed by the AGPL v3.0 license, ensuring free and open usage

- Allows contribution to the repo by way of modifications and customizations

- Has no code dependencies or restrictions on and from the Commercial Edition

It’s ideal for those who want to try Plane first, audit the code for security, and see how each one of services works with the others. Several tens of thousands of uses have used it and a significant number have contributed to it.

The Community Edition is at par with the Free tier of the Cloud edition in its feature availability. To upgrade to paid plans, you must first switch to the Commercial Edition.

### Commercial

Designed for teams that want governance, compliance, and privacy controls, the Commercial Edition is ideal for teams that want to try Plane with an intent to unlock advanced work management and security features.

This edition also comes with a Free tier, but also lets you upgrade seamlessly to all our paid plans. It offers,

- Full feature parity with our Cloud

- A bundle of 12 Free user seats per workspace so there are no surprises when you upgrade

- An intuitive upgrade flow that automatically calculates the number of seats you need by the number of users with paid roles in your workspace, so you never have to guess

### Airgapped

Built for organizations with strict security and compliance requirements, the Airgapped Commercial Edition provides the same powerful features as the Commercial Edition but operates in completely isolated environments without internet connectivity.

The Airgapped Edition offers:

- **Complete isolation**
  Operates entirely within your network perimeter with no external dependencies or outbound connections.

- **Full feature parity**
  Includes all features available in the standard Commercial Edition, including advanced work management, security controls, and governance tools

- **Version updates**
  Updates from your own docker registry.

- **Self-contained architecture**
  All services, dependencies, and resources are bundled for deployment in restricted networks

- **Compliance-ready**
  Designed to meet requirements for environments that prohibit external network communication

## Why we separate editions

We’ve designed Plane’s editions to serve diverse user needs while staying true to the ethos of open source.

- The **Community Edition** is completely open-source, with no restrictions beyond those outlined in the [AGPL v3.0 license](https://github.com/makeplane/plane/blob/preview/LICENSE.txt). This is the edition that is now ranking at #1 in our space on GitHub.

- The **Commercial Edition** remains closed-source to offer enterprise-grade features and seamless scalability for businesses.

- The **Airgapped Edition** extends the Commercial Edition's capabilities to isolated environments, ensuring organizations with strict security requirements can still benefit from Plane's full feature set.

Unlike some open-core companies, we’ve adopted a clean separation to keep things simple and transparent. There’s no hidden code that limits modifications on the Community Edition, and no forced migrations from one edition to another.

## Differences in versions between editions

Each of our editions is built on a distinct codebase. Versions with each differ for how we ship new code per our three separate release cycles. This distinction allows us to

- Use the Cloud as a test bed for new features before they come to our self-hosted editions

- Innovate quickly on a more controlled Commercial Edition

- Be intentful and deliberate with changes to the Community Edition

For both the Commercial, Airgapped, and Community Editions, version updates are in your control. Regular updates ensure you’re benefiting from the latest features and improvements. See [Update Plane](/self-hosting/manage/upgrade-plane) for how to upgrade your versions.

## Changelog

We maintain a detailed changelog for all editions. [Check it out](https://plane.so/changelog) and bookmark it to stay informed about the latest features, bug fixes, and improvements by edition.
