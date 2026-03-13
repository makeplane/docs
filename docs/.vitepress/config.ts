import { readFileSync } from "fs";
import { resolve } from "path";
import { defineConfig, type HeadConfig } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";

function loadEnvVar(key: string): string | undefined {
  // process.env takes precedence (CI/hosting platforms set vars here)
  if (key in process.env) return process.env[key] || undefined;
  // Fall back to .env file for local development
  try {
    const envFile = readFileSync(resolve(process.cwd(), ".env"), "utf-8");
    const match = envFile.match(new RegExp(`^${key}=(.+)$`, "m"));
    return match?.[1]?.trim();
  } catch {
    return undefined;
  }
}

const posthogKey = loadEnvVar("VITE_POSTHOG_KEY");
const algoliaAppId = loadEnvVar("VITE_ALGOLIA_APP_ID");
const algoliaApiKey = loadEnvVar("VITE_ALGOLIA_API_KEY");
const algoliaIndexName = loadEnvVar("VITE_ALGOLIA_INDEX_NAME");

const posthogHead: HeadConfig[] = posthogKey
  ? [
      [
        "script",
        {},
        `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
        posthog.init('${posthogKey}', {api_host: 'https://us.i.posthog.com', person_profiles: 'identified_only'});`,
      ],
    ]
  : [];

const searchConfig =
  algoliaAppId && algoliaApiKey && algoliaIndexName
    ? {
        provider: "algolia" as const,
        options: {
          appId: algoliaAppId,
          apiKey: algoliaApiKey,
          indexName: algoliaIndexName,
          insights: true,
        },
      }
    : { provider: "local" as const };

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
        href: "/fonts/Satoshi/Satoshi-Regular.woff2",
        as: "font",
        type: "font/woff2",
        crossorigin: "anonymous",
      },
    ],
    [
      "link",
      {
        rel: "preload",
        href: "/fonts/Satoshi/Satoshi-Medium.woff2",
        as: "font",
        type: "font/woff2",
        crossorigin: "anonymous",
      },
    ],
    [
      "link",
      {
        rel: "preload",
        href: "/fonts/IBMPlexMono/IBMPlexMono-Regular.ttf",
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
    // Google Analytics
    [
      "script",
      {
        async: "true",
        src: "https://www.googletagmanager.com/gtag/js?id=G-G578SD4VZD",
      },
    ],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-G578SD4VZD');`,
    ],
    // PostHog (conditionally injected)
    ...posthogHead,
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
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
    [
      "meta",
      {
        name: "twitter:site",
        content: "@planepowers",
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
        property: "og:type",
        content: "website",
      },
    ],
    [
      "meta",
      {
        property: "og:site_name",
        content: "Plane Docs",
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

    outline: {
      level: [2, 3],
      label: "On this page",
    },

    search: searchConfig,

    socialLinks: [
      { icon: "github", link: "https://github.com/makeplane/plane" },
      { icon: "discord", link: "https://discord.com/invite/A92xrEGCge" },
      { icon: "twitter", link: "https://twitter.com/planepowers" },
      { icon: "linkedin", link: "https://www.linkedin.com/company/planepowers/" },
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
        items: [
          { text: "Introduction", link: "/introduction/home" },
          { text: "Quickstart guide", link: "/introduction/quickstart" },
          { text: "Core concepts", link: "/introduction/core-concepts" },
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
                text: "Plan work with cycles",
                link: "/introduction/tutorials/plan-and-create-cycles",
              },
              {
                text: "Write content with pages",
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
        items: [
          {
            text: "Workspaces",
            collapsed: true,
            items: [
              {
                text: "Manage workspace",
                link: "/core-concepts/workspaces/overview",
              },
              {
                text: "Search workspace",
                link: "/workspaces-and-users/search-workspace",
              },
              { text: "Personalize homepage", link: "/core-concepts/account/overview" },
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
              { text: "Member roles", link: "/workspaces-and-users/roles" },
              {
                text: "Permissions matrix",
                link: "/workspaces-and-users/permissions",
              },
            ],
          },
          {
            text: "Authentication",
            collapsed: true,
            items: [
              { text: "Single sign-on (SSO)", link: "/authentication/sso" },
              { text: "Group Sync", link: "/authentication/group-sync" },
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
                text: "Add or remove seats",
                link: "/workspaces-and-users/add-remove-seats",
              },
              {
                text: "How billing works",
                link: "/workspaces-and-users/billing-and-plans",
              },
            ],
          },
          { text: "Account settings", link: "/core-concepts/account/settings" },
        ],
      },
      {
        text: "Project management",
        items: [
          {
            text: "Projects",
            collapsed: true,
            items: [
              { text: "Manage projects", link: "/core-concepts/projects/overview" },
              {
                text: "Manage members",
                link: "/core-concepts/projects/manage-project-members",
              },
              { text: "Publish projects", link: "/core-concepts/deploy" },
            ],
          },
          {
            text: "Project States",
            link: "/core-concepts/projects/project-states",
          },
          {
            text: "Project Labels",
            link: "/core-concepts/projects/project-labels",
          },
          {
            text: "Project Overview",
            link: "/core-concepts/projects/project-overview",
          },
          {
            text: "Project Templates",
            link: "/templates/project-templates",
          },
        ],
      },
      {
        text: "Work item management",
        items: [
          {
            text: "Work Items",
            collapsed: true,
            items: [
              { text: "Manage work items", link: "/core-concepts/issues/overview" },
              {
                text: "Work item properties",
                link: "/core-concepts/issues/properties",
              },
              {
                text: "Create work items via URL",
                link: "/core-concepts/issues/work-item-url",
              },
              { text: "Save draft work items", link: "/core-concepts/drafts" },
            ],
          },
          {
            text: "Work Item Types",
            link: "/core-concepts/issues/issue-types",
          },
          { text: "Workflow States", link: "/core-concepts/issues/states" },
          { text: "Work Item Labels", link: "/core-concepts/issues/labels" },
          {
            text: "Work Item Templates",
            link: "/templates/work-item-templates",
          },
          {
            text: "Recurring Work Items",
            link: "/core-concepts/projects/recurring-work-items",
          },
        ],
      },
      {
        text: "Planning and organization",
        items: [
          { text: "Cycles", link: "/core-concepts/cycles" },
          { text: "Modules", link: "/core-concepts/modules" },
          { text: "Epics", link: "/core-concepts/issues/epics" },
          {
            text: "Dependencies in Timeline",
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
        items: [
          { text: "Layouts", link: "/core-concepts/issues/layouts" },
          {
            text: "Work Item Filters",
            link: "/core-concepts/issues/visualise_filter",
          },
          {
            text: "Display options",
            link: "/core-concepts/issues/display-options",
          },
          { text: "Views", link: "/core-concepts/views" },
          { text: "Your Work", link: "/your-work" },
        ],
      },
      {
        text: "Knowledge management",
        items: [
          {
            text: "Pages",
            collapsed: true,
            items: [
              { text: "Manage project pages", link: "/core-concepts/pages/overview" },
              {
                text: "Editor blocks",
                link: "/core-concepts/pages/editor-blocks",
              },
            ],
          },
          { text: "Wiki", link: "/core-concepts/pages/wiki" },
          { text: "Nested Pages", link: "/core-concepts/pages/nested-pages" },
          { text: "Page Templates", link: "/templates/page-templates" },
        ],
      },
      {
        text: "Advanced management",
        items: [
          { text: "Estimates", link: "/core-concepts/issues/estimates" },
          { text: "Bulk Operations", link: "/core-concepts/issues/bulk-ops" },
          {
            text: "Time Tracking",
            link: "/core-concepts/issues/time-tracking",
          },
          { text: "Workflows", link: "/workflows-and-approvals/workflows" },
          {
            text: "Automations",
            link: "/automations/custom-automations",
          },
        ],
      },
      {
        text: "Collaboration",
        items: [
          {
            text: "Project Updates",
            link: "/communication-and-collaboration/project-updates",
          },
          {
            text: "Work Item Comments",
            link: "/communication-and-collaboration/comments-and-activity",
          },
          {
            text: "Page Inline Comments",
            link: "/core-concepts/pages/inline-comments",
          },
          { text: "Inbox", link: "/core-concepts/inbox" },
        ],
      },
      {
        text: "Intake and customers",
        items: [
          { text: "Overview", link: "/intake/overview" },
          { text: "Intake In-app", link: "/core-concepts/intake" },
          { text: "Intake Forms", link: "/intake/intake-forms" },
          { text: "Intake Email", link: "/intake/intake-email" },
          { text: "Customers", link: "/customers" },
        ],
      },
      {
        text: "Analytics and reporting",
        items: [
          { text: "Analytics", link: "/core-concepts/analytics" },
          { text: "Dashboards", link: "/dashboards" },
        ],
      },
      {
        text: "Integrations",
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
        items: [
          { text: "Plane AI", link: "/ai/pi-chat" },
          { text: "AI credits", link: "/ai/plane-ai-credits" },
          {
            text: "MCP Server",
            link: "https://developers.plane.so/dev-tools/mcp-server",
          },
        ],
      },
      {
        text: "Devices",
        items: [{ text: "Mobile", link: "/devices/mobile" }],
      },
      {
        text: "Support and resources",
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
    config(md) {
      md.use(tabsMarkdownPlugin);
    },
  },
});
