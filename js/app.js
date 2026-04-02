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

const launchDate = new Date("2026-04-15T00:00:00");

function updateCountdown() {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const now = new Date();
  const diff = launchDate - now;

  if (diff <= 0) {
    const launchBar = document.querySelector(".launch-bar");
    if (launchBar) {
      launchBar.innerHTML = `<div class="launch-inner"><div class="launch-left">🔥 YA DISPONIBLE</div></div>`;
    }
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(d).padStart(2, "0");
  hoursEl.textContent = String(h).padStart(2, "0");
  minutesEl.textContent = String(m).padStart(2, "0");
  secondsEl.textContent = String(s).padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();
