---
title: Building an Agent
description: Step-by-step guide to creating a Plane agent, including OAuth setup, webhook handling, and activity creation.
keywords: build plane agent, plane agent tutorial, oauth agent setup, plane webhook handler, agent activity api, plane bot development, ai agent integration
---

# Building an agent

::: info
Plane Agents are currently in **Beta**. Please send any feedback to support@plane.so.
:::

## Prerequisites

Before building an agent, make sure you have completed the following:

1. **Build a Plane app** — Follow the [Build a Plane App](/dev-tools/build-plane-app/overview) guide to understand OAuth flows, deployment, and webhook handling.

2. **Get your bot token** — Complete the [Bot Token Flow](/dev-tools/build-plane-app/choose-token-flow) to obtain a `bot_token` for your agent. This token is used for all API calls.

3. **Set up webhook handling** — Ensure your server can [receive and verify webhooks](/dev-tools/build-plane-app/webhooks) from Plane.

::: info
This guide assumes you have a working OAuth app with webhook handling. If not, complete the [Build a Plane App](/dev-tools/build-plane-app/overview) guide first.
:::

## Creating an agent

Building a Plane agent involves three main steps:

1. Create an OAuth application with agent capabilities enabled
2. Implement the OAuth flow to install your agent in workspaces
3. Handle webhooks and create activities to respond to users

### OAuth app creation

To create an agent, you first need to [register an OAuth application](/dev-tools/build-plane-app/create-oauth-application) with the **Enable App Mentions** checkbox enabled.

1. Navigate to `https://app.plane.so/<workspace_slug>/settings/integrations/`
2. Click on **Build your own** button
3. Fill out the required details:
   - **Setup URL**: The URL users are redirected to when installing your app
   - **Redirect URIs**: Where Plane sends the authorization code after consent
   - **Webhook URL Endpoint**: Your service's webhook endpoint for receiving events
4. **Enable the "Enable App Mentions" checkbox** — This is required for agents
5. **Choose the "Agent Run" scopes** — This is required for agents to be able to create run activities and get run details. See [OAuth Scopes](/dev-tools/build-plane-app/oauth-scopes#agent-run-scopes) for more information on the available scopes.
6. Save and securely store your **Client ID** and **Client Secret**

::: info
The "Enable App Mentions" checkbox is what transforms a regular OAuth app into an agent that can be @mentioned in work items.
:::

### Setting is mentionable

When you enable app mentions during OAuth app creation, your application becomes mentionable in work item comments. This means:

- Users will see your agent in the mention picker when typing `@`
- Your agent can be assigned or delegated work items
- Webhooks will be triggered when users interact with your agent

After installation, your agent appears alongside workspace members in the mention autocomplete.

## Agent interaction

Once your agent is installed via the [OAuth consent flow](/dev-tools/build-plane-app/choose-token-flow) and users start mentioning it, you need to handle the interactions through Agent Runs and Activities.

### AgentRun

An **AgentRun** tracks a complete interaction session between a user and your agent.

#### Key fields

| Field            | Type     | Description                                                                                                  |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `id`             | UUID     | Unique identifier for the agent run                                                                          |
| `agent_user`     | UUID     | The bot user ID representing your agent                                                                      |
| `issue`          | UUID     | The work item where the interaction started                                                                  |
| `project`        | UUID     | The project containing the work item                                                                         |
| `workspace`      | UUID     | The workspace where the agent is installed                                                                   |
| `comment`        | UUID     | The comment thread for this run                                                                              |
| `source_comment` | UUID     | The original comment that triggered the run                                                                  |
| `creator`        | UUID     | The user who initiated the run                                                                               |
| `status`         | String   | Current status (`created`, `in_progress`, `awaiting`, `completed`, `stopping`, `stopped`, `failed`, `stale`) |
| `started_at`     | DateTime | When the run started                                                                                         |
| `ended_at`       | DateTime | When the run ended (if applicable)                                                                           |
| `stopped_at`     | DateTime | When a stop was requested                                                                                    |
| `stopped_by`     | UUID     | User who requested the stop                                                                                  |
| `external_link`  | URL      | Optional link to external dashboard/logs                                                                     |
| `error_metadata` | JSON     | Error details if the run failed                                                                              |
| `type`           | String   | Type of run (currently `comment_thread`)                                                                     |

### AgentRunActivity

An **AgentRunActivity** represents a single message or action within an Agent Run.

#### Key fields

| Field              | Type    | Description                                                                          |
| ------------------ | ------- | ------------------------------------------------------------------------------------ |
| `id`               | UUID    | Unique identifier for the activity                                                   |
| `agent_run`        | UUID    | The parent Agent Run                                                                 |
| `type`             | String  | Activity type (`prompt`, `thought`, `action`, `response`, `elicitation`, `error`)    |
| `content`          | JSON    | The activity content (structure varies by type)                                      |
| `content_metadata` | JSON    | Additional metadata about the content                                                |
| `ephemeral`        | Boolean | If true, the activity is temporary and won't create a comment                        |
| `signal`           | String  | Signal for how to handle the activity (`continue`, `stop`, `auth_request`, `select`) |
| `signal_metadata`  | JSON    | Additional signal data                                                               |
| `actor`            | UUID    | The user or bot that created the activity                                            |
| `comment`          | UUID    | Associated comment (for non-ephemeral activities)                                    |

### Creating activities

Your agent communicates back to users by creating activities. We recommend using the official SDKs which provide typed helpers and insulate your code from API changes.

#### Install the SDK

:::tabs key:language
== Node.js {#nodejs}

```bash
npm install @makeplane/plane-node-sdk
```

== Python {#python}

```bash
pip install plane-sdk
```

:::

#### Activity examples

:::tabs key:language
== TypeScript {#typescript}

```typescript
import { PlaneClient } from "@makeplane/plane-node-sdk";

// Initialize the client with your bot token
const planeClient = new PlaneClient({
  baseUrl: process.env.PLANE_API_URL || "https://api.plane.so",
  accessToken: botToken,
});

// Create a thought activity (ephemeral - shows agent's reasoning)
await planeClient.agentRuns.activities.create(workspaceSlug, agentRunId, {
  type: "thought",
  content: {
    type: "thought",
    body: "Analyzing the user's request about weather data...",
  },
});

// Create an action activity (ephemeral - shows tool usage)
await planeClient.agentRuns.activities.create(workspaceSlug, agentRunId, {
  type: "action",
  content: {
    type: "action",
    action: "getWeather",
    parameters: { location: "San Francisco" },
  },
});

// Create a response activity (creates a visible comment)
await planeClient.agentRuns.activities.create(workspaceSlug, agentRunId, {
  type: "response",
  content: {
    type: "response",
    body: "The weather in San Francisco is currently 68°F with partly cloudy skies.",
  },
  signal: "continue",
});

// Create an elicitation activity (asks user for input)
await planeClient.agentRuns.activities.create(workspaceSlug, agentRunId, {
  type: "elicitation",
  content: {
    type: "elicitation",
    body: "Which city would you like me to check the weather for?",
  },
});

// Create an error activity
await planeClient.agentRuns.activities.create(workspaceSlug, agentRunId, {
  type: "error",
  content: {
    type: "error",
    body: "Unable to fetch weather data. Please try again later.",
  },
});
```

== Python {#python}

```python
from plane import PlaneClient
from plane.models.agent_runs import CreateAgentRunActivity

# Initialize the client with your bot token
plane_client = PlaneClient(
    base_url=os.getenv("PLANE_API_URL", "https://api.plane.so"),
    access_token=bot_token,
)

# Create a thought activity (ephemeral - shows agent's reasoning)
plane_client.agent_runs.activities.create(
    workspace_slug=workspace_slug,
    run_id=agent_run_id,
    data=CreateAgentRunActivity(
        type="thought",
        content={
            "type": "thought",
            "body": "Analyzing the user's request about weather data...",
        },
    ),
)

# Create an action activity (ephemeral - shows tool usage)
plane_client.agent_runs.activities.create(
    workspace_slug=workspace_slug,
    run_id=agent_run_id,
    data=CreateAgentRunActivity(
        type="action",
        content={
            "type": "action",
            "action": "getWeather",
            "parameters": {"location": "San Francisco"},
        },
    ),
)

# Create a response activity (creates a visible comment)
plane_client.agent_runs.activities.create(
    workspace_slug=workspace_slug,
    run_id=agent_run_id,
    data=CreateAgentRunActivity(
        type="response",
        content={
            "type": "response",
            "body": "The weather in San Francisco is currently 68°F with partly cloudy skies.",
        },
        signal="continue",
    ),
)

# Create an elicitation activity (asks user for input)
plane_client.agent_runs.activities.create(
    workspace_slug=workspace_slug,
    run_id=agent_run_id,
    data=CreateAgentRunActivity(
        type="elicitation",
        content={
            "type": "elicitation",
            "body": "Which city would you like me to check the weather for?",
        },
    ),
)

# Create an error activity
plane_client.agent_runs.activities.create(
    workspace_slug=workspace_slug,
    run_id=agent_run_id,
    data=CreateAgentRunActivity(
        type="error",
        content={
            "type": "error",
            "body": "Unable to fetch weather data. Please try again later.",
        },
    ),
)
```

:::

### Content payload types

The `content` field structure varies based on the activity type:

::: details Thought
Internal reasoning from the agent. Automatically marked as ephemeral.

```json
{
  "type": "thought",
  "body": "The user is asking about weather data for their location."
}
```

:::

::: details Action
A tool invocation. Automatically marked as ephemeral. You can include results after execution.

```json
{
  "type": "action",
  "action": "searchDatabase",
  "parameters": {
    "query": "weather API",
    "limit": "10"
  }
}
```

With result:

```json
{
  "type": "action",
  "action": "searchDatabase",
  "parameters": {
    "query": "weather API",
    "result": "Found 3 matching records"
  }
}
```

:::

::: details Response
A final response to the user. Creates a comment reply.

```json
{
  "type": "response",
  "body": "Here's the weather forecast for San Francisco..."
}
```

:::

::: details Elicitation
A question requesting user input. Creates a comment and sets run to `awaiting`.

```json
{
  "type": "elicitation",
  "body": "Could you please specify which date range you're interested in?"
}
```

:::

::: details Error
An error message. Creates a comment and sets run to `failed`.

```json
{
  "type": "error",
  "body": "I encountered an error while processing your request."
}
```

:::

### Signals

Signals provide additional context about how an activity should be interpreted:

| Signal         | Description                                               |
| -------------- | --------------------------------------------------------- |
| `continue`     | Default signal, indicates the conversation can continue   |
| `stop`         | User requested to stop the agent run                      |
| `auth_request` | Agent needs user to authenticate with an external service |
| `select`       | Agent is presenting options for user to select from       |

See [Signals & Content Payload](/dev-tools/agents/signals-content-payload) for detailed information.

### Ephemeral activities

Activities with `ephemeral: true` are temporary and don't create comments. They're useful for showing agent progress without cluttering the conversation.

The following activity types are automatically marked as ephemeral:

- `thought`
- `action`
- `error`

Ephemeral activities are displayed temporarily in the UI and replaced when the next activity arrives.

## AgentRun webhooks

Your agent receives webhooks when users interact with it. There are two main webhook events:

### AgentRun create webhook

Triggered when a new Agent Run is created (user first mentions your agent).

**Event:** `agent_run_create`

**Payload:**

```json
{
  "action": "created",
  "agent_run": {
    "id": "uuid",
    "agent_user": "uuid",
    "issue": "uuid",
    "project": "uuid",
    "workspace": "uuid",
    "status": "created",
    "type": "comment_thread",
    "started_at": "2025-01-15T10:30:00Z"
  },
  "agent_user_id": "uuid",
  "app_client_id": "your-client-id",
  "issue_id": "uuid",
  "project_id": "uuid",
  "workspace_id": "uuid",
  "comment_id": "uuid",
  "type": "agent_run"
}
```

### AgentRun activity webhook

Triggered when a user sends a prompt to your agent (initial mention or follow-up).

**Event:** `agent_run_user_prompt`

**Payload:**

```json
{
  "action": "prompted",
  "agent_run_activity": {
    "id": "uuid",
    "agent_run": "uuid",
    "type": "prompt",
    "content": {
      "type": "prompt",
      "body": "What's the weather like in San Francisco?"
    },
    "ephemeral": false,
    "signal": "continue",
    "actor": "uuid",
    "workspace": "uuid"
  },
  "agent_run": {
    "id": "uuid",
    "agent_user": "uuid",
    "issue": "uuid",
    "project": "uuid",
    "workspace": "uuid",
    "status": "in_progress"
  },
  "agent_user_id": "uuid",
  "app_client_id": "your-client-id",
  "comment_id": "uuid",
  "issue_id": "uuid",
  "project_id": "uuid",
  "workspace_id": "uuid",
  "type": "agent_run_activity"
}
```

### Handling webhooks

Here's a complete example of handling agent webhooks using the SDKs:

:::tabs key:language
== TypeScript {#typescript}

```typescript
import { PlaneClient } from "@makeplane/plane-node-sdk";

interface AgentRunActivityWebhook {
  action: string;
  agent_run_activity: {
    id: string;
    content: { type: string; body?: string };
    signal: string;
  };
  agent_run: {
    id: string;
    status: string;
  };
  workspace_id: string;
  project_id: string;
  type: string;
}

async function handleWebhook(
  webhook: AgentRunActivityWebhook,
  credentials: { bot_token: string; workspace_slug: string }
) {
  // Only handle agent_run_activity webhooks
  if (webhook.type !== "agent_run_activity") {
    return;
  }

  const planeClient = new PlaneClient({
    baseUrl: process.env.PLANE_API_URL || "https://api.plane.so",
    accessToken: credentials.bot_token,
  });

  const agentRunId = webhook.agent_run.id;
  const userPrompt = webhook.agent_run_activity.content.body || "";
  const signal = webhook.agent_run_activity.signal;

  // Check for stop signal
  if (signal === "stop") {
    await planeClient.agentRuns.activities.create(credentials.workspace_slug, agentRunId, {
      type: "response",
      content: { type: "response", body: "Stopping as requested." },
    });
    return;
  }

  // Send initial thought (ephemeral - shows processing status)
  await planeClient.agentRuns.activities.create(credentials.workspace_slug, agentRunId, {
    type: "thought",
    content: { type: "thought", body: "Processing your request..." },
  });

  // Process the request (implement your logic here)
  const response = await processUserRequest(userPrompt);

  // Send the response (creates a visible comment)
  await planeClient.agentRuns.activities.create(credentials.workspace_slug, agentRunId, {
    type: "response",
    content: { type: "response", body: response },
  });
}
```

== Python {#python}

```python
from plane import PlaneClient
from plane.models.agent_runs import CreateAgentRunActivity

def handle_webhook(webhook: dict, credentials: dict):
    """Handle incoming agent webhook."""
    # Only handle agent_run_activity webhooks
    if webhook.get("type") != "agent_run_activity":
        return

    plane_client = PlaneClient(
        base_url=os.getenv("PLANE_API_URL", "https://api.plane.so"),
        access_token=credentials["bot_token"],
    )

    agent_run_id = webhook["agent_run"]["id"]
    user_prompt = webhook["agent_run_activity"]["content"].get("body", "")
    signal = webhook["agent_run_activity"]["signal"]

    # Check for stop signal
    if signal == "stop":
        plane_client.agent_runs.activities.create(
            workspace_slug=credentials["workspace_slug"],
            run_id=agent_run_id,
            data=CreateAgentRunActivity(
                type="response",
                content={"type": "response", "body": "Stopping as requested."},
            ),
        )
        return

    # Send initial thought (ephemeral - shows processing status)
    plane_client.agent_runs.activities.create(
        workspace_slug=credentials["workspace_slug"],
        run_id=agent_run_id,
        data=CreateAgentRunActivity(
            type="thought",
            content={"type": "thought", "body": "Processing your request..."},
        ),
    )

    # Process the request (implement your logic here)
    response = process_user_request(user_prompt)

    # Send the response (creates a visible comment)
    plane_client.agent_runs.activities.create(
        workspace_slug=credentials["workspace_slug"],
        run_id=agent_run_id,
        data=CreateAgentRunActivity(
            type="response",
            content={"type": "response", "body": response},
        ),
    )
```

:::

## Next steps

- Learn about [Best Practices](/dev-tools/agents/best-practices) for building responsive agents
- Explore [Signals & Content Payload](/dev-tools/agents/signals-content-payload) for advanced activity handling
