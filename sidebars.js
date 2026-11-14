// @ts-check
// 側邊欄依手冊根目錄 README.md「目錄」的順序與名稱排列；
// 各區內的頁面依該區 README.md 列出分頁的順序排列。
// 手冊新增、刪除頁面時，記得同步更新這個檔案。

/**
 * 有分頁的區塊：分類首頁是該區的 README.md。
 * @param {string} label
 * @param {string} dir
 * @param {string[]} pages
 */
const section = (label, dir, pages) => ({
  type: 'category',
  label,
  link: {type: 'doc', id: `${dir}/README`},
  collapsed: true,
  items: pages.map((p) => `${dir}/${p}`),
});

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  manual: [
    {type: 'doc', id: 'README', label: '手冊目錄'},
    {
      type: 'category',
      label: '開始使用',
      collapsed: false,
      items: [
        {type: 'doc', id: 'getting-started', label: '快速入門'},
        {type: 'doc', id: 'mobile', label: '手機版'},
      ],
    },
    {
      type: 'category',
      label: '頂部選單',
      collapsed: false,
      items: [
        {type: 'doc', id: 'home', label: '首頁'},
        section('個股分析', 'stock', [
          'kline', 'intraday', 'replay', 'report', 'broker', 'bubble', 'map', 'detail',
          'fundamental', 'news', 'health', 'derivatives', 'pairs', 'warrants', 'events',
          'warrant-page',
        ]),
        section('策略選股', 'screener', [
          'screener', 'library', 'signals', 'lab', 'portfolio', 'signal-stats', 'conditions',
        ]),
        section('大盤籌碼', 'market', [
          'chips', 'preopen', 'regime', 'live', 'sectors', 'rankings', 'events', 'flow',
          'rotation', 'global', 'active-etf', 'index-weight', 'warrants', 'group',
          'group-compare',
        ]),
        section('個股事件', 'events', ['calendar', 'dividends', 'backtest', 'rankings']),
        section('處置雷達', 'disposition', ['daily', 'outlook', 'active', 'pairs', 'stats', 'rules']),
        section('反轉價位', 'reversal', ['list', 'live', 'backtest']),
        section('期權', 'derivatives', ['basis', 'arbitrage', 'futures', 'options', 'chips', 'calendar']),
        section('可轉債', 'cb', ['mainforce', 'signals', 'arbitrage', 'cbas', 'yield']),
        section('分點研究', 'brokers', [
          'abnormal', 'focus', 'masters', 'important', 'lookup', 'watch', 'groups', 'key',
          'broker-page', 'broker-warrants',
        ]),
        {type: 'doc', id: 'monitor', label: '看盤室'},
        section('當沖監控', 'daytrade', ['board', 'strategies', 'stream', 'review', 'stats']),
        {type: 'doc', id: 'live', label: '盤中監控'},
        {type: 'doc', id: 'watchlist', label: '自選股（含左側自選欄）'},
        {type: 'doc', id: 'portfolio', label: '持股'},
        {type: 'doc', id: 'alerts/README', label: '警示中心（右上角鈴鐺）'},
        {type: 'doc', id: 'assistant/README', label: 'AI 助手'},
        {type: 'doc', id: 'assistant/briefing', label: 'AI 每日摘要'},
        {type: 'doc', id: 'settings', label: '設定'},
        {type: 'doc', id: 'system', label: '資料狀態（系統）'},
      ],
    },
    {
      type: 'category',
      label: '參考',
      collapsed: false,
      items: [
        {type: 'doc', id: 'reference/data-sources', label: '資料來源與更新時間'},
        {type: 'doc', id: 'reference/glossary', label: '名詞解釋'},
        {type: 'doc', id: 'faq', label: '常見問題'},
      ],
    },
  ],
};

export default sidebars;
