/**
 * 表單驗證與提交模組
 * 處理訂購表單的驗證、提交、成功訊息顯示
 */

import { getCart, getCartTotal } from "./navigation.js";

/**
 * 初始化表單功能
 */
export function initForm() {
  const form = document.getElementById("orderForm");
  const selectedProductsContainer = document.getElementById("selectedProducts");
  const totalAmountElement = document.getElementById("totalAmount");

  // 監聽購物車變化（透過 storage 事件或定時更新）
  updateSelectedProducts();

  // 表單提交事件
  form.addEventListener("submit", handleFormSubmit);

  // 即時驗證
  setupFieldValidation();
}

/**
 * 更新已選商品顯示
 */
function updateSelectedProducts() {
  const cart = getCart();
  const selectedProductsContainer = document.getElementById("selectedProducts");
  const totalAmountElement = document.getElementById("totalAmount");

  if (cart.length === 0) {
    selectedProductsContainer.innerHTML = '<p class="form__hint">請先點選商品加入選購</p>';
    totalAmountElement.textContent = "NT$ 0";
    return;
  }

  // 顯示已選商品
  selectedProductsContainer.innerHTML = cart
    .map(
      (item) => `
    <div class="selected-product-item">
      <span class="selected-product-item__name">${item.name} x ${item.quantity}</span>
      <span class="selected-product-item__price">NT$ ${item.price * item.quantity}</span>
    </div>
  `
    )
    .join("");

  // 更新總金額
  totalAmountElement.textContent = `NT$ ${getCartTotal()}`;
}

/**
 * 設定欄位即時驗證
 */
function setupFieldValidation() {
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const storeInput = document.getElementById("store");

  nameInput.addEventListener("blur", () => validateName());
  phoneInput.addEventListener("blur", () => validatePhone());
  emailInput.addEventListener("blur", () => validateEmail());
  storeInput.addEventListener("blur", () => validateStore());
}

/**
 * 驗證姓名
 */
function validateName() {
  const nameInput = document.getElementById("name");
  const nameError = document.getElementById("nameError");

  if (nameInput.value.trim() === "") {
    showError(nameError, "請輸入姓名");
    return false;
  }

  clearError(nameError);
  return true;
}

/**
 * 驗證手機號碼
 */
function validatePhone() {
  const phoneInput = document.getElementById("phone");
  const phoneError = document.getElementById("phoneError");
  const phoneRegex = /^09\d{8}$/;

  if (!phoneRegex.test(phoneInput.value.trim())) {
    showError(phoneError, "請輸入有效的手機號碼（格式：09xxxxxxxx）");
    return false;
  }

  clearError(phoneError);
  return true;
}

/**
 * 驗證 Email（選填，但若有填則需正確格式）
 */
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");

  if (emailInput.value.trim() === "") {
    clearError(emailError);
    return true; // 選填欄位，留空視為有效
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailInput.value.trim())) {
    showError(emailError, "請輸入有效的 Email 格式");
    return false;
  }

  clearError(emailError);
  return true;
}

/**
 * 驗證門市
 */
function validateStore() {
  const storeInput = document.getElementById("store");
  const storeError = document.getElementById("storeError");

  if (storeInput.value.trim() === "") {
    showError(storeError, "請輸入取貨門市");
    return false;
  }

  clearError(storeError);
  return true;
}

/**
 * 驗證購物車
 */
function validateCart() {
  const cart = getCart();

  if (cart.length === 0) {
    alert("購物車是空的，請先選購商品");
    return false;
  }

  return true;
}

/**
 * 顯示錯誤訊息
 */
function showError(errorElement, message) {
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

/**
 * 清除錯誤訊息
 */
function clearError(errorElement) {
  errorElement.textContent = "";
  errorElement.style.display = "none";
}

/**
 * 處理表單提交
 */
async function handleFormSubmit(e) {
  e.preventDefault();

  // 執行所有驗證
  const isNameValid = validateName();
  const isPhoneValid = validatePhone();
  const isEmailValid = validateEmail();
  const isStoreValid = validateStore();
  const isCartValid = validateCart();

  if (!isNameValid || !isPhoneValid || !isEmailValid || !isStoreValid || !isCartValid) {
    return;
  }

  // 收集表單資料
  const formData = {
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    store: document.getElementById("store").value.trim(),
    note: document.getElementById("note").value.trim(),
    cart: getCart(),
    total: getCartTotal(),
    timestamp: new Date().toISOString(),
  };

  console.log("訂單資料：", formData);

  // 此處可整合 Google Apps Script 或其他後端 API
  // 目前僅在 console 顯示資料

  // 模擬提交延遲
  const submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span class="loading"></span> 處理中...';

  // 模擬 API 呼叫
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // 顯示成功訊息
  showSuccessMessage();

  // 重置表單與購物車
  document.getElementById("orderForm").reset();
  sessionStorage.removeItem("cart");
  updateSelectedProducts();

  submitBtn.disabled = false;
  submitBtn.textContent = "確認訂購";
}

/**
 * 顯示成功訊息
 */
function showSuccessMessage() {
  const form = document.getElementById("orderForm");
  const successMessage = document.getElementById("formSuccess");

  form.style.display = "none";
  successMessage.style.display = "block";

  // 5 秒後自動隱藏成功訊息並恢復表單
  setTimeout(() => {
    successMessage.style.display = "none";
    form.style.display = "block";
  }, 5000);
}

// 定期更新已選商品（每秒檢查一次）
setInterval(() => {
  if (document.getElementById("selectedProducts")) {
    updateSelectedProducts();
  }
}, 1000);
