import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  title: "Livewire PowerGrid",
  description: "PowerGrid Docs",
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `/_media/logomark@2x.png`,
      },
    ],
    ['meta', { name: 'og:title', content: 'Livewire Powergrid - Version 5'}],
    ['meta', { name: 'og:description', content: 'Livewire PowerGrid is a component for generating dynamic tables with your Laravel Models and Collections.'}],
    ['meta', { name: 'application-name', content: 'Livewire Powergrid' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Livewire Powergrid' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],
  markdown: {
    toc: {
        level: [2, 2],
      },
        anchor: { level: [1, 2, 3] },
  },
  appearance: 'dark',
  lang: 'en-US',
  themeConfig: {
    outline: [2, 3],
    logo: '/_media/logomark@1x.png',
    siteTitle: 'Livewire PowerGrid',
    nav: [
      { text: 'Home', link: '/' },
      {
        text: '5.x',
        items: [
          {
            text: '4.x',
            link: 'https://github.com/Power-Components/powergrid-doc/tree/4x/docs'
          },
          {
            text: '3.x',
            link: 'https://github.com/Power-Components/powergrid-doc/tree/3x/docs'
          },
          {
            text: '2.x',
            link: 'https://github.com/Power-Components/powergrid-doc/tree/2x/docs'
          }
        ]
      }
    ],

    sidebar: [
      {
        text: '📄 Release Notes & Upgrade',
        items: [
          { text: 'Release Notes', link: '/release-notes-and-upgrade/release-notes' },
          { text: 'Upgrade Guide', link: '/release-notes-and-upgrade/upgrade-guide' },
        ],
        collapsed: true
      },
      {
        text: '🚀 Get Started',
        items: [
          { text: 'Introduction', link: '/get-started/introduction' },
          { text: 'Code Examples', link: '/get-started/code-examples' },
          { text: 'Troubleshooting', link: '/get-started/troubleshooting' },
          { text: '1. Install', link: '/get-started/install' },
          { text: '2. Configure PowerGrid', link: '/get-started/configure' },
          { text: '3. Create a PowerGrid Table', link: '/get-started/create-powergrid-table' },
          { text: '4. Using the component', link: '/get-started/using-the-component' },
        ],
        collapsed: false
      },
      {
        text: '🛠️ Table Component',
        items: [
          { text: 'Datasource', link: '/table-component/datasource' },
          { text: 'Fields ', link: '/table-component/fields' },
          { text: '👷‍♂️Columns', link: '/table-component/columns' },
          { text: '❌General Configuration', link: '/table-component/general-configuration' },
        ],
        collapsed: false,
        collapsible: false,
      },
      {
        text: '🧰 Table Features',
        items: [
          { text: '❌Column Features', link: '/table-features/column-summary' },
          { text: '❌Cell Features', link: '/table-features/cell-actions-buttons' },
          { text: '❌Row Features', link: '/table-features/row-features' },
          { text: '❌Conditional Action Rules', link: '/table-features/action-rules' },
          { text: '❌Table Filters', link: '/table-features/table-filters' },
          { text: '❌Table Header & Footer', link: '/table-features/table-header-footer' },
          { text: '❌Table Data Sorting', link: '/table-features/table-data-sorting' },
          { text: '❌Table Data Export', link: '/table-features/table-data-export' },
          { text: '❌Table Events', link: '/table-features/table-events' },
        ],
        collapsed: false,
        collapsible: false,
      },
      {
        text: '⚡ Extending PowerGrid',
        items: [
          { text: 'Custom Theme', link: '/table/custom-theme' },
        ],
        collapsed: true
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Power-Components/powergrid-doc' },
      { icon: 'twitter', link: 'https://twitter.com/luanfreitasdev' },
      { icon: 'twitter', link: 'https://twitter.com/dansysanalyst' },
    ],
    footer: {
      message: 'Created By Luan Freitas and @DanSysAnalyst',
    },
    editLink: {
      pattern: 'https://github.com/power-components/powergrid-doc/edit/5x/docs/:path',
      text: 'Edit this page on GitHub'
    },
    search: {
      provider: 'algolia',
      options: {
        appId: '7M4C366U6U',
        apiKey: '0a0022f159f38849b0dbd2199c12f081',
        indexName: 'livewire-powergridLivewire PowerGrid Site',
      }
    }
  },
  sitemap: {
    hostname: 'https://livewire-powergrid.com'
  }
})
