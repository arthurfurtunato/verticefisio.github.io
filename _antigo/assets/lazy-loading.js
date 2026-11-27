function animateCounter(element, duration = 1500) {
  const target = +element.getAttribute("data-target");
  const startTime = performance.now();

  const update = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1); // de 0 a 1
    const current = Math.floor(target * easeOutQuad(progress));

    element.textContent = getRandomNumberLike(current, target);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      if (element.classList.contains("atendimentos")) {
        element.textContent = "+" + target; // garante que o valor final seja o alvo
      } else if (element.classList.contains("consultoria")) {
        element.textContent = target + "h"; // garante que o valor final seja o alvo
      } else if (element.classList.contains("avaliacao")) {
        element.textContent = target + "/5"; // garante que o valor final seja o alvo
      } else if (element.classList.contains("espaco")) {
        element.textContent = "+" + target + "m²"; // garante que o valor final seja o alvo
      }
    }
  };

  requestAnimationFrame(update);
}

// Easing mais suave
function easeOutQuad(t) {
  return t * (2 - t);
}

// Função que simula números piscando tipo slot
function getRandomNumberLike(current, target) {
  const currentStr = current.toString().padStart(target.toString().length, "0");
  let result = "";

  for (let i = 0; i < currentStr.length; i++) {
    if (Math.random() < 0.3) {
      result += Math.floor(Math.random() * 10);
    } else {
      result += currentStr[i];
    }
  }

  return result;
}

// Lazy loading para a seção de números

const target = document.querySelector("#section-to-load");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      console.log("Intersection entry:", entry);
      if (entry.isIntersecting) {
        target.innerHTML = `
        <div class="info-card-number">
            <i class="fa-solid fa-users info-icon"></i>
            <div class="info-title">Atendimentos</div>
            <div class="info-value atendimentos animated" data-target="4600">0</div>
        </div>
        <div class="info-card-number">
            <i class="fa-solid fa-globe info-icon"></i>
            <div class="info-title">Consultoria Online</div>
            <div class="info-value consultoria" data-target="24">24h</div>
            </div>
        <div class="info-card-number">
            <img src="assets/img/5_estrelas.png" alt="Avaliação Média">
            <div class="info-title">Avaliação Média</div>
            <div class="info-value avaliacao" data-target="5">5/5</div>
        </div>
        <div class="info-card-number">
            <i class="fa-solid fa-building info-icon"></i>
            <div class="info-title">Espaço</div>
            <div class="info-value espaco" data-target="80">+80m²</div>
        </div>`;

        const counters = document.querySelectorAll(
          ".info-card-number .animated"
        );
        counters.forEach((counter) => {
          animateCounter(counter);
        });

        observer.unobserve(entry.target); // para não carregar novamente
      }
    });
  },
  {
    threshold: 0.1, // quando 10% da seção aparecer
  }
);

observer.observe(target);
