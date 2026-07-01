/** @format */

import { copyFileSync, mkdirSync, readFileSync, readdirSync, statSync } from "fs";
import { dirname, join, relative, resolve } from "path";
import { defineConfig, type HeadConfig } from "vitepress";
import { extendConfig } from "@voidzero-dev/vitepress-theme/config";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import llmstxt from "vitepress-plugin-llms";

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

const config = defineConfig({
  title: "Plane",
  description: "Modern project management software",
  cleanUrls: true,

  vite: {
    plugins: [
      // Generates llms.txt and llms-full.txt from the docs and sidebar.
      // https://github.com/okineadev/vitepress-plugin-llms
      llmstxt({
        domain: "https://docs.plane.so",
        description:
          "Plane is open-source, modern project management software for planning, tracking, and shipping work.",
        details:
          "This documentation covers workspaces, projects, work items, cycles, modules, pages and wikis, integrations, importers, automations, and Plane AI.",
        // Per-page .md versions are already emitted by buildEnd() for the
        // `Accept: text/markdown` rewrite in vercel.json, so the plugin only
        // owns llms.txt / llms-full.txt.
        generateLLMFriendlyDocsForEachPage: false,
        // Don't inject invisible LLM-hint markup into rendered pages.
        injectLLMHint: false,
        // Pages hidden from search (search: false / noindex) are excluded
        // from the LLM files too.
        ignoreFiles: [
          "core-concepts/issues.md",
          "core-concepts/projects/run-project.md",
          "importers/github-imp.md",
        ],
      }),
    ],
  },

  buildEnd(siteConfig) {
    // Copy source .md files into dist/ for Accept: text/markdown negotiation.
    const srcDir = siteConfig.srcDir;
    const outDir = siteConfig.outDir;

    function walk(dir: string): void {
      for (const entry of readdirSync(dir)) {
        if (entry === ".vitepress" || entry === "public" || entry === "node_modules") continue;
        const abs = join(dir, entry);
        const stat = statSync(abs);
        if (stat.isDirectory()) {
          walk(abs);
        } else if (stat.isFile() && abs.endsWith(".md")) {
          const rel = relative(srcDir, abs);
          const dest = join(outDir, rel);
          mkdirSync(dirname(dest), { recursive: true });
          copyFileSync(abs, dest);
        }
      }
    }

    walk(srcDir);
  },

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
        href: "/fonts/Inter/InterVariable.woff2",
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
    [
      "meta",
      {
        name: "robots",
        content: "index, follow",
      },
    ],
    /**
     * SSG inlines OSSHeader with data-theme from server isDark. Tailwind `dark:…`
     * keys off [data-theme*="dark"] on that wrapper, so the bar can stay dark
     * until Vue hydrates. The built-in "check-dark-mode" also only add()s
     * html.dark. Run in setTimeout(0) so it executes after that script, then
     * clear stale data-theme as soon as the bar exists.
     */
    [
      "script",
      {},
      `!function(){setTimeout(function(){
var k="vitepress-theme-appearance";
var p=localStorage.getItem(k)||"dark";
var m=matchMedia("(prefers-color-scheme: dark)").matches;
var d=!p||p==="auto"?m:p==="dark";
document.documentElement.classList.toggle("dark",d);
function bar(n){
var h=document.querySelector(".docs-layout header");
if(h&&h.parentElement){
var w=h.parentElement;
if(d)w.setAttribute("data-theme","dark");else w.removeAttribute("data-theme");
return;
}
if(n<200&&document.readyState==="loading")requestAnimationFrame(function(){bar(n+1)});
}bar(0);
},0);}();`,
    ],
  ],

  themeConfig: {
    variant: "voidzero",
    logo: {
      light: "https://media.docs.plane.so/logo/new-logo-white.png",
      dark: "https://media.docs.plane.so/logo/new-logo-dark.png",
    },
    siteTitle: "Plane",

    outline: {
      level: [2, 3],
      label: "On this page",
    },

    search: searchConfig,

    socialLinks: [
      {
        icon: {
          svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 15L6.92474 18.1137C6.49579 18.548 6.28131 18.7652 6.09695 18.7805C5.93701 18.7938 5.78042 18.7295 5.67596 18.6076C5.55556 18.4672 5.55556 18.162 5.55556 17.5515V15.9916C5.55556 15.444 5.10707 15.0477 4.5652 14.9683V14.9683C3.25374 14.7762 2.22378 13.7463 2.03168 12.4348C2 12.2186 2 11.9605 2 11.4444V6.8C2 5.11984 2 4.27976 2.32698 3.63803C2.6146 3.07354 3.07354 2.6146 3.63803 2.32698C4.27976 2 5.11984 2 6.8 2H14.2C15.8802 2 16.7202 2 17.362 2.32698C17.9265 2.6146 18.3854 3.07354 18.673 3.63803C19 4.27976 19 5.11984 19 6.8V11M19 22L16.8236 20.4869C16.5177 20.2742 16.3647 20.1678 16.1982 20.0924C16.0504 20.0255 15.8951 19.9768 15.7356 19.9474C15.5558 19.9143 15.3695 19.9143 14.9969 19.9143H13.2C12.0799 19.9143 11.5198 19.9143 11.092 19.6963C10.7157 19.5046 10.4097 19.1986 10.218 18.8223C10 18.3944 10 17.8344 10 16.7143V14.2C10 13.0799 10 12.5198 10.218 12.092C10.4097 11.7157 10.7157 11.4097 11.092 11.218C11.5198 11 12.0799 11 13.2 11H18.8C19.9201 11 20.4802 11 20.908 11.218C21.2843 11.4097 21.5903 11.7157 21.782 12.092C22 12.5198 22 13.0799 22 14.2V16.9143C22 17.8462 22 18.3121 21.8478 18.6797C21.6448 19.1697 21.2554 19.5591 20.7654 19.762C20.3978 19.9143 19.9319 19.9143 19 19.9143V22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        },
        link: "https://forum.plane.so",
      },
      { icon: "github", link: "https://github.com/makeplane/plane" },
      { icon: "twitter", link: "https://twitter.com/planepowers" },
      {
        icon: "linkedin",
        link: "https://www.linkedin.com/company/planepowers/",
      },
    ],

    nav: [
      {
        text: "Sign in",
        link: "https://app.plane.so/sign-in",
        noIcon: true,
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
                text: "Manage members",
                link: "/core-concepts/workspaces/members",
              },
              {
                text: "Search workspace",
                link: "/workspaces-and-users/search-workspace",
              },
              {
                text: "Personalize homepage",
                link: "/core-concepts/account/overview",
              },
              { text: "Power K", link: "/core-concepts/power-k" },
              {
                text: "Customize navigation",
                link: "/workspaces-and-users/customize-navigation",
              },
            ],
          },
          {
            text: "Roles and permissions",
            collapsed: true,
            link: "/roles-and-permissions/overview",
            items: [
              {
                text: "Member roles",
                link: "/roles-and-permissions/member-roles",
              },
              {
                text: "Permission schemes",
                link: "/roles-and-permissions/permission-schemes",
              },
              {
                text: "Custom roles",
                link: "/roles-and-permissions/custom-roles",
              },
              {
                text: "Permissions matrix",
                link: "/roles-and-permissions/permissions-matrix",
              },
            ],
          },
          {
            text: "Authentication",
            collapsed: true,
            items: [
              { text: "Single sign-on (SSO)", link: "/authentication/sso" },
              { text: "IdP Group Sync", link: "/authentication/group-sync" },
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
              {
                text: "Manage projects",
                link: "/core-concepts/projects/overview",
              },
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
              {
                text: "Manage work items",
                link: "/core-concepts/issues/overview",
              },
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
            text: "Project Work Item Types",
            link: "/work-items/project-work-item-types",
          },
          {
            text: "Workspace Work Item Types",
            link: "/work-items/workspace-work-item-types",
          },
          { text: "Work Item States", link: "/core-concepts/issues/states" },
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
          {
            text: "Releases",
            link: "/releases",
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
            text: "Plane Query Language (PQL)",
            link: "/core-concepts/issues/plane-query-language",
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
              {
                text: "Manage project pages",
                link: "/core-concepts/pages/overview",
              },
              {
                text: "Editor blocks",
                link: "/core-concepts/pages/editor-blocks",
              },
              { text: "Report page", link: "/pages/report-page" },
            ],
          },
          { text: "Wiki", link: "/core-concepts/pages/wiki" },
          { text: "Collections", link: "/pages/collections" },
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
          {
            text: "Workflows and Approvals",
            link: "/workflows-and-approvals/workflows",
          },
          { text: "Custom Relations", link: "/work-items/custom-relations" },
          {
            text: "Automations",
            collapsed: true,
            link: "/automations/overview",
            items: [
              {
                text: "Custom automations",
                link: "/automations/custom-automations",
              },
            ],
          },
          {
            text: "Plane Runner",
            link: "/automations/plane-runner",
          },
        ],
      },
      {
        text: "Communication",
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
          {
            text: "Subscribers",
            link: "/communication-and-collaboration/subscribers",
          },
          {
            text: "Notifications",
            link: "/communication-and-collaboration/notifications",
          },
          { text: "Inbox", link: "/communication-and-collaboration/inbox" },
        ],
      },
      {
        text: "Intake and customers",
        items: [
          { text: "Intake Overview", link: "/intake/overview" },
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
              { text: "Bitbucket", link: "/integrations/bitbucket" },
              { text: "Cursor", link: "/integrations/cursor" },
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
            text: "Import data",
            link: "/importers/overview",
            collapsed: false,
            items: [
              { text: "Asana", link: "/importers/asana" },
              { text: "Confluence", link: "/importers/confluence" },
              { text: "ClickUp", link: "/importers/clickup" },
              { text: "CSV", link: "/importers/csv" },
              { text: "Flatfile", link: "/importers/flatfile" },
              { text: "Jira", link: "/importers/jira" },
              { text: "Linear", link: "/importers/linear" },
              { text: "Notion", link: "/importers/notion" },
            ],
          },
          { text: "Export data", link: "/core-concepts/export" },
        ],
      },
      {
        text: "AI",
        items: [
          { text: "Plane AI", link: "/ai/plane-ai" },
          { text: "AI credits", link: "/ai/plane-ai-credits" },
          { text: "MCP Connectors", link: "/ai/mcp-connectors" },
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

export default extendConfig(config);
