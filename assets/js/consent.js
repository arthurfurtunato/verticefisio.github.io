/* Clínica Vértice · aviso de cookies + Google Analytics 4 (LGPD)
   O GA4 só carrega depois que a pessoa clica em "Aceitar". Recusou: nada é coletado.
   A escolha fica salva no navegador (localStorage "vertice-cookies": "sim" | "nao").
   Eventos enviados (sem nenhum dado pessoal): clique_whatsapp e clique_telefone, com o local do botão. */
(function () {
  var ID = document.currentScript && document.currentScript.getAttribute('data-ga');
  if (!ID) return;
  var KEY = 'vertice-cookies', loaded = false;

  function choice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadGA() {
    if (loaded) return; loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', ID);
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(s);
  }

  function where(a) {
    if (a.closest('.wa-float')) return 'botao_flutuante';
    if (a.closest('.site-header')) return 'cabecalho';
    if (a.closest('.hero')) return 'topo_pagina';
    if (a.closest('.site-footer')) return 'rodape';
    return 'conteudo';
  }

  document.addEventListener('click', function (ev) {
    if (!loaded) return;
    var a = ev.target.closest && ev.target.closest('a[href]');
    if (!a) return;
    var h = a.getAttribute('href');
    var name = h.indexOf('wa.me/') > -1 ? 'clique_whatsapp' : (h.indexOf('tel:') === 0 ? 'clique_telefone' : null);
    if (name) gtag('event', name, { local: where(a), pagina: location.pathname });
  }, true);

  function banner() {
    var b = document.createElement('div');
    b.className = 'cc'; b.setAttribute('role', 'dialog'); b.setAttribute('aria-label', 'Aviso de cookies');
    b.innerHTML = '<p>Usamos cookies para entender como o site é usado e melhorar o atendimento. ' +
      'Nenhum dado de saúde é coletado.</p>' +
      '<div class="cc-act"><button type="button" class="btn btn-sand btn-sm" data-v="sim">Aceitar</button>' +
      '<button type="button" class="btn btn-ghost-cc btn-sm" data-v="nao">Recusar</button></div>';
    b.addEventListener('click', function (ev) {
      var v = ev.target.getAttribute && ev.target.getAttribute('data-v');
      if (!v) return;
      save(v); b.remove(); document.body.classList.remove('cc-open');
      if (v === 'sim') loadGA();
    });
    document.body.appendChild(b); document.body.classList.add('cc-open');
  }

  var c = choice();
  if (c === 'sim') loadGA();
  else if (c !== 'nao') {
    if (document.body) banner(); else document.addEventListener('DOMContentLoaded', banner);
  }
})();
