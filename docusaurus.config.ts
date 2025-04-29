import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Plane",
  tagline: "An easy, flexible project management software",
  favicon: "https://media.docs.plane.so/favicon-32x32.png",
  trailingSlash: false,
  // Set the production url of your site here
  url: "https://docs.plane.so",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "makeplane", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  onBrokenAnchors: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          path: "docs",
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          include: ["**/*.md", "**/*.mdx"],
          //sidebarCollapsible: false,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
          // 'https://github.com/makeplane/docs/edit/preview/',
        },
        sitemap: {
          lastmod: "date",
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
        gtag: {
          trackingID: "G-G578SD4VZD",
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=National+Park:wght@200..800&family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap',
      type: 'text/css',
    },
  ],

  scripts: [
    {
      src: 'https://plausible.io/js/script.js', defer: true, 'data-domain': 'docs.plane.so'
    }
  ],

  plugins: [
    [
      "posthog-docusaurus",
      {
        apiKey: "phc_HskAKGRy7x0BEoWfyeHzYWWzcMmKG9DCail7ot7WQkA",
        appUrl: "https://us.i.posthog.com", // optional
        enableInDevelopment: false, // optional
      },
    ],
  ],

  themeConfig: {
    metadata: [
      {property: 'og:image', content: 'https://media.docs.plane.so/logo/docs-og.webp'},
      {name: 'twitter:image', content: 'https://media.docs.plane.so/logo/docs-og.webp'}
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: false,
      },
    },
    // Replace with your project's social card
    image: "https://media.docs.plane.so/logo.svg",
    algolia: {
      appId: "AXICJJC8RP",
      apiKey: "23df4157dee1d9a8d435cadd6cae3f26",
      indexName: "plane-docs-v3",
    },
    navbar: {
      title: "",
      logo: {
        alt: "Plane",
        src: "https://media.docs.plane.so/logo/Plane.svg",
        srcDark: "https://media.docs.plane.so/logo/Plane-white.svg"
      },
      items: [
        {
          type: "search",
          position: "left",
        },
        {
          href: "https://discord.com/invite/A92xrEGCge",
          "aria-label": "Discord",
          position: "right",
          className: "navbar--discord-link",
        },
        {
          href: "https://github.com/makeplane/plane",
          "aria-label": "GitHub",
          position: "right",
          className: "navbar--github-link",
        },
        {
          href: "https://app.plane.so/sign-in",
          label: "Sign in",
          position: "right",
        },
      ],
    },
    // footer: {
    //   style: 'dark',
    //   links: [
    //     {
    //       title: 'Docs',
    //       items: [
    //         {
    //           label: 'Tutorial',
    //           to: '/docs/intro',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Community',
    //       items: [
    //         {
    //           label: 'Stack Overflow',
    //           href: 'https://stackoverflow.com/questions/tagged/docusaurus',
    //         },
    //         {
    //           label: 'Discord',
    //           href: 'https://discordapp.com/invite/docusaurus',
    //         },
    //         {
    //           label: 'Twitter',
    //           href: 'https://twitter.com/docusaurus',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'More',
    //       items: [
    //         {
    //           label: 'Blog',
    //           to: '/blog',
    //         },
    //         {
    //           label: 'GitHub',
    //           href: 'https://github.com/facebook/docusaurus',
    //         },
    //       ],
    //     },
    //   ],
    //   copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    // },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
