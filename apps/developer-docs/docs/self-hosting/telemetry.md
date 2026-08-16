---
title: Data collection and usage
description: Understand what telemetry data Plane collects, how it is used, and how to opt out. Privacy-focused data collection for self-hosted instances.
keywords: plane telemetry, data collection, plane privacy, analytics opt-out, plane usage data, self-hosted privacy
---

# Data collection and usage

Plane collects anonymized data to enhance your user experience, ensure product stability, and drive continuous improvements. This article talks about what we collect, what we don't, and how we use collected data.

## What Plane collects

With the exception of the instance admin's email address on self-hosted Plane, we don't collect any personally identifiable information (PII). All usage data is anonymized and isn't connected to individual users.

### Instance admin details

Plane collects just the instance admin's name and email to communicate essential upgrade news, security alerts, and other critical notifications.

### Instance setup

When an instance is created, Plane collects just the instance ID so we can track upgrades and troubleshoot paid features.

### Usage for billing

Plane tracks the number of workspaces, members, and roles to bill you correctly and ensure accurate reporting in your workspace's **Billing and plans** screen and the Prime portal.

### Application data

Plane tracks anonymized workspace activity, including but not limited to the number of projects, issues, cycles, modules, comments, issue types, custom properties, timesheet downloads, active importers, and integrations. This data helps us understand product usage, adoption, and build new features.

### User interaction and behavior

Plane collects anonymized data for how you work with Plane when creating, updating, or deleting Plane entities, including but not restricted to projects, issues, cycles, modules, and others. This data helps us understand user journeys, pain points, and overall behavior.

### Performance data

Plane collects machine configurations, environment details, OS flavors, network throughput, and stack traces to help troubleshoot and prevent performance hiccups.

## Data sample

```json
{
  "Created At": "October 7, 2024, 1:50 PM",
  "Page Count": "14",
  "Is Telemetry Enabled": "true",
  "Updated At": "October 7, 2024, 1:50 PM",
  "User Count": "97",
  "Cycle Count": "62",
  "Cycle Issue Count": "710",
  "Module Issue Count": "428",
  "ID": "1234567890",
  "Updated By ID": null,
  "Current Version": "0.23.0",
  "Issue Count": "2,000",
  "Instance ID": "1234567890",
  "Latest Version": "0.23.0",
  "Module Count": "81",
  "Name": "Test",
  "Workspace Count": "11",
  "Project Count": "20"
}
```

## How we use the data

- **Improving your experience**  
  Analyzing real-world usage guides us in making Plane more intuitive and user-friendly.

- **Detecting and fixing bugs**  
  Identifying bugs and errors as they occur enables us to quickly investigate and fix issues, minimize downtime, and improve product performance.

- **Enhancing security**  
  Monitoring for abnormal patterns helps us identify and mitigate potential security threats or vulnerabilities, ensuring data protection and platform integrity.

- **Driving product decisions**  
  Understanding how you interact with Plane helps us prioritize future developments and focus on high-impact features and improvements that drive better outcomes.

## Disable telemetry

As much as we'd love to understand your usage better, we agree that you should be in control of your data. If for any reason you don't want to send us that data, you can turn telemetry collection off in three clicks.

1. Go to your instance's God Mode by appending `/god-mode` to the domain you have hosted Plane on.
2. In the **General Settings** pane on the right, disable the **Telemetry** toggle button.
   ![Disable telemetry](/images/disable-telemetry.webp#hero)
3. Click **Save changes**.
