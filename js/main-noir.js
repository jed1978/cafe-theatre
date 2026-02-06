// 咖啡小劇場 - Noir 版本主程式

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

// 根據烘焙度返回對應顏色
function getProductColor(roast) {
  if (roast === "深焙") return "blood-red";
  if (roast === "淺焙") return "clue-amber";
  return "gray-500";
}

// ===== 商品渲染 (Noir 風格) =====
function initProducts() {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  grid.innerHTML = products
    .map(
      (product) => `
    <div class="group flex flex-col bg-shadow-grey border border-white/10 hover:border-${getProductColor(product.roast)} transition-all" data-product-id="${product.id}">
      <div class="relative overflow-hidden aspect-[4/5] bg-noir-black cursor-pointer">
        <img
          alt="${product.name}"
          class="w-full h-full object-contain grayscale brightness-50 group-hover:brightness-90 transition-all duration-700"
          src="${product.image}"
          loading="lazy"
        />
        <div class="absolute inset-0 vignette-overlay opacity-80"></div>
        <div class="absolute top-6 left-6 rotate-[-15deg] bg-white text-noir-black px-4 py-1 font-bold shadow-xl border-2 border-dashed border-gray-400">
          <p class="text-[10px] leading-tight">證據標籤</p>
          <p class="text-sm">${product.series}</p>
        </div>
      </div>
      <div class="p-8 space-y-4">
        <div class="flex justify-between items-end">
          <h3 class="font-headline text-4xl text-white group-hover:text-${getProductColor(product.roast)} transition-colors">${product.name}</h3>
          <span class="text-clue-amber font-bold">$${product.price}</span>
        </div>
        <p class="text-xs text-gray-500 border-t border-white/5 pt-4 uppercase tracking-widest">檔案: ${product.flavor}</p>
        <button
          class="w-full bg-noir-black border border-white/20 py-4 font-headline text-xl text-white hover:bg-${getProductColor(product.roast)} hover:border-${getProductColor(product.roast)} transition-all flex items-center justify-center gap-3"
          onclick="addToCart(${product.id})"
        >
          <span class="material-symbols-outlined text-lg">fact_check</span>
          沒收
        </button>
      </div>
    </div>
  `
    )
    .join("");

  // 點擊商品卡片打開 Modal
  grid.querySelectorAll('[data-product-id]').forEach(card => {
    const productImg = card.querySelector('.relative.overflow-hidden');
    if (productImg) {
      productImg.addEventListener('click', () => {
        const productId = parseInt(card.dataset.productId);
        openProductModal(productId);
      });
    }
  });
}

// ===== FAQ 渲染 (Noir 風格) =====
function initFAQ() {
  const list = document.getElementById("faqList");
  if (!list) return;

  list.innerHTML = faqs
    .map(
      (faq, index) => `
    <div class="bg-shadow-grey border border-white/10 overflow-hidden hover:border-clue-amber/30 transition-colors">
      <button
        class="w-full p-6 flex justify-between items-center text-left group"
        onclick="toggleFAQ(${index})"
        aria-expanded="false"
      >
        <span class="font-headline text-white tracking-wider group-hover:text-clue-amber transition-colors">${faq.question}</span>
        <span class="material-symbols-outlined text-clue-amber transform transition-transform duration-300" id="faq-icon-${index}">
          add
        </span>
      </button>
      <div
        class="overflow-hidden transition-all duration-300 max-h-0"
        id="faq-answer-${index}"
      >
        <div class="p-6 pt-0 text-gray-400 leading-relaxed">
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

// ===== 顧客評價渲染 (Noir 風格 - 證人證詞) =====
function initTestimonials() {
  const grid = document.getElementById("testimonialsGrid");
  if (!grid) return;

  grid.innerHTML = testimonials
    .map(
      (t) => `
    <div class="bg-shadow-grey border border-white/10 border-l-4 border-l-blood-red p-6 hover:shadow-lg transition-shadow">
      <div class="text-[10px] text-clue-amber mb-2 uppercase tracking-widest font-bold">證人證詞 #${Math.floor(Math.random() * 9000) + 1000}</div>
      <p class="text-gray-400 leading-relaxed mb-6 italic">"${t.text}"</p>
      <div class="flex justify-between items-center border-t border-white/5 pt-4">
        <div>
          <p class="font-headline text-white tracking-wider">${t.author}</p>
          <p class="text-xs text-gray-500">${t.date}</p>
        </div>
        <div class="text-clue-amber text-sm font-bold">
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

  // 更新側邊欄 (Noir 風格)
  const cartBody = document.getElementById("cartSidebarBody");
  const cartTotal = document.getElementById("cartTotal");

  if (cartBody) {
    if (cart.length === 0) {
      cartBody.innerHTML = '<p class="text-gray-400 text-center py-8">尚無沒收證物</p>';
    } else {
      cartBody.innerHTML = cart
        .map(
          (item) => `
        <div class="border border-white/10 bg-noir-black rounded p-4 mb-4">
          <div class="flex gap-4">
            <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded grayscale" />
            <div class="flex-1">
              <h4 class="font-headline text-white tracking-wider">${item.name}</h4>
              <p class="text-xs text-gray-500">${item.series}</p>
              <p class="text-clue-amber font-bold mt-1">NT$ ${item.price}</p>
            </div>
          </div>
          <div class="flex justify-between items-center mt-4">
            <div class="flex items-center gap-2">
              <button
                onclick="updateQuantity(${item.id}, -1)"
                class="w-8 h-8 bg-shadow-grey hover:bg-blood-red rounded flex items-center justify-center transition-colors text-white"
              >
                <span class="material-symbols-outlined text-sm">remove</span>
              </button>
              <span class="w-8 text-center font-headline text-white">${item.quantity}</span>
              <button
                onclick="updateQuantity(${item.id}, 1)"
                class="w-8 h-8 bg-shadow-grey hover:bg-blood-red rounded flex items-center justify-center transition-colors text-white"
              >
                <span class="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
            <button
              onclick="removeFromCart(${item.id})"
              class="text-blood-red hover:text-red-700 transition-colors"
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
    container.innerHTML = '<p class="text-gray-400 text-sm">請先選擇嫌疑人</p>';
    if (totalElement) totalElement.textContent = "NT$ 0";
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  container.innerHTML = cart
    .map(
      (item) => `
    <div class="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
      <div>
        <span class="font-headline text-white tracking-wider">${item.name}</span>
        <span class="text-gray-400 text-sm ml-2">x${item.quantity}</span>
      </div>
      <span class="font-headline text-clue-amber">NT$ ${item.price * item.quantity}</span>
    </div>
  `
    )
    .join("");

  if (totalElement) totalElement.textContent = `NT$ ${total}`;
}

// ===== Modal 功能 (Noir 風格) =====
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
      <div class="bg-noir-black rounded p-8 flex items-center justify-center relative">
        <img src="${product.image}" alt="${product.name}" class="w-full max-w-sm object-contain grayscale brightness-75" />
        <div class="absolute inset-0 vignette-overlay opacity-60"></div>
      </div>
      <div class="space-y-6">
        <div>
          <span class="text-clue-amber font-headline text-sm uppercase tracking-wider">${product.series}</span>
          <h2 class="font-headline text-5xl text-white mt-2 tracking-wider">${product.name}</h2>
        </div>

        <div>
          <h4 class="font-headline text-blood-red mb-2 flex items-center gap-2 tracking-wider">
            <span class="material-symbols-outlined">spa</span>
            風味檔案
          </h4>
          <p class="text-gray-400">${product.flavor}</p>
        </div>

        <div>
          <h4 class="font-headline text-blood-red mb-2 flex items-center gap-2 tracking-wider">
            <span class="material-symbols-outlined">local_fire_department</span>
            烘焙程度
          </h4>
          <div class="flex items-center gap-2">
            <div class="flex-1 h-3 bg-noir-black border border-white/10 p-1">
              <div class="h-full bg-${getProductColor(product.roast)}" style="width: ${
                product.roast === "淺焙" ? "33%" : product.roast === "中焙" ? "66%" : "100%"
              }"></div>
            </div>
            <span class="text-sm font-headline tracking-wider text-white">${product.roast}</span>
          </div>
        </div>

        <div>
          <h4 class="font-headline text-blood-red mb-2 flex items-center gap-2 tracking-wider">
            <span class="material-symbols-outlined">public</span>
            來源地點
          </h4>
          <p class="text-gray-400">${product.origin}</p>
        </div>

        <div>
          <h4 class="font-headline text-blood-red mb-2 flex items-center gap-2 tracking-wider">
            <span class="material-symbols-outlined">description</span>
            案件詳情
          </h4>
          <p class="text-gray-400 leading-relaxed italic">${product.description}</p>
        </div>

        <div class="border-t border-white/10 pt-6 flex justify-between items-center">
          <div>
            <p class="text-xs text-gray-500 font-headline tracking-wider">價格</p>
            <p class="text-4xl font-headline text-clue-amber tracking-wider">NT$ ${product.price}</p>
          </div>
          <button
            onclick="addToCart(${product.id}); closeModal();"
            class="bg-blood-red hover:bg-red-900 text-white px-8 py-3 font-headline tracking-wider transition-all flex items-center gap-2"
          >
            <span class="material-symbols-outlined">fact_check</span>
            沒收證物
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
      alert("請先選擇嫌疑人");
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
