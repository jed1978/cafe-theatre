/**
 * 主程式入口
 * 整合所有模組並初始化應用程式
 */

import { initNavigation } from "./navigation.js";
import { initProducts } from "./products.js";
import { initScrollAnimations } from "./scroll-animations.js";
import { initForm } from "./form.js";

/**
 * DOM 載入完成後執行
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎭 咖啡小劇場 - 初始化中...");

  // 標記 JavaScript 已載入，啟用動畫
  document.body.classList.add("js-enabled");

  // 初始化各模組
  initNavigation();
  initProducts();
  initScrollAnimations();
  initForm();

  // 聚光燈效果（Hero 區）
  initSpotlight();

  console.log("✅ 所有模組已載入完成");
});

/**
 * 初始化聚光燈效果
 * 滑鼠移動時更新 CSS 變數，產生追隨效果
 */
function initSpotlight() {
  const hero = document.querySelector(".hero");

  if (!hero) return;

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    document.documentElement.style.setProperty("--spotlight-x", `${x}%`);
    document.documentElement.style.setProperty("--spotlight-y", `${y}%`);
  });
}
