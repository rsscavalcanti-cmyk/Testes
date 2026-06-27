/* ===========================================================
   WZ Montagens — interações do site
   =========================================================== */
(function () {
  'use strict';

  /* ---- Configuração de contato (ATUALIZAR quando definido) ---- */
  var CONFIG = {
    whatsapp: '5500000000000',          // DDI+DDD+número — a definir
    email: 'contato@wzmontagens.com.br' // a confirmar
  };
  var WA_TEXT = encodeURIComponent('Olá! Gostaria de um orçamento de painel elétrico.');
  var WA_URL = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + WA_TEXT;

  document.querySelectorAll('#waFloat, #ctaWa').forEach(function (el) {
    el.setAttribute('href', WA_URL);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* ---- Ano no rodapé ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Header sombra ao rolar ---- */
  var header = document.getElementById('header');
  var onScroll = function () {
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Menu mobile ---- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Formulário → abre cliente de e-mail (mailto) ----
     Placeholder até definir back-end (PHP/Formspree/etc). */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var f = form.elements;
      if (!f.nome.value.trim() || !f.telefone.value.trim() || !f.email.value.trim()) {
        alert('Por favor, preencha nome, telefone e e-mail.');
        return;
      }
      var corpo =
        'Nome: ' + f.nome.value + '\n' +
        'Empresa: ' + (f.empresa.value || '-') + '\n' +
        'Telefone: ' + f.telefone.value + '\n' +
        'E-mail: ' + f.email.value + '\n' +
        'Tipo: ' + (f.tipo.value || '-') + '\n\n' +
        'Mensagem:\n' + (f.msg.value || '-');
      var assunto = 'Solicitação de orçamento — WZ Montagens';
      window.location.href = 'mailto:' + CONFIG.email +
        '?subject=' + encodeURIComponent(assunto) +
        '&body=' + encodeURIComponent(corpo);
    });
  }
})();
