# WZ Montagens — Relatório de Pendências (v1)

Primeira versão do site institucional publicada. Abaixo está tudo o que precisa
ser **definido, confirmado ou substituído** antes de colocar no ar. Os pontos já
marcados no próprio site aparecem com a etiqueta amarela **"a definir"**.

---

## 1. Identidade e marca
- [ ] **Logo oficial em arquivo** (SVG/PNG de alta resolução). A logo atual
  (`assets/img/logo.svg`) é uma **recriação aproximada** a partir da imagem
  enviada — engrenagem + "WZ" + "MONTAGENS". Confirmar fonte exata, espaçamento
  e tom dos cinzas, ou enviar o vetor original.
- [ ] **Paleta de cores oficial.** Usei preto/grafite + prata metálica + branco,
  com um dourado discreto (`--accent`) para detalhes premium. Confirmar se
  mantemos o dourado ou trocamos por azul técnico / só monocromático.
- [ ] **Slogan / assinatura** da empresa (atualmente: *"Engenharia que energiza a sua operação"* — sugestão, pode trocar).

## 2. Fotos e imagens (importante)
- [ ] **Fotos reais de painéis montados** (QGBT, CCM, quadros de distribuição,
  comando/automação, banco de capacitores). Hoje o site usa uma **ilustração
  vetorial** no hero (`assets/img/panel-qgbt.svg`) como placeholder.
- [ ] Fotos da **equipe / oficina / processo de montagem** (dão credibilidade).
- [ ] Foto de **fachada / instalações** (se houver).
> Observação: não baixei fotos da internet por questão de **direitos de uso**.
> O ideal são fotos próprias da WZ; alternativamente, posso usar bancos de
> imagem licenciados se você autorizar.

## 3. Dados de contato (todos provisórios)
- [ ] **Telefone / WhatsApp** — hoje `(00) 0000-0000`.
  - Atualizar o número real em `assets/js/main.js` → `CONFIG.whatsapp`
    (formato internacional: `55` + DDD + número, ex.: `5511999998888`).
- [ ] **E-mail** — hoje `contato@wzmontagens.com.br` (em `CONFIG.email`). Confirmar.
- [ ] **Endereço completo** (rua, cidade, UF, CEP).
- [ ] **Horário de atendimento**.
- [ ] **CNPJ / Razão social** (rodapé).
- [ ] **Redes sociais** (Instagram, LinkedIn, etc.) — ainda não há links no site.

## 4. Conteúdo institucional
- [ ] **Números reais** para a faixa de estatísticas (anos de experiência,
  painéis entregues, etc.) — hoje `+00 / +000`.
- [ ] **Texto "A Empresa"** revisado pela WZ (história, missão, área de atuação,
  cidades/regiões atendidas).
- [ ] **Lista definitiva de produtos.** Incluí os mais comuns do setor (QGBT,
  CCM, QDC/QDLuz, QTA, Comando & Automação, Banco de Capacitores). Confirmar,
  adicionar ou remover (ex.: cubículos, painéis à prova de explosão, QDFs).
- [ ] **Diferenciais reais** (marcas de componentes que trabalham — WEG,
  Schneider, Siemens, ABB? — certificações que possuem).
- [ ] **Normas aplicáveis** — listei NBR IEC 61439, NR-10, NR-12, NBR 5410.
  Confirmar quais a WZ de fato segue/declara.

## 5. Funcionalidades técnicas
- [ ] **Formulário de contato**: hoje abre o app de e-mail do visitante (`mailto`).
  Para receber direto na caixa de entrada ou num CRM, definir back-end
  (ex.: Formspree, EmailJS, ou um endpoint PHP/serverless).
- [ ] **Domínio** (ex.: `wzmontagens.com.br`) e **hospedagem** (sugiro GitHub
  Pages, Netlify ou Vercel — o site é estático e leve).
- [ ] **Google Analytics / Tag** e **Google Search Console** (se quiser métricas).
- [ ] **Página de Política de Privacidade / LGPD** (recomendado se houver formulário).

## 6. Itens opcionais / próximas fases (sugestões)
- [ ] **Catálogo / portfólio** com galeria de painéis por categoria.
- [ ] **Página de cases / clientes atendidos**.
- [ ] **Certificados e documentos** para download (PDF).
- [ ] **Versão em inglês** (se atender exportação).
- [ ] **Blog / área técnica** para SEO.

---

## Estrutura entregue
```
index.html              → site principal (one-page)
assets/css/styles.css   → estilos
assets/js/main.js       → interações (menu, animações, WhatsApp, formulário)
assets/img/logo.svg     → logo (recriação — substituir pelo oficial)
assets/img/favicon.svg  → ícone do navegador
assets/img/panel-qgbt.svg → ilustração placeholder do hero
demos/ventilador.html   → demo anterior (preservado, fora do site)
harpa/                  → conteúdo anterior (intacto)
```

## Como atualizar o contato rapidamente
Edite o topo de `assets/js/main.js`:
```js
var CONFIG = {
  whatsapp: '5511999998888',          // seu número real
  email: 'contato@wzmontagens.com.br' // seu e-mail real
};
```
E os blocos de telefone/e-mail/endereço na seção **#contato** e no rodapé do `index.html`.
