---
title: Plane MCP server
description: Connect Claude, ChatGPT, Cursor, VS Code, and other AI tools to your Plane workspace with the hosted MCP server. Create and update work items, plan cycles, and query projects in natural language.
---

# MCP server

Use Plane from the AI tool you already work in. The Plane MCP server exposes your workspace to any client that speaks the Model Context Protocol, so you can create work items, plan cycles, and query projects in natural language.

::: tip Hosted server
`https://mcp.plane.so/http/mcp`

Paste this URL into your AI tool and sign in with your Plane account. No install, no API key.
:::

::: info Which MCP integration do I need?
The MCP server connects your AI tools → Plane. [MCP connectors](/ai/mcp-connectors) connect Plane AI → other tools.
:::

::: warning Self-hosted Plane
The hosted server only reaches Plane Cloud. For a self-hosted instance, use local mode or [run your own server](https://developers.plane.so/dev-tools/mcp-server#self-hosted-plane).
:::

## How it works

1. Connect once with OAuth. Your AI tool opens Plane's sign-in page, where you choose a workspace.
2. Your AI tool discovers what it can do in Plane, including working with work items, cycles, and projects.
3. It reads and writes as you, within your workspace and project roles.

The server talks to Plane's API directly. It does not use Plane AI or Plane AI credits; the AI model belongs to your client.

## What you can do

- Create, update, and search work items; comment, attach files, add links and relationships, create sub-items and epics, and log time.
- Plan cycles, modules, and milestones; move unfinished work and track progress.
- Manage projects, states, labels, work item types, and custom properties.
- Organize projects into initiatives.
- Plan releases and write changelogs.
- Track customers and their requests.
- Create and attach pages.
- Triage intake submissions.

Filter with [Plane Query Language](/core-concepts/issues/plane-query-language) — for example, find everything assigned to you that is overdue.

Features that are not on your plan, such as time tracking, work item types, or custom properties, return a clear "not available on your plan" message instead of failing.

## Prerequisites

- A Plane Cloud account and a workspace where you are a Member or Admin.
- An AI tool that supports remote MCP. Every client below does.

## Connect your AI tool

Every client below connects with OAuth to `https://mcp.plane.so/http/mcp`. Need an access token, a local server, or a self-hosted instance? See the [full setup guide](https://developers.plane.so/dev-tools/mcp-server#connect-a-client).

### Claude

These steps work in Claude Desktop and on claude.ai. Free plans allow one custom connector.

1. Open **Settings → Connectors → Add custom connector**.
2. Paste `https://mcp.plane.so/http/mcp`, then select **Add → Connect**.
3. Sign in to Plane and choose your workspace.
4. In a chat, select **+ → Connectors** and enable Plane.

On Team and Enterprise plans, an Owner first adds Plane under **Organization settings → Connectors**. Members can then select **Connect**.

### Claude Code

Add the hosted server, then authenticate from a Claude Code session:

```bash
claude mcp add --transport http plane https://mcp.plane.so/http/mcp
```

Run `/mcp` in the session and follow the authentication prompt. You can also run `claude mcp login plane`.

### ChatGPT

ChatGPT supports custom connectors on Plus, Pro, Business, Enterprise, and Edu plans. The exact menu names may differ by workspace.

1. Open **Settings → Security and login** and turn on **Developer mode**. On Business, Enterprise, and Edu, a workspace admin must allow it.
2. Go to [chatgpt.com/plugins](https://chatgpt.com/plugins), select **+**, name the connector "Plane", and enter `https://mcp.plane.so/http/mcp` under **Connection**. Create it and sign in to Plane.
3. In a chat, open **+ → Developer mode** and enable Plane.

### Codex

Codex CLI, the IDE extension, and the ChatGPT desktop app share the same connection:

```bash
codex mcp add plane --url https://mcp.plane.so/http/mcp
codex mcp login plane
```

Run `codex mcp list` or `/mcp` inside Codex to verify the connection.

### Cursor

**[Install Plane in Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=plane&config=eyJ1cmwiOiJodHRwczovL21jcC5wbGFuZS5zby9odHRwL21jcCJ9)** — a one-click install link that opens Cursor with the server pre-filled.

Cursor opens an OAuth prompt after installation. You can manage the server from Cursor's **Customize** page.

As a fallback, add this to `~/.cursor/mcp.json` for all projects or `.cursor/mcp.json` for one project:

```json
{
  "mcpServers": {
    "plane": {
      "url": "https://mcp.plane.so/http/mcp"
    }
  }
}
```

### VS Code

Use a one-click installer:

- [Install Plane in VS Code](https://vscode.dev/redirect/mcp/install?name=plane&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.plane.so%2Fhttp%2Fmcp%22%7D)
- [Install Plane in VS Code Insiders](https://insiders.vscode.dev/redirect/mcp/install?name=plane&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.plane.so%2Fhttp%2Fmcp%22%7D&quality=insiders)

Trust the server when prompted, then complete OAuth in your browser. Verify it with **MCP: List Servers** and use Plane from Copilot Chat in **Agent** mode. Copilot Business and Enterprise organizations must enable the **MCP servers in Copilot** policy.

### Windsurf

In Windsurf (now Devin Desktop), add Plane to `~/.codeium/windsurf/mcp_config.json`, then open the Cascade panel and select **MCPs → Manage MCPs** to refresh:

```json
{
  "mcpServers": {
    "plane": {
      "serverUrl": "https://mcp.plane.so/http/mcp"
    }
  }
}
```

If the OAuth sign-in does not complete, use the [access-token configuration](https://developers.plane.so/dev-tools/mcp-server#windsurf) instead.

### Zed

In Zed, open **Settings → AI → MCP Servers → Add Server**, or add Plane to `~/.config/zed/settings.json`:

```json
{
  "context_servers": {
    "plane": {
      "url": "https://mcp.plane.so/http/mcp"
    }
  }
}
```

Choose **Add Remote Server** if you use the UI. Zed prompts you to sign in with OAuth.

### Antigravity

Add Plane to `~/.gemini/config/mcp_config.json` for every workspace, or `.agents/mcp_config.json` for one workspace:

```json
{
  "mcpServers": {
    "plane": {
      "serverUrl": "https://mcp.plane.so/http/mcp"
    }
  }
}
```

In the IDE, select **… → MCP Servers → Manage MCP Servers** from the agent panel. Antigravity 2.0 uses **Settings → Customizations → Installed MCP Servers → Add MCP**. OAuth starts automatically.

### Other clients

Any client with native remote-MCP support only needs the hosted URL. A stdio-only client can bridge to it with mcp-remote; see [Other clients in the full setup guide](https://developers.plane.so/dev-tools/mcp-server#other-clients).

## Example prompts

**What's on my plate**

```text
List work items assigned to me that are in progress or overdue, grouped by project.
```

**File a bug**

```text
Create a high-priority bug in ENG called "Login times out on Safari 17". Description: the OAuth callback lands on a blank page. Assign it to me and add the "auth" label.
```

**Catch up on a work item**

```text
Summarize what changed on ENG-42 this week: comments, state changes, and who is assigned now.
```

**Roll over a sprint**

```text
Create Sprint 15 in ENG from June 2 to June 15, move everything unfinished from Sprint 14 into it, and give me a count by priority.
```

**Break down an epic**

```text
Break the "Checkout redesign" epic in WEB into five sub-items with clear titles and acceptance criteria, then add them to the current cycle.
```

**Check an initiative**

```text
Which projects under the "Q3 platform reliability" initiative still have overdue work items? Show counts per project.
```

**Close the loop**

```text
Log 90 minutes on ENG-42 with the note "Implemented retry logic", mark it Done, and comment "Fixed in abc1234, needs QA".
```

**Cut a release**

```text
Create release v1.8.0 with a release tag v1.8.0, add ENG-40 through ENG-45 to it, and draft the changelog from those items.
```

## Permissions and security

- The server acts as you. Your workspace and project roles apply to every read and write.
- One connection is bound to one workspace. Reconnect to switch workspaces.
- Disconnect from your AI tool's connector settings. If you used a token, revoke it under **Profile Settings → Personal Access Tokens** or **Workspace Settings → Access Tokens**.
- Treat anything your AI reads from Plane — including titles, descriptions, comments, and attachments — as untrusted input to the model. Prefer clients that ask before writing.

See the [security best practices](https://developers.plane.so/dev-tools/mcp-server#security-best-practices) for token storage, least privilege, and administrative controls.

## FAQ

::: details Is it free?
The server is open source and free to use. What you can do follows your Plane plan.
:::

::: details Does it work with self-hosted Plane?
Yes. Use local mode or [run your own server](https://developers.plane.so/dev-tools/mcp-server-self-host) so it can reach your instance.
:::

::: details Does it use Plane AI credits?
No. The server calls Plane's API directly. The AI model and its usage belong to your MCP client.
:::

::: details How is this different from Plane AI and MCP connectors?
Plane AI is the AI built into Plane. MCP connectors let Plane AI use other services, while the MCP server lets external AI tools use Plane.
:::

::: details Can I use several workspaces?
One connection is bound to one workspace. Reconnect and choose another workspace when you need to switch.
:::

::: details How do I disconnect?
Disconnect Plane from your AI tool's connector settings. If you connected with a token, revoke it under **Profile Settings → Personal Access Tokens** or **Workspace Settings → Access Tokens**.
:::

## Go further

<CardGroup :cols="3">
  <Card title="Full setup guide" icon="book-open" href="https://developers.plane.so/dev-tools/mcp-server">
    Access tokens, local mode, every client, troubleshooting.
  </Card>
  <Card title="Tool reference" icon="list-tree" href="https://developers.plane.so/dev-tools/mcp-server-tools">
    Every tool and action, grouped by resource.
  </Card>
  <Card title="Self-host the MCP server" icon="server" href="https://developers.plane.so/dev-tools/mcp-server-self-host">
    Deploy with Docker or Helm for your Plane instance.
  </Card>
</CardGroup>
