---
title: Quick Start
pageTitle: Quick Start | Plane
description: This section helps you get comfortable with Plane and find your way around more effectively.
---

This section helps you get comfortable with Plane and find your way around more effectively.

## What is Plane?

Plane is a simple, extensible, open source project and product management
tool. It allows users to start with a basic task tracking tool and gradually
adopt various project management frameworks like Agile, Waterfall, and many
more.

These frameworks come pre-built in Plane, making it easy for teams to switch,
mix, or customize methodologies to suit their needs and preferences.
Additionally, Plane boasts a stunning and elegant interface, which further
enhances the user experience and overall aesthetics.

## Setting up Plane

You can begin using Plane through our hosted version, Plane Cloud.
Alternatively, if you prefer to self-host Plane, you can do so using Docker.

### Cloud

Setting up Plane with Plane Cloud is just a matter of signing up for a new
account. You can quickly get started with the free plan to get things up and
running.

### Self-hosted

If you prefer to self-host Plane on your own machine, you can do so using
Docker. However, please note that you'll need to add additional configurations
for email, authentication, and storage services. Plane is open-sourced under
Apache-2.0, and currently, we support self-hosting Plane using Docker. For
detailed instructions, please refer to the [self-hosting](/self-hosting) section.

{% callout type="note" %}
We are also working on making the self-hosting process smoother by introducing
easy deployment methods on popular PaaS tools such as Heroku, Render,
DigitalOcean, Railway, and more. If you wish to request any other
configuration, please raise a feature request on our
{% link href="https://github.com/makeplane/plane" target="_blank" %}GitHub{% /link %}.
{% /callout %}

## Sign-up and sign-in

Our new sign-up and sign-in flows make it easier for Instance admins to identify themselves and unlock security + governance features for their instance. Our Cloud users also enjoy easier sign-ups and sign-ins. See [Sign up and sign in](/sign-up-sign-in) for more.


## Onboarding and Invitation

If you have signed up for the first time, the first step in Plane is to create a
new workspace.

- If you are part of a team, you can invite your team members to the workspace
  before you can begin.

- If you are using Plane for personal use, you can skip the
  invitation part and be directly redirect to the workspace.

{% callout type="note" %}
During the onboarding process, the invited users will be assigned a **Viewer** role by default. You can adjust the permissions of invited users for your
project in the workspace or project settings page based on your specific
{% /callout %}

## The Dashboard

After signing up or signing in to a workspace, you will be redirected to the
Dashboard. This is where you will see all of the issues that are assigned and
pending for you.

## Creating Workspaces

Think of each workspace on Plane as a home for your content. Ideally, you can
consider a workspace as a different company or organization you work with.

- Inside, workspace, you can create projects as an individual, or invite
  collaborators to share a workspace as a team - it's up to you!

{% callout type="note" %}

When you sign up for the first time, we'll prompt you to create a new
workspace. If you're invited to join, you can directly join the workspace
without creating a new one.
{% /callout %}

## Creating Projects

Projects let you manage teams and issues within your Workspace. After creating
your Workspace, you will need to create a new project.

- If you want to invite other members to a project, you'll need to first add
  them to a workspace and give them access directly under Project settings after they
  have been invited.

- You can manage members either by navigating to **Project > Member Settings**
  page or by **Workspace > Member Settings** page.

## Creating Issues

In Plane, an issue is a task or piece of work. It could be small, like _Update
the primary color to blue_, or large, like _Building GitHub integration on
plane_. It all depends on how you and your team decide to break down your work
into issues.

Issues are identified by a project-specific and unique number (Example,
`VIH-19`), and they must be provided with a title and a state. All the other
properties and relations are optional, know more about there [here]().

{% callout type="note" %}

You can create issues by clicking on the `New Issue` button in the right-hand
corner of your project, or by using `C` shortcut.
{% /callout %}

There's lot more about Issues, learn about them [here](/issues).

## Creating Cycles

> In short, Cycles can also be referred to as Sprints in the world of AGILE.

Cycles is a custom time period in which a team works to complete
items on their backlog. At the end of the sprint, the team will usually have
finished building and implementing a new version of their project or product.

{% callout type="note" %}

Only one Cycle can be ongoing at a time to follow the principles of AGILE.
However, you can have your upcoming issues or draft issues already created for
the next cycles.
{% /callout %}

- You can move existing issues to a new or existing cycle, or create a new
  issue directly inside the Cycle

- Bulk operations are supported--you can add or update multiple issues to
  cycles at once.

- You can't update issues after a cycle is completed, however the pendind
  issues can be transffered to a new or upcoming cycle.

## Creating Modules

> In short, Modules can also be referred to as Epics in the world of AGILE.

Modules are smaller, focused projects that help you group and organize issues
within a specific time frame. They allow you to break down your work into
manageable chunks and track progress towards specific goals or objectives.

- You can create as many modules as you need within your workspace, and customize
  each one with its own set of issues, milestones, and team members.

- Modules allow you to add documents and links within them, providing a convenient way to share resources
  with others within the module.

Have questions? Ask the {% link href="https://discord.com/invite/29tPNhaV" target="_blank" %}Plane{% /link %} Community.

## Creating Pages

You can think of Pages as an AI-powered notepad. You can use Pages to quickly
jot down issues when you're in a meeting or starting a day. Later, you can
directly push them to the respective projects to convert them into an issue.

You've reached the end of this section. But there's more to it. Here are useful
resources for you to deep dive into each of these components of Plane.

- Learn more about [Workspaces](/workspaces)
- Learn more about [Projects](/projects)
- Learn more about [Issues](/issues)
- Learn more about [Cycles](/cycles)
- Learn more about [Modules](/modules)
- Learn more about [Pages](/pages)
