import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/tspec/', // Reference: https://vitepress.dev/guide/deploy#github-pages
  title: "Tspec",
  description: "Auto-generating OpenAPI Docuemnt with TypeScript Types",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide' }
    ],

    sidebar: [
      {
        text: 'Introduction', link: '/introduction'
      },
      {
        text: 'Guides',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Defining Open API schemas', link: '/guide/advanced/DefineApiSpec' },
          { text: 'CLI', link: '/guide/cli' },
          { text: 'tspec.config Options', link: '/guide/tspec-config' },
          { text: 'Troubleshooting', link: '/guide/advanced/TroubleShooting' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ts-spec/tspec' }
    ]
  }
})
