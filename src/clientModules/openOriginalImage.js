// 點圖放大的補充：放大後不會明顯變大的圖，改成在新分頁開原圖。
//
// medium-zoom 會把圖縮放到整張塞進視窗。很長的截圖（例如個股事件頁 1600×6023）在桌面點開後反而變小，
// 手機上內文圖已經接近螢幕寬度，放大也只多幾個像素。這兩種情況直接開原圖，讀者可以用瀏覽器自己的縮放與捲動看細節。
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// 要與 docusaurus.config.js 的 themeConfig.zoom.config.margin 相同
const ZOOM_MARGIN = 12;
// 放大倍率低於這個值就當成「不會明顯變大」
const MIN_USEFUL_SCALE = 1.15;

// 與 medium-zoom 相同的算法：放大後不超過原始像素，也不超過視窗扣掉邊距
function zoomScale(img) {
  const width = img.offsetWidth;
  const height = img.offsetHeight;
  if (!width || !height || !img.naturalWidth || !img.naturalHeight) {
    return null;
  }
  const viewportWidth = document.documentElement.clientWidth - ZOOM_MARGIN * 2;
  const viewportHeight = document.documentElement.clientHeight - ZOOM_MARGIN * 2;
  const scaleX = Math.min(Math.max(width, img.naturalWidth), viewportWidth) / width;
  const scaleY = Math.min(Math.max(height, img.naturalHeight), viewportHeight) / height;
  return Math.min(scaleX, scaleY);
}

if (ExecutionEnvironment.canUseDOM) {
  // 在 document 的捕獲階段處理，早於 medium-zoom 綁在圖片上的監聽器
  document.addEventListener(
    'click',
    (event) => {
      const img = event.target;
      if (!(img instanceof HTMLImageElement) || !img.closest('.theme-doc-markdown')) {
        return;
      }
      // 已經放大的圖：讓 medium-zoom 自己關閉
      if (img.classList.contains('medium-zoom-image--opened')) {
        return;
      }
      if (event.button !== 0) {
        return;
      }
      const scale = zoomScale(img);
      if (scale === null || scale >= MIN_USEFUL_SCALE) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      window.open(img.currentSrc || img.src, '_blank', 'noopener');
    },
    true,
  );
}
