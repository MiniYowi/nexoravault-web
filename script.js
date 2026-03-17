const launchDate = new Date("2026-04-15T12:00:00Z");
const countdownEl = document.getElementById("countdown");

function updateCountdown() {
  if (!countdownEl) return;

  const now = new Date();
  const diff = launchDate - now;

  if (diff <= 0) {
    countdownEl.textContent = "El lanzamiento ya está activo.";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  countdownEl.textContent = `Faltan ${days} días, ${hours} horas y ${minutes} minutos para el lanzamiento oficial.`;
}

function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  menu.classList.toggle("active");
}

updateCountdown();
setInterval(updateCountdown, 60000);
