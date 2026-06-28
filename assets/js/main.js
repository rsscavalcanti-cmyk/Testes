/* ===========================================================
   WZ Montagens — interações do site
   =========================================================== */
(function () {
  'use strict';

  /* ============================================================
     >>> CONTATO — DADOS OFICIAIS DA EMPRESA <<<
     Este bloco alimenta a seção Contato, rodapé, WhatsApp e e-mail.
     ============================================================ */
  var CONFIG = {
    whatsapp:      '553195899225',
    whatsappLabel: '(31) 9589-9225',
    phone:         '(31) 9589-9225',
    email:         'wzmontagens@gmail.com',
    formEndpoint:  'https://formsubmit.co/ajax/wzmontagens@gmail.com',
    address:       'Avelino Andrade, 241 - Lagoa Dourada, MG - 36345-000',
    hours:         'Seg a Sex, 08h–18h',
    cnpj:          '60.047.617/0001-94',
    city:          'Lagoa Dourada / MG',
    legalName:     'WZ Montagens LTDA'
  };

  /* ---- WhatsApp ---- */
  var WA_TEXT = encodeURIComponent('Olá! Gostaria de um orçamento de painel elétrico.');
  document.querySelectorAll('#waFloat, #ctaWa').forEach(function (el) {
    if (CONFIG.whatsapp) {
      el.setAttribute('href', 'https://wa.me/' + CONFIG.whatsapp + '?text=' + WA_TEXT);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    } else {
      el.setAttribute('href', '#contato');
    }
  });

  /* ---- Preenche os dados de contato a partir do CONFIG ---- */
  function fill(id, value, href) {
    var el = document.getElementById(id);
    if (!el || !value) return;
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
    if (c) c.textContent = CONFIG.legalName + ' · CNPJ ' + CONFIG.cnpj;
  }
  document.querySelectorAll('.pending').forEach(function (el) {
    el.parentNode && el.parentNode.removeChild(el);
  });

  var contactLead = document.querySelector('.contact-info .section-lead');
  if (contactLead) {
    contactLead.textContent = 'Preencha o formulário ou utilize um dos canais abaixo.';
  }

  /* ---- Intro: remove o overlay do DOM após animar (limpeza) ---- */
  var intro = document.getElementById('intro');
  if (intro) {
    if (document.documentElement.classList.contains('no-intro')) {
      intro.parentNode && intro.parentNode.removeChild(intro);
    } else {
      setTimeout(function () {
        intro.parentNode && intro.parentNode.removeChild(intro);
      }, 2900);
    }
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

  /* ---- Formulário: envio direto pela página ---- */
  var form = document.getElementById('contactForm');
  if (form) {
    var note = form.querySelector('.form-note');
    var submitBtn = form.querySelector('button[type="submit"]');
    var originalBtnText = submitBtn ? submitBtn.textContent : 'Enviar solicitação';

    if (note) {
      note.textContent = '* Campos obrigatórios. Sua solicitação será enviada diretamente pelo formulário.';
    }

    var status = document.getElementById('formStatus');
    if (!status) {
      status = document.createElement('p');
      status.id = 'formStatus';
      status.className = 'form-note';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      form.appendChild(status);
    }

    function setStatus(kind, message) {
      status.textContent = message || '';
      status.style.marginTop = message ? '12px' : '0';
      status.style.fontWeight = message ? '700' : '';
      status.style.color = kind === 'ok' ? '#166534' : (kind === 'error' ? '#92400e' : '#5b5e66');
    }

    function setSending(isSending) {
      if (!submitBtn) return;
      submitBtn.disabled = isSending;
      submitBtn.textContent = isSending ? 'Enviando...' : originalBtnText;
      submitBtn.style.opacity = isSending ? '.75' : '';
      submitBtn.style.cursor = isSending ? 'wait' : '';
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var f = form.elements;
      if (!f.nome.value.trim() || !f.telefone.value.trim() || !f.email.value.trim()) {
        setStatus('error', 'Por favor, preencha nome, telefone e e-mail.');
        return;
      }

      var payload = new FormData(form);
      payload.append('_subject', 'Solicitação de orçamento — WZ Montagens');
      payload.append('_template', 'table');
      payload.append('_captcha', 'false');
      payload.append('_replyto', f.email.value.trim());
      payload.append('Origem', window.location.href);

      setStatus('', '');
      setSending(true);

      fetch(CONFIG.formEndpoint, {
        method: 'POST',
        body: payload,
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (!response.ok) throw new Error('Falha no envio');
        form.reset();
        setStatus('ok', 'Solicitação enviada com sucesso. Em breve entraremos em contato.');
      }).catch(function () {
        setStatus('error', 'Não foi possível enviar automaticamente agora. Você também pode falar conosco pelo WhatsApp ou pelo e-mail ' + CONFIG.email + '.');
      }).finally(function () {
        setSending(false);
      });
    });
  }
})();
