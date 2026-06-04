---
title: Cursor integration
description: Connect Plane to Cursor AI to assign coding tasks directly from work items. Cursor reads your spec, writes the code, and opens a pull request in your linked GitHub repository.
---

# Cursor integration

The Cursor integration connects Plane to [Cursor](https://cursor.com), an AI-powered code editor. Once set up, anyone on your workspace can hand a coding task to Cursor's AI agent directly from a work item - either by assigning Cursor as a work item assignee or by mentioning `@cursor` in a comment.

Either way, Cursor reads the work item, writes the code, and opens a pull request in the linked GitHub repository. The work item becomes the spec; Cursor does the implementation.

The integration works through Plane's work item interface - no IDE required on the person's end to trigger the task. The PR appears in GitHub once Cursor completes the work.

Two things need to be true before anyone can use Cursor from a work item:

1. A workspace admin has installed and configured the integration, including mapping at least one Plane project to a GitHub repository.
2. Depending on how the admin has configured authentication, either the workspace has a shared Cursor API key or the individual member has connected their own Cursor account.

## Set up the integration

This section is for workspace admins. You'll install the integration, provide a Cursor API key, and map your Plane projects to GitHub repositories.

### Install the Cursor integration

1. Go to **Workspace Settings → Integrations**.
2. Find **Cursor** and click **Connect**.
3. Follow the installation prompts.

Once installed, the configuration panel appears on the same page.

## Configure the API key

After installation, you need to provide a Cursor API key so the integration can communicate with Cursor on your workspace's behalf. By default, the integration runs in shared mode - one key for the whole workspace.

1. Go to **Workspace Settings → Integrations → Cursor**.
2. Under **Configuration**, find the **API Key** field.
3. Paste your Cursor API key and click **Save API key**.

Your key is encrypted at rest and masked after saving. To replace it, paste a new key into the same field.

You can get your Cursor API key from [cursor.com/settings](https://cursor.com/settings).

### Set up project mappings

Project mappings tell Cursor which GitHub repository to push code to when someone uses `@cursor` on a work item in a given Plane project. You need at least one mapping before anyone can use the integration.

1. Go to **Workspace Settings → Integrations → Cursor**.
2. Scroll to **Project Mappings**.
3. Click the **+** button to add a mapping.
4. Select a **Plane project** from the dropdown.
5. Select the **GitHub repository** to link it to. If your repositories don't appear in the list, type `owner/repo` manually.
6. Optionally enter a **Branch** to specify which branch Cursor should target. Defaults to your repository's default branch.
7. Click **Save**.

A project can be mapped to more than one repository. If a project has multiple mappings, users need to specify which repository they want Cursor to work in when they use `@cursor`. See [Using @cursor on work items](#use-cursor-on-work-items).

### Edit or delete a project mapping

1. Go to **Workspace Settings → Integrations → Cursor**.
2. In the **Project Mappings** section, find the mapping you want to change.
3. Click the edit icon to modify it, or the delete icon to remove it.

Deleting a mapping means `@cursor` will no longer work for that project until a new mapping is added.

## Choose an authentication mode

The integration has two modes that control how Cursor authenticates when creating pull requests.

### Shared key mode

In shared mode, all workspace members share one Cursor API key set by the admin. Pull requests are created by the Cursor bot - not on behalf of individual users. Usage is billed to the workspace's Cursor account.

This is the default after installation. It's the simplest setup: the admin configures the key once and every member can immediately start using `@cursor`.

### Per-user mode

In per-user mode, each member connects their own Cursor account using their personal Cursor API key. Pull requests are opened on behalf of each individual, not the bot. Usage is tracked against each member's personal Cursor plan.

This mode gives more visibility into who triggered which PR and is the right choice when your team members each have their own Cursor subscriptions.

When per-user mode is on, members who haven't connected their account will see a warning in Plane and won't be able to use `@cursor` until they connect. Admins can see how many members have connected from the **Member connections** card on the integration settings page.

### Switch to per-user mode

1. Go to **Workspace Settings → Integrations → Cursor**.
2. Under **Configuration**, toggle on **Require each user to connect their Cursor account**.
3. Read the confirmation dialog - it explains what changes for your workspace - and confirm.

What happens when you switch:
- Members must connect their own Cursor API key from the **Connections** page before they can use `@cursor`.
- PRs will be opened on each user's behalf instead of by the Cursor bot.
- Cursor usage is tracked against each member's individual plan.
- Your existing workspace API key becomes your personal Cursor connection - you don't need to re-paste it.
- The shared workspace key is retained but disabled. You can switch back at any time.

### Switch back to shared key mode

1. Go to **Workspace Settings → Integrations → Cursor**.
2. Toggle off **Require each user to connect their Cursor account**.
3. Confirm in the dialog.

What happens when you switch back:
- All `@cursor` tasks will be created by the shared Cursor bot, regardless of who triggered them.
- Usage is billed to the workspace account.
- Members' personal connections are retained but ignored until per-user mode is re-enabled.

## Connect your Cursor account

This section is for individual workspace members when per-user mode is enabled.

If your workspace admin has enabled per-user auth, you need to connect your own Cursor account before you can use `@cursor`. You'll see a "Required by admin" badge on the Cursor connection card if this applies to you.

1. Go to your workspace's **Connections** page.
2. Find the **Cursor** card.
3. Click **Connect Cursor**.
4. In the **Cursor API key** field, paste your personal Cursor API key.
   - Get your key from [cursor.com/settings](https://cursor.com/settings).
   - The key format looks like `cursor_sk_••••••••••••••••`.
5. Click **Connect**.

Plane verifies the key and saves it encrypted. Once connected, the card shows your connected email address and the last four characters of your key. You won't be able to see the full key after saving - generate a new one if you think it's been exposed.

### Disconnect your Cursor account

1. Go to the **Connections** page.
2. Find the **Cursor** card.
3. Click **Disconnect**.

Disconnecting removes your key from Plane. You can reconnect at any time.

## Use Cursor on work items

Once the integration is set up and you're authenticated, there are two ways to hand a task to Cursor from a work item in a mapped project.

### Assign Cursor as an assignee

When you assign Cursor to a work item, Cursor picks up the task automatically - no comment needed. Cursor reads the work item's title and description as its spec, writes the code, and opens a pull request in the linked repository.

1. Open a work item in a project that has a repository mapping.
2. In the **Assignees** field, search for and select **Cursor**.
3. That's it. Cursor begins working on the task using the work item title and description.

Cursor appears in the assignee picker like any other team member once the integration is installed. The PR is created on your behalf in per-user mode, or by the Cursor bot in shared mode.

If your project is mapped to more than one GitHub repository, Cursor needs to know which one to use. Add a comment with `[repo=owner/name]` after assigning:

```
[repo=acme/backend]
```

### Mention @cursor in a comment

You can also trigger Cursor by posting a comment that includes `@cursor`. This is useful when you want to give Cursor a specific instruction beyond what's in the work item, or when you want to send a follow-up prompt to an already-active Cursor session.

1. Open a work item in a project that has a repository mapping.
2. Add a comment describing the coding task you want Cursor to complete.
3. Include `@cursor` in the comment.
4. Post the comment.

Cursor uses the comment - along with the work item's title and description - as its instructions. You can continue the conversation by posting additional comments with `@cursor` to give Cursor follow-up instructions.

### Specify a repository when a project has multiple mappings

If your project is mapped to more than one GitHub repository, you need to tell Cursor which one to use. Add `[repo=owner/name]` anywhere in your comment:

```
@cursor Fix the null pointer exception in the auth module [repo=acme/backend]
```

If you don't specify a repository and the project has multiple mappings, Cursor may not know where to push the code.

### Write effective instructions

Whether you're using the assignee or a comment, Cursor uses the work item's title and description as context. The clearer and more specific your work item (and comment), the better the result.

Include:
- What needs to change and where
- Any constraints or requirements (don't break this test, match this pattern, etc.)
- The acceptance criteria if it's not already in the work item description