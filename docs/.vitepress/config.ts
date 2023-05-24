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
        text: 'Introduction',
        items: [
          { text: 'Why Tspec', link: '/guide/why-tspec' },
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'CLI', link: '/guide/cli' },
          { text: 'tspec.config Options', link: '/guide/tspec-config' },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ts-spec/tspec' }
    ]
  }
})
