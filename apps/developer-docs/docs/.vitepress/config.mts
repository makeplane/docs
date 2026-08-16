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
        ["meta", { property: "og:image", content: "https://media.docs.plane.so/logo/og-docs.webp#hero" }],
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
        ["meta", { name: "twitter:image", content: "https://media.docs.plane.so/logo/og-docs.webp#hero" }],
      ],

      transformPageData(pageData: PageData) {
        const head = (pageData.frontmatter.head ??= []);

        // Inject canonical URL if not already defined in frontmatter
        const hasCanonical = (head as HeadConfig[]).some(
          ([tag, attrs]) => tag === "link" && attrs?.rel === "canonical"
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
          { text: "API Reference", link: "/api-reference/introduction" },
          { text: "Build and extend", link: "/dev-tools/build-plane-app/overview" },
          { text: "Plane Docs", link: "https://docs.plane.so", noIcon: true, planeButton: "secondary" },
          { text: "Sign in", link: "https://app.plane.so/sign-in", noIcon: true, planeButton: "primary" },
        ],

        sidebar: {
          "/": [
            {
              text: "Developer documentation",
              items: [
                { text: "Home", link: "/" },
                { text: "Self-hosting", link: "/self-hosting/overview" },
                { text: "API Reference", link: "/api-reference/introduction" },
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
                { text: "Introduction", link: "/api-reference/introduction" },
                { text: "Work items", link: "/api-reference/issue/overview" },
                { text: "Projects", link: "/api-reference/project/overview" },
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
                    { text: "Download config files", link: "/self-hosting/methods/download-config" },
                  ],
                },
                {
                  text: "Kubernetes",
                  link: "/self-hosting/methods/kubernetes",
                  collapsed: true,
                  items: [{ text: "High availability", link: "/self-hosting/govern/high-availability" }],
                },
                { text: "FIPS deployment", link: "/self-hosting/methods/fips-deployment" },
                { text: "Podman Quadlets", link: "/self-hosting/methods/podman-quadlets" },
                {
                  text: "Airgapped Edition",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/self-hosting/methods/airgapped-requirements" },
                    { text: "On Docker", link: "/self-hosting/methods/airgapped-edition" },
                    { text: "On Kubernetes", link: "/self-hosting/methods/airgapped-edition-kubernetes" },
                    { text: "Clone Docker Images", link: "/self-hosting/methods/clone-docker-images" },
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
                { text: "DNS for Intake Email", link: "/self-hosting/govern/configure-dns-email-service" },
                { text: "OpenSearch for search", link: "/self-hosting/govern/advanced-search" },
                {
                  text: "Plane AI",
                  link: "/self-hosting/govern/plane-ai/configure-plane-ai",
                  collapsed: true,
                  items: [
                    { text: "Embedding model", link: "/self-hosting/govern/plane-ai/configure-embedding-model" },
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
                { text: "Environment variables", link: "/self-hosting/govern/environment-variables" },
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
                    { text: "Update to latest version", link: "/self-hosting/manage/upgrade-plane" },
                    { text: "For versions before 0.14.0", link: "/self-hosting/manage/upgrade-from-0.13.2-0.14.0" },
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
                        { text: "Enterprise Grid", link: "/self-hosting/manage/manage-licenses/activate-enterprise" },
                      ],
                    },

                    {
                      text: "Airgapped Edition",
                      collapsed: true,
                      items: [
                        { text: "Pro or Business", link: "/self-hosting/manage/manage-licenses/activate-airgapped" },
                        {
                          text: "Enterprise Grid",
                          link: "/self-hosting/manage/manage-licenses/activate-airgapped-enterprise",
                        },
                      ],
                    },
                  ],
                },
                { text: "Backup and restore", link: "/self-hosting/manage/backup-restore" },
                { text: "Upgrade Community to Commercial Edition", link: "/self-hosting/upgrade-from-community" },
                { text: "Upgrade Community to Airgapped Edition", link: "/self-hosting/manage/community-to-airgapped" },
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
                { text: "Installation Errors", link: "/self-hosting/troubleshoot/installation-errors" },
                { text: "License Errors", link: "/self-hosting/troubleshoot/license-errors" },
                { text: "CLI Errors", link: "/self-hosting/troubleshoot/cli-errors" },
                { text: "Storage Errors", link: "/self-hosting/troubleshoot/storage-errors" },
              ],
            },
          ],

          "/api-reference/": [
            {
              text: "API Reference",
              items: [
                { text: "Introduction", link: "/api-reference/introduction" },
                {
                  text: "Project",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/project/overview" },
                    { text: "Create Project", link: "/api-reference/project/add-project" },
                    {
                      text: "Create Project with Template",
                      link: "/api-reference/project/create-project-with-template",
                    },
                    { text: "List Projects", link: "/api-reference/project/list-projects" },
                    { text: "Get Project", link: "/api-reference/project/get-project-detail" },
                    { text: "Update Project", link: "/api-reference/project/update-project-detail" },
                    { text: "Archive Project", link: "/api-reference/project/archive-project" },
                    { text: "Unarchive Project", link: "/api-reference/project/unarchive-project" },
                    { text: "Delete Project", link: "/api-reference/project/delete-project" },
                  ],
                },
                {
                  text: "Project Features",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/project-features/overview" },
                    { text: "Get Project Features", link: "/api-reference/project-features/get-project-features" },
                    {
                      text: "Update Project Features",
                      link: "/api-reference/project-features/update-project-features",
                    },
                  ],
                },
                {
                  text: "Project Labels",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/project-labels/overview" },
                    { text: "Create Project Label", link: "/api-reference/project-labels/add-project-label" },
                    { text: "List Project Labels", link: "/api-reference/project-labels/list-project-labels" },
                    {
                      text: "Get Project Label",
                      link: "/api-reference/project-labels/get-project-label-detail",
                    },
                    {
                      text: "Update Project Label",
                      link: "/api-reference/project-labels/update-project-label-detail",
                    },
                    { text: "Delete Project Label", link: "/api-reference/project-labels/delete-project-label" },
                  ],
                },
                {
                  text: "Work Item",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/issue/overview" },
                    { text: "Create Work Item", link: "/api-reference/issue/add-issue" },
                    { text: "List Work Items", link: "/api-reference/issue/list-issues" },
                    { text: "Get Work Item", link: "/api-reference/issue/get-issue-detail" },
                    { text: "Get by identifier", link: "/api-reference/issue/get-issue-sequence-id" },
                    { text: "Search Work Items", link: "/api-reference/issue/search-issues" },
                    { text: "Advanced Search", link: "/api-reference/issue/advanced-search-work-items" },
                    { text: "Update Work Item", link: "/api-reference/issue/update-issue-detail" },
                    { text: "Delete Work Item", link: "/api-reference/issue/delete-issue" },
                  ],
                },
                {
                  text: "Work Item States",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/state/overview" },
                    { text: "Create State", link: "/api-reference/state/add-state" },
                    { text: "List States", link: "/api-reference/state/list-states" },
                    { text: "Get State", link: "/api-reference/state/get-state-detail" },
                    { text: "Update State", link: "/api-reference/state/update-state-detail" },
                    { text: "Delete State", link: "/api-reference/state/delete-state" },
                  ],
                },
                {
                  text: "Work Item Labels",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/label/overview" },
                    { text: "Create Label", link: "/api-reference/label/add-label" },
                    { text: "List Labels", link: "/api-reference/label/list-labels" },
                    { text: "Get Label", link: "/api-reference/label/get-label-detail" },
                    { text: "Update Label", link: "/api-reference/label/update-label-detail" },
                    { text: "Delete Label", link: "/api-reference/label/delete-label" },
                  ],
                },
                {
                  text: "Work Item Types",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/issue-types/types/overview" },
                    { text: "Add Type", link: "/api-reference/issue-types/types/add-issue-type" },
                    { text: "List Types", link: "/api-reference/issue-types/types/list-issue-types" },
                    { text: "Get Type Details", link: "/api-reference/issue-types/types/get-issue-type-details" },
                    { text: "Get Type Schema", link: "/api-reference/issue-types/types/get-work-item-type-schema" },
                    { text: "Update Type", link: "/api-reference/issue-types/types/update-issue-types" },
                    { text: "Delete Type", link: "/api-reference/issue-types/types/delete-issue-type" },
                  ],
                },
                {
                  text: "Custom Properties",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/issue-types/properties/overview" },
                    { text: "Add Property", link: "/api-reference/issue-types/properties/add-property" },
                    { text: "List Properties", link: "/api-reference/issue-types/properties/list-properties" },
                    {
                      text: "Get Property Details",
                      link: "/api-reference/issue-types/properties/get-property-details",
                    },
                    { text: "Update Property", link: "/api-reference/issue-types/properties/update-property" },
                    { text: "Delete Property", link: "/api-reference/issue-types/properties/delete-property" },
                  ],
                },
                {
                  text: "Custom Property Values",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/issue-types/values/overview" },
                    { text: "Add Property Values", link: "/api-reference/issue-types/values/add-property-values" },
                    { text: "List Property Values", link: "/api-reference/issue-types/values/list-property-values" },
                    { text: "Get Property Value", link: "/api-reference/issue-types/values/get-property-value-detail" },
                    { text: "Update Property Value", link: "/api-reference/issue-types/values/update-property-value" },
                    { text: "Delete Property Value", link: "/api-reference/issue-types/values/delete-property-value" },
                  ],
                },
                {
                  text: "Custom Property Options",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/issue-types/options/overview" },
                    { text: "Add Dropdown Options", link: "/api-reference/issue-types/options/add-dropdown-options" },
                    { text: "List Dropdown Options", link: "/api-reference/issue-types/options/list-dropdown-options" },
                    { text: "Get Option Details", link: "/api-reference/issue-types/options/get-option-details" },
                    {
                      text: "Update Dropdown Options",
                      link: "/api-reference/issue-types/options/update-dropdown-options",
                    },
                    {
                      text: "Delete Dropdown Options",
                      link: "/api-reference/issue-types/options/delete-dropdown-options",
                    },
                  ],
                },
                {
                  text: "Work Item Links",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/link/overview" },
                    { text: "Add Link", link: "/api-reference/link/add-link" },
                    { text: "List Links", link: "/api-reference/link/list-links" },
                    { text: "Get Link", link: "/api-reference/link/get-link-detail" },
                    { text: "Update Link", link: "/api-reference/link/update-link-detail" },
                    { text: "Delete Link", link: "/api-reference/link/delete-link" },
                  ],
                },
                {
                  text: "Work Item Activity",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/issue-activity/overview" },
                    { text: "List Activities", link: "/api-reference/issue-activity/list-issue-activities" },
                    { text: "Get Activity", link: "/api-reference/issue-activity/get-issue-activity-detail" },
                  ],
                },
                {
                  text: "Work Item Comments",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/issue-comment/overview" },
                    { text: "Add Comment", link: "/api-reference/issue-comment/add-issue-comment" },
                    { text: "List Comments", link: "/api-reference/issue-comment/list-issue-comments" },
                    { text: "Get Comment", link: "/api-reference/issue-comment/get-issue-comment-detail" },
                    { text: "Update Comment", link: "/api-reference/issue-comment/update-issue-comment-detail" },
                    { text: "Delete Comment", link: "/api-reference/issue-comment/delete-issue-comment" },
                  ],
                },
                {
                  text: "Work Item Attachments",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/issue-attachments/overview" },
                    { text: "Get Attachments", link: "/api-reference/issue-attachments/get-attachments" },
                    { text: "Get Attachment Detail", link: "/api-reference/issue-attachments/get-attachment-detail" },
                    { text: "Get Upload Credentials", link: "/api-reference/issue-attachments/get-upload-credentials" },
                    { text: "Upload File", link: "/api-reference/issue-attachments/upload-file" },
                    { text: "Complete Upload", link: "/api-reference/issue-attachments/complete-upload" },
                    { text: "Update Attachment", link: "/api-reference/issue-attachments/update-attachment" },
                    { text: "Delete Attachment", link: "/api-reference/issue-attachments/delete-attachment" },
                  ],
                },
                {
                  text: "Work Item Page Links",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/work-item-pages/overview" },
                    { text: "Create Work Item Page Link", link: "/api-reference/work-item-pages/add-work-item-page" },
                    { text: "List Work Item Pages", link: "/api-reference/work-item-pages/list-work-item-pages" },
                    {
                      text: "Get Work Item Page Link",
                      link: "/api-reference/work-item-pages/get-work-item-page-detail",
                    },
                    {
                      text: "Delete Work Item Page Link",
                      link: "/api-reference/work-item-pages/delete-work-item-page",
                    },
                  ],
                },

                {
                  text: "Cycles",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/cycle/overview" },
                    { text: "Create Cycle", link: "/api-reference/cycle/add-cycle" },
                    { text: "Add Work Items", link: "/api-reference/cycle/add-cycle-work-items" },
                    { text: "Transfer Work Items", link: "/api-reference/cycle/transfer-cycle-work-items" },
                    { text: "Archive Cycle", link: "/api-reference/cycle/archive-cycle" },
                    { text: "List Cycles", link: "/api-reference/cycle/list-cycles" },
                    { text: "Get Cycle", link: "/api-reference/cycle/get-cycle-detail" },
                    { text: "List Cycle Work Items", link: "/api-reference/cycle/list-cycle-work-items" },
                    { text: "List Archived Cycles", link: "/api-reference/cycle/list-archived-cycles" },
                    { text: "Update Cycle", link: "/api-reference/cycle/update-cycle-detail" },
                    { text: "Unarchive Cycle", link: "/api-reference/cycle/unarchive-cycle" },
                    { text: "Remove Work Item", link: "/api-reference/cycle/remove-cycle-work-item" },
                    { text: "Delete Cycle", link: "/api-reference/cycle/delete-cycle" },
                  ],
                },
                {
                  text: "Modules",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/module/overview" },
                    { text: "Create Module", link: "/api-reference/module/add-module" },
                    { text: "Add Work Items", link: "/api-reference/module/add-module-work-items" },
                    { text: "Archive Module", link: "/api-reference/module/archive-module" },
                    { text: "List Modules", link: "/api-reference/module/list-modules" },
                    { text: "Get Module", link: "/api-reference/module/get-module-detail" },
                    { text: "List Module Work Items", link: "/api-reference/module/list-module-work-items" },
                    { text: "List Archived Modules", link: "/api-reference/module/list-archived-modules" },
                    { text: "Update Module", link: "/api-reference/module/update-module-detail" },
                    { text: "Unarchive Module", link: "/api-reference/module/unarchive-module" },
                    { text: "Remove Work Item", link: "/api-reference/module/remove-module-work-item" },
                    { text: "Delete Module", link: "/api-reference/module/delete-module" },
                  ],
                },
                {
                  text: "Pages",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/page/overview" },
                    { text: "List Workspace Pages", link: "/api-reference/page/list-workspace-pages" },
                    { text: "Add Workspace Page", link: "/api-reference/page/add-workspace-page" },
                    { text: "List Project Pages", link: "/api-reference/page/list-project-pages" },
                    { text: "Add Project Page", link: "/api-reference/page/add-project-page" },
                    { text: "Get Workspace Page", link: "/api-reference/page/get-workspace-page" },
                    { text: "Get Project Page", link: "/api-reference/page/get-project-page" },
                  ],
                },
                {
                  text: "Intake",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/intake-issue/overview" },
                    { text: "Add Intake Issue", link: "/api-reference/intake-issue/add-intake-issue" },
                    { text: "List Intake Issues", link: "/api-reference/intake-issue/list-intake-issues" },
                    { text: "Get Intake Issue", link: "/api-reference/intake-issue/get-intake-issue-detail" },
                    { text: "Update Intake Issue", link: "/api-reference/intake-issue/update-intake-issue-detail" },
                    { text: "Delete Intake Issue", link: "/api-reference/intake-issue/delete-intake-issue" },
                  ],
                },
                {
                  text: "Assets",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/assets/overview" },
                    { text: "Create User Asset Upload", link: "/api-reference/assets/create-user-asset-upload" },
                    { text: "Update User Asset", link: "/api-reference/assets/update-user-asset" },
                    { text: "Delete User Asset", link: "/api-reference/assets/delete-user-asset" },
                    {
                      text: "Create Workspace Asset Upload",
                      link: "/api-reference/assets/create-workspace-asset-upload",
                    },
                    { text: "Get Workspace Asset", link: "/api-reference/assets/get-workspace-asset" },
                    { text: "Update Workspace Asset", link: "/api-reference/assets/update-workspace-asset" },
                  ],
                },
                {
                  text: "Milestones",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/milestones/overview" },
                    { text: "Create Milestone", link: "/api-reference/milestones/add-milestone" },
                    { text: "List Milestones", link: "/api-reference/milestones/list-milestones" },
                    { text: "Get Milestone", link: "/api-reference/milestones/get-milestone-detail" },
                    { text: "List Milestone Work Items", link: "/api-reference/milestones/list-milestone-work-items" },
                    { text: "Update Milestone", link: "/api-reference/milestones/update-milestone-detail" },
                    { text: "Delete Milestone", link: "/api-reference/milestones/delete-milestone" },
                  ],
                },
                {
                  text: "Estimates",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/estimate/overview" },
                    { text: "Create Estimate", link: "/api-reference/estimate/add-estimate" },
                    { text: "Get Estimate", link: "/api-reference/estimate/get-estimate" },
                    { text: "Update Estimate", link: "/api-reference/estimate/update-estimate" },
                    { text: "Delete Estimate", link: "/api-reference/estimate/delete-estimate" },
                    { text: "List Estimate Points", link: "/api-reference/estimate/list-estimate-points" },
                    { text: "Create Estimate Points", link: "/api-reference/estimate/add-estimate-points" },
                    { text: "Update Estimate Point", link: "/api-reference/estimate/update-estimate-point" },
                    { text: "Delete Estimate Point", link: "/api-reference/estimate/delete-estimate-point" },
                  ],
                },
                {
                  text: "Time Tracking",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/worklogs/overview" },
                    { text: "Create Worklog", link: "/api-reference/worklogs/create-worklog" },
                    { text: "Get Worklogs for Issue", link: "/api-reference/worklogs/get-worklogs-for-issue" },
                    { text: "Get Total Time", link: "/api-reference/worklogs/get-total-time" },
                    { text: "Update Worklog", link: "/api-reference/worklogs/update-worklog" },
                    { text: "Delete Worklog", link: "/api-reference/worklogs/delete-worklog" },
                  ],
                },
                {
                  text: "Epics",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/epics/overview" },
                    { text: "Create Epic", link: "/api-reference/epics/create-epic" },
                    { text: "List Epics", link: "/api-reference/epics/list-epics" },
                    { text: "Get Epic", link: "/api-reference/epics/get-epic-detail" },
                    { text: "Update Epic", link: "/api-reference/epics/update-epic" },
                    { text: "Delete Epic", link: "/api-reference/epics/delete-epic" },
                    { text: "Add Epic Work Items", link: "/api-reference/epics/add-epic-work-items" },
                    { text: "List Epic Work Items", link: "/api-reference/epics/list-epic-work-items" },
                  ],
                },
                {
                  text: "Initiatives",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/initiative/overview" },
                    { text: "Create Initiative", link: "/api-reference/initiative/add-initiative" },
                    { text: "List Initiatives", link: "/api-reference/initiative/list-initiatives" },
                    { text: "Get Initiative", link: "/api-reference/initiative/get-initiative-detail" },
                    { text: "Update Initiative", link: "/api-reference/initiative/update-initiative-detail" },
                    { text: "Delete Initiative", link: "/api-reference/initiative/delete-initiative" },
                  ],
                },
                {
                  text: "Initiative Labels",
                  collapsed: true,
                  items: [
                    { text: "Add Label", link: "/api-reference/initiative/add-initiative-label" },
                    { text: "Add Labels to Initiative", link: "/api-reference/initiative/add-labels-to-initiative" },
                    { text: "List Initiative Labels", link: "/api-reference/initiative/list-initiative-labels" },
                    { text: "Get Label Detail", link: "/api-reference/initiative/get-initiative-label-detail" },
                    {
                      text: "List Labels for Initiative",
                      link: "/api-reference/initiative/list-initiative-labels-for-initiative",
                    },
                    { text: "Update Label", link: "/api-reference/initiative/update-initiative-label-detail" },
                    { text: "Remove Labels", link: "/api-reference/initiative/remove-labels-from-initiative" },
                    { text: "Delete Label", link: "/api-reference/initiative/delete-initiative-label" },
                  ],
                },
                {
                  text: "Initiative Projects",
                  collapsed: true,
                  items: [
                    { text: "Add Projects", link: "/api-reference/initiative/add-projects-to-initiative" },
                    { text: "List Projects", link: "/api-reference/initiative/list-initiative-projects" },
                    { text: "Remove Projects", link: "/api-reference/initiative/remove-projects-from-initiative" },
                  ],
                },
                {
                  text: "Initiative Epics",
                  collapsed: true,
                  items: [
                    { text: "Add Epics", link: "/api-reference/initiative/add-epics-to-initiative" },
                    { text: "List Epics", link: "/api-reference/initiative/list-initiative-epics" },
                    { text: "Remove Epics", link: "/api-reference/initiative/remove-epics-from-initiative" },
                  ],
                },
                {
                  text: "Customers",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/customer/overview" },
                    { text: "Add Customer", link: "/api-reference/customer/add-customer" },
                    { text: "Link Work Items", link: "/api-reference/customer/link-work-items-to-customer" },
                    { text: "List Customers", link: "/api-reference/customer/list-customers" },
                    { text: "Get Customer", link: "/api-reference/customer/get-customer-detail" },
                    { text: "List Customer Work Items", link: "/api-reference/customer/list-customer-work-items" },
                    { text: "Update Customer", link: "/api-reference/customer/update-customer-detail" },
                    { text: "Unlink Work Item", link: "/api-reference/customer/unlink-work-item-from-customer" },
                    { text: "Delete Customer", link: "/api-reference/customer/delete-customer" },
                  ],
                },
                {
                  text: "Customer Properties",
                  collapsed: true,
                  items: [
                    { text: "Add Property", link: "/api-reference/customer/add-customer-property" },
                    { text: "List Properties", link: "/api-reference/customer/list-customer-properties" },
                    { text: "Get Property Detail", link: "/api-reference/customer/get-customer-property-detail" },
                    { text: "List Property Values", link: "/api-reference/customer/list-customer-property-values" },
                    { text: "Get Property Value", link: "/api-reference/customer/get-customer-property-value" },
                    { text: "Update Property", link: "/api-reference/customer/update-customer-property-detail" },
                    { text: "Update Property Value", link: "/api-reference/customer/update-customer-property-value" },
                    { text: "Delete Property", link: "/api-reference/customer/delete-customer-property" },
                  ],
                },
                {
                  text: "Customer Requests",
                  collapsed: true,
                  items: [
                    { text: "Add Request", link: "/api-reference/customer/add-customer-request" },
                    { text: "List Requests", link: "/api-reference/customer/list-customer-requests" },
                    { text: "Get Request Detail", link: "/api-reference/customer/get-customer-request-detail" },
                    { text: "Update Request", link: "/api-reference/customer/update-customer-request-detail" },
                    { text: "Delete Request", link: "/api-reference/customer/delete-customer-request" },
                  ],
                },
                {
                  text: "Teamspaces",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/teamspace/overview" },
                    { text: "Create Teamspace", link: "/api-reference/teamspace/add-teamspace" },
                    { text: "List Teamspaces", link: "/api-reference/teamspace/list-teamspaces" },
                    { text: "Get Teamspace", link: "/api-reference/teamspace/get-teamspace-detail" },
                    { text: "Update Teamspace", link: "/api-reference/teamspace/update-teamspace-detail" },
                    { text: "Delete Teamspace", link: "/api-reference/teamspace/delete-teamspace" },
                  ],
                },
                {
                  text: "Teamspace Members",
                  collapsed: true,
                  items: [
                    { text: "List Members", link: "/api-reference/teamspace/list-teamspace-members" },
                    { text: "Add Members", link: "/api-reference/teamspace/add-teamspace-members" },
                    { text: "Remove Members", link: "/api-reference/teamspace/remove-teamspace-members" },
                  ],
                },
                {
                  text: "Teamspace Projects",
                  collapsed: true,
                  items: [
                    { text: "List Projects", link: "/api-reference/teamspace/list-teamspace-projects" },
                    { text: "Add Projects", link: "/api-reference/teamspace/add-projects-to-teamspace" },
                    { text: "Remove Projects", link: "/api-reference/teamspace/remove-projects-from-teamspace" },
                  ],
                },
                {
                  text: "Stickies",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/sticky/overview" },
                    { text: "Add Sticky", link: "/api-reference/sticky/add-sticky" },
                    { text: "List Stickies", link: "/api-reference/sticky/list-stickies" },
                    { text: "Get Sticky", link: "/api-reference/sticky/get-sticky-detail" },
                    { text: "Update Sticky", link: "/api-reference/sticky/update-sticky-detail" },
                    { text: "Delete Sticky", link: "/api-reference/sticky/delete-sticky" },
                  ],
                },
                {
                  text: "Workspace Features",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/workspace-features/overview" },
                    {
                      text: "Get Workspace Features",
                      link: "/api-reference/workspace-features/get-workspace-features",
                    },
                    {
                      text: "Update Workspace Features",
                      link: "/api-reference/workspace-features/update-workspace-features",
                    },
                  ],
                },
                {
                  text: "Workspace Invitations",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/workspace-invitations/overview" },
                    {
                      text: "Create Workspace Invitation",
                      link: "/api-reference/workspace-invitations/add-workspace-invitation",
                    },
                    {
                      text: "List Workspace Invitations",
                      link: "/api-reference/workspace-invitations/list-workspace-invitations",
                    },
                    {
                      text: "Get Workspace Invitation",
                      link: "/api-reference/workspace-invitations/get-workspace-invitation-detail",
                    },
                    {
                      text: "Update Workspace Invitation",
                      link: "/api-reference/workspace-invitations/update-workspace-invitation",
                    },
                    {
                      text: "Delete Workspace Invitation",
                      link: "/api-reference/workspace-invitations/delete-workspace-invitation",
                    },
                  ],
                },
                {
                  text: "Members",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/members/overview" },
                    { text: "Get Workspace Members", link: "/api-reference/members/get-workspace-members" },
                    { text: "Get Project Members", link: "/api-reference/members/get-project-members" },
                    { text: "Create Project Member", link: "/api-reference/members/add-project-member" },
                    { text: "Get Project Member", link: "/api-reference/members/get-project-member-detail" },
                    { text: "Update Project Member", link: "/api-reference/members/update-project-member" },
                    { text: "Delete Project Member", link: "/api-reference/members/delete-project-member" },
                    { text: "Remove Workspace Members", link: "/api-reference/members/remove-workspace-member" },
                  ],
                },
                {
                  text: "User",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/user/overview" },
                    { text: "Get Current User", link: "/api-reference/user/get-current-user" },
                  ],
                },
                {
                  text: "IDP Group Sync",
                  collapsed: true,
                  items: [
                    { text: "Overview", link: "/api-reference/idp-group-sync/overview" },
                    { text: "Get Group Sync Config", link: "/api-reference/idp-group-sync/get-group-sync-config" },
                    {
                      text: "Update Group Sync Config",
                      link: "/api-reference/idp-group-sync/update-group-sync-config",
                    },
                    { text: "List Project Mappings", link: "/api-reference/idp-group-sync/list-project-mappings" },
                    { text: "Create Project Mapping", link: "/api-reference/idp-group-sync/create-project-mapping" },
                    { text: "Get Project Mapping", link: "/api-reference/idp-group-sync/get-project-mapping" },
                    { text: "Update Project Mapping", link: "/api-reference/idp-group-sync/update-project-mapping" },
                    { text: "Delete Project Mapping", link: "/api-reference/idp-group-sync/delete-project-mapping" },
                    {
                      text: "List Workspace Mappings",
                      link: "/api-reference/idp-group-sync/list-workspace-mappings",
                    },
                    {
                      text: "Create Workspace Mapping",
                      link: "/api-reference/idp-group-sync/create-workspace-mapping",
                    },
                    {
                      text: "Get Workspace Mapping",
                      link: "/api-reference/idp-group-sync/get-workspace-mapping",
                    },
                    {
                      text: "Update Workspace Mapping",
                      link: "/api-reference/idp-group-sync/update-workspace-mapping",
                    },
                    {
                      text: "Delete Workspace Mapping",
                      link: "/api-reference/idp-group-sync/delete-workspace-mapping",
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
                    { text: "Signals and content payload", link: "/dev-tools/agents/signals-content-payload" },
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
                    { text: "Choose token Flow", link: "/dev-tools/build-plane-app/choose-token-flow" },
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
          pattern: "https://github.com/makeplane/developer-docs/edit/master/:path",
        },

        /*footer: {
    message: 'Released under the Apache License 2.0.',
    copyright: 'Copyright © 2024 Plane'
    }*/
      },
    })
  )
);
