window.VerticeApp = window.VerticeApp || {};

function easeOutQuad(progress) {
  return progress * (2 - progress);
}

function randomizeNumberLike(current, targetLength) {
  const currentString = String(current).padStart(targetLength, "0");
  let result = "";

  for (let index = 0; index < currentString.length; index += 1) {
    if (Math.random() < 0.3) {
      result += Math.floor(Math.random() * 10);
    } else {
      result += currentString[index];
    }
  }

  return result;
}

function finalCounterText(element, target) {
  if (element.classList.contains("atendimentos")) {
    return `+${target}`;
  }
  if (element.classList.contains("consultoria")) {
    return `${target}h`;
  }
  if (element.classList.contains("avaliacao")) {
    return `${target}/5`;
  }
  if (element.classList.contains("espaco")) {
    return `+${target}m²`;
  }
  return `${target}`;
}

function animateCounter(element, duration = 1500) {
  const target = Number(element.getAttribute("data-target"));
  if (!Number.isFinite(target)) {
    return;
  }

  const startTime = performance.now();
  const targetLength = String(target).length;

  const update = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(target * easeOutQuad(progress));

    if (progress < 1) {
      element.textContent = randomizeNumberLike(current, targetLength);
      requestAnimationFrame(update);
      return;
    }

    element.textContent = finalCounterText(element, target);
  };

  requestAnimationFrame(update);
}

window.VerticeApp.initLazyLoadingCounters = function initLazyLoadingCounters() {
  const section = document.querySelector("#section-to-load");
  if (!section) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const counters = section.querySelectorAll(".info-value[data-target]");
        counters.forEach((counter) => animateCounter(counter));
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.1 },
  );

  observer.observe(section);
};
