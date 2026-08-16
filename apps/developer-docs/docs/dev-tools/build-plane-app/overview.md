---
title: Build a Plane App
description: Build and integrate an app with Plane using OAuth 2.0 authentication. Covers bot tokens, user tokens, webhooks, and API access for custom integrations.
keywords: build plane app, plane oauth app, plane integration, plane api app, oauth 2.0 plane, plane developer platform, custom plane integration, plane third-party app
---

# Build a Plane app

::: info
Plane apps are currently in **Beta**. Please send any feedback to support@plane.so.
:::

## Overview

Plane uses OAuth 2.0 to allow applications to access workspace data on behalf of users or as an autonomous bot. This comprehensive guide covers everything you need to build, integrate, and deploy apps that extend Plane's functionality.

## What you can build

Plane apps enable you to:

- **AI Agents** - Create intelligent agents that respond to @mentions in work item comments
- **Workflow Automation** - Build bots that automate repetitive tasks across your workspace
- **Integrations** - Connect Plane with external tools and services
- **Custom Dashboards** - Build analytics and reporting tools using Plane's data
- **Webhook Handlers** - React to events in real-time as they happen in Plane

## Key concepts

### OAuth 2.0 flows

Plane supports two authentication flows:

- **Bot Token Flow** (Client Credentials) - For autonomous apps, agents, and webhooks that act independently
- **User Token Flow** (Authorization Code) - For apps that need to act on behalf of specific users

Most integrations should use the **Bot Token flow**. See [Choose Your Flow](/dev-tools/build-plane-app/choose-token-flow) for detailed implementation guides.

### App components

A complete Plane app typically includes:

1. **OAuth Application** - Registered in Plane with Client ID and Secret
2. **Setup URL** - Entry point where users begin the installation process
3. **Redirect URI** - Callback endpoint that receives authorization codes
4. **Webhook URL** - Endpoint for receiving real-time event notifications
5. **API Integration** - Code that interacts with Plane's REST API

## Getting started

Follow these steps to build your first Plane app:

### 1. Create an OAuth application

Register your app in Plane to get credentials:

- Navigate to **Workspace Settings** → **Integrations**
- Configure your app's URLs and permissions
- Store your **Client ID** and **Client Secret** securely

[Learn more →](/dev-tools/build-plane-app/create-oauth-application)

### 2. Choose your authentication flow

Decide between Bot Token or User Token based on your use case:

- **Bot Token** - For agents, webhooks, and automation
- **User Token** - For user-specific actions and permissions

[Learn more →](/dev-tools/build-plane-app/choose-token-flow)

### 3. Implement OAuth

Set up the OAuth flow to obtain access tokens:

- Redirect users to Plane's consent screen
- Handle the callback with authorization code
- Exchange code for access tokens
- Store tokens securely for API calls

[Learn more →](/dev-tools/build-plane-app/choose-token-flow)

### 4. Handle webhooks

Set up webhook handlers to receive real-time events:

- Verify webhook signatures for security
- Process events like work item updates, comments, and more
- Respond to events with automated actions

[Learn more →](/dev-tools/build-plane-app/webhooks)

## Development tools

::: tip Local Development
For local development, use [ngrok](https://ngrok.com) to expose your server:

```bash
ngrok http 3000
```

Use the generated URL (e.g., `https://abc123.ngrok.io`) for your Setup URL, Redirect URI, and Webhook URL.

Free ngrok URLs change on restart. Update your app settings when the URL changes.
:::

### Official SDKs

Speed up development with official SDKs for Node.js and Python:

- OAuth helpers for token management
- Typed API clients for all endpoints
- Built-in error handling and retries

[Learn more →](/dev-tools/build-plane-app/sdks)

### Complete examples

See full working implementations:

- TypeScript (Express) example
- Python (Flask) example
- OAuth flow, webhooks, and API integration

[Learn more →](/dev-tools/build-plane-app/examples)

## Quick links

- [API Reference](/api-reference/introduction) - Explore all available endpoints
- [Build an Agent](/dev-tools/agents/overview) - Create AI agents for Plane
- [Webhook Events](/dev-tools/intro-webhooks) - All webhook event types
