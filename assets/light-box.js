const images = document.querySelectorAll('.space-image');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const caption = document.getElementById('caption');
const closeBtn = document.querySelector('.lightbox .close');

images.forEach(img => {
  img.addEventListener('click', function() {
    lightbox.style.display = 'flex';
    lightboxImg.src = this.src;
    caption.textContent = this.alt;
  });
});

closeBtn.onclick = function() {
  lightbox.style.display = 'none';
  lightboxImg.src = '/assets/images/clinica-generica.png';
  caption.textContent = '';
};

// Fechar ao clicar fora da imagem
lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
    caption.textContent = '';
  }
});