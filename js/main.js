// 咖啡小劇場 - 主程式（Tailwind 版本）

import { products, faqs, testimonials } from "./data.js";

// ===== 全域狀態 =====
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// ===== 初始化 =====
document.addEventListener("DOMContentLoaded", () => {
  initProducts();
  initFAQ();
  initTestimonials();
  initCart();
  initModal();
  initForm();
  initNavigation();
  updateCartUI();
});

// ===== 商品渲染 =====
function initProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = products
    .map(
      (product) => `
    <div class="group flex flex-col" data-product-id="${product.id}">
      <div class="relative bg-[#f8f6f6] rounded-lg p-8 mb-6 overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:shadow-gray-200 cursor-pointer">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <img
          alt="${product.name}"
          class="relative z-10 w-full h-64 object-contain transform group-hover:scale-110 transition-transform duration-500"
          src="${product.image}"
          loading="lazy"
        />
        <div class="absolute top-4 right-4 z-20">
          <span class="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">${product.series}</span>
        </div>
      </div>
      <div class="flex justify-between items-start mb-2">
        <div>
          <h3 class="font-serif text-2xl font-bold group-hover:text-primary transition-colors">${product.name}</h3>
          <p class="text-sm text-text-muted mt-1">${product.flavor}</p>
        </div>
        <span class="font-bold text-xl">NT$ ${product.price}</span>
      </div>
      <button
        class="w-full mt-4 py-3 border border-gray-200 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 flex items-center justify-center gap-2"
        onclick="addToCart(${product.id})"
      >
        <span class="material-symbols-outlined text-lg">confirmation_number</span>
        加入選購
      </button>
    </div>
  `
    )
    .join("");

  // 點擊商品卡片打開 Modal
  grid.querySelectorAll('[data-product-id]').forEach(card => {
    const productImg = card.querySelector('.relative.bg-\\[\\#f8f6f6\\]');
    if (productImg) {
      productImg.addEventListener('click', () => {
        const productId = parseInt(card.dataset.productId);
        openProductModal(productId);
      });
    }
  });
}

// ===== FAQ 渲染 =====
function initFAQ() {
  const list = document.getElementById("faqList");
  if (!list) return;

  list.innerHTML = faqs
    .map(
      (faq, index) => `
    <div class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-primary/30 transition-colors">
      <button
        class="w-full p-6 flex justify-between items-center text-left group"
        onclick="toggleFAQ(${index})"
        aria-expanded="false"
      >
        <span class="font-bold text-text-main group-hover:text-primary transition-colors">${faq.question}</span>
        <span class="material-symbols-outlined text-primary transform transition-transform duration-300" id="faq-icon-${index}">
          add
        </span>
      </button>
      <div
        class="overflow-hidden transition-all duration-300 max-h-0"
        id="faq-answer-${index}"
      >
        <div class="p-6 pt-0 text-text-muted leading-relaxed">
          ${faq.answer}
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// FAQ 切換
window.toggleFAQ = function (index) {
  const answer = document.getElementById(`faq-answer-${index}`);
  const icon = document.getElementById(`faq-icon-${index}`);
  const button = answer.previousElementSibling;

  const isOpen = answer.style.maxHeight && answer.style.maxHeight !== "0px";

  if (isOpen) {
    answer.style.maxHeight = "0px";
    icon.textContent = "add";
    button.setAttribute("aria-expanded", "false");
  } else {
    answer.style.maxHeight = answer.scrollHeight + "px";
    icon.textContent = "remove";
    button.setAttribute("aria-expanded", "true");
  }
};

// ===== 顧客評價渲染 =====
function initTestimonials() {
  const grid = document.getElementById("testimonialsGrid");
  if (!grid) return;

  grid.innerHTML = testimonials
    .map(
      (t) => `
    <div class="bg-white border border-gray-200 border-l-4 border-l-primary rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div class="text-primary text-5xl font-serif mb-4 opacity-30">"</div>
      <p class="text-text-muted leading-relaxed mb-6">${t.text}</p>
      <div class="flex justify-between items-center">
        <div>
          <p class="font-bold text-text-main">${t.author}</p>
          <p class="text-sm text-text-muted">${t.date}</p>
        </div>
        <div class="text-primary text-sm">
          ${"★".repeat(t.rating)}${"☆".repeat(5 - t.rating)}
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// ===== 購物車功能 =====
function initCart() {
  document.getElementById("navCart")?.addEventListener("click", toggleCart);
  document.getElementById("cartSidebarClose")?.addEventListener("click", toggleCart);
  document.getElementById("goToOrder")?.addEventListener("click", () => {
    toggleCart();
    setTimeout(() => {
      document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  });
}

function toggleCart() {
  const sidebar = document.getElementById("cartSidebar");
  const isOpen = !sidebar.classList.contains("translate-x-full");

  if (isOpen) {
    sidebar.classList.add("translate-x-full");
  } else {
    sidebar.classList.remove("translate-x-full");
  }
}

window.addToCart = function (productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartUI();
  toggleCart();
};

window.updateQuantity = function (productId, change) {
  const item = cart.find((i) => i.id === productId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter((i) => i.id !== productId);
  }

  saveCart();
  updateCartUI();
};

window.removeFromCart = function (productId) {
  cart = cart.filter((i) => i.id !== productId);
  saveCart();
  updateCartUI();
};

function saveCart() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 更新導覽列計數
  const cartCount = document.getElementById("cartCount");
  if (cartCount) cartCount.textContent = count;

  // 更新側邊欄
  const cartBody = document.getElementById("cartSidebarBody");
  const cartTotal = document.getElementById("cartTotal");

  if (cartBody) {
    if (cart.length === 0) {
      cartBody.innerHTML = '<p class="text-text-muted text-center py-8">尚未選購任何商品</p>';
    } else {
      cartBody.innerHTML = cart
        .map(
          (item) => `
        <div class="border border-gray-200 rounded-lg p-4 mb-4">
          <div class="flex gap-4">
            <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded" />
            <div class="flex-1">
              <h4 class="font-bold text-text-main">${item.name}</h4>
              <p class="text-sm text-text-muted">${item.series}</p>
              <p class="text-primary font-bold mt-1">NT$ ${item.price}</p>
            </div>
          </div>
          <div class="flex justify-between items-center mt-4">
            <div class="flex items-center gap-2">
              <button
                onclick="updateQuantity(${item.id}, -1)"
                class="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center transition-colors"
              >
                <span class="material-symbols-outlined text-sm">remove</span>
              </button>
              <span class="w-8 text-center font-bold">${item.quantity}</span>
              <button
                onclick="updateQuantity(${item.id}, 1)"
                class="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center transition-colors"
              >
                <span class="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
            <button
              onclick="removeFromCart(${item.id})"
              class="text-red-500 hover:text-red-700 transition-colors"
            >
              <span class="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
      `
        )
        .join("");
    }
  }

  if (cartTotal) cartTotal.textContent = `NT$ ${total}`;

  // 更新表單中的商品列表
  updateFormProducts();
}

function updateFormProducts() {
  const container = document.getElementById("selectedProducts");
  const totalElement = document.getElementById("totalAmount");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<p class="text-text-muted text-sm">請先點選商品加入選購</p>';
    if (totalElement) totalElement.textContent = "NT$ 0";
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  container.innerHTML = cart
    .map(
      (item) => `
    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
      <div>
        <span class="font-medium">${item.name}</span>
        <span class="text-text-muted text-sm ml-2">x${item.quantity}</span>
      </div>
      <span class="font-bold">NT$ ${item.price * item.quantity}</span>
    </div>
  `
    )
    .join("");

  if (totalElement) totalElement.textContent = `NT$ ${total}`;
}

// ===== Modal 功能 =====
function initModal() {
  const modal = document.getElementById("productModal");
  const closeBtn = document.getElementById("modalClose");
  const overlay = modal;

  closeBtn?.addEventListener("click", closeModal);
  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function openProductModal(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const modal = document.getElementById("productModal");
  const modalBody = document.getElementById("modalBody");

  modalBody.innerHTML = `
    <div class="grid md:grid-cols-2 gap-8">
      <div class="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
        <img src="${product.image}" alt="${product.name}" class="w-full max-w-sm object-contain" />
      </div>
      <div class="space-y-6">
        <div>
          <span class="text-primary font-bold text-sm uppercase tracking-wider">${product.series}</span>
          <h2 class="font-serif text-4xl font-bold text-text-main mt-2">${product.name}</h2>
        </div>

        <div>
          <h4 class="font-bold text-primary mb-2 flex items-center gap-2">
            <span class="material-symbols-outlined">spa</span>
            風味描述
          </h4>
          <p class="text-text-muted">${product.flavor}</p>
        </div>

        <div>
          <h4 class="font-bold text-primary mb-2 flex items-center gap-2">
            <span class="material-symbols-outlined">local_fire_department</span>
            烘焙程度
          </h4>
          <div class="flex items-center gap-2">
            <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-primary" style="width: ${
                product.roast === "淺焙" ? "33%" : product.roast === "中焙" ? "66%" : "100%"
              }"></div>
            </div>
            <span class="text-sm font-medium">${product.roast}</span>
          </div>
        </div>

        <div>
          <h4 class="font-bold text-primary mb-2 flex items-center gap-2">
            <span class="material-symbols-outlined">public</span>
            產區
          </h4>
          <p class="text-text-muted">${product.origin}</p>
        </div>

        <div>
          <h4 class="font-bold text-primary mb-2 flex items-center gap-2">
            <span class="material-symbols-outlined">description</span>
            商品故事
          </h4>
          <p class="text-text-muted leading-relaxed">${product.description}</p>
        </div>

        <div class="border-t border-gray-200 pt-6 flex justify-between items-center">
          <div>
            <p class="text-sm text-text-muted">價格</p>
            <p class="text-3xl font-bold text-primary">NT$ ${product.price}</p>
          </div>
          <button
            onclick="addToCart(${product.id}); closeModal();"
            class="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-bold transition-all flex items-center gap-2"
          >
            <span class="material-symbols-outlined">add_shopping_cart</span>
            加入選購
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

window.closeModal = function () {
  const modal = document.getElementById("productModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
};

// ===== 表單功能 =====
function initForm() {
  const form = document.getElementById("orderForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("請先選購商品");
      return;
    }

    // 驗證
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const store = document.getElementById("store").value.trim();

    if (!name || !phone || !store) {
      alert("請填寫必填欄位");
      return;
    }

    // 手機號碼驗證
    if (!/^09\d{8}$/.test(phone)) {
      alert("請輸入有效的手機號碼（09開頭，共10碼）");
      return;
    }

    // 顯示成功訊息
    form.classList.add("hidden");
    document.getElementById("formSuccess").classList.remove("hidden");

    // 清空購物車
    cart = [];
    saveCart();
    updateCartUI();

    // 3秒後重置
    setTimeout(() => {
      form.classList.remove("hidden");
      form.reset();
      document.getElementById("formSuccess").classList.add("hidden");
    }, 3000);
  });
}

// ===== 導覽列滾動效果 =====
function initNavigation() {
  const nav = document.getElementById("nav");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
      nav.classList.add("shadow-lg");
    } else {
      nav.classList.remove("shadow-lg");
    }

    lastScroll = currentScroll;
  });

  // 平滑滾動
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}
