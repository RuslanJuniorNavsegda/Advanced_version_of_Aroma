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
  const body = document.body;

  // Переключение меню
  const toggleMenu = () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "auto";
  };

  // Обработчики событий
  hamburger.addEventListener("click", toggleMenu);

  // Закрытие меню при клике вне области
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".nav-menu") &&
      !e.target.closest(".hamburger") &&
      navMenu.classList.contains("active")
    ) {
      toggleMenu();
    }
  });

  // Закрытие меню при ресайзе
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992 && navMenu.classList.contains("active")) {
      toggleMenu();
    }
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

// Корзина
const cartModal = document.querySelector(".cart-modal");
const cartItemsContainer = document.querySelector(".cart-items");

function showCart() {
  cartModal.classList.add("active");
}

function updateCartDisplay() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <div class="item-info">
        <h4>${item.name}</h4>
        <p>${item.price}₽</p>
      </div>
      <div class="item-controls">
        <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
        <button class="remove-item" data-index="${index}">&times;</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
    total += item.price * item.quantity;
  });

  document.querySelector(".cart-total span").textContent = `${total}₽`;
}

// Обработчики корзины
document.querySelector(".cart-icon").addEventListener("click", showCart);
document.querySelector(".close-cart").addEventListener("click", () => {
  cartModal.classList.remove("active");
});
