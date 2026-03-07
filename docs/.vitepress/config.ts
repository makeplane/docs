import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Plane",
  description: "Modern project management software",
  cleanUrls: true,

  head: [
    [
      "link",
      {
        rel: "icon",
        href: "https://media.docs.plane.so/logo/favicon-32x32.png",
      },
    ],
    [
      "link",
      {
        rel: "preload",
        href: "/fonts/Satoshi/Satoshi-Variable.ttf",
        as: "font",
        type: "font/ttf",
        crossorigin: "anonymous",
      },
    ],
    [
      "link",
      {
        rel: "preload",
        href: "/fonts/IBM/IBMPlexMono-Light.ttf",
        as: "font",
        type: "font/ttf",
        crossorigin: "anonymous",
      },
    ],
    [
      "link",
      {
        rel: "preload",
        href: "/fonts/IBM/IBMPlexMono-Regular.ttf",
        as: "font",
        type: "font/ttf",
        crossorigin: "anonymous",
      },
    ],
    [
      "link",
      {
        rel: "preload",
        href: "/fonts/IBM/IBMPlexMono-SemiBold.ttf",
        as: "font",
        type: "font/ttf",
        crossorigin: "anonymous",
      },
    ],
    [
      "link",
      {
        rel: "preload",
        href: "/fonts/IBM/IBMPlexMono-Bold.ttf",
        as: "font",
        type: "font/ttf",
        crossorigin: "anonymous",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=National+Park:wght@200..800&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap",
      },
    ],
    [
      "script",
      {
        src: "https://plausible.io/js/script.js",
        defer: "true",
        "data-domain": "docs.plane.so",
      },
    ],
    [
      "script",
      {
        src: "https://cdn.cr-relay.com/v1/site/b1fcbcbd-67f6-4736-940f-033731801664/signals.js",
        async: "true",
      },
    ],
    [
      "meta",
      {
        property: "og:image",
        content: "https://media.docs.plane.so/logo/og-docs.webp",
      },
    ],
    [
      "meta",
      {
        name: "twitter:image",
        content: "https://media.docs.plane.so/logo/og-docs.webp",
      },
    ],
    [
      "meta",
      {
        name: "keywords",
        content:
          "project management, issue tracking, sprint management, agile, scrum, create projects, track sprints",
      },
    ],
  ],

  themeConfig: {
    logo: {
      light: "https://media.docs.plane.so/logo/new-logo-white.png",
      dark: "https://media.docs.plane.so/logo/new-logo-dark.png",
    },
    siteTitle: "",

    search: {
      provider: "algolia",
      options: {
        appId: "AXICJJC8RP",
        apiKey: "23df4157dee1d9a8d435cadd6cae3f26",
        indexName: "plane-docs-v3",
      },
    },

    socialLinks: [
      {
        icon: "discord",
        link: "https://discord.com/invite/A92xrEGCge",
      },
      {
        icon: "github",
        link: "https://github.com/makeplane/plane",
      },
    ],

    nav: [
      {
        text: "Sign in",
        link: "https://app.plane.so/sign-in",
      },
    ],

    sidebar: [
      {
        text: "Get started",
        collapsed: false,
        items: [
          { text: "Introduction", link: "/" },
          { text: "Quickstart", link: "/introduction/quickstart" },
          { text: "Core Concepts", link: "/introduction/core-concepts" },
          {
            text: "Tutorials",
            link: "/introduction/tutorials/overview",
            collapsed: true,
            items: [
              {
                text: "Create workspace",
                link: "/introduction/tutorials/create-workspace",
              },
              {
                text: "Invite members",
                link: "/introduction/tutorials/invite-members",
              },
              {
                text: "Create project",
                link: "/introduction/tutorials/create-project",
              },
              {
                text: "Create work items",
                link: "/introduction/tutorials/create-work-items",
              },
              {
                text: "Collaborate on work items",
                link: "/introduction/tutorials/collaborate-on-work-items",
              },
              {
                text: "Organize and view work",
                link: "/introduction/tutorials/organize-and-view-work",
              },
              {
                text: "Plan and create cycles",
                link: "/introduction/tutorials/plan-and-create-cycles",
              },
              {
                text: "Create pages",
                link: "/introduction/tutorials/create-pages",
              },
            ],
          },
          {
            text: "Download Plane",
            link: "https://plane.so/download",
          },
          {
            text: "Self-host Plane",
            link: "https://developers.plane.so/self-hosting/overview",
          },
        ],
      },
      {
        text: "Workspace management",
        collapsed: false,
        items: [
          {
            text: "Workspaces",
            collapsed: true,
            items: [
              {
                text: "Overview",
                link: "/core-concepts/workspaces/overview",
              },
              {
                text: "Search workspace",
                link: "/workspaces-and-users/search-workspace",
              },
              { text: "Account", link: "/core-concepts/account/overview" },
              { text: "Power K", link: "/core-concepts/power-k" },
              {
                text: "Customize navigation",
                link: "/workspaces-and-users/customize-navigation",
              },
            ],
          },
          {
            text: "Members",
            collapsed: true,
            items: [
              {
                text: "Manage members",
                link: "/core-concepts/workspaces/members",
              },
              { text: "Roles", link: "/workspaces-and-users/roles" },
              {
                text: "Permissions",
                link: "/workspaces-and-users/permissions",
              },
            ],
          },
          {
            text: "Authentication",
            collapsed: true,
            items: [
              { text: "SSO", link: "/authentication/sso" },
              {
                text: "Self-hosted authentication",
                link: "https://developers.plane.so/self-hosting/govern/authentication",
              },
            ],
          },
          {
            text: "Billing and plans",
            collapsed: true,
            items: [
              {
                text: "Upgrade plan",
                link: "/workspaces-and-users/upgrade-plan",
              },
              {
                text: "Manage licenses",
                link: "/workspaces-and-users/manage-licenses",
              },
              {
                text: "Add/remove seats",
                link: "/workspaces-and-users/add-remove-seats",
              },
              {
                text: "Billing and plans",
                link: "/workspaces-and-users/billing-and-plans",
              },
            ],
          },
          { text: "Settings", link: "/core-concepts/account/settings" },
        ],
      },
      {
        text: "Project management",
        collapsed: false,
        items: [
          {
            text: "Projects",
            collapsed: true,
            items: [
              { text: "Overview", link: "/core-concepts/projects/overview" },
              {
                text: "Manage project members",
                link: "/core-concepts/projects/manage-project-members",
              },
              { text: "Publish", link: "/core-concepts/deploy" },
            ],
          },
          {
            text: "Project states",
            link: "/core-concepts/projects/project-states",
          },
          { text: "States", link: "/core-concepts/issues/states" },
          {
            text: "Project overview",
            link: "/core-concepts/projects/project-overview",
          },
          {
            text: "Project templates",
            link: "/templates/project-templates",
          },
        ],
      },
      {
        text: "Work item management",
        collapsed: false,
        items: [
          {
            text: "Work Items",
            collapsed: true,
            items: [
              { text: "Overview", link: "/core-concepts/issues/overview" },
              {
                text: "Properties",
                link: "/core-concepts/issues/properties",
              },
              {
                text: "Work item URL",
                link: "/core-concepts/issues/work-item-url",
              },
              { text: "Drafts", link: "/core-concepts/drafts" },
            ],
          },
          {
            text: "Work item types",
            link: "/core-concepts/issues/issue-types",
          },
          {
            text: "Work item templates",
            link: "/templates/work-item-templates",
          },
          {
            text: "Recurring work items",
            link: "/core-concepts/projects/recurring-work-items",
          },
        ],
      },
      {
        text: "Planning and organization",
        collapsed: false,
        items: [
          { text: "Labels", link: "/core-concepts/issues/labels" },
          { text: "Cycles", link: "/core-concepts/cycles" },
          { text: "Modules", link: "/core-concepts/modules" },
          { text: "Epics", link: "/core-concepts/issues/epics" },
          {
            text: "Timeline and dependency",
            link: "/core-concepts/issues/timeline-dependency",
          },
          {
            text: "Initiatives",
            link: "/core-concepts/projects/initiatives",
          },
          {
            text: "Teamspaces",
            link: "/core-concepts/workspaces/teamspaces",
          },
          {
            text: "Milestones",
            link: "/core-concepts/projects/milestones",
          },
          { text: "Stickies", link: "/core-concepts/stickies" },
        ],
      },
      {
        text: "Views and layouts",
        collapsed: false,
        items: [
          { text: "Layouts", link: "/core-concepts/issues/layouts" },
          {
            text: "Filters",
            link: "/core-concepts/issues/visualise_filter",
          },
          {
            text: "Display options",
            link: "/core-concepts/issues/display-options",
          },
          { text: "Views", link: "/core-concepts/views" },
          { text: "Your work", link: "/your-work" },
        ],
      },
      {
        text: "Knowledge management",
        collapsed: false,
        items: [
          {
            text: "Pages",
            collapsed: true,
            items: [
              { text: "Overview", link: "/core-concepts/pages/overview" },
              {
                text: "Editor blocks",
                link: "/core-concepts/pages/editor-blocks",
              },
            ],
          },
          { text: "Wiki", link: "/core-concepts/pages/wiki" },
          { text: "Nested pages", link: "/core-concepts/pages/nested-pages" },
          { text: "Page templates", link: "/templates/page-templates" },
        ],
      },
      {
        text: "Advanced management",
        collapsed: false,
        items: [
          { text: "Estimates", link: "/core-concepts/issues/estimates" },
          { text: "Bulk operations", link: "/core-concepts/issues/bulk-ops" },
          {
            text: "Time tracking",
            link: "/core-concepts/issues/time-tracking",
          },
          { text: "Workflows", link: "/workflows-and-approvals/workflows" },
          {
            text: "Custom automations",
            link: "/automations/custom-automations",
          },
        ],
      },
      {
        text: "Collaboration and communication",
        collapsed: false,
        items: [
          {
            text: "Project updates",
            link: "/communication-and-collaboration/project-updates",
          },
          {
            text: "Comments and activity",
            link: "/communication-and-collaboration/comments-and-activity",
          },
          {
            text: "Inline comments",
            link: "/core-concepts/pages/inline-comments",
          },
          { text: "Inbox", link: "/core-concepts/inbox" },
        ],
      },
      {
        text: "Intake and customers",
        collapsed: false,
        items: [
          { text: "Overview", link: "/intake/overview" },
          { text: "Intake", link: "/core-concepts/intake" },
          { text: "Intake forms", link: "/intake/intake-forms" },
          { text: "Intake email", link: "/intake/intake-email" },
          { text: "Customers", link: "/customers" },
        ],
      },
      {
        text: "Analytics and reporting",
        collapsed: false,
        items: [
          { text: "Analytics", link: "/core-concepts/analytics" },
          { text: "Dashboards", link: "/dashboards" },
        ],
      },
      {
        text: "Integrations",
        collapsed: false,
        items: [
          {
            text: "Native integrations",
            link: "/integrations/about",
            collapsed: false,
            items: [
              { text: "Draw.io", link: "/integrations/draw-io" },
              { text: "GitHub", link: "/integrations/github" },
              { text: "GitLab", link: "/integrations/gitlab" },
              { text: "Sentry", link: "/integrations/sentry" },
              { text: "Slack", link: "/integrations/slack" },
            ],
          },
          {
            text: "Custom integrations",
            collapsed: true,
            items: [
              {
                text: "Build a Plane app",
                link: "https://developers.plane.so/dev-tools/build-plane-app",
              },
              {
                text: "API reference",
                link: "https://developers.plane.so/api-reference/introduction",
              },
              {
                text: "Webhooks",
                link: "https://developers.plane.so/dev-tools/intro-webhooks",
              },
            ],
          },
        ],
      },
      {
        text: "Import and export",
        collapsed: false,
        items: [
          {
            text: "Import",
            link: "/importers/overview",
            collapsed: false,
            items: [
              { text: "Asana", link: "/importers/asana" },
              { text: "Confluence", link: "/importers/confluence" },
              { text: "ClickUp", link: "/importers/clickup" },
              { text: "CSV", link: "/importers/csv" },
              { text: "Jira", link: "/importers/jira" },
              { text: "Linear", link: "/importers/linear" },
              { text: "Notion", link: "/importers/notion" },
            ],
          },
          { text: "Export", link: "/core-concepts/export" },
        ],
      },
      {
        text: "AI",
        collapsed: false,
        items: [
          { text: "Pi Chat", link: "/ai/pi-chat" },
          { text: "Plane AI credits", link: "/ai/plane-ai-credits" },
          {
            text: "MCP Server",
            link: "https://developers.plane.so/dev-tools/mcp-server",
          },
        ],
      },
      {
        text: "Devices",
        collapsed: false,
        items: [{ text: "Mobile", link: "/devices/mobile" }],
      },
      {
        text: "Support and resources",
        collapsed: false,
        items: [
          { text: "Get help", link: "/support/get-help" },
          {
            text: "Keyboard shortcuts",
            link: "/support/keyboard-shortcuts",
          },
          {
            text: "Resources",
            collapsed: true,
            items: [
              {
                text: "Developer docs",
                link: "https://developers.plane.so",
              },
              { text: "Blog", link: "https://plane.so/blog" },
              {
                text: "Templates library",
                link: "https://plane.so/templates",
              },
              {
                text: "Integrations marketplace",
                link: "https://plane.so/marketplace/integrations",
              },
            ],
          },
          { text: "Changelog", link: "https://plane.so/changelog" },
          { text: "System status", link: "https://status.plane.so/" },
        ],
      },
    ],
  },

  sitemap: {
    hostname: "https://docs.plane.so",
  },

  appearance: "dark",

  markdown: {
    theme: {
      light: "github-light",
      dark: "dracula",
    },
  },
});
