---
title: Reusable skills for Plane AI
description: Save the instructions you give Plane AI over and over as skills, and run them anytime by typing "/" in the chat.
---

# Skills

Every team asks its AI the same things again and again - "give me a standup update," "summarize this sprint," "file a bug the way we like it." Skills let you write those instructions once, give them a name, and reuse them anytime with a quick `/` command in [Plane AI](/ai/plane-ai) chat.

Think of a skill as a saved recipe for Plane AI. Instead of typing a long, careful prompt every time, you type `/standup` and Plane AI already knows exactly what you want and how you want it presented.

## Use a skill

1. Open the Plane AI chat.
2. Type `/` in the chat input. A menu of your available skills appears - keep typing to filter it.
3. Pick a skill, add any extra details in the same message, and send.

Plane AI follows the skill's instructions for that message. Your next message is a normal conversation again, unless you call a skill there too.

For example, with the built-in **cycle-report** skill:

```
/cycle-report Sprint 42
```

Plane AI pulls up Sprint 42 and reports its progress, scope changes, burndown trend, and risks - formatted the same way every time.

## Built-in skills

Plane ships with a set of ready-made skills, available to everyone in every workspace:

| Skill              | What it does                                                                       |
| ------------------ | ---------------------------------------------------------------------------------- |
| `/my-work`         | Your open work items across the workspace, grouped by status and priority.         |
| `/standup`         | A daily standup update - what you completed, what's in progress, what's blocked.   |
| `/project-status`  | A health snapshot of a project - progress, priorities, risks, and recent changes.  |
| `/cycle-report`    | Cycle progress - scope, completion, burndown trend, and risks.                     |
| `/team-workload`   | How open work is spread across the team, with overloaded and idle members flagged. |
| `/blocked-items`   | Everything that's blocked, who owns it, and what's blocking it.                    |
| `/needs-attention` | A cleanup list - overdue, stale, and started-but-unassigned work.                  |
| `/recent-activity` | What changed recently - created, completed, and updated work.                      |
| `/find-pages`      | Searches your wiki pages for a topic and summarizes the best matches.              |
| `/time-tracking`   | Logged time summarized by person and work item.                                    |
| `/file-bug`        | Creates a well-structured bug report in your current project.                      |
| `/new-prd`         | Creates a PRD page for a feature from a ready-made template.                       |

Most built-in skills answer questions, so they work in any mode. The last two - `/file-bug` and `/new-prd` - create things in your workspace, so use them in [Build or Autopilot mode](/ai/plane-ai#choose-a-mode).

Built-in skills can't be edited or deleted, but you can create your own versions that fit your team better.

## Create your own skill

Open the full-page Plane AI view and select **Skills** in the sidebar - or type `/` in the chat input and choose **Manage skills**. Then:

1. Click **Add new skill**.
2. **Name it.** The name becomes the skill's `/` command, so keep it short and memorable - lowercase words separated by hyphens, like `release-notes` or `weekly-update`.
3. **Describe it** (optional). A one-line summary that shows up in the `/` menu, so you - and teammates, if you share it - remember what it does.
4. **Write the instructions.** This is the heart of the skill: tell Plane AI what to do, what to include, and how to present it, in plain language. Instructions can be up to 8,000 characters.
5. Choose who can use it (see [Personal and workspace skills](#personal-and-workspace-skills)) and click **Save**.

Your new skill now shows up whenever you type `/` in the chat input.

### Write good instructions

Write instructions the way you'd brief a new teammate - clear about the goal, specific about the details:

- **Say what to include and what to skip.** "List each item on one line with its ID and due date. Skip anything already completed."
- **Say how to format it.** Sections, tables, bullet points, a one-line summary up top - if you have a preference, state it.
- **Set defaults.** "Look at the last 7 days unless I say otherwise."

Here's an example - a `release-notes` skill:

```
Draft release notes from the work items completed in the cycle I mention.

Group them under three headings: New features, Improvements, and Bug fixes.
Write each entry as one customer-friendly sentence - plain language, no
internal jargon or item IDs. Skip anything labeled "internal". End with a
short "Thanks" line crediting the contributors.
```

Now `/release-notes for the March cycle` produces consistent, ready-to-publish notes every time.

### Add variables

Skills can have blanks that get filled in when you use them. In the instructions editor, click **Add variable** or type `{` to insert one - pick a ready-made Plane variable like `{{cycle}}`, `{{project}}`, `{{assignee}}`, or `{{due_date}}`, or type your own like `{{topic}}`.

When you run the skill, Plane AI picks up each value from your message. So if your skill says "Search the wiki for {{topic}}", typing `/find-pages onboarding checklist` fills in the blank automatically. If Plane AI can't tell what a value should be, it asks you before proceeding.

## Personal and workspace skills

When you create a skill, you choose who it's for:

- **Personal** - only you can see and use it. Perfect for your own routines, like how you like your morning catch-up formatted.
- **Workspace** - everyone in the workspace can use it. Great for team standards, like how bugs get filed or how weekly updates read. Publishing to the workspace is reserved for workspace admins, so shared skills stay curated.

| Skill type | Who can use it            | Who can create and edit it    |
| ---------- | ------------------------- | ----------------------------- |
| Personal   | Just you                  | You                           |
| Workspace  | Everyone in the workspace | Workspace admins              |
| Built-in   | Everyone                  | No one - they ship with Plane |

If you're a workspace admin, you can also promote one of your personal skills to a workspace skill later - open it from the Skills page and switch its scope from **Personal** to **Workspace**.

## Good to know

- A skill guides _how_ Plane AI responds - it never changes _what_ Plane AI can access. Plane AI only ever works with the projects and data you already have permission to see.
- One skill applies per message. Use the skill again in your next message if you want it again.
- You can edit or delete your skills anytime from the Skills page. Deleting one doesn't affect your past conversations.
- Skill names must be unique - you can't have two personal skills with the same name, and a workspace can't have two workspace skills with the same name.
- Skills aren't available to guest users.
- If you don't see Skills in your workspace, it isn't enabled on your plan or instance yet.
