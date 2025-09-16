import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: "category",
      collapsed: false,
      label: "Get started",
      items: [
        "introduction/home",
        "introduction/core-concepts",
        "introduction/quickstart",
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
          ],
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
      label: "Project + work tracking",
      items: [
        {
          type: "category",
          label: "Projects",
          link: { type: "doc", id: "core-concepts/projects/overview" },
          items: ["core-concepts/deploy"],
        },
        {
          type: "category",
          label: "Work Items",
          link: { type: "doc", id: "core-concepts/issues/overview" },
          items: ["core-concepts/issues/properties", "core-concepts/issues/states", "core-concepts/issues/labels"],
        },
        "core-concepts/cycles",
        "core-concepts/modules",
        "core-concepts/intake",
        "core-concepts/issues/estimates",
        "core-concepts/drafts",
        "core-concepts/inbox",
      ],
    },

    {
      type: "category",
      collapsed: false,
      label: "Project + work management",
      items: [
        "core-concepts/issues/issue-types",
        "core-concepts/issues/time-tracking",
        "core-concepts/issues/bulk-ops",
        "core-concepts/projects/recurring-work-items",
        "automations/custom-automations",
        "core-concepts/issues/timeline-dependency",
        "core-concepts/issues/epics",
        "core-concepts/projects/initiatives",
        "core-concepts/workspaces/teamspaces",
        "core-concepts/projects/project-states",
        "core-concepts/projects/project-overview",
        "workflows-and-approvals/workflows",
        "templates/project-templates",
        "templates/work-item-templates",
        "templates/page-templates",
        "customers",
        "intake/intake-forms",
        "intake/intake-email",
        "core-concepts/export",
        "core-concepts/stickies",
      ],
    },
    {
      type: "category",
      collapsed: false,
      label: "Visualization",
      items: [
        "core-concepts/account/overview",
        "your-work",
        {
          type: "category",
          label: "Layouts",
          link: { type: "doc", id: "core-concepts/issues/layouts" },
          items: ["core-concepts/issues/visualise_filter", "core-concepts/issues/display-options"],
        },
        "core-concepts/views",
        "core-concepts/analytics",
        "dashboards",
      ],
    },

    {
      type: "category",
      collapsed: false,
      label: "Navigation",
      items: ["core-concepts/power-k"],
    },

    {
      type: "category",
      collapsed: false,
      label: "Workspace + user management",
      items: [
        "core-concepts/workspaces/overview",
        "core-concepts/workspaces/members",
        "workspaces-and-users/billing-and-plans",
        "workspaces-and-users/upgrade-plan",
        "core-concepts/account/settings",
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
          link: { type: "doc", id: "core-concepts/pages/overview" },
          items: ["core-concepts/pages/editor-blocks"],
        },
        "core-concepts/pages/wiki",
        "core-concepts/pages/nested-pages",
      ],
    },
    
    {
      type: "category",
      collapsed: false,
      label: "AI",
      items: ["ai/pi-chat"],
    },

    {
      type: "category",
      collapsed: false,
      label: "Importers",
      items: ["importers/overview", "importers/asana", "importers/confluence", "importers/clickup","importers/csv", "importers/jira", "importers/linear", "importers/notion" ],
    },
    {
      type: "category",
      collapsed: false,
      label: "Integrations",
      items: ["integrations/about", "integrations/github", "integrations/slack", "integrations/gitlab"],
    },
    {
      type: "category",
      collapsed: false,
      label: "Performance",
      items: ["performance/hyper-mode"],
    },
    {
      type: "category",
      collapsed: false,
      label: "Devices",
      items: ["devices/mobile"],
    },
    {
      type: "link",
      label: "API Reference",
      href: "https://developers.plane.so/api-reference/introduction",
    },
    {
      type: "link",
      label: "Webhooks",
      href: "https://developers.plane.so/webhooks/intro-webhooks",
    },
    {
      type: "link",
      label: "Changelog",
      href: "https://plane.so/changelog",
    },
  ],
};

export default sidebars;
