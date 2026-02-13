window.VerticeApp = window.VerticeApp || {};

window.VerticeApp.initWhatsappForm = function initWhatsappForm() {
  const form = document.querySelector(".contact-form");
  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.querySelector("#nome");
    const emailInput = document.querySelector("#email");
    const messageInput = document.querySelector("#mensagem");

    if (!nameInput || !emailInput || !messageInput) {
      return;
    }

    const nome = nameInput.value.trim();
    const email = emailInput.value.trim();
    const mensagem = messageInput.value.trim();

    const whatsappNumber = "5584999732011";
    const whatsappMessage = `Olá, meu nome é ${nome}. Meu e-mail é ${email}. ${mensagem}`;
    const mensagemEncoded = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${mensagemEncoded}`;

    window.open(whatsappUrl, "_blank");
  });
};
