# Configuração do domínio www.wzmontagens.com.br

Documento de apoio para conectar o site (hoje em `rsscavalcanti-cmyk.github.io/Testes/`) ao
domínio próprio **www.wzmontagens.com.br**. A hospedagem é **gratuita** (GitHub Pages); o domínio
apenas troca o endereço.

**Modelo combinado**
- **Dono do domínio (titular):** WZ Montagens — CNPJ 60.047.617/0001-94.
- **Operador do site:** quem administra o repositório no GitHub.
- **Executora:** System Engenharia (faz a compra e o DNS, em nome da WZ).
- **Endereço principal:** `www` (o `wzmontagens.com.br` redireciona para o `www`).

---

## Parte 1 — System Engenharia

### 1.1 Registrar o domínio (Registro.br)
- Registrar **wzmontagens.com.br** em https://registro.br
- **Titular = CNPJ da WZ (60.047.617/0001-94)**. Contato/e-mail da conta sob controle da WZ
  (ex.: wzmontagens@gmail.com). Custo ~R$40/ano. Ativar **renovação automática**.

### 1.2 Cadastrar o DNS (painel "Editar zona DNS" do Registro.br)
Apontando para o GitHub Pages:

**Apex (wzmontagens.com.br) — 4 registros A**

| Tipo | Nome | Valor |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**(Opcional, IPv6) — 4 registros AAAA**

| Tipo | Nome | Valor |
|------|------|-------|
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |

**www (principal) — CNAME**

| Tipo | Nome | Valor |
|------|------|-------|
| CNAME | www | rsscavalcanti-cmyk.github.io |

**(Opcional, segurança) — TXT de verificação do GitHub**
Token gerado pelo operador em GitHub → Settings da conta → Pages → "Verify domains".

| Tipo | Nome | Valor |
|------|------|-------|
| TXT | _github-pages-challenge-rsscavalcanti-cmyk | (token informado pelo operador) |

> Ao concluir, **avisar o operador** que o DNS já está cadastrado.

---

## Parte 2 — Operador do site (GitHub), no cutover
Só depois do DNS cadastrado (Parte 1.2):
1. Repositório → **Settings → Pages → Custom domain** → digitar `www.wzmontagens.com.br` → **Save**.
2. Aguardar a propagação do DNS (minutos a ~24h) e o GitHub emitir o certificado SSL.
3. Marcar **"Enforce HTTPS"**.

> Isso cria o arquivo `CNAME` no repositório com `www.wzmontagens.com.br`.

---

## ⚠️ Ordem para não derrubar o site
O domínio personalizado faz o endereço antigo redirecionar para o novo. Para não tirar o site do ar:

**1) registrar domínio → 2) cadastrar o DNS → 3) só então definir o domínio no GitHub.**

---

## Conferência final
- `https://www.wzmontagens.com.br` abre o site com cadeado (HTTPS).
- `https://wzmontagens.com.br` redireciona para o `www`.
- GitHub → Settings → Pages: domínio com check verde e "Enforce HTTPS" ativo.
