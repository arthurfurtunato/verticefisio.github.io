window.VerticeApp = window.VerticeApp || {};

window.VerticeApp.initLightbox = function initLightbox() {
  const images = document.querySelectorAll(".space-image");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const caption = document.getElementById("caption");
  const closeBtn = document.querySelector(".lightbox .close");

  if (!images.length || !lightbox || !lightboxImg || !caption || !closeBtn) {
    return;
  }

  const closeLightbox = () => {
    lightbox.style.display = "none";
    lightboxImg.src = "";
    caption.textContent = "";
  };

  images.forEach((image) => {
    image.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = image.src;
      caption.textContent = image.alt;
    });
  });

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.style.display === "flex") {
      closeLightbox();
    }
  });
};
