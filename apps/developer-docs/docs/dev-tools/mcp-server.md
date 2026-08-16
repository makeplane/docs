---
title: MCP server
description: Connect Claude, ChatGPT, Codex, Cursor, VS Code, Windsurf, Zed, and Antigravity to Plane over MCP. Endpoints, OAuth and access-token auth, per-client setup, security, and troubleshooting.
keywords: plane mcp server, model context protocol, plane ai tools, claude plane, cursor plane, chatgpt plane, codex plane, mcp oauth, mcp access token
---

# MCP server

Use Plane from the AI tool you already work in to create work items, plan cycles, and query projects in natural
language. The server is [open source](https://github.com/makeplane/plane-mcp-server) under the MIT license.

::: tip Hosted server
Connect to `https://mcp.plane.so/http/mcp` and sign in with your Plane account.
:::

::: tip
Just want to connect your AI tool? Use the [short setup guide](https://docs.plane.so/ai/mcp-server).
:::

## How it works

[Model Context Protocol (MCP)](https://modelcontextprotocol.io) is an open standard for how AI clients discover and call
external tools. The Plane MCP server sits between your client and Plane's REST API, then acts as the signed-in user.

Version 0.3.0 exposes **28 tools, one per resource, covering 183 actions**. Pass `action` to select an operation:

```python
workitem(action="create", project_id=..., name="Fix login")
workitem(action="list", project_id=..., pql='stateGroup = "started"')
cycle(action="archive", project_id=..., cycle_id=...)
```

Every tool description lists its actions and marks parameters as required or optional. Tools also carry MCP
`readOnlyHint` and `destructiveHint` annotations derived from their actions.

### Hosted or self-hosted

Plane Cloud users can connect to `mcp.plane.so`. For self-hosted Plane, run locally with `PLANE_BASE_URL` set to your
instance, or [deploy your own server](/dev-tools/mcp-server-self-host).

## What you can do

- [Work items](/dev-tools/mcp-server-tools#work-items): create, update, search, comment, attach, link, relate, nest, and
  log time.
- [Types, properties, and estimates](/dev-tools/mcp-server-tools#types-properties-and-estimates): manage types,
  custom properties, and estimates.
- [Planning](/dev-tools/mcp-server-tools#planning): plan cycles, modules, milestones, and initiatives.
- [Releases](/dev-tools/mcp-server-tools#releases): manage tags, labels, work items, and changelogs.
- [Projects and workspace](/dev-tools/mcp-server-tools#projects-and-workspace): manage projects, states, labels, members,
  pages, features, and intake.
- [Customers](/dev-tools/mcp-server-tools#customers): manage customers, requests, properties, and linked work.
- [Query](/dev-tools/mcp-server-tools#query): retrieve the PQL language reference before composing filters.

### Query with PQL

`workitem list`, `workitem list_archived`, `workitem count`, `cycle list_workitems`, and `module list_workitems` accept
`pql`. UUID-backed fields require UUIDs, so resolve names first. Call `get_pql_reference` with `detail="brief"` or
`detail="full"`; see [Plane Query Language](https://docs.plane.so/core-concepts/issues/plane-query-language).

There are no separate epic tools. Follow the [epics recipe](/dev-tools/mcp-server-tools#epics).

## Endpoints and authentication

| Endpoint                                | Auth                  | Use it for                                           |
| --------------------------------------- | --------------------- | ---------------------------------------------------- |
| `https://mcp.plane.so/http/mcp`         | OAuth                 | Streamable HTTP; recommended for interactive use     |
| `https://mcp.plane.so/http/api-key/mcp` | PAT headers           | Automations, CI, headless agents, shared team setups |
| `uvx plane-mcp-server stdio`            | Environment variables | Self-hosted Plane and local or offline development   |
| `https://mcp.plane.so/sse`              | OAuth                 | Deprecated clients that still require HTTP+SSE       |

### OAuth

Your client redirects you to Plane, where you sign in and choose a workspace. The server validates the resulting
token with `/api/v1/users/me/`, and the connection stays bound to that workspace.

The default redirect allowlist covers Cursor, VS Code, Antigravity, Claude.ai, ChatGPT, and localhost callbacks. A
self-hosted server can add other clients through `PLANE_OAUTH_ALLOWED_REDIRECT_URIS`.

Re-authenticate from your client's connector controls. In Claude Code, run `/mcp`; with `mcp-remote`, clear its cache:

```bash
rm -rf ~/.mcp-auth
```

This removes cached OAuth credentials for every `mcp-remote` server, not only Plane. To keep Plane's cache separate,
set `MCP_REMOTE_CONFIG_DIR` in that server's `env` and remove that directory instead.

### Personal access token

Send both headers on every request to the PAT endpoint:

| Header             | Value              |
| ------------------ | ------------------ |
| `Authorization`    | `Bearer <PAT>`     |
| `x-workspace-slug` | `<workspace-slug>` |

::: warning Changed
Earlier versions of this page showed an `x-api-key` header. The server reads the standard `Authorization: Bearer`
header; update existing configs.
:::

#### Get a token

Create a personal access token under **Profile settings → Personal access tokens** and copy it when shown. For
automations, you can instead create a workspace access token under **Workspace settings → Access tokens**.

#### Find your workspace slug

The slug is the segment after `app.plane.so/` in your Plane URL. In `https://app.plane.so/acme-corp/`, it is
`acme-corp`.

### Local (stdio)

Local mode requires Python 3.10+ and [`uv`](https://docs.astral.sh/uv/). On macOS or Linux:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

On Windows:

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

| Variable               | Required | Description                                                                       |
| ---------------------- | -------- | --------------------------------------------------------------------------------- |
| `PLANE_API_KEY`        | Yes      | Your Plane personal or workspace access token                                     |
| `PLANE_WORKSPACE_SLUG` | Yes      | The workspace slug                                                                |
| `PLANE_BASE_URL`       | No       | Defaults to `https://api.plane.so`; set it to your self-hosted Plane instance URL |

Prefer stdio when the client runs on the same machine, you need a self-hosted or private Plane instance, or you do
not want to expose an MCP HTTP service.

### SSE (deprecated)

The MCP specification deprecated the older HTTP+SSE transport. Keep `https://mcp.plane.so/sse` only for an existing
client that cannot use Streamable HTTP, and migrate when that client supports it.

## Connect a client

Replace `mcp.plane.so` with your own host if you self-host the server. Tabs stay in sync across this page.

### General

These are the common shapes. Some clients use `serverUrl`, `servers`, or `context_servers`; use the client-specific
schema below.

:::tabs key:mcp-auth
== OAuth {#general-oauth}

```json
{
  "mcpServers": {
    "plane": {
      "url": "https://mcp.plane.so/http/mcp"
    }
  }
}
```

== Access token {#general-token}

```json
{
  "mcpServers": {
    "plane": {
      "url": "https://mcp.plane.so/http/api-key/mcp",
      "headers": {
        "Authorization": "Bearer <PAT>",
        "x-workspace-slug": "<workspace-slug>"
      }
    }
  }
}
```

== Local (stdio) {#general-stdio}

```json
{
  "mcpServers": {
    "plane": {
      "command": "uvx",
      "args": ["plane-mcp-server", "stdio"],
      "env": {
        "PLANE_API_KEY": "<your-api-key>",
        "PLANE_WORKSPACE_SLUG": "<your-workspace-slug>"
      }
    }
  }
}
```

:::

### Claude

:::tabs key:mcp-auth
== OAuth {#claude-oauth}
On Claude Desktop or claude.ai:

1. Open **Settings → Connectors → Add custom connector**.
2. Paste `https://mcp.plane.so/http/mcp`, select **Add**, then **Connect**.
3. Sign in to Plane. In a chat, choose **+ → Connectors** to enable Plane.

Free plans allow one custom connector. On Team or Enterprise, an Owner adds it under
**Organization settings → Connectors**, then members select **Connect**.

== Access token {#claude-token}
Desktop users who need a token instead of OAuth can bridge with `mcp-remote` (Node.js 22+ recommended):

```json
{
  "mcpServers": {
    "plane": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.plane.so/http/api-key/mcp",
        "--header",
        "Authorization:${PLANE_AUTH_HEADER}",
        "--header",
        "x-workspace-slug:${PLANE_WORKSPACE_SLUG}"
      ],
      "env": {
        "PLANE_AUTH_HEADER": "Bearer <PAT>",
        "PLANE_WORKSPACE_SLUG": "<workspace-slug>"
      }
    }
  }
}
```

== Local (stdio) {#claude-stdio}
Use **Settings → Developer → Edit Config**, or edit `~/Library/Application Support/Claude/claude_desktop_config.json`
on macOS or `%APPDATA%\Claude\claude_desktop_config.json` on Windows:

```json
{
  "mcpServers": {
    "plane": {
      "command": "uvx",
      "args": ["plane-mcp-server", "stdio"],
      "env": {
        "PLANE_API_KEY": "<your-api-key>",
        "PLANE_WORKSPACE_SLUG": "<your-workspace-slug>"
      }
    }
  }
}
```

Quit and relaunch Claude Desktop. This file supports stdio only: never put `url` or `type: http` in it.

:::

### Claude Code

:::tabs key:mcp-auth
== OAuth {#claude-code-oauth}

```bash
claude mcp add --transport http plane https://mcp.plane.so/http/mcp
# In a session, run /mcp and authenticate (or run: claude mcp login plane).
claude mcp list
```

== Access token {#claude-code-token}
Put `--header` after the URL:

```bash
claude mcp add --transport http plane https://mcp.plane.so/http/api-key/mcp \
  --header "Authorization: Bearer <PAT>" \
  --header "x-workspace-slug: <workspace-slug>"
```

== Local (stdio) {#claude-code-stdio}

```bash
claude mcp add --transport stdio plane \
  --env PLANE_API_KEY=<your-api-key> \
  --env PLANE_WORKSPACE_SLUG=<your-workspace-slug> \
  -- uvx plane-mcp-server stdio
```

:::

Use `--scope local|project|user`; project scope writes a shareable `.mcp.json` with `mcpServers`, `type: "http"`, and
`url`. PAT entries add `headers`, and `${PLANE_PAT}` expands from the environment. Claude Code's SSE transport is deprecated.

### ChatGPT

ChatGPT supports OAuth on Plus, Pro, Business, Enterprise, and Edu plans:

1. Open **Settings → Security and login** and turn on **Developer mode**. Business, Enterprise, and Edu workspaces
   require an admin to allow it.
2. Open **chatgpt.com/plugins**, select **+**, name the connection "Plane", enter
   `https://mcp.plane.so/http/mcp` under **Connection**, select **Create**, then sign in to Plane.
3. In a chat, open **+ → Developer mode** and enable Plane.

The exact menu names may differ by workspace. ChatGPT does not accept custom headers, so use OAuth.

### Codex

The CLI, IDE extension, and ChatGPT desktop app share `~/.codex/config.toml`.

:::tabs key:mcp-auth
== OAuth {#codex-oauth}

```bash
codex mcp add plane --url https://mcp.plane.so/http/mcp
codex mcp login plane
codex mcp list
```

You can also run `/mcp` inside Codex. No experimental flag is required.

== Access token {#codex-token}

```toml
[mcp_servers.plane]
url = "https://mcp.plane.so/http/api-key/mcp"
bearer_token_env_var = "PLANE_PAT"
http_headers = { "x-workspace-slug" = "<workspace-slug>" }
```

`bearer_token_env_var` sends `Authorization: Bearer $PLANE_PAT`. The CLI supports
`codex mcp add … --bearer-token-env-var PLANE_PAT`; arbitrary headers are config-file only.

== Local (stdio) {#codex-stdio}

```toml
[mcp_servers.plane]
command = "uvx"
args = ["plane-mcp-server", "stdio"]

[mcp_servers.plane.env]
PLANE_API_KEY = "<your-api-key>"
PLANE_WORKSPACE_SLUG = "<your-workspace-slug>"
```

:::

### Cursor

Use `~/.cursor/mcp.json` globally or `.cursor/mcp.json` in a project.

:::tabs key:mcp-auth
== OAuth {#cursor-oauth}
[![Install in Cursor](/images/mcp/install-in-cursor.svg)](cursor://anysphere.cursor-deeplink/mcp/install?name=plane&config=eyJ1cmwiOiJodHRwczovL21jcC5wbGFuZS5zby9odHRwL21jcCJ9)

Or add the server manually:

```json
{
  "mcpServers": {
    "plane": {
      "url": "https://mcp.plane.so/http/mcp"
    }
  }
}
```

Cursor shows **Login** or **Needs authentication** and completes OAuth. Manage servers from **Customize**.

== Access token {#cursor-token}

```json
{
  "mcpServers": {
    "plane": {
      "url": "https://mcp.plane.so/http/api-key/mcp",
      "headers": {
        "Authorization": "Bearer ${env:PLANE_PAT}",
        "x-workspace-slug": "<workspace-slug>"
      }
    }
  }
}
```

== Local (stdio) {#cursor-stdio}

```json
{
  "mcpServers": {
    "plane": {
      "command": "uvx",
      "args": ["plane-mcp-server", "stdio"],
      "env": {
        "PLANE_API_KEY": "${env:PLANE_API_KEY}",
        "PLANE_WORKSPACE_SLUG": "<workspace-slug>"
      }
    }
  }
}
```

:::

Remote entries use `url` and must not include a `type` key.

### VS Code

Use `.vscode/mcp.json` for a workspace, or run **MCP: Open User Configuration** for the user file.

:::tabs key:mcp-auth
== OAuth {#vs-code-oauth}
[![Install in VS Code](/images/mcp/install-in-vscode.svg)](https://vscode.dev/redirect/mcp/install?name=plane&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.plane.so%2Fhttp%2Fmcp%22%7D)

[Install in VS Code Insiders](https://insiders.vscode.dev/redirect/mcp/install?name=plane&config=%7B%22type%22%3A%22http%22%2C%22url%22%3A%22https%3A%2F%2Fmcp.plane.so%2Fhttp%2Fmcp%22%7D&quality=insiders), or add it from the CLI:

```bash
code --add-mcp '{"name":"plane","type":"http","url":"https://mcp.plane.so/http/mcp"}'
```

Trust the server on first start, verify it with **MCP: List Servers**, and use Copilot Chat in **Agent** mode.
Copilot Business and Enterprise organizations must enable the "MCP servers in Copilot" policy.

== Access token {#vs-code-token}

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "plane-pat",
      "description": "Plane personal access token",
      "password": true
    },
    {
      "type": "promptString",
      "id": "plane-slug",
      "description": "Plane workspace slug"
    }
  ],
  "servers": {
    "plane": {
      "type": "http",
      "url": "https://mcp.plane.so/http/api-key/mcp",
      "headers": {
        "Authorization": "Bearer ${input:plane-pat}",
        "x-workspace-slug": "${input:plane-slug}"
      }
    }
  }
}
```

== Local (stdio) {#vs-code-stdio}

```json
{
  "servers": {
    "plane": {
      "type": "stdio",
      "command": "uvx",
      "args": ["plane-mcp-server", "stdio"],
      "env": {
        "PLANE_API_KEY": "<your-api-key>",
        "PLANE_WORKSPACE_SLUG": "<your-workspace-slug>"
      }
    }
  }
}
```

:::

### Windsurf

Current vendor docs call Windsurf **Devin Desktop**. Its configuration remains at
`~/.codeium/windsurf/mcp_config.json`; open Cascade's **MCPs → Manage MCPs** or
**Settings → Cascade → MCP Servers**.

:::tabs key:mcp-auth
== OAuth {#windsurf-oauth}

```json
{
  "mcpServers": {
    "plane": {
      "serverUrl": "https://mcp.plane.so/http/mcp"
    }
  }
}
```

If the OAuth sign-in does not complete, use the access-token configuration instead.

== Access token {#windsurf-token}

```json
{
  "mcpServers": {
    "plane": {
      "serverUrl": "https://mcp.plane.so/http/api-key/mcp",
      "headers": {
        "Authorization": "Bearer ${env:PLANE_PAT}",
        "x-workspace-slug": "<workspace-slug>"
      }
    }
  }
}
```

== Local (stdio) {#windsurf-stdio}

```json
{
  "mcpServers": {
    "plane": {
      "command": "uvx",
      "args": ["plane-mcp-server", "stdio"],
      "env": {
        "PLANE_API_KEY": "${env:PLANE_API_KEY}",
        "PLANE_WORKSPACE_SLUG": "<workspace-slug>"
      }
    }
  }
}
```

:::

Remote entries use `serverUrl`. Refresh the server list after saving.

### Zed

Use **Settings → AI → MCP Servers → Add Server**, or edit `~/.config/zed/settings.json`.

:::tabs key:mcp-auth
== OAuth {#zed-oauth}

```json
{
  "context_servers": {
    "plane": {
      "url": "https://mcp.plane.so/http/mcp"
    }
  }
}
```

Zed prompts for OAuth through an allowlisted loopback callback.

== Access token {#zed-token}

```json
{
  "context_servers": {
    "plane": {
      "url": "https://mcp.plane.so/http/api-key/mcp",
      "headers": {
        "Authorization": "Bearer <PAT>",
        "x-workspace-slug": "<workspace-slug>"
      }
    }
  }
}
```

== Local (stdio) {#zed-stdio}

```json
{
  "context_servers": {
    "plane": {
      "command": "uvx",
      "args": ["plane-mcp-server", "stdio"],
      "env": {
        "PLANE_API_KEY": "<your-api-key>",
        "PLANE_WORKSPACE_SLUG": "<your-workspace-slug>"
      }
    }
  }
}
```

:::

Zed uses this flat schema; the old nested `command.path` and `source: custom` shape is outdated.

### Antigravity

The IDE and CLI share `~/.gemini/config/mcp_config.json` globally or `.agents/mcp_config.json` in a workspace.

:::tabs key:mcp-auth
== OAuth {#antigravity-oauth}

```json
{
  "mcpServers": {
    "plane": {
      "serverUrl": "https://mcp.plane.so/http/mcp"
    }
  }
}
```

OAuth is automatic. In the IDE, open **… → MCP Servers → Manage MCP Servers**. In Antigravity 2.0, use
**Settings → Customizations → Installed MCP Servers → Add MCP**; in the CLI, run `/mcp`.

== Access token {#antigravity-token}

```json
{
  "mcpServers": {
    "plane": {
      "serverUrl": "https://mcp.plane.so/http/api-key/mcp",
      "headers": {
        "Authorization": "Bearer ${env:PLANE_PAT}",
        "x-workspace-slug": "<workspace-slug>"
      }
    }
  }
}
```

== Local (stdio) {#antigravity-stdio}

```json
{
  "mcpServers": {
    "plane": {
      "command": "uvx",
      "args": ["plane-mcp-server", "stdio"],
      "env": {
        "PLANE_API_KEY": "${env:PLANE_API_KEY}",
        "PLANE_WORKSPACE_SLUG": "<workspace-slug>"
      }
    }
  }
}
```

:::

Remote entries require `serverUrl`; `url` and `httpUrl` are unsupported.

### Other clients

For a stdio-only client, use `mcp-remote` with Node.js 22+ recommended. A client with native remote-MCP support only
needs the OAuth URL.

:::tabs key:mcp-auth
== OAuth {#other-clients-oauth}

```json
{
  "mcpServers": {
    "plane": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.plane.so/http/mcp"]
    }
  }
}
```

== Access token {#other-clients-token}

```json
{
  "mcpServers": {
    "plane": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://mcp.plane.so/http/api-key/mcp",
        "--header",
        "Authorization:${PLANE_AUTH_HEADER}",
        "--header",
        "x-workspace-slug:${PLANE_WORKSPACE_SLUG}"
      ],
      "env": {
        "PLANE_AUTH_HEADER": "Bearer <PAT>",
        "PLANE_WORKSPACE_SLUG": "<workspace-slug>"
      }
    }
  }
}
```

:::

`mcp-remote` reads headers from its `--header` arguments; a `headers` key on this stdio entry is ignored. Keep the
header values in `env` and write the arguments without spaces around the colon: on Windows, spaces inside `args` can be
mangled by some clients. To reset cached OAuth state, remove `~/.mcp-auth` (or the directory `MCP_REMOTE_CONFIG_DIR`
points to).

## Common workflows

**What's on my plate**

```text
List work items assigned to me that are in progress or overdue, grouped by project.
```

_Trace: `member me` → `workitem list` without `project_id`, using
`pql='assignee = currentUser() AND (stateGroup = "started" OR isOverdue())'`._

**File a bug**

```text
Create a high-priority bug in ENG called "Login times out on Safari 17". Description: the OAuth callback lands on a blank page. Assign it to me and add the "auth" label.
```

_Trace: `project list` → `member me` → `label list` → `workitem create`._

**Roll over a sprint**

```text
Create Sprint 15 in ENG from June 2 to June 15, move everything unfinished from Sprint 14 into it, and give me a count by priority.
```

_Trace: `cycle create` with `owned_by` → `cycle list` to find Sprint 14 → `cycle transfer_workitems` →
`workitem count` with `pql` and `group_by="priority"`._

**Close the loop**

```text
Log 90 minutes on ENG-42 with the note "Implemented retry logic", mark it Done, and comment "Fixed in abc1234, needs QA".
```

_Trace: `workitem retrieve_by_identifier` → `work_log create` → `state list` → `workitem update` →
`workitem_comment create`._

## Permissions and sessions

- The server acts as the authenticated user. Plane enforces workspace and project roles, so a Guest cannot do more
  through MCP.
- OAuth requests `read` and `write` scopes. The workspace chosen at consent binds that connection; reconnect to
  switch workspaces.
- A PAT connection is scoped by `x-workspace-slug`.
- Hosted OAuth tokens are stored server-side in Redis or Valkey. A self-hosted server without Redis falls back to
  in-memory storage.
- Revoke access by disconnecting the connector in your client, deleting a PAT in Plane, or clearing the
  `mcp-remote` cache.

## Security best practices

- Use only `https://mcp.plane.so` or your own trusted host, and check the URL on Plane's consent screen.
- Treat work item titles, descriptions, comments, and attachments as untrusted model input. Prefer clients that
  confirm writes; destructive actions are flagged with `destructiveHint`.
- Keep PATs out of shared or committed configs. Use environment variables or `${input:...}`, and never commit a
  token in a project-scoped `.mcp.json`.
- Use a workspace access token with the minimum role needed for automations.
- Revoke tokens in Plane settings and audit API token events in the workspace audit log.
- Server logs are structured JSON with tool name, duration, status, opaque user ID, and workspace slug. Display
  names are logged only when `LOG_USER_INFO=true`, because they are PII.

## Self-hosted Plane

The hosted `mcp.plane.so` service cannot reach private Plane instances. In stdio mode, set `PLANE_BASE_URL` to your
instance URL, then test the token against Plane's REST API. Read the key into a shell variable first so it stays out
of your command history:

```bash
read -rs PLANE_API_KEY   # paste the key and press Enter; nothing is echoed
curl -H "x-api-key: $PLANE_API_KEY" \
  "https://plane.yourcompany.com/api/v1/users/me/"
```

A `200` response confirms the key and URL. That header is the Plane REST API header, not the MCP PAT header.

::: tip Running your own MCP server?
Follow the [self-hosting guide](/dev-tools/mcp-server-self-host) for Docker, Helm, OAuth, storage, and operations.
The OAuth transport needs Plane's OAuth application registration, which is available on Plane Cloud and Plane
Commercial Edition; on Community Edition, use stdio mode.
:::

## Upgrading

### From per-operation tools (0.2.x → 0.3.0)

The 177 per-operation tools became 28 resource tools. Of the 177 names, 169 still resolve as hidden aliases and keep
their original parameter names, so saved prompts and scripts continue to work; `get_pql_reference` is unchanged; and
seven cannot be mapped and return a message naming their replacement. See
[retired tool names](/dev-tools/mcp-server-tools#retired-tool-names).

`project list` is now paginated by default. Follow `next_cursor` or pass `per_page`. Archive actions now return an
explicit status object.

### From the Node.js server

The `@makeplane/plane-mcp-server` npm package is deprecated. Update environment variables, then use the stdio
configuration shown above:

| Node.js server         | Python server          |
| ---------------------- | ---------------------- |
| `PLANE_API_KEY`        | `PLANE_API_KEY`        |
| `PLANE_API_HOST_URL`   | `PLANE_BASE_URL`       |
| `PLANE_WORKSPACE_SLUG` | `PLANE_WORKSPACE_SLUG` |

Replace the old Node.js `command` and `args` with `uvx plane-mcp-server stdio`.

## Troubleshooting

| Symptom                             | Cause                                       | Fix                                                                  |
| ----------------------------------- | ------------------------------------------- | -------------------------------------------------------------------- |
| 401 with PAT                        | Token is wrong, revoked, or uses old header | Use `Authorization: Bearer <PAT>` instead of `x-api-key`             |
| 401 with OAuth                      | Token expired                               | Re-authenticate from the client                                      |
| "workspace slug missing"            | PAT config omits the workspace header       | Add `x-workspace-slug`                                               |
| 404                                 | Workspace slug or resource ID is wrong      | Check the slug or ID                                                 |
| 403                                 | Your Plane role is too low                  | Ask for the required workspace or project role                       |
| 400                                 | An argument is missing or invalid           | Read the error; permitted enum values are in the tool description    |
| "not available on your plan" or 402 | The Plane plan does not include the feature | Enable the feature or use an available action                        |
| `mcp-remote` fails to start         | Node.js is too old                          | Use Node.js 22+ and run `npx -y mcp-remote@latest`                   |
| Server is not listed                | JSON or client schema is invalid            | Remove trailing commas; apply the client-specific schema notes above |
| Only the first page of projects     | `project list` is paginated                 | Follow `next_cursor` or pass `per_page`                              |
| Tools look stale or out of order    | Pinned tool order or client cache is stale  | Restart the client after upgrades                                    |

For a server that is not listed, remember that Claude Desktop's JSON file cannot contain `url`,
Windsurf and Antigravity require `serverUrl`, and a Cursor remote entry must not contain `type`.

Debug with:

```bash
claude --debug
claude mcp list

PLANE_API_KEY=<your-api-key> PLANE_WORKSPACE_SLUG=<workspace-slug> uvx plane-mcp-server stdio

curl -X POST http://localhost:8211/http/mcp

rm -rf ~/.mcp-auth
```

The local HTTP request should return either `401` or an MCP response.

## FAQ

::: details Which Plane plans work?
The server follows your Plane plan and role. A plan-gated action returns a message naming the unavailable feature.
:::

::: details Is the server free?
The MIT-licensed server is free to use. The Plane features it can access follow your Plane plan.
:::

::: details Does it work with self-hosted Plane?
Yes. Use stdio with `PLANE_BASE_URL`, or [deploy your own MCP server](/dev-tools/mcp-server-self-host).
:::

::: details Is there a read-only mode?
There is no separate read-only endpoint. Use your client's tool allow-list; read-only tools are annotated with
`readOnlyHint`.
:::

::: details Can I limit which tools are available?
Yes. Use the client's tool allow-list or deny-list.
:::

::: details How do epics work?
An epic is a work item whose type is "Epic". Follow the [epics recipe](/dev-tools/mcp-server-tools#epics).
:::

::: details Does it use Plane AI credits?
No. The MCP server calls Plane's API directly; the AI model belongs to your MCP client.
:::

::: details Where does my data go?
The hosted server proxies requests to `api.plane.so`. Self-host the MCP server if you need full infrastructure
control.
:::

## See also

- [Tool reference](/dev-tools/mcp-server-tools)
- [Self-host the MCP server](/dev-tools/mcp-server-self-host)
- [Short setup guide](https://docs.plane.so/ai/mcp-server)
- [Plane MCP server on GitHub](https://github.com/makeplane/plane-mcp-server)
- [Plane Query Language](https://docs.plane.so/core-concepts/issues/plane-query-language)
