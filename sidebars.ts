import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
 
  tutorialSidebar: [
    {
      type: 'category',
      collapsed: false,
      label: 'Get started',
      items: [
        'introduction/home',
        {
          type: 'link',
          label: 'Self-host Plane', 
          href: 'https://developers.plane.so/self-hosting/overview',
        },  
        'introduction/quickstart',
        'introduction/core-concepts',
      ],
    },
    {
      type: 'category',
      collapsed: true,
      label: 'Project + work tracking',
      items: [

        {
          type: 'category',
          label: 'Projects',
          link: { type: 'doc', id: 'core-concepts/projects/overview' },
          items: [            
          'core-concepts/deploy'
          ],
        },
        {
          type: 'category',
          label: 'Work Items',
          link: { type: 'doc', id: 'core-concepts/issues/overview' },
          items: [            
          'core-concepts/issues/properties',
          'core-concepts/issues/states',
          'core-concepts/issues/labels'
          ],
        },
        'core-concepts/cycles',
        'core-concepts/modules',
        'core-concepts/intake',
        'core-concepts/issues/estimates',
        'core-concepts/drafts',
        'core-concepts/inbox'
      ],
    },

    {
      type: 'category',
      collapsed: true,
      label: 'Project + work management',
      items: [
        'core-concepts/issues/issue-types',
        'core-concepts/issues/time-tracking',
        'core-concepts/issues/bulk-ops',
        'core-concepts/issues/timeline-dependency',
        'core-concepts/issues/epics',
        'core-concepts/projects/initiatives',
        'core-concepts/workspaces/teamspaces',
        'core-concepts/projects/project-states',
        'core-concepts/projects/project-overview',
        'workflows-and-approvals/workflows',
        'intake/intake-forms',
        'intake/intake-email',
        'core-concepts/export',
        'core-concepts/stickies',
      ],
    },
    {
      type: 'category',
      collapsed: true,
      label: 'Visualization',
      items: [
        'core-concepts/account/overview',
        'your-work',
        {
          type: 'category',
          label: 'Layouts',
          link: { type: 'doc', id: 'core-concepts/issues/layouts' },
          items: [            
          'core-concepts/issues/visualise_filter',
          'core-concepts/issues/display-options',
          ],
        },
        'core-concepts/views',
        'core-concepts/analytics',
        
      ],
    },

    {
      type: 'category',
      collapsed: true,
      label: 'Navigation',
      items: [
       'core-concepts/power-k'
      ],
    },

    {
      type: 'category',
      collapsed: true,
      label: 'Workspace + user management',
      items: [
        'core-concepts/workspaces/overview',
        'core-concepts/workspaces/members',
        'workspaces-and-users/billing-and-plans',
        'workspaces-and-users/upgrade-plan',
        'core-concepts/account/settings',
      ],
    },

    {
      type: 'category',
      collapsed: true,
      label: 'Knowledge management',
      items: [
        {
          type: 'category',
          label: 'Pages',
          link: { type: 'doc', id: 'core-concepts/pages/overview' },
          items: [            
          'core-concepts/pages/editor-blocks',
          ],
        },
        'core-concepts/pages/wiki',
      ],
    },
    {
      type: 'category',
      collapsed: true,
      label: 'Importers',
      items: [
        'importers/overview',
        'importers/jira',
        'importers/linear',
        'importers/asana'
      ],
    },
    {
      type: 'category',
      collapsed: true,
      label: 'Integrations',
      items: [
        'integrations/about',
        'integrations/github',
        'integrations/slack',
        'integrations/gitlab'
      ],
    },
    {
      type: 'category',
      collapsed: true,
      label: 'Performance',
      items: [
        'performance/hyper-mode'  
      ],
    },
    {
      type: 'category',
      collapsed: true,
      label: 'Devices',
      items: [
        'devices/mobile',
      ],
    },
    {
      type: 'link',
      label: 'API Reference',
      href: 'https://developers.plane.so/api-reference/introduction', 
    },
    {
      type: 'link',
      label: 'Webhooks',
      href: 'https://developers.plane.so/webhooks/intro-webhooks', 
    },
    {
      type: 'link',
      label: 'Changelog',
      href: 'https://plane.so/changelog', 
    }
  ], 
};
export default sidebars;
