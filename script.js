// Menu data
let cart = [];
const MENU = {
  icecreams: [
    {
      category: "Ice Cream Bars",
      items: [
        { id: "mini-choco-bar", name: "Mini Choco Bar", price: 15, tag: "Bar" },
        { id: "maha-choco-bar", name: "Maha Choco Bar", price: 25, tag: "Bar" },
        { id: "mango-duet", name: "Mango Duet", price: 25, tag: "Bar" },
      ],
    },
    {
      category: "Ice Cream Cups",
      items: [
        { id: "vanilla-cup", name: "Vanilla Cup", price: 8, tag: "Cup" },
        { id: "strawberry-cup", name: "Strawberry Cup", price: 8, tag: "Cup" },
        { id: "mango-cup", name: "Mango Cup", price: 8, tag: "Cup" },
      ],
    },
    {
      category: "Premium Cups",
      items: [
        { id: "premium-vanilla", name: "Vanilla", price: 15, tag: "Premium" },
        { id: "premium-strawberry", name: "Strawberry", price: 15, tag: "Premium" },
        { id: "premium-chocolate", name: "Chocolate", price: 18, tag: "Premium" },
        { id: "premium-pineapple", name: "Pineapple", price: 15, tag: "Premium" },
        { id: "premium-pista", name: "Pista", price: 15, tag: "Premium" },
        { id: "premium-mango", name: "Mango", price: 15, tag: "Premium" },
        { id: "premium-butterscotch", name: "Butterscotch", price: 20, tag: "Premium" },
      ],
    },
    {
      category: "Cone Ice Cream",
      items: [
        { id: "vanilla-cone", name: "Vanilla Cone", price: 35, tag: "Cone" },
        { id: "chocolate-cone", name: "Chocolate Cone", price: 40, tag: "Cone" },
        { id: "butterscotch-cone", name: "Butterscotch Cone", price: 40, tag: "Cone" },
        { id: "blackcurrant-cone", name: "Black Currant Cone", price: 40, tag: "Cone" },
      ],
    },
    {
      category: "Milk Lolly",
      items: [
        { id: "milk-pista", name: "Pista", price: 7, tag: "Milk Lolly" },
        { id: "milk-coffee", name: "Coffee", price: 7, tag: "Milk Lolly" },
        { id: "milk-strawberry", name: "Strawberry", price: 7, tag: "Milk Lolly" },
        { id: "milk-mango", name: "Mango", price: 7, tag: "Milk Lolly" },
      ],
    },
  ],
  juices: [
    {
      category: "Juices",
      items: [
        { id: "watermelon-juice", name: "Watermelon Juice", price: 20, tag: "Juice" },
        { id: "lemon-juice", name: "Lemon Juice", price: 20, tag: "Juice" },
      ],
    },
  ],
};

// Local image mappings for products
const IMAGE_MAP = {
  // Bars
  "mini-choco-bar": "images/mini-choco-bar.jpg",
  "maha-choco-bar": "images/Maha-choco-bar.jpg",
  "mango-duet": "images/Maha_mango-duet.jpg",
  // Cups
  "vanilla-cup": "images/Vannila-cup.jpg",
  "strawberry-cup": "images/Starwberry-cup.jpg",
  "mango-cup": "images/Mango_Cup.jpg",
  // Cones
  "chocolate-cone": "images/Chocolate-cone.jpg",
  "butterscotch-cone": "images/Butterscotch-cone.jpg",
  "vanilla-cone": "images/Vannila-cone.jpg",
  "blackcurrant-cone": "images/Black_current-cone.jpg",
  // Category-level fallbacks
  "milk-lolly": "images/milk-lolly.jpg",
  "premium-cups": "images/premium-cups.jpg",
};

function getImageForItem(item, categoryName) {
  if (IMAGE_MAP[item.id]) return IMAGE_MAP[item.id];
  if (categoryName === "Milk Lolly") return IMAGE_MAP["milk-lolly"];
  if (categoryName === "Premium Cups") return IMAGE_MAP["premium-cups"];
  return "";
}

// Cart state
let cart = {};

// Orders state (stored in localStorage)
const STORAGE_KEY = "ephraem-manna-foodfest-orders";
const TOKEN_KEY = "ephraem-manna-foodfest-last-token";

function loadOrders() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

function getNextToken() {
  const last = Number(localStorage.getItem(TOKEN_KEY) || "1000");
  const next = last + 1;
  localStorage.setItem(TOKEN_KEY, String(next));
  return next;
}

// Rendering menu
function createMenuItemElement(item, categoryName) {
  const li = document.createElement("article");
  li.className = "menu-item";
  li.dataset.id = item.id;

  const imageWrapper = document.createElement("div");
  imageWrapper.className = "menu-item-image";
  const imgSrc = getImageForItem(item, categoryName);
  if (imgSrc) {
    const imgEl = document.createElement("img");
    imgEl.className = "product-img";
    imgEl.src = imgSrc;
    imgEl.alt = item.name;
    imageWrapper.appendChild(imgEl);
    li.appendChild(imageWrapper);
  }

  const header = document.createElement("div");
  header.className = "menu-item-header";

  const nameEl = document.createElement("div");
  nameEl.className = "menu-item-name";
  nameEl.textContent = item.name;

  const priceEl = document.createElement("div");
  priceEl.className = "menu-item-price";
  priceEl.textContent = `₹${item.price}`;

  header.appendChild(nameEl);
  header.appendChild(priceEl);

  const tagEl = document.createElement("div");
  tagEl.className = "menu-item-tag";
  tagEl.textContent = categoryName;

  const chipEl = document.createElement("div");
  chipEl.className = "menu-item-chip";
  chipEl.textContent = item.tag;

  li.appendChild(header);
  li.appendChild(tagEl);
  li.appendChild(chipEl);

  li.addEventListener("click", () => addToCart(item));

  return li;
}

function renderMenu() {
  const iceContainer = document.getElementById("menu-icecreams");
  const juiceContainer = document.getElementById("menu-juices");

  iceContainer.innerHTML = "";
  juiceContainer.innerHTML = "";

  function renderCategory(container, section) {
    const sectionEl = document.createElement("section");
    sectionEl.className = "menu-section";

    const title = document.createElement("h3");
    title.className = "menu-section-title";
    title.textContent = section.category;

    const grid = document.createElement("div");
    grid.className = "menu-grid";

    section.items.forEach((item) => {
      const itemEl = createMenuItemElement(item, section.category);
      grid.appendChild(itemEl);
    });

    sectionEl.appendChild(title);
    sectionEl.appendChild(grid);
    container.appendChild(sectionEl);
  }

  MENU.icecreams.forEach((section) => renderCategory(iceContainer, section));
  MENU.juices.forEach((section) => renderCategory(juiceContainer, section));
}

// Cart handling
function addToCart(item) {
  if (!cart[item.id]) {
    cart[item.id] = { ...item, quantity: 0 };
  }
  cart[item.id].quantity += 1;
  renderCart();
}

function updateCartQuantity(id, delta) {
  const entry = cart[id];
  if (!entry) return;
  entry.quantity += delta;
  if (entry.quantity <= 0) {
    delete cart[id];
  }
  renderCart();
}

function removeFromCart(id) {
  delete cart[id];
  renderCart();
}

function getCartSummary() {
  const items = Object.values(cart);
  let count = 0;
  let subtotal = 0;
  items.forEach((entry) => {
    count += entry.quantity;
    subtotal += entry.quantity * entry.price;
  });
  return { count, subtotal, items };
}

function renderCart() {
  const { count, subtotal, items } = getCartSummary();
  const emptyEl = document.getElementById("cart-empty");
  const listEl = document.getElementById("cart-items");

  if (count === 0) {
    emptyEl.classList.remove("hidden");
  } else {
    emptyEl.classList.add("hidden");
  }

  listEl.innerHTML = "";
  items.forEach((entry) => {
    const li = document.createElement("li");
    li.className = "cart-item";

    const header = document.createElement("div");
    header.className = "cart-item-header";

    const nameEl = document.createElement("div");
    nameEl.className = "cart-item-name";
    nameEl.textContent = entry.name;

    const metaEl = document.createElement("div");
    metaEl.className = "cart-item-meta";
    metaEl.textContent = `₹${entry.price} each`;

    header.appendChild(nameEl);
    header.appendChild(metaEl);

    const priceEl = document.createElement("div");
    priceEl.className = "cart-item-price";
    priceEl.textContent = `₹${entry.price * entry.quantity}`;

    const controls = document.createElement("div");
    controls.className = "cart-item-controls";

    const minusBtn = document.createElement("button");
    minusBtn.className = "qty-btn";
    minusBtn.textContent = "−";
    minusBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      updateCartQuantity(entry.id, -1);
    });

    const qty = document.createElement("span");
    qty.className = "qty-value";
    qty.textContent = entry.quantity;

    const plusBtn = document.createElement("button");
    plusBtn.className = "qty-btn";
    plusBtn.textContent = "+";
    plusBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      updateCartQuantity(entry.id, 1);
    });

    const removeBtn = document.createElement("button");
    removeBtn.className = "cart-remove";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      removeFromCart(entry.id);
    });

    controls.appendChild(minusBtn);
    controls.appendChild(qty);
    controls.appendChild(plusBtn);
    controls.appendChild(removeBtn);

    li.appendChild(header);
    li.appendChild(priceEl);
    li.appendChild(controls);

    listEl.appendChild(li);
  });

  document.getElementById("cart-item-count").textContent = count;
  document.getElementById("cart-subtotal").textContent = `₹${subtotal}`;

  const placeOrderBtn = document.getElementById("place-order-btn");
  placeOrderBtn.disabled = count === 0;
}

// Admin dashboard
function isToday(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function calculateStats(orders) {
  const todayOrders = orders.filter((o) => isToday(o.createdAt));
  const count = todayOrders.length;
  const paidRevenue = todayOrders
    .filter((o) => o.paymentStatus === "Paid")
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const pending = todayOrders.filter((o) => o.paymentStatus === "Pending").length;
  return { count, paidRevenue, pending, todayOrders };
}

function renderAdminDashboard() {
  const orders = loadOrders();
  const { count, paidRevenue, pending, todayOrders } = calculateStats(orders);

  document.getElementById("stat-order-count").textContent = count;
  document.getElementById("stat-revenue").textContent = `₹${paidRevenue}`;
  document.getElementById("stat-pending").textContent = pending;

  const body = document.getElementById("orders-body");
  body.innerHTML = "";

  todayOrders
    .slice()
    .sort((a, b) => a.token - b.token)
    .forEach((order) => {
      const tr = document.createElement("tr");
      const tokenTd = document.createElement("td");
      tokenTd.textContent = order.token;
      const nameTd = document.createElement("td");
      nameTd.textContent = order.customerName || "-";

      const itemsTd = document.createElement("td");
      itemsTd.textContent = order.items
        .map((i) => `${i.name} x${i.quantity}`)
        .join(", ");

      const totalTd = document.createElement("td");
      totalTd.textContent = `₹${order.totalAmount}`;

      const statusTd = document.createElement("td");
      const statusBadge = document.createElement("span");
      statusBadge.className =
        "badge-status " +
        (order.paymentStatus === "Paid" ? "badge-paid" : "badge-pending");
      statusBadge.textContent = order.paymentStatus;

      const select = document.createElement("select");
      select.className = "status-select";
      ["Paid", "Pending"].forEach((status) => {
        const opt = document.createElement("option");
        opt.value = status;
        opt.textContent = status;
        if (status === order.paymentStatus) opt.selected = true;
        select.appendChild(opt);
      });

      select.addEventListener("change", () => {
        updateOrderStatus(order.token, select.value);
      });

      statusTd.appendChild(statusBadge);
      statusTd.appendChild(document.createElement("br"));
      statusTd.appendChild(select);

      tr.appendChild(tokenTd);
      tr.appendChild(nameTd);
      tr.appendChild(itemsTd);
      tr.appendChild(totalTd);
      tr.appendChild(statusTd);

      body.appendChild(tr);
    });
}

function updateOrderStatus(token, newStatus) {
  const orders = loadOrders();
  const order = orders.find((o) => o.token === token);
  if (order) {
    order.paymentStatus = newStatus;
    saveOrders(orders);
    renderAdminDashboard();
  }
}

// Checkout
function handleCheckoutSubmit(event) {
  event.preventDefault();
  const { count, subtotal, items } = getCartSummary();
  if (count === 0) return;

  const nameInput = document.getElementById("customer-name");
  const phoneInput = document.getElementById("customer-phone");
  const paymentMethodInput = document.getElementById("payment-method");
  const paymentStatusInput = document.getElementById("payment-status");

  const customerName = nameInput.value.trim();
  const customerPhone = phoneInput.value.trim();
  const paymentMethod = paymentMethodInput.value;
  const paymentStatus = paymentStatusInput.value;

  const token = getNextToken();
  const createdAt = new Date().toISOString();

  const newOrder = {
    token,
    customerName,
    customerPhone,
    items: items.map(({ id, name, price, quantity }) => ({
      id,
      name,
      price,
      quantity,
    })),
    totalAmount: subtotal,
    paymentMethod,
    paymentStatus,
    createdAt,
  };

  const orders = loadOrders();
  orders.push(newOrder);
  saveOrders(orders);

  cart = {};
  renderCart();
  renderAdminDashboard();

  const tokenSpan = document.getElementById("token-number");
  tokenSpan.textContent = token;

  document.getElementById("order-result").classList.remove("hidden");

  event.target.reset();
}

// Tabs and admin toggle
function setupTabs() {
  const buttons = document.querySelectorAll(".tab-button");
  const iceMenu = document.getElementById("menu-icecreams");
  const juiceMenu = document.getElementById("menu-juices");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const tab = btn.dataset.tab;
      if (tab === "icecreams") {
        iceMenu.classList.remove("hidden");
        juiceMenu.classList.add("hidden");
      } else {
        iceMenu.classList.add("hidden");
        juiceMenu.classList.remove("hidden");
      }
    });
  });
}

function setupAdminToggle() {
  const panel = document.getElementById("admin-panel");
  const heroButton = document.getElementById("hero-admin-button");

  let visible = false;

  function updateState() {
    if (visible) {
      panel.classList.remove("hidden");
      heroButton.textContent = "Hide Admin Panel";
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      panel.classList.add("hidden");
      heroButton.textContent = "Show Admin Panel";
    }
  }

  heroButton.addEventListener("click", () => {
    visible = !visible;
    updateState();
  });
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  renderCart();
  renderAdminDashboard();
  setupTabs();
  setupAdminToggle();

  const form = document.getElementById("checkout-form");
  form.addEventListener("submit", handleCheckoutSubmit);
});
function generateToken() {
  return Math.floor(Math.random() * 900) + 100;
}

function placeOrder() {
  const token = generateToken();

  alert("✅ Order Placed Successfully!\nToken Number: " + token);

  cart = [];
  updateCart();
}
function showAIRecommendation() {

  const menu = [
    "Mini Choco Bar",
    "Maha Choco Bar",
    "Mango Cup",
    "Vanilla Cup",
    "Strawberry Cup",
    "Chocolate Cone",
    "Butterscotch Cone",
    "Milk Lolly"
  ];

  const randomItem = menu[Math.floor(Math.random() * menu.length)];

  document.getElementById("ai-recommendation").innerText =
  "🤖 AI Recommendation: Customers also like " + randomItem + " 🍦";
}

showAIRecommendation();
function updateCartCount(){
  const countElement = document.getElementById("cart-count");
  if(countElement){
    countElement.innerText = cart.length;
  }
}
updateCartCount();
function scrollToCart(){
  document.getElementById("cart-section").scrollIntoView({
    behavior: "smooth"
  });
}
function addToCart(item){
  cart.push(item);
  updateCart();
  updateCartCount();
}
updateCartCount();



