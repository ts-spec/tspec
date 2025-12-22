import { defineConfig } from 'vitepress'

// i18n translations
const translations = {
  en: {
    nav: { home: 'Home', guide: 'Guide' },
    sidebar: {
      introduction: 'Introduction',
      guides: 'Guides',
      gettingStarted: 'Getting Started',
      generatingDocument: 'Generating Document',
      describingSchema: 'Describing Schema',
      definingApiSpec: 'Defining API Spec',
      crudApiExample: 'CRUD API Example',
      expressIntegration: 'Express Integration',
      nestjsIntegration: 'NestJS Integration',
      apiTesting: 'API Testing',
      authentication: 'Authentication',
      fileUploadDownload: 'File Upload/Download',
      reference: 'Reference',
      troubleshooting: 'Troubleshooting',
    },
  },
  ko: {
    nav: { home: '홈', guide: '가이드' },
    sidebar: {
      introduction: '소개',
      guides: '가이드',
      gettingStarted: '시작하기',
      generatingDocument: '문서 생성',
      describingSchema: '스키마 정의',
      definingApiSpec: 'API 스펙 정의',
      crudApiExample: 'CRUD API 예제',
      expressIntegration: 'Express 연동',
      nestjsIntegration: 'NestJS 연동',
      apiTesting: 'API 테스트',
      authentication: '인증',
      fileUploadDownload: '파일 업로드/다운로드',
      reference: '레퍼런스',
      troubleshooting: '문제 해결',
    },
  },
  ja: {
    nav: { home: 'ホーム', guide: 'ガイド' },
    sidebar: {
      introduction: 'はじめに',
      guides: 'ガイド',
      gettingStarted: 'はじめる',
      generatingDocument: 'ドキュメント生成',
      describingSchema: 'スキーマ定義',
      definingApiSpec: 'API仕様定義',
      crudApiExample: 'CRUD API例',
      expressIntegration: 'Express連携',
      nestjsIntegration: 'NestJS連携',
      apiTesting: 'APIテスト',
      authentication: '認証',
      fileUploadDownload: 'ファイルアップロード/ダウンロード',
      reference: 'リファレンス',
      troubleshooting: 'トラブルシューティング',
    },
  },
  zh: {
    nav: { home: '首页', guide: '指南' },
    sidebar: {
      introduction: '介绍',
      guides: '指南',
      gettingStarted: '快速开始',
      generatingDocument: '生成文档',
      describingSchema: '定义模式',
      definingApiSpec: '定义API规范',
      crudApiExample: 'CRUD API示例',
      expressIntegration: 'Express集成',
      nestjsIntegration: 'NestJS集成',
      apiTesting: 'API测试',
      authentication: '认证',
      fileUploadDownload: '文件上传/下载',
      reference: '参考',
      troubleshooting: '故障排除',
    },
  },
} as const

type Lang = keyof typeof translations

// Shared sidebar configuration
const guideSidebar = (lang: Lang = 'en') => {
  const t = translations[lang].sidebar
  const prefix = lang === 'en' ? '' : `/${lang}`
  return [
    { text: t.introduction, link: `${prefix}/introduction` },
    {
      text: t.guides,
      items: [
        { text: t.gettingStarted, link: `${prefix}/guide/getting-started` },
        { text: t.generatingDocument, link: `${prefix}/guide/generating-document` },
        { text: t.describingSchema, link: `${prefix}/guide/describing-schema` },
        { text: t.definingApiSpec, link: `${prefix}/guide/defining-api-spec` },
        { text: t.crudApiExample, link: `${prefix}/guide/crud-api-example` },
        { text: t.expressIntegration, link: `${prefix}/guide/express-integration` },
        { text: t.nestjsIntegration, link: `${prefix}/guide/nestjs-integration` },
        { text: t.apiTesting, link: `${prefix}/guide/api-testing` },
        { text: t.authentication, link: `${prefix}/guide/authentication` },
        { text: t.fileUploadDownload, link: `${prefix}/guide/file-upload-download` },
      ]
    },
    {
      text: t.reference,
      items: [
        { text: t.troubleshooting, link: `${prefix}/guide/troubleshooting` },
      ]
    },
  ]
}

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

  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    ko: {
      label: '한국어',
      lang: 'ko',
      link: '/ko/',
      themeConfig: {
        nav: [
          { text: translations.ko.nav.home, link: '/ko/' },
          { text: translations.ko.nav.guide, link: '/ko/guide/getting-started' }
        ],
        sidebar: guideSidebar('ko'),
      }
    },
    ja: {
      label: '日本語',
      lang: 'ja',
      link: '/ja/',
      themeConfig: {
        nav: [
          { text: translations.ja.nav.home, link: '/ja/' },
          { text: translations.ja.nav.guide, link: '/ja/guide/getting-started' }
        ],
        sidebar: guideSidebar('ja'),
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: translations.zh.nav.home, link: '/zh/' },
          { text: translations.zh.nav.guide, link: '/zh/guide/getting-started' }
        ],
        sidebar: guideSidebar('zh'),
      }
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: translations.en.nav.home, link: '/' },
      { text: translations.en.nav.guide, link: '/guide/getting-started' }
    ],

    sidebar: guideSidebar('en'),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ts-spec/tspec' }
    ],

    search: {
      provider: 'local',
    },
  }
})
