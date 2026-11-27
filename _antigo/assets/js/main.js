document.addEventListener("DOMContentLoaded", () => {
  const app = window.VerticeApp || {};
  if (typeof app.initNavbar === "function") {
    app.initNavbar();
  }
  if (typeof app.initWhatsappForm === "function") {
    app.initWhatsappForm();
  }
  if (typeof app.initLightbox === "function") {
    app.initLightbox();
  }
  if (typeof app.initCarousel === "function") {
    app.initCarousel();
  }
  if (typeof app.initLazyLoadingCounters === "function") {
    app.initLazyLoadingCounters();
  }
});
