/// <reference path="./env.d.ts" />
import { defineConfig, type HeadConfig, type PageData } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import { withMermaid } from "vitepress-plugin-mermaid";
import { extendConfig } from "@voidzero-dev/vitepress-theme/config";
import llmstxt from "vitepress-plugin-llms";
import { readFileSync, readdirSync, statSync, mkdirSync, copyFileSync } from "node:fs";
import { resolve, join, relative, dirname } from "node:path";

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

const posthogHead: HeadConfig[] = posthogKey
  ? [
      [
        "script",
        {},
        `
        !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
        posthog.init('${posthogKey}',{api_host:'https://us.posthog.com', opt_out_capturing_by_default: true, persistence: 'memory'});
      `,
      ],
    ]
  : [];

export default extendConfig(
  withMermaid(
    defineConfig({
      markdown: {
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        config(md) {
          md.use(tabsMarkdownPlugin);
        },
      },
      mermaid: {
        // Mermaid configuration options
      },
      vite: {
        // The theme is a workspace package (packages/theme) consumed as source; make sure it and
        // the apps always share one copy of vue / the VoidZero base theme.
        resolve: { dedupe: ["vue", "@voidzero-dev/vitepress-theme"] },
        plugins: [
          // Generates llms.txt and llms-full.txt from the docs and sidebar.
          // https://github.com/okineadev/vitepress-plugin-llms
          llmstxt({
            domain: "https://developers.plane.so",
            title: "Plane Developer Documentation",
            description:
              "Plane is open-source, modern project management software. These developer docs cover self-hosting, the REST API, and tools for building on Plane.",
            details:
              "This documentation covers self-hosting (Docker, Kubernetes, and more), the REST API reference for projects, work items, cycles, modules, states, pages, and more, plus developer tools including OAuth apps, webhooks, agents, and the MCP server.",
            // Per-page .md versions are already emitted by buildEnd() for the
            // `Accept: text/markdown` rewrite in vercel.json, so the plugin only
            // owns llms.txt / llms-full.txt.
            generateLLMFriendlyDocsForEachPage: false,
            // Don't inject invisible LLM-hint markup into rendered pages.
            injectLLMHint: false,
            // Pages hidden from search (search: false / noindex) are excluded
            // from the LLM files too.
            ignoreFiles: [
              "self-hosting/methods/install-methods-commercial/docker-compose.md",
              "self-hosting/methods/install-methods-commercial/kubernetes.md",
            ],
          }),
        ],
        optimizeDeps: {
          include: [
            "mermaid",
            "@braintree/sanitize-url",
            "dayjs",
            "cytoscape",
            "cytoscape-cose-bilkent",
            "d3",
            "khroma",
            "dagre-d3-es",
            "lodash-es",
            "dompurify",
          ],
        },
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
      title: "Plane developer documentation",
      description:
        "Self-host Plane, integrate with our API, configure webhooks, and extend your project management platform. Complete guides for developers building on Plane.",

      // SEO: Per-page lastmod in sitemap.xml from each file's latest git commit.
      // Requires full git history at build time (see package.json build script).
      lastUpdated: true,

      // SEO: Generate sitemap automatically
      sitemap: {
        hostname: "https://developers.plane.so",
      },

      // SEO: Clean URLs without .html extension
      cleanUrls: true,

      // SEO: Title template for all pages
      titleTemplate: ":title | Plane",

      head: [
        ["link", { rel: "icon", href: "/logo/favicon-32x32.png" }],
        [
          "link",
          {
            rel: "preload",
            href: "/fonts/Inter/InterVariable.woff2",
            as: "font",
            type: "font/woff2",
            crossorigin: "",
          },
        ],

        // Google Analytics with Consent Mode v2
        ["script", { async: "", src: "https://www.googletagmanager.com/gtag/js?id=G-JF828SKW90" }],
        [
          "script",
          {},
          `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent', 'default', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
      });
      gtag('js', new Date());
      gtag('config', 'G-JF828SKW90');`,
        ],

        // PostHog Analytics (loaded only when VITE_POSTHOG_KEY is set)
        ...posthogHead,

        // SEO: Basic meta tags
        ["meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }],
        ["meta", { name: "author", content: "Plane" }],
        ["meta", { name: "robots", content: "index, follow" }],
        [
          "meta",
          {
            name: "keywords",
            content:
              "plane, api, self-hosting, project management, developer documentation, kubernetes, docker, rest api, webhooks, plane api",
          },
        ],
        ["meta", { name: "theme-color", content: "#006399" }],

        // Open Graph meta tags
        ["meta", { property: "og:type", content: "website" }],
        ["meta", { property: "og:title", content: "Developer documentation | Plane" }],
        [
          "meta",
          {
            property: "og:description",
            content:
              "Self-host Plane, integrate with our API, configure webhooks, and extend your project management platform.",
          },
        ],
        [
          "meta",
          { property: "og:image", content: "https://media.docs.plane.so/logo/og-docs.webp#hero" },
        ],
        ["meta", { property: "og:url", content: "https://developers.plane.so" }],

        // Twitter Card meta tags
        ["meta", { name: "twitter:card", content: "summary_large_image" }],
        ["meta", { name: "twitter:title", content: "Developer documentation | Plane" }],
        [
          "meta",
          {
            name: "twitter:description",
            content:
              "Self-host Plane, integrate with our API, configure webhooks, and extend your project management platform.",
          },
        ],
        [
          "meta",
          { name: "twitter:image", content: "https://media.docs.plane.so/logo/og-docs.webp#hero" },
        ],
      ],

      transformPageData(pageData: PageData) {
        const head = (pageData.frontmatter.head ??= []);

        // Inject canonical URL if not already defined in frontmatter
        const hasCanonical = (head as HeadConfig[]).some(
          ([tag, attrs]) => tag === "link" && attrs?.rel === "canonical",
        );
        if (!hasCanonical) {
          const canonicalUrl = `https://developers.plane.so/${pageData.relativePath}`
            .replace(/index\.md$/, "")
            .replace(/\.md$/, "");
          head.push(["link", { rel: "canonical", href: canonicalUrl }]);
        }

        // Inject frontmatter keywords as a meta tag (VitePress doesn't do this natively)
        const keywords = pageData.frontmatter.keywords;
        if (keywords) {
          head.push(["meta", { name: "keywords", content: keywords }]);
        }
      },

      themeConfig: {
        variant: "voidzero",
        siteTitle: "Plane",
        logo: {
          light: "/logo/dev-logo-watermark-light.png",
          dark: "/logo/dev-logo-watermark-dark.png",
        },

        outline: {
          level: [2, 3],
          label: "On this page",
        },

        nav: [
          { text: "Self-hosting", link: "/self-hosting/overview" },
          { text: "API Reference", link: "/api-reference/v2/introduction" },
          { text: "Build and extend", link: "/dev-tools/build-plane-app/overview" },
          {
            text: "Plane Docs",
            link: "https://docs.plane.so",
            noIcon: true,
            planeButton: "secondary",
          },
          {
            text: "Sign in",
            link: "https://app.plane.so/sign-in",
            noIcon: true,
            planeButton: "primary",
          },
        ],

        sidebar: {
          "/": [
            {
              text: "Developer documentation",
              items: [
                { text: "Home", link: "/" },
                { text: "Self-hosting", link: "/self-hosting/overview" },
                { text: "API Reference", link: "/api-reference/v2/introduction" },
                { text: "Build and extend", link: "/dev-tools/build-plane-app/overview" },
              ],
            },
            {
              text: "Self-host Plane",
              items: [
                { text: "Overview", link: "/self-hosting/overview" },
                { text: "Self-hosting 101", link: "/self-hosting/self-hosting-101" },
                { text: "Docker Compose", link: "/self-hosting/methods/docker-compose" },
                { text: "Kubernetes", link: "/self-hosting/methods/kubernetes" },
              ],
            },
            {
              text: "API Reference",
              items: [
                { text: "Introduction", link: "/api-reference/v2/introduction" },
                { text: "Work items", link: "/api-reference/v2/work-items/overview" },
                { text: "Migrating from v1", link: "/api-reference/v2/migrating-from-v1" },
              ],
            },
            {
              text: "Build and extend",
              items: [
                { text: "Webhooks", link: "/dev-tools/intro-webhooks" },
                { text: "Build Plane App", link: "/dev-tools/build-plane-app/overview" },
                { text: "MCP server", link: "/dev-tools/mcp-server" },
                { text: "Agents", link: "/dev-tools/agents/overview" },
              ],
            },
          ],
          "/self-hosting/": [
            {
              text: "Self-host Plane",
              items: [
                { text: "Overview", link: "/self-hosting/overview" },
                { text: "Self-hosting 101", link: "/self-hosting/self-hosting-101" },
                { text: "Plane Editions", link: "/self-hosting/editions-and-versions" },
                { text: "Plane Architecture", link: "/self-hosting/plane-architecture" },
              ],
            },
            {
              text: "Install",
              items: [
                { text: "Overview", link: "/self-hosting/methods/overview" },
                {
                  text: "Docker",
                  collapsed: true,
                  items: [
                    { text: "Docker Compose", link: "/self-hosting/methods/docker-compose" },
                    { text: "Docker AIO", link: "/self-hosting/methods/docker-aio" },
                    { text: "Docker Swarm", link: "/self-hosting/methods/docker-swarm" },
                    {
                      text: "Download config files",
                      link: "/self-hosting/methods/download-config",
                    },
                  ],
                },
                {
                  text: "Kubernetes",
                  link: "/self-hosting/methods/kubernetes",
                  collapsed: true,
                  items: [
                    { text: "High availability", link: "/self-hosting/govern/high-availability" },
                  ],
                },
                { text: "FIPS deployment", link: "/self-hosting/methods/fips-deployment" },
                { text: "Podman Quadlets", link: "/self-hosting/methods/podman-quadlets" },
                {
                  text: "Airgapped Edition",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/self-hosting/methods/airgapped-requirements" },
                    { text: "On Docker", link: "/self-hosting/methods/airgapped-edition" },
                    {
                      text: "On Kubernetes",
                      link: "/self-hosting/methods/airgapped-edition-kubernetes",
                    },
                    {
                      text: "Clone Docker Images",
                      link: "/self-hosting/methods/clone-docker-images",
                    },
                  ],
                },
                {
                  text: "Managed Platforms",
                  collapsed: true,
                  items: [
                    { text: "Coolify", link: "/self-hosting/methods/coolify" },
                    { text: "Portainer", link: "/self-hosting/methods/portainer" },
                  ],
                },
              ],
            },
            {
              text: "Configure",
              items: [
                { text: "Instance Admin", link: "/self-hosting/govern/instance-admin" },
                {
                  text: "Authentication",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/self-hosting/govern/authentication" },
                    { text: "Google OAuth", link: "/self-hosting/govern/google-oauth" },
                    { text: "GitHub OAuth", link: "/self-hosting/govern/github-oauth" },
                    { text: "OIDC SSO", link: "/self-hosting/govern/oidc-sso" },
                    { text: "SAML SSO", link: "/self-hosting/govern/saml-sso" },
                    { text: "LDAP", link: "/self-hosting/govern/ldap" },
                    { text: "Reset Password", link: "/self-hosting/govern/reset-password" },
                  ],
                },
                { text: "SMTP for email", link: "/self-hosting/govern/communication" },
                { text: "External services", link: "/self-hosting/govern/database-and-storage" },
                { text: "Custom domain", link: "/self-hosting/govern/custom-domain" },
                { text: "SSL", link: "/self-hosting/govern/configure-ssl" },
                {
                  text: "Integrations",
                  collapsed: true,
                  items: [
                    { text: "Bitbucket", link: "/self-hosting/govern/integrations/bitbucket" },
                    { text: "GitHub", link: "/self-hosting/govern/integrations/github" },
                    { text: "GitLab", link: "/self-hosting/govern/integrations/gitlab" },
                    { text: "Sentry", link: "/self-hosting/govern/integrations/sentry" },
                    { text: "Slack", link: "/self-hosting/govern/integrations/slack" },
                  ],
                },
                {
                  text: "DNS for Intake Email",
                  link: "/self-hosting/govern/configure-dns-email-service",
                },
                { text: "OpenSearch for search", link: "/self-hosting/govern/advanced-search" },
                {
                  text: "Plane AI",
                  link: "/self-hosting/govern/plane-ai/configure-plane-ai",
                  collapsed: true,
                  items: [
                    {
                      text: "Embedding model",
                      link: "/self-hosting/govern/plane-ai/configure-embedding-model",
                    },
                    {
                      text: "AWS OpenSearch embedding",
                      link: "/self-hosting/govern/plane-ai/aws-opensearch-embedding",
                    },
                  ],
                },
                { text: "Session expiry", link: "/self-hosting/govern/god-mode/session-expiry" },
                { text: "External secrets", link: "/self-hosting/govern/external-secrets" },
                { text: "External reverse proxy", link: "/self-hosting/govern/reverse-proxy" },
                { text: "Private storage buckets", link: "/self-hosting/govern/private-bucket" },
                {
                  text: "Environment variables",
                  link: "/self-hosting/govern/environment-variables",
                },
                { text: "Telemetry", link: "/self-hosting/telemetry" },
              ],
            },
            {
              text: "Manage",
              items: [
                {
                  text: "Update Plane",
                  collapsed: true,
                  items: [
                    {
                      text: "Update to latest version",
                      link: "/self-hosting/manage/upgrade-plane",
                    },
                    {
                      text: "For versions before 0.14.0",
                      link: "/self-hosting/manage/upgrade-from-0.13.2-0.14.0",
                    },
                    {
                      text: "Airgapped Edition",
                      collapsed: true,
                      items: [
                        {
                          text: "On Docker",
                          link: "/self-hosting/manage/update-plane/airgapped-edition/update-airgapped-docker",
                        },
                        {
                          text: "On Kubernetes",
                          link: "/self-hosting/manage/update-plane/airgapped-edition/update-airgapped-kubernetes",
                        },
                      ],
                    },
                  ],
                },
                {
                  text: "Manage licenses",
                  collapsed: true,
                  items: [
                    {
                      text: "Commercial Edition",
                      collapsed: true,
                      items: [
                        {
                          text: "Pro or Business",
                          link: "/self-hosting/manage/manage-licenses/activate-pro-and-business",
                        },
                        {
                          text: "Enterprise Grid",
                          link: "/self-hosting/manage/manage-licenses/activate-enterprise",
                        },
                      ],
                    },

                    {
                      text: "Airgapped Edition",
                      collapsed: true,
                      items: [
                        {
                          text: "Pro or Business",
                          link: "/self-hosting/manage/manage-licenses/activate-airgapped",
                        },
                        {
                          text: "Enterprise Grid",
                          link: "/self-hosting/manage/manage-licenses/activate-airgapped-enterprise",
                        },
                      ],
                    },
                  ],
                },
                { text: "Backup and restore", link: "/self-hosting/manage/backup-restore" },
                {
                  text: "Upgrade Community to Commercial Edition",
                  link: "/self-hosting/upgrade-from-community",
                },
                {
                  text: "Upgrade Community to Airgapped Edition",
                  link: "/self-hosting/manage/community-to-airgapped",
                },
                { text: "View Logs", link: "/self-hosting/manage/view-logs" },
                { text: "Health checks", link: "/self-hosting/manage/health-checks" },
                { text: "Migrate Plane", link: "/self-hosting/manage/migrate-plane" },
                {
                  text: "Migrate to external services",
                  link: "/self-hosting/manage/migration/migrate-data-to-external-services",
                },
                { text: "Prime CLI", link: "/self-hosting/manage/prime-cli" },
                { text: "Manage users", link: "/self-hosting/manage/manage-instance-users" },
              ],
            },
            {
              text: "Troubleshoot",
              items: [
                { text: "Overview", link: "/self-hosting/troubleshoot/overview" },
                {
                  text: "Installation Errors",
                  link: "/self-hosting/troubleshoot/installation-errors",
                },
                { text: "License Errors", link: "/self-hosting/troubleshoot/license-errors" },
                { text: "CLI Errors", link: "/self-hosting/troubleshoot/cli-errors" },
                { text: "Storage Errors", link: "/self-hosting/troubleshoot/storage-errors" },
              ],
            },
          ],

          "/api-reference/v1/": [
            {
              text: "API Reference",
              items: [
                { text: "Introduction", link: "/api-reference/v1/introduction" },
                {
                  text: "Project",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/project/overview" },
                    { text: "Create Project", link: "/api-reference/v1/project/add-project" },
                    {
                      text: "Create Project with Template",
                      link: "/api-reference/v1/project/create-project-with-template",
                    },
                    { text: "List Projects", link: "/api-reference/v1/project/list-projects" },
                    { text: "Get Project", link: "/api-reference/v1/project/get-project-detail" },
                    {
                      text: "Update Project",
                      link: "/api-reference/v1/project/update-project-detail",
                    },
                    { text: "Archive Project", link: "/api-reference/v1/project/archive-project" },
                    {
                      text: "Unarchive Project",
                      link: "/api-reference/v1/project/unarchive-project",
                    },
                    { text: "Delete Project", link: "/api-reference/v1/project/delete-project" },
                  ],
                },
                {
                  text: "Project Features",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/project-features/overview" },
                    {
                      text: "Get Project Features",
                      link: "/api-reference/v1/project-features/get-project-features",
                    },
                    {
                      text: "Update Project Features",
                      link: "/api-reference/v1/project-features/update-project-features",
                    },
                  ],
                },
                {
                  text: "Project Labels",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/project-labels/overview" },
                    {
                      text: "Create Project Label",
                      link: "/api-reference/v1/project-labels/add-project-label",
                    },
                    {
                      text: "List Project Labels",
                      link: "/api-reference/v1/project-labels/list-project-labels",
                    },
                    {
                      text: "Get Project Label",
                      link: "/api-reference/v1/project-labels/get-project-label-detail",
                    },
                    {
                      text: "Update Project Label",
                      link: "/api-reference/v1/project-labels/update-project-label-detail",
                    },
                    {
                      text: "Delete Project Label",
                      link: "/api-reference/v1/project-labels/delete-project-label",
                    },
                  ],
                },
                {
                  text: "Work Item",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/issue/overview" },
                    { text: "Create Work Item", link: "/api-reference/v1/issue/add-issue" },
                    { text: "List Work Items", link: "/api-reference/v1/issue/list-issues" },
                    { text: "Get Work Item", link: "/api-reference/v1/issue/get-issue-detail" },
                    {
                      text: "Get by identifier",
                      link: "/api-reference/v1/issue/get-issue-sequence-id",
                    },
                    { text: "Search Work Items", link: "/api-reference/v1/issue/search-issues" },
                    {
                      text: "Advanced Search",
                      link: "/api-reference/v1/issue/advanced-search-work-items",
                    },
                    {
                      text: "Update Work Item",
                      link: "/api-reference/v1/issue/update-issue-detail",
                    },
                    { text: "Delete Work Item", link: "/api-reference/v1/issue/delete-issue" },
                  ],
                },
                {
                  text: "Work Item States",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/state/overview" },
                    { text: "Create State", link: "/api-reference/v1/state/add-state" },
                    { text: "List States", link: "/api-reference/v1/state/list-states" },
                    { text: "Get State", link: "/api-reference/v1/state/get-state-detail" },
                    { text: "Update State", link: "/api-reference/v1/state/update-state-detail" },
                    { text: "Delete State", link: "/api-reference/v1/state/delete-state" },
                  ],
                },
                {
                  text: "Work Item Labels",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/label/overview" },
                    { text: "Create Label", link: "/api-reference/v1/label/add-label" },
                    { text: "List Labels", link: "/api-reference/v1/label/list-labels" },
                    { text: "Get Label", link: "/api-reference/v1/label/get-label-detail" },
                    { text: "Update Label", link: "/api-reference/v1/label/update-label-detail" },
                    { text: "Delete Label", link: "/api-reference/v1/label/delete-label" },
                  ],
                },
                {
                  text: "Work Item Types",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/issue-types/types/overview" },
                    {
                      text: "Add Type",
                      link: "/api-reference/v1/issue-types/types/add-issue-type",
                    },
                    {
                      text: "List Types",
                      link: "/api-reference/v1/issue-types/types/list-issue-types",
                    },
                    {
                      text: "Get Type Details",
                      link: "/api-reference/v1/issue-types/types/get-issue-type-details",
                    },
                    {
                      text: "Get Type Schema",
                      link: "/api-reference/v1/issue-types/types/get-work-item-type-schema",
                    },
                    {
                      text: "Update Type",
                      link: "/api-reference/v1/issue-types/types/update-issue-types",
                    },
                    {
                      text: "Delete Type",
                      link: "/api-reference/v1/issue-types/types/delete-issue-type",
                    },
                  ],
                },
                {
                  text: "Custom Properties",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/issue-types/properties/overview" },
                    {
                      text: "Add Property",
                      link: "/api-reference/v1/issue-types/properties/add-property",
                    },
                    {
                      text: "List Properties",
                      link: "/api-reference/v1/issue-types/properties/list-properties",
                    },
                    {
                      text: "Get Property Details",
                      link: "/api-reference/v1/issue-types/properties/get-property-details",
                    },
                    {
                      text: "Update Property",
                      link: "/api-reference/v1/issue-types/properties/update-property",
                    },
                    {
                      text: "Delete Property",
                      link: "/api-reference/v1/issue-types/properties/delete-property",
                    },
                  ],
                },
                {
                  text: "Custom Property Values",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/issue-types/values/overview" },
                    {
                      text: "Add Property Values",
                      link: "/api-reference/v1/issue-types/values/add-property-values",
                    },
                    {
                      text: "List Property Values",
                      link: "/api-reference/v1/issue-types/values/list-property-values",
                    },
                    {
                      text: "Get Property Value",
                      link: "/api-reference/v1/issue-types/values/get-property-value-detail",
                    },
                    {
                      text: "Update Property Value",
                      link: "/api-reference/v1/issue-types/values/update-property-value",
                    },
                    {
                      text: "Delete Property Value",
                      link: "/api-reference/v1/issue-types/values/delete-property-value",
                    },
                  ],
                },
                {
                  text: "Custom Property Options",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/issue-types/options/overview" },
                    {
                      text: "Add Dropdown Options",
                      link: "/api-reference/v1/issue-types/options/add-dropdown-options",
                    },
                    {
                      text: "List Dropdown Options",
                      link: "/api-reference/v1/issue-types/options/list-dropdown-options",
                    },
                    {
                      text: "Get Option Details",
                      link: "/api-reference/v1/issue-types/options/get-option-details",
                    },
                    {
                      text: "Update Dropdown Options",
                      link: "/api-reference/v1/issue-types/options/update-dropdown-options",
                    },
                    {
                      text: "Delete Dropdown Options",
                      link: "/api-reference/v1/issue-types/options/delete-dropdown-options",
                    },
                  ],
                },
                {
                  text: "Work Item Links",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/link/overview" },
                    { text: "Add Link", link: "/api-reference/v1/link/add-link" },
                    { text: "List Links", link: "/api-reference/v1/link/list-links" },
                    { text: "Get Link", link: "/api-reference/v1/link/get-link-detail" },
                    { text: "Update Link", link: "/api-reference/v1/link/update-link-detail" },
                    { text: "Delete Link", link: "/api-reference/v1/link/delete-link" },
                  ],
                },
                {
                  text: "Work Item Activity",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/issue-activity/overview" },
                    {
                      text: "List Activities",
                      link: "/api-reference/v1/issue-activity/list-issue-activities",
                    },
                    {
                      text: "Get Activity",
                      link: "/api-reference/v1/issue-activity/get-issue-activity-detail",
                    },
                  ],
                },
                {
                  text: "Work Item Comments",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/issue-comment/overview" },
                    {
                      text: "Add Comment",
                      link: "/api-reference/v1/issue-comment/add-issue-comment",
                    },
                    {
                      text: "List Comments",
                      link: "/api-reference/v1/issue-comment/list-issue-comments",
                    },
                    {
                      text: "Get Comment",
                      link: "/api-reference/v1/issue-comment/get-issue-comment-detail",
                    },
                    {
                      text: "Update Comment",
                      link: "/api-reference/v1/issue-comment/update-issue-comment-detail",
                    },
                    {
                      text: "Delete Comment",
                      link: "/api-reference/v1/issue-comment/delete-issue-comment",
                    },
                  ],
                },
                {
                  text: "Work Item Attachments",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/issue-attachments/overview" },
                    {
                      text: "Get Attachments",
                      link: "/api-reference/v1/issue-attachments/get-attachments",
                    },
                    {
                      text: "Get Attachment Detail",
                      link: "/api-reference/v1/issue-attachments/get-attachment-detail",
                    },
                    {
                      text: "Get Upload Credentials",
                      link: "/api-reference/v1/issue-attachments/get-upload-credentials",
                    },
                    {
                      text: "Upload File",
                      link: "/api-reference/v1/issue-attachments/upload-file",
                    },
                    {
                      text: "Complete Upload",
                      link: "/api-reference/v1/issue-attachments/complete-upload",
                    },
                    {
                      text: "Update Attachment",
                      link: "/api-reference/v1/issue-attachments/update-attachment",
                    },
                    {
                      text: "Delete Attachment",
                      link: "/api-reference/v1/issue-attachments/delete-attachment",
                    },
                  ],
                },
                {
                  text: "Work Item Page Links",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/work-item-pages/overview" },
                    {
                      text: "Create Work Item Page Link",
                      link: "/api-reference/v1/work-item-pages/add-work-item-page",
                    },
                    {
                      text: "List Work Item Pages",
                      link: "/api-reference/v1/work-item-pages/list-work-item-pages",
                    },
                    {
                      text: "Get Work Item Page Link",
                      link: "/api-reference/v1/work-item-pages/get-work-item-page-detail",
                    },
                    {
                      text: "Delete Work Item Page Link",
                      link: "/api-reference/v1/work-item-pages/delete-work-item-page",
                    },
                  ],
                },

                {
                  text: "Cycles",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/cycle/overview" },
                    { text: "Create Cycle", link: "/api-reference/v1/cycle/add-cycle" },
                    {
                      text: "Add Work Items",
                      link: "/api-reference/v1/cycle/add-cycle-work-items",
                    },
                    {
                      text: "Transfer Work Items",
                      link: "/api-reference/v1/cycle/transfer-cycle-work-items",
                    },
                    { text: "Archive Cycle", link: "/api-reference/v1/cycle/archive-cycle" },
                    { text: "List Cycles", link: "/api-reference/v1/cycle/list-cycles" },
                    { text: "Get Cycle", link: "/api-reference/v1/cycle/get-cycle-detail" },
                    {
                      text: "List Cycle Work Items",
                      link: "/api-reference/v1/cycle/list-cycle-work-items",
                    },
                    {
                      text: "List Archived Cycles",
                      link: "/api-reference/v1/cycle/list-archived-cycles",
                    },
                    { text: "Update Cycle", link: "/api-reference/v1/cycle/update-cycle-detail" },
                    { text: "Unarchive Cycle", link: "/api-reference/v1/cycle/unarchive-cycle" },
                    {
                      text: "Remove Work Item",
                      link: "/api-reference/v1/cycle/remove-cycle-work-item",
                    },
                    { text: "Delete Cycle", link: "/api-reference/v1/cycle/delete-cycle" },
                  ],
                },
                {
                  text: "Modules",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/module/overview" },
                    { text: "Create Module", link: "/api-reference/v1/module/add-module" },
                    {
                      text: "Add Work Items",
                      link: "/api-reference/v1/module/add-module-work-items",
                    },
                    { text: "Archive Module", link: "/api-reference/v1/module/archive-module" },
                    { text: "List Modules", link: "/api-reference/v1/module/list-modules" },
                    { text: "Get Module", link: "/api-reference/v1/module/get-module-detail" },
                    {
                      text: "List Module Work Items",
                      link: "/api-reference/v1/module/list-module-work-items",
                    },
                    {
                      text: "List Archived Modules",
                      link: "/api-reference/v1/module/list-archived-modules",
                    },
                    {
                      text: "Update Module",
                      link: "/api-reference/v1/module/update-module-detail",
                    },
                    { text: "Unarchive Module", link: "/api-reference/v1/module/unarchive-module" },
                    {
                      text: "Remove Work Item",
                      link: "/api-reference/v1/module/remove-module-work-item",
                    },
                    { text: "Delete Module", link: "/api-reference/v1/module/delete-module" },
                  ],
                },
                {
                  text: "Pages",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/page/overview" },
                    {
                      text: "List Workspace Pages",
                      link: "/api-reference/v1/page/list-workspace-pages",
                    },
                    {
                      text: "Add Workspace Page",
                      link: "/api-reference/v1/page/add-workspace-page",
                    },
                    {
                      text: "List Project Pages",
                      link: "/api-reference/v1/page/list-project-pages",
                    },
                    { text: "Add Project Page", link: "/api-reference/v1/page/add-project-page" },
                    {
                      text: "Get Workspace Page",
                      link: "/api-reference/v1/page/get-workspace-page",
                    },
                    { text: "Get Project Page", link: "/api-reference/v1/page/get-project-page" },
                  ],
                },
                {
                  text: "Intake",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/intake-issue/overview" },
                    {
                      text: "Add Intake Issue",
                      link: "/api-reference/v1/intake-issue/add-intake-issue",
                    },
                    {
                      text: "List Intake Issues",
                      link: "/api-reference/v1/intake-issue/list-intake-issues",
                    },
                    {
                      text: "Get Intake Issue",
                      link: "/api-reference/v1/intake-issue/get-intake-issue-detail",
                    },
                    {
                      text: "Update Intake Issue",
                      link: "/api-reference/v1/intake-issue/update-intake-issue-detail",
                    },
                    {
                      text: "Delete Intake Issue",
                      link: "/api-reference/v1/intake-issue/delete-intake-issue",
                    },
                  ],
                },
                {
                  text: "Assets",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/assets/overview" },
                    {
                      text: "Create User Asset Upload",
                      link: "/api-reference/v1/assets/create-user-asset-upload",
                    },
                    {
                      text: "Update User Asset",
                      link: "/api-reference/v1/assets/update-user-asset",
                    },
                    {
                      text: "Delete User Asset",
                      link: "/api-reference/v1/assets/delete-user-asset",
                    },
                    {
                      text: "Create Workspace Asset Upload",
                      link: "/api-reference/v1/assets/create-workspace-asset-upload",
                    },
                    {
                      text: "Get Workspace Asset",
                      link: "/api-reference/v1/assets/get-workspace-asset",
                    },
                    {
                      text: "Update Workspace Asset",
                      link: "/api-reference/v1/assets/update-workspace-asset",
                    },
                  ],
                },
                {
                  text: "Milestones",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/milestones/overview" },
                    {
                      text: "Create Milestone",
                      link: "/api-reference/v1/milestones/add-milestone",
                    },
                    {
                      text: "List Milestones",
                      link: "/api-reference/v1/milestones/list-milestones",
                    },
                    {
                      text: "Get Milestone",
                      link: "/api-reference/v1/milestones/get-milestone-detail",
                    },
                    {
                      text: "List Milestone Work Items",
                      link: "/api-reference/v1/milestones/list-milestone-work-items",
                    },
                    {
                      text: "Update Milestone",
                      link: "/api-reference/v1/milestones/update-milestone-detail",
                    },
                    {
                      text: "Delete Milestone",
                      link: "/api-reference/v1/milestones/delete-milestone",
                    },
                  ],
                },
                {
                  text: "Estimates",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/estimate/overview" },
                    { text: "Create Estimate", link: "/api-reference/v1/estimate/add-estimate" },
                    { text: "Get Estimate", link: "/api-reference/v1/estimate/get-estimate" },
                    { text: "Update Estimate", link: "/api-reference/v1/estimate/update-estimate" },
                    { text: "Delete Estimate", link: "/api-reference/v1/estimate/delete-estimate" },
                    {
                      text: "List Estimate Points",
                      link: "/api-reference/v1/estimate/list-estimate-points",
                    },
                    {
                      text: "Create Estimate Points",
                      link: "/api-reference/v1/estimate/add-estimate-points",
                    },
                    {
                      text: "Update Estimate Point",
                      link: "/api-reference/v1/estimate/update-estimate-point",
                    },
                    {
                      text: "Delete Estimate Point",
                      link: "/api-reference/v1/estimate/delete-estimate-point",
                    },
                  ],
                },
                {
                  text: "Time Tracking",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/worklogs/overview" },
                    { text: "Create Worklog", link: "/api-reference/v1/worklogs/create-worklog" },
                    {
                      text: "Get Worklogs for Issue",
                      link: "/api-reference/v1/worklogs/get-worklogs-for-issue",
                    },
                    { text: "Get Total Time", link: "/api-reference/v1/worklogs/get-total-time" },
                    { text: "Update Worklog", link: "/api-reference/v1/worklogs/update-worklog" },
                    { text: "Delete Worklog", link: "/api-reference/v1/worklogs/delete-worklog" },
                  ],
                },
                {
                  text: "Epics",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/epics/overview" },
                    { text: "Create Epic", link: "/api-reference/v1/epics/create-epic" },
                    { text: "List Epics", link: "/api-reference/v1/epics/list-epics" },
                    { text: "Get Epic", link: "/api-reference/v1/epics/get-epic-detail" },
                    { text: "Update Epic", link: "/api-reference/v1/epics/update-epic" },
                    { text: "Delete Epic", link: "/api-reference/v1/epics/delete-epic" },
                    {
                      text: "Add Epic Work Items",
                      link: "/api-reference/v1/epics/add-epic-work-items",
                    },
                    {
                      text: "List Epic Work Items",
                      link: "/api-reference/v1/epics/list-epic-work-items",
                    },
                  ],
                },
                {
                  text: "Initiatives",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/initiative/overview" },
                    {
                      text: "Create Initiative",
                      link: "/api-reference/v1/initiative/add-initiative",
                    },
                    {
                      text: "List Initiatives",
                      link: "/api-reference/v1/initiative/list-initiatives",
                    },
                    {
                      text: "Get Initiative",
                      link: "/api-reference/v1/initiative/get-initiative-detail",
                    },
                    {
                      text: "Update Initiative",
                      link: "/api-reference/v1/initiative/update-initiative-detail",
                    },
                    {
                      text: "Delete Initiative",
                      link: "/api-reference/v1/initiative/delete-initiative",
                    },
                  ],
                },
                {
                  text: "Initiative Labels",
                  collapsed: true,
                  items: [
                    {
                      text: "Add Label",
                      link: "/api-reference/v1/initiative/add-initiative-label",
                    },
                    {
                      text: "Add Labels to Initiative",
                      link: "/api-reference/v1/initiative/add-labels-to-initiative",
                    },
                    {
                      text: "List Initiative Labels",
                      link: "/api-reference/v1/initiative/list-initiative-labels",
                    },
                    {
                      text: "Get Label Detail",
                      link: "/api-reference/v1/initiative/get-initiative-label-detail",
                    },
                    {
                      text: "List Labels for Initiative",
                      link: "/api-reference/v1/initiative/list-initiative-labels-for-initiative",
                    },
                    {
                      text: "Update Label",
                      link: "/api-reference/v1/initiative/update-initiative-label-detail",
                    },
                    {
                      text: "Remove Labels",
                      link: "/api-reference/v1/initiative/remove-labels-from-initiative",
                    },
                    {
                      text: "Delete Label",
                      link: "/api-reference/v1/initiative/delete-initiative-label",
                    },
                  ],
                },
                {
                  text: "Initiative Projects",
                  collapsed: true,
                  items: [
                    {
                      text: "Add Projects",
                      link: "/api-reference/v1/initiative/add-projects-to-initiative",
                    },
                    {
                      text: "List Projects",
                      link: "/api-reference/v1/initiative/list-initiative-projects",
                    },
                    {
                      text: "Remove Projects",
                      link: "/api-reference/v1/initiative/remove-projects-from-initiative",
                    },
                  ],
                },
                {
                  text: "Initiative Epics",
                  collapsed: true,
                  items: [
                    {
                      text: "Add Epics",
                      link: "/api-reference/v1/initiative/add-epics-to-initiative",
                    },
                    {
                      text: "List Epics",
                      link: "/api-reference/v1/initiative/list-initiative-epics",
                    },
                    {
                      text: "Remove Epics",
                      link: "/api-reference/v1/initiative/remove-epics-from-initiative",
                    },
                  ],
                },
                {
                  text: "Customers",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/customer/overview" },
                    { text: "Add Customer", link: "/api-reference/v1/customer/add-customer" },
                    {
                      text: "Link Work Items",
                      link: "/api-reference/v1/customer/link-work-items-to-customer",
                    },
                    { text: "List Customers", link: "/api-reference/v1/customer/list-customers" },
                    {
                      text: "Get Customer",
                      link: "/api-reference/v1/customer/get-customer-detail",
                    },
                    {
                      text: "List Customer Work Items",
                      link: "/api-reference/v1/customer/list-customer-work-items",
                    },
                    {
                      text: "Update Customer",
                      link: "/api-reference/v1/customer/update-customer-detail",
                    },
                    {
                      text: "Unlink Work Item",
                      link: "/api-reference/v1/customer/unlink-work-item-from-customer",
                    },
                    { text: "Delete Customer", link: "/api-reference/v1/customer/delete-customer" },
                  ],
                },
                {
                  text: "Customer Properties",
                  collapsed: true,
                  items: [
                    {
                      text: "Add Property",
                      link: "/api-reference/v1/customer/add-customer-property",
                    },
                    {
                      text: "List Properties",
                      link: "/api-reference/v1/customer/list-customer-properties",
                    },
                    {
                      text: "Get Property Detail",
                      link: "/api-reference/v1/customer/get-customer-property-detail",
                    },
                    {
                      text: "List Property Values",
                      link: "/api-reference/v1/customer/list-customer-property-values",
                    },
                    {
                      text: "Get Property Value",
                      link: "/api-reference/v1/customer/get-customer-property-value",
                    },
                    {
                      text: "Update Property",
                      link: "/api-reference/v1/customer/update-customer-property-detail",
                    },
                    {
                      text: "Update Property Value",
                      link: "/api-reference/v1/customer/update-customer-property-value",
                    },
                    {
                      text: "Delete Property",
                      link: "/api-reference/v1/customer/delete-customer-property",
                    },
                  ],
                },
                {
                  text: "Customer Requests",
                  collapsed: true,
                  items: [
                    {
                      text: "Add Request",
                      link: "/api-reference/v1/customer/add-customer-request",
                    },
                    {
                      text: "List Requests",
                      link: "/api-reference/v1/customer/list-customer-requests",
                    },
                    {
                      text: "Get Request Detail",
                      link: "/api-reference/v1/customer/get-customer-request-detail",
                    },
                    {
                      text: "Update Request",
                      link: "/api-reference/v1/customer/update-customer-request-detail",
                    },
                    {
                      text: "Delete Request",
                      link: "/api-reference/v1/customer/delete-customer-request",
                    },
                  ],
                },
                {
                  text: "Teamspaces",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/teamspace/overview" },
                    { text: "Create Teamspace", link: "/api-reference/v1/teamspace/add-teamspace" },
                    {
                      text: "List Teamspaces",
                      link: "/api-reference/v1/teamspace/list-teamspaces",
                    },
                    {
                      text: "Get Teamspace",
                      link: "/api-reference/v1/teamspace/get-teamspace-detail",
                    },
                    {
                      text: "Update Teamspace",
                      link: "/api-reference/v1/teamspace/update-teamspace-detail",
                    },
                    {
                      text: "Delete Teamspace",
                      link: "/api-reference/v1/teamspace/delete-teamspace",
                    },
                  ],
                },
                {
                  text: "Teamspace Members",
                  collapsed: true,
                  items: [
                    {
                      text: "List Members",
                      link: "/api-reference/v1/teamspace/list-teamspace-members",
                    },
                    {
                      text: "Add Members",
                      link: "/api-reference/v1/teamspace/add-teamspace-members",
                    },
                    {
                      text: "Remove Members",
                      link: "/api-reference/v1/teamspace/remove-teamspace-members",
                    },
                  ],
                },
                {
                  text: "Teamspace Projects",
                  collapsed: true,
                  items: [
                    {
                      text: "List Projects",
                      link: "/api-reference/v1/teamspace/list-teamspace-projects",
                    },
                    {
                      text: "Add Projects",
                      link: "/api-reference/v1/teamspace/add-projects-to-teamspace",
                    },
                    {
                      text: "Remove Projects",
                      link: "/api-reference/v1/teamspace/remove-projects-from-teamspace",
                    },
                  ],
                },
                {
                  text: "Stickies",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/sticky/overview" },
                    { text: "Add Sticky", link: "/api-reference/v1/sticky/add-sticky" },
                    { text: "List Stickies", link: "/api-reference/v1/sticky/list-stickies" },
                    { text: "Get Sticky", link: "/api-reference/v1/sticky/get-sticky-detail" },
                    {
                      text: "Update Sticky",
                      link: "/api-reference/v1/sticky/update-sticky-detail",
                    },
                    { text: "Delete Sticky", link: "/api-reference/v1/sticky/delete-sticky" },
                  ],
                },
                {
                  text: "Workspace Features",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/workspace-features/overview" },
                    {
                      text: "Get Workspace Features",
                      link: "/api-reference/v1/workspace-features/get-workspace-features",
                    },
                    {
                      text: "Update Workspace Features",
                      link: "/api-reference/v1/workspace-features/update-workspace-features",
                    },
                  ],
                },
                {
                  text: "Workspace Invitations",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/workspace-invitations/overview" },
                    {
                      text: "Create Workspace Invitation",
                      link: "/api-reference/v1/workspace-invitations/add-workspace-invitation",
                    },
                    {
                      text: "List Workspace Invitations",
                      link: "/api-reference/v1/workspace-invitations/list-workspace-invitations",
                    },
                    {
                      text: "Get Workspace Invitation",
                      link: "/api-reference/v1/workspace-invitations/get-workspace-invitation-detail",
                    },
                    {
                      text: "Update Workspace Invitation",
                      link: "/api-reference/v1/workspace-invitations/update-workspace-invitation",
                    },
                    {
                      text: "Delete Workspace Invitation",
                      link: "/api-reference/v1/workspace-invitations/delete-workspace-invitation",
                    },
                  ],
                },
                {
                  text: "Members",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/members/overview" },
                    {
                      text: "Get Workspace Members",
                      link: "/api-reference/v1/members/get-workspace-members",
                    },
                    {
                      text: "Get Project Members",
                      link: "/api-reference/v1/members/get-project-members",
                    },
                    {
                      text: "Create Project Member",
                      link: "/api-reference/v1/members/add-project-member",
                    },
                    {
                      text: "Get Project Member",
                      link: "/api-reference/v1/members/get-project-member-detail",
                    },
                    {
                      text: "Update Project Member",
                      link: "/api-reference/v1/members/update-project-member",
                    },
                    {
                      text: "Delete Project Member",
                      link: "/api-reference/v1/members/delete-project-member",
                    },
                    {
                      text: "Remove Workspace Members",
                      link: "/api-reference/v1/members/remove-workspace-member",
                    },
                  ],
                },
                {
                  text: "User",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/user/overview" },
                    { text: "Get Current User", link: "/api-reference/v1/user/get-current-user" },
                  ],
                },
                {
                  text: "IDP Group Sync",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v1/idp-group-sync/overview" },
                    {
                      text: "Get Group Sync Config",
                      link: "/api-reference/v1/idp-group-sync/get-group-sync-config",
                    },
                    {
                      text: "Update Group Sync Config",
                      link: "/api-reference/v1/idp-group-sync/update-group-sync-config",
                    },
                    {
                      text: "List Project Mappings",
                      link: "/api-reference/v1/idp-group-sync/list-project-mappings",
                    },
                    {
                      text: "Create Project Mapping",
                      link: "/api-reference/v1/idp-group-sync/create-project-mapping",
                    },
                    {
                      text: "Get Project Mapping",
                      link: "/api-reference/v1/idp-group-sync/get-project-mapping",
                    },
                    {
                      text: "Update Project Mapping",
                      link: "/api-reference/v1/idp-group-sync/update-project-mapping",
                    },
                    {
                      text: "Delete Project Mapping",
                      link: "/api-reference/v1/idp-group-sync/delete-project-mapping",
                    },
                    {
                      text: "List Workspace Mappings",
                      link: "/api-reference/v1/idp-group-sync/list-workspace-mappings",
                    },
                    {
                      text: "Create Workspace Mapping",
                      link: "/api-reference/v1/idp-group-sync/create-workspace-mapping",
                    },
                    {
                      text: "Get Workspace Mapping",
                      link: "/api-reference/v1/idp-group-sync/get-workspace-mapping",
                    },
                    {
                      text: "Update Workspace Mapping",
                      link: "/api-reference/v1/idp-group-sync/update-workspace-mapping",
                    },
                    {
                      text: "Delete Workspace Mapping",
                      link: "/api-reference/v1/idp-group-sync/delete-workspace-mapping",
                    },
                  ],
                },
              ],
            },
          ],

          "/api-reference/v2/": [
            {
              text: "API Reference",
              items: [
                { text: "Introduction", link: "/api-reference/v2/introduction" },
                { text: "Authentication", link: "/api-reference/v2/authentication" },
                { text: "Pagination", link: "/api-reference/v2/pagination" },
                { text: "Filtering & Ordering", link: "/api-reference/v2/filtering-and-ordering" },
                { text: "Sparse Fields", link: "/api-reference/v2/sparse-fields" },
                { text: "Expanding Relations", link: "/api-reference/v2/expanding-relations" },
                { text: "Errors", link: "/api-reference/v2/errors" },
                { text: "Work Item Type Modes", link: "/api-reference/v2/work-item-type-modes" },
                { text: "Migrating from v1", link: "/api-reference/v2/migrating-from-v1" },
              ],
            },
            {
              text: "Core Resources",
              items: [
                {
                  text: "Work Items",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/work-items/overview" },
                    {
                      text: "List work items",
                      link: "/api-reference/v2/work-items/list-work-items",
                    },
                    {
                      text: "List work items across a workspace",
                      link: "/api-reference/v2/work-items/list-workspace-work-items",
                    },
                    { text: "Get a work item", link: "/api-reference/v2/work-items/get-work-item" },
                    {
                      text: "Get a work item by identifier",
                      link: "/api-reference/v2/work-items/get-work-item-by-identifier",
                    },
                    {
                      text: "Create a work item",
                      link: "/api-reference/v2/work-items/create-work-item",
                    },
                    {
                      text: "Update a work item",
                      link: "/api-reference/v2/work-items/update-work-item",
                    },
                    {
                      text: "Delete a work item",
                      link: "/api-reference/v2/work-items/delete-work-item",
                    },
                    {
                      text: "Upsert a work item",
                      link: "/api-reference/v2/work-items/upsert-work-item",
                    },
                    {
                      text: "Bulk create work items",
                      link: "/api-reference/v2/work-items/bulk-create-work-items",
                    },
                    {
                      text: "Bulk update work items",
                      link: "/api-reference/v2/work-items/bulk-update-work-items",
                    },
                    {
                      text: "Bulk delete work items",
                      link: "/api-reference/v2/work-items/bulk-delete-work-items",
                    },
                    {
                      text: "Archive a work item",
                      link: "/api-reference/v2/work-items/archive-work-item",
                    },
                    {
                      text: "Unarchive a work item",
                      link: "/api-reference/v2/work-items/unarchive-work-item",
                    },
                  ],
                },
                {
                  text: "Comments",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/work-item-comments/overview" },
                    {
                      text: "List comments",
                      link: "/api-reference/v2/work-item-comments/list-comments",
                    },
                    {
                      text: "Get a comment",
                      link: "/api-reference/v2/work-item-comments/get-comment",
                    },
                    {
                      text: "Create a comment",
                      link: "/api-reference/v2/work-item-comments/create-comment",
                    },
                    {
                      text: "Update a comment",
                      link: "/api-reference/v2/work-item-comments/update-comment",
                    },
                    {
                      text: "Delete a comment",
                      link: "/api-reference/v2/work-item-comments/delete-comment",
                    },
                    {
                      text: "Upsert a comment",
                      link: "/api-reference/v2/work-item-comments/upsert-comment",
                    },
                    {
                      text: "Bulk create comments",
                      link: "/api-reference/v2/work-item-comments/bulk-create-comments",
                    },
                    {
                      text: "Bulk update comments",
                      link: "/api-reference/v2/work-item-comments/bulk-update-comments",
                    },
                    {
                      text: "Bulk delete comments",
                      link: "/api-reference/v2/work-item-comments/bulk-delete-comments",
                    },
                  ],
                },
                {
                  text: "Attachments",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/work-item-attachments/overview" },
                    {
                      text: "List attachments",
                      link: "/api-reference/v2/work-item-attachments/list-attachments",
                    },
                    {
                      text: "Get a attachment",
                      link: "/api-reference/v2/work-item-attachments/get-attachment",
                    },
                    {
                      text: "Create a work item attachment upload",
                      link: "/api-reference/v2/work-item-attachments/create-attachment-upload",
                    },
                    {
                      text: "Delete a attachment",
                      link: "/api-reference/v2/work-item-attachments/delete-attachment",
                    },
                    {
                      text: "Confirm a work item attachment upload",
                      link: "/api-reference/v2/work-item-attachments/confirm-attachment-upload",
                    },
                  ],
                },
                {
                  text: "Links",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/work-item-links/overview" },
                    { text: "List links", link: "/api-reference/v2/work-item-links/list-links" },
                    { text: "Get a link", link: "/api-reference/v2/work-item-links/get-link" },
                    {
                      text: "Create a link",
                      link: "/api-reference/v2/work-item-links/create-link",
                    },
                    {
                      text: "Update a link",
                      link: "/api-reference/v2/work-item-links/update-link",
                    },
                    {
                      text: "Delete a link",
                      link: "/api-reference/v2/work-item-links/delete-link",
                    },
                  ],
                },
                {
                  text: "Activities",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/work-item-activities/overview" },
                    {
                      text: "List activities",
                      link: "/api-reference/v2/work-item-activities/list-activities",
                    },
                    {
                      text: "Get a activity",
                      link: "/api-reference/v2/work-item-activities/get-activity",
                    },
                  ],
                },
                {
                  text: "Worklogs",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/work-item-worklogs/overview" },
                    {
                      text: "List worklogs",
                      link: "/api-reference/v2/work-item-worklogs/list-worklogs",
                    },
                    {
                      text: "Get the project worklog summary",
                      link: "/api-reference/v2/work-item-worklogs/get-project-worklog-summary",
                    },
                    {
                      text: "Get a worklog",
                      link: "/api-reference/v2/work-item-worklogs/get-worklog",
                    },
                    {
                      text: "Create a worklog",
                      link: "/api-reference/v2/work-item-worklogs/create-worklog",
                    },
                    {
                      text: "Update a worklog",
                      link: "/api-reference/v2/work-item-worklogs/update-worklog",
                    },
                    {
                      text: "Delete a worklog",
                      link: "/api-reference/v2/work-item-worklogs/delete-worklog",
                    },
                  ],
                },
                {
                  text: "Relations",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/work-item-relations/overview" },
                    {
                      text: "List work item relations",
                      link: "/api-reference/v2/work-item-relations/list-work-item-relations",
                    },
                    {
                      text: "Create work item relations",
                      link: "/api-reference/v2/work-item-relations/create-work-item-relations",
                    },
                    {
                      text: "Delete a work item relation",
                      link: "/api-reference/v2/work-item-relations/delete-work-item-relation",
                    },
                  ],
                },
                {
                  text: "Dependencies",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/work-item-dependencies/overview" },
                    {
                      text: "List work item dependencies",
                      link: "/api-reference/v2/work-item-dependencies/list-work-item-dependencies",
                    },
                    {
                      text: "Create work item dependencies",
                      link: "/api-reference/v2/work-item-dependencies/create-work-item-dependencies",
                    },
                    {
                      text: "Delete a work item dependency",
                      link: "/api-reference/v2/work-item-dependencies/delete-work-item-dependency",
                    },
                  ],
                },
                {
                  text: "Relation Definitions",
                  collapsed: true,
                  items: [
                    {
                      text: "Overview",
                      link: "/api-reference/v2/work-item-relation-definitions/overview",
                    },
                    {
                      text: "List relation definitions",
                      link: "/api-reference/v2/work-item-relation-definitions/list-relation-definitions",
                    },
                    {
                      text: "Get a relation definition",
                      link: "/api-reference/v2/work-item-relation-definitions/get-relation-definition",
                    },
                    {
                      text: "Create a relation definition",
                      link: "/api-reference/v2/work-item-relation-definitions/create-relation-definition",
                    },
                    {
                      text: "Update a relation definition",
                      link: "/api-reference/v2/work-item-relation-definitions/update-relation-definition",
                    },
                    {
                      text: "Delete a relation definition",
                      link: "/api-reference/v2/work-item-relation-definitions/delete-relation-definition",
                    },
                  ],
                },
                {
                  text: "States",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/states/overview" },
                    { text: "List states", link: "/api-reference/v2/states/list-states" },
                    { text: "Get a state", link: "/api-reference/v2/states/get-state" },
                    { text: "Create a state", link: "/api-reference/v2/states/create-state" },
                    { text: "Update a state", link: "/api-reference/v2/states/update-state" },
                    { text: "Delete a state", link: "/api-reference/v2/states/delete-state" },
                    { text: "Upsert a state", link: "/api-reference/v2/states/upsert-state" },
                    {
                      text: "Bulk create states",
                      link: "/api-reference/v2/states/bulk-create-states",
                    },
                    {
                      text: "Bulk update states",
                      link: "/api-reference/v2/states/bulk-update-states",
                    },
                    {
                      text: "Bulk delete states",
                      link: "/api-reference/v2/states/bulk-delete-states",
                    },
                  ],
                },
                {
                  text: "Labels",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/labels/overview" },
                    { text: "List labels", link: "/api-reference/v2/labels/list-labels" },
                    { text: "Get a label", link: "/api-reference/v2/labels/get-label" },
                    { text: "Create a label", link: "/api-reference/v2/labels/create-label" },
                    { text: "Update a label", link: "/api-reference/v2/labels/update-label" },
                    { text: "Delete a label", link: "/api-reference/v2/labels/delete-label" },
                    { text: "Upsert a label", link: "/api-reference/v2/labels/upsert-label" },
                    {
                      text: "Bulk create labels",
                      link: "/api-reference/v2/labels/bulk-create-labels",
                    },
                    {
                      text: "Bulk update labels",
                      link: "/api-reference/v2/labels/bulk-update-labels",
                    },
                    {
                      text: "Bulk delete labels",
                      link: "/api-reference/v2/labels/bulk-delete-labels",
                    },
                  ],
                },
                {
                  text: "Cycles",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/cycles/overview" },
                    { text: "List cycles", link: "/api-reference/v2/cycles/list-cycles" },
                    { text: "Get a cycle", link: "/api-reference/v2/cycles/get-cycle" },
                    { text: "Create a cycle", link: "/api-reference/v2/cycles/create-cycle" },
                    { text: "Update a cycle", link: "/api-reference/v2/cycles/update-cycle" },
                    { text: "Delete a cycle", link: "/api-reference/v2/cycles/delete-cycle" },
                    { text: "Upsert a cycle", link: "/api-reference/v2/cycles/upsert-cycle" },
                    {
                      text: "Bulk create cycles",
                      link: "/api-reference/v2/cycles/bulk-create-cycles",
                    },
                    {
                      text: "Bulk update cycles",
                      link: "/api-reference/v2/cycles/bulk-update-cycles",
                    },
                    {
                      text: "Bulk delete cycles",
                      link: "/api-reference/v2/cycles/bulk-delete-cycles",
                    },
                    {
                      text: "Add or remove cycle work items",
                      link: "/api-reference/v2/cycles/manage-cycle-work-items",
                    },
                    {
                      text: "Transfer work items between cycles",
                      link: "/api-reference/v2/cycles/transfer-cycle-work-items",
                    },
                  ],
                },
                {
                  text: "Modules",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/modules/overview" },
                    { text: "List modules", link: "/api-reference/v2/modules/list-modules" },
                    { text: "Get a module", link: "/api-reference/v2/modules/get-module" },
                    { text: "Create a module", link: "/api-reference/v2/modules/create-module" },
                    { text: "Update a module", link: "/api-reference/v2/modules/update-module" },
                    { text: "Delete a module", link: "/api-reference/v2/modules/delete-module" },
                    { text: "Upsert a module", link: "/api-reference/v2/modules/upsert-module" },
                    {
                      text: "Bulk create modules",
                      link: "/api-reference/v2/modules/bulk-create-modules",
                    },
                    {
                      text: "Bulk update modules",
                      link: "/api-reference/v2/modules/bulk-update-modules",
                    },
                    {
                      text: "Bulk delete modules",
                      link: "/api-reference/v2/modules/bulk-delete-modules",
                    },
                    {
                      text: "Add or remove module work items",
                      link: "/api-reference/v2/modules/manage-module-work-items",
                    },
                  ],
                },
                {
                  text: "Milestones",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/milestones/overview" },
                    {
                      text: "List milestones",
                      link: "/api-reference/v2/milestones/list-milestones",
                    },
                    { text: "Get a milestone", link: "/api-reference/v2/milestones/get-milestone" },
                    {
                      text: "Create a milestone",
                      link: "/api-reference/v2/milestones/create-milestone",
                    },
                    {
                      text: "Update a milestone",
                      link: "/api-reference/v2/milestones/update-milestone",
                    },
                    {
                      text: "Delete a milestone",
                      link: "/api-reference/v2/milestones/delete-milestone",
                    },
                    {
                      text: "Upsert a milestone",
                      link: "/api-reference/v2/milestones/upsert-milestone",
                    },
                    {
                      text: "Bulk create milestones",
                      link: "/api-reference/v2/milestones/bulk-create-milestones",
                    },
                    {
                      text: "Bulk update milestones",
                      link: "/api-reference/v2/milestones/bulk-update-milestones",
                    },
                    {
                      text: "Bulk delete milestones",
                      link: "/api-reference/v2/milestones/bulk-delete-milestones",
                    },
                    {
                      text: "Add or remove milestone work items",
                      link: "/api-reference/v2/milestones/manage-milestone-work-items",
                    },
                  ],
                },
                {
                  text: "Intake",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/intake-work-items/overview" },
                    {
                      text: "List intake work items",
                      link: "/api-reference/v2/intake-work-items/list-intake-work-items",
                    },
                    {
                      text: "Get a intake work item",
                      link: "/api-reference/v2/intake-work-items/get-intake-work-item",
                    },
                    {
                      text: "Create a intake work item",
                      link: "/api-reference/v2/intake-work-items/create-intake-work-item",
                    },
                    {
                      text: "Update a intake work item",
                      link: "/api-reference/v2/intake-work-items/update-intake-work-item",
                    },
                    {
                      text: "Delete a intake work item",
                      link: "/api-reference/v2/intake-work-items/delete-intake-work-item",
                    },
                  ],
                },
              ],
            },
            {
              text: "Work Item Types (Project)",
              items: [
                {
                  text: "Work Item Types",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/work-item-types/overview" },
                    {
                      text: "List work item types",
                      link: "/api-reference/v2/work-item-types/list-work-item-types",
                    },
                    {
                      text: "Get a work item type",
                      link: "/api-reference/v2/work-item-types/get-work-item-type",
                    },
                    {
                      text: "Get a work item type schema",
                      link: "/api-reference/v2/work-item-types/get-work-item-type-schema",
                    },
                    {
                      text: "Create a work item type",
                      link: "/api-reference/v2/work-item-types/create-work-item-type",
                    },
                    {
                      text: "Update a work item type",
                      link: "/api-reference/v2/work-item-types/update-work-item-type",
                    },
                    {
                      text: "Delete a work item type",
                      link: "/api-reference/v2/work-item-types/delete-work-item-type",
                    },
                    {
                      text: "Enable work item types",
                      link: "/api-reference/v2/work-item-types/enable-work-item-types",
                    },
                    {
                      text: "Import work item types",
                      link: "/api-reference/v2/work-item-types/import-work-item-types",
                    },
                    {
                      text: "Mark a work item type as default",
                      link: "/api-reference/v2/work-item-types/mark-default-work-item-type",
                    },
                  ],
                },
                {
                  text: "Properties",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/work-item-properties/overview" },
                    {
                      text: "List work item properties",
                      link: "/api-reference/v2/work-item-properties/list-work-item-properties",
                    },
                    {
                      text: "Get a work item property",
                      link: "/api-reference/v2/work-item-properties/get-work-item-property",
                    },
                    {
                      text: "Create a work item property",
                      link: "/api-reference/v2/work-item-properties/create-work-item-property",
                    },
                    {
                      text: "Update a work item property",
                      link: "/api-reference/v2/work-item-properties/update-work-item-property",
                    },
                    {
                      text: "Delete a work item property",
                      link: "/api-reference/v2/work-item-properties/delete-work-item-property",
                    },
                  ],
                },
                {
                  text: "Property Options",
                  collapsed: true,
                  items: [
                    {
                      text: "Overview",
                      link: "/api-reference/v2/work-item-property-options/overview",
                    },
                    {
                      text: "List property options",
                      link: "/api-reference/v2/work-item-property-options/list-property-options",
                    },
                    {
                      text: "Get a property option",
                      link: "/api-reference/v2/work-item-property-options/get-property-option",
                    },
                    {
                      text: "Create a property option",
                      link: "/api-reference/v2/work-item-property-options/create-property-option",
                    },
                    {
                      text: "Update a property option",
                      link: "/api-reference/v2/work-item-property-options/update-property-option",
                    },
                    {
                      text: "Delete a property option",
                      link: "/api-reference/v2/work-item-property-options/delete-property-option",
                    },
                  ],
                },
                {
                  text: "Type Properties",
                  collapsed: true,
                  items: [
                    {
                      text: "Overview",
                      link: "/api-reference/v2/work-item-type-properties/overview",
                    },
                    {
                      text: "List type properties",
                      link: "/api-reference/v2/work-item-type-properties/list-type-properties",
                    },
                    {
                      text: "Get a type property",
                      link: "/api-reference/v2/work-item-type-properties/get-type-property",
                    },
                    {
                      text: "Attach a property to a type",
                      link: "/api-reference/v2/work-item-type-properties/attach-type-property",
                    },
                    {
                      text: "Detach a property from a type",
                      link: "/api-reference/v2/work-item-type-properties/detach-type-property",
                    },
                  ],
                },
              ],
            },
            {
              text: "Work Item Types (Workspace)",
              items: [
                {
                  text: "Work Item Types",
                  collapsed: true,
                  items: [
                    {
                      text: "Overview",
                      link: "/api-reference/v2/workspace-work-item-types/overview",
                    },
                    {
                      text: "List workspace work item types",
                      link: "/api-reference/v2/workspace-work-item-types/list-workspace-work-item-types",
                    },
                    {
                      text: "Get a workspace work item type",
                      link: "/api-reference/v2/workspace-work-item-types/get-workspace-work-item-type",
                    },
                    {
                      text: "Create a workspace work item type",
                      link: "/api-reference/v2/workspace-work-item-types/create-workspace-work-item-type",
                    },
                    {
                      text: "Update a workspace work item type",
                      link: "/api-reference/v2/workspace-work-item-types/update-workspace-work-item-type",
                    },
                    {
                      text: "Delete a workspace work item type",
                      link: "/api-reference/v2/workspace-work-item-types/delete-workspace-work-item-type",
                    },
                    {
                      text: "Mark a workspace work item type as default",
                      link: "/api-reference/v2/workspace-work-item-types/mark-default-workspace-work-item-type",
                    },
                  ],
                },
                {
                  text: "Properties",
                  collapsed: true,
                  items: [
                    {
                      text: "Overview",
                      link: "/api-reference/v2/workspace-work-item-properties/overview",
                    },
                    {
                      text: "List workspace work item properties",
                      link: "/api-reference/v2/workspace-work-item-properties/list-workspace-work-item-properties",
                    },
                    {
                      text: "Get a workspace work item property",
                      link: "/api-reference/v2/workspace-work-item-properties/get-workspace-work-item-property",
                    },
                    {
                      text: "Create a workspace work item property",
                      link: "/api-reference/v2/workspace-work-item-properties/create-workspace-work-item-property",
                    },
                    {
                      text: "Update a workspace work item property",
                      link: "/api-reference/v2/workspace-work-item-properties/update-workspace-work-item-property",
                    },
                    {
                      text: "Delete a workspace work item property",
                      link: "/api-reference/v2/workspace-work-item-properties/delete-workspace-work-item-property",
                    },
                  ],
                },
                {
                  text: "Property Options",
                  collapsed: true,
                  items: [
                    {
                      text: "Overview",
                      link: "/api-reference/v2/workspace-work-item-property-options/overview",
                    },
                    {
                      text: "List workspace property options",
                      link: "/api-reference/v2/workspace-work-item-property-options/list-workspace-property-options",
                    },
                    {
                      text: "Get a workspace property option",
                      link: "/api-reference/v2/workspace-work-item-property-options/get-workspace-property-option",
                    },
                    {
                      text: "Create a workspace property option",
                      link: "/api-reference/v2/workspace-work-item-property-options/create-workspace-property-option",
                    },
                    {
                      text: "Update a workspace property option",
                      link: "/api-reference/v2/workspace-work-item-property-options/update-workspace-property-option",
                    },
                    {
                      text: "Delete a workspace property option",
                      link: "/api-reference/v2/workspace-work-item-property-options/delete-workspace-property-option",
                    },
                  ],
                },
                {
                  text: "Type Properties",
                  collapsed: true,
                  items: [
                    {
                      text: "Overview",
                      link: "/api-reference/v2/workspace-work-item-type-properties/overview",
                    },
                    {
                      text: "List properties on a workspace type",
                      link: "/api-reference/v2/workspace-work-item-type-properties/list-workspace-type-properties",
                    },
                    {
                      text: "Get a property on a workspace type",
                      link: "/api-reference/v2/workspace-work-item-type-properties/get-workspace-type-property",
                    },
                    {
                      text: "Attach properties to a workspace type",
                      link: "/api-reference/v2/workspace-work-item-type-properties/attach-workspace-type-property",
                    },
                    {
                      text: "Detach a property from a workspace type",
                      link: "/api-reference/v2/workspace-work-item-type-properties/detach-workspace-type-property",
                    },
                  ],
                },
                {
                  text: "Property Contexts",
                  collapsed: true,
                  items: [
                    {
                      text: "Overview",
                      link: "/api-reference/v2/work-item-property-contexts/overview",
                    },
                    {
                      text: "List property contexts",
                      link: "/api-reference/v2/work-item-property-contexts/list-property-contexts",
                    },
                    {
                      text: "Get a property context",
                      link: "/api-reference/v2/work-item-property-contexts/get-property-context",
                    },
                    {
                      text: "Create a property context",
                      link: "/api-reference/v2/work-item-property-contexts/create-property-context",
                    },
                    {
                      text: "Update a property context",
                      link: "/api-reference/v2/work-item-property-contexts/update-property-context",
                    },
                    {
                      text: "Delete a property context",
                      link: "/api-reference/v2/work-item-property-contexts/delete-property-context",
                    },
                  ],
                },
              ],
            },
            {
              text: "Projects & Planning",
              items: [
                {
                  text: "Projects",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/projects/overview" },
                    { text: "List projects", link: "/api-reference/v2/projects/list-projects" },
                    { text: "Get a project", link: "/api-reference/v2/projects/get-project" },
                    {
                      text: "Get a project summary",
                      link: "/api-reference/v2/projects/get-project-summary",
                    },
                    { text: "Create a project", link: "/api-reference/v2/projects/create-project" },
                    { text: "Update a project", link: "/api-reference/v2/projects/update-project" },
                    { text: "Delete a project", link: "/api-reference/v2/projects/delete-project" },
                    { text: "Upsert a project", link: "/api-reference/v2/projects/upsert-project" },
                    {
                      text: "Bulk create projects",
                      link: "/api-reference/v2/projects/bulk-create-projects",
                    },
                    {
                      text: "Bulk update projects",
                      link: "/api-reference/v2/projects/bulk-update-projects",
                    },
                    {
                      text: "Archive a project",
                      link: "/api-reference/v2/projects/archive-project",
                    },
                    {
                      text: "Unarchive a project",
                      link: "/api-reference/v2/projects/unarchive-project",
                    },
                  ],
                },
                {
                  text: "Project Features",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/project-features/overview" },
                    {
                      text: "Get project features",
                      link: "/api-reference/v2/project-features/get-project-features",
                    },
                    {
                      text: "Update project features",
                      link: "/api-reference/v2/project-features/update-project-features",
                    },
                  ],
                },
                {
                  text: "Views (Project)",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/project-views/overview" },
                    {
                      text: "List project views",
                      link: "/api-reference/v2/project-views/list-project-views",
                    },
                    {
                      text: "Get a project view",
                      link: "/api-reference/v2/project-views/get-project-view",
                    },
                    {
                      text: "Create a project view",
                      link: "/api-reference/v2/project-views/create-project-view",
                    },
                    {
                      text: "Update a project view",
                      link: "/api-reference/v2/project-views/update-project-view",
                    },
                    {
                      text: "Delete a project view",
                      link: "/api-reference/v2/project-views/delete-project-view",
                    },
                  ],
                },
                {
                  text: "Views (Workspace)",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/workspace-views/overview" },
                    {
                      text: "List workspace views",
                      link: "/api-reference/v2/workspace-views/list-workspace-views",
                    },
                    {
                      text: "Get a workspace view",
                      link: "/api-reference/v2/workspace-views/get-workspace-view",
                    },
                    {
                      text: "Create a workspace view",
                      link: "/api-reference/v2/workspace-views/create-workspace-view",
                    },
                    {
                      text: "Update a workspace view",
                      link: "/api-reference/v2/workspace-views/update-workspace-view",
                    },
                    {
                      text: "Delete a workspace view",
                      link: "/api-reference/v2/workspace-views/delete-workspace-view",
                    },
                  ],
                },
                {
                  text: "Estimates",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/estimates/overview" },
                    { text: "List estimates", link: "/api-reference/v2/estimates/list-estimates" },
                    { text: "Get a estimate", link: "/api-reference/v2/estimates/get-estimate" },
                    {
                      text: "Create a estimate",
                      link: "/api-reference/v2/estimates/create-estimate",
                    },
                    {
                      text: "Update a estimate",
                      link: "/api-reference/v2/estimates/update-estimate",
                    },
                    {
                      text: "Delete a estimate",
                      link: "/api-reference/v2/estimates/delete-estimate",
                    },
                    {
                      text: "Upsert a estimate",
                      link: "/api-reference/v2/estimates/upsert-estimate",
                    },
                    {
                      text: "Bulk create estimates",
                      link: "/api-reference/v2/estimates/bulk-create-estimates",
                    },
                    {
                      text: "Bulk update estimates",
                      link: "/api-reference/v2/estimates/bulk-update-estimates",
                    },
                    {
                      text: "Bulk delete estimates",
                      link: "/api-reference/v2/estimates/bulk-delete-estimates",
                    },
                  ],
                },
                {
                  text: "Estimate Points",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/estimate-points/overview" },
                    {
                      text: "List estimate points",
                      link: "/api-reference/v2/estimate-points/list-estimate-points",
                    },
                    {
                      text: "Get a estimate point",
                      link: "/api-reference/v2/estimate-points/get-estimate-point",
                    },
                    {
                      text: "Create a estimate point",
                      link: "/api-reference/v2/estimate-points/create-estimate-point",
                    },
                    {
                      text: "Update a estimate point",
                      link: "/api-reference/v2/estimate-points/update-estimate-point",
                    },
                    {
                      text: "Delete a estimate point",
                      link: "/api-reference/v2/estimate-points/delete-estimate-point",
                    },
                    {
                      text: "Upsert a estimate point",
                      link: "/api-reference/v2/estimate-points/upsert-estimate-point",
                    },
                    {
                      text: "Bulk create estimate points",
                      link: "/api-reference/v2/estimate-points/bulk-create-estimate-points",
                    },
                    {
                      text: "Bulk update estimate points",
                      link: "/api-reference/v2/estimate-points/bulk-update-estimate-points",
                    },
                    {
                      text: "Bulk delete estimate points",
                      link: "/api-reference/v2/estimate-points/bulk-delete-estimate-points",
                    },
                  ],
                },
                {
                  text: "Initiatives",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/initiatives/overview" },
                    {
                      text: "List initiatives",
                      link: "/api-reference/v2/initiatives/list-initiatives",
                    },
                    {
                      text: "Get a initiative",
                      link: "/api-reference/v2/initiatives/get-initiative",
                    },
                    {
                      text: "Create a initiative",
                      link: "/api-reference/v2/initiatives/create-initiative",
                    },
                    {
                      text: "Update a initiative",
                      link: "/api-reference/v2/initiatives/update-initiative",
                    },
                    {
                      text: "Delete a initiative",
                      link: "/api-reference/v2/initiatives/delete-initiative",
                    },
                    {
                      text: "Add or remove initiative labels",
                      link: "/api-reference/v2/initiatives/manage-initiative-labels",
                    },
                    {
                      text: "Add or remove initiative projects",
                      link: "/api-reference/v2/initiatives/manage-initiative-projects",
                    },
                    {
                      text: "Add or remove initiative work items",
                      link: "/api-reference/v2/initiatives/manage-initiative-work-items",
                    },
                  ],
                },
                {
                  text: "Initiative Labels",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/initiative-labels/overview" },
                    {
                      text: "List initiative labels",
                      link: "/api-reference/v2/initiative-labels/list-initiative-labels",
                    },
                    {
                      text: "Get a initiative label",
                      link: "/api-reference/v2/initiative-labels/get-initiative-label",
                    },
                    {
                      text: "Create a initiative label",
                      link: "/api-reference/v2/initiative-labels/create-initiative-label",
                    },
                    {
                      text: "Update a initiative label",
                      link: "/api-reference/v2/initiative-labels/update-initiative-label",
                    },
                    {
                      text: "Delete a initiative label",
                      link: "/api-reference/v2/initiative-labels/delete-initiative-label",
                    },
                  ],
                },
                {
                  text: "Teamspaces",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/teamspaces/overview" },
                    {
                      text: "List teamspaces",
                      link: "/api-reference/v2/teamspaces/list-teamspaces",
                    },
                    { text: "Get a teamspace", link: "/api-reference/v2/teamspaces/get-teamspace" },
                    {
                      text: "Create a teamspace",
                      link: "/api-reference/v2/teamspaces/create-teamspace",
                    },
                    {
                      text: "Update a teamspace",
                      link: "/api-reference/v2/teamspaces/update-teamspace",
                    },
                    {
                      text: "Delete a teamspace",
                      link: "/api-reference/v2/teamspaces/delete-teamspace",
                    },
                  ],
                },
                {
                  text: "Templates (Project)",
                  collapsed: true,
                  items: [
                    {
                      text: "Overview",
                      link: "/api-reference/v2/project-work-item-templates/overview",
                    },
                    {
                      text: "List project work item templates",
                      link: "/api-reference/v2/project-work-item-templates/list-project-work-item-templates",
                    },
                    {
                      text: "Get a project work item template",
                      link: "/api-reference/v2/project-work-item-templates/get-project-work-item-template",
                    },
                    {
                      text: "Create a project work item template",
                      link: "/api-reference/v2/project-work-item-templates/create-project-work-item-template",
                    },
                    {
                      text: "Update a project work item template",
                      link: "/api-reference/v2/project-work-item-templates/update-project-work-item-template",
                    },
                    {
                      text: "Delete a project work item template",
                      link: "/api-reference/v2/project-work-item-templates/delete-project-work-item-template",
                    },
                    {
                      text: "Create a work item from a template",
                      link: "/api-reference/v2/project-work-item-templates/use-work-item-template",
                    },
                  ],
                },
                {
                  text: "Templates (Workspace)",
                  collapsed: true,
                  items: [
                    {
                      text: "Overview",
                      link: "/api-reference/v2/workspace-work-item-templates/overview",
                    },
                    {
                      text: "List workspace work item templates",
                      link: "/api-reference/v2/workspace-work-item-templates/list-workspace-work-item-templates",
                    },
                    {
                      text: "Get a workspace work item template",
                      link: "/api-reference/v2/workspace-work-item-templates/get-workspace-work-item-template",
                    },
                    {
                      text: "Create a workspace work item template",
                      link: "/api-reference/v2/workspace-work-item-templates/create-workspace-work-item-template",
                    },
                    {
                      text: "Update a workspace work item template",
                      link: "/api-reference/v2/workspace-work-item-templates/update-workspace-work-item-template",
                    },
                    {
                      text: "Delete a workspace work item template",
                      link: "/api-reference/v2/workspace-work-item-templates/delete-workspace-work-item-template",
                    },
                  ],
                },
              ],
            },
            {
              text: "Wiki & Notes",
              items: [
                {
                  text: "Collections",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/collections/overview" },
                    {
                      text: "List collection members",
                      link: "/api-reference/v2/collections/list-collection-members",
                    },
                    {
                      text: "List collections",
                      link: "/api-reference/v2/collections/list-collections",
                    },
                    {
                      text: "Get a collection",
                      link: "/api-reference/v2/collections/get-collection",
                    },
                    {
                      text: "Create a collection",
                      link: "/api-reference/v2/collections/create-collection",
                    },
                    {
                      text: "Update a collection",
                      link: "/api-reference/v2/collections/update-collection",
                    },
                    {
                      text: "Delete a collection",
                      link: "/api-reference/v2/collections/delete-collection",
                    },
                    {
                      text: "Add or remove collection members",
                      link: "/api-reference/v2/collections/manage-collection-members",
                    },
                    {
                      text: "Add or remove pages in a collection",
                      link: "/api-reference/v2/collections/manage-collection-pages",
                    },
                    {
                      text: "Search pages for a collection",
                      link: "/api-reference/v2/collections/search-collection-pages",
                    },
                  ],
                },
                {
                  text: "Pages (Project)",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/project-pages/overview" },
                    {
                      text: "List project pages",
                      link: "/api-reference/v2/project-pages/list-project-pages",
                    },
                    {
                      text: "Get a project page",
                      link: "/api-reference/v2/project-pages/get-project-page",
                    },
                    {
                      text: "Create a project page",
                      link: "/api-reference/v2/project-pages/create-project-page",
                    },
                    {
                      text: "Update a project page",
                      link: "/api-reference/v2/project-pages/update-project-page",
                    },
                    {
                      text: "Delete a project page",
                      link: "/api-reference/v2/project-pages/delete-project-page",
                    },
                  ],
                },
                {
                  text: "Pages (Workspace)",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/workspace-pages/overview" },
                    {
                      text: "List workspace pages",
                      link: "/api-reference/v2/workspace-pages/list-workspace-pages",
                    },
                    {
                      text: "Get a workspace page",
                      link: "/api-reference/v2/workspace-pages/get-workspace-page",
                    },
                    {
                      text: "Create a workspace page",
                      link: "/api-reference/v2/workspace-pages/create-workspace-page",
                    },
                    {
                      text: "Update a workspace page",
                      link: "/api-reference/v2/workspace-pages/update-workspace-page",
                    },
                    {
                      text: "Delete a workspace page",
                      link: "/api-reference/v2/workspace-pages/delete-workspace-page",
                    },
                  ],
                },
                {
                  text: "Stickies",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/stickies/overview" },
                    { text: "List stickies", link: "/api-reference/v2/stickies/list-stickies" },
                    { text: "Get a sticky", link: "/api-reference/v2/stickies/get-sticky" },
                    { text: "Create a sticky", link: "/api-reference/v2/stickies/create-sticky" },
                    { text: "Update a sticky", link: "/api-reference/v2/stickies/update-sticky" },
                    { text: "Delete a sticky", link: "/api-reference/v2/stickies/delete-sticky" },
                  ],
                },
              ],
            },
            {
              text: "Customers",
              items: [
                {
                  text: "Customers",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/customers/overview" },
                    { text: "List customers", link: "/api-reference/v2/customers/list-customers" },
                    { text: "Get a customer", link: "/api-reference/v2/customers/get-customer" },
                    {
                      text: "Create a customer",
                      link: "/api-reference/v2/customers/create-customer",
                    },
                    {
                      text: "Update a customer",
                      link: "/api-reference/v2/customers/update-customer",
                    },
                    {
                      text: "Delete a customer",
                      link: "/api-reference/v2/customers/delete-customer",
                    },
                    {
                      text: "Upsert a customer",
                      link: "/api-reference/v2/customers/upsert-customer",
                    },
                    {
                      text: "Link or unlink customer work items",
                      link: "/api-reference/v2/customers/manage-customer-work-items",
                    },
                  ],
                },
                {
                  text: "Customer Requests",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/customer-requests/overview" },
                    {
                      text: "List customer requests",
                      link: "/api-reference/v2/customer-requests/list-customer-requests",
                    },
                    {
                      text: "Get a customer request",
                      link: "/api-reference/v2/customer-requests/get-customer-request",
                    },
                    {
                      text: "Create a customer request",
                      link: "/api-reference/v2/customer-requests/create-customer-request",
                    },
                    {
                      text: "Update a customer request",
                      link: "/api-reference/v2/customer-requests/update-customer-request",
                    },
                    {
                      text: "Delete a customer request",
                      link: "/api-reference/v2/customer-requests/delete-customer-request",
                    },
                  ],
                },
                {
                  text: "Customer Properties",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/customer-properties/overview" },
                    {
                      text: "List customer properties",
                      link: "/api-reference/v2/customer-properties/list-customer-properties",
                    },
                    {
                      text: "Get a customer property",
                      link: "/api-reference/v2/customer-properties/get-customer-property",
                    },
                    {
                      text: "Create a customer property",
                      link: "/api-reference/v2/customer-properties/create-customer-property",
                    },
                    {
                      text: "Update a customer property",
                      link: "/api-reference/v2/customer-properties/update-customer-property",
                    },
                    {
                      text: "Delete a customer property",
                      link: "/api-reference/v2/customer-properties/delete-customer-property",
                    },
                  ],
                },
                {
                  text: "Customer Property Values",
                  collapsed: true,
                  items: [
                    {
                      text: "Overview",
                      link: "/api-reference/v2/customer-property-values/overview",
                    },
                    {
                      text: "List customer property values",
                      link: "/api-reference/v2/customer-property-values/list-customer-property-values",
                    },
                    {
                      text: "Set customer property values",
                      link: "/api-reference/v2/customer-property-values/set-customer-property-values",
                    },
                  ],
                },
              ],
            },
            {
              text: "Releases",
              items: [
                {
                  text: "Releases",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/releases/overview" },
                    { text: "List releases", link: "/api-reference/v2/releases/list-releases" },
                    { text: "Get a release", link: "/api-reference/v2/releases/get-release" },
                    {
                      text: "Get a release changelog",
                      link: "/api-reference/v2/releases/get-release-changelog",
                    },
                    { text: "Create a release", link: "/api-reference/v2/releases/create-release" },
                    { text: "Update a release", link: "/api-reference/v2/releases/update-release" },
                    {
                      text: "Update a release changelog",
                      link: "/api-reference/v2/releases/update-release-changelog",
                    },
                    { text: "Delete a release", link: "/api-reference/v2/releases/delete-release" },
                    {
                      text: "Add or remove release labels",
                      link: "/api-reference/v2/releases/manage-release-labels",
                    },
                    {
                      text: "Add or remove release work items",
                      link: "/api-reference/v2/releases/manage-release-work-items",
                    },
                  ],
                },
                {
                  text: "Release Tags",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/release-tags/overview" },
                    {
                      text: "List release tags",
                      link: "/api-reference/v2/release-tags/list-release-tags",
                    },
                    {
                      text: "Get a release tag",
                      link: "/api-reference/v2/release-tags/get-release-tag",
                    },
                    {
                      text: "Create a release tag",
                      link: "/api-reference/v2/release-tags/create-release-tag",
                    },
                    {
                      text: "Update a release tag",
                      link: "/api-reference/v2/release-tags/update-release-tag",
                    },
                    {
                      text: "Delete a release tag",
                      link: "/api-reference/v2/release-tags/delete-release-tag",
                    },
                  ],
                },
                {
                  text: "Release Labels",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/release-labels/overview" },
                    {
                      text: "List release labels",
                      link: "/api-reference/v2/release-labels/list-release-labels",
                    },
                    {
                      text: "Get a release label",
                      link: "/api-reference/v2/release-labels/get-release-label",
                    },
                    {
                      text: "Create a release label",
                      link: "/api-reference/v2/release-labels/create-release-label",
                    },
                    {
                      text: "Update a release label",
                      link: "/api-reference/v2/release-labels/update-release-label",
                    },
                    {
                      text: "Delete a release label",
                      link: "/api-reference/v2/release-labels/delete-release-label",
                    },
                  ],
                },
                {
                  text: "Release Comments",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/release-comments/overview" },
                    {
                      text: "List release comments",
                      link: "/api-reference/v2/release-comments/list-release-comments",
                    },
                    {
                      text: "Get a release comment",
                      link: "/api-reference/v2/release-comments/get-release-comment",
                    },
                    {
                      text: "Create a release comment",
                      link: "/api-reference/v2/release-comments/create-release-comment",
                    },
                    {
                      text: "Update a release comment",
                      link: "/api-reference/v2/release-comments/update-release-comment",
                    },
                    {
                      text: "Delete a release comment",
                      link: "/api-reference/v2/release-comments/delete-release-comment",
                    },
                  ],
                },
                {
                  text: "Release Links",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/release-links/overview" },
                    {
                      text: "List release links",
                      link: "/api-reference/v2/release-links/list-release-links",
                    },
                    {
                      text: "Get a release link",
                      link: "/api-reference/v2/release-links/get-release-link",
                    },
                    {
                      text: "Create a release link",
                      link: "/api-reference/v2/release-links/create-release-link",
                    },
                    {
                      text: "Update a release link",
                      link: "/api-reference/v2/release-links/update-release-link",
                    },
                    {
                      text: "Delete a release link",
                      link: "/api-reference/v2/release-links/delete-release-link",
                    },
                  ],
                },
              ],
            },
            {
              text: "Automation & Workflows",
              items: [
                {
                  text: "Automations (Project)",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/project-automations/overview" },
                    {
                      text: "List automation activities",
                      link: "/api-reference/v2/project-automations/list-automation-activities",
                    },
                    {
                      text: "List automation edges",
                      link: "/api-reference/v2/project-automations/list-automation-edges",
                    },
                    {
                      text: "List automation nodes",
                      link: "/api-reference/v2/project-automations/list-automation-nodes",
                    },
                    {
                      text: "List project automations",
                      link: "/api-reference/v2/project-automations/list-project-automations",
                    },
                    {
                      text: "Get a automation activity",
                      link: "/api-reference/v2/project-automations/get-automation-activity",
                    },
                    {
                      text: "Get a automation edge",
                      link: "/api-reference/v2/project-automations/get-automation-edge",
                    },
                    {
                      text: "Get a automation node",
                      link: "/api-reference/v2/project-automations/get-automation-node",
                    },
                    {
                      text: "Get a project automation",
                      link: "/api-reference/v2/project-automations/get-project-automation",
                    },
                    {
                      text: "Create a automation edge",
                      link: "/api-reference/v2/project-automations/create-automation-edge",
                    },
                    {
                      text: "Create a automation node",
                      link: "/api-reference/v2/project-automations/create-automation-node",
                    },
                    {
                      text: "Create a project automation",
                      link: "/api-reference/v2/project-automations/create-project-automation",
                    },
                    {
                      text: "Update a automation edge",
                      link: "/api-reference/v2/project-automations/update-automation-edge",
                    },
                    {
                      text: "Update a automation node",
                      link: "/api-reference/v2/project-automations/update-automation-node",
                    },
                    {
                      text: "Update a project automation",
                      link: "/api-reference/v2/project-automations/update-project-automation",
                    },
                    {
                      text: "Delete a automation edge",
                      link: "/api-reference/v2/project-automations/delete-automation-edge",
                    },
                    {
                      text: "Delete a automation node",
                      link: "/api-reference/v2/project-automations/delete-automation-node",
                    },
                    {
                      text: "Delete a project automation",
                      link: "/api-reference/v2/project-automations/delete-project-automation",
                    },
                    {
                      text: "Regenerate an automation node webhook secret",
                      link: "/api-reference/v2/project-automations/regenerate-node-webhook-secret",
                    },
                    {
                      text: "Enable or disable a project automation",
                      link: "/api-reference/v2/project-automations/set-project-automation-status",
                    },
                  ],
                },
                {
                  text: "Automations (Workspace)",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/workspace-automations/overview" },
                    {
                      text: "List automation activities",
                      link: "/api-reference/v2/workspace-automations/list-automation-activities",
                    },
                    {
                      text: "List automation edges",
                      link: "/api-reference/v2/workspace-automations/list-automation-edges",
                    },
                    {
                      text: "List automation nodes",
                      link: "/api-reference/v2/workspace-automations/list-automation-nodes",
                    },
                    {
                      text: "List workspace automations",
                      link: "/api-reference/v2/workspace-automations/list-workspace-automations",
                    },
                    {
                      text: "Get a automation activity",
                      link: "/api-reference/v2/workspace-automations/get-automation-activity",
                    },
                    {
                      text: "Get a automation edge",
                      link: "/api-reference/v2/workspace-automations/get-automation-edge",
                    },
                    {
                      text: "Get a automation node",
                      link: "/api-reference/v2/workspace-automations/get-automation-node",
                    },
                    {
                      text: "Get a workspace automation",
                      link: "/api-reference/v2/workspace-automations/get-workspace-automation",
                    },
                    {
                      text: "Create a automation edge",
                      link: "/api-reference/v2/workspace-automations/create-automation-edge",
                    },
                    {
                      text: "Create a automation node",
                      link: "/api-reference/v2/workspace-automations/create-automation-node",
                    },
                    {
                      text: "Create a workspace automation",
                      link: "/api-reference/v2/workspace-automations/create-workspace-automation",
                    },
                    {
                      text: "Update a automation edge",
                      link: "/api-reference/v2/workspace-automations/update-automation-edge",
                    },
                    {
                      text: "Update a automation node",
                      link: "/api-reference/v2/workspace-automations/update-automation-node",
                    },
                    {
                      text: "Update a workspace automation",
                      link: "/api-reference/v2/workspace-automations/update-workspace-automation",
                    },
                    {
                      text: "Delete a automation edge",
                      link: "/api-reference/v2/workspace-automations/delete-automation-edge",
                    },
                    {
                      text: "Delete a automation node",
                      link: "/api-reference/v2/workspace-automations/delete-automation-node",
                    },
                    {
                      text: "Delete a workspace automation",
                      link: "/api-reference/v2/workspace-automations/delete-workspace-automation",
                    },
                    {
                      text: "Regenerate an automation node webhook secret",
                      link: "/api-reference/v2/workspace-automations/regenerate-node-webhook-secret",
                    },
                    {
                      text: "Enable or disable a workspace automation",
                      link: "/api-reference/v2/workspace-automations/set-workspace-automation-status",
                    },
                  ],
                },
                {
                  text: "Workflows",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/workflows/overview" },
                    { text: "List workflows", link: "/api-reference/v2/workflows/list-workflows" },
                    { text: "Get a workflow", link: "/api-reference/v2/workflows/get-workflow" },
                    {
                      text: "Create a workflow",
                      link: "/api-reference/v2/workflows/create-workflow",
                    },
                    {
                      text: "Update a workflow",
                      link: "/api-reference/v2/workflows/update-workflow",
                    },
                    {
                      text: "Delete a workflow",
                      link: "/api-reference/v2/workflows/delete-workflow",
                    },
                  ],
                },
                {
                  text: "Workflow States",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/workflow-states/overview" },
                    {
                      text: "List workflow states",
                      link: "/api-reference/v2/workflow-states/list-workflow-states",
                    },
                    {
                      text: "Get a workflow state",
                      link: "/api-reference/v2/workflow-states/get-workflow-state",
                    },
                    {
                      text: "Create a workflow state",
                      link: "/api-reference/v2/workflow-states/create-workflow-state",
                    },
                    {
                      text: "Update a workflow state",
                      link: "/api-reference/v2/workflow-states/update-workflow-state",
                    },
                    {
                      text: "Delete a workflow state",
                      link: "/api-reference/v2/workflow-states/delete-workflow-state",
                    },
                  ],
                },
                {
                  text: "Workflow Transitions",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/workflow-transitions/overview" },
                    {
                      text: "List workflow transitions",
                      link: "/api-reference/v2/workflow-transitions/list-workflow-transitions",
                    },
                    {
                      text: "Get a workflow transition",
                      link: "/api-reference/v2/workflow-transitions/get-workflow-transition",
                    },
                    {
                      text: "Create a workflow transition",
                      link: "/api-reference/v2/workflow-transitions/create-workflow-transition",
                    },
                    {
                      text: "Update a workflow transition",
                      link: "/api-reference/v2/workflow-transitions/update-workflow-transition",
                    },
                    {
                      text: "Delete a workflow transition",
                      link: "/api-reference/v2/workflow-transitions/delete-workflow-transition",
                    },
                  ],
                },
              ],
            },
            {
              text: "Workspace & Admin",
              items: [
                {
                  text: "Members",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/members/overview" },
                    {
                      text: "List project members",
                      link: "/api-reference/v2/members/list-project-members",
                    },
                    {
                      text: "List workspace members",
                      link: "/api-reference/v2/members/list-workspace-members",
                    },
                    {
                      text: "Get a project member",
                      link: "/api-reference/v2/members/get-project-member",
                    },
                    {
                      text: "Get project role distribution",
                      link: "/api-reference/v2/members/get-project-role-distribution",
                    },
                    {
                      text: "Create a project member",
                      link: "/api-reference/v2/members/create-project-member",
                    },
                    {
                      text: "Update a project member",
                      link: "/api-reference/v2/members/update-project-member",
                    },
                    {
                      text: "Delete a project member",
                      link: "/api-reference/v2/members/delete-project-member",
                    },
                    {
                      text: "Remove a workspace member",
                      link: "/api-reference/v2/members/remove-workspace-member",
                    },
                  ],
                },
                {
                  text: "Invitations",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/invitations/overview" },
                    {
                      text: "List invitations",
                      link: "/api-reference/v2/invitations/list-invitations",
                    },
                    {
                      text: "Get a invitation",
                      link: "/api-reference/v2/invitations/get-invitation",
                    },
                    {
                      text: "Create a invitation",
                      link: "/api-reference/v2/invitations/create-invitation",
                    },
                    {
                      text: "Delete a invitation",
                      link: "/api-reference/v2/invitations/delete-invitation",
                    },
                    {
                      text: "Bulk invite members",
                      link: "/api-reference/v2/invitations/bulk-invitations",
                    },
                  ],
                },
                {
                  text: "Roles",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/roles/overview" },
                    { text: "List roles", link: "/api-reference/v2/roles/list-roles" },
                    { text: "Get a role", link: "/api-reference/v2/roles/get-role" },
                  ],
                },
                {
                  text: "Permissions",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/permissions/overview" },
                    {
                      text: "Get your effective project permissions",
                      link: "/api-reference/v2/permissions/get-project-permissions",
                    },
                    {
                      text: "Get your effective workspace permissions",
                      link: "/api-reference/v2/permissions/get-workspace-permissions",
                    },
                  ],
                },
                {
                  text: "Permission Schemes",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/permission-schemes/overview" },
                    {
                      text: "List permission schemes",
                      link: "/api-reference/v2/permission-schemes/list-permission-schemes",
                    },
                    {
                      text: "Get a permission scheme",
                      link: "/api-reference/v2/permission-schemes/get-permission-scheme",
                    },
                  ],
                },
                {
                  text: "Workspace Features",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/workspace-features/overview" },
                    {
                      text: "Get workspace features",
                      link: "/api-reference/v2/workspace-features/get-workspace-features",
                    },
                    {
                      text: "Update workspace features",
                      link: "/api-reference/v2/workspace-features/update-workspace-features",
                    },
                  ],
                },
                {
                  text: "Audit Logs",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/audit-logs/overview" },
                    {
                      text: "List audit logs",
                      link: "/api-reference/v2/audit-logs/list-audit-logs",
                    },
                    {
                      text: "Get an audit log",
                      link: "/api-reference/v2/audit-logs/get-audit-log",
                    },
                  ],
                },
                {
                  text: "Group Sync",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/group-sync/overview" },
                    {
                      text: "List project mappings",
                      link: "/api-reference/v2/group-sync/list-project-mappings",
                    },
                    {
                      text: "List workspace mappings",
                      link: "/api-reference/v2/group-sync/list-workspace-mappings",
                    },
                    {
                      text: "Get the group sync configuration",
                      link: "/api-reference/v2/group-sync/get-group-sync-config",
                    },
                    {
                      text: "Get a project mapping",
                      link: "/api-reference/v2/group-sync/get-project-mapping",
                    },
                    {
                      text: "Get a workspace mapping",
                      link: "/api-reference/v2/group-sync/get-workspace-mapping",
                    },
                    {
                      text: "Create a project mapping",
                      link: "/api-reference/v2/group-sync/create-project-mapping",
                    },
                    {
                      text: "Create a workspace mapping",
                      link: "/api-reference/v2/group-sync/create-workspace-mapping",
                    },
                    {
                      text: "Update the group sync configuration",
                      link: "/api-reference/v2/group-sync/update-group-sync-config",
                    },
                    {
                      text: "Update a project mapping",
                      link: "/api-reference/v2/group-sync/update-project-mapping",
                    },
                    {
                      text: "Update a workspace mapping",
                      link: "/api-reference/v2/group-sync/update-workspace-mapping",
                    },
                    {
                      text: "Delete a project mapping",
                      link: "/api-reference/v2/group-sync/delete-project-mapping",
                    },
                    {
                      text: "Delete a workspace mapping",
                      link: "/api-reference/v2/group-sync/delete-workspace-mapping",
                    },
                  ],
                },
                {
                  text: "Webhooks",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/webhooks/overview" },
                    { text: "List webhooks", link: "/api-reference/v2/webhooks/list-webhooks" },
                    { text: "Get a webhook", link: "/api-reference/v2/webhooks/get-webhook" },
                    { text: "Create a webhook", link: "/api-reference/v2/webhooks/create-webhook" },
                    { text: "Update a webhook", link: "/api-reference/v2/webhooks/update-webhook" },
                    { text: "Delete a webhook", link: "/api-reference/v2/webhooks/delete-webhook" },
                    {
                      text: "Regenerate a webhook secret",
                      link: "/api-reference/v2/webhooks/regenerate-webhook-secret",
                    },
                  ],
                },
                {
                  text: "Webhook Logs",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/webhook-logs/overview" },
                    {
                      text: "List webhook logs",
                      link: "/api-reference/v2/webhook-logs/list-webhook-logs",
                    },
                    {
                      text: "Get a webhook log",
                      link: "/api-reference/v2/webhook-logs/get-webhook-log",
                    },
                  ],
                },
                {
                  text: "Workspace Assets",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/workspace-assets/overview" },
                    {
                      text: "List workspace assets",
                      link: "/api-reference/v2/workspace-assets/list-workspace-assets",
                    },
                    { text: "Get a asset", link: "/api-reference/v2/workspace-assets/get-asset" },
                    {
                      text: "Create a workspace asset upload",
                      link: "/api-reference/v2/workspace-assets/create-workspace-asset",
                    },
                    {
                      text: "Delete a asset",
                      link: "/api-reference/v2/workspace-assets/delete-asset",
                    },
                    {
                      text: "Confirm a workspace asset upload",
                      link: "/api-reference/v2/workspace-assets/confirm-workspace-asset",
                    },
                  ],
                },
                {
                  text: "User Assets",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/user-assets/overview" },
                    {
                      text: "List user assets",
                      link: "/api-reference/v2/user-assets/list-user-assets",
                    },
                    {
                      text: "Get a user asset",
                      link: "/api-reference/v2/user-assets/get-user-asset",
                    },
                    {
                      text: "Create a user asset upload",
                      link: "/api-reference/v2/user-assets/create-user-asset",
                    },
                    {
                      text: "Delete a user asset",
                      link: "/api-reference/v2/user-assets/delete-user-asset",
                    },
                    {
                      text: "Confirm a user asset upload",
                      link: "/api-reference/v2/user-assets/confirm-user-asset",
                    },
                  ],
                },
                {
                  text: "Users",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/users/overview" },
                    { text: "Get current user", link: "/api-reference/v2/users/get-current-user" },
                  ],
                },
                {
                  text: "Artifacts",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/v2/artifacts/overview" },
                    { text: "Get an artifact", link: "/api-reference/v2/artifacts/get-artifact" },
                    {
                      text: "Create an artifact",
                      link: "/api-reference/v2/artifacts/create-artifact",
                    },
                    {
                      text: "Append a new version",
                      link: "/api-reference/v2/artifacts/update-artifact",
                    },
                    {
                      text: "Publish an artifact",
                      link: "/api-reference/v2/artifacts/publish-artifact",
                    },
                  ],
                },
              ],
            },
          ],

          "/dev-tools/": [
            {
              text: "Build on and extend Plane",
              items: [
                {
                  text: "Agents",
                  link: "/dev-tools/agents/overview",
                  collapsed: false,
                  items: [
                    { text: "Building an agent", link: "/dev-tools/agents/building-an-agent" },
                    { text: "Best practices", link: "/dev-tools/agents/best-practices" },
                    {
                      text: "Signals and content payload",
                      link: "/dev-tools/agents/signals-content-payload",
                    },
                  ],
                },
                {
                  text: "Build Plane App",
                  link: "/dev-tools/build-plane-app/overview",
                  collapsed: false,
                  items: [
                    {
                      text: "Create an OAuth application",
                      link: "/dev-tools/build-plane-app/create-oauth-application",
                    },
                    {
                      text: "Choose token Flow",
                      link: "/dev-tools/build-plane-app/choose-token-flow",
                    },
                    { text: "Handling webhooks", link: "/dev-tools/build-plane-app/webhooks" },
                    { text: "OAuth scopes", link: "/dev-tools/build-plane-app/oauth-scopes" },
                    { text: "SDKs", link: "/dev-tools/build-plane-app/sdks" },
                    { text: "Complete examples", link: "/dev-tools/build-plane-app/examples" },
                  ],
                },

                {
                  text: "MCP server",
                  link: "/dev-tools/mcp-server",
                  collapsed: false,
                  items: [
                    { text: "Self-host the MCP server", link: "/dev-tools/mcp-server-self-host" },
                    { text: "Tool reference", link: "/dev-tools/mcp-server-tools" },
                  ],
                },
                { text: "Plane Compose", link: "/dev-tools/plane-compose" },
                { text: "OpenAPI Specification", link: "/dev-tools/openapi-specification" },
                { text: "Webhooks", link: "/dev-tools/intro-webhooks" },
              ],
            },
          ],
        },

        socialLinks: [
          {
            icon: {
              svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 15L6.92474 18.1137C6.49579 18.548 6.28131 18.7652 6.09695 18.7805C5.93701 18.7938 5.78042 18.7295 5.67596 18.6076C5.55556 18.4672 5.55556 18.162 5.55556 17.5515V15.9916C5.55556 15.444 5.10707 15.0477 4.5652 14.9683V14.9683C3.25374 14.7762 2.22378 13.7463 2.03168 12.4348C2 12.2186 2 11.9605 2 11.4444V6.8C2 5.11984 2 4.27976 2.32698 3.63803C2.6146 3.07354 3.07354 2.6146 3.63803 2.32698C4.27976 2 5.11984 2 6.8 2H14.2C15.8802 2 16.7202 2 17.362 2.32698C17.9265 2.6146 18.3854 3.07354 18.673 3.63803C19 4.27976 19 5.11984 19 6.8V11M19 22L16.8236 20.4869C16.5177 20.2742 16.3647 20.1678 16.1982 20.0924C16.0504 20.0255 15.8951 19.9768 15.7356 19.9474C15.5558 19.9143 15.3695 19.9143 14.9969 19.9143H13.2C12.0799 19.9143 11.5198 19.9143 11.092 19.6963C10.7157 19.5046 10.4097 19.1986 10.218 18.8223C10 18.3944 10 17.8344 10 16.7143V14.2C10 13.0799 10 12.5198 10.218 12.092C10.4097 11.7157 10.7157 11.4097 11.092 11.218C11.5198 11 12.0799 11 13.2 11H18.8C19.9201 11 20.4802 11 20.908 11.218C21.2843 11.4097 21.5903 11.7157 21.782 12.092C22 12.5198 22 13.0799 22 14.2V16.9143C22 17.8462 22 18.3121 21.8478 18.6797C21.6448 19.1697 21.2554 19.5591 20.7654 19.762C20.3978 19.9143 19.9319 19.9143 19 19.9143V22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
            },
            link: "https://forum.plane.so",
          },
          { icon: "github", link: "https://github.com/makeplane/plane" },
          { icon: "twitter", link: "https://twitter.com/planepowers" },
          { icon: "linkedin", link: "https://www.linkedin.com/company/planepowers/" },
        ],

        search: searchConfig,

        editLink: {
          pattern: "https://github.com/makeplane/docs/edit/master/apps/developer-docs/docs/:path",
        },

        /*footer: {
    message: 'Released under the Apache License 2.0.',
    copyright: 'Copyright © 2024 Plane'
    }*/
      },
    }),
  ),
);
