/**
 * 滾動動畫模組
 * 使用 Intersection Observer API 實現滾動淡入效果
 */

/**
 * 初始化滾動動畫
 */
export function initScrollAnimations() {
  const sections = document.querySelectorAll(".section");

  // 建立 Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // 動畫只觸發一次，觀察後解除
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.2, // 當 20% 進入視窗時觸發
    }
  );

  // 觀察所有 section
  sections.forEach((section) => {
    observer.observe(section);
  });
}
