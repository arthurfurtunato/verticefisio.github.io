const formulario_contato = document.querySelector(".contact-form");

formulario_contato.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.querySelector("#nome").value;
  const email = document.querySelector("#email").value;
  const mensagem = document.querySelector("#mensagem").value;

  const whatsappNumber = "5584999732011";
  const whatsappMessage = `Olá, meu nome é ${nome}. Meu e-mail é ${email}. ${mensagem}`;

  const mensagemEncoded = encodeURIComponent(whatsappMessage);

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${mensagemEncoded}`;

  window.open(whatsappUrl, "_blank");
});