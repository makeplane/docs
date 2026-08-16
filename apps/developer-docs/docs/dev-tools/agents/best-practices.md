---
title: Agent best practices
description: Guidelines for building responsive, user-friendly Plane agents that provide a seamless experience. Covers error handling, response patterns, and user communication.
keywords: plane agent best practices, agent design patterns, plane bot guidelines, agent error handling, responsive agents, plane agent development
---

# Best practices

::: info
Plane Agents are currently in **Beta**. Please send any feedback to support@plane.so.
:::

## Overview

Building a great agent experience requires thoughtful design around responsiveness, error handling, and user communication. This guide covers best practices to ensure your agent feels native to Plane and provides a seamless experience for users.

## Sending immediate thought activity

When your agent receives a webhook, users are waiting for a response. The most important best practice is to **acknowledge the request immediately**.

### Why immediate acknowledgment matters

- Users see that your agent is active and processing their request
- Prevents the Agent Run from being marked as `stale` (5-minute timeout)
- Builds trust that the agent received and understood the request
- Provides visual feedback during potentially long processing times

### Implementation

Send a `thought` activity within the first few seconds of receiving a webhook:

:::tabs key:language
== TypeScript {#typescript}

```typescript
import { PlaneClient } from "@makeplane/plane-node-sdk";

async function handleWebhook(
  webhook: AgentRunActivityWebhook,
  credentials: { bot_token: string; workspace_slug: string }
) {
  const planeClient = new PlaneClient({
    baseUrl: process.env.PLANE_API_URL || "https://api.plane.so",
    accessToken: credentials.bot_token,
  });

  const agentRunId = webhook.agent_run.id;

  // IMMEDIATELY acknowledge receipt
  await planeClient.agentRuns.activities.create(credentials.workspace_slug, agentRunId, {
    type: "thought",
    content: { type: "thought", body: "Received your request. Analyzing..." },
  });

  // Now proceed with actual processing
  // This can take longer since user knows agent is working
  const result = await processRequest(webhook);

  // ... rest of the logic
}
```

== Python {#python}

```python
from plane import PlaneClient
from plane.models.agent_runs import CreateAgentRunActivity

def handle_webhook(webhook: dict, credentials: dict):
    plane_client = PlaneClient(
        base_url=os.getenv("PLANE_API_URL", "https://api.plane.so"),
        access_token=credentials["bot_token"],
    )

    agent_run_id = webhook["agent_run"]["id"]

    # IMMEDIATELY acknowledge receipt
    plane_client.agent_runs.activities.create(
        workspace_slug=credentials["workspace_slug"],
        run_id=agent_run_id,
        data=CreateAgentRunActivity(
            type="thought",
            content={"type": "thought", "body": "Received your request. Analyzing..."},
        ),
    )

    # Now proceed with actual processing
    result = process_request(webhook)

    # ... rest of the logic
```

:::

### Thought activity best practices

- Keep thoughts concise but informative
- Update thoughts as you progress through different stages
- Use thoughts to explain what the agent is doing, not technical details

**Good examples:**

- "Analyzing your question about project timelines..."
- "Searching for relevant work items..."
- "Preparing response with the requested data..."

**Avoid:**

- "Initializing LLM context with temperature 0.7..."
- "Executing database query SELECT \* FROM..."
- Generic messages like "Working..." repeated multiple times

## Acknowledging important signals

Signals communicate user intent beyond the message content. Your agent **must** handle the `stop` signal appropriately.

### The stop signal

When a user wants to stop an agent run, Plane sends a `stop` signal with the activity. Your agent should:

1. **Recognize the signal immediately**
2. **Stop any ongoing processing**
3. **Send a confirmation response**

:::tabs key:language
== TypeScript {#typescript}

```typescript
async function handleWebhook(
  webhook: AgentRunActivityWebhook,
  credentials: { bot_token: string; workspace_slug: string }
) {
  const planeClient = new PlaneClient({
    baseUrl: process.env.PLANE_API_URL || "https://api.plane.so",
    accessToken: credentials.bot_token,
  });

  const signal = webhook.agent_run_activity.signal;
  const agentRunId = webhook.agent_run.id;

  // ALWAYS check for stop signal first
  if (signal === "stop") {
    // Cancel any ongoing work
    cancelOngoingTasks(agentRunId);

    // Acknowledge the stop
    await planeClient.agentRuns.activities.create(credentials.workspace_slug, agentRunId, {
      type: "response",
      content: {
        type: "response",
        body: "Understood. I've stopped processing your previous request.",
      },
    });

    return; // Exit early
  }

  // Continue with normal processing...
}
```

== Python {#python}

```python
def handle_webhook(webhook: dict, credentials: dict):
    plane_client = PlaneClient(
        base_url=os.getenv("PLANE_API_URL", "https://api.plane.so"),
        access_token=credentials["bot_token"],
    )

    signal = webhook["agent_run_activity"]["signal"]
    agent_run_id = webhook["agent_run"]["id"]

    # ALWAYS check for stop signal first
    if signal == "stop":
        # Cancel any ongoing work
        cancel_ongoing_tasks(agent_run_id)

        # Acknowledge the stop
        plane_client.agent_runs.activities.create(
            workspace_slug=credentials["workspace_slug"],
            run_id=agent_run_id,
            data=CreateAgentRunActivity(
                type="response",
                content={
                    "type": "response",
                    "body": "Understood. I've stopped processing your previous request.",
                },
            ),
        )

        return  # Exit early

    # Continue with normal processing...
```

:::

### Signal considerations

| Signal     | How to Handle                             |
| ---------- | ----------------------------------------- |
| `continue` | Default behavior, proceed with processing |
| `stop`     | Immediately halt and confirm              |

## Progress communication

For long-running tasks, keep users informed with progress updates.

### Multi-step operations

When your agent performs multiple steps, send thought activities for each:

```typescript
// Step 1: Acknowledge
await createThought("Understanding your request...");

// Step 2: First action
await createAction("searchDocuments", { query: userQuery });
const searchResults = await searchDocuments(userQuery);

// Step 3: Processing
await createThought("Found relevant information. Analyzing...");

// Step 4: Additional work
await createAction("generateSummary", { data: searchResults });
const summary = await generateSummary(searchResults);

// Step 5: Final response
await createResponse(`Here's what I found: ${summary}`);
```

### Avoiding information overload

While progress updates are important, too many can be overwhelming:

- **Don't** send a thought for every internal function call
- **Do** send thoughts for user-meaningful milestones
- **Don't** expose technical implementation details
- **Do** explain what value is being created for the user

## Error handling

Graceful error handling is crucial for a good user experience.

### Always catch and report errors

```typescript
async function handleWebhook(
  webhook: AgentRunActivityWebhook,
  credentials: { bot_token: string; workspace_slug: string }
) {
  const planeClient = new PlaneClient({
    baseUrl: process.env.PLANE_API_URL || "https://api.plane.so",
    accessToken: credentials.bot_token,
  });

  const agentRunId = webhook.agent_run.id;

  try {
    await planeClient.agentRuns.activities.create(credentials.workspace_slug, agentRunId, {
      type: "thought",
      content: { type: "thought", body: "Processing your request..." },
    });

    // Your logic here...
    const result = await processRequest(webhook);

    await planeClient.agentRuns.activities.create(credentials.workspace_slug, agentRunId, {
      type: "response",
      content: { type: "response", body: result },
    });
  } catch (error) {
    // ALWAYS inform the user about errors
    await planeClient.agentRuns.activities.create(credentials.workspace_slug, agentRunId, {
      type: "error",
      content: {
        type: "error",
        body: getUserFriendlyErrorMessage(error),
      },
    });
  }
}

function getUserFriendlyErrorMessage(error: Error): string {
  // Map technical errors to user-friendly messages
  if (error.message.includes("rate limit")) {
    return "I'm receiving too many requests right now. Please try again in a few minutes.";
  }
  if (error.message.includes("timeout")) {
    return "The operation took too long. Please try a simpler request or try again later.";
  }
  // Generic fallback
  return "I encountered an unexpected error. Please try again or contact support if the issue persists.";
}
```

### Error message guidelines

**Do:**

- Use clear, non-technical language
- Suggest next steps when possible
- Be honest about what went wrong (at a high level)

**Don't:**

- Expose stack traces or technical details
- Blame the user for errors
- Leave users without any feedback

## Handling conversation context

For multi-turn conversations, maintain context from previous activities.

### Fetching previous activities

```typescript
// Get all activities for context
const activities = await planeClient.agentRuns.activities.list(credentials.workspace_slug, agentRunId);

// Build conversation history
const history = activities.results
  .filter((a) => a.type === "prompt" || a.type === "response")
  .map((a) => ({
    role: a.type === "prompt" ? "user" : "assistant",
    content: a.content.body,
  }));

// Use history in your LLM call or logic
const response = await processWithContext(newPrompt, history);
```

### Context best practices

- Retrieve relevant history, not every single activity
- Filter to meaningful exchanges (prompts and responses)
- Consider summarizing long histories to save tokens/processing
- Don't assume infinite context availability

## Rate limiting and timeouts

Be mindful of Plane's API limits and your own processing time.

### Stale run prevention

Agent Runs are marked as `stale` after 5 minutes of inactivity. For long operations:

```typescript
async function longRunningTask(agentRunId: string) {
  const HEARTBEAT_INTERVAL = 60000; // 1 minute

  const heartbeat = setInterval(async () => {
    await createThought("Still working on your request...");
  }, HEARTBEAT_INTERVAL);

  try {
    const result = await performLongOperation();
    return result;
  } finally {
    clearInterval(heartbeat);
  }
}
```

### Webhook response time

- Return HTTP 200 from your webhook handler quickly (within seconds)
- Process the actual agent logic asynchronously
- Don't block the webhook response waiting for LLM calls

```typescript
// Good: Respond immediately, process async
app.post("/webhook", async (req, res) => {
  res.status(200).json({ received: true });

  // Process in background
  processWebhookAsync(req.body).catch(console.error);
});
```

## Summary checklist

**Responsiveness**

- Send thought within seconds of webhook
- Return webhook response quickly
- Send heartbeats for long operations

**Signal handling**

- Always check for `stop` signal first
- Handle all signal types appropriately
- Confirm when stopping

**Error handling**

- Wrap processing in try/catch
- Always send error activity on failure
- Use friendly error messages

**User experience**

- Progress updates for long tasks
- Clear, non-technical communication
- Maintain conversation context

## Next steps

- Learn about [Signals & Content Payload](/dev-tools/agents/signals-content-payload) for advanced activity handling
- Review the [Building an Agent](/dev-tools/agents/building-an-agent) guide for implementation details
