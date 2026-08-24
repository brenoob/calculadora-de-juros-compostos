<div align="center">

# Calculadora de Juros Compostos

**Simule o crescimento do seu dinheiro com juros compostos — direto no navegador.**

[![CI](https://img.shields.io/github/actions/workflow/status/brenoob/calculadora-de-juros-compostos/ci.yml?branch=main&label=CI&logo=github)](https://github.com/brenoob/calculadora-de-juros-compostos/actions/workflows/ci.yml)
[![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-green.svg)](LICENSE)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-149eca?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss)
![Vitest](https://img.shields.io/badge/Vitest-testes-729b1b?logo=vitest)

[Ver demo ao vivo](https://calculadora-de-juros-compostos-kappa-inky.vercel.app) · [Reportar bug](../../issues) · [Sugerir melhoria](../../issues)

<img src="https://calculadora-de-juros-compostos-kappa-inky.vercel.app/opengraph-image" alt="Prévia da calculadora de juros compostos" width="720" />

</div>

---

## Sobre

Aplicação web para simular investimentos com **juros compostos**: informe o depósito inicial, o aporte mensal, a taxa de juros anual e o período (em anos ou meses) para ver quanto seu dinheiro rende ao longo do tempo.

A lógica de cálculo é 100% open source e testada — veja [`lib/compound-interest.ts`](lib/compound-interest.ts).

## Funcionalidades

| Funcionalidade      | Descrição                                                                    |
| ------------------- | ---------------------------------------------------------------------------- |
| Simulação completa  | Depósito inicial, aportes mensais, taxa anual e período em anos ou meses     |
| Montante final      | Total investido vs. total em juros, com percentual de juros sobre o montante |
| Gráfico de evolução | Barras empilhadas mostrando investido (azul) e juros (verde) por período     |
| Tabela detalhada    | Evolução mensal ou anual com rolagem                                         |
| Responsivo          | Layout adaptado para celular, tablet e desktop                               |

## Como funciona o cálculo

Juros compostos com capitalização mensal:

```
M = P · (1 + i)^n + C · [((1 + i)^n − 1) / i]
```

| Variável | Significado                                            |
| -------- | ------------------------------------------------------ |
| `M`      | Montante final                                         |
| `P`      | Depósito inicial                                       |
| `C`      | Aporte mensal                                          |
| `i`      | Taxa mensal equivalente: `(1 + taxa anual)^(1/12) − 1` |
| `n`      | Número de meses                                        |

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- TypeScript em modo estrito
- [Tailwind CSS v4](https://tailwindcss.com)
- ESLint 9 (flat config) + Prettier + `prettier-plugin-tailwindcss`
- Vitest + Testing Library (~95% de cobertura)
- Husky + lint-staged + commitlint (Conventional Commits)
- GitHub Actions + Vercel

## Rodando localmente

Requisitos: Node.js >= 20.9 (o arquivo `.node-version` fixa a versão; com [fnm](https://github.com/Schniz/fnm), basta `fnm use`).

```bash
git clone https://github.com/brenoob/calculadora-de-juros-compostos.git
cd calculadora-de-juros-compostos
npm install
npm run dev
```

Abra <http://localhost:3000>.

### Scripts

| Comando                 | Descrição                                |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Servidor de desenvolvimento              |
| `npm run build`         | Build de produção                        |
| `npm run start`         | Serve o build de produção                |
| `npm run lint`          | ESLint                                   |
| `npm run format`        | Formata o projeto com Prettier           |
| `npm run format:check`  | Verifica formatação sem alterar arquivos |
| `npm run test`          | Roda os testes (Vitest)                  |
| `npm run test:watch`    | Testes em modo watch                     |
| `npm run test:coverage` | Testes com relatório de cobertura        |

## Estrutura do projeto

```
app/
├── components/
│   └── compound-interest-calculator.tsx   # Interface da calculadora
├── icon.svg                               # Favicon próprio
├── layout.tsx                             # Layout raiz e metadados
├── opengraph-image.tsx                    # Imagem de compartilhamento (OG)
└── page.tsx                               # Página principal
lib/
├── compound-interest.test.ts              # Testes da lógica de cálculo
└── compound-interest.ts                   # Lógica pura de juros compostos
```

## Qualidade e automação

- **Pre-commit** (`husky` + `lint-staged`): formata arquivos staged com Prettier e aplica ESLint.
- **Commit-msg** (`commitlint`): valida o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/) — ex.: `feat: adiciona gráfico`, `fix: corrige cálculo`.
- **CI** (GitHub Actions): lint, checagem de formatação, testes com cobertura e build em cada push/PR.
- **Deploy contínuo**: push em `main` publica automaticamente na Vercel.

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.
