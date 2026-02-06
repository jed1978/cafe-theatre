/**
 * 商品渲染與 Modal 模組
 * 處理商品卡片渲染、Modal 開關、商品詳情顯示
 */

import { products, faqs, testimonials } from "./data.js";
import { addToCart } from "./navigation.js";

/**
 * 初始化商品展示
 */
export function initProducts() {
  renderProducts();
  renderFAQs();
  renderTestimonials();
  initModal();
}

/**
 * 渲染商品卡片
 */
function renderProducts() {
  const productsGrid = document.getElementById("productsGrid");

  productsGrid.innerHTML = products
    .map(
      (product) => `
    <article class="product-card" data-id="${product.id}">
      <div class="product-card__image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="product-card__body">
        <div class="product-card__series">${product.series}</div>
        <h3 class="product-card__name">${product.name}</h3>
        <p class="product-card__flavor">${product.flavor}</p>
        <div class="product-card__footer">
          <span class="product-card__price">NT$ ${product.price}</span>
        </div>
      </div>
    </article>
  `
    )
    .join("");

  // 綁定卡片點擊事件
  productsGrid.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", () => {
      const productId = parseInt(card.dataset.id);
      showProductModal(productId);
    });
  });
}

/**
 * 渲染 FAQ 手風琴
 */
function renderFAQs() {
  const faqList = document.getElementById("faqList");

  faqList.innerHTML = faqs
    .map(
      (faq) => `
    <div class="faq-item" data-id="${faq.id}">
      <button class="faq-item__question" aria-expanded="false">
        <span>${faq.question}</span>
        <span class="faq-item__icon">+</span>
      </button>
      <div class="faq-item__answer">
        <div class="faq-item__answer-content">
          ${faq.answer}
        </div>
      </div>
    </div>
  `
    )
    .join("");

  // 綁定 FAQ 點擊事件
  faqList.querySelectorAll(".faq-item__question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const faqItem = btn.parentElement;
      const isOpen = faqItem.classList.contains("is-open");

      // 關閉所有其他 FAQ
      faqList.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("is-open");
        item.querySelector(".faq-item__question").setAttribute("aria-expanded", "false");
      });

      // 切換當前 FAQ
      if (!isOpen) {
        faqItem.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/**
 * 渲染顧客評價
 */
function renderTestimonials() {
  const testimonialsGrid = document.getElementById("testimonialsGrid");

  testimonialsGrid.innerHTML = testimonials
    .map(
      (testimonial) => `
    <div class="testimonial-card">
      <div class="testimonial-card__quote">"</div>
      <p class="testimonial-card__text">${testimonial.text}</p>
      <div class="testimonial-card__author">${testimonial.author}</div>
      <div class="testimonial-card__rating">${"★".repeat(testimonial.rating)}${"☆".repeat(
        5 - testimonial.rating
      )}</div>
    </div>
  `
    )
    .join("");
}

/**
 * 初始化 Modal 功能
 */
function initModal() {
  const modal = document.getElementById("productModal");
  const modalClose = document.getElementById("modalClose");
  const modalOverlay = document.getElementById("modalOverlay");

  // 關閉按鈕
  modalClose.addEventListener("click", closeModal);

  // 點擊遮罩關閉
  modalOverlay.addEventListener("click", closeModal);

  // ESC 鍵關閉
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

/**
 * 顯示商品 Modal
 * @param {number} productId - 商品 ID
 */
function showProductModal(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const modal = document.getElementById("productModal");
  const modalBody = document.getElementById("modalBody");

  // 渲染商品詳情
  modalBody.innerHTML = `
    <div class="product-detail">
      <div class="product-detail__image">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="product-detail__info">
        <div class="product-detail__series">${product.series}</div>
        <h2 class="product-detail__name">${product.name}</h2>

        <div class="product-detail__section">
          <h4>風味筆記</h4>
          <p class="product-detail__flavor">${product.flavor}</p>
        </div>

        <div class="product-detail__section">
          <h4>烘焙程度</h4>
          <span class="product-detail__roast">${product.roast}</span>
        </div>

        <div class="product-detail__section">
          <h4>產區</h4>
          <p>${product.origin}</p>
        </div>

        <div class="product-detail__section">
          <h4>商品故事</h4>
          <p class="product-detail__description">${product.description}</p>
        </div>

        <div class="product-detail__price">NT$ ${product.price}</div>

        <button class="btn btn--primary" id="addToCartBtn">
          加入選購
        </button>
      </div>
    </div>
  `;

  // 綁定加入購物車按鈕
  const addToCartBtn = modalBody.querySelector("#addToCartBtn");
  addToCartBtn.addEventListener("click", () => {
    addToCart(product);
    closeModal();
    // 可選：顯示成功提示
    alert(`${product.name} 已加入選購`);
  });

  // 顯示 Modal
  modal.classList.add("is-open");
  document.body.style.overflow = "hidden"; // 防止背景滾動
}

/**
 * 關閉 Modal
 */
function closeModal() {
  const modal = document.getElementById("productModal");
  modal.classList.remove("is-open");
  document.body.style.overflow = ""; // 恢復滾動
}
