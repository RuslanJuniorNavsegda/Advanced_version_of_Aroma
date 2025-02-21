document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (e) => {
    const item = e.target.closest(".item-card");
    const clone = item.querySelector(".item-img").cloneNode(true);
    clone.style.position = "absolute";
    clone.style.width = "50px";
    clone.style.transition = "all 0.5s";
    document.body.appendChild(clone);

    const cartIcon = document.querySelector(".cart-icon");
    const cloneRect = clone.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    clone.style.left = `${cloneRect.left}px`;
    clone.style.top = `${cloneRect.top}px`;

    setTimeout(() => {
      clone.style.left = `${cartRect.left}px`;
      clone.style.top = `${cartRect.top}px`;
      clone.style.opacity = "0";
      clone.style.transform = "scale(0.5)";
    }, 10);

    setTimeout(() => clone.remove(), 500);
  });
});

gsap.from(".logo", {
  duration: 1.5,
  opacity: 0,
  y: 50,
  ease: "power2.out",
});
