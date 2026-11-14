// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'TwChipDesk 使用手冊',
  tagline: 'TwChipDesk 每一個頁面、分頁與功能的使用說明',

  url: 'https://yuno-liu.github.io',
  baseUrl: '/twchipdesk-manual/',
  organizationName: 'Yuno-Liu',
  projectName: 'twchipdesk-manual',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',

  i18n: {
    defaultLocale: 'zh-Hant',
    locales: ['zh-Hant'],
  },

  markdown: {
    // .md 以 CommonMark 解析（不當成 MDX），內文的 < > { } 不會造成建置失敗
    format: 'detect',
    parseFrontMatter: async (params) => {
      const result = await params.defaultParseFrontMatter(params);
      // 手冊每頁第一行是 <!-- routes: ... --> 註記，Docusaurus 因此抓不到標題；
      // 改用第一個「# 標題」當頁面標題，側邊欄名稱取「區名｜分頁名」的分頁名。
      const heading = /^#\s+(.+?)\s*$/m.exec(result.content)?.[1];
      if (heading && !result.frontMatter.title) {
        result.frontMatter.title = heading;
        if (!result.frontMatter.sidebar_label && heading.includes('｜')) {
          result.frontMatter.sidebar_label = heading.split('｜').at(-1);
        }
      }
      // 與資料夾同名的檔案（例如 screener/screener.md）會被 Docusaurus 當成分類首頁，
      // 與該區 README.md 搶同一個網址；這類檔案改用 <資料夾>/<檔名> 的網址。
      const parts = params.filePath.split(/[\\/]/);
      const name = parts.at(-1)?.replace(/\.mdx?$/, '');
      const dir = parts.at(-2);
      if (name && dir && name === dir && !result.frontMatter.slug) {
        result.frontMatter.slug = `/${dir}/${name}`;
      }
      return result;
    },
    hooks: {
      // 斷連結與缺圖都讓建置失敗
      onBrokenMarkdownLinks: 'throw',
      onBrokenMarkdownImages: 'throw',
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  // 點內文截圖放大預覽（medium-zoom，打包進網站，不從 CDN 載入）
  plugins: ['docusaurus-plugin-image-zoom'],
  // 放大後不會明顯變大的圖（很長的截圖、手機上的所有圖）改在新分頁開原圖
  clientModules: ['./src/clientModules/openOriginalImage.js'],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      ({
        hashed: true,
        language: ['zh', 'en'],
        docsRouteBasePath: '/',
        indexBlog: false,
        highlightSearchTermsOnTargetPage: true,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'TwChipDesk 使用手冊',
        items: [],
      },
      footer: {
        style: 'light',
        copyright: '本手冊說明的所有數字都是資料整理與統計結果，不構成任何投資意見。',
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      colorMode: {
        respectPrefersColorScheme: true,
      },
      zoom: {
        // 只選手冊內文的圖片；導覽列、側邊欄、頁尾與搜尋頁不在 .theme-doc-markdown 內
        selector: '.theme-doc-markdown img',
        background: {
          light: 'rgba(255, 255, 255, 0.95)',
          dark: 'rgba(27, 27, 29, 0.95)',
        },
        config: {
          // 邊距同時套用桌面與手機；手機 390 寬時內文圖已約 358 寬，邊距再大放大後反而變窄。
          // 改這個值時 src/clientModules/openOriginalImage.js 的 ZOOM_MARGIN 要一起改
          margin: 12,
        },
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
