---
title: Signals & Content Payload
description: Detailed reference for activity signals and content payload structures in Plane agents. Includes signal types, payload formats, and content examples.
keywords: plane agent signals, activity payload, agent content structure, plane agent events, agent activity signals, plane webhook payload, agent data format
---

# Signals and content payload

::: info
Plane Agents are currently in **Beta**. Please send any feedback to support@plane.so.
:::

## Overview

Agent activities consist of two key components:

1. **Content** — The message or action being communicated
2. **Signal** — Metadata indicating how the activity should be interpreted

Understanding these components is essential for building agents that communicate effectively with users.

## Signals

Signals are metadata that modify how an activity should be interpreted or handled. They provide additional context about the sender's intent—guiding how the activity should be processed or responded to.

### Available signals

| Signal         | Description                            | Use Case                                 |
| -------------- | -------------------------------------- | ---------------------------------------- |
| `continue`     | Default signal, indicates normal flow  | Standard responses, ongoing conversation |
| `stop`         | User requested to stop the agent       | Cancellation, abort operations           |
| `auth_request` | Agent needs external authentication    | OAuth flows, API key collection          |
| `select`       | Agent presenting options for selection | Multiple choice questions                |

### Signal: `continue`

The default signal for most activities. Indicates normal conversation flow where the agent can continue processing.

```json
{
  "type": "response",
  "content": {
    "type": "response",
    "body": "Here's the information you requested."
  },
  "signal": "continue"
}
```

### Signal: `stop`

Sent by Plane when a user requests to stop the agent. Your agent should:

1. Immediately halt any ongoing processing
2. Clean up resources if needed
3. Send a confirmation response

**Incoming webhook with stop signal:**

```json
{
  "action": "prompted",
  "agent_run_activity": {
    "type": "prompt",
    "content": {
      "type": "prompt",
      "body": "Stop"
    },
    "signal": "stop"
  }
}
```

**Handling the stop signal:**

```typescript
if (webhook.agent_run_activity.signal === "stop") {
  // Cancel ongoing work
  await cancelAllPendingTasks();

  // Acknowledge the stop - this transitions run to "stopped" status
  await planeClient.agentRuns.activities.create(credentials.workspace_slug, agentRunId, {
    type: "response",
    content: {
      type: "response",
      body: "I've stopped working on your request.",
    },
  });

  return;
}
```

### Signal: `auth_request`

Used when your agent needs the user to authenticate with an external service. Requires a URL in the `signal_metadata`.

**Creating an auth request:**

```typescript
await planeClient.agentRuns.activities.create(credentials.workspace_slug, agentRunId, {
  type: "elicitation",
  content: {
    type: "elicitation",
    body: "I need access to your GitHub account to proceed. Please authenticate using the link below.",
  },
  signal: "auth_request",
  signal_metadata: {
    url: "https://your-agent.com/auth/github?session=abc123",
  },
});
```

**Requirements:**

- The URL must start with `https://`
- The URL should be a secure endpoint on your agent's server
- After authentication, redirect the user back or notify completion

### Signal: `select`

Used when presenting options for the user to choose from. Useful for disambiguation or multi-choice scenarios.

```typescript
await planeClient.agentRuns.activities.create(credentials.workspace_slug, agentRunId, {
  type: "elicitation",
  content: {
    type: "elicitation",
    body: "Which project would you like me to search?\n\n1. Frontend App\n2. Backend API\n3. Mobile App",
  },
  signal: "select",
  signal_metadata: {
    options: [
      { id: "frontend", label: "Frontend App" },
      { id: "backend", label: "Backend API" },
      { id: "mobile", label: "Mobile App" },
    ],
  },
});
```

## Content payload types

The `content` field contains the actual message or action. Its structure varies based on the activity type.

### Type: `thought`

Internal reasoning or progress updates from the agent. Automatically marked as ephemeral (won't create a comment).

**Structure:**

```typescript
interface ThoughtContent {
  type: "thought";
  body: string; // The thought message
}
```

**Example:**

```json
{
  "type": "thought",
  "body": "The user is asking about deployment status. I'll check the CI/CD pipeline."
}
```

**Creating a thought activity:**

:::tabs key:language
== TypeScript {#typescript}

```typescript
await planeClient.agentRuns.activities.create(credentials.workspace_slug, agentRunId, {
  type: "thought",
  content: {
    type: "thought",
    body: "Analyzing the codebase for potential issues...",
  },
});
```

== Python {#python}

```python
from plane.models.agent_runs import CreateAgentRunActivity

plane_client.agent_runs.activities.create(
    workspace_slug=credentials["workspace_slug"],
    run_id=agent_run_id,
    data=CreateAgentRunActivity(
        type="thought",
        content={
            "type": "thought",
            "body": "Analyzing the codebase for potential issues...",
        },
    ),
)
```

:::

**Best practices for thoughts:**

- Keep them concise and user-meaningful
- Use to show progress, not internal implementation
- Update as you move through stages of processing

### Type: `action`

Describes a tool invocation or external action. Automatically marked as ephemeral.

**Structure:**

```typescript
interface ActionContent {
  type: "action";
  action: string; // Name of the tool/action
  parameters: {
    // Key-value pairs of parameters
    [key: string]: string;
  };
}
```

**Example - Starting an action:**

```json
{
  "type": "action",
  "action": "searchDatabase",
  "parameters": {
    "query": "bug reports",
    "status": "open"
  }
}
```

**Example - Action with result:**

```json
{
  "type": "action",
  "action": "searchDatabase",
  "parameters": {
    "query": "bug reports",
    "status": "open",
    "result": "Found 12 matching work items"
  }
}
```

**Creating action activities:**

:::tabs key:language
== TypeScript {#typescript}

```typescript
// Before executing the action
await planeClient.agentRuns.activities.create(credentials.workspace_slug, agentRunId, {
  type: "action",
  content: {
    type: "action",
    action: "fetchWeather",
    parameters: {
      location: "San Francisco",
    },
  },
});

// Execute the actual action
const weatherData = await fetchWeather("San Francisco");

// After execution, report the result
await planeClient.agentRuns.activities.create(credentials.workspace_slug, agentRunId, {
  type: "action",
  content: {
    type: "action",
    action: "fetchWeather",
    parameters: {
      location: "San Francisco",
      result: `Temperature: ${weatherData.temp}°F, Conditions: ${weatherData.conditions}`,
    },
  },
  content_metadata: {
    result: weatherData, // Store full result in metadata
  },
});
```

== Python {#python}

```python
from plane.models.agent_runs import CreateAgentRunActivity

# Before executing the action
plane_client.agent_runs.activities.create(
    workspace_slug=credentials["workspace_slug"],
    run_id=agent_run_id,
    data=CreateAgentRunActivity(
        type="action",
        content={
            "type": "action",
            "action": "fetchWeather",
            "parameters": {"location": "San Francisco"},
        },
    ),
)

# Execute the actual action
weather_data = fetch_weather("San Francisco")

# After execution, report the result
plane_client.agent_runs.activities.create(
    workspace_slug=credentials["workspace_slug"],
    run_id=agent_run_id,
    data=CreateAgentRunActivity(
        type="action",
        content={
            "type": "action",
            "action": "fetchWeather",
            "parameters": {
                "location": "San Francisco",
                "result": f"Temperature: {weather_data['temp']}°F, Conditions: {weather_data['conditions']}",
            },
        },
        content_metadata={"result": weather_data},
    ),
)
```

:::

**Parameter requirements:**

- All parameter keys must be strings
- All parameter values must be strings
- Use `content_metadata` to store complex/structured data

### Type: `response`

A final response to the user. Creates a comment reply visible to users.

**Structure:**

```typescript
interface ResponseContent {
  type: "response";
  body: string; // The response message (supports Markdown)
}
```

**Example:**

```json
{
  "type": "response",
  "body": "Based on my analysis, here are the top 3 issues affecting your sprint:\n\n1. **AUTH-123**: Login timeout affecting 15% of users\n2. **API-456**: Rate limiting too aggressive\n3. **UI-789**: Dashboard loading slowly\n\nWould you like me to provide more details on any of these?"
}
```

**Creating a response:**

:::tabs key:language
== TypeScript {#typescript}

```typescript
await planeClient.agentRuns.activities.create(workspaceSlug, agentRunId, {
  type: "response",
  content: {
    type: "response",
    body: "Here's the weather in San Francisco:\n\n**68°F** - Partly Cloudy\n\nExpect mild conditions throughout the day.",
  },
  signal: "continue",
});
```

== Python {#python}

```python
from plane.models.agent_runs import CreateAgentRunActivity

plane_client.agent_runs.activities.create(
    workspace_slug=workspace_slug,
    run_id=agent_run_id,
    data=CreateAgentRunActivity(
        type="response",
        content={
            "type": "response",
            "body": "Here's the weather in San Francisco:\n\n**68°F** - Partly Cloudy\n\nExpect mild conditions throughout the day.",
        },
        signal="continue",
    ),
)
```

:::

**Response best practices:**

- Use Markdown for formatting
- Be clear and concise
- Include relevant context
- End with a call-to-action if appropriate

### Type: `elicitation`

Requests clarification or input from the user. Creates a comment and sets the Agent Run status to `awaiting`.

**Structure:**

```typescript
interface ElicitationContent {
  type: "elicitation";
  body: string; // The question or request (supports Markdown)
}
```

**Example:**

```json
{
  "type": "elicitation",
  "body": "I found multiple projects matching your query. Which one would you like me to focus on?\n\n1. Project Alpha (12 open work items)\n2. Project Beta (8 open work items)\n3. Project Gamma (23 open work items)"
}
```

**Creating an elicitation:**

:::tabs key:language
== TypeScript {#typescript}

```typescript
await planeClient.agentRuns.activities.create(workspaceSlug, agentRunId, {
  type: "elicitation",
  content: {
    type: "elicitation",
    body: "To generate the report, I need a few details:\n\n- What date range should I cover?\n- Should I include completed work items or only open ones?",
  },
});
```

== Python {#python}

```python
from plane.models.agent_runs import CreateAgentRunActivity

plane_client.agent_runs.activities.create(
    workspace_slug=workspace_slug,
    run_id=agent_run_id,
    data=CreateAgentRunActivity(
        type="elicitation",
        content={
            "type": "elicitation",
            "body": "To generate the report, I need a few details:\n\n- What date range should I cover?\n- Should I include completed work items or only open ones?",
        },
    ),
)
```

:::

**Elicitation best practices:**

- Ask specific, answerable questions
- Provide options when possible
- Don't ask too many questions at once
- Consider using `select` signal for multiple choice

### Type: `error`

Reports an error or failure. Creates a comment and sets the Agent Run status to `failed`.

**Structure:**

```typescript
interface ErrorContent {
  type: "error";
  body: string; // The error message (supports Markdown)
}
```

**Example:**

```json
{
  "type": "error",
  "body": "I couldn't complete your request due to a connection issue with the external service. Please try again in a few minutes."
}
```

**Creating an error activity:**

:::tabs key:language
== TypeScript {#typescript}

```typescript
await planeClient.agentRuns.activities.create(workspaceSlug, agentRunId, {
  type: "error",
  content: {
    type: "error",
    body: "I was unable to access the GitHub repository. Please ensure the integration is properly configured.",
  },
  signal_metadata: {
    error_code: "GITHUB_ACCESS_DENIED",
    retryable: true,
  },
});
```

== Python {#python}

```python
from plane.models.agent_runs import CreateAgentRunActivity

plane_client.agent_runs.activities.create(
    workspace_slug=workspace_slug,
    run_id=agent_run_id,
    data=CreateAgentRunActivity(
        type="error",
        content={
            "type": "error",
            "body": "I was unable to access the GitHub repository. Please ensure the integration is properly configured.",
        },
        signal_metadata={
            "error_code": "GITHUB_ACCESS_DENIED",
            "retryable": True,
        },
    ),
)
```

:::

**Error best practices:**

- Use friendly, non-technical language
- Suggest next steps when possible
- Store detailed error info in `signal_metadata`
- Don't expose stack traces or sensitive information

### Type: `prompt`

This type is **user-generated only**. Your agent cannot create prompt activities—they're created by Plane when a user sends a message.

**Structure:**

```typescript
interface PromptContent {
  type: "prompt";
  body: string; // The user's message
}
```

**Example received in webhook:**

```json
{
  "type": "prompt",
  "body": "Can you check the status of our deployment pipeline?"
}
```

## Ephemeral activities

Ephemeral activities are temporary and won't create comment replies. They're useful for showing agent progress without cluttering the conversation thread.

### Automatically ephemeral types

The following activity types are automatically marked as ephemeral:

- `thought`
- `action`
- `error`

### Ephemeral behavior

- Ephemeral activities appear temporarily in the Agent UI
- They're replaced when the next activity arrives
- They don't create permanent comment replies
- Useful for real-time progress updates

### Visual example

```
User: @WeatherBot What's the weather in Tokyo?

[Ephemeral - disappears when next activity arrives]
Analyzing your request...

[Ephemeral - disappears when next activity arrives]
getCoordinates("Tokyo")

[Ephemeral - disappears when next activity arrives]
getWeather(35.6762, 139.6503) → 72°F, Clear

[Permanent - stays as comment]
The weather in Tokyo is currently 72°F with clear skies.
```

## Content metadata

Use `content_metadata` to store additional structured data about an activity:

:::tabs key:language
== TypeScript {#typescript}

```typescript
await planeClient.agentRuns.activities.create(workspaceSlug, agentRunId, {
  type: "action",
  content: {
    type: "action",
    action: "analyzeCode",
    parameters: {
      file: "src/index.ts",
      result: "Found 3 potential issues",
    },
  },
  content_metadata: {
    analysis_results: {
      issues: [
        { line: 42, severity: "warning", message: "Unused variable" },
        { line: 78, severity: "error", message: "Type mismatch" },
        { line: 156, severity: "info", message: "Consider refactoring" },
      ],
      processing_time_ms: 1250,
    },
  },
});
```

== Python {#python}

```python
from plane.models.agent_runs import CreateAgentRunActivity

plane_client.agent_runs.activities.create(
    workspace_slug=workspace_slug,
    run_id=agent_run_id,
    data=CreateAgentRunActivity(
        type="action",
        content={
            "type": "action",
            "action": "analyzeCode",
            "parameters": {
                "file": "src/index.ts",
                "result": "Found 3 potential issues",
            },
        },
        content_metadata={
            "analysis_results": {
                "issues": [
                    {"line": 42, "severity": "warning", "message": "Unused variable"},
                    {"line": 78, "severity": "error", "message": "Type mismatch"},
                    {"line": 156, "severity": "info", "message": "Consider refactoring"},
                ],
                "processing_time_ms": 1250,
            },
        },
    ),
)
```

:::

## Signal metadata

Use `signal_metadata` to provide additional context for signals:

```typescript
// Auth request with URL
{
  signal: "auth_request",
  signal_metadata: {
    url: "https://your-agent.com/auth/connect?session=xyz",
    provider: "github",
    scopes: ["repo", "read:user"],
  }
}

// Select with options
{
  signal: "select",
  signal_metadata: {
    options: [
      { id: "opt1", label: "Option 1", description: "First choice" },
      { id: "opt2", label: "Option 2", description: "Second choice" },
    ],
    allow_multiple: false,
  }
}

// Error with details
{
  signal: "continue",
  signal_metadata: {
    error_code: "RATE_LIMIT_EXCEEDED",
    retry_after: 60,
    retryable: true,
  }
}
```

## Complete activity creation reference

Here's a comprehensive example showing all activity types:

:::tabs key:language
== TypeScript {#typescript}

```typescript
import { PlaneClient } from "@makeplane/plane-node-sdk";

const planeClient = new PlaneClient({
  baseUrl: process.env.PLANE_API_URL || "https://api.plane.so",
  accessToken: botToken,
});

// 1. Thought - Show reasoning (ephemeral)
await planeClient.agentRuns.activities.create(workspaceSlug, agentRunId, {
  type: "thought",
  content: { type: "thought", body: "Analyzing the request..." },
});

// 2. Action - Tool invocation (ephemeral)
await planeClient.agentRuns.activities.create(workspaceSlug, agentRunId, {
  type: "action",
  content: {
    type: "action",
    action: "searchWorkItems",
    parameters: { query: "bug", status: "open" },
  },
});

// 3. Response - Final answer (creates comment)
await planeClient.agentRuns.activities.create(workspaceSlug, agentRunId, {
  type: "response",
  content: { type: "response", body: "Found 5 open bugs." },
  signal: "continue",
});

// 4. Elicitation - Ask for input (creates comment, awaits response)
await planeClient.agentRuns.activities.create(workspaceSlug, agentRunId, {
  type: "elicitation",
  content: { type: "elicitation", body: "Which bug should I prioritize?" },
  signal: "select",
  signal_metadata: {
    options: [
      { id: "bug-1", label: "AUTH-123: Login timeout" },
      { id: "bug-2", label: "API-456: Rate limiting" },
    ],
  },
});

// 5. Error - Report failure (creates comment)
await planeClient.agentRuns.activities.create(workspaceSlug, agentRunId, {
  type: "error",
  content: { type: "error", body: "Unable to access the database." },
  signal_metadata: { error_code: "DB_CONNECTION_FAILED" },
});
```

== Python {#python}

```python
from plane import PlaneClient
from plane.models.agent_runs import CreateAgentRunActivity

plane_client = PlaneClient(
    base_url=os.getenv("PLANE_API_URL", "https://api.plane.so"),
    access_token=bot_token,
)

# 1. Thought - Show reasoning (ephemeral)
plane_client.agent_runs.activities.create(
    workspace_slug=workspace_slug,
    run_id=agent_run_id,
    data=CreateAgentRunActivity(
        type="thought",
        content={"type": "thought", "body": "Analyzing the request..."},
    ),
)

# 2. Action - Tool invocation (ephemeral)
plane_client.agent_runs.activities.create(
    workspace_slug=workspace_slug,
    run_id=agent_run_id,
    data=CreateAgentRunActivity(
        type="action",
        content={
            "type": "action",
            "action": "searchWorkItems",
            "parameters": {"query": "bug", "status": "open"},
        },
    ),
)

# 3. Response - Final answer (creates comment)
plane_client.agent_runs.activities.create(
    workspace_slug=workspace_slug,
    run_id=agent_run_id,
    data=CreateAgentRunActivity(
        type="response",
        content={"type": "response", "body": "Found 5 open bugs."},
        signal="continue",
    ),
)

# 4. Elicitation - Ask for input (creates comment, awaits response)
plane_client.agent_runs.activities.create(
    workspace_slug=workspace_slug,
    run_id=agent_run_id,
    data=CreateAgentRunActivity(
        type="elicitation",
        content={"type": "elicitation", "body": "Which bug should I prioritize?"},
        signal="select",
        signal_metadata={
            "options": [
                {"id": "bug-1", "label": "AUTH-123: Login timeout"},
                {"id": "bug-2", "label": "API-456: Rate limiting"},
            ],
        },
    ),
)

# 5. Error - Report failure (creates comment)
plane_client.agent_runs.activities.create(
    workspace_slug=workspace_slug,
    run_id=agent_run_id,
    data=CreateAgentRunActivity(
        type="error",
        content={"type": "error", "body": "Unable to access the database."},
        signal_metadata={"error_code": "DB_CONNECTION_FAILED"},
    ),
)
```

:::

## Next steps

- Review [Best Practices](/dev-tools/agents/best-practices) for building responsive agents
- See [Building an Agent](/dev-tools/agents/building-an-agent) for implementation examples
- Check the [Overview](/dev-tools/agents/overview) for Agent Run lifecycle details
