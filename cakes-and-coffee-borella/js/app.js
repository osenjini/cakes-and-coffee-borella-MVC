/**
 * Cakes & Coffee Borella - Application Logic
 */

// Application State
const state = {
  activeCategory: 'all',
  searchQuery: '',
  cart: JSON.parse(localStorage.getItem('cc_borella_cart') || '[]'),
  isCartOpen: false,
  isMobileMenuOpen: false
};

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
  initLiveHours();
  renderCategories();
  renderMenuItems();
  renderTestimonials();
  updateCartUI();
  setupEventListeners();
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/**
 * Real-time opening status calculator (Colombo time UTC+5.30)
 */
function initLiveHours() {
  const statusBadge = document.getElementById('open-status-badge');
  const statusText = document.getElementById('open-status-text');
  const statusDot = document.getElementById('open-status-dot');

  if (!statusBadge) return;

  function checkHours() {
    // Current time converted to Colombo time
    const now = new Date();
    // UTC offset for Sri Lanka is +5.5 hours (+330 minutes)
    const utcMinutes = now.getTime() + (now.getTimezoneOffset() * 60000);
    const colomboTime = new Date(utcMinutes + (330 * 60000));
    const currentHour = colomboTime.getHours() + (colomboTime.getMinutes() / 60);

    const isOpen = currentHour >= CAFE_INFO.openingHour && currentHour < CAFE_INFO.closingHour;

    if (isOpen) {
      statusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-sm';
      statusDot.className = 'w-2 h-2 rounded-full bg-emerald-500 pulse-indicator';
      statusText.textContent = 'Open Now • Closes 9:00 PM';
    } else {
      statusBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 shadow-sm';
      statusDot.className = 'w-2 h-2 rounded-full bg-amber-500';
      statusText.textContent = 'Closed Now • Opens 7:30 AM';
    }
  }

  checkHours();
  setInterval(checkHours, 60000); // Check every minute
}

/**
 * Render category filter buttons
 */
function renderCategories() {
  const container = document.getElementById('categories-container');
  if (!container) return;

  container.innerHTML = MENU_CATEGORIES.map(cat => {
    const isActive = state.activeCategory === cat.id;
    return `
      <button 
        onclick="setCategory('${cat.id}')"
        class="category-btn flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
          isActive 
            ? 'bg-[#3E261C] text-white shadow-warm-md scale-[1.02]' 
            : 'bg-white text-stone-700 hover:bg-[#F4EEE3] border border-stone-200'
        }"
      >
        <i data-lucide="${cat.icon}" class="w-4 h-4 ${isActive ? 'text-[#DE9B67]' : 'text-stone-500'}"></i>
        <span>${cat.name}</span>
      </button>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

/**
 * Set active category and re-render
 */
window.setCategory = function(categoryId) {
  state.activeCategory = categoryId;
  renderCategories();
  renderMenuItems();
};

/**
 * Render filtered menu cards
 */
function renderMenuItems() {
  const grid = document.getElementById('menu-grid');
  const countDisplay = document.getElementById('menu-item-count');
  if (!grid) return;

  let filtered = MENU_ITEMS.filter(item => {
    const matchesCat = state.activeCategory === 'all' || item.category === state.activeCategory;
    const query = state.searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      item.name.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)));
    return matchesCat && matchesSearch;
  });

  if (countDisplay) {
    countDisplay.textContent = `Showing ${filtered.length} delicious item${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
          <i data-lucide="coffee" class="w-8 h-8"></i>
        </div>
        <h3 class="text-xl font-serif text-stone-800 font-bold mb-2">No matching treats found</h3>
        <p class="text-stone-500 text-sm max-w-md mx-auto mb-6">Try searching for a different item or switch category filters.</p>
        <button onclick="resetFilters()" class="px-5 py-2.5 rounded-full bg-[#3E261C] text-white text-sm font-semibold hover:bg-[#2B1A13] transition-colors">
          View All Menu Items
        </button>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  grid.innerHTML = filtered.map(item => {
    return `
      <div class="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-warm-sm hover-lift flex flex-col justify-between">
        <div>
          <!-- Image Container -->
          <div class="relative h-48 w-full overflow-hidden bg-stone-100">
            <img 
              src="${item.image}" 
              alt="${item.name}" 
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            ${item.badge ? `
              <span class="absolute top-3 left-3 bg-[#3E261C]/90 backdrop-blur-md text-[#F4EEE3] text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                ${item.badge}
              </span>
            ` : ''}

            <span class="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-[#3E261C] font-bold text-sm px-3 py-1 rounded-full shadow-md">
              Rs. ${item.price.toLocaleString()}
            </span>
          </div>

          <!-- Body Content -->
          <div class="p-5">
            <h3 class="font-serif text-lg font-bold text-stone-900 mb-1.5 group-hover:text-[#C68B59] transition-colors">
              ${item.name}
            </h3>
            <p class="text-stone-500 text-xs leading-relaxed line-clamp-2 mb-3">
              ${item.description}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 mb-2">
              ${item.tags.map(t => `<span class="bg-[#FAF7F2] text-stone-600 text-[11px] px-2 py-0.5 rounded-md border border-stone-200/60 font-medium">${t}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Action Button -->
        <div class="px-5 pb-5 pt-1 border-t border-stone-50">
          <button 
            onclick="addToCart('${item.id}')"
            class="w-full py-2.5 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#3E261C] text-[#3E261C] hover:text-white font-medium text-xs tracking-wide transition-all duration-200 flex items-center justify-center gap-2 group/btn border border-[#E9DECB]"
          >
            <i data-lucide="plus" class="w-4 h-4 transition-transform group-hover/btn:rotate-90"></i>
            <span>Add to Order</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) window.lucide.createIcons();
}

/**
 * Reset filters
 */
window.resetFilters = function() {
  state.activeCategory = 'all';
  state.searchQuery = '';
  const searchInput = document.getElementById('menu-search');
  if (searchInput) searchInput.value = '';
  renderCategories();
  renderMenuItems();
};

/**
 * Add item to cart
 */
window.addToCart = function(itemId) {
  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  const existing = state.cart.find(c => c.id === itemId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added ${item.name} to order!`);
};

/**
 * Update item quantity in cart
 */
window.updateQuantity = function(itemId, delta) {
  const item = state.cart.find(c => c.id === itemId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(c => c.id !== itemId);
  }

  saveCart();
  updateCartUI();
};

/**
 * Remove item completely from cart
 */
window.removeFromCart = function(itemId) {
  state.cart = state.cart.filter(c => c.id !== itemId);
  saveCart();
  updateCartUI();
};

/**
 * Clear cart
 */
window.clearCart = function() {
  state.cart = [];
  saveCart();
  updateCartUI();
};

/**
 * Save cart to LocalStorage
 */
function saveCart() {
  localStorage.setItem('cc_borella_cart', JSON.stringify(state.cart));
}

/**
 * Update Cart UI (Count badges, subtotal, items list)
 */
function updateCartUI() {
  const cartBadges = document.querySelectorAll('.cart-count-badge');
  const cartDrawerItems = document.getElementById('cart-drawer-items');
  const cartDrawerSubtotal = document.getElementById('cart-drawer-subtotal');
  const cartDrawerEmpty = document.getElementById('cart-drawer-empty');
  const cartDrawerFooter = document.getElementById('cart-drawer-footer');

  const totalQuantity = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Update badge count
  cartBadges.forEach(badge => {
    badge.textContent = totalQuantity;
    badge.classList.toggle('hidden', totalQuantity === 0);
  });

  if (cartDrawerSubtotal) {
    cartDrawerSubtotal.textContent = `Rs. ${subtotal.toLocaleString()}`;
  }

  if (!cartDrawerItems) return;

  if (state.cart.length === 0) {
    if (cartDrawerEmpty) cartDrawerEmpty.classList.remove('hidden');
    if (cartDrawerFooter) cartDrawerFooter.classList.add('hidden');
    cartDrawerItems.innerHTML = '';
  } else {
    if (cartDrawerEmpty) cartDrawerEmpty.classList.add('hidden');
    if (cartDrawerFooter) cartDrawerFooter.classList.remove('hidden');

    cartDrawerItems.innerHTML = state.cart.map(item => `
      <div class="flex items-center gap-3 p-3 bg-[#FAF7F2] rounded-xl border border-stone-200/70">
        <img src="${item.image}" alt="${item.name}" class="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
        <div class="flex-1 min-w-0">
          <h4 class="font-bold text-stone-900 text-xs truncate mb-1">${item.name}</h4>
          <p class="text-stone-500 text-xs">Rs. ${item.price.toLocaleString()} each</p>
          <div class="text-[#3E261C] font-semibold text-xs mt-1">
            Rs. ${(item.price * item.quantity).toLocaleString()}
          </div>
        </div>
        
        <div class="flex flex-col items-end gap-2 flex-shrink-0">
          <button onclick="removeFromCart('${item.id}')" class="text-stone-400 hover:text-red-500 transition-colors p-1" title="Remove">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
          
          <div class="flex items-center bg-white rounded-lg border border-stone-200 p-0.5">
            <button onclick="updateQuantity('${item.id}', -1)" class="w-5 h-5 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded">
              -
            </button>
            <span class="w-6 text-center text-xs font-semibold text-stone-800">${item.quantity}</span>
            <button onclick="updateQuantity('${item.id}', 1)" class="w-5 h-5 flex items-center justify-center text-stone-600 hover:bg-stone-100 rounded">
              +
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  if (window.lucide) window.lucide.createIcons();
}

/**
 * Cart Drawer Toggle
 */
window.toggleCart = function() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-backdrop');
  if (!drawer || !backdrop) return;

  state.isCartOpen = !state.isCartOpen;
  if (state.isCartOpen) {
    backdrop.classList.remove('hidden');
    setTimeout(() => {
      backdrop.classList.remove('opacity-0');
      drawer.classList.remove('cart-drawer-closed');
      drawer.classList.add('cart-drawer-open');
    }, 10);
  } else {
    drawer.classList.remove('cart-drawer-open');
    drawer.classList.add('cart-drawer-closed');
    backdrop.classList.add('opacity-0');
    setTimeout(() => {
      backdrop.classList.add('hidden');
    }, 300);
  }
};

/**
 * Mobile navigation menu toggle
 */
window.toggleMobileMenu = function() {
  const menu = document.getElementById('mobile-menu');
  if (!menu) return;
  state.isMobileMenuOpen = !state.isMobileMenuOpen;
  menu.classList.toggle('hidden', !state.isMobileMenuOpen);
};

/**
 * Format and trigger direct WhatsApp Order
 */
window.sendWhatsAppOrder = function() {
  if (state.cart.length === 0) {
    alert("Please add some items to your order first!");
    return;
  }

  const orderTypeSelect = document.getElementById('order-type-select');
  const customerNameInput = document.getElementById('order-customer-name');
  const orderNotesInput = document.getElementById('order-notes');

  const orderType = orderTypeSelect ? orderTypeSelect.value : 'Takeaway';
  const customerName = customerNameInput && customerNameInput.value.trim() ? customerNameInput.value.trim() : 'Guest';
  const notes = orderNotesInput && orderNotesInput.value.trim() ? orderNotesInput.value.trim() : 'None';

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  let message = `*☕ NEW ORDER - CAKES & COFFEE BORELLA 🍰*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `👤 *Customer:* ${customerName}\n`;
  message += `🛵 *Order Type:* ${orderType}\n`;
  if (notes !== 'None') {
    message += `📝 *Notes/Requests:* ${notes}\n`;
  }
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*ORDER ITEMS:*\n\n`;

  state.cart.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    message += `   Qty: ${item.quantity} × Rs. ${item.price.toLocaleString()} = *Rs. ${(item.price * item.quantity).toLocaleString()}*\n`;
  });

  message += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Total Estimate:* *Rs. ${subtotal.toLocaleString()}*\n`;
  message += `📍 *Store:* 89 Dr NM Perera Mawatha, Borella\n\n`;
  message += `Please confirm availability and preparation time. Thank you!`;

  const waUrl = `https://wa.me/${CAFE_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
};

/**
 * Custom Cake Inquiry Submission via WhatsApp
 */
window.sendCakeInquiry = function(event) {
  event.preventDefault();
  const form = document.getElementById('cake-inquiry-form');
  if (!form) return;

  const cakeType = document.getElementById('inquiry-cake-type').value;
  const cakeWeight = document.getElementById('inquiry-cake-weight').value;
  const date = document.getElementById('inquiry-date').value;
  const inscription = document.getElementById('inquiry-inscription').value.trim() || 'None';
  const name = document.getElementById('inquiry-name').value.trim();
  const phone = document.getElementById('inquiry-phone').value.trim();
  const notes = document.getElementById('inquiry-notes').value.trim() || 'Standard celebration design';

  let msg = `*🎂 CUSTOM CELEBRATION CAKE INQUIRY 🎂*\n`;
  msg += `*Cakes & Coffee Borella*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `👤 *Name:* ${name}\n`;
  msg += `📞 *Phone:* ${phone}\n`;
  msg += `🍰 *Cake Flavor:* ${cakeType}\n`;
  msg += `⚖️ *Weight / Size:* ${cakeWeight}\n`;
  msg += `📅 *Required Date:* ${date}\n`;
  msg += `✍️ *Custom Inscription:* "${inscription}"\n`;
  msg += `🎨 *Design / Notes:* ${notes}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `Please send me pricing details, design confirmation, and bank transfer / payment info.`;

  const waUrl = `https://wa.me/${CAFE_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
  closeCakeModal();
};

/**
 * Cake modal open/close
 */
window.openCakeModal = function() {
  const modal = document.getElementById('cake-modal');
  if (modal) modal.classList.remove('hidden');
};

window.closeCakeModal = function() {
  const modal = document.getElementById('cake-modal');
  if (modal) modal.classList.add('hidden');
};

/**
 * Render Google Reviews / Testimonials
 */
function renderTestimonials() {
  const container = document.getElementById('testimonials-container');
  if (!container) return;

  container.innerHTML = TESTIMONIALS.map(t => `
    <div class="glass-card p-6 rounded-2xl shadow-warm-sm border border-stone-200/80 flex flex-col justify-between">
      <div>
        <div class="flex items-center gap-1 text-amber-500 mb-3">
          ${Array(t.rating).fill('<i data-lucide="star" class="w-4 h-4 fill-amber-400 text-amber-400"></i>').join('')}
        </div>
        <p class="text-stone-700 text-sm leading-relaxed mb-4 italic">
          "${t.comment}"
        </p>
      </div>
      <div class="flex items-center gap-3 pt-3 border-t border-stone-100">
        <img src="${t.avatar}" alt="${t.name}" class="w-10 h-10 rounded-full object-cover border border-stone-200" />
        <div>
          <h4 class="font-bold text-stone-900 text-xs">${t.name}</h4>
          <span class="text-stone-400 text-[11px]">${t.date} • Verified Google Review</span>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

/**
 * Toast Notification banner
 */
function showToast(message) {
  const existing = document.getElementById('app-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'app-toast';
  toast.className = 'fixed bottom-6 left-6 z-50 bg-[#3E261C] text-white px-5 py-3 rounded-xl shadow-warm-lg flex items-center gap-3 text-sm font-medium toast-enter border border-amber-900/40';
  toast.innerHTML = `
    <i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-400"></i>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

/**
 * Setup Event Listeners
 */
function setupEventListeners() {
  const searchInput = document.getElementById('menu-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderMenuItems();
    });
  }
}
