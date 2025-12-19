import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/tspec/', // Reference: https://vitepress.dev/guide/deploy#github-pages
  title: "Tspec",
  description: "Auto-generating OpenAPI Document with TypeScript Types",
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/tspec/assets/icons/tspec-icon-128.png' }],
    ['link', { rel: 'apple-touch-icon', href: '/tspec/assets/icons/tspec-icon-128.png' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    ['meta', { name: 'keywords', content: 'tspec, typescript, openapi, swagger, api documentation, type-driven, code first, rest api, esm, commonjs, nestjs, express' }],
    ['meta', { name: 'author', content: 'ts-spec' }],
    ['link', { rel: 'canonical', href: 'https://ts-spec.github.io/tspec/' }],
    // Open Graph
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Tspec' }],
    ['meta', { property: 'og:title', content: 'Tspec - Type-driven API Documentation' }],
    ['meta', { property: 'og:description', content: 'Auto-generate OpenAPI spec from TypeScript types. Zero config, no decorators, no transformers. Works with CommonJS & ESM.' }],
    ['meta', { property: 'og:url', content: 'https://ts-spec.github.io/tspec/' }],
    ['meta', { property: 'og:image', content: 'https://ts-spec.github.io/tspec/assets/icons/tspec-icon-128.png' }],
    // Twitter Card
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: 'Tspec - Type-driven API Documentation' }],
    ['meta', { name: 'twitter:description', content: 'Auto-generate OpenAPI spec from TypeScript types. Zero config, works with CommonJS & ESM.' }],
  ],

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
          { text: 'Express Integration', link: '/guide/express-integration' },
          { text: 'NestJS Integration', link: '/guide/nestjs-integration' },
          { text: 'API Testing', link: '/guide/api-testing' },
          { text: 'Authentication', link: '/guide/authentication' },
          { text: 'File Upload/Download', link: '/guide/file-upload-download' },
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
