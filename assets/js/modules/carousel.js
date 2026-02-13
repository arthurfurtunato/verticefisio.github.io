window.VerticeApp = window.VerticeApp || {};

window.VerticeApp.initCarousel = function initCarousel() {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  if (!slides.length || !prevBtn || !nextBtn) {
    return;
  }

  let currentSlide = 0;

  const showSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === currentSlide);
    });
  };

  nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
  prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));

  showSlide(currentSlide);
};
