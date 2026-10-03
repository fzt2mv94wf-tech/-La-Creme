// Индикатор "открыто / закрыто" по времени Махачкалы (МСК)
const OPEN = 9, CLOSE = 22;
function updateStatus() {
  const hour = Number(new Intl.DateTimeFormat("ru-RU", {
    hour: "numeric", hour12: false, timeZone: "Europe/Moscow"
  }).format(new Date()));
  const el = document.getElementById("status");
  el.textContent = hour >= OPEN && hour < CLOSE
    ? `Открыто до ${CLOSE}:00`
    : `Откроемся в 0${OPEN}:00`;
}
updateStatus();
setInterval(updateStatus, 60_000);

// Курсор, который плавно следует за мышью
const cursor = document.querySelector(".cursor");
const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canHover && !reduce) {
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
  addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; });
  (function loop() {
    cx += (x - cx) * 0.18;
    cy += (y - cy) * 0.18;
    cursor.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll("a, button, .prices li").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });
  addEventListener("mousedown", () => cursor.classList.add("down"));
  addEventListener("mouseup", () => cursor.classList.remove("down"));

  // "Магнитные" кнопки: слегка тянутся к курсору
  document.querySelectorAll(".magnetic").forEach(btn => {
    btn.addEventListener("mousemove", e => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.25;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
  });
}

// Если фото нет в папке images/, скрываем битую картинку, остаётся цветная плашка
document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("error", () => { img.style.display = "none"; });
});
