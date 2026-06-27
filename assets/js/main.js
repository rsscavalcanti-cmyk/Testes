/* ===========================================================
   WZ Montagens — interações do site
   =========================================================== */
(function () {
  'use strict';

  /* ============================================================
     >>> CONTATO — PREENCHA AQUI QUANDO TIVER OS DADOS <<<
     Edite só este bloco: o site (seção Contato, rodapé, WhatsApp
     e e-mail) é atualizado automaticamente. Deixe '' no que ainda
     não tiver — o campo mantém o aviso "a definir".
     ============================================================ */
  var CONFIG = {
    whatsapp:      '',  // só dígitos: 55 + DDD + número. Ex.: '5511999998888'
    whatsappLabel: '',  // como aparece. Ex.: '(11) 99999-8888'
    phone:         '',  // telefone fixo (opcional). Ex.: '(11) 3333-4444'
    email:         '',  // Ex.: 'contato@wzmontagens.com.br'
    address:       '',  // Ex.: 'Rua Exemplo, 123 - Bairro - Cidade/UF'
    hours:         'Seg a Sex, 08h–18h',
    cnpj:          '',  // Ex.: '00.000.000/0001-00'
    city:          ''   // rodapé. Ex.: 'São Paulo / SP'
  };

  /* ---- WhatsApp ---- */
  var WA_TEXT = encodeURIComponent('Olá! Gostaria de um orçamento de painel elétrico.');
  document.querySelectorAll('#waFloat, #ctaWa').forEach(function (el) {
    if (CONFIG.whatsapp) {
      el.setAttribute('href', 'https://wa.me/' + CONFIG.whatsapp + '?text=' + WA_TEXT);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    } else {
      el.setAttribute('href', '#contato');   // sem número ainda → leva ao formulário
    }
  });

  /* ---- Preenche os dados de contato a partir do CONFIG ---- */
  function fill(id, value, href) {
    var el = document.getElementById(id);
    if (!el || !value) return;            // vazio: mantém placeholder + "a definir"
    if (href) { el.innerHTML = '<a href="' + href + '">' + value + '</a>'; }
    else { el.textContent = value; }
  }
  var foneTxt = CONFIG.whatsappLabel || CONFIG.phone;
  fill('cFone', foneTxt, CONFIG.whatsapp ? 'https://wa.me/' + CONFIG.whatsapp : null);
  fill('cEmail', CONFIG.email, CONFIG.email ? 'mailto:' + CONFIG.email : null);
  fill('cEnd', CONFIG.address);
  fill('cHora', CONFIG.hours);
  fill('fFone', foneTxt);
  fill('fEmail', CONFIG.email);
  fill('fEnd', CONFIG.city || CONFIG.address);
  if (CONFIG.cnpj) {
    var c = document.getElementById('cnpjLine');
    if (c) c.textContent = 'CNPJ ' + CONFIG.cnpj;
  }

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
      var dest = CONFIG.email || 'contato@wzmontagens.com.br';
      window.location.href = 'mailto:' + dest +
        '?subject=' + encodeURIComponent(assunto) +
        '&body=' + encodeURIComponent(corpo);
    });
  }
})();
