import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: "category",
      collapsed: false,
      label: "Get started",
      items: [
        "introduction/home",
        "introduction/quickstart",
        "introduction/core-concepts",
        {
          type: "category",
          label: "Tutorials",
          link: { type: "doc", id: "introduction/tutorials/overview" },
          items: [
            "introduction/tutorials/create-workspace",
            "introduction/tutorials/invite-members",
            "introduction/tutorials/create-project",
            "introduction/tutorials/create-work-items",
            "introduction/tutorials/collaborate-on-work-items",
            "introduction/tutorials/organize-and-view-work",
            "introduction/tutorials/plan-and-create-cycles",
            "introduction/tutorials/create-pages",
          ],
        },
        {
          type: "link",
          label: "Download Plane",
          href: "https://plane.so/download",
        },
        {
          type: "link",
          label: "Self-host Plane",
          href: "https://developers.plane.so/self-hosting/overview",
        }
      ],
    },
    {
      type: "category",
      collapsed: false,
      label: "Workspace management",
      items: [
         {
          type: "category",
          label: "Workspaces",
          items: [
            "core-concepts/workspaces/overview",
            "core-concepts/power-k"
          ],
        },

        {
          type: "category",
          label: "Members",
          items: [
            "workspaces-and-users/roles",
            "core-concepts/workspaces/members",
            "workspaces-and-users/permissions",
          ],
        },
        {
          type: "category",
          label: "Authentication",
          items: [
            {
              type: 'link',
              label: 'Google OAuth', 
              href: 'https://developers.plane.so/self-hosting/govern/google-oauth',
            },
            {
              type: 'link',
              label: 'GitHub OAuth', 
              href: 'https://developers.plane.so/self-hosting/govern/github-oauth',
            },
            {
              type: 'link',
              label: 'SAML SSO', 
              href: 'https://developers.plane.so/self-hosting/govern/saml-sso',
            },
            {
              type: 'link',
              label: 'OIDC SSO', 
              href: 'https://developers.plane.so/self-hosting/govern/oidc-sso',
            },
          ],
        },
        "core-concepts/account/settings",
        {
          type: "category",
          label: "Billing and plans",
          items: [
            "workspaces-and-users/upgrade-plan",
            "workspaces-and-users/add-remove-seats",
            "workspaces-and-users/manage-subscription",
            "workspaces-and-users/manage-licenses",
            "workspaces-and-users/billing-and-plans",
          ],
        },
      ],
    },
    {
      type: "category",
      collapsed: false,
      label: "Project management",
      items: [
        "core-concepts/projects/overview",
        "core-concepts/issues/states",
        "core-concepts/projects/project-states",
        "core-concepts/projects/project-overview",
        "templates/project-templates",
        "core-concepts/deploy"
      ],
    },
    {
      type: "category",
      collapsed: false,
      label: "Work item management",
      items: [
        "core-concepts/issues/overview",
        "core-concepts/issues/properties",
        "core-concepts/issues/issue-types",
        "templates/work-item-templates",
        "core-concepts/projects/recurring-work-items",
        "core-concepts/drafts",
      ],
    },
    {
      type: "category",
      collapsed: false,
      label: "Planning and organization",
      items: [
        "core-concepts/issues/labels",
        "core-concepts/issues/epics",
        "core-concepts/issues/timeline-dependency",
        "core-concepts/cycles",
        "core-concepts/modules",
        "core-concepts/projects/initiatives",
        "core-concepts/workspaces/teamspaces",
        "core-concepts/account/overview",
        "core-concepts/stickies",
      ],
    },

    {
      type: "category",
      collapsed: false,
      label: "Views and layouts",
      items: [
        "core-concepts/issues/layouts",
        "core-concepts/issues/visualise_filter",
        "core-concepts/issues/display-options",
        "core-concepts/views",
        "your-work",
      ],
    },
    {
      type: "category",
      collapsed: false,
      label: "Collaboration and communication",
      items: [
         "core-concepts/inbox",
      ],
    },

     {
      type: "category",
      collapsed: false,
      label: "Advanced management",
      items: [
        "core-concepts/issues/bulk-ops",
        "core-concepts/issues/estimates",
        "core-concepts/issues/time-tracking",
        "workflows-and-approvals/workflows",
        "automations/custom-automations",
      ],
    },
    {
      type: "category",
      collapsed: false,
      label: "Intake and customer requests",
      items: [
        "core-concepts/intake",
        "intake/intake-forms",
        "intake/intake-email",
        "customers",
      ],
    },
    {
      type: "category",
      collapsed: false,
      label: "Knowledge management",
      items: [
        "core-concepts/pages/overview",
        "core-concepts/pages/editor-blocks",
        "templates/page-templates",
        "core-concepts/pages/wiki",
        "core-concepts/pages/nested-pages",
      ],
    },
    {
      type: "category",
      collapsed: false,
      label: "Analytics and reporting",
      items: [
        "core-concepts/analytics",
        "dashboards",
      ],
    },
    {
      type: "category",
      collapsed: false,
      label: "Integrations",
      items: [
        {
          type: "category",
          label: "Native integrations",
          link: { type: "doc", id: "integrations/about" },
          items: [
            "integrations/github",
            "integrations/slack",
            "integrations/gitlab",
            "integrations/sentry",
          ],
        },
        {
          type: "category",
          label: "Custom integrations",
          items: [
            {
              type: "link",
              label: "Build a Plane app",
              href: "https://developers.plane.so/dev-tools/build-plane-app",
            },
            {
              type: "link",
              label: "API reference",
              href: "https://developers.plane.so/api-reference/introduction",
            },
            {
              type: "link",
              label: "Webhooks",
              href: "https://developers.plane.so/dev-tools/intro-webhooks",
            },
          ],
        },
      ],
    },

    {
      type: "category",
      collapsed: false,
      label: "Import and export",
      items: [
        {
          type: "category",
          label: "Import",
          link: { type: "doc", id: "importers/overview"},
          items: [
            "importers/asana",
            "importers/confluence",
            "importers/clickup",
            "importers/csv",
            "importers/jira",
            "importers/linear",
            "importers/notion",
          ],
        },
        "core-concepts/export",
      ],
    },

    {
      type: "category",
      collapsed: false,
      label: "Plane AI",
      items: [
        "ai/pi-chat",
        {
          type: "link",
          label: "MCP server",
          href: "https://developers.plane.so/dev-tools/mcp-server",
        },
      ],
    },
    {
      type: "category",
      collapsed: false,
      label: "Devices",
      items: ["devices/mobile"],
    },

    {
      type: "category",
      collapsed: false,
      label: "Support and resources",
      items: [
        {
          type: "category",
          label: "Resources",
          items: [
            {
              type: "link",
              label: "Developer docs",
              href: "https://developers.plane.so",
            },
            {
              type: "link",
              label: "Blog",
              href: "https://plane.so/blog",
            },
            {
              type: "link",
              label: "Templates library",
              href: "https://plane.so/templates",
            },
            {
              type: "link",
              label: "Integrations marketplace",
              href: "https://plane.so/marketplace/integrations",
            },
          ],
        },
        {
          type: "link",
          label: "Changelog",
          href: "https://plane.so/changelog",
        },
        {
          type: "link",
          label: "Discord",
          href: "https://discord.com/invite/A92xrEGCge",
        },
        {
          type: "link",
          label: "Feature requests",
          href: "https://github.com/makeplane/plane/issues",
        },
        {
          type: "link",
          label: "System status",
          href: "https://status.plane.so/",
        },
      ],
    }, 
  ],
};

export default sidebars;
