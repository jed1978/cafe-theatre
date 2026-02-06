/**
 * 導覽列與購物車模組
 * 處理導覽列滾動效果、漢堡選單、購物車側邊欄
 */

// 購物車狀態（使用 sessionStorage）
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

/**
 * 初始化導覽列功能
 */
export function initNavigation() {
  const nav = document.getElementById("nav");
  const navCart = document.getElementById("navCart");
  const cartCount = document.getElementById("cartCount");
  const cartSidebar = document.getElementById("cartSidebar");
  const cartSidebarClose = document.getElementById("cartSidebarClose");
  const goToOrder = document.getElementById("goToOrder");

  // 滾動時改變導覽列樣式
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      nav.setAttribute("data-scrolled", "true");
    } else {
      nav.setAttribute("data-scrolled", "false");
    }
  });

  // 點擊購物車按鈕開啟側邊欄
  navCart.addEventListener("click", () => {
    openCartSidebar();
  });

  // 關閉購物車側邊欄
  cartSidebarClose.addEventListener("click", () => {
    closeCartSidebar();
  });

  // 前往訂購按鈕
  goToOrder.addEventListener("click", () => {
    closeCartSidebar();
  });

  // 初始化購物車數量顯示
  updateCartCount();
  updateCartSidebar();
}

/**
 * 開啟購物車側邊欄
 */
export function openCartSidebar() {
  const cartSidebar = document.getElementById("cartSidebar");
  cartSidebar.setAttribute("data-open", "true");
  updateCartSidebar();
}

/**
 * 關閉購物車側邊欄
 */
export function closeCartSidebar() {
  const cartSidebar = document.getElementById("cartSidebar");
  cartSidebar.setAttribute("data-open", "false");
}

/**
 * 加入購物車
 * @param {object} product - 商品物件
 */
export function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  // 儲存到 sessionStorage
  sessionStorage.setItem("cart", JSON.stringify(cart));

  // 更新 UI
  updateCartCount();
  updateCartSidebar();
}

/**
 * 從購物車移除商品
 * @param {number} productId - 商品 ID
 */
export function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  sessionStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  updateCartSidebar();
}

/**
 * 取得購物車內容
 * @returns {array} 購物車商品陣列
 */
export function getCart() {
  return cart;
}

/**
 * 計算購物車總金額
 * @returns {number} 總金額
 */
export function getCartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * 更新購物車數量顯示
 */
function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

/**
 * 更新購物車側邊欄內容
 */
function updateCartSidebar() {
  const cartSidebarBody = document.getElementById("cartSidebarBody");
  const cartTotal = document.getElementById("cartTotal");

  if (cart.length === 0) {
    cartSidebarBody.innerHTML = '<p class="cart-empty">尚未選購任何商品</p>';
    cartTotal.textContent = "NT$ 0";
    return;
  }

  // 渲染購物車商品
  cartSidebarBody.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
      <div class="cart-item__info">
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__price">NT$ ${item.price} x ${item.quantity}</div>
      </div>
      <button class="cart-item__remove" data-id="${item.id}" aria-label="移除">
        ✕
      </button>
    </div>
  `
    )
    .join("");

  // 更新總金額
  cartTotal.textContent = `NT$ ${getCartTotal()}`;

  // 綁定移除按鈕事件
  cartSidebarBody.querySelectorAll(".cart-item__remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = parseInt(e.target.dataset.id);
      removeFromCart(productId);
    });
  });
}
