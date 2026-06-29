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

  /* ---- Helpers ---- */
  function fill(id, value, href) {
    var el = document.getElementById(id);
    if (!el || !value) return;
    if (href) { el.innerHTML = '<a href="' + href + '">' + value + '</a>'; }
    else { el.textContent = value; }
  }

  function text(selector, value) {
    var el = document.querySelector(selector);
    if (el && value) el.textContent = value;
  }

  function insertAfter(referenceNode, newNode) {
    if (!referenceNode || !referenceNode.parentNode || !newNode) return;
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  function sectionFromHTML(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  }

  function replaceListItemText(selector, values) {
    document.querySelectorAll(selector).forEach(function (li, index) {
      if (!values[index]) return;
      var svg = li.querySelector('svg');
      var clone = svg ? svg.cloneNode(true) : null;
      li.textContent = '';
      if (clone) li.appendChild(clone);
      li.appendChild(document.createTextNode(' ' + values[index]));
    });
  }

  /* ---- Preenche os dados de contato a partir do CONFIG ---- */
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

  /* ---- Ajustes de texto da versão otimizada ---- */
  text('.hero-copy h1', 'Painéis elétricos sob medida para proteger, controlar e manter sua operação em funcionamento.');
  text('.hero-copy p', 'Projetamos e montamos painéis de baixa tensão conforme a aplicação, com engenharia, montagem organizada, testes e documentação técnica.');

  text('#sobre .section-title', 'Quem somos');
  text('#sobre .section-lead', 'A WZ Montagens atua no desenvolvimento e montagem de painéis elétricos de baixa tensão para aplicações industriais, comerciais e prediais, com foco em segurança, organização e confiabilidade na entrega.');
  replaceListItemText('#sobre li', [
    'Soluções sob medida para cada instalação.',
    'Atendimento técnico próximo do levantamento à entrega.',
    'Organização interna voltada para operação e manutenção.',
    'Compromisso com segurança, clareza e responsabilidade técnica.'
  ]);
  text('.about-quote', 'Painel bem executado reduz improvisos, facilita a manutenção e aumenta a segurança da instalação.');

  text('.gallery .section-title', 'Montagem, acabamento e organização interna');
  text('.gallery .section-lead', 'Detalhes de painéis montados, cablagem, barramentos, identificação e acabamento interno.');
  text('.fbrand p', 'Engenharia e montagem de painéis elétricos de baixa tensão para aplicações industriais, comerciais e prediais.');

  document.querySelectorAll('.pill').forEach(function (pill) {
    if (pill.textContent.trim() === 'Componentes de marcas líderes') {
      pill.textContent = 'Componentes especificados conforme projeto';
    }
  });

  /* ---- Atualiza navegação: remove Serviços e direciona para Processo ---- */
  document.querySelectorAll('a[href="#servicos"]').forEach(function (link) {
    link.setAttribute('href', '#processo');
    link.textContent = 'Processo';
  });

  /* ---- Novas seções consolidadas ---- */
  if (!document.getElementById('processo')) {
    var processo = sectionFromHTML(
      '<section class="process" id="processo">' +
        '<div class="wrap">' +
          '<div class="center reveal" style="margin:0 auto;max-width:760px">' +
            '<span class="eyebrow">Como trabalhamos</span>' +
            '<h2 class="section-title" style="margin:0 auto">Do escopo técnico à entrega do painel</h2>' +
            '<p class="section-lead" style="margin:14px auto 0">Um fluxo claro reduz improvisos, melhora a especificação e facilita a instalação em campo.</p>' +
          '</div>' +
          '<div class="steps">' +
            '<div class="step reveal"><div class="dot">01</div><h3>Análise do escopo</h3><p>Levantamento da aplicação, lista de cargas, diagramas, comandos e condições de operação.</p></div>' +
            '<div class="step reveal"><div class="dot">02</div><h3>Projeto e especificação</h3><p>Definição de componentes, proteções, comando, layout interno e documentação técnica.</p></div>' +
            '<div class="step reveal"><div class="dot">03</div><h3>Montagem e identificação</h3><p>Montagem mecânica e elétrica, cablagem, organização interna e identificação dos circuitos.</p></div>' +
            '<div class="step reveal"><div class="dot">04</div><h3>Testes e entrega</h3><p>Conferência, testes funcionais, documentação e suporte para instalação e energização.</p></div>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
    document.body.appendChild(processo);
  }

  if (!document.getElementById('diferenciais')) {
    var diferenciais = sectionFromHTML(
      '<section class="standards" id="diferenciais">' +
        '<div class="wrap">' +
          '<div class="center reveal" style="margin:0 auto;max-width:760px">' +
            '<span class="eyebrow">Diferenciais técnicos</span>' +
            '<h2 class="section-title" style="margin:0 auto">Critérios que fazem diferença na montagem</h2>' +
            '<p class="section-lead" style="margin:14px auto 0">Três cuidados simples definem a qualidade final do painel: engenharia, organização interna e conferência antes da entrega.</p>' +
          '</div>' +
          '<div class="norm-grid">' +
            '<div class="norm reveal"><svg viewBox="0 0 24 24"><path d="M4 19h16M6 17V7h12v10M9 10h6M9 13h6"/></svg><div><b>Engenharia aplicada</b><small>Dimensionamento, diagramas, layout de montagem e especificação conforme a aplicação.</small></div></div>' +
            '<div class="norm reveal"><svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16M8 4v16M16 4v16"/></svg><div><b>Montagem organizada</b><small>Cablagem padronizada, identificação de circuitos e acabamento voltado para manutenção.</small></div></div>' +
            '<div class="norm reveal"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/><path d="M4 4h16v16H4z"/></svg><div><b>Ensaios e documentação</b><small>Inspeção visual, testes funcionais, conferência técnica e documentação do painel.</small></div></div>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
    document.body.appendChild(diferenciais);
  }

  if (!document.getElementById('aplicacoes')) {
    var aplicacoes = sectionFromHTML(
      '<section class="standards" id="aplicacoes">' +
        '<div class="wrap">' +
          '<div class="center reveal" style="margin:0 auto;max-width:760px">' +
            '<span class="eyebrow">Aplicações atendidas</span>' +
            '<h2 class="section-title" style="margin:0 auto">Painéis para diferentes tipos de instalação</h2>' +
            '<p class="section-lead" style="margin:14px auto 0">Soluções para distribuição, comando, automação, bombas, geradores, retrofit e sistemas prediais ou industriais.</p>' +
          '</div>' +
          '<div class="norm-grid">' +
            '<div class="norm reveal"><svg viewBox="0 0 24 24"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg><div><b>Indústrias</b><small>Painéis para distribuição, comando de máquinas, motores, processos e utilidades.</small></div></div>' +
            '<div class="norm reveal"><svg viewBox="0 0 24 24"><path d="M4 21V5h16v16M8 9h2M14 9h2M8 13h2M14 13h2M10 21v-4h4v4"/></svg><div><b>Condomínios e prédios</b><small>Quadros de força, iluminação, bombas, pressurização e sistemas técnicos prediais.</small></div></div>' +
            '<div class="norm reveal"><svg viewBox="0 0 24 24"><path d="M12 3v18M5 7h14M7 17h10M8 12h8"/></svg><div><b>Sistemas hidráulicos</b><small>Comando e proteção de recalque, drenagem, pressurização e conjuntos motobomba.</small></div></div>' +
            '<div class="norm reveal"><svg viewBox="0 0 24 24"><path d="M13 2L3 14h8l-1 8 11-13h-8z"/></svg><div><b>Geradores e QTA</b><small>Transferência entre rede e gerador, com intertravamentos e continuidade operacional.</small></div></div>' +
            '<div class="norm reveal"><svg viewBox="0 0 24 24"><path d="M4 6h16v12H4zM8 10h3M13 10h3M8 14h8"/></svg><div><b>Comando e automação</b><small>CLP, IHM, inversores, soft-starters, sinalização e controle de processos.</small></div></div>' +
            '<div class="norm reveal"><svg viewBox="0 0 24 24"><path d="M4 4v6h6M20 20v-6h-6M5 19A9 9 0 0 0 19 5M19 5h-5M5 19h5"/></svg><div><b>Retrofit de painéis</b><small>Modernização, reorganização interna, troca de componentes e atualização de comandos.</small></div></div>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
    document.body.appendChild(aplicacoes);
  }

  /* ---- Reorganização editorial da página ----
     Ordem final: Hero > Produtos > Processo > Diferenciais > Aplicações > Galeria > A Empresa > CTA > Contato > Rodapé
  ---- */
  (function organizePage() {
    var hero = document.querySelector('.hero');
    var produtos = document.getElementById('produtos');
    var processo = document.getElementById('processo');
    var diferenciais = document.getElementById('diferenciais');
    var aplicacoes = document.getElementById('aplicacoes');
    var galeria = document.getElementById('galeria');
    var sobre = document.getElementById('sobre');
    var servicos = document.getElementById('servicos');

    if (servicos && servicos.parentNode) {
      servicos.parentNode.removeChild(servicos);
    }

    insertAfter(hero, produtos);
    insertAfter(produtos, processo);
    insertAfter(processo, diferenciais);
    insertAfter(diferenciais, aplicacoes);
    insertAfter(aplicacoes, galeria);
    insertAfter(galeria, sobre);
  })();

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