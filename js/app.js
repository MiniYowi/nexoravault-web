const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const cartCount = document.getElementById("cartCount");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
  });
}

function getCart() {
  return JSON.parse(localStorage.getItem("xelyora_cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("xelyora_cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  if (!cartCount) return;
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalItems;
}

function addToCart(name, price) {
  const cart = getCart();
  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name,
      price: Number(price),
      qty: 1
    });
  }

  saveCart(cart);
  alert(`${name} añadido al carrito`);
}

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = button.dataset.price;
    addToCart(name, price);
  });
});

updateCartCount();
