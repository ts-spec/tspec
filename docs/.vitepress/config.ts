import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/tspec/', // Reference: https://vitepress.dev/guide/deploy#github-pages
  title: "Tspec",
  description: "Auto-generating OpenAPI Document with TypeScript Types",
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' }
    ],

    sidebar: [
      {
        text: 'Introduction', link: '/introduction'
      },
      {
        text: 'Guides',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Generating Document', link: '/guide/generating-document' },
          { text: 'Describing Schema', link: '/guide/describing-schema' },
          { text: 'Defining API Spec', link: '/guide/defining-api-spec' },
          { text: 'CRUD API Example', link: '/guide/crud-api-example' },
          { text: 'Express Integration', link: '/guide/express-integration' }, // with Request validation
          { text: 'API Testing', link: '/guide/api-testing' },
          { text: 'Authentication', link: '/guide/authentication' },
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Troubleshooting', link: '/guide/troubleshooting' },
          // { text: 'CLI', link: '/guide/cli' },
          // { text: 'tspec.config Options', link: '/guide/tspec-config' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ts-spec/tspec' }
    ],

    search: {
      provider: 'local',
    },
  }
})
