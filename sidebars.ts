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
            "workspaces-and-users/search-workspace",
            "core-concepts/account/overview",
            "core-concepts/power-k",
            "workspaces-and-users/customize-navigation"
          ],
        },

        {
          type: "category",
          label: "Members",
          items: [
            "core-concepts/workspaces/members",
            "workspaces-and-users/roles",
            "workspaces-and-users/permissions",
          ],
        },
        {
          type: "category",
          label: "Authentication",
          items: [
            "authentication/sso",
            {
                  type: 'link',
                  label: 'Self-hosted authentication', 
                  href: 'https://developers.plane.so/self-hosting/govern/authentication',
            },
          ],
        },
        {
          type: "category",
          label: "Billing and plans",
          items: [
            "workspaces-and-users/upgrade-plan",
            "workspaces-and-users/manage-licenses",
            "workspaces-and-users/add-remove-seats",
            "workspaces-and-users/billing-and-plans",
          ],
        },
        "core-concepts/account/settings",
      ],
    },
    {
      type: "category",
      collapsed: false,
      label: "Project management",
      items: [
        {
          type: "category",
          label: "Projects",
          items: [
            "core-concepts/projects/overview",
            "core-concepts/projects/manage-project-members",
            "core-concepts/deploy"
          ],
        },
        "core-concepts/projects/project-states",
        "core-concepts/issues/states",
        "core-concepts/projects/project-overview",
        "templates/project-templates",
        
      ],
    },
    {
      type: "category",
      collapsed: false,
      label: "Work item management",
      items: [
        {
          type: "category",
          label: "Work Items",
          items: [
            "core-concepts/issues/overview",
            "core-concepts/issues/properties",
            "core-concepts/drafts",
            "core-concepts/issues/work-item-url",
          ],
        },

        "core-concepts/issues/issue-types",
        "templates/work-item-templates",
        "core-concepts/projects/recurring-work-items",
      ],
    },
    {
      type: "category",
      collapsed: false,
      label: "Planning and organization",
      items: [
        "core-concepts/issues/labels",
        "core-concepts/cycles",
        "core-concepts/modules",
        "core-concepts/issues/epics",
        "core-concepts/issues/timeline-dependency",
        "core-concepts/projects/initiatives",
        "core-concepts/workspaces/teamspaces",
        "core-concepts/projects/milestones",
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
      label: "Knowledge management",
      items: [
         {
          type: "category",
          label: "Pages",
          items: [
             "core-concepts/pages/overview",
             "core-concepts/pages/editor-blocks",
          ],
        },
        "core-concepts/pages/wiki",
        "core-concepts/pages/nested-pages",
        "templates/page-templates",
      ],
    },
    {
      type: "category",
      collapsed: false,
      label: "Advanced management",
      items: [
        "core-concepts/issues/estimates",
        "core-concepts/issues/bulk-ops",
        "core-concepts/issues/time-tracking",
        "workflows-and-approvals/workflows",
        "automations/custom-automations",
      ],
    },
    {
      type: "category",
      collapsed: false,
      label: "Collaboration and communication",
      items: [
        "communication-and-collaboration/project-updates",
        "communication-and-collaboration/comments-and-activity",
        "core-concepts/pages/inline-comments",
        "core-concepts/inbox",
      ],
    },
    {
      type: "category",
      collapsed: false,
      label: "Intake and customers",
      items: [
        "intake/overview",
        "core-concepts/intake",
        "intake/intake-forms",
        "intake/intake-email",
        "customers",
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
          collapsed: false,
          link: { type: "doc", id: "integrations/about" },
          items: [
            "integrations/draw-io",
            "integrations/github",
            "integrations/gitlab",
            "integrations/sentry",
            "integrations/slack",
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
          collapsed: false,
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
      label: "AI",
      items: [
        "ai/pi-chat",
        "ai/plane-ai-credits",
        {
          type: "link",
          label: "MCP Server",
          href: "https://developers.plane.so/dev-tools/mcp-server",
        }
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
        "support/get-help",
        "support/keyboard-shortcuts",
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
          label: "System status",
          href: "https://status.plane.so/",
        },
      ],
    }, 
  ],
};

export default sidebars;
