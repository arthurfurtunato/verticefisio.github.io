window.VerticeApp = window.VerticeApp || {};

window.VerticeApp.initNavbar = function initNavbar() {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      navLinks.classList.toggle("open");
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(target) &&
        !menuToggle.contains(target)
      ) {
        navLinks.classList.remove("open");
      }
    });
  }

  const scrollTopHandler = (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const linkInicio = document.getElementById("link-inicio");
  const iconeInicio = document.getElementById("icone-inicio");

  if (linkInicio) {
    linkInicio.addEventListener("click", scrollTopHandler);
  }

  if (iconeInicio) {
    iconeInicio.addEventListener("click", scrollTopHandler);
  }
};
