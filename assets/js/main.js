/* ===========================================================
   WZ Montagens — interações do site
   =========================================================== */
(function () {
  'use strict';

  /* ============================================================
     >>> CONTATO — DADOS OFICIAIS DA EMPRESA <<<
     Editar só aqui: alimenta a seção Contato, o rodapé, o WhatsApp
     e o e-mail. (O HTML já traz os mesmos valores para funcionar
     mesmo sem JavaScript / para SEO.)
     ============================================================ */
  var CONFIG = {
    whatsapp:      '553195899225',                              // só dígitos: 55 + DDD + número
    whatsappLabel: '(31) 9589-9225',
    phone:         '(31) 9589-9225',
    email:         'wzmontagens@gmail.com',
    formEndpoint:  'https://formsubmit.co/ajax/wzmontagens@gmail.com',
    address:       'Lagoa Dourada / MG',
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

  /* ---- Preenche dados de contato a partir do CONFIG ---- */
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

  /* ---- Hero: carrossel com a imagem inicial + qgbt2 ---- */
  function setupHeroCarousel() {
    var hero = document.querySelector('.hero-visual');
    if (!hero) return;

    var original = hero.querySelector('img.photo');
    if (!original || hero.querySelector('.hero-carousel')) return;

    var currentSrc = original.getAttribute('src') || 'assets/img/painel-frontal.jpg';
    var currentAlt = original.getAttribute('alt') || 'Painel elétrico de baixa tensão montado pela WZ Montagens';
    var qgbt2Options = [
      'assets/img/qgbt2.png',
      'assets/img/qgbt2.jpg',
      'assets/img/qgbt2.jpeg',
      'assets/img/qgbt2.webp',
      'assets/img/qgbt2.svg'
    ];

    function injectCarouselStyles() {
      if (document.getElementById('heroCarouselStyles')) return;
      var style = document.createElement('style');
      style.id = 'heroCarouselStyles';
      style.textContent = [
        '.hero-carousel{position:relative;border-radius:16px;overflow:hidden;background:#eef0f3;box-shadow:var(--shadow-lg);border:1px solid rgba(255,255,255,.08)}',
        '.hero-carousel-track{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;-webkit-overflow-scrolling:touch;scrollbar-width:none}',
        '.hero-carousel-track::-webkit-scrollbar{display:none}',
        '.hero-carousel .hero-slide{flex:0 0 100%;width:100%;aspect-ratio:1/1;object-fit:cover;object-position:center;scroll-snap-align:center;border-radius:0!important;box-shadow:none!important;border:0!important;background:#eef0f3}',
        '.hero-carousel-nav{position:absolute;top:50%;transform:translateY(-50%);width:38px;height:38px;border-radius:50%;border:1px solid rgba(255,255,255,.7);background:rgba(14,15,18,.48);color:#fff;display:grid;place-items:center;font-size:1.4rem;line-height:1;cursor:pointer;backdrop-filter:blur(6px);transition:.18s;z-index:3}',
        '.hero-carousel-nav:hover{background:rgba(14,15,18,.72);transform:translateY(-50%) scale(1.04)}',
        '.hero-carousel-nav.prev{left:12px}',
        '.hero-carousel-nav.next{right:12px}',
        '.hero-carousel-dots{position:absolute;left:0;right:0;bottom:12px;display:flex;justify-content:center;gap:8px;z-index:4}',
        '.hero-carousel-dot{width:9px;height:9px;border-radius:50%;border:0;background:rgba(255,255,255,.55);cursor:pointer;box-shadow:0 1px 6px rgba(0,0,0,.24)}',
        '.hero-carousel-dot.is-active{background:#fff;transform:scale(1.18)}',
        '@media(max-width:680px){.hero-carousel-nav{width:34px;height:34px;font-size:1.2rem}.hero-carousel-dots{bottom:10px}.hero-carousel .hero-slide{aspect-ratio:4/3}}'
      ].join('\n');
      document.head.appendChild(style);
    }

    function findSecondImage(index) {
      if (index >= qgbt2Options.length) return;
      var img = new Image();
      img.onload = function () { buildCarousel(qgbt2Options[index]); };
      img.onerror = function () { findSecondImage(index + 1); };
      img.src = qgbt2Options[index];
    }

    function buildCarousel(secondSrc) {
      injectCarouselStyles();

      var carousel = document.createElement('div');
      carousel.className = 'hero-carousel';
      carousel.setAttribute('aria-label', 'Imagens de painéis elétricos WZ Montagens');

      var track = document.createElement('div');
      track.className = 'hero-carousel-track';

      var slides = [
        { src: currentSrc, alt: currentAlt },
        { src: secondSrc, alt: 'Painel elétrico aberto com componentes internos organizados' }
      ];

      slides.forEach(function (slide) {
        var img = document.createElement('img');
        img.className = 'photo hero-slide';
        img.src = slide.src;
        img.alt = slide.alt;
        img.loading = slide.src === currentSrc ? 'eager' : 'lazy';
        track.appendChild(img);
      });

      var prev = document.createElement('button');
      prev.type = 'button';
      prev.className = 'hero-carousel-nav prev';
      prev.setAttribute('aria-label', 'Imagem anterior');
      prev.innerHTML = '&#8249;';

      var next = document.createElement('button');
      next.type = 'button';
      next.className = 'hero-carousel-nav next';
      next.setAttribute('aria-label', 'Próxima imagem');
      next.innerHTML = '&#8250;';

      var dots = document.createElement('div');
      dots.className = 'hero-carousel-dots';
      var dotButtons = slides.map(function (_, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'hero-carousel-dot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', 'Ver imagem ' + (i + 1));
        dot.addEventListener('click', function () {
          track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
        });
        dots.appendChild(dot);
        return dot;
      });

      function go(delta) {
        var index = Math.round(track.scrollLeft / track.clientWidth);
        var nextIndex = (index + delta + slides.length) % slides.length;
        track.scrollTo({ left: nextIndex * track.clientWidth, behavior: 'smooth' });
      }

      function updateDots() {
        var index = Math.round(track.scrollLeft / track.clientWidth);
        dotButtons.forEach(function (dot, i) {
          dot.classList.toggle('is-active', i === index);
        });
      }

      var scrollTimer;
      track.addEventListener('scroll', function () {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(updateDots, 80);
      }, { passive: true });
      window.addEventListener('resize', updateDots);
      prev.addEventListener('click', function () { go(-1); });
      next.addEventListener('click', function () { go(1); });

      /* autoplay: passa as imagens automaticamente */
      var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
      var autoTimer;
      function startAuto() { if (reduceMotion) return; stopAuto(); autoTimer = setInterval(function () { go(1); }, 5000); }
      function stopAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }
      function resetAuto() { stopAuto(); startAuto(); }
      carousel.addEventListener('mouseenter', stopAuto);
      carousel.addEventListener('mouseleave', startAuto);
      carousel.addEventListener('touchstart', stopAuto, { passive: true });
      prev.addEventListener('click', resetAuto);
      next.addEventListener('click', resetAuto);
      dotButtons.forEach(function (d) { d.addEventListener('click', resetAuto); });

      carousel.appendChild(track);
      carousel.appendChild(prev);
      carousel.appendChild(next);
      carousel.appendChild(dots);
      hero.replaceChildren(carousel);
      startAuto();
    }

    findSecondImage(0);
  }
  setupHeroCarousel();

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

  /* ---- Formulário: envio direto pela página (AJAX) ---- */
  var form = document.getElementById('contactForm');
  if (form) {
    var submitBtn = form.querySelector('button[type="submit"]');
    var originalBtnText = submitBtn ? submitBtn.textContent : 'Enviar solicitação';

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