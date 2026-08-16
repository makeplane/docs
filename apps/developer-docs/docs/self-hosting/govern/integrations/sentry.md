---
title: Configure Sentry for Plane integration
description: Connect Sentry error monitoring to your self-hosted Plane instance. Automatically create work items from Sentry alerts and track error resolution.
keywords: plane sentry integration, error tracking, sentry alerts, bug tracking, error monitoring, self-hosting, plane devops
---

# Configure Sentry for Plane integration <Badge type="info" text="Pro" />

This guide shows you how to set up Sentry integration for your self-hosted Plane instance. Unlike Plane Cloud where Sentry comes pre-configured, self-hosted instances require you to create a custom integration in Sentry and configure your Plane deployment with the necessary credentials.

::: info
**What you'll accomplish:**

1. Create a Sentry custom integration with proper permissions and webhooks
2. Configure your Plane instance with Sentry credentials
3. Enable error tracking and automatic issue creation from Sentry alerts
   :::

## Before you begin

You'll need:

- Administrator access to your Sentry organization
- Access to your Plane instance configuration files
- Your Plane instance domain (e.g., `plane.yourcompany.com`)

## Create Sentry custom integration

A custom integration (also called a public integration) connects your Sentry organization to Plane, enabling bidirectional communication for issue tracking and alert handling.

1. Log in to your Sentry organization.
2. Go to **Settings** → **Developer Settings** → **Custom Integrations**.
3. Click **Create New Integration**.
4. Select **Public Integration**.
5. Fill in these fields on the integration creation screen:

   | Field                   | Value                                                       |
   | ----------------------- | ----------------------------------------------------------- |
   | **Name**                | `Plane` (or any name you prefer)                            |
   | **Author**              | Your organization name                                      |
   | **Webhook URL**         | `https://[YOUR_DOMAIN]/silo/api/sentry/sentry-webhook/`     |
   | **Redirect URL**        | `https://[YOUR_DOMAIN]/silo/api/oauth/sentry/auth/callback` |
   | **Verify Installation** | Disabled (recommended)                                      |
   | **Alert Rule Action**   | Enabled                                                     |

::: tip
Replace `[YOUR_DOMAIN]` with your actual Plane instance domain. For example, if your Plane instance is at `plane.company.com`, your Webhook URL would be `https://plane.company.com/silo/api/sentry/sentry-webhook/`
:::

<!-- Image: Public integration screenshot -->

**Field explanations:**

**Webhook URL**  
Sentry sends event notifications to this endpoint. Plane processes these webhooks to sync Sentry issues with Plane work items.

**Redirect URL**  
After OAuth authorization, Sentry redirects users back to this URL to complete the connection.

**Alert Rule Action**  
Enables automatic Plane work item creation when Sentry alert rules trigger.

### Configure integration schema

The schema defines how Sentry and Plane interact—what fields appear when creating issues and how alert rules behave.

Paste this schema into the **Schema** field:

```json
{
  "elements": [
    {
      "link": {
        "uri": "/api/sentry/issues/link",
        "required_fields": [
          {
            "uri": "/api/sentry/issues",
            "name": "identifier",
            "type": "select",
            "label": "Issue",
            "skip_load_on_open": true
          }
        ]
      },
      "type": "issue-link",
      "create": {
        "uri": "/api/sentry/issues/create",
        "optional_fields": [
          {
            "uri": "/api/sentry/users",
            "name": "assignee_ids",
            "type": "select",
            "async": false,
            "label": "Assignees",
            "multiple": true,
            "depends_on": ["project_id"]
          },
          {
            "uri": "/api/sentry/priorities",
            "name": "priorities",
            "type": "select",
            "async": false,
            "label": "Priorities",
            "depends_on": ["project_id"]
          },
          {
            "uri": "/api/sentry/labels",
            "name": "labels",
            "type": "select",
            "async": false,
            "label": "Labels",
            "multiple": true,
            "depends_on": ["project_id"]
          },
          {
            "uri": "/api/sentry/states",
            "name": "state",
            "type": "select",
            "async": false,
            "label": "State",
            "depends_on": ["project_id"]
          },
          {
            "uri": "/api/sentry/modules",
            "name": "module",
            "type": "select",
            "async": false,
            "label": "Module",
            "depends_on": ["project_id"]
          },
          {
            "uri": "/api/sentry/cycles",
            "name": "cycle",
            "type": "select",
            "async": false,
            "label": "Cycle",
            "depends_on": ["project_id"]
          }
        ],
        "required_fields": [
          {
            "name": "title",
            "type": "text",
            "label": "Title",
            "default": "issue.title"
          },
          {
            "name": "description",
            "type": "textarea",
            "label": "Description",
            "default": "issue.description"
          },
          {
            "uri": "/api/sentry/projects",
            "name": "project_id",
            "type": "select",
            "async": false,
            "label": "Project"
          }
        ]
      }
    },
    {
      "type": "alert-rule-action",
      "title": "Create Plane Work Item or Intake Issue",
      "settings": {
        "uri": "/api/sentry/alert-rule",
        "type": "alert-rule-settings",
        "description": "Create a Plane Work Item or Intake Issue when an alert is triggered",
        "optional_fields": [
          {
            "uri": "/api/sentry/users",
            "name": "assignee_ids",
            "type": "select",
            "async": false,
            "label": "Assignees",
            "multiple": true,
            "depends_on": ["project_id"]
          },
          {
            "uri": "/api/sentry/states",
            "name": "state",
            "type": "select",
            "async": false,
            "label": "State",
            "depends_on": ["project_id"]
          },
          {
            "uri": "/api/sentry/labels",
            "name": "labels",
            "type": "select",
            "async": false,
            "label": "Labels",
            "multiple": true,
            "depends_on": ["project_id"]
          }
        ],
        "required_fields": [
          {
            "name": "type",
            "type": "select",
            "label": "Type",
            "options": [
              ["intake", "Intake"],
              ["work_item", "Work Item"]
            ]
          },
          {
            "uri": "/api/sentry/projects",
            "name": "project_id",
            "type": "select",
            "async": false,
            "label": "Project",
            "depends_on": ["type"]
          }
        ]
      }
    }
  ]
}
```

**What this schema enables**

**Work item linking**  
The first element defines how users create new Plane work items from Sentry or link existing ones. Required fields (title, description, project) ensure every work item has essential information. Optional fields (assignees, priority, labels, state, module, cycle) provide flexibility for detailed work item tracking.

**Alert rule actions**  
The second element enables automatic work item creation when Sentry alerts fire. You can configure whether alerts create regular work items or intake work items for triage, and set default assignees, states, and labels.

### Set permissions

Configure these permissions to allow Sentry to interact with Plane appropriately:

| Permission        | Access Level | Why This Matters                                             |
| ----------------- | ------------ | ------------------------------------------------------------ |
| **Project**       | Read         | Access project details, tags, and debug files from Sentry    |
| **Team**          | Read         | Retrieve team member lists for assignee dropdowns            |
| **Release**       | No Access    | Not required for Plane integration                           |
| **Distribution**  | No Access    | Not required for Plane integration                           |
| **Issue & Event** | Read & Write | Create and link issues, sync status updates bidirectionally  |
| **Organization**  | Read         | Resolve organization IDs and retrieve repository information |
| **Member**        | Read         | Access member details for assignee functionality             |
| **Alerts**        | Read         | Enable alert rule actions for automatic issue creation       |

<!-- Image: Sentry integration permissions screenshot -->

### Enable webhooks

Webhooks keep Plane and Sentry synchronized. When issues change in Sentry, Plane receives notifications and updates accordingly.

Enable the **issue** webhook with these events:

| Event          | Why It's Needed                                                |
| -------------- | -------------------------------------------------------------- |
| **created**    | Notify Plane when new Sentry issues are detected               |
| **resolved**   | Update linked Plane work items when Sentry issues are resolved |
| **assigned**   | Sync assignee changes from Sentry to Plane                     |
| **archived**   | Reflect archived status in Plane                               |
| **unresolved** | Update Plane when resolved issues reopen                       |

<!-- Image: Sentry webhook configuration screenshot -->

### Save and retrieve credentials

After saving your integration, Sentry generates OAuth credentials:

- **Client ID** - A public identifier for your integration
- **Client Secret** - A private key used to authenticate API requests

::: warning
**Important**
The Client Secret is only displayed once immediately after creating the integration. Copy it now and store it securely. If you lose it, you'll need to regenerate the integration.
:::

Copy both the Client ID and Client Secret. You'll need these in the next step.

## Configure your Plane instance

Add Sentry credentials to your Plane instance so it can communicate with Sentry's API.

### Locate your configuration file

**For Docker deployments:**

- Edit `plane.env` in your Plane installation directory

**For Kubernetes deployments:**

- Edit your `custom-values.yaml` file or ConfigMap containing environment variables

### Add environment variables

Add these variables to your Plane configuration:

**For Docker (`plane.env`):**

```bash
# Sentry Integration
SENTRY_BASE_URL=https://sentry.io
SENTRY_CLIENT_ID=<your_client_id>
SENTRY_CLIENT_SECRET=<your_client_secret>
SENTRY_INTEGRATION_SLUG=plane
```

**For Kubernetes (`custom-values.yaml`):**

```yaml
env:
  silo_envs:
    sentry_base_url: "https://sentry.io"
    sentry_client_id: "<your_client_id>"
    sentry_client_secret: "<your_client_secret>"
    sentry_integration_slug: "plane"
```

Replace `<your_client_id>` and `<your_client_secret>` with the credentials from Step 1.

### Environment variable reference

| Variable                  | Required | Default             | Description                                                                                                                                                                     |
| ------------------------- | -------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SENTRY_BASE_URL`         | No       | `https://sentry.io` | Base URL of your Sentry instance. For self-hosted Sentry, use your Sentry domain (e.g., `https://sentry.company.com`)                                                           |
| `SENTRY_CLIENT_ID`        | Yes      | -                   | Client ID from your Sentry custom integration                                                                                                                                   |
| `SENTRY_CLIENT_SECRET`    | Yes      | -                   | Client Secret from your Sentry custom integration (only shown once during creation)                                                                                             |
| `SENTRY_INTEGRATION_SLUG` | No       | -                   | The slug identifier for your integration. Find this in your integration's URL: `https://org.sentry.io/settings/developer-settings/plane-local` (here `plane-local` is the slug) |

::: info
**Using self-hosted Sentry?**  
If you're running your own Sentry instance, change `SENTRY_BASE_URL` to your Sentry domain. All other configuration remains the same.
:::

### Restart Plane

Apply the configuration changes:

**For Docker:**

```bash
docker compose down
docker compose up -d
```

**For Kubernetes:**

```bash
helm upgrade plane-app plane-enterprise.tgz \
  --namespace plane \
  -f custom-values.yaml
```

## Activate integration in your workspace

Once you’ve completed the instance configuration, [activate the Sentry integration](https://docs.plane.so/integrations/sentry#set-up-sentry-integration) in Plane.

For questions about Sentry integration, contact [support@plane.so](mailto:support@plane.so).
