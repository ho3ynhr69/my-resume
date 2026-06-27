
// // برای منوی همببرگری

// const menuToggle = document.querySelector('#site-header .menu-toggle');
//   const navMenu = document.querySelector('#site-header .nav-menu');

//   // چک می‌کنیم که آیا این المان‌ها در صفحه موجود هستند یا نه
//   if (menuToggle && navMenu) {
//     menuToggle.addEventListener('click', () => {
//       const isOpen = navMenu.classList.toggle('active');
//       menuToggle.classList.toggle('is-open', isOpen);
//       menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
//     });
//   } else {
//     console.warn("Menu toggle or nav menu not found. Mobile menu functionality will be disabled.");
//   }









 
  
// توابع جاوااسکریپت برای سبد خرید و منوی موبایل
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cart-overlay');
const mobileNavToggle = document.getElementById('mobileNavToggle');
const headerNav = document.getElementById('headerNav');

function toggleCartDrawer() {
    cartDrawer.classList.toggle('open');
    cartOverlay.classList.toggle('open');
}

function addProductToCart(button) {
    const productId = button.getAttribute('data-product-id');
    const productName = button.getAttribute('data-product-name');
    const productPrice = parseInt(button.getAttribute('data-product-price'));

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let existingItemIndex = cartItems.findIndex(item => item.id === productId);

    if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity++;
    } else {
        cartItems.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartUI();
    // نمایش پیام موفقیت آمیز (اختیاری)
    alert(`${productName} به سبد خرید اضافه شد!`);
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartItemCountElement = document.getElementById('cart-item-count');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let total = 0;

    cartItemsContainer.innerHTML = ''; // پاک کردن محتوای فعلی

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #888;">سبد خرید خالی است.</p>';
    } else {
        cartItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            cartItemsContainer.innerHTML += `
                <div style="display: flex; justify-content: space-between; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #f0f0f0;">
                    <div>
                        <h4 style="margin-bottom: 5px; font-size: 1rem;">${item.name}</h4>
                        <p style="font-size: 0.9rem; color: #666;">
                            ${item.price.toLocaleString()} تومان × ${item.quantity}
                        </p>
                    </div>
                    <button onclick="removeFromCart('${item.id}')" style="background: none; border: none; color: red; cursor: pointer; font-size: 1.2rem;">&times;</button>
                </div>
            `;
        });
    }

    cartTotalElement.textContent = total.toLocaleString();
    cartItemCountElement.textContent = cartItems.reduce((count, item) => count + item.quantity, 0);
}

function removeFromCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartUI();
}

// فعال کردن دکمه منوی موبایل
mobileNavToggle.addEventListener('click', () => {
    headerNav.classList.toggle('mobile-menu-open');
    mobileNavToggle.classList.toggle('active'); // تغییر ظاهر دکمه (اختیاری)
});

// به‌روزرسانی UI سبد خرید هنگام بارگذاری صفحه
document.addEventListener('DOMContentLoaded', updateCartUI);

  


















