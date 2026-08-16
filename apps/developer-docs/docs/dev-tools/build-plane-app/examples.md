---
title: Plane app code examples
description: Full code examples for building Plane OAuth apps with Node.js (Express) and Python (Flask). Includes bot token flow, user token flow, and webhook handling.
keywords: plane app example, plane oauth example, plane node.js integration, plane python integration, plane express app, plane flask app, plane api code sample
---

# Complete examples

::: code-group

```typescript [TypeScript (Express)]
import express from "express";
import axios from "axios";
import crypto from "crypto";

const app = express();

const CLIENT_ID = process.env.PLANE_CLIENT_ID!;
const CLIENT_SECRET = process.env.PLANE_CLIENT_SECRET!;
const REDIRECT_URI = process.env.PLANE_REDIRECT_URI!;
const WEBHOOK_SECRET = process.env.PLANE_WEBHOOK_SECRET!;
const PLANE_API_URL = process.env.PLANE_API_URL || "https://api.plane.so";

// In-memory storage (use a database in production)
const installations = new Map<
  string,
  {
    botToken: string;
    workspaceSlug: string;
    appInstallationId: string;
  }
>();

// Setup URL - redirect to Plane's consent screen
app.get("/oauth/setup", (req, res) => {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
  });
  res.redirect(`${PLANE_API_URL}/auth/o/authorize-app/?${params}`);
});

// OAuth callback - exchange app_installation_id for bot token
app.get("/oauth/callback", async (req, res) => {
  const appInstallationId = req.query.app_installation_id as string;

  if (!appInstallationId) {
    return res.status(400).send("Missing app_installation_id");
  }

  try {
    const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

    // Exchange for bot token
    const tokenRes = await axios.post(
      `${PLANE_API_URL}/auth/o/token/`,
      new URLSearchParams({
        grant_type: "client_credentials",
        app_installation_id: appInstallationId,
      }).toString(),
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const botToken = tokenRes.data.access_token;

    // Get workspace details
    const installRes = await axios.get(`${PLANE_API_URL}/auth/o/app-installation/?id=${appInstallationId}`, {
      headers: { Authorization: `Bearer ${botToken}` },
    });

    const installation = installRes.data[0];
    const workspaceId = installation.workspace;
    const workspaceSlug = installation.workspace_detail.slug;

    // Store credentials
    installations.set(workspaceId, { botToken, workspaceSlug, appInstallationId });

    console.log(`Installed in workspace: ${workspaceSlug}`);
    res.send("Installation successful! You can close this window.");
  } catch (error) {
    console.error("OAuth error:", error);
    res.status(500).send("Installation failed");
  }
});

// Webhook handler
app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const signature = req.headers["x-plane-signature"] as string;
  const payload = req.body.toString();

  // Verify signature
  const expected = crypto.createHmac("sha256", WEBHOOK_SECRET).update(payload).digest("hex");
  if (!crypto.timingSafeEqual(Buffer.from(signature || ""), Buffer.from(expected))) {
    return res.status(403).send("Invalid signature");
  }

  const event = JSON.parse(payload);
  console.log(`Received: ${event.event} ${event.action}`);

  // Get credentials for this workspace
  const creds = installations.get(event.workspace_id);
  if (creds) {
    // Process the event with creds.botToken
  }

  res.status(200).send("OK");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
```

```python [Python (Flask)]
import os
import hmac
import hashlib
import base64
import requests as http_requests
from flask import Flask, request, redirect
from urllib.parse import urlencode

app = Flask(__name__)

CLIENT_ID = os.getenv("PLANE_CLIENT_ID")
CLIENT_SECRET = os.getenv("PLANE_CLIENT_SECRET")
REDIRECT_URI = os.getenv("PLANE_REDIRECT_URI")
WEBHOOK_SECRET = os.getenv("PLANE_WEBHOOK_SECRET")
PLANE_API_URL = os.getenv("PLANE_API_URL", "https://api.plane.so")

# In-memory storage (use a database in production)
installations = {}


@app.route("/oauth/setup")
def oauth_setup():
    """Redirect to Plane's consent screen."""
    params = urlencode({
        "client_id": CLIENT_ID,
        "response_type": "code",
        "redirect_uri": REDIRECT_URI,
    })
    return redirect(f"{PLANE_API_URL}/auth/o/authorize-app/?{params}")


@app.route("/oauth/callback")
def oauth_callback():
    """Exchange app_installation_id for bot token."""
    app_installation_id = request.args.get("app_installation_id")

    if not app_installation_id:
        return "Missing app_installation_id", 400

    try:
        # Exchange for bot token
        credentials = f"{CLIENT_ID}:{CLIENT_SECRET}"
        basic_auth = base64.b64encode(credentials.encode()).decode()

        token_response = http_requests.post(
            f"{PLANE_API_URL}/auth/o/token/",
            data={
                "grant_type": "client_credentials",
                "app_installation_id": app_installation_id,
            },
            headers={
                "Authorization": f"Basic {basic_auth}",
                "Content-Type": "application/x-www-form-urlencoded",
            },
        )
        token_response.raise_for_status()
        bot_token = token_response.json()["access_token"]

        # Get workspace details
        install_response = http_requests.get(
            f"{PLANE_API_URL}/auth/o/app-installation/",
            params={"id": app_installation_id},
            headers={"Authorization": f"Bearer {bot_token}"},
        )
        install_response.raise_for_status()
        installation = install_response.json()[0]

        workspace_id = installation["workspace"]
        workspace_slug = installation["workspace_detail"]["slug"]

        # Store credentials
        installations[workspace_id] = {
            "bot_token": bot_token,
            "workspace_slug": workspace_slug,
            "app_installation_id": app_installation_id,
        }

        print(f"Installed in workspace: {workspace_slug}")
        return "Installation successful! You can close this window."

    except Exception as e:
        print(f"OAuth error: {e}")
        return "Installation failed", 500


@app.route("/webhook", methods=["POST"])
def webhook():
    """Handle incoming webhooks."""
    signature = request.headers.get("X-Plane-Signature", "")
    payload = request.get_data()

    # Verify signature
    expected = hmac.new(
        WEBHOOK_SECRET.encode(), payload, hashlib.sha256
    ).hexdigest()

    if not hmac.compare_digest(expected, signature):
        return "Invalid signature", 403

    event = request.get_json()
    print(f"Received: {event['event']} {event['action']}")

    # Get credentials for this workspace
    creds = installations.get(event["workspace_id"])
    if creds:
        # Process the event with creds["bot_token"]
        pass

    return "OK", 200


if __name__ == "__main__":
    app.run(port=3000)
```

:::

## Next Steps

- [Build an Agent](/dev-tools/agents/overview) - Create AI agents that respond to @mentions
- [API Reference](/api-reference/introduction) - Explore the full Plane API
- [Webhook Events](/dev-tools/intro-webhooks) - All webhook event types
- [Example: PRD Agent](https://github.com/makeplane/prd-agent) - Complete agent implementation

## Publish to Marketplace

Apps can be listed on the [Plane Marketplace](https://plane.so/marketplace/integrations). Contact [support@plane.so](mailto:support@plane.so) to list your app.
