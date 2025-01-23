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
      collapsed: false,
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
          label: 'Issues',
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
      collapsed: false,
      label: 'Project + work management',
      items: [
        'core-concepts/issues/issue-types',
        'core-concepts/issues/time-tracking',
        'core-concepts/issues/bulk-ops',
        'core-concepts/issues/timeline-dependency',
        'core-concepts/issues/epics',
        'core-concepts/projects/project-states',
        'core-concepts/projects/project-overview',
        'core-concepts/export',
      ],
    },
    {
      type: 'category',
      collapsed: false,
      label: 'Visualization',
      items: [
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
        'core-concepts/account/overview',
        'core-concepts/analytics',
        
      ],
    },

    {
      type: 'category',
      collapsed: false,
      label: 'Navigation',
      items: [
       'core-concepts/power-k'
      ],
    },

    {
      type: 'category',
      collapsed: false,
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
      collapsed: false,
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
      collapsed: false,
      label: 'Importers',
      items: [
        'plane-importers/github-imp',
        'plane-importers/jira-imp',
      ],
    },
    {
      type: 'category',
      collapsed: false,
      label: 'Integrations',
      items: [
        'plane-integrations/about',
        'plane-integrations/github',
        'plane-integrations/slack',
      ],
    },
    {
      type: 'category',
      collapsed: false,
      label: 'Performance',
      items: [
        'performance/hyper-mode'  
      ],
    },
    {
      type: 'category',
      collapsed: false,
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
