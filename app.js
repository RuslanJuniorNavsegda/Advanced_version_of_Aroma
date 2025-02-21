// app.js
document.addEventListener("DOMContentLoaded", () => {
  // Инициализация AOS
  AOS.init({
    duration: 1000,
    once: true,
    offset: 120,
  });

  // Мобильное меню
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Фильтрация меню
  document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(".filter.active").classList.remove("active");
      button.classList.add("active");
      const filter = button.dataset.filter;

      document.querySelectorAll(".item-card").forEach((item) => {
        item.style.display =
          filter === "all" || item.classList.contains(filter)
            ? "block"
            : "none";
      });
    });
  });

  // Корзина
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const updateCartCount = () => {
    document.querySelector(".cart-count").textContent = cart.length;
  };

  // Инициализация Swiper
  new Swiper(".reviews-slider", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
    },
  });

  // Прелоадер
  window.addEventListener("load", () => {
    document.querySelector(".preloader").style.display = "none";
  });
});
